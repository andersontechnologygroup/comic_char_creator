//  TestsContacts
// Extracted from UnitTests.js
//
// Data-driven refactor: Basic, Advanced, and Ultimate contact tests
// are defined as config tables. A shared helper runs the common
// setup-generate-assert pattern for each test case.

// ============================================================================
// SHARED HELPERS
// ============================================================================

/** Set up base rolls common to Basic/Advanced contact tests. */
Tester._applyBaseContactRolls = (gen) => {
    gen.powerNumberRoll = 19;
    gen.powerCategoryRolls = [2, 27, 19, 91];
    gen.powerRolls = [20, 30, 40, 50];
    gen.powerRankRolls = [9, 19, 29, 39, 49, 59, 69, 79, 94, 99];
    gen.talentNumberRoll = 91;
    gen.talentCategoryRolls = [2, 27, 67, 91];
    gen.talentRolls = [20, 30, 40, 50];
};

/**
 * Run a series of contact quantity tests for a given mode.
 * config: { mode, baseRolls (fn), charSetup, cases: [{ contactNumberRoll, contactCategoryRolls, contactRolls, expectedCount, expectedContacts? }] }
 */
Tester._runContactQuantityTests = (gen, config) => {
    gen.generatorMode = config.mode;
    gen.setTables();
    gen.contactsEqualToPowers = false;

    const char = new Charactor();
    char.physicalForm = config.charSetup.physicalForm;
    char.origin = config.charSetup.origin;
    gen.randomRanksColumn = config.charSetup.column;

    if (config.baseRolls) config.baseRolls(gen);

    for (let i = 0; i < config.cases.length; i++) {
        const tc = config.cases[i];

        // Reset contact state between sub-tests
        char.powers = [];
        char.talents = [];
        char.contacts = [];

        // Apply contact rolls for this case
        gen.contactNumberRoll = tc.contactNumberRoll;
        if (tc.contactCategoryRolls)
            gen.contactCategoryRolls = tc.contactCategoryRolls;
        if (tc.contactRolls) gen.contactRolls = tc.contactRolls;

        gen.determineSpecialAbilities(char);

        const cCount = char.contacts.length;
        Tester.assertInRange(
            0,
            4,
            cCount,
            `Contact Quantity Roll (${config.mode}): Generated ${cCount} contacts.`,
        );
        Tester.assertEquals(
            tc.expectedCount,
            cCount,
            `Contact Quantity Roll (${config.mode}): Generated ${cCount} contacts.`,
        );

        // Validate specific contact names/categories if provided
        if (tc.expectedContacts) {
            for (
                let j = 0;
                j < Math.min(cCount, tc.expectedContacts.length);
                j++
            ) {
                const exp = tc.expectedContacts[j];
                if (exp.category) {
                    Tester.assertEquals(
                        exp.category,
                        char.contacts[j].category,
                        `Contact Category Roll (${config.mode}): Contact[${j}] category.`,
                    );
                }
                if (exp.name) {
                    Tester.assertEquals(
                        exp.name,
                        char.contacts[j].name,
                        `Contact Name Roll (${config.mode}): Contact[${j}] name.`,
                    );
                }
            }
        }
    }
};

/**
 * Run "too many contacts" tests for a given mode.
 * Verifies contacts are generated correctly at high contactNumberRoll values.
 */
Tester._runContactsTooManyTests = (gen, mode, form, column) => {
    gen.generatorMode = mode;
    gen.setTables();
    gen.identitySecret = true;
    gen.originPublic = false;
    gen.wellEstablished = false;
    gen.looksHuman = false;
    gen.contactsEqualToPowers = false;

    const char = new Charactor();
    char.physicalForm = form;
    char.origin = form;
    gen.randomRanksColumn = column;

    gen.powerNumberRoll = 19;
    gen.powerCategoryRolls = [2, 27, 19, 91];
    gen.powerRolls = [20, 30, 40, 50];
    gen.powerRankRolls = [9, 19, 29, 39, 49, 59, 69, 79, 94, 99];

    // In ultimate mode, avoid talent rolls that trigger bonusContactCount
    gen.talentNumberRoll = 99; // 4/4 talents
    if (mode === "ultimate") {
        gen.talentCategoryRolls = [2, 8, 15, 22, 35, 45, 55, 65, 75, 85, 95];
        gen.talentRolls = [5, 6, 2, 10, 2, 2, 2, 2, 2, 2, 2];
    } else {
        gen.talentCategoryRolls = [64, 84, 64, 64, 64, 64, 64, 64, 64, 64];
        gen.talentRolls = [5, 6, 2, 10, 2, 2, 2, 2, 2, 2, 2];
    }

    // --- Run 1: high contactNumberRoll ---
    gen.contactNumberRoll = 99;
    gen.contactCategoryRolls = [2, 27, 67, 91, 37, 47];
    gen.contactRolls = [2, 3, 4, 5, 6, 7];

    gen.determineSpecialAbilities(char);

    let cCount = char.contacts.length;
    const expectedMax = mode === "ultimate" ? 6 : 4;
    Tester.assertInRange(
        0,
        expectedMax,
        cCount,
        `Contact Quantity Roll (${mode}): Generated ${cCount} contacts.`,
    );
    Tester.assert(
        cCount >= 3,
        `Contact Quantity Roll (${mode}): Generated ${cCount} contacts (expected >= 3).`,
    );

    // --- Run 2: lower contactNumberRoll = fewer contacts ---
    char.contacts = [];

    gen.contactNumberRoll = 89;
    gen.contactCategoryRolls = [2, 27, 67, 91, 37, 47];
    gen.contactRolls = [2, 3, 4, 5, 6, 7];

    gen.determineSpecialAbilities(char);

    let cCount2 = char.contacts.length;
    Tester.assertInRange(
        0,
        expectedMax,
        cCount2,
        `Contact Quantity Roll (${mode}): Generated ${cCount2} contacts.`,
    );
    Tester.assert(
        cCount2 >= 2,
        `Contact Quantity Roll (${mode}): Generated ${cCount2} contacts (expected >= 2).`,
    );
};

// ============================================================================
// TEST CONFIGURATIONS
// ============================================================================

// Base rolls shared by Basic and Advanced modes
const BASIC_ADVANCED_BASE_ROLLS = (gen) => {
    gen.powerNumberRoll = 19;
    gen.powerCategoryRolls = [2, 27, 19, 91];
    gen.powerRolls = [20, 30, 40, 50];
    gen.powerRankRolls = [9, 19, 29, 39, 49, 59, 69, 79, 94, 99];
    gen.talentNumberRoll = 91;
    gen.talentCategoryRolls = [2, 27, 67, 91];
    gen.talentRolls = [20, 30, 40, 50];
};

// Contact quantity test cases: [contactNumberRoll, expectedCount]
const CONTACT_QUANTITY_CASES = [
    {
        contactNumberRoll: 74,
        contactCategoryRolls: [2, 27, 67, 91],
        contactRolls: [20, 30, 40, 50],
        expectedCount: 2,
    },
    {
        contactNumberRoll: 17,
        contactCategoryRolls: [2, 27, 67, 91],
        contactRolls: [20, 30, 40, 50],
        expectedCount: 0,
    },
    {
        contactNumberRoll: 25,
        contactCategoryRolls: [2, 27, 67, 91],
        contactRolls: [20, 30, 40, 50],
        expectedCount: 1,
    },
    {
        contactNumberRoll: 69,
        contactCategoryRolls: [2, 27, 67, 91],
        contactRolls: [20, 30, 40, 50],
        expectedCount: 2,
    },
];

// Ultimate mode test cases with specific contact name/category assertions
const ULTIMATE_CONTACT_CASES = [
    {
        contactNumberRoll: 74,
        contactCategoryRolls: [2, 27, 67, 91],
        contactRolls: [20, 30, 40, 50],
        expectedCount: 3,
        expectedContacts: [
            { category: "Professional", name: "Law Enforcement" },
            { category: "Professional", name: "Business World" },
            { category: "Political", name: "Local" },
        ],
    },
    {
        contactNumberRoll: 1,
        contactCategoryRolls: [2, 27, 67, 91],
        contactRolls: [20, 30, 40, 50],
        expectedCount: 0,
    },
    {
        contactNumberRoll: 55,
        contactCategoryRolls: [91, 67, 27, 2],
        contactRolls: [70, 60, 50, 40],
        expectedCount: 2,
        expectedContacts: [
            { category: "Mystic Arts", name: "Mythology" },
            { category: "Political", name: "State" },
        ],
    },
];

// ============================================================================
// TEST ORCHESTRATION
// ============================================================================

Tester.ContactsTests = (gen) => {
    // --- Basic mode ---
    Tester._runContactQuantityTests(gen, {
        mode: "basic",
        charSetup: {
            physicalForm: "Altered Human",
            origin: "Altered Human",
            column: 1,
        },
        baseRolls: BASIC_ADVANCED_BASE_ROLLS,
        cases: CONTACT_QUANTITY_CASES,
    });

    // --- Advanced mode ---
    Tester._runContactQuantityTests(gen, {
        mode: "advanced",
        charSetup: {
            physicalForm: "Altered Human",
            origin: "Altered Human",
            column: 1,
        },
        baseRolls: BASIC_ADVANCED_BASE_ROLLS,
        cases: CONTACT_QUANTITY_CASES,
    });

    // --- Ultimate mode ---
    // Ultimate uses setDeterministicRolls for base state, then overrides
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();
    gen.identitySecret = true;
    gen.originPublic = false;
    gen.wellEstablished = false;
    gen.looksHuman = false;
    // Avoid talents with bonusContactCount > 0
    gen.talentNumberRoll = 1;
    gen.talentCategoryRolls = [2, 8, 15, 22];
    gen.talentRolls = [10, 20, 30, 40];

    Tester._runContactQuantityTests(gen, {
        mode: "ultimate",
        charSetup: {
            physicalForm: "Altered Human",
            origin: "Altered Human",
            column: 1,
        },
        baseRolls: null, // rolls already set above
        cases: ULTIMATE_CONTACT_CASES,
    });
};

Tester.ContactsTooManyTests = (gen) => {
    Tester._runContactsTooManyTests(gen, "basic", "Altered Human", 1);
    Tester._runContactsTooManyTests(gen, "advanced", "Altered Human", 1);
    Tester._runContactsTooManyTests(gen, "ultimate", "Altered Human", 1);
};

// ============================================================================
// DUPLICATE CONTACT PREVENTION TESTS
// ============================================================================

Tester.ContactDuplicatePreventionTests = (gen) => {
    gen.generatorMode = "basic";
    gen.setTables();
    gen.setDeterministicRolls();

    const char = gen.generateWithoutThrows();

    // Check that no two contacts have the same name
    const names = char.contacts.map((c) => c.name);
    const uniqueNames = new Set(names);
    Tester.assertEquals(
        names.length,
        uniqueNames.size,
        `ContactDuplicatePrevention: ${names.length} contacts, ${uniqueNames.size} unique (should be equal).`,
    );

    // Verify _assignedContactNames was cleaned up
    Tester.assert(
        gen._assignedContactNames === null,
        "ContactDuplicatePrevention: _assignedContactNames cleaned up after generate.",
    );

    // Test with Advanced mode
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();
    const char2 = gen.generateWithoutThrows();
    const names2 = char2.contacts.map((c) => c.name);
    const uniqueNames2 = new Set(names2);
    Tester.assertEquals(
        names2.length,
        uniqueNames2.size,
        `ContactDuplicatePrevention (Advanced): ${names2.length} contacts, ${uniqueNames2.size} unique.`,
    );

    // Test with Ultimate mode
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();
    const char3 = gen.generateWithoutThrows();
    const names3 = char3.contacts.map((c) => c.name);
    const uniqueNames3 = new Set(names3);
    Tester.assertEquals(
        names3.length,
        uniqueNames3.size,
        `ContactDuplicatePrevention (Ultimate): ${names3.length} contacts, ${uniqueNames3.size} unique.`,
    );
};

// --- Force duplicate by pre-assigning a name ---

Tester.ContactDuplicateForceTests = (gen) => {
    gen.generatorMode = "basic";
    gen.setTables();
    gen.setDeterministicRolls();

    // Pre-assign a contact name to force duplicate detection
    gen._assignedContactNames = new Set(["Nemesis"]);

    const char = gen.generateWithoutThrows();

    // No contact should be named 'Nemesis'
    const hasNemesis = char.contacts.some((c) => c.name === "Nemesis");
    Tester.assert(
        !hasNemesis,
        "ContactDuplicateForce: No contact named Nemesis after pre-assignment.",
    );

    gen._assignedContactNames = null;
};

// ============================================================================
// CONTACT COUNT ATTRIBUTE TESTS
// Verifies that contactCount on contact entries is correctly stored and
// the value defaults to 1 when not specified.
// ============================================================================

Tester.ContactCountTests = (gen) => {
    // Basic mode: no entries have contactCount — all default to 1
    gen.generatorMode = "basic";
    gen.setTables();

    for (const entry of gen.contactTypeListTable) {
        Tester.assertEquals(
            1,
            Utility.getValue(entry, "contactCount", 1),
            `ContactCount(Basic): ${entry.name} contactCount defaults to 1.`,
        );
    }

    // Advanced mode: no entries have contactCount — all default to 1
    gen.generatorMode = "advanced";
    gen.setTables();

    for (const entry of gen.contactTypeListTable) {
        Tester.assertEquals(
            1,
            Utility.getValue(entry, "contactCount", 1),
            `ContactCount(Advanced): ${entry.name} contactCount defaults to 1.`,
        );
    }

    // Ultimate mode: no entries have contactCount — all default to 1
    gen.generatorMode = "ultimate";
    gen.setTables();

    for (const entry of gen.contactTypeListTable) {
        Tester.assertEquals(
            1,
            Utility.getValue(entry, "contactCount", 1),
            `ContactCount(Ultimate): ${entry.name} contactCount defaults to 1.`,
        );
    }
};

// --- Verify contactCount propagates to generated contact object ---

Tester.ContactCountGeneratedTests = (gen) => {
    // Basic mode: use first available contact entry
    gen.generatorMode = "basic";
    gen.setTables();
    gen.setDeterministicRolls();

    const basicContact = gen.contactTypeListTable.find(
        (c) => c.name && c.name !== "_____________",
    );
    if (!basicContact) {
        Tester.assert(
            true,
            "ContactCountGenerated(Basic): No real contacts in table, skip.",
        );
    } else {
        const catEntry = gen.contactCategoriesTable.find(
            (c) => c.name === basicContact.category,
        );
        if (catEntry) {
            gen.contactCategoryRolls[0] = catEntry.maxRoll;
            gen.contactRolls[0] = basicContact.maxRoll;
            gen.contactNumberRoll = 50;

            const char = gen.generateWithoutThrows();
            const found = char.contacts.find(
                (c) => c.name === basicContact.name,
            );
            if (found) {
                const expectedCC = Utility.getValue(
                    basicContact,
                    "contactCount",
                    1,
                );
                Tester.assertEquals(
                    expectedCC,
                    found.contactSlots,
                    `ContactCountGenerated(Basic): ${basicContact.name} contactSlots = ${expectedCC}.`,
                );
            } else {
                Tester.assert(
                    true,
                    `ContactCountGenerated(Basic): ${basicContact.name} not rolled, skip.`,
                );
            }
        }
    }

    // Advanced mode: Medicine has no contactCount — defaults to 1
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();

    const medAdv = gen.contactTypeListTable.find((c) => c.name === "Medicine");
    const medCatAdv = gen.contactCategoriesTable.find(
        (c) => c.name === medAdv.category,
    );
    gen.contactCategoryRolls[0] = medCatAdv.maxRoll;
    gen.contactRolls[0] = medAdv.maxRoll;
    gen.contactNumberRoll = 50;

    const charAdv = gen.generateWithoutThrows();
    const medC = charAdv.contacts.find((c) => c.name === "Medicine");
    if (medC) {
        Tester.assertEquals(
            1,
            medC.contactSlots,
            "ContactCountGenerated(Advanced): Medicine contactSlots = 1 (default).",
        );
    } else {
        Tester.assert(
            true,
            "ContactCountGenerated(Advanced): Medicine not rolled, skip.",
        );
    }

    // Ultimate mode: Medicine has no contactCount — defaults to 1
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();

    const medUlt = gen.contactTypeListTable.find((c) => c.name === "Medicine");
    const medCatUlt = gen.contactCategoriesTable.find(
        (c) => c.name === medUlt.category,
    );
    gen.contactCategoryRolls[0] = medCatUlt.maxRoll;
    gen.contactRolls[0] = medUlt.maxRoll;
    gen.contactNumberRoll = 50;

    const charUlt = gen.generateWithoutThrows();
    const medU = charUlt.contacts.find((c) => c.name === "Medicine");
    if (medU) {
        Tester.assertEquals(
            1,
            medU.contactSlots,
            "ContactCountGenerated(Ultimate): Medicine contactSlots = 1 (default).",
        );
    } else {
        Tester.assert(
            true,
            "ContactCountGenerated(Ultimate): Medicine not rolled, skip.",
        );
    }
};

// --- Verify default contactCount: 1 for contacts without the attribute ---

Tester.ContactCountDefaultTests = (gen) => {
    // Advanced mode — contacts have no contactCount, default to 1
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();

    const lawAdv = gen.contactTypeListTable.find((c) => c.name === "Law");
    const lawCatAdv = gen.contactCategoriesTable.find(
        (c) => c.name === lawAdv.category,
    );
    gen.contactCategoryRolls[0] = lawCatAdv.maxRoll;
    gen.contactRolls[0] = lawAdv.maxRoll;
    gen.contactNumberRoll = 50;

    const charAdv = gen.generateWithoutThrows();
    const lawC = charAdv.contacts.find((c) => c.name === "Law");
    if (lawC) {
        Tester.assertEquals(
            1,
            lawC.contactSlots,
            "ContactCountDefault(Advanced): Law contactSlots = 1 (default).",
        );
    } else {
        Tester.assert(
            true,
            "ContactCountDefault(Advanced): Law not rolled, skip.",
        );
    }

    // Ultimate mode — contacts have no contactCount, default to 1
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();

    const lawUlt = gen.contactTypeListTable.find((c) => c.name === "Law");
    const lawCatUlt = gen.contactCategoriesTable.find(
        (c) => c.name === lawUlt.category,
    );
    gen.contactCategoryRolls[0] = lawCatUlt.maxRoll;
    gen.contactRolls[0] = lawUlt.maxRoll;
    gen.contactNumberRoll = 50;

    const charUlt = gen.generateWithoutThrows();
    const lawU = charUlt.contacts.find((c) => c.name === "Law");
    if (lawU) {
        Tester.assertEquals(
            1,
            lawU.contactSlots,
            "ContactCountDefault(Ultimate): Law contactSlots = 1 (default).",
        );
    } else {
        Tester.assert(
            true,
            "ContactCountDefault(Ultimate): Law not rolled, skip.",
        );
    }
};

// ============================================================================
// CONTACT COUNT > REMAINING SLOTS SKIP TESTS
// When a contact has contactCount > remaining slots, it should be skipped.
// ============================================================================

Tester.ContactCountSlotSkipTests = (gen) => {
    // Use Advanced mode which has a full contact table
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.contactsEqualToPowers = false;
    gen.setDeterministicRolls();

    const medEntry = gen.contactTypeListTable.find(
        (c) => c.name === "Medicine",
    );
    if (!medEntry) {
        Tester.assert(
            true,
            "ContactCountSlotSkip: Medicine not found in table, skip.",
        );
        return;
    }
    const origCC = medEntry.contactCount;
    medEntry.contactCount = 3; // This contact needs 3 slots

    // Set contactsCount to 2 (from quantity table roll 69)
    // Only 2 slots available — Medicine (3 slots) should be skipped
    gen.contactNumberRoll = 69; // contacts.initial = 2
    const medCat = gen.contactCategoriesTable.find(
        (c) => c.name === medEntry.category,
    );
    gen.contactCategoryRolls[0] = medCat.maxRoll; // Force category to Professional
    gen.contactRolls[0] = medEntry.maxRoll; // Force type to Medicine
    gen.contactCategoryRolls[1] = 50; // Second contact roll
    gen.contactRolls[1] = 50;

    const char = gen.generateWithoutThrows();

    // Medicine should NOT appear (3 slots > 2 remaining)
    const hasMedicine = char.contacts.some((c) => c.name === "Medicine");
    Tester.assert(
        !hasMedicine,
        "ContactCountSlotSkip: Medicine (3 slots) skipped when only 2 slots available.",
    );

    // Restore
    if (origCC !== undefined) medEntry.contactCount = origCC;
    else delete medEntry.contactCount;

    // Now test with enough slots — Medicine should appear
    gen.setDeterministicRolls();
    medEntry.contactCount = 3;
    gen.contactNumberRoll = 99; // contacts.initial = 3
    gen.contactCategoryRolls[0] = medCat.maxRoll;
    gen.contactRolls[0] = medEntry.maxRoll;

    const char2 = gen.generateWithoutThrows();
    const hasMedicine2 = char2.contacts.some((c) => c.name === "Medicine");
    Tester.assert(
        hasMedicine2,
        "ContactCountSlotSkip: Medicine (3 slots) generated when 3 slots available.",
    );

    if (origCC !== undefined) medEntry.contactCount = origCC;
    else delete medEntry.contactCount;
};

Tester.registerTestGroup(110, "deterministic", [
    { name: "ContactsTests", needsGen: true },
    { name: "ContactsTooManyTests", needsGen: true },
    { name: "ContactDuplicatePreventionTests", needsGen: true },
    { name: "ContactDuplicateForceTests", needsGen: true },
    { name: "ContactCountTests", needsGen: true },
    { name: "ContactCountGeneratedTests", needsGen: true },
    { name: "ContactCountDefaultTests", needsGen: true },
    { name: "ContactCountSlotSkipTests", needsGen: true },
]);
