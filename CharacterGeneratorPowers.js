/**
 * CharacterGenerator — Powers.
 *
 * Power-count resolution, power generation, upgrades, bonus and
 * optional powers, UI option queries and simulation.
 * Methods are appended to CharacterGenerator.prototype; this file must
 * load after CharacterGenerator.js (it contains no class declaration).
 */

/**
 * Single source of truth for how a physical form's special abilities
 * shape the power count for a quantity row. Shared by
 * determineSpecialPowerAdjustment(), _simulateRolledPowers(),
 * getPowerSlotsAndCategories() and getTotalPowerCount() so the four can
 * never drift apart.
 *
 * Rule order: powersCountSet wins outright; otherwise
 * powersCountAdjustment (clamped to the table maximum) →
 * powersCountMinimum → powersCountMaximum.
 *
 * @param {object|null} physicalFormRow resolved form row (may be null)
 * @param {{powers: {initial: number, maximum: number}}} pQtyRow quantity row
 * @returns {{
 *   count: number,          // final power count
 *   max: number,            // powersMax after the same rules
 *   set: number,            // powersCountSet value, or -1 when absent
 *   adjustment: number,     // powersCountAdjustment value, or 0 when absent
 *   clamped: boolean,       // adjusted count exceeded the table maximum
 *   minimumApplied: number, // effective minimum applied, or -1 when absent
 *   maximumApplied: number, // effective maximum applied, or -1 when absent
 * }}
 */
CharacterGenerator.prototype._resolvePowerCounts = function (
    physicalFormRow,
    pQtyRow,
) {
    const result = {
        count: pQtyRow.powers.initial,
        max: pQtyRow.powers.maximum,
        set: -1,
        adjustment: 0,
        clamped: false,
        minimumApplied: -1,
        maximumApplied: -1,
    };
    if (!physicalFormRow) return result;

    let value = Utility.getValue(physicalFormRow, "powersCountSet", -1);
    if (value !== -1) {
        result.set = value;
        result.count = value;
        return result;
    }

    value = Utility.getValue(physicalFormRow, "powersCountAdjustment", 0);
    if (value !== 0) {
        result.adjustment = value;
        result.count += value;
        result.max += value;
    }
    if (result.count > pQtyRow.powers.maximum) {
        result.count = pQtyRow.powers.maximum;
        result.clamped = true;
    }

    value = Utility.getValue(physicalFormRow, "powersCountMinimum", -1);
    if (value !== -1 && value > result.count) {
        result.count = value;
        result.max = value;
        result.minimumApplied = value;
    }

    value = Utility.getValue(physicalFormRow, "powersCountMaximum", -1);
    if (value !== -1 && value < result.count) {
        result.count = value;
        result.max = value;
        result.maximumApplied = value;
    }

    return result;
};

CharacterGenerator.prototype.determineSpecialPowerAdjustment = function (
    physicalFormRow,
    char,
    pQtyRow,
) {
    const r = this._resolvePowerCounts(physicalFormRow, pQtyRow);

    if (r.set !== -1) {
        char.powersCount = r.set;
        char.state.powersCount.set = r.set;
        char.logRoll(
            "Power Slots",
            "Base Rules",
            `Powers Count Set: ${char.powersCount}`,
        );
        return true;
    }

    char.powersCount = r.count;
    char.powersMax = r.max;

    if (r.adjustment !== 0) {
        char.state.powersCount.adjustment = r.adjustment;
        char.logRoll(
            "Power Slots",
            "Base Rules",
            `Powers Count Adjusted by ${r.adjustment} to ${pQtyRow.powers.initial + r.adjustment}`,
        );
    }
    if (r.clamped) {
        char.logRoll(
            "Power Slots",
            "Base Rules",
            `Powers Count Adjusted (too high): ${pQtyRow.powers.maximum}`,
        );
    }
    if (r.minimumApplied !== -1) {
        char.state.powersCount.min = r.minimumApplied;
        char.logRoll(
            "Power Slots",
            "Base Rules",
            `Powers Count Minimum set to ${r.minimumApplied}`,
        );
    }
    if (r.maximumApplied !== -1) {
        char.state.powersCount.max = r.maximumApplied;
        char.logRoll(
            "Power Slots",
            "Base Rules",
            `Powers Count Maximum set to ${r.maximumApplied}`,
        );
    }

    return false;
};

CharacterGenerator.prototype.isPowerAlreadyAssigned = function (
    powers,
    powerRow,
) {
    if (powerRow === undefined || powerRow === null) return false;
    if (this._assignedPowerNames)
        return this._assignedPowerNames.has(powerRow.name);
    // Fallback: linear scan (skip sparse holes from skipped entries)
    for (let index = 0; index < powers.length; index++) {
        if (powers[index] && powers[index].name === powerRow.name) return true;
    }
    return false;
};

/** Safely read powerCount from a power/talent entry, defaulting to 1. */
CharacterGenerator._safeSlotCount = function (obj) {
    return Utility.getValue(obj, "powerCount", 1) || 1;
};

/** Check if there are remaining power slots for another power. */
CharacterGenerator._hasRemainingSlots = function (char, slotsNeeded) {
    const currentSlots = char.powers.reduce(
        (sum, p) => sum + (p.powerSlots || 1),
        0,
    );
    return currentSlots + slotsNeeded <= char.powersMax;
};

CharacterGenerator._parseUpgradePower = function (upgradePowerString) {
    return Utility.parseDslUpgrade(upgradePowerString);
};

CharacterGenerator.prototype.canUpgradePower = function (
    char,
    powerIndex,
    upgradeInfo,
) {
    if (powerIndex < 0 || powerIndex >= char.powers.length) {
        return {
            allowed: false,
            reason: "Invalid power index.",
            needsSwap: false,
            slotsNeeded: 0,
            originalSlots: 0,
            upgradeSlots: 0,
        };
    }

    const originalPower = char.powers[powerIndex];
    const upgradeRow = this.powerListTable.find(
        (r) =>
            r.category === upgradeInfo.category &&
            r.name === upgradeInfo.powerName,
    );
    if (!upgradeRow) {
        return {
            allowed: false,
            reason: `Upgrade power "${upgradeInfo.powerName}" not found in ${upgradeInfo.category}.`,
            needsSwap: false,
            slotsNeeded: 0,
            originalSlots: 0,
            upgradeSlots: 0,
        };
    }

    // Check if this is a duplicate (already has the power from a prior upgrade)
    const alreadyHasDuplicate = char.powers.some(
        (p, i) => i !== powerIndex && p.name === upgradeInfo.powerName,
    );
    const upgradeSlots = alreadyHasDuplicate
        ? Utility.getValue(
              upgradeRow,
              "duplicateCost",
              CharacterGenerator._safeSlotCount(upgradeRow),
          )
        : CharacterGenerator._safeSlotCount(upgradeRow);
    const originalSlots = originalPower.powerSlots || 1;
    const slotsNeeded = upgradeSlots - originalSlots;

    // Determine if there's enough room without swapping
    let needsSwap = false;
    if (slotsNeeded > 0) {
        if (!CharacterGenerator._hasRemainingSlots(char, slotsNeeded)) {
            needsSwap = true;
        }
    }

    const allowDuplicate = Utility.getValue(
        upgradeRow,
        "allowDuplicate",
        false,
    );
    if (!allowDuplicate) {
        const alreadyAssigned = char.powers.some(
            (p, i) => i !== powerIndex && p.name === upgradeInfo.powerName,
        );
        if (alreadyAssigned) {
            return {
                allowed: false,
                reason: `"${upgradeInfo.powerName}" is already assigned and does not allow duplicates.`,
                needsSwap: false,
                slotsNeeded,
                originalSlots,
                upgradeSlots,
            };
        }
    }

    return {
        allowed: true,
        reason: "",
        needsSwap,
        slotsNeeded,
        originalSlots,
        upgradeSlots,
    };
};

CharacterGenerator.prototype.applyPowerUpgrade = function (
    char,
    powerIndex,
    upgradeInfo,
) {
    const check = this.canUpgradePower(char, powerIndex, upgradeInfo);
    if (!check.allowed) return false;

    const originalPower = char.powers[powerIndex];
    const upgradeRow = this.powerListTable.find(
        (r) =>
            r.category === upgradeInfo.category &&
            r.name === upgradeInfo.powerName,
    );

    // Determine if this is a duplicate (already has the power)
    const existingIndex = char.powers.findIndex(
        (p, i) => i !== powerIndex && p.name === upgradeInfo.powerName,
    );
    const isDuplicate = existingIndex !== -1;

    // Determine slot count: duplicate uses duplicateCost if available
    let upgradeSlots;
    if (isDuplicate) {
        upgradeSlots = Utility.getValue(
            upgradeRow,
            "duplicateCost",
            CharacterGenerator._safeSlotCount(upgradeRow),
        );
    } else {
        upgradeSlots = CharacterGenerator._safeSlotCount(upgradeRow);
    }

    const rankRoll = this.powerRankRolls[powerIndex];
    const powerRankColumn = this.generatorMode === "basic" ? 1 : 4;
    let rankRow = Utility.findRow(this, rankRoll, powerRankColumn);
    if (!rankRow) rankRow = this.randomRanksTable[0];

    const physicalFormRow = this.physicalFormTable.find(
        (r) => r.name === char.physicalForm,
    );
    let value = Utility.getValue(physicalFormRow, "allPowersRankAdjustment", 0);
    if (value !== 0) {
        const rank = this.getAbilityAfterModifier(
            char,
            "Power Rank",
            rankRow.rank,
            value,
            -1,
            -1,
        );
        rankRow = this.randomRanksTable.find((r) => r.rank === rank);
    }

    // Build upgraded power entry
    const upgradedPower = {
        name: upgradeRow.name,
        code: upgradeRow.code,
        category: upgradeInfo.category,
        description: upgradeRow.description,
        rank: rankRow.rank,
        number: rankRow.rankNumber,
        powerSlots: upgradeSlots,
        upgradedFrom: originalPower.name,
        upgradeCondition: upgradeInfo.condition,
    };

    // Replace the original power
    char.powers[powerIndex] = upgradedPower;

    // Handle allowDuplicate: if true and duplicate, keep the original in the set
    const allowDuplicate = Utility.getValue(
        upgradeRow,
        "allowDuplicate",
        false,
    );
    if (!allowDuplicate) {
        // Remove original from assigned set, add upgraded
        if (this._assignedPowerNames) {
            this._assignedPowerNames.delete(originalPower.name);
            this._assignedPowerNames.add(upgradeRow.name);
        }
    }

    char.logRoll(
        "Power Upgrade",
        `${upgradeInfo.category}/${upgradeInfo.powerName}`,
        `${originalPower.name} -> ${upgradeRow.name} (${rankRow.rank})` +
            (upgradeInfo.condition ? ` [${upgradeInfo.condition}]` : ""),
    );

    return true;
};

CharacterGenerator.prototype.getUpgradeOption = function (powerIndex, char) {
    const upgrades =
        (char && char._pendingPowerUpgrades) ||
        this._pendingPowerUpgrades ||
        [];
    const pending = upgrades.find((u) => u.powerIndex === powerIndex);
    if (!pending) return null;

    const originalPower = char.powers[powerIndex];
    const check = this.canUpgradePower(char, powerIndex, pending.upgradeInfo);
    const upgradeRow = this.powerListTable.find(
        (r) =>
            r.category === pending.upgradeInfo.category &&
            r.name === pending.upgradeInfo.powerName,
    );

    return {
        powerIndex: powerIndex,
        originalPower: originalPower,
        upgradeInfo: pending.upgradeInfo,
        upgradePower: upgradeRow,
        canUpgrade: check.allowed,
        reason: check.reason,
        needsSwap: check.needsSwap,
        slotsNeeded: check.slotsNeeded,
        originalSlots: check.originalSlots,
        upgradeSlots: check.upgradeSlots,
    };
};

CharacterGenerator.prototype.removePower = function (char, powerIndex) {
    if (powerIndex < 0 || powerIndex >= char.powers.length) return false;
    const removed = char.powers.splice(powerIndex, 1);
    if (removed.length > 0 && this._assignedPowerNames) {
        this._assignedPowerNames.delete(removed[0].name);
    }
    // Update pending upgrade indices that point to powers after the removed one
    if (this._pendingPowerUpgrades) {
        this._pendingPowerUpgrades = this._pendingPowerUpgrades.filter(
            (u) => u.powerIndex !== powerIndex,
        );
        for (const u of this._pendingPowerUpgrades) {
            if (u.powerIndex > powerIndex) u.powerIndex--;
        }
    }
    return true;
};

/**
 * Resolve the rank row for a generated power: mode column roll plus the
 * physical form's allPowersRankAdjustment. Shared by both
 * generateSinglePower paths (Choose mode and rolled mode).
 */
CharacterGenerator.prototype._resolvePowerRank = function (
    char,
    powerRollIndex,
) {
    const rankRoll = this.powerRankRolls[powerRollIndex];
    const powerRankColumn = this.generatorMode === "basic" ? 1 : 4;
    let rankRow = Utility.findRow(this, rankRoll, powerRankColumn);
    const physicalFormRow = this.physicalFormTable.find(
        (r) => r.name === char.physicalForm,
    );
    const value = Utility.getValue(
        physicalFormRow,
        "allPowersRankAdjustment",
        0,
    );
    if (value !== 0) {
        if (!char.state.powersRankAdjustment)
            char.state.powersRankAdjustment = value;
        const rank = this.getAbilityAfterModifier(
            char,
            "Power Rank",
            rankRow.rank,
            value,
            -1,
            -1,
        );
        rankRow = this.randomRanksTable.find((r) => r.rank === rank);
    }
    return rankRow;
};

/**
 * Assemble extraInformation for a generated power: rollExtraInformation
 * lookups (string or array) plus Ritual expansion. Shared by both
 * generateSinglePower paths.
 */
CharacterGenerator.prototype._buildPowerExtraInformation = function (powerRow) {
    let extraInformation = "";
    const value = Utility.getValue(powerRow, "rollExtraInformation", "");
    if (value === "") return extraInformation;
    if (Array.isArray(value)) {
        for (let reiIndex = 0; reiIndex < value.length; reiIndex++) {
            extraInformation += this.getExtraInformation(value[reiIndex]);
        }
    } else {
        extraInformation += this.getExtraInformation(value);
    }
    if (
        extraInformation.indexOf(
            "Ritual/This is a combination of the following Mechanisms into a compound Mechanism.",
        ) !== -1
    ) {
        extraInformation =
            extraInformation.trim() +
            " " +
            this.getRitualRollsExtraInformation();
    }
    return extraInformation;
};

/**
 * Shared tail of generateSinglePower(): push the resolved power, record
 * it, log the generation line, then run the upgrade / bonus / optional
 * power chaining. Identical for Choose mode and rolled mode — only the
 * two log strings differ.
 */
CharacterGenerator.prototype._addPowerAndChain = function (
    char,
    category,
    powerRow,
    rankRow,
    logRoll,
    logResult,
) {
    char.powers.push({
        name: powerRow.name,
        code: powerRow.code,
        category: category,
        description: powerRow.description,
        rank: rankRow.rank,
        number: rankRow.rankNumber,
        powerSlots: CharacterGenerator._safeSlotCount(powerRow),
        extraInformation: this._buildPowerExtraInformation(powerRow),
    });
    if (this._assignedPowerNames) this._assignedPowerNames.add(powerRow.name);
    char.logRoll("Power Gen", logRoll, logResult);

    // Check for upgradePower option
    let value = Utility.getValue(powerRow, "upgradePower", "");
    if (value !== "" && this._pendingPowerUpgrades) {
        const upgradeInfo = CharacterGenerator._parseUpgradePower(value);
        if (upgradeInfo) {
            this._pendingPowerUpgrades.push({
                powerIndex: char.powers.length - 1,
                upgradeInfo: upgradeInfo,
            });
        }
    }

    value = Utility.getValue(powerRow, "bonusPowerCount", 0);
    if (value > 0) {
        if (
            this._selectedBonusPowers &&
            this._selectedBonusPowers[powerRow.name]
        ) {
            this.applySelectedBonusPower(
                char,
                this._selectedBonusPowers[powerRow.name],
            );
        } else {
            this.generateBonusPower(char, powerRow.bonusPower);
        }
    }

    if (this.applyOptionalPowers) {
        value = Utility.getValue(powerRow, "optionalPowers", "");
        if (value !== "") {
            // Use optionalPowerCount if set, else optionalPowersMax, else default to 1
            value = Utility.getValue(
                powerRow,
                "optionalPowerCount",
                Utility.getValue(
                    powerRow,
                    "optionalPowersMax",
                    value ? 1 : 100,
                ),
            );
            this.generateOptionalPower(
                char,
                value,
                powerRow.optionalPowers,
                powerRow.name,
            );
        }
    }
};

CharacterGenerator.prototype.generateSinglePower = function (
    char,
    powerRollIndex,
) {
    const currentSlots = char.powers
        .map((p) => p.powerSlots)
        .reduce((acc, value) => acc + value, 0);
    const remainingSlots = char.powersCount - currentSlots;
    if (remainingSlots <= 0) {
        char.logRoll("Power Gen", "Base Rules", "No remaining slots");
        return;
    }

    // 0. Use pre-selected power if available (Choose mode)
    if (this._preSelectedPowers && this._preSelectedPowers[powerRollIndex]) {
        const preSelected = this._preSelectedPowers[powerRollIndex];
        let category = preSelected.category;
        let powerRow = this.powerListTable.find(
            (r) => r.category === category && r.name === preSelected.powerName,
        );
        if (!powerRow) {
            char.logRoll(
                "Power Gen",
                "Choose Mode",
                `Pre-selected power not found: ${category}/${preSelected.powerName}`,
            );
            // Fall through to normal roll logic
        } else {
            const rankRoll = this.powerRankRolls[powerRollIndex];
            const rankRow = this._resolvePowerRank(char, powerRollIndex);
            this._addPowerAndChain(
                char,
                category,
                powerRow,
                rankRow,
                `Choose: ${rankRoll}`,
                `${category}: ${powerRow.name} (${rankRow.rank})`,
            );
            return;
        }
    }

    // 1. Roll Category
    let catRoll = this.powerCategoryRolls[powerRollIndex];
    if (catRoll < 1 || catRoll > 100) {
        char.logRoll("Power Gen", `Invalid Category Roll`, `Roll: ${catRoll}`);
        return;
    }
    const pcCatRow = this.powerCategoriesTable.find(
        (c) => catRoll <= c.maxRoll,
    );
    if (!pcCatRow) return;
    let category = pcCatRow.name;

    // 2. Pick Power from Category
    let powerRoll = this.powerRolls[powerRollIndex];
    let indexAdjustment = 1;
    while (powerRoll > 100) {
        powerRoll = this.powerRolls[powerRollIndex + indexAdjustment];
        indexAdjustment++;
        if (powerRollIndex + indexAdjustment >= this.rollArraySize) {
            char.logRoll(
                "Power Gen",
                `No Valid Power Found`,
                `Exhausted array at index ${powerRollIndex}`,
            );
            return;
        }
    }
    let powerRow = this.powerListTable.find(
        (r) => r.category === category && powerRoll <= r.maxRoll,
    );

    // 3. Skip duplicates — first try same category with higher maxRoll
    if (
        powerRow !== undefined &&
        this.isPowerAlreadyAssigned(char.powers, powerRow)
    ) {
        char.logRoll("Power Gen", `Duplicate Power`, `Power: ${powerRow.name}`);
        const categoryPowers = this._powerCategoryMap[category] || [];
        const currentMaxRoll = powerRow.maxRoll;
        let found = false;
        for (const p of categoryPowers) {
            if (
                p.maxRoll > currentMaxRoll &&
                p.maxRoll <= 100 &&
                !this.isPowerAlreadyAssigned(char.powers, p)
            ) {
                powerRow = p;
                found = true;
                break;
            }
        }
        if (!found) {
            // Category exhausted — fall back to cross-category shift
            indexAdjustment = 1;
            while (indexAdjustment <= 20) {
                const nextIndex = powerRollIndex + indexAdjustment;
                if (nextIndex >= this.rollArraySize) break;
                catRoll = this.powerCategoryRolls[nextIndex];
                if (catRoll < 1 || catRoll > 100) {
                    indexAdjustment++;
                    continue;
                }
                const catEntry = this.powerCategoriesTable.find(
                    (c) => catRoll <= c.maxRoll,
                );
                if (!catEntry) {
                    indexAdjustment++;
                    continue;
                }
                category = catEntry.name;
                powerRoll = this.powerRolls[nextIndex];
                if (powerRoll > 100) {
                    indexAdjustment++;
                    continue;
                }
                powerRow = this.powerListTable.find(
                    (r) => r.category === category && powerRoll <= r.maxRoll,
                );
                if (
                    powerRow !== undefined &&
                    !this.isPowerAlreadyAssigned(char.powers, powerRow)
                )
                    break;
                indexAdjustment++;
            }
            if (
                powerRow === undefined ||
                this.isPowerAlreadyAssigned(char.powers, powerRow)
            ) {
                char.logRoll(
                    "Power Gen",
                    `No Valid Power Found`,
                    `Exhausted retries at index ${powerRollIndex}`,
                );
                return;
            }
        }
    } else if (powerRow === undefined) {
        // Roll didn't match any power — scan same category, then cross-category
        const categoryPowers = this._powerCategoryMap[category] || [];
        let found = false;
        for (const p of categoryPowers) {
            if (
                p.maxRoll <= 100 &&
                !this.isPowerAlreadyAssigned(char.powers, p)
            ) {
                powerRow = p;
                found = true;
                break;
            }
        }
        if (!found) {
            indexAdjustment = 1;
            while (indexAdjustment <= 20) {
                const nextIndex = powerRollIndex + indexAdjustment;
                if (nextIndex >= this.rollArraySize) break;
                catRoll = this.powerCategoryRolls[nextIndex];
                if (catRoll < 1 || catRoll > 100) {
                    indexAdjustment++;
                    continue;
                }
                const catEntry = this.powerCategoriesTable.find(
                    (c) => catRoll <= c.maxRoll,
                );
                if (!catEntry) {
                    indexAdjustment++;
                    continue;
                }
                category = catEntry.name;
                powerRoll = this.powerRolls[nextIndex];
                if (powerRoll > 100) {
                    indexAdjustment++;
                    continue;
                }
                powerRow = this.powerListTable.find(
                    (r) => r.category === category && powerRoll <= r.maxRoll,
                );
                if (
                    powerRow !== undefined &&
                    !this.isPowerAlreadyAssigned(char.powers, powerRow)
                )
                    break;
                indexAdjustment++;
            }
            if (
                powerRow === undefined ||
                this.isPowerAlreadyAssigned(char.powers, powerRow)
            ) {
                char.logRoll(
                    "Power Gen",
                    `No Valid Power Found`,
                    `Exhausted retries at index ${powerRollIndex}`,
                );
                return;
            }
        }
    }

    const powerCount = Utility.getValue(powerRow, "powerCount", 1);
    while (
        powerCount > remainingSlots &&
        currentSlots + powerCount > char.powersMax &&
        !this.isPowerAlreadyAssigned(char.powers, powerRow)
    ) {
        char.logRoll("Power Gen", `Too Many Powers`, `Power: ${powerRow.name}`);
        const nextIndex = powerRollIndex + indexAdjustment;
        if (nextIndex >= this.rollArraySize) {
            char.logRoll(
                "Power Gen",
                `No Valid Power Found`,
                `Exhausted array at index ${powerRollIndex}`,
            );
            return;
        }
        catRoll = this.powerCategoryRolls[nextIndex];
        if (catRoll < 1 || catRoll > 100) {
            indexAdjustment++;
            continue;
        }
        const catEntry = this.powerCategoriesTable.find(
            (c) => catRoll <= c.maxRoll,
        );
        if (!catEntry) {
            indexAdjustment++;
            continue;
        }
        category = catEntry.name;
        powerRoll = this.powerRolls[nextIndex];
        if (powerRoll > 100) {
            indexAdjustment++;
            continue;
        }
        powerRow = this.powerListTable.find(
            (r) => r.category === category && powerRoll <= r.maxRoll,
        );
        indexAdjustment++;
        if (indexAdjustment > 20) {
            char.logRoll(
                "Power Gen",
                `No Valid Power Found`,
                `Exhausted retries at index ${powerRollIndex}`,
            );
            return;
        }
    }

    // The loop above can also exit because the candidate is a duplicate or
    // because a roll miss left powerRow undefined — neither is safe to add
    // (a duplicate push also breaks the powersMax slot budget). Bail the
    // same way the scan branches above do.
    if (
        powerRow === undefined ||
        this.isPowerAlreadyAssigned(char.powers, powerRow)
    ) {
        char.logRoll(
            "Power Gen",
            `No Valid Power Found`,
            `Exhausted retries at index ${powerRollIndex}`,
        );
        return;
    }

    // 3. Determine Rank
    // Power ranks: Column 1 for Basic (Basic rules p40), Column 4 for Advanced/Ultimate
    const rankRoll = this.powerRankRolls[powerRollIndex];
    const rankRow = this._resolvePowerRank(char, powerRollIndex);
    this._addPowerAndChain(
        char,
        category,
        powerRow,
        rankRow,
        `${catRoll}/${powerRoll}/${rankRoll}`,
        `${category}: ${powerRow.name} (${rankRow.rank})`,
    );
};

CharacterGenerator.prototype.getRitualRollsExtraInformation = function () {
    let returnValue = "";

    const table = RITUAL_ROLLS_TABLE;
    const thisRoll = this.powersExtraInfoRolls[this.peiIndex];
    const ritualRolls = table.find((f) => thisRoll <= f.maxRoll);
    this.peiIndex++;
    if (!ritualRolls) return returnValue;

    returnValue += ` RITUALS (${ritualRolls.mechanismCount}): `;

    const mechTable = MAGIC_MECHANISM_TABLE;
    for (let index = 0; index < ritualRolls.mechanismCount; index++) {
        // Skip rolls outside the mechanism table's range (1-84), bounded
        // by the roll array so exhausted rolls can't read undefined.
        while (
            this.peiIndex < this.powersExtraInfoRolls.length &&
            this.powersExtraInfoRolls[this.peiIndex] > 84
        ) {
            this.peiIndex++;
        }
        if (this.peiIndex >= this.powersExtraInfoRolls.length) break;
        const mechRoll = this.powersExtraInfoRolls[this.peiIndex];
        this.peiIndex++;
        const mechForm = mechTable.find((f) => mechRoll <= f.maxRoll);
        if (!mechForm) continue;
        returnValue += mechForm.name + "/" + mechForm.description + " ";
    }

    return returnValue.trim();
};

CharacterGenerator.prototype.getExtraInformation = function (value) {
    let returnValue = "";

    const table = EXTRA_TABLES[value];
    const thisRoll = this.powersExtraInfoRolls[this.peiIndex];
    const form = table.find((f) => thisRoll <= f.maxRoll);

    if (form === undefined) {
        return returnValue;
    }
    returnValue = form.name + "/" + form.description;
    this.peiIndex++;

    return returnValue;
};

CharacterGenerator.prototype.generatorBonusPowerOfPhysicalForm = function (
    char,
    bonusPowerString,
    slotIndex,
) {
    // If user selected a bonus power for this slot, use it directly
    if (
        this._selectedBonusPowers &&
        slotIndex !== undefined &&
        this._selectedBonusPowers[slotIndex]
    ) {
        const sel = this._selectedBonusPowers[slotIndex];
        // sel may be a single object or an array of objects
        const picks = Array.isArray(sel) ? sel : [sel];
        for (const pick of picks) {
            const p = this.powerListTable.find(
                (c) => c.category === pick.category && c.name === pick.name,
            );
            if (p) {
                const bonusPowerRankColumn =
                    this.generatorMode === "basic" ? 1 : 3;
                const rankRoll = this.powerRankRolls[char.powers.length];
                const rankRow = Utility.findRow(
                    this,
                    rankRoll,
                    bonusPowerRankColumn,
                );
                if (
                    rankRow &&
                    CharacterGenerator._hasRemainingSlots(
                        char,
                        CharacterGenerator._safeSlotCount(p),
                    )
                ) {
                    char.powers.push({
                        category: p.category,
                        name: p.name,
                        code: p.code,
                        description: p.description,
                        rank: rankRow.rank,
                        number: rankRow.rankNumber,
                        powerSlots: CharacterGenerator._safeSlotCount(p),
                        bonusPower: true,
                    });
                    if (this._assignedPowerNames)
                        this._assignedPowerNames.add(p.name);
                    char.logRoll(
                        "Bonus Power Gen",
                        "Selected",
                        `${p.category}: ${p.name} (${rankRow.rank})`,
                    );
                }
            }
        }
        return;
    }

    // Fall through to rolling logic
    let indexAdjustment = 0;
    const powers = Utility.splitDslList(bonusPowerString);
    let powersToPickFrom = [];

    for (let index = 0; index < powers.length; index++) {
        const spec = Utility.parseDslEntry(powers[index], {
            subTypePrefix: true,
        });
        const subType = spec.subType;

        const category = spec.category;
        let name = spec.name;
        const assignedRank = spec.rank;
        const roll = spec.maxRoll;

        if (name === "Any") {
            // Scan forward for an unassigned power in this category.
            // Bounded by the roll array — skip this option instead of
            // reading undefined when rolls run out or every power in the
            // category is already assigned.
            let anyName = null;
            for (
                let scan = char.powers.length + indexAdjustment;
                scan < this.rollArraySize && anyName === null;
                scan++
            ) {
                const thisRoll = this.powerRolls[scan];
                const p =
                    thisRoll !== undefined && thisRoll <= 100
                        ? this.powerListTable.find(
                              (c) =>
                                  c.category === category &&
                                  thisRoll <= c.maxRoll,
                          )
                        : null;
                if (
                    !p ||
                    this.isPowerAlreadyAssigned(char.powers, p) ||
                    this.isPowerAlreadyAssigned(powersToPickFrom, p)
                ) {
                    indexAdjustment++;
                    continue;
                }
                anyName = p.name;
            }
            if (anyName === null) {
                char.logRoll(
                    "Bonus Power Gen",
                    `No Valid Power`,
                    `Category ${category}: no unassigned power available`,
                );
                continue;
            }
            name = anyName;
        }

        let addThisPower = true;
        if (
            char.subType !== null &&
            char.subType !== "" &&
            subType !== null &&
            subType !== "" &&
            char.subType !== subType
        ) {
            addThisPower = false;
        }

        if (addThisPower) {
            powersToPickFrom[powersToPickFrom.length] = {
                category: category,
                name: name,
                maxRoll: roll,
                rank: assignedRank,
            };
        }
    }

    const startIndex = char.powers.length;
    let roll = this.powerRolls[startIndex];
    while (roll > 100) {
        roll = this.powerRolls[startIndex + indexAdjustment];
        indexAdjustment++;
    }

    const power = powersToPickFrom.find((c) => roll <= c.maxRoll);
    if (!power) return;

    const p = this.powerListTable.find(
        (c) => c.category === power.category && c.name === power.name,
    );
    if (!p) return;

    const bonusPowerRankColumn = this.generatorMode === "basic" ? 1 : 3;
    const rankRoll =
        power.rank === null ? this.powerRankRolls[startIndex] : null;
    const rankRow =
        power.rank === null
            ? Utility.findRow(this, rankRoll, bonusPowerRankColumn)
            : this.randomRanksTable.find((r) => r.rank === power.rank);
    if (!rankRow) return;

    const rankNumber = rankRow.rankNumber;

    char.logRoll(
        "Bonus Power Gen",
        `Base Rules: ${roll}/${rankRow.rankNumber}`,
        `${power.category}: ${p.name} (${rankRow.rank})`,
    );

    const bonusSlotCount = CharacterGenerator._safeSlotCount(p);
    if (CharacterGenerator._hasRemainingSlots(char, bonusSlotCount)) {
        char.powers.push({
            category: p.category,
            name: p.name,
            code: p.code,
            description: p.description,
            rank: rankRow.rank,
            number: rankNumber,
            powerSlots: bonusSlotCount,
            bonusPower: true,
        });
        if (this._assignedPowerNames) this._assignedPowerNames.add(p.name);
    }
};

/**
 * Apply a user-selected bonus power from the selection dialog.
 * @param {Character} char
 * @param {{ category: string, name: string }} selection
 */
CharacterGenerator.prototype.applySelectedBonusPower = function (
    char,
    selection,
) {
    if (!selection) return;
    // selection may be a single object or an array of objects
    const picks = Array.isArray(selection) ? selection : [selection];
    for (const pick of picks) {
        if (!pick || !pick.name) continue;
        const p = this.powerListTable.find(
            (c) => c.category === pick.category && c.name === pick.name,
        );
        if (!p) continue;

        const startIndex = char.powers.length;
        let roll = this.powerRolls[startIndex];
        let indexAdjustment = 1;
        while (roll > 100) {
            roll = this.powerRolls[startIndex + indexAdjustment];
            indexAdjustment++;
        }

        const bonusPowerRankColumn = this.generatorMode === "basic" ? 1 : 3;
        const rankRoll = this.powerRankRolls[startIndex];
        const rankRow = Utility.findRow(this, rankRoll, bonusPowerRankColumn);
        if (!rankRow) continue;
        char.logRoll(
            "Bonus Power Select",
            "Player Choice",
            p.category + ": " + p.name + " (" + rankRow.rank + ")",
        );

        const bonusSlotCount = CharacterGenerator._safeSlotCount(p);
        if (
            CharacterGenerator._hasRemainingSlots(char, bonusSlotCount) &&
            !this.isPowerAlreadyAssigned(char.powers, p)
        ) {
            char.powers.push({
                category: p.category,
                name: p.name,
                code: p.code,
                description: p.description,
                rank: rankRow.rank,
                number: rankRow.rankNumber,
                powerSlots: bonusSlotCount,
                bonusPower: true,
            });
            if (this._assignedPowerNames) this._assignedPowerNames.add(p.name);
        }
    }
};

CharacterGenerator.prototype.generateBonusPower = function (
    char,
    bonusPowerString,
) {
    const powers = Utility.splitDslList(bonusPowerString);
    for (let index = 0; index < powers.length; index++) {
        const spec = Utility.parseDslEntry(powers[index]);

        powers[index] = {
            category: spec.category,
            name: spec.name,
            maxRoll: spec.maxRoll,
        };
    }

    const startIndex = char.powers.length;
    let roll = this.powerRolls[startIndex];
    let indexAdjustment = 1;
    while (roll > 100) {
        roll = this.powerRolls[startIndex + indexAdjustment];
        indexAdjustment++;
    }

    const power = powers.find((c) => roll <= c.maxRoll);
    if (!power) return;

    const p = this.powerListTable.find(
        (c) => c.category === power.category && c.name === power.name,
    );
    if (!p) return;

    const bonusPowerRankColumn = this.generatorMode === "basic" ? 1 : 3;
    const rankRoll = this.powerRankRolls[startIndex];
    const rankRow = Utility.findRow(this, rankRoll, bonusPowerRankColumn);
    if (!rankRow) return;

    const rankNumber = rankRow.rankNumber;

    char.logRoll(
        "Bonus Power Gen",
        `Base Rules: ${roll}/${rankRow.rankNumber}`,
        `${power.category}: ${p.name} (${rankRow.rank})`,
    );

    const bonusSlotCount2 = CharacterGenerator._safeSlotCount(p);
    if (
        CharacterGenerator._hasRemainingSlots(char, bonusSlotCount2) &&
        !this.isPowerAlreadyAssigned(char.powers, p)
    ) {
        char.powers.push({
            category: p.category,
            name: p.name,
            code: p.code,
            description: p.description,
            rank: rankRow.rank,
            number: rankNumber,
            powerSlots: bonusSlotCount2,
            bonusPower: true,
        });
        if (this._assignedPowerNames) this._assignedPowerNames.add(p.name);
    }
};

CharacterGenerator.prototype.generateOptionalPower = function (
    char,
    maxNumber,
    optionalPowersString,
    sourcePowerName,
) {
    // This will work sort of like the bonus.  Except it will fill up any power slots using optional powers
    // This means we aren't rolling to determine which optional power, but we will roll for the rank.

    // If manual selection is active, only apply user-selected optional powers for this source
    if (
        this.selectOptionalPowersManually &&
        this._selectedOptionalPowers &&
        sourcePowerName
    ) {
        const selected = this._selectedOptionalPowers[sourcePowerName];
        if (!selected || selected.length === 0) return; // User selected none for this source
        // Track that this source has been processed
        if (!this._processedOptionalSources)
            this._processedOptionalSources = new Set();
        this._processedOptionalSources.add(sourcePowerName);
        // Rebuild potentialPowers from selections only
        const potentialPowers = [];
        for (let i = 0; i < selected.length; i++) {
            potentialPowers.push({
                category: selected[i].category,
                name: selected[i].name,
            });
        }
        const startIndex = char.powers.length;
        let roll = this.powerRolls[startIndex];
        let indexAdjustment = 0;
        while (roll > 100) {
            roll = this.powerRolls[startIndex + indexAdjustment];
            indexAdjustment++;
        }
        const maxCount = Math.min(maxNumber, potentialPowers.length);
        for (let index = 0; index < maxCount; index++) {
            const power = potentialPowers[index];
            let p = this.powerListTable.find(
                (c) => c.category === power.category && c.name === power.name,
            );
            // Handle "Any" — roll for a random power in the category
            if (!p && power.name === "Any") {
                let pRoll = this.powerRolls[startIndex + index];
                let adj = 1;
                while (pRoll > 100) {
                    pRoll = this.powerRolls[startIndex + index + adj];
                    adj++;
                }
                p = this.powerListTable.find(
                    (c) => c.category === power.category && pRoll <= c.maxRoll,
                );
            }
            if (!p) continue;
            const optionalPowerRankColumn =
                this.generatorMode === "basic" ? 1 : 3;
            const rankRoll = this.powerRankRolls[startIndex + index];
            const rankRow = Utility.findRow(
                this,
                rankRoll,
                optionalPowerRankColumn,
            );
            if (!rankRow) continue;
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
                    rank: rankRow.rank,
                    number: rankRow.rankNumber,
                    powerSlots: optSlotCount,
                    optionalPower: true,
                });
                if (this._assignedPowerNames)
                    this._assignedPowerNames.add(p.name);
            }
        }
        return;
    }

    let indexAdjustment = 0;
    let potentialPowers = [];
    const powers = Utility.splitDslList(optionalPowersString);
    for (let index = 0; index < powers.length; index++) {
        // "~" alternatives — pick via Dice, not Math.random, so seeded
        // runs stay reproducible
        const thisPowerString = Utility.pickDslAlternative(powers[index]);

        const spec = Utility.parseDslEntry(thisPowerString);
        if (spec.segments.length < 2) continue;
        const category = spec.category;
        let name = spec.name;

        if (name === "Any") {
            // Same bounded scan as the bonus-power path: resolve "Any" to
            // an unassigned power, or skip this option cleanly.
            let anyName = null;
            for (
                let scan = char.powers.length + indexAdjustment;
                scan < this.rollArraySize && anyName === null;
                scan++
            ) {
                const thisRoll = this.powerRolls[scan];
                const p =
                    thisRoll !== undefined && thisRoll <= 100
                        ? this.powerListTable.find(
                              (c) =>
                                  c.category === category &&
                                  thisRoll <= c.maxRoll,
                          )
                        : null;
                if (
                    !p ||
                    this.isPowerAlreadyAssigned(char.powers, p) ||
                    this.isPowerAlreadyAssigned(potentialPowers, p)
                ) {
                    indexAdjustment++;
                    continue;
                }
                anyName = p.name;
            }
            if (anyName === null) {
                char.logRoll(
                    "Optional Power Gen",
                    `No Valid Power`,
                    `Category ${category}: no unassigned power available`,
                );
                continue;
            }
            name = anyName;
        }

        potentialPowers[index] = {
            category: category,
            name: name,
        };
    }

    const startIndex = char.powers.length;
    let roll = this.powerRolls[startIndex];
    while (roll > 100) {
        roll = this.powerRolls[startIndex + indexAdjustment];
        indexAdjustment++;
    }

    maxNumber = Math.min(maxNumber, potentialPowers.length);
    for (let index = 0; index < maxNumber; index++) {
        const power = potentialPowers[index];
        // Sparse-safe: entries can be missing (empty "|" part, or an
        // "Any" entry with no unassigned power available)
        if (!power) continue;
        const p = this.powerListTable.find(
            (c) => c.category === power.category && c.name === power.name,
        );
        if (!p) continue;

        const optionalPowerRankColumn = this.generatorMode === "basic" ? 1 : 3;
        const rankRoll = this.powerRankRolls[startIndex];
        const rankRow = Utility.findRow(
            this,
            rankRoll,
            optionalPowerRankColumn,
        );
        if (!rankRow) continue;

        const rankNumber = rankRow.rankNumber;

        char.logRoll(
            "Optional Power Gen",
            `Base Rules: ${roll}/${rankRow.rankNumber}`,
            `${power.category}: ${p.name} (${rankRow.rank})`,
        );

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
                rank: rankRow.rank,
                number: rankNumber,
                powerSlots: optSlotCount,
                optionalPower: true,
            });
            if (this._assignedPowerNames) this._assignedPowerNames.add(p.name);
        }
    }
};

CharacterGenerator.parseBonusPowerOptions = function (bonusPowerString) {
    return Utility.parseDslList(bonusPowerString, {
        subTypePrefix: true,
    }).map(function (entry) {
        return {
            category: entry.category,
            name: entry.name,
            maxRoll: entry.maxRoll,
        };
    });
};

CharacterGenerator.prototype._simulateRolledPowers = function () {
    const rolled = new Set();
    if (
        !this.powerListTable ||
        !this.powerCategoriesTable ||
        !this.quantityTable
    )
        return rolled;

    // Determine how many powers to roll — must match determineSpecialPowerAdjustment()
    const pRoll = Math.max(1, Math.min(100, this.powerNumberRoll || 1));
    const pQtyRow = this.quantityTable.find((o) => pRoll <= o.maxRoll);
    if (!pQtyRow) return rolled;
    const physicalFormRow = this.physicalFormTable.find(
        (r) => r.name === this._lastPhysicalForm,
    );
    // Shared count rules — see _resolvePowerCounts()
    let powersCount = this._resolvePowerCounts(physicalFormRow, pQtyRow).count;
    if (physicalFormRow) {
        // Account for bonus power slot consumption — bonus powers are
        // generated before the regular power loop and consume slots
        const bonusCount = Utility.getValue(
            physicalFormRow,
            "bonusPowerCount",
            0,
        );
        if (bonusCount > 0) {
            powersCount = Math.max(0, powersCount - bonusCount);
        }
    }

    for (let i = 0; i < powersCount; i++) {
        // 1. Roll category
        let catRoll = this.powerCategoryRolls[i];
        if (catRoll < 1 || catRoll > 100) continue;
        const catRow = this.powerCategoriesTable.find(
            (c) => catRoll <= c.maxRoll,
        );
        if (!catRow) continue;
        const category = catRow.name;

        // 2. Roll power within category
        let powerRoll = this.powerRolls[i];
        let adj = 1;
        while (powerRoll > 100) {
            powerRoll = this.powerRolls[i + adj];
            adj++;
            if (i + adj >= this.rollArraySize) {
                powerRoll = -1;
                break;
            }
        }
        if (powerRoll < 1 || powerRoll > 100) continue;
        const powerRow = this.powerListTable.find(
            (r) => r.category === category && powerRoll <= r.maxRoll,
        );
        if (powerRow) rolled.add(powerRow.name);
    }
    return rolled;
};

CharacterGenerator.prototype.getBonusPowerOptions = function () {
    if (!this.powerListTable) return [];

    // Physical form bonus powers (Basic mode Hi-Tech)
    const physicalFormRow = this.physicalFormTable.find(
        (r) => r.name === this._lastPhysicalForm,
    );
    if (physicalFormRow) {
        const formCount = Utility.getValue(
            physicalFormRow,
            "bonusPowerCount",
            0,
        );
        if (formCount > 0) {
            const formBonusPower = Utility.getValue(
                physicalFormRow,
                "bonusPower",
                "",
            );
            if (formBonusPower) {
                const allOptions =
                    CharacterGenerator.parseBonusPowerOptions(formBonusPower);
                const expanded = this._expandBonusPowerAny(allOptions);
                if (expanded.length > 1) {
                    return [
                        {
                            source: "physicalForm",
                            count: formCount,
                            options: expanded,
                        },
                    ];
                }
            }
        }
    }

    // Power list bonus powers (Advanced/Ultimate)
    // Simulate which powers will be rolled, then only include bonus options for those.
    const rolledPowers = this._simulateRolledPowers();
    const slots = [];
    for (let i = 0; i < this.powerListTable.length; i++) {
        const powerRow = this.powerListTable[i];
        // Only include if this power will actually be rolled
        if (!rolledPowers.has(powerRow.name)) continue;
        const count = Utility.getValue(powerRow, "bonusPowerCount", 0);
        if (count <= 0) continue;
        const bonusPowerString = Utility.getValue(powerRow, "bonusPower", "");
        if (!bonusPowerString) continue;
        const options =
            CharacterGenerator.parseBonusPowerOptions(bonusPowerString);
        const expanded = this._expandBonusPowerAny(options);
        if (expanded.length <= 1) continue; // Single option — auto-assign, no selection needed
        slots.push({
            source: "powerList",
            sourcePowerName: powerRow.name,
            sourcePowerCategory: powerRow.category,
            count: count,
            options: expanded,
        });
    }
    return slots;
};

/**
 * Expand "Any" entries in bonus power options to list all powers
 * in the category. If category is also "Any", list all powers.
 */
CharacterGenerator.prototype._expandBonusPowerAny = function (options) {
    if (!this.powerListTable) return options;
    const expanded = [];
    for (const opt of options) {
        if (opt.name === "Any") {
            if (opt.category === "Any") {
                // All powers in all categories
                for (const p of this.powerListTable) {
                    expanded.push({
                        category: p.category,
                        name: p.name,
                        maxRoll: opt.maxRoll,
                    });
                }
            } else {
                // All powers in this specific category
                const catPowers = this.powerListTable.filter(
                    (p) => p.category === opt.category,
                );
                for (const p of catPowers) {
                    expanded.push({
                        category: p.category,
                        name: p.name,
                        maxRoll: opt.maxRoll,
                    });
                }
            }
        } else {
            expanded.push(opt);
        }
    }
    return expanded;
};

/**
 * Get the total number of power slots the character has (before bonus
 * power subtraction). This is the maximum number of powers the character
 * can have total.
 */
CharacterGenerator.prototype.getTotalPowerCount = function () {
    if (!this.physicalFormTable || !this.quantityTable) return 0;
    const pRoll = Math.max(1, Math.min(100, this.powerNumberRoll || 1));
    const pQtyRow = this.quantityTable.find((o) => pRoll <= o.maxRoll);
    if (!pQtyRow) return 0;
    const physicalFormRow = this.physicalFormTable.find(
        (r) => r.name === this._lastPhysicalForm,
    );
    // Shared count rules — see _resolvePowerCounts()
    return this._resolvePowerCounts(physicalFormRow, pQtyRow).count;
};

/**
 * Get the maximum number of optional powers that can be selected, based on
 * total power slots minus the primary power and bonus powers.
 */
CharacterGenerator.prototype.getMaxOptionalPowerSlots = function () {
    const total = this.getTotalPowerCount();
    if (total <= 0) return 0;
    // 1 slot is always the primary power
    let slots = total - 1;
    // Subtract bonus powers (they consume slots but are auto-generated)
    if (this.physicalFormTable && this._lastPhysicalForm) {
        const physicalFormRow = this.physicalFormTable.find(
            (r) => r.name === this._lastPhysicalForm,
        );
        if (physicalFormRow) {
            const bonusCount = Utility.getValue(
                physicalFormRow,
                "bonusPowerCount",
                0,
            );
            slots -= bonusCount;
        }
    }
    return Math.max(0, slots);
};

/**
 * Get the physical form's optionalPowerCount — the global limit on how many
 * optional powers may be selected across ALL groups in the dialog.
 * Returns null if the physical form has no optionalPowers.
 */
CharacterGenerator.prototype.getOptionalPowerGlobalCount = function () {
    if (!this.physicalFormTable || !this._lastPhysicalForm) return null;
    const physicalFormRow = this.physicalFormTable.find(
        (r) => r.name === this._lastPhysicalForm,
    );
    if (!physicalFormRow) return null;
    const optPowers = Utility.getValue(physicalFormRow, "optionalPowers", "");
    if (!optPowers) return null;
    return Utility.getValue(physicalFormRow, "optionalPowerCount", 1);
};

CharacterGenerator.prototype.getOptionalPowerOptions = function () {
    if (!this.powerListTable) return [];

    const result = [];

    /**
     * Parse an optional powers string into expanded options.
     * Format: "Category\\Power(maxRoll)|Category\\Any(maxRoll)"
     * If name is "Any", expand to all powers in that category.
     * Strips (maxRoll) suffix from names.
     */
    const parseOptionalString = (optString) => {
        const options = [];
        const parts = Utility.splitDslList(optString);
        for (let i = 0; i < parts.length; i++) {
            let part = parts[i];
            if (!part) continue;

            // Handle ~ for random alternatives — expand each alternative
            if (part.indexOf("~") !== -1) {
                const alts = Utility.splitDslAlternatives(part);
                for (let k = 0; k < alts.length; k++) {
                    const expanded = parseOptionalString(alts[k]);
                    options.push(...expanded);
                }
                continue;
            }

            const spec = Utility.parseDslEntry(part);
            if (spec.segments.length < 2) continue;

            const category = spec.category;
            // spec.name has the "(maxRoll)" suffix stripped:
            // "Cold Generation(100)" -> "Cold Generation"
            const name = spec.name;

            if (name === "Any") {
                // Expand to all powers in this category from the power list
                const catPowers = this.powerListTable.filter(
                    (p) => p.category === category,
                );
                for (let p = 0; p < catPowers.length; p++) {
                    options.push({
                        category: category,
                        name: catPowers[p].name,
                    });
                }
            } else {
                options.push({ category: category, name: name });
            }
        }
        return options;
    };

    // Physical form optional powers (e.g., Energy has optionalPowers)
    const physicalFormRow = this.physicalFormTable.find(
        (r) => r.name === this._lastPhysicalForm,
    );
    if (physicalFormRow) {
        const optPowers = Utility.getValue(
            physicalFormRow,
            "optionalPowers",
            "",
        );
        if (optPowers) {
            // Use optionalPowerCount if set; if absent but optionalPowers exists, default to 1
            const maxCount = Utility.getValue(
                physicalFormRow,
                "optionalPowerCount",
                optPowers ? 1 : 100,
            );
            const allOptions = parseOptionalString(optPowers);
            if (allOptions.length > 0) {
                result.push({
                    sourcePowerName: physicalFormRow.name,
                    sourcePowerCategory: "Physical Form",
                    maxCount: maxCount,
                    options: allOptions,
                });
            }
        }
    }

    // Power list optional powers
    const rolledPowers = this._simulateRolledPowers();

    // Filter out powers that are already rolled (user already has them)
    const filterRolled = (options) =>
        options.filter((o) => !rolledPowers.has(o.name));

    // Filter physical form optional powers against rolled powers too
    if (
        result.length > 0 &&
        result[0].sourcePowerCategory === "Physical Form"
    ) {
        result[0].options = filterRolled(result[0].options);
    }

    for (let i = 0; i < this.powerListTable.length; i++) {
        const powerRow = this.powerListTable[i];
        if (!rolledPowers.has(powerRow.name)) continue;

        const optionalPowersString = Utility.getValue(
            powerRow,
            "optionalPowers",
            "",
        );
        if (!optionalPowersString) continue;

        // Use optionalPowerCount if set, else optionalPowersMax, else default to 1
        const maxCount = Utility.getValue(
            powerRow,
            "optionalPowerCount",
            Utility.getValue(
                powerRow,
                "optionalPowersMax",
                optionalPowersString ? 1 : 100,
            ),
        );
        const allOptions = filterRolled(
            parseOptionalString(optionalPowersString),
        );

        if (allOptions.length > 0) {
            result.push({
                sourcePowerName: powerRow.name,
                sourcePowerCategory: powerRow.category,
                maxCount: maxCount,
                options: allOptions,
            });
        }
    }
    return result;
};

CharacterGenerator.prototype.getPowerSlotsAndCategories = function () {
    const char = new Character();
    // Resolve physical form: use _lastPhysicalForm if set, otherwise compute from physicalFormRoll
    if (this._lastPhysicalForm) {
        char.physicalForm = this._lastPhysicalForm;
    } else if (this.physicalFormRoll) {
        const formRow = this.physicalFormTable.find(
            (o) => this.physicalFormRoll <= o.maxRoll,
        );
        char.physicalForm = formRow
            ? formRow.name
            : this.physicalFormTable[0].name;
    } else {
        char.physicalForm = this.physicalFormTable[0].name;
    }
    // Determine power count — shared rules, see _resolvePowerCounts()
    const pRoll = Math.max(1, Math.min(100, this.powerNumberRoll || 1));
    const pQtyRow = this.quantityTable.find((q) => pRoll <= q.maxRoll);
    const physicalFormRow = this.physicalFormTable.find(
        (o) => o.name === char.physicalForm,
    );
    let powersCount = this._resolvePowerCounts(physicalFormRow, pQtyRow).count;

    // Subtract bonus power count — bonus powers occupy slots but are
    // generated automatically, so the user only chooses from remaining slots.
    const bonusCount = Utility.getValue(physicalFormRow, "bonusPowerCount", 0);
    if (bonusCount > 0) powersCount = Math.max(0, powersCount - bonusCount);

    // Determine categories for each remaining power slot
    const categories = [];
    for (let i = 0; i < powersCount; i++) {
        const catRoll = this.powerCategoryRolls[i];
        if (catRoll < 1 || catRoll > 100) continue;
        const catRow = this.powerCategoriesTable.find(
            (c) => catRoll <= c.maxRoll,
        );
        if (catRow) categories.push(catRow.name);
    }

    return { count: powersCount, categories };
};

CharacterGenerator.prototype.getPowersForCategory = function (categoryName) {
    if (!this.powerListTable) return [];
    return this.powerListTable
        .filter((p) => p.category === categoryName)
        .map((p) => ({
            name: p.name,
            category: p.category,
            description: p.description,
            powerCount: Utility.getValue(p, "powerCount", 1),
        }));
};

CharacterGenerator.prototype.getPowerCategoryNames = function () {
    if (!this.powerCategoriesTable) return [];
    return [...new Set(this.powerCategoriesTable.map((c) => c.name))];
};
