//  TestsAbilities
// Extracted from UnitTests.js
//
// Data-driven refactor: Primary ability, popularity, and health tests
// are defined as config tables. Shared helpers run the common
// setup-generate-assert pattern for each test case.

// ============================================================================
// PRIMARY ABILITY TESTS
// ============================================================================

/**
 * Shared helper for primary ability tests.
 * Sets up rolls, generates abilities, and validates expected results.
 *
 * config: { mode, form, origin, column, label,
 *           rolls?: { physical: { Fighting, Agility, Strength, Endurance },
 *                     mental: { Reason, Intuition, Psyche } },
 *           expectedRows?: [ { row: 0|1, abilities: [{ ability, rank, num }] } ],
 *           expected?: [{ ability, rank, num }] }
 *
 * If expectedRows is provided (for multi-row forms like Robot-Metamorphic),
 * validates each row separately. Otherwise uses expected (single row).
 */
Tester._runPrimaryAbilityTests = (gen, config) => {
    gen.generatorMode = config.mode;
    gen.setTables();

    const charStats = new Character();
    charStats.physicalForm = config.form;
    charStats.origin = config.origin;
    charStats.randomRanksColumn = config.column;
    gen.randomRanksColumn = config.column;

    // Apply ability rolls
    const rolls = config.rolls || {};
    const physRolls = rolls.physical || {
        Fighting: 70,
        Agility: 60,
        Strength: 50,
        Endurance: 40,
    };
    const mentRolls = rolls.mental || { Reason: 30, Intuition: 20, Psyche: 10 };

    PHYSICAL_ABILITIES.forEach((a) => {
        gen.physicalAbilityRolls[0][a] =
            physRolls[a] !== undefined ? physRolls[a] : 50;
    });
    if (rolls.physicalRow1) {
        PHYSICAL_ABILITIES.forEach((a) => {
            gen.physicalAbilityRolls[1][a] =
                rolls.physicalRow1[a] !== undefined
                    ? rolls.physicalRow1[a]
                    : 50;
        });
    }
    MENTAL_ABILITIES.forEach((a) => {
        gen.mentalAbilityRolls[a] =
            mentRolls[a] !== undefined ? mentRolls[a] : 50;
    });

    gen.determinePrimaryAbilities(charStats);

    // Multi-row mode (Robot-Metamorphic)
    if (config.expectedRows) {
        for (const rowDef of config.expectedRows) {
            const rowIdx = rowDef.row;
            const abilities = rowDef.abilities;

            // Validate all stats in this row are populated
            let allValid = true;
            const checkAbilities =
                rowIdx === 0 ? PHYSICAL_ABILITIES : PHYSICAL_ABILITIES;
            const maxNum = rowIdx === 0 ? 50 : 100;
            checkAbilities.forEach((stat) => {
                const rank = charStats.primaryAbilities[rowIdx][stat].rank;
                const num = charStats.primaryAbilities[rowIdx][stat].number;
                if (num < 2 || num > maxNum || rank === "") allValid = false;
            });
            Tester.assert(
                allValid,
                `Primary Ability Rolls (${config.label} row${rowIdx}): All stats valid.`,
            );

            for (const exp of abilities) {
                Tester.assertEquals(
                    exp.rank,
                    charStats.primaryAbilities[rowIdx][exp.ability].rank,
                    `Primary Ability Rolls (${config.label} row${rowIdx}): ${exp.ability} rank.`,
                );
                Tester.assertEquals(
                    exp.num,
                    charStats.primaryAbilities[rowIdx][exp.ability].number,
                    `Primary Ability Rolls (${config.label} row${rowIdx}): ${exp.ability} number.`,
                );
            }
        }

        // Mental abilities (shared across rows, always in row 0)
        if (config.expectedMental) {
            for (const exp of config.expectedMental) {
                Tester.assertEquals(
                    exp.rank,
                    charStats.primaryAbilities[0][exp.ability].rank,
                    `Primary Ability Rolls (${config.label} mental): ${exp.ability} rank.`,
                );
                Tester.assertEquals(
                    exp.num,
                    charStats.primaryAbilities[0][exp.ability].number,
                    `Primary Ability Rolls (${config.label} mental): ${exp.ability} number.`,
                );
            }
        }
        return;
    }

    // Single-row mode (Basic, Advanced, Ultimate)
    // Validate all 7 stats are populated
    let allStatsValid = true;
    PHYSICAL_ABILITIES.forEach((stat) => {
        const rank = charStats.primaryAbilities[0][stat].rank;
        const num = charStats.primaryAbilities[0][stat].number;
        if (num < 2 || num > 50 || rank === "") allStatsValid = false;
    });
    MENTAL_ABILITIES.forEach((stat) => {
        const rank = charStats.primaryAbilities[0][stat].rank;
        const num = charStats.primaryAbilities[0][stat].number;
        if (num < 2 || num > 50 || rank === "") allStatsValid = false;
    });
    Tester.assert(
        allStatsValid,
        `Primary Ability Rolls (${config.label}): All 7 FASERIP stats generated with valid ranks and numbers.`,
    );

    const expected = config.expected || [
        { ability: "Fighting", rank: "Remarkable", num: 26 },
        { ability: "Agility", rank: "Excellent", num: 16 },
        { ability: "Strength", rank: "Excellent", num: 16 },
        { ability: "Endurance", rank: "Good", num: 8 },
        { ability: "Reason", rank: "Good", num: 8 },
        { ability: "Intuition", rank: "Typical", num: 5 },
        { ability: "Psyche", rank: "Poor", num: 3 },
    ];

    for (const exp of expected) {
        const rank = charStats.primaryAbilities[0][exp.ability].rank;
        const num = charStats.primaryAbilities[0][exp.ability].number;
        Tester.assertEquals(
            exp.rank,
            rank,
            `Primary Ability Rolls (${config.label}): ${exp.ability} generated with valid rank.`,
        );
        Tester.assertEquals(
            exp.num,
            num,
            `Primary Ability Rolls (${config.label}): ${exp.ability} generated with valid number.`,
        );
    }
};

// ============================================================================
// PRIMARY ABILITY TEST CONFIGURATIONS
// ============================================================================

const PRIMARY_ABILITY_CONFIGS = [
    // Basic mode — different rankNumbers than Advanced/Ultimate
    {
        mode: "basic",
        form: "Altered Human",
        origin: "Altered Human",
        column: 1,
        label: "Basic",
        expected: [
            { ability: "Fighting", rank: "Remarkable", num: 30 },
            { ability: "Agility", rank: "Excellent", num: 20 },
            { ability: "Strength", rank: "Excellent", num: 20 },
            { ability: "Endurance", rank: "Good", num: 10 },
            { ability: "Reason", rank: "Good", num: 10 },
            { ability: "Intuition", rank: "Typical", num: 6 },
            { ability: "Psyche", rank: "Poor", num: 4 },
        ],
    },

    // Advanced mode — uses default expected values
    {
        mode: "advanced",
        form: "Altered Human",
        origin: "Altered Human",
        column: 1,
        label: "Advanced",
    },

    // Ultimate mode — Normal Human uses column 2 (narrow human ranges)
    {
        mode: "ultimate",
        form: "Normal Human",
        origin: "Natal",
        column: 2,
        label: "Ultimate",
        expected: [
            { ability: "Fighting", rank: "Typical", num: 5 },
            { ability: "Agility", rank: "Typical", num: 5 },
            { ability: "Strength", rank: "Typical", num: 5 },
            { ability: "Endurance", rank: "Typical", num: 5 },
            { ability: "Reason", rank: "Typical", num: 5 },
            { ability: "Intuition", rank: "Poor", num: 3 },
            { ability: "Psyche", rank: "Poor", num: 3 },
        ],
    },

    // Robot-Metamorphic — generates two physical ability rows
    {
        mode: "ultimate",
        form: "Robot - Metamorphic",
        origin: "Robot - Metamorphic",
        column: 4,
        label: "Robot-Metamorphic",
        rolls: {
            physical: {
                Fighting: 10,
                Agility: 90,
                Strength: 70,
                Endurance: 50,
            },
            physicalRow1: {
                Fighting: 100,
                Agility: 80,
                Strength: 60,
                Endurance: 40,
            },
            mental: { Reason: 30, Intuition: 20, Psyche: 10 },
        },
        expectedRows: [
            {
                row: 0,
                abilities: [
                    { ability: "Fighting", rank: "Poor", num: 3 },
                    { ability: "Agility", rank: "Incredible", num: 36 },
                    { ability: "Strength", rank: "Remarkable", num: 26 },
                    { ability: "Endurance", rank: "Excellent", num: 16 },
                ],
            },
            {
                row: 1,
                abilities: [
                    { ability: "Fighting", rank: "Monstrous", num: 63 },
                    { ability: "Agility", rank: "Incredible", num: 36 },
                    { ability: "Strength", rank: "Remarkable", num: 26 },
                    { ability: "Endurance", rank: "Good", num: 8 },
                ],
            },
        ],
        expectedMental: [
            { ability: "Reason", rank: "Good", num: 8 },
            { ability: "Intuition", rank: "Good", num: 8 },
            { ability: "Psyche", rank: "Poor", num: 3 },
        ],
    },
];

Tester.PrimaryAbilityTests = (gen) => {
    for (const config of PRIMARY_ABILITY_CONFIGS) {
        Tester._runPrimaryAbilityTests(gen, config);
    }
};

// ============================================================================
// SECONDARY ABILITIES — RESOURCES
// ============================================================================

Tester._runResourceTests = (
    gen,
    mode,
    physicalForm,
    origin,
    column,
    expectedResources,
) => {
    gen.generatorMode = mode;
    gen.setTables();
    gen.setDeterministicRolls();
    gen.identitySecret = true;
    gen.originPublic = false;
    gen.wellEstablished = false;
    gen.looksHuman = false;
    gen.hiTechToGood = true;

    const charRes = new Character();
    charRes.physicalForm = physicalForm;
    charRes.origin = origin;
    charRes.randomRanksColumn = column;
    charRes.log = [];

    for (const tc of expectedResources) {
        gen.resourceModifierRoll = tc.roll;
        gen.determineResources(charRes);

        Tester.assert(
            charRes.resources.number > 0 && charRes.resources.rank !== "",
            `Resource Roll (${mode}): Resources for ${physicalForm} as '${charRes.resources.rank}' (${charRes.resources.number}).`,
        );
        Tester.assertEquals(
            tc.rank,
            charRes.resources.rank,
            `Resource Roll (${mode}): Resources for ${physicalForm} with roll ${tc.roll} = ${tc.rank}.`,
        );
    }
};

// --- Ultimate Resource Tests (already data-driven) ---
Tester._runUltimateResourceTests = (gen) => {
    gen.generatorMode = "ultimate";
    gen.setTables();

    const resourceTests = [
        {
            form: "Normal Human",
            origin: "Normal Human",
            column: 2,
            cases: [
                { roll: 15, rank: "Good" },
                { roll: 50, rank: "Excellent" },
                { roll: 70, rank: "Remarkable" },
                { roll: 85, rank: "Incredible" },
                { roll: 95, rank: "Amazing" },
                { roll: 100, rank: "Monstrous" },
            ],
        },
        {
            form: "Mutant - Random",
            origin: "Mutant - Random",
            column: 1,
            cases: [
                { roll: 15, rank: "Feeble" },
                { roll: 50, rank: "Poor" },
                { roll: 70, rank: "Typical" },
                { roll: 85, rank: "Good" },
                { roll: 95, rank: "Excellent" },
                { roll: 100, rank: "Remarkable" },
            ],
        },
    ];

    for (const test of resourceTests) {
        const charRes = new Character();
        charRes.physicalForm = test.form;
        charRes.origin = test.origin;
        charRes.randomRanksColumn = test.column;
        charRes.log = [];

        for (const tc of test.cases) {
            gen.resourceModifierRoll = tc.roll;
            gen.determineResources(charRes);
            Tester.assert(
                charRes.resources.number > 0 && charRes.resources.rank !== "",
                `Resource Roll: Resources for ${test.form} as '${charRes.resources.rank}' (${charRes.resources.number}).`,
            );
            Tester.assertEquals(
                tc.rank,
                charRes.resources.rank,
                `Resource Roll: ${test.form} with roll ${tc.roll} = ${tc.rank}.`,
            );
        }
    }
};

// ============================================================================
// SECONDARY ABILITIES — POPULARITY
// ============================================================================

// Basic/Advanced popularity test configs
const POPULARITY_GEN_ADV_CONFIGS = [
    {
        form: "Mutant",
        origin: "Mutant",
        expectedBasic: -30,
        expectedAdvanced: 0,
    },
    {
        form: "Robot",
        origin: "Robot",
        expectedBasic: -10,
        expectedAdvanced: 0,
    },
    {
        form: "Altered Human",
        origin: "Altered Human",
        expectedBasic: 10,
        expectedAdvanced: 30,
    },
];

Tester._runPopularityTests_GenAdv = (gen, mode) => {
    gen.generatorMode = mode;
    gen.setTables();
    gen.identitySecret = true;
    gen.originPublic = false;
    gen.wellEstablished = false;
    gen.looksHuman = false;
    gen.newInArea = false;

    for (const tc of POPULARITY_GEN_ADV_CONFIGS) {
        const charPop = new Character();
        charPop.physicalForm = tc.form;
        charPop.origin = tc.origin;
        gen.determinePopularity(charPop);
        const expected =
            mode === "basic" ? tc.expectedBasic : tc.expectedAdvanced;
        Tester.assertEquals(
            expected,
            charPop.popularity,
            `Popularity Roll (${mode}): ${tc.form} correctly defaults to ${expected} Popularity.`,
        );
    }
};

// Ultimate popularity test configs
const POPULARITY_ULTIMATE_CONFIGS = [
    {
        form: "Normal Human",
        origin: "Normal Human",
        column: 1,
        secret: true,
        roll: 10,
        expected: 0,
    },
    {
        form: "Normal Human",
        origin: "Normal Human",
        column: 1,
        secret: false,
        roll: 10,
        expected: 13,
    },
    {
        form: "Android",
        origin: "Android",
        column: 4,
        secret: true,
        roll: 10,
        expected: 0,
    },
    {
        form: "Android",
        origin: "Android",
        column: 4,
        secret: false,
        roll: 10,
        expected: 11,
    },
    {
        form: "Surgical Composite",
        origin: "Surgical Composite",
        column: 2,
        secret: true,
        roll: 10,
        expected: 0,
    },
    {
        form: "Surgical Composite",
        origin: "Surgical Composite",
        column: 2,
        secret: false,
        roll: 10,
        expected: 11,
    },
    {
        form: "Demihuman - Chiropteran",
        origin: "Demihuman - Chiropteran",
        column: 2,
        secret: true,
        roll: 10,
        expected: 0,
    },
    {
        form: "Demihuman - Chiropteran",
        origin: "Demihuman - Chiropteran",
        column: 2,
        secret: false,
        roll: 10,
        expected: 11,
    },
    {
        form: "Angel/Demon",
        origin: "Angel/Demon",
        subType: "Angel",
        column: 5,
        secret: true,
        roll: 10,
        expected: 0,
    },
    {
        form: "Angel/Demon",
        origin: "Angel/Demon",
        subType: "Angel",
        column: 5,
        secret: false,
        roll: 10,
        expected: 15,
    },
    {
        form: "Angel/Demon",
        origin: "Angel/Demon",
        subType: "Demon",
        column: 5,
        secret: true,
        roll: 10,
        expected: 0,
    },
    {
        form: "Angel/Demon",
        origin: "Angel/Demon",
        subType: "Demon",
        column: 5,
        secret: false,
        roll: 10,
        expected: 11,
    },
];

Tester._runUltimatePopularityTests = (gen) => {
    gen.generatorMode = "ultimate";
    gen.setTables();

    // NOTE: Dice.seed() + throwAllRolls() is used here because the popularity
    // calculation needs random rolls for other subsystems (powers, talents, etc.).
    // If throwAllRolls() changes the number of Dice.roll100() calls, this seed
    // will produce different sequences. Consider using setDeterministicRolls()
    // for new tests that don't need random auxiliary rolls.
    Dice.seed(11000);
    gen.throwAllRolls();
    gen.physicalFormRoll = 1;
    gen.originRoll = 1;

    for (const test of POPULARITY_ULTIMATE_CONFIGS) {
        const charPop = new Character();
        charPop.physicalForm = test.form;
        charPop.origin = test.origin;
        if (test.subType) charPop.subType = test.subType;

        gen.identitySecret = test.secret;
        gen.randomRanksColumn = test.column;
        gen.popularityRoll = test.roll;
        gen.determinePopularity(charPop);
        const label = test.subType
            ? `${test.subType} (${test.secret ? "Secret" : "Public"})`
            : `${test.form} (${test.secret ? "Secret" : "Public"})`;
        Tester.assertEquals(
            test.expected,
            charPop.popularity,
            `Popularity Roll: ${label} correctly calculated.`,
        );
    }
};

// ============================================================================
// SECONDARY ABILITIES — HEALTH
// ============================================================================

// Health test configs: { form, origin, abilityRolls, expectedFn }
// expectedFn(char) returns the expected health value
const HEALTH_TEST_CONFIGS = [
    {
        form: "Normal Human",
        origin: "Normal Human",
        abilityRolls: { Fighting: 1, Agility: 1, Strength: 1, Endurance: 1 },
        label: "Health = F+A+S+E",
        expectedFn: (char) =>
            char.getAbilityNumber("Fighting") +
            char.getAbilityNumber("Agility") +
            char.getAbilityNumber("Strength") +
            char.getAbilityNumber("Endurance"),
    },
    {
        form: "Mineral",
        origin: "Mineral",
        abilityRolls: { Fighting: 1, Agility: 1, Strength: 1, Endurance: 1 },
        label: "Mineral health = 2 * (F+A+S+E)",
        expectedFn: (char) =>
            (char.getAbilityNumber("Fighting") +
                char.getAbilityNumber("Agility") +
                char.getAbilityNumber("Strength") +
                char.getAbilityNumber("Endurance")) *
            2,
    },
];

Tester._runUltimateHealthTests = (gen) => {
    gen.generatorMode = "ultimate";
    gen.setTables();

    for (const tc of HEALTH_TEST_CONFIGS) {
        const char = new Character();
        char.physicalForm = tc.form;
        char.origin = tc.origin;

        // NOTE: Dice.seed() used for reproducibility; override specific rolls after throwAllRolls.
        Dice.seed(12000);
        gen.throwAllRolls();
        PHYSICAL_ABILITIES.forEach((a) => {
            gen.physicalAbilityRolls[0][a] = tc.abilityRolls[a];
        });
        gen.determinePrimaryAbilities(char);
        char.calculateSecondary();
        gen.determineHealth(char);

        Tester.assertEquals(tc.expectedFn(char), char.health, tc.label);
    }
};

// ============================================================================
// ORCHESTRATION
// ============================================================================

Tester.SecondaryAbilityTests = (gen) => {
    // Basic mode: p40 — roll percentile on Table 25 (column 1); the roll
    // IS the hero's Resource rank.
    Tester._runResourceTests(
        gen,
        "basic",
        "Altered Human",
        "Altered Human",
        1,
        [
            { roll: 1, rank: "Feeble" },
            { roll: 16, rank: "Typical" },
            { roll: 51, rank: "Excellent" },
            { roll: 71, rank: "Remarkable" },
            { roll: 86, rank: "Incredible" },
            { roll: 96, rank: "Incredible" },
        ],
    );
    Tester._runResourceTests(gen, "basic", "Alien", "Alien", 5, [
        { roll: 1, rank: "Feeble" },
        { roll: 16, rank: "Typical" },
        { roll: 51, rank: "Excellent" },
        { roll: 71, rank: "Remarkable" },
        { roll: 86, rank: "Incredible" },
        { roll: 96, rank: "Incredible" },
    ]);
    Tester._runResourceTests(gen, "basic", "Alien", "Mutant", 5, [
        { roll: 1, rank: "Feeble" },
        { roll: 16, rank: "Typical" },
        { roll: 51, rank: "Excellent" },
        { roll: 71, rank: "Remarkable" },
        { roll: 86, rank: "Incredible" },
        { roll: 96, rank: "Incredible" },
    ]);
    Tester._runPopularityTests_GenAdv(gen, "basic");

    // Advanced
    Tester._runResourceTests(
        gen,
        "advanced",
        "Altered Human",
        "Altered Human",
        1,
        [
            { roll: 1, rank: "Poor" },
            { roll: 16, rank: "Typical" },
            { roll: 51, rank: "Good" },
            { roll: 71, rank: "Excellent" },
            { roll: 86, rank: "Remarkable" },
            { roll: 96, rank: "Incredible" },
        ],
    );
    Tester._runResourceTests(gen, "advanced", "Alien", "Alien", 5, [
        { roll: 1, rank: "Feeble" },
        { roll: 16, rank: "Poor" },
        { roll: 51, rank: "Typical" },
        { roll: 71, rank: "Good" },
        { roll: 86, rank: "Excellent" },
        { roll: 96, rank: "Remarkable" },
    ]);
    Tester._runResourceTests(gen, "advanced", "Alien", "Mutant", 5, [
        { roll: 1, rank: "Feeble" },
        { roll: 16, rank: "Poor" },
        { roll: 51, rank: "Typical" },
        { roll: 71, rank: "Good" },
        { roll: 86, rank: "Excellent" },
        { roll: 96, rank: "Remarkable" },
    ]);
    Tester._runPopularityTests_GenAdv(gen, "advanced");

    // Ultimate
    Tester._runUltimateResourceTests(gen);
    Tester._runUltimatePopularityTests(gen);
    Tester._runUltimateHealthTests(gen);
};

Tester.registerTestGroup(30, "deterministic", [
    { name: "PrimaryAbilityTests", needsGen: true },
    { name: "SecondaryAbilityTests", needsGen: true },
]);
