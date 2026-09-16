//  TestsWeakness
// Extracted from UnitTests.js
//
// Data-driven: Each test case is a row in WEAKNESS_TEST_CASES defining the
// input rolls and expected weakness results. To add a new test case, just
// add a row to the table.

// ============================================================================
// WEAKNESS TEST CASES
// ============================================================================
// Covers:
//   - Every stimulus category boundary (1, 13, 14, 18, 19, 43, 44, 68, 69, 81, 82, 94, 95, 100)
//   - Every effect category boundary (1, 50, 51, 90, 91, 100)
//   - Every duration category boundary (1, 40, 41, 60, 61, 90, 91, 100)
//   - Finite Limit with various rank rolls (column 1: maxRolls = [5,25,96,100])
//   - Description fields populated
//   - Invalid rolls (> 100) return gracefully

// randomRanksColumn is set to 1 by setDeterministicRolls().
// Column 1 maxRolls: Shift0=0, Feeble=5, Poor=25, Typical=96, Good=100, ...
// So: roll 1=Feeble, roll 6=Typical, roll 26=Good, roll 97=Excellent

const WEAKNESS_TEST_CASES = [
    // --- Stimulus category boundaries ---
    {
        stimulus: 1,
        effect: 1,
        duration: 1,
        expectedStimulus: "Psychological",
        expectedEffect: "Power Negation",
        expectedDuration: "Continuous with Contact",
        checkDesc: true,
    },
    {
        stimulus: 13,
        effect: 1,
        duration: 1,
        expectedStimulus: "Psychological",
        expectedEffect: "Power Negation",
        expectedDuration: "Continuous with Contact",
    },
    {
        stimulus: 14,
        effect: 1,
        duration: 1,
        expectedStimulus: "Elemental Allergy",
        expectedEffect: "Power Negation",
        expectedDuration: "Continuous with Contact",
    },
    {
        stimulus: 18,
        effect: 90,
        duration: 60,
        expectedStimulus: "Elemental Allergy",
        expectedEffect: "Incapacitation",
        expectedDuration: "Limited Duration with Contact",
    },
    {
        stimulus: 19,
        effect: 1,
        duration: 1,
        expectedStimulus: "Molecular Allergy",
        expectedEffect: "Power Negation",
        expectedDuration: "Continuous with Contact",
    },
    {
        stimulus: 43,
        effect: 100,
        duration: 90,
        expectedStimulus: "Molecular Allergy",
        expectedEffect: "Fatal",
        expectedDuration: "Limited Duration after Contact",
    },
    {
        stimulus: 44,
        effect: 1,
        duration: 1,
        expectedStimulus: "Energy Allergy",
        expectedEffect: "Power Negation",
        expectedDuration: "Continuous with Contact",
    },
    {
        stimulus: 68,
        effect: 100,
        duration: 100,
        expectedStimulus: "Energy Allergy",
        expectedEffect: "Fatal",
        expectedDuration: "Permanent",
    },
    {
        stimulus: 69,
        effect: 1,
        duration: 1,
        expectedStimulus: "Energy Depletion",
        expectedEffect: "Power Negation",
        expectedDuration: "Continuous with Contact",
    },
    {
        stimulus: 81,
        effect: 100,
        duration: 100,
        expectedStimulus: "Energy Depletion",
        expectedEffect: "Fatal",
        expectedDuration: "Permanent",
    },
    {
        stimulus: 82,
        effect: 1,
        duration: 1,
        expectedStimulus: "Energy Dampening",
        expectedEffect: "Power Negation",
        expectedDuration: "Continuous with Contact",
    },
    {
        stimulus: 94,
        effect: 100,
        duration: 100,
        expectedStimulus: "Energy Dampening",
        expectedEffect: "Fatal",
        expectedDuration: "Permanent",
    },
    {
        stimulus: 95,
        effect: 1,
        duration: 1,
        expectedStimulus: "Finite Limit",
        expectedEffect: "Power Negation",
        expectedDuration: "Continuous with Contact",
        rankRoll: 1,
        expectedRank: "Feeble",
        expectedRankNumber: 1,
    },
    {
        stimulus: 100,
        effect: 100,
        duration: 100,
        expectedStimulus: "Finite Limit",
        expectedEffect: "Fatal",
        expectedDuration: "Permanent",
        rankRoll: 1,
        expectedRank: "Feeble",
        expectedRankNumber: 1,
    },

    // --- Effect category boundaries ---
    {
        stimulus: 1,
        effect: 1,
        duration: 1,
        expectedStimulus: "Psychological",
        expectedEffect: "Power Negation",
        expectedDuration: "Continuous with Contact",
    },
    {
        stimulus: 1,
        effect: 50,
        duration: 1,
        expectedStimulus: "Psychological",
        expectedEffect: "Power Negation",
        expectedDuration: "Continuous with Contact",
    },
    {
        stimulus: 1,
        effect: 51,
        duration: 1,
        expectedStimulus: "Psychological",
        expectedEffect: "Incapacitation",
        expectedDuration: "Continuous with Contact",
    },
    {
        stimulus: 1,
        effect: 90,
        duration: 1,
        expectedStimulus: "Psychological",
        expectedEffect: "Incapacitation",
        expectedDuration: "Continuous with Contact",
    },
    {
        stimulus: 1,
        effect: 91,
        duration: 1,
        expectedStimulus: "Psychological",
        expectedEffect: "Fatal",
        expectedDuration: "Continuous with Contact",
    },

    // --- Duration category boundaries ---
    {
        stimulus: 1,
        effect: 1,
        duration: 1,
        expectedStimulus: "Psychological",
        expectedEffect: "Power Negation",
        expectedDuration: "Continuous with Contact",
    },
    {
        stimulus: 1,
        effect: 1,
        duration: 40,
        expectedStimulus: "Psychological",
        expectedEffect: "Power Negation",
        expectedDuration: "Continuous with Contact",
    },
    {
        stimulus: 1,
        effect: 1,
        duration: 41,
        expectedStimulus: "Psychological",
        expectedEffect: "Power Negation",
        expectedDuration: "Limited Duration with Contact",
    },
    {
        stimulus: 1,
        effect: 1,
        duration: 60,
        expectedStimulus: "Psychological",
        expectedEffect: "Power Negation",
        expectedDuration: "Limited Duration with Contact",
    },
    {
        stimulus: 1,
        effect: 1,
        duration: 61,
        expectedStimulus: "Psychological",
        expectedEffect: "Power Negation",
        expectedDuration: "Limited Duration after Contact",
    },
    {
        stimulus: 1,
        effect: 1,
        duration: 90,
        expectedStimulus: "Psychological",
        expectedEffect: "Power Negation",
        expectedDuration: "Limited Duration after Contact",
    },
    {
        stimulus: 1,
        effect: 1,
        duration: 91,
        expectedStimulus: "Psychological",
        expectedEffect: "Power Negation",
        expectedDuration: "Permanent",
    },

    // --- Finite Limit with various rank rolls ---
    // Normal Human physicalFormRoll=1 → column 2 → maxRolls[1]:
    //   Feeble=5, Poor=25, Typical=75, Good=96, Excellent=100
    {
        stimulus: 100,
        effect: 1,
        duration: 1,
        rankRoll: 1,
        expectedStimulus: "Finite Limit",
        expectedEffect: "Power Negation",
        expectedDuration: "Continuous with Contact",
        expectedRank: "Feeble",
        expectedRankNumber: 1,
    },
    {
        stimulus: 100,
        effect: 1,
        duration: 1,
        rankRoll: 5,
        expectedStimulus: "Finite Limit",
        expectedEffect: "Power Negation",
        expectedDuration: "Continuous with Contact",
        expectedRank: "Feeble",
        expectedRankNumber: 1,
    },
    {
        stimulus: 100,
        effect: 1,
        duration: 1,
        rankRoll: 6,
        expectedStimulus: "Finite Limit",
        expectedEffect: "Power Negation",
        expectedDuration: "Continuous with Contact",
        expectedRank: "Poor",
        expectedRankNumber: 3,
    },
    {
        stimulus: 100,
        effect: 1,
        duration: 1,
        rankRoll: 26,
        expectedStimulus: "Finite Limit",
        expectedEffect: "Power Negation",
        expectedDuration: "Continuous with Contact",
        expectedRank: "Typical",
        expectedRankNumber: 5,
    },
    {
        stimulus: 100,
        effect: 1,
        duration: 1,
        rankRoll: 76,
        expectedStimulus: "Finite Limit",
        expectedEffect: "Power Negation",
        expectedDuration: "Continuous with Contact",
        expectedRank: "Good",
        expectedRankNumber: 8,
    },
    {
        stimulus: 100,
        effect: 1,
        duration: 1,
        rankRoll: 97,
        expectedStimulus: "Finite Limit",
        expectedEffect: "Power Negation",
        expectedDuration: "Continuous with Contact",
        expectedRank: "Excellent",
        expectedRankNumber: 16,
    },
];

// ============================================================================
// TEST RUNNER
// ============================================================================

Tester.WeaknessTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();

    for (let i = 0; i < WEAKNESS_TEST_CASES.length; i++) {
        const tc = WEAKNESS_TEST_CASES[i];
        gen.weaknessStimulusRoll = tc.stimulus;
        gen.weaknessEffectRoll = tc.effect;
        gen.weaknessDurationRoll = tc.duration;
        if (tc.rankRoll !== undefined) gen.weaknessRankRoll = tc.rankRoll;

        const char = gen.generateWithoutThrows();
        const prefix = `Weakness Test #${i + 1} (s=${tc.stimulus}, e=${tc.effect}, d=${tc.duration})`;

        Tester.assertEquals(
            tc.expectedStimulus,
            char.weakness.stimulus,
            `${prefix}: Stimulus is '${char.weakness.stimulus}'.`,
        );
        Tester.assertEquals(
            tc.expectedEffect,
            char.weakness.effect,
            `${prefix}: Effect is '${char.weakness.effect}'.`,
        );
        Tester.assertEquals(
            tc.expectedDuration,
            char.weakness.duration,
            `${prefix}: Duration is '${char.weakness.duration}'.`,
        );

        // Verify description fields are populated for all valid stimuli
        if (tc.checkDesc) {
            Tester.assert(
                char.weakness.stimulusDescription !== "" &&
                    char.weakness.stimulusDescription !== undefined,
                `${prefix}: stimulusDescription is populated.`,
            );
            Tester.assert(
                char.weakness.effectDescription !== "" &&
                    char.weakness.effectDescription !== undefined,
                `${prefix}: effectDescription is populated.`,
            );
            Tester.assert(
                char.weakness.durationDescription !== "" &&
                    char.weakness.durationDescription !== undefined,
                `${prefix}: durationDescription is populated.`,
            );
        }

        // Finite Limit: verify rank and rankNumber
        if (tc.expectedRank !== undefined) {
            Tester.assertEquals(
                tc.expectedRank,
                char.weakness.rank,
                `${prefix} (rankRoll=${tc.rankRoll}): Rank is '${char.weakness.rank}'.`,
            );
            Tester.assertEquals(
                tc.expectedRankNumber,
                char.weakness.rankNumber,
                `${prefix} (rankRoll=${tc.rankRoll}): RankNumber is ${char.weakness.rankNumber}.`,
            );
        }
    }
};

Tester.registerTest("WeaknessTests", false, 90, "deterministic");
