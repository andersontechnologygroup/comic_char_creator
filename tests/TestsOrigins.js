// TestsOrigins.js
// Origin and generator tests extracted from TestsGeneratorOrigin.js
//
// Tests: Origin determination (Basic, Advanced, Ultimate), general generator
// validation, and full-pipeline character generation.

// ============================================================================
// DATA-DRIVEN ORIGIN TEST CASES
// ============================================================================
// Each row: { mode, physicalForm, physicalFormRoll, originRoll, expectedOrigin,
//             expectedPhysicalForm?, desc }

const ORIGIN_BASIC_CASES = [
  // Altered Human origin table
  { mode: 'basic', physicalForm: "Altered Human", physicalFormRoll: 46, originRoll: 46, expectedOrigin: "Altered Human", expectedPhysicalForm: "Altered Human", desc: "Altered Human roll=46" },
  { mode: 'basic', physicalForm: "Altered Human", physicalFormRoll: 46, originRoll: 76, expectedOrigin: "Hi-Tech", expectedPhysicalForm: "Altered Human", desc: "Altered Human roll=76" },
  { mode: 'basic', physicalForm: "Altered Human", physicalFormRoll: 46, originRoll: 98, expectedOrigin: "Alien", expectedPhysicalForm: "Altered Human", desc: "Altered Human roll=98" },
  // Alien origin table
  { mode: 'basic', physicalForm: "Alien", physicalFormRoll: 92, originRoll: 5, expectedOrigin: "Mutant", expectedPhysicalForm: "Alien", desc: "Alien roll=5" },
  { mode: 'basic', physicalForm: "Alien", physicalFormRoll: 92, originRoll: 30, expectedOrigin: "Mutant", expectedPhysicalForm: "Alien", desc: "Alien roll=30" },
  { mode: 'basic', physicalForm: "Alien", physicalFormRoll: 92, originRoll: 50, expectedOrigin: "Altered Human", expectedPhysicalForm: "Alien", desc: "Alien roll=50" },
  { mode: 'basic', physicalForm: "Alien", physicalFormRoll: 92, originRoll: 70, expectedOrigin: "Hi-Tech", expectedPhysicalForm: "Alien", desc: "Alien roll=70" },
  { mode: 'basic', physicalForm: "Alien", physicalFormRoll: 92, originRoll: 98, expectedOrigin: "Alien", expectedPhysicalForm: "Alien", desc: "Alien roll=98" },
];

const ORIGIN_ADVANCED_CASES = [
  { mode: 'advanced', physicalForm: "Altered Human", physicalFormRoll: 46, originRoll: 46, expectedOrigin: "Altered Human", expectedPhysicalForm: "Altered Human", desc: "Advanced Altered Human roll=46" },
];

const ORIGIN_ULTIMATE_CASES = [
  // Normal Human: physicalFormRoll=1 → "Normal Human", originRoll=5 → "Natal"
  { mode: 'ultimate', physicalFormRoll: 1, originRoll: 5, expectedPhysicalForm: "Normal Human", expectedOrigin: "Natal", desc: "Normal Human → Natal" },
  // Mutant - Random: physicalFormRoll=31, originRoll=15 → "Maturity"
  { mode: 'ultimate', physicalFormRoll: 31, originRoll: 15, expectedPhysicalForm: "Mutant - Random", expectedOrigin: "Maturity", desc: "Mutant - Random → Maturity" },
  // Verify weakness stimulus is set for full-pipeline generation
  { mode: 'ultimate', physicalFormRoll: 31, originRoll: 15, expectedPhysicalForm: "Mutant - Random", expectedOrigin: "Maturity",
    desc: "Mutant - Random → weakness stimulus set",
    postValidate: (char) => {
      Tester.assert(char.state.weakness.stimulus !== null,
        "Ultimate full pipeline: weakness stimulus was set.");
    } },
  // Verify different weakness stimulus via weaknessStimulusRoll
  { mode: 'ultimate', physicalFormRoll: 31, originRoll: 15, expectedPhysicalForm: "Mutant - Random", expectedOrigin: "Maturity",
    weaknessStimulusRoll: 50, // maxRoll 68 = Energy Allergy
    desc: "Mutant - Random → weaknessStimulusRoll=50 → Energy Allergy",
    postValidate: (char) => {
      Tester.assertEquals("Energy Allergy", char.state.weakness.stimulus,
        "Ultimate: weaknessStimulusRoll=50 → Energy Allergy.");
    } },
];

// ============================================================================
// ORIGIN TESTS — BASIC
// ============================================================================

Tester.OriginBasicTests = (gen) => {
  gen.generatorMode = 'basic';
  gen.setTables();
  gen.setDeterministicRolls();

  for (const tc of ORIGIN_BASIC_CASES) {
    gen.setDeterministicRolls();
    gen.physicalFormRoll = tc.physicalFormRoll;
    gen.originRoll = tc.originRoll;
    const char = new Character();
    char.physicalForm = tc.physicalForm;
    gen.determineOrigin(char);
    Tester.assertEquals(tc.expectedOrigin, char.origin,
      `Origin (Basic): ${tc.desc} -> '${char.origin}'.`);
  }
}

// ============================================================================
// ORIGIN TESTS — ADVANCED
// ============================================================================

Tester.OriginAdvancedTests = (gen) => {
  gen.generatorMode = 'advanced';
  gen.setTables();
  gen.setDeterministicRolls();

  for (const tc of ORIGIN_ADVANCED_CASES) {
    gen.setDeterministicRolls();
    gen.physicalFormRoll = tc.physicalFormRoll;
    gen.originRoll = tc.originRoll;
    const char = new Character();
    char.physicalForm = tc.physicalForm;
    gen.determineOrigin(char);
    Tester.assertEquals(tc.expectedOrigin, char.origin,
      `Origin (Advanced): ${tc.desc} -> '${char.origin}'.`);
  }
}

// ============================================================================
// ORIGIN TESTS — ULTIMATE
// ============================================================================

Tester.OriginUltimateTests = (gen) => {
  gen.generatorMode = 'ultimate';
  gen.setTables();
  gen.identitySecret = true;
  gen.originPublic = false;
  gen.wellEstablished = false;
  gen.looksHuman = false;

  for (const tc of ORIGIN_ULTIMATE_CASES) {
    gen.setDeterministicRolls();
    gen.physicalFormRoll = tc.physicalFormRoll;
    gen.originRoll = tc.originRoll;
    if (tc.weaknessStimulusRoll !== undefined) gen.weaknessStimulusRoll = tc.weaknessStimulusRoll;
    const char = gen.generateWithoutThrows();
    Tester.assertEquals(tc.expectedPhysicalForm, char.physicalForm,
      `Physical Form (Ultimate): ${tc.desc} -> '${char.physicalForm}'.`);
    Tester.assertEquals(tc.expectedOrigin, char.origin,
      `Origin (Ultimate): ${tc.desc} -> '${char.origin}'.`);
    if (tc.postValidate) tc.postValidate(char);
  }
}

// ============================================================================
// ORIGIN WRAPPER (calls all three mode tests)
// ============================================================================

Tester.OriginTests = (gen) => {
  Tester.OriginBasicTests(gen);
  Tester.OriginAdvancedTests(gen);
  Tester.OriginUltimateTests(gen);
}

// ============================================================================
// GENERAL GENERATOR TEST
// ============================================================================

Tester.GeneratorTests = (gen) => {
  gen.generatorMode = 'basic';
  gen.setTables();
  gen.setDeterministicRolls();

  const char = gen.generateWithoutThrows();
  Tester.assert(char !== null, `Generate: Generated a character.`);
  Tester.assert(char.physicalForm !== "", `Generate: Generated a physical form '${char.physicalForm}'.`);
  Tester.assert(char.origin !== "", `Generate: Generated an origin '${char.origin}'.`);

  // Abilities should all have values
  PHYSICAL_ABILITIES.forEach(a => {
    Tester.assert(char.getAbility(a).rank !== "",
      `Generate: ${a} has a rank of '${char.getAbility(a).rank}'.`);
  });
  MENTAL_ABILITIES.forEach(a => {
    Tester.assert(char.getAbility(a).rank !== "",
      `Generate: ${a} has a rank of '${char.getAbility(a).rank}'.`);
  });

  // Check if logs have odd data
  Tester._assertNoGarbageInLogs(char.log);

  // Count assertions
  Tester.assertAtLeast(1, char.powersCount, `Generate: Powers count is ${char.powersCount}.`);
  Tester.assertAtLeast(0, char.talentsCount, `Generate: Talents count is ${char.talentsCount}.`);
  Tester.assertAtLeast(0, char.contactsCount, `Generate: Contacts count is ${char.contactsCount}.`);

  // Check physical abilities count
  Tester.assertAtLeast(1, char.primaryAbilities.length,
    `Generate: Primary abilities count is ${char.primaryAbilities.length}.`);
}

// ============================================================================
// REGISTRATION
// ============================================================================

Tester.registerTestGroup(53, 'deterministic', [
  { name: 'GeneratorTests', needsGen: true },
  { name: 'OriginTests', needsGen: true },
]);
