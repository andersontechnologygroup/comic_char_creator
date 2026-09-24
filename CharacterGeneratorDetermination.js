/**
 * CharacterGenerator — Determination.
 *
 * Physical form, origin, abilities, resources, health, popularity,
s * special abilities, weakness and boosts.
 * Methods are appended to CharacterGenerator.prototype; this file must
 * load after CharacterGenerator.js (it contains no class declaration).
 */

/**
 * Find the physical form entry matching a roll, handling subRoll disambiguation.
 * When multiple entries share the same maxRoll, subRoll (from subTypeRoll)
 * determines which sub-form is selected.
 */
CharacterGenerator.prototype._findPhysicalForm = function (roll, subRoll) {
    // Find all entries where roll <= maxRoll, grouped by maxRoll
    const candidates = this.physicalFormTable.filter((o) => roll <= o.maxRoll);
    if (candidates.length === 0) return null;

    // Find the smallest maxRoll among candidates (tightest match)
    const minMaxRoll = Math.min(...candidates.map((c) => c.maxRoll));
    const tightest = candidates.filter((c) => c.maxRoll === minMaxRoll);

    if (tightest.length === 1) return tightest[0];

    // Multiple entries share this maxRoll — use subRoll to disambiguate
    // Entries with subRoll are checked against subRoll; others get priority
    const withSub = tightest.filter((c) => c.subRoll != null);
    const withoutSub = tightest.filter((c) => c.subRoll == null);

    if (withSub.length > 0) {
        // Find the entry whose subRoll >= subRoll (smallest qualifying)
        const match = withSub.find((c) => subRoll <= c.subRoll);
        if (match) return match;
        // If subRoll exceeds all, return the last one
        return withSub[withSub.length - 1];
    }

    // No subRoll entries — return first without subRoll
    return withoutSub[0] || tightest[0];
};

/**
 * Get all physical form sub-options for a given maxRoll group.
 * Used by the UI modal to let the user select a sub-form.
 */
CharacterGenerator.prototype.getPhysicalFormSubOptions = function () {
    if (!this.physicalFormTable) return [];
    const roll = this.physicalFormRoll;
    const candidates = this.physicalFormTable.filter((o) => roll <= o.maxRoll);
    if (candidates.length === 0) return [];

    const minMaxRoll = Math.min(...candidates.map((c) => c.maxRoll));
    const tightest = candidates.filter((c) => c.maxRoll === minMaxRoll);
    if (tightest.length <= 1) return [];

    // Multiple entries — return them all for user selection
    return tightest.map((c) => ({
        name: c.name,
        subRoll: c.subRoll,
        description: c.description || "",
    }));
};

CharacterGenerator.prototype.determinePhysicalForm = function (char) {
    if (this.physicalFormRoll < 1 || this.physicalFormRoll > 100) {
        char.logRoll("Physical Form", -1, "Invalid Roll");
        return;
    }

    let physicalFormData;
    if (this._selectedPhysicalForm) {
        // User manually selected a sub-form — find it by name within the matching maxRoll group
        physicalFormData = this.physicalFormTable.find(
            (o) =>
                this.physicalFormRoll <= o.maxRoll &&
                o.name === this._selectedPhysicalForm,
        );
    }
    if (!physicalFormData) {
        physicalFormData = this._findPhysicalForm(
            this.physicalFormRoll,
            this.subTypeRoll,
        );
    }
    if (!physicalFormData) {
        char.logRoll("Physical Form", this.physicalFormRoll, "No match");
        return;
    }
    let randomRanksColumn = -1;

    const subType = Utility.getValue(physicalFormData, "subType", -1);
    if (subType !== -1) {
        const possibleTypes = Utility.splitDslList(subType);
        const roll = this.subTypeRoll;

        for (let index = 0; index < possibleTypes.length; index++) {
            const entry = Utility.parseDslEntry(possibleTypes[index]);
            const name = entry.name;
            const maxRoll = entry.maxRoll;
            if (roll <= maxRoll) {
                char.subType = name;
                char.logRoll(
                    "Physical Form Sub Type",
                    this.subTypeRoll,
                    char.subType,
                );
                break;
            }
        }
    }

    const combinations = Utility.getValue(physicalFormData, "combinations", -1);
    if (combinations !== -1) {
        char.bodyTypes = [];

        const possibleTypes = Utility.splitDslList(combinations);
        const roll = this.combinationsRoll;
        let bodyTypeTable = [];

        char.logRoll("Physical Form Combinations", roll, "Combinations");

        // Build the temp table from the combinations attirbute
        for (let index = 0; index < possibleTypes.length; index++) {
            const spec = Utility.parseDslEntry(possibleTypes[index]);
            const numberOfTypes = +spec.segments[0];
            const advantage = +spec.name;
            const maxRoll = spec.maxRoll;

            bodyTypeTable.push({
                numberOfTypes: numberOfTypes,
                advantage: advantage,
                maxRoll: maxRoll,
                advantageMaxRoll: advantage * (index + 1),
            });
        }

        // Get the row based on the roll
        let combinationRow = bodyTypeTable.find((o) => roll <= o.maxRoll);

        // Build a custom/temp ranks roll table for determining which body type to use for randomRanksColumn
        let tempRandomRanksColumnTable = [];
        for (let index = 0; index < combinationRow.numberOfTypes; index++) {
            tempRandomRanksColumnTable.push(
                (index + 1) * combinationRow.advantage,
            );
        }

        // Mak sure that 100 is the last value in the table
        if (
            tempRandomRanksColumnTable[
                tempRandomRanksColumnTable.length - 1
            ] !== 100
        ) {
            tempRandomRanksColumnTable[tempRandomRanksColumnTable.length] = 100;
        }

        let thisBodyType;
        let thisRoll = 0;
        let thisValue;

        let rollIndex = 0;
        for (let index = 0; index < combinationRow.numberOfTypes; index++) {
            thisRoll = this.bodyTypeRolls[rollIndex];
            thisBodyType = this.physicalFormTable.find(
                (o) => thisRoll <= o.maxRoll,
            );
            thisValue = Utility.getValue(thisBodyType, "combinations", -1);

            while (thisValue !== -1) {
                // We don't want to spiral out of control, so we can't
                // have a second combination
                rollIndex++;
                thisRoll = this.bodyTypeRolls[rollIndex];
                thisBodyType = this.physicalFormTable.find(
                    (o) => thisRoll <= o.maxRoll,
                );
                thisValue = Utility.getValue(thisBodyType, "combinations", -1);
            }

            rollIndex++;

            // We got a body type that isn't combination
            char.bodyTypes.push(thisBodyType.name);
            char.logRoll(
                "Physical Form Body Type",
                thisRoll,
                thisBodyType.name,
            );
        }

        const tempRandomRanksColumnIndex = tempRandomRanksColumnTable.findIndex(
            (o) => this.compoundRandomRanksColumnRoll <= o,
        );
        const tempRRCRow = this.physicalFormTable.find(
            (o) => o.name === char.bodyTypes[tempRandomRanksColumnIndex],
        );
        if (tempRRCRow === undefined) {
            char.logRoll("Physical Form", -1, "Invalid compound body type");
            return;
        }
        randomRanksColumn = tempRRCRow.column;
    }

    this.randomRanksColumn = physicalFormData.column;
    if (randomRanksColumn !== -1) this.randomRanksColumn = randomRanksColumn;
    if (this.generatorMode === "basic") {
        // Basic's Table 25 (Random Ranks) is a single-column table; the
        // per-form columns (3/4/5) only exist in Advanced/Ultimate.
        this.randomRanksColumn = 1;
    }

    char.physicalForm = physicalFormData.name;
    char.state.physicalForm = physicalFormData.name;
    char.state.randomRanksColumn = this.randomRanksColumn;
    char.state.bodyTypes = char.bodyTypes.slice();
    char.state.subType = char.subType;
    char.logRoll("Physical Form", this.physicalFormRoll, char.physicalForm);

    let value = Utility.getValue(physicalFormData, "bonusContactCount", 0);
    if (value > 0) {
        let bonusContact = Utility.getValue(
            physicalFormData,
            "bonusContact",
            "",
        );
        if (bonusContact) {
            for (let index = 0; index < value; index++) {
                this.generateBonusContact(char, bonusContact, true);
            }
        }
    }

    // Generate Bonus Talents from physical form
    value = Utility.getValue(physicalFormData, "bonusTalentCount", 0);
    if (value > 0) {
        let bonusTalent = Utility.getValue(physicalFormData, "bonusTalent", "");
        if (bonusTalent) {
            for (let index = 0; index < value; index++) {
                this.generateBonusTalent(char, bonusTalent);
            }
        }
    }
};

CharacterGenerator.prototype.determineOrigin = function (char) {
    // Advanced p.7: origin and physical form are the same single roll —
    // both tables share identical dice ranges (01-30 Altered, 31-60 Mutant,
    // 61-90 Hi-Tech, 91-95 Robot, 96-00 Alien).
    if (this.generatorMode === "advanced") {
        this.originRoll = this.physicalFormRoll;
    }

    if (this.originRoll < 1 || this.originRoll > 100) {
        char.logRoll("Origin", -1, "Invalid Roll");
        return;
    }

    const originData = this.originTable.find(
        (o) => this.originRoll <= o.maxRoll,
    );
    if (!originData) {
        char.logRoll("Origin", this.originRoll, "No match");
        return;
    }
    char.origin = originData.name;
    char.state.origin = originData.name;
    char.logRoll("Origin", this.originRoll, char.origin);
};

CharacterGenerator.prototype.determineAbility = function (
    char,
    ability,
    physicalFormRow,
    abilityIndex,
) {
    if (abilityIndex === undefined || abilityIndex === null) abilityIndex = 0;
    let abilityRolls = this.physicalAbilityRolls[abilityIndex];
    if (MENTAL_ABILITIES.includes(ability)) {
        abilityRolls = this.mentalAbilityRolls;
    }

    const abilityLower = ability.toLowerCase();

    // NOTE: *Set and *Start paths below are currently dead code — no physical
    // form rows in DataBasic/DataAdvanced/DataUltimate define fightingSet,
    // agilitySet, etc. These paths exist as future-proofing for data-driven
    // ability overrides (e.g. a form that always starts with Excellent
    // Fighting regardless of the roll). If you add such attributes to a form
    // row, these paths will activate automatically.
    let value = Utility.getValue(physicalFormRow, abilityLower + "Set", -1);
    if (value !== -1) {
        char.setAbility(
            ability,
            physicalFormRow[abilityLower + "Set"].rank,
            physicalFormRow[abilityLower + "Set"].rankNumber,
        );
        char.logRoll(
            `Primary Ability: ${ability}`,
            "Base Rules",
            physicalFormRow[abilityLower + "Set"],
        );
        return;
    }

    let rankRow = null;

    value = Utility.getValue(physicalFormRow, abilityLower + "Start", -1);
    if (value !== -1) {
        rankRow = this.randomRanksTable.find((r) => r.rank === value);
        char.logRoll(
            `Primary Ability: ${ability}`,
            "Base Rules",
            rankRow.rank + " as Start",
        );
    }

    if (value === -1) {
        const roll = abilityRolls[ability];

        if (roll < 1 || roll > 100) {
            char.logRoll("Primary Ability: " + ability, -1, "Invalid Roll");
            return;
        }

        rankRow = Utility.findRow(this, roll, this.randomRanksColumn);
        if (rankRow === null) {
            char.logRoll(`Primary Ability: ${ability}`, -1, "Invalid RankRow");
            return;
        }
        char.logRoll(`Primary Ability: ${ability}`, roll, rankRow.rank);
    }

    if (rankRow === null) {
        char.logRoll(`Primary Ability: ${ability}`, -1, "Invalid RankRow");
        return;
    }

    const adjustment = Utility.getValue(
        physicalFormRow,
        abilityLower + "Adjustment",
        0,
    );
    let minimum = Utility.getValue(
        physicalFormRow,
        abilityLower + "Minimum",
        -1,
    );
    const maximum = Utility.getValue(
        physicalFormRow,
        abilityLower + "Maximum",
        -1,
    );

    // Issue #5: Check for minimumReason attribute (PDF page 40)
    if (ability === "Reason") {
        const minReason = Utility.getValue(
            physicalFormRow,
            "minimumReason",
            -1,
        );
        if (minReason !== -1) {
            const minReasonRow = this.randomRanksTable.find(
                (r) => r.rank === minReason,
            );
            const currentRankIndex = this.randomRanksTable.findIndex(
                (r) => r.rank === rankRow.rank,
            );
            const minReasonIndex = this.randomRanksTable.findIndex(
                (r) => r.rank === minReason,
            );
            if (currentRankIndex < minReasonIndex) {
                rankRow = minReasonRow;
                char.logRoll(
                    `Primary Ability: ${ability}`,
                    "Base Rules",
                    `Minimum Reason set to ${minReason}`,
                );
            }
        }
    }

    const finalRank = this.getAbilityAfterModifier(
        char,
        ability,
        rankRow.rank,
        adjustment,
        minimum,
        maximum,
    );
    // Record per-ability adjustment from physical form table
    if (adjustment !== 0) {
        char.state.abilityAdjustments[ability] = adjustment;
    }
    const finalRankRow = this.randomRanksTable.find(
        (r) => r.rank === finalRank,
    );

    return finalRankRow;
};

CharacterGenerator.prototype.determinePrimaryAbilities = function (char) {
    // Map back to the correct row in the table being used
    const physicalFormRow = this.physicalFormTable.find(
        (o) => o.name === char.physicalForm,
    );

    this.physicalAbilitiesCount = 1;
    let value = Utility.getValue(physicalFormRow, "abilitiesToGenerate", -1);
    if (value !== -1) {
        this.physicalAbilitiesCount = value;
        char.state.abilitiesToGenerate = value;
        char.logRoll(
            "Abilities to Generate",
            "Base Rules",
            `Abilities to Generate set to ${value}`,
        );
    }

    for (let index = 0; index < this.physicalAbilitiesCount; index++) {
        PHYSICAL_ABILITIES.forEach((ability) => {
            const rankRow = this.determineAbility(
                char,
                ability,
                physicalFormRow,
                index,
            );
            if (rankRow != null) {
                char.setAbility(
                    ability,
                    rankRow.rank,
                    rankRow.rankNumber,
                    index,
                );
            }
        });
    }

    MENTAL_ABILITIES.forEach((ability) => {
        const rankRow = this.determineAbility(char, ability, physicalFormRow);
        if (rankRow != null) {
            char.setAbility(ability, rankRow.rank, rankRow.rankNumber);
        }
    });

    value = Utility.getValue(physicalFormRow, "anyPrimaryAbilityAdjustment", 0);
    if (value !== 0) {
        const roll = this.anyAbilityAdjustmentRoll;
        const abilityRow = ALL_ABILITIES.find((o) => roll <= o.maxRoll);
        if (abilityRow) {
            const ability = abilityRow.name;
            const oldRank = char.getAbility(ability).rank;
            const rank = this.getAbilityAfterModifier(
                char,
                ability,
                oldRank,
                value,
                -1,
                -1,
            );
            const rankRow = this.randomRanksTable.find((r) => r.rank === rank);
            if (rankRow) {
                char.setAbility(ability, rankRow.rank, rankRow.rankNumber);
                char.state.anyAbilityAdjustment = {
                    ability: ability,
                    adjustment: value,
                    oldRank: oldRank,
                    newRank: rankRow.rank,
                    roll: roll,
                };
                char.logRoll(
                    "Any Ability Adjustment",
                    roll,
                    ability + ": " + oldRank + " -> " + rankRow.rank,
                );
            }
        }
    }

    value = Utility.getValue(
        physicalFormRow,
        "allPrimaryAbilitiesAdjustment",
        0,
    );
    if (value !== 0) {
        char.state.allPrimaryAbilityAdjustment = {
            adjustment: value,
            abilities: {},
        };
        for (
            let abilityIndex = 0;
            abilityIndex < char.primaryAbilities.length;
            abilityIndex++
        ) {
            for (let index = 0; index < ALL_ABILITIES.length; index++) {
                const ability = ALL_ABILITIES[index].name;
                const oldRank = char.getAbility(ability, abilityIndex).rank;
                const rank = this.getAbilityAfterModifier(
                    char,
                    ability,
                    oldRank,
                    value,
                    -1,
                    -1,
                );
                const rankRow = this.randomRanksTable.find(
                    (r) => r.rank === rank,
                );
                if (!rankRow) continue;
                char.setAbility(ability, rankRow.rank, rankRow.rankNumber);
                char.state.allPrimaryAbilityAdjustment.abilities[ability] = {
                    old: oldRank,
                    new: rankRow.rank,
                };
                char.logRoll(
                    "All Primary Ability Adjustment",
                    value,
                    ability + ": " + oldRank + " -> " + rankRow.rank,
                );
            }
        }
    }

    value = Utility.getValue(
        physicalFormRow,
        "allPhysicalAbilitiesAdjustment",
        0,
    );
    if (value !== 0) {
        char.state.allPhysicalAbilityAdjustment = {
            adjustment: value,
            abilities: {},
        };
        for (
            let abilityIndex = 0;
            abilityIndex < char.primaryAbilities.length;
            abilityIndex++
        ) {
            for (let index = 0; index < PHYSICAL_ABILITIES.length; index++) {
                const ability = PHYSICAL_ABILITIES[index];
                const oldRank = char.getAbility(ability, abilityIndex).rank;
                const rank = this.getAbilityAfterModifier(
                    char,
                    ability,
                    oldRank,
                    value,
                    -1,
                    -1,
                );
                const rankRow = this.randomRanksTable.find(
                    (r) => r.rank === rank,
                );
                if (!rankRow) continue;
                char.setAbility(ability, rankRow.rank, rankRow.rankNumber);
                char.state.allPhysicalAbilityAdjustment.abilities[ability] = {
                    old: oldRank,
                    new: rankRow.rank,
                };
                char.logRoll(
                    "All Physical Ability Adjustment",
                    value,
                    ability + ": " + oldRank + " -> " + rankRow.rank,
                );
            }
        }
    }
};

CharacterGenerator.prototype.getAbilityAfterModifier = function (
    char,
    ability,
    abilityRank,
    adjustment,
    minimum,
    maximum,
) {
    let rankIndex = this.randomRanksTable.findIndex(
        (r) => r.rank === abilityRank,
    );
    if (rankIndex === -1) {
        char.logRoll(
            "Ability",
            "Ability Modifier",
            `${ability} has invalid rank. Setting to Feeble`,
        );
        rankIndex = 0;
    }

    rankIndex += adjustment;

    char.logRoll(
        "Ability",
        "Ability Modifier",
        `Ability: ${ability}. Ability Rank: ${abilityRank}. Adjustment: ${adjustment}.  Min: ${minimum}.  Max: ${maximum}`,
    );

    if (rankIndex < 0) {
        rankIndex = 0;
        char.logRoll(
            "Ability",
            "Ability Modifier",
            `${ability} Rank is less than 0. Setting to Feeble`,
        );
    }

    if (rankIndex >= this.randomRanksTable.length) {
        rankIndex = this.randomRanksTable.length - 1;
        char.logRoll(
            "Ability",
            "Ability Modifier",
            `${ability} Rank is greater than max. Setting to ${rankIndex}.`,
        );
    }

    let returnRank = this.randomRanksTable[rankIndex].rank;

    // minimum/maximum may be rank names ("Good"): compare by position in
    // the ranks table, never lexicographically ("Typical" < "Good" is
    // false alphabetically but true by rank order). Numeric limits (e.g.
    // Popularity rankNumbers) can never match a rank name here — those
    // callers clamp the resulting number themselves.
    if (minimum !== -1 && typeof minimum === "string") {
        const minIndex = this.randomRanksTable.findIndex(
            (r) => r.rank === minimum,
        );
        if (minIndex !== -1 && rankIndex < minIndex) {
            returnRank = minimum;
            char.logRoll(
                "Ability",
                "Ability Modifier",
                `${ability} Rank is less than Min. Setting to ${returnRank}.`,
            );
        }
    }

    if (maximum !== -1 && typeof maximum === "string") {
        const maxIndex = this.randomRanksTable.findIndex(
            (r) => r.rank === maximum,
        );
        if (maxIndex !== -1 && rankIndex > maxIndex) {
            returnRank = maximum;
            char.logRoll(
                "Ability",
                "Ability Modifier",
                `${ability} Rank is greater than Max. Setting to ${returnRank}.`,
            );
        }
    }

    // Don't allow it to drop below Feeble
    if (returnRank === "Shift 0") {
        returnRank = "Feeble";
        char.logRoll(
            "Ability",
            "Ability Modifier",
            `${ability} Rank is less than Feeble. Setting to Feeble.`,
        );
    }

    return returnRank;
};

CharacterGenerator.prototype.determineResources = function (char) {
    // Page 9: Initial Resources
    let startRank = "Typical";

    const physicalFormRow = this.physicalFormTable.find(
        (o) => o.name === char.physicalForm,
    );

    let value = Utility.getValue(physicalFormRow, "isHiTech", false);
    if (value) {
        char.isHiTech = true;
    }

    value = Utility.getValue(physicalFormRow, "resourcesSet", -1);
    if (value !== -1) {
        const rankData = this.randomRanksTable.find(
            (r) => r.rankNumber === value,
        );
        if (rankData) {
            char.resources.rank = rankData.rank;
            char.resources.number = rankData.rankNumber;
            char.state.resources.set = value;
            char.state.resources.final = rankData.rank;
            char.logRoll(
                "Resources",
                "Base Rules",
                `Resources set to ${value}/${rankData.rank}`,
            );
            return;
        }
    }

    value = Utility.getValue(physicalFormRow, "resourcesStart", -1);
    if (value !== -1) {
        const startRankRow = this.randomRanksTable.find(
            (r) => r.rankNumber === value,
        );
        if (startRankRow) startRank = startRankRow.rank;
        char.state.resources.startRank = value;
        char.logRoll(
            "Resources",
            "Base Rules",
            `Resources set to ${value}/${startRank} as Start`,
        );
    }

    if (this.generatorMode === "basic") {
        // Basic p40: "Roll percentile dice and consult Table 25: Random
        // Ranks. The result is the hero's Resource rank." Basic's Table 25
        // is the single-column Random Ranks table.
        const roll = this.resourceModifierRoll;
        const rankRow =
            roll >= 1 && roll <= 100 ? Utility.findRow(this, roll, 1) : null;
        if (rankRow) {
            startRank = rankRow.rank;
            char.state.resources.startRank = rankRow.rankNumber;
            char.logRoll("Resources", `Table 25 (roll ${roll})`, rankRow.rank);
        }
    }

    value = Utility.getValue(physicalFormRow, "isHiTech", false);
    if (value) {
        char.state.resources.hiTech = true;
        // "Set to Good" is an Advanced/Ultimate option; Basic always uses
        // the Table 25 roll (p40).
        if (this.hiTechToGood && this.generatorMode !== "basic") {
            startRank = "Good";
            char.logRoll(
                "Resources",
                "Base Rules Option",
                "Hi-Tech Resources set to Good",
            );
        } else {
            char.logRoll(
                "Resources",
                "Base Rules Option",
                `Hi-Tech Resources set to ${startRank}`,
            );
        }
    }

    // Apply random modifier only for Advanced/Ultimate (not Basic per p40)
    let finalAdjustment = 0;
    if (this.generatorMode !== "basic") {
        const roll = this.resourceModifierRoll;
        const adjRow = this.abilityModifierTable.find((r) => r.maxRoll >= roll);
        if (adjRow) finalAdjustment = adjRow.modifier;
    }
    value = Utility.getValue(physicalFormRow, "resourcesAdjustment", 0);
    if (value !== 0) {
        char.state.resources.adjustment = value;
        char.logRoll(
            "Resources",
            "Base Rules",
            `Resources adjusted by ${value}`,
        );
    }
    finalAdjustment += value;

    const minimum = Utility.getValue(physicalFormRow, "resourcesMinimum", -1);
    const maximum = Utility.getValue(physicalFormRow, "resourcesMaximum", -1);

    let resourceRank = this.getAbilityAfterModifier(
        char,
        "Resources",
        startRank,
        finalAdjustment,
        minimum,
        maximum,
    );

    char.resources.rank = resourceRank;
    char.state.resources.final = resourceRank;
    const rankData = this.randomRanksTable.find((r) => r.rank === resourceRank);
    if (!rankData) {
        char.logRoll(
            "Resources",
            -1,
            `Invalid Resources rank: ${resourceRank}`,
        );
        return;
    }
    char.resources.number = rankData.rankNumber;
    char.logRoll("Resources", "Base Rules", resourceRank);

    // Basic Rules p40: Hi-Tech wonders with Excellent or less Resources get 210 resource points in cash
    if (
        this.generatorMode === "basic" &&
        char.isHiTech &&
        rankData.rankNumber <= 20
    ) {
        char.logRoll(
            "Resources",
            "Base Rules",
            "Hi-Tech with " +
                resourceRank +
                " Resources starts with 210 resource points in cash",
        );
    }
};

CharacterGenerator.prototype.determineHealth = function (char) {
    const physicalFormRow = this.physicalFormTable.find(
        (row) => row.name === char.physicalForm,
    );
    const healthAdjustment = Utility.getValue(
        physicalFormRow,
        "healthAdjustment",
        0,
    );
    if (Number.isInteger(healthAdjustment) && healthAdjustment !== 0) {
        char.health += healthAdjustment;
        char.state.healthAdjustment = {
            type: "add",
            value: healthAdjustment,
        };
        char.logRoll("Health Adjustment", healthAdjustment, char.health);
    }

    if (!Number.isInteger(healthAdjustment)) {
        switch (healthAdjustment.substring(0, 1)) {
            case "*": {
                const multVal = parseInt(healthAdjustment.substring(1));
                char.health *= multVal;
                char.state.healthAdjustment = {
                    type: "multiply",
                    value: multVal,
                };
                break;
            }
            case "/": {
                const divVal = parseInt(healthAdjustment.substring(1));
                char.health /= divVal;
                char.state.healthAdjustment = {
                    type: "divide",
                    value: divVal,
                };
                break;
            }
        }

        char.logRoll("Health Adjustment", healthAdjustment, char.health);
    }
};

CharacterGenerator.prototype.determinePopularityUltimate = function (char) {
    // Ultimate rules change this to a roll on the Random Ranks Table.   But the roll is then changed to a number.
    // We use the rank number from the Random Ranks Table to set the Popularity.
    const physicalFormRow = this.physicalFormTable.find(
        (o) => o.name === char.physicalForm,
    );

    let value = Utility.getValue(physicalFormRow, "popularitySet", -1);
    if (value !== -1) {
        char.popularity = value;
        char.state.popularity.set = value;
        char.state.popularity.final = value;
        char.logRoll("Popularity", "Base Rules", "Popularity set to " + value);
        return;
    }

    let thisRow = Utility.findRow(
        this,
        this.popularityRoll,
        this.randomRanksColumn,
    );
    if (!thisRow) {
        char.logRoll("Popularity", this.popularityRoll, "Invalid RankRow");
        return;
    }
    let popularity = thisRow.rankNumber;

    value = Utility.getValue(physicalFormRow, "popularityStart", -1);
    if (value !== -1) {
        popularity = value;
        thisRow = this.randomRanksTable.find((r) => r.rankNumber === value);
        char.state.popularity.start = value;
        char.logRoll(
            "Popularity",
            "Base Rules",
            "Popularity starting at " + value,
        );
    }

    if (popularity === null) {
        char.logRoll(`Popularity`, -1, "Invalid Popularity");
        return;
    }

    let adjustment = Utility.getValue(
        physicalFormRow,
        "popularityAdjustment",
        0,
    );

    if (char.subType !== "" && !Number.isInteger(+adjustment)) {
        const subTypes = Utility.parseDslValueList(adjustment);
        for (let index = 0; index < subTypes.length; index++) {
            if (subTypes[index].name === char.subType) {
                adjustment = subTypes[index].value;
                break;
            }
        }

        char.logRoll(
            "Popularity",
            "SubType Rules",
            "Popularity adjustment set to " + adjustment,
        );
    }
    char.state.popularity.adjustment = adjustment;

    let minimum = Utility.getValue(physicalFormRow, "popularityMinimum", -1);
    if (char.subType !== "" && !Number.isInteger(+minimum)) {
        const subTypes = Utility.parseDslValueList(minimum);
        for (let index = 0; index < subTypes.length; index++) {
            if (subTypes[index].name === char.subType) {
                minimum = subTypes[index].value;
                break;
            }
        }

        char.logRoll(
            "Popularity",
            "SubType Rules",
            "Popularity minimum set to " + minimum,
        );
    }

    let maximum = Utility.getValue(physicalFormRow, "popularityMaximum", -1);
    if (char.subType !== "" && !Number.isInteger(+maximum)) {
        const subTypes = Utility.parseDslValueList(maximum);
        for (let index = 0; index < subTypes.length; index++) {
            if (subTypes[index].name === char.subType) {
                maximum = subTypes[index].value;
                break;
            }
        }

        char.logRoll(
            "Popularity",
            "SubType Rules",
            "Popularity maximum set to " + maximum,
        );
    }

    // If popularity is specifically set, then it will already be in char.popularity
    const finalPopularity = this.getAbilityAfterModifier(
        char,
        "Popularity",
        thisRow.rank,
        adjustment,
        minimum,
        maximum,
    );
    const popularityRow = this.randomRanksTable.find(
        (r) => r.rank === finalPopularity,
    );
    popularity = popularityRow.rankNumber;

    // Now that we have rolled the popularity, lets do secret, etc.
    if (this.identitySecret) {
        popularity -= 5;
        char.logRoll("Popularity", "Secret ID", "Loss of Popularity (-5)");
    }

    if (!this.identitySecret) {
        popularity += 10;
        char.logRoll("Popularity", "Public ID", "Addition of Popularity (+10)");
    }

    // Double check that our min/max are still good.
    if (minimum !== -1 && popularity < minimum) {
        popularity = minimum;
        char.logRoll(
            "Popularity",
            "Base Rules",
            "Popularity Adjusted to Minimum",
        );
    }

    if (maximum !== -1 && popularity > maximum) {
        popularity = maximum;
        char.logRoll(
            "Popularity",
            "Base Rules",
            "Popularity Adjusted to Maximum",
        );
    }

    if (popularity < 0) {
        popularity = 0;
    }

    char.popularity = popularity;
    char.state.popularity.final = popularity;
    char.logRoll("Popularity", this.popularityRoll, char.popularity);
};

CharacterGenerator.prototype.determinePopularity = function (char) {
    if (this.generatorMode === "ultimate") {
        this.determinePopularityUltimate(char);
        return;
    }

    // Page 9
    const physicalFormRow = this.physicalFormTable.find(
        (o) => o.name === char.physicalForm,
    );

    // Advanced p.9: base Popularity is 10 for most heroes (0 for Mutants
    // and robots via popularitySet). Basic's Table 26 starts from 50.
    char.popularity = this.generatorMode === "basic" ? 50 : 10;
    let value = Utility.getValue(physicalFormRow, "popularitySet", -1);
    if (value !== -1) {
        char.popularity = value;
        char.logRoll(
            "Popularity",
            "Base Rules",
            "Popularity base set to " + value,
        );
    }

    value = Utility.getValue(physicalFormRow, "popularityStart", -1);
    if (value !== -1) {
        char.popularity = value;
        char.logRoll("Popularity", "Base Rules", "Popularity set to " + value);
    }

    // Identity/Origin modifiers (Page 40, Table 26)
    // Basic rules treat Origin and Identity as separate modifiers.
    // Advanced/Ultimate combine them into a single modifier.
    if (this.generatorMode === "basic") {
        // Identity modifier
        if (this.identitySecret) {
            char.popularity -= 20;
            char.logRoll(
                "Popularity",
                "Identity Secret",
                "Loss of Popularity (-20)",
            );
        } else {
            char.popularity += 20;
            char.logRoll(
                "Popularity",
                "Identity Public",
                "Addition of Popularity (+20)",
            );
        }
        // Origin modifier (separate in Basic rules)
        if (this.originPublic) {
            char.popularity += 20;
            char.logRoll(
                "Popularity",
                "Origin Public",
                "Addition of Popularity (+20)",
            );
        } else {
            char.popularity -= 20;
            char.logRoll(
                "Popularity",
                "Origin Secret",
                "Loss of Popularity (-20)",
            );
        }
    } else {
        // Advanced p.9: raise by 10 if identity is publicly known,
        // lower by 5 if identity is secret.
        if (this.identitySecret) {
            char.popularity -= 5;
            char.logRoll("Popularity", "Secret ID", "Loss of Popularity (-5)");
        } else {
            char.popularity += 10;
            char.logRoll(
                "Popularity",
                "Public ID",
                "Addition of Popularity (+10)",
            );
        }
    }

    // wellEstablished and looksHuman are Basic-only options
    if (this.generatorMode === "basic" && this.wellEstablished) {
        char.popularity += 20;
        char.logRoll(
            "Popularity",
            "Well-Established",
            "Addition of Popularity (+20)",
        );
    }

    if (this.generatorMode === "basic" && this.looksHuman) {
        char.popularity += 10;
        char.logRoll(
            "Popularity",
            "Looks Human",
            "Addition of Popularity (+10)",
        );
    }

    // Table 26 (Basic): "Hero is new in the area -20"
    if (this.generatorMode === "basic" && this.newInArea) {
        char.popularity -= 20;
        char.logRoll(
            "Popularity",
            "New in the Area",
            "Loss of Popularity (-20)",
        );
    }

    value = Utility.getValue(physicalFormRow, "popularityAdjustment", 0);
    if (value !== 0) {
        char.popularity += value;
        char.logRoll(
            "Popularity",
            "Base Rules",
            "Popularity Adjusted by " + value,
        );
    }

    value = Utility.getValue(physicalFormRow, "popularityMinimum", -1);
    if (value !== -1 && char.popularity < value) {
        char.popularity = value;
        char.logRoll(
            "Popularity",
            "Base Rules",
            "Popularity Adjusted to Minimum",
        );
    }

    value = Utility.getValue(physicalFormRow, "popularityMaximum", -1);
    if (value !== -1 && char.popularity > value) {
        char.popularity = value;
        char.logRoll(
            "Popularity",
            "Base Rules",
            "Popularity Adjusted to Maximum",
        );
    }

    // Advanced p.9: "Heroes may start with negative Popularity." — no floor.
    // (Ultimate keeps its floor in determinePopularityUltimate.)

    char.state.popularity.final = char.popularity;
    char.logRoll("Popularity", "Base Rules", char.popularity);
};

CharacterGenerator.prototype.determineSpecialAbilities = function (char) {
    // Validate roll arrays — replace invalid entries with safe defaults
    for (let i = 0; i < this.rollArraySize; i++) {
        if (
            this.powerCategoryRolls[i] === undefined ||
            this.powerCategoryRolls[i] === null ||
            this.powerCategoryRolls[i] < 1 ||
            this.powerCategoryRolls[i] > 100
        ) {
            this.powerCategoryRolls[i] = 50; // mid-range safe default
        }
        if (
            this.powerRolls[i] === undefined ||
            this.powerRolls[i] === null ||
            this.powerRolls[i] < 1
        ) {
            this.powerRolls[i] = 50;
        }
        if (
            this.powerRankRolls[i] === undefined ||
            this.powerRankRolls[i] === null ||
            this.powerRankRolls[i] < 1
        ) {
            this.powerRankRolls[i] = 50;
        }
        if (
            this.talentCategoryRolls[i] === undefined ||
            this.talentCategoryRolls[i] === null ||
            this.talentCategoryRolls[i] < 1 ||
            this.talentCategoryRolls[i] > 100
        ) {
            this.talentCategoryRolls[i] = 50;
        }
        if (
            this.talentRolls[i] === undefined ||
            this.talentRolls[i] === null ||
            this.talentRolls[i] < 1
        ) {
            this.talentRolls[i] = 50;
        }
        if (
            this.contactCategoryRolls[i] === undefined ||
            this.contactCategoryRolls[i] === null ||
            this.contactCategoryRolls[i] < 1 ||
            this.contactCategoryRolls[i] > 100
        ) {
            this.contactCategoryRolls[i] = 50;
        }
        if (
            this.contactRolls[i] === undefined ||
            this.contactRolls[i] === null ||
            this.contactRolls[i] < 1
        ) {
            this.contactRolls[i] = 50;
        }
    }

    // Clamp number rolls to [1, 100] to prevent undefined table lookups
    const pRoll = Math.max(1, Math.min(100, this.powerNumberRoll || 1));
    const pQtyRow = this.quantityTable.find((q) => pRoll <= q.maxRoll);
    const tRoll = Math.max(1, Math.min(100, this.talentNumberRoll || 1));
    const tQtyRow = this.quantityTable.find((q) => tRoll <= q.maxRoll);
    const cRoll = Math.max(1, Math.min(100, this.contactNumberRoll || 1));
    const cQtyRow = this.quantityTable.find((q) => cRoll <= q.maxRoll);

    char.powersCount = pQtyRow.powers.initial;
    char.powersMax = pQtyRow.powers.maximum;
    char.talentsCount = tQtyRow.talents.initial;
    char.talentsMax = tQtyRow.talents.maximum;
    char.contactsCount = cQtyRow.contacts.initial;
    char.contactsMax = cQtyRow.contacts.maximum;

    const physicalFormRow = this.physicalFormTable.find(
        (o) => o.name === char.physicalForm,
    );
    let value;
    this.determineSpecialPowerAdjustment(physicalFormRow, char, pQtyRow);
    this.determineSpecialTalentAdjustment(physicalFormRow, char, tQtyRow);
    this.determineSpecialContactAdjustment(physicalFormRow, char, cQtyRow);

    // Issue #7: Contacts = Powers option (PDF page 41) - apply after power adjustments
    if (this.contactsEqualToPowers && this.generatorMode === "basic") {
        char.contactsCount = char.powersCount;
        char.contactsMax = char.powersCount;
    }

    char.powersSlots = char.powersCount;
    char.talentsSlots = char.talentsCount;

    // Record final counts in state
    char.state.powersCount.initial = pQtyRow.powers.initial;
    char.state.powersCount.final = char.powersCount;
    char.state.talentsCount.initial = tQtyRow.talents.initial;
    char.state.talentsCount.final = char.talentsCount;
    char.state.contactsCount.initial = cQtyRow.contacts.initial;
    char.state.contactsCount.final = char.contactsCount;

    char.logRoll(
        "Power Slots",
        pRoll,
        `Powers: ${char.powersCount}/${char.powersMax}`,
    );
    char.logRoll(
        "Talent Slots",
        tRoll,
        `Talents: ${char.talentsCount}/${char.talentsMax}`,
    );
    char.logRoll(
        "Contact Slots",
        cRoll,
        `Contacts: ${char.contactsCount}/${char.contactsMax}`,
    );

    // Generate Bonus Power
    value = Utility.getValue(physicalFormRow, "bonusPowerCount", 0);
    if (value !== 0) {
        let bonusPower = Utility.getValue(physicalFormRow, "bonusPower", "");
        for (let index = 0; index < value; index++) {
            this.generatorBonusPowerOfPhysicalForm(char, bonusPower, index);
        }
    }

    // Generate Optional Power from Physical Form (e.g., Energy has optionalPowers)
    if (this.applyOptionalPowers) {
        value = Utility.getValue(physicalFormRow, "optionalPowers", "");
        if (value !== "") {
            // Use optionalPowerCount if set; if absent but optionalPowers exists, default to 1
            const optMax = Utility.getValue(
                physicalFormRow,
                "optionalPowerCount",
                value ? 1 : 100,
            );
            this.generateOptionalPower(
                char,
                optMax,
                value,
                physicalFormRow.name,
            );
        }
    }

    // Generate rolled Powers
    // Note: powersCount is NOT reduced by bonus powers here — generateSinglePower
    // handles slot accounting via remainingSlots. getPowerSlotsAndCategories()
    // accounts for bonusPowerCount for the UI.
    for (let i = 0; i < char.powersCount; i++) {
        this.generateSinglePower(char, i);
    }

    // Process any remaining manually-selected optional powers whose source
    // power was never generated (e.g. simulation predicted it but slot
    // exhaustion or multi-slot powers prevented it from being rolled).
    if (this.selectOptionalPowersManually && this._selectedOptionalPowers) {
        const processedSources = this._processedOptionalSources || new Set();
        let nextRankIdx = char.powers.length;
        for (const srcName of Object.keys(this._selectedOptionalPowers)) {
            if (processedSources.has(srcName)) continue;
            const selected = this._selectedOptionalPowers[srcName];
            if (!selected || selected.length === 0) continue;
            for (let si = 0; si < selected.length; si++) {
                const sel = selected[si];
                const p = this.powerListTable.find(
                    (c) => c.category === sel.category && c.name === sel.name,
                );
                if (!p) continue;
                const optionalPowerRankColumn =
                    this.generatorMode === "basic" ? 1 : 4;
                const rankRoll = this.powerRankRolls[nextRankIdx];
                nextRankIdx++;
                const rankRow = Utility.findRow(
                    this,
                    rankRoll,
                    optionalPowerRankColumn,
                );
                const rankNum = rankRow ? rankRow.rankNumber : 1;
                const rankName = rankRow ? rankRow.rank : "Typical";
                const optSlotCount = CharacterGenerator._safeSlotCount(p);
                if (
                    CharacterGenerator._hasRemainingSlots(char, optSlotCount) &&
                    !this.isPowerAlreadyAssigned(char.powers, p)
                ) {
                    char.powers.push({
                        category: p.category,
                        name: p.name,
                        code: p.code,
                        description: p.description,
                        rank: rankName,
                        number: rankNum,
                        powerSlots: optSlotCount,
                        optionalPower: true,
                    });
                    if (this._assignedPowerNames)
                        this._assignedPowerNames.add(p.name);
                }
            }
        }
    }

    // Generate Talents
    for (let i = 0; i < char.talentsCount; i++) {
        this.generateTalents(char, i);
    }

    // Enforce talentCategory: ensure at least one talent is from the required category
    const requiredTalentCat = Utility.getValue(
        physicalFormRow,
        "talentCategory",
        null,
    );
    if (requiredTalentCat && char.talents.length > 0) {
        const hasRequired = char.talents.some(
            (t) => t.category === requiredTalentCat,
        );
        if (!hasRequired) {
            // Find a talent from the required category that isn't already assigned
            const catTalents = this.talentListTable.filter(
                (t) => t.category === requiredTalentCat,
            );
            const assignedNames = new Set(char.talents.map((t) => t.name));
            const available = catTalents.filter(
                (t) => !assignedNames.has(t.name),
            );
            if (available.length > 0) {
                // Replace the last talent with one from the required category
                const replacement = available[0];
                const replaced = char.talents[char.talents.length - 1];
                char.talents[char.talents.length - 1] = {
                    category: replacement.category,
                    name: replacement.name,
                    description: replacement.description,
                    talentSlots: Utility.getValue(
                        replacement,
                        "talentCount",
                        1,
                    ),
                    enforcedCategory: true,
                };
                if (this._assignedTalentNames) {
                    this._assignedTalentNames.delete(replaced.name);
                    this._assignedTalentNames.add(replacement.name);
                }
                char.logRoll(
                    "Talent Category",
                    `Enforced`,
                    `${requiredTalentCat}: Replaced "${replaced.name}" with "${replacement.name}"`,
                );
            }
        }
    }

    // Generate Contacts
    // contactsCount is the total number of contact SLOTS available.
    // Each contact may consume multiple slots via contactCount (default 1).

    // If manual selection is active, use pre-selected contacts
    if (this._selectedContacts && this._selectedContacts.length > 0) {
        for (let si = 0; si < this._selectedContacts.length; si++) {
            const sel = this._selectedContacts[si];
            const slots = sel.contactCount || 1;
            const currentContactSlots = char.contacts.reduce(
                (sum, ct) => sum + (ct.contactSlots || 1),
                0,
            );
            const remainingSlots = char.contactsCount - currentContactSlots;
            if (slots > remainingSlots) {
                char.logRoll(
                    "Contact Gen",
                    `Skipped`,
                    `${sel.category}: ${sel.name} (needs ${slots} slots, ${remainingSlots} remaining)`,
                );
                continue;
            }
            if (this._assignedContactNames)
                this._assignedContactNames.add(sel.name);
            char.logRoll(
                "Contact Gen",
                `Manual`,
                `${sel.category}: ${sel.name}`,
            );
            char.contacts.push({
                category: sel.category,
                name: sel.name,
                contactSlots: slots,
                description: sel.description || "",
                contactName: sel.contactName || "",
            });
        }
    }

    let rollIndex = char.contacts.length;
    // Skip rolling loop if contacts were manually selected (user chose fewer than max)
    if (this._selectedContacts && this._selectedContacts.length > 0) {
        rollIndex = this.rollArraySize; // skip the while loop
    }
    let contactGenIterations = 0;
    const maxContactGenIterations = this.rollArraySize * 2; // safety guard
    while (
        rollIndex < this.rollArraySize &&
        contactGenIterations < maxContactGenIterations
    ) {
        contactGenIterations++;
        // Check remaining slots
        const currentContactSlots = char.contacts.reduce(
            (sum, ct) => sum + (ct.contactSlots || 1),
            0,
        );
        const remainingSlots = char.contactsCount - currentContactSlots;
        if (remainingSlots <= 0) break;

        let ci = rollIndex;
        let ccRoll = this.contactCategoryRolls[ci];
        let catRow = this.contactCategoriesTable.find(
            (c) => ccRoll <= c.maxRoll,
        );
        let category = catRow ? catRow.name : null;
        let cRoll = this.contactRolls[ci];
        let c = category
            ? this.contactTypeListTable.find(
                  (c) =>
                      c.category === category &&
                      cRoll <= c.maxRoll &&
                      (!c.alienOnly || char.physicalForm === "Alien"),
              )
            : null;

        // Skip duplicates — try next roll indices
        let adjustIndex = 0;
        while (
            c &&
            this._assignedContactNames &&
            this._assignedContactNames.has(c.name)
        ) {
            char.logRoll("Contact Gen", `Duplicate`, `${category}: ${c.name}`);
            adjustIndex++;
            if (ci + adjustIndex >= this.rollArraySize) {
                c = null;
                break;
            }
            ccRoll = this.contactCategoryRolls[ci + adjustIndex];
            catRow = this.contactCategoriesTable.find(
                (c2) => ccRoll <= c2.maxRoll,
            );
            if (!catRow) continue;
            category = catRow.name;
            cRoll = this.contactRolls[ci + adjustIndex];
            c = this.contactTypeListTable.find(
                (c2) =>
                    c2.category === category &&
                    cRoll <= c2.maxRoll &&
                    (!c2.alienOnly || char.physicalForm === "Alien"),
            );
        }
        if (!c) {
            rollIndex++;
            continue;
        }

        const slots = Utility.getValue(c, "contactCount", 1);

        // Skip contacts that would exceed remaining slots
        if (slots > remainingSlots) {
            char.logRoll(
                "Contact Gen",
                `Too Many Slots`,
                `${category}: ${c.name} (needs ${slots}, ${remainingSlots} remaining)`,
            );
            rollIndex++;
            continue;
        }

        if (this._assignedContactNames) this._assignedContactNames.add(c.name);

        char.logRoll(
            "Contact Gen",
            `${ccRoll}/${cRoll}`,
            `${category}: ${c.name}`,
        );

        char.contacts.push({
            category: category,
            name: c.name,
            contactSlots: slots,
            description: c.description,
            contactName: "",
        });

        rollIndex++;
    }
};

CharacterGenerator.prototype.determineWeakness = function (char) {
    // Page 14 Ultimate Powers Book
    // 01-13 Psych, 14-18 Elemental Allergy, etc.
    const sRoll = this.weaknessStimulusRoll;
    const eRoll = this.weaknessEffectRoll;
    const dRoll = this.weaknessDurationRoll;
    const rRoll = this.weaknessRankRoll;

    const stimulusRow = this.weaknessStimulusTable.find(
        (s) => sRoll <= s.maxRoll,
    );
    const effectRow = this.weaknessEffectTable.find((e) => eRoll <= e.maxRoll);
    const durationRow = this.weaknessDurationTable.find(
        (d) => dRoll <= d.maxRoll,
    );
    const rankRow = Utility.findRow(this, rRoll, this.randomRanksColumn);

    if (!stimulusRow || !effectRow || !durationRow || !rankRow) {
        char.logRoll("Weakness", rRoll, "Invalid weakness lookup");
        return;
    }

    char.weakness.stimulus = stimulusRow.name;
    char.weakness.stimulusDescription = stimulusRow.description;
    char.weakness.effect = effectRow.name;
    char.weakness.effectDescription = effectRow.description;
    char.weakness.duration = durationRow.name;
    char.weakness.durationDescription = durationRow.description;
    char.weakness.rank = rankRow.rank;
    char.weakness.rankNumber = rankRow.rankNumber;

    char.state.weakness.stimulus = stimulusRow.name;
    char.state.weakness.effect = effectRow.name;
    char.state.weakness.duration = durationRow.name;
    char.state.weakness.rank = rankRow.rank;

    char.logRoll("Weakness Stimulus", sRoll, stimulusRow.name);
    char.logRoll("Weakness Effect", eRoll, effectRow.name);
    char.logRoll("Weakness Duration", dRoll, durationRow.name);
    char.logRoll("Weakness Rank", rRoll, rankRow.rank);
};

CharacterGenerator.prototype.getBoostLevel = function (char) {
    return char.origin === "Alien" ? 2 : 1;
};

CharacterGenerator.prototype.boostAbility = function (char, abilityName) {
    if (char.boostApplied) return false;
    const boostLevel = this.getBoostLevel(char);
    const ability = char.primaryAbilities[0][abilityName];
    const currentIndex = this.randomRanksTable.findIndex(
        (r) => r.rank === ability.rank,
    );
    if (currentIndex === -1 || currentIndex >= this.randomRanksTable.length - 1)
        return false;
    const newIndex = Math.min(
        currentIndex + boostLevel,
        this.randomRanksTable.length - 1,
    );
    const oldRank = ability.rank;
    ability.rank = this.randomRanksTable[newIndex].rank;
    ability.number = this.randomRanksTable[newIndex].rankNumber;
    char.boostApplied = true;
    char.calculateSecondary();
    char.logRoll(
        "Rank Boost",
        "Player Choice",
        abilityName + ": " + oldRank + " -> " + ability.rank,
    );
    return true;
};

CharacterGenerator.prototype.boostPower = function (char, powerIndex) {
    if (char.boostApplied) return false;
    if (powerIndex < 0 || powerIndex >= char.powers.length) return false;
    const boostLevel = this.getBoostLevel(char);
    const power = char.powers[powerIndex];
    const currentIndex = this.randomRanksTable.findIndex(
        (r) => r.rank === power.rank,
    );
    if (currentIndex === -1 || currentIndex >= this.randomRanksTable.length - 1)
        return false;
    const newIndex = Math.min(
        currentIndex + boostLevel,
        this.randomRanksTable.length - 1,
    );
    power.rank = this.randomRanksTable[newIndex].rank;
    power.number = this.randomRanksTable[newIndex].rankNumber;
    char.boostApplied = true;
    char.logRoll(
        "Rank Boost",
        "Player Choice",
        power.name +
            ": " +
            this.randomRanksTable[currentIndex].rank +
            " -> " +
            power.rank,
    );
    return true;
};
