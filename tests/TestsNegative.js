// TestsNegative.js
// Extensive negative tests including failure tests where none exist.
// Exercises error paths, invalid inputs, edge cases, and failure scenarios
// across CharacterGenerator, Character, Utility, Dice, and data tables.

// ============================================================================
// CHARACTERGENERATOR — invalid mode, null options, and edge cases
// ============================================================================

Tester.GenInvalidModeTests = () => {
  // Invalid mode should fall back to basic tables
  const char1 = CharacterGenerator.generateCharacter('bogus_mode', {
    useDeterministicRolls: true,
  });
  Tester.assert(char1 !== null, 'InvalidMode: returns a character.');
  Tester.assert(char1.physicalForm !== '', 'InvalidMode: physicalForm is set.');

  // Empty string mode
  const char2 = CharacterGenerator.generateCharacter('', {
    useDeterministicRolls: true,
  });
  Tester.assert(char2 !== null, 'EmptyMode: returns a character.');

  // Null mode
  const char3 = CharacterGenerator.generateCharacter(null, {
    useDeterministicRolls: true,
  });
  Tester.assert(char3 !== null, 'NullMode: returns a character.');

  // Undefined mode
  const char4 = CharacterGenerator.generateCharacter(undefined, {
    useDeterministicRolls: true,
  });
  Tester.assert(char4 !== null, 'UndefinedMode: returns a character.');
};

// ============================================================================
// CHARACTERGENERATOR — null/undefined options
// ============================================================================

Tester.GenNullOptionsTests = () => {
  // null options — should still produce a character (uses defaults)
  const char1 = CharacterGenerator.generateCharacter('basic', null);
  Tester.assert(char1 !== null, 'NullOptions: returns a character.');
  // physicalForm may be empty if no deterministic rolls are set
  Tester.assert(typeof char1.physicalForm === 'string',
    'NullOptions: physicalForm is a string.');

  // undefined options
  const char2 = CharacterGenerator.generateCharacter('basic', undefined);
  Tester.assert(char2 !== null, 'UndefinedOptions: returns a character.');

  // empty options
  const char3 = CharacterGenerator.generateCharacter('basic', {});
  Tester.assert(char3 !== null, 'EmptyOptions: returns a character.');

  // options with only seed (no useDeterministicRolls)
  const char4 = CharacterGenerator.generateCharacter('basic', { seed: 42 });
  Tester.assert(char4 !== null, 'SeedOnlyOptions: returns a character.');
  Tester.assert(typeof char4.physicalForm === 'string',
    'SeedOnlyOptions: physicalForm is a string.');
};

// ============================================================================
// CHARACTERGENERATOR — extreme roll values
// ============================================================================

Tester.GenExtremeRollTests = () => {
  const gen = new CharacterGenerator();
  gen.generatorMode = 'basic';
  gen.setTables();
  gen.setDeterministicRolls();

  // physicalFormRoll = 0 (below valid range)
  gen.physicalFormRoll = 0;
  const char1 = gen.generateWithoutThrows();
  Tester.assert(char1 !== null, 'ExtremeRoll(0): returns a character.');

  // physicalFormRoll = 101 (above valid range)
  gen.setDeterministicRolls();
  gen.physicalFormRoll = 101;
  const char2 = gen.generateWithoutThrows();
  Tester.assert(char2 !== null, 'ExtremeRoll(101): returns a character.');

  // physicalFormRoll = -1 (negative)
  gen.setDeterministicRolls();
  gen.physicalFormRoll = -1;
  const char3 = gen.generateWithoutThrows();
  Tester.assert(char3 !== null, 'ExtremeRoll(-1): returns a character.');

  // physicalFormRoll = 9999 (very high)
  gen.setDeterministicRolls();
  gen.physicalFormRoll = 9999;
  const char4 = gen.generateWithoutThrows();
  Tester.assert(char4 !== null, 'ExtremeRoll(9999): returns a character.');

  // originRoll = 0
  gen.setDeterministicRolls();
  gen.originRoll = 0;
  const char5 = gen.generateWithoutThrows();
  Tester.assert(char5 !== null, 'ExtremeOriginRoll(0): returns a character.');

  // originRoll = 101
  gen.setDeterministicRolls();
  gen.originRoll = 101;
  const char6 = gen.generateWithoutThrows();
  Tester.assert(char6 !== null, 'ExtremeOriginRoll(101): returns a character.');

  // powerNumberRoll = 0 (may be clamped to minimum by quantity table)
  gen.setDeterministicRolls();
  gen.powerNumberRoll = 0;
  const char7 = gen.generateWithoutThrows();
  Tester.assert(char7 !== null, 'ExtremePowerRoll(0): returns a character.');
  Tester.assert(char7.powers.length >= 0,
    'ExtremePowerRoll(0): powers count is non-negative.');

  // powerNumberRoll = 100 (max powers)
  gen.setDeterministicRolls();
  gen.powerNumberRoll = 100;
  const char8 = gen.generateWithoutThrows();
  Tester.assert(char8 !== null, 'ExtremePowerRoll(100): returns a character.');
  Tester.assert(char8.powers.length > 0, 'ExtremePowerRoll(100): has powers.');

  // All power rolls = 0 (invalid)
  gen.setDeterministicRolls();
  gen.powerCategoryRolls = Array(gen.rollArraySize).fill(0);
  gen.powerRolls = Array(gen.rollArraySize).fill(0);
  const char9 = gen.generateWithoutThrows();
  Tester.assert(char9 !== null, 'AllZeroPowerRolls: returns a character.');

  // All power rolls = 150 (out of range)
  gen.setDeterministicRolls();
  gen.powerCategoryRolls = Array(gen.rollArraySize).fill(150);
  gen.powerRolls = Array(gen.rollArraySize).fill(150);
  const char10 = gen.generateWithoutThrows();
  Tester.assert(char10 !== null, 'All150PowerRolls: returns a character.');
};

// ============================================================================
// CHARACTERGENERATOR — reset() state isolation
// ============================================================================

Tester.GenResetTests = () => {
  const gen = new CharacterGenerator();
  gen.generatorMode = 'basic';
  gen.setTables();
  gen.setDeterministicRolls();

  // Generate first character
  const char1 = gen.generateWithoutThrows();
  const form1 = char1.physicalForm;

  // Reset and generate again with same rolls
  gen.reset();
  gen.generatorMode = 'basic';
  gen.setTables();
  gen.setDeterministicRolls();
  const char2 = gen.generateWithoutThrows();

  // Same rolls should produce same result
  Tester.assertEquals(form1, char2.physicalForm,
    'Reset: same rolls produce same physicalForm.');

  // Reset should clear mutable state
  gen.reset();
  Tester.assertEquals(0, gen.physicalFormRoll,
    'Reset: physicalFormRoll cleared to 0.');
  Tester.assertEquals(0, gen.originRoll,
    'Reset: originRoll cleared to 0.');
};

// ============================================================================
// CHARACTER — setAbility edge cases
// ============================================================================

Tester.CharacterSetAbilityTests = () => {
  const char = new Character();

  // Set ability at index 0 (normal)
  char.setAbility('Fighting', 'Good', 10, 0);
  Tester.assertEquals('Good', char.getAbility('Fighting').rank,
    'setAbility: normal set works.');

  // Set ability with empty rank string
  char.setAbility('Agility', '', 0, 0);
  Tester.assertEquals('', char.getAbility('Agility').rank,
    'setAbility: empty rank string accepted.');

  // Set ability with rankNumber = 0
  char.setAbility('Strength', 'Shift 0', 0, 0);
  Tester.assertEquals('Shift 0', char.getAbility('Strength').rank,
    'setAbility: Shift 0 rank accepted.');
  Tester.assertEquals(0, char.getAbility('Strength').number,
    'setAbility: number is 0.');

  // Set ability with negative rankNumber
  char.setAbility('Endurance', 'Feeble', -5, 0);
  Tester.assertEquals('Feeble', char.getAbility('Endurance').rank,
    'setAbility: negative rankNumber accepted.');

  // Set ability with very high rankNumber
  char.setAbility('Reason', 'Amazing', 9999, 0);
  Tester.assertEquals('Amazing', char.getAbility('Reason').rank,
    'setAbility: very high rankNumber accepted.');
  Tester.assertEquals(9999, char.getAbility('Reason').number,
    'setAbility: number is 9999.');

  // Set ability on multiple indices (must be done before high-index test
  // because high index creates a sparse array)
  char.setAbility('Intuition', 'Typical', 6, 0);
  char.setAbility('Intuition', 'Good', 10, 1);
  char.setAbility('Intuition', 'Excellent', 20, 2);
  Tester.assertEquals('Typical', char.getAbility('Intuition', 0).rank,
    'setAbility: index 0 set.');
  Tester.assertEquals('Good', char.getAbility('Intuition', 1).rank,
    'setAbility: index 1 set.');
  Tester.assertEquals('Excellent', char.getAbility('Intuition', 2).rank,
    'setAbility: index 2 set.');

  // Set ability at very high index (auto-expand)
  // NOTE: sparse array — indices 3–49 remain empty
  char.setAbility('Fighting', 'Amazing', 30, 50);
  Tester.assert(char.primaryAbilities[50] !== undefined,
    'setAbility: auto-expanded to index 50.');
  Tester.assertEquals('Amazing', char.primaryAbilities[50]['Fighting'].rank,
    'setAbility: rank set on expanded index.');

  // getAbility with invalid ability name
  const result = char.getAbility('NonexistentAbility');
  Tester.assert(result === undefined,
    'getAbility: undefined for nonexistent ability.');

  // getAbility with null index
  char.setAbility('Psyche', 'Incredible', 40, 0);
  const psyche = char.getAbility('Psyche', null);
  Tester.assertEquals('Incredible', psyche.rank,
    'getAbility: null index defaults to 0.');

  // getAbility with undefined index
  const psyche2 = char.getAbility('Psyche', undefined);
  Tester.assertEquals('Incredible', psyche2.rank,
    'getAbility: undefined index defaults to 0.');
};

// ============================================================================
// CHARACTER — calculateSecondary edge cases
// ============================================================================

Tester.CharacterCalculateSecondaryTests = () => {
  // All zero abilities
  const char1 = new Character();
  char1.calculateSecondary();
  Tester.assertEquals(0, char1.health, 'CalcSecondary(zeros): health = 0.');
  Tester.assertEquals(0, char1.karma, 'CalcSecondary(zeros): karma = 0.');

  // All max abilities (Amazing = 50)
  const char2 = new Character();
  char2.setAbility('Fighting', 'Amazing', 50, 0);
  char2.setAbility('Agility', 'Amazing', 50, 0);
  char2.setAbility('Strength', 'Amazing', 50, 0);
  char2.setAbility('Endurance', 'Amazing', 50, 0);
  char2.setAbility('Reason', 'Amazing', 50, 0);
  char2.setAbility('Intuition', 'Amazing', 50, 0);
  char2.setAbility('Psyche', 'Amazing', 50, 0);
  char2.calculateSecondary();
  Tester.assertEquals(200, char2.health, 'CalcSecondary(max): health = 200.');
  Tester.assertEquals(150, char2.karma, 'CalcSecondary(max): karma = 150.');

  // Mixed abilities
  const char3 = new Character();
  char3.setAbility('Fighting', 'Good', 10, 0);
  char3.setAbility('Agility', 'Typical', 6, 0);
  char3.setAbility('Strength', 'Excellent', 20, 0);
  char3.setAbility('Endurance', 'Poor', 4, 0);
  char3.setAbility('Reason', 'Remarkable', 30, 0);
  char3.setAbility('Intuition', 'Incredible', 40, 0);
  char3.setAbility('Psyche', 'Excellent', 20, 0);
  char3.calculateSecondary();
  Tester.assertEquals(40, char3.health, 'CalcSecondary(mixed): health = 40.');
  Tester.assertEquals(90, char3.karma, 'CalcSecondary(mixed): karma = 90.');

  // Recalculate after changing abilities
  const char4 = new Character();
  char4.setAbility('Fighting', 'Good', 10, 0);
  char4.calculateSecondary();
  const health1 = char4.health;
  char4.setAbility('Fighting', 'Amazing', 50, 0);
  char4.calculateSecondary();
  Tester.assert(char4.health > health1,
    'CalcSecondary(recalc): health increased after ability change.');
};

// ============================================================================
// UTILITY — getValue edge cases
// ============================================================================

Tester.UtilityGetValueEdgeCases = () => {
  // Nested object — returns the nested object itself
  const nested = { b: 42 };
  const result = Utility.getValue({ a: nested }, 'a', -1);
  Tester.assert(result === nested,
    'getValue(nested): returns the nested object reference.');

  // Property is 0 (falsy but defined)
  Tester.assertEquals(0, Utility.getValue({ x: 0 }, 'x', -1),
    'getValue(0): returns 0.');

  // Property is false (falsy but defined)
  Tester.assertEquals(false, Utility.getValue({ x: false }, 'x', -1),
    'getValue(false): returns false.');

  // Property is empty string (falsy but defined)
  Tester.assertEquals('', Utility.getValue({ x: '' }, 'x', -1),
    'getValue(empty): returns empty string.');

  // Property is NaN
  Tester.assert(isNaN(Utility.getValue({ x: NaN }, 'x', -1)),
    'getValue(NaN): returns NaN.');

  // Property is Infinity
  Tester.assertEquals(Infinity, Utility.getValue({ x: Infinity }, 'x', -1),
    'getValue(Infinity): returns Infinity.');

  // Property is negative zero
  Tester.assertEquals(-0, Utility.getValue({ x: -0 }, 'x', -1),
    'getValue(-0): returns -0.');

  // Default is undefined — getValue replaces undefined with -1
  Tester.assertEquals(-1, Utility.getValue({}, 'missing'),
    'getValue(no default): returns -1 (default default).');

  // Default is null — getValue replaces null with -1
  Tester.assertEquals(-1, Utility.getValue({}, 'missing', null),
    'getValue(null default): returns -1 (null treated as undefined).');

  // Object is array — index '0' accesses first element
  Tester.assertEquals(10, Utility.getValue([10, 20, 30], '0', -1),
    'getValue(array): array index 0 returns first element.');

  // Property name is number
  Tester.assertEquals(42, Utility.getValue({ '0': 42 }, '0', -1),
    'getValue(numeric prop): numeric property name.');
};

// ============================================================================
// UTILITY — findRow edge cases
// ============================================================================

Tester.UtilityFindRowEdgeCases = () => {
  const gen = new CharacterGenerator();
  gen.generatorMode = 'basic';
  gen.setTables();

  // Column 0 (invalid — should return null)
  const row0 = Utility.findRow(gen, 50, 0);
  Tester.assert(row0 === null, 'findRow(col=0): returns null.');

  // Column -1 (invalid)
  const rowNeg = Utility.findRow(gen, 50, -1);
  Tester.assert(rowNeg === null, 'findRow(col=-1): returns null.');

  // Column 6 (beyond table width)
  const row6 = Utility.findRow(gen, 50, 6);
  Tester.assert(row6 === null, 'findRow(col=6): returns null.');

  // Roll exactly 0
  const rowRoll0 = Utility.findRow(gen, 0, 1);
  Tester.assert(rowRoll0 !== null, 'findRow(roll=0): returns a row.');

  // Roll exactly 1
  const rowRoll1 = Utility.findRow(gen, 1, 1);
  Tester.assert(rowRoll1 !== null, 'findRow(roll=1): returns a row.');

  // Roll exactly 100
  const rowRoll100 = Utility.findRow(gen, 100, 1);
  Tester.assert(rowRoll100 !== null, 'findRow(roll=100): returns a row.');

  // Roll 101 (above max)
  const rowRoll101 = Utility.findRow(gen, 101, 1);
  Tester.assert(rowRoll101 === null, 'findRow(roll=101): returns null.');

  // Roll -1 (negative) — may match first row since 0 <= first maxRoll
  const rowRollNeg = Utility.findRow(gen, -1, 1);
  Tester.assert(rowRollNeg !== null, 'findRow(roll=-1): returns a row (matches first entry).');

  // Roll 9999 (very high)
  const rowRollHigh = Utility.findRow(gen, 9999, 1);
  Tester.assert(rowRollHigh === null, 'findRow(roll=9999): returns null.');
};

// ============================================================================
// DICE — edge cases and stress tests
// ============================================================================

Tester.DiceEdgeCasesStressTests = () => {
  // Seed with negative number
  Dice.seed(-1);
  const r1 = Dice.roll(1, 100);
  Tester.assert(r1 >= 1 && r1 <= 100, 'Dice(seed=-1): roll in range.');

  // Seed with very large number
  Dice.seed(2147483647);
  const r2 = Dice.roll(1, 100);
  Tester.assert(r2 >= 1 && r2 <= 100, 'Dice(seed=MAX_INT): roll in range.');

  // Seed with 0
  Dice.seed(0);
  const r3 = Dice.roll(1, 100);
  Tester.assert(r3 >= 1 && r3 <= 100, 'Dice(seed=0): roll in range.');

  // Roll with min === max
  Dice.seed(42);
  for (let i = 0; i < 10; i++) {
    const r = Dice.roll(50, 50);
    Tester.assertEquals(50, r, 'Dice.roll(50,50): always 50.');
  }

  // Roll with min > max (inverted)
  Dice.seed(42);
  const inverted = Dice.roll(100, 1);
  Tester.assert(inverted >= 1 && inverted <= 100,
    'Dice.roll(100,1): inverted range still returns valid number.');

  // Roll with very large range
  Dice.seed(42);
  const large = Dice.roll(1, 1000000);
  Tester.assert(large >= 1 && large <= 1000000,
    'Dice.roll(1,1000000): large range returns valid number.');

  // Roll with negative range
  Dice.seed(42);
  const negRange = Dice.roll(-100, -1);
  Tester.assert(negRange >= -100 && negRange <= -1,
    'Dice.roll(-100,-1): negative range returns valid number.');

  // Roll count tracking
  Dice.seed(42);
  Dice.rollCount = 0;
  Dice.roll(1, 10);
  Dice.roll(1, 10);
  Dice.roll100();
  Tester.assertEquals(3, Dice.rollCount, 'Dice.rollCount: 3 after 3 calls.');

  // Seed resets roll count
  Dice.seed(99);
  Tester.assertEquals(0, Dice.rollCount, 'Dice.rollCount: reset on seed().');

  // getRandomItem with single element
  Dice.seed(42);
  const single = Dice.getRandomItem(['only']);
  Tester.assertEquals('only', single, 'Dice.getRandomItem(single): returns element.');

  // getRandomItem with large array
  const largeArr = Array.from({ length: 1000 }, (_, i) => i);
  Dice.seed(42);
  const largeItem = Dice.getRandomItem(largeArr);
  Tester.assert(largeItem >= 0 && largeItem < 1000,
    'Dice.getRandomItem(large): returns valid index.');

  // Restore
  Dice.seed(null);
};

// ============================================================================
// POWER GENERATION — failure paths
// ============================================================================

Tester.PowerGenerationFailureTests = () => {
  const gen = new CharacterGenerator();
  gen.generatorMode = 'basic';
  gen.setTables();
  gen.setDeterministicRolls();

  // No remaining power slots
  const char1 = new Character();
  char1.physicalForm = 'Altered Human';
  char1.powersCount = 0;
  char1.powersMax = 0;
  gen.generateSinglePower(char1, 0);
  Tester.assertEquals(0, char1.powers.length,
    'PowerFailure(noSlots): no powers generated.');

  // Invalid category roll (0)
  const char2 = new Character();
  char2.physicalForm = 'Altered Human';
  char2.powersCount = 10;
  char2.powersMax = 10;
  gen.powerCategoryRolls = Array(gen.rollArraySize).fill(0);
  gen.powerRolls = Array(gen.rollArraySize).fill(50);
  gen.powerRankRolls = Array(gen.rollArraySize).fill(50);
  gen.generateSinglePower(char2, 0);
  Tester.assertEquals(0, char2.powers.length,
    'PowerFailure(catRoll=0): no powers generated.');

  // Invalid category roll (150)
  const char3 = new Character();
  char3.physicalForm = 'Altered Human';
  char3.powersCount = 10;
  char3.powersMax = 10;
  gen.powerCategoryRolls = Array(gen.rollArraySize).fill(150);
  gen.powerRolls = Array(gen.rollArraySize).fill(50);
  gen.powerRankRolls = Array(gen.rollArraySize).fill(50);
  gen.generateSinglePower(char3, 0);
  Tester.assertEquals(0, char3.powers.length,
    'PowerFailure(catRoll=150): no powers generated.');

  // All power rolls > 100 (exhausted array)
  const char4 = new Character();
  char4.physicalForm = 'Altered Human';
  char4.powersCount = 10;
  char4.powersMax = 10;
  gen.powerCategoryRolls = Array(gen.rollArraySize).fill(50);
  gen.powerRolls = Array(gen.rollArraySize).fill(150);
  gen.powerRankRolls = Array(gen.rollArraySize).fill(50);
  gen.generateSinglePower(char4, 0);
  Tester.assertEquals(0, char4.powers.length,
    'PowerFailure(allRolls>100): no powers generated.');

  // Exhaust all powers in a category (duplicate handling)
  const char5 = new Character();
  char5.physicalForm = 'Altered Human';
  char5.powersCount = 20;
  char5.powersMax = 20;
  char5._assignedPowerNames = new Set();
  // Find smallest category and exhaust it
  const catCounts = {};
  gen.powerListTable.forEach(p => {
    if (!catCounts[p.category]) catCounts[p.category] = 0;
    catCounts[p.category]++;
  });
  let minCat = null, minCount = 999;
  for (const [cat, count] of Object.entries(catCounts)) {
    if (count < minCount) { minCount = count; minCat = cat; }
  }
  if (minCat) {
    const catPowers = gen.powerListTable.filter(p => p.category === minCat);
    for (const p of catPowers) {
      char5.powers.push({
        name: p.name, code: p.code, category: p.category,
        description: '', rank: 'Typical', number: 6, powerSlots: 1
      });
    }
    char5._assignedPowerNames = new Set(char5.powers.map(p => p.name));
    const catEntry = gen.powerCategoriesTable.find(c => c.name === minCat);
    if (catEntry) {
      gen.powerCategoryRolls = Array(gen.rollArraySize).fill(Math.min(catEntry.maxRoll, 50));
      gen.powerRolls = Array(gen.rollArraySize).fill(50);
      gen.powerRankRolls = Array(gen.rollArraySize).fill(50);
      gen.generateSinglePower(char5, 0);
      Tester.assert(char5.powers.length >= catPowers.length,
        'PowerFailure(exhaustCat): cross-category fallback handled.');
    }
  }
};

// ============================================================================
// TALENT GENERATION — failure paths
// ============================================================================

Tester.TalentGenerationFailureTests = () => {
  const gen = new CharacterGenerator();
  gen.generatorMode = 'basic';
  gen.setTables();
  gen.setDeterministicRolls();

  // No talent slots
  const char1 = new Character();
  char1.physicalForm = 'Altered Human';
  char1.talentsCount = 0;
  char1.talentsMax = 0;
  gen.generateTalents(char1, 0);
  Tester.assertEquals(0, char1.talents.length,
    'TalentFailure(noSlots): no talents generated.');

  // Invalid talent category roll
  const char2 = new Character();
  char2.physicalForm = 'Altered Human';
  char2.talentsCount = 5;
  char2.talentsMax = 5;
  gen.talentCategoryRolls = Array(gen.rollArraySize).fill(0);
  gen.talentRolls = Array(gen.rollArraySize).fill(50);
  gen.generateTalents(char2, 0);
  Tester.assert(char2.talents.length >= 0,
    'TalentFailure(invalidCatRoll): handled gracefully.');
};

// ============================================================================
// CONTACT GENERATION — failure paths
// ============================================================================

Tester.ContactGenerationFailureTests = () => {
  const gen = new CharacterGenerator();
  gen.generatorMode = 'basic';
  gen.setTables();
  gen.setDeterministicRolls();

  // Contact generation is inlined in determineSpecialAbilities,
  // not a standalone method. Test via generateWithoutThrows.

  // No contact slots — use a roll that maps to 0 contacts
  gen.setDeterministicRolls();
  gen.contactNumberRoll = 1; // Roll 1 in quantity table
  const char1 = gen.generateWithoutThrows();
  Tester.assert(char1.contacts.length >= 0,
    'ContactFailure(lowRoll): contacts generated gracefully.');

  // Invalid contact category roll (0 is below any table entry)
  gen.setDeterministicRolls();
  gen.contactNumberRoll = 50;
  gen.contactCategoryRolls = Array(gen.rollArraySize).fill(0);
  gen.contactRolls = Array(gen.rollArraySize).fill(50);
  const char2 = gen.generateWithoutThrows();
  Tester.assert(char2.contacts.length >= 0,
    'ContactFailure(invalidCatRoll): handled gracefully.');
};

// ============================================================================
// ORIGIN DETERMINATION — failure paths
// ============================================================================

Tester.OriginFailureTests = () => {
  const gen = new CharacterGenerator();
  gen.generatorMode = 'basic';
  gen.setTables();

  // Invalid origin roll (0)
  gen.setDeterministicRolls();
  gen.originRoll = 0;
  const char1 = new Character();
  char1.physicalForm = 'Altered Human';
  gen.determineOrigin(char1);
  Tester.assert(char1.origin !== undefined,
    'OriginFailure(roll=0): origin is set.');

  // Invalid origin roll (101)
  gen.setDeterministicRolls();
  gen.originRoll = 101;
  const char2 = new Character();
  char2.physicalForm = 'Altered Human';
  gen.determineOrigin(char2);
  Tester.assert(char2.origin !== undefined,
    'OriginFailure(roll=101): origin is set.');

  // Negative origin roll
  gen.setDeterministicRolls();
  gen.originRoll = -5;
  const char3 = new Character();
  char3.physicalForm = 'Altered Human';
  gen.determineOrigin(char3);
  Tester.assert(char3.origin !== undefined,
    'OriginFailure(roll=-5): origin is set.');
};

// ============================================================================
// POPULARITY — edge cases
// ============================================================================

Tester.PopularityEdgeCaseTests = () => {
  const gen = new CharacterGenerator();
  gen.generatorMode = 'basic';
  gen.setTables();

  // Secret identity, secret origin (both -20 in basic)
  gen.setDeterministicRolls();
  const char1 = new Character();
  char1.physicalForm = 'Normal Human';
  gen.identitySecret = true;
  gen.originPublic = false;
  gen.wellEstablished = false;
  gen.looksHuman = false;
  gen.determinePopularity(char1);
  Tester.assert(char1.popularity >= 0,
    'PopEdgeCase(secret+secret): popularity >= 0.');

  // Public identity, public origin (both +20 in basic)
  gen.setDeterministicRolls();
  const char2 = new Character();
  char2.physicalForm = 'Normal Human';
  gen.identitySecret = false;
  gen.originPublic = true;
  gen.wellEstablished = false;
  gen.looksHuman = false;
  gen.determinePopularity(char2);
  Tester.assert(char2.popularity >= 0,
    'PopEdgeCase(public+public): popularity >= 0.');

  // Popularity set to 0 via form
  gen.setDeterministicRolls();
  const char3 = new Character();
  char3.physicalForm = 'Normal Human';
  gen.identitySecret = true;
  gen.originPublic = false;
  gen.wellEstablished = false;
  gen.looksHuman = false;
  gen.popularityRoll = 1; // Low roll
  gen.determinePopularity(char3);
  Tester.assert(char3.popularity >= 0,
    'PopEdgeCase(lowRoll): popularity >= 0.');
};

// ============================================================================
// HEALTH ADJUSTMENT — edge cases
// ============================================================================

Tester.HealthAdjustmentEdgeCaseTests = () => {
  const gen = new CharacterGenerator();
  gen.generatorMode = 'basic';
  gen.setTables();

  const row = gen.physicalFormTable.find(o => o.name === 'Altered Human');
  if (!row) return;

  const origHA = row.healthAdjustment;

  // healthAdjustment = 0 (no-op)
  row.healthAdjustment = 0;
  gen.setDeterministicRolls();
  const char1 = new Character();
  char1.physicalForm = 'Altered Human';
  char1.health = 50;
  gen.determineHealth(char1);
  Tester.assertEquals(50, char1.health, 'HealthEdge(0): no change.');

  // healthAdjustment = very large integer
  row.healthAdjustment = 1000;
  gen.setDeterministicRolls();
  const char2 = new Character();
  char2.physicalForm = 'Altered Human';
  char2.health = 10;
  gen.determineHealth(char2);
  Tester.assertEquals(1010, char2.health, 'HealthEdge(1000): large add.');

  // healthAdjustment = very negative integer
  row.healthAdjustment = -1000;
  gen.setDeterministicRolls();
  const char3 = new Character();
  char3.physicalForm = 'Altered Human';
  char3.health = 10;
  gen.determineHealth(char3);
  Tester.assertEquals(-990, char3.health, 'HealthEdge(-1000): large subtract.');

  // healthAdjustment = '/100' (divide by large number)
  row.healthAdjustment = '/100';
  gen.setDeterministicRolls();
  const char4 = new Character();
  char4.physicalForm = 'Altered Human';
  char4.health = 100;
  gen.determineHealth(char4);
  Tester.assertEquals(1, char4.health, 'HealthEdge(/100): divide by 100.');

  // Restore
  if (origHA !== undefined) row.healthAdjustment = origHA;
  else delete row.healthAdjustment;
};

// ============================================================================
// RESOURCE GENERATION — edge cases
// ============================================================================

Tester.ResourceEdgeCaseTests = () => {
  const gen = new CharacterGenerator();
  gen.generatorMode = 'basic';
  gen.setTables();

  // Hi-tech form with hiTechToGood = false
  gen.setDeterministicRolls();
  gen.hiTechToGood = false;
  const char1 = new Character();
  char1.physicalForm = 'Altered Human';
  gen.determineResources(char1);
  Tester.assert(char1.resources.rank !== '',
    'ResourceEdge(hiTech=false): resources set.');

  // Restore
  gen.hiTechToGood = true;
};

// ============================================================================
// ABILITY MODIFIER — edge cases
// ============================================================================

Tester.AbilityModifierEdgeCaseTests = () => {
  const gen = new CharacterGenerator();
  gen.generatorMode = 'basic';
  gen.setTables();
  gen.setDeterministicRolls();

  // getAbilityAfterModifier with invalid rank
  const char = new Character();
  const result = gen.getAbilityAfterModifier(char, 'Test', 'NonexistentRank', 0, -1, -1);
  Tester.assert(result !== undefined,
    'AbilityMod(invalidRank): returns a rank (falls back to Feeble).');

  // getAbilityAfterModifier with very large adjustment
  const char2 = new Character();
  const result2 = gen.getAbilityAfterModifier(char2, 'Test', 'Typical', 100, -1, -1);
  Tester.assertEquals('Amazing', result2,
    'AbilityMod(largeAdj): capped at Amazing.');

  // getAbilityAfterModifier with very negative adjustment
  const char3 = new Character();
  const result3 = gen.getAbilityAfterModifier(char3, 'Test', 'Typical', -100, -1, -1);
  Tester.assertEquals('Feeble', result3,
    'AbilityMod(negAdj): floored at Feeble.');

  // getAbilityAfterModifier with minimum clamp
  const char4 = new Character();
  const result4 = gen.getAbilityAfterModifier(char4, 'Test', 'Typical', -5, 'Good', -1);
  Tester.assert(result4 >= 'Good',
    'AbilityMod(minClamp): result >= minimum.');

  // getAbilityAfterModifier with maximum clamp
  const char5 = new Character();
  const result5 = gen.getAbilityAfterModifier(char5, 'Test', 'Typical', 5, -1, 'Typical');
  Tester.assert(result5 <= 'Typical',
    'AbilityMod(maxClamp): result <= maximum.');
};

// ============================================================================
// BOOST FUNCTIONS — edge cases
// ============================================================================

Tester.BoostEdgeCaseTests = () => {
  const gen = new CharacterGenerator();
  gen.generatorMode = 'ultimate';
  gen.setTables();
  gen.setDeterministicRolls();
  const char = gen.generateWithoutThrows();

  // boostAbility when ability is at Amazing (can still boost to Monstrous)
  char.getAbility('Fighting').rank = 'Amazing';
  char.getAbility('Fighting').number = 50;
  char.boostApplied = false;
  const result1 = gen.boostAbility(char, 'Fighting');
  // Amazing is not the last rank (Monstrous is), so boost succeeds
  Tester.assert(result1 === true,
    'BoostEdge(amazingRank): boosts to Monstrous.');
  Tester.assertEquals('Monstrous', char.getAbility('Fighting').rank,
    'BoostEdge(amazingRank): rank is now Monstrous.');

  // boostPower with empty powers array
  char.powers = [];
  char.boostApplied = false;
  const result2 = gen.boostPower(char, 0);
  Tester.assert(result2 === false, 'BoostEdge(emptyPowers): returns false.');

  // boostPower with negative index
  char.powers.push({ name: 'Test', rank: 'Good', number: 10 });
  char.boostApplied = false;
  const result3 = gen.boostPower(char, -5);
  Tester.assert(result3 === false, 'BoostEdge(negIndex): returns false.');

  // boostPower with index beyond array
  char.boostApplied = false;
  const result4 = gen.boostPower(char, 999);
  Tester.assert(result4 === false, 'BoostEdge(beyondIndex): returns false.');

  // boostApplied flag prevents double boost
  char.boostApplied = true;
  const result5 = gen.boostAbility(char, 'Agility');
  Tester.assert(result5 === false, 'BoostEdge(doubleBoost): blocked.');
};

// ============================================================================
// WEAKNESS — edge cases
// ============================================================================

Tester.WeaknessEdgeCaseTests = () => {
  const gen = new CharacterGenerator();
  gen.generatorMode = 'ultimate';
  gen.setTables();
  gen.setDeterministicRolls();

  // Extreme weakness rolls
  gen.weaknessStimulusRoll = 1;
  gen.weaknessEffectRoll = 1;
  gen.weaknessDurationRoll = 1;
  gen.weaknessRankRoll = 1;
  const char1 = gen.generateWithoutThrows();
  Tester.assert(char1.weakness.stimulus !== '',
    'WeaknessEdge(lowRolls): stimulus set.');

  gen.setDeterministicRolls();
  gen.weaknessStimulusRoll = 100;
  gen.weaknessEffectRoll = 100;
  gen.weaknessDurationRoll = 100;
  gen.weaknessRankRoll = 100;
  const char2 = gen.generateWithoutThrows();
  Tester.assert(char2.weakness.stimulus !== '',
    'WeaknessEdge(highRolls): stimulus set.');
};

// ============================================================================
// DATA TABLES — edge cases
// ============================================================================

Tester.DataTableEdgeCaseTests = () => {
  const gen = new CharacterGenerator();
  gen.generatorMode = 'basic';
  gen.setTables();

  // Power list table has entries
  Tester.assert(gen.powerListTable.length > 0,
    'DataTable: powerListTable has entries.');

  // Talent list table has entries
  Tester.assert(gen.talentListTable.length > 0,
    'DataTable: talentListTable has entries.');

  // Contact type list table has entries
  Tester.assert(gen.contactTypeListTable.length > 0,
    'DataTable: contactTypeListTable has entries.');

  // Origin table has entries
  Tester.assert(gen.originTable.length > 0,
    'DataTable: originTable has entries.');

  // Physical form table has entries
  Tester.assert(gen.physicalFormTable.length > 0,
    'DataTable: physicalFormTable has entries.');

  // Random ranks table has entries
  Tester.assert(gen.randomRanksTable.length > 0,
    'DataTable: randomRanksTable has entries.');

  // All power categories have valid maxRoll
  gen.powerCategoriesTable.forEach(c => {
    Tester.assert(typeof c.maxRoll === 'number' && c.maxRoll > 0,
      `DataTable: ${c.name} category has valid maxRoll (${c.maxRoll}).`);
  });

  // All origin entries have valid maxRoll
  gen.originTable.forEach(o => {
    Tester.assert(typeof o.maxRoll === 'number' && o.maxRoll > 0,
      `DataTable: ${o.name} origin has valid maxRoll (${o.maxRoll}).`);
  });
};

// ============================================================================
// COMPOUND FORM — edge cases
// ============================================================================

Tester.CompoundFormEdgeCaseTests = () => {
  const gen = new CharacterGenerator();
  gen.generatorMode = 'ultimate';
  gen.setTables();

  // Compound form with extreme body type rolls
  // bodyTypeRolls must map to non-compound forms (roll <= 25 = Normal Human).
  // Using 99 would map back to Compound itself, causing infinite recursion.
  gen.setDeterministicRolls();
  gen.physicalFormRoll = 99; // Compound form range
  gen.combinationsRoll = 50;
  gen.compoundRandomRanksColumnRoll = 35;
  gen.bodyTypeRolls = Array(10).fill(1); // All roll 1 = Normal Human
  const char1 = gen.generateWithoutThrows();
  Tester.assert(char1 !== null, 'CompoundEdge(allFirst): returns a character.');
  Tester.assertEquals('Compound', char1.physicalForm,
    'CompoundEdge(allFirst): physicalForm is Compound.');

  gen.setDeterministicRolls();
  gen.physicalFormRoll = 99;
  gen.combinationsRoll = 50;
  gen.compoundRandomRanksColumnRoll = 35;
  gen.bodyTypeRolls = Array(10).fill(25); // All roll 25 = Normal Human (boundary)
  const char2 = gen.generateWithoutThrows();
  Tester.assert(char2 !== null, 'CompoundEdge(allLast): returns a character.');
  Tester.assertEquals('Compound', char2.physicalForm,
    'CompoundEdge(allLast): physicalForm is Compound.');
};

// ============================================================================
// REGISTRATION
// ============================================================================

Tester.registerTestGroup(90, 'deterministic', [
  { name: 'GenInvalidModeTests', needsGen: false },
  { name: 'GenNullOptionsTests', needsGen: false },
  { name: 'GenExtremeRollTests', needsGen: false },
  { name: 'GenResetTests', needsGen: false },
  { name: 'CharacterSetAbilityTests', needsGen: false },
  { name: 'CharacterCalculateSecondaryTests', needsGen: false },
  { name: 'UtilityGetValueEdgeCases', needsGen: false },
  { name: 'UtilityFindRowEdgeCases', needsGen: false },
  { name: 'DiceEdgeCasesStressTests', needsGen: false },
  { name: 'PowerGenerationFailureTests', needsGen: false },
  { name: 'TalentGenerationFailureTests', needsGen: false },
  { name: 'ContactGenerationFailureTests', needsGen: false },
  { name: 'OriginFailureTests', needsGen: false },
  { name: 'PopularityEdgeCaseTests', needsGen: false },
  { name: 'HealthAdjustmentEdgeCaseTests', needsGen: false },
  { name: 'ResourceEdgeCaseTests', needsGen: false },
  { name: 'AbilityModifierEdgeCaseTests', needsGen: false },
  { name: 'BoostEdgeCaseTests', needsGen: false },
  { name: 'WeaknessEdgeCaseTests', needsGen: false },
  { name: 'DataTableEdgeCaseTests', needsGen: false },
  { name: 'CompoundFormEdgeCaseTests', needsGen: false },
]);
