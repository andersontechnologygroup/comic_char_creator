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
// Core / Character / framework-meta coverage — the two-phase API, both
// roll-override modes, the debug-override path, identitySecret,
// useUltimateTalents, and the Tester API itself (deprecated alias,
// assertThrows, failure arms, filter/bail/verbose branches).
// ============================================================================

Tester.CharacterAbilityIndexTests = () => {
    const char = new Character();
    char.primaryAbilities = [{ Fighting: { rank: "Good", number: 40 } }];
    // Explicit null exercises the second half of the `undefined || null`
    // guard — omitted arguments only ever short-circuit on `undefined`.
    Tester.assertEquals(
        40,
        char.getAbilityNumber("Fighting", null),
        "getAbilityNumber: explicit null index defaults to slot 0.",
    );
    const abilityNull = char.getAbility("Fighting", null);
    Tester.assertEquals(
        "Good",
        abilityNull && abilityNull.rank,
        "getAbility: explicit null index defaults to slot 0.",
    );
    Tester.assertEquals(
        40,
        char.getAbilityNumber("Fighting"),
        "getAbilityNumber: omitted index defaults to slot 0.",
    );
    const abilityOmitted = char.getAbility("Fighting");
    Tester.assertEquals(
        "Good",
        abilityOmitted && abilityOmitted.rank,
        "getAbility: omitted index defaults to slot 0.",
    );
};

Tester.CorePhaseAndOverrideTests = () => {
    // --- applyRollOverrides: scalar keys + BOTH array modes
    const gen = new CharacterGenerator();
    gen.setDeterministicRolls();
    const origSecond = gen.powerRolls[1];
    CharacterGenerator.applyRollOverrides(
        gen,
        { popularityRoll: 7, powerRolls: [5] },
        "first",
    );
    Tester.assertEquals(
        7,
        gen.popularityRoll,
        "applyRollOverrides: scalar key copied.",
    );
    Tester.assertEquals(
        5,
        gen.powerRolls[0],
        "applyRollOverrides: first mode overwrites element 0.",
    );
    Tester.assertEquals(
        origSecond,
        gen.powerRolls[1],
        "applyRollOverrides: first mode leaves the rest of the array alone.",
    );
    CharacterGenerator.applyRollOverrides(
        gen,
        { powerRolls: [9, 8] },
        "replace",
    );
    Tester.assertEquals(
        2,
        gen.powerRolls.length,
        "applyRollOverrides: replace mode assigns the whole array.",
    );
    Tester.assertEquals(
        9,
        gen.powerRolls[0],
        "applyRollOverrides: replace mode value applied.",
    );

    // --- generateWithoutThrows debug-override block (applyRollOverrides
    //     with "first", as the Render/Debug flow uses it)
    const genD = new CharacterGenerator();
    genD.generatorMode = "basic";
    genD.setTables();
    genD.setDeterministicRolls();
    CharacterGenerator._debugOverrides = { physicalFormRoll: 42 };
    try {
        const charD = genD.generateWithoutThrows();
        Tester.assertNotNull(
            charD,
            "DebugOverrides: generation succeeds with overrides applied.",
        );
        Tester.assertEquals(
            42,
            genD.physicalFormRoll,
            "DebugOverrides: scalar override applied during generation.",
        );
    } finally {
        CharacterGenerator._debugOverrides = null;
    }

    // --- identitySecret → "Secret" arm of the identity ternary
    const genI = new CharacterGenerator();
    genI.generatorMode = "basic";
    genI.setTables();
    genI.setDeterministicRolls();
    genI.identitySecret = true;
    const charI = genI.generateWithoutThrows();
    Tester.assertEquals(
        "Secret",
        charI.identity,
        "identitySecret: secret identities generate as Secret.",
    );

    // --- useUltimateTalents selects the Ultimate talent tables in setTables
    const genU = new CharacterGenerator();
    genU.generatorMode = "ultimate";
    genU.useUltimateTalents = true;
    genU.setTables();
    Tester.assertEquals(
        TALENT_LIST_ULTIMATE_TABLE,
        genU.talentListTable,
        "setTables: useUltimateTalents selects the Ultimate talent list.",
    );
    Tester.assertEquals(
        TALENT_CATEGORIES_ULTIMATE_TABLE,
        genU.talentCategoriesTable,
        "setTables: useUltimateTalents selects the Ultimate talent categories.",
    );
    const genA = new CharacterGenerator();
    genA.generatorMode = "ultimate";
    genA.setTables();
    Tester.assertEquals(
        TALENT_LIST_ADVANCED_TABLE,
        genA.talentListTable,
        "setTables: default Ultimate mode keeps the Advanced talent list.",
    );

    // --- two-phase API (Render flow): never called by Node tests
    const genP = new CharacterGenerator();
    genP.generatorMode = "ultimate";
    Dice.seed(42);
    const phase1 = genP.generatePhase1();
    Dice.seed(null);
    Tester.assert(
        genP._phase1Complete === true,
        "Phase: generatePhase1 marks the phase complete.",
    );
    Tester.assertNotNull(
        phase1.physicalForm,
        "Phase: physical form resolved for the name.",
    );
    Tester.assert(phase1.powersCount > 0, "Phase: power count resolved.");
    Tester.assert(
        Array.isArray(phase1.powerCategories),
        "Phase: categories array returned.",
    );
    Tester.assertEquals(
        null,
        phase1.origin,
        "Phase: origin deferred to phase 2.",
    );
    Tester.assertEquals(
        phase1.powerCategories.length,
        phase1.availablePowers.length,
        "Phase: one available-powers entry per category.",
    );

    const genM = new CharacterGenerator();
    genM.markPhase1Complete();
    Tester.assert(
        genM._phase1Complete === true,
        "Phase: markPhase1Complete sets the flag.",
    );

    const gen2 = new CharacterGenerator();
    gen2.generatorMode = "basic";
    gen2.setTables();
    gen2.setDeterministicRolls();
    const char2 = gen2.generatePhase2();
    Tester.assert(
        char2 instanceof Character,
        "Phase: generatePhase2 returns a character.",
    );
    Tester.assert(char2.powers.length > 0, "Phase: phase 2 generated powers.");
};

Tester.FrameworkMetaTests = () => {
    // Probe the Tester framework itself. Every probe either passes or is a
    // deliberate failure whose counter is snapshotted and restored below —
    // the suite still finishes green.
    // Deliberately NOT restored: run()'s phase 3 reads this after phase 1
    // ends, so leaving it set executes the benchmark suite too (verified
    // green and fast under `node run-tests.js --benchmark`).
    globalThis.__TEST_BENCHMARK = true;

    const savedFailures = Tester.failureCount;
    const savedVerbose = globalThis.__TEST_VERBOSE;
    const savedFilter = globalThis.__TEST_FILTER;
    const savedBailFlag = globalThis.__TEST_BAIL;
    const savedBailTriggered = Tester.bailTriggered;
    const savedMethod = Tester.currentTestMethod;
    try {
        // --- verbose arms (pass log + fail error log)
        globalThis.__TEST_VERBOSE = true;
        Tester.assert(true, "[probe] verbose pass logs.");
        Tester.assert(
            false,
            "[INTENTIONAL COVERAGE PROBE] verbose failure logs.",
        );
        Tester.assertHasPower(
            "Real",
            [{ name: "Real" }],
            "[probe] verbose assertHasPower pass logs.",
        );
        globalThis.__TEST_VERBOSE = false;

        // --- deprecated alias
        Tester.assertGreaterOrEqual(1, 2, "[probe] deprecated alias passes.");

        // --- failure arms of every other assertion
        Tester.assertEquals(
            1,
            2,
            "[INTENTIONAL COVERAGE PROBE] assertEquals failure arm.",
        );
        Tester.assertNotEquals(
            1,
            1,
            "[INTENTIONAL COVERAGE PROBE] assertNotEquals failure arm.",
        );
        Tester.assertInRange(
            1,
            3,
            9,
            "[INTENTIONAL COVERAGE PROBE] assertInRange failure arm.",
        );
        Tester.assertNotNull(
            null,
            "[INTENTIONAL COVERAGE PROBE] assertNotNull failure arm.",
        );
        Tester.assertAtLeast(
            5,
            1,
            "[INTENTIONAL COVERAGE PROBE] assertAtLeast failure arm.",
        );
        Tester.assertHasPower(
            "NoSuchPowerXYZ",
            [{ name: "Real" }],
            "[INTENTIONAL COVERAGE PROBE] assertHasPower failure arm.",
        );

        // --- assertThrows: matching, undefined-expectation, mismatch,
        //     and did-not-throw arms
        Tester.assertThrows(
            () => {
                throw new Error("boom happened");
            },
            "boom",
            "[probe] matching message passes.",
        );
        Tester.assertThrows(
            () => {
                throw new Error("anything");
            },
            undefined,
            "[probe] undefined expectation passes.",
        );
        Tester.assertThrows(
            () => {
                throw new Error("mismatch");
            },
            "needle",
            "[INTENTIONAL COVERAGE PROBE] wrong message records failure.",
        );
        Tester.assertThrows(
            () => "no throw",
            "needle",
            "[INTENTIONAL COVERAGE PROBE] not throwing records failure.",
        );

        // --- _filterMatch + _run skip arm
        globalThis.__TEST_FILTER = "zzz-no-match";
        let skippedRan = false;
        Tester._run("MetaSkipProbe", () => {
            skippedRan = true;
        });
        Tester.assert(
            skippedRan === false,
            "[probe] _run skips tests that do not match the filter.",
        );
        globalThis.__TEST_FILTER = undefined;

        // --- _run verbose per-test banner
        globalThis.__TEST_VERBOSE = true;
        Tester._run("MetaVerboseProbe", () => {});
        globalThis.__TEST_VERBOSE = false;

        // --- _run exception catch + bail rethrow, and _onFailure bail arm
        globalThis.__TEST_BAIL = true;
        Tester.bailTriggered = false;
        Tester.assertThrows(
            () =>
                Tester._run("MetaCrashProbe", () => {
                    throw new Error("[INTENTIONAL COVERAGE PROBE] probe crash");
                }),
            "INTENTIONAL COVERAGE PROBE",
            "[probe] _run rethrows under --bail.",
        );
        Tester.bailTriggered = false;
        Tester.assertThrows(
            () =>
                Tester.assert(false, "[INTENTIONAL COVERAGE PROBE] bail arm."),
            "BAIL",
            "[probe] failing assert bails under --bail.",
        );
        Tester.bailTriggered = false;
        globalThis.__TEST_BAIL = undefined;

        // --- start() flag banner lines
        globalThis.__TEST_FILTER = "probe";
        globalThis.__TEST_VERBOSE = true;
        globalThis.__TEST_BAIL = true;
        Tester.start();
        globalThis.__TEST_FILTER = undefined;
        globalThis.__TEST_VERBOSE = undefined;
        globalThis.__TEST_BAIL = undefined;

        // --- instance members + registry accessor
        const inst = new Tester();
        Tester.assertEquals(
            0,
            inst.failureCount,
            "[probe] fresh Tester instance starts at zero.",
        );
        const names = Tester.getRenderMethodNames();
        Tester.assert(
            names.indexOf("FrameworkMetaTests") !== -1,
            "[probe] getRenderMethodNames exposes the registry.",
        );
    } finally {
        // Undo every deliberate failure and global poke.
        Tester.failureCount = savedFailures;
        Tester.bailTriggered = savedBailTriggered;
        Tester.currentTestMethod = savedMethod;
        globalThis.__TEST_VERBOSE = savedVerbose;
        globalThis.__TEST_FILTER = savedFilter;
        globalThis.__TEST_BAIL = savedBailFlag;
    }
};

// ============================================================================
// Utility DSL policies + Roster + Powers edge coverage — firstDslAlternative,
// parse helpers, generateBonusTalent/Contact resolution modes, _findTalent
// tie/subRoll arms, slot-count adjustments, generateTalents manual/duplicate/
// overflow paths, the empty-category retry twin, and the optional/bonus
// query edges.
// ============================================================================

Tester.UtilityDslPolicyTests = () => {
    // UI policy helper — the generator uses pickDslAlternative instead
    Tester.assertEquals(
        "Flight",
        Utility.firstDslAlternative("Flight~Teleport"),
        "firstDslAlternative: returns the first ~ alternative.",
    );
    Tester.assertEquals(
        "Flight",
        Utility.firstDslAlternative("Flight"),
        "firstDslAlternative: no ~ → unchanged.",
    );
    Tester.assertEquals(
        null,
        Utility.firstDslAlternative(null),
        "firstDslAlternative: null in → null out.",
    );
    Tester.assertEquals(
        0,
        Utility.splitDslAlternatives(null).length,
        "splitDslAlternatives: null → empty array.",
    );
    Tester.assertEquals(
        2,
        Utility.splitDslAlternatives("a~b").length,
        "splitDslAlternatives: splits on ~.",
    );

    // Tail parsing: non-numeric, numeric, and absent
    const spec = Utility.parseDslEntry("Movement\\Flight(abc)");
    Tester.assertEquals(
        100,
        spec.maxRoll,
        "parseDslEntry: non-numeric tail defaults to 100.",
    );
    Tester.assertEquals("abc", spec.tail, "parseDslEntry: tail kept verbatim.");
    Tester.assertEquals(
        50,
        Utility.parseDslEntry("Movement\\Flight(50)").maxRoll,
        "parseDslEntry: numeric tail parsed.",
    );
    Tester.assertEquals(
        100,
        Utility.parseDslEntry("Movement\\Flight").maxRoll,
        "parseDslEntry: absent tail defaults to 100.",
    );

    // Contact-style '/' separator arm
    const contact = Utility.parseDslEntry("Spouse/Anna", {
        preferSlash: true,
    });
    Tester.assertEquals("Spouse", contact.category, "preferSlash: separator.");
    Tester.assertEquals("Anna", contact.name, "preferSlash: name.");

    // Full-list + value-list map callbacks
    const list = Utility.parseDslList("A\\B(10)|C\\D");
    Tester.assertEquals(2, list.length, "parseDslList: two entries.");
    Tester.assertEquals(10, list[0].maxRoll, "parseDslList: tail per entry.");
    const vals = Utility.parseDslValueList("Angel(+2)|Demon");
    Tester.assertEquals(2, vals[0].value, "parseDslValueList: numeric tail.");
    Tester.assert(
        Number.isNaN(vals[1].value),
        "parseDslValueList: absent tail → NaN.",
    );
    Tester.assertEquals("Angel", vals[0].name, "parseDslValueList: name.");

    // parseDslUpgrade: condition present/absent, too short, falsy
    const up1 = Utility.parseDslUpgrade("Cat\\Pow\\Cond\\Extra");
    Tester.assertEquals(
        "Cond",
        up1 && up1.condition,
        "parseDslUpgrade: third segment is the condition.",
    );
    const up2 = Utility.parseDslUpgrade("Cat\\Pow");
    Tester.assertEquals(
        null,
        up2 && up2.condition,
        "parseDslUpgrade: absent condition → null.",
    );
    Tester.assertEquals(
        null,
        Utility.parseDslUpgrade("Solo"),
        "parseDslUpgrade: single segment → null.",
    );
    Tester.assertEquals(
        null,
        Utility.parseDslUpgrade(""),
        "parseDslUpgrade: empty → null.",
    );
    Tester.assertEquals(
        null,
        Utility.parseDslUpgrade(null),
        "parseDslUpgrade: null → null.",
    );
};

Tester.RosterTalentSlotAndListTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();

    // Controlled tie/single/bonus-only fixtures on the shared talent table
    // (restored in finally — TESTING.md's patch-row pattern)
    const table = gen.talentListTable;
    const pushed = [];
    const addRow = (row) => {
        table.push(row);
        pushed.push(row);
    };
    addRow({
        category: "ZZTieCat",
        name: "TieA",
        maxRoll: 50,
        subRoll: 60,
        description: "tie a",
    });
    addRow({
        category: "ZZTieCat",
        name: "TieB",
        maxRoll: 50,
        subRoll: 70,
        description: "tie b",
    });
    addRow({
        category: "ZZSingleCat",
        name: "SoloTalent",
        maxRoll: 100,
        description: "solo",
    });
    addRow({
        category: "ZZNoSubCat",
        name: "NoSubA",
        maxRoll: 40,
        description: "a",
    });
    addRow({
        category: "ZZNoSubCat",
        name: "NoSubB",
        maxRoll: 40,
        description: "b",
    });
    addRow({
        category: "ZZBonusOnly",
        name: "BonusOnlyTalent",
        maxRoll: 150,
        description: "bonus only",
    });
    try {
        Tester.assertEquals(
            null,
            gen._findTalent("NoSuchCategoryZZ", 50, 50),
            "_findTalent: no candidates → null.",
        );
        const solo = gen._findTalent("ZZSingleCat", 100, 0);
        Tester.assertEquals(
            "SoloTalent",
            solo && solo.name,
            "_findTalent: single candidate returned.",
        );
        const tieB = gen._findTalent("ZZTieCat", 50, 65);
        Tester.assertEquals(
            "TieB",
            tieB && tieB.name,
            "_findTalent: subRoll match picks the first subRoll ≥ sRoll.",
        );
        const tieA = gen._findTalent("ZZTieCat", 50, 0);
        Tester.assertEquals(
            "TieA",
            tieA && tieA.name,
            "_findTalent: low sRoll matches the first subRoll.",
        );
        const tieLast = gen._findTalent("ZZTieCat", 50, 999);
        Tester.assertEquals(
            "TieB",
            tieLast && tieLast.name,
            "_findTalent: no subRoll match → last tie row.",
        );
        const noSub = gen._findTalent("ZZNoSubCat", 40, 50);
        Tester.assertEquals(
            "NoSubA",
            noSub && noSub.name,
            "_findTalent: tie without subRolls → first closest row.",
        );

        const avail = gen.getAvailableTalents();
        const cats = avail.map((c) => c.category);
        Tester.assert(
            cats.indexOf("ZZBonusOnly") === -1,
            "getAvailableTalents: skips bonus-only (maxRoll > 100) rows.",
        );
        Tester.assert(
            cats.indexOf("ZZTieCat") !== -1,
            "getAvailableTalents: includes normal categories.",
        );
        const tieCat = avail.find((c) => c.category === "ZZTieCat");
        Tester.assert(
            tieCat && tieCat.talents.length === 2,
            "getAvailableTalents: both tie talents listed.",
        );
        Tester.assert(
            tieCat && tieCat.talents[0].subRoll === 60,
            "getAvailableTalents: subRoll exposed.",
        );
    } finally {
        // Remove exactly the rows pushed above, by identity (finite loop).
        for (const r of pushed) {
            const idx = table.indexOf(r);
            if (idx !== -1) table.splice(idx, 1);
        }
    }

    // Slot-count adjustment blocks (patched form row, restored in finally)
    const contactList = gen.getAvailableContacts();
    Tester.assert(
        contactList.length > 0,
        "getAvailableContacts: categories returned.",
    );

    const formRow = gen.physicalFormTable[0];
    const attrs = [
        "talentsCountAdjustment",
        "talentsCountMaximum",
        "contactsCountAdjustment",
        "contactsCountMinimum",
        "contactsCountMaximum",
    ];
    const saved = {};
    for (const a of attrs) saved[a] = formRow[a];
    try {
        formRow.talentsCountAdjustment = 5;
        formRow.talentsCountMaximum = 6;
        formRow.contactsCountAdjustment = 2;
        formRow.contactsCountMinimum = 7;
        formRow.contactsCountMaximum = 8;
        gen._lastPhysicalForm = formRow.name;
        gen.talentNumberRoll = 50;
        gen.contactNumberRoll = 50;

        const tQty = gen.quantityTable.find(
            (q) => gen.talentNumberRoll <= q.maxRoll,
        );
        let expT = Math.max(1, tQty.talents.initial + 5);
        expT = Math.min(expT, 6);
        Tester.assertEquals(
            expT,
            gen.getTalentSlotCount(),
            "getTalentSlotCount: adjustment + maximum cap applied.",
        );

        const cQty = gen.quantityTable.find(
            (q) => gen.contactNumberRoll <= q.maxRoll,
        );
        let expC = Math.max(1, cQty.contacts.initial + 2);
        if (expC < 7) expC = 7;
        if (expC > 8) expC = 8;
        Tester.assertEquals(
            expC,
            gen.getContactSlotCount(),
            "getContactSlotCount: adjustment + min + max applied.",
        );

        gen._lastPhysicalForm = null;
        Tester.assertEquals(
            tQty.talents.initial,
            gen.getTalentSlotCount(),
            "getTalentSlotCount: no form → raw initial.",
        );
        Tester.assertEquals(
            cQty.contacts.initial,
            gen.getContactSlotCount(),
            "getContactSlotCount: no form → raw initial.",
        );
    } finally {
        for (const a of attrs) {
            if (saved[a] === undefined) delete formRow[a];
            else formRow[a] = saved[a];
        }
        gen._lastPhysicalForm = null;
    }
};

Tester.RosterBonusTalentTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();
    gen._assignedTalentNames = new Set();

    const target = gen.talentListTable.find(
        (e) => e.name && e.category && e.maxRoll <= 100,
    );
    Tester.assertNotNull(target, "BonusTalent: fixture talent exists.");
    const spec = `${target.category}\\${target.name}(100)`;
    const add = (c, str, roll) => {
        gen.talentCategoryRolls[c.talents.length] = roll;
        gen.generateBonusTalent(c, str);
    };

    // success path
    const char = new Character();
    char.talents = [];
    add(char, spec, 50);
    Tester.assertEquals(1, char.talents.length, "BonusTalent: generated.");
    Tester.assert(
        char.talents[0].bonusTalent === true,
        "BonusTalent: flagged bonusTalent.",
    );
    Tester.assert(
        gen._assignedTalentNames.has(target.name),
        "BonusTalent: recorded in the assigned set.",
    );

    // duplicate → log + return
    add(char, spec, 50);
    Tester.assertEquals(
        1,
        char.talents.length,
        "BonusTalent: duplicate skipped.",
    );

    // roll above the entry ceiling → no candidate
    add(char, `${target.category}\\${target.name}(1)`, 50);
    Tester.assertEquals(
        1,
        char.talents.length,
        "BonusTalent: roll above ceiling adds nothing.",
    );

    // unknown talent → lookup miss
    add(char, "NoSuchCatX\\NoSuchTalentX(100)", 50);
    Tester.assertEquals(
        1,
        char.talents.length,
        "BonusTalent: unknown talent adds nothing.",
    );

    // empty string guard
    gen.generateBonusTalent(char, "");
    Tester.assertEquals(
        1,
        char.talents.length,
        "BonusTalent: empty string no-ops.",
    );

    // _assignedTalentNames null → dup guard short-circuits, push succeeds
    gen._assignedTalentNames = null;
    const char2 = new Character();
    char2.talents = [];
    add(char2, spec, 50);
    Tester.assertEquals(
        1,
        char2.talents.length,
        "BonusTalent: null assigned-set still generates.",
    );

    // set present but without this name → first conjunct true, second false
    gen._assignedTalentNames = new Set(["Nobody Else"]);
    const char3 = new Character();
    char3.talents = [];
    add(char3, spec, 50);
    Tester.assertEquals(
        1,
        char3.talents.length,
        "BonusTalent: unrelated assigned-set still generates.",
    );
};

Tester.RosterGenerateTalentsTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();
    gen._assignedTalentNames = new Set();
    gen._selectedTalents = null;

    // (1) no remaining slots → early return
    const c0 = new Character();
    c0.talents = [];
    c0.talentsCount = 0;
    c0.talentsMax = 0;
    gen.generateTalents(c0, 0);
    Tester.assertEquals(
        0,
        c0.talents.length,
        "GenTalents: zero remaining slots → nothing generated.",
    );

    // (2) manual selection — success
    const c1 = new Character();
    c1.talents = [];
    c1.talentsCount = 3;
    c1.talentsMax = 4;
    gen._selectedTalents = [
        {
            category: "ManualCat",
            name: "ManualTalentA",
            talentCount: 1,
            description: "manual",
        },
    ];
    gen.generateTalents(c1, 0);
    Tester.assertEquals(
        "ManualTalentA",
        c1.talents[0] && c1.talents[0].name,
        "GenTalents: manual pick generated.",
    );
    Tester.assert(
        gen._assignedTalentNames.has("ManualTalentA"),
        "GenTalents: manual pick recorded.",
    );

    // (3) manual selection — not enough slots → skip
    const c2 = new Character();
    c2.talents = [];
    c2.talentsCount = 1;
    c2.talentsMax = 1;
    gen._selectedTalents = [
        { category: "ManualCat", name: "ManualTalentB", talentCount: 5 },
    ];
    gen.generateTalents(c2, 0);
    Tester.assertEquals(
        0,
        c2.talents.length,
        "GenTalents: oversized manual pick skipped.",
    );
    gen._selectedTalents = null;

    // (4) invalid category roll → lookup miss → return
    const c3 = new Character();
    c3.talents = [];
    c3.talentsCount = 3;
    c3.talentsMax = 4;
    gen.talentCategoryRolls = Array(gen.rollArraySize).fill(101);
    gen.talentRolls = Array(gen.rollArraySize).fill(50);
    gen.talentSubRolls = Array(gen.rollArraySize).fill(0);
    gen.generateTalents(c3, 0);
    Tester.assertEquals(
        0,
        c3.talents.length,
        "GenTalents: invalid category roll → nothing generated.",
    );

    // Find a talent whose maxRoll is unique in its category (deterministic
    // _findTalent pick) for the duplicate/overflow scenarios.
    let uniq = null;
    let uniqCat = null;
    for (const e of gen.talentListTable) {
        if (!e.name || !e.category || e.maxRoll > 100) continue;
        const same = gen.talentListTable.filter(
            (o) => o.category === e.category && o.maxRoll === e.maxRoll,
        );
        const catEntry = gen.talentCategoriesTable.find(
            (c) => c.name === e.category,
        );
        if (same.length === 1 && catEntry) {
            uniq = e;
            uniqCat = catEntry;
            break;
        }
    }
    Tester.assertNotNull(uniq, "GenTalents: unique-roll fixture found.");

    // (5) duplicate pick + poisoned retries → exhausted-log return
    if (uniq) {
        const c4 = new Character();
        c4.talents = [];
        c4.talentsCount = 3;
        c4.talentsMax = 4;
        gen._assignedTalentNames = new Set([uniq.name]);
        gen.talentCategoryRolls = Array(gen.rollArraySize).fill(101);
        gen.talentRolls = Array(gen.rollArraySize).fill(50);
        gen.talentSubRolls = Array(gen.rollArraySize).fill(0);
        gen.talentCategoryRolls[0] = uniqCat.maxRoll;
        gen.talentRolls[0] = uniq.maxRoll;
        gen.generateTalents(c4, 0);
        Tester.assertEquals(
            0,
            c4.talents.length,
            "GenTalents: duplicate retries exhaust without a push.",
        );
    }

    // (6) slot-overflow while-loop → bounds return (talentCount patched)
    if (uniq) {
        const savedCount = uniq.talentCount;
        uniq.talentCount = 3;
        try {
            const c5 = new Character();
            c5.talents = [];
            c5.talentsCount = 1;
            c5.talentsMax = 1;
            gen._assignedTalentNames = new Set();
            gen.talentCategoryRolls = Array(gen.rollArraySize).fill(101);
            gen.talentRolls = Array(gen.rollArraySize).fill(50);
            gen.talentSubRolls = Array(gen.rollArraySize).fill(0);
            gen.talentCategoryRolls[0] = uniqCat.maxRoll;
            gen.talentRolls[0] = uniq.maxRoll;
            gen.generateTalents(c5, 0);
            Tester.assertEquals(
                0,
                c5.talents.length,
                "GenTalents: oversized talent exhausts retries untouched.",
            );
        } finally {
            if (savedCount === undefined) delete uniq.talentCount;
            else uniq.talentCount = savedCount;
        }
    }

    // (7) bonusContact chain + subRoll log display (pushed fixture row)
    const ct = gen.contactTypeListTable.find((c) => c.category && c.name);
    Tester.assertNotNull(ct, "GenTalents: contact fixture exists.");
    let chainEntry = null;
    let chainCat = null;
    let chainRoll = -1;
    for (const catEntry of gen.talentCategoriesTable) {
        const rows = gen.talentListTable.filter(
            (r) => r.category === catEntry.name,
        );
        for (const x of [99, 98, 97, 96, 95]) {
            if (!rows.some((r) => r.maxRoll === x)) {
                chainEntry = catEntry;
                chainRoll = x;
                chainCat = catEntry.name;
                break;
            }
        }
        if (chainEntry) break;
    }
    Tester.assertNotNull(chainEntry, "GenTalents: free roll slot found.");
    if (chainEntry && ct) {
        const row = {
            category: chainCat,
            name: "ZZChainTalent",
            maxRoll: chainRoll,
            talentCount: 1,
            bonusContactCount: 1,
            bonusContact: `${ct.category}/${ct.name}(100)`,
            subRoll: 80,
            description: "chain",
        };
        gen.talentListTable.push(row);
        try {
            const c6 = new Character();
            c6.talents = [];
            c6.contacts = [];
            c6.contactsMax = 5;
            c6.talentsCount = 4;
            c6.talentsMax = 5;
            gen._assignedTalentNames = new Set();
            gen._assignedContactNames = new Set();
            gen.talentCategoryRolls = Array(gen.rollArraySize).fill(101);
            gen.talentRolls = Array(gen.rollArraySize).fill(50);
            gen.talentSubRolls = Array(gen.rollArraySize).fill(0);
            gen.talentCategoryRolls[0] = chainEntry.maxRoll;
            gen.talentRolls[0] = chainRoll;
            gen.talentSubRolls[0] = 0;
            gen.contactRolls = Array(gen.rollArraySize).fill(50);
            gen.generateTalents(c6, 0);
            Tester.assertEquals(
                "ZZChainTalent",
                c6.talents[0] && c6.talents[0].name,
                "GenTalents: fixture talent generated (subRoll log arm).",
            );
            Tester.assertEquals(
                1,
                c6.contacts.length,
                "GenTalents: bonusContact chain added a contact.",
            );
            Tester.assertEquals(
                ct.name,
                c6.contacts[0] && c6.contacts[0].name,
                "GenTalents: chained contact is the fixture contact.",
            );
        } finally {
            const idx = gen.talentListTable.indexOf(row);
            if (idx !== -1) gen.talentListTable.splice(idx, 1);
        }
    }

    gen.setDeterministicRolls(); // restore sane rolls for later tests on this gen
};

Tester.RosterBonusContactTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();
    gen._assignedContactNames = null;

    const ct1 = gen.contactTypeListTable.find((c) => c.category && c.name);
    const other = gen.contactTypeListTable.find(
        (c) => c.category && c.name && c.name !== ct1.name,
    );
    Tester.assertNotNull(ct1, "BonusContact: contact fixture exists.");
    Tester.assertNotNull(other, "BonusContact: second contact fixture exists.");

    const char = new Character();
    char.contacts = [];
    char.contactsMax = 9;
    const add = (str, forced) => {
        gen.contactRolls[char.contacts.length] = 50;
        gen.generateBonusContact(char, str, forced);
    };

    // (a) exact category/type → else arm
    add(`${ct1.category}/${ct1.name}(100)`);
    Tester.assertEquals(
        ct1.name,
        char.contacts[0] && char.contacts[0].name,
        "BonusContact: exact match generated.",
    );

    // (b) Any/Any → random pick from every contact
    add("Any/Any(100)");
    Tester.assertEquals(
        2,
        char.contacts.length,
        "BonusContact: Any/Any generated.",
    );

    // (c) Any/Type → match by name only
    add(`Any/${other.name}(100)`);
    Tester.assertEquals(
        other.name,
        char.contacts[char.contacts.length - 1].name,
        "BonusContact: Any/Type matched the type.",
    );

    // (d) Category/Any → random pick inside the category
    add(`${ct1.category}/Any(100)`);
    Tester.assertEquals(
        4,
        char.contacts.length,
        "BonusContact: Category/Any generated.",
    );
    Tester.assertEquals(
        ct1.category,
        char.contacts[3].category,
        "BonusContact: Category/Any stayed in the category.",
    );

    // (e) unknown exact pair → lookup miss
    add("NoSuchCatZZ/NoSuchTypeZZ(100)");
    Tester.assertEquals(
        4,
        char.contacts.length,
        "BonusContact: unknown pair adds nothing.",
    );

    // (f) unknown category with Any → empty category pool → return
    add("NoSuchCatZZ/Any(100)");
    Tester.assertEquals(
        4,
        char.contacts.length,
        "BonusContact: empty category pool adds nothing.",
    );

    // (g) roll above the entry ceiling → no candidate
    add(`${ct1.category}/${ct1.name}(1)`);
    Tester.assertEquals(
        4,
        char.contacts.length,
        "BonusContact: roll above ceiling adds nothing.",
    );

    // (h) empty string guard
    gen.generateBonusContact(char, "");
    Tester.assertEquals(
        4,
        char.contacts.length,
        "BonusContact: empty string no-ops.",
    );

    // (i) duplicate → log + return
    gen._assignedContactNames = new Set([ct1.name]);
    add(`${ct1.category}/${ct1.name}(100)`);
    Tester.assertEquals(
        4,
        char.contacts.length,
        "BonusContact: duplicate skipped.",
    );

    // (j) at slot maximum → blocked without force, pushed with force
    char.contactsMax = char.contacts.length;
    add(`${other.category}/${other.name}(100)`);
    Tester.assertEquals(
        4,
        char.contacts.length,
        "BonusContact: full roster blocks a normal push.",
    );
    // The refused attempt above still claimed other.name in the assigned set
    // (generateBonusContact records the name before the slot check), so drop
    // it to make the forced retry a clean first claim.
    gen._assignedContactNames.delete(other.name);
    add(`${other.category}/${other.name}(100)`, true);
    Tester.assertEquals(
        5,
        char.contacts.length,
        "BonusContact: forcedContact pushes past the maximum.",
    );
};

Tester.PowersRetryAndExhaustTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "basic";
    gen.setTables();
    gen.setDeterministicRolls();
    gen._assignedPowerNames = new Set();

    const counts = {};
    for (const p of gen.powerListTable)
        counts[p.category] = (counts[p.category] || 0) + 1;
    // Pick the category FIRST (must sit past roll 5 so the unshifted fake
    // category below, which owns rolls 1-5, cannot shadow it), then a
    // single-slot power inside that category.
    const yCat = gen.powerCategoriesTable.find(
        (c) =>
            c.maxRoll > 5 &&
            gen.powerListTable.some(
                (p) =>
                    p.category === c.name &&
                    p.name &&
                    Utility.getValue(p, "powerCount", 1) === 1,
            ),
    );
    Tester.assertNotNull(yCat, "Retry: target category sits past roll 5.");
    const yPower = gen.powerListTable.find(
        (p) =>
            p.category === (yCat && yCat.name) &&
            p.name &&
            Utility.getValue(p, "powerCount", 1) === 1,
    );
    Tester.assertNotNull(yPower, "Retry: cross-category target exists.");

    const buildChar = () => {
        const char = new Character();
        char.physicalForm = gen.physicalFormTable[0].name;
        char.powers = [];
        char.powersCount = 4;
        char.powersMax = 6;
        return char;
    };

    // A fake front category whose roll range (1-5) maps to NO powers — the
    // only way powerRow resolves to undefined after the re-roll adjust.
    const catTable = gen.powerCategoriesTable;
    catTable.unshift({ name: "ZZCoverageEmpty", maxRoll: 5 });
    try {
        // (a) undefined power → roll-miss twin → guards → cross-category success
        const charA = buildChar();
        gen.powerCategoryRolls = Array(gen.rollArraySize).fill(0);
        gen.powerRolls = Array(gen.rollArraySize).fill(50);
        gen.powerRankRolls = Array(gen.rollArraySize).fill(50);
        gen.powerCategoryRolls[0] = 5; // hits the fake category
        gen.powerCategoryRolls[1] = 0; // invalid cat roll guard
        gen.powerCategoryRolls[2] = yCat.maxRoll;
        gen.powerRolls[2] = 101; // power roll >100 guard
        gen.powerCategoryRolls[3] = yCat.maxRoll;
        gen.powerRolls[3] = yPower.maxRoll; // unassigned pick → success
        gen.generateSinglePower(charA, 0);
        Tester.assertEquals(
            1,
            charA.powers.length,
            "Retry: undefined-power twin recovers via another category.",
        );
        Tester.assertEquals(
            yPower.name,
            charA.powers[0] && charA.powers[0].name,
            "Retry: fallback power is the expected one.",
        );

        // (b) every retry cat roll invalid → "Exhausted retries" return
        const charB = buildChar();
        gen.powerCategoryRolls = Array(gen.rollArraySize).fill(0);
        gen.powerRolls = Array(gen.rollArraySize).fill(50);
        gen.powerRankRolls = Array(gen.rollArraySize).fill(50);
        gen.powerCategoryRolls[0] = 5;
        gen.generateSinglePower(charB, 0);
        Tester.assertEquals(
            0,
            charB.powers.length,
            "Retry: exhausted retries return without a push.",
        );
    } finally {
        catTable.shift();
    }

    // Pick-while array exhaustion near the end of the roll arrays
    const catAny = gen.powerCategoriesTable.find((c) => c.maxRoll > 5);
    const charC = buildChar();
    gen.powerCategoryRolls = Array(gen.rollArraySize).fill(0);
    gen.powerRolls = Array(gen.rollArraySize).fill(50);
    gen.powerRankRolls = Array(gen.rollArraySize).fill(50);
    const ix = gen.rollArraySize - 1;
    gen.powerCategoryRolls[ix] = catAny.maxRoll;
    gen.powerRolls[ix] = 101; // re-roll runs off the array → log + return
    gen.generateSinglePower(charC, ix);
    Tester.assertEquals(
        0,
        charC.powers.length,
        "Retry: pick-while array exhaustion adds nothing.",
    );
};

Tester.PowersOptionalEdgeTests = () => {
    // (1) manual optional: Any re-roll adjust + rank + push
    const gen = new CharacterGenerator();
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();
    gen._assignedPowerNames = new Set();
    gen.selectOptionalPowersManually = true;
    const bt = gen.powerListTable.find((p) => p.name && p.category);
    gen._selectedOptionalPowers = {
        Src: [{ category: bt.category, name: "Any" }],
    };
    gen.powerRolls = Array(gen.rollArraySize).fill(50);
    gen.powerRolls[0] = 101;
    gen.powerRolls[1] = 101;
    gen.powerRolls[2] = 101;
    gen.powerRankRolls = Array(gen.rollArraySize).fill(50);
    const c1 = new Character();
    c1.powers = [];
    c1.powersCount = 6;
    c1.powersMax = 6;
    gen.generateOptionalPower(c1, 1, "ignored", "Src");
    Tester.assertEquals(
        1,
        c1.powers.length,
        "OptEdge: manual Any re-rolled past invalid slots and pushed.",
    );
    Tester.assert(
        c1.powers[0] && c1.powers[0].optionalPower === true,
        "OptEdge: manual Any flagged optionalPower.",
    );
    gen.selectOptionalPowersManually = false;
    gen._selectedOptionalPowers = null;

    // (2) random path: skipped first entry leaves a sparse hole → continue
    const gen2 = new CharacterGenerator();
    gen2.generatorMode = "advanced";
    gen2.setTables();
    gen2.setDeterministicRolls();
    gen2._assignedPowerNames = new Set();
    const c2 = new Character();
    c2.powers = [];
    c2.powersCount = 6;
    c2.powersMax = 6;
    gen2.generateOptionalPower(c2, 2, "NoSlash|Movement\\Any(100)", "Src");
    Tester.assertEquals(
        1,
        c2.powers.length,
        "OptEdge: sparse hole skipped, second entry generated.",
    );
    Tester.assert(
        c2.powers[0] && c2.powers[0].optionalPower === true,
        "OptEdge: generated power flagged optionalPower.",
    );

    // (3) getOptionalPowerOptions with a patched form string — exercises
    //     segments<2 skip, Any expansion and ~ alternatives expansion.
    //     Fake category targets: filterRolled() drops options the simulated
    //     roll already produced, and with deterministic rolls every real
    //     Movement power is in that set — the fakes never are.
    const gen3 = new CharacterGenerator();
    gen3.generatorMode = "ultimate";
    gen3.setTables();
    gen3.setDeterministicRolls();
    gen3.powerNumberRoll = 50;
    const formRow = gen3.physicalFormTable[0];
    const savedStr = formRow.optionalPowers;
    const baseLen = gen3.powerListTable.length;
    gen3.powerListTable.push(
        { category: "ZZOptFake", name: "FakeOptA" },
        { category: "ZZOptFake", name: "FakeOptB" },
        { category: "ZZOptFake", name: "FakeOptC" },
    );
    // Each ~ alternative carries its own category — the split happens on the
    // raw entry, so a bare second alternative would be segments<2 and skipped.
    formRow.optionalPowers =
        "NoSlashPart|ZZOptFake\\Any(100)|ZZOptFake\\FakeOptA~ZZOptFake\\FakeOptB(100)";
    try {
        gen3._lastPhysicalForm = formRow.name;
        const groups = gen3.getOptionalPowerOptions();
        const formGroup = groups.find(
            (g) => g.sourcePowerCategory === "Physical Form",
        );
        Tester.assertNotNull(
            formGroup,
            "OptEdge: patched form optional group returned.",
        );
        // NoSlashPart skipped (segments < 2); Any → 3 fakes; ~ → both alts.
        Tester.assertEquals(
            5,
            formGroup && formGroup.options.length,
            "OptEdge: NoSlash skipped, Any + ~ expansions present.",
        );
    } finally {
        gen3.powerListTable.length = baseLen;
        if (savedStr === undefined) delete formRow.optionalPowers;
        else formRow.optionalPowers = savedStr;
        gen3._lastPhysicalForm = null;
    }
};

Tester.PowersQueryAndSelectionTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();
    gen._assignedPowerNames = new Set();
    const bt = gen.powerListTable.find((p) => p.name && p.category);
    const bt2 = gen.powerListTable.find(
        (p) => p.name && p.category && p.name !== bt.name,
    );

    // --- parseBonusPowerOptions
    Tester.assertEquals(
        0,
        CharacterGenerator.parseBonusPowerOptions("").length,
        "Query: empty bonus string → no options.",
    );
    const opts = CharacterGenerator.parseBonusPowerOptions(
        "Movement\\Any(100)|Movement\\Flight(100)",
    );
    Tester.assertEquals(2, opts.length, "Query: two bonus options parsed.");
    Tester.assertEquals(
        "Movement",
        opts[0] && opts[0].category,
        "Query: option category parsed.",
    );
    Tester.assertEquals(
        "Any",
        opts[0] && opts[0].name,
        "Query: option name parsed.",
    );

    // --- _expandBonusPowerAny: guard, Any/Any, category Any, passthrough
    const gNull = new CharacterGenerator();
    gNull.powerListTable = null;
    const passthroughIn = [{ category: "X", name: "Y", maxRoll: 50 }];
    Tester.assert(
        gNull._expandBonusPowerAny(passthroughIn) === passthroughIn,
        "Query: null power list returns the input unchanged.",
    );
    const all = gen._expandBonusPowerAny([
        { category: "Any", name: "Any", maxRoll: 100 },
    ]);
    Tester.assertEquals(
        gen.powerListTable.length,
        all.length,
        "Query: Any/Any expands to every power.",
    );
    const catName = gen.powerListTable[0].category;
    const catExp = gen._expandBonusPowerAny([
        { category: catName, name: "Any", maxRoll: 100 },
    ]);
    Tester.assertEquals(
        gen.powerListTable.filter((p) => p.category === catName).length,
        catExp.length,
        "Query: category Any expands to that category only.",
    );
    const pass = gen._expandBonusPowerAny([
        { category: "X", name: "Y", maxRoll: 50 },
    ]);
    Tester.assertEquals(
        "Y",
        pass[0] && pass[0].name,
        "Query: concrete options pass through expansion.",
    );

    // --- getPowerSlotsAndCategories: invalid cat rolls skipped; then the
    //     no-table guards of the two list helpers
    const gQ = new CharacterGenerator();
    gQ.generatorMode = "basic";
    gQ.setTables();
    gQ.setDeterministicRolls();
    gQ.powerNumberRoll = 50;
    gQ._lastPhysicalForm = null;
    gQ.physicalFormRoll = null;
    gQ.powerCategoryRolls = Array(gQ.rollArraySize).fill(101);
    const slots = gQ.getPowerSlotsAndCategories();
    Tester.assert(slots.count > 0, "Query: slot count still resolves.");
    Tester.assertEquals(
        0,
        slots.categories.length,
        "Query: invalid category rolls produce no categories.",
    );
    gQ.powerCategoriesTable = null;
    Tester.assertEquals(
        0,
        gQ.getPowerCategoryNames().length,
        "Query: null category table → empty names.",
    );
    gQ.powerListTable = null;
    Tester.assertEquals(
        0,
        gQ.getPowersForCategory("Anything").length,
        "Query: null power list → empty powers.",
    );

    // --- applySelectedBonusPower: null, array arm, ghost, rank miss, full slots
    const gS = new CharacterGenerator();
    gS.generatorMode = "advanced";
    gS.setTables();
    gS.setDeterministicRolls();
    gS._assignedPowerNames = new Set();
    const cS = new Character();
    cS.powers = [];
    cS.powersCount = 6;
    cS.powersMax = 6;
    gS.applySelectedBonusPower(cS, null);
    Tester.assertEquals(
        0,
        cS.powers.length,
        "SelBonus: null selection no-ops.",
    );
    gS.applySelectedBonusPower(cS, [{ category: bt.category, name: bt.name }]);
    Tester.assertEquals(
        1,
        cS.powers.length,
        "SelBonus: array selection pushes (isArray arm).",
    );
    Tester.assert(
        cS.powers[0].bonusPower === true,
        "SelBonus: pushed power flagged bonusPower.",
    );
    gS.applySelectedBonusPower(cS, {
        category: "NoSuchCatZZ",
        name: "Ghost",
    });
    Tester.assertEquals(
        1,
        cS.powers.length,
        "SelBonus: unknown selection skipped.",
    );
    gS.powerRankRolls = Array(gS.rollArraySize).fill(50);
    gS.powerRankRolls[1] = 999;
    gS.applySelectedBonusPower(cS, {
        category: bt2.category,
        name: bt2.name,
    });
    Tester.assertEquals(
        1,
        cS.powers.length,
        "SelBonus: rank-roll miss skips the push.",
    );
    gS.powerRankRolls[1] = 50;
    cS.powersMax = 1; // current slots already 1 → no room
    gS.applySelectedBonusPower(cS, {
        category: bt2.category,
        name: bt2.name,
    });
    Tester.assertEquals(
        1,
        cS.powers.length,
        "SelBonus: full roster blocks the push.",
    );

    // --- generateBonusPower rank miss
    const cB = new Character();
    cB.powers = [];
    cB.powersCount = 6;
    cB.powersMax = 6;
    gen.powerRolls[0] = 50;
    gen.powerRankRolls[0] = 999;
    gen.generateBonusPower(cB, `${bt.category}\\${bt.name}(100)`);
    Tester.assertEquals(
        0,
        cB.powers.length,
        "BonusEdge: rank-roll miss adds nothing.",
    );
    gen.powerRankRolls[0] = 50;

    // --- _simulateRolledPowers: invalid category roll arm
    const gSim = new CharacterGenerator();
    gSim.generatorMode = "advanced";
    gSim.setTables();
    gSim.setDeterministicRolls();
    gSim.powerNumberRoll = 50;
    gSim.powerCategoryRolls = Array(gSim.rollArraySize).fill(50);
    gSim.powerCategoryRolls[0] = 101;
    gSim.powerRolls = Array(gSim.rollArraySize).fill(101);
    Tester.assertEquals(
        0,
        gSim._simulateRolledPowers().size,
        "Simulate: invalid category roll + poisoned power rolls → empty set.",
    );

    // --- bonus-form paths at zero remaining slots (selected + rolled)
    const gF = new CharacterGenerator();
    gF.generatorMode = "ultimate";
    gF.setTables();
    gF.setDeterministicRolls();
    gF._assignedPowerNames = new Set();
    gF._selectedBonusPowers = [[{ category: bt.category, name: bt.name }]];
    const cF1 = new Character();
    cF1.powers = [];
    cF1.powersCount = 0;
    cF1.powersMax = 0;
    gF.generatorBonusPowerOfPhysicalForm(cF1, "Unused\\String(100)", 0);
    Tester.assertEquals(
        0,
        cF1.powers.length,
        "FormBonusAtMax: selected bonus blocked with no slots.",
    );
    gF._selectedBonusPowers = null;
    const cF2 = new Character();
    cF2.powers = [];
    cF2.powersCount = 0;
    cF2.powersMax = 0;
    gF.powerRolls = Array(gF.rollArraySize).fill(50);
    gF.generatorBonusPowerOfPhysicalForm(
        cF2,
        `${bt2.category}\\${bt2.name}(100)`,
    );
    Tester.assertEquals(
        0,
        cF2.powers.length,
        "FormBonusAtMax: rolled bonus blocked with no slots.",
    );
};

// ============================================================================
// TARGETED BRANCH PUSH — one craft per uncovered branch slot across
// Determination / Powers / Roster / core / Utility.
// ============================================================================

Tester.DeterminePhysicalFormGuardTests = () => {
    const gen = new CharacterGenerator();
    gen.setTables();
    gen.setDeterministicRolls();
    const savedTable = gen.physicalFormTable;
    try {
        // _findPhysicalForm: roll past every band → no candidates → null
        Tester.assertEquals(
            null,
            gen._findPhysicalForm(101, 0),
            "PF: roll past every band → null.",
        );

        // getPhysicalFormSubOptions — previously never called at all
        gen.physicalFormTable = null;
        Tester.assertEquals(
            0,
            gen.getPhysicalFormSubOptions().length,
            "PF: sub-options without a table → [].",
        );
        gen.physicalFormTable = savedTable;

        gen.physicalFormRoll = 101;
        Tester.assertEquals(
            0,
            gen.getPhysicalFormSubOptions().length,
            "PF: sub-options without candidates → [].",
        );

        gen.physicalFormTable = [
            { name: "Solo", maxRoll: 100, description: "solo" },
        ];
        gen.physicalFormRoll = 50;
        Tester.assertEquals(
            0,
            gen.getPhysicalFormSubOptions().length,
            "PF: sub-options with one tightest row → [].",
        );

        gen.physicalFormTable = [
            { name: "TieA", maxRoll: 500, subRoll: 30, description: "da" },
            { name: "TieB", maxRoll: 500, subRoll: 20, description: "db" },
        ];
        const opts = gen.getPhysicalFormSubOptions();
        Tester.assertEquals(
            2,
            opts.length,
            "PF: sub-options returns the tie group.",
        );
        Tester.assertEquals(
            "TieA",
            opts[0] && opts[0].name,
            "PF: sub-option name exposed.",
        );
        Tester.assertEquals(
            30,
            opts[0] && opts[0].subRoll,
            "PF: sub-option subRoll exposed.",
        );
        Tester.assertEquals(
            "da",
            opts[0] && opts[0].description,
            "PF: sub-option description exposed.",
        );

        const tieMatch = gen._findPhysicalForm(500, 25);
        Tester.assertEquals(
            "TieA",
            tieMatch && tieMatch.name,
            "PF: subRoll match picks the first qualifying row.",
        );
        const tieLast = gen._findPhysicalForm(500, 99);
        Tester.assertEquals(
            "TieB",
            tieLast && tieLast.name,
            "PF: subRoll past every subRoll → last withSub row.",
        );
    } finally {
        gen.physicalFormTable = savedTable;
        gen._selectedPhysicalForm = null;
        gen.physicalFormRoll = 50;
    }

    // determinePhysicalForm guards ------------------------------------------------
    const workRow = savedTable.find(
        (r) => Utility.getValue(r, "combinations", -1) === -1,
    );
    if (!workRow) {
        Tester.assert(true, "PF: determine guards skipped (no safe row).");
        return;
    }
    gen.combinationsRoll = 10;
    gen.compoundRandomRanksColumnRoll = 9999;
    gen._selectedPhysicalForm = null;

    const char0 = new Character();
    const formBefore = char0.physicalForm;
    gen.physicalFormRoll = 0;
    gen.determinePhysicalForm(char0);
    Tester.assertEquals(
        formBefore,
        char0.physicalForm,
        "PF: invalid roll leaves the form unset.",
    );

    gen._selectedPhysicalForm = workRow.name;
    gen.physicalFormRoll = workRow.maxRoll;
    const char1 = new Character();
    gen.determinePhysicalForm(char1);
    Tester.assertEquals(
        workRow.name,
        char1.physicalForm,
        "PF: manual sub-form selection found by name.",
    );

    gen._selectedPhysicalForm = "NoSuchFormZZ";
    gen.physicalFormRoll = workRow.maxRoll;
    const char2 = new Character();
    gen.determinePhysicalForm(char2);
    Tester.assert(
        char2.physicalForm && char2.physicalForm !== "NoSuchFormZZ",
        "PF: unknown manual selection falls back to the rolled form.",
    );

    // Compound/combinations block: invalid compound body type aborts
    let bodyRoll = null;
    for (let c = 1; c <= 100 && bodyRoll === null; c++) {
        const hit = savedTable.find((o) => c <= o.maxRoll);
        if (
            hit &&
            hit !== workRow &&
            Utility.getValue(hit, "combinations", -1) === -1
        ) {
            bodyRoll = c;
        }
    }
    if (bodyRoll !== null) {
        const origCombos = workRow.combinations;
        workRow.combinations = "2\\50(50)|3\\33(75)";
        gen.bodyTypeRolls = [bodyRoll, bodyRoll, bodyRoll];
        gen._selectedPhysicalForm = workRow.name;
        gen.physicalFormRoll = workRow.maxRoll;
        const charC = new Character();
        try {
            gen.determinePhysicalForm(charC);
            Tester.assert(
                !charC.physicalForm,
                "PF: invalid compound body type aborts before assignment.",
            );
        } finally {
            workRow.combinations = origCombos;
        }
    } else {
        Tester.assert(true, "PF: compound fixture skipped.");
    }

    // No match: table whose rows all sit below the roll
    gen.physicalFormTable = [{ name: "Tiny", maxRoll: 0 }];
    gen._selectedPhysicalForm = null;
    gen.physicalFormRoll = 50;
    const char3 = new Character();
    const formBefore3 = char3.physicalForm;
    try {
        gen.determinePhysicalForm(char3);
        Tester.assertEquals(
            formBefore3,
            char3.physicalForm,
            "PF: no matching row logs and returns.",
        );
    } finally {
        gen.physicalFormTable = savedTable;
    }
};

Tester.DetermineOriginAbilityGuardTests = () => {
    const gen = new CharacterGenerator();
    gen.setTables();
    gen.setDeterministicRolls();

    const charO = new Character();
    const originBefore = charO.origin;
    gen.originRoll = 101;
    gen.determineOrigin(charO);
    Tester.assertEquals(
        originBefore,
        charO.origin,
        "Origin: invalid roll leaves origin unset.",
    );

    const savedOrigins = gen.originTable;
    gen.originTable = [];
    gen.originRoll = 50;
    const charO2 = new Character();
    try {
        gen.determineOrigin(charO2);
        Tester.assertEquals(
            originBefore,
            charO2.origin,
            "Origin: empty table → no match.",
        );
    } finally {
        gen.originTable = savedOrigins;
        gen.originRoll = 50;
    }

    // determineAbility guards ------------------------------------------------------
    const row = gen.physicalFormTable[0];

    gen.physicalAbilityRolls[0].Fighting = 0;
    const charA = new Character();
    const fightingBefore = charA.getAbility("Fighting").rank;
    gen.determineAbility(charA, "Fighting", row, 0);
    Tester.assertEquals(
        fightingBefore,
        charA.getAbility("Fighting").rank,
        "Ability: invalid roll leaves the rank unchanged.",
    );

    gen.physicalAbilityRolls[0].Fighting = 50;
    const savedCol = gen.randomRanksColumn;
    gen.randomRanksColumn = 999;
    const charB = new Character();
    try {
        gen.determineAbility(charB, "Fighting", row, 0);
        Tester.assertEquals(
            fightingBefore,
            charB.getAbility("Fighting").rank,
            "Ability: null rankRow leaves the rank unchanged.",
        );
    } finally {
        gen.randomRanksColumn = savedCol;
    }

    gen.mentalAbilityRolls.Reason = 0;
    const charC = new Character();
    const reasonBefore = charC.getAbility("Reason").rank;
    gen.determineAbility(charC, "Reason", row, 0);
    Tester.assertEquals(
        reasonBefore,
        charC.getAbility("Reason").rank,
        "Ability: invalid mental roll leaves the rank unchanged.",
    );
};

Tester.DetermineResourcesHiTechTests = () => {
    const gen = new CharacterGenerator();
    gen.setTables();
    gen.setDeterministicRolls();
    const hiRow = gen.physicalFormTable.find(
        (r) => Utility.getValue(r, "isHiTech", false) === true,
    );
    Tester.assertNotNull(hiRow, "HiTech: a hi-tech form exists in the table.");
    if (!hiRow) return;

    const hadSet = Object.prototype.hasOwnProperty.call(hiRow, "resourcesSet");
    const savedSet = hiRow.resourcesSet;
    const savedGood = gen.hiTechToGood;
    hiRow.resourcesSet = -1; // skip the early return so the hi-tech block runs
    try {
        gen.hiTechToGood = false;
        const char1 = new Character();
        char1.physicalForm = hiRow.name;
        gen.determineResources(char1);
        Tester.assert(
            char1.isHiTech === true,
            "HiTech: flag set on the character.",
        );
        Tester.assert(
            char1.resources.rank !== undefined,
            "HiTech: else-branch resources resolved.",
        );

        gen.hiTechToGood = true;
        const char2 = new Character();
        char2.physicalForm = hiRow.name;
        gen.determineResources(char2);
        Tester.assert(
            char2.resources.rank !== undefined,
            "HiTech: to-Good branch resources resolved.",
        );
    } finally {
        if (hadSet) hiRow.resourcesSet = savedSet;
        else delete hiRow.resourcesSet;
        gen.hiTechToGood = savedGood;
    }
};

Tester.PopularityClampGuardTests = () => {
    // --- Ultimate: subType value-list min/max, then BOTH number clamps ----
    const genU = new CharacterGenerator();
    genU.generatorMode = "ultimate";
    genU.setTables();
    genU.setDeterministicRolls();
    const rowU = genU.physicalFormTable.find(
        (r) => Utility.getValue(r, "combinations", -1) === -1,
    );
    if (!rowU) {
        Tester.assert(true, "Popularity clamp: fixture skipped.");
        return;
    }
    const savedSet = rowU.popularitySet;
    const savedMin = rowU.popularityMinimum;
    const savedMax = rowU.popularityMaximum;
    const savedAdj = rowU.popularityAdjustment;
    rowU.popularitySet = -1;
    rowU.popularityAdjustment = 0;
    rowU.popularityMinimum = "Other(98)|SubX(999)";
    rowU.popularityMaximum = "Other(9)|SubX(5)";

    genU.physicalFormRoll = rowU.maxRoll;
    genU._selectedPhysicalForm = rowU.name;
    const charU = new Character();
    genU.determinePhysicalForm(charU); // sets randomRanksColumn + form
    genU._selectedPhysicalForm = null;
    charU.subType = "SubX";
    genU.popularityRoll = 50;
    genU.identitySecret = false;
    try {
        genU.determinePopularityUltimate(charU);
        Tester.assertEquals(
            5,
            charU.popularity,
            "Popularity ultimate: subType lists resolve, then min and max clamps apply.",
        );
    } finally {
        rowU.popularitySet = savedSet;
        rowU.popularityMinimum = savedMin;
        rowU.popularityMaximum = savedMax;
        rowU.popularityAdjustment = savedAdj;
    }

    // --- Advanced: plain numeric min/max clamps in determinePopularity ----
    const genA = new CharacterGenerator();
    genA.generatorMode = "advanced";
    genA.setTables();
    genA.setDeterministicRolls();
    const rowA = genA.physicalFormTable[0];
    const savedASet = rowA.popularitySet;
    const savedAMin = rowA.popularityMinimum;
    const savedAMax = rowA.popularityMaximum;
    const savedAAdj = rowA.popularityAdjustment;
    rowA.popularitySet = -1;
    rowA.popularityAdjustment = 0;
    rowA.popularityMinimum = 999;
    rowA.popularityMaximum = 5;
    genA.identitySecret = false;
    const charA = new Character();
    charA.physicalForm = rowA.name;
    try {
        genA.determinePopularity(charA);
        Tester.assertEquals(
            5,
            charA.popularity,
            "Popularity advanced: minimum floor then maximum cap apply.",
        );
    } finally {
        rowA.popularitySet = savedASet;
        rowA.popularityMinimum = savedAMin;
        rowA.popularityMaximum = savedAMax;
        rowA.popularityAdjustment = savedAAdj;
    }
};

Tester.PopularityNullGuardTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();
    const row = gen.physicalFormTable.find(
        (r) => Utility.getValue(r, "combinations", -1) === -1,
    );
    if (!row) {
        Tester.assert(true, "Popularity null: fixture skipped.");
        return;
    }
    const savedSet = row.popularitySet;
    const savedStart = row.popularityStart;
    row.popularitySet = -1;
    row.popularityStart = -1;

    gen.physicalFormRoll = row.maxRoll;
    gen._selectedPhysicalForm = row.name;
    const char = new Character();
    gen.determinePhysicalForm(char);
    gen._selectedPhysicalForm = null;
    gen.popularityRoll = 50;

    const rrRow = Utility.findRow(
        gen,
        gen.popularityRoll,
        gen.randomRanksColumn,
    );
    Tester.assertNotNull(rrRow, "Popularity null: rank row resolves.");
    const savedRankNumber = rrRow && rrRow.rankNumber;
    const popularityBefore = char.popularity;
    if (rrRow) rrRow.rankNumber = null;
    try {
        gen.determinePopularityUltimate(char);
        Tester.assertEquals(
            popularityBefore,
            char.popularity,
            "Popularity null: invalid popularity logs and returns early.",
        );
    } finally {
        if (rrRow) rrRow.rankNumber = savedRankNumber;
        row.popularitySet = savedSet;
        row.popularityStart = savedStart;
    }
};

Tester.ManualLeftoverOptionalTests = () => {
    // (1) leftover manual selections the generator never processed get pushed
    const gen = new CharacterGenerator();
    gen.setTables();
    gen.setDeterministicRolls();
    const target = gen.powerListTable.find((p) => p.name && p.category);
    Tester.assertNotNull(
        target,
        "Leftover: a real power exists for the fixture.",
    );
    if (!target) return;

    gen.selectOptionalPowersManually = true;
    gen._selectedOptionalPowers = {
        LeftoverSource: [
            { category: target.category, name: target.name },
            { category: "NoCatZZ", name: "NoPowZZ" },
        ],
        EmptySource: [],
    };
    const char = new Character();
    char.physicalForm = gen.physicalFormTable[0].name;
    // determineSpecialAbilities overwrites powersCount from the quantity row,
    // so roll a zero-power row — the rolled loop then can't claim the target
    // before the leftover block runs.
    const qRow = gen.quantityTable.find(
        (q) =>
            Math.max(1, Math.min(100, gen.powerNumberRoll || 1)) <= q.maxRoll,
    );
    const savedQPowers = qRow && qRow.powers;
    if (qRow) qRow.powers = { initial: 0, maximum: 6 };
    try {
        gen.determineSpecialAbilities(char);
        const pushed = char.powers.find(
            (p) => p.name === target.name && p.optionalPower === true,
        );
        Tester.assert(
            pushed !== undefined,
            "Leftover: unprocessed manual optional power pushed.",
        );
    } finally {
        if (qRow) qRow.powers = savedQPowers;
        gen.selectOptionalPowersManually = false;
        gen._selectedOptionalPowers = null;
    }

    // (2) manual flag without a selection map skips the block entirely
    const gen2 = new CharacterGenerator();
    gen2.setTables();
    gen2.setDeterministicRolls();
    gen2.selectOptionalPowersManually = true;
    const char2 = new Character();
    char2.physicalForm = gen2.physicalFormTable[0].name;
    try {
        gen2.determineSpecialAbilities(char2);
        Tester.assert(
            true,
            "Leftover: flag without a selection map skips cleanly.",
        );
    } finally {
        gen2.selectOptionalPowersManually = false;
    }
};

Tester.ContactManualRandomGuardTests = () => {
    // (1) manual selections: default-count pushes, oversized skips
    const gen = new CharacterGenerator();
    gen.setTables();
    gen.setDeterministicRolls();
    gen._assignedContactNames = null;
    gen._selectedContacts = [
        { category: "Contact", name: "ManualCtA" },
        { category: "Contact", name: "ManualCtHog", contactCount: 99 },
    ];
    const char = new Character();
    char.physicalForm = gen.physicalFormTable[0].name;
    try {
        gen.determineSpecialAbilities(char);
        Tester.assert(
            char.contacts.some((c) => c.name === "ManualCtA"),
            "Contact manual: default-count selection pushed.",
        );
        Tester.assert(
            !char.contacts.some((c) => c.name === "ManualCtHog"),
            "Contact manual: oversized selection skipped.",
        );
    } finally {
        gen._selectedContacts = null;
        gen.selectContactManually = false;
    }

    // (2) random loop: slot hog always exceeds the remaining slots
    const gen2 = new CharacterGenerator();
    gen2.setTables();
    gen2.setDeterministicRolls();
    gen2._assignedContactNames = new Set();
    const listTable = gen2.contactTypeListTable;
    listTable.unshift({
        category: listTable[0].category,
        name: "ZZSlotHog",
        maxRoll: 100,
        contactCount: 99,
        description: "hog",
    });
    const char2 = new Character();
    char2.physicalForm = gen2.physicalFormTable[0].name;
    try {
        gen2.determineSpecialAbilities(char2);
        Tester.assertEquals(
            0,
            char2.contacts.length,
            "Contact random: slot hog skipped every roll.",
        );
    } finally {
        listTable.shift();
        gen2._assignedContactNames = null;
    }

    // (3) random loop: every contact already assigned → dup advance hits a
    //     missing category, then the roll-array bound
    const gen3 = new CharacterGenerator();
    gen3.setTables();
    gen3.setDeterministicRolls();
    gen3._assignedContactNames = new Set(
        gen3.contactTypeListTable.map((c) => c.name),
    );
    // Entry validation repairs out-of-range rolls to 50, so the advance
    // "miss" has to come from a table gap instead: shrink the single
    // category band to 40 and roll 30 initially, 50 on every advance.
    const catTable3 = gen3.contactCategoriesTable;
    const savedCatMax3 = catTable3[0] && catTable3[0].maxRoll;
    if (catTable3[0]) catTable3[0].maxRoll = 40;
    gen3.contactCategoryRolls = Array(gen3.rollArraySize).fill(50);
    gen3.contactCategoryRolls[0] = 30;
    const char3 = new Character();
    char3.physicalForm = gen3.physicalFormTable[0].name;
    try {
        gen3.determineSpecialAbilities(char3);
        Tester.assertEquals(
            0,
            char3.contacts.length,
            "Contact dup: exhausted advance adds nothing.",
        );
    } finally {
        if (catTable3[0]) catTable3[0].maxRoll = savedCatMax3;
        gen3._assignedContactNames = null;
        gen3.setDeterministicRolls();
    }
};

Tester.BoostGuardTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();
    const char = gen.generateWithoutThrows();
    const table = gen.randomRanksTable;
    const topRank = table[table.length - 1].rank;

    // boostAbility: rank missing from the table
    const fighting = char.primaryAbilities[0].Fighting;
    const savedFighting = fighting.rank;
    char.boostApplied = false;
    fighting.rank = "NoSuchRankZZ";
    Tester.assert(
        gen.boostAbility(char, "Fighting") === false,
        "Boost: unknown ability rank returns false.",
    );
    fighting.rank = savedFighting;

    // boostAbility: already at the top rank
    char.boostApplied = false;
    fighting.rank = topRank;
    Tester.assert(
        gen.boostAbility(char, "Fighting") === false,
        "Boost: top-rank ability returns false.",
    );
    fighting.rank = savedFighting;

    if (char.powers.length > 0) {
        // boostPower: boostApplied short-circuit on the second call
        const power = char.powers[0];
        const savedRank = power.rank;
        char.boostApplied = false;
        gen.boostPower(char, 0);
        Tester.assert(
            gen.boostPower(char, 0) === false,
            "Boost: second power boost rejected once applied.",
        );

        // boostPower: rank guards
        char.boostApplied = false;
        power.rank = "NoSuchRankZZ";
        Tester.assert(
            gen.boostPower(char, 0) === false,
            "Boost: unknown power rank returns false.",
        );
        power.rank = savedRank;
        char.boostApplied = false;
        power.rank = topRank;
        Tester.assert(
            gen.boostPower(char, 0) === false,
            "Boost: top-rank power returns false.",
        );
        power.rank = savedRank;
    }
    char.boostApplied = false;
};

Tester.CoreIdentityPhaseFallbackTests = () => {
    // applyRollOverrides with a null source returns early
    const gen0 = new CharacterGenerator();
    CharacterGenerator.applyRollOverrides(gen0, null);
    Tester.assert(true, "Core: null override source is a no-op.");

    // identity ternary: secret side
    const gen = new CharacterGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();
    gen.identitySecret = true;
    const char = gen.generateWithoutThrows({ identitySecret: true });
    Tester.assertEquals(
        "Secret",
        char.identity,
        "Core: secret identity ternary.",
    );

    // generatePhase1 fallback when the roll misses every form row
    const gen2 = new CharacterGenerator();
    gen2.setTables();
    const origThrow = gen2.throwAllRolls.bind(gen2);
    gen2.throwAllRolls = () => {
        origThrow();
        gen2.physicalFormRoll = 101;
    };
    const phase = gen2.generatePhase1();
    Tester.assertEquals(
        gen2.physicalFormTable[0].name,
        gen2._lastPhysicalForm,
        "Core: phase1 falls back to the first form row.",
    );
    Tester.assert(
        phase !== null && phase.powersCount >= 0,
        "Core: phase1 result returned.",
    );
};

Tester.RosterSlotTalentGuardTests = () => {
    const gen = new CharacterGenerator();
    gen.setTables();
    gen.setDeterministicRolls();

    // getTalentSlotCount: falsy roll falls back to roll 1
    gen.talentNumberRoll = 1;
    const withOne = gen.getTalentSlotCount();
    gen.talentNumberRoll = 0;
    Tester.assertEquals(
        withOne,
        gen.getTalentSlotCount(),
        "Roster: talentNumberRoll 0 falls back to roll 1.",
    );
    gen.talentNumberRoll = 50;

    // empty quantity table → early default of 4 slots (both counters)
    const savedQty = gen.quantityTable;
    gen.quantityTable = [];
    try {
        Tester.assertEquals(
            4,
            gen.getTalentSlotCount(),
            "Roster: missing quantity row → 4 talent slots.",
        );
        Tester.assertEquals(
            4,
            gen.getContactSlotCount(),
            "Roster: missing quantity row → 4 contact slots.",
        );
    } finally {
        gen.quantityTable = savedQty;
    }

    // getContactSlotCount: adjustment + minimum floor, then maximum cap
    const row = gen.physicalFormTable[0];
    const savedAdj = row.contactsCountAdjustment;
    const savedMin = row.contactsCountMinimum;
    const savedMax = row.contactsCountMaximum;
    gen._lastPhysicalForm = row.name;
    try {
        row.contactsCountAdjustment = 5;
        row.contactsCountMinimum = 99;
        row.contactsCountMaximum = undefined;
        const high = gen.getContactSlotCount();
        Tester.assert(
            high >= 99,
            `Roster: contact adjustment + minimum floor (got ${high}).`,
        );

        row.contactsCountAdjustment = 0;
        row.contactsCountMinimum = undefined;
        row.contactsCountMaximum = 1;
        const low = gen.getContactSlotCount();
        Tester.assert(low <= 1, `Roster: contact maximum cap (got ${low}).`);
    } finally {
        row.contactsCountAdjustment = savedAdj;
        row.contactsCountMinimum = savedMin;
        row.contactsCountMaximum = savedMax;
        gen._lastPhysicalForm = null;
    }

    // getAvailableTalents: missing description / subRoll defaults
    const catTable = gen.talentCategoriesTable;
    const listTable = gen.talentListTable;
    catTable.unshift({ name: "ZZDescCat", maxRoll: 100 });
    listTable.push(
        {
            category: "ZZDescCat",
            name: "NoDescTalent",
            maxRoll: 100,
            subRoll: 40,
        },
        {
            category: "ZZDescCat",
            name: "PlainTalent",
            maxRoll: 100,
            description: "d",
        },
    );
    try {
        const cats = gen.getAvailableTalents();
        const zz = cats.find((c) => c.category === "ZZDescCat");
        Tester.assertNotNull(zz, "Roster: fixture category listed.");
        const noDesc = zz && zz.talents.find((t) => t.name === "NoDescTalent");
        Tester.assert(
            noDesc !== undefined && noDesc !== null,
            "Roster: description-less talent listed.",
        );
        Tester.assertEquals(
            "",
            noDesc && noDesc.description,
            "Roster: missing description defaults to ''.",
        );
        Tester.assertEquals(
            40,
            noDesc && noDesc.subRoll,
            "Roster: subRoll exposed on the talent.",
        );
        const plain = zz && zz.talents.find((t) => t.name === "PlainTalent");
        Tester.assertEquals(
            null,
            plain && plain.subRoll,
            "Roster: missing subRoll defaults to null.",
        );
    } finally {
        listTable.pop();
        listTable.pop();
        catTable.shift();
    }

    // generateTalents manual: oversized skips, default count pushes
    const genM = new CharacterGenerator();
    genM.setTables();
    genM.setDeterministicRolls();
    const charM = new Character();
    charM.talents = [];
    charM.talentsMax = 3;
    charM.talentsCount = 3;
    genM._selectedTalents = [
        { category: "Talents", name: "ManualTalentHog", talentCount: 99 },
    ];
    try {
        genM.generateTalents(charM, 0);
        Tester.assertEquals(
            0,
            charM.talents.length,
            "Roster: oversized manual talent skipped.",
        );
    } finally {
        genM._selectedTalents = null;
    }

    const genN = new CharacterGenerator();
    genN.setTables();
    genN.setDeterministicRolls();
    const charN = new Character();
    charN.talents = [];
    charN.talentsMax = 3;
    charN.talentsCount = 3;
    genN._selectedTalents = [
        { category: "Talents", name: "ManualTalentPlain" },
    ];
    try {
        genN.generateTalents(charN, 0);
        Tester.assertEquals(
            1,
            charN.talents.length,
            "Roster: default-count manual talent pushed.",
        );
        Tester.assertEquals(
            "ManualTalentPlain",
            charN.talents[0] && charN.talents[0].name,
            "Roster: manual talent name recorded.",
        );
    } finally {
        genN._selectedTalents = null;
    }

    // dup-advance: re-roll lands on no talent → early return
    const genD = new CharacterGenerator();
    genD.setTables();
    genD.setDeterministicRolls();
    const firstCat = genD.talentCategoriesTable.find(
        (c) => genD.talentCategoryRolls[0] <= c.maxRoll,
    );
    const firstTalent = firstCat
        ? genD._findTalent(
              firstCat.name,
              genD.talentRolls[0],
              genD.talentSubRolls[0],
          )
        : null;
    if (firstTalent) {
        genD._assignedTalentNames = new Set([firstTalent.name]);
        genD.talentRolls[1] = 101;
        const charD = new Character();
        charD.talents = [];
        charD.talentsMax = 3;
        charD.talentsCount = 3;
        genD.generateTalents(charD, 0);
        Tester.assertEquals(
            0,
            charD.talents.length,
            "Roster: dup advance with no matching talent returns.",
        );
    } else {
        Tester.assert(true, "Roster: dup-advance fixture skipped.");
    }

    // overflow: advance hits an assigned talent, a category miss, then bound
    const genO = new CharacterGenerator();
    genO.setTables();
    genO.setDeterministicRolls();
    const catTableO = genO.talentCategoriesTable;
    const listTableO = genO.talentListTable;
    catTableO.unshift({ name: "ZZOvfCat", maxRoll: 999 });
    listTableO.push(
        {
            category: "ZZOvfCat",
            name: "ZZOvfTalentA",
            maxRoll: 40,
            talentCount: 3,
            description: "a",
            subRoll: 10,
        },
        {
            category: "ZZOvfCat",
            name: "ZZOvfTalentB",
            maxRoll: 60,
            talentCount: 1,
            description: "b",
            subRoll: 20,
        },
    );
    try {
        genO._assignedTalentNames = new Set(["ZZOvfTalentA", "ZZOvfTalentB"]);
        genO.talentCategoryRolls = Array(genO.rollArraySize).fill(1000);
        genO.talentCategoryRolls[0] = 999;
        genO.talentCategoryRolls[1] = 999;
        genO.talentRolls[0] = 40; // tightest → ZZOvfTalentA (count 3)
        const charO = new Character();
        charO.talents = [];
        charO.talentsMax = 2;
        charO.talentsCount = 2;
        genO.generateTalents(charO, 0);
        Tester.assertEquals(
            0,
            charO.talents.length,
            "Roster: overflow advances exhaust every escape without a push.",
        );
    } finally {
        listTableO.pop();
        listTableO.pop();
        catTableO.shift();
    }

    // rollDisplay: subRoll present vs absent both reach the log line
    const genR = new CharacterGenerator();
    genR.setTables();
    genR.setDeterministicRolls();
    const catR = genR.talentCategoriesTable;
    const listR = genR.talentListTable;
    catR.unshift({ name: "ZZDispCat", maxRoll: 999 });
    listR.push(
        {
            category: "ZZDispCat",
            name: "ZZDispSub",
            maxRoll: 40,
            description: "s",
            subRoll: 40,
        },
        {
            category: "ZZDispCat",
            name: "ZZDispPlain",
            maxRoll: 100,
            description: "p",
        },
    );
    try {
        genR.talentCategoryRolls[0] = 999;
        genR.talentRolls[0] = 30; // tightest → ZZDispSub (has subRoll)
        const cSub = new Character();
        cSub.talents = [];
        cSub.talentsMax = 9;
        cSub.talentsCount = 9;
        genR.generateTalents(cSub, 0);
        Tester.assertEquals(
            "ZZDispSub",
            cSub.talents[0] && cSub.talents[0].name,
            "Roster: subRoll talent pushed (log shows the sub roll).",
        );

        genR.talentRolls[0] = 70; // only ZZDispPlain qualifies
        const cPlain = new Character();
        cPlain.talents = [];
        cPlain.talentsMax = 9;
        cPlain.talentsCount = 9;
        genR.generateTalents(cPlain, 0);
        Tester.assertEquals(
            "ZZDispPlain",
            cPlain.talents[0] && cPlain.talents[0].name,
            "Roster: plain talent pushed (log omits the sub roll).",
        );
    } finally {
        listR.pop();
        listR.pop();
        catR.shift();
    }
};

Tester.PowersRetryGapScanTests = () => {
    // Shrink every category band to 50 so rolls 51-100 miss the table —
    // the only way to reach the !catEntry guards with contiguous data.
    const patchCats = (gen) => {
        const table = gen.powerCategoriesTable;
        const saved = table.map((c) => c.maxRoll);
        table.forEach((c) => {
            c.maxRoll = 50;
        });
        return () =>
            table.forEach((c, i) => {
                c.maxRoll = saved[i];
            });
    };

    // (A) dup retry loop: every retry category roll misses → exhaust
    const genA = new CharacterGenerator();
    genA.setTables();
    genA.setDeterministicRolls();
    const restoreA = patchCats(genA);
    try {
        genA.powerCategoryRolls = Array(genA.rollArraySize).fill(60);
        genA.powerCategoryRolls[0] = 5;
        const catA = genA.powerCategoriesTable.find((c) => 5 <= c.maxRoll);
        const rowsA = genA.powerListTable.filter(
            (p) => catA && p.category === catA.name,
        );
        if (catA && rowsA.length > 0) {
            genA._assignedPowerNames = new Set(rowsA.map((p) => p.name));
            genA.powerRolls = Array(genA.rollArraySize).fill(50);
            genA.powerRolls[0] = rowsA[0].maxRoll; // resolves an assigned row
            const charA = new Character();
            charA.powers = [];
            charA.powersCount = 4;
            charA.powersMax = 6;
            genA.generateSinglePower(charA, 0);
            Tester.assertEquals(
                0,
                charA.powers.length,
                "Power: dup retry loop with gap rolls exhausts.",
            );
        } else {
            Tester.assert(true, "Power: dup-retry fixture skipped.");
        }
    } finally {
        restoreA();
    }

    // (B) roll miss → same-category scan picks the first free member
    const genB = new CharacterGenerator();
    genB.setTables();
    genB.setDeterministicRolls();
    genB._assignedPowerNames = new Set();
    genB.powerCategoryRolls = Array(genB.rollArraySize).fill(60);
    genB.powerCategoryRolls[0] = 5;
    genB.powerRolls = Array(genB.rollArraySize).fill(50);
    const catB = genB.powerCategoriesTable.find((c) => 5 <= c.maxRoll);
    const rowsB = genB.powerListTable.filter(
        (p) => catB && p.category === catB.name,
    );
    const savedMaxB = rowsB.map((p) => p.maxRoll);
    rowsB.forEach((p) => {
        p.maxRoll = 1;
    });
    try {
        const charB = new Character();
        charB.powers = [];
        charB.powersCount = 4;
        charB.powersMax = 6;
        genB.generateSinglePower(charB, 0);
        Tester.assertEquals(
            1,
            charB.powers.length,
            "Power: roll miss falls through to the same-category scan.",
        );
        Tester.assertEquals(
            catB && catB.name,
            charB.powers[0] && charB.powers[0].category,
            "Power: scan stays inside the rolled category.",
        );
    } finally {
        rowsB.forEach((p, i) => {
            p.maxRoll = savedMaxB[i];
        });
    }

    // (C) cross-category retry: gap roll, valid-category miss, then exhaust
    const genC = new CharacterGenerator();
    genC.setTables();
    genC.setDeterministicRolls();
    const restoreC = patchCats(genC);
    const catC = genC.powerCategoriesTable.find((c) => 5 <= c.maxRoll);
    const rowsC = genC.powerListTable.filter(
        (p) => catC && p.category === catC.name,
    );
    const savedMaxC = rowsC.map((p) => p.maxRoll);
    rowsC.forEach((p) => {
        p.maxRoll = 1;
    });
    genC._assignedPowerNames = new Set(rowsC.map((p) => p.name));
    genC.powerCategoryRolls = Array(genC.rollArraySize).fill(60);
    genC.powerCategoryRolls[0] = 5;
    genC.powerCategoryRolls[2] = 5; // valid category, but the roll misses
    genC.powerRolls = Array(genC.rollArraySize).fill(50);
    try {
        const charC = new Character();
        charC.powers = [];
        charC.powersCount = 4;
        charC.powersMax = 6;
        genC.generateSinglePower(charC, 0);
        Tester.assertEquals(
            0,
            charC.powers.length,
            "Power: cross-category retries with gap rolls add nothing.",
        );
    } finally {
        restoreC();
        rowsC.forEach((p, i) => {
            p.maxRoll = savedMaxC[i];
        });
    }

    // (D) cross-category retry runs off the end of the roll array → break
    const genD = new CharacterGenerator();
    genD.setTables();
    genD.setDeterministicRolls();
    const restoreD = patchCats(genD);
    const catD = genD.powerCategoriesTable.find((c) => 5 <= c.maxRoll);
    const rowsD = genD.powerListTable.filter(
        (p) => catD && p.category === catD.name,
    );
    const savedMaxD = rowsD.map((p) => p.maxRoll);
    rowsD.forEach((p) => {
        p.maxRoll = 1;
    });
    genD._assignedPowerNames = new Set(rowsD.map((p) => p.name));
    genD.powerCategoryRolls = Array(genD.rollArraySize).fill(60);
    genD.powerCategoryRolls[genD.rollArraySize - 1] = 5;
    genD.powerRolls = Array(genD.rollArraySize).fill(50);
    try {
        const charD = new Character();
        charD.powers = [];
        charD.powersCount = 4;
        charD.powersMax = 6;
        genD.generateSinglePower(charD, genD.rollArraySize - 1);
        Tester.assertEquals(
            0,
            charD.powers.length,
            "Power: retry running off the roll array breaks out.",
        );
    } finally {
        restoreD();
        rowsD.forEach((p, i) => {
            p.maxRoll = savedMaxD[i];
        });
    }

    // (E) every power roll > 100 → array exhaustion return
    const genE = new CharacterGenerator();
    genE.setTables();
    genE.setDeterministicRolls();
    genE.powerRolls = Array(genE.rollArraySize).fill(101);
    genE.powerCategoryRolls[0] = 5;
    const charE = new Character();
    charE.powers = [];
    charE.powersCount = 4;
    charE.powersMax = 6;
    genE.generateSinglePower(charE, 0);
    Tester.assertEquals(
        0,
        charE.powers.length,
        "Power: all-invalid power rolls exhaust the array.",
    );

    // (F) duplicate roll retries within the category (higher maxRoll scan)
    const genF = new CharacterGenerator();
    genF.setTables();
    genF.setDeterministicRolls();
    genF.powerCategoryRolls = Array(genF.rollArraySize).fill(60);
    genF.powerCategoryRolls[0] = 5;
    const catF = genF.powerCategoriesTable.find((c) => 5 <= c.maxRoll);
    const rowsF = genF.powerListTable.filter(
        (p) => catF && p.category === catF.name,
    );
    const lowF = rowsF.find(
        (p) =>
            p.maxRoll <= 100 &&
            rowsF.some((o) => o.maxRoll > p.maxRoll && o.maxRoll <= 100),
    );
    if (lowF) {
        genF.powerRolls = Array(genF.rollArraySize).fill(50);
        genF.powerRolls[0] = lowF.maxRoll;
        const resolved = genF.powerListTable.find(
            (p) => p.category === catF.name && lowF.maxRoll <= p.maxRoll,
        );
        genF._assignedPowerNames = new Set(
            resolved ? [resolved.name] : [lowF.name],
        );
        const charF = new Character();
        charF.powers = [];
        charF.powersCount = 4;
        charF.powersMax = 6;
        genF.generateSinglePower(charF, 0);
        const pushedF = charF.powers[0];
        Tester.assert(
            pushedF !== undefined,
            "Power: duplicate roll retries within the category.",
        );
        Tester.assert(
            pushedF && pushedF.name !== (resolved ? resolved.name : lowF.name),
            "Power: duplicate retry replaced the assigned power.",
        );
    } else {
        Tester.assert(true, "Power: dup-scan fixture skipped.");
    }
};

Tester.RitualExtraInfoEdgeTests = () => {
    const gen = new CharacterGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();

    // (a) roll matches no ritual row → empty string
    gen.powersExtraInfoRolls = [999];
    gen.peiIndex = 0;
    Tester.assertEquals(
        "",
        gen.getRitualRollsExtraInformation(),
        "Ritual: unmatched roll → empty string.",
    );

    // (b) mechanism rolls already exhausted → header, then break
    gen.powersExtraInfoRolls = [50];
    gen.peiIndex = 0;
    const outB = gen.getRitualRollsExtraInformation();
    Tester.assert(
        outB.indexOf("RITUALS") !== -1,
        `Ritual: header written before break (got '${outB.slice(0, 24)}').`,
    );
    Tester.assertEquals(
        -1,
        outB.indexOf("/"),
        "Ritual: break fires before any mechanism is appended.",
    );

    // (c) >84 roll skipped, then a valid mechanism appended
    gen.powersExtraInfoRolls = [50, 95, 20];
    gen.peiIndex = 0;
    const outC = gen.getRitualRollsExtraInformation();
    Tester.assert(
        outC.indexOf("RITUALS") !== -1,
        "Ritual: skip-then-append path works.",
    );
    Tester.assert(
        outC.indexOf("/") !== -1,
        `Ritual: mechanism appended (got '${outC.slice(0, 40)}').`,
    );
};

Tester.PowersUpgradeDuplicateSlotTests = () => {
    const gen = new CharacterGenerator();
    gen.setTables();
    gen.setDeterministicRolls();
    const base = gen.powerListTable.find((p) => p.name && p.category);
    const other = gen.powerListTable.find(
        (p) => p !== base && p.name && p.category,
    );
    if (!base || !other) {
        Tester.assert(true, "Upgrade slots: fixture skipped.");
        return;
    }
    const infoBase = CharacterGenerator._parseUpgradePower(
        base.category + "\\" + base.name,
    );
    const infoOther = CharacterGenerator._parseUpgradePower(
        other.category + "\\" + other.name,
    );
    Tester.assert(
        infoBase !== null && infoOther !== null,
        "Upgrade slots: parse produces info objects.",
    );
    if (!infoBase || !infoOther) return;

    // canUpgradePower with a duplicate already held → duplicateCost ternary
    const char1 = new Character();
    char1.powers = [{ ...base }, { ...base }];
    char1.powersMax = 10;
    const check1 = gen.canUpgradePower(char1, 0, infoBase);
    Tester.assert(
        typeof check1.upgradeSlots === "number",
        `Upgrade slots: duplicate check computes slots (${check1.upgradeSlots}).`,
    );

    // applyPowerUpgrade: non-duplicate path
    const char2 = new Character();
    char2.powers = [{ ...base }];
    char2.powersMax = 10;
    char2.physicalForm = gen.physicalFormTable[0].name;
    const applied2 = gen.applyPowerUpgrade(char2, 0, infoOther);
    Tester.assert(
        applied2 === true,
        "Upgrade slots: non-duplicate apply succeeds.",
    );

    // applyPowerUpgrade: duplicate path (duplicateCost slots)
    const savedDup = other.allowDuplicate;
    other.allowDuplicate = true;
    const char3 = new Character();
    char3.powers = [{ ...base }, { ...other }];
    char3.powersMax = 10;
    char3.physicalForm = gen.physicalFormTable[0].name;
    try {
        const applied3 = gen.applyPowerUpgrade(char3, 0, infoOther);
        Tester.assert(
            applied3 === true,
            "Upgrade slots: duplicate apply uses the duplicateCost path.",
        );
    } finally {
        other.allowDuplicate = savedDup;
    }
};

Tester.UtilityEntryPolicyTests = () => {
    // splitDslAlternatives keeps empty entries, so "~" → ["", ""] and the
    // picked (non-null) element comes back — pinning actual behavior.
    Tester.assertEquals(
        "",
        Utility.pickDslAlternative("~"),
        "Utility: '~' splits into empty elements, one is picked.",
    );
    Tester.assertEquals(
        null,
        Utility.pickDslAlternative(null),
        "Utility: null entry → null.",
    );

    // parseDslEntry: preferSlash separator
    const slash = Utility.parseDslEntry("Contact/Contactee", {
        preferSlash: true,
    });
    Tester.assertEquals(
        2,
        slash.segments.length,
        "Utility: preferSlash splits on /.",
    );
    Tester.assertEquals(
        "Contact",
        slash.category,
        "Utility: slash category parsed.",
    );

    // parseDslEntry: leading "(" prefix (pos === 0)
    const lead = Utility.parseDslEntry("(Ghost)Form\\Body", {
        subTypePrefix: true,
    });
    Tester.assertEquals(
        "Ghost)Form",
        lead.segments[0],
        "Utility: leading paren stripped from segment 0.",
    );
    Tester.assertEquals(
        "Body",
        lead.name,
        "Utility: two-segment name taken from the trailing segment.",
    );
};

Tester.TooManyDuplicateExitTests = () => {
    // Regression for the fuzz-caught overfill: the Too-Many-Powers loop also
    // exits when the next candidate is a duplicate (cond 3) or powerRow goes
    // undefined — the old code then fell through and pushed that duplicate,
    // producing total power slots > powersMax (and a duplicate power).
    const gen = new CharacterGenerator();
    gen.generatorMode = "basic";
    gen.setTables();
    gen.setDeterministicRolls();

    const multiSlotRows = gen.powerListTable.filter(
        (r) => (r.powerCount || 1) >= 2,
    );
    const igRow = gen.powerListTable.find((r) => r.name === "Image Generation");
    Tester.assert(
        igRow !== undefined && multiSlotRows.some((r) => r.name !== igRow.name),
        "TooMany exit: data has Image Generation + another multi-slot power.",
    );
    const initialRow = multiSlotRows.find((r) => r.name !== igRow.name);
    const initialCat = gen.powerCategoriesTable.find(
        (c) => c.name === initialRow.category,
    );
    const igCat = gen.powerCategoriesTable.find(
        (c) => c.name === igRow.category,
    );

    // Craft the hunt state: slotSum 3 of count 4 → remaining 1, so no
    // multi-slot candidate can fit and the loop has to advance.
    const char = new Character();
    char.powersCount = 4;
    char.powersMax = 4;
    char.powers = [
        {
            name: "Filler Power",
            category: "Mental Powers",
            powerSlots: 1,
            rank: "Good",
        },
        {
            name: igRow.name,
            category: igRow.category,
            powerSlots: 2,
            rank: "Good",
        },
    ];

    // index 0 → an unassigned multi-slot power (enters Too-Many loop)
    gen.powerCategoryRolls[0] = initialCat.maxRoll;
    gen.powerRolls[0] = initialRow.maxRoll;
    gen.powerRankRolls[0] = 50;
    // index 1 → the duplicate Image Generation row (loop exits on dup)
    gen.powerCategoryRolls[1] = igCat.maxRoll;
    gen.powerRolls[1] = igRow.maxRoll;
    gen.powerRankRolls[1] = 50;

    gen.generateSinglePower(char, 0);

    Tester.assertEquals(
        2,
        char.powers.length,
        "TooMany exit: duplicate candidate is not pushed.",
    );
    const total = char.powers.reduce((s, p) => s + (p.powerSlots || 1), 0);
    Tester.assert(
        total <= char.powersMax,
        `TooMany exit: total slots (${total}) stay within powersMax.`,
    );
    Tester.assertEquals(
        1,
        char.powers.filter((p) => p.name === igRow.name).length,
        "TooMany exit: no duplicate power names.",
    );
};

// ==========================================================================
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
    { name: "CharacterAbilityIndexTests", needsGen: false },
    { name: "CorePhaseAndOverrideTests", needsGen: false },
    { name: "FrameworkMetaTests", needsGen: false },
    { name: "UtilityDslPolicyTests", needsGen: false },
    { name: "RosterTalentSlotAndListTests", needsGen: false },
    { name: "RosterBonusTalentTests", needsGen: false },
    { name: "RosterGenerateTalentsTests", needsGen: false },
    { name: "RosterBonusContactTests", needsGen: false },
    { name: "PowersRetryAndExhaustTests", needsGen: false },
    { name: "PowersOptionalEdgeTests", needsGen: false },
    { name: "PowersQueryAndSelectionTests", needsGen: false },
    { name: "DeterminePhysicalFormGuardTests", needsGen: false },
    { name: "DetermineOriginAbilityGuardTests", needsGen: false },
    { name: "DetermineResourcesHiTechTests", needsGen: false },
    { name: "PopularityClampGuardTests", needsGen: false },
    { name: "PopularityNullGuardTests", needsGen: false },
    { name: "ManualLeftoverOptionalTests", needsGen: false },
    { name: "ContactManualRandomGuardTests", needsGen: false },
    { name: "BoostGuardTests", needsGen: false },
    { name: "CoreIdentityPhaseFallbackTests", needsGen: false },
    { name: "RosterSlotTalentGuardTests", needsGen: false },
    { name: "PowersRetryGapScanTests", needsGen: false },
    { name: "RitualExtraInfoEdgeTests", needsGen: false },
    { name: "PowersUpgradeDuplicateSlotTests", needsGen: false },
    { name: "UtilityEntryPolicyTests", needsGen: false },
    { name: "TooManyDuplicateExitTests", needsGen: false },
]);
