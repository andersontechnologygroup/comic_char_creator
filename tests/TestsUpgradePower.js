// TestsUpgradePower
// Tests for the upgradePower attribute feature.
// Verifies that _parseUpgradePower, canUpgradePower, and applyPowerUpgrade
// work correctly across various scenarios.

// ============================================================================
// TEST: _parseUpgradePower helper
// ============================================================================
Tester.UpgradePowerParseTests = () => {
    // Basic parse: Category\Power\Condition
    const result1 = CharacterGenerator._parseUpgradePower(
        "Resistances\\Invulnerability\\Fire and Heat",
    );
    Tester.assertNotNull(result1, "Parse: returns non-null for valid string.");
    Tester.assertEquals(
        "Resistances",
        result1.category,
        "Parse: category extracted correctly.",
    );
    Tester.assertEquals(
        "Invulnerability",
        result1.powerName,
        "Parse: powerName extracted correctly.",
    );
    Tester.assertEquals(
        "Fire and Heat",
        result1.condition,
        "Parse: condition extracted correctly.",
    );

    // Parse without condition: Category\Power
    const result2 = CharacterGenerator._parseUpgradePower("Movement\\Flight");
    Tester.assertNotNull(
        result2,
        "Parse: returns non-null for two-part string.",
    );
    Tester.assertEquals(
        "Movement",
        result2.category,
        "Parse: two-part category correct.",
    );
    Tester.assertEquals(
        "Flight",
        result2.powerName,
        "Parse: two-part powerName correct.",
    );
    Tester.assertEquals(
        null,
        result2.condition,
        "Parse: condition is null when absent.",
    );

    // Empty string
    const result3 = CharacterGenerator._parseUpgradePower("");
    Tester.assertEquals(null, result3, "Parse: returns null for empty string.");

    // Null
    const result4 = CharacterGenerator._parseUpgradePower(null);
    Tester.assertEquals(null, result4, "Parse: returns null for null.");

    // Single part
    const result5 = CharacterGenerator._parseUpgradePower("JustOneThing");
    Tester.assertEquals(null, result5, "Parse: returns null for single part.");
};

// ============================================================================
// TEST: canUpgradePower — enough slots
// ============================================================================
Tester.UpgradePowerCanUpgradeTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();

    const char = new Character();
    char.physicalForm = "Altered Human";
    char.powersCount = 5;
    char.powersMax = 5;

    // Add a Resistance power (1 slot)
    char.powers.push({
        name: "Resistance to Fire and Heat",
        category: "Resistances",
        rank: "Good",
        number: 10,
        powerSlots: 1,
        description: "Reduces fire damage.",
    });

    const upgradeInfo = {
        category: "Resistances",
        powerName: "Invulnerability",
        condition: "Fire and Heat",
    };
    const check = gen.canUpgradePower(char, 0, upgradeInfo);

    Tester.assert(
        check.allowed === true,
        "CanUpgrade: allowed when enough slots (Invulnerability costs 2, 1 used of 5).",
    );
};

// ============================================================================
// TEST: canUpgradePower — NOT enough slots (needsSwap=true, allowed=true)
// ============================================================================
Tester.UpgradePowerNotEnoughSlotsTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();

    const char = new Character();
    char.physicalForm = "Altered Human";
    char.powersCount = 2;
    char.powersMax = 2;

    // Add a Resistance (1 slot) + another power (1 slot) = 2/2 used
    char.powers.push({
        name: "Resistance to Fire and Heat",
        category: "Resistances",
        rank: "Good",
        number: 10,
        powerSlots: 1,
        description: "Reduces fire damage.",
    });
    char.powers.push({
        name: "Flight",
        category: "Movement",
        rank: "Excellent",
        number: 20,
        powerSlots: 1,
        description: "Can fly.",
    });

    const upgradeInfo = {
        category: "Resistances",
        powerName: "Invulnerability",
        condition: "Fire and Heat",
    };
    const check = gen.canUpgradePower(char, 0, upgradeInfo);

    // Modal always shows now — needsSwap indicates slot swap is required
    Tester.assert(
        check.allowed === true,
        "CanUpgrade: always allowed (modal shows swap UI).",
    );
    Tester.assert(
        check.needsSwap === true,
        "CanUpgrade: needsSwap=true when slots are full.",
    );
    Tester.assertEquals(
        1,
        check.slotsNeeded,
        "CanUpgrade: slotsNeeded=1 (upgrade needs 2, original has 1).",
    );
    Tester.assertEquals(1, check.originalSlots, "CanUpgrade: originalSlots=1.");
    Tester.assertEquals(
        2,
        check.upgradeSlots,
        "CanUpgrade: upgradeSlots=2 (Invulnerability powerCount=2).",
    );
};

// ============================================================================
// TEST: canUpgradePower — duplicate allowed (Invulnerability has allowDuplicate=true)
// ============================================================================
Tester.UpgradePowerDuplicateAllowedTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();

    const char = new Character();
    char.physicalForm = "Altered Human";
    char.powersCount = 10;
    char.powersMax = 10;

    // Add the upgrade target already assigned
    char.powers.push({
        name: "Invulnerability",
        category: "Resistances",
        rank: "Excellent",
        number: 20,
        powerSlots: 2,
        description: "Total immunity.",
    });

    // Add a resistance with upgrade option
    char.powers.push({
        name: "Resistance to Fire and Heat",
        category: "Resistances",
        rank: "Good",
        number: 10,
        powerSlots: 1,
        description: "Reduces fire damage.",
    });

    const upgradeInfo = {
        category: "Resistances",
        powerName: "Invulnerability",
        condition: "Fire and Heat",
    };
    const check = gen.canUpgradePower(char, 1, upgradeInfo);

    // Invulnerability has allowDuplicate: true in Advanced mode, so this should be allowed
    Tester.assert(
        check.allowed === true,
        "CanUpgrade: allowed when allowDuplicate=true even if Invulnerability already assigned.",
    );
};

// ============================================================================
// TEST: canUpgradePower — duplicate NOT allowed (simulate allowDuplicate=false)
// ============================================================================
Tester.UpgradePowerDuplicateBlockedTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();

    // Temporarily override allowDuplicate on Invulnerability
    const invRow = gen.powerListTable.find((r) => r.name === "Invulnerability");
    const origAllowDup = invRow ? invRow.allowDuplicate : undefined;
    if (invRow) invRow.allowDuplicate = false;

    try {
        const char = new Character();
        char.physicalForm = "Altered Human";
        char.powersCount = 10;
        char.powersMax = 10;

        // Add the upgrade target already assigned
        char.powers.push({
            name: "Invulnerability",
            category: "Resistances",
            rank: "Excellent",
            number: 20,
            powerSlots: 2,
            description: "Total immunity.",
        });

        // Add a resistance with upgrade option
        char.powers.push({
            name: "Resistance to Fire and Heat",
            category: "Resistances",
            rank: "Good",
            number: 10,
            powerSlots: 1,
            description: "Reduces fire damage.",
        });

        const upgradeInfo = {
            category: "Resistances",
            powerName: "Invulnerability",
            condition: "Fire and Heat",
        };
        const check = gen.canUpgradePower(char, 1, upgradeInfo);

        Tester.assert(
            check.allowed === false,
            "CanUpgradeBlocked: rejected when allowDuplicate=false and power already assigned.",
        );
        Tester.assert(
            check.reason.indexOf("already assigned") !== -1,
            'CanUpgradeBlocked: reason mentions "already assigned".',
        );
    } finally {
        // Restore original value
        if (invRow) invRow.allowDuplicate = origAllowDup;
    }
};

// ============================================================================
// TEST: canUpgradePower — invalid index
// ============================================================================
Tester.UpgradePowerInvalidIndexTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();

    const char = new Character();
    char.powers = [];

    const upgradeInfo = {
        category: "Resistances",
        powerName: "Invulnerability",
        condition: "Fire and Heat",
    };
    const check = gen.canUpgradePower(char, 0, upgradeInfo);

    Tester.assert(
        check.allowed === false,
        "CanUpgrade: rejected for invalid power index.",
    );
};

// ============================================================================
// TEST: canUpgradePower — upgrade power not found
// ============================================================================
Tester.UpgradePowerNotFoundTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();

    const char = new Character();
    char.physicalForm = "Altered Human";
    char.powersCount = 5;
    char.powersMax = 5;
    char.powers.push({
        name: "Resistance to Fire and Heat",
        category: "Resistances",
        rank: "Good",
        number: 10,
        powerSlots: 1,
        description: "Reduces fire damage.",
    });

    const upgradeInfo = {
        category: "Resistances",
        powerName: "NonexistentPower",
        condition: "test",
    };
    const check = gen.canUpgradePower(char, 0, upgradeInfo);

    Tester.assert(
        check.allowed === false,
        "CanUpgrade: rejected when upgrade power not in table.",
    );
    Tester.assert(
        check.reason.indexOf("not found") !== -1,
        'CanUpgrade: reason mentions "not found".',
    );
};

// ============================================================================
// TEST: applyPowerUpgrade — successful upgrade
// ============================================================================
Tester.UpgradePowerApplyTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();

    const char = new Character();
    char.physicalForm = "Altered Human";
    char.powersCount = 5;
    char.powersMax = 5;

    char.powers.push({
        name: "Resistance to Fire and Heat",
        category: "Resistances",
        rank: "Good",
        number: 10,
        powerSlots: 1,
        description: "Reduces fire damage.",
    });

    const upgradeInfo = {
        category: "Resistances",
        powerName: "Invulnerability",
        condition: "Fire and Heat",
    };
    const applied = gen.applyPowerUpgrade(char, 0, upgradeInfo);

    Tester.assert(applied === true, "ApplyUpgrade: returns true on success.");
    Tester.assertEquals(
        "Invulnerability",
        char.powers[0].name,
        "ApplyUpgrade: power name replaced.",
    );
    Tester.assertEquals(
        "Resistances",
        char.powers[0].category,
        "ApplyUpgrade: category preserved.",
    );
    Tester.assertEquals(
        "Resistance to Fire and Heat",
        char.powers[0].upgradedFrom,
        "ApplyUpgrade: upgradedFrom set.",
    );
    Tester.assertEquals(
        "Fire and Heat",
        char.powers[0].upgradeCondition,
        "ApplyUpgrade: upgradeCondition set.",
    );
    Tester.assert(
        char.powers[0].powerSlots >= 1,
        "ApplyUpgrade: powerSlots set correctly.",
    );
    Tester.assert(
        char.powers[0].rank !== "",
        "ApplyUpgrade: rank is assigned.",
    );
};

// ============================================================================
// TEST: applyPowerUpgrade — invalid upgrade returns false
// ============================================================================
Tester.UpgradePowerApplyRejectedTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();

    const char = new Character();
    char.physicalForm = "Altered Human";
    char.powersCount = 5;
    char.powersMax = 5;
    char.powers.push({
        name: "Flight",
        category: "Movement",
        rank: "Good",
        number: 10,
        powerSlots: 1,
        description: "Can fly.",
    });

    // Try to upgrade to a nonexistent power
    const upgradeInfo = {
        category: "Resistances",
        powerName: "NonexistentPower",
        condition: "test",
    };
    const applied = gen.applyPowerUpgrade(char, 0, upgradeInfo);

    Tester.assert(
        applied === false,
        "ApplyUpgrade: returns false when upgrade power not found.",
    );
    Tester.assertEquals(
        "Flight",
        char.powers[0].name,
        "ApplyUpgrade: original power unchanged.",
    );
};

// ============================================================================
// TEST: getUpgradeOption — returns correct structure
// ============================================================================
Tester.UpgradePowerGetOptionTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();

    const char = new Character();
    char.physicalForm = "Altered Human";
    char.powersCount = 5;
    char.powersMax = 5;

    char.powers.push({
        name: "Resistance to Fire and Heat",
        category: "Resistances",
        rank: "Good",
        number: 10,
        powerSlots: 1,
        description: "Reduces fire damage.",
    });

    // Simulate pending upgrades as the generator would
    gen._pendingPowerUpgrades = [
        {
            powerIndex: 0,
            upgradeInfo: {
                category: "Resistances",
                powerName: "Invulnerability",
                condition: "Fire and Heat",
            },
        },
    ];

    const option = gen.getUpgradeOption(0, char);

    Tester.assertNotNull(
        option,
        "GetOption: returns non-null for valid pending upgrade.",
    );
    Tester.assertEquals(
        0,
        option.powerIndex,
        "GetOption: powerIndex is correct.",
    );
    Tester.assertEquals(
        "Resistance to Fire and Heat",
        option.originalPower.name,
        "GetOption: originalPower is correct.",
    );
    Tester.assertEquals(
        "Invulnerability",
        option.upgradeInfo.powerName,
        "GetOption: upgradeInfo.powerName is correct.",
    );
    Tester.assert(
        option.canUpgrade === true,
        "GetOption: canUpgrade is true (enough slots).",
    );
    Tester.assertNotNull(
        option.upgradePower,
        "GetOption: upgradePower row found in table.",
    );
};

// ============================================================================
// TEST: getUpgradeOption — no pending upgrade
// ============================================================================
Tester.UpgradePowerNoPendingTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();

    const char = new Character();
    char.powers = [];
    gen._pendingPowerUpgrades = [];

    const option = gen.getUpgradeOption(0, char);
    Tester.assertEquals(
        null,
        option,
        "GetOption: returns null when no pending upgrades.",
    );
};

// ============================================================================
// TEST: Full generation captures upgradePower
// ============================================================================
Tester.UpgradePowerFullGenerationTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();

    const char = gen.generateWithoutThrows();

    // Check if any powers have upgrade options
    if (char._pendingPowerUpgrades && char._pendingPowerUpgrades.length > 0) {
        Tester.assertAtLeast(
            1,
            char._pendingPowerUpgrades.length,
            `UpgradeGeneration: ${char._pendingPowerUpgrades.length} upgrade options captured during generation.`,
        );

        // Verify each pending upgrade has valid structure
        for (const pending of char._pendingPowerUpgrades) {
            Tester.assert(
                typeof pending.powerIndex === "number",
                "UpgradeGeneration: powerIndex is a number.",
            );
            Tester.assertNotNull(
                pending.upgradeInfo,
                "UpgradeGeneration: upgradeInfo is not null.",
            );
            Tester.assertNotNull(
                pending.upgradeInfo.category,
                "UpgradeGeneration: category is not null.",
            );
            Tester.assertNotNull(
                pending.upgradeInfo.powerName,
                "UpgradeGeneration: powerName is not null.",
            );
        }
    } else {
        // No upgrade powers rolled — that's fine, just verify the array exists
        Tester.assertNotNull(
            char._pendingPowerUpgrades,
            "UpgradeGeneration: _pendingPowerUpgrades array exists.",
        );
        Tester.assertEquals(
            0,
            char._pendingPowerUpgrades.length,
            "UpgradeGeneration: no upgrade powers in this particular roll (expected with random rolls).",
        );
    }
};

// ============================================================================
// TEST: allowDuplicate with duplicateCost
// ============================================================================
Tester.UpgradePowerDuplicateAllowTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();

    const char = new Character();
    char.physicalForm = "Altered Human";
    char.powersCount = 10;
    char.powersMax = 10;

    // Add an Invulnerability (already has allowDuplicate: true, duplicateCost: 1)
    char.powers.push({
        name: "Invulnerability",
        category: "Resistances",
        rank: "Excellent",
        number: 20,
        powerSlots: 2,
        description: "Total immunity to Fire and Heat.",
    });

    // Add a resistance that can upgrade to Invulnerability
    char.powers.push({
        name: "Resistance to Cold",
        category: "Resistances",
        rank: "Good",
        number: 10,
        powerSlots: 1,
        description: "Reduces cold damage.",
    });

    const upgradeInfo = {
        category: "Resistances",
        powerName: "Invulnerability",
        condition: "Cold",
    };
    const check = gen.canUpgradePower(char, 1, upgradeInfo);
    Tester.assert(
        check.allowed === true,
        "CanUpgrade: allowed when allowDuplicate=true even if Invulnerability already assigned.",
    );

    const applied = gen.applyPowerUpgrade(char, 1, upgradeInfo);
    Tester.assert(
        applied === true,
        "ApplyUpgrade: duplicate upgrade applied successfully.",
    );
    Tester.assertEquals(
        "Invulnerability",
        char.powers[1].name,
        "ApplyUpgrade: second Invulnerability added.",
    );
    // duplicateCost should be used instead of powerCount (2) for the duplicate
    Tester.assertEquals(
        1,
        char.powers[1].powerSlots,
        "ApplyUpgrade: duplicate uses duplicateCost=1 instead of powerCount=2.",
    );
};

// ============================================================================
// TEST: removePower — removes power and updates pending upgrade indices
// ============================================================================
Tester.UpgradePowerRemoveTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();

    const char = new Character();
    char.physicalForm = "Altered Human";
    char.powersCount = 5;
    char.powersMax = 5;

    char.powers.push({
        name: "A",
        category: "X",
        rank: "Good",
        number: 1,
        powerSlots: 1,
        description: "",
    });
    char.powers.push({
        name: "B",
        category: "Y",
        rank: "Good",
        number: 2,
        powerSlots: 1,
        description: "",
    });
    char.powers.push({
        name: "C",
        category: "Z",
        rank: "Good",
        number: 3,
        powerSlots: 1,
        description: "",
    });

    // Set up pending upgrades pointing to index 1 and 2
    gen._pendingPowerUpgrades = [
        {
            powerIndex: 1,
            upgradeInfo: {
                category: "Y",
                powerName: "Invulnerability",
                condition: null,
            },
        },
        {
            powerIndex: 2,
            upgradeInfo: {
                category: "Z",
                powerName: "Invulnerability",
                condition: null,
            },
        },
    ];

    // Remove power at index 0
    var result = gen.removePower(char, 0);
    Tester.assert(result === true, "RemovePower: returns true on success.");
    Tester.assertEquals(
        2,
        char.powers.length,
        "RemovePower: powers array reduced by 1.",
    );
    Tester.assertEquals(
        "B",
        char.powers[0].name,
        "RemovePower: remaining powers shifted correctly.",
    );

    // Pending upgrade indices should be adjusted
    Tester.assertEquals(
        0,
        gen._pendingPowerUpgrades[0].powerIndex,
        "RemovePower: pending upgrade index decremented (was 1, now 0).",
    );
    Tester.assertEquals(
        1,
        gen._pendingPowerUpgrades[1].powerIndex,
        "RemovePower: pending upgrade index decremented (was 2, now 1).",
    );

    // Remove middle power
    gen.removePower(char, 0);
    Tester.assertEquals(
        1,
        char.powers.length,
        "RemovePower: second removal works.",
    );
    Tester.assertEquals(
        "C",
        char.powers[0].name,
        "RemovePower: correct power remains.",
    );
    Tester.assertEquals(
        0,
        gen._pendingPowerUpgrades[0].powerIndex,
        "RemovePower: pending upgrade adjusted after second removal.",
    );

    // Remove invalid index returns false
    var failResult = gen.removePower(char, 99);
    Tester.assert(
        failResult === false,
        "RemovePower: returns false for invalid index.",
    );
};

// ============================================================================
// TEST: swap scenario — remove power + apply upgrade
// ============================================================================
Tester.UpgradePowerSwapScenarioTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();
    gen.setDeterministicRolls();

    const char = new Character();
    char.physicalForm = "Altered Human";
    char.powersCount = 2;
    char.powersMax = 2;

    // Slot 0: Resistance to Fire (1 slot) — has upgradePower to Invulnerability (2 slots)
    char.powers.push({
        name: "Resistance to Fire and Heat",
        category: "Resistances",
        rank: "Good",
        number: 10,
        powerSlots: 1,
        description: "Reduces fire damage.",
    });
    // Slot 1: Flight (1 slot) — this will be removed to make room
    char.powers.push({
        name: "Flight",
        category: "Movement",
        rank: "Excellent",
        number: 20,
        powerSlots: 1,
        description: "Can fly.",
    });

    // Simulate: remove Flight (index 1), then upgrade Resistance to Invulnerability
    gen.removePower(char, 1);
    Tester.assertEquals(1, char.powers.length, "SwapScenario: Flight removed.");

    const upgradeInfo = {
        category: "Resistances",
        powerName: "Invulnerability",
        condition: "Fire and Heat",
    };
    const applied = gen.applyPowerUpgrade(char, 0, upgradeInfo);
    Tester.assert(
        applied === true,
        "SwapScenario: upgrade applied after swap.",
    );
    Tester.assertEquals(
        "Invulnerability",
        char.powers[0].name,
        "SwapScenario: power upgraded.",
    );
    Tester.assertAtLeast(
        2,
        char.powers[0].powerSlots,
        "SwapScenario: upgraded power uses 2 slots.",
    );
};

// ============================================================================
// Register all tests
// ============================================================================
Tester.registerTestGroup(65, "deterministic", [
    { name: "UpgradePowerParseTests", needsGen: false },
    { name: "UpgradePowerCanUpgradeTests", needsGen: true },
    { name: "UpgradePowerNotEnoughSlotsTests", needsGen: true },
    { name: "UpgradePowerDuplicateAllowedTests", needsGen: true },
    { name: "UpgradePowerDuplicateBlockedTests", needsGen: true },
    { name: "UpgradePowerInvalidIndexTests", needsGen: true },
    { name: "UpgradePowerNotFoundTests", needsGen: true },
    { name: "UpgradePowerApplyTests", needsGen: true },
    { name: "UpgradePowerApplyRejectedTests", needsGen: true },
    { name: "UpgradePowerGetOptionTests", needsGen: true },
    { name: "UpgradePowerNoPendingTests", needsGen: true },
    { name: "UpgradePowerDuplicateAllowTests", needsGen: true },
    { name: "UpgradePowerRemoveTests", needsGen: true },
    { name: "UpgradePowerSwapScenarioTests", needsGen: true },
    { name: "UpgradePowerFullGenerationTests", needsGen: true },
]);
