//  TestsTalents
// Extracted from UnitTests.js
//
// Data-driven refactor: Basic, Advanced, and Ultimate talent tests
// are defined as config tables. A shared helper runs the common
// setup-generate-assert pattern for each test case.

// ============================================================================
// SHARED HELPER
// ============================================================================

/**
 * Run talent generation tests for a given config.
 * config: { mode, physicalForm, origin, column,
 *           throwAllRollsFirst?, baseRolls?, talentRolls: { talentNumberRoll, talentCategoryRolls, talentRolls },
 *           expectedCount?, maxSlots?, expectedTalents?: [{ category, name }],
 *           postValidate?: (char) => void }
 */
Tester._runTalentTests = (gen, config) => {
    gen.generatorMode = config.mode;
    gen.setTables();

    const char = new Character();
    char.physicalForm = config.physicalForm;
    char.origin = config.origin;
    char.randomRanksColumn = config.column;

    // Apply base rolls first (if any)
    if (config.baseRolls) config.baseRolls(gen);

    // Optionally call throwAllRolls() BEFORE setting manual rolls
    // (Ultimate mode needs this to initialize power/contact roll arrays)
    if (config.throwAllRollsFirst) gen.throwAllRolls();

    // Apply talent-specific rolls AFTER throwAllRolls (so they aren't overwritten)
    const tr = config.talentRolls;
    gen.talentNumberRoll = tr.talentNumberRoll;
    gen.talentCategoryRolls = tr.talentCategoryRolls;
    gen.talentRolls = tr.talentRolls;

    gen.determineSpecialAbilities(char);

    const tCount = char.talents.length;
    const totalSlots = char.talents.reduce(
        (s, t) => s + (t.talentSlots || 1),
        0,
    );

    // Validate count
    Tester.assertInRange(
        1,
        4,
        tCount,
        `Talent Quantity Roll (${config.mode}): Generated ${tCount} talents.`,
    );

    if (config.expectedCount !== undefined) {
        Tester.assertEquals(
            config.expectedCount,
            tCount,
            `Talent Quantity Roll (${config.mode}): Generated ${tCount} talents.`,
        );
    }

    // Validate max slots
    if (config.maxSlots !== undefined) {
        Tester.assert(
            totalSlots <= config.maxSlots,
            `Talent Quantity Roll (${config.mode}): Total slots ${totalSlots} <= ${config.maxSlots}.`,
        );
    }

    // Validate expected talents (if provided)
    if (config.expectedTalents) {
        for (
            let i = 0;
            i < Math.min(tCount, config.expectedTalents.length);
            i++
        ) {
            const exp = config.expectedTalents[i];
            if (exp.category) {
                Tester.assertEquals(
                    exp.category,
                    char.talents[i].category,
                    `Talent Category Roll (${config.mode}): Talent[${i}] category.`,
                );
            }
            if (exp.name) {
                Tester.assertEquals(
                    exp.name,
                    char.talents[i].name,
                    `Talent Name Roll (${config.mode}): Talent[${i}] name.`,
                );
            }
        }
    }

    // Validate all talents have non-empty names
    for (let i = 0; i < tCount; i++) {
        Tester.assert(
            char.talents[i].name !== "",
            `Talent Name Roll (${config.mode}): Talent[${i}] has a non-empty name.`,
        );
    }

    // Run mode-specific post-validation
    if (config.postValidate) config.postValidate(char);
};

// ============================================================================
// TEST CONFIGURATIONS
// ============================================================================

// Base rolls shared by Basic/Advanced modes
const TALENT_GEN_ADV_BASE_ROLLS = (gen) => {
    gen.powerNumberRoll = 2;
    gen.contactNumberRoll = 74;
    gen.powerCategoryRolls = [2, 27, 19, 74];
    gen.powerRolls = [20, 30, 40, 50];
    gen.powerRankRolls = [74, 19, 27, 2];
};

const TALENT_TEST_CONFIGS = [
    // --- Basic mode ---
    {
        mode: "basic",
        physicalForm: "Altered Human",
        origin: "Altered Human",
        column: 1,
        talentRolls: {
            talentNumberRoll: 91,
            talentCategoryRolls: [2, 27, 67, 91],
            talentRolls: [20, 30, 40, 50],
        },
        maxSlots: 4,
        postValidate: (char) => {
            // Basic mode has a single "Talents" category — all talents should be in it
            for (let i = 0; i < char.talents.length; i++) {
                Tester.assertEquals(
                    "Talents",
                    char.talents[i].category,
                    `Talent Category Roll (Basic): Talent[${i}] category is 'Talents'.`,
                );
            }
        },
    },

    // --- Advanced mode ---
    {
        mode: "advanced",
        physicalForm: "Altered Human",
        origin: "Altered Human",
        column: 1,
        baseRolls: TALENT_GEN_ADV_BASE_ROLLS,
        talentRolls: {
            talentNumberRoll: 91,
            talentCategoryRolls: [2, 27, 67, 91],
            talentRolls: [20, 30, 40, 50],
        },
        expectedCount: 4,
        expectedTalents: [
            { category: "Weapon Skills", name: "Guns" },
            { category: "Fighting Skills", name: "Martial Arts C" },
            { category: "Scientific Skills", name: "Biology" },
            { category: "Other Skills", name: "First Aid" },
        ],
    },

    // --- Ultimate mode ---
    {
        mode: "ultimate",
        physicalForm: "Altered Human",
        origin: "Altered Human",
        column: 1,
        throwAllRollsFirst: true,
        talentRolls: {
            talentNumberRoll: 91,
            talentCategoryRolls: [2, 27, 67, 91],
            talentRolls: [20, 30, 40, 50],
        },
        expectedCount: 4,
        expectedTalents: [
            { category: "Weapon Skills", name: "Guns" },
            { category: "Fighting Skills", name: "Martial Arts C" },
            { category: "Scientific Skills", name: "Biology" },
            { category: "Other Skills", name: "First Aid" },
        ],
    },
];

// ============================================================================
// TEST ORCHESTRATION
// ============================================================================

Tester.TalentsTests = (gen) => {
    for (const config of TALENT_TEST_CONFIGS) {
        Tester._runTalentTests(gen, config);
    }
};

Tester.registerTest("TalentsTests", true, 100, "deterministic");

// ============================================================================
// DUPLICATE TALENT PREVENTION TESTS
// ============================================================================

Tester.TalentDuplicatePreventionTests = (gen) => {
    gen.generatorMode = "basic";
    gen.setTables();
    gen.setDeterministicRolls();

    const char = gen.generateWithoutThrows();

    // Check that no two talents have the same name
    const names = char.talents.map((t) => t.name);
    const uniqueNames = new Set(names);
    Tester.assertEquals(
        names.length,
        uniqueNames.size,
        `TalentDuplicatePrevention: ${names.length} talents, ${uniqueNames.size} unique (should be equal).`,
    );

    // Verify _assignedTalentNames was used
    Tester.assert(
        gen._assignedTalentNames === null,
        "TalentDuplicatePrevention: _assignedTalentNames cleaned up after generate.",
    );

    // Test with Advanced mode
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();
    const char2 = gen.generateWithoutThrows();
    const names2 = char2.talents.map((t) => t.name);
    const uniqueNames2 = new Set(names2);
    Tester.assertEquals(
        names2.length,
        uniqueNames2.size,
        `TalentDuplicatePrevention (Advanced): ${names2.length} talents, ${uniqueNames2.size} unique.`,
    );

    // Test with Ultimate mode
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();
    const char3 = gen.generateWithoutThrows();
    const names3 = char3.talents.map((t) => t.name);
    const uniqueNames3 = new Set(names3);
    Tester.assertEquals(
        names3.length,
        uniqueNames3.size,
        `TalentDuplicatePrevention (Ultimate): ${names3.length} talents, ${uniqueNames3.size} unique.`,
    );
};

Tester.registerTest(
    "TalentDuplicatePreventionTests",
    true,
    101,
    "deterministic",
);

// ============================================================================
// SUB-ROLL DISAMBIGUATION TESTS (Advanced Weapon Skills)
// ============================================================================

/**
 * Advanced Weapon Skills entries share maxRoll:100 and use subRoll to disambiguate:
 *   Oriental Weapons  — subRoll: 25
 *   Marksman          — subRoll: 50
 *   Weapons Master    — subRoll: 75
 *   Weapons Specialist — subRoll: 100
 */
Tester.TalentSubRollTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();

    // --- Helper: generate a talent with specific subRoll ---
    function genWithSubRoll(subRoll) {
        gen.setDeterministicRolls();
        // Force Weapon Skills category (roll ≤ 20)
        gen.talentCategoryRolls = [15, 50, 50, 50];
        // Force the 100-maxRoll group (roll > 90)
        gen.talentRolls = [95, 50, 50, 50];
        gen.talentSubRolls = [subRoll, 50, 50, 50];
        gen.talentNumberRoll = 91; // 4 talent slots
        return gen.generateWithoutThrows();
    }

    // --- Happy path: subRoll picks each of the 4 Weapon Skills ---
    // Oriental Weapons (subRoll: 25)
    let char = genWithSubRoll(10);
    Tester.assertEquals(
        "Oriental Weapons",
        char.talents[0].name,
        "SubRoll: subRoll=10 picks Oriental Weapons (≤25).",
    );
    Tester.assertEquals(
        "Weapon Skills",
        char.talents[0].category,
        "SubRoll: Oriental Weapons is in Weapon Skills category.",
    );
    Tester.assertEquals(
        1,
        char.talents[0].talentSlots,
        "SubRoll: Oriental Weapons talentCount=1.",
    );

    // Marksman (subRoll: 50)
    char = genWithSubRoll(30);
    Tester.assertEquals(
        "Marksman",
        char.talents[0].name,
        "SubRoll: subRoll=30 picks Marksman (≤50).",
    );
    Tester.assertEquals(
        2,
        char.talents[0].talentSlots,
        "SubRoll: Marksman talentCount=2.",
    );

    // Weapons Master (subRoll: 75)
    char = genWithSubRoll(60);
    Tester.assertEquals(
        "Weapons Master",
        char.talents[0].name,
        "SubRoll: subRoll=60 picks Weapons Master (≤75).",
    );
    Tester.assertEquals(
        2,
        char.talents[0].talentSlots,
        "SubRoll: Weapons Master talentCount=2.",
    );

    // Weapons Specialist (subRoll: 100)
    char = genWithSubRoll(80);
    Tester.assertEquals(
        "Weapons Specialist",
        char.talents[0].name,
        "SubRoll: subRoll=80 picks Weapons Specialist (≤100).",
    );
    Tester.assertEquals(
        2,
        char.talents[0].talentSlots,
        "SubRoll: Weapons Specialist talentCount=2.",
    );

    // --- Boundary values ---
    // Exactly at Oriental Weapons boundary (25)
    char = genWithSubRoll(25);
    Tester.assertEquals(
        "Oriental Weapons",
        char.talents[0].name,
        "SubRoll Boundary: subRoll=25 picks Oriental Weapons.",
    );

    // Just past Oriental Weapons (26)
    char = genWithSubRoll(26);
    Tester.assertEquals(
        "Marksman",
        char.talents[0].name,
        "SubRoll Boundary: subRoll=26 picks Marksman.",
    );

    // Exactly at Marksman boundary (50)
    char = genWithSubRoll(50);
    Tester.assertEquals(
        "Marksman",
        char.talents[0].name,
        "SubRoll Boundary: subRoll=50 picks Marksman.",
    );

    // Just past Marksman (51)
    char = genWithSubRoll(51);
    Tester.assertEquals(
        "Weapons Master",
        char.talents[0].name,
        "SubRoll Boundary: subRoll=51 picks Weapons Master.",
    );

    // Exactly at Weapons Master boundary (75)
    char = genWithSubRoll(75);
    Tester.assertEquals(
        "Weapons Master",
        char.talents[0].name,
        "SubRoll Boundary: subRoll=75 picks Weapons Master.",
    );

    // Just past Weapons Master (76)
    char = genWithSubRoll(76);
    Tester.assertEquals(
        "Weapons Specialist",
        char.talents[0].name,
        "SubRoll Boundary: subRoll=76 picks Weapons Specialist.",
    );

    // Exactly at max (100)
    char = genWithSubRoll(100);
    Tester.assertEquals(
        "Weapons Specialist",
        char.talents[0].name,
        "SubRoll Boundary: subRoll=100 picks Weapons Specialist.",
    );

    // --- Negative tests: subRoll doesn't affect non-shared maxRoll entries ---
    // Roll a talent with a unique maxRoll (e.g., Guns at maxRoll 20)
    gen.setDeterministicRolls();
    gen.talentCategoryRolls = [15, 50, 50, 50];
    gen.talentRolls = [10, 50, 50, 50]; // tRoll=10 → Guns (maxRoll 20)
    gen.talentSubRolls = [100, 50, 50, 50]; // high subRoll shouldn't matter
    gen.talentNumberRoll = 91;
    char = gen.generateWithoutThrows();
    Tester.assertEquals(
        "Guns",
        char.talents[0].name,
        "SubRoll: subRoll ignored for unique maxRoll (Guns, maxRoll=20).",
    );
    Tester.assertEquals(
        1,
        char.talents[0].talentSlots,
        "SubRoll: Guns talentCount=1.",
    );

    // Thrown Weapons (maxRoll 50) — unique, subRoll shouldn't matter
    gen.setDeterministicRolls();
    gen.talentCategoryRolls = [15, 50, 50, 50];
    gen.talentRolls = [30, 50, 50, 50]; // tRoll=30 → Thrown Weapons (maxRoll 50)
    gen.talentSubRolls = [100, 50, 50, 50];
    gen.talentNumberRoll = 91;
    char = gen.generateWithoutThrows();
    Tester.assertEquals(
        "Thrown Weapons",
        char.talents[0].name,
        "SubRoll: subRoll ignored for unique maxRoll (Thrown Weapons, maxRoll=50).",
    );
    Tester.assertEquals(
        1,
        char.talents[0].talentSlots,
        "SubRoll: Thrown Weapons talentCount=1.",
    );

    // --- Edge case: subRoll=0 picks first subRoll entry (Oriental Weapons) ---
    char = genWithSubRoll(0);
    Tester.assertEquals(
        "Oriental Weapons",
        char.talents[0].name,
        "SubRoll Edge: subRoll=0 picks Oriental Weapons.",
    );

    // --- _findTalent direct tests ---
    gen.generatorMode = "advanced";
    gen.setTables();

    // Multiple candidates with subRoll disambiguation
    const found1 = gen._findTalent("Weapon Skills", 95, 10);
    Tester.assertEquals(
        "Oriental Weapons",
        found1.name,
        "_findTalent: subRoll=10 → Oriental Weapons.",
    );

    const found2 = gen._findTalent("Weapon Skills", 95, 30);
    Tester.assertEquals(
        "Marksman",
        found2.name,
        "_findTalent: subRoll=30 → Marksman.",
    );

    const found3 = gen._findTalent("Weapon Skills", 95, 60);
    Tester.assertEquals(
        "Weapons Master",
        found3.name,
        "_findTalent: subRoll=60 → Weapons Master.",
    );

    const found4 = gen._findTalent("Weapon Skills", 95, 80);
    Tester.assertEquals(
        "Weapons Specialist",
        found4.name,
        "_findTalent: subRoll=80 → Weapons Specialist.",
    );

    // Other tie groups disambiguate the same way
    Tester.assertEquals(
        "Computers",
        gen._findTalent("Scientific Skills", 85, 100).name,
        "_findTalent: Scientific tie (Physics/Computers), subRoll=100 → Computers.",
    );
    Tester.assertEquals(
        "Animal Training",
        gen._findTalent("Other Skills", 95, 40).name,
        "_findTalent: Other Skills tie, subRoll=40 → Animal Training.",
    );
    Tester.assertEquals(
        "Mystic Origin",
        gen._findTalent("Mystic and Mental Skills", 85, 100).name,
        "_findTalent: Mystic tie (Resist Domination/Mystic Origin), subRoll=100 → Mystic Origin.",
    );
    Tester.assertEquals(
        "Law Enforcement",
        gen._findTalent("Professional Skills", 15, 60).name,
        "_findTalent: Professional tie (Law/Law Enforcement), subRoll=60 → Law Enforcement.",
    );

    // Single candidate (no subRoll needed)
    const found5 = gen._findTalent("Weapon Skills", 10, 50);
    Tester.assertEquals(
        "Guns",
        found5.name,
        "_findTalent: single candidate (Guns) ignores subRoll.",
    );

    // No candidates (non-existent category)
    const found6 = gen._findTalent("Nonexistent Category", 50, 50);
    Tester.assertEquals(
        null,
        found6,
        "_findTalent: no candidates returns null.",
    );

    // Different category entirely
    const found7 = gen._findTalent("Fighting Skills", 10, 50);
    Tester.assertEquals(
        "Martial Arts A",
        found7.name,
        "_findTalent: Fighting Skills unaffected by subRoll.",
    );

    // --- Verify subRoll array initialization ---
    gen.reset();
    Tester.assertEquals(
        0,
        gen.talentSubRolls[0],
        "SubRoll: talentSubRolls reset to 0.",
    );

    // Verify talentSubRolls exists and is an array
    Tester.assert(
        Array.isArray(gen.talentSubRolls),
        "SubRoll: talentSubRolls is an array after reset.",
    );
    Tester.assert(
        gen.talentSubRolls.length > 0,
        "SubRoll: talentSubRolls has entries after reset.",
    );

    // Verify subRolls survive generate()
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();
    const origSubRoll0 = gen.talentSubRolls[0];
    gen.generateWithoutThrows();
    Tester.assertEquals(
        origSubRoll0,
        gen.talentSubRolls[0],
        "SubRoll: talentSubRolls preserved after generate().",
    );
};

Tester.registerTest("TalentSubRollTests", true, 102, "deterministic");

// ============================================================================
// TALENT MANUAL SELECTION TESTS (Advanced Mode)
// ============================================================================

Tester.TalentManualSelectionTests = (gen) => {
    // --- getAvailableTalents returns correct structure ---
    gen.generatorMode = "advanced";
    gen.setTables();

    const available = gen.getAvailableTalents();
    Tester.assert(
        Array.isArray(available),
        "TalentManual: getAvailableTalents returns an array.",
    );
    Tester.assert(
        available.length > 0,
        "TalentManual: getAvailableTalents has categories.",
    );

    // All Advanced talent categories should be present
    const catNames = available.map((c) => c.category);
    Tester.assert(
        catNames.includes("Weapon Skills"),
        "TalentManual: Weapon Skills category present.",
    );
    Tester.assert(
        catNames.includes("Fighting Skills"),
        "TalentManual: Fighting Skills category present.",
    );
    Tester.assert(
        catNames.includes("Professional Skills"),
        "TalentManual: Professional Skills category present.",
    );
    Tester.assert(
        catNames.includes("Scientific Skills"),
        "TalentManual: Scientific Skills category present.",
    );
    Tester.assert(
        catNames.includes("Mystic and Mental Skills"),
        "TalentManual: Mystic and Mental Skills category present.",
    );
    Tester.assert(
        catNames.includes("Other Skills"),
        "TalentManual: Other Skills category present.",
    );

    // Each category has talents with correct structure
    for (const cat of available) {
        Tester.assert(
            cat.talents.length > 0,
            `TalentManual: ${cat.category} has talents.`,
        );
        for (const t of cat.talents) {
            Tester.assert(
                t.name && t.name.length > 0,
                `TalentManual: ${cat.category} talent has name.`,
            );
            Tester.assert(
                typeof t.talentCount === "number",
                `TalentManual: ${cat.category}/${t.name} has talentCount.`,
            );
            Tester.assert(
                typeof t.description === "string",
                `TalentManual: ${cat.category}/${t.name} has description.`,
            );
        }
    }

    // No bonus-only entries (maxRoll > 100)
    const allTalents = available.flatMap((c) => c.talents);
    // Oriental Weapons, Marksman, Weapons Master, Weapons Specialist all have maxRoll 100
    const hasSubRollTalents = allTalents.filter((t) => t.subRoll != null);
    Tester.assert(
        hasSubRollTalents.length >= 4,
        "TalentManual: subRoll talents present (Oriental Weapons, Marksman, Weapons Master, Weapons Specialist).",
    );

    // --- getTalentSlotCount returns valid count ---
    gen.setDeterministicRolls();
    const slotCount = gen.getTalentSlotCount();
    Tester.assert(
        slotCount >= 1 && slotCount <= 30,
        `TalentManual: getTalentSlotCount returns ${slotCount} (1-30).`,
    );

    // --- _selectedTalents used during generation ---
    gen.setDeterministicRolls();
    gen._selectedTalents = [
        {
            category: "Weapon Skills",
            name: "Guns",
            talentCount: 1,
            description: "Gun talent.",
        },
        {
            category: "Scientific Skills",
            name: "Biology",
            talentCount: 1,
            description: "Bio talent.",
        },
        {
            category: "Other Skills",
            name: "Artist",
            talentCount: 1,
            description: "Art talent.",
        },
        {
            category: "Professional Skills",
            name: "Law",
            talentCount: 1,
            description: "Law talent.",
        },
    ];
    gen.selectTalentManually = true;
    const char = gen.generateWithoutThrows();

    Tester.assertEquals(
        4,
        char.talents.length,
        "TalentManual: 4 talents generated.",
    );
    Tester.assertEquals(
        "Guns",
        char.talents[0].name,
        "TalentManual: Talent[0] is Guns.",
    );
    Tester.assertEquals(
        "Weapon Skills",
        char.talents[0].category,
        "TalentManual: Talent[0] category is Weapon Skills.",
    );
    Tester.assertEquals(
        1,
        char.talents[0].talentSlots,
        "TalentManual: Guns talentSlots=1.",
    );
    Tester.assertEquals(
        "Gun talent.",
        char.talents[0].description,
        "TalentManual: Guns description from selection.",
    );
    Tester.assertEquals(
        "Biology",
        char.talents[1].name,
        "TalentManual: Talent[1] is Biology.",
    );
    Tester.assertEquals(
        "Artist",
        char.talents[2].name,
        "TalentManual: Talent[2] is Artist.",
    );
    Tester.assertEquals(
        "Law",
        char.talents[3].name,
        "TalentManual: Talent[3] is Law.",
    );

    // --- 2-slot talent consumes correct slots ---
    gen.setDeterministicRolls();
    gen._selectedTalents = [
        {
            category: "Weapon Skills",
            name: "Marksman",
            talentCount: 2,
            description: "Mark talent.",
        },
        {
            category: "Scientific Skills",
            name: "Physics",
            talentCount: 1,
            description: "Phys talent.",
        },
    ];
    gen.selectTalentManually = true;
    const char2 = gen.generateWithoutThrows();

    // Generator runs talentsCount times; 2 manual + 2 rolled = 4 total
    // But Marksman(2) fills 2 slots, Physics(1) fills 1 slot = 3 slots used
    // The 4th roll fills 1 more slot, giving 4 talents total
    Tester.assert(
        char2.talents.length >= 2,
        "TalentManual: at least 2 talents from manual selection.",
    );
    Tester.assertEquals(
        "Marksman",
        char2.talents[0].name,
        "TalentManual: Talent[0] is Marksman.",
    );
    Tester.assertEquals(
        2,
        char2.talents[0].talentSlots,
        "TalentManual: Marksman talentSlots=2.",
    );
    Tester.assertEquals(
        "Physics",
        char2.talents[1].name,
        "TalentManual: Talent[1] is Physics.",
    );

    // --- Empty selection falls back to rolling ---
    gen.setDeterministicRolls();
    gen._selectedTalents = [];
    gen.selectTalentManually = true;
    const char3 = gen.generateWithoutThrows();
    Tester.assert(
        char3.talents.length > 0,
        "TalentManual: empty selection falls back to rolling.",
    );

    // --- More slots than selections: extras are rolled ---
    gen.setDeterministicRolls();
    gen._selectedTalents = [
        {
            category: "Weapon Skills",
            name: "Guns",
            talentCount: 1,
            description: "",
        },
    ];
    gen.selectTalentManually = true;
    const char4 = gen.generateWithoutThrows();
    Tester.assert(
        char4.talents.length >= 1,
        "TalentManual: at least 1 talent from selection.",
    );
    Tester.assertEquals(
        "Guns",
        char4.talents[0].name,
        "TalentManual: first talent is Guns from selection.",
    );

    // --- 2-slot talent that exceeds remaining slots is skipped ---
    gen.setDeterministicRolls();
    // Force a very small slot count by overriding
    gen._selectedTalents = [
        {
            category: "Weapon Skills",
            name: "Marksman",
            talentCount: 2,
            description: "",
        },
        {
            category: "Weapon Skills",
            name: "Marksman",
            talentCount: 2,
            description: "",
        },
    ];
    gen.selectTalentManually = true;
    // Use a talentNumberRoll that gives minimal slots
    gen.talentNumberRoll = 2; // Should give 1 talent slot
    const char5 = gen.generateWithoutThrows();
    // Second Marksman should be skipped (needs 2 slots, only 1 remaining)
    const marksmanCount = char5.talents.filter(
        (t) => t.name === "Marksman",
    ).length;
    Tester.assert(
        marksmanCount <= 1,
        "TalentManual: 2-slot talent skipped when insufficient slots.",
    );

    // --- Flags reset after generation ---
    gen.setDeterministicRolls();
    gen._selectedTalents = [
        {
            category: "Weapon Skills",
            name: "Guns",
            talentCount: 1,
            description: "",
        },
    ];
    gen.selectTalentManually = true;
    gen.generateWithoutThrows();
    Tester.assert(
        gen._selectedTalents === null,
        "TalentManual: _selectedTalents cleaned up after generate.",
    );
    Tester.assert(
        gen.selectTalentManually === false,
        "TalentManual: selectTalentManually reset after generate.",
    );
};

Tester.registerTest("TalentManualSelectionTests", true, 103, "deterministic");

// ============================================================================
// CONTACT MANUAL SELECTION TESTS (Advanced Mode)
// ============================================================================

Tester.ContactManualSelectionTests = (gen) => {
    // --- getAvailableContacts returns correct structure ---
    gen.generatorMode = "advanced";
    gen.setTables();

    const available = gen.getAvailableContacts();
    Tester.assert(
        Array.isArray(available),
        "ContactManual: getAvailableContacts returns an array.",
    );
    Tester.assert(
        available.length > 0,
        "ContactManual: getAvailableContacts has categories.",
    );

    // All Advanced contact categories should be present
    const catNames = available.map((c) => c.category);
    Tester.assert(
        catNames.includes("Professional"),
        "ContactManual: Professional category present.",
    );
    Tester.assert(
        catNames.includes("Scientific"),
        "ContactManual: Scientific category present.",
    );
    Tester.assert(
        catNames.includes("Political"),
        "ContactManual: Political category present.",
    );
    Tester.assert(
        catNames.includes("Mystic Arts"),
        "ContactManual: Mystic Arts category present.",
    );

    // Each category has contacts with correct structure
    for (const cat of available) {
        Tester.assert(
            cat.contacts.length > 0,
            `ContactManual: ${cat.category} has contacts.`,
        );
        for (const c of cat.contacts) {
            Tester.assert(
                c.name && c.name.length > 0,
                `ContactManual: ${cat.category} contact has name.`,
            );
            Tester.assert(
                typeof c.contactCount === "number",
                `ContactManual: ${cat.category}/${c.name} has contactCount.`,
            );
            Tester.assert(
                typeof c.description === "string",
                `ContactManual: ${cat.category}/${c.name} has description.`,
            );
        }
    }

    // --- getContactSlotCount returns valid count ---
    gen.setDeterministicRolls();
    const slotCount = gen.getContactSlotCount();
    Tester.assert(
        slotCount >= 1 && slotCount <= 30,
        `ContactManual: getContactSlotCount returns ${slotCount} (1-30).`,
    );

    // --- _selectedContacts used during generation ---
    gen.setDeterministicRolls();
    // Avoid Professional talent rolls that trigger bonusContactCount
    // (Business/Finance would consume a contact slot before the manual picks)
    gen.talentCategoryRolls[2] = 75;
    gen._selectedContacts = [
        {
            category: "Professional",
            name: "Medicine",
            contactCount: 1,
            description: "Med desc.",
            contactName: "Dr. Smith",
        },
        {
            category: "Scientific",
            name: "Chemistry",
            contactCount: 1,
            description: "Chem desc.",
            contactName: "Prof. Jones",
        },
    ];
    gen.selectContactManually = true;
    const char = gen.generateWithoutThrows();

    // Find the manual contacts
    const medContact = char.contacts.find((c) => c.name === "Medicine");
    const chemContact = char.contacts.find((c) => c.name === "Chemistry");
    Tester.assert(
        medContact !== undefined,
        "ContactManual: Medicine contact generated.",
    );
    Tester.assert(
        chemContact !== undefined,
        "ContactManual: Chemistry contact generated.",
    );
    Tester.assertEquals(
        "Dr. Smith",
        medContact.contactName,
        "ContactManual: Medicine contactName is Dr. Smith.",
    );
    Tester.assertEquals(
        "Prof. Jones",
        chemContact.contactName,
        "ContactManual: Chemistry contactName is Prof. Jones.",
    );
    Tester.assertEquals(
        "Professional",
        medContact.category,
        "ContactManual: Medicine category is Professional.",
    );
    Tester.assertEquals(
        "Scientific",
        chemContact.category,
        "ContactManual: Chemistry category is Scientific.",
    );

    // --- Empty selection: no manual contacts, standard rolling ---
    gen.setDeterministicRolls();
    gen._selectedContacts = [];
    gen.selectContactManually = true;
    const char2 = gen.generateWithoutThrows();
    Tester.assert(
        char2.contacts.length > 0,
        "ContactManual: empty selection falls back to rolling.",
    );

    // --- Fewer selections than max slots is OK ---
    gen.setDeterministicRolls();
    gen._selectedContacts = [
        {
            category: "Professional",
            name: "Medicine",
            contactCount: 1,
            description: "",
            contactName: "Dr. A",
        },
    ];
    gen.selectContactManually = true;
    const char3 = gen.generateWithoutThrows();
    Tester.assert(
        char3.contacts.length >= 1,
        "ContactManual: at least 1 contact from selection.",
    );
    const selContact = char3.contacts.find((c) => c.name === "Medicine");
    Tester.assert(
        selContact !== undefined,
        "ContactManual: Medicine contact present.",
    );
    Tester.assertEquals(
        "Dr. A",
        selContact.contactName,
        "ContactManual: Medicine contactName preserved.",
    );

    // --- contactName field in standard generation is empty string ---
    gen.setDeterministicRolls();
    gen._selectedContacts = null;
    gen.selectContactManually = false;
    const char4 = gen.generateWithoutThrows();
    for (const c of char4.contacts) {
        Tester.assertEquals(
            "",
            c.contactName,
            `ContactManual: ${c.name} contactName is empty in standard mode.`,
        );
    }

    // --- Flags reset after generation ---
    gen.setDeterministicRolls();
    gen._selectedContacts = [
        {
            category: "Professional",
            name: "Law",
            contactCount: 1,
            description: "",
            contactName: "Atty. X",
        },
    ];
    gen.selectContactManually = true;
    gen.generateWithoutThrows();
    Tester.assert(
        gen._selectedContacts === null,
        "ContactManual: _selectedContacts cleaned up after generate.",
    );
    Tester.assert(
        gen.selectContactManually === false,
        "ContactManual: selectContactManually reset after generate.",
    );
};

Tester.registerTest("ContactManualSelectionTests", true, 104, "deterministic");
