//  TestsTalents
// Extracted from UnitTests.js
//
// Data-driven refactor: Basic, Advanced, and Ultimate talent tests
// are defined as config tables. A shared helper runs the common
// setup-generate-assert pattern for each test case.

// ============================================================================
// SHARED HELPER
// ============================================================================

/**
 * Run talent generation tests for a given config.
 * config: { mode, physicalForm, origin, column,
 *           throwAllRollsFirst?, baseRolls?, talentRolls: { talentNumberRoll, talentCategoryRolls, talentRolls },
 *           expectedCount?, maxSlots?, expectedTalents?: [{ category, name }],
 *           postValidate?: (char) => void }
 */
Tester._runTalentTests = (gen, config) => {
  gen.generatorMode = config.mode;
  gen.setTables();

  const char = new Character();
  char.physicalForm = config.physicalForm;
  char.origin = config.origin;
  char.randomRanksColumn = config.column;

  // Apply base rolls first (if any)
  if (config.baseRolls) config.baseRolls(gen);

  // Optionally call throwAllRolls() BEFORE setting manual rolls
  // (Ultimate mode needs this to initialize power/contact roll arrays)
  if (config.throwAllRollsFirst) gen.throwAllRolls();

  // Apply talent-specific rolls AFTER throwAllRolls (so they aren't overwritten)
  const tr = config.talentRolls;
  gen.talentNumberRoll = tr.talentNumberRoll;
  gen.talentCategoryRolls = tr.talentCategoryRolls;
  gen.talentRolls = tr.talentRolls;

  gen.determineSpecialAbilities(char);

  const tCount = char.talents.length;
  const totalSlots = char.talents.reduce((s, t) => s + (t.talentSlots || 1), 0);

  // Validate count
  Tester.assertInRange(1, 4, tCount,
    `Talent Quantity Roll (${config.mode}): Generated ${tCount} talents.`);

  if (config.expectedCount !== undefined) {
    Tester.assertEquals(config.expectedCount, tCount,
      `Talent Quantity Roll (${config.mode}): Generated ${tCount} talents.`);
  }

  // Validate max slots
  if (config.maxSlots !== undefined) {
    Tester.assert(totalSlots <= config.maxSlots,
      `Talent Quantity Roll (${config.mode}): Total slots ${totalSlots} <= ${config.maxSlots}.`);
  }

  // Validate expected talents (if provided)
  if (config.expectedTalents) {
    for (let i = 0; i < Math.min(tCount, config.expectedTalents.length); i++) {
      const exp = config.expectedTalents[i];
      if (exp.category) {
        Tester.assertEquals(exp.category, char.talents[i].category,
          `Talent Category Roll (${config.mode}): Talent[${i}] category.`);
      }
      if (exp.name) {
        Tester.assertEquals(exp.name, char.talents[i].name,
          `Talent Name Roll (${config.mode}): Talent[${i}] name.`);
      }
    }
  }

  // Validate all talents have non-empty names
  for (let i = 0; i < tCount; i++) {
    Tester.assert(char.talents[i].name !== "",
      `Talent Name Roll (${config.mode}): Talent[${i}] has a non-empty name.`);
  }

  // Run mode-specific post-validation
  if (config.postValidate) config.postValidate(char);
}

// ============================================================================
// TEST CONFIGURATIONS
// ============================================================================

// Base rolls shared by Basic/Advanced modes
const TALENT_GEN_ADV_BASE_ROLLS = (gen) => {
  gen.powerNumberRoll = 2;
  gen.contactNumberRoll = 74;
  gen.powerCategoryRolls = [2, 27, 19, 74];
  gen.powerRolls = [20, 30, 40, 50];
  gen.powerRankRolls = [74, 19, 27, 2];
};

const TALENT_TEST_CONFIGS = [
  // --- Basic mode ---
  {
    mode: "basic",
    physicalForm: "Altered Human",
    origin: "Altered Human",
    column: 1,
    talentRolls: {
      talentNumberRoll: 91,
      talentCategoryRolls: [2, 27, 67, 91],
      talentRolls: [20, 30, 40, 50],
    },
    maxSlots: 4,
    postValidate: (char) => {
      // Basic mode has a single "Talents" category — all talents should be in it
      for (let i = 0; i < char.talents.length; i++) {
        Tester.assertEquals("Talents", char.talents[i].category,
          `Talent Category Roll (Basic): Talent[${i}] category is 'Talents'.`);
      }
    },
  },

  // --- Advanced mode ---
  {
    mode: "advanced",
    physicalForm: "Altered Human",
    origin: "Altered Human",
    column: 1,
    baseRolls: TALENT_GEN_ADV_BASE_ROLLS,
    talentRolls: {
      talentNumberRoll: 91,
      talentCategoryRolls: [2, 27, 67, 91],
      talentRolls: [20, 30, 40, 50],
    },
    expectedCount: 4,
    expectedTalents: [
      { category: "Weapon Skills", name: "Guns" },
      { category: "Fighting Skills", name: "Martial Arts C" },
      { category: "Scientific Skills", name: "Biology" },
      { category: "Other Skills", name: "First Aid" },
    ],
  },

  // --- Ultimate mode ---
  {
    mode: "ultimate",
    physicalForm: "Altered Human",
    origin: "Altered Human",
    column: 1,
    throwAllRollsFirst: true,
    talentRolls: {
      talentNumberRoll: 91,
      talentCategoryRolls: [2, 27, 67, 91],
      talentRolls: [20, 30, 40, 50],
    },
    expectedCount: 4,
    expectedTalents: [
      { category: "Alternative Sciences", name: "Catastrophism" },
      { category: "Chemistry", name: "Chemical Engineering" },
      { category: "Medicine", name: "Obstetrics and Gynecology" },
      { category: "Piloting", name: "Helicopter" },
    ],
  },
];

// ============================================================================
// TEST ORCHESTRATION
// ============================================================================

Tester.TalentsTests = (gen) => {
  for (const config of TALENT_TEST_CONFIGS) {
    Tester._runTalentTests(gen, config);
  }
}

Tester.registerTest('TalentsTests', true, 100, 'deterministic');

// ============================================================================
// DUPLICATE TALENT PREVENTION TESTS
// ============================================================================

Tester.TalentDuplicatePreventionTests = (gen) => {
  gen.generatorMode = 'basic';
  gen.setTables();
  gen.setDeterministicRolls();

  const char = gen.generateWithoutThrows();

  // Check that no two talents have the same name
  const names = char.talents.map(t => t.name);
  const uniqueNames = new Set(names);
  Tester.assertEquals(names.length, uniqueNames.size,
    `TalentDuplicatePrevention: ${names.length} talents, ${uniqueNames.size} unique (should be equal).`);

  // Verify _assignedTalentNames was used
  Tester.assert(gen._assignedTalentNames === null,
    'TalentDuplicatePrevention: _assignedTalentNames cleaned up after generate.');

  // Test with Advanced mode
  gen.generatorMode = 'advanced';
  gen.setTables();
  gen.setDeterministicRolls();
  const char2 = gen.generateWithoutThrows();
  const names2 = char2.talents.map(t => t.name);
  const uniqueNames2 = new Set(names2);
  Tester.assertEquals(names2.length, uniqueNames2.size,
    `TalentDuplicatePrevention (Advanced): ${names2.length} talents, ${uniqueNames2.size} unique.`);

  // Test with Ultimate mode
  gen.generatorMode = 'ultimate';
  gen.setTables();
  gen.setDeterministicRolls();
  const char3 = gen.generateWithoutThrows();
  const names3 = char3.talents.map(t => t.name);
  const uniqueNames3 = new Set(names3);
  Tester.assertEquals(names3.length, uniqueNames3.size,
    `TalentDuplicatePrevention (Ultimate): ${names3.length} talents, ${uniqueNames3.size} unique.`);
};

Tester.registerTest('TalentDuplicatePreventionTests', true, 101, 'deterministic');
