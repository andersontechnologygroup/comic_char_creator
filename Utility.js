class Dice {
  static roll(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // Both min and max are inclusive
  }

  static roll100() {
    return Dice.roll(1, 100);
  }

  static getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
}

class Utility {
  static findRow(gen, roll, column) {
    console.log("findRow", gen, roll, column);
    for (let index = 0; index < gen.randomRanksTable.length; index++) {
      const row = gen.randomRanksTable[index];
      if (roll <= row.maxRolls[column - 1]) {
        return row;
      }
    }

    return null;
  }

  static getValue(object, property, defaultValue) {
    if (defaultValue === undefined || defaultValue === null) defaultValue = -1;
    if (object === undefined || object === null) return defaultValue;
    if (property === undefined || property === null) return defaultValue;
    if (object[property] === undefined || object[property] === null) return defaultValue;
    return object[property];
  }
}
