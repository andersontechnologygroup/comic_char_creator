#!/usr/bin/env node
// Node.js test runner for comiccharcreator
// Usage: node run-tests.js [--filter <pattern>] [--verbose] [--bail] [--iterations N] [--coverage]
//
// Provides the same tests as the browser-based UnitTests runner,
// but can be executed in Node.js for CI/CD pipelines and headless testing.
//
// Flags:
//   --filter <pattern>  Only run test methods whose name includes <pattern>
//   --verbose           Show each assertion result (not just failures)
//   --bail              Stop on the first assertion failure
//   --iterations <n>    Run fuzz tests n times (default: 100, filtered: 1)
//   --benchmark         Run performance benchmark after tests
//   --coverage          Enable V8 code coverage tracking (per-file line coverage)

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { execSync } = require("child_process");

const TESTS_DIR = path.join(__dirname, "tests");
const TEST_MANIFEST = [
    "tests/TestsHelpers.js",
    "tests/TestsUtility.js",
    "tests/TestsAbilities.js",
    "tests/TestsPowers.js",
    "tests/TestsWeakness.js",
    "tests/TestsTalents.js",
    "tests/TestsContacts.js",
    "tests/TestsFuzz.js",
    "tests/TestsBoundary.js",
    "tests/TestsBenchmark.js",
    "tests/TestsPhysicalForms.js",
    "tests/TestsOrigins.js",
    "tests/TestsGeneratorMethods.js",
    "tests/TestsBranchCoverage.js",
    "tests/TestsCoverageBoost.js",
    "tests/TestsPowerSelection.js",
];

// ============================================================================
// COVERAGE MODE: Use c8 for line-level V8 coverage
// ============================================================================

const args = process.argv.slice(2);
const coverageMode = args.includes("--coverage");

if (coverageMode) {
    // Forward all args except --coverage to the child process
    const childArgs = process.argv.slice(2).filter((a) => a !== "--coverage");
    console.log("Running tests with c8 line-level coverage...\n");
    if (childArgs.length > 0)
        console.log("  Forwarding args: " + childArgs.join(" ") + "\n");

    // Use --exclude to only show our project files (not node_modules)
    const c8Cmd = [
        'npx c8 --reporter=text --reporter=text-summary --exclude="node_modules/**"',
        '"' + process.execPath + '"',
        '"' + __filename + '"',
        ...childArgs.map((a) => '"' + a + '"'),
    ].join(" ");
    try {
        execSync(c8Cmd, { stdio: "inherit", cwd: __dirname, shell: true });
    } catch (e) {
        // Tests failed — c8 still reports coverage
    }

    process.exit(0);
}

// ============================================================================
// NORMAL MODE: DOM shim, constants, CLI parsing, test execution
// ============================================================================

// Minimal DOM shim
global.document = {
    getElementById: (id) => ({
        innerHTML: "",
        appendChild: () => {},
        style: {},
        textContent: "",
    }),
    createElement: (tag) => ({
        innerHTML: "",
        style: {},
        appendChild: () => {},
        className: "",
    }),
};
global.window = { alert: (msg) => {} };
global.alert = global.window.alert;

// Inline constants from comiccharcreator.html
global.ABILITY_MODIFIER_TABLE = [
    { maxRoll: 15, modifier: -1 },
    { maxRoll: 50, modifier: 0 },
    { maxRoll: 70, modifier: 1 },
    { maxRoll: 85, modifier: 2 },
    { maxRoll: 95, modifier: 3 },
    { maxRoll: 100, modifier: 4 },
];
global.ALL_ABILITIES = [
    { name: "Fighting", maxRoll: 14 },
    { name: "Agility", maxRoll: 29 },
    { name: "Strength", maxRoll: 43 },
    { name: "Endurance", maxRoll: 58 },
    { name: "Reason", maxRoll: 72 },
    { name: "Intuition", maxRoll: 86 },
    { name: "Psyche", maxRoll: 100 },
];
global.PHYSICAL_ABILITIES = ["Fighting", "Agility", "Strength", "Endurance"];
global.MENTAL_ABILITIES = ["Reason", "Intuition", "Psyche"];

// Parse CLI flags
let filterPattern = null;
let verbose = false;
let bail = false;
let iterations = 100;
let runBenchmark = false;

for (let i = 0; i < args.length; i++) {
    if (args[i] === "--filter" && i + 1 < args.length) {
        filterPattern = args[i + 1];
        i++;
    } else if (args[i] === "--verbose") {
        verbose = true;
    } else if (args[i] === "--bail") {
        bail = true;
    } else if (args[i] === "--iterations" && i + 1 < args.length) {
        iterations = parseInt(args[i + 1], 10);
        if (isNaN(iterations) || iterations < 1) iterations = 100;
        i++;
    } else if (args[i] === "--benchmark") {
        runBenchmark = true;
    } else if (args[i] === "--help" || args[i] === "-h") {
        console.log("Usage: node run-tests.js [options]");
        console.log("");
        console.log("Options:");
        console.log(
            "  --filter <pattern>  Only run test methods matching <pattern>",
        );
        console.log("  --verbose           Show each assertion result");
        console.log("  --bail              Stop on the first failure");
        console.log(
            "  --iterations <n>    Run fuzz tests n times (default: 100, filtered: 1)",
        );
        console.log(
            "  --benchmark         Run performance benchmark after tests",
        );
        console.log("  --coverage          Enable V8 code coverage tracking");
        console.log("  --help, -h          Show this help");
        process.exit(0);
    }
}

// Make flags available inside the test VM context
global.__TEST_FILTER = filterPattern;
global.__TEST_VERBOSE = verbose;
global.__TEST_BAIL = bail;
global.__TEST_ITERATIONS = iterations;
global.__TEST_BENCHMARK = runBenchmark;

// Build file list: core files first, then test files
const CORE_FILES = [
    "Utility.js",
    "DataBasic.js",
    "DataAdvanced.js",
    "DataUltimate.js",
    "Charactor.js",
    "CharactorGenerator.js",
    "UnitTests.js",
];

let testFiles;
try {
    const entries = fs.readdirSync(TESTS_DIR);
    testFiles = entries
        .filter((f) => f.startsWith("Tests") && f.endsWith(".js"))
        .sort()
        .map((f) => "tests/" + f);
    if (testFiles.length === 0) {
        testFiles = TEST_MANIFEST;
    }
} catch (e) {
    testFiles = TEST_MANIFEST;
}

const allFiles = [...CORE_FILES, ...testFiles];

// Validate all files exist
for (const f of allFiles) {
    const filePath = path.join(__dirname, f);
    if (!fs.existsSync(filePath)) {
        if (CORE_FILES.includes(f)) {
            console.error(`Error: ${f} not found at ${filePath}`);
            process.exit(1);
        } else {
            console.error(`Warning: ${f} not found at ${filePath}, skipping.`);
        }
    }
}

// Run each file as a separate vm.Script for global scope sharing.
// V8 coverage (via NODE_V8_COVERAGE) tracks these as 'evalmachine.<anonymous>'
// per-script, giving per-file coverage when filenames are set.
for (const f of allFiles) {
    const filePath = path.join(__dirname, f);
    if (!fs.existsSync(filePath)) continue;
    const code = fs.readFileSync(filePath, "utf8");
    const script = new vm.Script(code, { filename: filePath });
    script.runInThisContext();
}

// Post-load: override alert and validate deterministic rolls
const postLoadCode = `
var __alertMsg = "";
global.alert = (msg) => { __alertMsg = msg; };

(function validateDeterministicRolls() {
  var gen = new CharactorGenerator();
  gen.generatorMode = "basic";
  gen.setTables();
  gen.setDeterministicRolls();

  for (var i = 0; i < gen.powerCategoryRolls.length; i++) {
    var roll = gen.powerCategoryRolls[i];
    if (roll < 1 || roll > 100) {
      console.error("WARNING: powerCategoryRolls[" + i + "] = " + roll + " is out of range [1-100]");
    }
  }

  for (var i = 0; i < Math.min(10, gen.powerCategoryRolls.length); i++) {
    var catRoll = gen.powerCategoryRolls[i];
    var catRow = gen.powerCategoriesTable.find(function(c) { return catRoll <= c.maxRoll; });
    if (catRow) {
      var pRoll = gen.powerRolls[i];
      var powerRow = gen.powerListTable.find(function(p) { return p.category === catRow.name && pRoll <= p.maxRoll; });
      if (!powerRow) {
        console.error("WARNING: powerRolls[" + i + "] = " + pRoll + " has no match in category " + catRow.name);
      }
    }
  }

  for (var i = 0; i < Math.min(10, gen.talentCategoryRolls.length); i++) {
    var catRoll = gen.talentCategoryRolls[i];
    var catRow = gen.talentCategoriesTable.find(function(c) { return catRoll <= c.maxRoll; });
    if (!catRow) {
      console.error("WARNING: talentCategoryRolls[" + i + "] = " + catRoll + " has no matching category");
    }
  }

  for (var i = 0; i < Math.min(10, gen.contactCategoryRolls.length); i++) {
    var catRoll = gen.contactCategoryRolls[i];
    var catRow = gen.contactCategoriesTable.find(function(c) { return catRoll <= c.maxRoll; });
    if (!catRow) {
      console.error("WARNING: contactCategoryRolls[" + i + "] = " + catRoll + " has no matching category");
    }
  }

  console.log("Deterministic roll validation complete.");
})();

Tester.run();
`;

const postScript = new vm.Script(postLoadCode, { filename: "_post_load.js" });
postScript.runInThisContext();

console.log(__alertMsg);
if (__alertMsg.includes("All Tests Passed")) {
    process.exit(0);
} else {
    process.exit(1);
}

// ============================================================================
// COVERAGE REPORT GENERATOR
