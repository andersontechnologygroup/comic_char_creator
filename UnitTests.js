// K2 to collapse
class Tester {
  failureCount = 0;
  assertCount = 0;

  static assert(condition, message) {
    const line = this.getLineNumber();

    const area = document.getElementById('test-area');
    const div = document.createElement('div');
    div.id = condition ? "pass" : "failure";
    div.className = "test-output " + (condition ? "pass" : "fail");
    div.innerText = `${condition ? "PASS" : "FAIL"}: (${line}) ${message}`;
    this.failureCount += condition ? 0 : 1;
    area.appendChild(div);
    this.assertCount++;
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
    area.appendChild(div);
    this.assertCount++;
  }

  static assertGreaterOrEqual(expectedValue, actualValue, message) {
    const line = this.getLineNumber();
    const area = document.getElementById('test-area');
    const div = document.createElement('div');
    const condition = expectedValue <= actualValue;
    div.id = condition ? "pass" : "failure";
    div.className = "test-output " + (condition ? "pass" : "fail");
    div.innerText = `${condition ? "PASS" : "FAIL"}: (${line}) ${message} Expected: ${expectedValue} (or more), Actual: ${actualValue}`;
    this.failureCount += condition ? 0 : 1;
    area.appendChild(div);
    this.assertCount++;
  }

  static start() {
    console.log("%cTESTING TESTING TESTING", "color: red; font-size: 24px");
  }

  static end() {
    console.log("%cDONE DONE DONE", "color: green; font-size: 24px");
  }

  static getLineNumber() {
    return (new Error).stack.split("\n")[3].split(":")[2];
  }

  static UtilityTests(gen) {
    let testRoll = 51;
    let testColumn = 1; // Mutants
    let foundRank = Utility.findRow(gen, testRoll, testColumn).rank;
    this.assertEquals("Excellent", foundRank, `findRank(${testRoll}, ${testColumn}) should return "Excellent"`);

    testColumn = 2; // Humans
    foundRank = Utility.findRow(gen, testRoll, testColumn).rank;
    this.assertEquals("Typical", foundRank, `findRank(${testRoll}, ${testColumn}) should return "Typical"`);

    testColumn = 3; // Hi Tech
    foundRank = Utility.findRow(gen, testRoll, testColumn).rank;
    this.assertEquals("Good", foundRank, `findRank(${testRoll}, ${testColumn}) should return "Good"`);

    testColumn = 4; // Robots
    foundRank = Utility.findRow(gen, testRoll, testColumn).rank;
    this.assertEquals("Remarkable", foundRank, `findRank(${testRoll}, ${testColumn}) should return "Remarkable"`);

    testColumn = 5; // Aliens
    foundRank = Utility.findRow(gen, testRoll, testColumn).rank;
    this.assertEquals("Excellent", foundRank, `findRank(${testRoll}, ${testColumn}) should return "Excellent"`);

    testRoll = 95;
    testColumn = 1;
    foundRank = Utility.findRow(gen, testRoll, testColumn).rank;
    this.assertEquals("Incredible", foundRank, `findRank(${testRoll}, ${testColumn}) should return "Incredible"`);

    testColumn = 2;
    foundRank = Utility.findRow(gen, testRoll, testColumn).rank;
    this.assertEquals("Good", foundRank, `findRank(${testRoll}, ${testColumn}) should return "Good"`);

    testColumn = 3;
    foundRank = Utility.findRow(gen, testRoll, testColumn).rank;
    this.assertEquals("Excellent", foundRank, `findRank(${testRoll}, ${testColumn}) should return "Excellent"`);

    testColumn = 4;
    foundRank = Utility.findRow(gen, testRoll, testColumn).rank;
    this.assertEquals("Amazing", foundRank, `findRank(${testRoll}, ${testColumn}) should return "Amazing"`);

    testColumn = 5;
    foundRank = Utility.findRow(gen, testRoll, testColumn).rank;
    this.assertEquals("Amazing", foundRank, `findRank(${testRoll}, ${testColumn}) should return "Amazing"`);
  }

  static GeneratorTests() {
    this.GeneratorGenericPhysicalFormTests();
    this.GeneratorAdvancedPhysicalFormTests();
    this.GeneratorUltimatePhysicalFormTests();
    this.GeneratorCompoundTests();
    this.GeneratorBonusContactTest();
  }

  static GeneratorGenericPhysicalFormTests() {
    const gen = new CharacterGenerator();
    const char = new Character();
    gen.generatorMode = "generic";
    gen.setTables();

    gen.physicalFormRoll = 30;
    gen.determinePhysicalForm(char);
    this.assertEquals("Altered Human", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);
    this.assertEquals(1, gen.randomRanksColumn, `Random Ranks Column (Generic): Generated '${gen.randomRanksColumn}', which is correct.`);

    gen.physicalFormRoll = 60;
    gen.determinePhysicalForm(char);
    this.assertEquals("Mutant", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);
    this.assertEquals(1, gen.randomRanksColumn, `Random Ranks Column (Generic): Generated '${gen.randomRanksColumn}', which is correct.`);

    gen.physicalFormRoll = 90;
    gen.determinePhysicalForm(char);
    this.assertEquals("Hi-Tech", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);
    this.assertEquals(3, gen.randomRanksColumn, `Random Ranks Column (Generic): Generated '${gen.randomRanksColumn}', which is correct.`);

    gen.physicalFormRoll = 95;
    gen.determinePhysicalForm(char);
    this.assertEquals("Robot", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);
    this.assertEquals(4, gen.randomRanksColumn, `Random Ranks Column (Generic): Generated '${gen.randomRanksColumn}', which is correct.`);

    gen.physicalFormRoll = 100;
    gen.determinePhysicalForm(char);
    this.assertEquals("Alien", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);
    this.assertEquals(5, gen.randomRanksColumn, `Random Ranks Column (Generic): Generated '${gen.randomRanksColumn}', which is correct.`);
  }

  static GeneratorAdvancedPhysicalFormTests() {
    const gen = new CharacterGenerator();
    const char = new Character();
    gen.generatorMode = "advanced";
    gen.setTables();

    gen.physicalFormRoll = 30;
    gen.determinePhysicalForm(char);
    this.assertEquals("Altered Human", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);
    this.assertEquals(1, gen.randomRanksColumn, `Random Ranks Column (Generic): Generated '${gen.randomRanksColumn}', which is correct.`);

    gen.physicalFormRoll = 60;
    gen.determinePhysicalForm(char);
    this.assertEquals("Mutant", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);
    this.assertEquals(1, gen.randomRanksColumn, `Random Ranks Column (Generic): Generated '${gen.randomRanksColumn}', which is correct.`);

    gen.physicalFormRoll = 90;
    gen.determinePhysicalForm(char);
    this.assertEquals("Hi-Tech", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);
    this.assertEquals(3, gen.randomRanksColumn, `Random Ranks Column (Generic): Generated '${gen.randomRanksColumn}', which is correct.`);

    gen.physicalFormRoll = 95;
    gen.determinePhysicalForm(char);
    this.assertEquals("Robot", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);
    this.assertEquals(4, gen.randomRanksColumn, `Random Ranks Column (Generic): Generated '${gen.randomRanksColumn}', which is correct.`);

    gen.physicalFormRoll = 100;
    gen.determinePhysicalForm(char);
    this.assertEquals("Alien", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);
    this.assertEquals(5, gen.randomRanksColumn, `Random Ranks Column (Generic): Generated '${gen.randomRanksColumn}', which is correct.`);
  }

  static GeneratorUltimatePhysicalFormTests() {
    const gen = new CharacterGenerator();
    const char = new Character();
    gen.generatorMode = "ultimate";
    gen.setTables();

    gen.physicalFormRoll = 25;
    gen.determinePhysicalForm(char);
    this.assertEquals("Normal Human", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 30;
    gen.determinePhysicalForm(char);
    this.assertEquals("Mutant - Induced", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 33;
    gen.determinePhysicalForm(char);
    this.assertEquals("Mutant - Random", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 35;
    gen.determinePhysicalForm(char);
    this.assertEquals("Mutant - Breed", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 38;
    gen.determinePhysicalForm(char);
    this.assertEquals("Android", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 46;
    gen.determinePhysicalForm(char);
    this.assertEquals("Humanoid Race", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 47;
    gen.determinePhysicalForm(char);
    this.assertEquals("Surgical Composite", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 49;
    gen.determinePhysicalForm(char);
    this.assertEquals("Modified Human - Organic", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 51;
    gen.determinePhysicalForm(char);
    this.assertEquals("Modified Human - Muscular", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 53;
    gen.determinePhysicalForm(char);
    this.assertEquals("Modified Human - Skeletal", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 57;
    gen.determinePhysicalForm(char);
    this.assertEquals("Modified Human - Extra Parts", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 58;
    gen.determinePhysicalForm(char);
    this.assertEquals("Demihuman - Centaur", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 59;
    gen.determinePhysicalForm(char);
    this.assertEquals("Demihuman - Equiman", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 60;
    gen.determinePhysicalForm(char);
    this.assertEquals("Demihuman - Faun", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 62;
    gen.determinePhysicalForm(char);
    this.assertEquals("Demihuman - Felinoid", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 64;
    gen.determinePhysicalForm(char);
    this.assertEquals("Demihuman - Lupinoid", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 65;
    gen.determinePhysicalForm(char);
    this.assertEquals("Demihuman - Avian (Angelic)", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 66;
    gen.determinePhysicalForm(char);
    this.assertEquals("Demihuman - Avian (Harpie)", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 67;
    gen.determinePhysicalForm(char);
    this.assertEquals("Demihuman - Chiropteran", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 68;
    gen.determinePhysicalForm(char);
    this.assertEquals("Demihuman - Lamian", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 69;
    gen.determinePhysicalForm(char);
    this.assertEquals("Demihuman - Merhuman", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 70;
    gen.determinePhysicalForm(char);
    this.assertEquals("Demihuman - Other", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 72;
    gen.determinePhysicalForm(char);
    this.assertEquals("Cyborg - Artificial limbs/organs", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 74;
    gen.determinePhysicalForm(char);
    this.assertEquals("Cyborg - Exoskeleton", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 76;
    gen.determinePhysicalForm(char);
    this.assertEquals("Cyborg - Mechanical Body", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 79;
    gen.determinePhysicalForm(char);
    this.assertEquals("Cyborg - Mechanically Augmented", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 82;
    gen.determinePhysicalForm(char);
    this.assertEquals("Robot - human shape", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 84;
    gen.determinePhysicalForm(char);
    this.assertEquals("Robot - Usuform", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 86;
    gen.determinePhysicalForm(char);
    this.assertEquals("Robot - Metamorphic", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 87;
    gen.determinePhysicalForm(char);
    this.assertEquals("Robot - Computer", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 88;
    gen.determinePhysicalForm(char);
    this.assertEquals("Angel/Demon", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 89;
    gen.determinePhysicalForm(char);
    this.assertEquals("Deity", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 90;
    gen.determinePhysicalForm(char);
    this.assertEquals("Animal", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 91;
    gen.determinePhysicalForm(char);
    this.assertEquals("Vegetable", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 92;
    gen.determinePhysicalForm(char);
    this.assertEquals("Abnormal Chemistry", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 93;
    gen.determinePhysicalForm(char);
    this.assertEquals("Mineral", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 94;
    gen.determinePhysicalForm(char);
    this.assertEquals("Gaseous", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 95;
    gen.determinePhysicalForm(char);
    this.assertEquals("Liquid", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 96;
    gen.determinePhysicalForm(char);
    this.assertEquals("Energy", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 97;
    gen.determinePhysicalForm(char);
    this.assertEquals("Ethereal", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 98;
    gen.determinePhysicalForm(char);
    this.assertEquals("Undead", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 99;
    gen.determinePhysicalForm(char);
    this.assertEquals("Compound", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

    gen.physicalFormRoll = 100;
    gen.determinePhysicalForm(char);
    this.assertEquals("Changeling", char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);
  }

  static GeneratorCompoundTests() {
    const gen = new CharacterGenerator();
    const char = new Character();
    gen.generatorMode = "ultimate";
    gen.setTables();

    gen.physicalFormRoll = 99;
    gen.combinationsRoll = 50;
    gen.compoundRandomRanksColumnRoll = 35
    gen.bodyTypeRolls = [1, 33, 86, 87, 93];

    gen.determinePhysicalForm(char);
    this.assertEquals("Compound", char.physicalForm, `Physical Form Roll (Ultimate): Generated '${char.physicalForm}'.`);
    this.assertEquals(2, char.bodyTypes.length, `Body Type Roll (Ultimate): Generated '${char.bodyTypes.length}'.`);
    this.assertEquals("Normal Human", char.bodyTypes[0], `Body Type Roll (Ultimate): Generated '${char.bodyTypes[0]}'.`);
    this.assertEquals("Mutant - Random", char.bodyTypes[1], `Body Type Roll (Ultimate): Generated '${char.bodyTypes[1]}'.`);
    this.assertEquals(2, gen.randomRanksColumn, `Random Ranks Column Roll (Ultimate): Generated '${char.randomRanksColumn}'.`);

    const gen2 = new CharacterGenerator();
    const char2 = new Character();
    gen2.generatorMode = "ultimate";
    gen2.setTables();

    gen2.physicalFormRoll = 99;
    gen2.combinationsRoll = 50;
    gen.compoundRandomRanksColumnRoll = 35
    gen2.bodyTypeRolls = [1, 99, 33, 86, 87];

    gen2.determinePhysicalForm(char2);
    this.assertEquals("Compound", char2.physicalForm, `Physical Form Roll (Ultimate): Generated '${char2.physicalForm}'.`);
    this.assertEquals(2, char2.bodyTypes.length, `Body Type Roll (Ultimate): Generated '${char2.bodyTypes.length}'.`);
    this.assertEquals("Normal Human", char2.bodyTypes[0], `Body Type Roll (Ultimate): Generated '${char2.bodyTypes[0]}'.`);
    this.assertEquals("Mutant - Random", char2.bodyTypes[1], `Body Type Roll (Ultimate): Generated '${char2.bodyTypes[1]}'.`);
    this.assertEquals(2, gen2.randomRanksColumn, `Random Ranks Column Roll (Ultimate): Generated '${char.randomRanksColumn}'.`);
    const gen3 = new CharacterGenerator();
    const char3 = new Character();
    gen3.generatorMode = "ultimate";
    gen3.setTables();

    gen3.physicalFormRoll = 99;
    gen3.combinationsRoll = 75;
    gen.compoundRandomRanksColumnRoll = 35
    gen3.bodyTypeRolls = [1, 33, 86, 87];

    gen3.determinePhysicalForm(char3);
    this.assertEquals("Compound", char3.physicalForm, `Physical Form Roll (Ultimate): Generated '${char3.physicalForm}'.`);
    this.assertEquals(3, char3.bodyTypes.length, `Body Type Roll (Ultimate): Generated '${char3.bodyTypes.length}'.`);
    this.assertEquals("Normal Human", char3.bodyTypes[0], `Body Type Roll (Ultimate): Generated '${char3.bodyTypes[0]}'.`);
    this.assertEquals("Mutant - Random", char3.bodyTypes[1], `Body Type Roll (Ultimate): Generated '${char3.bodyTypes[1]}'.`);
    this.assertEquals("Robot - Metamorphic", char3.bodyTypes[2], `Body Type Roll (Ultimate): Generated '${char3.bodyTypes[2]}'.`);
    this.assertEquals(2, gen3.randomRanksColumn, `Random Ranks Column Roll (Ultimate): Generated '${char.randomRanksColumn}'.`);
  }

  static GeneratorBonusContactTest() {
    const gen = new CharacterGenerator();

    gen.generatorMode = 'ultimate';
    gen.throwAllRolls();

    gen.physicalFormRoll = 35;

    let char = gen.generateWithoutThrows();

    this.assertEquals("Mutant - Breed", char.physicalForm, `Physical Form: Generated '${char.physicalForm}'.`);
    this.assertGreaterOrEqual(1, char.contacts.length, `Contact Count (Ultimate): Generated '${char.contacts.length}'.`);
    this.assertEquals("Tribe", char.contacts[0].name, `Contact (Ultimate): Generated '${char.contacts[0].name}'.`);
  }

  static OriginTests(gen) {
    this.OriginGenericTests(gen);
    this.OriginAdvancedTests(gen);
    this.OriginUltimateTests(gen);
  }

  static OriginGenericTests(gen) {
    const validOrigins = ORIGIN_TABLE.map(n => n.name);
    const charOrigin = new Character();

    gen.generatorMode = 'generic';
    gen.setTables();

    gen.originRoll = 25;
    gen.determineOrigin(charOrigin);
    this.assert(validOrigins.includes(charOrigin.origin),
      `Origin Roll: Generated '${charOrigin.origin}' is a valid origin type.`);
    this.assert(charOrigin.origin == "Altered Human",
      `Origin Roll: Generated '${charOrigin.origin}', which is correct.`);

    gen.originRoll = 50;
    gen.determineOrigin(charOrigin);
    this.assert(validOrigins.includes(charOrigin.origin),
      `Origin Roll: Generated '${charOrigin.origin}' is a valid origin type.`);
    this.assert(charOrigin.origin == "Mutant",
      `Origin Roll: Generated '${charOrigin.origin}', which is correct.`);

    gen.originRoll = 75;
    gen.determineOrigin(charOrigin);
    this.assert(validOrigins.includes(charOrigin.origin),
      `Origin Roll: Generated '${charOrigin.origin}' is a valid origin type.`);
    this.assert(charOrigin.origin == "Hi-Tech",
      `Origin Roll: Generated '${charOrigin.origin}', which is correct.`);

    gen.originRoll = 95;
    gen.determineOrigin(charOrigin);
    this.assert(validOrigins.includes(charOrigin.origin),
      `Origin Roll: Generated '${charOrigin.origin}' is a valid origin type.`);
    this.assert(charOrigin.origin == "Robot",
      `Origin Roll: Generated '${charOrigin.origin}', which is correct.`);

    gen.originRoll = 99;
    gen.determineOrigin(charOrigin);
    this.assert(validOrigins.includes(charOrigin.origin),
      `Origin Roll: Generated '${charOrigin.origin}' is a valid origin type.`);
    this.assert(charOrigin.origin == "Alien",
      `Origin Roll: Generated '${charOrigin.origin}', which is correct.`);
  }

  static OriginAdvancedTests(gen) {
    const validOrigins = ORIGIN_ADVANCED_TABLE.map(n => n.name);
    const charOrigin = new Character();

    gen.generatorMode = 'advanced';
    gen.setTables();

    gen.originRoll = 25;
    gen.determineOrigin(charOrigin);
    this.assert(validOrigins.includes(charOrigin.origin),
      `Origin Roll: Generated '${charOrigin.origin}' is a valid origin type.`);
    this.assert(charOrigin.origin == "Altered Human",
      `Origin Roll: Generated '${charOrigin.origin}', which is correct.`);

    gen.originRoll = 50;
    gen.determineOrigin(charOrigin);
    this.assert(validOrigins.includes(charOrigin.origin),
      `Origin Roll: Generated '${charOrigin.origin}' is a valid origin type.`);
    this.assert(charOrigin.origin == "Mutant",
      `Origin Roll: Generated '${charOrigin.origin}', which is correct.`);

    gen.originRoll = 75;
    gen.determineOrigin(charOrigin);
    this.assert(validOrigins.includes(charOrigin.origin),
      `Origin Roll: Generated '${charOrigin.origin}' is a valid origin type.`);
    this.assert(charOrigin.origin == "Hi-Tech",
      `Origin Roll: Generated '${charOrigin.origin}', which is correct.`);

    gen.originRoll = 95;
    gen.determineOrigin(charOrigin);
    this.assert(validOrigins.includes(charOrigin.origin),
      `Origin Roll: Generated '${charOrigin.origin}' is a valid origin type.`);
    this.assert(charOrigin.origin == "Robot",
      `Origin Roll: Generated '${charOrigin.origin}', which is correct.`);

    gen.originRoll = 99;
    gen.determineOrigin(charOrigin);
    this.assert(validOrigins.includes(charOrigin.origin),
      `Origin Roll: Generated '${charOrigin.origin}' is a valid origin type.`);
    this.assert(charOrigin.origin == "Alien",
      `Origin Roll: Generated '${charOrigin.origin}', which is correct.`);
  }

  static OriginUltimateTests(gen) {
    const validOrigins = ORIGIN_ULTIMATE_TABLE.map(n => n.name);
    const charOrigin = new Character();

    gen.generatorMode = 'ultimate';
    gen.setTables();

    gen.originRoll = 10;
    gen.determineOrigin(charOrigin);
    this.assert(validOrigins.includes(charOrigin.origin),
      `Origin Roll: Generated '${charOrigin.origin}' is a valid origin type.`);
    this.assertEquals("Natal", charOrigin.origin,
      `Origin Roll: Generated '${charOrigin.origin}', which is correct.`);

    gen.originRoll = 20;
    gen.determineOrigin(charOrigin);
    this.assert(validOrigins.includes(charOrigin.origin),
      `Origin Roll: Generated '${charOrigin.origin}' is a valid origin type.`);
    this.assertEquals("Maturity", charOrigin.origin,
      `Origin Roll: Generated '${charOrigin.origin}', which is correct.`);

    gen.originRoll = 30;
    gen.determineOrigin(charOrigin);
    this.assert(validOrigins.includes(charOrigin.origin),
      `Origin Roll: Generated '${charOrigin.origin}' is a valid origin type.`);
    this.assertEquals("Self-Achievement", charOrigin.origin,
      `Origin Roll: Generated '${charOrigin.origin}', which is correct.`);

    gen.originRoll = 35;
    gen.determineOrigin(charOrigin);
    this.assert(validOrigins.includes(charOrigin.origin),
      `Origin Roll: Generated '${charOrigin.origin}' is a valid origin type.`);
    this.assertEquals("Endowment", charOrigin.origin,
      `Origin Roll: Generated '${charOrigin.origin}', which is correct.`);

    gen.originRoll = 50;
    gen.determineOrigin(charOrigin);
    this.assert(validOrigins.includes(charOrigin.origin),
      `Origin Roll: Generated '${charOrigin.origin}' is a valid origin type.`);
    this.assertEquals("Technical Mishap", charOrigin.origin,
      `Origin Roll: Generated '${charOrigin.origin}', which is correct.`);

    gen.originRoll = 60;
    gen.determineOrigin(charOrigin);
    this.assert(validOrigins.includes(charOrigin.origin),
      `Origin Roll: Generated '${charOrigin.origin}' is a valid origin type.`);
    this.assertEquals("Technical Procedure", charOrigin.origin,
      `Origin Roll: Generated '${charOrigin.origin}', which is correct.`);

    gen.originRoll = 65;
    gen.determineOrigin(charOrigin);
    this.assert(validOrigins.includes(charOrigin.origin),
      `Origin Roll: Generated '${charOrigin.origin}' is a valid origin type.`);
    this.assertEquals("Creation", charOrigin.origin,
      `Origin Roll: Generated '${charOrigin.origin}', which is correct.`);

    gen.originRoll = 76;
    gen.determineOrigin(charOrigin);
    this.assert(validOrigins.includes(charOrigin.origin),
      `Origin Roll: Generated '${charOrigin.origin}' is a valid origin type.`);
    this.assertEquals("Biological Exposure", charOrigin.origin,
      `Origin Roll: Generated '${charOrigin.origin}', which is correct.`);

    gen.originRoll = 87;
    gen.determineOrigin(charOrigin);
    this.assert(validOrigins.includes(charOrigin.origin),
      `Origin Roll: Generated '${charOrigin.origin}' is a valid origin type.`);
    this.assertEquals("Chemical Exposure", charOrigin.origin,
      `Origin Roll: Generated '${charOrigin.origin}', which is correct.`);

    gen.originRoll = 98;
    gen.determineOrigin(charOrigin);
    this.assert(validOrigins.includes(charOrigin.origin),
      `Origin Roll: Generated '${charOrigin.origin}' is a valid origin type.`);
    this.assertEquals("Energy Exposure", charOrigin.origin,
      `Origin Roll: Generated '${charOrigin.origin}', which is correct.`);

    gen.originRoll = 100;
    gen.determineOrigin(charOrigin);
    this.assert(validOrigins.includes(charOrigin.origin),
      `Origin Roll: Generated '${charOrigin.origin}' is a valid origin type.`);
    this.assertEquals("Rebirth", charOrigin.origin,
      `Origin Roll: Generated '${charOrigin.origin}', which is correct.`);
  }

  static PrimaryAbilityGenericTests(gen) {
    gen.generatorMode = 'generic';
    gen.setTables();

    const charStats = new Character();
    charStats.physicalForm = "Altered Human";
    charStats.origin = "Altered Human";

    gen.randomRanksColumn = 1;
    gen.physicalAbilityRolls[0]["Fighting"] = 70;
    gen.physicalAbilityRolls[0]["Agility"] = 60;
    gen.physicalAbilityRolls[0]["Strength"] = 50;
    gen.physicalAbilityRolls[0]["Endurance"] = 40;
    gen.mentalAbilityRolls["Reason"] = 30;
    gen.mentalAbilityRolls["Intuition"] = 20;
    gen.mentalAbilityRolls["Psyche"] = 10;

    gen.determinePrimaryAbilities(charStats);

    let allStatsValid = true;
    PHYSICAL_ABILITIES.forEach(stat => {
      const rank = charStats.primaryAbilities[0][stat].rank;
      const num = charStats.primaryAbilities[0][stat].number;

      if (num < 2 || num > 50 || rank === "") allStatsValid = false;
    });
    MENTAL_ABILITIES.forEach(stat => {
      const rank = charStats.primaryAbilities[0][stat].rank;
      const num = charStats.primaryAbilities[0][stat].number;

      if (num < 2 || num > 50 || rank === "") allStatsValid = false;
    });
    this.assert(allStatsValid,
      `Primary Ability Rolls: All 7 FASERIP stats generated with valid ranks and numbers.`);

    let rank = charStats.primaryAbilities[0]["Fighting"].rank;
    let num = charStats.primaryAbilities[0]["Fighting"].number;
    this.assertEquals("Remarkable", rank, `Primary Ability Rolls: Fighting generated with valid rank.`);
    this.assertEquals(26, num, `Primary Ability Rolls: Fighting generated with valid number.`);

    rank = charStats.primaryAbilities[0]["Agility"].rank;
    num = charStats.primaryAbilities[0]["Agility"].number;
    this.assertEquals("Excellent", rank, `Primary Ability Rolls: Agility generated with valid rank.`);
    this.assertEquals(16, num, `Primary Ability Rolls: Agility generated with valid number.`);

    rank = charStats.primaryAbilities[0]["Strength"].rank;
    num = charStats.primaryAbilities[0]["Strength"].number;
    this.assertEquals("Excellent", rank, `Primary Ability Rolls: Strength generated with valid rank.`);
    this.assertEquals(16, num, `Primary Ability Rolls: Strength generated with valid number.`);

    rank = charStats.primaryAbilities[0]["Endurance"].rank;
    num = charStats.primaryAbilities[0]["Endurance"].number;
    this.assertEquals("Good", rank, `Primary Ability Rolls: Endurance generated with valid rank.`);
    this.assertEquals(8, num, `Primary Ability Rolls: Endurance generated with valid number.`);

    rank = charStats.primaryAbilities[0]["Reason"].rank;
    num = charStats.primaryAbilities[0]["Reason"].number;
    this.assertEquals("Good", rank, `Primary Ability Rolls: Reason generated with valid rank.`);
    this.assertEquals(8, num, `Primary Ability Rolls: Reason generated with valid number.`);

    rank = charStats.primaryAbilities[0]["Intuition"].rank;
    num = charStats.primaryAbilities[0]["Intuition"].number;
    this.assertEquals("Typical", rank, `Primary Ability Rolls: Intuition generated with valid rank.`);
    this.assertEquals(5, num, `Primary Ability Rolls: Intuition generated with valid number.`);

    rank = charStats.primaryAbilities[0]["Psyche"].rank;
    num = charStats.primaryAbilities[0]["Psyche"].number;
    this.assertEquals("Poor", rank, `Primary Ability Rolls: Psyche generated with valid rank.`);
    this.assertEquals(3, num, `Primary Ability Rolls: Psyche generated with valid number.`);
  }

  static PrimaryAbilityAdvancedTests(gen) {
    gen.generatorMode = 'advanced';
    gen.setTables();

    const charStats = new Character();
    // Mock origin column to 0 (Altered Human/Mutant) for consistent testing
    charStats.physicalForm = "Altered Human";
    charStats.origin = "Altered Human";
    charStats.randomRanksColumn = 2;

    gen.physicalAbilityRolls[0]["Fighting"] = 70;
    gen.physicalAbilityRolls[0]["Agility"] = 60;
    gen.physicalAbilityRolls[0]["Strength"] = 50;
    gen.physicalAbilityRolls[0]["Endurance"] = 40;
    gen.mentalAbilityRolls["Reason"] = 30;
    gen.mentalAbilityRolls["Intuition"] = 20;
    gen.mentalAbilityRolls["Psyche"] = 10;

    gen.determinePrimaryAbilities(charStats);

    let allStatsValid = true;
    PHYSICAL_ABILITIES.forEach(stat => {
      const rank = charStats.primaryAbilities[0][stat].rank;
      const num = charStats.primaryAbilities[0][stat].number;

      if (num < 2 || num > 50 || rank === "") allStatsValid = false;
    });
    MENTAL_ABILITIES.forEach(stat => {
      const rank = charStats.primaryAbilities[0][stat].rank;
      const num = charStats.primaryAbilities[0][stat].number;

      if (num < 2 || num > 50 || rank === "") allStatsValid = false;
    });
    this.assert(allStatsValid,
      `Primary Ability Rolls: All 7 FASERIP stats generated with valid ranks and numbers.`);

    let rank = charStats.primaryAbilities[0]["Fighting"].rank;
    let num = charStats.primaryAbilities[0]["Fighting"].number;
    this.assertEquals("Remarkable", rank, `Primary Ability Rolls: Fighting generated with valid rank.`);
    this.assertEquals(26, num, `Primary Ability Rolls: Fighting generated with valid number.`);

    rank = charStats.primaryAbilities[0]["Agility"].rank;
    num = charStats.primaryAbilities[0]["Agility"].number;
    this.assertEquals("Excellent", rank, `Primary Ability Rolls: Agility generated with valid rank.`);
    this.assertEquals(16, num, `Primary Ability Rolls: Agility generated with valid number.`);

    rank = charStats.primaryAbilities[0]["Strength"].rank;
    num = charStats.primaryAbilities[0]["Strength"].number;
    this.assertEquals("Excellent", rank, `Primary Ability Rolls: Strength generated with valid rank.`);
    this.assertEquals(16, num, `Primary Ability Rolls: Strength generated with valid number.`);

    rank = charStats.primaryAbilities[0]["Endurance"].rank;
    num = charStats.primaryAbilities[0]["Endurance"].number;
    this.assertEquals("Good", rank, `Primary Ability Rolls: Endurance generated with valid rank.`);
    this.assertEquals(8, num, `Primary Ability Rolls: Endurance generated with valid number.`);

    rank = charStats.primaryAbilities[0]["Reason"].rank;
    num = charStats.primaryAbilities[0]["Reason"].number;
    this.assertEquals("Good", rank, `Primary Ability Rolls: Reason generated with valid rank.`);
    this.assertEquals(8, num, `Primary Ability Rolls: Reason generated with valid number.`);

    rank = charStats.primaryAbilities[0]["Intuition"].rank;
    num = charStats.primaryAbilities[0]["Intuition"].number;
    this.assertEquals("Typical", rank, `Primary Ability Rolls: Intuition generated with valid rank.`);
    this.assertEquals(5, num, `Primary Ability Rolls: Intuition generated with valid number.`);

    rank = charStats.primaryAbilities[0]["Psyche"].rank;
    num = charStats.primaryAbilities[0]["Psyche"].number;
    this.assertEquals("Poor", rank, `Primary Ability Rolls: Psyche generated with valid rank.`);
    this.assertEquals(3, num, `Primary Ability Rolls: Psyche generated with valid number.`);
  }

  static PrimaryAbilityUltimateTests(gen) {
    gen.generatorMode = 'ultimate';
    gen.setTables();

    const charStats = new Character();
    // Mock origin column to 0 (Altered Human/Mutant) for consistent testing
    charStats.physicalForm = "Normal Human";
    charStats.origin = "Natal";
    charStats.randomRanksColumn = 1;

    gen.physicalAbilityRolls[0]["Fighting"] = 70;
    gen.physicalAbilityRolls[0]["Agility"] = 60;
    gen.physicalAbilityRolls[0]["Strength"] = 50;
    gen.physicalAbilityRolls[0]["Endurance"] = 40;
    gen.mentalAbilityRolls["Reason"] = 30;
    gen.mentalAbilityRolls["Intuition"] = 20;
    gen.mentalAbilityRolls["Psyche"] = 10;

    gen.determinePrimaryAbilities(charStats);

    let allStatsValid = true;
    PHYSICAL_ABILITIES.forEach(stat => {
      const rank = charStats.primaryAbilities[0][stat].rank;
      const num = charStats.primaryAbilities[0][stat].number;

      if (num < 2 || num > 50 || rank === "") allStatsValid = false;
    });
    MENTAL_ABILITIES.forEach(stat => {
      const rank = charStats.primaryAbilities[0][stat].rank;
      const num = charStats.primaryAbilities[0][stat].number;

      if (num < 2 || num > 50 || rank === "") allStatsValid = false;
    });
    this.assert(allStatsValid,
      `Primary Ability Rolls: All 7 FASERIP stats generated with valid ranks and numbers.`);

    let rank = charStats.primaryAbilities[0]["Fighting"].rank;
    let num = charStats.primaryAbilities[0]["Fighting"].number;
    this.assertEquals("Remarkable", rank, `Primary Ability Rolls: Fighting generated with valid rank.`);
    this.assertEquals(26, num, `Primary Ability Rolls: Fighting generated with valid number.`);

    rank = charStats.primaryAbilities[0]["Agility"].rank;
    num = charStats.primaryAbilities[0]["Agility"].number;
    this.assertEquals("Excellent", rank, `Primary Ability Rolls: Agility generated with valid rank.`);
    this.assertEquals(16, num, `Primary Ability Rolls: Agility generated with valid number.`);

    rank = charStats.primaryAbilities[0]["Strength"].rank;
    num = charStats.primaryAbilities[0]["Strength"].number;
    this.assertEquals("Excellent", rank, `Primary Ability Rolls: Strength generated with valid rank.`);
    this.assertEquals(16, num, `Primary Ability Rolls: Strength generated with valid number.`);

    rank = charStats.primaryAbilities[0]["Endurance"].rank;
    num = charStats.primaryAbilities[0]["Endurance"].number;
    this.assertEquals("Good", rank, `Primary Ability Rolls: Endurance generated with valid rank.`);
    this.assertEquals(8, num, `Primary Ability Rolls: Endurance generated with valid number.`);

    rank = charStats.primaryAbilities[0]["Reason"].rank;
    num = charStats.primaryAbilities[0]["Reason"].number;
    this.assertEquals("Good", rank, `Primary Ability Rolls: Reason generated with valid rank.`);
    this.assertEquals(8, num, `Primary Ability Rolls: Reason generated with valid number.`);

    rank = charStats.primaryAbilities[0]["Intuition"].rank;
    num = charStats.primaryAbilities[0]["Intuition"].number;
    this.assertEquals("Typical", rank, `Primary Ability Rolls: Intuition generated with valid rank.`);
    this.assertEquals(5, num, `Primary Ability Rolls: Intuition generated with valid number.`);

    rank = charStats.primaryAbilities[0]["Psyche"].rank;
    num = charStats.primaryAbilities[0]["Psyche"].number;
    this.assertEquals("Poor", rank, `Primary Ability Rolls: Psyche generated with valid rank.`);
    this.assertEquals(3, num, `Primary Ability Rolls: Psyche generated with valid number.`);
  }

  static PrimaryAbilityRobotMetamorphicUltimateTests(gen) {
    gen.generatorMode = 'ultimate';
    gen.setTables();

    const charStats = new Character();
    charStats.physicalForm = "Robot - Metamorphic";
    charStats.origin = "Robot - Metamorphic";
    charStats.randomRanksColumn = 4;

    gen.physicalAbilityRolls[0]["Fighting"] = 10;
    gen.physicalAbilityRolls[1]["Fighting"] = 100;
    gen.physicalAbilityRolls[0]["Agility"] = 90;
    gen.physicalAbilityRolls[1]["Agility"] = 80;
    gen.physicalAbilityRolls[0]["Strength"] = 70;
    gen.physicalAbilityRolls[1]["Strength"] = 60;
    gen.physicalAbilityRolls[0]["Endurance"] = 50;
    gen.physicalAbilityRolls[1]["Endurance"] = 40;
    gen.mentalAbilityRolls["Reason"] = 30;
    gen.mentalAbilityRolls["Intuition"] = 20;
    gen.mentalAbilityRolls["Psyche"] = 10;

    gen.determinePrimaryAbilities(charStats);

    let allStatsValid = true;
    PHYSICAL_ABILITIES.forEach(stat => {
      const rank = charStats.primaryAbilities[0][stat].rank;
      const num = charStats.primaryAbilities[0][stat].number;

      if (num < 2 || num > 50 || rank === "") allStatsValid = false;
    });
    MENTAL_ABILITIES.forEach(stat => {
      const rank = charStats.primaryAbilities[0][stat].rank;
      const num = charStats.primaryAbilities[0][stat].number;

      if (num < 2 || num > 50 || rank === "") allStatsValid = false;
    });
    this.assert(allStatsValid,
      `Primary Ability Rolls: All 7 FASERIP stats generated with valid ranks and numbers.`);

    allStatsValid = true;
    PHYSICAL_ABILITIES.forEach(stat => {
      const rank = charStats.primaryAbilities[1][stat].rank;
      const num = charStats.primaryAbilities[1][stat].number;

      if (num < 2 || num > 50 || rank === "") allStatsValid = false;
    });
    MENTAL_ABILITIES.forEach(stat => {
      const rank = charStats.primaryAbilities[0][stat].rank;
      const num = charStats.primaryAbilities[0][stat].number;

      if (num < 2 || num > 50 || rank === "") allStatsValid = false;
    });
    this.assert(allStatsValid,
      `Primary Ability Rolls: All 7 FASERIP stats generated with valid ranks and numbers.`);

    let rank = charStats.primaryAbilities[0]["Fighting"].rank;
    let num = charStats.primaryAbilities[0]["Fighting"].number;
    this.assertEquals("Poor", rank, `Primary Ability Rolls: Fighting generated with valid rank.`);
    this.assertEquals(3, num, `Primary Ability Rolls: Fighting generated with valid number.`);

    rank = charStats.primaryAbilities[0]["Agility"].rank;
    num = charStats.primaryAbilities[0]["Agility"].number;
    this.assertEquals("Incredible", rank, `Primary Ability Rolls: Agility generated with valid rank.`);
    this.assertEquals(36, num, `Primary Ability Rolls: Agility generated with valid number.`);

    rank = charStats.primaryAbilities[0]["Strength"].rank;
    num = charStats.primaryAbilities[0]["Strength"].number;
    this.assertEquals("Remarkable", rank, `Primary Ability Rolls: Strength generated with valid rank.`);
    this.assertEquals(26, num, `Primary Ability Rolls: Strength generated with valid number.`);

    rank = charStats.primaryAbilities[0]["Endurance"].rank;
    num = charStats.primaryAbilities[0]["Endurance"].number;
    this.assertEquals("Excellent", rank, `Primary Ability Rolls: Endurance generated with valid rank.`);
    this.assertEquals(16, num, `Primary Ability Rolls: Endurance generated with valid number.`);

    rank = charStats.primaryAbilities[1]["Fighting"].rank;
    num = charStats.primaryAbilities[1]["Fighting"].number;
    this.assertEquals("Amazing", rank, `Primary Ability Rolls: Fighting generated with valid rank.`);
    this.assertEquals(46, num, `Primary Ability Rolls: Fighting generated with valid number.`);

    rank = charStats.primaryAbilities[1]["Agility"].rank;
    num = charStats.primaryAbilities[1]["Agility"].number;
    this.assertEquals("Remarkable", rank, `Primary Ability Rolls: Agility generated with valid rank.`);
    this.assertEquals(26, num, `Primary Ability Rolls: Agility generated with valid number.`);

    rank = charStats.primaryAbilities[1]["Strength"].rank;
    num = charStats.primaryAbilities[1]["Strength"].number;
    this.assertEquals("Excellent", rank, `Primary Ability Rolls: Strength generated with valid rank.`);
    this.assertEquals(16, num, `Primary Ability Rolls: Strength generated with valid number.`);

    rank = charStats.primaryAbilities[1]["Endurance"].rank;
    num = charStats.primaryAbilities[1]["Endurance"].number;
    this.assertEquals("Good", rank, `Primary Ability Rolls: Endurance generated with valid rank.`);
    this.assertEquals(8, num, `Primary Ability Rolls: Endurance generated with valid number.`);

    // Only physical states have more than one.  So these wont change
    rank = charStats.primaryAbilities[0]["Reason"].rank;
    num = charStats.primaryAbilities[0]["Reason"].number;
    this.assertEquals("Good", rank, `Primary Ability Rolls: Reason generated with valid rank.`);
    this.assertEquals(8, num, `Primary Ability Rolls: Reason generated with valid number.`);

    rank = charStats.primaryAbilities[0]["Intuition"].rank;
    num = charStats.primaryAbilities[0]["Intuition"].number;
    this.assertEquals("Typical", rank, `Primary Ability Rolls: Intuition generated with valid rank.`);
    this.assertEquals(5, num, `Primary Ability Rolls: Intuition generated with valid number.`);

    rank = charStats.primaryAbilities[0]["Psyche"].rank;
    num = charStats.primaryAbilities[0]["Psyche"].number;
    this.assertEquals("Poor", rank, `Primary Ability Rolls: Psyche generated with valid rank.`);
    this.assertEquals(3, num, `Primary Ability Rolls: Psyche generated with valid number.`);
  }

  static PrimaryAbilityTests(gen) {
    this.PrimaryAbilityGenericTests(gen);
    this.PrimaryAbilityAdvancedTests(gen);
    this.PrimaryAbilityUltimateTests(gen);
    this.PrimaryAbilityRobotMetamorphicUltimateTests(gen);
  }

  static SecondaryAbilityGenericTests(gen) {
    gen.generatorMode = 'generic';
    gen.setTables();

    const charRes = new Character();
    charRes.physicalForm = "Altered Human";
    charRes.origin = "Altered Human";
    charRes.randomRanksColumn = 1;

    gen.resourceModifierRoll = 1;
    gen.determineResources(charRes);

    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Altered Human #1 as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Poor", charRes.resources.rank, `Resource Roll: Resources generated for Altered Human with valid rank.`);

    gen.resourceModifierRoll = 16;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Altered Human #1 as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Typical", charRes.resources.rank, `Resource Roll: Resources generated for Altered Human with valid rank.`);

    gen.resourceModifierRoll = 51;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Altered Human #1 as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Good", charRes.resources.rank, `Resource Roll: Resources generated for Altered Human with valid rank.`);

    gen.resourceModifierRoll = 71;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Altered Human #1 as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Excellent", charRes.resources.rank, `Resource Roll: Resources generated for Altered Human with valid rank.`);

    gen.resourceModifierRoll = 86;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Altered Human #1 as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Remarkable", charRes.resources.rank, `Resource Roll: Resources generated for Altered Human with valid rank.`);

    gen.resourceModifierRoll = 96;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Altered Human #1 as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Incredible", charRes.resources.rank, `Resource Roll: Resources generated for Altered Human with valid rank.`);

    charRes.physicalForm = "Alien";
    charRes.origin = "Alien";
    charRes.randomRanksColumn = 5;

    gen.resourceModifierRoll = 1;
    gen.determineResources(charRes);

    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Alien as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Feeble", charRes.resources.rank, `Resource Roll: Resources generated for Alien with valid rank.`);

    gen.resourceModifierRoll = 16;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Alien as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Poor", charRes.resources.rank, `Resource Roll: Resources generated for Alien with valid rank.`);

    gen.resourceModifierRoll = 51;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Alien as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Typical", charRes.resources.rank, `Resource Roll: Resources generated for Alien with valid rank.`);

    gen.resourceModifierRoll = 71;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Alien as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Good", charRes.resources.rank, `Resource Roll: Resources generated for Alien with valid rank.`);

    gen.resourceModifierRoll = 86;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Alien as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Excellent", charRes.resources.rank, `Resource Roll: Resources generated for Alien with valid rank.`);

    gen.resourceModifierRoll = 96;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Alien as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Remarkable", charRes.resources.rank, `Resource Roll: Resources generated for Alien with valid rank.`);

    charRes.origin = "Mutant";

    gen.resourceModifierRoll = 1;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Mutant as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Feeble", charRes.resources.rank, `Resource Roll: Resources generated for Mutant with valid rank.`);

    gen.resourceModifierRoll = 16;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Mutant as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Poor", charRes.resources.rank, `Resource Roll: Resources generated for Mutant with valid rank.`);

    gen.resourceModifierRoll = 51;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Mutant as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Typical", charRes.resources.rank, `Resource Roll: Resources generated for Mutant with valid rank.`);

    gen.resourceModifierRoll = 71;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Mutant as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Good", charRes.resources.rank, `Resource Roll: Resources generated for Mutant with valid rank.`);

    gen.resourceModifierRoll = 86;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Mutant as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Excellent", charRes.resources.rank, `Resource Roll: Resources generated for Mutant with valid rank.`);

    gen.resourceModifierRoll = 96;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Mutant as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Remarkable", charRes.resources.rank, `Resource Roll: Resources generated for Mutant with valid rank.`);

    // --- TEST POPULARITY CALCULATION ---
    const charPop = new Character();
    charPop.physicalForm = "Mutant";
    charPop.origin = "Mutant"; // Should force 0
    gen.determinePopularity(charPop);
    this.assertEquals(0, charPop.popularity,
      `Popularity Roll: Mutant correctly defaults to 0 Popularity.`);

    const charPop2 = new Character();
    charPop2.physicalForm = "Robot";
    charPop2.origin = "Robot"; // Should force 0
    gen.determinePopularity(charPop2);
    this.assertEquals(0, charPop2.popularity,
      `Popularity Roll: Robot correctly defaults to 0 Popularity.`);

    const charPop3 = new Character();
    charPop3.physicalForm = "Altered Human";
    charPop3.origin = "Altered Human"; // Should be 10 - 5 (Secret ID) = 5
    gen.determinePopularity(charPop3);
    this.assertEquals(5, charPop3.popularity,
      `Popularity Roll: Altered Human correctly calculated (Base 10 - Secret ID 5 = 5).`);
  }

  static SecondaryAbilityAdvancedTests(gen) {
    gen.generatorMode = 'advanced';
    gen.setTables();

    const charRes = new Character();
    charRes.physicalForm = "Altered Human";
    charRes.origin = "Altered Human";
    charRes.randomRanksColumn = 1;

    gen.resourceModifierRoll = 1;
    gen.determineResources(charRes);

    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Altered Human #1 as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Poor", charRes.resources.rank, `Resource Roll: Resources generated for Altered Human with valid rank.`);

    gen.resourceModifierRoll = 16;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Altered Human #1 as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Typical", charRes.resources.rank, `Resource Roll: Resources generated for Altered Human with valid rank.`);

    gen.resourceModifierRoll = 51;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Altered Human #1 as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Good", charRes.resources.rank, `Resource Roll: Resources generated for Altered Human with valid rank.`);

    gen.resourceModifierRoll = 71;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Altered Human #1 as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Excellent", charRes.resources.rank, `Resource Roll: Resources generated for Altered Human with valid rank.`);

    gen.resourceModifierRoll = 86;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Altered Human #1 as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Remarkable", charRes.resources.rank, `Resource Roll: Resources generated for Altered Human with valid rank.`);

    gen.resourceModifierRoll = 96;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Altered Human #1 as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Incredible", charRes.resources.rank, `Resource Roll: Resources generated for Altered Human with valid rank.`);

    charRes.physicalForm = "Alien";
    charRes.origin = "Alien";
    charRes.randomRanksColumn = 5;

    gen.resourceModifierRoll = 1;
    gen.determineResources(charRes);

    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Alien as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Feeble", charRes.resources.rank, `Resource Roll: Resources generated for Alien with valid rank.`);

    gen.resourceModifierRoll = 16;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Alien as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Poor", charRes.resources.rank, `Resource Roll: Resources generated for Alien with valid rank.`);

    gen.resourceModifierRoll = 51;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Alien as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Typical", charRes.resources.rank, `Resource Roll: Resources generated for Alien with valid rank.`);

    gen.resourceModifierRoll = 71;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Alien as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Good", charRes.resources.rank, `Resource Roll: Resources generated for Alien with valid rank.`);

    gen.resourceModifierRoll = 86;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Alien as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Excellent", charRes.resources.rank, `Resource Roll: Resources generated for Alien with valid rank.`);

    gen.resourceModifierRoll = 96;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Alien as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Remarkable", charRes.resources.rank, `Resource Roll: Resources generated for Alien with valid rank.`);

    charRes.origin = "Mutant";

    gen.resourceModifierRoll = 1;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Mutant as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Feeble", charRes.resources.rank, `Resource Roll: Resources generated for Mutant with valid rank.`);

    gen.resourceModifierRoll = 16;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Mutant as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Poor", charRes.resources.rank, `Resource Roll: Resources generated for Mutant with valid rank.`);

    gen.resourceModifierRoll = 51;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Mutant as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Typical", charRes.resources.rank, `Resource Roll: Resources generated for Mutant with valid rank.`);

    gen.resourceModifierRoll = 71;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Mutant as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Good", charRes.resources.rank, `Resource Roll: Resources generated for Mutant with valid rank.`);

    gen.resourceModifierRoll = 86;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Mutant as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Excellent", charRes.resources.rank, `Resource Roll: Resources generated for Mutant with valid rank.`);

    gen.resourceModifierRoll = 96;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Mutant as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Remarkable", charRes.resources.rank, `Resource Roll: Resources generated for Mutant with valid rank.`);

    // --- TEST POPULARITY CALCULATION ---
    const charPop = new Character();
    charPop.physicalForm = "Mutant";
    charPop.origin = "Mutant"; // Should force 0
    gen.determinePopularity(charPop);
    this.assertEquals(0, charPop.popularity,
      `Popularity Roll: Mutant correctly defaults to 0 Popularity.`);

    const charPop2 = new Character();
    charPop2.physicalForm = "Robot";
    charPop2.origin = "Robot"; // Should force 0
    gen.determinePopularity(charPop2);
    this.assertEquals(0, charPop2.popularity,
      `Popularity Roll: Robot correctly defaults to 0 Popularity.`);

    const charPop3 = new Character();
    charPop3.physicalForm = "Altered Human";
    charPop3.origin = "Altered Human"; // Should be 10 - 5 (Secret ID) = 5
    gen.determinePopularity(charPop3);
    this.assertEquals(5, charPop3.popularity,
      `Popularity Roll: Altered Human correctly calculated (Base 10 - Secret ID 5 = 5).`);
  }

  static SecondaryAbilityUltimateTests(gen) {
    gen.generatorMode = 'ultimate';
    gen.setTables();

    const charRes = new Character();
    charRes.physicalForm = "Normal Human";
    charRes.origin = "Normal Human";
    charRes.randomRanksColumn = 2;
    charRes.log = [];
    gen.resourceModifierRoll = 15;
    gen.determineResources(charRes);

    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Normal Human #1 as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Good", charRes.resources.rank, `Resource Roll: Resources generated for Normal Human with valid rank.`);

    gen.resourceModifierRoll = 50;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Normal Human #1 as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Excellent", charRes.resources.rank, `Resource Roll: Resources generated for Normal Human with valid rank.`);

    gen.resourceModifierRoll = 70;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Normal Human #1 as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Remarkable", charRes.resources.rank, `Resource Roll: Resources generated for Normal Human with valid rank.`);

    gen.resourceModifierRoll = 85;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Normal Human #1 as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Incredible", charRes.resources.rank, `Resource Roll: Resources generated for Normal Human with valid rank.`);

    gen.resourceModifierRoll = 95;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Normal Human #1 as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Amazing", charRes.resources.rank, `Resource Roll: Resources generated for Normal Human with valid rank.`);

    gen.resourceModifierRoll = 100;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for Normal Human #1 as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Monstrous", charRes.resources.rank, `Resource Roll: Resources generated for Normal Human with valid rank.`);

    charRes.physicalForm = "Mutant - Random";
    charRes.origin = "Mutant - Random";
    charRes.randomRanksColumn = 1;

    gen.resourceModifierRoll = 15;
    gen.determineResources(charRes);

    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for ${charRes.physicalForm} as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Feeble", charRes.resources.rank, `Resource Roll: Resources generated for ${charRes.physicalForm} with valid rank.`);

    gen.resourceModifierRoll = 50;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for ${charRes.physicalForm} as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Poor", charRes.resources.rank, `Resource Roll: Resources generated for ${charRes.physicalForm} with valid rank.`);

    gen.resourceModifierRoll = 70;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for ${charRes.physicalForm} as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Typical", charRes.resources.rank, `Resource Roll: Resources generated for ${charRes.physicalForm} with valid rank.`);

    gen.resourceModifierRoll = 85;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for ${charRes.physicalForm} as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Good", charRes.resources.rank, `Resource Roll: Resources generated for ${charRes.physicalForm} with valid rank.`);

    gen.resourceModifierRoll = 95;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for ${charRes.physicalForm} as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Excellent", charRes.resources.rank, `Resource Roll: Resources generated for ${charRes.physicalForm} with valid rank.`);

    gen.resourceModifierRoll = 100;
    gen.determineResources(charRes);
    this.assert(charRes.resources.number > 0 && charRes.resources.rank !== "",
      `Resource Roll: Resources generated for ${charRes.physicalForm} as '${charRes.resources.rank}' (${charRes.resources.number}).`);
    this.assertEquals("Remarkable", charRes.resources.rank, `Resource Roll: Resources generated for ${charRes.physicalForm} with valid rank.`);

    // --- TEST POPULARITY CALCULATION ---
    const charPop = new Character();
    charPop.physicalForm = "Normal Human";
    charPop.origin = "Normal Human";

    gen.throwAllRolls();
    gen.physicalFormRoll = 1;
    gen.originRoll = 1;

    gen.identitySecret = true;
    gen.resourceModifierRoll = 10;
    gen.popularityRoll = 10;
    gen.randomRanksColumn = 1;
    gen.determinePopularity(charPop);
    this.assertEquals(0, charPop.popularity,
      `Popularity Roll: Normal Human (Secret) correctly calculated.`);

    const charPopNS = new Character();
    charPop.physicalForm = "Normal Human";
    charPop.origin = "Normal Human";

    gen.identitySecret = false;
    gen.determinePopularity(charPop);
    this.assertEquals(13, charPop.popularity,
      `Popularity Roll: Normal Human (Public) correctly calculated.`);

    const charPop2 = new Character();
    charPop2.physicalForm = "Android";
    charPop2.origin = "Android";

    gen.identitySecret = true;
    gen.randomRanksColumn = 4;
    gen.popularityRoll = 10;
    gen.determinePopularity(charPop2);
    this.assertEquals(0, charPop2.popularity,
      `Popularity Roll: Android (Secret) correctly calculated.`);

    const charPop3 = new Character();
    charPop3.physicalForm = "Android";
    charPop3.origin = "Android";

    gen.identitySecret = false;
    gen.randomRanksColumn = 4;
    gen.determinePopularity(charPop3);
    this.assertEquals(11, charPop3.popularity,
      `Popularity Roll: Android (Public) correctly calculated.`);

    const charPop4 = new Character();
    charPop4.physicalForm = "Surgical Composite";
    charPop4.origin = "Surgical Composite";

    gen.identitySecret = true;
    gen.randomRanksColumn = 2;
    gen.popularityRoll = 10;
    gen.determinePopularity(charPop4);
    this.assertEquals(0, charPop4.popularity,
      `Popularity Roll: Surgical Composite (Secret) correctly calculated.`);

    const charPop5 = new Character();
    charPop5.physicalForm = "Surgical Composite";
    charPop5.origin = "Surgical Composite";

    gen.identitySecret = false;
    gen.randomRanksColumn = 2;
    gen.determinePopularity(charPop5);
    this.assertEquals(13, charPop5.popularity,
      `Popularity Roll: Surgical Composite (Public) correctly calculated.`);

    const charPop6 = new Character();
    charPop6.physicalForm = "Demihuman - Chiropteran";
    charPop6.origin = "Demihuman - Chiropteran";

    gen.identitySecret = true;
    gen.randomRanksColumn = 2;
    gen.popularityRoll = 10;
    gen.determinePopularity(charPop6);
    this.assertEquals(0, charPop6.popularity,
      `Popularity Roll: Demihuman - Chiropteran (Secret) correctly calculated.`);

    const charPop7 = new Character();
    charPop7.physicalForm = "Demihuman - Chiropteran";
    charPop7.origin = "Demihuman - Chiropteran";

    gen.identitySecret = false;
    gen.randomRanksColumn = 2;
    gen.determinePopularity(charPop7);
    this.assertEquals(13, charPop7.popularity,
      `Popularity Roll: Demihuman - Chiropteran (Public) correctly calculated.`);

    const charPop8 = new Character();
    charPop8.physicalForm = "Angel/Demon";
    charPop8.subType = "Angel";
    charPop8.origin = "Angel/Demon";

    gen.identitySecret = true;
    gen.randomRanksColumn = 5;
    gen.popularityRoll = 10;
    gen.determinePopularity(charPop8);
    this.assertEquals(0, charPop8.popularity,
      `Popularity Roll: Angel (Secret) correctly calculated.`);

    const charPop9 = new Character();
    charPop9.physicalForm = "Angel/Demon";
    charPop9.subType = "Angel";
    charPop9.origin = "Angel/Demon";

    gen.identitySecret = false;
    gen.randomRanksColumn = 5;
    gen.determinePopularity(charPop9);
    this.assertEquals(15, charPop9.popularity,
      `Popularity Roll: Angel (Public) correctly calculated.`);

    const charPop10 = new Character();
    charPop10.physicalForm = "Angel/Demon";
    charPop10.subType = "Demon";
    charPop10.origin = "Angel/Demon";

    gen.identitySecret = true;
    gen.randomRanksColumn = 5;
    gen.popularityRoll = 10;
    gen.determinePopularity(charPop10);
    this.assertEquals(0, charPop10.popularity,
      `Popularity Roll: Demon (Secret) correctly calculated.`);

    const charPop11 = new Character();
    charPop11.physicalForm = "Angel/Demon";
    charPop11.subType = "Demon";
    charPop11.origin = "Angel/Demon";

    gen.randomRanksColumn = 5;
    gen.identitySecret = false;
    gen.determinePopularity(charPop11);
    this.assertEquals(11, charPop11.popularity,
      `Popularity Roll: Demon (Public) correctly calculated.`);

    // *****************************************
    // Test health
    // *****************************************
    gen.throwAllRolls();
    gen.physicalAbilityRolls[0]["Fighting"] = 1;
    gen.physicalAbilityRolls[0]["Agility"] = 1;
    gen.physicalAbilityRolls[0]["Strength"] = 1;
    gen.physicalAbilityRolls[0]["Endurance"] = 1;
    gen.determinePrimaryAbilities(charPop11);
    charPop11.calculateSecondary();
    gen.determineHealth(charPop11);

    this.assertEquals(charPop11.health, charPop11.getAbilityNumber("Fighting") +
      charPop11.getAbilityNumber("Agility") +
      charPop11.getAbilityNumber("Strength") +
      charPop11.getAbilityNumber("Endurance"), "Testing Health Calculation.");

    // *****************************************
    // Test health adjustment
    // *****************************************
    const charPop12 = new Character();
    charPop12.physicalForm = "Mineral";
    charPop12.origin = "Mineral";

    gen.physicalAbilityRolls[0]["Fighting"] = 1;
    gen.physicalAbilityRolls[0]["Agility"] = 1;
    gen.physicalAbilityRolls[0]["Strength"] = 1;
    gen.physicalAbilityRolls[0]["Endurance"] = 1;
    gen.determinePrimaryAbilities(charPop12);
    charPop12.calculateSecondary();
    gen.determineHealth(charPop12);

    this.assertEquals(charPop12.health, charPop12.getAbilityNumber("Fighting") +
      charPop12.getAbilityNumber("Agility") +
      charPop12.getAbilityNumber("Strength") +
      charPop12.getAbilityNumber("Endurance") +
      charPop12.getAbilityNumber("Fighting") +
      charPop12.getAbilityNumber("Agility") +
      charPop12.getAbilityNumber("Strength") +
      charPop12.getAbilityNumber("Endurance"), "Testing Mineral Health Adjustment.");
  }

  static SecondaryAbilityTests(gen) {
    this.SecondaryAbilityGenericTests(gen);
    this.SecondaryAbilityAdvancedTests(gen);
    this.SecondaryAbilityUltimateTests(gen);
  }

  static SinglePowerGenericTests(gen) {
    gen.generatorMode = 'generic';
    gen.setTables();

    const char = new Character();
    char.physicalForm = "Altered Human";
    char.origin = "Altered Human";
    char.powersCount = 3;
    char.powersSlots = 3;
    gen.randomRanksColumn = 1;

    gen.powerCategoryRolls = [2, 27, 19, 74];
    gen.powerRolls = [20, 30, 40, 50];
    gen.powerRankRolls = [74, 19, 27, 2];

    gen.generateSinglePower(char, 0);

    this.assertEquals(1, char.powers.length, `Power Quantity Roll: Generated ${char.powers.length} powers.`);
    this.assertEquals("Resistances", char.powers[0].category, `Power Category Roll: Generated ${char.powers[0].category} category.`);
    this.assertEquals("Resistance to Cold", char.powers[0].name, `Power Roll: Generated ${char.powers[0].name} name.`);
    this.assertEquals("Incredible", char.powers[0].rank, `Power Rank Roll: Generated ${char.powers[0].rank} rank.`);

    gen.generateSinglePower(char, 1);
    this.assertEquals(2, char.powers.length, `Power Quantity Roll: Generated ${char.powers.length} powers.`);
    this.assertEquals("Energy Control", char.powers[1].category, `Power Category Roll: Generated ${char.powers[1].category} category.`);
    this.assertEquals("Electrical Manipulation", char.powers[1].name, `Power Roll: Generated ${char.powers[1].name} name.`);
    this.assertEquals("Good", char.powers[1].rank, `Power Rank Roll: Generated ${char.powers[1].rank} rank.`);

    gen.generateSinglePower(char, 2);
    this.assertEquals(3, char.powers.length, `Power Quantity Roll: Generated ${char.powers.length} powers.`);
    this.assertEquals("Matter Control", char.powers[2].category, `Power Category Roll: Generated ${char.powers[2].category} category.`);
    this.assertEquals("Air Control", char.powers[2].name, `Power Roll: Generated ${char.powers[2].name} name.`);
    this.assertEquals("Good", char.powers[2].rank, `Power Rank Roll: Generated ${char.powers[2].rank} rank.`);
  }

  static SinglePowerAdvancedTests(gen) {
    gen.generatorMode = 'advanced';
    gen.setTables();

    const char = new Character();
    char.physicalForm = "Altered Human";
    char.origin = "Altered Human";
    gen.randomRanksColumn = 1;
    char.powersCount = 3;
    char.powersSlots = 3;

    gen.powerCategoryRolls = [2, 27, 19, 74];
    gen.powerRolls = [20, 30, 40, 50];
    gen.powerRankRolls = [74, 19, 27, 2];

    gen.generateSinglePower(char, 0);
    this.assertEquals(1, char.powers.length, `Power Quantity Roll: Generated ${char.powers.length} powers.`);
    this.assertEquals("Resistances", char.powers[0].category, `Power Category Roll: Generated ${char.powers[0].category} category.`);
    this.assertEquals("Resistance to Cold", char.powers[0].name, `Power Roll: Generated ${char.powers[0].name} name.`);
    this.assertEquals("Incredible", char.powers[0].rank, `Power Rank Roll: Generated ${char.powers[0].rank} rank.`);

    gen.generateSinglePower(char, 1);
    this.assertEquals(2, char.powers.length, `Power Quantity Roll: Generated ${char.powers.length} powers.`);
    this.assertEquals("Energy Control", char.powers[1].category, `Power Category Roll: Generated ${char.powers[1].category} category.`);
    this.assertEquals("Electrical Manipulation", char.powers[1].name, `Power Roll: Generated ${char.powers[1].name} name.`);
    this.assertEquals("Good", char.powers[1].rank, `Power Rank Roll: Generated ${char.powers[1].rank} rank.`);

    gen.generateSinglePower(char, 2);
    this.assertEquals(3, char.powers.length, `Power Quantity Roll: Generated ${char.powers.length} powers.`);
    this.assertEquals("Matter Control", char.powers[2].category, `Power Category Roll: Generated ${char.powers[2].category} category.`);
    this.assertEquals("Air Control", char.powers[2].name, `Power Roll: Generated ${char.powers[2].name} name.`);
    this.assertEquals("Good", char.powers[2].rank, `Power Rank Roll: Generated ${char.powers[2].rank} rank.`);
  }

  static SinglePowerUltimateTests(gen) {
    gen.generatorMode = 'ultimate';
    gen.setTables();

    const char = new Character();
    char.physicalForm = "Normal Human";
    char.origin = "Normal Human";
    gen.randomRanksColumn = 2;
    char.powersCount = 3;
    char.powersSlots = 3;

    gen.powerCategoryRolls = [2, 27, 19, 74];
    gen.powerRolls = [20, 30, 40, 50];
    gen.powerRankRolls = [74, 19, 27, 2];

    gen.generateSinglePower(char, 0);
    this.assertEquals(1, char.powers.length, `Power Quantity Roll: Generated ${char.powers.length} powers.`);
    this.assertEquals("Defensive", char.powers[0].category, `Power Category Roll: Generated ${char.powers[0].category} category.`);
    this.assertEquals("Force Field", char.powers[0].name, `Power Roll: Generated ${char.powers[0].name} name.`);
    this.assertEquals("Incredible", char.powers[0].rank, `Power Rank Roll: Generated ${char.powers[0].rank} rank.`);

    gen.generateSinglePower(char, 1);
    this.assertEquals(2, char.powers.length, `Power Quantity Roll: Generated ${char.powers.length} powers.`);
    this.assertEquals("Fighting", char.powers[1].category, `Power Category Roll: Generated ${char.powers[1].category} category.`);
    this.assertEquals("Martial Supremacy", char.powers[1].name, `Power Roll: Generated ${char.powers[1].name} name.`);
    this.assertEquals("Good", char.powers[1].rank, `Power Rank Roll: Generated ${char.powers[1].rank} rank.`);

    gen.generateSinglePower(char, 2);
    this.assertEquals(3, char.powers.length, `Power Quantity Roll: Generated ${char.powers.length} powers.`);
    this.assertEquals("Energy Emission", char.powers[2].category, `Power Category Roll: Generated ${char.powers[2].category} category.`);
    this.assertEquals("Heat", char.powers[2].name, `Power Roll: Generated ${char.powers[2].name} name.`);
    this.assertEquals("Good", char.powers[2].rank, `Power Rank Roll: Generated ${char.powers[2].rank} rank.`);

    // *********************************************
    // Test allPowersRankAdjustment
    const char2 = new Character();
    char2.physicalForm = "Robot - Computer";
    char2.origin = "Robot - Computer";
    gen.randomRanksColumn = 4;
    char2.powersCount = 3;
    char2.powersSlots = 3;

    gen.powerCategoryRolls = [2, 27, 19, 74];
    gen.powerRolls = [20, 30, 40, 50];
    gen.powerRankRolls = [74, 19, 27, 2];

    gen.generateSinglePower(char2, 0);
    this.assertEquals(1, char2.powers.length, `Power Quantity Roll: Generated ${char2.powers.length} powers.`);
    this.assertEquals("Defensive", char2.powers[0].category, `Power Category Roll: Generated ${char2.powers[0].category} category.`);
    this.assertEquals("Force Field", char2.powers[0].name, `Power Roll: Generated ${char2.powers[0].name} name.`);
    this.assertEquals("Remarkable", char2.powers[0].rank, `Power Rank Roll: Generated ${char2.powers[0].rank} rank.`);

    gen.generateSinglePower(char2, 1);
    this.assertEquals(2, char2.powers.length, `Power Quantity Roll: Generated ${char2.powers.length} powers.`);
    this.assertEquals("Fighting", char2.powers[1].category, `Power Category Roll: Generated ${char2.powers[1].category} category.`);
    this.assertEquals("Martial Supremacy", char2.powers[1].name, `Power Roll: Generated ${char2.powers[1].name} name.`);
    this.assertEquals("Typical", char2.powers[1].rank, `Power Rank Roll: Generated ${char2.powers[1].rank} rank.`);

    gen.generateSinglePower(char2, 2);
    this.assertEquals(3, char2.powers.length, `Power Quantity Roll: Generated ${char2.powers.length} powers.`);
    this.assertEquals("Energy Emission", char2.powers[2].category, `Power Category Roll: Generated ${char2.powers[2].category} category.`);
    this.assertEquals("Heat", char2.powers[2].name, `Power Roll: Generated ${char2.powers[2].name} name.`);
    this.assertEquals("Typical", char2.powers[2].rank, `Power Rank Roll: Generated ${char2.powers[2].rank} rank.`);

  }

  static SinglePowerTests(gen) {
    this.SinglePowerGenericTests(gen);
    this.SinglePowerAdvancedTests(gen);
    this.SinglePowerUltimateTests(gen);
  }

  static PowersGenericTests(gen) {
    gen.generatorMode = 'generic';
    gen.setTables();

    gen.throwAllRolls();

    // Test every power in POWER_LIST
    for (const targetPower of gen.powerListTable) {
      const char = new Character();
      char.origin = "Altered Human";
      gen.randomRanksColumn = 1;

      gen.powerNumberRoll = 19;  // 2 powers
      gen.talentNumberRoll = 91;
      gen.contactNumberRoll = 74;
      gen.talentCategoryRolls = [2, 27, 67, 91];
      gen.talentRolls = [20, 30, 40, 50];
      gen.contactNumberRoll = 74;
      gen.contactCategoryRolls = [2, 27, 67, 91];
      gen.contactRolls = [20, 30, 40, 50];

      if (targetPower.maxRoll > 100) {
        continue;
      }

      const targetIndex = gen.powerListTable.findIndex(p => p.name === targetPower.name);
      const catData = gen.powerCategoriesTable.find(c => c.name == targetPower.category);

      let indexAdjustment = 1;

      let powerRow1 = targetIndex <= 4 ? gen.powerListTable[targetIndex + 1] : gen.powerListTable[gen.powerListTable.length - 4];
      while (powerRow1.maxRoll > 100) {
        powerRow1 = targetIndex <= 4 ? gen.powerListTable[targetIndex + indexAdjustment] : gen.powerListTable[gen.powerListTable.length - indexAdjustment];
        indexAdjustment++;
      }

      indexAdjustment = 1;
      let powerRow2 = targetIndex <= 4 ? gen.powerListTable[targetIndex + 2] : gen.powerListTable[gen.powerListTable.length - 3];
      while (powerRow2.maxRoll > 100) {
        powerRow2 = targetIndex <= 4 ? gen.powerListTable[targetIndex + indexAdjustment] : gen.powerListTable[gen.powerListTable.length - indexAdjustment];
        indexAdjustment++;
      }

      indexAdjustment = 1;
      let powerRow3 = targetIndex <= 4 ? gen.powerListTable[targetIndex + 3] : gen.powerListTable[gen.powerListTable.length - 2];
      while (powerRow3.maxRoll > 100) {
        powerRow3 = targetIndex <= 4 ? gen.powerListTable[targetIndex + indexAdjustment] : gen.powerListTable[gen.powerListTable.length - indexAdjustment];
        indexAdjustment++;
      }

      const catRow1 = gen.powerCategoriesTable.find(c => c.name === powerRow1.category);
      const catRow2 = gen.powerCategoriesTable.find(c => c.name === powerRow2.category);
      const catRow3 = gen.powerCategoriesTable.find(c => c.name === powerRow3.category);

      gen.powerCategoryRolls[0] = catData.maxRoll;
      gen.powerCategoryRolls[1] = catRow1.maxRoll;
      gen.powerCategoryRolls[2] = catRow2.maxRoll;
      gen.powerCategoryRolls[3] = catRow3.maxRoll;

      gen.powerRolls[0] = targetPower.maxRoll;
      gen.powerRolls[1] = powerRow1.maxRoll;
      gen.powerRolls[2] = powerRow2.maxRoll;
      gen.powerRolls[3] = powerRow3.maxRoll;

      // Set valid rank roll
      gen.powerRankRolls[0] = 50;
      gen.powerRankRolls[1] = 50;
      gen.powerRankRolls[2] = 50;
      gen.powerRankRolls[3] = 50;

      // Run generation
      gen.determineSpecialAbilities(char);
      // Validate
      if (char.powers.length === 0 || char.powers[0] === null) {
        this.assertEquals("Power Tests", char.powers.length, `Power Failed to generate.`);
      }

      const p = char.powers[0];
      this.assertEquals(targetPower.category, p.category, `Power Category Roll: Generated ${p.category} category.`);
      this.assertEquals(targetPower.name, p.name, `Power Roll: Generated ${p.name} name.`);
      this.assertEquals("Excellent", p.rank, `Power Rank Roll: Generated ${p.rank} rank.`);
    }
  }

  static PowersAdvancedTests(gen) {
    gen.generatorMode = 'advanced';
    gen.setTables();

    gen.throwAllRolls();

    // Test every power in POWER_LIST
    for (const targetPower of gen.powerListTable) {
      const char = new Character();
      char.physicalForm = "Altered Human";
      char.origin = "Altered Human";
      gen.randomRanksColumn = 1;

      gen.powerNumberRoll = 19;  // 2 powers
      gen.talentNumberRoll = 91;
      gen.contactNumberRoll = 74;
      gen.talentCategoryRolls = [2, 27, 67, 91];
      gen.talentRolls = [20, 30, 40, 50];
      gen.contactNumberRoll = 74;
      gen.contactCategoryRolls = [2, 27, 67, 91];
      gen.contactRolls = [20, 30, 40, 50];

      if (targetPower.maxRoll > 100) {
        continue;
      }

      const targetIndex = gen.powerListTable.findIndex(p => p.name === targetPower.name);
      const catData = gen.powerCategoriesTable.find(c => c.name == targetPower.category);

      let indexAdjustment = 1;

      let powerRow1 = targetIndex <= 4 ? gen.powerListTable[targetIndex + 1] : gen.powerListTable[gen.powerListTable.length - 4];
      while (powerRow1.maxRoll > 100) {
        powerRow1 = targetIndex <= 4 ? gen.powerListTable[targetIndex + indexAdjustment] : gen.powerListTable[gen.powerListTable.length - indexAdjustment];
        indexAdjustment++;
      }

      indexAdjustment = 1;
      let powerRow2 = targetIndex <= 4 ? gen.powerListTable[targetIndex + 2] : gen.powerListTable[gen.powerListTable.length - 3];
      while (powerRow2.maxRoll > 100) {
        powerRow2 = targetIndex <= 4 ? gen.powerListTable[targetIndex + indexAdjustment] : gen.powerListTable[gen.powerListTable.length - indexAdjustment];
        indexAdjustment++;
      }

      indexAdjustment = 1;
      let powerRow3 = targetIndex <= 4 ? gen.powerListTable[targetIndex + 3] : gen.powerListTable[gen.powerListTable.length - 2];
      while (powerRow3.maxRoll > 100) {
        powerRow3 = targetIndex <= 4 ? gen.powerListTable[targetIndex + indexAdjustment] : gen.powerListTable[gen.powerListTable.length - indexAdjustment];
        indexAdjustment++;
      }

      const catRow1 = gen.powerCategoriesTable.find(c => c.name === powerRow1.category);
      const catRow2 = gen.powerCategoriesTable.find(c => c.name === powerRow2.category);
      const catRow3 = gen.powerCategoriesTable.find(c => c.name === powerRow3.category);

      gen.powerCategoryRolls[0] = catData.maxRoll;
      gen.powerCategoryRolls[1] = catRow1.maxRoll;
      gen.powerCategoryRolls[2] = catRow2.maxRoll;
      gen.powerCategoryRolls[3] = catRow3.maxRoll;

      gen.powerRolls[0] = targetPower.maxRoll;
      gen.powerRolls[1] = powerRow1.maxRoll;
      gen.powerRolls[2] = powerRow2.maxRoll;
      gen.powerRolls[3] = powerRow3.maxRoll;

      // Set valid rank roll
      gen.powerRankRolls[0] = 50;
      gen.powerRankRolls[1] = 50;
      gen.powerRankRolls[2] = 50;
      gen.powerRankRolls[3] = 50;

      // Run generation
      gen.determineSpecialAbilities(char);

      // Validate
      if (char.powers.length === 0 || char.powers[0] === null) {
        this.assertEquals("Power Tests", char.powers.length, `Power Failed to generate.`);
      }

      const p = char.powers[0];
      this.assertEquals(targetPower.category, p.category, `Power Category Roll: Generated ${p.category} category.`);
      this.assertEquals(targetPower.name, p.name, `Power Roll: Generated ${p.name} name.`);
      this.assertEquals("Excellent", p.rank, `Power Rank Roll: Generated ${p.rank} rank.`);
    }
  }

  static PowersUltimateTests(gen) {
    gen.generatorMode = 'ultimate';
    gen.setTables();

    gen.throwAllRolls();

    // Test every power in POWER_LIST
    for (const targetPower of gen.powerListTable) {
      const char = new Character();
      char.physicalForm = "Normal Human";
      char.origin = "Normal Human";
      gen.randomRanksColumn = 2;

      gen.powerNumberRoll = 19;  // 2 powers
      gen.talentNumberRoll = 91;
      gen.contactNumberRoll = 74;
      gen.talentCategoryRolls = [2, 27, 67, 91];
      gen.talentRolls = [20, 30, 40, 50];
      gen.contactNumberRoll = 74;
      gen.contactCategoryRolls = [2, 27, 67, 91];
      gen.contactRolls = [20, 30, 40, 50];

      if (targetPower.maxRoll > 100) {
        continue;
      }

      const targetIndex = gen.powerListTable.findIndex(p => p.name === targetPower.name);
      const catData = gen.powerCategoriesTable.find(c => c.name == targetPower.category);

      let indexAdjustment = 1;

      let powerRow1 = targetIndex <= 4 ? gen.powerListTable[targetIndex + 1] : gen.powerListTable[gen.powerListTable.length - 4];
      while (powerRow1.maxRoll > 100) {
        powerRow1 = targetIndex <= 4 ? gen.powerListTable[targetIndex + indexAdjustment] : gen.powerListTable[gen.powerListTable.length - indexAdjustment];
        indexAdjustment++;
      }

      indexAdjustment = 1;
      let powerRow2 = targetIndex <= 4 ? gen.powerListTable[targetIndex + 2] : gen.powerListTable[gen.powerListTable.length - 3];
      while (powerRow2.maxRoll > 100) {
        powerRow2 = targetIndex <= 4 ? gen.powerListTable[targetIndex + indexAdjustment] : gen.powerListTable[gen.powerListTable.length - indexAdjustment];
        indexAdjustment++;
      }

      indexAdjustment = 1;
      let powerRow3 = targetIndex <= 4 ? gen.powerListTable[targetIndex + 3] : gen.powerListTable[gen.powerListTable.length - 2];
      while (powerRow3.maxRoll > 100) {
        powerRow3 = targetIndex <= 4 ? gen.powerListTable[targetIndex + indexAdjustment] : gen.powerListTable[gen.powerListTable.length - indexAdjustment];
        indexAdjustment++;
      }

      const catRow1 = gen.powerCategoriesTable.find(c => c.name === powerRow1.category);
      const catRow2 = gen.powerCategoriesTable.find(c => c.name === powerRow2.category);
      const catRow3 = gen.powerCategoriesTable.find(c => c.name === powerRow3.category);

      gen.powerCategoryRolls[0] = catData.maxRoll;
      gen.powerCategoryRolls[1] = catRow1.maxRoll;
      gen.powerCategoryRolls[2] = catRow2.maxRoll;
      gen.powerCategoryRolls[3] = catRow3.maxRoll;

      // Set specific power roll
      gen.powerRolls[0] = targetPower.maxRoll;
      gen.powerRolls[1] = powerRow1.maxRoll;
      gen.powerRolls[2] = powerRow2.maxRoll;
      gen.powerRolls[3] = powerRow3.maxRoll;

      // Set valid rank roll
      gen.powerRankRolls[0] = 50;
      gen.powerRankRolls[1] = 50;
      gen.powerRankRolls[2] = 50;
      gen.powerRankRolls[3] = 50;

      // Run generation
      gen.determineSpecialAbilities(char);

      // Validate
      if (char.powers.length === 0 || char.powers[0] === null) {
        this.assertEquals("Power Tests", char.powers.length, `Power Failed to generate.`);
      }

      const p = char.powers[0];
      this.assertEquals(targetPower.category, p.category, `Power Category Roll: Generated ${p.category} category.`);
      this.assertEquals(targetPower.name, p.name, `Power Roll: Generated ${p.name} name.`);
      this.assertEquals("Excellent", p.rank, `Power Rank Roll: Generated ${p.rank} rank.`);
    }
  }

  static PowersTests(gen) {
    this.PowersGenericTests(gen);
    this.PowersAdvancedTests(gen);
    this.PowersUltimateTests(gen);
  }

  static PowersTooManyGenericTests(gen) {
    gen.generatorMode = 'generic';
    gen.setTables();

    gen.throwAllRolls();

    const char = new Character();
    char.physicalForm = "Altered Human";

    gen.randomRanksColumn = 1;
    gen.powerNumberRoll = 22;  // 3/4 powers
    gen.powerCategoryRolls = [75, 2, 55, 27, 19, 74];
    gen.powerRolls = [20, 20, 60, 30, 40, 50];
    gen.powerRankRolls = [9, 19, 29, 39, 49, 59];

    gen.talentNumberRoll = 91;
    gen.contactNumberRoll = 74;
    gen.talentCategoryRolls = [2, 27, 67, 91];
    gen.talentRolls = [20, 30, 40, 50];
    gen.contactNumberRoll = 74;
    gen.contactCategoryRolls = [2, 27, 67, 91];
    gen.contactRolls = [20, 30, 40, 50];

    // Run generation
    gen.determineSpecialAbilities(char);
    // Validate

    this.assertEquals(2, char.powers.length, `Test #1: Incorrect number of powers were generated.`);

    let p = char.powers[0];
    this.assertEquals("Mental Powers", p.category, `Test #1: Power Category Roll: Generated ${p.category} category.`);
    this.assertEquals("Image Generation", p.name, `Test #1: Power Roll: Generated ${p.name} name.`);
    this.assertEquals("Poor", p.rank, `Test #1: Power Rank Roll: Generated ${p.rank} rank.`);

    p = char.powers[1];
    this.assertEquals("Resistances", p.category, `Test #1: Power Category Roll: Generated ${p.category} category.`);
    this.assertEquals("Resistance to Cold", p.name, `Test #1: Power Roll: Generated ${p.name} name.`);

    this.assertEquals("Good", p.rank, `Test #1: Power Rank Roll: Generated ${p.rank} rank.`);

    /******************************************************/

    const char2 = new Character();
    char2.origin = "Altered Human";
    char2.randomRanksColumn = 1;

    gen.powerNumberRoll = 22;  // 3/4 powers
    gen.powerCategoryRolls = [75, 55, 2, 27, 19, 74];
    gen.powerRolls = [20, 60, 20, 30, 40, 50];
    gen.powerRankRolls = [9, 19, 29, 39, 49, 59];

    gen.talentNumberRoll = 91;
    gen.contactNumberRoll = 74;
    gen.talentCategoryRolls = [2, 27, 67, 91];
    gen.talentRolls = [20, 30, 40, 50];
    gen.contactNumberRoll = 74;
    gen.contactCategoryRolls = [2, 27, 67, 91];
    gen.contactRolls = [20, 30, 40, 50];

    // Run generation
    gen.determineSpecialAbilities(char2);

    // Validate
    this.assertEquals(2, char2.powers.length, `Test #2: Incorrect number of powers were generated.`);

    p = char2.powers[0];
    this.assertEquals("Mental Powers", p.category, `Test #2: Power Category Roll: Generated ${p.category} category.`);
    this.assertEquals("Image Generation", p.name, `Test #2: Power Roll: Generated ${p.name} name.`);
    this.assertEquals("Poor", p.rank, `Test #2: Power Rank Roll: Generated ${p.rank} rank.`);

    p = char2.powers[1];
    this.assertEquals("Body Control", p.category, `Test #2: Power Category Roll: Generated ${p.category} category.`);
    this.assertEquals("Body Transformation", p.name, `Test #2: Power Roll: Generated ${p.name} name.`);
    this.assertEquals("Good", p.rank, `Test #2: Power Rank Roll: Generated ${p.rank} rank.`);

    /******************************************************/

    const char3 = new Character();
    char3.physicalForm = "Altered Human";
    char3.origin = "Altered Human";
    char3.randomRanksColumn = 1;

    gen.throwAllRolls();

    gen.powerNumberRoll = 100;  // 5/5 powers
    gen.powerCategoryRolls = [15, 5, 75, 75, 55, 35];
    gen.powerRolls = [60, 90, 10, 30, 70, 10];
    gen.powerRankRolls = [9, 19, 29, 39, 49, 59, 69];

    gen.talentNumberRoll = 91;
    gen.contactNumberRoll = 74;
    gen.talentCategoryRolls = [2, 27, 67, 91];
    gen.talentRolls = [20, 30, 40, 50];
    gen.contactNumberRoll = 74;
    gen.contactCategoryRolls = [2, 27, 67, 91];
    gen.contactRolls = [20, 30, 40, 50];

    // Run generation
    gen.determineSpecialAbilities(char3);

    // Validate
    this.assertEquals(5, char3.powers.length, `Test #3: Incorrect number of powers were generated.`);

    p = char3.powers[0];
    this.assertEquals("Movement", p.category, `Test #3: Power Category Roll: Generated ${p.category} category.`);
    this.assertEquals("Wall-Crawling", p.name, `Test #3: Power Roll: Generated ${p.name} name.`);
    this.assertEquals("Poor", p.rank, `Test #3: Power Rank Roll: Generated ${p.rank} rank.`);

    p = char3.powers[1];
    this.assertEquals("Resistances", p.category, `Test #3: Power Category Roll: Generated ${p.category} category.`);
    this.assertEquals("Resistance to Magic Attacks", p.name, `Test #3: Power Roll: Generated ${p.name} name.`);
    this.assertEquals("Good", p.rank, `Test #3: Power Rank Roll: Generated ${p.rank} rank.`);

    p = char3.powers[2];
    this.assertEquals("Mental Powers", p.category, `Test #3: Power Category Roll: Generated ${p.category} category.`);
    this.assertEquals("Telepathy", p.name, `Test #3: Power Roll: Generated ${p.name} name.`);
    this.assertEquals("Good", p.rank, `Test #3: Power Rank Roll: Generated ${p.rank} rank.`);

    p = char3.powers[3];
    this.assertEquals("Mental Powers", p.category, `Test #3: Power Category Roll: Generated ${p.category} category.`);
    this.assertEquals("Telekinesis", p.name, `Test #3: Power Roll: Generated ${p.name} name.`);
    this.assertEquals("Good", p.rank, `Test #3: Power Rank Roll: Generated ${p.rank} rank.`);

    p = char3.powers[4];
    this.assertEquals("Body Control", p.category, `Test #3: Power Category Roll: Generated ${p.category} category.`);
    this.assertEquals("Animal Transformation - Self", p.name, `Test #3: Power Roll: Generated ${p.name} name.`);
    this.assertEquals("Excellent", p.rank, `Test #3: Power Rank Roll: Generated ${p.rank} rank.`);
  }

  static PowersTooManyAdvancedTests(gen) {
    gen.generatorMode = 'advanced';
    gen.setTables();

    gen.throwAllRolls();

    const char = new Character();
    char.physicalForm = "Altered Human";

    gen.randomRanksColumn = 1;
    gen.powerNumberRoll = 22;  // 3/4 powers
    gen.powerCategoryRolls = [75, 2, 55, 27, 19, 74];
    gen.powerRolls = [20, 20, 60, 30, 40, 50];
    gen.powerRankRolls = [9, 19, 29, 39, 49, 59];

    gen.talentNumberRoll = 91;
    gen.contactNumberRoll = 74;
    gen.talentCategoryRolls = [2, 27, 67, 91];
    gen.talentRolls = [20, 30, 40, 50];
    gen.contactNumberRoll = 74;
    gen.contactCategoryRolls = [2, 27, 67, 91];
    gen.contactRolls = [20, 30, 40, 50];

    // Run generation
    gen.determineSpecialAbilities(char);
    // Validate

    this.assertEquals(2, char.powers.length, `Test #1: Incorrect number of powers were generated.`);

    let p = char.powers[0];
    this.assertEquals("Mental Powers", p.category, `Test #1: Power Category Roll: Generated ${p.category} category.`);
    this.assertEquals("Image Generation", p.name, `Test #1: Power Roll: Generated ${p.name} name.`);
    this.assertEquals("Poor", p.rank, `Test #1: Power Rank Roll: Generated ${p.rank} rank.`);

    p = char.powers[1];
    this.assertEquals("Resistances", p.category, `Test #1: Power Category Roll: Generated ${p.category} category.`);
    this.assertEquals("Resistance to Cold", p.name, `Test #1: Power Roll: Generated ${p.name} name.`);

    this.assertEquals("Good", p.rank, `Test #1: Power Rank Roll: Generated ${p.rank} rank.`);

    /******************************************************/

    const char2 = new Character();
    char2.origin = "Altered Human";
    char2.randomRanksColumn = 1;

    gen.powerNumberRoll = 22;  // 3/4 powers
    gen.powerCategoryRolls = [75, 55, 2, 27, 19, 74];
    gen.powerRolls = [20, 60, 20, 30, 40, 50];
    gen.powerRankRolls = [9, 19, 29, 39, 49, 59];

    gen.talentNumberRoll = 91;
    gen.contactNumberRoll = 74;
    gen.talentCategoryRolls = [2, 27, 67, 91];
    gen.talentRolls = [20, 30, 40, 50];
    gen.contactNumberRoll = 74;
    gen.contactCategoryRolls = [2, 27, 67, 91];
    gen.contactRolls = [20, 30, 40, 50];

    // Run generation
    gen.determineSpecialAbilities(char2);

    // Validate
    this.assertEquals(2, char2.powers.length, `Test #2: Incorrect number of powers were generated.`);

    p = char2.powers[0];
    this.assertEquals("Mental Powers", p.category, `Test #2: Power Category Roll: Generated ${p.category} category.`);
    this.assertEquals("Image Generation", p.name, `Test #2: Power Roll: Generated ${p.name} name.`);
    this.assertEquals("Poor", p.rank, `Test #2: Power Rank Roll: Generated ${p.rank} rank.`);

    p = char2.powers[1];
    this.assertEquals("Body Control", p.category, `Test #2: Power Category Roll: Generated ${p.category} category.`);
    this.assertEquals("Body Transformation", p.name, `Test #2: Power Roll: Generated ${p.name} name.`);
    this.assertEquals("Good", p.rank, `Test #2: Power Rank Roll: Generated ${p.rank} rank.`);

    /******************************************************/

    const char3 = new Character();
    char3.physicalForm = "Altered Human";
    char3.origin = "Altered Human";
    char3.randomRanksColumn = 1;

    gen.throwAllRolls();

    gen.powerNumberRoll = 100;  // 5/5 powers
    gen.powerCategoryRolls = [15, 5, 75, 75, 55, 35];
    gen.powerRolls = [60, 90, 10, 30, 70, 10];
    gen.powerRankRolls = [9, 19, 29, 39, 49, 59, 69];

    gen.talentNumberRoll = 91;
    gen.contactNumberRoll = 74;
    gen.talentCategoryRolls = [2, 27, 67, 91];
    gen.talentRolls = [20, 30, 40, 50];
    gen.contactNumberRoll = 74;
    gen.contactCategoryRolls = [2, 27, 67, 91];
    gen.contactRolls = [20, 30, 40, 50];

    // Run generation
    gen.determineSpecialAbilities(char3);

    // Validate
    this.assertEquals(5, char3.powers.length, `Test #3: Incorrect number of powers were generated.`);

    p = char3.powers[0];
    this.assertEquals("Movement", p.category, `Test #3: Power Category Roll: Generated ${p.category} category.`);
    this.assertEquals("Wall-Crawling", p.name, `Test #3: Power Roll: Generated ${p.name} name.`);
    this.assertEquals("Poor", p.rank, `Test #3: Power Rank Roll: Generated ${p.rank} rank.`);

    p = char3.powers[1];
    this.assertEquals("Resistances", p.category, `Test #3: Power Category Roll: Generated ${p.category} category.`);
    this.assertEquals("Resistance to Magic Attacks", p.name, `Test #3: Power Roll: Generated ${p.name} name.`);
    this.assertEquals("Good", p.rank, `Test #3: Power Rank Roll: Generated ${p.rank} rank.`);

    p = char3.powers[2];
    this.assertEquals("Mental Powers", p.category, `Test #3: Power Category Roll: Generated ${p.category} category.`);
    this.assertEquals("Telepathy", p.name, `Test #3: Power Roll: Generated ${p.name} name.`);
    this.assertEquals("Good", p.rank, `Test #3: Power Rank Roll: Generated ${p.rank} rank.`);

    p = char3.powers[3];
    this.assertEquals("Mental Powers", p.category, `Test #3: Power Category Roll: Generated ${p.category} category.`);
    this.assertEquals("Telekinesis", p.name, `Test #3: Power Roll: Generated ${p.name} name.`);
    this.assertEquals("Good", p.rank, `Test #3: Power Rank Roll: Generated ${p.rank} rank.`);

    p = char3.powers[4];
    this.assertEquals("Body Control", p.category, `Test #3: Power Category Roll: Generated ${p.category} category.`);
    this.assertEquals("Animal Transformation - Self", p.name, `Test #3: Power Roll: Generated ${p.name} name.`);
    this.assertEquals("Excellent", p.rank, `Test #3: Power Rank Roll: Generated ${p.rank} rank.`);
  }

  static PowersTooManyUltimateTests(gen) {
    gen.generatorMode = 'ultimate';
    gen.setTables();

    const char = new Character();
    char.origin = "Altered Human";
    gen.randomRanksColumn = 1;

    gen.powerNumberRoll = 22;  // 3/4 powers
    gen.powerCategoryRolls = [75, 2, 55, 27, 19, 74];
    gen.powerRolls = [2, 2, 6, 3, 4, 5];
    gen.powerRankRolls = [9, 19, 29, 39, 49, 59];

    gen.talentNumberRoll = 91;
    gen.contactNumberRoll = 74;
    gen.talentCategoryRolls = [2, 27, 67, 91];
    gen.talentRolls = [20, 30, 40, 50];
    gen.contactNumberRoll = 74;
    gen.contactCategoryRolls = [2, 27, 67, 91];
    gen.contactRolls = [20, 30, 40, 50];

    // Run generation
    gen.determineSpecialAbilities(char);

    // Validate
    this.assertEquals(2, char.powers.length, `Test #1: Incorrect number of powers were generated.`);

    let p = char.powers[0];
    this.assertEquals("Mental Powers", p.category, `Test #1: Power Category Roll: Generated ${p.category} category.`);
    this.assertEquals("Image Generation", p.name, `Test #1: Power Roll: Generated ${p.name} name.`);
    this.assertEquals("Poor", p.rank, `Test #1: Power Rank Roll: Generated ${p.rank} rank.`);

    p = char.powers[1];
    this.assertEquals("Resistances", p.category, `Test #1: Power Category Roll: Generated ${p.category} category.`);
    this.assertEquals("Resistance to Cold", p.name, `Test #1: Power Roll: Generated ${p.name} name.`);
    this.assertEquals("Good", p.rank, `Test #1: Power Rank Roll: Generated ${p.rank} rank.`);

    /******************************************************/

    const char2 = new Character();
    char2.origin = "Altered Human";
    char2.randomRanksColumn = 1;

    gen.powerNumberRoll = 22;  // 3/4 powers
    gen.powerCategoryRolls = [75, 55, 2, 27, 19, 74];
    gen.powerRolls = [2, 6, 2, 3, 4, 5];
    gen.powerRankRolls = [9, 19, 29, 39, 49, 59];

    gen.talentNumberRoll = 91;
    gen.contactNumberRoll = 74;
    gen.talentCategoryRolls = [2, 27, 67, 91];
    gen.talentRolls = [20, 30, 40, 50];
    gen.contactNumberRoll = 74;
    gen.contactCategoryRolls = [2, 27, 67, 91];
    gen.contactRolls = [20, 30, 40, 50];

    // Run generation
    gen.determineSpecialAbilities(char2);

    // Validate
    this.assertEquals(2, char2.powers.length, `Test #2: Incorrect number of powers were generated.`);

    p = char2.powers[0];
    this.assertEquals("Mental Powers", p.category, `Test #2: Power Category Roll: Generated ${p.category} category.`);
    this.assertEquals("Image Generation", p.name, `Test #2: Power Roll: Generated ${p.name} name.`);
    this.assertEquals("Poor", p.rank, `Test #2: Power Rank Roll: Generated ${p.rank} rank.`);

    p = char2.powers[1];
    this.assertEquals("Body Control", p.category, `Test #2: Power Category Roll: Generated ${p.category} category.`);
    this.assertEquals("Body Transformation", p.name, `Test #2: Power Roll: Generated ${p.name} name.`);
    this.assertEquals("Good", p.rank, `Test #2: Power Rank Roll: Generated ${p.rank} rank.`);

    /******************************************************/

    const char3 = new Character();
    char3.origin = "Altered Human";
    char3.randomRanksColumn = 1;

    gen.powerNumberRoll = 100;  // 5/5 powers
    gen.powerCategoryRolls = [15, 5, 75, 75, 55, 35];
    gen.powerRolls = [6, 9, 1, 3, 6, 1];
    gen.powerRankRolls = [9, 19, 29, 39, 49, 59, 69];

    gen.talentNumberRoll = 91;
    gen.contactNumberRoll = 74;
    gen.talentCategoryRolls = [2, 27, 67, 91];
    gen.talentRolls = [20, 30, 40, 50];
    gen.contactNumberRoll = 74;
    gen.contactCategoryRolls = [2, 27, 67, 91];
    gen.contactRolls = [20, 30, 40, 50];

    // Run generation
    gen.determineSpecialAbilities(char3);

    // Validate
    this.assertEquals(5, char3.powers.length, `Test #3: Incorrect number of powers were generated.`);

    p = char3.powers[0];
    this.assertEquals("Movement", p.category, `Test #3: Power Category Roll: Generated ${p.category} category.`);
    this.assertEquals("Wall-Crawling", p.name, `Test #3: Power Roll: Generated ${p.name} name.`);
    this.assertEquals("Poor", p.rank, `Test #3: Power Rank Roll: Generated ${p.rank} rank.`);

    p = char3.powers[1];
    this.assertEquals("Resistances", p.category, `Test #3: Power Category Roll: Generated ${p.category} category.`);
    this.assertEquals("Resistance to Magic Attacks", p.name, `Test #3: Power Roll: Generated ${p.name} name.`);
    this.assertEquals("Good", p.rank, `Test #3: Power Rank Roll: Generated ${p.rank} rank.`);

    p = char3.powers[2];
    this.assertEquals("Mental Powers", p.category, `Test #3: Power Category Roll: Generated ${p.category} category.`);
    this.assertEquals("Telepathy", p.name, `Test #3: Power Roll: Generated ${p.name} name.`);
    this.assertEquals("Good", p.rank, `Test #3: Power Rank Roll: Generated ${p.rank} rank.`);

    p = char3.powers[3];
    this.assertEquals("Mental Powers", p.category, `Test #3: Power Category Roll: Generated ${p.category} category.`);
    this.assertEquals("Telekinesis", p.name, `Test #3: Power Roll: Generated ${p.name} name.`);
    this.assertEquals("Good", p.rank, `Test #3: Power Rank Roll: Generated ${p.rank} rank.`);

    p = char3.powers[4];
    this.assertEquals("Body Control", p.category, `Test #3: Power Category Roll: Generated ${p.category} category.`);
    this.assertEquals("Growth", p.name, `Test #3: Power Roll: Generated ${p.name} name.`);
    this.assertEquals("Excellent", p.rank, `Test #3: Power Rank Roll: Generated ${p.rank} rank.`);
  }

  static PowersTooManyTests(gen) {
    this.PowersTooManyGenericTests(gen);
    this.PowersTooManyAdvancedTests(gen);
    //this.PowersTooManyUltimateTests(gen);
  }

  static WeaknessTests() {
    const gen = new CharacterGenerator();

    gen.generatorMode = 'ultimate';
    gen.throwAllRolls();

    gen.weaknessStimulusRoll = 1;
    gen.weaknessEffectRoll = 1;
    gen.weaknessDurationRoll = 1;

    let char = gen.generateWithoutThrows();

    this.assertEquals("Psychological", char.weakness.stimulus, `Weakness Stimulus Roll: Generated ${char.weakness.stimulus} stimulus.`);
    this.assertEquals("Power Negation", char.weakness.effect, `Weakness Effect Roll: Generated ${char.weakness.effect} effect.`);
    this.assertEquals("Continuous with Contact", char.weakness.duration, `Weakness Duration Roll: Generated ${char.weakness.duration} duration.`);

    gen.weaknessStimulusRoll = 18;
    gen.weaknessEffectRoll = 90;
    gen.weaknessDurationRoll = 60;

    char = gen.generateWithoutThrows();

    this.assertEquals("Elemental Allergy", char.weakness.stimulus, `Weakness Stimulus Roll: Generated ${char.weakness.stimulus} stimulus.`);
    this.assertEquals("Incapacitation", char.weakness.effect, `Weakness Effect Roll: Generated ${char.weakness.effect} effect.`);
    this.assertEquals("Limited Duration with Contact", char.weakness.duration, `Weakness Duration Roll: Generated ${char.weakness.duration} duration.`);

    gen.weaknessStimulusRoll = 43;
    gen.weaknessEffectRoll = 100;
    gen.weaknessDurationRoll = 90;

    char = gen.generateWithoutThrows();

    this.assertEquals("Molecular Allergy", char.weakness.stimulus, `Weakness Stimulus Roll: Generated ${char.weakness.stimulus} stimulus.`);
    this.assertEquals("Fatal", char.weakness.effect, `Weakness Effect Roll: Generated ${char.weakness.effect} effect.`);
    this.assertEquals("Limited Duration after Contact", char.weakness.duration, `Weakness Duration Roll: Generated ${char.weakness.duration} duration.`);

    gen.weaknessStimulusRoll = 68;
    gen.weaknessEffectRoll = 100;
    gen.weaknessDurationRoll = 100;

    char = gen.generateWithoutThrows();

    this.assertEquals("Energy Allergy", char.weakness.stimulus, `Weakness Stimulus Roll: Generated ${char.weakness.stimulus} stimulus.`);
    this.assertEquals("Fatal", char.weakness.effect, `Weakness Effect Roll: Generated ${char.weakness.effect} effect.`);
    this.assertEquals("Permanent", char.weakness.duration, `Weakness Duration Roll: Generated ${char.weakness.duration} duration.`);

    gen.weaknessStimulusRoll = 81;
    gen.weaknessEffectRoll = 100;
    gen.weaknessDurationRoll = 100;

    char = gen.generateWithoutThrows();

    this.assertEquals("Energy Depletion", char.weakness.stimulus, `Weakness Stimulus Roll: Generated ${char.weakness.stimulus} stimulus.`);
    this.assertEquals("Fatal", char.weakness.effect, `Weakness Effect Roll: Generated ${char.weakness.effect} effect.`);
    this.assertEquals("Permanent", char.weakness.duration, `Weakness Duration Roll: Generated ${char.weakness.duration} duration.`);

    gen.weaknessStimulusRoll = 94;
    gen.weaknessEffectRoll = 100;
    gen.weaknessDurationRoll = 100;

    char = gen.generateWithoutThrows();

    this.assertEquals("Energy Dampening", char.weakness.stimulus, `Weakness Stimulus Roll: Generated ${char.weakness.stimulus} stimulus.`);
    this.assertEquals("Fatal", char.weakness.effect, `Weakness Effect Roll: Generated ${char.weakness.effect} effect.`);
    this.assertEquals("Permanent", char.weakness.duration, `Weakness Duration Roll: Generated ${char.weakness.duration} duration.`);

    gen.weaknessStimulusRoll = 100;
    gen.weaknessEffectRoll = 100;
    gen.weaknessDurationRoll = 100;
    gen.weaknessRankRoll = 1;

    char = gen.generateWithoutThrows();

    this.assertEquals("Finite Limit", char.weakness.stimulus, `Weakness Stimulus Roll: Generated ${char.weakness.stimulus} stimulus.`);
    this.assertEquals("Fatal", char.weakness.effect, `Weakness Effect Roll: Generated ${char.weakness.effect} effect.`);
    this.assertEquals("Permanent", char.weakness.duration, `Weakness Duration Roll: Generated ${char.weakness.duration} duration.`);
    this.assertEquals("Feeble", char.weakness.rank, `Weakness Rank Roll: Generated ${char.weakness.rank} rank.`);
    this.assertEquals(1, char.weakness.rankNumber, `Weakness Rank Roll: Generated ${char.weakness.rankNumber} rank.`);
  }

  static TalentsGenericTests(gen) {
    gen.generatorMode = 'generic';
    gen.setTables();

    const charSlots = new Character();
    charSlots.physicalForm = "Altered Human";
    charSlots.origin = "Altered Human";
    charSlots.randomRanksColumn = 1;

    gen.throwAllRolls();

    gen.talentNumberRoll = 91;
    gen.talentCategoryRolls = [2, 27, 67, 91];
    gen.talentRolls = [20, 30, 40, 50];

    gen.determineSpecialAbilities(charSlots);

    // Limits from table (Min 2/1/0, Max 5/4/4)
    const tCount = charSlots.talents.length;

    this.assert(tCount >= 1 && tCount <= 4,
      `Talent Quantity Roll: Generated ${tCount} talents (Valid range 1-4).`);

    this.assertEquals(4, tCount, `Talent Quantity Roll: Generated ${tCount} talents.`);

    this.assertEquals("Weapon Skills", charSlots.talents[0].category, `Talent Category Roll: Generated ${charSlots.talents[0].category} category.`);
    this.assertEquals("Guns", charSlots.talents[0].name, `Talent Category Roll: Generated ${charSlots.talents[0].name} name.`);

    this.assertEquals("Fighting Skills", charSlots.talents[1].category, `Talent Category Roll: Generated ${charSlots.talents[1].category} category.`);
    this.assertEquals("Martial Arts C", charSlots.talents[1].name, `Talent Category Roll: Generated ${charSlots.talents[1].name} name.`);

    this.assertEquals("Scientific Skills", charSlots.talents[2].category, `Talent Category Roll: Generated ${charSlots.talents[2].category} category.`);
    this.assertEquals("Biology", charSlots.talents[2].name, `Talent Category Roll: Generated ${charSlots.talents[2].name} name.`);

    this.assertEquals("Other Skills", charSlots.talents[3].category, `Talent Category Roll: Generated ${charSlots.talents[3].category} category.`);
    this.assertEquals("First Aid", charSlots.talents[3].name, `Talent Category Roll: Generated ${charSlots.talents[3].name} name.`);
  }

  static TalentsAdvancedTests(gen) {
    gen.generatorMode = 'advanced';
    gen.setTables();

    const charSlots = new Character();
    charSlots.physicalForm = "Altered Human";
    charSlots.origin = "Altered Human";
    charSlots.randomRanksColumn = 1;

    gen.powerNumberRoll = 2;
    gen.talentNumberRoll = 91;
    gen.contactNumberRoll = 74;

    gen.powerCategoryRolls = [2, 27, 19, 74];
    gen.powerRolls = [20, 30, 40, 50];
    gen.powerRankRolls = [74, 19, 27, 2];

    gen.talentCategoryRolls = [2, 27, 67, 91];
    gen.talentRolls = [20, 30, 40, 50];

    gen.determineSpecialAbilities(charSlots);

    // Limits from table (Min 2/1/0, Max 5/4/4)
    const tCount = charSlots.talents.length;

    this.assert(tCount >= 1 && tCount <= 4,
      `Talent Quantity Roll: Generated ${tCount} talents (Valid range 1-4).`);

    this.assertEquals(4, tCount, `Talent Quantity Roll: Generated ${tCount} talents.`);

    this.assertEquals("Weapon Skills", charSlots.talents[0].category, `Talent Category Roll: Generated ${charSlots.talents[0].category} category.`);
    this.assertEquals("Guns", charSlots.talents[0].name, `Talent Category Roll: Generated ${charSlots.talents[0].name} name.`);

    this.assertEquals("Fighting Skills", charSlots.talents[1].category, `Talent Category Roll: Generated ${charSlots.talents[1].category} category.`);
    this.assertEquals("Martial Arts C", charSlots.talents[1].name, `Talent Category Roll: Generated ${charSlots.talents[1].name} name.`);

    this.assertEquals("Scientific Skills", charSlots.talents[2].category, `Talent Category Roll: Generated ${charSlots.talents[2].category} category.`);
    this.assertEquals("Biology", charSlots.talents[2].name, `Talent Category Roll: Generated ${charSlots.talents[2].name} name.`);

    this.assertEquals("Other Skills", charSlots.talents[3].category, `Talent Category Roll: Generated ${charSlots.talents[3].category} category.`);
    this.assertEquals("First Aid", charSlots.talents[3].name, `Talent Category Roll: Generated ${charSlots.talents[3].name} name.`);
  }

  static TalentsUltimateTests(gen) {
    gen.generatorMode = 'ultimate';
    gen.setTables();

    const charSlots = new Character();
    charSlots.physicalForm = "Altered Human";
    charSlots.origin = "Altered Human";
    charSlots.randomRanksColumn = 1;

    gen.throwAllRolls();

    gen.talentNumberRoll = 91;
    gen.talentCategoryRolls = [2, 27, 67, 91];
    gen.talentRolls = [20, 30, 40, 50];

    gen.determineSpecialAbilities(charSlots);

    // Limits from table (Min 2/1/0, Max 5/4/4)
    const tCount = charSlots.talents.length;

    this.assert(tCount >= 1 && tCount <= 4,
      `Talent Quantity Roll: Generated ${tCount} talents (Valid range 1-4).`);

    this.assertEquals(4, tCount, `Talent Quantity Roll: Generated ${tCount} talents.`);

    this.assertEquals("Alternative Sciences", charSlots.talents[0].category, `Talent Category Roll: Generated ${charSlots.talents[0].category} category.`);
    this.assertEquals("Catastrophism", charSlots.talents[0].name, `Talent Category Roll: Generated ${charSlots.talents[0].name} name.`);

    this.assertEquals("Chemistry", charSlots.talents[1].category, `Talent Category Roll: Generated ${charSlots.talents[1].category} category.`);
    this.assertEquals("Chemical Engineering", charSlots.talents[1].name, `Talent Category Roll: Generated ${charSlots.talents[1].name} name.`);

    this.assertEquals("Medicine", charSlots.talents[2].category, `Talent Category Roll: Generated ${charSlots.talents[2].category} category.`);
    this.assertEquals("Obstetrics and Gynecology", charSlots.talents[2].name, `Talent Category Roll: Generated ${charSlots.talents[2].name} name.`);

    this.assertEquals("Piloting", charSlots.talents[3].category, `Talent Category Roll: Generated ${charSlots.talents[3].category} category.`);
    this.assertEquals("Helicopter", charSlots.talents[3].name, `Talent Category Roll: Generated ${charSlots.talents[3].name} name.`);
  }

  static TalentsTests(gen) {
    this.TalentsGenericTests(gen);
    this.TalentsAdvancedTests(gen);
    this.TalentsUltimateTests(gen);
  }

  // This test is meaningless currently because no generated talent has multiple slots
  static TalentsTooManyTests(gen) {
    return;

    /*
    const charSlots = new Character();
    charSlots.origin = "Altered Human";
    charSlots.randomRanksColumn = 1;

    gen.powerNumberRoll = 2; // 1/2
    gen.talentNumberRoll = 91;
    gen.contactNumberRoll = 74;
    gen.talentCategoryRolls = [2, 27, 67, 91];
    gen.talentRolls = [20, 30, 40, 50];

    gen.determineSpecialAbilities(charSlots);

    // Limits from table (Min 2/1/0, Max 5/4/4)
    const tCount = charSlots.talents.length;

    this.assert(tCount >= 1 && tCount <= 4,
      `Talent Quantity Roll: Generated ${tCount} talents (Valid range 1-4).`);

    this.assertEquals(4, tCount, `Talent Quantity Roll: Generated ${tCount} talents.`);

    this.assertEquals("Weapon Skills", charSlots.talents[0].category, `Talent Category Roll: Generated ${charSlots.talents[0].category} category.`);
    this.assertEquals("Guns", charSlots.talents[0].name, `Talent Category Roll: Generated ${charSlots.talents[0].name} name.`);

    this.assertEquals("Fighting Skills", charSlots.talents[1].category, `Talent Category Roll: Generated ${charSlots.talents[1].category} category.`);
    this.assertEquals("Martial Arts C", charSlots.talents[1].name, `Talent Category Roll: Generated ${charSlots.talents[1].name} name.`);

    this.assertEquals("Scientific Skills", charSlots.talents[2].category, `Talent Category Roll: Generated ${charSlots.talents[2].category} category.`);
    this.assertEquals("Biology", charSlots.talents[2].name, `Talent Category Roll: Generated ${charSlots.talents[2].name} name.`);

    this.assertEquals("Other Skills", charSlots.talents[3].category, `Talent Category Roll: Generated ${charSlots.talents[3].category} category.`);
    this.assertEquals("First Aid", charSlots.talents[3].name, `Talent Category Roll: Generated ${charSlots.talents[3].name} name.`);
    */
  }

  static ContactsGenericTests(gen) {
    gen.generatorMode = 'generic';
    gen.setTables();

    const char = new Character();
    char.physicalForm = "Altered Human";
    char.origin = "Altered Human";
    gen.randomRanksColumn = 1;

    gen.powerNumberRoll = 19;
    gen.powerCategoryRolls = [2, 27, 19, 91];
    gen.powerRolls = [20, 30, 40, 50];
    gen.powerRankRolls = [9, 19, 29, 39, 49, 59, 69, 79, 94, 99];

    gen.talentNumberRoll = 91;
    gen.talentCategoryRolls = [2, 27, 67, 91];
    gen.talentRolls = [20, 30, 40, 50];

    gen.contactNumberRoll = 74;
    gen.contactCategoryRolls = [2, 27, 67, 91];
    gen.contactRolls = [20, 30, 40, 50];

    gen.determineSpecialAbilities(char);

    let cCount = char.contacts.length;
    this.assert(cCount >= 0 && cCount <= 4,
      `Contact Quantity Roll: Generated ${cCount} contacts (Valid range 0-4).`);
    this.assertEquals(2, cCount, `Contact Quantity Roll: Generated ${cCount} contacts.`);

    gen.contactNumberRoll = 17;
    char.powers = [];
    char.talents = [];
    char.contacts = [];
    gen.determineSpecialAbilities(char);

    cCount = char.contacts.length;
    this.assert(cCount >= 0 && cCount <= 4,
      `Contact Quantity Roll: Generated ${cCount} contacts (Valid range 0-4).`);
    this.assertEquals(0, cCount, `Contact Quantity Roll: Generated ${cCount} contacts.`);

    gen.contactNumberRoll = 25;
    char.powers = [];
    char.talents = [];
    char.contacts = [];

    gen.determineSpecialAbilities(char);

    cCount = char.contacts.length;
    this.assert(cCount >= 0 && cCount <= 4,
      `Contact Quantity Roll: Generated ${cCount} contacts (Valid range 0-4).`);
    this.assertEquals(1, cCount, `Contact Quantity Roll: Generated ${cCount} contacts.`);

    gen.contactNumberRoll = 69;
    char.powers = [];
    char.talents = [];
    char.contacts = [];
    gen.determineSpecialAbilities(char);

    cCount = char.contacts.length;
    this.assert(cCount >= 0 && cCount <= 4,
      `Contact Quantity Roll: Generated ${cCount} contacts (Valid range 0-4).`);
    this.assertEquals(2, cCount, `Contact Quantity Roll: Generated ${cCount} contacts.`);
  }

  static ContactsAdvancedTests(gen) {
    gen.generatorMode = 'advanced';
    gen.setTables();

    const char = new Character();
    char.physicalForm = "Altered Human";
    char.origin = "Altered Human";
    gen.randomRanksColumn = 1;

    gen.powerNumberRoll = 19;
    gen.powerCategoryRolls = [2, 27, 19, 91];
    gen.powerRolls = [20, 30, 40, 50];
    gen.powerRankRolls = [9, 19, 29, 39, 49, 59, 69, 79, 94, 99];

    gen.talentNumberRoll = 91;
    gen.talentCategoryRolls = [2, 27, 67, 91];
    gen.talentRolls = [20, 30, 40, 50];

    gen.contactNumberRoll = 74;
    gen.contactCategoryRolls = [2, 27, 67, 91];
    gen.contactRolls = [20, 30, 40, 50];

    gen.determineSpecialAbilities(char);

    let cCount = char.contacts.length;
    this.assert(cCount >= 0 && cCount <= 4,
      `Contact Quantity Roll: Generated ${cCount} contacts (Valid range 0-4).`);
    this.assertEquals(2, cCount, `Contact Quantity Roll: Generated ${cCount} contacts.`);

    gen.contactNumberRoll = 17;
    char.powers = [];
    char.talents = [];
    char.contacts = [];
    gen.determineSpecialAbilities(char);

    cCount = char.contacts.length;
    this.assert(cCount >= 0 && cCount <= 4,
      `Contact Quantity Roll: Generated ${cCount} contacts (Valid range 0-4).`);
    this.assertEquals(0, cCount, `Contact Quantity Roll: Generated ${cCount} contacts.`);

    gen.contactNumberRoll = 25;
    char.powers = [];
    char.talents = [];
    char.contacts = [];

    gen.determineSpecialAbilities(char);

    cCount = char.contacts.length;
    this.assert(cCount >= 0 && cCount <= 4,
      `Contact Quantity Roll: Generated ${cCount} contacts (Valid range 0-4).`);
    this.assertEquals(1, cCount, `Contact Quantity Roll: Generated ${cCount} contacts.`);

    gen.contactNumberRoll = 69;
    char.powers = [];
    char.talents = [];
    char.contacts = [];
    gen.determineSpecialAbilities(char);

    cCount = char.contacts.length;
    this.assert(cCount >= 0 && cCount <= 4,
      `Contact Quantity Roll: Generated ${cCount} contacts (Valid range 0-4).`);
    this.assertEquals(2, cCount, `Contact Quantity Roll: Generated ${cCount} contacts.`);
  }

  static ContactsUltimateTests(gen) {
    gen.generatorMode = 'ultimate';
    gen.setTables();
    gen.throwAllRolls();

    const char = new Character();

    gen.contactNumberRoll = 74;
    gen.contactCategoryRolls = [2, 27, 67, 91];
    gen.contactRolls = [20, 30, 40, 50];

    gen.determineSpecialAbilities(char);

    let cCount = char.contacts.length;
    this.assert(cCount >= 0 && cCount <= 4,
      `Contact Quantity Roll: Generated ${cCount} contacts (Valid range 0-4).`);
    this.assertEquals(3, cCount, `Contact Quantity Roll: Generated ${cCount} contacts.`);
    this.assertEquals("Professional", char.contacts[0].category, `Contact Cateogry Roll: Generated ${char.contacts[0].category}.`);
    this.assertEquals("Law Enforcement", char.contacts[0].name, `Contact Name Roll: Generated ${char.contacts[0].name}.`);
    this.assertEquals("Professional", char.contacts[1].category, `Contact Cateogry Roll: Generated ${char.contacts[1].category}.`);
    this.assertEquals("Business World", char.contacts[1].name, `Contact Name Roll: Generated ${char.contacts[1].name}.`);
    this.assertEquals("Political", char.contacts[2].category, `Contact Cateogry Roll: Generated ${char.contacts[2].category}.`);
    this.assertEquals("Local", char.contacts[2].name, `Contact Name Roll: Generated ${char.contacts[2].name}.`);

    char.contacts = [];
    gen.physicalFormRoll = 1;
    gen.contactNumberRoll = 1;
    gen.contactCategoryRolls = [2, 27, 67, 91];
    gen.contactRolls = [20, 30, 40, 50];

    gen.determineSpecialAbilities(char);

    cCount = char.contacts.length;
    this.assert(cCount >= 0 && cCount <= 4,
      `Contact Quantity Roll: Generated ${cCount} contacts (Valid range 0-4).`);
    this.assertEquals(0, cCount, `Contact Quantity Roll: Generated ${cCount} contacts.`);

    char.contacts = [];
    gen.physicalFormRoll = 1;
    gen.contactNumberRoll = 55;
    gen.contactCategoryRolls = [91, 67, 27, 2];
    gen.contactRolls = [70, 60, 50, 40];

    gen.determineSpecialAbilities(char);

    cCount = char.contacts.length;
    this.assert(cCount >= 0 && cCount <= 4,
      `Contact Quantity Roll: Generated ${cCount} contacts (Valid range 0-4).`);
    this.assertEquals(2, cCount, `Contact Quantity Roll: Generated ${cCount} contacts.`);
    this.assertEquals("Mystic Arts", char.contacts[0].category, `Contact Cateogry Roll: Generated ${char.contacts[0].category}.`);
    this.assertEquals("Mythology", char.contacts[0].name, `Contact Name Roll: Generated ${char.contacts[0].name}.`);
    this.assertEquals("Political", char.contacts[1].category, `Contact Cateogry Roll: Generated ${char.contacts[1].category}.`);
    this.assertEquals("State", char.contacts[1].name, `Contact Name Roll: Generated ${char.contacts[1].name}.`);
  }

  static ContactsTests(gen) {
    this.ContactsGenericTests(gen);
    this.ContactsAdvancedTests(gen);

    this.ContactsUltimateTests(gen);
  }

  static ContactsTooManyGenericTests(gen) {
    gen.generatorMode = 'generic';
    gen.setTables();

    const char = new Character();
    char.physicalForm = "Altered Human";
    char.origin = "Altered Human";
    gen.randomRanksColumn = 1;

    gen.powerNumberRoll = 19;
    gen.powerCategoryRolls = [2, 27, 19, 91];
    gen.powerRolls = [20, 30, 40, 50];
    gen.powerRankRolls = [9, 19, 29, 39, 49, 59, 69, 79, 94, 99];

    gen.talentNumberRoll = 99; // 4/4 talents
    gen.talentCategoryRolls = [64, 84, 64, 64, 64, 64, 64, 64, 64, 64];
    gen.talentRolls = [5, 6, 2, 10, 2, 2, 2, 2, 2, 2, 2];

    gen.contactNumberRoll = 99; // 3/4 contacts
    gen.contactCategoryRolls = [2, 27, 67, 91, 37, 47];
    gen.contactRolls = [2, 3, 4, 5, 6, 7];

    gen.determineSpecialAbilities(char);

    let cCount = char.contacts.length;
    this.assert(cCount >= 0 && cCount <= 4,
      `Contact Quantity Roll: Generated ${cCount} contacts (Valid range 0-4).`);
    this.assertEquals(3, cCount, `Contact Quantity Roll: Generated ${cCount} contacts.`);

    const char2 = new Character();
    char2.origin = "Altered Human";
    char2.randomRanksColumn = 1;

    gen.powerNumberRoll = 19;
    gen.powerCategoryRolls = [2, 27, 19, 91];
    gen.powerRolls = [20, 30, 40, 50];
    gen.powerRankRolls = [9, 19, 29, 39, 49, 59, 69, 79, 94, 99];

    gen.talentNumberRoll = 99; // 4/4 talents
    gen.talentCategoryRolls = [64, 84, 64, 64, 64, 64, 64, 64, 64, 64];
    gen.talentRolls = [5, 6, 2, 10, 2, 2, 2, 2, 2, 2, 2];

    gen.contactNumberRoll = 89; // 2/4 contacts
    gen.contactCategoryRolls = [2, 27, 67, 91, 37, 47];
    gen.contactRolls = [2, 3, 4, 5, 6, 7];

    gen.determineSpecialAbilities(char);

    let cCount2 = char.contacts.length;
    this.assert(cCount2 >= 0 && cCount2 <= 4,
      `Contact Quantity Roll: Generated ${cCount2} contacts (Valid range 0-4).`);
    this.assertEquals(3, cCount2, `Contact Quantity Roll: Generated ${cCount2} contacts.`);

  }

  static ContactsTooManyAdvancedTests(gen) {
    gen.generatorMode = 'advanced';
    gen.setTables();

    const char = new Character();
    char.physicalForm = "Altered Human";
    char.origin = "Altered Human";
    gen.randomRanksColumn = 1;

    gen.powerNumberRoll = 19;
    gen.powerCategoryRolls = [2, 27, 19, 91];
    gen.powerRolls = [20, 30, 40, 50];
    gen.powerRankRolls = [9, 19, 29, 39, 49, 59, 69, 79, 94, 99];

    gen.talentNumberRoll = 99; // 4/4 talents
    gen.talentCategoryRolls = [64, 84, 64, 64, 64, 64, 64, 64, 64, 64];
    gen.talentRolls = [5, 6, 2, 10, 2, 2, 2, 2, 2, 2, 2];

    gen.contactNumberRoll = 99; // 3/4 contacts
    gen.contactCategoryRolls = [2, 27, 67, 91, 37, 47];
    gen.contactRolls = [2, 3, 4, 5, 6, 7];

    gen.determineSpecialAbilities(char);

    let cCount = char.contacts.length;
    this.assert(cCount >= 0 && cCount <= 4,
      `Contact Quantity Roll: Generated ${cCount} contacts (Valid range 0-4).`);
    this.assertEquals(3, cCount, `Contact Quantity Roll: Generated ${cCount} contacts.`);

    const char2 = new Character();
    char2.origin = "Altered Human";
    char2.randomRanksColumn = 1;

    gen.powerNumberRoll = 19;
    gen.powerCategoryRolls = [2, 27, 19, 91];
    gen.powerRolls = [20, 30, 40, 50];
    gen.powerRankRolls = [9, 19, 29, 39, 49, 59, 69, 79, 94, 99];

    gen.talentNumberRoll = 99; // 4/4 talents
    gen.talentCategoryRolls = [64, 84, 64, 64, 64, 64, 64, 64, 64, 64];
    gen.talentRolls = [5, 6, 2, 10, 2, 2, 2, 2, 2, 2, 2];

    gen.contactNumberRoll = 89; // 2/4 contacts
    gen.contactCategoryRolls = [2, 27, 67, 91, 37, 47];
    gen.contactRolls = [2, 3, 4, 5, 6, 7];

    gen.determineSpecialAbilities(char);

    let cCount2 = char.contacts.length;
    this.assert(cCount2 >= 0 && cCount2 <= 4,
      `Contact Quantity Roll: Generated ${cCount2} contacts (Valid range 0-4).`);
    this.assertEquals(3, cCount2, `Contact Quantity Roll: Generated ${cCount2} contacts.`);

  }

  static ContactsTooManyUltimateTests(gen) {
    gen.generatorMode = 'ultimate';
    gen.setTables();

    const char = new Character();
    char.physicalForm = "Altered Human";
    char.origin = "Altered Human";
    gen.randomRanksColumn = 1;

    gen.powerNumberRoll = 19;
    gen.powerCategoryRolls = [2, 27, 19, 91];
    gen.powerRolls = [20, 30, 40, 50];
    gen.powerRankRolls = [9, 19, 29, 39, 49, 59, 69, 79, 94, 99];

    gen.talentNumberRoll = 99; // 4/4 talents
    gen.talentCategoryRolls = [64, 84, 64, 64, 64, 64, 64, 64, 64, 64];
    gen.talentRolls = [5, 6, 2, 10, 2, 2, 2, 2, 2, 2, 2];

    gen.contactNumberRoll = 99; // 3/4 contacts
    gen.contactCategoryRolls = [2, 27, 67, 91, 37, 47];
    gen.contactRolls = [2, 3, 4, 5, 6, 7];

    gen.determineSpecialAbilities(char);

    let cCount = char.contacts.length;
    this.assert(cCount >= 0 && cCount <= 4,
      `Contact Quantity Roll: Generated ${cCount} contacts (Valid range 0-4).`);
    this.assertEquals(3, cCount, `Contact Quantity Roll: Generated ${cCount} contacts.`);

    const char2 = new Character();
    char2.origin = "Altered Human";
    char2.randomRanksColumn = 1;

    gen.powerNumberRoll = 19;
    gen.powerCategoryRolls = [2, 27, 19, 91];
    gen.powerRolls = [20, 30, 40, 50];
    gen.powerRankRolls = [9, 19, 29, 39, 49, 59, 69, 79, 94, 99];

    gen.talentNumberRoll = 99; // 4/4 talents
    gen.talentCategoryRolls = [64, 84, 64, 64, 64, 64, 64, 64, 64, 64];
    gen.talentRolls = [5, 6, 2, 10, 2, 2, 2, 2, 2, 2, 2];

    gen.contactNumberRoll = 89; // 2/4 contacts
    gen.contactCategoryRolls = [2, 27, 67, 91, 37, 47];
    gen.contactRolls = [2, 3, 4, 5, 6, 7];

    gen.determineSpecialAbilities(char);

    let cCount2 = char.contacts.length;
    this.assert(cCount2 >= 0 && cCount2 <= 4,
      `Contact Quantity Roll: Generated ${cCount2} contacts (Valid range 0-4).`);
    this.assertEquals(3, cCount2, `Contact Quantity Roll: Generated ${cCount2} contacts.`);

  }

  static ContactsTooManyTests(gen) {
    this.ContactsTooManyGenericTests(gen);
    this.ContactsTooManyAdvancedTests(gen);

    //this.ContactsTooManyUltimateTests(gen);
  }

  static RenderGeneric_Altered_HumanTest() {
    const gen = new CharacterGenerator();

    gen.generatorMode = 'generic';
    gen.throwAllRolls();

    gen.physicalFormRoll = 1;

    let char = gen.generateWithoutThrows();
    Renderer.render(char, gen.generatorMode);
  }

  static RenderAdvanced_Altered_HumanTest() {
    const gen = new CharacterGenerator();

    gen.generatorMode = 'advanced';
    gen.throwAllRolls();

    gen.physicalFormRoll = 1;

    let char = gen.generateWithoutThrows();
    Renderer.render(char, gen.generatorMode);
  }

  static RenderUltimate_Normal_HumanTest() {
    const gen = new CharacterGenerator();

    gen.generatorMode = 'ultimate';
    gen.throwAllRolls();

    gen.physicalFormRoll = 1;

    let char = gen.generateWithoutThrows();
    Renderer.render(char, gen.generatorMode);
  }

  static RenderUltimate_Robot_ComputerTest() {
    const gen = new CharacterGenerator();

    gen.generatorMode = 'ultimate';
    gen.throwAllRolls();

    gen.physicalFormRoll = 87;

    let char = gen.generateWithoutThrows();
    Renderer.render(char, gen.generatorMode);
  }

  static RenderUltimate_Mutant_InducedTest() {
    const gen = new CharacterGenerator();

    gen.generatorMode = 'ultimate';
    gen.throwAllRolls();

    gen.physicalFormRoll = 30;

    let char = gen.generateWithoutThrows();
    Renderer.render(char, gen.generatorMode);
  }

  static RenderUltimate_Angel_DemonTest() {
    const gen = new CharacterGenerator();

    gen.generatorMode = 'ultimate';
    gen.throwAllRolls();

    gen.physicalFormRoll = 88;

    let char = gen.generateWithoutThrows();
    Renderer.render(char, gen.generatorMode);
    document.getElementById('test-area').innerHTML = ""; // Clear tests
  }

  static RenderUltimate_AbilitiesToGenerateTest() {
    const gen = new CharacterGenerator();

    gen.generatorMode = 'ultimate';
    gen.throwAllRolls();

    gen.physicalFormRoll = 86;

    let char = gen.generateWithoutThrows();
    Renderer.render(char, gen.generatorMode);
  }

  static RenderUltimate_CompoundTest() {
    const gen = new CharacterGenerator();

    gen.generatorMode = 'ultimate';
    gen.throwAllRolls();

    gen.physicalFormRoll = 88;

    let char = gen.generateWithoutThrows();
    Renderer.render(char, gen.generatorMode);
  }

  static RenderUltimate_CombinationsTest() {
    const gen = new CharacterGenerator();

    gen.generatorMode = 'ultimate';
    gen.throwAllRolls();

    gen.physicalFormRoll = 99;

    let char = gen.generateWithoutThrows();
    Renderer.render(char, gen.generatorMode);
  }

  static RenderUltimate_BonusContactTest() {
    const gen = new CharacterGenerator();

    gen.generatorMode = 'ultimate';
    gen.throwAllRolls();

    gen.physicalFormRoll = 35;

    let char = gen.generateWithoutThrows();
    Renderer.render(char, gen.generatorMode);
  }

  static getRenderMethodNames() {
    let methods = new Set();
    var propertyNames = Object.getOwnPropertyNames(this);
    return propertyNames.filter(x => x.toString().length > 6 && x.toString().substring(0, 6) === 'Render');
  }

  static run() {
    document.getElementById('test-area').innerHTML = "<h3>Running Tests...</h3>";

    this.failureCount = 0;
    this.assertCount = 0;

    const gen = new CharacterGenerator();
    const advanced = document.getElementById('generator_advanced').checked;
    const ultimate = document.getElementById('generator_ultimate').checked;

    this.GeneratorTests();
    this.GeneratorCompoundTests();
    this.GeneratorBonusContactTest();

    this.UtilityTests(gen);
    this.OriginTests(gen);
    this.PrimaryAbilityTests(gen);
    this.SecondaryAbilityTests(gen);
    this.SinglePowerTests(gen);
    this.PowersTests(gen);
    this.PowersTooManyTests(gen);
    this.WeaknessTests(gen);
    this.TalentsTests(gen);
    this.TalentsTooManyTests(gen);
    this.ContactsTests(gen);
    this.ContactsTooManyTests(gen);

    // this.RenderGenericTest();
    // this.RenderAdvancedTest();
    // this.RenderUltimateTest();
    // this.RenderRobotComputerTest();
    // this.RenderMutantInducedTest();
    // this.RenderAngelDemonTest();
    // this.RenderAbilitiesToGenerateTest();
    // this.RenderSubTypeTest();
    // this.RenderCombinationsTest();
    // this.RenderBonusContactTest();

    let alertMessage = `All Tests Passed!!!\r\n${this.assertCount} assertions.`;
    if (this.failureCount !== 0) {
      alertMessage = `Tests Failed! ${this.failureCount} failures.\r\n${this.assertCount} assertions.\r\n${this.failureCount / this.assertCount}% failure rate.`;
      document.getElementById('failure').scrollIntoView();
    }

    alert(alertMessage);
  }
}
