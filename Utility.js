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

    // -----------------------------------------------------------------------
    // Data-table string DSL — one grammar, one parser.
    // -----------------------------------------------------------------------
    // The data files encode lists as:
    //   LIST   := ENTRY ("|" ENTRY)*
    //   ENTRY  := PART ("~" PART)*      -- random alternatives
    //   PART   := [SubType "("] SEG ("\\" SEG)*   (contacts may use "/")
    //   SEG    := text with an optional "(tail)" — "(100)" roll ceiling,
    //             "(rank)" rank text, or "(value)" for value lists
    // Consumers: bonusPower, bonusTalent, bonusContact, optionalPowers,
    // subType, combinations, popularityAdjustment/Minimum/Maximum and
    // upgradePower — in both the generator (CharacterGenerator.js) and the
    // UI (comiccharcreator.html).

    /** Split a DSL list on "|"; falsy input and empty entries -> []. */
    static splitDslList(str) {
        if (!str || typeof str !== "string") return [];
        return str.split("|").filter((e) => e !== "");
    }

    /** Split an entry into its "~" random alternatives. */
    static splitDslAlternatives(entry) {
        return entry ? entry.split("~") : [];
    }

    /**
     * Generator policy: pick one "~" alternative via Dice so seeded runs
     * stay reproducible.
     */
    static pickDslAlternative(entry) {
        if (!entry || entry.indexOf("~") === -1) return entry;
        const picked = Dice.getRandomItem(Utility.splitDslAlternatives(entry));
        return picked !== null ? picked : entry;
    }

    /** UI policy: the first alternative is the editable default. */
    static firstDslAlternative(entry) {
        if (!entry || entry.indexOf("~") === -1) return entry;
        return Utility.splitDslAlternatives(entry)[0];
    }

    /**
     * Parse one list entry (resolve "~" alternatives first, with a policy).
     * options.subTypePrefix — honor a leading "SubType(" filter (bonusPower)
     * options.preferSlash   — "/" as the category/type separator (contacts)
     * Returns { segments, subType, category, name, rank, tail, maxRoll }:
     *   segments  separator-split parts
     *   subType   leading "SubType(" prefix, or null
     *   category  segments[0] after any prefix strip
     *   name      text before "(tail)" on segment 1 (2-part entries); the raw
     *             middle segment of "Cat\\Name\\Rank(roll)" (3-part); for
     *             single-segment entries the text before "(tail)"
     *   rank      leading text of the last segment of a 3-part entry, else null
     *   tail      text inside the entry's trailing "(...)" , else null
     *   maxRoll   numeric tail, defaulting to 100 when absent or non-numeric
     */
    static parseDslEntry(entry, options) {
        const opts = options || {};
        const raw = entry == null ? "" : String(entry);
        const sep = opts.preferSlash && raw.indexOf("/") !== -1 ? "/" : "\\";
        const segments = raw.split(sep);

        let subType = null;
        if (opts.subTypePrefix && segments.length > 1) {
            const pos = segments[0].indexOf("(");
            if (pos > 0) {
                subType = segments[0].substring(0, pos);
                segments[0] = segments[0].substring(pos + 1);
            } else if (pos === 0) {
                segments[0] = segments[0].substring(1);
            }
        }

        const tailSeg =
            segments.length > 1 ? segments[segments.length - 1] : segments[0];
        const tailMatch = tailSeg.match(/\(([^()]*)\)/);
        const tail = tailMatch ? tailMatch[1] : null;
        const maxRoll =
            tail !== null && /^\d+$/.test(tail) ? parseInt(tail, 10) : 100;

        const head = function (s) {
            const pos = s.indexOf("(");
            return pos === -1 ? s : s.substring(0, pos);
        };

        let name;
        let rank = null;
        if (segments.length === 1) {
            name = head(segments[0]);
        } else if (segments.length >= 3) {
            name = segments[1];
            rank = head(segments[2]);
        } else {
            name = head(segments[1]);
        }

        return {
            segments: segments,
            subType: subType,
            category: segments[0],
            name: name,
            rank: rank,
            tail: tail,
            maxRoll: maxRoll,
        };
    }

    /** Parse a full list into parseDslEntry results (empty entries dropped). */
    static parseDslList(str, options) {
        return Utility.splitDslList(str).map(function (entry) {
            return Utility.parseDslEntry(entry, options);
        });
    }

    /** Parse "SubType(value)|..." value lists (popularity adjustment/min/max). */
    static parseDslValueList(str) {
        return Utility.splitDslList(str).map(function (entry) {
            const spec = Utility.parseDslEntry(entry);
            return {
                name: spec.name,
                value: spec.tail === null ? NaN : Number(spec.tail),
            };
        });
    }

    /** Parse upgradePower: "Category\\Power" or "Category\\Power\\Condition". */
    static parseDslUpgrade(str) {
        if (!str) return null;
        const parts = str.split("\\");
        if (parts.length < 2) return null;
        return {
            category: parts[0],
            powerName: parts[1],
            condition: parts.length > 2 ? parts[2] : null,
        };
    }
}
