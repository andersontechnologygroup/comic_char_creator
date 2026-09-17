class CharacterGenerator {
    rollArraySize = 100;

    physicalFormRoll = 0;
    subTypeRoll = 0;
    compoundRandomRanksColumnRoll = 0;
    combinationsRoll = 0;
    bodyTypeRolls = Array(10).fill(0);
    originRoll = 0;

    physicalAbilitiesCount = 1;
    physicalAbilityRolls = [
        { Fighting: 0, Agility: 0, Strength: 0, Endurance: 0 },
        { Fighting: 0, Agility: 0, Strength: 0, Endurance: 0 },
        { Fighting: 0, Agility: 0, Strength: 0, Endurance: 0 },
        { Fighting: 0, Agility: 0, Strength: 0, Endurance: 0 },
        { Fighting: 0, Agility: 0, Strength: 0, Endurance: 0 },
        { Fighting: 0, Agility: 0, Strength: 0, Endurance: 0 },
    ];

    mentalAbilityRolls = { Reason: 0, Intuition: 0, Psyche: 0 };

    resourceModifierRoll = 0;

    powerNumberRoll = 0;
    powerCategoryRolls = Array(this.rollArraySize).fill(0);
    powerRolls = Array(this.rollArraySize).fill(0);
    powerRankRolls = Array(this.rollArraySize).fill(0);

    talentNumberRoll = 0;
    talentCategoryRolls = Array(this.rollArraySize).fill(0);
    talentRolls = Array(this.rollArraySize).fill(0);
    talentSubRolls = Array(this.rollArraySize).fill(0);

    useUltimateTalents = false;

    contactNumberRoll = 0;
    contactCategoryRolls = Array(this.rollArraySize).fill(0);
    contactRolls = Array(this.rollArraySize).fill(0);

    popularityRoll = 0;

    weaknessStimulusRoll = 0;
    weaknessEffectRoll = 0;
    weaknessDurationRoll = 0;
    weaknessRankRoll = 0;

    powersExtraInfoRolls = Array(this.rollArraySize).fill(0);
    peiIndex = 0;

    randomRanksColumn = -1;

    identitySecret = true;
    originPublic = false;
    hiTechToGood = true;
    applyOptionalPowers = true;
    selectOptionalPowersManually = false;
    _selectedOptionalPowers = null; // Object: { sourcePowerName: [{category, name}] }
    contactsEqualToPowers = true;
    choosePowerInsteadOfRandom = false;
    wellEstablished = false;
    looksHuman = false;

    generatorMode = "basic";
    _preSelectedPowers = null; // Array of { category, powerName } for Choose mode
    _pendingPowerUpgrades = null; // Array of { powerIndex, upgradeInfo } for upgradePower UI
    _selectedBonusPowers = null; // Array of { category, name } for user-selected bonus powers
    selectBonusPowers = false; // If true, show selection dialog for bonus powers
    _selectedTalents = null; // Array of { category, name, talentCount } for user-selected talents
    selectTalentManually = false; // If true, show talent selection dialog
    _selectedContacts = null; // Array of { category, name, contactName } for user-selected contacts
    selectContactManually = false; // If true, show contact selection dialog
    _selectedPhysicalForm = null; // String name of user-selected physical form sub-type
    selectPhysicalFormManually = false; // If true, show physical form selection dialog

    physicalFormTable = PHYSICAL_FORM_TABLE;
    originTable = ORIGIN_TABLE;
    randomRanksTable = RANDOM_RANKS_TABLE;
    abilityModifierTable = ABILITY_MODIFIER_TABLE;
    quantityTable = QUANTITY_TABLE;
    powerCategoriesTable = POWER_CATEGORIES_TABLE;
    powerListTable = POWER_LIST_TABLE;
    talentCategoriesTable = TALENT_CATEGORIES_TABLE;
    talentListTable = TALENT_LIST_TABLE;
    contactCategoriesTable = CONTACT_CATEGORIES_TABLE;
    contactTypeListTable = CONTACT_TYPE_LIST_TABLE;
    weaknessStimulusTable = null;
    weaknessEffectTable = null;
    weaknessDurationTable = null;

    /** Reset all mutable state to field defaults.
     *  Call between tests to prevent state leaking across iterations.
     *  Does NOT reset table references (setTables handles those) or
     *  boolean flags that tests intentionally set before generation. */
    reset() {
        this.physicalFormRoll = 0;
        this.subTypeRoll = 0;
        this.compoundRandomRanksColumnRoll = 0;
        this.combinationsRoll = 0;
        this.bodyTypeRolls = Array(10).fill(0);
        this.originRoll = 0;
        this.physicalAbilitiesCount = 1;
        for (let i = 0; i < this.physicalAbilityRolls.length; i++) {
            PHYSICAL_ABILITIES.forEach(
                (a) => (this.physicalAbilityRolls[i][a] = 0),
            );
        }
        MENTAL_ABILITIES.forEach((a) => (this.mentalAbilityRolls[a] = 0));
        this.resourceModifierRoll = 0;
        this.powerNumberRoll = 0;
        this.powerCategoryRolls.fill(0);
        this.powerRolls.fill(0);
        this.powerRankRolls.fill(0);
        this.talentNumberRoll = 0;
        this.talentCategoryRolls.fill(0);
        this.talentRolls.fill(0);
        this.talentSubRolls.fill(0);
        this.useUltimateTalents = false;
        this.contactNumberRoll = 0;
        this.contactCategoryRolls.fill(0);
        this.contactRolls.fill(0);
        this.popularityRoll = 0;
        this.weaknessStimulusRoll = 0;
        this.weaknessEffectRoll = 0;
        this.weaknessDurationRoll = 0;
        this.weaknessRankRoll = 0;
        this.powersExtraInfoRolls.fill(0);
        this.peiIndex = 0;
        this.randomRanksColumn = -1;
        this.identitySecret = true;
        this.originPublic = false;
        this.hiTechToGood = true;
        this.applyOptionalPowers = true;
        this.selectOptionalPowersManually = false;
        this._selectedOptionalPowers = null;
        this.contactsEqualToPowers = true;
        this.choosePowerInsteadOfRandom = false;
        this.wellEstablished = false;
        this.looksHuman = false;
        this.generatorMode = "basic";
        this._assignedPowerNames = null;
        this._assignedTalentNames = null;
        this._assignedContactNames = null;
        this._preSelectedPowers = null;
        this._pendingPowerUpgrades = null;
        this._selectedBonusPowers = null;
        this.selectBonusPowers = false;
        this._selectedTalents = null;
        this.selectTalentManually = false;
        this._selectedContacts = null;
        this.selectContactManually = false;
        this._selectedPhysicalForm = null;
        this.selectPhysicalFormManually = false;
    }

    generateWithoutThrows() {
        const char = new Character();

        char.logRoll(`generatorMode`, 'N/A', this.generatorMode);
        char.logRoll(`identitySecret`, 'N/A', this.identitySecret);
        char.logRoll(`originPublic`, 'N/A', this.originPublic);
        char.logRoll(`hiTechToGood`, 'N/A', this.hiTechToGood);
        char.logRoll(`applyOptionalPowers`, 'N/A', this.applyOptionalPowers);
        char.logRoll(`selectOptionalPowersManually`, 'N/A', this.selectOptionalPowersManually);
        char.logRoll(`contactsEqualToPowers`, 'N/A', this.contactsEqualToPowers);
        char.logRoll(`choosePowerInsteadOfRandom`, 'N/A', this.choosePowerInsteadOfRandom);
        char.logRoll(`wellEstablished`, 'N/A', this.wellEstablished);
        char.logRoll(`looksHuman`, 'N/A', this.looksHuman);
        char.logRoll(`selectBonusPowers`, 'N/A', this.selectBonusPowers);
        char.logRoll(`selectPhysicalFormManually`, 'N/A', this.selectPhysicalFormManually);
        char.logRoll(`selectTalentManually`, 'N/A', this.selectTalentManually);
        char.logRoll(`selectContactManually`, 'N/A', this.selectContactManually);
        char.logRoll('useUltimateTalents', 'N/A', this.useUltimateTalents);

        this.setTables();
        this._assignedPowerNames = new Set(); // O(1) duplicate detection
        this._assignedTalentNames = new Set();
        this._assignedContactNames = new Set();
        this._pendingPowerUpgrades = [];

        // 1. Determine Physical Form (for Ultimate)
        this.determinePhysicalForm(char);

        // 2. Determine Origin
        this.determineOrigin(char);

        // 3. Determine Primary Abilities (FASERIP)
        this.determinePrimaryAbilities(char);

        // 4. Secondary Abilities Setup
        this.determineResources(char);
        this.determinePopularity(char);

        // 5. Special Abilities (Powers, Talents, Contacts)
        this.determineSpecialAbilities(char);

        // 6. Weakness (Ultimate Only)
        if (this.generatorMode === "ultimate") {
            this.determineWeakness(char);
        }

        // Final Calculation
        char.calculateSecondary();
        this.determineHealth(char);

        char.identity = this.identitySecret ? "Secret" : "Public";

        this._assignedPowerNames = null;
        this._assignedTalentNames = null;
        this._assignedContactNames = null;
        const pendingUpgrades = this._pendingPowerUpgrades;
        this._pendingPowerUpgrades = null;
        char._pendingPowerUpgrades = pendingUpgrades;
        this._selectedTalents = null;
        this.selectTalentManually = false;
        this._selectedContacts = null;
        this.selectContactManually = false;
        return char;
    }

    generate() {
        if (!this._phase1Complete) {
            this.throwAllRolls();
        }
        this._phase1Complete = false;
        const char = this.generateWithoutThrows();
        return char;
    }

    generatePhase1() {
        this.throwAllRolls();
        this.setTables();
        this._phase1Complete = true;
        // Determine physical form for name (needed for getPowerSlotsAndCategories)
        const physicalFormRow = this.physicalFormTable.find(
            (o) => this.physicalFormRoll <= o.maxRoll,
        );
        this._lastPhysicalForm = physicalFormRow
            ? physicalFormRow.name
            : this.physicalFormTable[0].name;
        const result = this.getPowerSlotsAndCategories();
        return {
            powersCount: result.count,
            powerCategories: result.categories,
            physicalForm: this._lastPhysicalForm,
            origin: null,
            availablePowers: result.categories.map((cat) => ({
                category: cat,
                powers: this.getPowersForCategory(cat),
            })),
        };
    }

    generatePhase2() {
        return this.generateWithoutThrows();
    }

    /** Mark that phase 1 already threw rolls so generate() skips re-rolling. */
    markPhase1Complete() {
        this._phase1Complete = true;
    }

    static generateCharacter(mode, options) {
        const gen = new CharacterGenerator();
        gen.generatorMode = mode;
        gen.setTables();

        if (options) {
            // Apply simple roll overrides
            const rollKeys = [
                "physicalFormRoll",
                "subTypeRoll",
                "originRoll",
                "randomRanksColumn",
                "compoundRandomRanksColumnRoll",
                "combinationsRoll",
                "originOfPowerRoll",
                "anyAbilityAdjustmentRoll",
                "resourceModifierRoll",
                "powerNumberRoll",
                "talentNumberRoll",
                "contactNumberRoll",
                "popularityRoll",
                "weaknessStimulusRoll",
                "weaknessEffectRoll",
                "weaknessDurationRoll",
                "weaknessRankRoll",
                "peiIndex",
            ];
            for (const key of rollKeys) {
                if (options[key] !== undefined) gen[key] = options[key];
            }

            // Apply array roll overrides
            const arrayKeys = [
                "powerCategoryRolls",
                "powerRolls",
                "powerRankRolls",
                "talentCategoryRolls",
                "talentRolls",
                "talentSubRolls",
                "contactCategoryRolls",
                "contactRolls",
                "powersExtraInfoRolls",
                "bodyTypeRolls",
            ];
            for (const key of arrayKeys) {
                if (options[key] !== undefined) gen[key] = options[key];
            }

            // Apply boolean flags
            const boolKeys = [
                "identitySecret",
                "originPublic",
                "hiTechToGood",
                "applyOptionalPowers",
                "contactsEqualToPowers",
                "choosePowerInsteadOfRandom",
                "wellEstablished",
                "looksHuman",
            ];
            for (const key of boolKeys) {
                if (options[key] !== undefined) gen[key] = options[key];
            }

            // Apply seed (before throwAllRolls if using generate())
            if (options.seed !== undefined) Dice.seed(options.seed);

            // If throwAllRolls is requested, do it after applying overrides
            if (options.throwAllRolls) gen.throwAllRolls();
        }

        if (options && options.useDeterministicRolls) {
            gen.setDeterministicRolls();
            // Re-apply any explicit overrides after deterministic rolls
            if (options) {
                const rollKeys = [
                    "physicalFormRoll",
                    "subTypeRoll",
                    "originRoll",
                    "randomRanksColumn",
                    "powerNumberRoll",
                    "talentNumberRoll",
                    "contactNumberRoll",
                    "popularityRoll",
                    "weaknessStimulusRoll",
                    "weaknessEffectRoll",
                    "weaknessDurationRoll",
                    "weaknessRankRoll",
                ];
                for (const key of rollKeys) {
                    if (options[key] !== undefined) gen[key] = options[key];
                }
            }
        }

        const char = gen.generateWithoutThrows();
        return char;
    }

    throwAllRolls() {
        this.physicalFormRoll = Dice.roll100();
        this.subTypeRoll = Dice.roll100();
        this.combinationsRoll = Dice.roll100();
        this.compoundRandomRanksColumnRoll = Dice.roll100();
        for (let i = 0; i < this.bodyTypeRolls.length; i++) {
            this.bodyTypeRolls[i] = Dice.roll100();
        }
        this.originRoll = Dice.roll100();
        this.originOfPowerRoll = Dice.roll100(); // For Ultimate

        this.anyAbilityAdjustmentRoll = Dice.roll100();
        for (let index = 0; index < this.physicalAbilityRolls.length; index++) {
            PHYSICAL_ABILITIES.forEach(
                (a) => (this.physicalAbilityRolls[index][a] = Dice.roll100()),
            );
        }

        MENTAL_ABILITIES.forEach(
            (a) => (this.mentalAbilityRolls[a] = Dice.roll100()),
        );

        this.resourceModifierRoll = Dice.roll100();
        this.powerNumberRoll = Dice.roll100();
        this.talentNumberRoll = Dice.roll100();
        this.contactNumberRoll = Dice.roll100();

        for (let i = 0; i < this.rollArraySize; i++) {
            this.powerCategoryRolls[i] = Dice.roll100();
            this.powerRankRolls[i] = Dice.roll100();
            this.talentCategoryRolls[i] = Dice.roll100();
            this.contactCategoryRolls[i] = Dice.roll100();

            this.powerRolls[i] = Dice.roll100();
            this.talentRolls[i] = Dice.roll100();
            this.talentSubRolls[i] = Dice.roll100();
            this.contactRolls[i] = Dice.roll100();

            if (this.generatorMode === "ultimate") {
                this.powerRolls[i] = Dice.roll100();
                this.talentRolls[i] = Dice.roll100();
                this.contactRolls[i] = Dice.roll100();
            }

            this.powersExtraInfoRolls[i] = Dice.roll100();
        }

        this.peiIndex = 0;

        this.popularityRoll = Dice.roll100();

        this.weaknessStimulusRoll = Dice.roll100();
        this.weaknessEffectRoll = Dice.roll100();
        this.weaknessDurationRoll = Dice.roll100();
        this.weaknessRankRoll = Dice.roll100();
    }

    setDeterministicRolls() {
        // Set all rolls to known-good values that match table entries.
        // This eliminates intermittent failures from random rolls that don't
        // match any entry in power/talent/contact lookup tables.
        this.physicalFormRoll = 1;
        this.subTypeRoll = 1;
        this.originRoll = 1;
        this.randomRanksColumn = 1;
        this.compoundRandomRanksColumnRoll = 1;
        this.combinationsRoll = 1;
        for (let i = 0; i < this.bodyTypeRolls.length; i++) {
            this.bodyTypeRolls[i] = 1;
        }

        this.anyAbilityAdjustmentRoll = 1;
        for (let index = 0; index < this.physicalAbilityRolls.length; index++) {
            PHYSICAL_ABILITIES.forEach(
                (a) => (this.physicalAbilityRolls[index][a] = 1),
            );
        }
        MENTAL_ABILITIES.forEach((a) => (this.mentalAbilityRolls[a] = 1));

        this.resourceModifierRoll = 50;
        this.powerNumberRoll = 19;
        this.talentNumberRoll = 91;
        this.contactNumberRoll = 74;

        // Power rolls: each value is guaranteed to match a power entry in its
        // corresponding category (e.g., category "Resistances" has entries up to
        // maxRoll 110, so roll 5 matches "Resistance to Fire and Heat").
        this.powerCategoryRolls = [
            3, 8, 12, 20, 30, 45, 60, 72, 85, 95, 50, 35, 25, 15, 10, 5, 90, 80,
            70, 65, 55, 40, 28, 18, 8, 3, 95, 88, 75, 60,
        ];
        this.powerRolls = [
            5, 12, 3, 15, 20, 35, 45, 60, 75, 90, 50, 30, 10, 8, 25, 40, 55, 70,
            85, 95, 65, 48, 22, 12, 7, 3, 88, 72, 55, 40,
        ];
        this.powerRankRolls = [
            5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 50, 30, 10, 20, 40, 60, 80,
            90, 70, 50, 30, 10, 20, 40, 60, 80, 90, 70, 50, 30,
        ];

        this.talentCategoryRolls = [
            10, 30, 55, 75, 88, 95, 5, 20, 40, 60, 80, 90, 15, 35, 50, 70, 85,
            98, 8, 25, 45, 65, 82, 92, 2, 15, 35, 55, 75, 90,
        ];
        this.talentRolls = [
            10, 30, 50, 70, 88, 95, 5, 20, 40, 60, 80, 90, 15, 35, 55, 75, 85,
            98, 8, 25, 45, 65, 82, 92, 2, 15, 35, 55, 75, 90,
        ];
        this.talentSubRolls = [
            10, 30, 50, 70, 88, 95, 5, 20, 40, 60, 80, 90, 15, 35, 55, 75, 85,
            98, 8, 25, 45, 65, 82, 92, 2, 15, 35, 55, 75, 90,
        ];

        this.contactCategoryRolls = [
            15, 45, 75, 95, 25, 55, 80, 10, 40, 70, 90, 20, 50, 85, 30, 60, 95,
            12, 42, 72, 88, 5, 35, 65, 82, 18, 48, 78, 92, 8,
        ];
        this.contactRolls = [
            10, 30, 50, 70, 88, 20, 5, 15, 40, 60, 80, 12, 35, 55, 75, 90, 25,
            8, 30, 50, 70, 3, 18, 45, 65, 85, 10, 35, 55, 80,
        ];

        for (let i = 0; i < this.powersExtraInfoRolls.length; i++) {
            this.powersExtraInfoRolls[i] = 1;
        }
        this.peiIndex = 0;

        this.popularityRoll = 50;

        this.weaknessStimulusRoll = 1;
        this.weaknessEffectRoll = 1;
        this.weaknessDurationRoll = 1;
        this.weaknessRankRoll = 1;
    }

    setTables() {
        // Set Tables based on Mode
        this.physicalFormTable = PHYSICAL_FORM_TABLE;
        this.originTable = ORIGIN_TABLE;
        this.randomRanksTable = RANDOM_RANKS_TABLE;
        this.abilityModifierTable = ABILITY_MODIFIER_TABLE;
        this.quantityTable = QUANTITY_TABLE;
        this.powerCategoriesTable = POWER_CATEGORIES_TABLE;
        this.powerListTable = POWER_LIST_TABLE;
        this.talentCategoriesTable = TALENT_CATEGORIES_TABLE;
        this.talentListTable = TALENT_LIST_TABLE;
        this.contactCategoriesTable = CONTACT_CATEGORIES_TABLE;
        this.contactTypeListTable = CONTACT_TYPE_LIST_TABLE;
        this.weaknessStimulusTable = null;
        this.weaknessEffectTable = null;
        this.weaknessDurationTable = null;

        if (this.generatorMode === "advanced") {
            this.physicalFormTable = PHYSICAL_FORM_ADVANCED_TABLE;
            this.originTable = ORIGIN_TABLE;
            this.randomRanksTable = RANDOM_RANKS_ADVANCED_TABLE;
            this.abilityModifierTable = ABILITY_MODIFIER_TABLE;
            this.quantityTable = QUANTITY_TABLE;
            this.powerCategoriesTable = POWER_CATEGORIES_ADVANCED_TABLE;
            this.powerListTable = POWER_LIST_ADVANCED_TABLE;
            this.talentCategoriesTable = TALENT_CATEGORIES_ADVANCED_TABLE;
            this.talentListTable = TALENT_LIST_ADVANCED_TABLE;
            this.contactCategoriesTable = CONTACT_CATEGORIES_ADVANCED_TABLE;
            this.contactTypeListTable = CONTACT_TYPE_LIST_ADVANCED_TABLE;
            this.weaknessStimulusTable = null;
            this.weaknessEffectTable = null;
            this.weaknessDurationTable = null;
        } else if (this.generatorMode === "ultimate") {
            this.physicalFormTable = PHYSICAL_FORM_ULTIMATE_TABLE;
            this.originTable = ORIGIN_ULTIMATE_TABLE;
            this.randomRanksTable = RANDOM_RANKS_ULTIMATE_TABLE;
            this.abilityModifierTable = ABILITY_MODIFIER_TABLE;
            this.quantityTable = QUANTITY_ULTIMATE_TABLE;
            this.powerCategoriesTable = POWER_CATEGORIES_ULTIMATE_TABLE;
            this.powerListTable = POWER_LIST_ULTIMATE_TABLE;

            this.talentCategoriesTable = TALENT_CATEGORIES_ADVANCED_TABLE;
            this.talentListTable = TALENT_LIST_ADVANCED_TABLE;

            if(this.useUltimateTalents) {
                this.talentCategoriesTable = TALENT_CATEGORIES_ULTIMATE_TABLE;
                this.talentListTable = TALENT_LIST_ULTIMATE_TABLE;
            }

            this.contactCategoriesTable = CONTACT_CATEGORIES_ULTIMATE_TABLE;
            this.contactTypeListTable = CONTACT_TYPE_LIST_ULTIMATE_TABLE;
            this.weaknessStimulusTable = WEAKNESS_STIMULUS_ULTIMATE_TABLE;
            this.weaknessEffectTable = WEAKNESS_EFFECT_ULTIMATE_TABLE;
            this.weaknessDurationTable = WEAKNESS_DURATION_ULTIMATE_TABLE;
        }
        this._buildPowerCategoryMap();
    }

    /** Build a category-indexed lookup map for fast power lookups.
     *  Maps category name -> array of power entries sorted by maxRoll.
     */
    _buildPowerCategoryMap() {
        this._powerCategoryMap = {};
        for (const entry of this.powerListTable) {
            if (!this._powerCategoryMap[entry.category]) {
                this._powerCategoryMap[entry.category] = [];
            }
            this._powerCategoryMap[entry.category].push(entry);
        }
    }

    /**
     * Find the physical form entry matching a roll, handling subRoll disambiguation.
     * When multiple entries share the same maxRoll, subRoll (from subTypeRoll)
     * determines which sub-form is selected.
     */
    _findPhysicalForm(roll, subRoll) {
        // Find all entries where roll <= maxRoll, grouped by maxRoll
        const candidates = this.physicalFormTable.filter(
            (o) => roll <= o.maxRoll,
        );
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
    }

    /**
     * Get all physical form sub-options for a given maxRoll group.
     * Used by the UI modal to let the user select a sub-form.
     */
    getPhysicalFormSubOptions() {
        if (!this.physicalFormTable) return [];
        const roll = this.physicalFormRoll;
        const candidates = this.physicalFormTable.filter(
            (o) => roll <= o.maxRoll,
        );
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
    }

    determinePhysicalForm(char) {
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
            const possibleTypes = subType.split("|");
            const roll = this.subTypeRoll;

            for (let index = 0; index < possibleTypes.length; index++) {
                const typeData = possibleTypes[index].split("(");
                const name = typeData[0];
                const maxRoll = typeData[1].replace(")", "");
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

        const combinations = Utility.getValue(
            physicalFormData,
            "combinations",
            -1,
        );
        if (combinations !== -1) {
            char.bodyTypes = [];

            const possibleTypes = combinations.split("|");
            const roll = this.combinationsRoll;
            let bodyTypeTable = [];

            char.logRoll("Physical Form Combinations", roll, "Combinations");

            // Build the temp table from the combinations attirbute
            for (let index = 0; index < possibleTypes.length; index++) {
                const parts = possibleTypes[index].split("\\");
                const numberOfTypes = +parts[0];
                const advantage = +parts[1].split("(")[0];
                const maxRoll = +parts[1].split("(")[1].replace(")", "");

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
                tempRandomRanksColumnTable[tempRandomRanksColumnTable.length] =
                    100;
            }

            let thisBodyType = null;
            let thisRoll = 0;
            let thisValue = -1;

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
                    thisValue = Utility.getValue(
                        thisBodyType,
                        "combinations",
                        -1,
                    );
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

            const tempRandomRanksColumnIndex =
                tempRandomRanksColumnTable.findIndex(
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
        if (randomRanksColumn !== -1)
            this.randomRanksColumn = randomRanksColumn;

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
            let bonusTalent = Utility.getValue(
                physicalFormData,
                "bonusTalent",
                "",
            );
            if (bonusTalent) {
                for (let index = 0; index < value; index++) {
                    this.generateBonusTalent(char, bonusTalent);
                }
            }
        }
    }

    generateBonusTalent(char, bonusTalentString) {
        if (!bonusTalentString) return;
        // Bonus talent strings use backslash as separator: "Fighting\\Climbing(100)"
        const talents = bonusTalentString.split("|");
        for (let index = 0; index < talents.length; index++) {
            const parts = talents[index].split("\\");
            const category = parts[0];
            const otherParts = parts[1].split("(");
            const type = otherParts[0];
            const roll = +otherParts[1].replace(")", "");

            talents[index] = {
                category: category,
                type: type,
                maxRoll: roll,
            };
        }

        const startIndex = char.talents.length;
        const roll = this.talentCategoryRolls[startIndex];
        const talent = talents.find((c) => roll <= c.maxRoll);
        if (!talent) return;

        const t = this.talentListTable.find(
            (t) => t.category === talent.category && t.name === talent.type,
        );
        if (!t) return;

        // Skip duplicate bonus talents
        if (
            this._assignedTalentNames &&
            this._assignedTalentNames.has(t.name)
        ) {
            char.logRoll(
                "Bonus Talent Gen",
                `Duplicate`,
                `${talent.category}: ${t.name}`,
            );
            return;
        }

        if (this._assignedTalentNames) this._assignedTalentNames.add(t.name);

        char.logRoll(
            "Bonus Talent Gen",
            `Physical Form: ${roll}`,
            `${talent.category}: ${t.name}`,
        );

        const talentSlots = Utility.getValue(t, "talentCount", 1);
        char.talents.push({
            category: talent.category,
            name: t.name,
            description: t.description,
            talentSlots: talentSlots,
            bonusTalent: true,
        });
    }

    determineOrigin(char) {
        if (this.originRoll < 1 || this.originRoll > 100) {
            char.logRoll("Origin", -1, "Invalid Roll");
            return;
        }

        const originData = this.originTable.find(
            (o) => this.originRoll <= o.maxRoll,
        );
        char.origin = originData.name;
        char.state.origin = originData.name;
        char.logRoll("Origin", this.originRoll, char.origin);
    }

    determineAbility(char, ability, physicalFormRow, abilityIndex) {
        if (abilityIndex === undefined || abilityIndex === null)
            abilityIndex = 0;
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
                char.logRoll(
                    `Primary Ability: ${ability}`,
                    -1,
                    "Invalid RankRow",
                );
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
    }

    determinePrimaryAbilities(char) {
        // Map back to the correct row in the table being used
        const physicalFormRow = this.physicalFormTable.find(
            (o) => o.name === char.physicalForm,
        );

        this.physicalAbilitiesCount = 1;
        let value = Utility.getValue(
            physicalFormRow,
            "abilitiesToGenerate",
            -1,
        );
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
            const rankRow = this.determineAbility(
                char,
                ability,
                physicalFormRow,
            );
            if (rankRow != null) {
                char.setAbility(ability, rankRow.rank, rankRow.rankNumber);
            }
        });

        value = Utility.getValue(
            physicalFormRow,
            "anyPrimaryAbilityAdjustment",
            0,
        );
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
                const rankRow = this.randomRanksTable.find(
                    (r) => r.rank === rank,
                );
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
                    char.state.allPrimaryAbilityAdjustment.abilities[ability] =
                        { old: oldRank, new: rankRow.rank };
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
                for (
                    let index = 0;
                    index < PHYSICAL_ABILITIES.length;
                    index++
                ) {
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
                    char.state.allPhysicalAbilityAdjustment.abilities[ability] =
                        { old: oldRank, new: rankRow.rank };
                    char.logRoll(
                        "All Physical Ability Adjustment",
                        value,
                        ability + ": " + oldRank + " -> " + rankRow.rank,
                    );
                }
            }
        }
    }

    getAbilityAfterModifier(
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
        if (minimum !== -1 && returnRank < minimum) {
            returnRank = minimum;
            char.logRoll(
                "Ability",
                "Ability Modifier",
                `${ability} Rank is less than Min. Setting to ${returnRank}.`,
            );
        }

        if (maximum !== -1 && returnRank > maximum) {
            returnRank = maximum;
            char.logRoll(
                "Ability",
                "Ability Modifier",
                `${ability} Rank is greater than Max. Setting to ${returnRank}.`,
            );
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
    }

    determineResources(char) {
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

        value = Utility.getValue(physicalFormRow, "isHiTech", false);
        if (value) {
            char.state.resources.hiTech = true;
            if (this.hiTechToGood) {
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
            const adjRow = this.abilityModifierTable.find(
                (r) => r.maxRoll >= roll,
            );
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

        const minimum = Utility.getValue(
            physicalFormRow,
            "resourcesMinimum",
            -1,
        );
        const maximum = Utility.getValue(
            physicalFormRow,
            "resourcesMaximum",
            -1,
        );

        let resourceRank = this.getAbilityAfterModifier(
            char,
            "Resources",
            startRank,
            finalAdjustment,
            minimum,
            maximum,
        );

        char.resources.rank = resourceRank;
        const rankData = this.randomRanksTable.find(
            (r) => r.rank === resourceRank,
        );
        char.resources.number = rankData.rankNumber;
        char.state.resources.final = resourceRank;
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
    }

    determineHealth(char) {
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
                case "*":
                    const multVal = parseInt(healthAdjustment.substring(1));
                    char.health *= multVal;
                    char.state.healthAdjustment = {
                        type: "multiply",
                        value: multVal,
                    };
                    break;
                case "/":
                    const divVal = parseInt(healthAdjustment.substring(1));
                    char.health /= divVal;
                    char.state.healthAdjustment = {
                        type: "divide",
                        value: divVal,
                    };
                    break;
            }

            char.logRoll("Health Adjustment", healthAdjustment, char.health);
        }
    }

    determinePopularityUltimate(char) {
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
            char.logRoll(
                "Popularity",
                "Base Rules",
                "Popularity set to " + value,
            );
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
            const subTypes = adjustment.split("|");
            for (let index = 0; index < subTypes.length; index++) {
                const name = subTypes[index].split("(");
                if (name[0] === char.subType) {
                    adjustment = +name[1].replace(")", "");
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

        let minimum = Utility.getValue(
            physicalFormRow,
            "popularityMinimum",
            -1,
        );
        if (char.subType !== "" && !Number.isInteger(+minimum)) {
            const subTypes = minimum.split("|");
            for (let index = 0; index < subTypes.length; index++) {
                const name = subTypes[index].split("(");
                if (name[0] === char.subType) {
                    minimum = +name[1].replace(")", "");
                    break;
                }
            }

            char.logRoll(
                "Popularity",
                "SubType Rules",
                "Popularity minimum set to " + minimum,
            );
        }

        let maximum = Utility.getValue(
            physicalFormRow,
            "popularityMaximum",
            -1,
        );
        if (char.subType !== "" && !Number.isInteger(+maximum)) {
            const subTypes = maximum.split("|");
            for (let index = 0; index < subTypes.length; index++) {
                const name = subTypes[index].split("(");
                if (name[0] === char.subType) {
                    maximum = +name[1].replace(")", "");
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
            char.logRoll(
                "Popularity",
                "Public ID",
                "Addition of Popularity (+10)",
            );
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
    }

    determinePopularity(char) {
        if (this.generatorMode === "ultimate") {
            this.determinePopularityUltimate(char);
            return;
        }

        // Page 9
        const physicalFormRow = this.physicalFormTable.find(
            (o) => o.name === char.physicalForm,
        );

        char.popularity = 50;
        let value = Utility.getValue(physicalFormRow, "popularitySet", -1);
        if (value !== -1) {
            char.popularity = value;
            char.logRoll(
                "Popularity",
                "Base Rules",
                "Popularity set to " + value,
            );
            return;
        }

        value = Utility.getValue(physicalFormRow, "popularityStart", -1);
        if (value !== -1) {
            char.popularity = value;
            char.logRoll(
                "Popularity",
                "Base Rules",
                "Popularity set to " + value,
            );
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
            // Advanced: combined identity/origin modifier
            if (this.identitySecret) {
                char.popularity -= 20;
                char.logRoll(
                    "Popularity",
                    "Secret ID / Origin Secret",
                    "Loss of Popularity (-20)",
                );
            } else {
                char.popularity += 20;
                char.logRoll(
                    "Popularity",
                    "Public ID / Origin Public",
                    "Addition of Popularity (+20)",
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

        if (char.popularity < 0) char.popularity = 0;

        char.state.popularity.final = char.popularity;
        char.logRoll("Popularity", "Base Rules", char.popularity);
    }

    determineSpecialAbilities(char) {
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
        let powersCountSet = false;
        let talentsCountSet = false;
        let contactsCountSet = false;

        let value;
        powersCountSet = this.determineSpecialPowerAdjustment(
            physicalFormRow,
            char,
            pQtyRow,
        );
        talentsCountSet = this.determineSpecialTalentAdjustment(
            physicalFormRow,
            char,
            tQtyRow,
        );
        contactsCountSet = this.determineSpecialContactAdjustment(
            physicalFormRow,
            char,
            cQtyRow,
        );

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
            let bonusPower = Utility.getValue(
                physicalFormRow,
                "bonusPower",
                "",
            );
            for (let index = 0; index < value; index++) {
                this.generatorBonusPowerOfPhysicalForm(char, bonusPower, index);
            }
        }

        // Generate Optional Power from Physical Form (e.g., Energy has optionalPowers)
        if (this.applyOptionalPowers) {
            value = Utility.getValue(physicalFormRow, "optionalPowers", "");
            if (value !== "") {
                const optMax = Utility.getValue(physicalFormRow, "optionalPowersMax", 100);
                this.generateOptionalPower(char, optMax, value, physicalFormRow.name);
            }
        }

        // Generate rolled Powers
        // Note: powersCount is NOT reduced by bonus powers here — generateSinglePower
        // handles slot accounting via remainingSlots. getPowerSlotsAndCategories()
        // accounts for bonusPowerCount for the UI.
        for (let i = 0; i < char.powersCount; i++) {
            this.generateSinglePower(char, i);
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
                      (c) => c.category === category && cRoll <= c.maxRoll,
                  )
                : null;

            // Skip duplicates — try next roll indices
            let adjustIndex = 0;
            while (
                c &&
                this._assignedContactNames &&
                this._assignedContactNames.has(c.name)
            ) {
                char.logRoll(
                    "Contact Gen",
                    `Duplicate`,
                    `${category}: ${c.name}`,
                );
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
                    (c2) => c2.category === category && cRoll <= c2.maxRoll,
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

            if (this._assignedContactNames)
                this._assignedContactNames.add(c.name);

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
    }

    determineSpecialContactAdjustment(physicalFormRow, char, cQtyRow) {
        let contactsCountSet = false;
        let value = Utility.getValue(physicalFormRow, "contactsCountSet", -1);
        if (value !== -1) {
            char.contactsCount = value;
            char.state.contactsCount.set = value;
            char.logRoll(
                "Contact Slots",
                "Base Rules",
                `Contacts Count Set: ${char.contactsCount}`,
            );
            contactsCountSet = true;
        }

        if (!contactsCountSet) {
            value = Utility.getValue(
                physicalFormRow,
                "contactsCountAdjustment",
                0,
            );
            if (value !== 0) {
                char.contactsCount += value;
                char.contactsMax += value;
                char.state.contactsCount.adjustment = value;
                char.logRoll(
                    "Contact Slots",
                    "Base Rules",
                    `Contacts Count Adjusted: ${char.contactsCount}`,
                );
                if (char.contactsCount > cQtyRow.contacts.maximum) {
                    char.contactsCount = cQtyRow.contacts.maximum;
                    char.logRoll(
                        "Contact Slots",
                        "Base Rules",
                        `Contacts Count Adjusted (too high): ${char.contactsCount}`,
                    );
                }
            }
        }

        if (!contactsCountSet) {
            value = Utility.getValue(
                physicalFormRow,
                "contactsCountMinimum",
                -1,
            );
            if (value !== -1 && value > char.contactsCount) {
                char.contactsCount = value;
                char.logRoll(
                    "Contact Slots",
                    "Base Rules",
                    `Contacts Count Minimum: ${char.contactsCount}`,
                );
            }

            value = Utility.getValue(
                physicalFormRow,
                "contactsCountMaximum",
                -1,
            );
            if (value !== -1 && value < char.contactsCount) {
                char.contactsCount = value;
                char.contactsMax = value;
                char.logRoll(
                    "Contact Slots",
                    "Base Rules",
                    `Contacts Count Maximum: ${char.contactsCount}`,
                );
            }

            // Ensure max >= min
            if (char.contactsMax < char.contactsCount) {
                char.contactsMax = char.contactsCount;
            }
        }

        return contactsCountSet;
    }

    determineSpecialTalentAdjustment(physicalFormRow, char, tQtyRow) {
        let talentsCountSet = false;
        let value = Utility.getValue(physicalFormRow, "talentsCountSet", -1);
        if (value !== -1) {
            char.talentsCount = value;
            char.state.talentsCount.set = value;
            char.logRoll(
                "Talent Slots",
                "Base Rules",
                `Talents Count Set: ${char.talentsCount}`,
            );
            talentsCountSet = true;
        }

        if (!talentsCountSet) {
            value = Utility.getValue(
                physicalFormRow,
                "talentsCountAdjustment",
                0,
            );
            if (value !== 0) {
                char.talentsCount += value;
                char.talentsMax += value;
                char.state.talentsCount.adjustment = value;
                char.logRoll(
                    "Talent Slots",
                    "Base Rules",
                    `Talents Count Adjusted: ${char.talentsCount}`,
                );
                if (char.talentsCount > tQtyRow.talents.maximum) {
                    char.talentsCount = tQtyRow.talents.maximum;
                    char.logRoll(
                        "Talent Slots",
                        "Base Rules",
                        `Talents Count Adjusted (too high): ${char.talentsCount}`,
                    );
                }
            }
        }

        if (!talentsCountSet) {
            value = Utility.getValue(
                physicalFormRow,
                "talentsCountMinimum",
                -1,
            );
            if (value !== -1 && value > char.talentsCount) {
                char.talentsCount = value;
                char.talentsMax = value;
                char.logRoll(
                    "Talent Slots",
                    "Base Rules",
                    `Talents Count Minimum: ${char.contactsCount}`,
                );
            }

            value = Utility.getValue(
                physicalFormRow,
                "talentsCountMaximum",
                -1,
            );
            if (value !== -1 && value < char.talentsCount) {
                char.talentsCount = value;
                char.talentsMax = value;
                char.logRoll(
                    "Talent Slots",
                    "Base Rules",
                    `Talents Count Maximum: ${char.talentsCount}`,
                );
            }
        }

        return talentsCountSet;
    }

    determineSpecialPowerAdjustment(physicalFormRow, char, pQtyRow) {
        let powersCountSet = false;
        let value = Utility.getValue(physicalFormRow, "powersCountSet", -1);
        if (value !== -1) {
            char.powersCount = value;
            char.state.powersCount.set = value;
            char.logRoll(
                "Power Slots",
                "Base Rules",
                `Powers Count Set: ${char.powersCount}`,
            );
            powersCountSet = true;
        }

        if (!powersCountSet) {
            value = Utility.getValue(
                physicalFormRow,
                "powersCountAdjustment",
                0,
            );
            if (value !== 0) {
                char.powersCount += value;
                char.powersMax += value;
                char.state.powersCount.adjustment = value;
                char.logRoll(
                    "Power Slots",
                    "Base Rules",
                    `Powers Count Adjusted by ${value} to ${char.powersCount}`,
                );
            }
            if (char.powersCount > pQtyRow.powers.max) {
                char.powersCount = pQtyRow.powers.max;
                char.logRoll(
                    "Power Slots",
                    "Base Rules",
                    `Powers Count Adjusted (too high): ${char.powersCount}`,
                );
            }
        }

        if (!powersCountSet) {
            value = Utility.getValue(physicalFormRow, "powersCountMinimum", -1);
            if (value !== -1 && value > char.powersCount) {
                char.powersCount = value;
                char.powersMax = value;
                char.logRoll(
                    "Power Slots",
                    "Base Rules",
                    `Powers Count Minimum set to ${char.powersCount}`,
                );
            }

            value = Utility.getValue(physicalFormRow, "powersCountMaximum", -1);
            if (value !== -1 && value < char.powersCount) {
                char.powersCount = value;
                char.powersMax = value;
                char.logRoll(
                    "Power Slots",
                    "Base Rules",
                    `Powers Count Maximum set to ${char.powersCount}`,
                );
            }
        }

        return powersCountSet;
    }

    determineWeakness(char) {
        // Page 14 Ultimate Powers Book
        // 01-13 Psych, 14-18 Elemental Allergy, etc.
        const sRoll = this.weaknessStimulusRoll;
        const eRoll = this.weaknessEffectRoll;
        const dRoll = this.weaknessDurationRoll;
        const rRoll = this.weaknessRankRoll;

        const stimulusRow = this.weaknessStimulusTable.find(
            (s) => sRoll <= s.maxRoll,
        );
        const effectRow = this.weaknessEffectTable.find(
            (e) => eRoll <= e.maxRoll,
        );
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
    }

    _findTalent(category, tRoll, sRoll) {
        // Find all entries in this category where tRoll <= maxRoll
        const candidates = this.talentListTable.filter(
            (e) => e.category === category && tRoll <= e.maxRoll,
        );
        if (candidates.length === 0) return null;
        if (candidates.length === 1) return candidates[0];

        // Among candidates, group by maxRoll value to find the closest one
        // The entry with the smallest maxRoll >= tRoll is the standard pick
        const minMaxRoll = Math.min(...candidates.map((e) => e.maxRoll));
        const closest = candidates.filter((e) => e.maxRoll === minMaxRoll);

        if (closest.length === 1) return closest[0];

        // Multiple entries share the exact same maxRoll — use subRoll to disambiguate
        const withSubRoll = closest.filter(
            (e) => e.subRoll !== undefined && e.subRoll !== null,
        );
        if (withSubRoll.length === 0) {
            return closest[0];
        }

        // Find the entry where sRoll <= subRoll (first match wins, same as maxRoll logic)
        const subMatch = withSubRoll.find((e) => sRoll <= e.subRoll);
        return subMatch || withSubRoll[withSubRoll.length - 1];
    }

    getAvailableTalents() {
        const categories = [];
        const catNames = [];
        for (const entry of this.talentListTable) {
            // Skip bonus-only entries (maxRoll > 100)
            if (entry.maxRoll > 100) continue;
            if (!catNames.includes(entry.category)) {
                catNames.push(entry.category);
            }
        }
        for (const catName of catNames) {
            const talents = this.talentListTable
                .filter((e) => e.category === catName && e.maxRoll <= 100)
                .map((e) => ({
                    name: e.name,
                    talentCount: Utility.getValue(e, "talentCount", 1),
                    description: e.description || "",
                    subRoll: e.subRoll || null,
                }));
            categories.push({ category: catName, talents: talents });
        }
        return categories;
    }

    /**
     * Determine how many talent slots are available (from the roll).
     * Must be called after throwAllRolls/setTables.
     */
    getTalentSlotCount() {
        const tRoll = Math.max(1, Math.min(100, this.talentNumberRoll || 1));
        const tQtyRow = this.quantityTable.find((q) => tRoll <= q.maxRoll);
        if (!tQtyRow) return 4;
        let count = tQtyRow.talents.initial;
        // Apply physical form adjustments
        const physicalFormRow = this.physicalFormTable.find(
            (o) => o.name === this._lastPhysicalForm,
        );
        if (physicalFormRow) {
            const adjust = Utility.getValue(
                physicalFormRow,
                "talentsCountAdjustment",
                0,
            );
            count = Math.max(1, count + adjust);
            const max = Utility.getValue(
                physicalFormRow,
                "talentsCountMaximum",
                999,
            );
            count = Math.min(count, max);
        }
        return count;
    }

    getAvailableContacts() {
        const categories = [];
        const catNames = [];
        for (const entry of this.contactTypeListTable) {
            if (!catNames.includes(entry.category)) {
                catNames.push(entry.category);
            }
        }
        for (const catName of catNames) {
            const contacts = this.contactTypeListTable
                .filter((e) => e.category === catName)
                .map((e) => ({
                    name: e.name,
                    contactCount: Utility.getValue(e, "contactCount", 1),
                    description: e.description || "",
                }));
            categories.push({ category: catName, contacts: contacts });
        }
        return categories;
    }

    /**
     * Determine how many contact slots are available (from the roll).
     * Must be called after throwAllRolls/setTables.
     */
    getContactSlotCount() {
        const cRoll = Math.max(1, Math.min(100, this.contactNumberRoll || 1));
        const cQtyRow = this.quantityTable.find((q) => cRoll <= q.maxRoll);
        if (!cQtyRow) return 4;
        let count = cQtyRow.contacts.initial;
        const physicalFormRow = this.physicalFormTable.find(
            (o) => o.name === this._lastPhysicalForm,
        );
        if (physicalFormRow) {
            const adjust = Utility.getValue(
                physicalFormRow,
                "contactsCountAdjustment",
                0,
            );
            count = Math.max(1, count + adjust);
            const min = Utility.getValue(
                physicalFormRow,
                "contactsCountMinimum",
                -1,
            );
            if (min !== -1 && count < min) count = min;
            const max = Utility.getValue(
                physicalFormRow,
                "contactsCountMaximum",
                999,
            );
            if (max !== -1 && count > max) count = max;
        }
        return count;
    }

    generateTalents(char, talentIndex) {
        const currentTalentSlots = char.talents
            .map((t) => t.talentSlots)
            .reduce((acc, value) => acc + value, 0);
        const remainingTalentSlots = char.talentsCount - currentTalentSlots;

        if (remainingTalentSlots <= 0) {
            return;
        }

        // If manual selection is active, use the pre-selected talent
        if (
            this._selectedTalents &&
            talentIndex < this._selectedTalents.length
        ) {
            const sel = this._selectedTalents[talentIndex];
            const value = sel.talentCount || 1;
            if (value > remainingTalentSlots) {
                char.logRoll(
                    "Talent Gen",
                    `Skipped`,
                    `${sel.category}: ${sel.name} (needs ${value} slots, ${remainingTalentSlots} remaining)`,
                );
                return;
            }
            if (this._assignedTalentNames)
                this._assignedTalentNames.add(sel.name);
            char.logRoll(
                "Talent Gen",
                `Manual`,
                `${sel.category}: ${sel.name}`,
            );
            char.talents.push({
                category: sel.category,
                name: sel.name,
                description: sel.description || "",
                talentSlots: value,
            });
            return;
        }

        let tcRoll = this.talentCategoryRolls[talentIndex];
        let tcCatRow = this.talentCategoriesTable.find(
            (c) => tcRoll <= c.maxRoll,
        );
        if (!tcCatRow) return;
        let category = tcCatRow.name;
        let tRoll = this.talentRolls[talentIndex];
        let sRoll = this.talentSubRolls[talentIndex];

        let t = this._findTalent(category, tRoll, sRoll);

        // Skip duplicates — try next roll indices until a unique talent is found
        let adjustIndex = 0;
        while (
            t &&
            this._assignedTalentNames &&
            this._assignedTalentNames.has(t.name)
        ) {
            char.logRoll("Talent Gen", `Duplicate`, `${category}: ${t.name}`);
            adjustIndex++;
            if (talentIndex + adjustIndex >= this.rollArraySize) {
                char.logRoll(
                    "Talent Gen",
                    `No Unique Talent Found`,
                    `Exhausted retries at index ${talentIndex}`,
                );
                return;
            }
            tcRoll = this.talentCategoryRolls[talentIndex + adjustIndex];
            tcCatRow = this.talentCategoriesTable.find(
                (c) => tcRoll <= c.maxRoll,
            );
            if (!tcCatRow) {
                adjustIndex++;
                continue;
            }
            category = tcCatRow.name;
            tRoll = this.talentRolls[talentIndex + adjustIndex];
            sRoll = this.talentSubRolls[talentIndex + adjustIndex];
            t = this._findTalent(category, tRoll, sRoll);
        }
        if (!t) return;

        let value = Utility.getValue(t, "talentCount", 1);
        while (
            remainingTalentSlots < value &&
            currentTalentSlots + value > char.talentsMax
        ) {
            adjustIndex++;
            if (talentIndex + adjustIndex >= this.rollArraySize) return;
            tRoll = this.talentRolls[talentIndex + adjustIndex];
            sRoll = this.talentSubRolls[talentIndex + adjustIndex];
            tcRoll = this.talentCategoryRolls[talentIndex + adjustIndex];
            tcCatRow = this.talentCategoriesTable.find(
                (c) => tcRoll <= c.maxRoll,
            );
            if (!tcCatRow) continue;
            category = tcCatRow.name;
            t = this._findTalent(category, tRoll, sRoll);
            if (
                t &&
                this._assignedTalentNames &&
                this._assignedTalentNames.has(t.name)
            )
                continue;
            value = Utility.getValue(t, "talentCount", 1);
        }
        if (!t) return;

        if (this._assignedTalentNames) this._assignedTalentNames.add(t.name);

        // Show subRoll in the log when the talent has a subRoll property
        const rollDisplay =
            t.subRoll != null
                ? `${tcRoll}/${tRoll}/${sRoll}`
                : `${tcRoll}/${tRoll}`;
        char.logRoll("Talent Gen", rollDisplay, `${category}: ${t.name}`);

        char.talents.push({
            category: category,
            name: t.name,
            description: t.description,
            talentSlots: value,
        });

        value = Utility.getValue(t, "bonusContactCount", 0);
        if (value > 0) {
            for (let cIndex = 0; cIndex < value; cIndex++) {
                let valueContact = Utility.getValue(t, "bonusContact", "");
                if (valueContact !== "") {
                    this.generateBonusContact(char, t.bonusContact);
                }
            }
        }
    }

    generateBonusContact(char, bonusContactString, forcedContact) {
        if (!bonusContactString) return;
        const contacts = bonusContactString.split("|");
        for (let index = 0; index < contacts.length; index++) {
            // Support both "/" and "\\" as separator between category and type
            let sep = "/";
            if (!contacts[index].includes("/") && contacts[index].includes("\\")) {
                sep = "\\";
            }
            const parts = contacts[index].split(sep);
            const category = parts[0];
            const otherParts = parts[1].split("(");
            const type = otherParts[0];
            const roll = +otherParts[1].replace(")", "");

            contacts[index] = {
                category: category,
                type: type,
                maxRoll: roll,
            };
        }

        const startIndex = char.contacts.length;
        const roll = this.contactRolls[startIndex];
        const contact = contacts.find((c) => roll <= c.maxRoll);
        if (!contact) return;

        let c;
        if (contact.category === "Any" && contact.type === "Any") {
            // "Any/Any" — pick a random contact from all available
            const allContacts = this.contactTypeListTable.filter(
                (ct) => ct.name && ct.name !== "",
            );
            if (allContacts.length === 0) return;
            // Use the contact roll to pick from the filtered list
            const pickIndex = (roll - 1) % allContacts.length;
            c = allContacts[pickIndex];
        } else if (contact.category === "Any") {
            // "Any/Type" — pick from any category matching the type name
            c = this.contactTypeListTable.find((ct) => ct.name === contact.type);
        } else if (contact.type === "Any") {
            // "Category/Any" — pick a random contact from the category
            const catContacts = this.contactTypeListTable.filter(
                (ct) => ct.category === contact.category,
            );
            if (catContacts.length === 0) return;
            const pickIndex = (roll - 1) % catContacts.length;
            c = catContacts[pickIndex];
        } else {
            c = this.contactTypeListTable.find(
                (ct) => ct.category === contact.category && ct.name === contact.type,
            );
        }
        if (!c) return;

        // Skip duplicate bonus contacts
        if (
            this._assignedContactNames &&
            this._assignedContactNames.has(c.name)
        ) {
            char.logRoll(
                "Bonus Contact Gen",
                `Duplicate`,
                `${contact.category}: ${c.name}`,
            );
            return;
        }

        if (this._assignedContactNames) this._assignedContactNames.add(c.name);

        char.logRoll(
            "Bonus Contact Gen",
            `Base Rules: ${roll}`,
            `${contact.category}: ${c.name}`,
        );

        if (forcedContact || char.contacts.length < char.contactsMax) {
            char.contacts.push({
                category: contact.category,
                name: c.name,
                description: c.description,
            });
        }
    }

    isPowerAlreadyAssigned(powers, powerRow) {
        if (powerRow === undefined || powerRow === null) return false;
        if (this._assignedPowerNames)
            return this._assignedPowerNames.has(powerRow.name);
        // Fallback: linear scan
        for (let index = 0; index < powers.length; index++) {
            if (powers[index].name === powerRow.name) return true;
        }
        return false;
    }

    /** Safely read powerCount from a power/talent entry, defaulting to 1. */
    static _safeSlotCount(obj) {
        return Utility.getValue(obj, "powerCount", 1) || 1;
    }

    /** Check if there are remaining power slots for another power. */
    static _hasRemainingSlots(char, slotsNeeded) {
        const currentSlots = char.powers.reduce(
            (sum, p) => sum + (p.powerSlots || 1),
            0,
        );
        return currentSlots + slotsNeeded <= char.powersMax;
    }

    static _parseUpgradePower(upgradePowerString) {
        if (!upgradePowerString) return null;
        const parts = upgradePowerString.split("\\");
        if (parts.length < 2) return null;
        return {
            category: parts[0],
            powerName: parts[1],
            condition: parts.length > 2 ? parts[2] : null,
        };
    }

    canUpgradePower(char, powerIndex, upgradeInfo) {
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
    }

    applyPowerUpgrade(char, powerIndex, upgradeInfo) {
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
        let value = Utility.getValue(
            physicalFormRow,
            "allPowersRankAdjustment",
            0,
        );
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
    }

    getUpgradeOption(powerIndex, char) {
        const upgrades =
            (char && char._pendingPowerUpgrades) ||
            this._pendingPowerUpgrades ||
            [];
        const pending = upgrades.find((u) => u.powerIndex === powerIndex);
        if (!pending) return null;

        const originalPower = char.powers[powerIndex];
        const check = this.canUpgradePower(
            char,
            powerIndex,
            pending.upgradeInfo,
        );
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
    }

    removePower(char, powerIndex) {
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
    }

    generateSinglePower(char, powerRollIndex) {
        const currentSlots = char.powers
            .map((p) => p.powerSlots)
            .reduce((acc, value) => acc + value, 0);
        const remainingSlots = char.powersCount - currentSlots;
        if (remainingSlots <= 0) {
            char.logRoll("Power Gen", "Base Rules", "No remaining slots");
            return;
        }

        // 0. Use pre-selected power if available (Choose mode)
        if (
            this._preSelectedPowers &&
            this._preSelectedPowers[powerRollIndex]
        ) {
            const preSelected = this._preSelectedPowers[powerRollIndex];
            let category = preSelected.category;
            let powerRow = this.powerListTable.find(
                (r) =>
                    r.category === category && r.name === preSelected.powerName,
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
                const powerRankColumn = this.generatorMode === "basic" ? 1 : 4;
                let rankRow = Utility.findRow(this, rankRoll, powerRankColumn);
                const physicalFormRow = this.physicalFormTable.find(
                    (r) => r.name === char.physicalForm,
                );
                let value = Utility.getValue(
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
                    rankRow = this.randomRanksTable.find(
                        (r) => r.rank === rank,
                    );
                }
                let extraInformation = "";
                value = Utility.getValue(powerRow, "rollExtraInformation", "");
                if (value !== "") {
                    if (Array.isArray(value)) {
                        for (
                            let reiIndex = 0;
                            reiIndex < value.length;
                            reiIndex++
                        ) {
                            extraInformation += this.getExtraInformation(
                                value[reiIndex],
                            );
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
                }
                char.powers.push({
                    name: powerRow.name,
                    code: powerRow.code,
                    category: category,
                    description: powerRow.description,
                    rank: rankRow.rank,
                    number: rankRow.rankNumber,
                    powerSlots: CharacterGenerator._safeSlotCount(powerRow),
                    extraInformation: extraInformation,
                });
                if (this._assignedPowerNames)
                    this._assignedPowerNames.add(powerRow.name);
                char.logRoll(
                    "Power Gen",
                    `Choose: ${rankRoll}`,
                    `${category}: ${powerRow.name} (${rankRow.rank})`,
                );

                // Check for upgradePower option
                value = Utility.getValue(powerRow, "upgradePower", "");
                if (value !== "" && this._pendingPowerUpgrades) {
                    const upgradeInfo =
                        CharacterGenerator._parseUpgradePower(value);
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
                        value = Utility.getValue(
                            powerRow,
                            "optionalPowersMax",
                            100,
                        );
                        this.generateOptionalPower(
                            char,
                            value,
                            powerRow.optionalPowers,
                            powerRow.name,
                        );
                    }
                }
                return;
            }
        }

        // 1. Roll Category
        let catRoll = this.powerCategoryRolls[powerRollIndex];
        if (catRoll < 1 || catRoll > 100) {
            char.logRoll(
                "Power Gen",
                `Invalid Category Roll`,
                `Roll: ${catRoll}`,
            );
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
            char.logRoll(
                "Power Gen",
                `Duplicate Power`,
                `Power: ${powerRow.name}`,
            );
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
                        (r) =>
                            r.category === category && powerRoll <= r.maxRoll,
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
                        (r) =>
                            r.category === category && powerRoll <= r.maxRoll,
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
            char.logRoll(
                "Power Gen",
                `Too Many Powers`,
                `Power: ${powerRow.name}`,
            );
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

        // 3. Determine Rank
        // Power ranks: Column 1 for Basic (Basic rules p40), Column 4 for Advanced/Ultimate
        const physicalFormRow = this.physicalFormTable.find(
            (r) => r.name === char.physicalForm,
        );
        const rankRoll = this.powerRankRolls[powerRollIndex];
        const powerRankColumn = this.generatorMode === "basic" ? 1 : 4;
        let rankRow = Utility.findRow(this, rankRoll, powerRankColumn);

        let value = Utility.getValue(
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

        let extraInformation = "";
        value = Utility.getValue(powerRow, "rollExtraInformation", "");
        if (value !== "") {
            if (Array.isArray(value)) {
                for (let reiIndex = 0; reiIndex < value.length; reiIndex++) {
                    extraInformation += this.getExtraInformation(
                        value[reiIndex],
                    );
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
        }

        char.powers.push({
            name: powerRow.name,
            code: powerRow.code,
            category: category,
            description: powerRow.description,
            rank: rankRow.rank,
            number: rankRow.rankNumber,
            powerSlots: CharacterGenerator._safeSlotCount(powerRow),
            extraInformation: extraInformation,
        });
        if (this._assignedPowerNames)
            this._assignedPowerNames.add(powerRow.name);
        char.logRoll(
            "Power Gen",
            `${catRoll}/${powerRoll}/${rankRoll}`,
            `${category}: ${powerRow.name} (${rankRow.rank})`,
        );

        // Check for upgradePower option
        value = Utility.getValue(powerRow, "upgradePower", "");
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
                value = Utility.getValue(powerRow, "optionalPowersMax", 100);
                this.generateOptionalPower(
                    char,
                    value,
                    powerRow.optionalPowers,
                    powerRow.name,
                );
            }
        }
    }

    getRitualRollsExtraInformation() {
        let returnValue = "";

        const table = RITUAL_ROLLS_TABLE;
        const thisRoll = this.powersExtraInfoRolls[this.peiIndex];
        const ritualRolls = table.find((f) => thisRoll <= f.maxRoll);
        this.peiIndex++;

        returnValue += ` RITUALS (${ritualRolls.mechanismCount}): `;

        for (let index = 0; index < ritualRolls.mechanismCount; index++) {
            const mechTable = MAGIC_MECHANISM_TABLE;
            let mechRoll = this.powersExtraInfoRolls[this.peiIndex];
            while (mechRoll > 84) {
                mechRoll = this.powersExtraInfoRolls[this.peiIndex];
                this.peiIndex++;
            }
            const mechForm = mechTable.find((f) => mechRoll <= f.maxRoll);
            returnValue += mechForm.name + "/" + mechForm.description + " ";
            this.peiIndex++;
        }

        return returnValue.trim();
    }

    getExtraInformation(value) {
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
    }

    generatorBonusPowerOfPhysicalForm(char, bonusPowerString, slotIndex) {
        // If user selected a bonus power for this slot, use it directly
        if (
            this._selectedBonusPowers &&
            slotIndex !== undefined &&
            this._selectedBonusPowers[slotIndex]
        ) {
            const sel = this._selectedBonusPowers[slotIndex];
            const p = this.powerListTable.find(
                (c) => c.category === sel.category && c.name === sel.name,
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
                return;
            }
        }

        // Fall through to rolling logic
        let indexAdjustment = 0;
        const powers = bonusPowerString.split("|");
        let powersToPickFrom = [];

        for (let index = 0; index < powers.length; index++) {
            const parts = powers[index].split("\\");
            const otherParts =
                parts.length === 3 ? parts[2].split("(") : parts[1].split("(");
            let subType = null;

            const subTypePos = parts[0].indexOf("(");
            if (subTypePos !== 0) {
                subType = parts[0].substring(0, subTypePos);
                parts[0] = parts[0].substring(subTypePos + 1);
            }

            const category = parts[0];
            let name = parts.length === 3 ? parts[1] : otherParts[0];
            const assignedRank = parts.length === 3 ? otherParts[0] : null;
            const roll = +otherParts[1].replace(/\)/g, "");

            if (name === "Any") {
                while (true) {
                    let thisRoll =
                        this.powerRolls[char.powers.length + indexAdjustment];
                    while (thisRoll > 100) {
                        thisRoll =
                            this.powerRolls[
                                char.powers.length + indexAdjustment
                            ];
                        indexAdjustment++;
                    }
                    const p = this.powerListTable.find(
                        (c) => c.category === category && thisRoll <= c.maxRoll,
                    );
                    name = p.name;

                    if (
                        this.isPowerAlreadyAssigned(char.powers, p) ||
                        this.isPowerAlreadyAssigned(powersToPickFrom, p)
                    ) {
                        indexAdjustment++;
                    } else {
                        break;
                    }
                }
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
    }

    /**
     * Apply a user-selected bonus power from the selection dialog.
     * @param {Character} char
     * @param {{ category: string, name: string }} selection
     */
    applySelectedBonusPower(char, selection) {
        if (!selection || !selection.name) return;
        const p = this.powerListTable.find(
            (c) =>
                c.category === selection.category && c.name === selection.name,
        );
        if (!p) return;

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
        if (!rankRow) return;
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

    generateBonusPower(char, bonusPowerString) {
        const powers = bonusPowerString.split("|");
        for (let index = 0; index < powers.length; index++) {
            const parts = powers[index].split("\\");
            const category = parts[0];
            const otherParts = parts[1].split("(");
            const name = otherParts[0];
            const roll = +otherParts[1].replace(")", "");

            powers[index] = {
                category: category,
                name: name,
                maxRoll: roll,
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
    }

    generateOptionalPower(char, maxNumber, optionalPowersString, sourcePowerName) {
        // This will work sort of like the bonus.  Except it will fill up any power slots using optional powers
        // This means we aren't rolling to determine which optional power, but we will roll for the rank.

        // If manual selection is active, only apply user-selected optional powers for this source
        if (this.selectOptionalPowersManually && this._selectedOptionalPowers && sourcePowerName) {
            const selected = this._selectedOptionalPowers[sourcePowerName];
            if (!selected || selected.length === 0) return; // User selected none for this source
            // Rebuild potentialPowers from selections only
            const potentialPowers = [];
            for (let i = 0; i < selected.length; i++) {
                potentialPowers.push({ category: selected[i].category, name: selected[i].name });
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
                const optionalPowerRankColumn = this.generatorMode === "basic" ? 1 : 3;
                const rankRoll = this.powerRankRolls[startIndex + index];
                const rankRow = Utility.findRow(this, rankRoll, optionalPowerRankColumn);
                if (!rankRow) continue;
                const optSlotCount = CharacterGenerator._safeSlotCount(p);
                if (CharacterGenerator._hasRemainingSlots(char, optSlotCount) && !this.isPowerAlreadyAssigned(char.powers, p)) {
                    char.powers.push({
                        category: p.category, name: p.name, code: p.code,
                        description: p.description, rank: rankRow.rank, number: rankRow.rankNumber,
                        powerSlots: optSlotCount, optionalPower: true,
                    });
                    if (this._assignedPowerNames) this._assignedPowerNames.add(p.name);
                }
            }
            return;
        }

        let indexAdjustment = 0;
        let potentialPowers = [];
        const powers = optionalPowersString.split("|");
        for (let index = 0; index < powers.length; index++) {
            let thisPowerString = powers[index];

            if (thisPowerString === "") continue;

            if (powers[index].indexOf("~") !== -1) {
                const thisList = powers[index].split("~");
                let randomRoll = Math.floor(Math.random() * thisList.length);
                thisPowerString = thisList[randomRoll];
            }

            const parts = thisPowerString.split("\\");
            const category = parts[0];
            let name = parts[1];

            if (name === "Any") {
                while (true) {
                    let thisRoll =
                        this.powerRolls[char.powers.length + indexAdjustment];
                    while (thisRoll > 100) {
                        thisRoll =
                            this.powerRolls[
                                char.powers.length + indexAdjustment
                            ];
                        indexAdjustment++;
                    }
                    const p = this.powerListTable.find(
                        (c) => c.category === category && thisRoll <= c.maxRoll,
                    );
                    name = p.name;

                    if (
                        this.isPowerAlreadyAssigned(char.powers, p) ||
                        this.isPowerAlreadyAssigned(potentialPowers, p)
                    ) {
                        indexAdjustment++;
                    } else {
                        break;
                    }
                }
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
            const p = this.powerListTable.find(
                (c) => c.category === power.category && c.name === power.name,
            );
            if (!p) continue;

            const optionalPowerRankColumn =
                this.generatorMode === "basic" ? 1 : 3;
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
                if (this._assignedPowerNames)
                    this._assignedPowerNames.add(p.name);
            }
        }
    }

    getBoostLevel(char) {
        return char.origin === "Alien" ? 2 : 1;
    }

    boostAbility(char, abilityName) {
        if (char.boostApplied) return false;
        const boostLevel = this.getBoostLevel(char);
        const ability = char.primaryAbilities[0][abilityName];
        const currentIndex = this.randomRanksTable.findIndex(
            (r) => r.rank === ability.rank,
        );
        if (
            currentIndex === -1 ||
            currentIndex >= this.randomRanksTable.length - 1
        )
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
    }

    boostPower(char, powerIndex) {
        if (char.boostApplied) return false;
        if (powerIndex < 0 || powerIndex >= char.powers.length) return false;
        const boostLevel = this.getBoostLevel(char);
        const power = char.powers[powerIndex];
        const currentIndex = this.randomRanksTable.findIndex(
            (r) => r.rank === power.rank,
        );
        if (
            currentIndex === -1 ||
            currentIndex >= this.randomRanksTable.length - 1
        )
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
    }

    // --- Bonus Power Selection ---
    // When selectBonusPowers is true, _selectedBonusPowers is populated
    // before generation. generatorBonusPowerOfPhysicalForm() uses the
    // selection instead of rolling.

    static parseBonusPowerOptions(bonusPowerString) {
        if (!bonusPowerString) return [];
        const powers = bonusPowerString.split("|");
        const options = [];
        for (let i = 0; i < powers.length; i++) {
            if (powers[i] === "") continue;
            const parts = powers[i].split("\\");
            let category = parts[0];
            // Handle subType prefix: e.g. "Demon(Energy Emission\\Fire Generation\\Good(100))"
            const subTypePos = category.indexOf("(");
            if (subTypePos !== -1 && subTypePos !== 0) {
                category = category.substring(subTypePos + 1);
            } else if (subTypePos === 0) {
                category = category.substring(1);
            }
            const namePart =
                parts.length === 3 ? parts[1] : parts[1].split("(")[0];
            const rollPart = parts.length === 3 ? parts[2] : parts[1];
            const rollMatch = rollPart.match(/\((\d+)\)/);
            const maxRoll = rollMatch ? parseInt(rollMatch[1]) : 100;
            options.push({ category, name: namePart, maxRoll });
        }
        return options;
    }

    _simulateRolledPowers() {
        const rolled = new Set();
        if (
            !this.powerListTable ||
            !this.powerCategoriesTable ||
            !this.quantityTable
        )
            return rolled;

        // Determine how many powers to roll
        const pRoll = this.powerNumberRoll;
        const pQtyRow = this.quantityTable.find((o) => pRoll <= o.maxRoll);
        if (!pQtyRow) return rolled;
        let powersCount = pQtyRow.powers.initial;
        const physicalFormRow = this.physicalFormTable.find(
            (r) => r.name === this._lastPhysicalForm,
        );
        if (physicalFormRow) {
            const adj = Utility.getValue(
                physicalFormRow,
                "powersCountAdjustment",
                0,
            );
            powersCount = Math.max(0, powersCount + adj);
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
    }

    getBonusPowerOptions() {
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
                        CharacterGenerator.parseBonusPowerOptions(
                            formBonusPower,
                        );
                    if (allOptions.length > 1) {
                        return [
                            {
                                source: "physicalForm",
                                count: formCount,
                                options: allOptions,
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
            const bonusPowerString = Utility.getValue(
                powerRow,
                "bonusPower",
                "",
            );
            if (!bonusPowerString) continue;
            const options =
                CharacterGenerator.parseBonusPowerOptions(bonusPowerString);
            if (options.length <= 1) continue; // Single option — auto-assign, no selection needed
            slots.push({
                source: "powerList",
                sourcePowerName: powerRow.name,
                sourcePowerCategory: powerRow.category,
                count: count,
                options: options,
            });
        }
        return slots;
    }

    /**
     * Collect all available optional powers from the power list table.
     * Returns an array of objects: { sourcePowerName, sourcePowerCategory, maxCount, options: [{category, name}] }
     * Each entry represents a power that has optionalPowers defined.
     */
    getOptionalPowerOptions() {
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
            const parts = optString.split("|");
            for (let i = 0; i < parts.length; i++) {
                let part = parts[i];
                if (!part) continue;

                // Handle ~ for random alternatives — expand each alternative
                if (part.indexOf("~") !== -1) {
                    const alts = part.split("~");
                    for (let k = 0; k < alts.length; k++) {
                        const expanded = parseOptionalString(alts[k]);
                        options.push(...expanded);
                    }
                    continue;
                }

                const pParts = part.split("\\");
                if (pParts.length < 2) continue;

                const category = pParts[0];
                // Strip (maxRoll) suffix: "Cold Generation(100)" -> "Cold Generation"
                const rawName = pParts[1];
                const name = rawName.replace(/\(\d+\)/, "");

                if (name === "Any") {
                    // Expand to all powers in this category from the power list
                    const catPowers = this.powerListTable.filter(
                        (p) => p.category === category,
                    );
                    for (let p = 0; p < catPowers.length; p++) {
                        options.push({ category: category, name: catPowers[p].name });
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
            const optPowers = Utility.getValue(physicalFormRow, "optionalPowers", "");
            if (optPowers) {
                const maxCount = Utility.getValue(physicalFormRow, "optionalPowersMax", 100);
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

        for (let i = 0; i < this.powerListTable.length; i++) {
            const powerRow = this.powerListTable[i];
            if (!rolledPowers.has(powerRow.name)) continue;

            const optionalPowersString = Utility.getValue(powerRow, "optionalPowers", "");
            if (!optionalPowersString) continue;

            const maxCount = Utility.getValue(powerRow, "optionalPowersMax", 100);
            const allOptions = parseOptionalString(optionalPowersString);

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
    }

    // --- Power Selection (Choose Mode) ---
    // When choosePowerInsteadOfRandom is true, the UI or test API
    // populates _preSelectedPowers before generate() is called.
    // generateSinglePower() reads from _preSelectedPowers instead
    // of rolling category + power, but still rolls the rank.

    getPowerSlotsAndCategories() {
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
        // Determine power count (same logic as determineSpecialAbilities)
        const pRoll = Math.max(1, Math.min(100, this.powerNumberRoll || 1));
        const pQtyRow = this.quantityTable.find((q) => pRoll <= q.maxRoll);
        let powersCount = pQtyRow.powers.initial;
        const powersMax = pQtyRow.powers.maximum;

        const physicalFormRow = this.physicalFormTable.find(
            (o) => o.name === char.physicalForm,
        );
        // Apply same adjustments as determineSpecialPowerAdjustment
        let value = Utility.getValue(physicalFormRow, "powersCountSet", -1);
        if (value !== -1) {
            powersCount = value;
        } else {
            value = Utility.getValue(
                physicalFormRow,
                "powersCountAdjustment",
                0,
            );
            if (value !== 0) powersCount += value;
            if (powersCount > powersMax) powersCount = powersMax;
            value = Utility.getValue(physicalFormRow, "powersCountMinimum", -1);
            if (value !== -1 && value > powersCount) powersCount = value;
            value = Utility.getValue(physicalFormRow, "powersCountMaximum", -1);
            if (value !== -1 && value < powersCount) powersCount = value;
        }

        // Subtract bonus power count — bonus powers occupy slots but are
        // generated automatically, so the user only chooses from remaining slots.
        const bonusCount = Utility.getValue(
            physicalFormRow,
            "bonusPowerCount",
            0,
        );
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
    }

    getPowersForCategory(categoryName) {
        if (!this.powerListTable) return [];
        return this.powerListTable
            .filter((p) => p.category === categoryName)
            .map((p) => ({
                name: p.name,
                category: p.category,
                description: p.description,
                powerCount: Utility.getValue(p, "powerCount", 1),
            }));
    }

    getPowerCategoryNames() {
        if (!this.powerCategoriesTable) return [];
        return [...new Set(this.powerCategoriesTable.map((c) => c.name))];
    }
}
