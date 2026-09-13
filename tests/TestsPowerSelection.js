//  TestsPowerSelection
// Tests for the power selection (Choose mode) feature.
// Verifies that _preSelectedPowers API correctly overrides random power generation.

// ============================================================================
// HELPER: build a pre-selected powers array covering all possible slot counts
// ============================================================================
function _buildPreSelected(gen) {
  const catNames = gen.getPowerCategoryNames();
  const preSelected = [];
  for (let i = 0; i < 10; i++) {
    const cat = catNames[i % catNames.length];
    const powers = gen.getPowersForCategory(cat);
    if (powers.length > 0) {
      preSelected.push({ category: cat, powerName: powers[0].name });
    }
  }
  return preSelected;
}

// ============================================================================
// Helper: use deterministic rolls + manually set power count to get
// a fully predictable character, then apply pre-selected powers.
// ============================================================================
function _setupDeterministicWithPreSelected(gen, mode) {
  gen.generatorMode = mode;
  gen.setTables();
  gen.setDeterministicRolls();

  // Build pre-selected powers from the actual categories
  const catNames = gen.getPowerCategoryNames();
  const preSelected = [];
  for (let i = 0; i < 10; i++) {
    const cat = catNames[i % catNames.length];
    const powers = gen.getPowersForCategory(cat);
    if (powers.length > 0) {
      preSelected.push({ category: cat, powerName: powers[0].name });
    }
  }
  gen._preSelectedPowers = preSelected;

  // Determine how many powers the deterministic rolls produce
  const result = gen.getPowerSlotsAndCategories();
  return { expectedCount: result.count, expectedCategories: result.categories, preSelected };
}

// ============================================================================
// TESTS
// ============================================================================

Tester.PreSelectedPowersBasicTests = (gen) => {
  const { expectedCount, preSelected } = _setupDeterministicWithPreSelected(gen, 'basic');

  const char = gen.generateWithoutThrows();

  Tester.assert(char.powers.length >= 2,
    `PreSelectedPowers: Generated ${char.powers.length} powers (expected >= 2).`);

  // Each power should match the pre-selected name at that index
  for (let i = 0; i < Math.min(char.powers.length, preSelected.length); i++) {
    Tester.assertEquals(preSelected[i].powerName, char.powers[i].name,
      `PreSelectedPowers: Slot ${i} name = ${char.powers[i].name}.`);
    Tester.assert(char.powers[i].rank !== undefined && char.powers[i].rank !== null,
      `PreSelectedPowers: Slot ${i} rank = ${char.powers[i].rank} (rolled).`);
  }

  const chooseLog = char.log.filter(l => typeof l === 'string' && l.indexOf('Choose:') !== -1);
  Tester.assert(chooseLog.length >= 1,
    `PreSelectedPowers: ${chooseLog.length} Choose log entries (expected >= 1).`);
};

Tester.PreSelectedPowersFallbackTests = (gen) => {
  gen.generatorMode = 'basic';
  gen.setTables();
  gen.setDeterministicRolls();

  // Use nonexistent power names to trigger fallback to normal roll logic
  gen._preSelectedPowers = [];
  for (let i = 0; i < 10; i++) {
    gen._preSelectedPowers.push({ category: 'Movement', powerName: 'Nonexistent Power ' + i });
  }

  const char = gen.generateWithoutThrows();

  Tester.assert(char.powers.length >= 1,
    `PreSelectedPowersFallback: ${char.powers.length} powers generated (fallback used).`);

  // Fallback log entries should appear
  const fallbackLog = char.log.filter(l => typeof l === 'string' && l.indexOf('Pre-selected power not found') !== -1);
  Tester.assert(fallbackLog.length >= 1,
    `PreSelectedPowersFallback: ${fallbackLog.length} fallback log entries.`);
};

Tester.PreSelectedPowersAdvancedTests = (gen) => {
  const { preSelected } = _setupDeterministicWithPreSelected(gen, 'advanced');

  const char = gen.generateWithoutThrows();

  Tester.assert(char.powers.length >= 1,
    `PreSelectedPowersAdvanced: ${char.powers.length} powers (expected >= 1).`);
  Tester.assertEquals(preSelected[0].powerName, char.powers[0].name,
    `PreSelectedPowersAdvanced: name = ${char.powers[0].name}.`);
};

Tester.PreSelectedPowersUltimateTests = (gen) => {
  const { preSelected } = _setupDeterministicWithPreSelected(gen, 'ultimate');

  const char = gen.generateWithoutThrows();

  Tester.assert(char.powers.length >= 1,
    `PreSelectedPowersUltimate: ${char.powers.length} powers (expected >= 1).`);
  Tester.assertEquals(preSelected[0].powerName, char.powers[0].name,
    `PreSelectedPowersUltimate: name = ${char.powers[0].name}.`);
};

Tester.PreSelectedPowersClearOnResetTests = (gen) => {
  gen.generatorMode = 'basic';
  gen.setTables();
  gen._preSelectedPowers = [{ category: 'Movement', powerName: 'Flight' }];

  Tester.assert(gen._preSelectedPowers !== null,
    `PreSelectedPowersReset: _preSelectedPowers set before reset.`);

  gen.reset();

  Tester.assertEquals(null, gen._preSelectedPowers,
    `PreSelectedPowersReset: _preSelectedPowers cleared after reset.`);
};

Tester.GetPowerSlotsAndCategoriesTests = (gen) => {
  gen.generatorMode = 'basic';
  gen.setTables();
  gen.setDeterministicRolls();

  const result = gen.getPowerSlotsAndCategories();

  Tester.assert(result.count > 0,
    `GetPowerSlots: count = ${result.count} (expected > 0).`);
  Tester.assert(result.categories.length === result.count,
    `GetPowerSlots: ${result.categories.length} categories = ${result.count} count.`);
  Tester.assert(Array.isArray(result.categories),
    `GetPowerSlots: categories is array.`);

  const validCategories = gen.getPowerCategoryNames();
  for (let i = 0; i < result.categories.length; i++) {
    Tester.assert(validCategories.indexOf(result.categories[i]) !== -1,
      `GetPowerSlots: category[${i}] = "${result.categories[i]}" is valid.`);
  }
};

Tester.GetPowersForCategoryTests = (gen) => {
  gen.generatorMode = 'basic';
  gen.setTables();

  const resistances = gen.getPowersForCategory('Resistances and Senses');
  Tester.assert(resistances.length === 9,
    `GetPowersForCategory: Resistances has ${resistances.length} powers (expected 9).`);

  for (let i = 0; i < resistances.length; i++) {
    Tester.assert(resistances[i].name !== undefined,
      `GetPowersForCategory: resistances[${i}].name defined.`);
    Tester.assertEquals('Resistances and Senses', resistances[i].category,
      `GetPowersForCategory: resistances[${i}].category correct.`);
    Tester.assert(resistances[i].description !== undefined && resistances[i].description.length > 0,
      `GetPowersForCategory: resistances[${i}].description present.`);
  }

  const empty = gen.getPowersForCategory('Nonexistent Category');
  Tester.assertEquals(0, empty.length,
    `GetPowersForCategory: Nonexistent returns empty array (${empty.length}).`);
};

Tester.GetPowerCategoryNamesTests = (gen) => {
  gen.generatorMode = 'basic';
  gen.setTables();

  const names = gen.getPowerCategoryNames();
  Tester.assert(names.length === 10,
    `GetPowerCategoryNames: Basic has ${names.length} categories (expected 10).`);

  const expected = [
    'Resistances and Senses', 'Movement', 'Nature Control',
    'Energy Control', 'Body Control', 'Distance Attacks',
    'Mental Powers', 'Body Alterations, Offensive',
    'Body Alterations, Defensive',
    'Weapons, Vehicles, Sidekicks, and Alter Egos'
  ];
  for (let i = 0; i < expected.length; i++) {
    Tester.assert(names.indexOf(expected[i]) !== -1,
      `GetPowerCategoryNames: "${expected[i]}" found.`);
  }
};

// ============================================================================
// TEST: Bonus power reduces power slot count
// When a physical form has bonusPowerCount > 0, the number of regular power
// slots (for the dialog / getPowerSlotsAndCategories) should be reduced.
// Total powers generated = powersCount (bonus + regular = powersCount, not
// bonus + powersCount). The dialog should show powersCount - bonusPowerCount
// category slots.
// ============================================================================

Tester.BonusPowerSlotReductionTests = (gen) => {
  // NOTE: This test is NOT brittle — it reads the quantity table dynamically
  // via gen.powerNumberRoll so it adapts to any deterministic roll value.
  // The invariant tested: bonus + regular = powersCount, regardless of rolls.

  // --- Basic mode: Hi-Tech has bonusPowerCount: 1 ---
  gen.generatorMode = 'basic';
  gen.setTables();
  gen.setDeterministicRolls();

  const hiTechRow = gen.physicalFormTable.find(o => o.name === 'Hi-Tech');
  Tester.assert(hiTechRow !== undefined, 'BonusSlotReduction: Hi-Tech form found.');
  Tester.assert(hiTechRow.bonusPowerCount === 1, 'BonusSlotReduction: Hi-Tech bonusPowerCount = 1.');

  // Force Hi-Tech physical form
  gen.physicalFormRoll = hiTechRow.maxRoll;

  // Get the expected power count from the quantity table
  const pRoll = Math.max(1, Math.min(100, gen.powerNumberRoll || 1));
  const pQtyRow = gen.quantityTable.find(q => pRoll <= q.maxRoll);
  const basePowersCount = pQtyRow.powers.initial;

  // getPowerSlotsAndCategories should return count - bonusPowerCount
  const result = gen.getPowerSlotsAndCategories();
  const expectedSlotCount = Math.max(0, basePowersCount - hiTechRow.bonusPowerCount);
  Tester.assertEquals(expectedSlotCount, result.count,
    `BonusSlotReduction (getPowerSlotsAndCategories): count ${result.count} should be ${expectedSlotCount} (base ${basePowersCount} - bonusPowerCount ${hiTechRow.bonusPowerCount}).`);
  Tester.assertEquals(result.count, result.categories.length,
    `BonusSlotReduction: categories.length ${result.categories.length} matches count ${result.count}.`);

  // Generate character and verify total powers = powersCount (not powersCount + bonusPowerCount)
  const char = gen.generateWithoutThrows();
  const bonusPowers = char.powers.filter(p => p.bonusPower);
  const regularPowers = char.powers.filter(p => !p.bonusPower);

  Tester.assertEquals(1, bonusPowers.length,
    `BonusSlotReduction (generate): ${bonusPowers.length} bonus power(s) (expected 1).`);
  Tester.assertEquals(expectedSlotCount, regularPowers.length,
    `BonusSlotReduction (generate): ${regularPowers.length} regular powers (expected ${expectedSlotCount}).`);
  Tester.assertEquals(basePowersCount, char.powers.length,
    `BonusSlotReduction (generate): total powers ${char.powers.length} = powersCount ${basePowersCount}.`);
  // char.powersCount stays at base value — slot accounting is in generateSinglePower via remainingSlots
  // But the total powers generated should equal the base count (bonus + regular = powersCount)
  Tester.assertEquals(basePowersCount, char.powersCount,
    `BonusSlotReduction (generate): char.powersCount ${char.powersCount} = basePowersCount ${basePowersCount}.`);

  // --- Ultimate mode: Animal has bonusPowerCount: 2 ---
  gen.setTables();
  gen.setDeterministicRolls();
  gen.generatorMode = 'ultimate';
  gen.setTables();
  gen.setDeterministicRolls();

  const animalRow = gen.physicalFormTable.find(o => o.name === 'Animal');
  if (animalRow && animalRow.bonusPowerCount) {
    gen.physicalFormRoll = animalRow.maxRoll;

    const result2 = gen.getPowerSlotsAndCategories();
    const pRoll2 = Math.max(1, Math.min(100, gen.powerNumberRoll || 1));
    const pQtyRow2 = gen.quantityTable.find(q => pRoll2 <= q.maxRoll);
    const baseCount2 = pQtyRow2.powers.initial;
    const expected2 = Math.max(0, baseCount2 - animalRow.bonusPowerCount);

    Tester.assertEquals(expected2, result2.count,
      `BonusSlotReduction (Ultimate/Animal): count ${result2.count} should be ${expected2} (base ${baseCount2} - bonusPowerCount ${animalRow.bonusPowerCount}).`);

    const char2 = gen.generateWithoutThrows();
    const bonus2 = char2.powers.filter(p => p.bonusPower);
    const regular2 = char2.powers.filter(p => !p.bonusPower);
    Tester.assertEquals(animalRow.bonusPowerCount, bonus2.length,
      `BonusSlotReduction (Ultimate/Animal generate): ${bonus2.length} bonus powers (expected ${animalRow.bonusPowerCount}).`);
    Tester.assertEquals(expected2, regular2.length,
      `BonusSlotReduction (Ultimate/Animal generate): ${regular2.length} regular powers (expected ${expected2}).`);
  }
};

Tester.registerTestGroup(70, 'deterministic', [
  { name: 'GetPowerCategoryNamesTests', needsGen: true },
  { name: 'GetPowersForCategoryTests', needsGen: true },
  { name: 'GetPowerSlotsAndCategoriesTests', needsGen: true },
  { name: 'PreSelectedPowersBasicTests', needsGen: true },
  { name: 'PreSelectedPowersFallbackTests', needsGen: true },
  { name: 'PreSelectedPowersAdvancedTests', needsGen: true },
  { name: 'PreSelectedPowersUltimateTests', needsGen: true },
  { name: 'PreSelectedPowersClearOnResetTests', needsGen: true },
  { name: 'BonusPowerSlotReductionTests', needsGen: true },
]);
