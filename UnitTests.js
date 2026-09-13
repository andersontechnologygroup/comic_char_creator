// K2 to collapse
// ============================================================================
// TEST FRAMEWORK — Tester class
//
// Iteration notes:
//   By default, tests run 30 iterations (or 1 when --filter is active).
//   Each iteration creates a fresh CharacterGenerator, so state leaks between
//   iterations are caught. Tests that rely on setDeterministicRolls() produce
//   the same assertions every iteration — these could benefit from seeding
//   different random values per iteration. Tests that call throwAllRolls()
//   before setting manual rolls will produce different rolls each iteration
//   (useful for fuzz testing but may cause intermittent failures).
//
// Benchmark tests (order >= 900) run separately from the main loop and are
//   only executed when --benchmark is passed. They do NOT count toward the
//   pass/fail totals used for the exit code.
// ============================================================================
class Tester {
  failureCount = 0;
  assertCount = 0;
  static bailTriggered = false;
  static currentTestMethod = '';
  static _testRegistry = [];

  // Cross-platform environment reference (works in Node.js and browser)
  static _env() {
    if (typeof globalThis !== 'undefined') return globalThis;
    if (typeof window !== 'undefined') return window;
    if (typeof self !== 'undefined') return self;
    return {};
  }

  static _verbose() { return !!this._env().__TEST_VERBOSE; }
  static _bailEnabled() { return !!this._env().__TEST_BAIL; }
  static _filterMatch(methodName) {
    const pattern = this._env().__TEST_FILTER;
    if (!pattern) return true;
    return methodName.toLowerCase().includes(pattern.toLowerCase());
  }
  static _onFailure(div) {
    if (this._bailEnabled() && !this.bailTriggered) {
      this.bailTriggered = true;
      console.error('%cBAIL: Stopping on first failure.', 'color: red; font-size: 16px');
      console.error(div.innerText);
      throw new Error('BAIL: ' + div.innerText);
    }
  }

  static assert(condition, message) {
    const line = this.getLineNumber();
    const area = document.getElementById('test-area');
    const div = document.createElement('div');
    div.id = condition ? "pass" : "failure";
    div.className = "test-output " + (condition ? "pass" : "fail");
    div.innerText = `${condition ? "PASS" : "FAIL"}: (${line}) ${message}`;
    this.failureCount += condition ? 0 : 1;
    if (this._verbose() && condition) console.log(div.innerText);
    if (!condition && this._verbose()) console.error(div.innerText);
    area.appendChild(div);
    this.assertCount++;
    if (!condition) this._onFailure(div);
  }

  static assertEquals(expectedValue, actualValue, message) {
    const line = this.getLineNumber();
    const area = document.getElementById('test-area');
    const div = document.createElement('div');
    const condition = expectedValue === actualValue;
    div.id = condition ? "pass" : "failure";
    div.className = "test-output " + (condition ? "pass" : "fail");
    div.innerText = `${condition ? "PASS" : "FAIL"}: (${line}) ${message} Expected: ${expectedValue}, Actual: ${actualValue}`;
    this.failureCount += condition ? 0 : 1;
    if (!condition) console.trace(`%cASSERT FAILED - ${div.innerText}`, "color: red; font-size: 18px");
    if (this._verbose() && condition) console.log(div.innerText);
    area.appendChild(div);
    this.assertCount++;
    if (!condition) this._onFailure(div);
  }

  static assertNotEquals(unexpectedValue, actualValue, message) {
    const line = this.getLineNumber();
    const area = document.getElementById('test-area');
    const div = document.createElement('div');
    const condition = unexpectedValue !== actualValue;
    div.id = condition ? "pass" : "failure";
    div.className = "test-output " + (condition ? "pass" : "fail");
    div.innerText = `${condition ? "PASS" : "FAIL"}: (${line}) ${message} Should NOT be: ${unexpectedValue}, Actual: ${actualValue}`;
    this.failureCount += condition ? 0 : 1;
    if (!condition) console.trace(`%cASSERT FAILED - ${div.innerText}`, "color: red; font-size: 18px");
    if (this._verbose() && condition) console.log(div.innerText);
    area.appendChild(div);
    this.assertCount++;
    if (!condition) this._onFailure(div);
  }

  /** Assert that actualValue is in the inclusive range [min, max]. */
  static assertInRange(min, max, actualValue, message) {
    const line = this.getLineNumber();
    const area = document.getElementById('test-area');
    const div = document.createElement('div');
    const condition = actualValue >= min && actualValue <= max;
    div.id = condition ? "pass" : "failure";
    div.className = "test-output " + (condition ? "pass" : "fail");
    div.innerText = `${condition ? "PASS" : "FAIL"}: (${line}) ${message} Expected [${min}-${max}], Actual: ${actualValue}`;
    this.failureCount += condition ? 0 : 1;
    if (!condition) console.trace(`%cASSERT FAILED - ${div.innerText}`, "color: red; font-size: 18px");
    if (this._verbose() && condition) console.log(div.innerText);
    area.appendChild(div);
    this.assertCount++;
    if (!condition) this._onFailure(div);
  }

  /** Assert that actualValue is not null and not undefined. */
  static assertNotNull(actualValue, message) {
    const line = this.getLineNumber();
    const area = document.getElementById('test-area');
    const div = document.createElement('div');
    const condition = actualValue !== null && actualValue !== undefined;
    div.id = condition ? "pass" : "failure";
    div.className = "test-output " + (condition ? "pass" : "fail");
    div.innerText = `${condition ? "PASS" : "FAIL"}: (${line}) ${message} Expected non-null, Actual: ${actualValue}`;
    this.failureCount += condition ? 0 : 1;
    if (!condition) console.trace(`%cASSERT FAILED - ${div.innerText}`, "color: red; font-size: 18px");
    if (this._verbose() && condition) console.log(div.innerText);
    area.appendChild(div);
    this.assertCount++;
    if (!condition) this._onFailure(div);
  }

  /** Assert actualValue >= minValue (i.e. actualValue is at least minValue). */
  static assertAtLeast(minValue, actualValue, message) {
    const line = this.getLineNumber();
    const area = document.getElementById('test-area');
    const div = document.createElement('div');
    const condition = actualValue >= minValue;
    div.id = condition ? "pass" : "failure";
    div.className = "test-output " + (condition ? "pass" : "fail");
    div.innerText = `${condition ? "PASS" : "FAIL"}: (${line}) ${message} Expected >= ${minValue}, Actual: ${actualValue}`;
    this.failureCount += condition ? 0 : 1;
    if (this._verbose() && condition) console.log(div.innerText);
    if (!condition && this._verbose()) console.error(div.innerText);
    area.appendChild(div);
    this.assertCount++;
    if (!condition) this._onFailure(div);
  }

  /** @deprecated Use assertAtLeast instead. Kept for backward compatibility. */
  static assertGreaterOrEqual(expectedValue, actualValue, message) {
    this.assertAtLeast(expectedValue, actualValue, message);
  }

  static assertThrows(fn, expectedError, message) {
    const line = this.getLineNumber();
    const area = document.getElementById('test-area');
    const div = document.createElement('div');
    let caught = false;
    let actualError = '';
    try {
      fn();
    } catch(e) {
      caught = true;
      actualError = e.message || String(e);
    }
    const condition = caught && (expectedError === undefined || actualError.indexOf(expectedError) !== -1);
    div.id = condition ? "pass" : "failure";
    div.className = "test-output " + (condition ? "pass" : "fail");
    div.innerText = caught
      ? `${condition ? "PASS" : "FAIL"}: (${line}) ${message} Threw: ${actualError}`
      : `${"FAIL"}: (${line}) ${message} Expected to throw, but did not.`;
    this.failureCount += condition ? 0 : 1;
    if (!condition) console.trace(`%cASSERT FAILED - ${div.innerText}`, "color: red; font-size: 18px");
    if (this._verbose() && condition) console.log(div.innerText);
    area.appendChild(div);
    this.assertCount++;
    if (!condition) this._onFailure(div);
  }

  static assertHasPower(expectedValue, powersList, message) {
    const line = this.getLineNumber();
    const area = document.getElementById('test-area');
    const div = document.createElement('div');
    const found = powersList.some(p => p.name === expectedValue);
    div.id = found ? "pass" : "failure";
    div.className = "test-output " + (found ? "pass" : "fail");
    div.innerText = `${found ? "PASS" : "FAIL"}: (${line}) ${message} Expected power: ${expectedValue}`;
    this.failureCount += found ? 0 : 1;
    area.appendChild(div);
    this.assertCount++;
  }

  static start() {
    console.log("%cTESTING TESTING TESTING", "color: red; font-size: 24px");
    if (this._env().__TEST_FILTER) console.log(`  --filter: "${this._env().__TEST_FILTER}"`);
    if (this._env().__TEST_VERBOSE) console.log('  --verbose: enabled');
    if (this._env().__TEST_BAIL) console.log('  --bail: enabled');
  }

  static end() {
    console.log("%cDONE DONE DONE", "color: green; font-size: 24px");
  }

  /** #5 — Robust line number extraction.
   *  Walks the stack looking for frames from test files (Tests*.js, UnitTests.js,
   *  or any file under tests/). Handles evalmachine-wrapped frames produced by
   *  vm.runInThisContext (Node) as well as native browser stacks. */
  static getLineNumber() {
    try {
      const stack = (new Error).stack.split("\n");
      // Known test file markers — both path separators and the evalmachine wrapper
      const markers = [
        'UnitTests.js',
        'Tests',
        'tests\\\\',
        'tests/',
        'evalmachine.<anonymous>'
      ];
      // Framework methods to skip when walking the stack
      const frameworkMethods = [
        'getLineNumber', 'assert', 'assertEquals', 'assertNotEquals',
        'assertInRange', 'assertNotNull', 'assertAtLeast',
        'assertGreaterOrEqual', 'assertThrows', 'assertHasPower'
      ];
      for (let i = 2; i < Math.min(stack.length, 10); i++) {
        const frame = stack[i];
        // Skip frames that are inside the Tester class itself
        const isFramework = frameworkMethods.some(m =>
          frame.indexOf('Tester.') !== -1 && frame.indexOf(m) !== -1
        );
        if (isFramework) continue;

        for (let m = 0; m < markers.length; m++) {
          if (frame.indexOf(markers[m]) !== -1) {
            // Extract line number — last numeric segment before the closing paren
            const parts = frame.split(":");
            // Walk parts from the end to find the line number
            for (let p = parts.length - 1; p >= 1; p--) {
              const num = parseInt(parts[p], 10);
              if (!isNaN(num) && num > 0) return num;
            }
            return '?';
          }
        }
      }
      // Fallback: return line from caller frame
      if (stack.length > 3) {
        const parts = stack[3].split(":");
        for (let p = parts.length - 1; p >= 1; p--) {
          const num = parseInt(parts[p], 10);
          if (!isNaN(num) && num > 0) return num;
        }
      }
      return '?';
    } catch(e) {
      return '?';
    }
  }

  /** #8 — Run a single test method with error protection.
   *  Wraps fn() in try/catch so a crashing test (e.g. TypeError) doesn't
   *  abort the entire suite. The failure is counted and reported. */
  static _run(methodName, fn) {
    if (!this._filterMatch(methodName)) return;
    this.currentTestMethod = methodName;
    if (this._verbose()) console.log(`  [${methodName}]`);
    // Reset Dice seed to prevent cross-test state leakage
    if (typeof Dice !== 'undefined') Dice.seed(null);
    try {
      fn();
    } catch(e) {
      this.failureCount++;
      this.assertCount++;
      const msg = `UNCAUGHT EXCEPTION in ${methodName}: ${e.message || e}`;
      console.error(`%c${msg}`, "color: red; font-size: 16px");
      if (e.stack) console.error(e.stack);
      const area = document.getElementById('test-area');
      const div = document.createElement('div');
      div.id = "failure";
      div.className = "test-output fail";
      div.innerText = `FAIL: ${msg}`;
      area.appendChild(div);
      if (this._bailEnabled() && !this.bailTriggered) {
        this.bailTriggered = true;
        throw e;
      }
    }
  }

  /** Register a test method. Call from domain files after defining the method.
   *  @param {string} name - Test method name (must match Tester.<name>)
   *  @param {boolean} needsGen - If true, passes a CharacterGenerator instance
   *  @param {number} order - Execution order (lower runs first). Default 100.
   *     Orders >= 900 are treated as benchmark tests and run separately.
   *  @param {string} iterationMode - 'deterministic' (default): same result every
   *     iteration, safe for low iteration counts. 'random': depends on throwAllRolls(),
   *     benefits from higher iteration counts.
   */
  static registerTest(name, needsGen, order, iterationMode) {
    if (order === undefined) order = 100;
    this._testRegistry.push({
      name: name,
      needsGen: !!needsGen,
      order: order,
      iterationMode: iterationMode || 'deterministic'
    });
  }

  /** Register multiple tests with auto-assigned order within a range.
   *  @param {number} startOrder - First order number in the group
   *  @param {string} iterationMode - 'deterministic', 'fuzz', or 'random'
   *  @param {Array} tests - Array of { name, needsGen } objects
   * 
   *  Example:
   *    Tester.registerTestGroup(60, 'deterministic', [
   *      { name: 'SinglePowerTests', needsGen: true },
   *      { name: 'PowersTests', needsGen: true },
   *    ]);
   *  // Assigns orders 60, 61 automatically.
   */
  static registerTestGroup(startOrder, iterationMode, tests) {
    for (let i = 0; i < tests.length; i++) {
      const t = tests[i];
      this.registerTest(t.name, t.needsGen, startOrder + i, iterationMode);
    }
  }

  /** Return names of registered test methods for the dropdown.
   *  Used by the HTML UI to populate the individual test selector. */
  static getRenderMethodNames() {
    return this._testRegistry
      .map(t => t.name)
      .sort();
  }

  static run() {
    document.getElementById('test-area').innerHTML = "<h3>Running Tests...</h3>";
    this.totalFailureCount = 0;
    this.totalAssertCount = 0;
    this.bailTriggered = false;
    this.start();

    // Split tests: deterministic, fuzz, and benchmark (order >= 900)
    const allTests = this._testRegistry.slice().sort((a, b) => a.order - b.order);
    const BENCHMARK_THRESHOLD = 900;
    const FUZZ_THRESHOLD = 800;
    const deterministicTests = allTests.filter(t => t.order < FUZZ_THRESHOLD && t.iterationMode === 'deterministic');
    const fuzzTests = allTests.filter(t => t.order >= FUZZ_THRESHOLD && t.order < BENCHMARK_THRESHOLD);
    const benchmarkTests = allTests.filter(t => t.order >= BENCHMARK_THRESHOLD);

    // #3 — Support --iterations flag for browser too (used only for fuzz tests)
    const fuzzIters = this._env().__TEST_ITERATIONS || 100;

    if (this._verbose()) {
      console.log(`  ${deterministicTests.length} deterministic tests (run once)`);
      if (fuzzTests.length > 0) console.log(`  ${fuzzTests.length} fuzz test(s) × ${fuzzIters} iteration(s)`);
      if (benchmarkTests.length > 0) console.log(`  ${benchmarkTests.length} benchmark test(s)`);
    }

    // Phase 1: Run deterministic tests ONCE — all rolls are seeded/pinned
    this.failureCount = 0;
    this.assertCount = 0;
    const gen = new CharacterGenerator();
    for (const test of deterministicTests) {
      gen.reset();
      const fn = test.needsGen
        ? () => this[test.name](gen)
        : () => this[test.name]();
      this._run(test.name, fn);
    }
    this.totalFailureCount += this.failureCount;
    this.totalAssertCount += this.assertCount;

    // Phase 2: Run fuzz tests in a loop — verify no crashes with random rolls
    if (fuzzTests.length > 0) {
      for (let iter = 0; iter < fuzzIters; iter++) {
        if (this.bailTriggered) break;
        this.failureCount = 0;
        this.assertCount = 0;
        const fuzzGen = new CharacterGenerator();
        for (const test of fuzzTests) {
          fuzzGen.reset();
          const fn = test.needsGen
            ? () => this[test.name](fuzzGen)
            : () => this[test.name]();
          this._run(test.name, fn);
        }
        this.totalFailureCount += this.failureCount;
        this.totalAssertCount += this.assertCount;
      }
    }

    // Phase 3: Benchmark runs separately, only with --benchmark flag
    if (this._env().__TEST_BENCHMARK && benchmarkTests.length > 0) {
      this.failureCount = 0;
      this.assertCount = 0;
      for (const test of benchmarkTests) {
        this._run(test.name, () => this[test.name]());
      }
      this.totalFailureCount += this.failureCount;
      this.totalAssertCount += this.assertCount;
    }

    this.end();
    let alertMessage = `All Tests Passed!!!\r\n${this.totalAssertCount} assertions across ${deterministicTests.length} deterministic + ${fuzzTests.length} fuzz × ${fuzzIters}.`;
    if (this.totalFailureCount !== 0) {
      alertMessage = `Tests Failed! ${this.totalFailureCount} failures.\r\n${this.totalAssertCount} assertions.\r\n${(this.totalFailureCount / this.totalAssertCount * 100).toFixed(4)}% failure rate.`;
    }
    alert(alertMessage);
  }
}
