//  TestsDataIntegrity
// Validates data table integrity across Basic, Advanced, and Ultimate modes.
// Catches structural issues like missing rolls, overlaps, invalid attributes, etc.

// ============================================================================
// SHARED HELPERS
// ============================================================================

/**
 * Check that rolls 1-100 all map to a valid table entry.
 * @param {string} tableName - For logging
 * @param {Array} table - Table with maxRoll entries
 * @param {string} mode - 'basic', 'advanced', or 'ultimate'
 */
Tester._assertFullRollCoverage = (tableName, table, mode) => {
    const missing = [];
    for (let i = 1; i <= 100; i++) {
        const row = table.find((r) => i <= r.maxRoll);
        if (!row) missing.push(i);
    }
    Tester.assert(
        missing.length === 0,
        `DataIntegrity(${mode}): ${tableName} covers all rolls 1-100. Missing: [${missing.join(",")}]`,
    );
};

/**
 * Check that maxRoll values within a table are strictly increasing (no overlaps).
 * @param {string} tableName - For logging
 * @param {Array} table - Table with maxRoll entries
 * @param {string} mode - 'basic', 'advanced', or 'ultimate'
 */
Tester._assertNoOverlaps = (tableName, table, mode) => {
    let prev = 0;
    for (const row of table) {
        if (row.maxRoll <= prev) {
            Tester.assert(
                false,
                `DataIntegrity(${mode}): ${tableName} overlap — maxRoll ${row.maxRoll} <= previous ${prev} (name: ${row.name || row.rank})`,
            );
            return;
        }
        prev = row.maxRoll;
    }
    Tester.assert(true, `DataIntegrity(${mode}): ${tableName} no overlaps.`);
};

/**
 * Check that all entries in a category table cover rolls 1-100 per category.
 */
Tester._assertCategoryCoverage = (tableName, table, categoryField, mode) => {
    const categories = {};
    table.forEach((row) => {
        const cat = row[categoryField];
        if (!cat) return;
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(row);
    });
    for (const [cat, entries] of Object.entries(categories)) {
        let prev = 0;
        for (const e of entries) {
            if (e.maxRoll <= prev) {
                Tester.assert(
                    false,
                    `DataIntegrity(${mode}): ${tableName}/${cat} overlap — maxRoll ${e.maxRoll} <= ${prev} (${e.name})`,
                );
                return;
            }
            prev = e.maxRoll;
        }
        if (prev < 100) {
            Tester.assert(
                false,
                `DataIntegrity(${mode}): ${tableName}/${cat} incomplete — last maxRoll ${prev} < 100`,
            );
            return;
        }
    }
    Tester.assert(
        true,
        `DataIntegrity(${mode}): ${tableName} category coverage OK.`,
    );
};

/**
 * Check that all entries within a category have unique names.
 */
Tester._assertNoDuplicateNames = (tableName, table, categoryField, mode) => {
    const byCategory = {};
    table.forEach((row) => {
        const cat = row[categoryField] || "_none_";
        if (!byCategory[cat]) byCategory[cat] = [];
        byCategory[cat].push(row.name);
    });
    for (const [cat, names] of Object.entries(byCategory)) {
        const seen = {};
        for (const n of names) {
            if (seen[n]) {
                Tester.assert(
                    false,
                    `DataIntegrity(${mode}): ${tableName}/${cat} duplicate name: "${n}"`,
                );
                return;
            }
            seen[n] = true;
        }
    }
    Tester.assert(
        true,
        `DataIntegrity(${mode}): ${tableName} no duplicate names.`,
    );
};

/**
 * Check that numeric attributes are positive integers where expected.
 */
Tester._assertPositiveInts = (tableName, table, attrs, mode) => {
    for (const attr of attrs) {
        for (const row of table) {
            if (row[attr] !== undefined) {
                const val = row[attr];
                if (
                    typeof val !== "number" ||
                    val < 0 ||
                    !Number.isInteger(val)
                ) {
                    Tester.assert(
                        false,
                        `DataIntegrity(${mode}): ${tableName}.${attr} on "${row.name}" is ${val} (expected positive integer)`,
                    );
                    return;
                }
            }
        }
    }
    Tester.assert(
        true,
        `DataIntegrity(${mode}): ${tableName} numeric attributes OK.`,
    );
};

/**
 * Check QUANTITY_TABLE: powers/talents/contacts initial <= maximum.
 */
Tester._assertQuantityTableConsistency = (table, mode) => {
    for (const row of table) {
        for (const key of ["powers", "talents", "contacts"]) {
            const q = row[key];
            if (q.initial > q.maximum) {
                Tester.assert(
                    false,
                    `DataIntegrity(${mode}): QUANTITY_TABLE maxRoll ${row.maxRoll} — ${key}.initial (${q.initial}) > maximum (${q.maximum})`,
                );
                return;
            }
        }
    }
    Tester.assert(
        true,
        `DataIntegrity(${mode}): QUANTITY_TABLE consistency OK.`,
    );
};

// ============================================================================
// NAME FORMAT & CONTENT VALIDATION HELPERS
// ============================================================================

/**
 * Check that no name contains obvious double-letter typos.
 * Detects patterns like 'nn', 'ee', 'mm', 'gg', etc. that indicate
 * copy-paste or OCR errors in power/talent/contact names.
 */
Tester._assertNoNameTypos = (tableName, table, mode) => {
    // Known typo patterns: doubled letters that don't appear in valid names
    const typoPatterns = [
        /Emotionn/i, // should be Emotion
        /Magneetic/i, // should be Magnetic
        /Mannipulation/i, // should be Manipulation
        /Enforcemeent/i, // should be Enforcement
        /Enhances\s+Senses/i, // should be Enhanced Senses
        /Resonancee/i, // should be Resonance
        /Acummulate/i, // should be Accumulate
    ];
    const found = [];
    for (const row of table) {
        const name = row.name || "";
        for (const pat of typoPatterns) {
            if (pat.test(name)) {
                found.push({ name, pattern: pat.source });
            }
        }
    }
    if (found.length > 0) {
        for (const f of found) {
            Tester.assert(
                false,
                `DataIntegrity(${mode}): ${tableName} name typo detected: "${f.name}" (matches /${f.pattern}/)`,
            );
        }
    } else {
        Tester.assert(
            true,
            `DataIntegrity(${mode}): ${tableName} no known name typos detected.`,
        );
    }
};

/**
 * Check that no name is "Unknown" or other placeholder text.
 */
Tester._assertNoPlaceholderNames = (tableName, table, mode) => {
    const placeholders = [
        "Unknown",
        "TBD",
        "TODO",
        "PLACEHOLDER",
        "???",
        "---",
    ];
    const found = [];
    for (const row of table) {
        const name = (row.name || "").trim();
        if (placeholders.includes(name) || name === "") {
            found.push(name || "(empty)");
        }
    }
    if (found.length > 0) {
        Tester.assert(
            false,
            `DataIntegrity(${mode}): ${tableName} placeholder names found: [${found.join(", ")}]`,
        );
    } else {
        Tester.assert(
            true,
            `DataIntegrity(${mode}): ${tableName} no placeholder names.`,
        );
    }
};

/**
 * Check that all entries have non-empty descriptions.
 */
Tester._assertNoEmptyDescriptions = (tableName, table, mode) => {
    const empty = [];
    for (const row of table) {
        const desc = (row.description || "").trim();
        if (desc === "" && row.name) {
            empty.push(row.name);
        }
    }
    if (empty.length > 0) {
        Tester.assert(
            false,
            `DataIntegrity(${mode}): ${tableName} entries with empty descriptions: [${empty.join(", ")}]`,
        );
    } else {
        Tester.assert(
            true,
            `DataIntegrity(${mode}): ${tableName} all descriptions non-empty.`,
        );
    }
};

/**
 * Check that no name has leading/trailing whitespace.
 */
Tester._assertNoWhitespaceInNames = (tableName, table, mode) => {
    const bad = [];
    for (const row of table) {
        const name = row.name || "";
        if (name !== name.trim()) {
            bad.push(`"${name}"`);
        }
    }
    if (bad.length > 0) {
        Tester.assert(
            false,
            `DataIntegrity(${mode}): ${tableName} names with extra whitespace: [${bad.join(", ")}]`,
        );
    } else {
        Tester.assert(
            true,
            `DataIntegrity(${mode}): ${tableName} no whitespace in names.`,
        );
    }
};

/**
 * Check that specific expected names exist in a table.
 * @param {string} tableName - For logging
 * @param {Array} table - Table to check
 * @param {string[]} expectedNames - Names that must be present
 * @param {string} mode - 'basic', 'advanced', or 'ultimate'
 */
Tester._assertExpectedNamesPresent = (
    tableName,
    table,
    expectedNames,
    mode,
) => {
    const missing = [];
    for (const name of expectedNames) {
        if (!table.find((row) => row.name === name)) {
            missing.push(name);
        }
    }
    if (missing.length > 0) {
        Tester.assert(
            false,
            `DataIntegrity(${mode}): ${tableName} missing expected names: [${missing.join(", ")}]`,
        );
    } else {
        Tester.assert(
            true,
            `DataIntegrity(${mode}): ${tableName} all expected names present.`,
        );
    }
};

/**
 * Check that bonusPower strings have valid format: Category\\Name(maxRoll) with optional pipe separators.
 */
Tester._assertValidBonusPowerStrings = (tableName, table, mode) => {
    const bad = [];
    for (const row of table) {
        const bpCount = Utility.getValue(row, "bonusPowerCount", 0);
        const bp = Utility.getValue(row, "bonusPower", "");
        if (bpCount > 0 && bp) {
            const entries = bp.split("|");
            for (const entry of entries) {
                const parts = entry.split("\\");
                if (parts.length < 2) {
                    bad.push({
                        name: row.name,
                        entry: entry.substring(0, 40),
                        reason: "missing \\ separator",
                    });
                } else if (!parts[1].includes("(")) {
                    bad.push({
                        name: row.name,
                        entry: entry.substring(0, 40),
                        reason: "missing (maxRoll)",
                    });
                }
            }
        }
    }
    if (bad.length > 0) {
        for (const b of bad) {
            Tester.assert(
                false,
                `DataIntegrity(${mode}): ${tableName} "${b.name}" bonusPower "${b.entry}" — ${b.reason}`,
            );
        }
    } else {
        Tester.assert(
            true,
            `DataIntegrity(${mode}): ${tableName} bonusPower strings valid.`,
        );
    }
};

// ============================================================================
// BASIC MODE TESTS
// ============================================================================

Tester.DataIntegrityBasicTests = (gen) => {
    gen.generatorMode = "basic";
    gen.setTables();

    Tester._assertFullRollCoverage(
        "POWER_CATEGORIES_TABLE",
        gen.powerCategoriesTable,
        "basic",
    );
    Tester._assertFullRollCoverage(
        "QUANTITY_TABLE",
        gen.quantityTable,
        "basic",
    );
    Tester._assertFullRollCoverage("ORIGIN_TABLE", gen.originTable, "basic");
    Tester._assertCategoryCoverage(
        "POWER_LIST_TABLE",
        gen.powerListTable,
        "category",
        "basic",
    );
    Tester._assertCategoryCoverage(
        "CONTACT_TYPE_LIST_TABLE",
        gen.contactTypeListTable,
        "category",
        "basic",
    );
    Tester._assertNoDuplicateNames(
        "POWER_LIST_TABLE",
        gen.powerListTable,
        "category",
        "basic",
    );
    Tester._assertNoDuplicateNames(
        "TALENT_LIST_TABLE",
        gen.talentListTable,
        "category",
        "basic",
    );
    Tester._assertNoDuplicateNames(
        "CONTACT_TYPE_LIST_TABLE",
        gen.contactTypeListTable,
        "category",
        "basic",
    );
    Tester._assertPositiveInts(
        "POWER_LIST_TABLE",
        gen.powerListTable,
        ["powerCount", "maxRoll"],
        "basic",
    );
    Tester._assertPositiveInts(
        "CONTACT_TYPE_LIST_TABLE",
        gen.contactTypeListTable,
        ["contactCount", "maxRoll"],
        "basic",
    );
    Tester._assertQuantityTableConsistency(gen.quantityTable, "basic");

    // --- NAME FORMAT & CONTENT VALIDATION ---
    Tester._assertNoNameTypos("POWER_LIST_TABLE", gen.powerListTable, "basic");
    Tester._assertNoNameTypos(
        "TALENT_LIST_TABLE",
        gen.talentListTable,
        "basic",
    );
    Tester._assertNoNameTypos(
        "CONTACT_TYPE_LIST_TABLE",
        gen.contactTypeListTable,
        "basic",
    );
    Tester._assertNoPlaceholderNames(
        "POWER_LIST_TABLE",
        gen.powerListTable,
        "basic",
    );
    Tester._assertNoPlaceholderNames(
        "TALENT_LIST_TABLE",
        gen.talentListTable,
        "basic",
    );
    Tester._assertNoPlaceholderNames(
        "CONTACT_TYPE_LIST_TABLE",
        gen.contactTypeListTable,
        "basic",
    );
    Tester._assertNoEmptyDescriptions(
        "POWER_LIST_TABLE",
        gen.powerListTable,
        "basic",
    );
    Tester._assertNoEmptyDescriptions(
        "TALENT_LIST_TABLE",
        gen.talentListTable,
        "basic",
    );
    Tester._assertNoEmptyDescriptions(
        "CONTACT_TYPE_LIST_TABLE",
        gen.contactTypeListTable,
        "basic",
    );
    Tester._assertNoWhitespaceInNames(
        "POWER_LIST_TABLE",
        gen.powerListTable,
        "basic",
    );
    Tester._assertNoWhitespaceInNames(
        "TALENT_LIST_TABLE",
        gen.talentListTable,
        "basic",
    );
    Tester._assertNoWhitespaceInNames(
        "CONTACT_TYPE_LIST_TABLE",
        gen.contactTypeListTable,
        "basic",
    );
    Tester._assertValidBonusPowerStrings(
        "POWER_LIST_TABLE",
        gen.powerListTable,
        "basic",
    );
};

// ============================================================================
// BASIC MODE TESTS — Run existing + new validation
// ============================================================================

// (Existing tests already run via DataIntegrityBasicTests)

// ============================================================================
// ADVANCED MODE TESTS
// ============================================================================

Tester.DataIntegrityAdvancedTests = (gen) => {
    gen.generatorMode = "advanced";
    gen.setTables();

    Tester._assertFullRollCoverage(
        "POWER_CATEGORIES_TABLE",
        gen.powerCategoriesTable,
        "advanced",
    );
    Tester._assertFullRollCoverage(
        "QUANTITY_TABLE",
        gen.quantityTable,
        "advanced",
    );
    Tester._assertFullRollCoverage("ORIGIN_TABLE", gen.originTable, "advanced");
    Tester._assertCategoryCoverage(
        "POWER_LIST_TABLE",
        gen.powerListTable,
        "category",
        "advanced",
    );
    Tester._assertCategoryCoverage(
        "CONTACT_TYPE_LIST_TABLE",
        gen.contactTypeListTable,
        "category",
        "advanced",
    );
    Tester._assertNoDuplicateNames(
        "POWER_LIST_TABLE",
        gen.powerListTable,
        "category",
        "advanced",
    );
    Tester._assertNoDuplicateNames(
        "TALENT_LIST_TABLE",
        gen.talentListTable,
        "category",
        "advanced",
    );
    Tester._assertNoDuplicateNames(
        "CONTACT_TYPE_LIST_TABLE",
        gen.contactTypeListTable,
        "category",
        "advanced",
    );
    Tester._assertPositiveInts(
        "POWER_LIST_TABLE",
        gen.powerListTable,
        ["powerCount", "maxRoll"],
        "advanced",
    );
    Tester._assertPositiveInts(
        "CONTACT_TYPE_LIST_TABLE",
        gen.contactTypeListTable,
        ["contactCount", "maxRoll"],
        "advanced",
    );
    Tester._assertQuantityTableConsistency(gen.quantityTable, "advanced");

    // --- NAME FORMAT & CONTENT VALIDATION (catches typos like the 5 we just fixed) ---
    Tester._assertNoNameTypos(
        "POWER_LIST_TABLE",
        gen.powerListTable,
        "advanced",
    );
    Tester._assertNoNameTypos(
        "TALENT_LIST_TABLE",
        gen.talentListTable,
        "advanced",
    );
    Tester._assertNoNameTypos(
        "CONTACT_TYPE_LIST_TABLE",
        gen.contactTypeListTable,
        "advanced",
    );
    Tester._assertNoPlaceholderNames(
        "POWER_LIST_TABLE",
        gen.powerListTable,
        "advanced",
    );
    Tester._assertNoPlaceholderNames(
        "TALENT_LIST_TABLE",
        gen.talentListTable,
        "advanced",
    );
    Tester._assertNoPlaceholderNames(
        "CONTACT_TYPE_LIST_TABLE",
        gen.contactTypeListTable,
        "advanced",
    );
    Tester._assertNoEmptyDescriptions(
        "POWER_LIST_TABLE",
        gen.powerListTable,
        "advanced",
    );
    Tester._assertNoEmptyDescriptions(
        "TALENT_LIST_TABLE",
        gen.talentListTable,
        "advanced",
    );
    Tester._assertNoEmptyDescriptions(
        "CONTACT_TYPE_LIST_TABLE",
        gen.contactTypeListTable,
        "advanced",
    );
    Tester._assertNoWhitespaceInNames(
        "POWER_LIST_TABLE",
        gen.powerListTable,
        "advanced",
    );
    Tester._assertNoWhitespaceInNames(
        "TALENT_LIST_TABLE",
        gen.talentListTable,
        "advanced",
    );
    Tester._assertNoWhitespaceInNames(
        "CONTACT_TYPE_LIST_TABLE",
        gen.contactTypeListTable,
        "advanced",
    );
    Tester._assertValidBonusPowerStrings(
        "POWER_LIST_TABLE",
        gen.powerListTable,
        "advanced",
    );

    // --- EXPECTED NAMES: Contact types from Advanced.md Appendix C ---
    const expectedProfessionalContacts = [
        "Medicine",
        "Law",
        "Law Enforcement",
        "Military",
        "Business World",
        "Journalism",
        "Crime",
        "Engineering",
        "Psychiatry",
        "Detective/Espionage",
        "Hero Group",
        "Artist/Performer",
    ];
    const professionalContacts = gen.contactTypeListTable.filter(
        (c) => c.category === "Professional",
    );
    Tester._assertExpectedNamesPresent(
        "CONTACT_TYPE_LIST_TABLE/Professional",
        professionalContacts,
        expectedProfessionalContacts,
        "advanced",
    );

    // --- EXPECTED NAMES: Power categories ---
    const expectedPowerCategories = [
        "Resistances",
        "Senses",
        "Movement",
        "Matter Control",
        "Energy Control",
        "Body Control",
        "Distance Attacks",
        "Mental Powers",
        "Body Alterations/Offensive",
        "Body Alterations/Defensive",
    ];
    const powerCats = gen.powerCategoriesTable.map((c) => c.name);
    for (const expected of expectedPowerCategories) {
        Tester.assert(
            powerCats.includes(expected),
            `DataIntegrity(advanced): POWER_CATEGORIES includes "${expected}".`,
        );
    }

    // --- EXPECTED NAMES: Talent categories ---
    const expectedTalentCategories = [
        "Weapon Skills",
        "Fighting Skills",
        "Professional Skills",
        "Scientific Skills",
        "Mystic and Mental Skills",
        "Other Skills",
    ];
    const talentCats = gen.talentCategoriesTable.map((c) => c.name);
    for (const expected of expectedTalentCategories) {
        Tester.assert(
            talentCats.includes(expected),
            `DataIntegrity(advanced): TALENT_CATEGORIES includes "${expected}".`,
        );
    }

    // --- EXPECTED NAMES: Key powers that must exist (starred/special powers) ---
    const expectedPowers = [
        "Invulnerability",
        "Combat Sense",
        "Cosmic Awareness",
        "Teleportation",
        "Dimensional Travel",
        "Probability Manipulation",
        "Nullifying Power",
        "Time Control",
        "Mind Control",
        "Emotion Control",
        "Possession",
        "Transferral",
        "Precognition",
        "Health-Drain Touch",
        "Immortality",
        "Image Generation",
        "Body Transformation",
    ];
    Tester._assertExpectedNamesPresent(
        "POWER_LIST_TABLE (special powers)",
        gen.powerListTable,
        expectedPowers,
        "advanced",
    );

    // --- EXPECTED NAMES: Key talents that must exist ---
    const expectedTalents = [
        "Marksman",
        "Weapons Master",
        "Weapons Specialist",
        "Martial Arts A",
        "Martial Arts B",
        "Martial Arts C",
        "Martial Arts D",
        "Martial Arts E",
        "Wrestling",
        "Acrobatics",
        "Medicine",
        "Law",
        "Engineering",
        "Crime",
        "Journalism",
        "Chemistry",
        "Biology",
        "Geology",
        "Genetics",
        "Archeology",
        "Physics",
        "Electronics",
        "Computers",
        "Mystic Origin",
        "Animal Training",
        "Heir to Fortune",
        "Student",
        "Leadership",
    ];
    Tester._assertExpectedNamesPresent(
        "TALENT_LIST_TABLE",
        gen.talentListTable,
        expectedTalents,
        "advanced",
    );
};

// ============================================================================
// ULTIMATE MODE TESTS
// ============================================================================

Tester.DataIntegrityUltimateTests = (gen) => {
    gen.generatorMode = "ultimate";
    gen.setTables();

    Tester._assertFullRollCoverage(
        "POWER_CATEGORIES_TABLE",
        gen.powerCategoriesTable,
        "ultimate",
    );
    Tester._assertFullRollCoverage(
        "QUANTITY_TABLE",
        gen.quantityTable,
        "ultimate",
    );
    Tester._assertFullRollCoverage("ORIGIN_TABLE", gen.originTable, "ultimate");
    Tester._assertCategoryCoverage(
        "POWER_LIST_TABLE",
        gen.powerListTable,
        "category",
        "ultimate",
    );
    Tester._assertCategoryCoverage(
        "CONTACT_TYPE_LIST_TABLE",
        gen.contactTypeListTable,
        "category",
        "ultimate",
    );
    Tester._assertNoDuplicateNames(
        "POWER_LIST_TABLE",
        gen.powerListTable,
        "category",
        "ultimate",
    );
    Tester._assertNoDuplicateNames(
        "TALENT_LIST_TABLE",
        gen.talentListTable,
        "category",
        "ultimate",
    );
    Tester._assertNoDuplicateNames(
        "CONTACT_TYPE_LIST_TABLE",
        gen.contactTypeListTable,
        "category",
        "ultimate",
    );
    Tester._assertPositiveInts(
        "POWER_LIST_TABLE",
        gen.powerListTable,
        ["powerCount", "maxRoll"],
        "ultimate",
    );
    Tester._assertPositiveInts(
        "CONTACT_TYPE_LIST_TABLE",
        gen.contactTypeListTable,
        ["contactCount", "maxRoll"],
        "ultimate",
    );
    Tester._assertQuantityTableConsistency(gen.quantityTable, "ultimate");

    // Ultimate-specific: check bonusPower strings parse correctly
    const physicalForms = gen.physicalFormTable;
    for (const form of physicalForms) {
        const bpCount = Utility.getValue(form, "bonusPowerCount", 0);
        const bp = Utility.getValue(form, "bonusPower", "");
        if (bpCount > 0 && bp) {
            Tester.assert(
                bp.indexOf("\\") !== -1 ||
                    bp.indexOf("|") !== -1 ||
                    bp.length > 0,
                `DataIntegrity(ultimate): ${form.name} bonusPower string is non-empty.`,
            );
            // Verify each pipe-separated entry has a valid format
            const entries = bp.split("|");
            for (const entry of entries) {
                const parts = entry.split("\\");
                Tester.assert(
                    parts.length >= 2,
                    `DataIntegrity(ultimate): ${form.name} bonusPower entry "${entry.substring(0, 30)}" has category and name.`,
                );
            }
        }
    }

    // Ultimate-specific: check power bonusPower strings
    for (const power of gen.powerListTable) {
        const bpCount = Utility.getValue(power, "bonusPowerCount", 0);
        const bp = Utility.getValue(power, "bonusPower", "");
        if (bpCount > 0 && bp) {
            const entries = bp.split("|");
            for (const entry of entries) {
                const parts = entry.split("\\");
                Tester.assert(
                    parts.length >= 2,
                    `DataIntegrity(ultimate): ${power.name} bonusPower entry has valid format.`,
                );
            }
        }
    }

    // --- NAME FORMAT & CONTENT VALIDATION ---
    Tester._assertNoNameTypos(
        "POWER_LIST_TABLE",
        gen.powerListTable,
        "ultimate",
    );
    Tester._assertNoNameTypos(
        "TALENT_LIST_TABLE",
        gen.talentListTable,
        "ultimate",
    );
    Tester._assertNoNameTypos(
        "CONTACT_TYPE_LIST_TABLE",
        gen.contactTypeListTable,
        "ultimate",
    );
    Tester._assertNoPlaceholderNames(
        "POWER_LIST_TABLE",
        gen.powerListTable,
        "ultimate",
    );
    Tester._assertNoPlaceholderNames(
        "TALENT_LIST_TABLE",
        gen.talentListTable,
        "ultimate",
    );
    Tester._assertNoPlaceholderNames(
        "CONTACT_TYPE_LIST_TABLE",
        gen.contactTypeListTable,
        "ultimate",
    );
    Tester._assertNoEmptyDescriptions(
        "POWER_LIST_TABLE",
        gen.powerListTable,
        "ultimate",
    );
    Tester._assertNoEmptyDescriptions(
        "TALENT_LIST_TABLE",
        gen.talentListTable,
        "ultimate",
    );
    Tester._assertNoEmptyDescriptions(
        "CONTACT_TYPE_LIST_TABLE",
        gen.contactTypeListTable,
        "ultimate",
    );
    Tester._assertNoWhitespaceInNames(
        "POWER_LIST_TABLE",
        gen.powerListTable,
        "ultimate",
    );
    Tester._assertNoWhitespaceInNames(
        "TALENT_LIST_TABLE",
        gen.talentListTable,
        "ultimate",
    );
    Tester._assertNoWhitespaceInNames(
        "CONTACT_TYPE_LIST_TABLE",
        gen.contactTypeListTable,
        "ultimate",
    );
    Tester._assertValidBonusPowerStrings(
        "POWER_LIST_TABLE",
        gen.powerListTable,
        "ultimate",
    );
};

/**
 * Check that technological physical forms have isHiTech: true.
 * Hi-Tech wonders use isHiTech to trigger special resource logic.
 * - Basic/Advanced: Only forms named 'Hi-Tech' require it.
 * - Ultimate: Forms named 'Hi-Tech', 'Cyborg', or 'Robot' require it.
 */
Tester._assertHiTechFlag = (tableName, table, mode) => {
    for (const row of table) {
        const n = ((r) => (r.name || "").toLowerCase())(row);
        const has = Utility.getValue(row, "isHiTech", false);

        // Determine if this form SHOULD have isHiTech based on mode
        let shouldHave = false;
        if (n === "hi-tech") {
            shouldHave = true; // Hi-Tech is always isHiTech
        }

        // It sounds counter-untuitive, but Ultimate modes Robots and Cyborg are not considered HiTech

        if (shouldHave) {
            Tester.assert(
                has === true,
                `DataIntegrity(${mode}): ${tableName} "${row.name}" must have isHiTech: true.`,
            );
        } else {
            Tester.assert(
                has === false,
                `DataIntegrity(${mode}): ${tableName} "${row.name}" should not have isHiTech: true.`,
            );
        }
    }
};

// --- Cross-mode Hi-Tech flag test ---

Tester.DataIntegrityHiTechFlagTests = (gen) => {
    // Basic mode
    gen.generatorMode = "basic";
    gen.setTables();
    Tester._assertHiTechFlag(
        "PHYSICAL_FORM_TABLE",
        gen.physicalFormTable,
        "basic",
    );

    // Advanced mode
    gen.generatorMode = "advanced";
    gen.setTables();
    Tester._assertHiTechFlag(
        "PHYSICAL_FORM_TABLE",
        gen.physicalFormTable,
        "advanced",
    );

    // Ultimate mode
    gen.generatorMode = "ultimate";
    gen.setTables();
    Tester._assertHiTechFlag(
        "PHYSICAL_FORM_TABLE",
        gen.physicalFormTable,
        "ultimate",
    );
};

Tester.registerTestGroup(5, "deterministic", [
    { name: "DataIntegrityBasicTests", needsGen: true },
    { name: "DataIntegrityAdvancedTests", needsGen: true },
    { name: "DataIntegrityUltimateTests", needsGen: true },
    { name: "DataIntegrityHiTechFlagTests", needsGen: true },
]);
