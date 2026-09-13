// TestsGeneratorMethods.js
// Isolated unit tests for individual CharacterGenerator methods.
//
// These tests call a single method at a time (e.g., determineResources,
// determinePopularity, determineAbility) to verify their behavior without
// running the full generation pipeline.
//
// IMPORTANT: Each mode has different physical form names:
//   Basic: Mutant, Altered Human, Hi-Tech, Robot, Alien
//   Ultimate: Normal Human, Mutant - Induced, Mutant - Random, etc.

// ============================================================================
// determineResources — isolated tests
// ============================================================================

Tester.DetermineResourcesTests = (gen) => {
  // --- Basic mode: no random modifier applied ---
  gen.generatorMode = 'basic';
  gen.setTables();
  gen.setDeterministicRolls();

  // Altered Human: resourcesAdjustment=1
  const char1 = new Character();
  char1.physicalForm = "Altered Human";
  gen.determineResources(char1);
  Tester.assertNotNull(char1.resources.rank,
    "determineResources (Basic): Altered Human has a resources rank.");
  Tester.assertNotNull(char1.resources.number,
    "determineResources (Basic): Altered Human has a resources number.");
  Tester.assert(char1.resources.number > 0,
    "determineResources (Basic): Altered Human resources number > 0.");

  // Mutant (basic): no resourcesAdjustment
  gen.setDeterministicRolls();
  const char2 = new Character();
  char2.physicalForm = "Mutant";
  gen.determineResources(char2);
  Tester.assertEquals("Typical", char2.resources.rank,
    "determineResources (Basic): Mutant resources = Typical (default).");

  // Hi-Tech (basic): isHiTech flag
  gen.setDeterministicRolls();
  const char3 = new Character();
  char3.physicalForm = "Hi-Tech";
  gen.determineResources(char3);
  Tester.assert(char3.isHiTech === true,
    "determineResources (Basic): Hi-Tech sets isHiTech flag.");

  // --- Advanced mode: random modifier IS applied ---
  gen.generatorMode = 'advanced';
  gen.setTables();
  gen.setDeterministicRolls();

  const char4 = new Character();
  char4.physicalForm = "Altered Human";
  gen.determineResources(char4);
  Tester.assertNotNull(char4.resources.rank,
    "determineResources (Advanced): Altered Human has a resources rank.");
  Tester.assert(char4.resources.number > 0,
    "determineResources (Advanced): Altered Human resources number > 0.");

  // --- Ultimate mode: resourcesSet overrides ---
  gen.generatorMode = 'ultimate';
  gen.setTables();
  gen.setDeterministicRolls();

  // Gaseous: resourcesSet=1 (Feeble)
  const char5 = new Character();
  char5.physicalForm = "Gaseous";
  gen.determineResources(char5);
  Tester.assertEquals("Feeble", char5.resources.rank,
    "determineResources (Ultimate): Gaseous resources = Feeble.");
  Tester.assertEquals(1, char5.state.resources.set,
    "determineResources (Ultimate): state.resources.set = 1.");
}

// ============================================================================
// determinePopularity — isolated tests
// ============================================================================

Tester.DeterminePopularityTests = (gen) => {
  // --- Basic mode: popularity based on form + identity modifiers ---
  gen.generatorMode = 'basic';
  gen.setTables();
  gen.setDeterministicRolls();

  const char1 = new Character();
  char1.physicalForm = "Altered Human";
  gen.identitySecret = true;
  gen.originPublic = false;
  gen.wellEstablished = false;
  gen.looksHuman = false;
  gen.determinePopularity(char1);
  Tester.assert(typeof char1.popularity === 'number',
    "determinePopularity (Basic): popularity is a number.");
  Tester.assert(char1.popularity >= 0,
    "determinePopularity (Basic): popularity >= 0.");

  // --- Ultimate mode: popularity from random ranks table ---
  gen.generatorMode = 'ultimate';
  gen.setTables();
  gen.setDeterministicRolls();
  gen.popularityRoll = 20; // Column for Normal Human (column 2) → Typical
  gen.identitySecret = true;
  gen.originPublic = false;
  gen.wellEstablished = false;
  gen.looksHuman = false;

  const char2 = new Character();
  char2.physicalForm = "Normal Human";
  gen.determinePopularity(char2);
  Tester.assert(typeof char2.popularity === 'number',
    "determinePopularityUltimate: popularity is a number.");
  Tester.assert(char2.popularity >= 0,
    "determinePopularityUltimate: popularity >= 0.");
  Tester.assert(char2.state.popularity.final !== undefined,
    "determinePopularityUltimate: state.popularity.final is set.");

  // Ultimate: popularityStart overrides
  gen.setDeterministicRolls();
  const char3 = new Character();
  char3.physicalForm = "Surgical Composite";
  gen.determinePopularity(char3);
  Tester.assertEquals(0, char3.popularity,
    "determinePopularityUltimate: Surgical Composite popularity = 0 (start).");
  Tester.assertEquals(0, char3.state.popularity.start,
    "determinePopularityUltimate: state.popularity.start = 0.");
}

// ============================================================================
// determineAbility — isolated tests
// ============================================================================

Tester.DetermineAbilityTests = (gen) => {
  gen.generatorMode = 'basic';
  gen.setTables();
  gen.setDeterministicRolls();

  const char = new Character();
  char.physicalForm = "Altered Human";

  // Manually set an ability roll
  gen.physicalAbilityRolls[0] = { Fighting: 50, Agility: 50, Strength: 50, Endurance: 50 };

  // Note: determineAbility returns the rankRow but does NOT call char.setAbility.
  // The caller (determinePrimaryAbilities) is responsible for setting the ability.
  const rankRow = gen.determineAbility(char, "Fighting", null, 0);
  Tester.assertNotNull(rankRow, "determineAbility returns a rank row.");
  Tester.assertNotNull(rankRow.rank, "determineAbility rank row has a rank name.");
  Tester.assert(rankRow.rankNumber > 0,
    "determineAbility rank row has rankNumber > 0.");

  // Verify the caller pattern works
  char.setAbility("Fighting", rankRow.rank, rankRow.rankNumber);
  Tester.assert(char.getAbility("Fighting").rank !== "",
    "setAbility after determineAbility sets Fighting rank.");
}

// ============================================================================
// getAbilityAfterModifier — isolated tests
// ============================================================================

Tester.GetAbilityAfterModifierTests = (gen) => {
  gen.generatorMode = 'basic';
  gen.setTables();
  gen.setDeterministicRolls();

  const char = new Character();

  // No adjustment: Typical stays Typical
  const result1 = gen.getAbilityAfterModifier(char, "Fighting", "Typical", 0);
  Tester.assertEquals("Typical", result1,
    "getAbilityAfterModifier: 0 adjustment → Typical.");

  // Positive adjustment: Typical + 2 = Excellent
  const result2 = gen.getAbilityAfterModifier(char, "Fighting", "Typical", 2);
  Tester.assertEquals("Excellent", result2,
    "getAbilityAfterModifier: +2 adjustment → Excellent.");

  // Negative adjustment: Typical - 1 = Poor
  const result3 = gen.getAbilityAfterModifier(char, "Fighting", "Typical", -1);
  Tester.assertEquals("Poor", result3,
    "getAbilityAfterModifier: -1 adjustment → Poor.");

  // Large positive adjustment: Typical + 5 = Amazing (capped)
  const result4 = gen.getAbilityAfterModifier(char, "Fighting", "Typical", 5);
  Tester.assert(result4 !== "Typical",
    "getAbilityAfterModifier: +5 adjustment changes from Typical.");
  Tester.assert(result4 !== "",
    "getAbilityAfterModifier: +5 adjustment does not return empty.");

  // With minimum clamp
  const result5 = gen.getAbilityAfterModifier(char, "Fighting", "Typical", -5, 5);
  Tester.assert(result5 !== "Shift 0",
    "getAbilityAfterModifier: minimum clamp prevents below minimum.");
}

// ============================================================================
// calculateSecondary — isolated tests
// ============================================================================

Tester.CalculateSecondaryTests = () => {
  const char = new Character();

  // Set known ability values: F=8, A=5, S=16, E=10 → health = 8+5+16+10 = 39
  char.setAbility("Fighting", "Good", 8);
  char.setAbility("Agility", "Typical", 5);
  char.setAbility("Strength", "Excellent", 16);
  char.setAbility("Endurance", "Remarkable", 26);

  // Mental: R=36, I=46, P=63 → karma = 36+46+63 = 145
  char.setAbility("Reason", "Incredible", 36);
  char.setAbility("Intuition", "Amazing", 46);
  char.setAbility("Psyche", "Monstrous", 63);

  char.calculateSecondary();

  // Health = F + A + S + E = 8 + 5 + 16 + 26 = 55
  Tester.assertEquals(55, char.health,
    "calculateSecondary: health = F(8) + A(5) + S(16) + E(26) = 55.");

  // Karma = R + I + P = 36 + 46 + 63 = 145
  Tester.assertEquals(145, char.karma,
    "calculateSecondary: karma = R(36) + I(46) + P(63) = 145.");

  // Zero abilities
  const char2 = new Character();
  char2.setAbility("Fighting", "Shift 0", 0);
  char2.setAbility("Agility", "Shift 0", 0);
  char2.setAbility("Strength", "Shift 0", 0);
  char2.setAbility("Endurance", "Shift 0", 0);
  char2.setAbility("Reason", "Shift 0", 0);
  char2.setAbility("Intuition", "Shift 0", 0);
  char2.setAbility("Psyche", "Shift 0", 0);

  char2.calculateSecondary();
  Tester.assertEquals(0, char2.health,
    "calculateSecondary: zero abilities → health = 0.");
  Tester.assertEquals(0, char2.karma,
    "calculateSecondary: zero abilities → karma = 0.");

  // Stale data: change abilities AFTER calculateSecondary — health/karma should be stale
  const char3 = new Character();
  char3.setAbility("Fighting", "Typical", 5);
  char3.setAbility("Agility", "Typical", 5);
  char3.setAbility("Strength", "Typical", 5);
  char3.setAbility("Endurance", "Typical", 5);
  char3.setAbility("Reason", "Typical", 5);
  char3.setAbility("Intuition", "Typical", 5);
  char3.setAbility("Psyche", "Typical", 5);

  char3.calculateSecondary();
  Tester.assertEquals(20, char3.health,
    "calculateSecondary: health = 5+5+5+5 = 20.");
  Tester.assertEquals(15, char3.karma,
    "calculateSecondary: karma = 5+5+5 = 15.");

  // Now change an ability WITHOUT recalculating
  char3.setAbility("Fighting", "Good", 8);
  // Health should still be 20 (stale), not 23
  Tester.assertEquals(20, char3.health,
    "calculateSecondary: health is stale after ability change without recalculate.");

  // Recalculate and verify updated value
  char3.calculateSecondary();
  Tester.assertEquals(23, char3.health,
    "calculateSecondary: health = 8+5+5+5 = 23 after recalculate.");

  // All same rank: Excellent (16) for all
  const char4 = new Character();
  PHYSICAL_ABILITIES.forEach(a => char4.setAbility(a, "Excellent", 16));
  MENTAL_ABILITIES.forEach(a => char4.setAbility(a, "Excellent", 16));

  char4.calculateSecondary();
  Tester.assertEquals(64, char4.health,
    "calculateSecondary: 4×Excellent(16) = 64 health.");
  Tester.assertEquals(48, char4.karma,
    "calculateSecondary: 3×Excellent(16) = 48 karma.");
}

// ============================================================================
// generateCharacter() — pure wrapper isolation tests
// ============================================================================

Tester.GenerateCharacterWrapperTests = () => {
  // Call twice with different options and verify independence
  const char1 = CharacterGenerator.generateCharacter('basic', {
    useDeterministicRolls: true,
    physicalFormRoll: 30,  // Mutant
  });

  const char2 = CharacterGenerator.generateCharacter('ultimate', {
    useDeterministicRolls: true,
    physicalFormRoll: 1,   // Normal Human
    identitySecret: true,
  });

  // Different modes produce different physical forms
  Tester.assertNotEquals(char1.physicalForm, char2.physicalForm,
    "generateCharacter: different modes produce different physical forms.");

  // Both have valid state
  Tester.assertNotNull(char1.state, "generateCharacter: char1 has state.");
  Tester.assertNotNull(char2.state, "generateCharacter: char2 has state.");

  // char2 is Ultimate so has weakness
  Tester.assert(char2.state.weakness.stimulus !== null,
    "generateCharacter: Ultimate char has weakness stimulus.");

  // char1 is Basic so weakness is empty
  Tester.assertEquals("", char1.weakness.stimulus,
    "generateCharacter: Basic char has empty weakness.");

  // Verify no external state mutation — call with seed
  const char3 = CharacterGenerator.generateCharacter('basic', {
    seed: 42,
    throwAllRolls: true,
  });
  const char4 = CharacterGenerator.generateCharacter('basic', {
    seed: 42,
    throwAllRolls: true,
  });
  // Same seed + same mode → same physical form (deterministic)
  Tester.assertEquals(char3.physicalForm, char4.physicalForm,
    "generateCharacter: same seed produces same physical form.");
}

// ============================================================================
// getAbilityAfterModifier — edge case tests
// ============================================================================

Tester.GetAbilityAfterModifierEdgeCaseTests = (gen) => {
  gen.generatorMode = 'basic';
  gen.setTables();
  gen.setDeterministicRolls();

  const char = new Character();

  // Empty string rank → findIndex returns -1 → defaults to Feeble (index 0)
  const result1 = gen.getAbilityAfterModifier(char, "Fighting", "", 0);
  Tester.assertEquals("Feeble", result1,
    "getAbilityAfterModifier: empty string rank → Feeble.");

  // Completely invalid rank → defaults to Feeble
  const result2 = gen.getAbilityAfterModifier(char, "Fighting", "NonexistentRank", 0);
  Tester.assertEquals("Feeble", result2,
    "getAbilityAfterModifier: invalid rank name → Feeble.");

  // Invalid rank + positive adjustment → climbs from Feeble
  const result3 = gen.getAbilityAfterModifier(char, "Fighting", "Bogus", 3);
  Tester.assert(result3 !== "Feeble",
    "getAbilityAfterModifier: invalid rank + positive adjustment → climbs.");
  Tester.assert(result3 !== "",
    "getAbilityAfterModifier: invalid rank + adjustment does not return empty.");

  // Invalid rank + negative adjustment → stays at Feeble (clamped)
  const result4 = gen.getAbilityAfterModifier(char, "Fighting", "Bogus", -2);
  Tester.assertEquals("Feeble", result4,
    "getAbilityAfterModifier: invalid rank + negative adjustment → Feeble (clamped).");
}

// ============================================================================
// REGISTRATION
// ============================================================================

Tester.registerTestGroup(40, 'deterministic', [
  { name: 'DetermineResourcesTests', needsGen: true },
  { name: 'DeterminePopularityTests', needsGen: true },
  { name: 'DetermineAbilityTests', needsGen: true },
  { name: 'GetAbilityAfterModifierTests', needsGen: true },
  { name: 'CalculateSecondaryTests', needsGen: false },
  { name: 'GenerateCharacterWrapperTests', needsGen: false },
  { name: 'GetAbilityAfterModifierEdgeCaseTests', needsGen: true },
]);
