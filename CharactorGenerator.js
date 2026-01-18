// K2 to collapse
class CharacterGenerator {
  physicalFormRoll = 0;
  subTypeRoll = 0;
  compoundRandomRanksColumnRoll = 0;
  combinationsRoll = 0;
  bodyTypeRolls = Array(10).fill(0);
  originRoll = 0;

  physicalAbilitiesCount = 1;
  physicalAbilityRolls = [{ "Fighting": 0, "Agility": 0, "Strength": 0, "Endurance": 0 },
  { "Fighting": 0, "Agility": 0, "Strength": 0, "Endurance": 0 },
  { "Fighting": 0, "Agility": 0, "Strength": 0, "Endurance": 0 },
  { "Fighting": 0, "Agility": 0, "Strength": 0, "Endurance": 0 },
  { "Fighting": 0, "Agility": 0, "Strength": 0, "Endurance": 0 },
  { "Fighting": 0, "Agility": 0, "Strength": 0, "Endurance": 0 }
  ];

  mentalAbilityRolls = { "Reason": 0, "Intuition": 0, "Psyche": 0 };

  resourceModifierRoll = 0;

  powerNumberRoll = 0;
  powerCategoryRolls = Array(30).fill(0);
  powerRolls = Array(30).fill(0);
  powerRankRolls = Array(30).fill(0);

  talentNumberRoll = 0;
  talentCategoryRolls = Array(30).fill(0);
  talentRolls = Array(30).fill(0);

  contactNumberRoll = 0;
  contactCategoryRolls = Array(30).fill(0);
  contactRolls = Array(30).fill(0);

  popularityRoll = 0;

  weaknessStimulusRoll = 0;
  weaknessEffectRoll = 0;
  weaknessDurationRoll = 0;
  weaknessRankRoll = 0;

  randomRanksColumn = -1;

  identitySecret = true;
  hiTechToGood = true;

  generatorMode = 'generic';

  physicalFormTable = PHYSICAL_FORM_TABLE;
  originTable = ORIGIN_TABLE;
  randomRanksTable = RANDOM_RANKS_TABLE;
  abilityModifierTable = ABILITY_MODIFIER_TABLE;
  quantityTable = QUANTITY_TABLE;
  powerCategoriesTable = POWER_CATEGORIES_TABLE;
  powerListTable = POWER_LIST_TABLE;
  talentCategoriesTable = TALENT_CATEGORIES_TABLE;
  talentListTable = TALENT_LIST_TABLE;
  contactCategoriesTable = CONTACT_CATEGORIES_TABLE;
  contactTypeListTable = CONTACT_TYPE_LIST_TABLE;
  weaknessStimulusTable = null;
  weaknessEffectTable = null;
  weaknessDurationTable = null;

  generateWithoutThrows() {
    const char = new Character();

    this.setTables();

    // 1. Determine Physical Form (for Ultimate)
    this.determinePhysicalForm(char);

    // 2. Determine Origin
    this.determineOrigin(char);

    // 3. Determine Primary Abilities (FASERIP)
    this.determinePrimaryAbilities(char);

    // 4. Secondary Abilities Setup
    this.determineResources(char);
    this.determinePopularity(char);

    // 5. Special Abilities (Powers, Talents, Contacts)
    this.determineSpecialAbilities(char);

    // 6. Weakness (Ultimate Only)
    if (this.generatorMode === 'ultimate') {
      this.determineWeakness(char);
    }

    // Final Calculation
    char.calculateSecondary();
    this.determineHealth(char);

    char.identity = this.identitySecret ? "Secret" : "Public";

    return char;
  }

  generate() {
    const char = new Character();

    this.throwAllRolls();
    this.setTables();

    // 1. Determine Physical Form (for Ultimate)
    this.determinePhysicalForm(char);

    // 2. Determine Origin
    this.determineOrigin(char);

    // 3. Determine Primary Abilities (FASERIP)
    this.determinePrimaryAbilities(char);

    // 4. Secondary Abilities Setup
    this.determineResources(char);
    this.determinePopularity(char);

    // 5. Special Abilities (Powers, Talents, Contacts)
    this.determineSpecialAbilities(char);

    // 6. Weakness (Ultimate Only)
    if (this.generatorMode === 'ultimate') {
      this.determineWeakness(char);
    }

    // Final Calculation
    char.calculateSecondary();
    this.determineHealth(char);

    char.identity = this.identitySecret ? "Secret" : "Public";

    return char;
  }

  throwAllRolls() {
    this.physicalFormRoll = Dice.roll100();
    this.subTypeRoll = Dice.roll100();
    this.combinationsRoll = Dice.roll100();
    this.compoundRandomRanksColumnRoll = Dice.roll100();
    for (let i = 0; i < this.bodyTypeRolls.length; i++) {
      this.bodyTypeRolls[i] = Dice.roll100();
    }
    this.originRoll = Dice.roll100();
    this.originOfPowerRoll = Dice.roll100(); // For Ultimate

    this.anyAbilityAdjustmentRoll = Dice.roll100();
    for (let index = 0; index < this.physicalAbilityRolls.length; index++) {
      PHYSICAL_ABILITIES.forEach(a => this.physicalAbilityRolls[index][a] = Dice.roll100());
    }

    MENTAL_ABILITIES.forEach(a => this.mentalAbilityRolls[a] = Dice.roll100());

    this.resourceModifierRoll = Dice.roll100();
    this.powerNumberRoll = Dice.roll100();
    this.talentNumberRoll = Dice.roll100();
    this.contactNumberRoll = Dice.roll100();

    for (let i = 0; i < 30; i++) {
      this.powerCategoryRolls[i] = Dice.roll100();
      this.powerRankRolls[i] = Dice.roll100();
      this.talentCategoryRolls[i] = Dice.roll100();
      this.contactCategoryRolls[i] = Dice.roll100();

      this.powerRolls[i] = Dice.roll100();
      this.talentRolls[i] = Dice.roll100();
      this.contactRolls[i] = Dice.roll100();

      if (this.generatorMode === 'ultimate') {
        this.powerRolls[i] = Dice.roll100();
        this.talentRolls[i] = Dice.roll100();
        this.contactRolls[i] = Dice.roll100();
      }

    }

    this.popularityRoll = Dice.roll100();

    this.weaknessStimulusRoll = Dice.roll100();
    this.weaknessEffectRoll = Dice.roll100();
    this.weaknessDurationRoll = Dice.roll100();
    this.weaknessRankRoll = Dice.roll100();
  }

  setTables() {
    // Set Tables based on Mode
    this.physicalFormTable = PHYSICAL_FORM_TABLE;
    this.originTable = ORIGIN_TABLE;
    this.randomRanksTable = RANDOM_RANKS_TABLE;
    this.abilityModifierTable = ABILITY_MODIFIER_TABLE;
    this.quantityTable = QUANTITY_TABLE;
    this.powerCategoriesTable = POWER_CATEGORIES_TABLE;
    this.powerListTable = POWER_LIST_TABLE;
    this.talentCategoriesTable = TALENT_CATEGORIES_TABLE;
    this.talentListTable = TALENT_LIST_TABLE;
    this.contactCategoriesTable = CONTACT_CATEGORIES_TABLE;
    this.contactTypeListTable = CONTACT_TYPE_LIST_TABLE;
    this.weaknessStimulusTable = null;
    this.weaknessEffectTable = null;
    this.weaknessDurationTable = null;

    if (this.generatorMode === 'advanced') {
      this.physicalFormTable = PHYSICAL_FORM_ADVANCED_TABLE;
      this.originTable = ORIGIN_TABLE;
      this.randomRanksTable = RANDOM_RANKS_TABLE;
      this.abilityModifierTable = ABILITY_MODIFIER_TABLE;
      this.quantityTable = QUANTITY_TABLE;
      this.powerCategoriesTable = POWER_CATEGORIES_ADVANCED_TABLE;
      this.powerListTable = POWER_LIST_ADVANCED_TABLE;
      this.talentCategoriesTable = TALENT_CATEGORIES_ADVANCED_TABLE;
      this.talentListTable = TALENT_LIST_ADVANCED_TABLE;
      this.contactCategoriesTable = CONTACT_CATEGORIES_ADVANCED_TABLE;
      this.contactTypeListTable = CONTACT_TYPE_LIST_ADVANCED_TABLE;
      this.weaknessStimulusTable = null;
      this.weaknessEffectTable = null;
      this.weaknessDurationTable = null;
    } else if (this.generatorMode === 'ultimate') {
      this.physicalFormTable = PHYSICAL_FORM_ULTIMATE_TABLE;
      this.originTable = ORIGIN_ULTIMATE_TABLE;
      this.randomRanksTable = RANDOM_RANKS_ULTIMATE_TABLE;
      this.abilityModifierTable = ABILITY_MODIFIER_TABLE;
      this.quantityTable = QUANTITY_ULTIMATE_TABLE;
      this.powerCategoriesTable = POWER_CATEGORIES_ULTIMATE_TABLE;
      this.powerListTable = POWER_LIST_ULTIMATE_TABLE;
      this.talentCategoriesTable = TALENT_CATEGORIES_ULTIMATE_TABLE;
      this.talentListTable = TALENT_LIST_ULTIMATE_TABLE;
      this.contactCategoriesTable = CONTACT_CATEGORIES_ULTIMATE_TABLE;
      this.contactTypeListTable = CONTACT_TYPE_LIST_ULTIMATE_TABLE;
      this.weaknessStimulusTable = WEAKNESS_STIMULUS_ULTIMATE_TABLE;
      this.weaknessEffectTable = WEAKNESS_EFFECT_ULTIMATE_TABLE;
      this.weaknessDurationTable = WEAKNESS_DURATION_ULTIMATE_TABLE;
    }
  }

  determinePhysicalForm(char) {
    if (this.physicalFormRoll < 1 || this.physicalFormRoll > 100) {
      char.logRoll("Physical Form", -1, "Invalid Roll");
      return;
    }

    const physicalFormData = this.physicalFormTable.find(o => this.physicalFormRoll <= o.maxRoll);
    let randomRanksColumn = -1;

    const subType = Utility.getValue(physicalFormData, 'subType', -1);
    if (subType !== -1) {
      const possibleTypes = subType.split('|');
      const roll = this.subTypeRoll;

      for (let index = 0; index < possibleTypes.length; index++) {
        const typeData = possibleTypes[index].split('(');
        const name = typeData[0];
        const maxRoll = typeData[1].replace(')', '');
        if (roll <= maxRoll) {
          char.subType = name;
          char.logRoll("Physical Form Sub Type", this.subTypeRoll, char.subType);
          break;
        }
      }
    }

    const combinations = Utility.getValue(physicalFormData, 'combinations', -1);
    if (combinations !== -1) {
      char.bodyTypes = [];

      const possibleTypes = combinations.split('|');
      const roll = this.combinationsRoll;
      let bodyTypeTable = [];

      char.logRoll("Physical Form Combinations", roll, "Combinations");

      // Build the temp table from the combinations attirbute
      for (let index = 0; index < possibleTypes.length; index++) {
        const parts = possibleTypes[index].split('\\');
        const numberOfTypes = +parts[0];
        const advantage = +parts[1].split("(")[0];
        const maxRoll = +parts[1].split("(")[1].replace(")", "");

        bodyTypeTable.push({
          numberOfTypes: numberOfTypes,
          advantage: advantage,
          maxRoll: maxRoll,
          advantageMaxRoll: advantage * (index + 1)
        });
      }

      // Get the row based on the roll
      let combinationRow = bodyTypeTable.find(o => roll <= o.maxRoll);

      // Build a custom/temp ranks roll table for determining which body type to use for randomRanksColumn
      let tempRandomRanksColumnTable = [];
      for (let index = 0; index < combinationRow.numberOfTypes; index++) {
        tempRandomRanksColumnTable.push((index + 1) * combinationRow.advantage);
      }

      // Mak sure that 100 is the last value in the table
      if (tempRandomRanksColumnTable[tempRandomRanksColumnTable.length - 1] !== 100) {
        tempRandomRanksColumnTable[tempRandomRanksColumnTable.length] = 100;
      }

      let thisBodyType = null;
      let thisRoll = 0;
      let thisValue = -1;

      let rollIndex = 0;
      for (let index = 0; index < combinationRow.numberOfTypes; index++) {
        thisRoll = this.bodyTypeRolls[rollIndex];
        thisBodyType = this.physicalFormTable.find(o => thisRoll <= o.maxRoll);
        thisValue = Utility.getValue(thisBodyType, "combinations", -1);

        while (thisValue !== -1) {
          // We don't want to spiral out of control, so we can't
          // have a second combination
          rollIndex++;
          thisRoll = this.bodyTypeRolls[rollIndex];
          thisBodyType = this.physicalFormTable.find(o => thisRoll <= o.maxRoll);
          thisValue = Utility.getValue(thisBodyType, "combinations", -1);
        }

        rollIndex++;

        // We got a body type that isn't combination
        char.bodyTypes.push(thisBodyType.name);
        char.logRoll("Physical Form Body Type", this.thisRoll, thisBodyType.name);
      }

      const tempRandomRanksColumnIndex = tempRandomRanksColumnTable.findIndex(o => this.compoundRandomRanksColumnRoll <= o);
      const tempRRCRow = this.physicalFormTable.find(o => o.name === char.bodyTypes[tempRandomRanksColumnIndex]);
      randomRanksColumn = tempRRCRow.column;
    }

    this.randomRanksColumn = physicalFormData.column;
    if (randomRanksColumn !== -1) this.randomRanksColumn = randomRanksColumn;

    char.physicalForm = physicalFormData.name;
    char.logRoll("Physical Form", this.physicalFormRoll, char.physicalForm);

    let value = Utility.getValue(physicalFormData, "bonusContactsCount", 0);
    if (value !== 0) {
      let bonusContact = Utility.getValue(physicalFormData, "bonusContact", "");
      for (let index = 0; index < value; index++) {
        this.generateBonusContact(char, bonusContact, true);
      }
    }
  }

  determineOrigin(char) {
    if (this.originRoll < 1 || this.originRoll > 100) {
      char.logRoll("Origin", -1, "Invalid Roll");
      return;
    }

    const originData = this.originTable.find(o => this.originRoll <= o.maxRoll);
    char.origin = originData.name;
    char.logRoll("Origin", this.originRoll, char.origin);
  }

  determineAbility(char, ability, physicalFormRow, abilityIndex) {
    if (abilityIndex === undefined || abilityIndex === null) abilityIndex = 0;
    let abilityRolls = this.physicalAbilityRolls[abilityIndex];
    if (MENTAL_ABILITIES.includes(ability)) {
      abilityRolls = this.mentalAbilityRolls;
    }

    const abilityLower = ability.toLowerCase();
    let value = Utility.getValue(physicalFormRow, abilityLower + 'Set', -1);
    if (value !== -1) {
      char.setAbility(ability, physicalFormRow[abilityLower + 'Set'].rank, physicalFormRow[abilityLower + 'Set'].rankNumber);
      char.logRoll(`Primary Ability: ${ability}`, "Base Rules", originRow[ability + 'Set']);
      return;
    }

    let rankRow = null;

    value = Utility.getValue(physicalFormRow, abilityLower + 'Start', -1);
    if (value !== -1) {
      rankRow = this.randomRanksTable.find(r => r.rank === value);
      char.logRoll(`Primary Ability: ${ability}`, "Base Rules", rankRow.rank + " as Start");
    }

    if (value === -1) {
      const roll = abilityRolls[ability];

      if (roll < 1 || roll > 100) {
        char.logRoll("Primary Ability: " + ability, -1, "Invalid Roll");
        return;
      }

      rankRow = Utility.findRow(this, roll, this.randomRanksColumn);
      char.logRoll(`Primary Ability: ${ability}`, roll, rankRow.rank);
    }

    if (rankRow === null) {
      char.logRoll(`Primary Ability: ${ability}`, -1, "Invalid RankRow");
      return;
    }

    const adjustment = Utility.getValue(physicalFormRow, abilityLower + 'Adjustment', 0);
    const minimum = Utility.getValue(physicalFormRow, abilityLower + 'Minimum', -1);
    const maximum = Utility.getValue(physicalFormRow, abilityLower + 'Maximum', -1);
    const finalRank = this.getAbilityAfterModifier(char, rankRow.rank, adjustment, minimum, maximum);
    const finalRankRow = this.randomRanksTable.find(r => r.rank === finalRank);

    return finalRankRow;
  }

  determinePrimaryAbilities(char) {
    // Map back to the correct row in the table being used
    const physicalFormRow = this.physicalFormTable.find(o => o.name === char.physicalForm);

    this.physicalAbilitiesCount = 1;
    let value = Utility.getValue(physicalFormRow, 'abilitiesToGenerate', -1);
    if (value !== -1) {
      this.physicalAbilitiesCount = value;
    }

    for (let index = 0; index < this.physicalAbilitiesCount; index++) {
      PHYSICAL_ABILITIES.forEach(ability => {
        const rankRow = this.determineAbility(char, ability, physicalFormRow, index);
        char.setAbility(ability, rankRow.rank, rankRow.rankNumber, index);
      });
    }

    MENTAL_ABILITIES.forEach(ability => {
      const rankRow = this.determineAbility(char, ability, physicalFormRow);
      char.setAbility(ability, rankRow.rank, rankRow.rankNumber);
    });

    value = Utility.getValue(physicalFormRow, 'anyPrimaryAbilityAdjustment', 0);
    if (value !== 0) {
      const roll = this.anyAbilityAdjustmentRoll;
      const ability = ALL_ABILITIES.find(o => roll <= o.maxRoll).name;
      const oldRank = char.getAbility(ability).rank;
      const rank = this.getAbilityAfterModifier(char, oldRank, value, -1, -1);
      const rankRow = this.randomRanksTable.find(r => r.rank === rank);
      char.setAbility(ability, rankRow.rank, rankRow.rankNumber);

      char.logRoll("Any Ability Adjustment", roll, ability + ": " + oldRank + " -> " + rankRow.rank);
    }

    value = Utility.getValue(physicalFormRow, 'allPrimaryAbilitiesAdjustment', 0)
    if (value != 0) {
      for (let abilityIndex = 0; abilityIndex < char.primaryAbilities.length; abilityIndex++) {
        for (let index = 0; index < ALL_ABILITIES.length; index++) {
          const ability = ALL_ABILITIES[index].name;
          const oldRank = char.getAbility(ability, abilityIndex).rank;
          const rank = this.getAbilityAfterModifier(char, oldRank, value, -1, -1);
          const rankRow = this.randomRanksTable.find(r => r.rank === rank);
          char.setAbility(ability, rankRow.rank, rankRow.rankNumber);

          char.logRoll("All Ability Adjustment", value, ability + ": " + oldRank + " -> " + rankRow.rank);
        }
      }
    }

    value = Utility.getValue(physicalFormRow, 'allPhysicalAbilitiesAdjustment', 0)
    if (value != 0) {
      for (let abilityIndex = 0; abilityIndex < char.primaryAbilities.length; abilityIndex++) {
        for (let index = 0; index < PHYSICAL_ABILITIES.length; index++) {
          const ability = PHYSICAL_ABILITIES[index];
          const oldRank = char.getAbility(ability, abilityIndex).rank;
          const rank = this.getAbilityAfterModifier(char, oldRank, value, -1, -1);
          const rankRow = this.randomRanksTable.find(r => r.rank === rank);
          char.setAbility(ability, rankRow.rank, rankRow.rankNumber);

          char.logRoll("All Physical Ability Adjustment", value, ability + ": " + oldRank + " -> " + rankRow.rank);
        }
      }
    }
  }

  getAbilityAfterModifier(char, abilityRank, adjustment, minimum, maximum) {
    let rankIndex = this.randomRanksTable.findIndex(r => r.rank === abilityRank);
    if (rankIndex === null) {
      char.logRoll("Ability", "Ability Modifier", "Invalid Rank. Setting to Feeble");
      rankIndex = 0;
    }

    rankIndex += adjustment;

    char.logRoll("Ability", "Ability Modifier", `Ability Rank: ${abilityRank}. Adjustment: ${adjustment}.  Min: ${minimum}.  Max: ${maximum}`);

    if (rankIndex < 0) {
      rankIndex = 0;
      char.logRoll("Ability", "Ability Modifier", "Rank is less than 0. Setting to Feeble");
    }

    if (rankIndex >= this.randomRanksTable.length) {
      rankIndex = this.randomRanksTable.length - 1;
      char.logRoll("Ability", "Ability Modifier", `Rank is greater than max. Setting to ${rankIndex}.`);
    }

    let returnRank = this.randomRanksTable[rankIndex].rank;
    if (minimum !== -1 && returnRank < minimum) {
      returnRank = minimum;
      char.logRoll("Ability", "Ability Modifier", `Rank is less than Min. Setting to ${returnRank}.`);
    }

    if (maximum !== -1 && returnRank > maximum) {
      returnRank = maximum;
      char.logRoll("Ability", "Ability Modifier", `Rank is greater than Max. Setting to ${returnRank}.`);
    }

    // Don't allow it to drop below Feeble
    if (returnRank === "Shift 0") {
      returnRank = "Feeble";
      char.logRoll("Ability", "Ability Modifier", `Rank is less than Feeble. Setting to Feeble.`);
    }

    return returnRank;
  }

  determineResources(char) {
    // Page 9: Initial Resources
    let startRank = "Typical";

    const physicalFormRow = this.physicalFormTable.find(o => o.name === char.physicalForm);
    let value = Utility.getValue(physicalFormRow, "resourcesSet", -1);
    if (value !== -1) {
      const rankData = this.randomRanksTable.find(r => r.rankNumber === value);
      char.resources.rank = rankData.rank;
      char.resources.number = rankData.rankNumber;

      char.logRoll("Resources", "Base Rules", "Resources set to " + rankData.rank);
      return;
    }

    value = Utility.getValue(physicalFormRow, "resourcesStart", -1);
    if (value !== -1) {
      startRank = this.randomRanksTable.find(r => r.rankNumber === value).rank;
      char.logRoll("Resources", "Base Rules", "Resources set to " + startRank + " as Start");
    }

    value = Utility.getValue(physicalFormRow, "isHiTech", false);
    if (value) {
      if (this.hiTechToGood) {
        startRank = "Good";
        char.logRoll("Resources", "Base Rules Option", "Hi-Tech Resources set to Good");
      }
      else {
        char.logRoll("Resources", "Base Rules Option", `Hi-Tech Resources set to ${startRank}`);
      }
    }

    // Apply random modifier (Page 8 Ability Modifier Table logic usually applies, but text says "Modified by a roll")
    const roll = this.resourceModifierRoll;
    const modifier = this.abilityModifierTable.find(r => r.maxRoll >= roll).modifier;
    value = Utility.getValue(physicalFormRow, "resourcesAdjustment", 0);
    const finalAdjustment = value + modifier;

    const minimum = Utility.getValue(physicalFormRow, "resourcesMinimum", -1);
    const maximum = Utility.getValue(physicalFormRow, "resourcesMaximum", -1);

    let resourceRank = this.getAbilityAfterModifier(char, startRank, finalAdjustment, minimum, maximum);

    char.resources.rank = resourceRank;
    const rankData = this.randomRanksTable.find(r => r.rank === resourceRank);
    char.resources.number = rankData.rankNumber;
    char.logRoll("Resources", roll, resourceRank);
  }

  determineHealth(char) {
    const physicalFormRow = this.physicalFormTable.find(row => row.name === char.physicalForm);
    const healthAdjustment = Utility.getValue(physicalFormRow, "healthAdjustment", 0);
    if (Number.isInteger(healthAdjustment)) {
      char.health += healthAdjustment;
      char.logRoll("Health Adjustment", healthAdjustment, char.health);
    }

    if (!Number.isInteger(healthAdjustment)) {
      switch (healthAdjustment.substring(0, 1)) {
        case "*":
          char.health *= parseInt(healthAdjustment.substring(1));
          break;
        case "/":
          char.health /= parseInt(healthAdjustment.substring(1));
          break;
      }

      char.logRoll("Health Adjustment", healthAdjustment, char.health);
    }
  }

  determinePopularityUltimate(char) {
    // Ultimate rules change this to a roll on the Random Ranks Table.   But the roll is then changed to a number.  
    // We use the rank number from the Random Ranks Table to set the Popularity.
    const physicalFormRow = this.physicalFormTable.find(o => o.name === char.physicalForm);

    let value = Utility.getValue(physicalFormRow, "popularitySet", -1);
    if (value !== -1) {
      // A set value can be 0 or a number from the Random Ranks Table.  But that number is what will be assigned.
      // So for a set, we just assign whatever is set.
      char.popularity = value;
      char.logRoll("Popularity", "Base Rules", "Popularity set to " + value);
    }

    const thisRow = Utility.findRow(this, this.popularityRoll, this.randomRanksColumn);
    let popularity = thisRow.rankNumber;

    value = Utility.getValue(physicalFormRow, "popularityStart", -1);
    if (value !== -1) {
      // A start value can be 0 or a number from the Random Ranks Table.  For a start, we will roll a modifier
      // Ultimate has a Shift 0 that is unrollable.  That will be used for our starts that are 0, this allowing
      // normal  modifier adjustment to work correctly.
      popularity = value;
      char.logRoll("Popularity", "Base Rules", "Popularity set to " + value);
    }

    if (popularity === null) {
      char.logRoll(`Popularity`, -1, "Invalid Popularity");
      return;
    }

    let adjustment = Utility.getValue(physicalFormRow, 'popularityAdjustment', 0);

    if (char.subType !== "" && !Number.isInteger(+adjustment)) {
      const subTypes = adjustment.split("|");
      for (let index = 0; index < subTypes.length; index++) {
        const name = subTypes[index].split("(");
        if (name[0] === char.subType) {
          adjustment = +name[1].replace(")", "");
          break;
        }
      }

      char.logRoll("Popularity", "SubType Rules", "Popularity set to " + adjustment);
    }

    let minimum = Utility.getValue(physicalFormRow, 'popularityMinimum', -1);
    if (char.subType !== "" && !Number.isInteger(+minimum)) {
      const subTypes = minimum.split("|");
      for (let index = 0; index < subTypes.length; index++) {
        const name = subTypes[index].split("(");
        if (name[0] === char.subType) {
          minimum = +name[1].replace(")", "");
          break;
        }
      }

      char.logRoll("Popularity", "SubType Rules", "Popularity set to " + adjustment);
    }

    let maximum = Utility.getValue(physicalFormRow, 'popularityMaximum', -1);
    if (char.subType !== "" && !Number.isInteger(+maximum)) {
      const subTypes = maximum.split("|");
      for (let index = 0; index < subTypes.length; index++) {
        const name = subTypes[index].split("(");
        if (name[0] === char.subType) {
          maximum = +name[1].replace(")", "");
          break;
        }
      }

      char.logRoll("Popularity", "SubType Rules", "Popularity set to " + adjustment);
    }

    const finalPopularity = this.getAbilityAfterModifier(char, thisRow.rank, adjustment, minimum, maximum);
    const popularityRow = this.randomRanksTable.find(r => r.rank === finalPopularity);
    popularity = popularityRow.rankNumber;

    // Now that we have rolled the popularity, lets do secret, etc.
    if (this.identitySecret) {
      popularity -= 5;
      char.logRoll("Popularity", "Secret ID", "Loss of Popularity (-5)");
    }

    if (!this.identitySecret) {
      popularity += 10;
      char.logRoll("Popularity", "Public ID", "Addition of Popularity (+10)");
    }

    // Double check that our min/max are still good.
    if (minimum !== -1 && popularity < minimum) {
      popularity = minimum;
      char.logRoll("Popularity", "Base Rules", "Popularity Adjusted to Minimum");
    }

    if (maximum !== -1 && popularity > maximum) {
      popularity = maximum;
      char.logRoll("Popularity", "Base Rules", "Popularity Adjusted to Maximum");
    }

    if (popularity < 0) {
      popularity = 0;
    }

    char.popularity = popularity;
    char.logRoll("Popularity", this.popularityRoll, char.popularity);
  }

  determinePopularity(char) {
    if (this.generatorMode === 'ultimate') {
      this.determinePopularityUltimate(char);
      return;
    }

    // Page 9
    const physicalFormRow = this.physicalFormTable.find(o => o.name === char.physicalForm);

    char.popularity = 10;
    let value = Utility.getValue(physicalFormRow, "popularitySet", -1);
    if (value !== -1) {
      char.popularity = value;
      char.logRoll("Popularity", "Base Rules", "Popularity set to " + value);
      return;
    }

    value = Utility.getValue(physicalFormRow, "popularityStart", -1);
    if (value !== -1) {
      char.popularity = value;
      char.logRoll("Popularity", "Base Rules", "Popularity set to " + value);
    }

    // Secret ID logic (Page 9): If secret ID, -5 Pop. 
    if (this.identitySecret) {
      char.popularity -= 5;
      char.logRoll("Popularity", "Secret ID", "Loss of Popularity (-5)");
    }

    if (!this.identitySecret) {
      char.popularity += 10;
      char.logRoll("Popularity", "Public ID", "Addition of Popularity (+10)");
    }

    value = Utility.getValue(physicalFormRow, "popularityAdjustment", 0);
    if (value !== 0) {
      char.popularity += value;
      char.logRoll("Popularity", "Base Rules", "Popularity Adjusted by " + value);
    }

    value = Utility.getValue(physicalFormRow, "popularityMinimum", -1);
    if (value !== -1 && char.popularity < value) {
      char.popularity = value;
      char.logRoll("Popularity", "Base Rules", "Popularity Adjusted to Minimum");
    }

    value = Utility.getValue(physicalFormRow, "popularityMaximum", -1);
    if (value !== -1 && char.popularity > value) {
      char.popularity = value;
      char.logRoll("Popularity", "Base Rules", "Popularity Adjusted to Maximum");
    }

    if (char.popularity < 0) char.popularity = 0;

    char.logRoll("Popularity", "Base Rules", char.popularity);
  }

  determineSpecialAbilities(char) {
    const pRoll = this.powerNumberRoll;
    const pQtyRow = this.quantityTable.find(q => pRoll <= q.maxRoll);
    const tRoll = this.talentNumberRoll;
    const tQtyRow = this.quantityTable.find(q => tRoll <= q.maxRoll);
    const cRoll = this.contactNumberRoll;
    const cQtyRow = this.quantityTable.find(q => cRoll <= q.maxRoll);

    char.powersCount = pQtyRow.powers.initial;
    char.powersMax = pQtyRow.powers.maximum;
    char.talentsCount = tQtyRow.talents.initial;
    char.talentsMax = tQtyRow.talents.maximum;
    char.contactsCount = cQtyRow.contacts.initial;
    char.contactsMax = cQtyRow.contacts.maximum;

    const physicalFormRow = this.physicalFormTable.find(o => o.name === char.physicalForm);
    let powersCountSet = false;
    let talentsCountSet = false;
    let contactsCountSet = false;

    let value = Utility.getValue(physicalFormRow, "powersCountSet", -1);
    if (value !== -1) {
      char.powersCount = value;
      char.logRoll("Power Slots", "Base Rules", `Powers Count Set: ${char.powersCount}`);
      powersCountSet = true;
    }

    value = Utility.getValue(physicalFormRow, "talentsCountSet", -1);
    if (value !== -1) {
      char.talentsCount = value;
      char.logRoll("Talent Slots", "Base Rules", `Talents Count Set: ${char.talentsCount}`);
      talentsCountSet = true;
    }

    value = Utility.getValue(physicalFormRow, "contactsCountSet", -1);
    if (value !== -1) {
      char.contactsCount = value;
      char.logRoll("Contact Slots", "Base Rules", `Contacts Count Set: ${char.contactsCount}`);
      contactsCountSet = true;
    }

    if (!powersCountSet) {
      value = Utility.getValue(physicalFormRow, "powersCountAdjustment", 0);
      if (value !== 0) {
        char.powersCount += value;
        char.powersMax += value;
        char.logRoll("Power Slots", "Base Rules", `Powers Count Adjusted: ${char.powersCount}`);
      }
      if (char.powersCount > pQtyRow.powers.max) char.powersCount = pQtyRow.powers.max;
    }

    if (!talentsCountSet) {
      value = Utility.getValue(physicalFormRow, "talentsCountAdjustment", 0);
      if (value !== 0) {
        char.talentsCount += value;
        char.talentsMax += value;
        char.logRoll("Talent Slots", "Base Rules", `Talents Count Adjusted: ${char.talentsCount}`);
        if (char.talentsCount > tQtyRow.talents.max) char.talentsCount = tQtyRow.talents.max;
      }
    }

    if (!contactsCountSet) {
      value = Utility.getValue(physicalFormRow, "contactsCountAdjustment", 0);
      if (value !== 0) {
        char.contactsCount += value;
        char.contactsMax += value;
        char.logRoll("Contact Slots", "Base Rules", `Contacts Count Adjusted: ${char.contactsCount}`);
        if (char.contactsCount > cQtyRow.contacts.max) char.contactsCount = cQtyRow.contacts.max;
      }
    }

    if (!powersCountSet) {
      value = Utility.getValue(physicalFormRow, "powersCountMinimum", -1);
      if (value !== -1 && value > char.powersCount) {
        char.powersCount = value;
        char.powersMax = value;
        char.logRoll("Power Slots", "Base Rules", `Powers Count Minimum: ${char.contactsCount}`);
      }

      value = Utility.getValue(physicalFormRow, "powersCountMaximum", -1);
      if (value !== -1 && value < char.powersCount) {
        char.powersCount = value;
        char.powersMax = value;
        char.logRoll("Power Slots", "Base Rules", `Powers Count Maximum: ${char.powersCount}`);
      }
    }

    if (!talentsCountSet) {
      value = Utility.getValue(physicalFormRow, "talentsCountMinimum", -1);
      if (value !== -1 && value > char.talentsCount) {
        char.talentsCount = value;
        char.talentsMax = value;
        char.logRoll("Talent Slots", "Base Rules", `Talents Count Minimum: ${char.contactsCount}`);
      }

      value = Utility.getValue(physicalFormRow, "talentsCountMaximum", -1);
      if (value !== -1 && value < char.talentsCount) {
        char.talentsCount = value;
        char.talentsMax = value;
        char.logRoll("Talent Slots", "Base Rules", `Talents Count Maximum: ${char.talentsCount}`);
      }
    }

    if (!contactsCountSet) {
      value = Utility.getValue(physicalFormRow, "contactsCountMinimum", -1);
      if (value !== -1 && value > char.contactsCount) {
        char.contactsCount = value;
        char.contactsMax = value;
        char.logRoll("Contact Slots", "Base Rules", `Contacts Count Minimum: ${char.contactsCount}`);
      }

      value = Utility.getValue(physicalFormRow, "contactsCountMaximum", -1);
      if (value !== -1 && value < char.contactsCount) {
        char.contactsCount = value;
        char.contactsMax = value;
        char.logRoll("Contact Slots", "Base Rules", `Contacts Count Maximum: ${char.contactsCount}`);
      }

      value = Utility.getValue(physicalFormRow, "contactsCountMaximum", -1);
      if (value !== -1 && value < char.contactsCount) {
        char.contactsCount = value;
        char.contactsMax = value;
        char.logRoll("Contact Slots", "Base Rules", `Contacts Count Maximum: ${char.contactsCount}`);
      }
    }

    char.powersSlots = char.powersCount;
    char.talentsSlots = char.talentsCount;

    char.logRoll("Power Slots", pRoll, `Powers: ${char.powersCount}/${char.powersMax}`);
    char.logRoll("Talent Slots", tRoll, `Talents: ${char.talentsCount}/${char.talentsMax}`);
    char.logRoll("Contact Slots", cRoll, `Contacts: ${char.contactsCount}/${char.contactsMax}`);

    // Generate Powers
    for (let i = 0; i < char.powersCount; i++) {
      this.generateSinglePower(char, i);
    }

    // Generate Talents
    for (let i = 0; i < char.talentsCount; i++) {
      this.generateTalents(char, i);
    }

    // Generate Contacts
    for (let i = char.contacts.length; i < char.contactsCount; i++) {
      const ccRoll = this.contactCategoryRolls[i];
      const category = this.contactCategoriesTable.find(c => ccRoll <= c.maxRoll).name;
      const cRoll = this.contactRolls[i];
      const c = this.contactTypeListTable.find(c => c.category === category && cRoll <= c.maxRoll);

      char.logRoll("Contact Gen", `${ccRoll}/${cRoll}`, `${category}: ${c.name}`);

      char.contacts.push({
        category: category,
        name: c.name,
        description: c.description
      });
    }
  }

  determineWeakness(char) {
    // Page 14 Ultimate Powers Book
    // 01-13 Psych, 14-18 Elemental Allergy, etc.
    const sRoll = this.weaknessStimulusRoll;
    const eRoll = this.weaknessEffectRoll;
    const dRoll = this.weaknessDurationRoll;
    const rRoll = this.weaknessRankRoll;

    const stimulusRow = this.weaknessStimulusTable.find(s => sRoll <= s.maxRoll);
    const effectRow = this.weaknessEffectTable.find(e => eRoll <= e.maxRoll);
    const durationRow = this.weaknessDurationTable.find(d => dRoll <= d.maxRoll);
    const rankRow = Utility.findRow(this, rRoll, this.randomRanksColumn);

    char.weakness.stimulus = stimulusRow.name;
    char.weakness.stimulusDescription = stimulusRow.description;
    char.weakness.effect = effectRow.name;
    char.weakness.effectDescription = effectRow.description;
    char.weakness.duration = durationRow.name;
    char.weakness.durationDescription = durationRow.description;
    char.weakness.rank = rankRow.rank;
    char.weakness.rankNumber = rankRow.rankNumber;

    char.logRoll("Weakness Stimulus", sRoll, stimulusRow.name);
    char.logRoll("Weakness Effect", eRoll, effectRow.name);
    char.logRoll("Weakness Duration", dRoll, durationRow.name);
    char.logRoll("Weakness Rank", rRoll, rankRow.name);
  }

  generateTalents(char, talentIndex) {
    const currentTalentSlots = char.talents.map(t => t.talentSlots).reduce((acc, value) => acc + value, 0);
    const remainingTalentSlots = char.talentsCount - currentTalentSlots;

    if (remainingTalentSlots <= 0) {
      return;
    }

    const tcRoll = this.talentCategoryRolls[talentIndex];
    const category = this.talentCategoriesTable.find(c => tcRoll <= c.maxRoll).name;
    let tRoll = this.talentRolls[talentIndex];

    let t = this.talentListTable.find(t => t.category === category && tRoll <= t.maxRoll);

    let adjustIndex = 1;
    let value = Utility.getValue(t, "talentCount", 1);
    while (remainingTalentSlots < value && (currentTalentSlots + value) > char.talentsMax) {
      tRoll = this.talentRolls[talentIndex + adjustIndex];
      t = this.talentListTable.find(t => t.category === category && tRoll <= t.maxRoll);
      value = Utility.getValue(t, "talentCount", 1);
      adjustinIndex++;
    }

    char.logRoll("Talent Gen", `${tcRoll}/${tRoll}`, `${category}: ${t.name}`);

    char.talents.push({
      category: category,
      name: t.name,
      description: t.description,
      talentSlots: value,
    });

    value = Utility.getValue(t, "bonusContactCount", 0);
    if (value > 0) {
      for (let cIndex = 0; cIndex < value; cIndex++) {
        let valueContact = Utility.getValue(t, "bonusContact", "");
        if (valueContact !== "") {
          this.generateBonusContact(char, t.bonusContact);
        }
      }
    }

  }

  generateBonusContact(char, bonusContactString, forcedContact) {
    const contacts = bonusContactString.split("|");
    for (let index = 0; index < contacts.length; index++) {
      const parts = contacts[index].split("/");
      const category = parts[0];
      const otherParts = parts[1].split("(");
      const type = otherParts[0];
      const roll = +otherParts[1].replace(")", "");

      contacts[index] = {
        category: category,
        type: type,
        maxRoll: roll
      };
    }

    const startIndex = char.contacts.length;
    const roll = this.contactRolls[startIndex];
    const contact = contacts.find(c => roll <= c.maxRoll);

    const c = this.contactTypeListTable.find(c => c.category === contact.category && c.name === contact.type);

    char.logRoll("Bonus Contact Gen", `Base Rules: ${roll}`, `${contact.category}: ${c.name}`);

    if (forcedContact || char.contacts.length < char.contactsMax) {
      char.contacts.push({
        category: contact.category,
        name: c.name,
        description: c.description
      });
    }
  }

  isPowerAlreadyAssigned(char, powerRow) {
    /*
                return char.powers.some(p => p.name === powerRow.name);
    */
    for (let index = 0; index < char.powers.length; index++) {
      if (char.powers[index].name === powerRow.name) {
        return true;
      }
    }
    return false;
  }

  generateSinglePower(char, powerRollIndex) {
    const currentSlots = char.powers.map(p => p.powerSlots).reduce((acc, value) => acc + value, 0);
    const remainingSlots = char.powersCount - currentSlots;
    if (remainingSlots <= 0) {
      char.logRoll("Power Gen", "Base Rules", "No remaining slots");
      return;
    }

    // 1. Roll Category
    let catRoll = this.powerCategoryRolls[powerRollIndex];
    let category = this.powerCategoriesTable.find(c => catRoll <= c.maxRoll).name;

    // 2. Pick Power from Category
    let powerRoll = this.powerRolls[powerRollIndex];
    let indexAdjustment = 1;
    while (powerRoll > 100) {
      powerRoll = this.powerRolls[powerRollIndex + indexAdjustment];
      indexAdjustment++;
    }
    let powerRow = this.powerListTable.find(r => r.category === category && powerRoll <= r.maxRoll);

    // console.log(`category: ${category}, powerRoll: ${powerRoll}`);
    // 3. Pick Power from Category
    indexAdjustment = 1;
    while (this.isPowerAlreadyAssigned(char, powerRow) || powerRoll > 100) {
      char.logRoll("Power Gen", `Duplicate Power`, `Power: ${powerRow.name}`);
      catRoll = this.powerCategoryRolls[powerRollIndex + indexAdjustment];
      category = this.powerCategoriesTable.find(c => catRoll <= c.maxRoll).name;
      powerRoll = this.powerRolls[powerRollIndex + indexAdjustment];
      powerRow = this.powerListTable.find(r => r.category === category && powerRoll <= r.maxRoll);
      indexAdjustment++;
    }

    const powerCount = Utility.getValue(powerRow, "powerCount", 1);
    while (powerCount > remainingSlots && (currentSlots + powerCount) > char.powersMax && !this.isPowerAlreadyAssigned(char, powerRow)) {
      char.logRoll("Power Gen", `Too Many Powers`, `Power: ${powerRow.name}`);
      catRoll = this.powerCategoryRolls[powerRollIndex];
      category = this.powerCategoriesTable.find(c => catRoll <= c.maxRoll).name;
      powerRoll = this.powerRolls[powerRollIndex + indexAdjustment];
      powerRow = this.powerListTable.find(r => r.category === category && powerRoll <= r.maxRoll);
      indexAdjustment++;
    }

    // 3. Determine Rank
    // Power ranks are rolled on Column 4 (Page 10, source 412)
    const physicalFormRow = this.physicalFormTable.find(r => r.name === char.physicalForm);
    const rankRoll = this.powerRankRolls[powerRollIndex];
    let rankRow = Utility.findRow(this, rankRoll, 4);

    let value = Utility.getValue(physicalFormRow, "allPowersRankAdjustment", 0);
    if (value !== 0) {
      const rank = this.getAbilityAfterModifier(char, rankRow.rank, value, -1, -1);
      rankRow = this.randomRanksTable.find(r => r.rank === rank);
    }

    char.powers.push({
      name: powerRow.name,
      code: powerRow.code,
      category: category,
      description: powerRow.description,
      rank: rankRow.rank,
      number: rankRow.rankNumber,
      powerSlots: powerRow.powerCount,
    });

    char.logRoll("Power Gen", `${catRoll}/${powerRoll}/${rankRoll}`, `${category}: ${powerRow.name} (${rankRow.rank})`);

    if (powerRow.bonusPowerCount > 0) {
      this.generateBonusPower(char, powerRow.bonusPower);
    }
  }

  generateBonusPower(char, bonusPowerString) {
    const powers = bonusPowerString.split("|");
    for (let index = 0; index < powers.length; index++) {
      const parts = powers[index].split("\\");
      const category = parts[0];
      const otherParts = parts[1].split("(");
      const name = otherParts[0];
      const roll = +otherParts[1].replace(")", "");

      powers[index] = {
        category: category,
        name: name,
        maxRoll: roll
      };
    }

    const startIndex = char.powers.length;
    let roll = this.powerRolls[startIndex];
    let indexAdjustment = 1;
    while (roll > 100) {
      roll = this.powerRolls[startIndex + indexAdjustment];
      indexAdjustment++;
    }

    const power = powers.find(c => roll <= c.maxRoll);

    const p = this.powerListTable.find(c => c.category === power.category && c.name === power.name);

    const rankRoll = this.powerRankRolls[startIndex];
    const rankRow = Utility.findRow(this, rankRoll, 3);

    const rankNumber = rankRow.rankNumber;

    char.logRoll("Bonus Power Gen", `Base Rules: ${roll}/${rankRow}`, `${power.category}: ${p.name} (${rankRow.rank})`);

    if (char.powers.length < char.powersMax && !this.isPowerAlreadyAssigned(char, p)) {
      char.powers.push({
        category: p.category,
        name: p.name,
        code: p.code,
        description: p.description,
        rank: rankRow.rank,
        number: rankNumber,
        powerSlots: p.powerCount,
        bonusPower: true
      });
    }
  }

}

