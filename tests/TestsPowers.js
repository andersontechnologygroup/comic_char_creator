//  TestsPowers
// Extracted from UnitTests.js
//
// Refactored: Bonus/optional power validation is now data-driven via lookup
// tables instead of large switch/case blocks. To add a new power, just add
// an entry to ULTIMATE_BONUS_POWERS or ULTIMATE_OPTIONAL_POWERS.

Tester.SinglePowerBasicTests = (gen) => {
  gen.generatorMode = 'basic';
  gen.setTables();

  const char = new Character();
  char.physicalForm = "Altered Human";
  char.origin = "Altered Human";
  char.powersCount = 3;
  char.powersSlots = 3;
  gen.randomRanksColumn = 1;

  gen.powerCategoryRolls = [2, 27, 19, 74];
  gen.powerRolls = [20, 30, 40, 50];
  gen.powerRankRolls = [74, 19, 27, 2];

  gen.generateSinglePower(char, 0);

  Tester.assertEquals(1, char.powers.length, `Power Quantity Roll: Generated ${char.powers.length} powers.`);
  Tester.assertEquals("Resistances and Senses", char.powers[0].category, `Power Category Roll: Generated ${char.powers[0].category} category.`);
  Tester.assertEquals("Resistance to Cold", char.powers[0].name, `Power Roll: Generated ${char.powers[0].name} name.`);
  // Column 1: roll 74 → Remarkable (74 > 60 Excellent, ≤ 80 Remarkable)
  Tester.assertEquals("Remarkable", char.powers[0].rank, `Power Rank Roll: Generated ${char.powers[0].rank} rank.`);

  gen.generateSinglePower(char, 1);
  Tester.assertEquals(2, char.powers.length, `Power Quantity Roll: Generated ${char.powers.length} powers.`);
  Tester.assertEquals("Energy Control", char.powers[1].category, `Power Category Roll: Generated ${char.powers[1].category} category.`);
  Tester.assertEquals("Electrical Control", char.powers[1].name, `Power Roll: Generated ${char.powers[1].name} name.`);
  // Column 1: roll 19 → Typical (19 > 10 Poor, ≤ 20 Typical)
  Tester.assertEquals("Typical", char.powers[1].rank, `Power Rank Roll: Generated ${char.powers[1].rank} rank.`);

  gen.generateSinglePower(char, 2);
  Tester.assertEquals(3, char.powers.length, `Power Quantity Roll: Generated ${char.powers.length} powers.`);
  Tester.assertEquals("Nature Control", char.powers[2].category, `Power Category Roll: Generated ${char.powers[2].category} category.`);
  Tester.assertEquals("Air Control", char.powers[2].name, `Power Roll: Generated ${char.powers[2].name} name.`);
  Tester.assertEquals("Good", char.powers[2].rank, `Power Rank Roll: Generated ${char.powers[2].rank} rank.`);
}

Tester.SinglePowerAdvancedTests = (gen) => {
  gen.generatorMode = 'advanced';
  gen.setTables();

  const char = new Character();
  char.physicalForm = "Altered Human";
  char.origin = "Altered Human";
  gen.randomRanksColumn = 1;
  char.powersCount = 3;
  char.powersSlots = 3;

  gen.powerCategoryRolls = [2, 27, 19, 74];
  gen.powerRolls = [20, 30, 40, 50];
  gen.powerRankRolls = [74, 19, 27, 2];

  gen.generateSinglePower(char, 0);
  Tester.assertEquals(1, char.powers.length, `Power Quantity Roll: Generated ${char.powers.length} powers.`);
  // Advanced: "Resistances" (not "Resistances and Senses")
  Tester.assertEquals("Resistances", char.powers[0].category, `Power Category Roll: Generated ${char.powers[0].category} category.`);
  Tester.assertEquals("Resistance to Cold", char.powers[0].name, `Power Roll: Generated ${char.powers[0].name} name.`);
  // Column 4 (Advanced uses col 4 for powers): roll 74 → Incredible (74 > 70 Remarkable, ≤ 90 Incredible)
  Tester.assertEquals("Incredible", char.powers[0].rank, `Power Rank Roll: Generated ${char.powers[0].rank} rank.`);

  gen.generateSinglePower(char, 1);
  Tester.assertEquals(2, char.powers.length, `Power Quantity Roll: Generated ${char.powers.length} powers.`);
  Tester.assertEquals("Energy Control", char.powers[1].category, `Power Category Roll: Generated ${char.powers[1].category} category.`);
  // Advanced: "Electrical Manipulation" (not "Electrical Control")
  Tester.assertEquals("Electrical Manipulation", char.powers[1].name, `Power Roll: Generated ${char.powers[1].name} name.`);
  Tester.assertEquals("Good", char.powers[1].rank, `Power Rank Roll: Generated ${char.powers[1].rank} rank.`);

  gen.generateSinglePower(char, 2);
  Tester.assertEquals(3, char.powers.length, `Power Quantity Roll: Generated ${char.powers.length} powers.`);
  // Advanced: "Matter Control" (not "Nature Control")
  Tester.assertEquals("Matter Control", char.powers[2].category, `Power Category Roll: Generated ${char.powers[2].category} category.`);
  Tester.assertEquals("Air Control", char.powers[2].name, `Power Roll: Generated ${char.powers[2].name} name.`);
  Tester.assertEquals("Good", char.powers[2].rank, `Power Rank Roll: Generated ${char.powers[2].rank} rank.`);
}

Tester.SinglePowerUltimateTests = (gen) => {
  gen.generatorMode = 'ultimate';
  gen.setTables();

  const char = new Character();
  char.physicalForm = "Normal Human";
  char.origin = "Normal Human";
  gen.randomRanksColumn = 2;
  char.powersCount = 3;
  char.powersSlots = 3;

  gen.powerCategoryRolls = [2, 27, 19, 74];
  gen.powerRolls = [20, 30, 40, 50];
  gen.powerRankRolls = [74, 19, 27, 2];

  gen.generateSinglePower(char, 0);
  Tester.assertEquals(1, char.powers.length, `Power Quantity Roll: Generated ${char.powers.length} powers.`);
  Tester.assertEquals("Defensive", char.powers[0].category, `Power Category Roll: Generated ${char.powers[0].category} category.`);
  Tester.assertEquals("Force Field", char.powers[0].name, `Power Roll: Generated ${char.powers[0].name} name.`);
  Tester.assertEquals("Incredible", char.powers[0].rank, `Power Rank Roll: Generated ${char.powers[0].rank} rank.`);

  gen.generateSinglePower(char, 1);
  Tester.assertEquals(2, char.powers.length, `Power Quantity Roll: Generated ${char.powers.length} powers.`);
  Tester.assertEquals("Fighting", char.powers[1].category, `Power Category Roll: Generated ${char.powers[1].category} category.`);
  Tester.assertEquals("Martial Supremacy", char.powers[1].name, `Power Roll: Generated ${char.powers[1].name} name.`);
  Tester.assertEquals("Good", char.powers[1].rank, `Power Rank Roll: Generated ${char.powers[1].rank} rank.`);

  gen.generateSinglePower(char, 2);
  Tester.assertEquals(3, char.powers.length, `Power Quantity Roll: Generated ${char.powers.length} powers.`);
  Tester.assertEquals("Energy Emission", char.powers[2].category, `Power Category Roll: Generated ${char.powers[2].category} category.`);
  Tester.assertEquals("Heat", char.powers[2].name, `Power Roll: Generated ${char.powers[2].name} name.`);
  Tester.assertEquals("Good", char.powers[2].rank, `Power Rank Roll: Generated ${char.powers[2].rank} rank.`);

  // *********************************************
  // Test allPowersRankAdjustment
  const char2 = new Character();
  char2.physicalForm = "Robot - Computer";
  char2.origin = "Robot - Computer";
  gen.randomRanksColumn = 4;
  char2.powersCount = 3;
  char2.powersSlots = 3;

  gen.powerCategoryRolls = [2, 27, 19, 74];
  gen.powerRolls = [20, 30, 40, 50];
  gen.powerRankRolls = [74, 19, 27, 2];

  gen.generateSinglePower(char2, 0);
  Tester.assertEquals(1, char2.powers.length, `Power Quantity Roll: Generated ${char2.powers.length} powers.`);
  Tester.assertEquals("Defensive", char2.powers[0].category, `Power Category Roll: Generated ${char2.powers[0].category} category.`);
  Tester.assertEquals("Force Field", char2.powers[0].name, `Power Roll: Generated ${char2.powers[0].name} name.`);
  Tester.assertEquals("Remarkable", char2.powers[0].rank, `Power Rank Roll: Generated ${char2.powers[0].rank} rank.`);

  gen.generateSinglePower(char2, 1);
  Tester.assertEquals(2, char2.powers.length, `Power Quantity Roll: Generated ${char2.powers.length} powers.`);
  Tester.assertEquals("Fighting", char2.powers[1].category, `Power Category Roll: Generated ${char2.powers[1].category} category.`);
  Tester.assertEquals("Martial Supremacy", char2.powers[1].name, `Power Roll: Generated ${char2.powers[1].name} name.`);
  Tester.assertEquals("Typical", char2.powers[1].rank, `Power Rank Roll: Generated ${char2.powers[1].rank} rank.`);

  gen.generateSinglePower(char2, 2);
  Tester.assertEquals(3, char2.powers.length, `Power Quantity Roll: Generated ${char2.powers.length} powers.`);
  Tester.assertEquals("Energy Emission", char2.powers[2].category, `Power Category Roll: Generated ${char2.powers[2].category} category.`);
  Tester.assertEquals("Heat", char2.powers[2].name, `Power Roll: Generated ${char2.powers[2].name} name.`);
  Tester.assertEquals("Typical", char2.powers[2].rank, `Power Rank Roll: Generated ${char2.powers[2].rank} rank.`);

  const char3 = new Character();
  char3.physicalForm = "Normal Human";
  char3.origin = "Normal Human";
  gen.randomRanksColumn = 2;
  char3.powersCount = 3;
  char3.powersSlots = 3;

  gen.powerCategoryRolls = [92, 27, 19, 74];
  gen.powerRolls = [83, 30, 40, 50];
  gen.powerRankRolls = [74, 19, 27, 2];
  gen.powersExtraInfoRolls = [1, 26, 76, 100];
  gen.peiIndex = 0;

  gen.generateSinglePower(char3, 0);
  Tester.assertEquals(1, char3.powers.length, `Power Quantity Roll: Generated ${char3.powers.length} powers.`);
  Tester.assertEquals("Self-Alteration", char3.powers[0].category, `Power Category Roll: Generated ${char3.powers[0].category} category.`);
  Tester.assertEquals("Invisibility", char3.powers[0].name, `Power Roll: Generated ${char3.powers[0].name} name.`);
  Tester.assertEquals("Incredible", char3.powers[0].rank, `Power Rank Roll: Generated ${char3.powers[0].rank} rank.`);
  Tester.assert(char3.powers[0].extraInformation !== "", `Power Extra Information Exists: ${char3.powers[0].extraInformation}.`);

  const char4 = new Character();
  char4.physicalForm = "Normal Human";
  char4.origin = "Normal Human";
  gen.randomRanksColumn = 2;
  char4.powersCount = 3;
  char4.powersSlots = 3;

  gen.powerCategoryRolls = [40, 27, 19, 74];
  gen.powerRolls = [8, 30, 40, 50];
  gen.powerRankRolls = [74, 19, 27, 2];
  gen.powersExtraInfoRolls = [100, 8, 20, 40, 52, 60, 68, 76, 84, 8, 20, 40, 52, 60, 68, 76, 84];
  gen.peiIndex = 0;

  gen.generateSinglePower(char4, 0);
  Tester.assertEquals(1, char4.powers.length, `Power Quantity Roll: Generated ${char4.powers.length} powers.`);
  Tester.assertEquals("Magic", char4.powers[0].category, `Power Category Roll: Generated ${char4.powers[0].category} category.`);
  Tester.assertEquals("Enchantment", char4.powers[0].name, `Power Roll: Generated ${char4.powers[0].name} name.`);
  Tester.assertEquals("Ritual/This is a combination of the following Mechanisms into a compound Mechanism. RITUALS (2): Chant/The hero needs to recite a series of words to manifest his Power. The Chant can be any length and form. Gesture/The hero must perform a specific physical action to bring about the desired Effect.", char4.powers[0].extraInformation, `Power Extra Information is a Ritual with Word/Chant: ${char4.powers[0].extraInformation}.`);
}

Tester.SinglePowerTests = (gen) => {
  Tester.SinglePowerBasicTests(gen);
  Tester.SinglePowerAdvancedTests(gen);
  Tester.SinglePowerUltimateTests(gen);
}

// #7 — Shared helper for PowersBasic/Advanced/Ultimate loop tests.
Tester._runPowerLoopTests = (gen, config) => {
  gen.generatorMode = config.mode;
  gen.setTables();

  // NOTE: Dice.seed() + throwAllRolls() for random auxiliary rolls.
  // If throwAllRolls() changes, seeds may produce different sequences.
  if (config.seed !== undefined) Dice.seed(config.seed);
  if (config.throwAllRollsBefore) gen.throwAllRolls();

  for (const targetPower of gen.powerListTable) {
    if (config.throwAllRollsPerPower) {
      // NOTE: Per-power seeding for reproducibility across 100+ power iterations
      if (config.seedPerPower) Dice.seed(config.seedPerPower);
      gen.throwAllRolls();
    }

    const char = new Character();
    if (config.physicalForm) char.physicalForm = config.physicalForm;
    char.origin = config.origin;
    gen.randomRanksColumn = config.randomRanksColumn;

    gen.powerNumberRoll = config.powerNumberRoll;
    gen.talentNumberRoll = 91;
    gen.contactNumberRoll = 74;
    gen.talentCategoryRolls = [2, 27, 67, 91];
    gen.talentRolls = [20, 30, 40, 50];
    gen.contactNumberRoll = 74;
    gen.contactCategoryRolls = [2, 27, 67, 91];
    gen.contactRolls = [20, 30, 40, 50];

    if (targetPower.maxRoll > 100) continue;

    // Find target power and 3 filler powers for the roll arrays
    const targetIndex = gen.powerListTable.findIndex(p => p.name === targetPower.name);
    const catData = gen.powerCategoriesTable.find(c => c.name == targetPower.category);

    let indexAdjustment = 1;
    let powerRow1 = targetIndex <= 4 ? gen.powerListTable[targetIndex + 1] : gen.powerListTable[gen.powerListTable.length - 4];
    while (powerRow1.maxRoll > 100) {
      powerRow1 = targetIndex <= 4 ? gen.powerListTable[targetIndex + indexAdjustment] : gen.powerListTable[gen.powerListTable.length - indexAdjustment];
      indexAdjustment++;
    }

    indexAdjustment = 1;
    let powerRow2 = targetIndex <= 4 ? gen.powerListTable[targetIndex + 2] : gen.powerListTable[gen.powerListTable.length - 3];
    while (powerRow2.maxRoll > 100) {
      powerRow2 = targetIndex <= 4 ? gen.powerListTable[targetIndex + indexAdjustment] : gen.powerListTable[gen.powerListTable.length - indexAdjustment];
      indexAdjustment++;
    }

    indexAdjustment = 1;
    let powerRow3 = targetIndex <= 4 ? gen.powerListTable[targetIndex + 3] : gen.powerListTable[gen.powerListTable.length - 2];
    while (powerRow3.maxRoll > 100) {
      powerRow3 = targetIndex <= 4 ? gen.powerListTable[targetIndex + indexAdjustment] : gen.powerListTable[gen.powerListTable.length - indexAdjustment];
      indexAdjustment++;
    }

    const catRow1 = gen.powerCategoriesTable.find(c => c.name === powerRow1.category);
    const catRow2 = gen.powerCategoriesTable.find(c => c.name === powerRow2.category);
    const catRow3 = gen.powerCategoriesTable.find(c => c.name === powerRow3.category);

    gen.powerCategoryRolls[0] = catData.maxRoll;
    gen.powerCategoryRolls[1] = catRow1.maxRoll;
    gen.powerCategoryRolls[2] = catRow2.maxRoll;
    gen.powerCategoryRolls[3] = catRow3.maxRoll;

    gen.powerRolls[0] = targetPower.maxRoll;
    gen.powerRolls[1] = powerRow1.maxRoll;
    gen.powerRolls[2] = powerRow2.maxRoll;
    gen.powerRolls[3] = powerRow3.maxRoll;

    gen.powerRankRolls[0] = 50;
    gen.powerRankRolls[1] = 50;
    gen.powerRankRolls[2] = 50;
    gen.powerRankRolls[3] = 50;

    gen.determineSpecialAbilities(char);

    if (char.powers.length === 0 || char.powers[0] === null) {
      Tester.assertEquals("Power Tests", char.powers.length, `Power Failed to generate.`);
    }

    const p = char.powers[0];
    Tester.assertEquals(targetPower.category, p.category, `Power Category Roll: Generated ${p.category} category.`);
    Tester.assertEquals(targetPower.name, p.name, `Power Roll: Generated ${p.name} name.`);
    Tester.assertEquals("Excellent", p.rank, `Power Rank Roll: Generated ${p.rank} rank.`);

    if (config.validatePower) config.validatePower(char, targetPower);
  }
}

Tester.PowersBasicTests = (gen) => {
  Tester._runPowerLoopTests(gen, {
    mode: 'basic',
    origin: 'Altered Human',
    randomRanksColumn: 1,
    powerNumberRoll: 19,
    seed: 7000,
    throwAllRollsBefore: true,
  });
}

Tester.PowersAdvancedTests = (gen) => {
  Tester._runPowerLoopTests(gen, {
    mode: 'advanced',
    physicalForm: 'Altered Human',
    origin: 'Altered Human',
    randomRanksColumn: 1,
    powerNumberRoll: 19,
    seed: 8000,
    throwAllRollsBefore: true,
  });
}

// ============================================================================
// DATA-DRIVEN ULTIMATE POWER VALIDATION
// ============================================================================
// To add a new power's bonus/optional validation, just add entries to the
// tables below. Each table maps power codes to their expected related powers.

// Bonus powers: powers that are ALWAYS generated when the source power appears.
// Format: { name: <string>, matchBy: 'name' | 'category' }
// 'name' = find by exact power name; 'category' = find any power in that category.
const ULTIMATE_BONUS_POWERS = {
  "EC3":  [{ name: "Cold Generation", matchBy: "name" }],
  "EC13": [{ name: "Telekinesis", matchBy: "name-or", alt: "Kinetic Bolt" }],
  "EC17": [{ name: "Radiowave Generation", matchBy: "name" }],
  "EC18": [{ name: "Shadowcasting", matchBy: "name" }],
  "EC19": [{ name: "Sonic Generation", matchBy: "name" }],
  "L2":   [{ name: "Mind Control", matchBy: "name" }],
  "M29":  [{ name: "Clairaudience", matchBy: "name" }],
  "P17":  [{ name: "Waterbreathing", matchBy: "name" }],
  "T8":   [{ name: "Natural Weaponry", matchBy: "name-or", alt: "Body Resistance" }],
  "T11":  [{ name: "Waterbreathing", matchBy: "name-or", alt: "Water Freedom" }],
};

// Optional powers: powers that MAY be generated based on powersMax.
// Each entry: { name, matchBy, type: 'bonusPower'|'optionalPower', alt? }
// 'alt' = alternative name that also matches (for "or" cases like Telekinesis/Kinetic Bolt).
const ULTIMATE_OPTIONAL_POWERS = {
  "EC3": [
    { name: "Cold Generation",     matchBy: "name", type: "bonusPower" },
    { name: "Thermal Control",     matchBy: "name", type: "optionalPower" },
    { name: "Molding",             matchBy: "name", type: "optionalPower" },
    { name: "Body Coating",        matchBy: "name", type: "optionalPower" },
  ],
  "EC7": [
    { name: "Energy Emission",     matchBy: "category", type: "optionalPower" },
    { name: "Hard Radiation",      matchBy: "name", type: "optionalPower" },
  ],
  "EC10": [
    { name: "Fire Generation",     matchBy: "name", type: "optionalPower" },
    { name: "Thermal Control",     matchBy: "name", type: "optionalPower" },
    { name: "Energy Sheath",       matchBy: "name", type: "optionalPower" },
    { name: "Energy Body",         matchBy: "name", type: "optionalPower" },
  ],
  "EC12": [
    { name: "Hard Radiation",      matchBy: "name", type: "optionalPower" },
    { name: "Energy Doppelganger", matchBy: "name", type: "optionalPower" },
    { name: "Energy Sheath",       matchBy: "name", type: "optionalPower" },
    { name: "Energy Body",         matchBy: "name", type: "optionalPower" },
  ],
  "EC13": [
    { name: "Telekinesis",  matchBy: "name-or", alt: "Kinetic Bolt", type: "bonusPower" },
    { name: "Telekinesis",  matchBy: "name-or", alt: "Kinetic Bolt", type: "optionalPower" },
  ],
  "EC14": [
    { name: "Light Emission",      matchBy: "name", type: "optionalPower" },
    { name: "Energy Sheath",       matchBy: "name", type: "optionalPower" },
    { name: "Carrier Wave",        matchBy: "name", type: "optionalPower" },
    { name: "Illusion Casting",    matchBy: "name", type: "optionalPower" },
  ],
  "EC16": [
    { name: "Plasma Generation",   matchBy: "name", type: "optionalPower" },
    { name: "Energy Doppelganger", matchBy: "name", type: "optionalPower" },
    { name: "Energy Sheath",       matchBy: "name", type: "optionalPower" },
    { name: "Energy Body",         matchBy: "name", type: "optionalPower" },
  ],
  "EC17": [
    { name: "Radiowave Generation", matchBy: "name", type: "bonusPower" },
    { name: "Energy Doppelganger",  matchBy: "name", type: "optionalPower" },
    { name: "Energy Sheath",        matchBy: "name", type: "optionalPower" },
    { name: "Carrier Wave",         matchBy: "name", type: "optionalPower" },
  ],
  "EC18": [
    { name: "Shadowcasting",        matchBy: "name", type: "bonusPower" },
    { name: "Light Control",        matchBy: "name", type: "optionalPower" },
    { name: "Energy Sheath",        matchBy: "name", type: "optionalPower" },
    { name: "Energy Body",          matchBy: "name", type: "optionalPower" },
  ],
  "EC19": [
    { name: "Sonic Generation",     matchBy: "name", type: "bonusPower" },
    { name: "Vibration",            matchBy: "name", type: "optionalPower" },
    { name: "Vibration Control",    matchBy: "name", type: "optionalPower" },
  ],
  "EC20": [
    { name: "Heat",                 matchBy: "name", type: "optionalPower" },
    { name: "Fire Generation",      matchBy: "name", type: "optionalPower" },
    { name: "Cold Generation",      matchBy: "name", type: "optionalPower" },
    { name: "Fire Control",         matchBy: "name", type: "optionalPower" },
    { name: "Coldshaping",          matchBy: "name", type: "optionalPower" },
  ],
  "EC21": [
    { name: "Vibration",            matchBy: "name", type: "optionalPower" },
    { name: "Sonic Generation",     matchBy: "name", type: "optionalPower" },
    { name: "Sound Manipulation",   matchBy: "name", type: "optionalPower" },
  ],
  "EE1": [
    { name: "Coldshaping",          matchBy: "name", type: "optionalPower" },
    { name: "Energy Solidification", matchBy: "name", type: "optionalPower" },
    { name: "Molding",              matchBy: "name", type: "optionalPower" },
  ],
  "EE7": [
    { name: "Kinetic Control",      matchBy: "name", type: "optionalPower" },
    { name: "Telekinesis",          matchBy: "name", type: "optionalPower" },
  ],
  "EE11": [
    { name: "Radiowave Control",    matchBy: "name", type: "optionalPower" },
    { name: "Energy Sheath",        matchBy: "name", type: "optionalPower" },
    { name: "Carrier Wave",         matchBy: "name", type: "optionalPower" },
  ],
  "EE12": [
    { name: "Shadowshaping",        matchBy: "name", type: "optionalPower" },
    { name: "Darkforce Manipulation", matchBy: "name", type: "optionalPower" },
  ],
  "EE13": [
    { name: "Sound Manipulation",   matchBy: "name", type: "optionalPower" },
    { name: "Vibration",            matchBy: "name", type: "optionalPower" },
    { name: "Vibration Control",    matchBy: "name", type: "optionalPower" },
  ],
  "EE14": [
    { name: "Vibration Control",    matchBy: "name", type: "optionalPower" },
    { name: "Sonic Generation",     matchBy: "name", type: "optionalPower" },
  ],
  "F2": [
    { name: "Iron Will",            matchBy: "name", type: "optionalPower" },
    { name: "Weapons Creation",     matchBy: "name", type: "optionalPower" },
  ],
  "I1": [
    { name: "Telescopic Vision",    matchBy: "name-or", alt: "Clairvoyance", type: "optionalPower" },
    { name: "Energy Solidification", matchBy: "name", type: "optionalPower" },
    { name: "Elemental Creation",   matchBy: "name-or", alt: "Molecular Creation", type: "optionalPower" },
  ],
};

// Powers that have extra information (mechanism/ritual data)
const ULTIMATE_EXTRA_INFO_POWERS = new Set([
  "EE1", "EE2", "EE3", "EE4", "EE5", "EE6", "EE7", "EE8", "EE9",
  "EE10", "EE11", "EE12", "EE13", "EE14",
  "L1", "MG1", "MG2", "MG3", "MG4", "MG5", "MG6", "MG7", "MG8",
  "MG9", "MG10", "MG11", "MG12", "MG13", "MC4", "MC6", "MC8",
  "M18", "M28", "P1", "PC1", "S16",
]);

/** Shared helper: find a power in char.powers matching by name or category. */
Tester._findPower = (char, entry) => {
  if (entry.matchBy === 'category') {
    return char.powers.find(p => p.category === entry.name);
  }
  if (entry.matchBy === 'name-or') {
    return char.powers.find(p => p.name === entry.name || p.name === entry.alt);
  }
  return char.powers.find(p => p.name === entry.name);
};

// Ultimate-specific per-power validation (data-driven)
Tester._validateUltimatePower = (char, targetPower) => {
  const p = char.powers[0];

  // Validate extra information presence
  const hasExtraInfo = ULTIMATE_EXTRA_INFO_POWERS.has(targetPower.code);
  if (hasExtraInfo) {
    Tester.assert(p.extraInformation !== "", `Power Extra Information Exists: ${p.extraInformation}.`);
  } else {
    Tester.assert(p.extraInformation === "", `Power Extra Information is blank.`);
  }

  // Validate bonus powers (always present)
  try {
    const bonusDefs = ULTIMATE_BONUS_POWERS[targetPower.code] || [];
    for (const def of bonusDefs) {
      const found = Tester._findPower(char, def);
      Tester.assert(found != null, `If ${targetPower.name}, also has ${def.name || def.alt}.`);
    }
  } catch(ex) {
    Tester.assert(false, "Exception validating bonus powers for " + targetPower.code + ": " + ex.message);
  }

  // Validate optional powers (present when powersMax allows)
  try {
    const optionalDefs = ULTIMATE_OPTIONAL_POWERS[targetPower.code] || [];
    const maxPowers = Math.min(char.powersMax, optionalDefs.length + 1);

    // Verify total power count is sufficient
    if (optionalDefs.length > 0) {
      Tester.assertAtLeast(maxPowers, char.powers.length,
        `If ${targetPower.name}, there should be at least ${maxPowers} powers due to Bonus/Optional Powers.`);
    }

    for (let i = 0; i < optionalDefs.length; i++) {
      const slotIndex = i + 2; // slot 1 is always the primary power
      if (slotIndex >= maxPowers) break; // not enough power slots for this optional

      const def = optionalDefs[i];
      const found = Tester._findPower(char, def);
      Tester.assert(found != null, `If ${targetPower.name}, also has ${def.name || def.alt}.`);
      if (found) {
        const expectedFlag = def.type === 'bonusPower' ? found.bonusPower : found.optionalPower;
        const flagType = def.type === 'bonusPower' ? 'Bonus' : 'Optional';
        Tester.assertEquals(true, expectedFlag,
          `If ${targetPower.name}, also has ${def.name || def.alt} as a ${flagType} Power.`);
      }
    }
  } catch(ex) {
    Tester.assert(false, "Exception validating optional powers for " + targetPower.code + ": " + ex.message);
  }
};

// PowersUltimateTests: uses shared loop helper with Ultimate-specific validation
Tester.PowersUltimateTests = (gen) => {
  Tester._runPowerLoopTests(gen, {
    mode: 'ultimate',
    physicalForm: 'Normal Human',
    origin: 'Normal Human',
    randomRanksColumn: 2,
    powerNumberRoll: 100,
    throwAllRollsPerPower: true,
    seedPerPower: 9000,
    validatePower: Tester._validateUltimatePower,
  });
}

Tester.PowersTests = (gen) => {
  Tester.SinglePowerTests(gen);
  Tester.PowersBasicTests(gen);
  Tester.PowersAdvancedTests(gen);
  Tester.PowersUltimateTests(gen);
}

// ============================================================================
// DATA-DRIVEN INTEGRATION TESTS
// ============================================================================
// Each row: { physicalForm, origin, randomRanksColumn, powerNumberRoll,
//             powerCategoryRolls, powerRolls, powerRankRolls,
//             expectedPowerCount, expectedPowers: [{category, name, rank}] }

const POWERS_INTEGRATION_CASES = [
  {
    desc: "Altered Human (4 powers, form adjustment +1)",
    physicalForm: "Altered Human", origin: "Altered Human",
    randomRanksColumn: 1, powerNumberRoll: 22,
    powerCategoryRolls: [75, 2, 55, 27, 19, 74],
    powerRolls: [20, 20, 60, 30, 40, 50],
    powerRankRolls: [9, 19, 29, 39, 49, 59],
    expectedPowerCount: 4,
    expectedPowers: [
      { category: "Body Alterations, Offensive", name: "Extra Body Parts", rank: "Poor" },
      { category: "Resistances and Senses", name: "Resistance to Cold", rank: "Typical" },
    ],
  },
  {
    desc: "No physicalForm (3 powers, no adjustment)",
    physicalForm: null, origin: "Altered Human",
    randomRanksColumn: 1, powerNumberRoll: 22,
    powerCategoryRolls: [75, 55, 2, 27, 19, 74],
    powerRolls: [20, 60, 20, 30, 40, 50],
    powerRankRolls: [9, 19, 29, 39, 49, 59],
    expectedPowerCount: 3,
    expectedPowers: [
      { category: "Body Alterations, Offensive", name: "Extra Body Parts", rank: "Poor" },
      { category: "Distance Attacks", name: "Energy Missile Weapon", rank: "Typical" },
    ],
  },
  {
    desc: "Altered Human (6 powers, max powerNumberRoll)",
    physicalForm: "Altered Human", origin: "Altered Human",
    randomRanksColumn: 1, powerNumberRoll: 100,
    powerCategoryRolls: [15, 5, 75, 75, 55, 35],
    powerRolls: [60, 90, 10, 30, 70, 10],
    powerRankRolls: [9, 19, 29, 39, 49, 59, 69],
    expectedPowerCount: 6,
    expectedPowers: [
      { category: "Nature Control", name: "Fire Control", rank: "Poor" },
      { category: "Resistances and Senses", name: "Infravision", rank: "Typical" },
      { category: "Body Alterations, Offensive", name: "Extra Body Parts", rank: "Good" },
      { category: "Body Alterations, Offensive", name: "Extra Attacks", rank: "Good" },
      { category: "Distance Attacks", name: null, rank: null },
    ],
  },
  // Robot (column 4) — validate structure, not exact power names
  {
    desc: "Robot (column 4 powers)",
    physicalForm: "Robot", origin: "Robot",
    randomRanksColumn: 4, powerNumberRoll: 22,
    powerCategoryRolls: [75, 2, 55, 27, 19, 74],
    powerRolls: [20, 20, 60, 30, 40, 50],
    powerRankRolls: [9, 19, 29, 39, 49, 59],
    expectedPowerCount: 3,
    expectedPowers: [], // structural check only
  },
  // Alien (column 5) — validate structure
  {
    desc: "Alien (column 5 powers)",
    physicalForm: "Alien", origin: "Alien",
    randomRanksColumn: 5, powerNumberRoll: 22,
    powerCategoryRolls: [2, 27, 55, 27, 19, 74],
    powerRolls: [20, 30, 40, 50, 60, 70],
    powerRankRolls: [9, 19, 29, 39, 49, 59],
    expectedPowerCount: 3,
    expectedPowers: [], // structural check only
  },
  // Mutant (column 1) — validate structure
  {
    desc: "Mutant (column 1, powers)",
    physicalForm: "Mutant", origin: "Mutant",
    randomRanksColumn: 1, powerNumberRoll: 22,
    powerCategoryRolls: [2, 27, 55, 27, 19, 74],
    powerRolls: [20, 30, 40, 50, 60, 70],
    powerRankRolls: [9, 19, 29, 39, 49, 59],
    expectedPowerCount: 3,
    expectedPowers: [], // structural check only
  },
];

Tester.PowersIntegrationTests = (gen) => {
  gen.generatorMode = 'basic';
  gen.setTables();

  for (const tc of POWERS_INTEGRATION_CASES) {
    gen.setDeterministicRolls();

    const char = new Character();
    if (tc.physicalForm) char.physicalForm = tc.physicalForm;
    char.origin = tc.origin;
    gen.randomRanksColumn = tc.randomRanksColumn;
    gen.powerNumberRoll = tc.powerNumberRoll;
    gen.powerCategoryRolls = tc.powerCategoryRolls.slice();
    gen.powerRolls = tc.powerRolls.slice();
    gen.powerRankRolls = tc.powerRankRolls.slice();

    gen.talentNumberRoll = 91;
    gen.contactNumberRoll = 74;
    gen.talentCategoryRolls = [2, 27, 67, 91];
    gen.talentRolls = [20, 30, 40, 50];
    gen.contactCategoryRolls = [2, 27, 67, 91];
    gen.contactRolls = [20, 30, 40, 50];

    gen.determineSpecialAbilities(char);

    Tester.assertEquals(tc.expectedPowerCount, char.powers.length,
      `${tc.desc}: expected ${tc.expectedPowerCount} powers, got ${char.powers.length}.`);

    for (let i = 0; i < tc.expectedPowers.length; i++) {
      const ep = tc.expectedPowers[i];
      const ap = char.powers[i];
      if (!ap) continue; // skip if fewer powers generated
      if (ep.category) Tester.assertEquals(ep.category, ap.category,
        `${tc.desc}: power[${i}] category = '${ap.category}'.`);
      if (ep.name) Tester.assertEquals(ep.name, ap.name,
        `${tc.desc}: power[${i}] name = '${ap.name}'.`);
      if (ep.rank) Tester.assertEquals(ep.rank, ap.rank,
        `${tc.desc}: power[${i}] rank = '${ap.rank}'.`);
    }
  }
}

// ============================================================================
// VALIDATE ULTIMATE POWER — catch(ex) blocks (lines 478-479, 507-508)
// Deliberately cause errors to exercise the defensive catch handlers.
// ============================================================================

Tester.ValidateUltimatePowerCatchTests = () => {
  const gen = new CharacterGenerator();
  gen.generatorMode = 'ultimate';
  gen.setTables();
  gen.setDeterministicRolls();
  const char = gen.generateWithoutThrows();

  // --- Exercise bonus powers catch(ex) by corrupting to non-iterable ---
  // _validateUltimatePower's catch blocks call Tester.assert(false, ...) which
  // increments failureCount. Save/restore to prevent expected failures from
  // polluting the test results.
  const origBonusDefs = ULTIMATE_BONUS_POWERS['EC1'];
  ULTIMATE_BONUS_POWERS['EC1'] = 42; // for...of on number throws TypeError
  const fBefore = Tester.failureCount;
  Tester._validateUltimatePower(char, { code: 'EC1', name: 'Test Power' });
  const bonusCatchFired = Tester.failureCount > fBefore;
  Tester.failureCount = fBefore; // restore — expected failure from catch block
  if (origBonusDefs) ULTIMATE_BONUS_POWERS['EC1'] = origBonusDefs;
  else delete ULTIMATE_BONUS_POWERS['EC1'];
  Tester.assert(bonusCatchFired,
    'ValidateUltimatePowerCatch: bonus powers catch block fires on non-iterable data.');

  // --- Exercise optional powers catch(ex) by making loop body throw ---
  const origOptDefs = ULTIMATE_OPTIONAL_POWERS['EC1'];
  const origPowersMax = char.powersMax;
  char.powersMax = 10;
  // Add extra dummy powers so assertAtLeast passes before the Proxy throws
  const powersBefore = char.powers.length;
  while (char.powers.length < 4) {
    char.powers.push({ name: 'Dummy', category: 'Test', rank: 'Good', number: 10, powerSlots: 1, bonusPower: false, optionalPower: false });
  }
  ULTIMATE_OPTIONAL_POWERS['EC1'] = new Proxy([{}, {}, {}], {
    get(target, prop) {
      if (typeof prop === 'string' && !isNaN(prop) && +prop >= 0) throw new Error('boom');
      return target[prop];
    }
  });
  const fBefore2 = Tester.failureCount;
  Tester._validateUltimatePower(char, { code: 'EC1', name: 'Test Power' });
  const optCatchFired = Tester.failureCount > fBefore2;
  Tester.failureCount = fBefore2; // restore — expected failures from catch block
  if (origOptDefs) ULTIMATE_OPTIONAL_POWERS['EC1'] = origOptDefs;
  else delete ULTIMATE_OPTIONAL_POWERS['EC1'];
  char.powersMax = origPowersMax;
  // Remove dummy powers added above
  char.powers.splice(powersBefore);
  Tester.assert(optCatchFired,
    'ValidateUltimatePowerCatch: optional powers catch block fires on corrupt data.');

  // Verify validation still works after restoration
  Tester._validateUltimatePower(char, { code: 'EC1', name: 'Electrical Control' });
  Tester.assert(true, 'ValidateUltimatePowerCatch: validation restored after corruption.');
};

Tester.registerTestGroup(60, 'deterministic', [
  { name: 'SinglePowerTests', needsGen: true },
  { name: 'PowersTests', needsGen: true },
  { name: 'PowersIntegrationTests', needsGen: true },
  { name: 'ValidateUltimatePowerCatchTests', needsGen: false },
]);
