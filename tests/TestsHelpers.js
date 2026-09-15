// Shared test helpers

/** Check if a log entry exists matching a description and optional second term.
 *  Handles multiple log formats:
 *    - [description] bracket (for "Any Ability Adjustment", etc.)
 *    - description + secondTerm as whole tokens (for "Ability: X ... Adjustment: N" etc.)
 *
 *  Uses word-boundary matching for secondTerm to avoid false positives
 *  (e.g., '-1' won't match '-10' or '21').
 */
Tester._hasLogEntry = function (log, description, secondTerm) {
    if (secondTerm === undefined || secondTerm === null || secondTerm === "") {
        secondTerm = "";
    }
    return log.some(function (l) {
        if (l.indexOf("[" + description + "]") !== -1) return true;
        if (secondTerm === "") return false;
        if (l.indexOf(description) === -1) return false;
        // Use word-boundary check: secondTerm must not be adjacent to digits/letters
        // This prevents '-1' from matching inside '-10' or '21'
        const idx = l.indexOf(secondTerm);
        if (idx === -1) return false;
        const before = idx > 0 ? l[idx - 1] : " ";
        const afterIdx = idx + secondTerm.length;
        const after = afterIdx < l.length ? l[afterIdx] : " ";
        const isWordChar = function (c) {
            return /[a-zA-Z0-9]/.test(c);
        };
        return !isWordChar(before) && !isWordChar(after);
    });
};

/** Check if a log entry exists matching a loose substring search */
Tester._hasLogContaining = function (log, substring) {
    return log.some(function (l) {
        return l.indexOf(substring) !== -1;
    });
};

/** Assert that log array has no undefined, null, or [object Object] entries.
 *  Replaces the 3-line pattern found across multiple test files.
 *  @param {Array} log - The char.log array
 *  @param {string} [mode] - Optional mode label for the assertion message */
Tester._assertNoGarbageInLogs = function (log, mode) {
    const prefix = mode ? "(" + mode + ") " : "";
    Tester.assert(
        !Tester._hasLogContaining(log, "undefined"),
        prefix + "logs don't contain 'undefined'.",
    );
    Tester.assert(
        !Tester._hasLogContaining(log, "null"),
        prefix + "logs don't contain 'null'.",
    );
    Tester.assert(
        !Tester._hasLogContaining(log, "[object Object]"),
        prefix + "logs don't contain '[object Object]'.",
    );
};

// ============================================================================
// DIRECT HELPER TESTS — exercises all code paths in this file
// ============================================================================

Tester.HelperFunctionTests = () => {
    // --- _hasLogEntry ---
    const log1 = [
        "[Test] entry1",
        "Ability: Fighting Adjustment: -1",
        "Simple message",
    ];

    // Bracket format match
    Tester.assert(
        Tester._hasLogEntry(log1, "Test"),
        "_hasLogEntry: bracket format matches.",
    );
    Tester.assert(
        Tester._hasLogEntry(log1, "Test", ""),
        "_hasLogEntry: bracket format with empty secondTerm matches.",
    );
    Tester.assert(
        !Tester._hasLogEntry(log1, "Nonexistent"),
        "_hasLogEntry: non-existent description returns false.",
    );

    // Word-boundary matching
    Tester.assert(
        Tester._hasLogEntry(log1, "Ability", "Fighting"),
        '_hasLogEntry: word-boundary match for "Fighting".',
    );
    Tester.assert(
        Tester._hasLogEntry(log1, "Adjustment", "-1"),
        '_hasLogEntry: word-boundary match for "-1".',
    );
    Tester.assert(
        !Tester._hasLogEntry(log1, "Adjustment", "-"),
        '_hasLogEntry: partial match "-" should not match "-1".',
    );

    // null/undefined secondTerm treated as empty
    Tester.assert(
        !Tester._hasLogEntry(log1, "Ability", null),
        "_hasLogEntry: null secondTerm returns false (description not in brackets).",
    );
    Tester.assert(
        !Tester._hasLogEntry(log1, "Ability", undefined),
        "_hasLogEntry: undefined secondTerm returns false.",
    );

    // Edge cases for word-boundary: exercise both ternary branches
    // Log entries designed to hit idx===0 (before=' ') and afterIdx>=length (after=' ')
    const log2 = ["ABC at start", "XYZ at end ABC", "middle ABC middle"];

    // 'ABC' at idx=0 in 'ABC at start' → before=' ' (start), after=' ' (space)
    Tester.assert(
        Tester._hasLogEntry(log2, "ABC at start", "ABC"),
        "_hasLogEntry: secondTerm at idx=0 → before branch.",
    );

    // 'ABC' at end of 'XYZ at end ABC' → afterIdx >= length → after=' '
    Tester.assert(
        Tester._hasLogEntry(log2, "XYZ at end", "ABC"),
        "_hasLogEntry: secondTerm at end → after branch.",
    );

    // 'ABC' in middle of 'middle ABC middle' → both branches use char values
    Tester.assert(
        Tester._hasLogEntry(log2, "middle ABC middle", "ABC"),
        "_hasLogEntry: secondTerm in middle → both branches use chars.",
    );

    // 'ABC' NOT matching because adjacent to letter: 'ABCX' at start
    const log3 = ["ABCX at start"];
    Tester.assert(
        !Tester._hasLogEntry(log3, "ABCX at start", "ABC"),
        "_hasLogEntry: secondTerm adjacent to letter at end → no match.",
    );

    // 'ABC' NOT matching because adjacent to digit: '1ABC' at start
    const log4 = ["1ABC test"];
    Tester.assert(
        !Tester._hasLogEntry(log4, "1ABC test", "ABC"),
        "_hasLogEntry: secondTerm adjacent to digit at start → no match.",
    );

    // --- _hasLogContaining ---
    Tester.assert(
        Tester._hasLogContaining(log1, "Fighting"),
        "_hasLogContaining: substring match.",
    );
    Tester.assert(
        !Tester._hasLogContaining(log1, "XYZZY"),
        "_hasLogContaining: non-existent substring returns false.",
    );
    Tester.assert(
        Tester._hasLogContaining(log1, ""),
        "_hasLogContaining: empty string matches everything.",
    );

    // --- _assertNoGarbageInLogs ---
    const cleanLog = ["[Test] good entry", "Another clean entry"];
    Tester._assertNoGarbageInLogs(cleanLog);
    // If we got here without assertion failures, clean logs pass.

    Tester._assertNoGarbageInLogs(cleanLog, "TestMode");
    // With mode prefix — also passes.
};

Tester.registerTest("HelperFunctionTests", false, 25, "deterministic");
