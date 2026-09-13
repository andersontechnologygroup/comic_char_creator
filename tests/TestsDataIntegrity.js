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
    const row = table.find(r => i <= r.maxRoll);
    if (!row) missing.push(i);
  }
  Tester.assert(missing.length === 0,
    `DataIntegrity(${mode}): ${tableName} covers all rolls 1-100. Missing: [${missing.join(',')}]`);
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
      Tester.assert(false,
        `DataIntegrity(${mode}): ${tableName} overlap — maxRoll ${row.maxRoll} <= previous ${prev} (name: ${row.name || row.rank})`);
      return;
    }
    prev = row.maxRoll;
  }
  Tester.assert(true,
    `DataIntegrity(${mode}): ${tableName} no overlaps.`);
};

/**
 * Check that all entries in a category table cover rolls 1-100 per category.
 */
Tester._assertCategoryCoverage = (tableName, table, categoryField, mode) => {
  const categories = {};
  table.forEach(row => {
    const cat = row[categoryField];
    if (!cat) return;
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(row);
  });
  for (const [cat, entries] of Object.entries(categories)) {
    let prev = 0;
    for (const e of entries) {
      if (e.maxRoll <= prev) {
        Tester.assert(false,
          `DataIntegrity(${mode}): ${tableName}/${cat} overlap — maxRoll ${e.maxRoll} <= ${prev} (${e.name})`);
        return;
      }
      prev = e.maxRoll;
    }
    if (prev < 100) {
      Tester.assert(false,
        `DataIntegrity(${mode}): ${tableName}/${cat} incomplete — last maxRoll ${prev} < 100`);
      return;
    }
  }
  Tester.assert(true,
    `DataIntegrity(${mode}): ${tableName} category coverage OK.`);
};

/**
 * Check that all entries within a category have unique names.
 */
Tester._assertNoDuplicateNames = (tableName, table, categoryField, mode) => {
  const byCategory = {};
  table.forEach(row => {
    const cat = row[categoryField] || '_none_';
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(row.name);
  });
  for (const [cat, names] of Object.entries(byCategory)) {
    const seen = {};
    for (const n of names) {
      if (seen[n]) {
        Tester.assert(false,
          `DataIntegrity(${mode}): ${tableName}/${cat} duplicate name: "${n}"`);
        return;
      }
      seen[n] = true;
    }
  }
  Tester.assert(true,
    `DataIntegrity(${mode}): ${tableName} no duplicate names.`);
};

/**
 * Check that numeric attributes are positive integers where expected.
 */
Tester._assertPositiveInts = (tableName, table, attrs, mode) => {
  for (const attr of attrs) {
    for (const row of table) {
      if (row[attr] !== undefined) {
        const val = row[attr];
        if (typeof val !== 'number' || val < 0 || !Number.isInteger(val)) {
          Tester.assert(false,
            `DataIntegrity(${mode}): ${tableName}.${attr} on "${row.name}" is ${val} (expected positive integer)`);
          return;
        }
      }
    }
  }
  Tester.assert(true,
    `DataIntegrity(${mode}): ${tableName} numeric attributes OK.`);
};

/**
 * Check QUANTITY_TABLE: powers/talents/contacts initial <= maximum.
 */
Tester._assertQuantityTableConsistency = (table, mode) => {
  for (const row of table) {
    for (const key of ['powers', 'talents', 'contacts']) {
      const q = row[key];
      if (q.initial > q.maximum) {
        Tester.assert(false,
          `DataIntegrity(${mode}): QUANTITY_TABLE maxRoll ${row.maxRoll} — ${key}.initial (${q.initial}) > maximum (${q.maximum})`);
        return;
      }
    }
  }
  Tester.assert(true,
    `DataIntegrity(${mode}): QUANTITY_TABLE consistency OK.`);
};

// ============================================================================
// BASIC MODE TESTS
// ============================================================================

Tester.DataIntegrityBasicTests = (gen) => {
  gen.generatorMode = 'basic';
  gen.setTables();

  Tester._assertFullRollCoverage('POWER_CATEGORIES_TABLE', gen.powerCategoriesTable, 'basic');
  Tester._assertFullRollCoverage('QUANTITY_TABLE', gen.quantityTable, 'basic');
  Tester._assertFullRollCoverage('ORIGIN_TABLE', gen.originTable, 'basic');
  Tester._assertCategoryCoverage('POWER_LIST_TABLE', gen.powerListTable, 'category', 'basic');
  Tester._assertCategoryCoverage('CONTACT_TYPE_LIST_TABLE', gen.contactTypeListTable, 'category', 'basic');
  Tester._assertNoDuplicateNames('POWER_LIST_TABLE', gen.powerListTable, 'category', 'basic');
  Tester._assertNoDuplicateNames('TALENT_LIST_TABLE', gen.talentListTable, 'category', 'basic');
  Tester._assertNoDuplicateNames('CONTACT_TYPE_LIST_TABLE', gen.contactTypeListTable, 'category', 'basic');
  Tester._assertPositiveInts('POWER_LIST_TABLE', gen.powerListTable, ['powerCount', 'maxRoll'], 'basic');
  Tester._assertPositiveInts('CONTACT_TYPE_LIST_TABLE', gen.contactTypeListTable, ['contactCount', 'maxRoll'], 'basic');
  Tester._assertQuantityTableConsistency(gen.quantityTable, 'basic');
};

// ============================================================================
// ADVANCED MODE TESTS
// ============================================================================

Tester.DataIntegrityAdvancedTests = (gen) => {
  gen.generatorMode = 'advanced';
  gen.setTables();

  Tester._assertFullRollCoverage('POWER_CATEGORIES_TABLE', gen.powerCategoriesTable, 'advanced');
  Tester._assertFullRollCoverage('QUANTITY_TABLE', gen.quantityTable, 'advanced');
  Tester._assertFullRollCoverage('ORIGIN_TABLE', gen.originTable, 'advanced');
  Tester._assertCategoryCoverage('POWER_LIST_TABLE', gen.powerListTable, 'category', 'advanced');
  Tester._assertCategoryCoverage('CONTACT_TYPE_LIST_TABLE', gen.contactTypeListTable, 'category', 'advanced');
  Tester._assertNoDuplicateNames('POWER_LIST_TABLE', gen.powerListTable, 'category', 'advanced');
  Tester._assertNoDuplicateNames('TALENT_LIST_TABLE', gen.talentListTable, 'category', 'advanced');
  Tester._assertNoDuplicateNames('CONTACT_TYPE_LIST_TABLE', gen.contactTypeListTable, 'category', 'advanced');
  Tester._assertPositiveInts('POWER_LIST_TABLE', gen.powerListTable, ['powerCount', 'maxRoll'], 'advanced');
  Tester._assertPositiveInts('CONTACT_TYPE_LIST_TABLE', gen.contactTypeListTable, ['contactCount', 'maxRoll'], 'advanced');
  Tester._assertQuantityTableConsistency(gen.quantityTable, 'advanced');
};

// ============================================================================
// ULTIMATE MODE TESTS
// ============================================================================

Tester.DataIntegrityUltimateTests = (gen) => {
  gen.generatorMode = 'ultimate';
  gen.setTables();

  Tester._assertFullRollCoverage('POWER_CATEGORIES_TABLE', gen.powerCategoriesTable, 'ultimate');
  Tester._assertFullRollCoverage('QUANTITY_TABLE', gen.quantityTable, 'ultimate');
  Tester._assertFullRollCoverage('ORIGIN_TABLE', gen.originTable, 'ultimate');
  Tester._assertCategoryCoverage('POWER_LIST_TABLE', gen.powerListTable, 'category', 'ultimate');
  Tester._assertCategoryCoverage('CONTACT_TYPE_LIST_TABLE', gen.contactTypeListTable, 'category', 'ultimate');
  Tester._assertNoDuplicateNames('POWER_LIST_TABLE', gen.powerListTable, 'category', 'ultimate');
  Tester._assertNoDuplicateNames('TALENT_LIST_TABLE', gen.talentListTable, 'category', 'ultimate');
  Tester._assertNoDuplicateNames('CONTACT_TYPE_LIST_TABLE', gen.contactTypeListTable, 'category', 'ultimate');
  Tester._assertPositiveInts('POWER_LIST_TABLE', gen.powerListTable, ['powerCount', 'maxRoll'], 'ultimate');
  Tester._assertPositiveInts('CONTACT_TYPE_LIST_TABLE', gen.contactTypeListTable, ['contactCount', 'maxRoll'], 'ultimate');
  Tester._assertQuantityTableConsistency(gen.quantityTable, 'ultimate');

  // Ultimate-specific: check bonusPower strings parse correctly
  const physicalForms = gen.physicalFormTable;
  for (const form of physicalForms) {
    const bpCount = Utility.getValue(form, 'bonusPowerCount', 0);
    const bp = Utility.getValue(form, 'bonusPower', '');
    if (bpCount > 0 && bp) {
      Tester.assert(bp.indexOf('\\') !== -1 || bp.indexOf('|') !== -1 || bp.length > 0,
        `DataIntegrity(ultimate): ${form.name} bonusPower string is non-empty.`);
      // Verify each pipe-separated entry has a valid format
      const entries = bp.split('|');
      for (const entry of entries) {
        const parts = entry.split('\\');
        Tester.assert(parts.length >= 2,
          `DataIntegrity(ultimate): ${form.name} bonusPower entry "${entry.substring(0, 30)}" has category and name.`);
      }
    }
  }

  // Ultimate-specific: check power bonusPower strings
  for (const power of gen.powerListTable) {
    const bpCount = Utility.getValue(power, 'bonusPowerCount', 0);
    const bp = Utility.getValue(power, 'bonusPower', '');
    if (bpCount > 0 && bp) {
      const entries = bp.split('|');
      for (const entry of entries) {
        const parts = entry.split('\\');
        Tester.assert(parts.length >= 2,
          `DataIntegrity(ultimate): ${power.name} bonusPower entry has valid format.`);
      }
    }
  }
};

Tester.registerTestGroup(5, 'deterministic', [
  { name: 'DataIntegrityBasicTests', needsGen: true },
  { name: 'DataIntegrityAdvancedTests', needsGen: true },
  { name: 'DataIntegrityUltimateTests', needsGen: true },
]);
