// tests/TestsFuzz.js
// Fuzz tests: generate characters with random rolls to verify no crashes.
// These tests verify the generator completes without errors AND that generated
// characters satisfy core invariants (health formulas, valid ranks, etc.).

// ============================================================================
// SHARED INVARIANT CHECKS
// ============================================================================

/** Validate all powers have required fields and valid values. */
Tester._assertPowerInvariants = (char, mode) => {
  char.powers.forEach((p, i) => {
    Tester.assert(p.name !== "" && p.name !== undefined && p.name !== null,
      `Fuzz (${mode}): power[${i}].name is non-empty (was "${p.name}").`);
    Tester.assert(p.category !== "" && p.category !== undefined && p.category !== null,
      `Fuzz (${mode}): power[${i}].category is non-empty (was "${p.category}").`);
    Tester.assert(p.rank !== "" && p.rank !== undefined && p.rank !== null,
      `Fuzz (${mode}): power[${i}].rank is non-empty (was "${p.rank}").`);
    Tester.assert(typeof p.powerSlots === 'number' && p.powerSlots >= 0,
      `Fuzz (${mode}): power[${i}].powerSlots >= 0 (was ${p.powerSlots}).`);
  });
};

/** Validate all talents have required fields and valid values. */
Tester._assertTalentInvariants = (char, mode) => {
  char.talents.forEach((t, i) => {
    Tester.assert(t.name !== "" && t.name !== undefined && t.name !== null,
      `Fuzz (${mode}): talent[${i}].name is non-empty (was "${t.name}").`);
    Tester.assert(t.category !== "" && t.category !== undefined && t.category !== null,
      `Fuzz (${mode}): talent[${i}].category is non-empty (was "${t.category}").`);
    Tester.assert(typeof t.talentSlots === 'number' && t.talentSlots >= 1,
      `Fuzz (${mode}): talent[${i}].talentSlots >= 1 (was ${t.talentSlots}).`);
  });
};

/** Validate all contacts have required fields. */
Tester._assertContactInvariants = (char, mode) => {
  char.contacts.forEach((c, i) => {
    Tester.assert(c.name !== "" && c.name !== undefined && c.name !== null,
      `Fuzz (${mode}): contact[${i}].name is non-empty (was "${c.name}").`);
    Tester.assert(c.category !== "" && c.category !== undefined && c.category !== null,
      `Fuzz (${mode}): contact[${i}].category is non-empty (was "${c.category}").`);
  });
};

/** Validate resources are properly populated. */
Tester._assertResourceInvariants = (char, mode) => {
  Tester.assert(char.resources.rank !== "" && char.resources.rank !== undefined,
    `Fuzz (${mode}): resources.rank is populated (was "${char.resources.rank}").`);
  Tester.assert(typeof char.resources.number === 'number' && char.resources.number > 0,
    `Fuzz (${mode}): resources.number > 0 (was ${char.resources.number}).`);
  // Resources rank should be a known FASERIP rank
  const validRanks = ["Shift 0", "Feeble", "Poor", "Typical", "Good", "Excellent",
    "Remarkable", "Incredible", "Amazing", "Monstrous", "Unearthly", "Sentient",
    "Cosmic", "Galactic", "Immutable", "Universal"];
  Tester.assert(validRanks.indexOf(char.resources.rank) !== -1,
    `Fuzz (${mode}): resources.rank "${char.resources.rank}" is a valid FASERIP rank.`);
};

/** Validate identity is properly set. */
Tester._assertIdentityInvariants = (char, mode) => {
  Tester.assert(char.identity === "Secret" || char.identity === "Public",
    `Fuzz (${mode}): identity is "Secret" or "Public" (was "${char.identity}").`);
};

/** Master invariant check — validates all character properties. */
Tester._assertCharacterInvariants = (char, mode) => {
  // Structural invariants
  Tester.assertNotNull(char, `Fuzz (${mode}): char is not null.`);
  Tester.assert(typeof char.health === 'number', `Fuzz (${mode}): health is a number.`);
  Tester.assertNotNull(char.resources, `Fuzz (${mode}): resources object exists.`);

  // Physical form and origin are non-empty
  Tester.assert(char.physicalForm !== "",
    `Fuzz (${mode}): physicalForm is non-empty.`);
  Tester.assert(char.origin !== "",
    `Fuzz (${mode}): origin is non-empty.`);

  // Health = F + A + S + E (plus physical form adjustments like *2 for Mineral)
  const baseHealth = char.getAbilityNumber("Fighting") +
    char.getAbilityNumber("Agility") +
    char.getAbilityNumber("Strength") +
    char.getAbilityNumber("Endurance");
  Tester.assert(char.health > 0,
    `Fuzz (${mode}): health > 0 (was ${char.health}).`);
  Tester.assert(char.health >= baseHealth,
    `Fuzz (${mode}): health (${char.health}) >= base F+A+S+E (${baseHealth}).`);

  // Karma = R + I + P
  const expectedKarma = char.getAbilityNumber("Reason") +
    char.getAbilityNumber("Intuition") +
    char.getAbilityNumber("Psyche");
  Tester.assertEquals(expectedKarma, char.karma,
    `Fuzz (${mode}): karma = R+I+P.`);

  // Popularity >= 0
  Tester.assert(char.popularity >= 0,
    `Fuzz (${mode}): popularity >= 0 (was ${char.popularity}).`);

  // Slot invariants
  const totalPowerSlots = char.powers.reduce((sum, p) => sum + (p.powerSlots || 1), 0);
  Tester.assert(totalPowerSlots <= char.powersMax,
    `Fuzz (${mode}): total power slots (${totalPowerSlots}) <= powersMax (${char.powersMax}).`);

  const totalTalentSlots = char.talents.reduce((sum, t) => sum + (t.talentSlots || 1), 0);
  Tester.assert(totalTalentSlots <= char.talentsMax,
    `Fuzz (${mode}): total talent slots (${totalTalentSlots}) <= talentsMax (${char.talentsMax}).`);

  Tester.assert(char.contacts.length <= char.contactsMax,
    `Fuzz (${mode}): contacts (${char.contacts.length}) <= contactsMax (${char.contactsMax}).`);

  // Count invariants
  Tester.assert(char.powersCount >= 0,
    `Fuzz (${mode}): powersCount >= 0 (was ${char.powersCount}).`);
  Tester.assert(char.talentsCount >= 0,
    `Fuzz (${mode}): talentsCount >= 0 (was ${char.talentsCount}).`);
  Tester.assert(char.contactsCount >= 0,
    `Fuzz (${mode}): contactsCount >= 0 (was ${char.contactsCount}).`);

  // No null/empty ranks in abilities
  PHYSICAL_ABILITIES.forEach(a => {
    const rank = char.getAbility(a).rank;
    Tester.assert(rank !== null && rank !== undefined && rank !== "",
      `Fuzz (${mode}): ${a} rank is not null/empty (was "${rank}").`);
  });
  MENTAL_ABILITIES.forEach(a => {
    const rank = char.getAbility(a).rank;
    Tester.assert(rank !== null && rank !== undefined && rank !== "",
      `Fuzz (${mode}): ${a} rank is not null/empty (was "${rank}").`);
  });

  // Ability numbers should be positive
  PHYSICAL_ABILITIES.forEach(a => {
    const num = char.getAbilityNumber(a);
    Tester.assert(typeof num === 'number' && num >= 0,
      `Fuzz (${mode}): ${a} number >= 0 (was ${num}).`);
  });
  MENTAL_ABILITIES.forEach(a => {
    const num = char.getAbilityNumber(a);
    Tester.assert(typeof num === 'number' && num >= 0,
      `Fuzz (${mode}): ${a} number >= 0 (was ${num}).`);
  });

  // Ultimate has weakness, others don't
  if (mode === 'ultimate') {
    Tester.assert(char.weakness.stimulus !== "",
      `Fuzz (${mode}): weakness.stimulus is set.`);
    Tester.assert(char.weakness.effect !== "",
      `Fuzz (${mode}): weakness.effect is set.`);
    Tester.assert(char.weakness.duration !== "",
      `Fuzz (${mode}): weakness.duration is set.`);
    Tester.assert(char.weakness.rank !== "",
      `Fuzz (${mode}): weakness.rank is set.`);
    Tester.assert(typeof char.weakness.rankNumber === 'number' && char.weakness.rankNumber > 0,
      `Fuzz (${mode}): weakness.rankNumber > 0 (was ${char.weakness.rankNumber}).`);
  } else {
    Tester.assert(char.weakness.stimulus === "",
      `Fuzz (${mode}): weakness.stimulus is empty.`);
  }

  // Power/Talent/Contact field invariants
  Tester._assertPowerInvariants(char, mode);
  Tester._assertTalentInvariants(char, mode);
  Tester._assertContactInvariants(char, mode);

  // Resource invariants
  Tester._assertResourceInvariants(char, mode);

  // Identity invariant
  Tester._assertIdentityInvariants(char, mode);

  // Note: log cleanliness checks (undefined/null/object) are removed here —
  // they're already covered deterministically by BoundaryInvariantTests.
};

// ============================================================================
// MODE-SPECIFIC FUZZ TESTS
// ============================================================================

// --- Basic mode full generation ---
Tester.FuzzBasicTests = (gen) => {
  gen.generatorMode = 'basic';
  gen.setTables();
  const char = gen.generate();
  Tester._assertCharacterInvariants(char, 'basic');
};

// --- Advanced mode full generation ---
Tester.FuzzAdvancedTests = (gen) => {
  gen.generatorMode = 'advanced';
  gen.setTables();
  const char = gen.generate();
  Tester._assertCharacterInvariants(char, 'advanced');
};

// --- Ultimate mode full generation ---
Tester.FuzzUltimateTests = (gen) => {
  gen.generatorMode = 'ultimate';
  gen.setTables();
  const char = gen.generate();
  Tester._assertCharacterInvariants(char, 'ultimate');
};

// ============================================================================
// DICE EDGE CASE FUZZ TEST
// ============================================================================

// Verifies Dice.roll() and Dice.roll100() produce valid values across many iterations.
Tester.FuzzDiceTests = () => {
  // Test Dice.roll(min, max) with various ranges
  const ranges = [
    [1, 1],     // min = max (should always return 1)
    [1, 2],     // tiny range
    [1, 100],   // standard d100
    [50, 50],   // single value in middle
    [99, 100],  // boundary pair
    [1, 1000],  // large range
  ];

  for (const [min, max] of ranges) {
    for (let i = 0; i < 50; i++) {
      const result = Dice.roll(min, max);
      Tester.assert(typeof result === 'number' && result >= min && result <= max,
        `Dice.roll(${min},${max}): result ${result} in range [${min}-${max}].`);
      Tester.assert(Number.isInteger(result),
        `Dice.roll(${min},${max}): result ${result} is an integer.`);
    }
  }

  // Test Dice.roll100() always returns [1-100]
  for (let i = 0; i < 100; i++) {
    const result = Dice.roll100();
    Tester.assertInRange(1, 100, result, `Dice.roll100(): result in range [1-100].`);
  }

  // Test Dice.getRandomItem() with various arrays
  const testArrays = [
    ["a"],
    ["a", "b"],
    ["a", "b", "c", "d", "e"],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  ];
  for (const arr of testArrays) {
    for (let i = 0; i < 30; i++) {
      const item = Dice.getRandomItem(arr);
      Tester.assert(arr.indexOf(item) !== -1,
        `Dice.getRandomItem: result "${item}" is in the array.`);
    }
  }

  // Test seeded vs unseeded produce different values (probabilistic)
  Dice.seed(12345);
  const seeded = Dice.roll100();
  Dice.seed(null);
  const unseeded = Dice.roll100();
  // Both should be valid; we just verify no crash
  Tester.assertInRange(1, 100, seeded, `Dice.seed: seeded result valid.`);
  Tester.assertInRange(1, 100, unseeded, `Dice.seed: unseeded result valid.`);
};

// ============================================================================
// PHYSICAL FORM DIVERSITY FUZZ TEST
// ============================================================================

// Generates characters with different seeded rolls to exercise various physical
// forms. Uses Dice.seed() per iteration so different forms are hit across the
// 100 fuzz iterations.
Tester.FuzzPhysicalFormDiversityTests = (gen) => {
  // Seed with iteration-dependent value (iteration is embedded in the gen state)
  // We use a counter to get different seeds per iteration
  if (!Tester._fuzzFormSeed) Tester._fuzzFormSeed = 0;
  Tester._fuzzFormSeed++;
  // NOTE: Seeded per iteration for diverse physical form coverage
  Dice.seed(Tester._fuzzFormSeed * 1000);

  gen.generatorMode = ['basic', 'advanced', 'ultimate'][Tester._fuzzFormSeed % 3];
  gen.setTables();
  gen.throwAllRolls();

  const char = gen.generateWithoutThrows();

  // Verify physical form was resolved (not empty)
  Tester.assert(char.physicalForm !== "",
    `Fuzz Form Diversity: physicalForm is non-empty (seed=${Tester._fuzzFormSeed}).`);

  // Verify origin was resolved
  Tester.assert(char.origin !== "",
    `Fuzz Form Diversity: origin is non-empty.`);

  // Verify at least one body type for compound forms
  if (char.physicalForm === "Compound") {
    Tester.assert(char.bodyTypes.length >= 2,
      `Fuzz Form Diversity: Compound has >= 2 bodyTypes (was ${char.bodyTypes.length}).`);
  }

  // Verify the log has at least one entry (physical form was determined)
  Tester.assert(char.log.length > 0,
    `Fuzz Form Diversity: log has entries (was ${char.log.length}).`);
};

// ============================================================================
// REGISTER FUZZ TESTS
// ============================================================================

// Order 800-899: runs after deterministic tests, before benchmarks
Tester.registerTestGroup(800, 'fuzz', [
  { name: 'FuzzBasicTests', needsGen: true },
  { name: 'FuzzAdvancedTests', needsGen: true },
  { name: 'FuzzUltimateTests', needsGen: true },
  { name: 'FuzzDiceTests', needsGen: false },
  { name: 'FuzzPhysicalFormDiversityTests', needsGen: true },
]);
