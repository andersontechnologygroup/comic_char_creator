// Performance benchmark tests
// Extracted from UnitTests.js

Tester.PerformanceBenchmarkTests = () => {
    // Generate many characters across all modes and assert timing
    const modes = ["basic", "advanced", "ultimate"];
    const iterationsPerMode = 500;
    const results = {};

    for (const mode of modes) {
        const gen = new CharactorGenerator();
        gen.generatorMode = mode;
        gen.setTables();
        gen.identitySecret = true;
        gen.originPublic = false;
        gen.wellEstablished = false;
        gen.looksHuman = false;

        const startTime = Date.now();

        for (let i = 0; i < iterationsPerMode; i++) {
            gen.setDeterministicRolls();
            gen.physicalFormRoll = (i % 100) + 1;
            gen.originRoll = (i % 100) + 1;
            const char = gen.generateWithoutThrows();

            // Basic sanity check that generation succeeded
            Tester.assert(
                char.physicalForm !== "",
                `Perf (${mode}): iteration ${i} should have a physicalForm.`,
            );
        }

        const elapsed = Date.now() - startTime;
        const perChar = (elapsed / iterationsPerMode).toFixed(2);
        results[mode] = { elapsed, perChar, iterations: iterationsPerMode };

        console.log(
            `  Performance (${mode}): ${iterationsPerMode} characters in ${elapsed}ms (${perChar}ms/char)`,
        );
    }

    // Assert reasonable performance thresholds (generous to avoid CI flakiness)
    // These are sanity checks, not tight benchmarks
    const thresholds = { basic: 5000, advanced: 5000, ultimate: 10000 };
    for (const mode of modes) {
        Tester.assert(
            results[mode].elapsed < thresholds[mode],
            `Perf (${mode}): ${results[mode].iterations} chars in ${results[mode].elapsed}ms should be under ${thresholds[mode]}ms.`,
        );
    }

    // Summary
    const totalChars = modes.reduce((sum, m) => sum + results[m].iterations, 0);
    const totalTime = modes.reduce((sum, m) => sum + results[m].elapsed, 0);
    console.log(
        `  Performance summary: ${totalChars} characters in ${totalTime}ms total.`,
    );
};

// Lightweight benchmark: runs in normal mode with fewer iterations
// Exercises the benchmark code path without --benchmark flag
Tester.LightweightBenchmarkTests = () => {
    const modes = ["basic", "advanced", "ultimate"];
    const iterationsPerMode = 10;

    for (const mode of modes) {
        const gen = new CharactorGenerator();
        gen.generatorMode = mode;
        gen.setTables();
        gen.identitySecret = true;
        gen.originPublic = false;
        gen.wellEstablished = false;
        gen.looksHuman = false;

        const startTime = Date.now();
        for (let i = 0; i < iterationsPerMode; i++) {
            gen.setDeterministicRolls();
            gen.physicalFormRoll = (i % 100) + 1;
            const char = gen.generateWithoutThrows();
            Tester.assert(
                char.physicalForm !== "",
                `LightPerf (${mode}): iteration ${i} should have a physicalForm.`,
            );
        }
        const elapsed = Date.now() - startTime;
        Tester.assert(
            elapsed < 2000,
            `LightPerf (${mode}): ${iterationsPerMode} chars in ${elapsed}ms should be under 2000ms.`,
        );
    }
};

Tester.registerTestGroup(890, "deterministic", [
    { name: "LightweightBenchmarkTests", needsGen: false },
]);

Tester.registerTest("PerformanceBenchmarkTests", false, 900, "random");
