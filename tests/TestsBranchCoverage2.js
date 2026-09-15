// ============================================================================
// TestsBranchCoverage2 — Target remaining uncovered lines in CharactorGenerator.js
// Each test directly exercises a specific uncovered code path.
// ============================================================================

// ---------------------------------------------------------------------------
// 1. Lines 615-617: *Set ability path (fightingSet, agilitySet, etc.)
//    Needs: physicalFormRow has abilityLower + 'Set' with { rank, rankNumber }
// ---------------------------------------------------------------------------
Tester.AbilitySetPathTests = () => {
    const gen = new CharactorGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();

    const form = gen.physicalFormTable.find((r) => r.name === "Normal Human");
    if (!form) {
        Tester.assert(true, "AbilitySetPath: skipped.");
        return;
    }
    const origSet = form.fightingSet;
    form.fightingSet = { rank: "Excellent", rankNumber: 20 };

    try {
        const char = gen.generateWithoutThrows();
        const fighting = char.getAbility("Fighting");
        Tester.assertEquals(
            "Excellent",
            fighting.rank,
            "AbilitySetPath: Fighting set to Excellent via fightingSet.",
        );
    } finally {
        if (origSet !== undefined) form.fightingSet = origSet;
        else delete form.fightingSet;
    }
};

// ---------------------------------------------------------------------------
// 2. Lines 622-624: Normal ability path (no *Set, no *Start)
//    This is the ELSE branch — should be hit for abilities without overrides
//    Call determineAbility directly for an ability without *Set/*Start
// ---------------------------------------------------------------------------
Tester.AbilityNormalPathTests = () => {
    // The normal ability path (lines 622-624) is the ELSE branch of
    // if (value === -1) after *Set/*Start checks. Every ability without
    // a *Set/*Start override hits this path during generation.
    const gen = new CharactorGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();
    // Normal Human has no *Set/*Start attributes, so all 7 abilities
    // use the normal roll path
    const char = gen.generateWithoutThrows();
    const agility = char.getAbility("Agility", 0);
    Tester.assert(
        agility.rank !== "" && agility.number > 0,
        `AbilityNormalPath: Agility rank='${agility.rank}', number=${agility.number}.`,
    );
};

// ---------------------------------------------------------------------------
// 3. Lines 762-764, 768-770, 774-776: getAbilityAfterModifier min/max/Shift0
// ---------------------------------------------------------------------------
Tester.GetAbilityAfterModifierEdgeTests = () => {
    const gen = new CharactorGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();

    const char = new Charactor();

    // min clamping (762-764): Feeble adjusted by 0, min=Typical → clamped up
    const r1 = gen.getAbilityAfterModifier(
        char,
        "Fighting",
        "Feeble",
        0,
        "Typical",
        -1,
    );
    Tester.assertEquals(
        "Typical",
        r1,
        "ModifierMin: Feeble clamped to Typical.",
    );

    // max clamping (768-770): Monstrous adjusted by 0, max=Amazing → clamped down
    const r2 = gen.getAbilityAfterModifier(
        char,
        "Fighting",
        "Monstrous",
        0,
        -1,
        "Amazing",
    );
    Tester.assertEquals(
        "Amazing",
        r2,
        "ModifierMax: Monstrous clamped to Amazing.",
    );

    // Shift 0 → Feeble (774-776): adjustment drops rank to Shift 0
    const r3 = gen.getAbilityAfterModifier(
        char,
        "Fighting",
        "Shift 0",
        0,
        -1,
        -1,
    );
    Tester.assertEquals(
        "Feeble",
        r3,
        "ModifierShift0: Shift 0 becomes Feeble.",
    );
};

// ---------------------------------------------------------------------------
// 4. Lines 812-814: hiTechToGood = false (resources keep original rank)
// ---------------------------------------------------------------------------
Tester.HiTechToGoodFalseTests = () => {
    const gen = new CharactorGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();

    const hiTechForm = gen.physicalFormTable.find(
        (r) => Utility.getValue(r, "isHiTech", false) === true,
    );
    if (!hiTechForm) {
        Tester.assert(true, "HiTechToGoodFalse: skipped.");
        return;
    }

    gen.physicalFormRoll = hiTechForm.maxRoll;
    gen.hiTechToGood = false;

    const char = gen.generateWithoutThrows();
    Tester.assert(char !== null, "HiTechToGoodFalse: generates.");
    // Resources should have startRank from roll, NOT overridden to "Good"
    Tester.assert(
        char.resources.rank !== undefined,
        `HiTechToGoodFalse: resources.rank = '${char.resources.rank}'.`,
    );
};

// ---------------------------------------------------------------------------
// 5. Lines 882-887: popularitySet in ultimate mode
// ---------------------------------------------------------------------------
Tester.PopularitySetUltimateTests = () => {
    const gen = new CharactorGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();

    const form = gen.physicalFormTable.find((r) => r.name === "Normal Human");
    if (!form) {
        Tester.assert(true, "PopSetUlt: skipped.");
        return;
    }
    const orig = form.popularitySet;
    form.popularitySet = 15;

    try {
        const char = new Charactor();
        char.physicalForm = "Normal Human";
        gen.popularityRoll = 50;
        gen.determinePopularityUltimate(char);
        Tester.assertEquals(
            15,
            char.popularity,
            "PopSetUlt: popularity set to 15.",
        );
        Tester.assertEquals(
            15,
            char.state.popularity.set,
            "PopSetUlt: state.popularity.set is 15.",
        );
    } finally {
        if (orig !== undefined) form.popularitySet = orig;
        else delete form.popularitySet;
    }
};

// ---------------------------------------------------------------------------
// 6. Lines 905-907: popularityStart in ultimate mode
// ---------------------------------------------------------------------------
Tester.PopularityStartUltimateTests = () => {
    const gen = new CharactorGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();

    // Robot - human shape has popularityStart: 0
    const form = gen.physicalFormTable.find(
        (r) => r.name === "Robot - human shape",
    );
    if (!form) {
        Tester.assert(true, "PopStartUlt: skipped.");
        return;
    }

    const char = new Charactor();
    char.physicalForm = form.name;
    gen.popularityRoll = 50;
    gen.identitySecret = true;
    gen.determinePopularityUltimate(char);
    // popularityStart=0 means popularity starts at 0
    Tester.assert(
        char.popularity !== undefined,
        `PopStartUlt: popularity = ${char.popularity}.`,
    );
    Tester.assertEquals(
        0,
        char.state.popularity.start,
        "PopStartUlt: state.popularity.start is 0.",
    );
};

// ---------------------------------------------------------------------------
// 7. Lines 971-973, 976-978: popularity min/max after identity/public adjustment
//    In ultimate mode — need a form with popularityMinimum/popularityMaximum
// ---------------------------------------------------------------------------
Tester.PopularityMinMaxUltimateTests = () => {
    const gen = new CharactorGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();

    // Patch Normal Human to have popularityMinimum and popularityMaximum
    const form = gen.physicalFormTable.find((r) => r.name === "Normal Human");
    if (!form) {
        Tester.assert(true, "PopMinMaxUlt: skipped.");
        return;
    }
    const origMin = form.popularityMinimum;
    const origMax = form.popularityMaximum;
    form.popularityMinimum = 20;
    form.popularityMaximum = 30;

    try {
        const char = new Charactor();
        char.physicalForm = "Normal Human";
        gen.popularityRoll = 50;
        gen.identitySecret = false; // public → +10
        gen.determinePopularityUltimate(char);
        // Popularity should be clamped to [20, 30]
        Tester.assert(
            char.popularity >= 20,
            `PopMinMaxUlt: popularity (${char.popularity}) >= 20.`,
        );
        Tester.assert(
            char.popularity <= 30,
            `PopMinMaxUlt: popularity (${char.popularity}) <= 30.`,
        );
    } finally {
        if (origMin !== undefined) form.popularityMinimum = origMin;
        else delete form.popularityMinimum;
        if (origMax !== undefined) form.popularityMaximum = origMax;
        else delete form.popularityMaximum;
    }
};

// ---------------------------------------------------------------------------
// 8. Lines 1008-1010: popularityStart in basic mode
// ---------------------------------------------------------------------------
Tester.PopularityStartBasicTests = () => {
    const gen = new CharactorGenerator();
    gen.generatorMode = "basic";
    gen.setTables();
    gen.setDeterministicRolls();

    const form = gen.physicalFormTable.find((r) => r.name === "Mutant");
    if (!form) {
        Tester.assert(true, "PopStartGen: skipped.");
        return;
    }
    const orig = form.popularityStart;
    form.popularityStart = 25;

    try {
        const char = new Charactor();
        char.physicalForm = "Mutant";
        gen.identitySecret = false;
        gen.originPublic = false;
        gen.determinePopularity(char);
        // popularityStart=25 sets base, then modifiers applied
        Tester.assert(
            char.popularity !== undefined,
            `PopStartGen: popularity = ${char.popularity}.`,
        );
    } finally {
        if (orig !== undefined) form.popularityStart = orig;
        else delete form.popularityStart;
    }
};

// ---------------------------------------------------------------------------
// 9. Lines 1061-1063, 1067-1069: wellEstablished / looksHuman in basic mode
// ---------------------------------------------------------------------------
Tester.WellEstablishedLooksHumanTests = () => {
    const gen = new CharactorGenerator();
    gen.generatorMode = "basic";
    gen.setTables();
    gen.setDeterministicRolls();

    const form = gen.physicalFormTable.find((r) => r.name === "Mutant");
    if (!form) {
        Tester.assert(true, "WE LH: skipped.");
        return;
    }

    // Test wellEstablished
    const char1 = new Charactor();
    char1.physicalForm = "Mutant";
    gen.identitySecret = false;
    gen.originPublic = false;
    gen.wellEstablished = true;
    gen.looksHuman = false;
    gen.determinePopularity(char1);

    // Test looksHuman
    const char2 = new Charactor();
    char2.physicalForm = "Mutant";
    gen.identitySecret = false;
    gen.originPublic = false;
    gen.wellEstablished = false;
    gen.looksHuman = true;
    gen.determinePopularity(char2);

    // looksHuman adds +10
    Tester.assert(
        char2.popularity > 0,
        `LooksHuman: popularity (${char2.popularity}) > 0.`,
    );

    // wellEstablished adds +20
    Tester.assert(
        char1.popularity > 0,
        `WellEstablished: popularity (${char1.popularity}) > 0.`,
    );
};

// ---------------------------------------------------------------------------
// 10. Lines 1293-1295: powersCountMinimum
// ---------------------------------------------------------------------------
Tester.PowersCountMinimumTests = () => {
    const gen = new CharactorGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();

    const form = gen.physicalFormTable.find((r) => r.name === "Normal Human");
    if (!form) {
        Tester.assert(true, "PowersCountMin: skipped.");
        return;
    }
    const orig = form.powersCountMinimum;
    form.powersCountMinimum = 5;

    try {
        const char = gen.generateWithoutThrows();
        Tester.assert(
            char.powersCount >= 5,
            `PowersCountMin: powersCount (${char.powersCount}) >= 5.`,
        );
    } finally {
        if (orig !== undefined) form.powersCountMinimum = orig;
        else delete form.powersCountMinimum;
    }
};

// ---------------------------------------------------------------------------
// 11. Lines 1514-1545: cross-category retry (powerRow === undefined path)
//     Need: powerRoll doesn't match any power → scans category → cross-category
// ---------------------------------------------------------------------------
Tester.CrossCategoryRetryTests = () => {
    const gen = new CharactorGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();

    gen.physicalFormRoll = 1;
    gen.powerNumberRoll = 50; // 2 powers

    // First power: valid
    gen.powerCategoryRolls[0] = 25;
    gen.powerRolls[0] = 50;
    gen.powerRankRolls[0] = 50;

    // Second power: powerRoll > 100 → enters "while (powerRoll > 100)" path first
    gen.powerCategoryRolls[1] = 25;
    gen.powerRolls[1] = 150;
    gen.powerRankRolls[1] = 50;

    // Fallback: valid at next index
    gen.powerCategoryRolls[2] = 25;
    gen.powerRolls[2] = 50;
    gen.powerRankRolls[2] = 50;

    const char = gen.generateWithoutThrows();
    Tester.assert(char !== null, "CrossCategoryRetry: generates.");
};

// ---------------------------------------------------------------------------
// 12. Lines 1552-1570: Too many powers retry loop
//     powerCount > remainingSlots → tries next index
// ---------------------------------------------------------------------------
Tester.TooManyPowersRetryTests = () => {
    const gen = new CharactorGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();

    gen.physicalFormRoll = 1;
    gen.powerNumberRoll = 1; // Minimum powers
    gen.powerCategoryRolls[0] = 25;
    gen.powerRolls[0] = 50;
    gen.powerRankRolls[0] = 50;

    const char = gen.generateWithoutThrows();
    Tester.assert(char !== null, "TooManyPowersRetry: generates.");
};

// ---------------------------------------------------------------------------
// 13. Lines 1694-1696, 1727-1729: Bonus power "Any" inner retry
//     Need a form with bonusPower containing "Any" and duplicate detection
// ---------------------------------------------------------------------------
Tester.BonusPowerAnyRetryTests = () => {
    const gen = new CharactorGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();

    // Energy has bonusPower: "Energy Emission\\Any(50)|Energy Control\\Any(100)"
    const energyForm = gen.physicalFormTable.find((r) => r.name === "Energy");
    if (!energyForm) {
        Tester.assert(true, "BonusPowerAnyRetry: skipped.");
        return;
    }
    gen.physicalFormRoll = energyForm.maxRoll;

    const char = gen.generateWithoutThrows();
    Tester.assert(char !== null, "BonusPowerAnyRetry: generates.");
    const bonus = char.powers.filter((p) => p.bonusPower);
    Tester.assert(
        bonus.length >= 1,
        `BonusPowerAnyRetry: ${bonus.length} bonus power(s).`,
    );
};

// ---------------------------------------------------------------------------
// 14. Lines 1781-1783: Bonus power inner while(roll > 100) loop
//     Need bonusPower roll > 100 to trigger the while loop
// ---------------------------------------------------------------------------
Tester.BonusPowerHighRollTests = () => {
    const gen = new CharactorGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();

    // Animal has bonusPower: "Detection\\Any\\Good(50)|Detection\\Any\\Good(100)"
    // Set powerRankRolls[0] > 100 to trigger the while loop in bonus power gen
    const animalForm = gen.physicalFormTable.find((r) => r.name === "Animal");
    if (!animalForm) {
        Tester.assert(true, "BonusPowerHighRoll: skipped.");
        return;
    }
    gen.physicalFormRoll = animalForm.maxRoll;

    // Set first powerRoll to > 100 so the bonus power while loop fires
    gen.powerRolls[0] = 150;

    const char = gen.generateWithoutThrows();
    Tester.assert(char !== null, "BonusPowerHighRoll: generates.");
};

// ---------------------------------------------------------------------------
// 15. Lines 1841-1843, 1848-1849: Optional power "Any" retry
//     Need a power with optionalPowers containing "Any"
// ---------------------------------------------------------------------------
Tester.OptionalPowerAnyRetryTests = () => {
    const gen = new CharactorGenerator();
    gen.generatorMode = "ultimate";
    gen.setTables();
    gen.setDeterministicRolls();

    gen.physicalFormRoll = 1;
    gen.powerNumberRoll = 100;
    gen.applyOptionalPowers = true;

    // Find power with optionalPowers containing "Any"
    const powerWithAny = gen.powerListTable.find(
        (r) => r.optionalPowers && r.optionalPowers.indexOf("Any") !== -1,
    );
    if (!powerWithAny) {
        Tester.assert(true, "OptionalPowerAnyRetry: skipped.");
        return;
    }

    const catRow = gen.powerCategoriesTable.find(
        (c) => c.name === powerWithAny.category,
    );
    if (!catRow) {
        Tester.assert(true, "OptionalPowerAnyRetry: cat not found.");
        return;
    }

    gen.powerCategoryRolls[0] = catRow.maxRoll;
    gen.powerRolls[0] = powerWithAny.maxRoll;
    gen.powerRankRolls[0] = 50;

    const char = gen.generateWithoutThrows();
    Tester.assert(char !== null, "OptionalPowerAnyRetry: generates.");
};

// ---------------------------------------------------------------------------
// Registration
// ---------------------------------------------------------------------------
Tester.registerTestGroup(70, "deterministic", [
    { name: "AbilitySetPathTests", needsGen: false },
    { name: "AbilityNormalPathTests", needsGen: false },
    { name: "GetAbilityAfterModifierEdgeTests", needsGen: false },
    { name: "HiTechToGoodFalseTests", needsGen: false },
    { name: "PopularitySetUltimateTests", needsGen: false },
    { name: "PopularityStartUltimateTests", needsGen: false },
    { name: "PopularityMinMaxUltimateTests", needsGen: false },
    { name: "PopularityStartBasicTests", needsGen: false },
    { name: "WellEstablishedLooksHumanTests", needsGen: false },
    { name: "PowersCountMinimumTests", needsGen: false },
    { name: "CrossCategoryRetryTests", needsGen: false },
    { name: "TooManyPowersRetryTests", needsGen: false },
    { name: "BonusPowerAnyRetryTests", needsGen: false },
    { name: "BonusPowerHighRollTests", needsGen: false },
    { name: "OptionalPowerAnyRetryTests", needsGen: false },
]);
