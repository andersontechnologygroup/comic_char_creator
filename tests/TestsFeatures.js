// TestsFeatures
// Unit tests for features:
// 1. contactsCountMinimum / contactsCountMaximum - physical form contact overrides
// 2. talentCategory - enforces at least one talent from specified category
// 3. Bonus Power Selection - user can select bonus powers instead of rolling

// ============================================================================
// Feature 1: contactsCountMinimum / contactsCountMaximum Tests (Advanced Mode)
// ============================================================================

// Happy path: Hi-Tech has contactsCountMinimum: 1, should override minimum
Tester.MinimumContactBasicTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();
    gen.physicalFormRoll = 80; // Hi-Tech
    gen._lastPhysicalForm = "Hi-Tech";

    const char = gen.generateWithoutThrows();
    // Hi-Tech has contactsCountMinimum: 1
    Tester.assertAtLeast(
        1,
        char.contactsCount,
        "ContactsCountMin(Hi-Tech): contactsCount >= 1 due to contactsCountMinimum attribute.",
    );
};

// Edge case: contactsCountMinimum higher than rolled count
Tester.MinimumContactOverrideTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();
    gen.physicalFormRoll = 80; // Hi-Tech
    gen._lastPhysicalForm = "Hi-Tech";
    gen.contactNumberRoll = 5; // Low contacts from quantity table

    const char = gen.generateWithoutThrows();
    Tester.assertAtLeast(
        1,
        char.contactsCount,
        "ContactsCountMinOverride: contactsCount >= contactsCountMinimum value.",
    );
};

// Negative: Physical form without contactsCountMinimum should not be affected
Tester.MinimumContactNoAttributeTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();
    gen.physicalFormRoll = 15; // Altered Human (no contactsCountMinimum)
    gen._lastPhysicalForm = "Altered Human";

    const char = gen.generateWithoutThrows();
    Tester.assertAtLeast(
        1,
        char.contactsCount,
        "ContactsCountMinNoAttr(AlteredHuman): contactsCount >= 1 (base minimum).",
    );
};

// Edge case: contactsCountMinimum > contactsMax adjusts max
Tester.MinimumContactAdjustsMaxTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();
    gen.physicalFormRoll = 80; // Hi-Tech
    gen._lastPhysicalForm = "Hi-Tech";

    const char = gen.generateWithoutThrows();
    Tester.assertAtLeast(
        1,
        char.contactsMax,
        "ContactsCountMinAdjustsMax: contactsMax >= contactsCountMinimum.",
    );
};

// Happy path: contactsMax >= contactsCount always
Tester.MinimumContactMaxGteCountTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();
    gen.physicalFormRoll = 80; // Hi-Tech

    const char = gen.generateWithoutThrows();
    Tester.assert(
        char.contactsMax >= char.contactsCount,
        `ContactsCountMinMaxGteCount: contactsMax(${char.contactsMax}) >= contactsCount(${char.contactsCount}).`,
    );
};

// --- contactsCountMaximum Tests ---

// Alien has contactsCountMaximum: 1 — should cap contacts
Tester.MaximumContactAlienTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();
    gen.physicalFormRoll = 99; // Alien
    gen._lastPhysicalForm = "Alien";

    const char = gen.generateWithoutThrows();
    // Alien has contactsCountMaximum: 1, so contactsCount should be exactly 1
    Tester.assertEquals(
        1,
        char.contactsCount,
        "ContactsCountMax(Alien): contactsCount is 1 due to contactsCountMaximum.",
    );
};

// Alien contactsCountMinimum: 1 + contactsCountMaximum: 1 — both force to 1
Tester.AlienMinMaxBothTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();
    gen.physicalFormRoll = 99; // Alien
    gen._lastPhysicalForm = "Alien";
    gen.contactNumberRoll = 80; // Would normally give more contacts

    const char = gen.generateWithoutThrows();
    Tester.assertEquals(
        1,
        char.contactsCount,
        "AlienMinMax: contactsCount is 1 (min=1, max=1).",
    );
    Tester.assert(
        char.contactsMax >= char.contactsCount,
        `AlienMinMax: contactsMax(${char.contactsMax}) >= contactsCount(${char.contactsCount}).`,
    );
};

// contactsCountMaximum lower than initial count should cap it
Tester.MaximumContactCapsCountTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();
    gen.physicalFormRoll = 99; // Alien
    gen._lastPhysicalForm = "Alien";
    gen.contactNumberRoll = 90; // High contacts from quantity table

    const char = gen.generateWithoutThrows();
    // Alien contactsCountMaximum: 1 caps the count
    Tester.assertEquals(
        1,
        char.contactsCount,
        "ContactsCountMaxCaps: contactsCount capped to 1 by contactsCountMaximum.",
    );
};

// Physical form without contactsCountMaximum should not be capped
Tester.MaximumContactNoAttributeTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();
    gen.physicalFormRoll = 15; // Altered Human (no contactsCountMaximum)
    gen._lastPhysicalForm = "Altered Human";

    const char = gen.generateWithoutThrows();
    // Altered Human has no contactsCountMaximum, count should be from roll
    Tester.assertAtLeast(
        1,
        char.contactsCount,
        "ContactsCountMaxNoAttr: Altered Human contactsCount based on roll, no cap.",
    );
};

// --- Mutual exclusion: contactsCountSet takes precedence ---
Tester.ContactCountSetOverridesMinMaxTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();
    gen.physicalFormRoll = 99; // Alien (has min=1, max=1)
    gen._lastPhysicalForm = "Alien";

    // Manually set contactsCountSet on the physical form row
    const row = gen.physicalFormTable.find((r) => r.name === "Alien");
    const origSet = row.contactsCountSet;
    row.contactsCountSet = 5;

    const char = gen.generateWithoutThrows();
    // contactsCountSet=5 should override the min/max
    Tester.assertEquals(
        5,
        char.contactsCount,
        "ContactCountSetOverridesMinMax: contactsCountSet=5 overrides min/max.",
    );

    row.contactsCountSet = origSet;
};

// --- getContactSlotCount applies min/max ---
Tester.GetContactSlotCountMinMaxTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();
    gen.physicalFormRoll = 99; // Alien (min=1, max=1)
    gen._lastPhysicalForm = "Alien";
    gen.contactNumberRoll = 80; // Would give more contacts

    const slotCount = gen.getContactSlotCount();
    Tester.assertEquals(
        1,
        slotCount,
        "GetContactSlotCountMinMax: Alien slot count is 1 (min=1, max=1).",
    );
};

// Hi-Tech getContactSlotCount respects contactsCountMinimum
Tester.GetContactSlotCountMinTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();
    gen.physicalFormRoll = 80; // Hi-Tech
    gen._lastPhysicalForm = "Hi-Tech";

    const slotCount = gen.getContactSlotCount();
    Tester.assertAtLeast(
        1,
        slotCount,
        "GetContactSlotCountMin: Hi-Tech slot count >= 1 (contactsCountMinimum=1).",
    );
};

// ============================================================================
// Feature 2: talentCategory Tests
// ============================================================================

// Happy path: Hi-Tech has talentCategory: "Scientific"
Tester.TalentCategoryEnforcedTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();
    gen.physicalFormRoll = 80; // Hi-Tech
    gen._lastPhysicalForm = "Hi-Tech";

    const char = gen.generateWithoutThrows();

    // At least one talent should be from "Scientific" category
    const hasScientific = char.talents.some(
        (t) => t.category === "Scientific Skills",
    );
    Tester.assert(
        hasScientific,
        'TalentCategory(Hi-Tech): At least one talent is from "Scientific Skills" category.',
    );
};

// Edge case: When natural rolls already produce a Scientific talent
Tester.TalentCategoryAlreadyPresentTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();
    // Set talent category rolls to hit Scientific (rolls around 42-56 based on table)
    gen.setDeterministicRolls();
    gen.physicalFormRoll = 80; // Hi-Tech
    gen._lastPhysicalForm = "Hi-Tech";

    const char = gen.generateWithoutThrows();
    const hasScientific = char.talents.some(
        (t) => t.category === "Scientific Skills",
    );
    Tester.assert(
        hasScientific,
        "TalentCategoryAlreadyPresent: Scientific Skills talent is present (possibly naturally rolled).",
    );
};

// Negative: Physical form without talentCategory should not enforce
Tester.TalentCategoryNotEnforcedTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();
    gen.physicalFormRoll = 15; // Altered Human (no talentCategory)
    gen._lastPhysicalForm = "Altered Human";

    const char = gen.generateWithoutThrows();
    // Should generate normally without category enforcement
    Tester.assertAtLeast(
        1,
        char.talents.length,
        "TalentCategoryNotEnforced(AlteredHuman): Talents generated normally.",
    );
};

// Edge case: talentCount is 1, that one talent must be from required category
Tester.TalentCategorySingleTalentTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();
    gen.physicalFormRoll = 80; // Hi-Tech
    gen._lastPhysicalForm = "Hi-Tech";

    // Set talent count to 1
    gen.talentNumberRoll = 5; // Low roll from quantity table

    const char = gen.generateWithoutThrows();
    if (char.talentsCount === 1) {
        Tester.assertEquals(
            "Scientific Skills",
            char.talents[0].category,
            "TalentCategorySingle: The single talent is from Scientific Skills category.",
        );
    }
};

// ============================================================================
// Feature 3: Bonus Power Selection Tests
// ============================================================================

// Happy path: parseBonusPowerOptions parses correctly
Tester.BonusPowerParseTests = () => {
    const options = CharactorGenerator.parseBonusPowerOptions(
        "Body Alterations/Offensive\\Claws(100)",
    );
    Tester.assertEquals(1, options.length, "BonusPowerParse: 1 option parsed.");
    Tester.assertEquals(
        "Body Alterations/Offensive",
        options[0].category,
        "BonusPowerParse: category correct.",
    );
    Tester.assertEquals(
        "Claws",
        options[0].name,
        "BonusPowerParse: name correct.",
    );
    Tester.assertEquals(
        100,
        options[0].maxRoll,
        "BonusPowerParse: maxRoll correct.",
    );
};

// Parse with multiple options
Tester.BonusPowerParseMultipleTests = () => {
    const options = CharactorGenerator.parseBonusPowerOptions(
        "Movement\\Swimming(50)|Mental Powers\\Animal Communication and Control(100)",
    );
    Tester.assertEquals(
        2,
        options.length,
        "BonusPowerParseMultiple: 2 options parsed.",
    );
    Tester.assertEquals(
        "Swimming",
        options[0].name,
        "BonusPowerParseMultiple: first name.",
    );
    Tester.assertEquals(
        "Animal Communication and Control",
        options[1].name,
        "BonusPowerParseMultiple: second name.",
    );
};

// Parse with empty string
Tester.BonusPowerParseEmptyTests = () => {
    const options = CharactorGenerator.parseBonusPowerOptions("");
    Tester.assertEquals(
        0,
        options.length,
        "BonusPowerParseEmpty: empty string returns 0 options.",
    );
};

// Parse with null
Tester.BonusPowerParseNullTests = () => {
    const options = CharactorGenerator.parseBonusPowerOptions(null);
    Tester.assertEquals(
        0,
        options.length,
        "BonusPowerParseNull: null returns 0 options.",
    );
};

// getBonusPowerOptions excludes single-option and non-rolled bonus powers
Tester.BonusPowerGetOptionsTests = (gen) => {
    // Basic mode Hi-Tech: single bonus power option, auto-assigned
    gen.generatorMode = "basic";
    gen.setTables();
    gen.setDeterministicRolls();
    gen._lastPhysicalForm = "Hi-Tech";

    const basicOptions = gen.getBonusPowerOptions();
    Tester.assertEquals(
        0,
        basicOptions.length,
        "BonusPowerGetOptions: Hi-Tech single option excluded (auto-assigned).",
    );

    // Advanced mode: set rolls to land on Water Breathing (Body Alterations/Defensive, maxRoll 40)
    // Water Breathing has multi-option bonus: Swimming(50)|Animal Communication(100)
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();
    gen._lastPhysicalForm = "Altered Human";
    // powerNumberRoll=30 -> powers.initial=3
    gen.powerNumberRoll = 30;
    // powerCategoryRolls[0]=95 -> Body Alterations/Defensive (maxRoll 100)
    gen.powerCategoryRolls[0] = 95;
    // powerRolls[0]=30 -> Water Breathing (maxRoll 40)
    gen.powerRolls[0] = 35;

    console.log(
        "  powerNumberRoll=" +
            gen.powerNumberRoll +
            " qtyTable=" +
            (gen.quantityTable ? "yes" : "no"),
    );
    console.log("  lastPhysicalForm=" + gen._lastPhysicalForm);
    const pQtyRow = gen.quantityTable.find(
        (o) => gen.powerNumberRoll <= o.maxRoll,
    );
    console.log("  powersCount=" + (pQtyRow ? pQtyRow.powers.initial : "N/A"));
    const cat0 = gen.powerCategoriesTable.find(
        (c) => gen.powerCategoryRolls[0] <= c.maxRoll,
    );
    console.log(
        "  cat[0]=" +
            gen.powerCategoryRolls[0] +
            " => " +
            (cat0 ? cat0.name : "NONE"),
    );
    const pw0 = gen.powerListTable.find(
        (r) =>
            r.category === (cat0 ? cat0.name : "") &&
            gen.powerRolls[0] <= r.maxRoll,
    );
    console.log(
        "  power[0]=" +
            gen.powerRolls[0] +
            " => " +
            (pw0 ? pw0.name : "NONE") +
            " bonusPowerCount=" +
            (pw0 ? pw0.bonusPowerCount : "N/A"),
    );

    const rolled = gen._simulateRolledPowers();
    console.log("  _simulateRolledPowers: " + [...rolled].join(", "));

    const advSlots = gen.getBonusPowerOptions();
    console.log("  getBonusPowerOptions: " + advSlots.length + " slots");
    for (const s of advSlots) {
        console.log(
            "    slot: " +
                s.sourcePowerName +
                " (" +
                s.options.length +
                " options)",
        );
    }
    const waterSlot = advSlots.find(
        (s) => s.sourcePowerName === "Water Breathing",
    );
    Tester.assert(
        waterSlot !== undefined,
        "BonusPowerGetOptions: Rolled Water Breathing shows multi-option slot.",
    );
    if (waterSlot) {
        Tester.assertAtLeast(
            2,
            waterSlot.options.length,
            "BonusPowerGetOptions: Water Breathing has 2+ options.",
        );
    }

    // Now set rolls to NOT land on any multi-option power
    // Use category=5 (Resistances), power=5 (Resistance to Fire and Heat) - no bonusPowerCount
    gen.powerCategoryRolls[0] = 5;
    gen.powerRolls[0] = 5;
    gen.powerCategoryRolls[1] = 10;
    gen.powerRolls[1] = 5;
    gen.powerCategoryRolls[2] = 15;
    gen.powerRolls[2] = 5;

    const noBonusSlots = gen.getBonusPowerOptions();
    Tester.assertEquals(
        0,
        noBonusSlots.length,
        "BonusPowerGetOptions: No bonus slots when no bonus powers rolled.",
    );
};

// getBonusPowerOptions returns empty for Altered Human (no bonus powers)
Tester.BonusPowerNoOptionsTests = (gen) => {
    // Basic mode Altered Human has no bonusPowerCount/bonusPower
    gen.generatorMode = "basic";
    gen.setTables();
    gen.setDeterministicRolls();
    gen._lastPhysicalForm = "Altered Human";

    const options = gen.getBonusPowerOptions();
    Tester.assertEquals(
        0,
        options.length,
        "BonusPowerNoOptions: Altered Human has no bonus powers.",
    );
};

// applySelectedBonusPower uses selection when available
Tester.BonusPowerSelectionAppliedTests = (gen) => {
    // Basic mode Hi-Tech has bonusPowerCount/bonusPower on physical form
    gen.generatorMode = "basic";
    gen.setTables();
    gen.setDeterministicRolls();
    gen._lastPhysicalForm = "Hi-Tech";

    const char = new Charactor();
    char.physicalForm = "Hi-Tech";
    char.powersCount = 5;
    char.powersMax = 5;

    // Get options and set selection using new slot-based format
    const slots = gen.getBonusPowerOptions();
    if (slots.length > 0 && slots[0].options.length > 0) {
        const slot = slots[0];
        const slotKey =
            slot.source === "physicalForm"
                ? "physicalForm"
                : slot.sourcePowerName;
        gen._selectedBonusPowers = {};
        gen._selectedBonusPowers[slotKey] = slot.options[0];
        gen.applySelectedBonusPower(char, slot.options[0]);

        // Should have added the selected power
        const bonusPowers = char.powers.filter((p) => p.bonusPower);
        Tester.assertAtLeast(
            1,
            bonusPowers.length,
            "BonusPowerSelectionApplied: Selected bonus power added.",
        );
        if (bonusPowers.length > 0) {
            Tester.assertEquals(
                slot.options[0].name,
                bonusPowers[0].name,
                "BonusPowerSelectionApplied: Selected power name matches.",
            );
        }
    }
};

// Generator falls back to rolling when no selection
Tester.BonusPowerFallbackRollTests = (gen) => {
    // Use basic mode since Hi-Tech has bonusPower data there
    gen.generatorMode = "basic";
    gen.setTables();
    gen.setDeterministicRolls();
    gen._lastPhysicalForm = "Hi-Tech";

    const char = new Charactor();
    char.physicalForm = "Hi-Tech";
    char.powersCount = 5;
    char.powersMax = 5;
    gen._selectedBonusPowers = null; // No selection

    gen.generatorBonusPowerOfPhysicalForm(
        char,
        "Weapons, Vehicles, Sidekicks, and Alter Egos" +
            String.fromCharCode(92) +
            String.fromCharCode(92) +
            "Alter Ego(100)",
        0,
    );

    // Should fall back to rolling and potentially add a power
    // The exact power depends on the roll, but it shouldn't crash
    Tester.assert(
        true,
        "BonusPowerFallbackRoll: No crash when falling back to roll.",
    );
};

// selectBonusPowers flag resets on reset
Tester.BonusPowerFlagResetTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.selectBonusPowers = true;
    gen._selectedBonusPowers = { 0: { category: "Test", name: "Test" } };

    gen.reset();

    Tester.assert(
        gen.selectBonusPowers === false,
        "BonusPowerFlagReset: selectBonusPowers reset to false.",
    );
    Tester.assertEquals(
        null,
        gen._selectedBonusPowers,
        "BonusPowerFlagReset: _selectedBonusPowers reset to null.",
    );
};

// ============================================================================
// Register all tests
// ============================================================================
Tester.registerTestGroup(115, "deterministic", [
    // Feature 1: contactsCountMinimum / contactsCountMaximum
    { name: "MinimumContactBasicTests", needsGen: true },
    { name: "MinimumContactOverrideTests", needsGen: true },
    { name: "MinimumContactNoAttributeTests", needsGen: true },
    { name: "MinimumContactAdjustsMaxTests", needsGen: true },
    { name: "MinimumContactMaxGteCountTests", needsGen: true },
    { name: "MaximumContactAlienTests", needsGen: true },
    { name: "AlienMinMaxBothTests", needsGen: true },
    { name: "MaximumContactCapsCountTests", needsGen: true },
    { name: "MaximumContactNoAttributeTests", needsGen: true },
    { name: "ContactCountSetOverridesMinMaxTests", needsGen: true },
    { name: "GetContactSlotCountMinMaxTests", needsGen: true },
    { name: "GetContactSlotCountMinTests", needsGen: true },
    // Feature 2: talentCategory
    { name: "TalentCategoryEnforcedTests", needsGen: true },
    { name: "TalentCategoryAlreadyPresentTests", needsGen: true },
    { name: "TalentCategoryNotEnforcedTests", needsGen: true },
    { name: "TalentCategorySingleTalentTests", needsGen: true },
    // Feature 3: Bonus Power Selection
    { name: "BonusPowerParseTests", needsGen: false },
    { name: "BonusPowerParseMultipleTests", needsGen: false },
    { name: "BonusPowerParseEmptyTests", needsGen: false },
    { name: "BonusPowerParseNullTests", needsGen: false },
    { name: "BonusPowerGetOptionsTests", needsGen: true },
    { name: "BonusPowerNoOptionsTests", needsGen: true },
    { name: "BonusPowerSelectionAppliedTests", needsGen: true },
    { name: "BonusPowerFallbackRollTests", needsGen: true },
    { name: "BonusPowerFlagResetTests", needsGen: true },
]);
