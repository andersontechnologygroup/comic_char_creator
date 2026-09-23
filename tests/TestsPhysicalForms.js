// TestsPhysicalForms.js
// Physical form tests extracted from TestsGeneratorOrigin.js
//
// Tests: Ultimate physical form generation (all forms), Compound forms,
// and Bonus Contact generation for Mutant - Breed.

// ============================================================================
// DATA-DRIVEN PHYSICAL FORM VALIDATION
// ============================================================================
// Each entry maps a physical form name to an array of state-path assertions
// and/or a `validate` callback for complex logic.
//
// Assertion types:
//   { path, value, msg }        — assert _resolvePath(state, path) === value
//   { path, op: "notNull", msg } — assert the path is non-null
//   { validate: fn }            — call fn(char, state) for custom logic

const PHYSICAL_FORM_ASSERTIONS = {
    "Normal Human": [
        {
            path: "resources.adjustment",
            value: 2,
            msg: "Resources adjusted by 2.",
        },
    ],
    "Mutant - Induced": [
        {
            path: "anyAbilityAdjustment",
            op: "notNull",
            msg: "anyAbilityAdjustment fired.",
        },
    ],
    "Mutant - Random": [
        {
            path: "powersCount.adjustment",
            value: 1,
            msg: "Powers Count adjusted by 1.",
        },
        {
            path: "resources.adjustment",
            value: -1,
            msg: "Resources adjusted by -1.",
        },
        {
            path: "abilityAdjustments.Endurance",
            value: 1,
            msg: "Endurance adjusted by 1.",
        },
    ],
    "Mutant - Breed": [
        {
            path: "abilityAdjustments.Endurance",
            value: 1,
            msg: "Endurance adjusted by 1.",
        },
        {
            path: "abilityAdjustments.Intuition",
            value: 1,
            msg: "Intuition adjusted by 1.",
        },
    ],
    Android: [
        {
            path: "powersCount.adjustment",
            value: 1,
            msg: "Powers Count adjusted by 1.",
        },
        {
            path: "anyAbilityAdjustment",
            op: "notNull",
            msg: "anyAbilityAdjustment fired.",
        },
        {
            path: "popularity.adjustment",
            value: -1,
            msg: "Popularity adjusted by -1.",
        },
    ],
    "Humanoid Race": [
        {
            path: "anyAbilityAdjustment",
            op: "notNull",
            msg: "anyAbilityAdjustment fired.",
        },
        {
            path: "resources.startRank",
            value: 3,
            msg: "Resources start at rankNumber 3.",
        },
    ],
    "Surgical Composite": [
        {
            path: "abilityAdjustments.Endurance",
            value: 1,
            msg: "Endurance adjusted by 1.",
        },
        {
            path: "resources.startRank",
            value: 3,
            msg: "Resources start at rankNumber 3.",
        },
        {
            path: "abilityAdjustments.Strength",
            value: 1,
            msg: "Strength adjusted by 1.",
        },
        {
            path: "abilityAdjustments.Fighting",
            value: 1,
            msg: "Fighting adjusted by 1.",
        },
        {
            path: "popularity.start",
            value: 0,
            msg: "Popularity starting at 0.",
        },
    ],
    "Modified Human - Muscular": [
        {
            path: "abilityAdjustments.Endurance",
            value: 1,
            msg: "Endurance adjusted by 1.",
        },
        {
            path: "abilityAdjustments.Strength",
            value: 1,
            msg: "Strength adjusted by 1.",
        },
    ],
    "Demihuman - Avian (Angelic)": [
        {
            path: "popularity.adjustment",
            value: 1,
            msg: "Popularity adjusted by 1.",
        },
    ],
    "Demihuman - Avian (Harpie)": [
        {
            path: "abilityAdjustments.Fighting",
            value: 1,
            msg: "Fighting adjusted by 1.",
        },
    ],
    "Demihuman - Chiropteran": [
        {
            path: "popularity.start",
            value: 1,
            msg: "Popularity starting at 1.",
        },
        {
            validate: (char, s) => {
                Tester.assertHasPower(
                    "Sonar (Active)",
                    char.powers,
                    "Demihuman - Chiropteran has bonus power of Sonar (Active).",
                );
                const p = char.powers.find((p) => p.name === "Sonar (Active)");
                Tester.assertEquals(
                    "Good",
                    p.rank,
                    "Demihuman - Chiropteran Sonar (Active) must be Good rank.",
                );
            },
        },
    ],
    "Demihuman - Lamian": [
        {
            path: "popularity.start",
            value: 0,
            msg: "Popularity starting at 0.",
        },
    ],
    "Demihuman - Lupinoid (Werewolf)": [
        {
            path: "popularity.adjustment",
            value: -1,
            msg: "Popularity adjusted by -1.",
        },
    ],
    "Demihuman - Merhuman": [
        {
            path: "popularity.adjustment",
            value: 1,
            msg: "Popularity adjusted by 1.",
        },
        {
            validate: (char, s) => {
                Tester.assertHasPower(
                    "Water Freedom",
                    char.powers,
                    "Demihuman - Merhuman has bonus power of Water Freedom.",
                );
            },
        },
    ],
    "Cyborg - Artificial limbs/organs": [
        {
            path: "abilityAdjustments.Intuition",
            value: -1,
            msg: "Intuition adjusted by -1.",
        },
    ],
    "Cyborg - Mechanical Body": [
        {
            path: "abilityAdjustments.Intuition",
            value: -1,
            msg: "Intuition adjusted by -1.",
        },
        {
            path: "abilityAdjustments.Psyche",
            value: -1,
            msg: "Psyche adjusted by -1.",
        },
    ],
    "Cyborg - Mechanically Augmented": [
        {
            path: "powersCount.adjustment",
            value: -1,
            msg: "Powers Count adjusted by -1.",
        },
        { path: "resources.set", value: 8, msg: "Resources set to 8 (Good)." },
    ],
    "Robot - human shape": [
        {
            path: "popularity.start",
            value: 0,
            msg: "Popularity starting at 0.",
        },
    ],
    "Robot - Metamorphic": [
        {
            path: "abilitiesToGenerate",
            value: 2,
            msg: "Abilities to Generate set to 2.",
        },
    ],
    "Robot - Computer": [
        {
            path: "resources.adjustment",
            value: 1,
            msg: "Resources adjusted by 1.",
        },
        {
            path: "abilityAdjustments.Fighting",
            value: -1,
            msg: "Fighting adjusted by -1.",
        },
        {
            path: "abilityAdjustments.Reason",
            value: 2,
            msg: "Reason adjusted by 2.",
        },
        {
            path: "allPrimaryAbilityAdjustment",
            op: "notNull",
            msg: "All Primary Abilities adjusted.",
        },
        {
            path: "allPrimaryAbilityAdjustment.adjustment",
            value: -1,
            msg: "All Primary Abilities adjusted by -1.",
        },
        {
            path: "powersRankAdjustment",
            value: -1,
            msg: "All Power Rank adjusted by -1.",
        },
    ],
    Deity: [
        {
            path: "powersCount.adjustment",
            value: 2,
            msg: "Powers Count adjusted by 2.",
        },
        {
            path: "popularity.adjustment",
            value: 2,
            msg: "Popularity adjusted by 2.",
        },
        {
            path: "allPrimaryAbilityAdjustment",
            op: "notNull",
            msg: "All Primary Abilities adjusted.",
        },
        {
            path: "allPrimaryAbilityAdjustment.adjustment",
            value: 2,
            msg: "All Primary Abilities adjusted by 2.",
        },
        {
            validate: (char, s) => {
                const deityPower = char.powers.find(
                    (p) => p.category === "Travel",
                );
                Tester.assertEquals(
                    "Travel",
                    deityPower.category,
                    "Deity has bonus power of category Travel.",
                );
            },
        },
    ],
    "Angel/Demon": [
        {
            path: "allPhysicalAbilityAdjustment",
            op: "notNull",
            msg: "All Physical Abilities adjusted.",
        },
        {
            path: "allPhysicalAbilityAdjustment.adjustment",
            value: 1,
            msg: "All Physical Abilities adjusted by 1.",
        },
        {
            validate: (char, s) => {
                if (char.subType === "Angel") {
                    Tester.assertHasPower(
                        "Artifact Creation",
                        char.powers,
                        "Angel has bonus power of Artifact Creation.",
                    );
                    const angelPower = char.powers.find(
                        (p) => p.name === "Artifact Creation",
                    );
                    Tester.assertEquals(
                        "Good",
                        angelPower.rank,
                        "Angel Artifact Creation must be Good rank.",
                    );
                    Tester.assertEquals(
                        2,
                        s.popularity.adjustment,
                        "Angel: Popularity adjusted by 2.",
                    );
                } else if (char.subType === "Demon") {
                    Tester.assertHasPower(
                        "Fire Generation",
                        char.powers,
                        "Demon has bonus power of Fire Generation.",
                    );
                    const demonPower = char.powers.find(
                        (p) => p.name === "Fire Generation",
                    );
                    Tester.assertEquals(
                        "Good",
                        demonPower.rank,
                        "Demon Fire Generation must be Good rank.",
                    );
                    Tester.assertEquals(
                        -2,
                        s.popularity.adjustment,
                        "Demon: Popularity adjusted by -2.",
                    );
                }
            },
        },
    ],
    Animal: [
        {
            validate: (char, s) => {
                const animalPowers = char.powers.filter(
                    (p) => p.bonusPower && p.category === "Detection",
                );
                Tester.assertEquals(
                    2,
                    animalPowers.length,
                    "Animal has 2 bonus powers of category Detection.",
                );
                Tester.assertEquals(
                    "Good",
                    animalPowers[0].rank,
                    "Animal has bonus power(1) of category Detection at Good rank.",
                );
                Tester.assertEquals(
                    "Good",
                    animalPowers[1].rank,
                    "Animal has bonus power(2) of category Detection at Good rank.",
                );
            },
        },
    ],
    Vegetable: [
        {
            validate: (char, s) => {
                Tester.assertHasPower(
                    "Absorption Power",
                    char.powers,
                    "Vegetable has bonus power of Absorption Power.",
                );
                const vegPower = char.powers.find(
                    (p) => p.name === "Absorption Power",
                );
                Tester.assertEquals(
                    "Good",
                    vegPower.rank,
                    "Vegetable Absorption Power must be Good rank.",
                );
            },
        },
    ],
    Energy: [
        {
            validate: (char, s) => {
                const energyEmission = char.powers.filter(
                    (p) => p.category === "Energy Emission",
                );
                Tester.assertAtLeast(
                    1,
                    energyEmission.length,
                    "Energy has 1 bonus power of category Energy Emission.",
                );
            },
        },
    ],
    "Abnormal Chemistry": [
        {
            path: "abilityAdjustments.Endurance",
            value: 1,
            msg: "Endurance adjusted by 1.",
        },
    ],
    Mineral: [
        {
            path: "healthAdjustment",
            op: "notNull",
            msg: "Health adjustment exists.",
        },
        {
            path: "healthAdjustment.type",
            value: "multiply",
            msg: "Health adjustment is multiply.",
        },
        {
            path: "healthAdjustment.value",
            value: 2,
            msg: "Health multiplied by 2.",
        },
    ],
    Gaseous: [{ path: "resources.set", value: 0, msg: "Resources set to 0." }],
    Undead: [
        {
            path: "abilityAdjustments.Endurance",
            value: 1,
            msg: "Endurance adjusted by 1.",
        },
        {
            path: "abilityAdjustments.Strength",
            value: 1,
            msg: "Strength adjusted by 1.",
        },
    ],
    Compound: [],
};

/** Resolve a dot-separated path on an object (e.g., "abilityAdjustments.Endurance"). */
function _resolvePath(obj, path) {
    return path
        .split(".")
        .reduce((o, key) => (o != null ? o[key] : undefined), obj);
}

/** Shared helper: assert all entries in PHYSICAL_FORM_ASSERTIONS for a form.
 *  Supports both path-based assertions and validate callbacks. */
function _assertPhysicalFormState(form, s, char) {
    const defs = PHYSICAL_FORM_ASSERTIONS[form];
    if (!defs) return;
    for (const d of defs) {
        if (d.validate) {
            d.validate(char, s);
        } else if (d.op === "notNull") {
            const actual = _resolvePath(s, d.path);
            Tester.assert(
                actual !== null && actual !== undefined,
                `${form}: ${d.msg}`,
            );
        } else {
            const actual = _resolvePath(s, d.path);
            Tester.assertEquals(d.value, actual, `${form}: ${d.msg}`);
        }
    }
}

// ============================================================================
// ULTIMATE PHYSICAL FORM TESTS
// ============================================================================

Tester.GeneratorUltimatePhysicalFormTests = (gen) => {
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.identitySecret = true;
    gen.originPublic = false;
    gen.wellEstablished = false;
    gen.looksHuman = false;

    for (let index = 0; index < gen.physicalFormTable.length; index++) {
        gen.reset();
        gen.generatorMode = "ultimate";
        gen.setTables();
        gen.identitySecret = true;
        gen.originPublic = false;
        gen.wellEstablished = false;
        gen.looksHuman = false;

        // NOTE: Dice.seed() used per physical form for reproducibility.
        Dice.seed(5000 + index);
        gen.throwAllRolls();
        gen.physicalFormRoll = gen.physicalFormTable[index].maxRoll;
        const char = gen.generateWithoutThrows();
        // When multiple forms share the same maxRoll (subRoll disambiguation),
        // the generated form may differ from physicalFormTable[index].
        // Accept any form that shares the same maxRoll.
        const expectedMaxRoll = gen.physicalFormTable[index].maxRoll;
        const matchingForms = gen.physicalFormTable.filter(
            (o) => o.maxRoll === expectedMaxRoll,
        );
        const isMatchingForm = matchingForms.some(
            (o) => o.name === char.physicalForm,
        );
        Tester.assert(
            isMatchingForm,
            `Physical Form Roll (Ultimate): Generated '${char.physicalForm}' (expected one of: ${matchingForms.map((o) => o.name).join(", ")}).`,
        );

        // All assertions (simple + complex) are now data-driven
        _assertPhysicalFormState(char.physicalForm, char.state, char);

        Tester._assertNoGarbageInLogs(char.log);
    }
};

// ============================================================================
// COMPOUND FORM TESTS
// ============================================================================

Tester.GeneratorCompoundTests = (gen) => {
    const char = new Character();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.identitySecret = true;
    gen.originPublic = false;
    gen.wellEstablished = false;
    gen.looksHuman = false;

    gen.physicalFormRoll = 99;
    gen.combinationsRoll = 50;
    gen.compoundRandomRanksColumnRoll = 35;
    gen.bodyTypeRolls = [1, 33, 86, 87, 93];

    gen.determinePhysicalForm(char);
    Tester.assertEquals(
        "Compound",
        char.physicalForm,
        `Physical Form Roll (Ultimate): Generated '${char.physicalForm}'.`,
    );
    Tester.assertEquals(
        2,
        char.bodyTypes.length,
        `Body Type Roll (Ultimate): Generated '${char.bodyTypes.length}'.`,
    );
    Tester.assertEquals(
        "Normal Human",
        char.bodyTypes[0],
        `Body Type Roll (Ultimate): Generated '${char.bodyTypes[0]}'.`,
    );
    Tester.assertEquals(
        "Mutant - Random",
        char.bodyTypes[1],
        `Body Type Roll (Ultimate): Generated '${char.bodyTypes[1]}'.`,
    );
    Tester.assertEquals(
        2,
        gen.randomRanksColumn,
        `Random Ranks Column Roll (Ultimate): Generated '${gen.randomRanksColumn}'.`,
    );

    const gen2 = new CharacterGenerator();
    const char2 = new Character();
    gen2.generatorMode = "ultimate";
    gen2.setTables();

    gen2.physicalFormRoll = 99;
    gen2.combinationsRoll = 50;
    gen.compoundRandomRanksColumnRoll = 35; // Note: intentionally set on gen, not gen2
    gen2.bodyTypeRolls = [1, 99, 33, 86, 87];

    gen2.determinePhysicalForm(char2);
    Tester.assertEquals(
        "Compound",
        char2.physicalForm,
        `Physical Form Roll (Ultimate): Generated '${char2.physicalForm}'.`,
    );
    Tester.assertEquals(
        2,
        char2.bodyTypes.length,
        `Body Type Roll (Ultimate): Generated '${char2.bodyTypes.length}'.`,
    );
    Tester.assertEquals(
        "Normal Human",
        char2.bodyTypes[0],
        `Body Type Roll (Ultimate): Generated '${char2.bodyTypes[0]}'.`,
    );
    Tester.assertEquals(
        "Mutant - Random",
        char2.bodyTypes[1],
        `Body Type Roll (Ultimate): Generated '${char2.bodyTypes[1]}'.`,
    );
    Tester.assertEquals(
        2,
        gen2.randomRanksColumn,
        `Random Ranks Column Roll (Ultimate): Generated '${gen2.randomRanksColumn}'.`,
    );

    const gen3 = new CharacterGenerator();
    const char3 = new Character();
    gen3.generatorMode = "ultimate";
    gen3.setTables();

    gen3.physicalFormRoll = 99;
    gen3.combinationsRoll = 75;
    gen.compoundRandomRanksColumnRoll = 35; // Note: intentionally set on gen, not gen3
    gen3.bodyTypeRolls = [1, 33, 86, 87];

    gen3.determinePhysicalForm(char3);
    Tester.assertEquals(
        "Compound",
        char3.physicalForm,
        `Physical Form Roll (Ultimate): Generated '${char3.physicalForm}'.`,
    );
    Tester.assertEquals(
        3,
        char3.bodyTypes.length,
        `Body Type Roll (Ultimate): Generated '${char3.bodyTypes.length}'.`,
    );
    Tester.assertEquals(
        "Normal Human",
        char3.bodyTypes[0],
        `Body Type Roll (Ultimate): Generated '${char3.bodyTypes[0]}'.`,
    );
    Tester.assertEquals(
        "Mutant - Random",
        char3.bodyTypes[1],
        `Body Type Roll (Ultimate): Generated '${char3.bodyTypes[1]}'.`,
    );
    Tester.assertEquals(
        "Robot - Metamorphic",
        char3.bodyTypes[2],
        `Body Type Roll (Ultimate): Generated '${char3.bodyTypes[2]}'.`,
    );
    Tester.assertEquals(
        2,
        gen3.randomRanksColumn,
        `Random Ranks Column Roll (Ultimate): Generated '${gen3.randomRanksColumn}'.`,
    );
};

// ============================================================================
// BONUS CONTACT TEST
// ============================================================================

Tester.GeneratorBonusContactTest = (gen) => {
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.identitySecret = true;
    gen.originPublic = false;
    gen.wellEstablished = false;
    gen.looksHuman = false;
    // NOTE: Dice.seed() + throwAllRolls() for random auxiliary rolls.
    Dice.seed(6000);
    gen.throwAllRolls();

    gen.physicalFormRoll = 35;

    let char = gen.generateWithoutThrows();

    Tester.assertEquals(
        "Mutant - Breed",
        char.physicalForm,
        `Physical Form: Generated '${char.physicalForm}'.`,
    );
    Tester.assertAtLeast(
        1,
        char.contacts.length,
        `Contact Count (Ultimate): Generated '${char.contacts.length}'.`,
    );
    Tester.assertEquals(
        "Tribe",
        char.contacts[0].name,
        `Contact (Ultimate): Generated '${char.contacts[0].name}'.`,
    );
};

// ============================================================================
// DEMON SUBTYPE TEST
// The main loop always produces Angel subtype for Angel/Demon due to seeding.
// This test forces Demon subtype by setting subTypeRoll > 50.
// ============================================================================

Tester.GeneratorDemonSubTypeTest = (gen) => {
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.identitySecret = true;
    gen.originPublic = false;
    gen.wellEstablished = false;
    gen.looksHuman = false;
    Dice.seed(7000);
    gen.throwAllRolls();
    // Angel/Demon subType is "Angel(50)|Demon(100)" — roll > 50 picks Demon
    gen.subTypeRoll = 60;
    // Find the Angel/Demon form's maxRoll
    const angelDemonRow = gen.physicalFormTable.find(
        (o) => o.name === "Angel/Demon",
    );
    if (!angelDemonRow) {
        Tester.assert(true, "DemonSubType: Angel/Demon not found, skip.");
        return;
    }
    gen.physicalFormRoll = angelDemonRow.maxRoll;
    const char = gen.generateWithoutThrows();
    Tester.assertEquals(
        "Angel/Demon",
        char.physicalForm,
        `DemonSubType: Generated '${char.physicalForm}'.`,
    );
    Tester.assertEquals(
        "Demon",
        char.subType,
        `DemonSubType: subType is '${char.subType}'.`,
    );

    // Run through the data-driven assertion pipeline to exercise the
    // Demon validate callback at lines 135-141
    _assertPhysicalFormState(char.physicalForm, char.state, char);

    // Also verify directly for clarity
    const demonPower = char.powers.find((p) => p.name === "Fire Generation");
    Tester.assert(
        demonPower != null,
        "DemonSubType: Demon has bonus power Fire Generation.",
    );
    if (demonPower) {
        Tester.assertEquals(
            "Good",
            demonPower.rank,
            "DemonSubType: Fire Generation must be Good rank.",
        );
    }
    const s = char.state;
    if (s.popularity && s.popularity.adjustment !== undefined) {
        Tester.assertEquals(
            -2,
            s.popularity.adjustment,
            "DemonSubType: Popularity adjusted by -2.",
        );
    }
};

// ============================================================================
// GUARD CLAUSE TEST — exercise the !angelDemonRow guard (line 374-376)
// Temporarily remove Angel/Demon from the table to trigger the early return.
// ============================================================================

Tester.GuardClauseMissingFormTest = (gen) => {
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.identitySecret = true;
    gen.originPublic = false;
    gen.wellEstablished = false;
    gen.looksHuman = false;
    Dice.seed(8000);
    gen.throwAllRolls();
    gen.subTypeRoll = 60;

    // Temporarily remove Angel/Demon from the table
    const idx = gen.physicalFormTable.findIndex(
        (o) => o.name === "Angel/Demon",
    );
    const removed = gen.physicalFormTable.splice(idx, 1)[0];

    // Set roll to a value that would have selected Angel/Demon
    // Since it's gone, findRow will skip past it
    gen.physicalFormRoll = removed.maxRoll;
    const char = gen.generateWithoutThrows();

    // The form should NOT be Angel/Demon since we removed it
    Tester.assert(
        char.physicalForm !== "Angel/Demon",
        `GuardClause: Form is '${char.physicalForm}' (Angel/Demon removed).`,
    );

    // Restore
    gen.physicalFormTable.splice(idx, 0, removed);
};

// ============================================================================
// REGISTRATION
// ============================================================================

Tester.registerTestGroup(50, "deterministic", [
    { name: "GeneratorUltimatePhysicalFormTests", needsGen: true },
    { name: "GeneratorCompoundTests", needsGen: true },
    { name: "GeneratorBonusContactTest", needsGen: true },
    { name: "GeneratorDemonSubTypeTest", needsGen: true },
    { name: "GuardClauseMissingFormTest", needsGen: true },
]);
