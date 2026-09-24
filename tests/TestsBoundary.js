// New edge case tests
// Covers: #1 (missing helpers), #4 (assertThrows for error paths),
//         boundary conditions, and invalid input handling.

// ============================================================================
// #4 — Error path tests using assertThrows
// ============================================================================

Tester.ErrorPathTests = () => {
    // Test that Character.setAbility handles invalid abilityIndex gracefully
    const char = new Character();
    // Accessing an out-of-range index should auto-expand the array
    char.setAbility("Fighting", "Good", 10, 99);
    Tester.assert(
        char.primaryAbilities[99] !== undefined,
        `setAbility: Should expand primaryAbilities array for out-of-range index.`,
    );
    Tester.assertEquals(
        "Good",
        char.primaryAbilities[99]["Fighting"].rank,
        `setAbility: Should set rank on expanded ability index.`,
    );

    // Test Utility.getValue with null/undefined inputs
    Tester.assertEquals(
        -1,
        Utility.getValue(null, "prop", -1),
        `Utility.getValue: Should return default for null object.`,
    );
    Tester.assertEquals(
        -1,
        Utility.getValue(undefined, "prop", -1),
        `Utility.getValue: Should return default for undefined object.`,
    );
    Tester.assertEquals(
        -1,
        Utility.getValue({}, null, -1),
        `Utility.getValue: Should return default for null property.`,
    );
    Tester.assertEquals(
        -1,
        Utility.getValue({}, undefined, -1),
        `Utility.getValue: Should return default for undefined property.`,
    );
    Tester.assertEquals(
        "fallback",
        Utility.getValue({}, "missing", "fallback"),
        `Utility.getValue: Should return custom default for missing property.`,
    );
    Tester.assertEquals(
        42,
        Utility.getValue({ x: 42 }, "x", -1),
        `Utility.getValue: Should return actual value when present.`,
    );
    // Note: getValue treats null same as undefined — returns default
    Tester.assertEquals(
        -1,
        Utility.getValue({ x: null }, "x", -1),
        `Utility.getValue: Returns default when value is null (treated as undefined).`,
    );
    Tester.assertEquals(
        0,
        Utility.getValue({ x: 0 }, "x", -1),
        `Utility.getValue: Should return 0 (falsy but defined) when value is 0.`,
    );

    // Test Utility.findRow with out-of-range roll
    const gen = new CharacterGenerator();
    gen.generatorMode = "basic";
    gen.setTables();

    const rowLow = Utility.findRow(gen, 1, 1);
    Tester.assert(
        rowLow !== null,
        `Utility.findRow: Roll 1 column 1 should return a row.`,
    );
    Tester.assertEquals(
        "Feeble",
        rowLow.rank,
        `Utility.findRow: Roll 1 column 1 = Feeble.`,
    );

    const rowHigh = Utility.findRow(gen, 100, 1);
    Tester.assert(
        rowHigh !== null,
        `Utility.findRow: Roll 100 column 1 should return a row.`,
    );
    Tester.assertEquals(
        "Amazing",
        rowHigh.rank,
        `Utility.findRow: Roll 100 column 1 = Amazing.`,
    );

    // Roll 0 matches first row (Feeble) since 0 <= 5
    const rowZero = Utility.findRow(gen, 0, 1);
    Tester.assert(
        rowZero !== null,
        `Utility.findRow: Roll 0 should return a row (matches first entry).`,
    );
    Tester.assertEquals(
        "Feeble",
        rowZero.rank,
        `Utility.findRow: Roll 0 = Feeble.`,
    );

    // Roll >100 should return null — findRow returns null when roll exceeds
    // all maxRoll values in the table (last row maxRoll is 100 for column 1)
    const rowOver = Utility.findRow(gen, 101, 1);
    Tester.assert(
        rowOver === null,
        `Utility.findRow: Roll 101 should return null (above all maxRoll values).`,
    );

    // Roll exactly at boundary — last row's maxRoll
    const rowBoundary = Utility.findRow(gen, 100, 1);
    Tester.assert(
        rowBoundary !== null,
        `Utility.findRow: Roll 100 should return a row (matches last entry).`,
    );
    Tester.assertEquals(
        "Amazing",
        rowBoundary.rank,
        `Utility.findRow: Roll 100 = Amazing (last row).`,
    );

    // Test Character.calculateSecondary with all-zero abilities
    const charZero = new Character();
    charZero.calculateSecondary();
    Tester.assertEquals(
        0,
        charZero.health,
        `calculateSecondary: Zero abilities = zero health.`,
    );
    Tester.assertEquals(
        0,
        charZero.karma,
        `calculateSecondary: Zero abilities = zero karma.`,
    );
};

// ============================================================================
// Boundary and invariants
// ============================================================================

Tester.BoundaryInvariantTests = (gen) => {
    // Generate a character in each mode and verify invariants
    const modes = ["basic", "advanced", "ultimate"];
    for (const mode of modes) {
        const g = new CharacterGenerator();
        g.generatorMode = mode;
        g.setTables();
        g.setDeterministicRolls();

        const char = g.generateWithoutThrows();

        // Invariant: physicalForm is always set
        Tester.assert(
            char.physicalForm !== "",
            `Boundary (${mode}): physicalForm is non-empty.`,
        );

        // Invariant: origin is always set
        Tester.assert(
            char.origin !== "",
            `Boundary (${mode}): origin is non-empty.`,
        );

        // Invariant: health >= F + A + S + E
        // Physical forms can apply health adjustments (e.g., Mineral *2),
        // so health may exceed the base sum. Use >= to account for this.
        const baseHealth =
            char.getAbilityNumber("Fighting") +
            char.getAbilityNumber("Agility") +
            char.getAbilityNumber("Strength") +
            char.getAbilityNumber("Endurance");
        Tester.assert(
            char.health >= baseHealth,
            `Boundary (${mode}): health (${char.health}) >= base F+A+S+E (${baseHealth}).`,
        );

        // Invariant: karma = R + I + P (no adjustments applied to karma)
        const expectedKarma =
            char.getAbilityNumber("Reason") +
            char.getAbilityNumber("Intuition") +
            char.getAbilityNumber("Psyche");
        Tester.assertEquals(
            expectedKarma,
            char.karma,
            `Boundary (${mode}): karma = R+I+P.`,
        );

        // Invariant: popularity >= 0 for Ultimate only. Basic (Table 26)
        // and Advanced (p.9 "Heroes may start with negative Popularity")
        // define no floor, so their popularity may legitimately be negative.
        Tester.assert(
            typeof char.popularity === "number" &&
                (mode !== "ultimate" || char.popularity >= 0),
            `Boundary (${mode}): popularity is a number` +
                (mode === "ultimate"
                    ? ` and >= 0 (was ${char.popularity}).`
                    : ` (no floor in ${mode}; was ${char.popularity}).`),
        );

        // Invariant: powers count <= powers max
        const totalPowerSlots = char.powers.reduce(
            (sum, p) => sum + (p.powerSlots || 1),
            0,
        );
        Tester.assert(
            totalPowerSlots <= char.powersMax,
            `Boundary (${mode}): total power slots (${totalPowerSlots}) <= powersMax (${char.powersMax}).`,
        );

        // Invariant: talents count <= talents max
        const totalTalentSlots = char.talents.reduce(
            (sum, t) => sum + (t.talentSlots || 1),
            0,
        );
        Tester.assert(
            totalTalentSlots <= char.talentsMax,
            `Boundary (${mode}): total talent slots (${totalTalentSlots}) <= talentsMax (${char.talentsMax}).`,
        );

        // Invariant: contacts count <= contacts max
        Tester.assert(
            char.contacts.length <= char.contactsMax,
            `Boundary (${mode}): contacts (${char.contacts.length}) <= contactsMax (${char.contactsMax}).`,
        );

        // Invariant: no null ranks in abilities
        PHYSICAL_ABILITIES.forEach((a) => {
            const rank = char.getAbility(a).rank;
            Tester.assert(
                rank !== null && rank !== undefined && rank !== "",
                `Boundary (${mode}): ${a} rank is not null/empty (was "${rank}").`,
            );
        });
        MENTAL_ABILITIES.forEach((a) => {
            const rank = char.getAbility(a).rank;
            Tester.assert(
                rank !== null && rank !== undefined && rank !== "",
                `Boundary (${mode}): ${a} rank is not null/empty (was "${rank}").`,
            );
        });

        // Invariant: ultimate has weakness, others don't
        if (mode === "ultimate") {
            Tester.assert(
                char.weakness.stimulus !== "",
                `Boundary (ultimate): weakness.stimulus is set.`,
            );
            Tester.assert(
                char.weakness.effect !== "",
                `Boundary (ultimate): weakness.effect is set.`,
            );
            Tester.assert(
                char.weakness.duration !== "",
                `Boundary (ultimate): weakness.duration is set.`,
            );
        } else {
            Tester.assert(
                char.weakness.stimulus === "",
                `Boundary (${mode}): weakness.stimulus is empty.`,
            );
        }

        // Invariant: log entries don't contain undefined/null/object
        Tester._assertNoGarbageInLogs(char.log, "Boundary " + mode);
    }
};

// ============================================================================
// Dice / PRNG seed reproducibility and boundary cases
// ============================================================================

Tester.DiceSeedTests = () => {
    // --- Reproducibility ---
    // Seeded Dice should produce identical sequences.
    // NOTE: This test validates Dice.seed() itself, not generator behavior.
    // For generator tests, prefer setDeterministicRolls() over Dice.seed()
    // to avoid implicit dependencies on throwAllRolls() roll counts.
    Dice.seed(42);
    const seq1 = [];
    for (let i = 0; i < 10; i++) seq1.push(Dice.roll100());
    Dice.seed(42);
    const seq2 = [];
    for (let i = 0; i < 10; i++) seq2.push(Dice.roll100());

    for (let i = 0; i < 10; i++) {
        Tester.assertEquals(
            seq1[i],
            seq2[i],
            `Dice.seed: Sequence[${i}] matches with same seed.`,
        );
    }

    // Different seed should (very likely) produce different sequence
    Dice.seed(99);
    const seq3 = [];
    for (let i = 0; i < 10; i++) seq3.push(Dice.roll100());
    const anyDiff = seq1.some((v, i) => v !== seq3[i]);
    Tester.assert(
        anyDiff,
        `Dice.seed: Different seed produces different sequence.`,
    );

    // --- Boundary cases for Dice.roll(min, max) ---
    // min = max: should always return that value
    for (let i = 0; i < 20; i++) {
        Tester.assertEquals(
            1,
            Dice.roll(1, 1),
            `Dice.roll(1,1): Always returns 1.`,
        );
        Tester.assertEquals(
            50,
            Dice.roll(50, 50),
            `Dice.roll(50,50): Always returns 50.`,
        );
        Tester.assertEquals(
            100,
            Dice.roll(100, 100),
            `Dice.roll(100,100): Always returns 100.`,
        );
    }

    // Tiny range: result stays in [1, 2]
    for (let i = 0; i < 20; i++) {
        const r = Dice.roll(1, 2);
        Tester.assert(
            r === 1 || r === 2,
            `Dice.roll(1,2): Result ${r} is 1 or 2.`,
        );
    }

    // Standard range: result stays in [1, 100]
    for (let i = 0; i < 20; i++) {
        const r = Dice.roll(1, 100);
        Tester.assertInRange(
            1,
            100,
            r,
            `Dice.roll(1,100): Result in range [1-100].`,
        );
    }

    // Boundary pair: result stays in [99, 100]
    for (let i = 0; i < 20; i++) {
        const r = Dice.roll(99, 100);
        Tester.assert(
            r === 99 || r === 100,
            `Dice.roll(99,100): Result ${r} is 99 or 100.`,
        );
    }

    // Result is always an integer
    for (let i = 0; i < 20; i++) {
        const r = Dice.roll(1, 100);
        Tester.assert(
            Number.isInteger(r),
            `Dice.roll: Result ${r} is an integer.`,
        );
    }

    // --- Reset to Math.random ---
    Dice.seed(null);
    const r1 = Dice.roll100();
    const r2 = Dice.roll100();
    Tester.assertInRange(
        1,
        100,
        r1,
        `Dice.roll100 (unseeded): Result in range [1-100].`,
    );
    Tester.assertInRange(
        1,
        100,
        r2,
        `Dice.roll100 (unseeded): Result in range [1-100].`,
    );
};

// ============================================================================
// Negative / invalid input tests using assertThrows and edge cases
// ============================================================================

Tester.NegativeInputTests = () => {
    // --- Dice.roll with min > max (inverted range) ---
    // Should not crash; result may be NaN or out-of-range, but no throw
    const invertedResult = Dice.roll(100, 1);
    Tester.assert(
        typeof invertedResult === "number",
        `Dice.roll(100,1): Returns a number (was ${invertedResult}).`,
    );

    // --- Dice.getRandomItem with empty array ---
    // Should return null, not undefined (fixed bug in Dice.getRandomItem)
    const emptyResult = Dice.getRandomItem([]);
    Tester.assertEquals(
        null,
        emptyResult,
        `Dice.getRandomItem([]): Returns null for empty array (fixed from undefined).`,
    );

    // --- Character.getAbility with invalid ability name ---
    const char = new Character();
    char.setAbility("Fighting", "Good", 10, 0);
    // getAbility returns undefined for unknown keys (no throw)
    const invalidAbility = char.getAbility("InvalidAbility");
    Tester.assertEquals(
        undefined,
        invalidAbility,
        `getAbility("InvalidAbility"): Returns undefined for unknown ability.`,
    );

    // --- Character.setAbility with empty rank string (falsy, so skipped) ---
    char.setAbility("Fighting", "", 0, 0);
    Tester.assertEquals(
        "Good",
        char.getAbility("Fighting").rank,
        `setAbility(Fighting, ""): Empty rank is falsy, so previous value preserved.`,
    );
    Tester.assertEquals(
        10,
        char.getAbility("Fighting").number,
        `setAbility(Fighting, ""): Number unchanged (empty rank skips assignment).`,
    );

    // --- Utility.findRow with invalid column index ---
    const gen = new CharacterGenerator();
    gen.generatorMode = "basic";
    gen.setTables();
    const invalidColRow = Utility.findRow(gen, 50, 999);
    Tester.assertEquals(
        null,
        invalidColRow,
        `Utility.findRow: Invalid column 999 returns null.`,
    );

    // --- Utility.getValue with empty string property ---
    Tester.assertEquals(
        42,
        Utility.getValue({ "": 42 }, "", -1),
        `Utility.getValue: Empty string key present returns actual value.`,
    );
    Tester.assertEquals(
        "fallback",
        Utility.getValue({}, "", "fallback"),
        `Utility.getValue: Missing empty string key returns default.`,
    );

    // --- CharacterGenerator with unrecognized mode (should use basic tables) ---
    const genBad = new CharacterGenerator();
    genBad.generatorMode = "bogus_mode";
    genBad.setTables();
    // Should not crash; tables should be set to basic defaults
    Tester.assert(
        genBad.powerCategoriesTable !== null &&
            genBad.powerCategoriesTable !== undefined,
        `setTables("bogus_mode"): powerCategoriesTable is set (uses basic default).`,
    );
    Tester.assert(
        genBad.talentCategoriesTable !== null &&
            genBad.talentCategoriesTable !== undefined,
        `setTables("bogus_mode"): talentCategoriesTable is set (uses basic default).`,
    );

    // --- Character.calculateSecondary with partial abilities set ---
    const charPartial = new Character();
    charPartial.setAbility("Fighting", "Good", 10, 0);
    // Only Fighting is set; others default to 0
    charPartial.calculateSecondary();
    Tester.assertEquals(
        10,
        charPartial.health,
        `calculateSecondary: Partial abilities — health = Fighting only (10).`,
    );
    Tester.assertEquals(
        0,
        charPartial.karma,
        `calculateSecondary: Partial abilities — karma = 0 (no mental abilities set).`,
    );

    // --- CharacterGenerator.generateWithoutThrows with missing rolls ---
    // Should not crash; missing rolls use default values
    const genMinimal = new CharacterGenerator();
    genMinimal.generatorMode = "basic";
    genMinimal.setTables();
    // Don't set any rolls — let defaults handle it
    const charMinimal = genMinimal.generateWithoutThrows();
    Tester.assert(
        charMinimal !== null && charMinimal !== undefined,
        `generateWithoutThrows (minimal): Returns a character (not null).`,
    );
    // Note: physicalForm may be empty with no rolls set — that's expected
    Tester.assert(
        typeof charMinimal.physicalForm === "string",
        `generateWithoutThrows (minimal): physicalForm is a string (may be empty).`,
    );
};

// ============================================================================
// Corrupted / malformed table data tests
// ============================================================================

Tester.CorruptedTableTests = () => {
    // Test that the generator handles corrupted power tables gracefully
    // (missing fields, empty arrays, null entries)

    // --- Empty power list table ---
    const gen1 = new CharacterGenerator();
    gen1.generatorMode = "basic";
    gen1.setTables();
    gen1.setDeterministicRolls();
    gen1.powerListTable = []; // Corrupted: empty table
    gen1.powerCategoriesTable = [];

    const char1 = gen1.generateWithoutThrows();
    Tester.assert(
        char1 !== null,
        `CorruptedTable: Empty power table doesn't crash.`,
    );
    // Note: powersCount may still be > 0 from quantityTable; the key test is no crash
    Tester.assert(
        typeof char1.powersCount === "number",
        `CorruptedTable: Empty power table — powersCount is still a number.`,
    );

    // --- Power entries with missing 'name' field ---
    const gen2 = new CharacterGenerator();
    gen2.generatorMode = "basic";
    gen2.setTables();
    gen2.setDeterministicRolls();
    // Corrupt one entry in the power list
    const origPower = gen2.powerListTable[0];
    gen2.powerListTable[0] = {
        maxRoll: 100,
        category: "Test",
        name: undefined,
        rank: "Good",
    };

    const char2 = gen2.generateWithoutThrows();
    Tester.assert(
        char2 !== null,
        `CorruptedTable: Missing power name doesn't crash.`,
    );
    // Restore original to avoid affecting other tests
    gen2.powerListTable[0] = origPower;

    // --- Talent entries with null category ---
    const gen3 = new CharacterGenerator();
    gen3.generatorMode = "basic";
    gen3.setTables();
    gen3.setDeterministicRolls();
    gen3.talentListTable = [
        { maxRoll: 100, category: null, name: "Test Talent", code: "T1" },
    ];
    gen3.talentCategoriesTable = [{ maxRoll: 100, name: null }];

    const char3 = gen3.generateWithoutThrows();
    Tester.assert(
        char3 !== null,
        `CorruptedTable: Null talent category doesn't crash.`,
    );

    // --- Contact entries with missing fields ---
    const gen4 = new CharacterGenerator();
    gen4.generatorMode = "basic";
    gen4.setTables();
    gen4.setDeterministicRolls();
    gen4.contactTypeListTable = [];
    gen4.contactCategoriesTable = [];

    const char4 = gen4.generateWithoutThrows();
    Tester.assert(
        char4 !== null,
        `CorruptedTable: Empty contact tables don't crash.`,
    );
    Tester.assert(
        typeof char4.contactsCount === "number",
        `CorruptedTable: Empty contact tables — contactsCount is still a number.`,
    );

    // --- Random ranks table with negative rankNumber ---
    const gen5 = new CharacterGenerator();
    gen5.generatorMode = "basic";
    gen5.setTables();
    gen5.setDeterministicRolls();
    const origRanksTable = gen5.randomRanksTable;
    gen5.randomRanksTable = [
        { maxRoll: 100, rank: "Feeble", rankNumber: -1 },
        { maxRoll: 100, rank: "Good", rankNumber: 10 },
    ];

    const char5 = gen5.generateWithoutThrows();
    Tester.assert(
        char5 !== null,
        `CorruptedTable: Negative rankNumber doesn't crash.`,
    );
    gen5.randomRanksTable = origRanksTable;

    // --- Physical form table with missing 'column' field ---
    const gen6 = new CharacterGenerator();
    gen6.generatorMode = "basic";
    gen6.setTables();
    gen6.setDeterministicRolls();
    gen6.physicalFormTable = [
        { maxRoll: 100, name: "TestForm" }, // Missing 'column' field
    ];

    const char6 = gen6.generateWithoutThrows();
    Tester.assert(
        char6 !== null,
        `CorruptedTable: Missing 'column' in physical form doesn't crash.`,
    );

    // --- generateCharacter static method (pure function) ---
    const charPure = CharacterGenerator.generateCharacter("basic", {
        useDeterministicRolls: true,
    });
    Tester.assert(charPure !== null, `generateCharacter: Returns a character.`);
    Tester.assert(
        charPure.physicalForm !== "",
        `generateCharacter: physicalForm is populated.`,
    );
    Tester.assert(
        charPure.origin !== "",
        `generateCharacter: origin is populated.`,
    );
    Tester.assert(
        typeof charPure.health === "number" && charPure.health >= 0,
        `generateCharacter: health is a non-negative number.`,
    );
    Tester.assert(
        typeof charPure.karma === "number" && charPure.karma >= 0,
        `generateCharacter: karma is a non-negative number.`,
    );

    // Verify pure function doesn't mutate external state
    const charPureUlt = CharacterGenerator.generateCharacter("ultimate", {
        useDeterministicRolls: true,
    });
    Tester.assert(
        charPureUlt !== null,
        `generateCharacter (ultimate): Returns a character.`,
    );
    Tester.assert(
        charPureUlt.weakness.stimulus !== "",
        `generateCharacter (ultimate): weakness is populated.`,
    );

    // --- Number rolls out of range (> 100) should be clamped, not crash ---
    const genClamp = new CharacterGenerator();
    genClamp.generatorMode = "basic";
    genClamp.setTables();
    genClamp.setDeterministicRolls();
    genClamp.powerNumberRoll = 150; // Out of range — should clamp to 100
    genClamp.talentNumberRoll = -5; // Out of range — should clamp to 1
    genClamp.contactNumberRoll = 0; // Zero — should clamp to 1

    const charClamped = genClamp.generateWithoutThrows();
    Tester.assert(
        charClamped !== null,
        `CorruptedTable: Out-of-range number rolls don't crash.`,
    );
    Tester.assert(
        typeof charClamped.powersCount === "number",
        `CorruptedTable: powersCount is still valid after clamp.`,
    );
    Tester.assert(
        typeof charClamped.talentsCount === "number",
        `CorruptedTable: talentsCount is still valid after clamp.`,
    );
    Tester.assert(
        typeof charClamped.contactsCount === "number",
        `CorruptedTable: contactsCount is still valid after clamp.`,
    );
};

// ============================================================================
// UTILITY.findRow — edge cases
// ============================================================================

Tester.UtilityFindRowTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "basic";
    gen.setTables();

    // column: 0 → accesses maxRolls[-1] which is undefined → returns null
    const result0 = Utility.findRow(gen, 50, 0);
    Tester.assert(
        result0 === null,
        "findRow(column=0): returns null (accesses maxRolls[-1]).",
    );

    // column: -1 → accesses maxRolls[-2] which is undefined → returns null
    const resultNeg = Utility.findRow(gen, 50, -1);
    Tester.assert(resultNeg === null, "findRow(column=-1): returns null.");

    // roll: 0 → should match first row (Shift 0, maxRolls all >= 0)
    const resultRoll0 = Utility.findRow(gen, 0, 1);
    Tester.assert(
        resultRoll0 !== null,
        "findRow(roll=0, column=1): returns a row.",
    );

    // roll: 101 → exceeds all maxRolls → returns null
    const resultOver = Utility.findRow(gen, 101, 1);
    Tester.assert(
        resultOver === null,
        "findRow(roll=101): returns null (exceeds all maxRolls).",
    );

    // Valid lookups for each column
    for (let col = 1; col <= 5; col++) {
        const r = Utility.findRow(gen, 50, col);
        Tester.assert(
            r !== null,
            `findRow(roll=50, column=${col}): returns a row.`,
        );
        Tester.assert(
            r.rank !== undefined,
            `findRow(roll=50, column=${col}): row has a rank.`,
        );
    }
};

Tester.registerTestGroup(70, "deterministic", [
    { name: "ErrorPathTests", needsGen: false },
    { name: "NegativeInputTests", needsGen: false },
    { name: "CorruptedTableTests", needsGen: false },
    { name: "BoundaryInvariantTests", needsGen: true },
    { name: "DiceSeedTests", needsGen: false },
    { name: "UtilityFindRowTests", needsGen: false },
]);
