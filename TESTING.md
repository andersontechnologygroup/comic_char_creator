# Testing Guide

## Overview

This project has two test environments:

1. **Node.js CLI** — `node run-tests.js` (primary, used for CI and development)
2. **Browser** — Open `comiccharcreator.html`, switch to the Tests tab

Both environments share the same test files and assertion framework (`UnitTests.js`).

## Quick Start

```bash
# Run all tests
node run-tests.js

# Run with verbose output
node run-tests.js --verbose

# Run a specific test
node run-tests.js --filter WeaknessTests

# Run with code coverage
node run-tests.js --coverage

# Run with benchmark
node run-tests.js --benchmark
```

## CLI Options

| Flag | Description |
|------|-------------|
| `--filter <pattern>` | Only run tests whose name contains `<pattern>` (case-insensitive) |
| `--verbose` | Show each assertion result |
| `--bail` | Stop on first failure |
| `--iterations <n>` | Run fuzz tests `n` times (default: 100) |
| `--benchmark` | Run performance benchmarks after tests |
| `--coverage` | Enable V8 line-level coverage via c8 |

## Test Architecture

### File Structure

```
tests/
├── TestsAbilities.js       # Primary ability generation
├── TestsBoundary.js        # Edge cases, error paths, boundary conditions
├── TestsBranchCoverage.js  # Branch coverage for CharacterGenerator.js
├── TestsContacts.js        # Contact generation
├── TestsCoverageBoost.js   # Targeted coverage for uncovered code paths
├── TestsEdgeCases.js       # Additional edge cases
├── TestsFuzz.js            # Random input tests (no deterministic rolls)
├── TestsGeneratorMethods.js# Generator method tests
├── TestsHelpers.js         # Tests for internal helper methods
├── TestsNewEdgeCases.js    # More boundary tests
├── TestsOrigins.js         # Origin determination
├── TestsPhysicalForms.js   # Physical form selection
├── TestsPowers.js          # Power generation
├── TestsTalents.js         # Talent generation
├── TestsUtility.js         # Utility/Dice class tests
└── TestsWeakness.js        # Weakness generation
```

### The Tester Class (`UnitTests.js`)

All tests are methods on the `Tester` class. Each test method:

- Takes an optional `gen` parameter (a `CharacterGenerator` instance)
- Uses `Tester.assert()`, `Tester.assertEquals()`, etc. for assertions
- Is registered via `Tester.registerTest()` or `Tester.registerTestGroup()`

```js
// Example test definition
Tester.MyNewTests = (gen) => {
  gen.setDeterministicRolls();
  const char = gen.generateWithoutThrows();
  Tester.assert(char.powers.length > 0, 'Should have powers.');
};

// Registration
Tester.registerTest('MyNewTests', true /* needsGen */, 50 /* order */);
```

### Test Registration

Tests are registered with an **order number** that determines execution order:

| Order Range | Category | Execution |
|-------------|----------|-----------|
| 0-799 | Deterministic | Run once with seeded rolls |
| 800-899 | Fuzz | Run N iterations with random rolls |
| 900+ | Benchmark | Only run with `--benchmark` flag |

Use `registerTestGroup()` for convenience:

```js
Tester.registerTestGroup(50, 'deterministic', [
  { name: 'Test1', needsGen: true },
  { name: 'Test2', needsGen: false },
]);
// Assigns orders 50, 51 automatically
```

### Deterministic vs Fuzz Tests

**Deterministic tests** (order < 800):
- Call `gen.setDeterministicRolls()` to seed all rolls
- Produce the same results every run
- Fast, focused assertions

**Fuzz tests** (order 800-899):
- Do NOT call `setDeterministicRolls()`
- Use `Math.random()` via `Dice.roll()` / `Dice.roll100()`
- Run N iterations (default 100) to catch crashes with random inputs
- Should not assert specific values — only verify no crashes and basic invariants

## Data-Driven Test Pattern

Most test files use a data-driven pattern with config tables:

```js
const MY_TEST_CASES = [
  { form: 'Altered Human', rolls: [50, 50, 50], expected: 'Good' },
  { form: 'Normal Human',  rolls: [30, 30, 30], expected: 'Typical' },
];

Tester.MyTests = () => {
  for (const tc of MY_TEST_CASES) {
    const gen = new CharacterGenerator();
    gen.generatorMode = 'basic';
    gen.setTables();
    gen.setDeterministicRolls();
    // Apply tc.rolls...
    const char = gen.generateWithoutThrows();
    Tester.assertEquals(tc.expected, char.someProperty,
      `${tc.form}: expected ${tc.expected}.`);
  }
};
```

Benefits:
- Adding a test = adding one row to the table
- Consistent test structure
- Easy to see all test scenarios at a glance

## Adding a New Test

### Step 1: Create or Edit a Test File

For new test files, follow the naming convention `tests/TestsYourName.js`.

### Step 2: Define the Test Method

```js
Tester.YourTestName = (gen) => {
  // If needsGen=true, gen is passed automatically
  // If needsGen=false, create your own gen:
  const myGen = new CharacterGenerator();
  myGen.generatorMode = 'basic';
  myGen.setTables();
  myGen.setDeterministicRolls();

  const char = new Character();
  char.physicalForm = 'Altered Human';

  // Test something
  myGen.determineSomeMethod(char);
  Tester.assertEquals('ExpectedValue', char.someField, 'Description.');
};
```

### Step 3: Register the Test

```js
Tester.registerTestGroup(70, 'deterministic', [
  { name: 'YourTestName', needsGen: false },
]);
```

### Step 4: Add to HTML (Browser Support)

In `comiccharcreator.html`, add a `<script>` tag after the existing test files:

```html
<script src="tests/TestsYourName.js"></script>
```

### Step 5: Add to run-tests.js (Node Support)

The test runner auto-discovers `tests/Tests*.js` files. If auto-discovery fails,
add the file to `TEST_MANIFEST` in `run-tests.js`.

## Available Assertion Methods

| Method | Description |
|--------|-------------|
| `assert(condition, msg)` | Assert condition is truthy |
| `assertEquals(expected, actual, msg)` | Assert strict equality |
| `assertNotEquals(expected, actual, msg)` | Assert not equal |
| `assertAtLeast(minimum, actual, msg)` | Assert actual >= minimum |
| `assertInRange(low, high, actual, msg)` | Assert low <= actual <= high |
| `assertNotNull(value, msg)` | Assert value is not null/undefined |
| `assertThrows(fn, expectedErr, msg)` | Assert function throws |
| `assertHasPower(name, powersList, msg)` | Assert power exists in list |

## CharacterGenerator Methods for Testing

```js
// Create and configure
const gen = new CharacterGenerator();
gen.generatorMode = 'basic'; // 'basic', 'advanced', or 'ultimate'
gen.setTables();               // Load data tables for the mode
gen.setDeterministicRolls();   // Seed all rolls for reproducibility

// Generate
const char = gen.generateWithoutThrows();  // No rollAllRolls(), use manual rolls
// OR
gen.throwAllRolls();  // Randomize all rolls first
const char = gen.generate();  // Full generation

// Reset between tests
gen.reset();  // Resets all mutable state (NOT table references)
```

## Code Coverage

Coverage uses [c8](https://github.com/bcoe/c8) for V8 line-level coverage:

```bash
node run-tests.js --coverage
```

This spawns a child process with `NODE_V8_COVERAGE` enabled, runs all tests,
and displays per-file coverage with line-level detail.

Coverage is **Node.js only** — browser tests do not support coverage.

### Coverage Targets

| File | Target | Current |
|------|--------|---------|
| CharacterGenerator.js | >95% lines | ~94.5% |
| Overall | >97% lines | ~96.6% |

### Improving Coverage

To improve coverage for a specific uncovered area:

1. Run `node run-tests.js --coverage` to see uncovered lines
2. Read the uncovered code in `CharacterGenerator.js`
3. Determine what data/inputs would trigger that code path
4. Add a test in `TestsCoverageBoost.js` (or appropriate test file)
5. If the code path requires data that doesn't exist, temporarily patch form rows:

```js
const row = gen.physicalFormTable.find(o => o.name === 'Altered Human');
const origVal = row.someAttribute;
row.someAttribute = 'newValue';
// ... run test ...
if (origVal !== undefined) row.someAttribute = origVal;
else delete row.someAttribute;
```

## Dice Class

The `Dice` class (`Utility.js`) provides deterministic random number generation:

```js
Dice.seed(42);           // Set seed for reproducible rolls
Dice.seed(null);         // Revert to Math.random()
Dice.roll(1, 100);       // Roll between min and max (inclusive)
Dice.roll100();           // Shorthand for Dice.roll(1, 100)
Dice.getRandomItem(arr);  // Pick random item from array (returns null for empty)
```

Tests should call `Dice.seed(null)` when done, or rely on the framework's
automatic cleanup (the `_run` method resets the Dice seed before each test).

## Common Patterns

### Testing with Patched Form Data

```js
// Temporarily modify a form to trigger a specific code path
const row = gen.physicalFormTable.find(o => o.name === 'Altered Human');
const saved = row.healthAdjustment;
row.healthAdjustment = '/2';  // Divide health by 2
// ... run test ...
if (saved !== undefined) row.healthAdjustment = saved;
else delete row.healthAdjustment;
```

### Testing Power Generation Branches

```js
// Exhaust all powers in a category to trigger cross-category fallback
const catPowers = gen.powerListTable.filter(p => p.category === 'SomeCategory');
for (const p of catPowers) {
  char.powers.push({ name: p.name, code: p.code, category: p.category, ... });
}
char._assignedPowerNames = new Set(char.powers.map(p => p.name));
// Now generate — will trigger cross-category retry
gen.generateSinglePower(char, 0);
```

### Testing with Specific Physical Forms

```js
// Ultimate mode forms are selected by physicalFormRoll
// Find the roll range for your target form
const form = gen.physicalFormTable.find(o => o.name === 'Target Form');
const prevMax = gen.physicalFormTable[gen.physicalFormTable.indexOf(form) - 1]?.maxRoll || 0;
gen.physicalFormRoll = prevMax + 1;  // First roll that selects this form
```

## Debugging Test Failures

```bash
# Verbose mode shows each assertion
node run-tests.js --filter MyTest --verbose

# Bail on first failure
node run-tests.js --bail

# Run a specific test only
node run-tests.js --filter WeaknessTests
```

In browser: Open console to see assertion results. The Tests tab shows
pass/fail counts and individual assertion details.
