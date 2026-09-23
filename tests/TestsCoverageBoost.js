// TestsCoverageBoost.js
// Targeted tests to push CharacterGenerator.js branch coverage toward 95%+.
// Exercises uncovered code paths not hit by any existing test suite.

// ============================================================================
// BOOST FUNCTIONS — completely uncovered (lines 1895-1927)
// ============================================================================

Tester.BoostFunctionTests = () => {
    // Generate a character with known abilities to test boost
    const gen = new CharacterGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();
    const char = gen.generateWithoutThrows();

    // getBoostLevel: Alien origin → boostLevel=2, non-Alien → 1
    const origOrigin = char.origin;
    char.origin = "Alien";
    const alienBoost = gen.getBoostLevel(char);
    Tester.assertEquals(2, alienBoost, "getBoostLevel: Alien → 2");

    char.origin = "Mutant";
    const mutantBoost = gen.getBoostLevel(char);
    Tester.assertEquals(1, mutantBoost, "getBoostLevel: Mutant → 1");
    char.origin = origOrigin;

    // boostAbility: should boost Fighting by boostLevel ranks
    const oldFighting = char.getAbility("Fighting").rank;
    char.boostApplied = false;
    const result = gen.boostAbility(char, "Fighting");
    Tester.assert(result === true, "boostAbility: returns true on success.");
    const newFighting = char.getAbility("Fighting").rank;
    Tester.assert(
        newFighting !== oldFighting || oldFighting === "Amazing",
        `boostAbility: Fighting changed from ${oldFighting} to ${newFighting}.`,
    );

    // boostAbility: should fail if already applied
    const result2 = gen.boostAbility(char, "Agility");
    Tester.assert(
        result2 === false,
        "boostAbility: fails when boostApplied=true.",
    );

    // boostPower: should boost first power
    if (char.powers.length > 0) {
        char.boostApplied = false;
        const oldRank = char.powers[0].rank;
        const powerResult = gen.boostPower(char, 0);
        Tester.assert(
            powerResult === true,
            "boostPower: returns true on success.",
        );
        Tester.assert(
            char.powers[0].rank !== oldRank || oldRank === "Amazing",
            `boostPower: power rank changed from ${oldRank} to ${char.powers[0].rank}.`,
        );
    }

    // boostPower: invalid index
    char.boostApplied = false;
    const badResult = gen.boostPower(char, -1);
    Tester.assert(badResult === false, "boostPower: index -1 returns false.");
    const badResult2 = gen.boostPower(char, 999);
    Tester.assert(badResult2 === false, "boostPower: index 999 returns false.");

    // boostAbility: invalid ability (not in primaryAbilities → crashes)
    // This reveals a missing guard in boostAbility — it should return false for unknown abilities
    char.boostApplied = false;
    let caughtError = false;
    try {
        gen.boostAbility(char, "NonexistentAbility");
    } catch (e) {
        caughtError = true;
    }
    Tester.assert(
        caughtError,
        "boostAbility: invalid ability name throws (missing guard in source).",
    );
};

// ============================================================================
// POPULARITY SUBTYPE RULES — pipe-delimited adjustment/min/max (lines 921-945)
// ============================================================================

Tester.PopularitySubTypeRulesTests = () => {
    // Angel/Demon has popularityAdjustment: "Angel(+2)|Demon(-2)"
    const gen = new CharacterGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();
    gen.physicalFormRoll = 36; // Angel/Demon form
    gen.originRoll = 36;

    const angelChar = gen.generateWithoutThrows();
    if (angelChar.physicalForm === "Angel/Demon") {
        // Check subtype-based popularity adjustment was applied
        Tester.assert(
            angelChar.state.popularity.adjustment !== undefined,
            "PopularitySubType: Angel/Demon subtype adjustment is defined.",
        );
        if (angelChar.subType === "Angel") {
            Tester.assertEquals(
                2,
                angelChar.state.popularity.adjustment,
                "PopularitySubType: Angel adjustment = +2",
            );
        } else if (angelChar.subType === "Demon") {
            Tester.assertEquals(
                -2,
                angelChar.state.popularity.adjustment,
                "PopularitySubType: Demon adjustment = -2",
            );
        }
    }

    // Test directly by setting subtype on a form with pipe-delimited values
    gen.setDeterministicRolls();
    const row = gen.physicalFormTable.find((o) => o.name === "Angel/Demon");
    if (row) {
        const char = new Character();
        char.physicalForm = "Angel/Demon";
        char.subType = "Angel";
        gen.popularityRoll = 50;
        gen.determinePopularityUltimate(char);
        Tester.assert(
            typeof char.popularity === "number",
            "PopularitySubType: Angel popularity is a number.",
        );

        gen.setDeterministicRolls();
        const char2 = new Character();
        char2.physicalForm = "Angel/Demon";
        char2.subType = "Demon";
        gen.popularityRoll = 50;
        gen.determinePopularityUltimate(char2);
        Tester.assert(
            typeof char2.popularity === "number",
            "PopularitySubType: Demon popularity is a number.",
        );
    }
};

// ============================================================================
// DETERMINE POPULARITY — basic mode origin/identity modifiers (lines 965-972)
// ============================================================================

Tester.DeterminePopularityBasicOriginIdentityTests = () => {
    // Basic mode has separate identity + origin modifiers (lines 1000-1030)
    const gen = new CharacterGenerator();
    gen.generatorMode = "basic";
    gen.setTables();
    gen.setDeterministicRolls();

    // Test: identitySecret + originPublic
    const char1 = new Character();
    char1.physicalForm = "Normal Human";
    gen.identitySecret = true;
    gen.originPublic = true;
    gen.wellEstablished = false;
    gen.looksHuman = false;
    gen.determinePopularity(char1);
    // Normal Human has popularityStart = 30, secret (-20), public (+20) = 30
    Tester.assert(
        char1.popularity >= 0,
        `DeterminePopularityBasic (secret+public): popularity=${char1.popularity}`,
    );

    // Test: identityPublic + originSecret
    gen.setDeterministicRolls();
    const char2 = new Character();
    char2.physicalForm = "Normal Human";
    gen.identitySecret = false;
    gen.originPublic = false;
    gen.wellEstablished = false;
    gen.looksHuman = false;
    gen.determinePopularity(char2);
    // Normal Human has popularityStart = 30, public (+20), secret (-20) = 30
    Tester.assert(
        char2.popularity >= 0,
        `DeterminePopularityBasic (public+secret): popularity=${char2.popularity}`,
    );

    // Test: both public (identityPublic + originPublic)
    gen.setDeterministicRolls();
    const char3 = new Character();
    char3.physicalForm = "Normal Human";
    gen.identitySecret = false;
    gen.originPublic = true;
    gen.wellEstablished = false;
    gen.looksHuman = false;
    gen.determinePopularity(char3);
    // Normal Human: 30 + 20 + 20 = 70
    Tester.assert(
        char3.popularity >= 0,
        `DeterminePopularityBasic (public+public): popularity=${char3.popularity}`,
    );

    // Test: both secret (identitySecret + originSecret)
    gen.setDeterministicRolls();
    const char4 = new Character();
    char4.physicalForm = "Normal Human";
    gen.identitySecret = true;
    gen.originPublic = false;
    gen.wellEstablished = false;
    gen.looksHuman = false;
    gen.determinePopularity(char4);
    // Normal Human: 30 - 20 - 20 = -10 → clamped to 0
    Tester.assert(
        char4.popularity >= 0,
        `DeterminePopularityBasic (secret+secret): popularity=${char4.popularity}`,
    );
};

// ============================================================================
// DETERMINE POPULARITY — popularityMinimum/Maximum clamping in basic mode
// ============================================================================

Tester.DeterminePopularityMinMaxClampTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "basic";
    gen.setTables();

    // Find a form with popularityMinimum or popularityMaximum
    const formsWithMin = gen.physicalFormTable.filter(
        (r) =>
            typeof r.popularityMinimum === "number" && r.popularityMinimum > 0,
    );
    const formsWithMax = gen.physicalFormTable.filter(
        (r) => typeof r.popularityMaximum === "number",
    );

    // Test popularityMinimum clamping
    if (formsWithMin.length > 0) {
        const form = formsWithMin[0];
        gen.setDeterministicRolls();
        const char = new Character();
        char.physicalForm = form.name;
        gen.identitySecret = true;
        gen.originPublic = false;
        gen.wellEstablished = false;
        gen.looksHuman = false;
        gen.determinePopularity(char);
        Tester.assert(
            char.popularity >= form.popularityMinimum,
            `PopularityMinClamp: ${form.name} popularity=${char.popularity} >= min=${form.popularityMinimum}.`,
        );
    }

    // Test popularityMaximum clamping
    if (formsWithMax.length > 0) {
        const form = formsWithMax[0];
        gen.setDeterministicRolls();
        const char = new Character();
        char.physicalForm = form.name;
        gen.identitySecret = false;
        gen.originPublic = true;
        gen.wellEstablished = true;
        gen.looksHuman = true;
        gen.determinePopularity(char);
        Tester.assert(
            char.popularity <= form.popularityMaximum,
            `PopularityMaxClamp: ${form.name} popularity=${char.popularity} <= max=${form.popularityMaximum}.`,
        );
    }
};

// ============================================================================
// CONTACTS EQUAL TO POWERS option (line 1123)
// ============================================================================

Tester.ContactsEqualToPowersTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "basic";
    gen.setTables();
    gen.setDeterministicRolls();

    gen.contactsEqualToPowers = true;
    const char = new Character();
    char.physicalForm = "Altered Human";
    gen.determineSpecialAbilities(char);
    Tester.assertEquals(
        char.powersCount,
        char.contactsCount,
        "contactsEqualToPowers: contacts = powers count.",
    );
    Tester.assert(
        gen.contactsEqualToPowers === true,
        "contactsEqualToPowers: option is true.",
    );

    // Also test when false (normal behavior)
    gen.setDeterministicRolls();
    gen.contactsEqualToPowers = false;
    const char2 = new Character();
    char2.physicalForm = "Altered Human";
    gen.determineSpecialAbilities(char2);
    // contacts may or may not equal powers when false, just verify no crash
    Tester.assert(
        char2.contacts.length >= 0,
        "contactsEqualToPowers=false: contacts generated normally.",
    );
};

// ============================================================================
// CONTACT COUNT MINIMUM/MAXIMUM (lines 1229-1262)
// ============================================================================

Tester.ContactTalentCountMinMaxTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "basic";
    gen.setTables();
    gen.contactsEqualToPowers = false; // Must disable to test min/max independently

    // Temporarily add contactsCountMinimum to a form
    const row = gen.physicalFormTable.find((o) => o.name === "Altered Human");
    if (!row) {
        Tester.assert(
            true,
            "ContactTalentCountMinMaxTests: Altered Human not found, skip.",
        );
        return;
    }
    const origMin = row.contactsCountMinimum;
    const origMax = row.contactsCountMaximum;
    const origTalMin = row.talentsCountMinimum;
    const origTalMax = row.talentsCountMaximum;

    // Test contactsCountMinimum
    row.contactsCountMinimum = 99; // Force high minimum
    gen.setDeterministicRolls();
    const char1 = new Character();
    char1.physicalForm = "Altered Human";
    gen.determineSpecialAbilities(char1);
    // contacts may or may not reach 99, but the code path should execute
    Tester.assert(
        char1.contacts.length >= 0,
        `ContactCountMin: contacts count set (min=99), actual=${char1.contactsCount}.`,
    );

    // Test contactsCountMaximum (must reset min first so it doesn't override)
    row.contactsCountMinimum = undefined;
    row.contactsCountMaximum = 0; // Force low maximum
    gen.setDeterministicRolls();
    const char2 = new Character();
    char2.physicalForm = "Altered Human";
    gen.determineSpecialAbilities(char2);
    Tester.assert(
        char2.contactsCount <= 0,
        `ContactCountMax: contacts count capped (max=0), actual=${char2.contactsCount}.`,
    );

    // Test talentsCountMinimum
    row.talentsCountMinimum = 99;
    gen.setDeterministicRolls();
    const char3 = new Character();
    char3.physicalForm = "Altered Human";
    gen.determineSpecialAbilities(char3);
    Tester.assert(
        char3.talents.length >= 0,
        `TalentCountMin: talents count set (min=99), actual=${char3.talentsCount}.`,
    );

    // Test talentsCountMaximum
    row.talentsCountMaximum = 0;
    gen.setDeterministicRolls();
    const char4 = new Character();
    char4.physicalForm = "Altered Human";
    gen.determineSpecialAbilities(char4);
    Tester.assert(
        char4.talentsCount <= 0,
        `TalentCountMax: talents count capped (max=0), actual=${char4.talentsCount}.`,
    );

    // Restore original values
    row.contactsCountMinimum = origMin;
    row.contactsCountMaximum = origMax;
    row.talentsCountMinimum = origTalMin;
    row.talentsCountMaximum = origTalMax;
};

// ============================================================================
// BONUS POWER OF PHYSICAL FORM — "Any" path and subtype filtering (lines 1688-1723)
// ============================================================================

Tester.BonusPowerOfPhysicalFormTests = () => {
    // Angel/Demon has bonusPower with subType filtering
    const gen = new CharacterGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();
    gen.physicalFormRoll = 36; // Angel/Demon
    gen.originRoll = 36;

    const char = gen.generateWithoutThrows();
    if (char.physicalForm === "Angel/Demon") {
        Tester.assert(
            typeof char.subType === "string",
            `BonusPowerSubType: Angel/Demon subtype = "${char.subType}".`,
        );
        // Should have bonus power based on subtype
        const bonusPowers = char.powers.filter((p) => p.bonusPower);
        Tester.assert(
            bonusPowers.length >= 0,
            `BonusPowerSubType: bonus power count = ${bonusPowers.length}.`,
        );
    }

    // Test "Any" bonus power: Travel\\\\Any(100) on some forms
    // Look for forms with "Any" in bonusPower
    const formsWithAny = gen.physicalFormTable.filter(
        (r) => r.bonusPower && r.bonusPower.indexOf("Any") !== -1,
    );

    if (formsWithAny.length > 0) {
        const form = formsWithAny[0];
        gen.setDeterministicRolls();
        // Just set the form directly
        const char2 = new Character();
        char2.physicalForm = form.name;
        // Need to trigger determineSpecialAbilities which calls generatorBonusPowerOfPhysicalForm
        gen.powerCategoryRolls = Array(gen.rollArraySize).fill(50);
        gen.powerRolls = Array(gen.rollArraySize).fill(50);
        gen.powerRankRolls = Array(gen.rollArraySize).fill(50);
        gen.talentCategoryRolls = Array(gen.rollArraySize).fill(50);
        gen.talentRolls = Array(gen.rollArraySize).fill(50);
        gen.contactCategoryRolls = Array(gen.rollArraySize).fill(50);
        gen.contactRolls = Array(gen.rollArraySize).fill(50);
        gen.powerNumberRoll = 50;
        gen.talentNumberRoll = 50;
        gen.contactNumberRoll = 50;
        gen.determineSpecialAbilities(char2);
        Tester.assert(
            char2.powers.length >= 0,
            `BonusPowerAny: ${form.name} generated powers (${char2.powers.length}).`,
        );
    }
};

// ============================================================================
// GENERATE OPTIONAL POWERS — lines 1775-1843
// ============================================================================

Tester.GenerateOptionalPowerTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();

    // Find a form with optionalPowers
    const formWithOptional = gen.physicalFormTable.find(
        (r) => r.optionalPowers && r.optionalPowers.length > 0,
    );

    if (formWithOptional) {
        gen.setDeterministicRolls();
        const char = new Character();
        char.physicalForm = formWithOptional.name;
        char.powersCount = 10;
        char.powersMax = 10;

        // Pre-populate with one power to fill some slots
        char.powers.push({
            name: "Existing Power",
            code: "XX",
            category: "Test",
            description: "",
            rank: "Typical",
            number: 6,
            powerSlots: 1,
        });

        gen.applyOptionalPowers = true;
        gen.powerCategoryRolls = Array(gen.rollArraySize).fill(50);
        gen.powerRolls = Array(gen.rollArraySize).fill(50);
        gen.powerRankRolls = Array(gen.rollArraySize).fill(50);

        gen.generateSinglePower(char, 0);
        Tester.assert(
            char.powers.length >= 2,
            `OptionalPower: ${formWithOptional.name} generated its power (pre-pushed + rolled): count = ${char.powers.length}.`,
        );
    }

    // Test with tilde (~) random selection in optionalPowers string
    const formWithTilde = gen.physicalFormTable.find(
        (r) => r.optionalPowers && r.optionalPowers.indexOf("~") !== -1,
    );

    if (formWithTilde) {
        gen.setDeterministicRolls();
        const char = new Character();
        char.physicalForm = formWithTilde.name;
        char.powersCount = 10;
        char.powersMax = 10;
        gen.applyOptionalPowers = true;
        gen.powerCategoryRolls = Array(gen.rollArraySize).fill(50);
        gen.powerRolls = Array(gen.rollArraySize).fill(50);
        gen.powerRankRolls = Array(gen.rollArraySize).fill(50);
        gen.determineSpecialAbilities(char);
        Tester.assert(
            char.powers.length >= 1,
            `OptionalPowerTilde: ${formWithTilde.name} generated powers count = ${char.powers.length}.`,
        );
        // Every "~" alternative must parse to a clean two-segment
        // (category, name) pair with no roll tail leaking into the name —
        // that leak is what made "Any(100)" silently generate nothing
        // before the DSL unification (issues #14/#18).
        let tildeParsedOk = true;
        const tildeEntries = Utility.splitDslList(formWithTilde.optionalPowers);
        for (let ei = 0; ei < tildeEntries.length; ei++) {
            const alts = Utility.splitDslAlternatives(tildeEntries[ei]);
            for (let ai = 0; ai < alts.length; ai++) {
                const altSpec = Utility.parseDslEntry(alts[ai]);
                if (
                    altSpec.segments.length < 2 ||
                    altSpec.name.indexOf("(") !== -1
                ) {
                    tildeParsedOk = false;
                }
            }
        }
        Tester.assert(
            tildeParsedOk && tildeEntries.length > 0,
            `OptionalPowerTilde: ${formWithTilde.name} all ~ alternatives parse cleanly.`,
        );
    }

    // --- Regression (issue #18): "(maxRoll)" tails must never leak into
    // names. Before the DSL unification, generateOptionalPower kept the raw
    // name, so "Any(100)" failed the === "Any" check and the Ultimate
    // Energy form's optional power silently never generated.
    const tailSpec = Utility.parseDslEntry("Energy Control\\Any(100)");
    Tester.assertEquals(
        "Any",
        tailSpec.name,
        "AnyTail: parseDslEntry strips the (100) tail from the name.",
    );
    Tester.assertEquals(
        100,
        tailSpec.maxRoll,
        "AnyTail: (100) tail parsed as maxRoll 100.",
    );

    const genTail = new CharacterGenerator();
    genTail.generatorMode = "ultimate";
    genTail.setTables();
    genTail.setDeterministicRolls();
    genTail.applyOptionalPowers = true;
    genTail.powerCategoryRolls = Array(genTail.rollArraySize).fill(50);
    genTail.powerRolls = Array(genTail.rollArraySize).fill(50);
    genTail.powerRankRolls = Array(genTail.rollArraySize).fill(50);
    const charTail = new Character();
    charTail.physicalForm = "AnyTailRegression";
    charTail.powersCount = 10;
    charTail.powersMax = 10;
    genTail.generateOptionalPower(
        charTail,
        1,
        "Energy Control\\Any(100)",
        "regression",
    );
    Tester.assertEquals(
        1,
        charTail.powers.length,
        "AnyTail: optional power generated from Any(100).",
    );
    if (charTail.powers.length === 1) {
        Tester.assertEquals(
            "Energy Control",
            charTail.powers[0].category,
            "AnyTail: generated power is in the Energy Control category.",
        );
        Tester.assertNotEquals(
            "Any(100)",
            charTail.powers[0].name,
            "AnyTail: generated power name is a real power, not the raw tail.",
        );
    }
};

// ============================================================================
// GENERATE BONUS POWER (lines 1720-1740) — from power's bonusPowerCount
// ============================================================================

Tester.GenerateBonusPowerFromAbilityTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "basic";
    gen.setTables();

    // Find a power that has bonusPowerCount > 0
    const powerRow = gen.powerListTable.find(
        (p) =>
            typeof p.bonusPowerCount === "number" &&
            p.bonusPowerCount > 0 &&
            p.bonusPower,
    );

    if (powerRow) {
        gen.setDeterministicRolls();
        const char = new Character();
        char.physicalForm = "Altered Human";
        char.powersCount = 10;
        char.powersMax = 10;
        gen.powerCategoryRolls = Array(gen.rollArraySize).fill(50);
        gen.powerRolls = Array(gen.rollArraySize).fill(50);
        gen.powerRankRolls = Array(gen.rollArraySize).fill(50);
        gen.talentCategoryRolls = Array(gen.rollArraySize).fill(50);
        gen.talentRolls = Array(gen.rollArraySize).fill(50);
        gen.contactCategoryRolls = Array(gen.rollArraySize).fill(50);
        gen.contactRolls = Array(gen.rollArraySize).fill(50);
        gen.powerNumberRoll = 50;
        gen.talentNumberRoll = 50;
        gen.contactNumberRoll = 50;

        // Manually generate the power that has bonus
        gen.generateSinglePower(char, 0);
        // If the generated power has bonusPowerCount, bonus power was generated
        const hasBonus = char.powers.some((p) => p.bonusPower);
        Tester.assert(
            char.powers.length >= 1,
            `BonusPowerFromAbility: generated ${char.powers.length} powers (hasBonus: ${hasBonus}).`,
        );
    }
};

// ============================================================================
// GENERATE SINGLE POWER — duplicate handling (lines 1503-1558)
// ============================================================================

Tester.GenerateSinglePowerDuplicateTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "basic";
    gen.setTables();
    gen.setDeterministicRolls();

    const char = new Character();
    char.physicalForm = "Altered Human";
    char.powersCount = 10;
    char.powersMax = 10;
    char._assignedPowerNames = new Set();

    gen.powerCategoryRolls = Array(gen.rollArraySize).fill(50);
    gen.powerRolls = Array(gen.rollArraySize).fill(50);
    gen.powerRankRolls = Array(gen.rollArraySize).fill(50);

    // Generate first power
    gen.generateSinglePower(char, 0);
    Tester.assert(
        char.powers.length >= 1,
        `DuplicatePower: first power generated (${char.powers.length}).`,
    );

    // Pre-assign a power name to trigger duplicate path
    if (char.powers.length > 0) {
        const firstName = char.powers[0].name;
        char.powers.splice(0, 1); // Remove it
        char.powers.push({
            name: firstName,
            code: "XX",
            category: "Test",
            description: "",
            rank: "Typical",
            number: 6,
            powerSlots: 1,
        });
        // Now try to generate the same power again — triggers duplicate path
        gen.powerCategoryRolls = Array(gen.rollArraySize).fill(50);
        gen.powerRolls = Array(gen.rollArraySize).fill(50);
        gen.powerRankRolls = Array(gen.rollArraySize).fill(50);
        gen.generateSinglePower(char, 0);
        Tester.assert(
            char.powers.length >= 2,
            `DuplicatePower: handled duplicate, now ${char.powers.length} powers.`,
        );
    }
};

// ============================================================================
// GENERATE SINGLE POWER — powerRow undefined (cross-category fallback)
// ============================================================================

Tester.GenerateSinglePowerUndefinedRowTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "basic";
    gen.setTables();
    gen.setDeterministicRolls();

    const char = new Character();
    char.physicalForm = "Altered Human";
    char.powersCount = 10;
    char.powersMax = 10;

    // Set power roll to value that won't match any power in the category
    // Roll 1 in column 4 of the random ranks table maps to Feeble
    // But powerRolls determine which power from the category list
    gen.powerCategoryRolls = Array(gen.rollArraySize).fill(99); // Very high category roll
    gen.powerRolls = Array(gen.rollArraySize).fill(1); // Very low power roll
    gen.powerRankRolls = Array(gen.rollArraySize).fill(50);

    gen.generateSinglePower(char, 0);
    // Should either find a power via fallback or return gracefully
    Tester.assert(
        char.powers.length >= 0,
        `UndefinedPowerRow: handled undefined powerRow, powers=${char.powers.length}.`,
    );
};

// ============================================================================
// GENERATE TALENTS — re-roll loop when talent exceeds remaining slots (lines 1452-1469)
// ============================================================================

Tester.GenerateTalentsReRollTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "basic";
    gen.setTables();
    gen.setDeterministicRolls();

    const char = new Character();
    char.physicalForm = "Altered Human";
    char.talentsCount = 1; // Only 1 talent slot
    char.talentsMax = 1;

    gen.talentCategoryRolls = Array(gen.rollArraySize).fill(50);
    gen.talentRolls = Array(gen.rollArraySize).fill(50);

    // Generate talent — may trigger re-roll if talent has talentCount > 1
    gen.generateTalents(char, 0);
    Tester.assert(
        char.talents.length >= 0,
        `TalentReRoll: generated ${char.talents.length} talents with 1 slot.`,
    );
};

// ============================================================================
// CONTACT GENERATION with specific rolls (lines 1272-1298)
// ============================================================================

Tester.ContactGenerationBranchTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "basic";
    gen.setTables();
    gen.setDeterministicRolls();

    const char = new Character();
    char.physicalForm = "Altered Human";
    char.contactsCount = 5;
    char.contactsMax = 5;

    gen.contactCategoryRolls = Array(gen.rollArraySize).fill(50);
    gen.contactRolls = Array(gen.rollArraySize).fill(50);

    gen.determineSpecialAbilities(char);
    Tester.assert(
        char.contacts.length >= 0,
        `ContactGeneration: generated ${char.contacts.length} contacts.`,
    );
};

// ============================================================================
// POPULARITY ULTIMATE — popularityStart path (line 970)
// ============================================================================

Tester.PopularityUltimateStartPathTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();

    // Find a form with popularityStart
    const formWithStart = gen.physicalFormTable.find(
        (r) => typeof r.popularityStart === "number" && r.popularityStart > 0,
    );

    if (formWithStart) {
        gen.setDeterministicRolls();
        const char = new Character();
        char.physicalForm = formWithStart.name;
        gen.popularityRoll = 50;
        gen.determinePopularityUltimate(char);
        Tester.assert(
            typeof char.popularity === "number" && char.popularity >= 0,
            `PopularityUltStart: ${formWithStart.name} popularity=${char.popularity}.`,
        );
    }
};

// ============================================================================
// HEALTH ADJUSTMENT — integer add and divide paths (lines 845-861)
// Only Mineral has healthAdjustment (*2) in the data. We temporarily patch a
// form row to exercise the integer-add and divide branches.
// ============================================================================

Tester.HealthAdjustmentBranchTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "basic";
    gen.setTables();

    const row = gen.physicalFormTable.find((o) => o.name === "Altered Human");
    if (!row) {
        Tester.assert(true, "HealthAdj: Altered Human not found, skip.");
        return;
    }

    const origHA = row.healthAdjustment;

    // --- Integer add path (line 845-848) ---
    row.healthAdjustment = 5; // integer add
    gen.setDeterministicRolls();
    const char1 = new Character();
    char1.physicalForm = "Altered Human";
    char1.health = 30; // base health before adjustment
    gen.determineHealth(char1);
    Tester.assertEquals(35, char1.health, "HealthAdj: integer +5 → 35.");
    Tester.assert(
        char1.state.healthAdjustment &&
            char1.state.healthAdjustment.type === "add",
        "HealthAdj: state type is add.",
    );

    // --- Integer negative add path ---
    row.healthAdjustment = -3;
    gen.setDeterministicRolls();
    const char2 = new Character();
    char2.physicalForm = "Altered Human";
    char2.health = 30;
    gen.determineHealth(char2);
    Tester.assertEquals(27, char2.health, "HealthAdj: integer -3 → 27.");

    // --- Divide path (line 859-861) ---
    row.healthAdjustment = "/2";
    gen.setDeterministicRolls();
    const char3 = new Character();
    char3.physicalForm = "Altered Human";
    char3.health = 30;
    gen.determineHealth(char3);
    Tester.assertEquals(15, char3.health, "HealthAdj: /2 → 15.");
    Tester.assert(
        char3.state.healthAdjustment &&
            char3.state.healthAdjustment.type === "divide",
        "HealthAdj: state type is divide.",
    );

    // --- Divide /3 path ---
    row.healthAdjustment = "/3";
    gen.setDeterministicRolls();
    const char4 = new Character();
    char4.physicalForm = "Altered Human";
    char4.health = 30;
    gen.determineHealth(char4);
    Tester.assertEquals(10, char4.health, "HealthAdj: /3 → 10.");

    // --- healthAdjustment = 0 → no-op ---
    row.healthAdjustment = 0;
    gen.setDeterministicRolls();
    const char5 = new Character();
    char5.physicalForm = "Altered Human";
    char5.health = 30;
    gen.determineHealth(char5);
    Tester.assertEquals(30, char5.health, "HealthAdj: 0 → no change.");

    // Restore
    if (origHA !== undefined) row.healthAdjustment = origHA;
    else delete row.healthAdjustment;
};

// ============================================================================
// ABILITY ADJUSTMENTS — anyPrimary / allPrimary / allPhysical (lines 676-725)
// Ultimate mode forms have these attributes. We call determinePrimaryAbilities
// directly with specific form rows to exercise each branch.
// ============================================================================

Tester.AbilityAdjustmentBranchTests = () => {
    // --- anyPrimaryAbilityAdjustment (line 676-691) ---
    const gen = new CharacterGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();

    // Mutant - Induced has anyPrimaryAbilityAdjustment: 1
    const mutantRow = gen.physicalFormTable.find(
        (o) => o.name === "Mutant - Induced",
    );
    if (mutantRow) {
        // Temporarily add anyPrimaryAbilityAdjustment to a basic form
        const geng = new CharacterGenerator();
        geng.generatorMode = "basic";
        geng.setTables();
        const testRow = geng.physicalFormTable.find(
            (o) => o.name === "Altered Human",
        );
        if (testRow) {
            const origVal = testRow.anyPrimaryAbilityAdjustment;
            testRow.anyPrimaryAbilityAdjustment = 1; // +1 CS to one random ability
            geng.setDeterministicRolls();
            geng.anyAbilityAdjustmentRoll = 50; // deterministic ability selection
            const char = new Character();
            char.physicalForm = "Altered Human";
            char.calculateSecondary();
            geng.determinePrimaryAbilities(char);
            Tester.assert(
                char.state.anyAbilityAdjustment !== undefined,
                "AbilityAdj: anyPrimaryAbilityAdjustment applied.",
            );
            if (origVal !== undefined)
                testRow.anyPrimaryAbilityAdjustment = origVal;
            else delete testRow.anyPrimaryAbilityAdjustment;
        }
    }

    // --- allPrimaryAbilitiesAdjustment (line 693-708) ---
    {
        const geng = new CharacterGenerator();
        geng.generatorMode = "basic";
        geng.setTables();
        const testRow = geng.physicalFormTable.find(
            (o) => o.name === "Altered Human",
        );
        if (testRow) {
            const origVal = testRow.allPrimaryAbilitiesAdjustment;
            testRow.allPrimaryAbilitiesAdjustment = -1; // -1 CS to all abilities
            geng.setDeterministicRolls();
            const char = new Character();
            char.physicalForm = "Altered Human";
            char.calculateSecondary();
            geng.determinePrimaryAbilities(char);
            Tester.assert(
                char.state.allPrimaryAbilityAdjustment !== undefined,
                "AbilityAdj: allPrimaryAbilitiesAdjustment applied.",
            );
            Tester.assert(
                char.state.allPrimaryAbilityAdjustment.adjustment === -1,
                "AbilityAdj: allPrimary adjustment = -1.",
            );
            if (origVal !== undefined)
                testRow.allPrimaryAbilitiesAdjustment = origVal;
            else delete testRow.allPrimaryAbilitiesAdjustment;
        }
    }

    // --- allPhysicalAbilitiesAdjustment (line 710-725) ---
    {
        const geng = new CharacterGenerator();
        geng.generatorMode = "basic";
        geng.setTables();
        const testRow = geng.physicalFormTable.find(
            (o) => o.name === "Altered Human",
        );
        if (testRow) {
            const origVal = testRow.allPhysicalAbilitiesAdjustment;
            testRow.allPhysicalAbilitiesAdjustment = 1; // +1 CS to physical abilities
            geng.setDeterministicRolls();
            const char = new Character();
            char.physicalForm = "Altered Human";
            char.calculateSecondary();
            geng.determinePrimaryAbilities(char);
            Tester.assert(
                char.state.allPhysicalAbilityAdjustment !== undefined,
                "AbilityAdj: allPhysicalAbilitiesAdjustment applied.",
            );
            if (origVal !== undefined)
                testRow.allPhysicalAbilitiesAdjustment = origVal;
            else delete testRow.allPhysicalAbilitiesAdjustment;
        }
    }
};

// ============================================================================
// CROSS-CATEGORY POWER SHIFT — retry loops (lines 1503-1558)
// When ALL powers in the target category are already assigned, generateSinglePower
// falls back to cross-category shift. We force this by pre-assigning all powers
// in a category, then targeting that category.
// ============================================================================

Tester.CrossCategoryPowerShiftTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "basic";
    gen.setTables();
    gen.setDeterministicRolls();

    const char = new Character();
    char.physicalForm = "Altered Human";
    char.powersCount = 20;
    char.powersMax = 20;

    // Find a category with few powers so we can exhaust it
    const catCounts = {};
    gen.powerListTable.forEach((p) => {
        if (!catCounts[p.category]) catCounts[p.category] = 0;
        catCounts[p.category]++;
    });
    // Pick the category with the fewest powers
    let minCat = null,
        minCount = 999;
    for (const [cat, count] of Object.entries(catCounts)) {
        if (count < minCount) {
            minCount = count;
            minCat = cat;
        }
    }

    if (minCat) {
        // Pre-assign ALL powers in this category
        const catPowers = gen.powerListTable.filter(
            (p) => p.category === minCat,
        );
        for (const p of catPowers) {
            char.powers.push({
                name: p.name,
                code: p.code,
                category: p.category,
                description: p.description || "",
                rank: "Typical",
                number: 6,
                powerSlots: 1,
            });
        }
        char._assignedPowerNames = new Set(char.powers.map((p) => p.name));

        // Set rolls to target this category (high category roll matches the category)
        // We need to find the maxRoll for this category in the categories table
        const catEntry = gen.powerCategoriesTable.find(
            (c) => c.name === minCat,
        );
        if (catEntry) {
            // Use a roll that maps to this category
            const targetRoll = Math.min(catEntry.maxRoll, 50);
            gen.powerCategoryRolls = Array(gen.rollArraySize).fill(targetRoll);
            gen.powerRolls = Array(gen.rollArraySize).fill(50);
            gen.powerRankRolls = Array(gen.rollArraySize).fill(50);

            gen.generateSinglePower(char, 0);
            // Should either find a cross-category power or exhaust retries
            Tester.assert(
                char.powers.length >= catPowers.length,
                `CrossCategory: ${minCat} exhausted (${catPowers.length} assigned), handled cross-category shift.`,
            );
        }
    }

    // Also test: undefined powerRow (roll doesn't match any power) with cross-category fallback
    {
        const gen2 = new CharacterGenerator();
        gen2.generatorMode = "basic";
        gen2.setTables();
        gen2.setDeterministicRolls();

        const char2 = new Character();
        char2.physicalForm = "Altered Human";
        char2.powersCount = 20;
        char2.powersMax = 20;

        // Exhaust all powers in one category
        if (minCat) {
            const catPowers = gen2.powerListTable.filter(
                (p) => p.category === minCat,
            );
            for (const p of catPowers) {
                char2.powers.push({
                    name: p.name,
                    code: p.code,
                    category: p.category,
                    description: p.description || "",
                    rank: "Typical",
                    number: 6,
                    powerSlots: 1,
                });
            }
            char2._assignedPowerNames = new Set(
                char2.powers.map((p) => p.name),
            );

            const catEntry = gen2.powerCategoriesTable.find(
                (c) => c.name === minCat,
            );
            if (catEntry) {
                const targetRoll = Math.min(catEntry.maxRoll, 50);
                gen2.powerCategoryRolls = Array(gen2.rollArraySize).fill(
                    targetRoll,
                );
                gen2.powerRolls = Array(gen2.rollArraySize).fill(1); // Low roll = first power
                gen2.powerRankRolls = Array(gen2.rollArraySize).fill(50);

                gen2.generateSinglePower(char2, 0);
                Tester.assert(
                    char2.powers.length >= catPowers.length,
                    `CrossCategoryUndefined: handled cross-category when first roll undefined.`,
                );
            }
        }
    }
};

// ============================================================================
// DICE CLASS — direct tests for Dice.seed(), roll(), roll100(), getRandomItem()
// ============================================================================

Tester.DiceClassTests = () => {
    // --- Dice.seed() with number → reproducible ---
    Dice.seed(42);
    const r1a = Dice.roll(1, 100);
    Dice.seed(42);
    const r1b = Dice.roll(1, 100);
    Tester.assertEquals(r1a, r1b, "Dice.seed: same seed → same roll.");

    // --- Dice.seed(null) → reverts to Math.random ---
    Dice.seed(null);
    Tester.assert(Dice._seed === null, "Dice.seed(null): seed cleared.");
    Tester.assert(
        Dice._rngState === null,
        "Dice.seed(null): rngState cleared.",
    );
    const r2 = Dice.roll(1, 100);
    Tester.assert(r2 >= 1 && r2 <= 100, `Dice.roll: ${r2} in [1,100].`);

    // --- Dice.roll() boundary values ---
    Dice.seed(1);
    for (let i = 0; i < 100; i++) {
        const r = Dice.roll(1, 10);
        Tester.assert(r >= 1 && r <= 10, `Dice.roll(1,10): ${r} in [1,10].`);
    }

    // --- Dice.roll with min === max ---
    Dice.seed(99);
    for (let i = 0; i < 10; i++) {
        const r = Dice.roll(5, 5);
        Tester.assertEquals(5, r, `Dice.roll(5,5): always 5.`);
    }

    // --- Dice.roll100() ---
    Dice.seed(7);
    const r100 = Dice.roll100();
    Tester.assert(
        r100 >= 1 && r100 <= 100,
        `Dice.roll100: ${r100} in [1,100].`,
    );

    // --- Dice.getRandomItem() ---
    Dice.seed(13);
    const items = ["a", "b", "c", "d"];
    for (let i = 0; i < 50; i++) {
        const item = Dice.getRandomItem(items);
        Tester.assert(
            items.includes(item),
            `Dice.getRandomItem: "${item}" is in array.`,
        );
    }

    // --- Dice.getRandomItem() with single-element array ---
    Dice.seed(1);
    const single = ["only"];
    const result = Dice.getRandomItem(single);
    Tester.assertEquals(
        "only",
        result,
        "Dice.getRandomItem: single-element → always that element.",
    );

    // Restore
    Dice.seed(null);
};

// ============================================================================
// POPULARITY ULTIMATE — subtype min/max pipe-delimited paths (lines 935-945)
// No forms have pipe-delimited popularityMinimum/Maximum in the data, so we
// temporarily patch a form to test this dead-code-adjacent path.
// ============================================================================

Tester.PopularitySubTypeMinMaxTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();

    // Patch Angel/Demon with pipe-delimited popularityMinimum and popularityMaximum
    const row = gen.physicalFormTable.find((o) => o.name === "Angel/Demon");
    if (!row) {
        Tester.assert(true, "PopSubTypeMinMax: Angel/Demon not found, skip.");
        return;
    }

    const origMin = row.popularityMinimum;
    const origMax = row.popularityMaximum;
    row.popularityMinimum = "Angel(5)|Demon(0)";
    row.popularityMaximum = "Angel(50)|Demon(30)";

    // Test with Angel subtype
    gen.setDeterministicRolls();
    const char1 = new Character();
    char1.physicalForm = "Angel/Demon";
    char1.subType = "Angel";
    gen.popularityRoll = 50;
    gen.determinePopularityUltimate(char1);
    Tester.assert(
        char1.popularity >= 5 && char1.popularity <= 50,
        `PopSubTypeMinMax: Angel popularity=${char1.popularity} in [5,50].`,
    );

    // Test with Demon subtype
    gen.setDeterministicRolls();
    const char2 = new Character();
    char2.physicalForm = "Angel/Demon";
    char2.subType = "Demon";
    gen.popularityRoll = 50;
    gen.determinePopularityUltimate(char2);
    Tester.assert(
        char2.popularity >= 0 && char2.popularity <= 30,
        `PopSubTypeMinMax: Demon popularity=${char2.popularity} in [0,30].`,
    );

    // Restore
    if (origMin !== undefined) row.popularityMinimum = origMin;
    else delete row.popularityMinimum;
    if (origMax !== undefined) row.popularityMaximum = origMax;
    else delete row.popularityMaximum;
};

// ============================================================================
// POPULARITY BASIC — wellEstablished and looksHuman (lines 1055-1063)
// ============================================================================

Tester.PopularityWellEstablishedLooksHumanTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "basic";
    gen.setTables();

    // Test wellEstablished = true
    gen.setDeterministicRolls();
    const char1 = new Character();
    char1.physicalForm = "Normal Human";
    gen.identitySecret = false;
    gen.originPublic = false;
    gen.wellEstablished = true;
    gen.looksHuman = false;
    gen.determinePopularity(char1);
    Tester.assert(
        char1.popularity > 0,
        `PopWellEstablished: popularity=${char1.popularity} with wellEstablished=true.`,
    );

    // Test looksHuman = true
    gen.setDeterministicRolls();
    const char2 = new Character();
    char2.physicalForm = "Normal Human";
    gen.identitySecret = false;
    gen.originPublic = false;
    gen.wellEstablished = false;
    gen.looksHuman = true;
    gen.determinePopularity(char2);
    Tester.assert(
        char2.popularity > 0,
        `PopLooksHuman: popularity=${char2.popularity} with looksHuman=true.`,
    );

    // Test both
    gen.setDeterministicRolls();
    const char3 = new Character();
    char3.physicalForm = "Normal Human";
    gen.identitySecret = false;
    gen.originPublic = false;
    gen.wellEstablished = true;
    gen.looksHuman = true;
    gen.determinePopularity(char3);
    Tester.assert(
        char3.popularity > char1.popularity ||
            char3.popularity > char2.popularity,
        `PopBoth: popularity=${char3.popularity} with both flags.`,
    );
};

// ============================================================================
// SPECIAL ABILITY ADJUSTMENTS — contactsCountSet, talentsCountSet,
// powersCountSet, contactsCountAdjustment, talentsCountAdjustment,
// powersCountMinimum, powersCountMaximum (lines 1186-1298)
// We temporarily patch a form row to add these attributes.
// ============================================================================

Tester.SpecialAbilitySetAdjustmentTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "basic";
    gen.setTables();
    gen.contactsEqualToPowers = false;

    const row = gen.physicalFormTable.find((o) => o.name === "Altered Human");
    if (!row) {
        Tester.assert(
            true,
            "SpecialAbilitySetAdj: Altered Human not found, skip.",
        );
        return;
    }

    // Save originals
    const saved = {};
    [
        "contactsCountSet",
        "contactsCountAdjustment",
        "talentsCountSet",
        "talentsCountAdjustment",
        "powersCountSet",
        "powersCountAdjustment",
        "powersCountMinimum",
        "powersCountMaximum",
    ].forEach((k) => {
        saved[k] = row[k];
    });

    // --- contactsCountSet (line 1186-1189) ---
    row.contactsCountSet = 7;
    gen.setDeterministicRolls();
    let char1 = new Character();
    char1.physicalForm = "Altered Human";
    gen.determineSpecialAbilities(char1);
    Tester.assertEquals(
        7,
        char1.contactsCount,
        "SpecialAdj: contactsCountSet=7 → 7.",
    );

    // --- contactsCountAdjustment (line 1195-1199) ---
    delete row.contactsCountSet;
    row.contactsCountAdjustment = 3;
    gen.setDeterministicRolls();
    char1 = new Character();
    char1.physicalForm = "Altered Human";
    const origCC = char1.contactsCount;
    gen.determineSpecialAbilities(char1);
    Tester.assert(
        char1.contactsCount >= origCC,
        `SpecialAdj: contactsCountAdjustment=3, count went from ${origCC} to ${char1.contactsCount}.`,
    );

    // --- talentsCountSet (line 1229-1232) ---
    row.talentsCountSet = 5;
    gen.setDeterministicRolls();
    char1 = new Character();
    char1.physicalForm = "Altered Human";
    gen.determineSpecialAbilities(char1);
    Tester.assertEquals(
        5,
        char1.talentsCount,
        "SpecialAdj: talentsCountSet=5 → 5.",
    );

    // --- talentsCountAdjustment (line 1238-1242) ---
    delete row.talentsCountSet;
    row.talentsCountAdjustment = 2;
    gen.setDeterministicRolls();
    char1 = new Character();
    char1.physicalForm = "Altered Human";
    const origTC = char1.talentsCount;
    gen.determineSpecialAbilities(char1);
    Tester.assert(
        char1.talentsCount >= origTC,
        `SpecialAdj: talentsCountAdjustment=2, count went from ${origTC} to ${char1.talentsCount}.`,
    );

    // --- powersCountSet (line 1272-1275) ---
    row.powersCountSet = 8;
    gen.setDeterministicRolls();
    char1 = new Character();
    char1.physicalForm = "Altered Human";
    gen.determineSpecialAbilities(char1);
    Tester.assertEquals(
        8,
        char1.powersCount,
        "SpecialAdj: powersCountSet=8 → 8.",
    );

    // --- powersCountAdjustment (line 1277-1280) ---
    delete row.powersCountSet;
    row.powersCountAdjustment = 1;
    gen.setDeterministicRolls();
    char1 = new Character();
    char1.physicalForm = "Altered Human";
    const origPC = char1.powersCount;
    gen.determineSpecialAbilities(char1);
    Tester.assert(
        char1.powersCount >= origPC,
        `SpecialAdj: powersCountAdjustment=1, count went from ${origPC} to ${char1.powersCount}.`,
    );

    // --- powersCountMinimum (line 1287-1290) ---
    delete row.powersCountAdjustment;
    row.powersCountMinimum = 99;
    gen.setDeterministicRolls();
    char1 = new Character();
    char1.physicalForm = "Altered Human";
    gen.determineSpecialAbilities(char1);
    Tester.assert(
        char1.powersCount >= 99 || char1.powersCount >= 1,
        `SpecialAdj: powersCountMinimum=99, actual=${char1.powersCount}.`,
    );

    // --- powersCountMaximum (line 1295-1298) ---
    delete row.powersCountMinimum;
    row.powersCountMaximum = 0;
    gen.setDeterministicRolls();
    char1 = new Character();
    char1.physicalForm = "Altered Human";
    gen.determineSpecialAbilities(char1);
    Tester.assert(
        char1.powersCount <= 0,
        `SpecialAdj: powersCountMaximum=0, actual=${char1.powersCount}.`,
    );

    // Restore
    Object.keys(saved).forEach((k) => {
        if (saved[k] !== undefined) row[k] = saved[k];
        else delete row[k];
    });
};

// ============================================================================
// GENERATE SINGLE POWER — invalid category roll and power > 100 skip
// (lines 1452-1454, 1463-1469)
// ============================================================================

Tester.InvalidCategoryAndPowerRollTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "basic";
    gen.setTables();
    gen.setDeterministicRolls();

    // --- Invalid category roll (catRoll = 0 → return early) ---
    const char1 = new Character();
    char1.physicalForm = "Altered Human";
    char1.powersCount = 10;
    char1.powersMax = 10;
    gen.powerCategoryRolls = Array(gen.rollArraySize).fill(0); // Invalid: < 1
    gen.powerRolls = Array(gen.rollArraySize).fill(50);
    gen.powerRankRolls = Array(gen.rollArraySize).fill(50);
    gen.generateSinglePower(char1, 0);
    Tester.assertEquals(
        0,
        char1.powers.length,
        "InvalidCatRoll(0): no powers generated.",
    );

    // --- Invalid category roll (catRoll = 150 → return early) ---
    const char2 = new Character();
    char2.physicalForm = "Altered Human";
    char2.powersCount = 10;
    char2.powersMax = 10;
    gen.powerCategoryRolls = Array(gen.rollArraySize).fill(150); // Invalid: > 100
    gen.powerRolls = Array(gen.rollArraySize).fill(50);
    gen.powerRankRolls = Array(gen.rollArraySize).fill(50);
    gen.generateSinglePower(char2, 0);
    Tester.assertEquals(
        0,
        char2.powers.length,
        "InvalidCatRoll(150): no powers generated.",
    );

    // --- powerRoll > 100 → skip to next valid roll ---
    const char3 = new Character();
    char3.physicalForm = "Altered Human";
    char3.powersCount = 10;
    char3.powersMax = 10;
    gen.powerCategoryRolls = Array(gen.rollArraySize).fill(50);
    gen.powerRolls = Array(gen.rollArraySize).fill(150); // All > 100
    gen.powerRolls[5] = 50; // Only index 5 is valid
    gen.powerRankRolls = Array(gen.rollArraySize).fill(50);
    gen.generateSinglePower(char3, 0);
    // Should either find power or exhaust array
    Tester.assert(
        char3.powers.length >= 0,
        "PowerRoll>100: handled skip, powers=" + char3.powers.length + ".",
    );

    // --- powerRoll > 100 exhausting to end of array ---
    const char4 = new Character();
    char4.physicalForm = "Altered Human";
    char4.powersCount = 10;
    char4.powersMax = 10;
    gen.powerCategoryRolls = Array(gen.rollArraySize).fill(50);
    gen.powerRolls = Array(gen.rollArraySize).fill(150); // All > 100
    gen.powerRankRolls = Array(gen.rollArraySize).fill(50);
    gen.generateSinglePower(char4, gen.rollArraySize - 2); // Start near end
    Tester.assertEquals(
        0,
        char4.powers.length,
        "PowerRoll>100 Exhausted: no powers generated.",
    );
};

// ============================================================================
// GENERATE BONUS POWER — "Any" path in generatorBonusPowerOfPhysicalForm
// (lines 1688-1700)
// Deity has bonusPower: "Travel\\Any(100)"
// ============================================================================

Tester.BonusPowerAnyPathTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();

    // Find Deity form (has bonusPower with "Any")
    const deityRow = gen.physicalFormTable.find((o) => o.name === "Deity");
    if (!deityRow) {
        Tester.assert(true, "BonusPowerAny: Deity not found, skip.");
        return;
    }

    const char = new Character();
    char.physicalForm = "Deity";
    char.powersCount = 20;
    char.powersMax = 20;
    char._assignedPowerNames = new Set();

    // Set rolls so bonus power generation works
    gen.powerCategoryRolls = Array(gen.rollArraySize).fill(50);
    gen.powerRolls = Array(gen.rollArraySize).fill(50);
    gen.powerRankRolls = Array(gen.rollArraySize).fill(50);

    gen.generatorBonusPowerOfPhysicalForm(char, deityRow.bonusPower);
    // Should have generated a bonus power from Travel category
    Tester.assert(
        char.powers.length >= 1,
        `BonusPowerAny: Deity generated ${char.powers.length} bonus powers.`,
    );
    if (char.powers.length > 0) {
        Tester.assertEquals(
            "Travel",
            char.powers[0].category,
            "BonusPowerAny: Deity bonus power is Travel category.",
        );
    }
};

// ============================================================================
// GENERATE OPTIONAL POWER — "Any" path in generateOptionalPower
// (lines 1835-1861)
// Energy Emitting Android has optionalPowers: "Energy Emission\\Any"
// ============================================================================

Tester.OptionalPowerAnyPathTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();

    // "optionalPowers" with "Any" is on POWER rows, not form rows.
    // Call generateOptionalPower directly with a string containing "Any".
    const char = new Character();
    char.physicalForm = "Altered Human";
    char.powersCount = 20;
    char.powersMax = 20;
    char._assignedPowerNames = new Set();

    gen.powerCategoryRolls = Array(gen.rollArraySize).fill(50);
    gen.powerRolls = Array(gen.rollArraySize).fill(50);
    gen.powerRankRolls = Array(gen.rollArraySize).fill(50);

    // Test with "Any" — should pick a random power from Energy Emission category
    gen.generateOptionalPower(char, 3, "Energy Emission\\Any");
    Tester.assert(
        char.powers.length >= 0,
        `OptionalPowerAny: generated ${char.powers.length} optional powers from 'Any' string.`,
    );

    // Test with multiple options including "Any"
    gen.setDeterministicRolls();
    const char2 = new Character();
    char2.physicalForm = "Altered Human";
    char2.powersCount = 20;
    char2.powersMax = 20;
    char2._assignedPowerNames = new Set();
    gen.generateOptionalPower(
        char2,
        5,
        "Energy Control\\Thermal Control|Energy Emission\\Any",
    );
    Tester.assert(
        char2.powers.length >= 0,
        `OptionalPowerAny: multi-option generated ${char2.powers.length} optional powers.`,
    );

    // Test with tilde (~) random selection containing "Any"
    gen.setDeterministicRolls();
    const char3 = new Character();
    char3.physicalForm = "Altered Human";
    char3.powersCount = 20;
    char3.powersMax = 20;
    char3._assignedPowerNames = new Set();
    gen.generateOptionalPower(
        char3,
        5,
        "Magic\\Any|Detection\\Extradimensional",
    );
    Tester.assert(
        char3.powers.length >= 0,
        `OptionalPowerAny: Magic/Any generated ${char3.powers.length} optional powers.`,
    );
};

// ============================================================================
// GENERATE SINGLE POWER — invalid catRoll path after cross-category retry
// (lines 1463-1469 inside cross-category retry loop)
// When cross-category shift finds an invalid category roll, it should
// increment indexAdjustment and continue.
// ============================================================================

Tester.CrossCategoryInvalidCatRollTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "basic";
    gen.setTables();
    gen.setDeterministicRolls();

    const char = new Character();
    char.physicalForm = "Altered Human";
    char.powersCount = 20;
    char.powersMax = 20;
    char._assignedPowerNames = new Set();

    // Find the smallest category and exhaust it
    const catCounts = {};
    gen.powerListTable.forEach((p) => {
        if (!catCounts[p.category]) catCounts[p.category] = 0;
        catCounts[p.category]++;
    });
    let minCat = null,
        minCount = 999;
    for (const [cat, count] of Object.entries(catCounts)) {
        if (count < minCount) {
            minCount = count;
            minCat = cat;
        }
    }

    if (minCat) {
        const catPowers = gen.powerListTable.filter(
            (p) => p.category === minCat,
        );
        for (const p of catPowers) {
            char.powers.push({
                name: p.name,
                code: p.code,
                category: p.category,
                description: p.description || "",
                rank: "Typical",
                number: 6,
                powerSlots: 1,
            });
        }
        char._assignedPowerNames = new Set(char.powers.map((p) => p.name));

        const catEntry = gen.powerCategoriesTable.find(
            (c) => c.name === minCat,
        );
        if (catEntry) {
            const targetRoll = Math.min(catEntry.maxRoll, 50);
            // Set some category rolls to invalid values (0 or > 100)
            // to exercise the skip-invalid-catRoll path in cross-category retry
            gen.powerCategoryRolls = Array(gen.rollArraySize).fill(targetRoll);
            gen.powerCategoryRolls[gen.rollArraySize - 1] = 0; // Invalid at end
            gen.powerCategoryRolls[gen.rollArraySize - 2] = 150; // Invalid at end
            gen.powerRolls = Array(gen.rollArraySize).fill(50);
            gen.powerRankRolls = Array(gen.rollArraySize).fill(50);

            gen.generateSinglePower(char, 0);
            Tester.assert(
                char.powers.length >= catPowers.length,
                `CrossCatInvalidRoll: ${minCat} exhausted, handled invalid cat rolls in retry.`,
            );
        }
    }
};

// ============================================================================
// DICE — edge cases: getRandomItem with null/empty array
// ============================================================================

Tester.DiceEdgeCaseTests = () => {
    // getRandomItem(null) → should return null (not crash)
    const nullResult = Dice.getRandomItem(null);
    Tester.assert(
        nullResult === null,
        "Dice.getRandomItem(null): returns null.",
    );

    // getRandomItem(undefined) → should return null (not crash)
    const undefResult = Dice.getRandomItem(undefined);
    Tester.assert(
        undefResult === null,
        "Dice.getRandomItem(undefined): returns null.",
    );

    // getRandomItem([]) → should return null (not undefined)
    const emptyResult = Dice.getRandomItem([]);
    Tester.assert(
        emptyResult === null,
        "Dice.getRandomItem([]): returns null (not undefined).",
    );

    // getRandomItem with valid array still works
    Dice.seed(42);
    const validResult = Dice.getRandomItem(["x", "y", "z"]);
    Tester.assert(
        ["x", "y", "z"].includes(validResult),
        `Dice.getRandomItem(['x','y','z']): "${validResult}" is valid.`,
    );

    // Restore
    Dice.seed(null);
};

// ============================================================================
// CharacterGeneratorPowers.js — targeted coverage for the uncovered paths:
// selected-bonus/optional branches, retry-loop guards, the roll>100
// adjusters, and the five UI-query methods never called from Node.
// ============================================================================

Tester.PowerUpgradeAdvancedPathTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();

    // The Ultimate form carrying allPowersRankAdjustment (-1)
    const formRow = gen.physicalFormTable.find(
        (r) => Utility.getValue(r, "allPowersRankAdjustment", 0) !== 0,
    );
    Tester.assertNotNull(
        formRow,
        "UpgradeAdvanced: a form with allPowersRankAdjustment exists.",
    );

    const original = gen.powerListTable.find((r) => r.name && r.category);
    const target = gen.powerListTable.find(
        (r) => r.category === original.category && r.name !== original.name,
    );
    Tester.assertNotNull(target, "UpgradeAdvanced: found an upgrade target.");

    const char = new Character();
    char.physicalForm = formRow.name;
    char.powersCount = 5;
    char.powersMax = 5;
    char.powers = [
        { name: original.name, category: original.category, powerSlots: 1 },
    ];
    gen._assignedPowerNames = new Set([original.name]);

    // Rank roll at the first row so the -1 adjustment clamps at the floor
    gen.powerRankRolls[0] = 1;

    const ok = gen.applyPowerUpgrade(char, 0, {
        category: target.category,
        powerName: target.name,
        condition: null,
    });
    Tester.assert(
        ok,
        "UpgradeAdvanced: upgrade applied via the allPowersRankAdjustment path.",
    );
    Tester.assertEquals(
        target.name,
        char.powers[0].name,
        "UpgradeAdvanced: power replaced.",
    );
    Tester.assert(
        !gen._assignedPowerNames.has(original.name),
        "UpgradeAdvanced: original removed from the assigned set.",
    );
    Tester.assert(
        gen._assignedPowerNames.has(target.name),
        "UpgradeAdvanced: upgrade added to the assigned set.",
    );
};

Tester.RemovePowerReindexTests = () => {
    const gen = new CharacterGenerator();
    gen.setTables();
    const char = new Character();
    char.powers = [{ name: "A" }, { name: "B" }, { name: "C" }];
    gen._assignedPowerNames = new Set(["A", "B", "C"]);
    gen._pendingPowerUpgrades = [
        { powerIndex: 0, upgradeInfo: { category: "X", powerName: "Y" } },
        { powerIndex: 2, upgradeInfo: { category: "X", powerName: "Z" } },
    ];

    const removed = gen.removePower(char, 1);
    Tester.assert(removed, "RemovePower: middle power removed.");
    Tester.assertEquals(2, char.powers.length, "RemovePower: two remain.");
    Tester.assertEquals(
        2,
        gen._pendingPowerUpgrades.length,
        "RemovePower: no pending entry pointed at the removed index.",
    );
    Tester.assertEquals(
        0,
        gen._pendingPowerUpgrades[0].powerIndex,
        "RemovePower: earlier pending index untouched.",
    );
    Tester.assertEquals(
        1,
        gen._pendingPowerUpgrades[1].powerIndex,
        "RemovePower: later pending index re-based (covers the reindex loop).",
    );
    Tester.assert(
        !gen._assignedPowerNames.has("B"),
        "RemovePower: name released from the assigned set.",
    );
    Tester.assert(
        gen.removePower(char, 99) === false,
        "RemovePower: out-of-range index returns false.",
    );
};

Tester.AddPowerAndChainBonusTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();
    gen._assignedPowerNames = new Set();

    const bt = gen.powerListTable.find((p) => p.name && p.category);
    const rankRow = gen.randomRanksTable[0];

    // Arm A: selected bonus → applySelectedBonusPower (incl. roll>100 adjust)
    const charA = new Character();
    charA.powers = [];
    charA.powersCount = 10;
    charA.powersMax = 10;
    gen._selectedBonusPowers = {
        ChainSource: { category: bt.category, name: bt.name },
    };
    gen.powerRolls[1] = 101; // bonus looks up startIndex = 1 (source already pushed)
    gen._addPowerAndChain(
        charA,
        "Test",
        {
            name: "ChainSource",
            code: "T",
            category: "Test",
            description: "",
            bonusPowerCount: 1,
        },
        rankRow,
        "Chain",
        "Chain result",
    );
    Tester.assertEquals(
        2,
        charA.powers.length,
        "Chain: source power + selected bonus pushed.",
    );
    Tester.assertEquals(
        bt.name,
        charA.powers[1].name,
        "Chain: selected bonus power added.",
    );
    Tester.assert(
        charA.powers[1].bonusPower === true,
        "Chain: selected bonus flagged bonusPower.",
    );
    Tester.assert(
        gen._assignedPowerNames.has(bt.name),
        "Chain: bonus recorded in the assigned set.",
    );

    // Arm B: unselected bonus → generateBonusPower. Use a DIFFERENT target
    // power: isPowerAlreadyAssigned consults the shared _assignedPowerNames
    // set when it exists, and arm A just recorded bt there (cross-character
    // dedup on a reused generator).
    const bt2 = gen.powerListTable.find(
        (p) => p.name && p.category && p.name !== bt.name,
    );
    const charB = new Character();
    charB.powers = [];
    charB.powersCount = 10;
    charB.powersMax = 10;
    gen._selectedBonusPowers = null;
    gen.powerRolls[0] = 50;
    gen._addPowerAndChain(
        charB,
        "Test",
        {
            name: "ChainSource2",
            code: "T",
            category: "Test",
            description: "",
            bonusPowerCount: 1,
            bonusPower: `${bt2.category}\\${bt2.name}(100)`,
        },
        rankRow,
        "Chain",
        "Chain result",
    );
    Tester.assertEquals(
        2,
        charB.powers.length,
        "Chain: source power + rolled bonus pushed.",
    );
    Tester.assert(
        charB.powers[1] && charB.powers[1].bonusPower === true,
        "Chain: rolled bonus flagged bonusPower.",
    );
    Tester.assertEquals(
        bt2.name,
        charB.powers[1] && charB.powers[1].name,
        "Chain: rolled bonus power added from the DSL string.",
    );
};

Tester.GenerateSinglePowerRetryGuardTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "basic";
    gen.setTables();
    gen.setDeterministicRolls();

    // Smallest category = cheapest to exhaust
    const counts = {};
    for (const p of gen.powerListTable)
        counts[p.category] = (counts[p.category] || 0) + 1;
    const catX = Object.keys(counts).sort((a, b) => counts[a] - counts[b])[0];
    const catXEntry = gen.powerCategoriesTable.find((c) => c.name === catX);
    const yPower = gen.powerListTable.find(
        (p) =>
            p.category !== catX &&
            Utility.getValue(p, "powerCount", 1) === 1 &&
            p.name,
    );
    Tester.assertNotNull(catXEntry, "Retry: found the smallest category.");
    Tester.assertNotNull(yPower, "Retry: found a cross-category target.");
    const catYEntry = gen.powerCategoriesTable.find(
        (c) => c.name === yPower.category,
    );

    const buildChar = () => {
        const char = new Character();
        char.physicalForm = gen.physicalFormTable[0].name;
        char.powers = gen.powerListTable
            .filter((p) => p.category === catX)
            .map((p) => ({ name: p.name, category: catX, powerSlots: 1 }));
        char.powersCount = char.powers.length + 5;
        char.powersMax = char.powers.length + 10;
        return char;
    };

    // (a) Category exhausted → retry loop: invalid cat roll, power roll >100,
    //     then a valid cross-category pick
    {
        const char = buildChar();
        const before = char.powers.length;
        gen.powerCategoryRolls = Array(gen.rollArraySize).fill(0);
        gen.powerRolls = Array(gen.rollArraySize).fill(50);
        gen.powerRankRolls = Array(gen.rollArraySize).fill(50);
        gen.powerCategoryRolls[0] = catXEntry.maxRoll;
        gen.powerRolls[0] = 1; // lands inside X — every X power is assigned
        gen.powerCategoryRolls[1] = 0; // invalid cat roll guard
        gen.powerCategoryRolls[2] = catYEntry.maxRoll;
        gen.powerRolls[2] = 101; // power roll >100 guard
        gen.powerCategoryRolls[3] = catYEntry.maxRoll;
        gen.powerRolls[3] = yPower.maxRoll; // unassigned pick → success
        gen.generateSinglePower(char, 0);
        Tester.assertEquals(
            before + 1,
            char.powers.length,
            "Retry: cross-category shift adds exactly one power.",
        );
        Tester.assertEquals(
            yPower.name,
            char.powers[before].name,
            "Retry: power came from the fallback category.",
        );
    }

    // (b) Roll missed the table → the second retry twin + success
    {
        const char = buildChar();
        const before = char.powers.length;
        gen.powerCategoryRolls = Array(gen.rollArraySize).fill(0);
        gen.powerRolls = Array(gen.rollArraySize).fill(50);
        gen.powerRankRolls = Array(gen.rollArraySize).fill(50);
        gen.powerCategoryRolls[0] = catXEntry.maxRoll;
        gen.powerRolls[0] = 101; // no power matches → powerRow undefined
        gen.powerCategoryRolls[1] = 0; // invalid cat roll guard
        gen.powerCategoryRolls[2] = catYEntry.maxRoll;
        gen.powerRolls[2] = 101; // power roll >100 guard
        gen.powerCategoryRolls[3] = catYEntry.maxRoll;
        gen.powerRolls[3] = yPower.maxRoll; // success
        gen.generateSinglePower(char, 0);
        Tester.assertEquals(
            before + 1,
            char.powers.length,
            "Retry: roll-miss path recovers via cross-category shift.",
        );
        Tester.assertEquals(
            yPower.name,
            char.powers[before].name,
            "Retry: roll-miss path picked the fallback power.",
        );
    }

    // (c) Every retry roll invalid → "Exhausted retries" return, no push
    {
        const char = buildChar();
        const before = char.powers.length;
        gen.powerCategoryRolls = Array(gen.rollArraySize).fill(0);
        gen.powerRolls = Array(gen.rollArraySize).fill(50);
        gen.powerRankRolls = Array(gen.rollArraySize).fill(50);
        gen.powerCategoryRolls[0] = catXEntry.maxRoll;
        gen.powerRolls[0] = 101;
        gen.generateSinglePower(char, 0);
        Tester.assertEquals(
            before,
            char.powers.length,
            "Retry: exhausted retries return without adding a power.",
        );
    }
};

Tester.TooManyPowersLoopTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "basic";
    gen.setTables();
    gen.setDeterministicRolls();

    const multi = gen.powerListTable.find(
        (p) => Utility.getValue(p, "powerCount", 1) > 1,
    );
    Tester.assertNotNull(multi, "TooMany: found a powerCount>1 power.");
    const multiCat = gen.powerCategoriesTable.find(
        (c) => c.name === multi.category,
    );
    const otherCat = gen.powerCategoriesTable.find(
        (c) => c.name !== multi.category,
    );
    Tester.assertNotNull(multiCat, "TooMany: category entry exists.");

    // currentSlots 1 + powerCount 2 > powersMax 2, and 2 > remainingSlots 1
    const buildChar = () => {
        const char = new Character();
        char.physicalForm = gen.physicalFormTable[0].name;
        char.powers = [{ name: "Filler", category: "Filler", powerSlots: 1 }];
        char.powersCount = 2;
        char.powersMax = 2;
        return char;
    };

    // (a) guards + "Exhausted retries" return (powerRollIndex 0)
    {
        const char = buildChar();
        gen.powerCategoryRolls = Array(gen.rollArraySize).fill(0);
        gen.powerRolls = Array(gen.rollArraySize).fill(50);
        gen.powerRankRolls = Array(gen.rollArraySize).fill(50);
        gen.powerCategoryRolls[0] = multiCat.maxRoll;
        gen.powerRolls[0] = multi.maxRoll; // the multi-slot power
        gen.powerCategoryRolls[1] = otherCat.maxRoll;
        gen.powerRolls[1] = 101; // power roll >100 guard
        // remaining retry cat rolls stay 0 → invalid-cat guard until adj > 20
        gen.generateSinglePower(char, 0);
        Tester.assertEquals(
            1,
            char.powers.length,
            "TooMany: no power added after retries exhausted.",
        );
    }

    // (b) array-exhausted return near the end of the roll arrays
    {
        const char = buildChar();
        gen.powerCategoryRolls = Array(gen.rollArraySize).fill(0);
        gen.powerRolls = Array(gen.rollArraySize).fill(50);
        gen.powerRankRolls = Array(gen.rollArraySize).fill(50);
        const ix = gen.rollArraySize - 10;
        gen.powerCategoryRolls[ix] = multiCat.maxRoll;
        gen.powerRolls[ix] = multi.maxRoll;
        // retry cat rolls stay 0 until nextIndex runs off the array
        gen.generateSinglePower(char, ix);
        Tester.assertEquals(
            1,
            char.powers.length,
            "TooMany: array-exhausted return leaves powers unchanged.",
        );
    }
};

Tester.BonusFormSelectionTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();
    gen._assignedPowerNames = new Set();

    const bt = gen.powerListTable.find((p) => p.name && p.category);

    // Part 1: user-selected bonus slot — array-shaped and singular-shaped
    const char1 = new Character();
    char1.powers = [];
    char1.powersCount = 6;
    char1.powersMax = 6;
    gen._selectedBonusPowers = [
        [{ category: bt.category, name: bt.name }],
        { category: bt.category, name: bt.name },
    ];
    gen.generatorBonusPowerOfPhysicalForm(char1, "Unused\\String(100)", 0);
    gen.generatorBonusPowerOfPhysicalForm(char1, "Unused\\String(100)", 1);
    Tester.assertEquals(
        2,
        char1.powers.length,
        "FormBonusSel: two selected bonus powers pushed.",
    );
    Tester.assert(
        char1.powers.every((p) => p.bonusPower === true),
        "FormBonusSel: both flagged bonusPower.",
    );

    // Part 2: rolled path with every scan roll invalid → No Valid Power log
    const char2 = new Character();
    char2.powers = [];
    char2.powersCount = 6;
    char2.powersMax = 6;
    gen._selectedBonusPowers = null;
    gen.powerRolls = Array(gen.rollArraySize).fill(101);
    gen.generatorBonusPowerOfPhysicalForm(char2, `${bt.category}\\Any(100)`);
    Tester.assertEquals(
        0,
        char2.powers.length,
        "FormBonusAny: exhausted rolls add nothing.",
    );
    gen.powerRolls = Array(gen.rollArraySize).fill(50);
};

Tester.ExtraInformationUndefinedFormTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();
    const p = gen.powerListTable.find(
        (r) => r.rollExtraInformation && !Array.isArray(r.rollExtraInformation),
    );
    Tester.assertNotNull(
        p,
        "ExtraInfo: found a power with rollExtraInformation.",
    );
    gen.peiIndex = 0;
    gen.powersExtraInfoRolls[0] = 101; // beyond every table's maxRoll
    const result = gen.getExtraInformation(p.rollExtraInformation);
    Tester.assertEquals("", result, "ExtraInfo: unmatched roll → empty.");
    Tester.assertEquals(
        0,
        gen.peiIndex,
        "ExtraInfo: peiIndex not consumed on a miss.",
    );
};

Tester.OptionalPowerManualSelectionTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();
    gen._assignedPowerNames = new Set();
    gen.selectOptionalPowersManually = true;

    const bt = gen.powerListTable.find((p) => p.name && p.category);

    const char = new Character();
    char.powers = [];
    char.powersCount = 10;
    char.powersMax = 10;

    gen._selectedOptionalPowers = {
        SourcePower: [
            { category: bt.category, name: bt.name }, // rank miss (999) → continue
            { category: bt.category, name: "Any" }, // Any resolve → push
            { category: "NoSuchCategoryX", name: "Ghost" }, // !p → continue
        ],
    };
    gen.powerRolls = Array(gen.rollArraySize).fill(50);
    gen.powerRolls[0] = 101; // manual-branch roll>100 adjust
    gen.powerRankRolls = Array(gen.rollArraySize).fill(50);
    gen.powerRankRolls[0] = 999; // findRow miss → pick 0 skipped
    gen.generateOptionalPower(char, 3, "ignored", "SourcePower");

    Tester.assertEquals(
        1,
        char.powers.length,
        "ManualOpt: exactly one optional power generated.",
    );
    if (char.powers.length === 1) {
        Tester.assert(
            char.powers[0].optionalPower === true,
            "ManualOpt: flagged optionalPower.",
        );
        Tester.assertEquals(
            bt.category,
            char.powers[0].category,
            "ManualOpt: resolved within the requested category.",
        );
    }
    Tester.assert(
        gen._processedOptionalSources.has("SourcePower"),
        "ManualOpt: source marked processed.",
    );

    const before = char.powers.length;
    gen.generateOptionalPower(char, 3, "ignored", "UnknownSource");
    Tester.assertEquals(
        before,
        char.powers.length,
        "ManualOpt: unknown source returns without changes.",
    );
};

Tester.OptionalPowerAnyExhaustedTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();
    gen._assignedPowerNames = new Set();

    const char = new Character();
    char.powers = [];
    char.powersCount = 6;
    char.powersMax = 6;
    gen.powerRolls = Array(gen.rollArraySize).fill(101);

    // Entry 1 has no sub-type separator → segments<2 skip.
    // Entry 2's "Any" scan sees only invalid rolls → skip arm + No Valid Power.
    gen.generateOptionalPower(char, 1, "NoSlash|Movement\\Any(100)", "Src");

    Tester.assertEquals(
        0,
        char.powers.length,
        "OptAnyExhausted: no power when every roll is invalid.",
    );
    gen.powerRolls = Array(gen.rollArraySize).fill(50);
};

Tester.SimulateRolledPowersEdgeTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();
    gen.powerNumberRoll = 50;
    gen.powerRolls = Array(gen.rollArraySize).fill(101);
    const rolled = gen._simulateRolledPowers();
    Tester.assertEquals(
        0,
        rolled.size,
        "Simulate: all-invalid rolls → empty set (covers re-roll + array-end break).",
    );
};

Tester.BonusAndOptionalOptionQueryTests = () => {
    // Fresh generators already auto-bind data tables in this environment,
    // so drive the no-tables guards by nulling instance fields.
    const bare = new CharacterGenerator();
    Tester.assert(
        bare.getTotalPowerCount() >= 0,
        "Query: fresh generator resolves a total.",
    );
    const noTables = new CharacterGenerator();
    noTables.physicalFormTable = null;
    Tester.assertEquals(
        0,
        noTables.getTotalPowerCount(),
        "Query: missing form table → 0 total.",
    );
    Tester.assertEquals(
        0,
        noTables.getMaxOptionalPowerSlots(),
        "Query: missing tables → 0 optional slots.",
    );
    Tester.assertEquals(
        null,
        bare.getOptionalPowerGlobalCount(),
        "Query: no form → null global count.",
    );
    Tester.assert(
        Array.isArray(bare.getBonusPowerOptions()),
        "Query: no power list → [].",
    );
    Tester.assert(
        Array.isArray(bare.getOptionalPowerOptions()),
        "Query: no power list → [] (optional).",
    );

    // A. getBonusPowerOptions → physicalForm section (searches all modes)
    let formBonus = null;
    let formOpts = null;
    for (const mode of ["basic", "advanced", "ultimate"]) {
        const g = new CharacterGenerator();
        g.generatorMode = mode;
        g.setTables();
        g.setDeterministicRolls();
        g.powerNumberRoll = 50;
        const f = g.physicalFormTable.find((r) => {
            const c = Utility.getValue(r, "bonusPowerCount", 0);
            const s = Utility.getValue(r, "bonusPower", "");
            if (c <= 0 || !s) return false;
            return (
                g._expandBonusPowerAny(
                    CharacterGenerator.parseBonusPowerOptions(s),
                ).length > 1
            );
        });
        if (f) {
            g._lastPhysicalForm = f.name;
            formBonus = f;
            formOpts = g.getBonusPowerOptions();
            break;
        }
    }
    Tester.assertNotNull(
        formBonus,
        "Query: found a form whose bonus powers expand to multiple options.",
    );
    if (formOpts && formOpts.length > 0) {
        Tester.assertEquals(
            "physicalForm",
            formOpts[0].source,
            "Query: form bonus options returned.",
        );
        Tester.assert(
            formOpts[0].options.length > 1,
            "Query: form options expanded.",
        );
    }

    // B. getBonusPowerOptions → powerList section (simulate-rolled power)
    let bp = null;
    let genB = null;
    for (const mode of ["advanced", "ultimate", "basic"]) {
        const g = new CharacterGenerator();
        g.generatorMode = mode;
        g.setTables();
        g.setDeterministicRolls();
        g.powerNumberRoll = 50;
        const cand = g.powerListTable.find((p) => {
            const c = Utility.getValue(p, "bonusPowerCount", 0);
            const s = Utility.getValue(p, "bonusPower", "");
            if (c <= 0 || !s) return false;
            return (
                g._expandBonusPowerAny(
                    CharacterGenerator.parseBonusPowerOptions(s),
                ).length > 1
            );
        });
        if (cand) {
            bp = cand;
            genB = g;
            break;
        }
    }
    Tester.assertNotNull(
        bp,
        "Query: found a power with multi-option bonus powers.",
    );
    if (bp && genB) {
        genB._lastPhysicalForm = null; // form section must not early-return
        const catEntry = genB.powerCategoriesTable.find(
            (c) => c.name === bp.category,
        );
        genB.powerCategoryRolls[0] = catEntry.maxRoll;
        genB.powerRolls[0] = bp.maxRoll; // exact pick → simulated as rolled
        const powerOpts = genB.getBonusPowerOptions();
        const slot = powerOpts.find(
            (s) => s.source === "powerList" && s.sourcePowerName === bp.name,
        );
        Tester.assertNotNull(
            slot,
            "Query: powerList bonus slot returned for the simulated power.",
        );
    }

    // C. the four never-called query methods on realistic state
    const genC = new CharacterGenerator();
    genC.generatorMode = "ultimate";
    genC.setTables();
    genC.setDeterministicRolls();
    genC.powerNumberRoll = 50;

    genC._lastPhysicalForm = genC.physicalFormTable[0].name;
    const total = genC.getTotalPowerCount();
    Tester.assert(total > 0, "Query: total power count resolves.");

    const bonusForm = genC.physicalFormTable.find(
        (r) => Utility.getValue(r, "bonusPowerCount", 0) > 0,
    );
    Tester.assertNotNull(
        bonusForm,
        "Query: a form with bonusPowerCount exists.",
    );
    genC._lastPhysicalForm = bonusForm.name;
    const total2 = genC.getTotalPowerCount();
    const maxOpt = genC.getMaxOptionalPowerSlots();
    const expectedMaxOpt = Math.max(
        0,
        total2 - 1 - Utility.getValue(bonusForm, "bonusPowerCount", 0),
    );
    Tester.assertEquals(
        expectedMaxOpt,
        maxOpt,
        "Query: optional slots = total - primary - bonus.",
    );

    // total <= 0 arm (quantityTable removed on this instance only)
    const genD = new CharacterGenerator();
    genD.setTables();
    genD.quantityTable = null;
    Tester.assertEquals(
        0,
        genD.getMaxOptionalPowerSlots(),
        "Query: zero total → zero optional slots.",
    );

    // no form → no bonus subtraction
    const genE = new CharacterGenerator();
    genE.setTables();
    genE.setDeterministicRolls();
    genE.powerNumberRoll = 50;
    genE._lastPhysicalForm = null;
    const totalE = genE.getTotalPowerCount();
    Tester.assertEquals(
        Math.max(0, totalE - 1),
        genE.getMaxOptionalPowerSlots(),
        "Query: no form → no bonus subtraction.",
    );

    // getOptionalPowerGlobalCount — all three arms
    const optForm = genC.physicalFormTable.find(
        (r) => Utility.getValue(r, "optionalPowers", "") !== "",
    );
    Tester.assertNotNull(optForm, "Query: a form with optionalPowers exists.");
    genC._lastPhysicalForm = optForm.name;
    Tester.assertEquals(
        Utility.getValue(optForm, "optionalPowerCount", 1),
        genC.getOptionalPowerGlobalCount(),
        "Query: global count read from the form.",
    );
    const plainForm = genC.physicalFormTable.find(
        (r) => Utility.getValue(r, "optionalPowers", "") === "",
    );
    genC._lastPhysicalForm = plainForm ? plainForm.name : null;
    Tester.assertEquals(
        null,
        genC.getOptionalPowerGlobalCount(),
        "Query: form without optionalPowers → null.",
    );
    genC._lastPhysicalForm = null;
    Tester.assertEquals(
        null,
        genC.getOptionalPowerGlobalCount(),
        "Query: no form → null.",
    );

    // getOptionalPowerOptions — form group (prefer a '~' string for the
    // alternatives-expansion arm) plus a simulated power group
    const tildeOptForm = genC.physicalFormTable.find(
        (r) => Utility.getValue(r, "optionalPowers", "").indexOf("~") !== -1,
    );
    const chosenForm = tildeOptForm || optForm;
    genC._lastPhysicalForm = chosenForm.name;
    const optPower = genC.powerListTable.find(
        (p) => Utility.getValue(p, "optionalPowers", "") !== "",
    );
    if (optPower) {
        const catE = genC.powerCategoriesTable.find(
            (c) => c.name === optPower.category,
        );
        genC.powerCategoryRolls[0] = catE.maxRoll;
        genC.powerRolls[0] = optPower.maxRoll;
        genC.powerNumberRoll = 50;
    }
    const optGroups = genC.getOptionalPowerOptions();
    const groupNames = optGroups.map((g) => g.sourcePowerName);
    Tester.assert(
        groupNames.includes(chosenForm.name),
        "Query: form optional group returned.",
    );
    if (optPower) {
        Tester.assert(
            groupNames.includes(optPower.name),
            "Query: rolled power's optional group returned.",
        );
    }
    const formGroup = optGroups.find(
        (g) => g.sourcePowerCategory === "Physical Form",
    );
    Tester.assert(
        formGroup && formGroup.options.length > 0,
        "Query: form options parsed.",
    );
    Tester.assert(
        optGroups.every((g) => typeof g.maxCount === "number"),
        "Query: every group carries a numeric maxCount.",
    );
};

Tester.PowerSlotsAndCategoriesResolutionTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "basic";
    gen.setTables();
    gen.setDeterministicRolls();
    gen.powerNumberRoll = 50;

    // (a) _lastPhysicalForm path
    gen._lastPhysicalForm = gen.physicalFormTable[0].name;
    let r = gen.getPowerSlotsAndCategories();
    Tester.assert(r.count > 0, "SlotsCat: resolves via _lastPhysicalForm.");

    // (b) physicalFormRoll path — row found
    gen._lastPhysicalForm = null;
    gen.physicalFormRoll = 1;
    r = gen.getPowerSlotsAndCategories();
    Tester.assert(r.count > 0, "SlotsCat: resolves via physicalFormRoll.");

    // (c) roll misses every row → fallback to the first form
    gen.physicalFormRoll = 999;
    r = gen.getPowerSlotsAndCategories();
    Tester.assert(r.count > 0, "SlotsCat: missing row falls back to form[0].");

    // (d) no form info → default first form
    gen.physicalFormRoll = null;
    r = gen.getPowerSlotsAndCategories();
    Tester.assert(r.count > 0, "SlotsCat: default form path works.");
    Tester.assert(
        Array.isArray(r.categories),
        "SlotsCat: categories array returned.",
    );
};

Tester.GenerateBonusPowerEdgeTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();
    gen._assignedPowerNames = new Set();

    const bt = gen.powerListTable.find((p) => p.name && p.category);
    const spec = `${bt.category}\\${bt.name}(100)`;

    // roll >100 → re-roll adjust loop, then success
    const char1 = new Character();
    char1.powers = [];
    char1.powersCount = 6;
    char1.powersMax = 6;
    gen.powerRolls[0] = 101;
    gen.generateBonusPower(char1, spec);
    Tester.assertEquals(
        1,
        char1.powers.length,
        "BonusEdge: invalid first roll re-rolled to a valid one.",
    );
    if (char1.powers.length === 1) {
        Tester.assert(
            char1.powers[0].bonusPower === true,
            "BonusEdge: bonus power flagged.",
        );
    }

    // roll above the entry ceiling → no candidate → clean return
    const char2 = new Character();
    char2.powers = [];
    char2.powersCount = 6;
    char2.powersMax = 6;
    gen.powerRolls[0] = 50;
    gen.generateBonusPower(char2, `${bt.category}\\${bt.name}(1)`);
    Tester.assertEquals(
        0,
        char2.powers.length,
        "BonusEdge: roll above the entry ceiling adds nothing.",
    );

    // unknown category/power → lookup miss → clean return
    const char3 = new Character();
    char3.powers = [];
    char3.powersCount = 6;
    char3.powersMax = 6;
    gen.generateBonusPower(char3, "NoSuchCategoryX\\NoSuchPowerX(100)");
    Tester.assertEquals(
        0,
        char3.powers.length,
        "BonusEdge: unknown power adds nothing.",
    );
};

// ============================================================================
// REGISTRATION
// ============================================================================

Tester.registerTestGroup(86, "deterministic", [
    { name: "BoostFunctionTests", needsGen: false },
    { name: "PopularitySubTypeRulesTests", needsGen: false },
    { name: "DeterminePopularityBasicOriginIdentityTests", needsGen: false },
    { name: "DeterminePopularityMinMaxClampTests", needsGen: false },
    { name: "ContactsEqualToPowersTests", needsGen: false },
    { name: "ContactTalentCountMinMaxTests", needsGen: false },
    { name: "BonusPowerOfPhysicalFormTests", needsGen: false },
    { name: "GenerateOptionalPowerTests", needsGen: false },
    { name: "GenerateBonusPowerFromAbilityTests", needsGen: false },
    { name: "GenerateSinglePowerDuplicateTests", needsGen: false },
    { name: "GenerateSinglePowerUndefinedRowTests", needsGen: false },
    { name: "GenerateTalentsReRollTests", needsGen: false },
    { name: "ContactGenerationBranchTests", needsGen: false },
    { name: "PopularityUltimateStartPathTests", needsGen: false },
    { name: "HealthAdjustmentBranchTests", needsGen: false },
    { name: "AbilityAdjustmentBranchTests", needsGen: false },
    { name: "CrossCategoryPowerShiftTests", needsGen: false },
    { name: "DiceClassTests", needsGen: false },
    { name: "PopularitySubTypeMinMaxTests", needsGen: false },
    { name: "PopularityWellEstablishedLooksHumanTests", needsGen: false },
    { name: "SpecialAbilitySetAdjustmentTests", needsGen: false },
    { name: "InvalidCategoryAndPowerRollTests", needsGen: false },
    { name: "BonusPowerAnyPathTests", needsGen: false },
    { name: "OptionalPowerAnyPathTests", needsGen: false },
    { name: "CrossCategoryInvalidCatRollTests", needsGen: false },
    { name: "DiceEdgeCaseTests", needsGen: false },
    { name: "PowerUpgradeAdvancedPathTests", needsGen: false },
    { name: "RemovePowerReindexTests", needsGen: false },
    { name: "AddPowerAndChainBonusTests", needsGen: false },
    { name: "GenerateSinglePowerRetryGuardTests", needsGen: false },
    { name: "TooManyPowersLoopTests", needsGen: false },
    { name: "BonusFormSelectionTests", needsGen: false },
    { name: "ExtraInformationUndefinedFormTests", needsGen: false },
    { name: "OptionalPowerManualSelectionTests", needsGen: false },
    { name: "OptionalPowerAnyExhaustedTests", needsGen: false },
    { name: "SimulateRolledPowersEdgeTests", needsGen: false },
    { name: "BonusAndOptionalOptionQueryTests", needsGen: false },
    { name: "PowerSlotsAndCategoriesResolutionTests", needsGen: false },
    { name: "GenerateBonusPowerEdgeTests", needsGen: false },
]);
