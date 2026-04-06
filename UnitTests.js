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

  static assertHasPower(expectedValue, powersList, message) {
    const line = this.getLineNumber();
    const area = document.getElementById('test-area');
    const div = document.createElement('div');

    let found = false;
    for (let index = 0; index < powersList.length; index++) {
      if (powersList[index].name === expectedValue) {
        found = true;
        break;
      }
    }

    const condition = found;

    div.id = condition ? "pass" : "failure";
    div.className = "test-output " + (condition ? "pass" : "fail");
    div.innerText = `${condition ? "PASS" : "FAIL"}: (${line}) ${message} Expected Power: ${expectedValue}`;
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
    const parts = (new Error).stack.split("\n")[3].split(":");
    return parts[parts.length - 2];
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

    for (let index = 0; index < gen.physicalFormTable.length; index++) {
      gen.throwAllRolls();
      gen.physicalFormRoll = gen.physicalFormTable[index].maxRoll;
      const char = gen.generateWithoutThrows();
      this.assertEquals(gen.physicalFormTable[index].name, char.physicalForm, `Physical Form Roll (Generic): Generated '${char.physicalForm}', which is correct.`);

      switch (char.physicalForm) {
        case "Normal Human":
          {
            const log = char.log.find(l => l.indexOf('Ability Rank: Resources. Adjustment: 2'));
            this.assert(log !== null && log !== undefined, "For Normal Human, Resource was raised by 2.");
          }
          break;
        case "Mutant - Induced":
          {
            const log = char.log.find(l => l.indexOf('[Any Ability Adjustment]') !== -1);
            this.assert(log !== null && log !== undefined, "For Mutant - Induced, ability raised by 1.");
          }
          break;
        case "Mutant - Random":
          {
            let log = char.log.find(l => l.indexOf('Powers Count Adjusted by 1') !== -1);
            this.assert(log !== null && log !== undefined, "For Mutant - Random, Power Count was raised.");
            log = char.log.find(l => l.indexOf('Resources adjusted by -1') !== -1);
            this.assert(log !== null && log !== undefined, "For Mutant - Random, Resources were lowered by 1.");
            log = char.log.find(l => l.indexOf('Ability: Endurance. Ability Rank') !== -1 && l.indexOf('Adjustment: 1') !== -1);
            this.assert(log !== null && log !== undefined, "For Mutant - Random, Endurance was raised by 1.");
          }
          break;
        case "Mutant - Breed":
          {
            let log = char.log.find(l => l.indexOf('Ability: Endurance. Ability Rank') !== -1 && l.indexOf('Adjustment: 1') !== -1);
            this.assert(log !== null && log !== undefined, "For Mutant - Breed, Endurance was raised by 1.");
            log = char.log.find(l => l.indexOf('Ability: Intuition. Ability Rank') !== -1 && l.indexOf('Adjustment: 1') !== -1);
            this.assert(log !== null && log !== undefined, "For Mutant - Breed, Intuition was raised by 1.");
          }
          break;
        case "Android":
          {
            let log = char.log.find(l => l.indexOf('Powers Count Adjusted by 1') !== -1);
            this.assert(log !== null && log !== undefined, "For Android, Power Count was raised.");
            log = char.log.find(l => l.indexOf('[Any Ability Adjustment]') !== -1);
            this.assert(log !== null && log !== undefined, "For Android, ability raised by 1.");
            log = char.log.find(l => l.indexOf('Ability: Popularity. Ability Rank') !== -1 && l.indexOf('Adjustment: -1') !== -1);
            this.assert(log !== null && log !== undefined, "For Surgical Composite, Popularity was lowered by 1.");
          }
          break;
        case "Humanoid Race":
          {
            let log = char.log.find(l => l.indexOf('[Any Ability Adjustment]') !== -1);
            this.assert(log !== null && log !== undefined, "For Humanoid Race, ability raised by 1.");
            log = char.log.find(l => l.indexOf('Resources set to 3') !== -1);
            this.assert(log !== null && log !== undefined, "For Humanoid Race, Resources set to 3.");
          }
          break;
        case "Surgical Composite":
          {
            let log = char.log.find(l => l.indexOf('Ability: Endurance. Ability Rank') !== -1 && l.indexOf('Adjustment: 1') !== -1);
            this.assert(log !== null && log !== undefined, "For Surgical Composite, Endurance was raised by 1.");
            log = char.log.find(l => l.indexOf('Resources set to 3') !== -1);
            this.assert(log !== null && log !== undefined, "For Surgical Composite, Resources set to 3.");
            log = char.log.find(l => l.indexOf('Ability: Strength. Ability Rank') !== -1 && l.indexOf('Adjustment: 1') !== -1);
            this.assert(log !== null && log !== undefined, "For Surgical Composite, Strength was raised by 1.");
            log = char.log.find(l => l.indexOf('Ability: Fighting. Ability Rank') !== -1 && l.indexOf('Adjustment: 1') !== -1);
            this.assert(log !== null && log !== undefined, "For Surgical Composite, Fighting was raised by 1.");
            log = char.log.find(l => l.indexOf('Popularity starting at 0') !== -1);
            this.assert(log !== null && log !== undefined, "For Surgical Composite, Popularity starting at 0.");
          }
          break;
        case "Modified Human - Muscular":
          {
            let log = char.log.find(l => l.indexOf('Ability: Endurance. Ability Rank') !== -1 && l.indexOf('Adjustment: 1') !== -1);
            this.assert(log !== null && log !== undefined, "For Modified Human - Muscular, Endurance was raised by 1.");
            log = char.log.find(l => l.indexOf('Ability: Strength. Ability Rank') !== -1 && l.indexOf('Adjustment: 1') !== -1);
            this.assert(log !== null && log !== undefined, "For Modified Human - Miscular, Strength was raised by 1.");
          }
          break;
        case "Demihuman - Avian (Angelic)":
          {
            const log = char.log.find(l => l.indexOf('Ability: Popularity. Ability Rank') !== -1 && l.indexOf('Adjustment: 1') !== -1);
            this.assert(log !== null && log !== undefined, "For Demihuman - Avian (Angelic), Popularity was raised by 1.");
          }
          break;
        case "Demihuman - Avian (Harpie)":
          {
            const log = char.log.find(l => l.indexOf('Ability: Fighting. Ability Rank') !== -1 && l.indexOf('Adjustment: 1') !== -1);
            this.assert(log !== null && log !== undefined, "For Demihuman - Avian (Harpie), Fighting was raised by 1.");
          }
          break;
        case "Demihuman - Chiropteran":
          {
            this.assertHasPower('Sonar (Active)', char.powers, 'Demihuman - Chiropteran has bonus power of Sonar (Active).')
            const power = char.powers.find(p => p.name === "Sonar (Active)");
            this.assertEquals("Good", power.rank, "Demihuman - Chiropteran Sonar (Active) must be Good rank.")
            const log = char.log.find(l => l.indexOf('Popularity starting at 1') !== -1);
            this.assert(log !== null && log !== undefined, "For Demihuman - Chiropteran, Popularity starting at 1.");
          }
          break;
        case "Demihuman - Lamian":
          {
            const log = char.log.find(l => l.indexOf('Popularity starting at 0') !== -1);
            this.assert(log !== null && log !== undefined, "For Demihuman - Lamian, Popularity starting at 0.");
          }
          break;
        case "Demihuman - Lupinoid (Werewolf)":
          {
            const log = char.log.find(l => l.indexOf('Ability: Popularity. Ability Rank') !== -1 && l.indexOf('Adjustment: -1') !== -1);
            this.assert(log !== null && log !== undefined, "For Demihuman - Lupinoid, Popularity was lowered by 1.");
          }
          break;
        case "Demihuman - Merhuman":
          {
            this.assertHasPower('Water Freedom', char.powers, 'Demihuman - Merhuman has bonus power of Water Freedom.')
            const log = char.log.find(l => l.indexOf('Ability: Popularity. Ability Rank') !== -1 && l.indexOf('Adjustment: 1') !== -1);
            this.assert(log !== null && log !== undefined, "For Demihuman - Merhuman, Popularity was raised by 1.");
          }
          break;
        case "Cyborg - Artificial limbs/organs":
          {
            const log = char.log.find(l => l.indexOf('Ability: Intuition. Ability Rank') !== -1 && l.indexOf('Adjustment: -1') !== -1);
            this.assert(log !== null && log !== undefined, "For Cyborg 0 Artificial limbs/organs, Intuition was lowered by 1.");
          }
          break;
        case "Cyborg - Mechanical Body":
          {
            let log = char.log.find(l => l.indexOf('Ability: Intuition. Ability Rank') !== -1 && l.indexOf('Adjustment: -1') !== -1);
            this.assert(log !== null && log !== undefined, "For Cyborg - Mechanical Body, Intuition was lowered by 1.");
            log = char.log.find(l => l.indexOf('Ability: Psyche. Ability Rank') !== -1 && l.indexOf('Adjustment: -1') !== -1);
            this.assert(log !== null && log !== undefined, "For Cyborg - Mechanical Body, Psyche was lowered by 1.");
          }
          break;
        case "Cyborg - Mechanically Augmented":
          {
            let log = char.log.find(l => l.indexOf('Powers Count Adjusted by -1') !== -1);
            this.assert(log !== null && log !== undefined, "For Cyborg - Mechanical Augmented, Power Count was lowered.");
            log = char.log.find(l => l.indexOf('Resources set to 16') !== -1);
            this.assert(log !== null && log !== undefined, "For Cyborg - Mechanical Augmented, Resources set to 16.");
            this.assert(char.isHiTech, "For Cyborg - Mechanical Augmented, isHiTech is set");
          }
          break;
        case "Robot - human shape":
          {
            const log = char.log.find(l => l.indexOf('Popularity starting at 0') !== -1);
            this.assert(log !== null && log !== undefined, "For Robot - human shape, Popularity starting at 0.");
          }
          break;
        case "Robot - Metamorphic":
          {
            let log = char.log.find(l => l.indexOf('Abilities to Generate set to 2'));
            this.assert(log !== null && log !== undefined, "For Robot - Metamorphic, Abilities to Generate set to 2.");
          }
          break;
        case "Robot - Computer":
          {
            let log = char.log.find(l => l.indexOf('Ability Rank: Resources. Adjustment: 1'));
            this.assert(log !== null && log !== undefined, "For Robot - Computer, Resource was raised by 2.");
            log = char.log.find(l => l.indexOf('Ability: Fighting. Ability Rank') !== -1 && l.indexOf('Adjustment: -1') !== -1);
            this.assert(log !== null && log !== undefined, "For Robot - Computer, Fighting was lowered by   1.");
            log = char.log.find(l => l.indexOf('Ability: Reason. Ability Rank') !== -1 && l.indexOf('Adjustment: 2') !== -1);
            this.assert(log !== null && log !== undefined, "For Robot - Computer, Reason was raised by 2.");
            log = char.log.find(l => l.indexOf('All Primary Ability Adjustment') !== -1 && l.indexOf('Rolled: -1') !== -1);
            this.assert(log !== null && log !== undefined, "For Robot - Computer, All Primary Abilities adjusted by -1.");
            log = char.log.find(l => l.indexOf('Power Rank') !== -1 && l.indexOf('Adjustment: -1.') !== -1);
            this.assert(log !== null && log !== undefined, "For Robot - Computer, All Power Rank adjusted by -1.");
          }
          break;
        case "Angel/Demon":
          {
            let log = '';
            if (char.subType === "Angel") {
              this.assertHasPower('Artifact Creation', char.powers, 'Angel has bonus power of Artifact Creation.')
              const power = char.powers.find(p => p.name === "Artifact Creation");
              this.assertEquals("Good", power.rank, "Angel Artifact Creation must be Good rank.")
              log = char.log.find(l => l.indexOf('Ability: Popularity. Ability Rank') !== -1 && l.indexOf('Adjustment: 2') !== -1);
              this.assert(log !== null && log !== undefined, "For Angel, Popularity was raised by 2.");
            }
            else if (char.subType === "Demon") {
              this.assertHasPower('Fire Generation', char.powers, 'Demon has bonus power of Fire Generation.')
              const power = char.powers.find(p => p.name === "Fire Generation");
              this.assertEquals("Good", power.rank, "Demon Fire Generation must be Good rank.")
              log = char.log.find(l => l.indexOf('Ability: Popularity. Ability Rank') !== -1 && l.indexOf('Adjustment: -2') !== -1);
              this.assert(log !== null && log !== undefined, "For Demon, Popularity was lowered by 2.");
            }
            log = char.log.find(l => l.indexOf('All Physical Ability Adjustment') !== -1 && l.indexOf('Rolled: 1') !== -1);
            this.assert(log !== null && log !== undefined, "For Angel/Demon, All Physical Abilities adjusted by 1.");
          }
          break;
        case "Deity":
          {
            const power = char.powers.find(p => p.category === "Travel");
            this.assertEquals('Travel', power.category, 'Deity has bonus power of category Travel.')
            let log = char.log.find(l => l.indexOf('Powers Count Adjusted by 2') !== -1);
            this.assert(log !== null && log !== undefined, "For Diety, Power Count was raised.");
            log = char.log.find(l => l.indexOf('Ability: Popularity. Ability Rank') !== -1 && l.indexOf('Adjustment: 2') !== -1);
            this.assert(log !== null && log !== undefined, "For Deity, Popularity was raised by 2.");
            log = char.log.find(l => l.indexOf('All Primary Ability Adjustment') !== -1 && l.indexOf('Rolled: 2') !== -1);
            this.assert(log !== null && log !== undefined, "For Deity, All Primary Abilities adjusted by 2.");
          }
          break;
        case "Animal":
          {
            const power = char.powers.filter(p => p.bonusPower && p.category === "Detection");
            this.assertEquals(2, power.length, "Animal has 2 bonus powers of category Detection.");
            this.assertEquals("Good", power[0].rank, "Animal has bonus power(1) of category Detection at Good rank.");
            this.assertEquals("Good", power[1].rank, "Animal has bonus power(2) of category Detection at Good rank.");
            let log = char.log.find(l => l.indexOf('Powers Count Adjusted by -1') !== -1);
            this.assert(log !== null && log !== undefined, "For Android, Power Count was lowered.");
            log = char.log.find(l => l.indexOf('Resources set to 1') !== -1);
            this.assert(log !== null && log !== undefined, "For Animal, Resources set to 1.");
          }
          break;
        case "Vegetable":
          {
            this.assertHasPower('Absorption Power', char.powers, 'Vegetable has bonus power of Absorption Power.')
            const power = char.powers.find(p => p.name === "Absorption Power");
            this.assertEquals("Good", power.rank, "Vegetable Absorption Power must be Good rank.")
            let log = char.log.find(l => l.indexOf('Ability: Endurance. Ability Rank') !== -1 && l.indexOf('Adjustment: 2') !== -1);
            this.assert(log !== null && log !== undefined, "For Vegetable, Endurance was raised by 2.");
            log = char.log.find(l => l.indexOf('Ability: Fighting. Ability Rank') !== -1 && l.indexOf('Adjustment: -2') !== -1);
            this.assert(log !== null && log !== undefined, "For Vegetable, Fighting was lowered by 2.");
            log = char.log.find(l => l.indexOf('Resources set to 1') !== -1);
            this.assert(log !== null && log !== undefined, "For Vegetable, Resources set to 1.");
          }
          break;
        case "Abnormal Chemistry":
          {
            let log = char.log.find(l => l.indexOf('Ability: Endurance. Ability Rank') !== -1 && l.indexOf('Adjustment: 1') !== -1);
            this.assert(log !== null && log !== undefined, "For Abnormal Chemistry, Endurance was raised by 1.");
          }
          break;
        case "Mineral":
          {
            let log = char.log.find(l => l.indexOf('[Health Adjustment]') !== -1 && l.indexOf('Rolled: *2') !== -1);
            this.assert(log !== null && log !== undefined, "For Mineral, Health was raised by *2.");
          }
          break;
        case "Gaseous":
          {
            let log = char.log.find(l => l.indexOf('Resources set to 1') !== -1);
            this.assert(log !== null && log !== undefined, "For Gaseous, Resources set to 1.");
          }
          break;
        case "Undead":
          {
            let log = char.log.find(l => l.indexOf('Ability: Endurance. Ability Rank') !== -1 && l.indexOf('Adjustment: 1') !== -1);
            this.assert(log !== null && log !== undefined, "For Undead, Endurance was raised by 1.");
            log = char.log.find(l => l.indexOf('Ability: Strength. Ability Rank') !== -1 && l.indexOf('Adjustment: 1') !== -1);
            this.assert(log !== null && log !== undefined, "For Undead, Strength was raised by 1.");
          }
          break;
        case "Compound":
          {

          }
          break;
        case "Energy":
          {
            const power1 = char.powers.filter(p => p.category === "Energy Emission");
            const power2 = char.powers.filter(p => p.category === "Energy Control");
            const power1L = (power1 !== undefined) ? power1.length : 0;
            const power2L = (power1 !== undefined) ? power2.length : 0;
            this.assertGreaterOrEqual(2, power1L + power2L, "Energy has 2 bonus powers of category Energy Emission and/or Energy Control.");
          }
          break;
      }

      // Check if logs have odd data
      let odLog = char.log.find(l => l.indexOf("undefined") !== -1);
      if(odLog !== undefined) debugger;
      this.assert(odLog === null || odLog === undefined, "The logs don't have any undefined values");
      odLog = char.log.find(l => l.indexOf("null") !== -1);
      if(odLog !== undefined) debugger;
      this.assert(odLog === null || odLog === undefined, "The logs don't have any null values");
      odLog = char.log.find(l => l.indexOf("Object") !== -1);
      if(odLog !== undefined) debugger;
      this.assert(odLog === null || odLog === undefined, "The logs don't have any Object values");
    }
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
    this.assertEquals(11, charPop5.popularity,
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
    this.assertEquals(11, charPop7.popularity,
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

      gen.powerNumberRoll = 100;  // 12 powers
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

      try
      {
        // Validate Bonus Powers
        switch (targetPower.code) {
          case "EC3":
            this.assertGreaterOrEqual(2, char.powers.length, "If Coldshaping, there should be at least 2 powers due to Bonus Power.");
            this.assertEquals("Cold Generation", char.powers[1].name, "If Coldshaping, also has Cold Generation.");
            break;
          case "EC13":
            this.assertGreaterOrEqual(2, char.powers.length, "If Kinetic Control, there should be at least 2 powers due to Bonus Power.");
            this.assert(char.powers[1].name === "Telekinesis" || char.powers[1].name === "Kinetic Bolt", "If Kinetic Control, also has Telekinesis or Kinetic Bolt.");
            break;
          case "EC17":
            this.assertGreaterOrEqual(2, char.powers.length, "If Radiowave Control, there should be at least 2 powers due to Bonus Power.");
            this.assertEquals("Radiowave Generation", char.powers[1].name, "If Radiowave Control, also has Radiowave Generation.");
            break;
          case "EC18":
            this.assertGreaterOrEqual(2, char.powers.length, "If Shadowshaping, there should be at least 2 powers due to Bonus Power.");
            this.assertEquals("Shadowcasting", char.powers[1].name, "If Shadowshaping, also has Shadowcasting.");
            break;
          case "EC19":
            this.assertGreaterOrEqual(2, char.powers.length, "If Sound Manipulation, there should be at least 2 powers due to Bonus Power.");
            this.assertEquals("Sonic Generation", char.powers[1].name, "If Sound Manipulation, also has Sonic Generation.");
            break;
          case "L2":
            this.assertGreaterOrEqual(2, char.powers.length, "If Bio-Vampirism, there should be at least 2 powers due to Bonus Power.");
            this.assertEquals("Mind Control", char.powers[1].name, "If Bio-Vampirism, also has Mind Control.");
            break;
          case "M29":
            this.assertGreaterOrEqual(2, char.powers.length, "If Speechthrowing, there should be at least 2 powers due to Bonus Power.");
            this.assertEquals("Clairaudience", char.powers[1].name, "If Speechthrowing, also has Clairaudience.");
            break;
          case "P17":
            this.assertGreaterOrEqual(2, char.powers.length, "If Water Freedom, there should be at least 2 powers due to Bonus Power.");
            this.assertEquals("Waterbreathing", char.powers[1].name, "If Water Freedom, also has Waterbreathing.");
            break;
          case "T8":
            this.assertGreaterOrEqual(2, char.powers.length, "If Hyper-Digging, there should be at least 2 powers due to Bonus Power.");
            this.assert(char.powers[1].name === "Natural Weaponry" || char.powers[1].name === "Body Resistance", "If Hyper-Digging, also has Natural Weaponry or Body Resistance.");
            break;
          case "T11":
            this.assertGreaterOrEqual(2, char.powers.length, "If Hyper-Swimming, there should be at least 2 powers due to Bonus Power.");
            this.assert(char.powers[1].name === "Waterbreathing" || char.powers[1].name === "Water Freedom", "If Hyper-Swimming, also has Waterbreathing or Water Freedom.");
            break;
        }
      }
      catch(ex) {
        this.assert(false, "Exception: " + ex.message);
      }

      try {
        // Validate optionalPowers
        switch (targetPower.code) {
          case "EC3":
            {
              // There are potentially 5 powers or the max number
              const maxPowers = Math.min(char.powersMax, 5);
              this.assertGreaterOrEqual(maxPowers, char.powers.length, `If Coldshaping, there should be at least ${maxPowers} powers due to Bonus Power and Optional Powers.`);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Cold Generation");
                this.assert(power !== null || power !== undefined, "If Coldshaping, also has Cold Generation");
                this.assertEquals(true, power.bonusPower, "If Coldshaping, also has Cold Generation as a Bonus Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Thermal Control");
                this.assert(power !== null || power !== undefined, "If Coldshaping, also has Thermal Control");
                this.assertEquals(true, power.optionalPower, "If Coldshaping, also has Thermal Control as an Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Molding");
                this.assert(power !== null || power !== undefined, "If Coldshaping, also has Molding");
                this.assertEquals(true, power.optionalPower, "If Coldshaping, also has Molding as an Optional Power.");
              }
              if (maxPowers > 4) {
                const power = char.powers.find(p => p.name === "Body Coating");
                this.assert(power !== null || power !== undefined, "If Coldshaping, also has Body Coating");
                this.assertEquals(true, power.optionalPower, "If Coldshaping, also has Body Coating as an Optional Power.");
              }
            }
            break;
          case "EC7":
            {
              const maxPowers = Math.min(char.powersMax, 2);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.category === "Energy Emission");
                this.assert(power !== null || power !== undefined, "If Energy Solidification, also has an Energy Emission");
                this.assertEquals(true, power.optionalPower, "If Energy Solidification, also has Energy Emission as a Optional Power.");
              }
            }
            break;
          case "EC10":
            {
              const maxPowers = Math.min(char.powersMax, 5);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Fire Generation");
                this.assert(power !== null || power !== undefined, "If Fire Control, also has Fire Generation");
                this.assertEquals(true, power.optionalPower, "If Fire Control, also has Fire Generation as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Thermal Control");
                this.assert(power !== null || power !== undefined, "If Fire Control, also has Thermal Control");
                this.assertEquals(true, power.optionalPower, "If Fire Control, also has Thermal Control as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Energy Sheath");
                this.assert(power !== null || power !== undefined, "If Fire Control, also has Energy Sheath");
                this.assertEquals(true, power.optionalPower, "If Fire Control, also has Energy Sheath as a Optional Power.");
              }
              if (maxPowers > 4) {
                const power = char.powers.find(p => p.name === "Energy Body");
                this.assert(power !== null || power !== undefined, "If Fire Control, also has Energy Body");
                this.assertEquals(true, power.optionalPower, "If Fire Control, also has Energy Body as a Optional Power.");
              }
            }
            break;
          case "EC12":
            {
              const maxPowers = Math.min(char.powersMax, 5);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Hard Radiation");
                this.assert(power !== null || power !== undefined, "If Hard Radiation Control, also has Hard Radiation");
                this.assertEquals(true, power.optionalPower, "If Hard Radiation Control, also has Hard Radiation as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Energy Doppelganger");
                this.assert(power !== null || power !== undefined, "If Hard Radiation Control, also has Energy Doppelganger");
                this.assertEquals(true, power.optionalPower, "If Hard Radiation Control, also has Energy Doppelganger as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Energy Sheath");
                this.assert(power !== null || power !== undefined, "If Hard Radiation Control, also has Energy Sheath");
                this.assertEquals(true, power.optionalPower, "If Hard Radiation Control, also has Energy Sheath as a Optional Power.");
              }
              if (maxPowers > 4) {
                const power = char.powers.find(p => p.name === "Energy Body");
                this.assert(power !== null || power !== undefined, "If Hard Radiation Control, also has Energy Body");
                this.assertEquals(true, power.optionalPower, "If Hard Radiation Control, also has Energy Body as a Optional Power.");
              }
            }
            break;
          case "EC13":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if(maxPowers > 1) {
                const power = char.powers.find(p => p.bonusPower && (p.name === "Telekinesis" || p.name === "Kinetic Bolt"));
                this.assert(power !== null || power !== undefined, "If Kinetic Control, also has Telekinesis or Kinetic Bolt");
                this.assertEquals(true, power.bonusPower, "If Kinetic Control, also has Telekinesis or Kinetic Bolt as a Bonus Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.optionalPower && (p.name === "Telekinesis" || p.name === "Kinetic Bolt"));
                this.assert(power !== null || power !== undefined, "If Kinetic Control, also has Telekinesis or Kinetic Bolt");
                this.assertEquals(true, power.optionalPower, "If Kinetic Control, also has Telekinesis or Kinetic Bolt as a Optional Power.");
              }
            }
            break;
          case "EC14":
            {
              const maxPowers = Math.min(char.powersMax, 5);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Light Emission");
                this.assert(power !== null || power !== undefined, "If Light Control, also has Light Emission");
                this.assertEquals(true, power.optionalPower, "If Light Control, also has Light Emission as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Energy Sheath");
                this.assert(power !== null || power !== undefined, "If Light Control, also has Energy Sheath");
                this.assertEquals(true, power.optionalPower, "If Light Control, also has Energy Sheath as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Carrier Wave");
                this.assert(power !== null || power !== undefined, "If Light Control, also has Carrier Wave");
                this.assertEquals(true, power.optionalPower, "If Light Control, also has Carrier Wave as a Optional Power.");
              }
              if (maxPowers > 4) {
                const power = char.powers.find(p => p.name === "Illusion Casting");
                this.assert(power !== null || power !== undefined, "If Light Control, also has Illusion Casting");
                this.assertEquals(true, power.optionalPower, "If Light Control, also has Illusion Casting as a Optional Power.");
              }
            }
            break;
          case "EC16":
            {
              const maxPowers = Math.min(char.powersMax, 5);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Plasma Generation");
                this.assert(power !== null || power !== undefined, "If Plasma Control, also has Plasma Generation");
                this.assertEquals(true, power.optionalPower, "If Plasma Control, also has Plasma Generation as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Energy Doppelganger");
                this.assert(power !== null || power !== undefined, "If Plasma Control, also has Energy Doppelganger");
                this.assertEquals(true, power.optionalPower, "If Plasma Control, also has Energy Doppelganger as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Energy Sheath");
                this.assert(power !== null || power !== undefined, "If Plasma Control, also has Energy Sheath");
                this.assertEquals(true, power.optionalPower, "If Plasma Control, also has Energy Sheath as a Optional Power.");
              }
              if (maxPowers > 4) {
                const power = char.powers.find(p => p.name === "Energy Body");
                this.assert(power !== null || power !== undefined, "If Plasma Control, also has Energy Body");
                this.assertEquals(true, power.optionalPower, "If Plasma Control, also has Energy Body as a Optional Power.");
              }
            }
            break;
          case "EC17":
            {
              const maxPowers = Math.min(char.powersMax, 5);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Radiowave Generation");
                this.assert(power !== null || power !== undefined, "If Radiowave Control, also has Radiowave Generation");
                this.assertEquals(true, power.bonusPower, "If Radiowave Control, also has Radiowave Generation as a Bonus Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Energy Doppelganger");
                this.assert(power !== null || power !== undefined, "If Radiowave Control, also has Energy Doppelganger");
                this.assertEquals(true, power.optionalPower, "If Radiowave Control, also has Energy Doppelganger as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Energy Sheath");
                this.assert(power !== null || power !== undefined, "If Radiowave Control, also has Energy Sheath");
                this.assertEquals(true, power.optionalPower, "If Radiowave Control, also has Energy Sheath as a Optional Power.");
              }
              if (maxPowers > 4) {
                const power = char.powers.find(p => p.name === "Carrier Wave");
                this.assert(power !== null || power !== undefined, "If Radiowave Control, also has Carrier Wave");
                this.assertEquals(true, power.optionalPower, "If Radiowave Control, also has Carrier Wave as a Optional Power.");
              }
            }
            break;
          case "EC18":
            {
              const maxPowers = Math.min(char.powersMax, 5);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Shadowcasting");
                this.assert(power !== null || power !== undefined, "If Shadowshaping, also has Shadowcasting");
                this.assertEquals(true, power.bonusPower, "If Shadowshaping, also has Shadowcasting as a Bonus Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Light Control");
                this.assert(power !== null || power !== undefined, "If Shadowshaping, also has Light Control");
                this.assertEquals(true, power.optionalPower, "If Shadowshaping, also has Light Control as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Energy Sheath");
                this.assert(power !== null || power !== undefined, "If , also has Energy Sheath");
                this.assertEquals(true, power.optionalPower, "If Shadowshaping, also has Energy Sheath as a Optional Power.");
              }
              if (maxPowers > 4) {
                const power = char.powers.find(p => p.name === "Energy Body");
                this.assert(power !== null || power !== undefined, "If Shadowshaping, also has Energy Body");
                this.assertEquals(true, power.optionalPower, "If Shadowshaping, also has Energy Body as a Optional Power.");
              }
            }
            break;
          case "EC19":
            {
              const maxPowers = Math.min(char.powersMax, 4);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Sonic Generation");
                this.assert(power !== null || power !== undefined, "If Sound Manipulation, also has Sonic Generation");
                this.assertEquals(true, power.bonusPower, "If Sound Manipulation, also has Sonic Generation as a Bous Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Vibration");
                this.assert(power !== null || power !== undefined, "If Sound Manipulation, also has Vibration");
                this.assertEquals(true, power.optionalPower, "If Sound Manipulation, also has Vibration as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Vibration Control");
                this.assert(power !== null || power !== undefined, "If Sound Manipulation, also has Vibration Control");
                this.assertEquals(true, power.optionalPower, "If Sound Manipulation, also has Vibration Control as a Optional Power.");
              }
            }
            break;
          case "EC20":
            {
              const maxPowers = Math.min(char.powersMax, 6);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Heat");
                this.assert(power !== null || power !== undefined, "If Thermal Control, also has Heat");
                this.assertEquals(true, power.optionalPower, "If Thermal Control, also has Heat as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Fire Generation");
                this.assert(power !== null || power !== undefined, "If Thermal Control, also has Fire Generation");
                this.assertEquals(true, power.optionalPower, "If Thermal Control, also has Fire Generation as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Cold Generation");
                this.assert(power !== null || power !== undefined, "If Thermal Control, also has Cold Generation");
                this.assertEquals(true, power.optionalPower, "If Thermal Control, also has Cold Generation as a Optional Power.");
              }
              if (maxPowers > 4) {
                const power = char.powers.find(p => p.name === "Fire Control");
                this.assert(power !== null || power !== undefined, "If Thermal Control, also has Fire Control");
                this.assertEquals(true, power.optionalPower, "If Thermal Control, also has Fire Control as a Optional Power.");
              }
              if (maxPowers > 5) {
                const power = char.powers.find(p => p.name === "Coldshaping");
                this.assert(power !== null || power !== undefined, "If Thermal Control, also has Coldshaping");
                this.assertEquals(true, power.optionalPower, "If Thermal Control, also has Coldshaping as a Optional Power.");
              }
            }
            break;
          case "EC21":
            {
              const maxPowers = Math.min(char.powersMax, 4);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Vibration");
                this.assert(power !== null || power !== undefined, "If Vibration Control, also has Vibration");
                this.assertEquals(true, power.optionalPower, "If Vibration Control, also has Vibration as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Sonic Generation");
                this.assert(power !== null || power !== undefined, "If Vibration Control, also has Sonic Generation");
                this.assertEquals(true, power.optionalPower, "If Vibration Control, also has Sonic Generation as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Sound Manipulation");
                this.assert(power !== null || power !== undefined, "If Vibration Control, also has Sound Manipulation");
                this.assertEquals(true, power.optionalPower, "If Vibration Control, also has Sound Manipulation as a Optional Power.");
              }
            }
            break;
          case "EE1":
            {
              const maxPowers = Math.min(char.powersMax, 4);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Coldshaping");
                this.assert(power !== null || power !== undefined, "If Cold Generation, also has Coldshaping");
                this.assertEquals(true, power.optionalPower, "If Cold Generation, also has Coldshaping as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Energy Solidification");
                this.assert(power !== null || power !== undefined, "If Cold Generation, also has Energy Solidification");
                this.assertEquals(true, power.optionalPower, "If Cold Generation, also has Energy Solidification as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Molding");
                this.assert(power !== null || power !== undefined, "If Cold Generation, also has Molding");
                this.assertEquals(true, power.optionalPower, "If Cold Generation, also has Molding as a Optional Power.");
              }
            }
            break;
          case "EE7":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Kinetic Control");
                this.assert(power !== null || power !== undefined, "If Kinetic Bolt, also has Kinetic Control");
                this.assertEquals(true, power.optionalPower, "If Kinetic Bolt, also has  as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Telekinesis");
                this.assert(power !== null || power !== undefined, "If Kinetic Bolt, also has Telekinesis");
                this.assertEquals(true, power.optionalPower, "If Kinetic Bolt, also has Telekinesis as a Optional Power.");
              }
            }
            break;
          case "EE11":
            {
              const maxPowers = Math.min(char.powersMax, 4);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Radiowave Control");
                this.assert(power !== null || power !== undefined, "If Radiowave Generation, also has Radiowave Control");
                this.assertEquals(true, power.optionalPower, "If Radiowave Generation, also has Radiowave Control as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Energy Sheath");
                this.assert(power !== null || power !== undefined, "If Radiowave Generation, also has Energy Sheath");
                this.assertEquals(true, power.optionalPower, "If Radiowave Generation, also has Energy Sheath as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Carrier Wave");
                this.assert(power !== null || power !== undefined, "If Radiowave Generation, also has Carrier Wave");
                this.assertEquals(true, power.optionalPower, "If Radiowave Generation, also has Carrier Wave as a Optional Power.");
              }
            }
            break;
          case "EE12":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Shadowshaping");
                this.assert(power !== null || power !== undefined, "If Shadowcasting, also has Shadowshaping");
                this.assertEquals(true, power.optionalPower, "If Shadowcasting, also has Shadowshaping as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Darkforce Manipulation");
                this.assert(power !== null || power !== undefined, "If Shadowcasting, also has Darkforce Manipulation");
                this.assertEquals(true, power.optionalPower, "If Shadowcasting, also has Darkforce Manipulation as a Optional Power.");
              }
            }
            break;
          case "EE13":
            {
              const maxPowers = Math.min(char.powersMax, 4);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Sound Manipulation");
                this.assert(power !== null || power !== undefined, "If Sonic Generation, also has Sound Manipulation");
                this.assertEquals(true, power.optionalPower, "If Sonic Generation, also has Sound Manipulation as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Vibration");
                this.assert(power !== null || power !== undefined, "If Sonic Generation, also has Vibration");
                this.assertEquals(true, power.optionalPower, "If Sonic Generation, also has Vibration as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Vibration Control");
                this.assert(power !== null || power !== undefined, "If Sonic Generation, also has Vibration Control");
                this.assertEquals(true, power.optionalPower, "If Sonic Generation, also has Vibration Control as a Optional Power.");
              }
            }
            break;
          case "EE14":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Vibration Control");
                this.assert(power !== null || power !== undefined, "If Vibration, also has Vibration Control");
                this.assertEquals(true, power.optionalPower, "If Vibration, also has Vibration Control as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Sonic Generation");
                this.assert(power !== null || power !== undefined, "If Vibration, also has Sonic Generation");
                this.assertEquals(true, power.optionalPower, "If Vibration, also has Sonic Generation as a Optional Power.");
              }
            }
            break;
          case "F2":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Iron Will");
                this.assert(power !== null || power !== undefined, "If Martial Supremacy, also has Iron Will");
                this.assertEquals(true, power.optionalPower, "If Martial Supremacy, also has Iron Will as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Weapons Creation");
                this.assert(power !== null || power !== undefined, "If Martial Supremacy, also has Weapons Creation");
                this.assertEquals(true, power.optionalPower, "If Martial Supremacy, also has Weapons Creation as a Optional Power.");
              }
            }
            break;
          case "I1":
            {
              const maxPowers = Math.min(char.powersMax, 4);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Telescopic Vision" || p.name === "Clairvoyance");
                this.assert(power !== null || power !== undefined, "If Animate Image, also has Telescopic Vision or Clairvoyance");
                this.assertEquals(true, power.optionalPower, "If Animate Image, also has Telescopic Vision orClairvoyance as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Energy Solidification");
                this.assert(power !== null || power !== undefined, "If Animate Image, also has ");
                this.assertEquals(true, power.optionalPower, "If Animate Image, also has  as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Elemental Creation" || p.name === "Molecular Creation");
                this.assert(power !== null || power !== undefined, "If Animate Image, also has Elemental Creation or Molecular Creation");
                this.assertEquals(true, power.optionalPower, "If Animate Image, also has Elemental Creation or Molecular Creation as a Optional Power.");
              }
            }
            break;
          case "I2":
            {
              const maxPowers = Math.min(char.powersMax, 4);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Energy Solidification");
                this.assert(power !== null || power !== undefined, "If Illusion Casting, also has Energy Solidification");
                this.assertEquals(true, power.optionalPower, "If Illusion Casting, also has Energy Solidification as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Telescopic Vision");
                this.assert(power !== null || power !== undefined, "If Illusion Casting, also has Telescopic Vision");
                this.assertEquals(true, power.optionalPower, "If Illusion Casting, also has Telescopic Vision as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Clairvoyance");
                this.assert(power !== null || power !== undefined, "If Illusion Casting, also has Clairvoyance");
                this.assertEquals(true, power.optionalPower, "If Illusion Casting, also has Clairvoyance as a Optional Power.");
              }
            }
            break;
          case "I3":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Light Control");
                this.assert(power !== null || power !== undefined, "If Illusory Invisibility, also has Light Control");
                this.assertEquals(true, power.optionalPower, "If Illusory Invisibility, also has Light Control as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Light Emission");
                this.assert(power !== null || power !== undefined, "If Illusory Invisibility, also has Light Emission");
                this.assertEquals(true, power.optionalPower, "If Illusory Invisibility, also has Light Emission as a Optional Power.");
              }
            }
            break;
          case "MG1":
            {
              const maxPowers = Math.min(char.powersMax, 4);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Elemental Conversion");
                this.assert(power !== null || power !== undefined, "If Enchantment, also has Elemental Conversion");
                this.assertEquals(true, power.optionalPower, "If Enchantment, also has Elemental Conversion as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Molecular Conversion");
                this.assert(power !== null || power !== undefined, "If Enchantment, also has Molecular Conversion");
                this.assertEquals(true, power.optionalPower, "If Enchantment, also has Molecular Conversion as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Molding");
                this.assert(power !== null || power !== undefined, "If Enchantment, also has Molding");
                this.assertEquals(true, power.optionalPower, "If Enchantment, also has Molding as a Optional Power.");
              }
            }
            break;
          case "MG3":
            {
              const maxPowers = Math.min(char.powersMax, 2);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Energy Doppelganger" || p.name === "Illusory Duplication" || 
                      p.name === "Lifeform Creation" || p.name === "Free Spirit" || p.name === "Anatomical Separation" || 
                      p.name === "Self-Duplication" || p.name === "Astral Body"
                );
                this.assert(power !== null || power !== undefined, "If Internal Limbo, also has Energy Doppelganger, Illusory Duplication, Lifeform Creation, Free Spirit, Anatomical Separation, Self-Duplication or Astral Body");
                this.assertEquals(true, power.optionalPower, "If Internal Limbo, also has Energy Doppelganger, Illusory Duplication, Lifeform Creation, Free Spirit, Anatomical Separation, Self-Duplication or Astral Body as a Optional Power.");
              }
            }
            break;
          case "MG5":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Hyper-Intelligence");
                this.assert(power !== null || power !== undefined, "If Magic Creation, also has Hyper-Intelligence");
                this.assertEquals(true, power.optionalPower, "If Magic Creation, also has Hyper-Intelligence as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Total Memory");
                this.assert(power !== null || power !== undefined, "If Magic Creation, also has Total Memory");
                this.assertEquals(true, power.optionalPower, "If Magic Creation, also has Total Memory as a Optional Power.");
              }
            }
            break;
          case "MG6":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Mind Control");
                this.assert(power !== null || power !== undefined, "If Magic Domination, also has Mind Control");
                this.assertEquals(true, power.optionalPower, "If Magic Domination, also has Mind Control as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Domination");
                this.assert(power !== null || power !== undefined, "If Magic Domination, also has Domination");
                this.assertEquals(true, power.optionalPower, "If Magic Domination, also has Domination as a Optional Power.");
              }
            }
            break;
          case "MG7":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Mind Transferral");
                this.assert(power !== null || power !== undefined, "If Magic Transferral, also has Mind Transferral");
                this.assertEquals(true, power.optionalPower, "If Magic Transferral, also has Mind Transferral as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Power Transferral");
                this.assert(power !== null || power !== undefined, "If Magic Transferral, also has Power Transferral");
                this.assertEquals(true, power.optionalPower, "If Magic Transferral, also has Power Transferral as a Optional Power.");
              }
            }
            break;
          case "MG10":
            {
              const maxPowers = Math.min(char.powersMax, 4);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Precognition");
                this.assert(power !== null || power !== undefined, "If Reality Alteration, also has Precognition");
                this.assertEquals(true, power.optionalPower, "If Reality Alteration, also has Precognition as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Clairvoyance");
                this.assert(power !== null || power !== undefined, "If , also has Clairvoyance");
                this.assertEquals(true, power.optionalPower, "If Reality Alteration, also has Clairvoyance as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Postcognition");
                this.assert(power !== null || power !== undefined, "If Reality Alteration, also has Postcognition");
                this.assertEquals(true, power.optionalPower, "If Reality Alteration, also has Postcognition as a Optional Power.");
              }
            }
            break;
          case "MG11":
            {
              const maxPowers = Math.min(char.powersMax, 2);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Bio-Vampirism");
                this.assert(power !== null || power !== undefined, "If Spirit Vampirism, also has Bio-Vampirism");
                this.assertEquals(true, power.optionalPower, "If Spirit Vampirism, also has Bio-Vampirism as a Optional Power.");
              }
            }
            break;
          case "MC1":
            {
              const maxPowers = Math.min(char.powersMax, 5);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Missile Creation");
                this.assert(power !== null || power !== undefined, "If Bonding, also has Missile Creation");
                this.assertEquals(true, power.optionalPower, "If Bonding, also has Missile Creation as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Spray");
                this.assert(power !== null || power !== undefined, "If Bonding, also has Spray");
                this.assertEquals(true, power.optionalPower, "If Bonding, also has Spray as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Webcasting");
                this.assert(power !== null || power !== undefined, "If Bonding, also has Webcasting");
                this.assertEquals(true, power.optionalPower, "If Bonding, also has Webcasting as a Optional Power.");
              }
              if (maxPowers > 4) {
                const power = char.powers.find(p => p.name === "Weapons Tinkering");
                this.assert(power !== null || power !== undefined, "If Bonding, also has Weapons Tinkering");
                this.assertEquals(true, power.optionalPower, "If Bonding, also has Weapons Tinkering as a Optional Power.");
              }
            }
            break;
          case "MC2":
            {
              const maxPowers = Math.min(char.powersMax, 8);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Crystallization");
                this.assert(power !== null || power !== undefined, "If Collection, also has Crystallization");
                this.assertEquals(true, power.optionalPower, "If Collection, also has Crystallization as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Matter Animation");
                this.assert(power !== null || power !== undefined, "If Collection, also has Matter Animation");
                this.assertEquals(true, power.optionalPower, "If Collection, also has Matter Animation as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Micro-Environment");
                this.assert(power !== null || power !== undefined, "If Collection, also has Micro-Environment");
                this.assertEquals(true, power.optionalPower, "If Collection, also has Micro-Environment as a Optional Power.");
              }
              if (maxPowers > 4) {
                const power = char.powers.find(p => p.name === "Molding");
                this.assert(power !== null || power !== undefined, "If Collection, also has Molding");
                this.assertEquals(true, power.optionalPower, "If Collection, also has Molding as a Optional Power.");
              }
              if (maxPowers > 5) {
                const power = char.powers.find(p => p.name === "Weather");
                this.assert(power !== null || power !== undefined, "If Collection, also has Weather");
                this.assertEquals(true, power.optionalPower, "If Collection, also has Weather as a Optional Power.");
              }
              if (maxPowers > 6) {
                const power = char.powers.find(p => p.name === "Elemental Conversion");
                this.assert(power !== null || power !== undefined, "If Collection, also has Elemental Conversion");
                this.assertEquals(true, power.optionalPower, "If Collection, also has Elemental Conversion as a Optional Power.");
              }
              if (maxPowers > 7) {
                const power = char.powers.find(p => p.name === "Molecular Conversion");
                this.assert(power !== null || power !== undefined, "If Collection, also has Molecular Conversion");
                this.assertEquals(true, power.optionalPower, "If Collection, also has Molecular Conversion as a Optional Power.");
              }
            }
            break;
          case "MC3":
            {
              const maxPowers = Math.min(char.powersMax, 6);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Weapons Creation");
                this.assert(power !== null || power !== undefined, "If Crystallization, also has Weapons Creation");
                this.assertEquals(true, power.optionalPower, "If Crystallization, also has Weapons Creation as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Collection");
                this.assert(power !== null || power !== undefined, "If Crystallization, also has Collection");
                this.assertEquals(true, power.optionalPower, "If Crystallization, also has Collection as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Matter Animation");
                this.assert(power !== null || power !== undefined, "If Crystallization, also has Matter Animation");
                this.assertEquals(true, power.optionalPower, "If Crystallization, also has Matter Animation as a Optional Power.");
              }
              if (maxPowers > 4) {
                const power = char.powers.find(p => p.name === "Missile Creation");
                this.assert(power !== null || power !== undefined, "If Crystallization, also has Missile Creation");
                this.assertEquals(true, power.optionalPower, "If Crystallization, also has Missile Creation as a Optional Power.");
              }
              if (maxPowers > 5) {
                const power = char.powers.find(p => p.name === "Spray");
                this.assert(power !== null || power !== undefined, "If Crystallization, also has Spray");
                this.assertEquals(true, power.optionalPower, "If Crystallization, also has Spray as a Optional Power.");
              }
            }
            break;
          case "MC9":
            {
              const maxPowers = Math.min(char.powersMax, 4);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Communicate with Cybernetics");
                this.assert(power !== null || power !== undefined, "If Machine Animation, also has Communicate with Cybernetics");
                this.assertEquals(true, power.optionalPower, "If , also has Communicate with Cybernetics as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Communicate with Non-Living");
                this.assert(power !== null || power !== undefined, "If Machine Animation, also has Communicate with Non-Living");
                this.assertEquals(true, power.optionalPower, "If , also has Communicate with Non-Living as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Matter Animation");
                this.assert(power !== null || power !== undefined, "If Machine Animation, also has Matter Animation");
                this.assertEquals(true, power.optionalPower, "If , also has Matter Animation as a Optional Power.");
              }
            }
            break;
          case "MC11":
            {
              const maxPowers = Math.min(char.powersMax, 5);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Elemental Conversion");
                this.assert(power !== null || power !== undefined, "If Molding, also has Elemental Conversion");
                this.assertEquals(true, power.optionalPower, "If Molding, also has Elemental Conversion as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Molecular Conversion");
                this.assert(power !== null || power !== undefined, "If Molding, also has Molecular Conversion");
                this.assertEquals(true, power.optionalPower, "If Molding, also has Molecular Conversion as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Collection");
                this.assert(power !== null || power !== undefined, "If Molding, also has Collection");
                this.assertEquals(true, power.optionalPower, "If Molding, also has Collection as a Optional Power.");
              }
              if (maxPowers > 4) {
                const power = char.powers.find(p => p.name === "Crystallization");
                this.assert(power !== null || power !== undefined, "If Molding, also has Crystallization");
                this.assertEquals(true, power.optionalPower, "If Molding, also has Crystallization as a Optional Power.");
              }
            }
            break;
          case "MC12":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Environmental Awareness");
                this.assert(power !== null || power !== undefined, "If Weather, also has Environmental Awareness");
                this.assertEquals(true, power.optionalPower, "If Weather, also has Environmental Awareness as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "True Flight" || p.name === "Whirlwind" || p.name === "Gliding");
                this.assert(power !== null || power !== undefined, "If Weather, also has True Flight, Whirlwind or Gliding");
                this.assertEquals(true, power.optionalPower, "If Weather, also has True Flight, Whirlwind or Gliding as a Optional Power.");
              }
            }
            break;
          case "MC13":
            {
              const maxPowers = Math.min(char.powersMax, 6);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Extradimensional");
                this.assert(power !== null || power !== undefined, "If Zombie Animation, also has Extradimensional");
                this.assertEquals(true, power.optionalPower, "If Zombie Animation, also has Extradimensional as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Forced Reincarnation");
                this.assert(power !== null || power !== undefined, "If Zombie Animation, also has Forced Reincarnation");
                this.assertEquals(true, power.optionalPower, "If Zombie Animation, also has Forced Reincarnation as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Summoning");
                this.assert(power !== null || power !== undefined, "If Zombie Animation, also has Summoning");
                this.assertEquals(true, power.optionalPower, "If Zombie Animation, also has Summoning as a Optional Power.");
              }
              if (maxPowers > 4) {
                const power = char.powers.find(p => p.name === "Undead Control");
                this.assert(power !== null || power !== undefined, "If Zombie Animation, also has Undead Control");
                this.assertEquals(true, power.optionalPower, "If Zombie Animation, also has Undead Control as a Optional Power.");
              }
              if (maxPowers > 5) {
                const power = char.powers.find(p => p.name === "Communicate with Non-Living");
                this.assert(power !== null || power !== undefined, "If Zombie Animation, also has Communicate with Non-Living");
                this.assertEquals(true, power.optionalPower, "If Zombie Animation, also has Communicate with Non-Living as a Optional Power.");
              }
            }
            break;
          case "MCo1":
            {
              const maxPowers = Math.min(char.powersMax, 2);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Light Control");
                this.assert(power !== null || power !== undefined, "If Coloration, also has Light Control");
                this.assertEquals(true, power.optionalPower, "If Coloration, also has Light Control as a Optional Power.");
              }
            }
            break;
          case "MCo2":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Fire Generation");
                this.assert(power !== null || power !== undefined, "If Combustion, also has Fire Generation");
                this.assertEquals(true, power.optionalPower, "If Combustion, also has Fire Generation as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Fire Control");
                this.assert(power !== null || power !== undefined, "If Combustion, also has Fire Control");
                this.assertEquals(true, power.optionalPower, "If Combustion, also has Fire Control as a Optional Power.");
              }
            }
            break;
          case "MCo4":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Matter Animation");
                this.assert(power !== null || power !== undefined, "If Elemental Conversion, also has Matter Animation");
                this.assertEquals(true, power.optionalPower, "If Elemental Conversion, also has Matter Animation as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Molding");
                this.assert(power !== null || power !== undefined, "If Elemental Conversion, also has Molding");
                this.assertEquals(true, power.optionalPower, "If Elemental Conversion, also has Molding as a Optional Power.");
              }
            }
            break;
          case "MCo6":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Matter Animation");
                this.assert(power !== null || power !== undefined, "If Molecular Conversion, also has Matter Animation");
                this.assertEquals(true, power.optionalPower, "If Molecular Conversion, also has Matter Animation as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Molding");
                this.assert(power !== null || power !== undefined, "If Molecular Conversion, also has Molding");
                this.assertEquals(true, power.optionalPower, "If Molecular Conversion, also has Molding as a Optional Power.");
              }
            }
            break;
          case "MCr1":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Matter Animation");
                this.assert(power !== null || power !== undefined, "If Artifact Creation, also has Matter Animation");
                this.assertEquals(true, power.optionalPower, "If Artifact Creation, also has Matter Animation as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Hyper-Intelligence");
                this.assert(power !== null || power !== undefined, "If Artifact Creation, also has Hyper-Intelligence");
                this.assertEquals(true, power.optionalPower, "If Artifact Creation, also has Hyper-Intelligence as a Optional Power.");
              }
            }
            break;
          case "MCr2":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Matter Animation");
                this.assert(power !== null || power !== undefined, "If Elemental Creation, also has Matter Animation");
                this.assertEquals(true, power.optionalPower, "If Elemental Creation, also has Matter Animation as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Machine Animation");
                this.assert(power !== null || power !== undefined, "If Elemental Creation, also has Machine Animation");
                this.assertEquals(true, power.optionalPower, "If Elemental Creation, also has Machine Animation as a Optional Power.");
              }
            }
            break;
          case "MCr3":
            {
              const maxPowers = Math.min(char.powersMax, 4);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Telepathy");
                this.assert(power !== null || power !== undefined, "If Lifeform Creation, also has Telepathy");
                this.assertEquals(true, power.optionalPower, "If Lifeform Creation, also has Telepathy as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Mind Control");
                this.assert(power !== null || power !== undefined, "If Lifeform Creation, also has Mind Control");
                this.assertEquals(true, power.optionalPower, "If Lifeform Creation, also has Mind Control as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Plant Control");
                this.assert(power !== null || power !== undefined, "If Lifeform Creation, also has Plant Control");
                this.assertEquals(true, power.optionalPower, "If Lifeform Creation, also has Plant Control as a Optional Power.");
              }
            }
            break;
          case "MCr4":
            {
              const maxPowers = Math.min(char.powersMax, 4);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Machine Animation");
                this.assert(power !== null || power !== undefined, "If Mechanical Creation, also has Machine Animation");
                this.assertEquals(true, power.optionalPower, "If Mechanical Creation, also has Machine Animation as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Hyper-Intelligence");
                this.assert(power !== null || power !== undefined, "If Mechanical Creation, also has Hyper-Intelligence");
                this.assertEquals(true, power.optionalPower, "If Mechanical Creation, also has Hyper-Intelligence as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Hyper-Invention");
                this.assert(power !== null || power !== undefined, "If Mechanical Creation, also has Hyper-Invention");
                this.assertEquals(true, power.optionalPower, "If Mechanical Creation, also has Hyper-Invention as a Optional Power.");
              }
            }
            break;
          case "MCr6":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Matter Animation");
                this.assert(power !== null || power !== undefined, "If Molecular Creation, also has Matter Animation");
                this.assertEquals(true, power.optionalPower, "If Molecular Creation, also has Matter Animation as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Machine Animation");
                this.assert(power !== null || power !== undefined, "If Molecular Creation, also has Machine Animation");
                this.assertEquals(true, power.optionalPower, "If Molecular Creation, also has Machine Animation as a Optional Power.");
              }
            }
            break;
          case "M1":
            {
              const maxPowers = Math.min(char.powersMax, 4);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Hyper-Hearing");
                this.assert(power !== null || power !== undefined, "If Clairaudience, also has Hyper-Hearing");
                this.assertEquals(true, power.optionalPower, "If Clairaudience, also has Hyper-Hearing as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Clairvoyance");
                this.assert(power !== null || power !== undefined, "If Clairaudience, also has Clairvoyance");
                this.assertEquals(true, power.optionalPower, "If Clairaudience, also has Clairvoyance as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Remote Sensing");
                this.assert(power !== null || power !== undefined, "If Clairaudience, also has Remote Sensing");
                this.assertEquals(true, power.optionalPower, "If Clairaudience, also has Remote Sensing as a Optional Power.");
              }
            }
            break;
          case "M2":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Clairaudience");
                this.assert(power !== null || power !== undefined, "If Clairvoyance, also has Clairaudience");
                this.assertEquals(true, power.optionalPower, "If Clairvoyance, also has Clairaudience as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Remote Sensing");
                this.assert(power !== null || power !== undefined, "If Clairvoyance, also has Remote Sensing");
                this.assertEquals(true, power.optionalPower, "If Clairvoyance, also has Remote Sensing as a Optional Power.");
              }
            }
            break;
          case "M3":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Linguistics");
                this.assert(power !== null || power !== undefined, "If Communicate with Animals, also has Linguistics");
                this.assertEquals(true, power.optionalPower, "If Communicate with Animals, also has Linguistics as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Communicate with Cybernetics" || p.name === "Communicate with Non-Living" || p.name === "Communicate with Plants");
                this.assert(power !== null || power !== undefined, "If Communicate with Animals, also has Communicate with Cybernetics, Communicate with Non-Living or Communicate with Plants");
                this.assertEquals(true, power.optionalPower, "If Communicate with Animals, also has Communicate with Cybernetics, Communicate with Non-Living or Communicate with Plants as a Optional Power.");
              }
            }
            break;
          case "M4":
            {
              const maxPowers = Math.min(char.powersMax, 2);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Linguistics");
                this.assert(power !== null || power !== undefined, "If Communicate with Cybernetics, also has Linguistics");
                this.assertEquals(true, power.optionalPower, "If Communicate with Cybernetics, also has Linguistics as a Optional Power.");
              }
            }
            break;
          case "M5":
            {
              const maxPowers = Math.min(char.powersMax, 2);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Communicate with Cybernetics");
                this.assert(power !== null || power !== undefined, "If Communicate with Non-Living, also has Communicate with Cybernetics");
                this.assertEquals(true, power.optionalPower, "If Communicate with Non-Living, also has Communicate with Cybernetics as a Optional Power.");
              }
            }
            break;
          case "M6":
            {
              const maxPowers = Math.min(char.powersMax, 5);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Communicate with Animals");
                this.assert(power !== null || power !== undefined, "If Communicate with Plants, also has Communicate with Animals");
                this.assertEquals(true, power.optionalPower, "If Communicate with Plants, also has Communicate with Animals as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Communicate with Non-Living");
                this.assert(power !== null || power !== undefined, "If Communicate with Plants, also has Communicate with Non-Living");
                this.assertEquals(true, power.optionalPower, "If Communicate with Plants, also has Communicate with Non-Living as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Plant Control");
                this.assert(power !== null || power !== undefined, "If Communicate with Plants, also has Plant Control");
                this.assertEquals(true, power.optionalPower, "If Communicate with Plants, also has Plant Control as a Optional Power.");
              }
              if (maxPowers > 4) {
                const power = char.powers.find(p => p.name === "Plant Growth");
                this.assert(power !== null || power !== undefined, "If Communicate with Plants, also has Plant Growth");
                this.assertEquals(true, power.optionalPower, "If Communicate with Plants, also has Plant Growth as a Optional Power.");
              }
            }
            break;
          case "M7":
            {
              const maxPowers = Math.min(char.powersMax, 2);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Hyper-Intelligence");
                this.assert(power !== null || power !== undefined, "If Cosmic Awareness, also has Hyper-Intelligence");
                this.assertEquals(true, power.optionalPower, "If Cosmic Awareness, also has Hyper-Intelligence as a Optional Power.");
              }
            }
            break;
          case "M9":
            {
              const maxPowers = Math.min(char.powersMax, 2);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Telepathy");
                this.assert(power !== null || power !== undefined, "If Dreamtravel, also has Telepathy");
                this.assertEquals(true, power.optionalPower, "If Dreamtravel, also has Telepathy as a Optional Power.");
              }
            }
            break;
          case "M10":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Clairvoyance");
                this.assert(power !== null || power !== undefined, "If Empathy, also has Clairvoyance");
                this.assertEquals(true, power.optionalPower, "If Empathy, also has Clairvoyance as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Emotion Control");
                this.assert(power !== null || power !== undefined, "If Empathy, also has Emotion Control");
                this.assertEquals(true, power.optionalPower, "If Empathy, also has Emotion Control as a Optional Power.");
              }
            }
            break;
          case "M13":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Hyper-Invention");
                this.assert(power !== null || power !== undefined, "If Hyper-Intelligence, also has Hyper-Invention");
                this.assertEquals(true, power.optionalPower, "If Hyper-Intelligence, also has Hyper-Invention as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Total Memory");
                this.assert(power !== null || power !== undefined, "If Hyper-Intelligence, also has Total Memory");
                this.assertEquals(true, power.optionalPower, "If Hyper-Intelligence, also has Total Memory as a Optional Power.");
              }
            }
            break;
          case "M14":
            {
              const maxPowers = Math.min(char.powersMax, 6);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Weapons Tinkering");
                this.assert(power !== null || power !== undefined, "If Hyper-Invention, also has Weapons Tinkering");
                this.assertEquals(true, power.optionalPower, "If Hyper-Invention, also has Weapons Tinkering as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Machine Animation");
                this.assert(power !== null || power !== undefined, "If Hyper-Invention, also has Machine Animation");
                this.assertEquals(true, power.optionalPower, "If Hyper-Invention, also has Machine Animation as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Molding");
                this.assert(power !== null || power !== undefined, "If Hyper-Invention, also has Molding");
                this.assertEquals(true, power.optionalPower, "If Hyper-Invention, also has Molding as a Optional Power.");
              }
              if (maxPowers > 4) {
                const power = char.powers.find(p => p.name === "Artifact Creation");
                this.assert(power !== null || power !== undefined, "If Hyper-Invention, also has Artifact Creation");
                this.assertEquals(true, power.optionalPower, "If Hyper-Invention, also has Artifact Creation as a Optional Power.");
              }
              if (maxPowers > 5) {
                const power = char.powers.find(p => p.name === "Mechanical Creation");
                this.assert(power !== null || power !== undefined, "If Hyper-Invention, also has Mechanical Creation");
                this.assertEquals(true, power.optionalPower, "If Hyper-Invention, also has Mechanical Creation as a Optional Power.");
              }
            }
            break;
          case "M15":
            {
              const maxPowers = Math.min(char.powersMax, 2);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Time Travel");
                this.assert(power !== null || power !== undefined, "If Incarnation Awareness, also has Time Travel");
                this.assertEquals(true, power.optionalPower, "If Incarnation Awareness, also has Time Travel as a Optional Power.");
              }
            }
            break;
          case "M17":
            {
              const maxPowers = Math.min(char.powersMax, 2);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Hyper-Intelligence");
                this.assert(power !== null || power !== undefined, "If Linguistics, also has Hyper-Intelligence");
                this.assertEquals(true, power.optionalPower, "If Linguistics, also has Hyper-Intelligence as a Optional Power.");
              }
            }
            break;
          case "M18":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Mind Drain");
                this.assert(power !== null || power !== undefined, "If Mental Duplication, also has Mind Drain");
                this.assertEquals(true, power.optionalPower, "If Mental Duplication, also has Mind Drain as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Duplication");
                this.assert(power !== null || power !== undefined, "If Mental Duplication, also has Duplication");
                this.assertEquals(true, power.optionalPower, "If Mental Duplication, also has Duplication as a Optional Power.");
              }
            }
            break;
          case "M20":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Telepathy");
                this.assert(power !== null || power !== undefined, "If Mental Probe, also has Telepathy");
                this.assertEquals(true, power.optionalPower, "If Mental Probe, also has Telepathy as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Sensory Link");
                this.assert(power !== null || power !== undefined, "If Mental Probe, also has Sensory Link");
                this.assertEquals(true, power.optionalPower, "If Mental Probe, also has Sensory Link as a Optional Power.");
              }
            }
            break;
          case "M21":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Telepathy");
                this.assert(power !== null || power !== undefined, "If Mind Blast, also has Telepathy");
                this.assertEquals(true, power.optionalPower, "If Mind Blast, also has Telepathy as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Mental Probe");
                this.assert(power !== null || power !== undefined, "If Mind Blast, also has Mental Probe");
                this.assertEquals(true, power.optionalPower, "If Mind Blast, also has Mental Probe as a Optional Power.");
              }
            }
            break;
          case "M22":
            {
              const maxPowers = Math.min(char.powersMax, 5);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Telepathy");
                this.assert(power !== null || power !== undefined, "If Mind Drain, also has Telepathy");
                this.assertEquals(true, power.optionalPower, "If Mind Drain, also has Telepathy as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Mental Probe");
                this.assert(power !== null || power !== undefined, "If Mind Drain, also has Mental Probe");
                this.assertEquals(true, power.optionalPower, "If Mind Drain, also has Mental Probe as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Mental Duplication");
                this.assert(power !== null || power !== undefined, "If Mind Drain, also has Mental Duplication");
                this.assertEquals(true, power.optionalPower, "If Mind Drain, also has Mental Duplication as a Optional Power.");
              }
              if (maxPowers > 4) {
                const power = char.powers.find(p => p.name === "Mind Blast");
                this.assert(power !== null || power !== undefined, "If Mind Drain, also has Mind Blast");
                this.assertEquals(true, power.optionalPower, "If Mind Drain, also has Mind Blast as a Optional Power.");
              }
            }
            break;
          case "M23":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Telepathy");
                this.assert(power !== null || power !== undefined, "If Postcognition, also has Telepathy");
                this.assertEquals(true, power.optionalPower, "If Postcognition, also has Telepathy as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Time Travel");
                this.assert(power !== null || power !== undefined, "If Postcognition, also has Time Travel");
                this.assertEquals(true, power.optionalPower, "If Postcognition, also has Time Travel as a Optional Power.");
              }
            }
            break;
          case "M24":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Telepathy");
                this.assert(power !== null || power !== undefined, "If Precognition, also has Telepathy");
                this.assertEquals(true, power.optionalPower, "If Precognition, also has Telepathy as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Time Travel");
                this.assert(power !== null || power !== undefined, "If Precognition, also has Time Travel");
                this.assertEquals(true, power.optionalPower, "If Precognition, also has Time Travel as a Optional Power.");
              }
            }
            break;
          case "M26":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Clairaudience");
                this.assert(power !== null || power !== undefined, "If Remote Sensing, also has Clairaudience");
                this.assertEquals(true, power.optionalPower, "If Remote Sensing, also has Clairaudience as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Clairvoyance");
                this.assert(power !== null || power !== undefined, "If Remote Sensing, also has Clairvoyance");
                this.assertEquals(true, power.optionalPower, "If Remote Sensing, also has Clairvoyance as a Optional Power.");
              }
            }
            break;
          case "M27":
            {
              const maxPowers = Math.min(char.powersMax, 2);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Telepathy");
                this.assert(power !== null || power !== undefined, "If Sensory Link, also has Telepathy");
                this.assertEquals(true, power.optionalPower, "If Sensory Link, also has Telepathy as a Optional Power.");
              }
            }
            break;
          case "M29":
            {
              const maxPowers = Math.min(char.powersMax, 6);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Clairaudience");
                this.assert(power !== null || power !== undefined, "If Speechthrowing, also has Clairaudience");
                this.assertEquals(true, power.bonusPower, "If Speechthrowing, also has Clairaudience as a Bonus Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Clairvoyance");
                this.assert(power !== null || power !== undefined, "If Speechthrowing, also has Clairvoyance");
                this.assertEquals(true, power.optionalPower, "If Speechthrowing, also has Clairvoyance as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Vocal Control");
                this.assert(power !== null || power !== undefined, "If Speechthrowing, also has Vocal Control");
                this.assertEquals(true, power.optionalPower, "If Speechthrowing, also has Vocal Control as a Optional Power.");
              }
              if (maxPowers > 4) {
                const power = char.powers.find(p => p.name === "Hyper-Hearing");
                this.assert(power !== null || power !== undefined, "If Speechthrowing, also has Hyper-Hearing");
                this.assertEquals(true, power.optionalPower, "If Speechthrowing, also has Hyper-Hearing as a Optional Power.");
              }
              if (maxPowers > 5) {
                const power = char.powers.find(p => p.name === "Sensory Link");
                this.assert(power !== null || power !== undefined, "If Speechthrowing, also has Sensory Link");
                this.assertEquals(true, power.optionalPower, "If Speechthrowing, also has Sensory Link as a Optional Power.");
              }
            }
            break;
          case "M30":
            {
              const maxPowers = Math.min(char.powersMax, 7);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Matter Animation");
                this.assert(power !== null || power !== undefined, "If Telekinesis, also has Matter Animation");
                this.assertEquals(true, power.optionalPower, "If Telekinesis, also has Matter Animation as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Molding");
                this.assert(power !== null || power !== undefined, "If Telekinesis, also has Molding");
                this.assertEquals(true, power.optionalPower, "If Telekinesis, also has Molding as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Clairvoyance");
                this.assert(power !== null || power !== undefined, "If Telekinesis, also has Clairvoyance");
                this.assertEquals(true, power.optionalPower, "If Telekinesis, also has Clairvoyance as a Optional Power.");
              }
              if (maxPowers > 4) {
                const power = char.powers.find(p => p.name === "Remote Sensing");
                this.assert(power !== null || power !== undefined, "If Telekinesis, also has Remote Sensing");
                this.assertEquals(true, power.optionalPower, "If Telekinesis, also has Remote Sensing as a Optional Power.");
              }
              if (maxPowers > 5) {
                const power = char.powers.find(p => p.name === "Levitation");
                this.assert(power !== null || power !== undefined, "If Telekinesis, also has Levitation");
                this.assertEquals(true, power.optionalPower, "If Telekinesis, also has Levitation as a Optional Power.");
              }
              if (maxPowers > 6) {
                const power = char.powers.find(p => p.name === "True Flight");
                this.assert(power !== null || power !== undefined, "If Telekinesis, also has True Flight");
                this.assertEquals(true, power.optionalPower, "If Telekinesis, also has True Flight as a Optional Power.");
              }
            }
            break;
          case "M31":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Clairvoyance");
                this.assert(power !== null || power !== undefined, "If Telelocation, also has Clairvoyance");
                this.assertEquals(true, power.optionalPower, "If Telelocation, also has Clairvoyance as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Extradimensional");
                this.assert(power !== null || power !== undefined, "If Telelocation, also has Extradimensional");
                this.assertEquals(true, power.optionalPower, "If Telelocation, also has Extradimensional as a Optional Power.");
              }
            }
            break;
          case "M32":
            {
              const maxPowers = Math.min(char.powersMax, 9);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Empathy");
                this.assert(power !== null || power !== undefined, "If Telepathy, also has Empathy");
                this.assertEquals(true, power.optionalPower, "If Telepathy, also has Empathy as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Hallucinations");
                this.assert(power !== null || power !== undefined, "If Telepathy, also has Hallucinations");
                this.assertEquals(true, power.optionalPower, "If Telepathy, also has Hallucinations as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Mental Invisibility");
                this.assert(power !== null || power !== undefined, "If Telepathy, also has Mental Invisibility");
                this.assertEquals(true, power.optionalPower, "If Telepathy, also has Mental Invisibility as a Optional Power.");
              }
              if (maxPowers > 4) {
                const power = char.powers.find(p => p.name === "Mental Probe");
                this.assert(power !== null || power !== undefined, "If Telepathy, also has Mental Probe");
                this.assertEquals(true, power.optionalPower, "If Telepathy, also has Mental Probe as a Optional Power.");
              }
              if (maxPowers > 5) {
                const power = char.powers.find(p => p.name === "Mind Blast");
                this.assert(power !== null || power !== undefined, "If Telepathy, also has Mind Blast");
                this.assertEquals(true, power.optionalPower, "If Telepathy, also has Mind Blast as a Optional Power.");
              }
              if (maxPowers > 6) {
                const power = char.powers.find(p => p.name === "Mind Drain");
                this.assert(power !== null || power !== undefined, "If Telepathy, also has Mind Drain");
                this.assertEquals(true, power.optionalPower, "If Telepathy, also has Mind Drain as a Optional Power.");
              }
              if (maxPowers > 7) {
                const power = char.powers.find(p => p.name === "Sensory Link");
                this.assert(power !== null || power !== undefined, "If Telepathy, also has Sensory Link");
                this.assertEquals(true, power.optionalPower, "If Telepathy, also has Sensory Link as a Optional Power.");
              }
              if (maxPowers > 8) {
                const power = char.powers.find(p => p.name === "Psionic Detection");
                this.assert(power !== null || power !== undefined, "If Telepathy, also has Psionic Detection");
                this.assertEquals(true, power.optionalPower, "If Telepathy, also has Psionic Detection as a Optional Power.");
              }
            }
            break;
          case "M33":
            {
              const maxPowers = Math.min(char.powersMax, 4);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Hyper-Invention");
                this.assert(power !== null || power !== undefined, "If Total Memory, also has Hyper-Invention");
                this.assertEquals(true, power.optionalPower, "If Total Memory, also has Hyper-Invention as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Hyper-Intelligence");
                this.assert(power !== null || power !== undefined, "If Total Memory, also has Hyper-Intelligence");
                this.assertEquals(true, power.optionalPower, "If Total Memory, also has Hyper-Intelligence as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Weapons Tinkering");
                this.assert(power !== null || power !== undefined, "If Total Memory, also has Weapons Tinkering");
                this.assertEquals(true, power.optionalPower, "If Total Memory, also has Weapons Tinkering as a Optional Power.");
              }
            }
            break;
          case "P2":
            {
              const maxPowers = Math.min(char.powersMax, 2);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Regeneration");
                this.assert(power !== null || power !== undefined, "If Body Resistance, also has Regeneration");
                this.assertEquals(true, power.optionalPower, "If Body Resistance, also has Regeneration as a Optional Power.");
              }
            }
            break;
          case "P4":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Lung Adaptability");
                this.assert(power !== null || power !== undefined, "If Digestive Adaptation, also has Lung Adaptability");
                this.assertEquals(true, power.optionalPower, "If Digestive Adaptation, also has Lung Adaptability as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Body Adaptation");
                this.assert(power !== null || power !== undefined, "If Digestive Adaptation, also has Body Adaptation");
                this.assertEquals(true, power.optionalPower, "If Digestive Adaptation, also has Body Adaptation as a Optional Power.");
              }
            }
            break;
          case "PC3":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Mind Control");
                this.assert(power !== null || power !== undefined, "If Domination, also has Mind Control");
                this.assertEquals(true, power.optionalPower, "If Domination, also has Mind Control as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Magic Domination");
                this.assert(power !== null || power !== undefined, "If Domination, also has Magic Domination");
                this.assertEquals(true, power.optionalPower, "If Domination, also has Magic Domination as a Optional Power.");
              }
            }
            break;
          case "PC10":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Mind Transferral");
                this.assert(power !== null || power !== undefined, "If Power Transferral, also has Mind Transferral");
                this.assertEquals(true, power.optionalPower, "If Power Transferral, also has Mind Transferral as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Magic Transferral");
                this.assert(power !== null || power !== undefined, "If Power Transferral, also has Magic Transferral");
                this.assertEquals(true, power.optionalPower, "If Power Transferral, also has Magic Transferral as a Optional Power.");
              }
            }
            break;
          case "T1":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.category === "Magic");
                this.assert(power !== null || power !== undefined, "If Astral Body, also has a category of Magic");
                this.assertEquals(true, power.optionalPower, "If Astral Body, also has a category of Magic as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Extradimensional");
                this.assert(power !== null || power !== undefined, "If Astral Body, also has Extradimensional");
                this.assertEquals(true, power.optionalPower, "If Astral Body, also has Extradimensional as a Optional Power.");
              }
            }
            break;
          case "T2":
            {
              const maxPowers = Math.min(char.powersMax, 2);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Energy Detection");
                this.assert(power !== null || power !== undefined, "If Carrier Wave, also has Energy Detection");
                this.assertEquals(true, power.optionalPower, "If Carrier Wave, also has Energy Detection as a Optional Power.");
              }
            }
            break;
          case "T4":
            {
              const maxPowers = Math.min(char.powersMax, 2);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Energy Detection");
                this.assert(power !== null || power !== undefined, "If Energy Path, also has Energy Detection");
                this.assertEquals(true, power.optionalPower, "If Energy Path, also has Energy Detection as a Optional Power.");
              }
            }
            break;
          case "T5":
            {
              const maxPowers = Math.min(char.powersMax, 2);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Kinetic Bolt");
                this.assert(power !== null || power !== undefined, "If Floating Disc, also has Kinetic Bolt");
                this.assertEquals(true, power.optionalPower, "If Floating Disc, also has Kinetic Bolt as a Optional Power.");
              }
            }
            break;
          case "T7":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Weather");
                this.assert(power !== null || power !== undefined, "If Gliding, also has Weather");
                this.assertEquals(true, power.optionalPower, "If Gliding, also has Weather as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Matter Animation");
                this.assert(power !== null || power !== undefined, "If Gliding, also has Matter Animation");
                this.assertEquals(true, power.optionalPower, "If Gliding, also has Matter Animation as a Optional Power.");
              }
            }
            break;
          case "T8":
            {
              const maxPowers = Math.min(char.powersMax, 4);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.bonusPower && (p.name === "Natural Weaponry" || p.name === "Body Resistance"));
                this.assert(power !== null || power !== undefined, "If Hyper-Digging, also has Natural Weaponry or Body Resistance");
                this.assertEquals(true, power.bonusPower, "If Hyper-Digging, also has Natural Weaponry or Body Resistance as a Bonus Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Armor Skin");
                this.assert(power !== null || power !== undefined, "If Hyper-Digging, also has Armor Skin");
                this.assertEquals(true, power.optionalPower, "If Hyper-Digging, also has Armor Skin as a Optional Power.");
              }
              if (maxPowers > 3) {
                let power = char.powers.find(p => p.bonusPower && p.name === "Body Resistance");
                if(power === null || power === undefined) {
                  power = char.powers.find(p => p.name === "Body Resistance");
                  this.assert(power !== null || power !== undefined, "If Hyper-Digging, also has Body Resistance");
                  this.assertEquals(true, power.optionalPower, "If Hyper-Digging, also has Body Resistance as a Optional Power.");
                }
              }
            }
            break;
          case "T11":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.bonusPower && (p.name === "Waterbreathing" || p.name === "Water Freedom"));
                this.assert(power !== null || power !== undefined, "If Hyper-Digging, also has Waterbreathing or Body Resistance");
                this.assertEquals(true, power.bonusPower, "If Hyper-Digging, also has Waterbreathing or Body Resistance as a Bonus Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.optionalPower && (p.name === "Waterbreathing" || p.name === "Water Freedom"));
                this.assert(power !== null || power !== undefined, "If Hyper-Swimming, also has Waterbreathing or Water Freedom");
                this.assertEquals(true, power.optionalPower, "If Hyper-Swimming, also has Waterbreathing or Water Freedom as a Optional Power.");
              }
            }
            break;
          case "T12":
            {
              const maxPowers = Math.min(char.powersMax, 2);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Telekinesis");
                this.assert(power !== null || power !== undefined, "If Levitation, also has Telekinesis");
                this.assertEquals(true, power.optionalPower, "If Levitation, also has Telekinesis as a Optional Power.");
              }
            }
            break;
          case "T14":
            {
              const maxPowers = Math.min(char.powersMax, 2);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Telekinesis");
                this.assert(power !== null || power !== undefined, "If Skywalk, also has Telekinesis");
                this.assertEquals(true, power.optionalPower, "If Skywalk, also has Telekinesis as a Optional Power.");
              }
            }
            break;
          case "T16":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Teleport Others");
                this.assert(power !== null || power !== undefined, "If Teleport Self, also has Teleport Others");
                this.assertEquals(true, power.optionalPower, "If Teleport Self, also has Teleport Others as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Clairvoyance");
                this.assert(power !== null || power !== undefined, "If Teleport Self, also has Clairvoyance");
                this.assertEquals(true, power.optionalPower, "If Teleport Self, also has Clairvoyance as a Optional Power.");
              }
            }
            break;
          case "T17":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Teleport Self");
                this.assert(power !== null || power !== undefined, "If Teleport Others, also has Teleport Self");
                this.assertEquals(true, power.optionalPower, "If Teleport Others, also has Teleport Self as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Clairvoyance");
                this.assert(power !== null || power !== undefined, "If Teleport Others, also has Clairvoyance");
                this.assertEquals(true, power.optionalPower, "If Teleport Others, also has Clairvoyance as a Optional Power.");
              }
            }
            break;
          case "T18":
            {
              const maxPowers = Math.min(char.powersMax, 4);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Clairvoyance");
                this.assert(power !== null || power !== undefined, "If Telereformation, also has Clairvoyance");
                this.assertEquals(true, power.optionalPower, "If Telereformation, also has Clairvoyance as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Free Spirit");
                this.assert(power !== null || power !== undefined, "If Telereformation, also has Free Spirit");
                this.assertEquals(true, power.optionalPower, "If Telereformation, also has Free Spirit as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Serial Immortality");
                this.assert(power !== null || power !== undefined, "If Telereformation, also has Serial Immortality");
                this.assertEquals(true, power.optionalPower, "If Telereformation, also has Serial Immortality as a Optional Power.");
              }
            }
            break;
          case "T19":
            {
              const maxPowers = Math.min(char.powersMax, 5);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Dimension Travel");
                this.assert(power !== null || power !== undefined, "If Time Travel, also has Dimension Travel");
                this.assertEquals(true, power.optionalPower, "If Time Travel, also has Dimension Travel as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Precognition");
                this.assert(power !== null || power !== undefined, "If Time Travel, also has Precognition");
                this.assertEquals(true, power.optionalPower, "If Time Travel, also has Precognition as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Postcognition");
                this.assert(power !== null || power !== undefined, "If Time Travel, also has Postcognition");
                this.assertEquals(true, power.optionalPower, "If Time Travel, also has Postcognition as a Optional Power.");
              }
              if (maxPowers > 4) {
                const power = char.powers.find(p => p.name === "Reality Alteration");
                this.assert(power !== null || power !== undefined, "If Time Travel, also has Reality Alteration");
                this.assertEquals(true, power.optionalPower, "If Time Travel, also has Reality Alteration as a Optional Power.");
              }
            }
            break;
          case "T21":
            {
              const maxPowers = Math.min(char.powersMax, 5);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Body Resistance");
                this.assert(power !== null || power !== undefined, "If True Flight, also has Body Resistance");
                this.assertEquals(true, power.optionalPower, "If True Flight, also has Body Resistance as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Armor Skin");
                this.assert(power !== null || power !== undefined, "If True Flight, also has Armor Skin");
                this.assertEquals(true, power.optionalPower, "If True Flight, also has Armor Skin as a Optional Power.");
              }
              if (maxPowers > 3) {
                const power = char.powers.find(p => p.name === "Self-Sustenance");
                this.assert(power !== null || power !== undefined, "If True Flight, also has Self-Sustenance");
                this.assertEquals(true, power.optionalPower, "If True Flight, also has Self-Sustenance as a Optional Power.");
              }
              if (maxPowers > 4) {
                const power = char.powers.find(p => p.name === "Telekinesis");
                this.assert(power !== null || power !== undefined, "If True Flight, also has Telekinesis");
                this.assertEquals(true, power.optionalPower, "If True Flight, also has Telekinesis as a Optional Power.");
              }
            }
            break;
          case "T23":
            {
              const maxPowers = Math.min(char.powersMax, 3);
              if (maxPowers > 1) {
                const power = char.powers.find(p => p.name === "Weather");
                this.assert(power !== null || power !== undefined, "If Whirlwind, also has Weather");
                this.assertEquals(true, power.optionalPower, "If Whirlwind, also has Weather as a Optional Power.");
              }
              if (maxPowers > 2) {
                const power = char.powers.find(p => p.name === "Matter Animation");
                this.assert(power !== null || power !== undefined, "If Whirlwind, also has Matter Animation");
                this.assertEquals(true, power.optionalPower, "If Whirlwind, also has Matter Animation as a Optional Power.");
              }
            }
            break;
        }
      }
      catch(ex) {
        this.assert(false, "Exception: " + ex.message + ex.stack);
      }
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
    // Currently there are no talents that count as 2, so this isn't needed.
    //this.TalentsTooManyTests(gen);
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
