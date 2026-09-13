//  TestsUtility
// Extracted from UnitTests.js

Tester.UtilityTests = (gen) => {
  let testRoll = 51;
  let testColumn = 1; // Mutants
  let foundRank = Utility.findRow(gen, testRoll, testColumn).rank;
  Tester.assertEquals("Excellent", foundRank, `findRank(${testRoll}, ${testColumn}) should return "Excellent"`);

  testColumn = 2; // Humans
  foundRank = Utility.findRow(gen, testRoll, testColumn).rank;
  Tester.assertEquals("Typical", foundRank, `findRank(${testRoll}, ${testColumn}) should return "Typical"`);

  testColumn = 3; // Hi Tech
  foundRank = Utility.findRow(gen, testRoll, testColumn).rank;
  Tester.assertEquals("Good", foundRank, `findRank(${testRoll}, ${testColumn}) should return "Good"`);

  testColumn = 4; // Robots
  foundRank = Utility.findRow(gen, testRoll, testColumn).rank;
  Tester.assertEquals("Remarkable", foundRank, `findRank(${testRoll}, ${testColumn}) should return "Remarkable"`);

  testColumn = 5; // Aliens
  foundRank = Utility.findRow(gen, testRoll, testColumn).rank;
  Tester.assertEquals("Excellent", foundRank, `findRank(${testRoll}, ${testColumn}) should return "Excellent"`);

  testRoll = 95;
  testColumn = 1;
  foundRank = Utility.findRow(gen, testRoll, testColumn).rank;
  Tester.assertEquals("Incredible", foundRank, `findRank(${testRoll}, ${testColumn}) should return "Incredible"`);

  testColumn = 2;
  foundRank = Utility.findRow(gen, testRoll, testColumn).rank;
  Tester.assertEquals("Good", foundRank, `findRank(${testRoll}, ${testColumn}) should return "Good"`);

  testColumn = 3;
  foundRank = Utility.findRow(gen, testRoll, testColumn).rank;
  Tester.assertEquals("Excellent", foundRank, `findRank(${testRoll}, ${testColumn}) should return "Excellent"`);

  testColumn = 4;
  foundRank = Utility.findRow(gen, testRoll, testColumn).rank;
  Tester.assertEquals("Amazing", foundRank, `findRank(${testRoll}, ${testColumn}) should return "Amazing"`);

  testColumn = 5;
  foundRank = Utility.findRow(gen, testRoll, testColumn).rank;
  Tester.assertEquals("Amazing", foundRank, `findRank(${testRoll}, ${testColumn}) should return "Amazing"`);
}

// ============================================================================
// DICE.ROLLCOUNT — tracks total rolls for debugging
// ============================================================================

Tester.DiceRollCountTests = () => {
  // Reset via seed(null)
  Dice.seed(null);
  Tester.assertEquals(0, Dice.rollCount, 'Dice.rollCount: reset to 0 via seed(null).');

  // Seed with a value resets count
  Dice.seed(42);
  Tester.assertEquals(0, Dice.rollCount, 'Dice.rollCount: reset to 0 via seed(42).');

  // roll() increments count
  Dice.roll(1, 100);
  Dice.roll(1, 100);
  Dice.roll(1, 100);
  Tester.assertEquals(3, Dice.rollCount, 'Dice.rollCount: 3 after 3 rolls.');

  // roll100() increments count (calls roll internally)
  Dice.roll100();
  Tester.assertEquals(4, Dice.rollCount, 'Dice.rollCount: 4 after roll100().');

  // getRandomItem() does NOT increment rollCount (uses raw RNG)
  Dice.getRandomItem(['a', 'b', 'c']);
  Tester.assertEquals(4, Dice.rollCount, 'Dice.rollCount: still 4 after getRandomItem().');

  // Consecutive rolls accumulate
  for (let i = 0; i < 10; i++) Dice.roll(1, 6);
  Tester.assertEquals(14, Dice.rollCount, 'Dice.rollCount: 14 after 10 more rolls.');

  // Reset again
  Dice.seed(99);
  Tester.assertEquals(0, Dice.rollCount, 'Dice.rollCount: reset to 0 via seed(99).');

  // Restore
  Dice.seed(null);
}

Tester.registerTest('UtilityTests', true, 20, 'deterministic');
Tester.registerTest('DiceRollCountTests', false, 21, 'deterministic');

// ============================================================================
// DICE.ROLLCOUNT — integration with character generation
// Verifies that seeded generation uses a consistent number of rolls,
// catching off-by-one errors in roll arrays.
// ============================================================================

Tester.DiceRollCountIntegrationTests = () => {
  // --- Basic mode: count rolls during full generation ---
  const gen1 = new CharacterGenerator();
  gen1.generatorMode = 'basic';
  gen1.setTables();
  gen1.setDeterministicRolls();
  Dice.seed(42);
  Dice.rollCount = 0;
  gen1.throwAllRolls();
  const throwRolls = Dice.rollCount;
  Tester.assertAtLeast(1, throwRolls,
    `DiceRollCount: throwAllRolls() used ${throwRolls} rolls.`);

  // After throwAllRolls, generateWithoutThrows should use 0 additional rolls
  Dice.rollCount = 0;
  const char1 = gen1.generateWithoutThrows();
  Tester.assertEquals(0, Dice.rollCount,
    'DiceRollCount: generateWithoutThrows() uses 0 additional rolls.');
  Tester.assert(char1.physicalForm !== '',
    'DiceRollCount: character has a physical form.');

  // --- setDeterministicRolls() sets values directly (no Dice.roll() calls) ---
  // Verify rolls were set correctly by checking key values are non-zero
  const gen2 = new CharacterGenerator();
  gen2.generatorMode = 'basic';
  gen2.setTables();
  gen2.setDeterministicRolls();
  Tester.assert(gen2.physicalFormRoll > 0,
    'DiceRollCount: setDeterministicRolls sets physicalFormRoll.');
  Tester.assert(gen2.originRoll > 0,
    'DiceRollCount: setDeterministicRolls sets originRoll.');
  Tester.assert(gen2.powerCategoryRolls[0] > 0,
    'DiceRollCount: setDeterministicRolls sets powerCategoryRolls.');

  // --- Ultimate mode: verify deterministic values set ---
  const gen3 = new CharacterGenerator();
  gen3.generatorMode = 'ultimate';
  gen3.setTables();
  gen3.setDeterministicRolls();
  Tester.assert(gen3.weaknessStimulusRoll > 0,
    'DiceRollCount: ultimate setDeterministicRolls sets weaknessStimulusRoll.');
  Tester.assert(gen3.weaknessEffectRoll > 0,
    'DiceRollCount: ultimate setDeterministicRolls sets weaknessEffectRoll.');

  // Verify reproducibility: same seed → same roll count
  const gen4 = new CharacterGenerator();
  gen4.generatorMode = 'basic';
  gen4.setTables();
  Dice.seed(42);
  gen4.setDeterministicRolls();
  const countA = Dice.rollCount;

  const gen5 = new CharacterGenerator();
  gen5.generatorMode = 'basic';
  gen5.setTables();
  Dice.seed(42);
  gen5.setDeterministicRolls();
  const countB = Dice.rollCount;

  Tester.assertEquals(countA, countB,
    `DiceRollCount: same seed produces same roll count (${countA}).`);

  // Restore
  Dice.seed(null);
}

Tester.registerTest('DiceRollCountIntegrationTests', false, 22, 'deterministic');

// ============================================================================
// DICE ROLL COUNT CONSISTENCY TESTS
// Verify roll count is positive after generation and consistent across modes.
// ============================================================================

Tester.DiceRollCountConsistencyTests = () => {
  const modes = ['basic', 'advanced', 'ultimate'];
  for (const mode of modes) {
    // Use throwAllRolls + generate (which uses Dice.roll)
    Dice.seed(100);
    Dice.rollCount = 0;
    const gen = new CharacterGenerator();
    gen.generatorMode = mode;
    gen.setTables();
    const char = gen.generate();

    Tester.assert(Dice.rollCount > 0,
      `DiceRollCountConsistency(${mode}): rollCount ${Dice.rollCount} > 0 after generation.`);

    // Verify same seed produces same roll count
    const countA = Dice.rollCount;
    Dice.seed(100);
    const gen2 = new CharacterGenerator();
    gen2.generatorMode = mode;
    gen2.setTables();
    gen2.generate();

    Tester.assertEquals(countA, Dice.rollCount,
      `DiceRollCountConsistency(${mode}): same seed → same roll count (${countA}).`);
  }
  Dice.seed(null);
};

Tester.registerTest('DiceRollCountConsistencyTests', false, 23, 'deterministic');
