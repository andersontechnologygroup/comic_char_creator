class Dice {
    static _seed = null;
    static _rngState = null;
    static rollCount = 0;

    /** Mulberry32 PRNG — fast, reproducible, good distribution. */
    static _mulberry32(seed) {
        let t = seed;
        return function () {
            t = (t + 0x6d2b79f5) | 0;
            let r = Math.imul(t ^ (t >>> 15), 1 | t);
            r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
            return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
        };
    }

    /** Set a seed for reproducible rolls. Pass null to revert to Math.random. */
    static seed(s) {
        if (s === null || s === undefined) {
            Dice._seed = null;
            Dice._rngState = null;
        } else {
            Dice._seed = s;
            Dice._rngState = Dice._mulberry32(s);
        }
        Dice.rollCount = 0;
    }

    static roll(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        const r = Dice._rngState ? Dice._rngState() : Math.random();
        Dice.rollCount++;
        return Math.floor(r * (max - min + 1)) + min; // Both min and max are inclusive
    }

    static roll100() {
        return Dice.roll(1, 100);
    }

    static getRandomItem(array) {
        if (!array || array.length === 0) return null;
        const r = Dice._rngState ? Dice._rngState() : Math.random();
        return array[Math.floor(r * array.length)];
    }
}

class Utility {
    static findRow(gen, roll, column) {
        for (let index = 0; index < gen.randomRanksTable.length; index++) {
            const row = gen.randomRanksTable[index];
            if (roll <= row.maxRolls[column - 1]) {
                return row;
            }
        }

        return null;
    }

    static getValue(object, property, defaultValue) {
        if (defaultValue === undefined || defaultValue === null)
            defaultValue = -1;
        if (object === undefined || object === null) return defaultValue;
        if (property === undefined || property === null) return defaultValue;
        if (object[property] === undefined || object[property] === null)
            return defaultValue;
        return object[property];
    }
}
