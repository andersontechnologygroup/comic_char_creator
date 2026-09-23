/**
 * CharacterGenerator — core class (issue #11 split).
 *
 * This file declares the class, its fields and the generation lifecycle.
 * Domain methods live in sibling files that augment the prototype and
 * must load after this one:
 *   CharacterGeneratorDetermination.js — form/origin/abilities/resources/
 *     health/popularity/weakness/boosts
 *   CharacterGeneratorPowers.js — power counts, generation, upgrades,
 *     bonus/optional powers, options and simulation
 *   CharacterGeneratorRoster.js — talents and contacts
 * See comiccharcreator.html <script> order and run-tests.js CORE_FILES.
 */
class CharacterGenerator {
    static _debugOverrides = null; // { physicalFormRoll, originRoll, ... } — applied during generateWithoutThrows()

    /** Canonical scalar roll override keys accepted by applyRollOverrides().
     *  Debug-page overrides and generateCharacter() options share this list —
     *  add new overridable rolls here so every override path picks them up. */
    static ROLL_OVERRIDE_KEYS = [
        "physicalFormRoll",
        "subTypeRoll",
        "originRoll",
        "randomRanksColumn",
        "compoundRandomRanksColumnRoll",
        "combinationsRoll",
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

    /** Canonical array roll override keys (values are arrays). */
    static ROLL_OVERRIDE_ARRAY_KEYS = [
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

    /**
     * Apply roll overrides from an options/debug object onto a generator.
     * Shared by generateWithoutThrows() (Debug page), generateCharacter()
     * (initial options) and the post-deterministic re-apply, so the accepted
     * key lists can never drift apart.
     * Array handling: "replace" assigns the whole array (full options);
     * "first" overwrites only element 0 (Debug page partial overrides).
     * @param {CharacterGenerator} gen
     * @param {object} source plain object of override values
     * @param {"replace"|"first"} arrayMode
     */
    static applyRollOverrides(gen, source, arrayMode) {
        if (!source) return;
        for (const key of CharacterGenerator.ROLL_OVERRIDE_KEYS) {
            if (source[key] !== undefined) gen[key] = source[key];
        }
        for (const key of CharacterGenerator.ROLL_OVERRIDE_ARRAY_KEYS) {
            if (source[key] === undefined) continue;
            if (arrayMode === "replace") gen[key] = source[key];
            else gen[key][0] = source[key][0];
        }
    }

    rollArraySize = 100;

    physicalFormRoll = 0;
    subTypeRoll = 0;
    compoundRandomRanksColumnRoll = 0;
    combinationsRoll = 0;
    bodyTypeRolls = Array(10).fill(0);
    originRoll = 0;
    anyAbilityAdjustmentRoll = 0;

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
    newInArea = false;
    buildMode = "random"; // "random" or "selected"

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
        this.anyAbilityAdjustmentRoll = 0;
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
        this._processedOptionalSources = null;
        this.contactsEqualToPowers = true;
        this.choosePowerInsteadOfRandom = false;
        this.wellEstablished = false;
        this.looksHuman = false;
        this.newInArea = false;
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

        char.logRoll(`generatorMode`, "N/A", this.generatorMode);
        char.logRoll(`identitySecret`, "N/A", this.identitySecret);
        char.logRoll(`originPublic`, "N/A", this.originPublic);
        char.logRoll(`hiTechToGood`, "N/A", this.hiTechToGood);
        char.logRoll(`applyOptionalPowers`, "N/A", this.applyOptionalPowers);
        char.logRoll(
            `selectOptionalPowersManually`,
            "N/A",
            this.selectOptionalPowersManually,
        );
        char.logRoll(
            `contactsEqualToPowers`,
            "N/A",
            this.contactsEqualToPowers,
        );
        char.logRoll(
            `choosePowerInsteadOfRandom`,
            "N/A",
            this.choosePowerInsteadOfRandom,
        );
        char.logRoll(`wellEstablished`, "N/A", this.wellEstablished);
        char.logRoll(`looksHuman`, "N/A", this.looksHuman);
        char.logRoll(`newInArea`, "N/A", this.newInArea);
        char.logRoll(`selectBonusPowers`, "N/A", this.selectBonusPowers);
        char.logRoll(
            `selectPhysicalFormManually`,
            "N/A",
            this.selectPhysicalFormManually,
        );
        char.logRoll(`selectTalentManually`, "N/A", this.selectTalentManually);
        char.logRoll(
            `selectContactManually`,
            "N/A",
            this.selectContactManually,
        );
        char.logRoll("useUltimateTalents", "N/A", this.useUltimateTalents);

        this.setTables();
        this._assignedPowerNames = new Set(); // O(1) duplicate detection
        this._assignedTalentNames = new Set();
        this._assignedContactNames = new Set();
        this._pendingPowerUpgrades = [];
        this._processedOptionalSources = null;

        // Apply debug overrides from Debug & Tests page (used by Render generates)
        if (CharacterGenerator._debugOverrides) {
            CharacterGenerator.applyRollOverrides(
                this,
                CharacterGenerator._debugOverrides,
                "first",
            );
        }

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
            // Apply roll overrides — canonical key lists shared with the
            // Debug-page path via applyRollOverrides()
            CharacterGenerator.applyRollOverrides(gen, options, "replace");

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
                "newInArea",
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
            // Re-apply all explicit overrides (scalars AND arrays) after
            // deterministic rolls — setDeterministicRolls() replaces both
            CharacterGenerator.applyRollOverrides(gen, options, "replace");
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

            if (this.useUltimateTalents) {
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

    // --- Bonus Power Selection ---
    // When selectBonusPowers is true, _selectedBonusPowers is populated
    // before generation. generatorBonusPowerOfPhysicalForm() uses the
    // selection instead of rolling.

    /**
     * Collect all available optional powers from the power list table.
     * Returns an array of objects: { sourcePowerName, sourcePowerCategory, maxCount, options: [{category, name}] }
     * Each entry represents a power that has optionalPowers defined.
     */

    // --- Power Selection (Choose Mode) ---
    // When choosePowerInsteadOfRandom is true, the UI or test API
    // populates _preSelectedPowers before generate() is called.
    // generateSinglePower() reads from _preSelectedPowers instead
    // of rolling category + power, but still rolls the rank.
}
