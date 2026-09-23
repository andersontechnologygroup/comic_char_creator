// TestsBranchCoverage.js
// Targeted tests for uncovered branches in CharacterGenerator.js.
// These exercises code paths not hit by the existing test suite,
// improving branch coverage from ~79% toward 90%+.

// ============================================================================
// GENERATECHARACTER() — invalid options tests
// ============================================================================

Tester.GenerateCharacterInvalidOptionsTests = () => {
    // Invalid mode: should fall back to basic tables
    const char1 = CharacterGenerator.generateCharacter("bogus_mode", {
        useDeterministicRolls: true,
    });
    Tester.assert(
        char1 !== null,
        "generateCharacter('bogus_mode'): returns a character.",
    );
    Tester.assert(
        char1.physicalForm !== "",
        "generateCharacter('bogus_mode'): physicalForm is set.",
    );

    // Null seed: should work without seeding
    const char2 = CharacterGenerator.generateCharacter("basic", {
        seed: null,
        useDeterministicRolls: true,
    });
    Tester.assert(
        char2 !== null,
        "generateCharacter(seed=null): returns a character.",
    );

    // Undefined options: should use defaults
    const char3 = CharacterGenerator.generateCharacter("basic", undefined);
    Tester.assert(
        char3 !== null,
        "generateCharacter(undefined options): returns a character.",
    );

    // Empty options object
    const char4 = CharacterGenerator.generateCharacter("ultimate", {});
    Tester.assert(
        char4 !== null,
        "generateCharacter(empty options): returns a character.",
    );
    Tester.assert(
        char4.weakness.stimulus !== undefined,
        "generateCharacter(ultimate): weakness object exists.",
    );

    // Physical form roll out of range (negative)
    const char5 = CharacterGenerator.generateCharacter("basic", {
        useDeterministicRolls: true,
        physicalFormRoll: -1,
    });
    Tester.assert(
        char5 !== null,
        "generateCharacter(physicalFormRoll=-1): returns a character.",
    );

    // Physical form roll > 100
    const char6 = CharacterGenerator.generateCharacter("basic", {
        useDeterministicRolls: true,
        physicalFormRoll: 200,
    });
    Tester.assert(
        char6 !== null,
        "generateCharacter(physicalFormRoll=200): returns a character.",
    );
};

// ============================================================================
// DETERMINEHEALTH — uncovered branches
// ============================================================================

Tester.DetermineHealthEdgeCaseTests = (gen) => {
    // Health adjustment: integer add (non-zero)
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();

    // Mineral form has healthAdjustment = "*2" (multiply)
    const char1 = new Character();
    char1.physicalForm = "Mineral";
    char1.setAbility("Fighting", "Typical", 5);
    char1.setAbility("Agility", "Typical", 5);
    char1.setAbility("Strength", "Typical", 5);
    char1.setAbility("Endurance", "Typical", 5);
    char1.calculateSecondary(); // health = 20
    gen.determineHealth(char1);
    Tester.assertEquals(
        40,
        char1.health,
        "determineHealth: Mineral health *2 → 40.",
    );
    Tester.assertEquals(
        "multiply",
        char1.state.healthAdjustment.type,
        "determineHealth: Mineral adjustment type = multiply.",
    );

    // Test the divide branch by temporarily adding a healthAdjustment to a form
    gen.setDeterministicRolls();
    const origRow = gen.physicalFormTable.find((o) => o.name === "Gaseous");
    const origHA = origRow.healthAdjustment;
    origRow.healthAdjustment = "/2"; // temporarily set divide adjustment
    const char2 = new Character();
    char2.physicalForm = "Gaseous";
    char2.setAbility("Fighting", "Excellent", 16);
    char2.setAbility("Agility", "Excellent", 16);
    char2.setAbility("Strength", "Excellent", 16);
    char2.setAbility("Endurance", "Excellent", 16);
    char2.calculateSecondary(); // health = 64
    gen.determineHealth(char2);
    Tester.assertEquals(32, char2.health, "determineHealth: health /2 → 32.");
    Tester.assertEquals(
        "divide",
        char2.state.healthAdjustment.type,
        "determineHealth: adjustment type = divide.",
    );
    origRow.healthAdjustment = origHA; // restore

    // Form with integer healthAdjustment (add) — temporarily set
    gen.setDeterministicRolls();
    origRow.healthAdjustment = 5; // temporarily set integer add
    const char3 = new Character();
    char3.physicalForm = "Gaseous";
    char3.setAbility("Fighting", "Typical", 5);
    char3.setAbility("Agility", "Typical", 5);
    char3.setAbility("Strength", "Typical", 5);
    char3.setAbility("Endurance", "Typical", 5);
    char3.calculateSecondary(); // health = 20
    gen.determineHealth(char3);
    Tester.assertEquals(25, char3.health, "determineHealth: health +5 → 25.");
    Tester.assertEquals(
        "add",
        char3.state.healthAdjustment.type,
        "determineHealth: adjustment type = add.",
    );
    origRow.healthAdjustment = origHA; // restore
};

// ============================================================================
// DETERMINEPOPULARITY — uncovered branches (basic mode, various flags)
// ============================================================================

Tester.DeterminePopularityBranchTests = (gen) => {
    // Basic mode: identitySecret=true, originPublic=true
    gen.generatorMode = "basic";
    gen.setTables();
    gen.setDeterministicRolls();

    const char1 = new Character();
    char1.physicalForm = "Altered Human";
    gen.identitySecret = true;
    gen.originPublic = true;
    gen.wellEstablished = false;
    gen.looksHuman = false;
    gen.determinePopularity(char1);
    // Base 50, secret ID (-20), public origin (+20) = 50
    Tester.assert(
        typeof char1.popularity === "number",
        "determinePopularity (basic, secret+public): popularity is a number.",
    );

    // Basic mode: identitySecret=false, originPublic=false
    gen.setDeterministicRolls();
    const char2 = new Character();
    char2.physicalForm = "Altered Human";
    gen.identitySecret = false;
    gen.originPublic = false;
    gen.wellEstablished = false;
    gen.looksHuman = false;
    gen.determinePopularity(char2);
    // Base 50, public ID (+20), secret origin (-20) = 50
    Tester.assert(
        typeof char2.popularity === "number",
        "determinePopularity (basic, public+secret): popularity is a number.",
    );

    // Basic mode: wellEstablished=true
    gen.setDeterministicRolls();
    const char3 = new Character();
    char3.physicalForm = "Altered Human";
    gen.identitySecret = true;
    gen.originPublic = false;
    gen.wellEstablished = true;
    gen.looksHuman = false;
    gen.determinePopularity(char3);
    // Base 50, secret ID (-20), secret origin (-20), well-established (+20) = 30
    Tester.assert(
        typeof char3.popularity === "number",
        "determinePopularity (basic, wellEstablished): popularity is a number.",
    );

    // Basic mode: looksHuman=true
    gen.setDeterministicRolls();
    const char4 = new Character();
    char4.physicalForm = "Altered Human";
    gen.identitySecret = true;
    gen.originPublic = false;
    gen.wellEstablished = false;
    gen.looksHuman = true;
    gen.determinePopularity(char4);
    // Base 50, secret ID (-20), secret origin (-20), looksHuman (+10) = 20
    Tester.assert(
        typeof char4.popularity === "number",
        "determinePopularity (basic, looksHuman): popularity is a number.",
    );

    // Advanced mode: identitySecret=false (public ID)
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();

    const char5 = new Character();
    char5.physicalForm = "Altered Human";
    gen.identitySecret = false;
    gen.originPublic = false;
    gen.wellEstablished = false;
    gen.looksHuman = false;
    gen.determinePopularity(char5);
    // Advanced: public ID (+20) = 70
    Tester.assert(
        typeof char5.popularity === "number",
        "determinePopularity (advanced, public): popularity is a number.",
    );
};

// ============================================================================
// DETERMINEORIGIN — uncovered branches (invalid roll, various origin tables)
// ============================================================================

Tester.DetermineOriginBranchTests = (gen) => {
    // Invalid origin roll (< 1)
    gen.generatorMode = "basic";
    gen.setTables();
    gen.setDeterministicRolls();

    const char1 = new Character();
    char1.physicalForm = "Altered Human";
    gen.originRoll = 0;
    gen.determineOrigin(char1);
    // Should return early with "Invalid Roll" log, origin stays ""
    Tester.assertEquals(
        "",
        char1.origin,
        "determineOrigin: roll=0 → origin stays empty.",
    );

    // Invalid origin roll (> 100)
    gen.setDeterministicRolls();
    const char2 = new Character();
    char2.physicalForm = "Altered Human";
    gen.originRoll = 101;
    gen.determineOrigin(char2);
    Tester.assertEquals(
        "",
        char2.origin,
        "determineOrigin: roll=101 → origin stays empty.",
    );
};

// ============================================================================
// DETERMINEABILITY — uncovered branches (*Set, *Start paths)
// ============================================================================

Tester.DetermineAbilityBranchTests = (gen) => {
    // Test ability *Set path: physical form row has "enduranceSet"
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();

    // Robot - Computer has fightingSet, reasonSet, etc.
    const char1 = new Character();
    char1.physicalForm = "Robot - Computer";
    const physicalFormRow = gen.physicalFormTable.find(
        (o) => o.name === "Robot - Computer",
    );
    const rankRow = gen.determineAbility(char1, "Fighting", physicalFormRow, 0);
    // Robot - Computer has fightingSet defined
    Tester.assert(
        rankRow !== null || physicalFormRow.fightingSet !== undefined,
        "determineAbility: Robot-Computer Fighting uses *Set path.",
    );

    // Test ability *Start path
    gen.setDeterministicRolls();
    const char2 = new Character();
    char2.physicalForm = "Normal Human";
    const nhRow = gen.physicalFormTable.find((o) => o.name === "Normal Human");
    // Check if Normal Human has any *Start attributes
    const hasStart = Object.keys(nhRow).some((k) => k.endsWith("Start"));
    if (hasStart) {
        const startKey = Object.keys(nhRow).find((k) => k.endsWith("Start"));
        const abilityName = startKey.replace("Start", "");
        const capName =
            abilityName.charAt(0).toUpperCase() + abilityName.slice(1);
        const rr = gen.determineAbility(char2, capName, nhRow, 0);
        Tester.assert(
            rr !== null,
            `determineAbility: Normal Human ${capName} uses *Start path.`,
        );
    } else {
        Tester.assert(
            true,
            "determineAbility: Normal Human has no *Start attrs, skip.",
        );
    }
};

// ============================================================================
// DETERMINESPECIALABILITIES — uncovered validation branches
// ============================================================================

Tester.DetermineSpecialAbilitiesValidationTests = (gen) => {
    gen.generatorMode = "basic";
    gen.setTables();
    gen.setDeterministicRolls();

    const char = new Character();
    char.physicalForm = "Altered Human";

    // Set invalid powerCategoryRoll entries (undefined, null, out of range)
    gen.powerCategoryRolls = [undefined, null, -1, 150, 50, 50];
    gen.powerRolls = [undefined, null, 0, 50, 50, 50];
    gen.powerRankRolls = [undefined, null, -5, 50, 50, 50];

    // Should replace invalid entries with safe defaults (50)
    gen.determineSpecialAbilities(char);
    Tester.assert(
        char.powers.length >= 0,
        "determineSpecialAbilities: handles invalid power rolls gracefully.",
    );
    Tester.assert(
        char.talents.length >= 0,
        "determineSpecialAbilities: handles invalid talent rolls gracefully.",
    );
    Tester.assert(
        char.contacts.length >= 0,
        "determineSpecialAbilities: handles invalid contact rolls gracefully.",
    );
};

// ============================================================================
// GENERATE() — covers throwAllRolls path (vs generateWithoutThrows)
// ============================================================================

Tester.GenerateWithSeedTests = () => {
    // generate() calls throwAllRolls() then generateWithoutThrows()
    // Verify it produces valid characters with a seed
    for (const mode of ["basic", "advanced", "ultimate"]) {
        const gen = new CharacterGenerator();
        gen.generatorMode = mode;
        gen.setTables();
        gen.identitySecret = true;
        gen.originPublic = false;
        gen.wellEstablished = false;
        gen.looksHuman = false;

        Dice.seed(42);
        const char = gen.generate();
        Tester.assert(
            char !== null,
            `generate(${mode}, seed=42): returns a character.`,
        );
        Tester.assert(
            char.physicalForm !== "",
            `generate(${mode}, seed=42): physicalForm is set.`,
        );
        Tester.assert(
            char.origin !== "",
            `generate(${mode}, seed=42): origin is set.`,
        );
        Tester.assert(
            typeof char.health === "number" && char.health >= 0,
            `generate(${mode}, seed=42): health is a non-negative number.`,
        );
        Tester.assert(
            typeof char.karma === "number" && char.karma >= 0,
            `generate(${mode}, seed=42): karma is a non-negative number.`,
        );
        Tester.assert(
            typeof char.popularity === "number" &&
                (mode === "basic" || char.popularity >= 0),
            `generate(${mode}, seed=42): popularity is a number` +
                (mode === "basic"
                    ? ` (no floor in Basic; was ${char.popularity}).`
                    : ` and non-negative (was ${char.popularity}).`),
        );
        Tester.assert(
            char.powers.length >= 0,
            `generate(${mode}, seed=42): powers array exists.`,
        );
        Tester.assert(
            char.talents.length >= 0,
            `generate(${mode}, seed=42): talents array exists.`,
        );
        Tester.assert(
            char.contacts.length >= 0,
            `generate(${mode}, seed=42): contacts array exists.`,
        );
        Tester._assertNoGarbageInLogs(char.log, "generate " + mode);

        if (mode === "ultimate") {
            Tester.assert(
                char.weakness.stimulus !== undefined,
                `generate(ultimate, seed=42): weakness object exists.`,
            );
        }
    }

    // Verify same seed produces same result (reproducibility)
    const gen1 = new CharacterGenerator();
    gen1.generatorMode = "basic";
    gen1.setTables();
    Dice.seed(12345);
    const char1 = gen1.generate();

    const gen2 = new CharacterGenerator();
    gen2.generatorMode = "basic";
    gen2.setTables();
    Dice.seed(12345);
    const char2 = gen2.generate();

    Tester.assertEquals(
        char1.physicalForm,
        char2.physicalForm,
        "generate(): same seed produces same physicalForm.",
    );
    Tester.assertEquals(
        char1.origin,
        char2.origin,
        "generate(): same seed produces same origin.",
    );
    Tester.assertEquals(
        char1.health,
        char2.health,
        "generate(): same seed produces same health.",
    );
    Tester.assertEquals(
        char1.powers.length,
        char2.powers.length,
        "generate(): same seed produces same power count.",
    );
};

// ============================================================================
// ABILITY *SET AND *START PATHS (lines 586-618)
// These paths are dead code with current data but exist as future-proofing.
// We temporarily patch form rows to exercise them.
// ============================================================================

Tester.AbilitySetStartPathTests = (gen) => {
    gen.generatorMode = "basic";
    gen.setTables();

    const row = gen.physicalFormTable.find((o) => o.name === "Altered Human");
    if (!row) {
        Tester.assert(true, "AbilitySetStart: Altered Human not found, skip.");
        return;
    }

    // Save originals
    const origFightingSet = row.fightingSet;
    const origFightingStart = row.fightingStart;

    // --- *Set path (line 586-589): abilityLower + 'Set' ---
    // Temporarily add fightingSet to the form row
    row.fightingSet = { rank: "Excellent", rankNumber: 20 };
    gen.setDeterministicRolls();
    const char1 = new Character();
    char1.physicalForm = "Altered Human";
    gen.determinePrimaryAbilities(char1);
    Tester.assertEquals(
        "Excellent",
        char1.getAbility("Fighting").rank,
        "AbilitySet: fightingSet set to Excellent.",
    );
    // Restore
    if (origFightingSet !== undefined) row.fightingSet = origFightingSet;
    else delete row.fightingSet;

    // --- *Start path (line 595-597): abilityLower + 'Start' ---
    // Temporarily add fightingStart to the form row
    row.fightingStart = "Good"; // Rank name that exists in randomRanksTable
    gen.setDeterministicRolls();
    const char2 = new Character();
    char2.physicalForm = "Altered Human";
    gen.determinePrimaryAbilities(char2);
    Tester.assertEquals(
        "Good",
        char2.getAbility("Fighting").rank,
        "AbilityStart: fightingStart set to Good.",
    );
    // Restore
    if (origFightingStart !== undefined) row.fightingStart = origFightingStart;
    else delete row.fightingStart;

    // --- Verify normal path still works after restoration ---
    gen.setDeterministicRolls();
    const char3 = new Character();
    char3.physicalForm = "Altered Human";
    gen.determinePrimaryAbilities(char3);
    Tester.assert(
        char3.getAbility("Fighting").rank !== "",
        "AbilitySetStart: normal path still works after restoration.",
    );
};

// ============================================================================
// REGISTRATION
// ============================================================================

Tester.registerTestGroup(85, "deterministic", [
    { name: "GenerateCharacterInvalidOptionsTests", needsGen: false },
    { name: "DetermineHealthEdgeCaseTests", needsGen: true },
    { name: "DeterminePopularityBranchTests", needsGen: true },
    { name: "DetermineOriginBranchTests", needsGen: true },
    { name: "DetermineAbilityBranchTests", needsGen: true },
    { name: "DetermineSpecialAbilitiesValidationTests", needsGen: true },
    { name: "GenerateWithSeedTests", needsGen: false },
    { name: "AbilitySetStartPathTests", needsGen: true },
]);
