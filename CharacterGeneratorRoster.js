/**
 * CharacterGenerator — Roster.
 *
 * Talents and contacts: counts, available lists, generation and
 * bonus picks.
 * Methods are appended to CharacterGenerator.prototype; this file must
 * load after CharacterGenerator.js (it contains no class declaration).
 */

CharacterGenerator.prototype.generateBonusTalent = function (
    char,
    bonusTalentString,
) {
    if (!bonusTalentString) return;
    // Bonus talent strings use backslash as separator: "Fighting\\Climbing(100)"
    const talents = Utility.splitDslList(bonusTalentString);
    for (let index = 0; index < talents.length; index++) {
        const spec = Utility.parseDslEntry(talents[index]);

        talents[index] = {
            category: spec.category,
            type: spec.name,
            maxRoll: spec.maxRoll,
        };
    }

    const startIndex = char.talents.length;
    const roll = this.talentCategoryRolls[startIndex];
    const talent = talents.find((c) => roll <= c.maxRoll);
    if (!talent) return;

    const t = this.talentListTable.find(
        (t) => t.category === talent.category && t.name === talent.type,
    );
    if (!t) return;

    // Skip duplicate bonus talents
    if (this._assignedTalentNames && this._assignedTalentNames.has(t.name)) {
        char.logRoll(
            "Bonus Talent Gen",
            `Duplicate`,
            `${talent.category}: ${t.name}`,
        );
        return;
    }

    if (this._assignedTalentNames) this._assignedTalentNames.add(t.name);

    char.logRoll(
        "Bonus Talent Gen",
        `Physical Form: ${roll}`,
        `${talent.category}: ${t.name}`,
    );

    const talentSlots = Utility.getValue(t, "talentCount", 1);
    char.talents.push({
        category: talent.category,
        name: t.name,
        description: t.description,
        talentSlots: talentSlots,
        bonusTalent: true,
    });
};

CharacterGenerator.prototype.determineSpecialContactAdjustment = function (
    physicalFormRow,
    char,
    cQtyRow,
) {
    let contactsCountSet = false;
    let value = Utility.getValue(physicalFormRow, "contactsCountSet", -1);
    if (value !== -1) {
        char.contactsCount = value;
        char.state.contactsCount.set = value;
        char.logRoll(
            "Contact Slots",
            "Base Rules",
            `Contacts Count Set: ${char.contactsCount}`,
        );
        contactsCountSet = true;
    }

    if (!contactsCountSet) {
        value = Utility.getValue(physicalFormRow, "contactsCountAdjustment", 0);
        if (value !== 0) {
            char.contactsCount += value;
            char.contactsMax += value;
            char.state.contactsCount.adjustment = value;
            char.logRoll(
                "Contact Slots",
                "Base Rules",
                `Contacts Count Adjusted: ${char.contactsCount}`,
            );
            if (char.contactsCount > cQtyRow.contacts.maximum) {
                char.contactsCount = cQtyRow.contacts.maximum;
                char.logRoll(
                    "Contact Slots",
                    "Base Rules",
                    `Contacts Count Adjusted (too high): ${char.contactsCount}`,
                );
            }
        }
    }

    if (!contactsCountSet) {
        value = Utility.getValue(physicalFormRow, "contactsCountMinimum", -1);
        if (value !== -1 && value > char.contactsCount) {
            char.contactsCount = value;
            char.state.contactsCount.min = value;
            char.logRoll(
                "Contact Slots",
                "Base Rules",
                `Contacts Count Minimum: ${char.contactsCount}`,
            );
        }

        value = Utility.getValue(physicalFormRow, "contactsCountMaximum", -1);
        if (value !== -1 && value < char.contactsCount) {
            char.contactsCount = value;
            char.contactsMax = value;
            char.state.contactsCount.max = value;
            char.logRoll(
                "Contact Slots",
                "Base Rules",
                `Contacts Count Maximum: ${char.contactsCount}`,
            );
        }

        // Ensure max >= min
        if (char.contactsMax < char.contactsCount) {
            char.contactsMax = char.contactsCount;
        }
    }

    return contactsCountSet;
};

CharacterGenerator.prototype.determineSpecialTalentAdjustment = function (
    physicalFormRow,
    char,
    tQtyRow,
) {
    let talentsCountSet = false;
    let value = Utility.getValue(physicalFormRow, "talentsCountSet", -1);
    if (value !== -1) {
        char.talentsCount = value;
        char.state.talentsCount.set = value;
        char.logRoll(
            "Talent Slots",
            "Base Rules",
            `Talents Count Set: ${char.talentsCount}`,
        );
        talentsCountSet = true;
    }

    if (!talentsCountSet) {
        value = Utility.getValue(physicalFormRow, "talentsCountAdjustment", 0);
        if (value !== 0) {
            char.talentsCount += value;
            char.talentsMax += value;
            char.state.talentsCount.adjustment = value;
            char.logRoll(
                "Talent Slots",
                "Base Rules",
                `Talents Count Adjusted: ${char.talentsCount}`,
            );
            if (char.talentsCount > tQtyRow.talents.maximum) {
                char.talentsCount = tQtyRow.talents.maximum;
                char.logRoll(
                    "Talent Slots",
                    "Base Rules",
                    `Talents Count Adjusted (too high): ${char.talentsCount}`,
                );
            }
        }
    }

    if (!talentsCountSet) {
        value = Utility.getValue(physicalFormRow, "talentsCountMinimum", -1);
        if (value !== -1 && value > char.talentsCount) {
            char.talentsCount = value;
            char.talentsMax = value;
            char.state.talentsCount.min = value;
            char.logRoll(
                "Talent Slots",
                "Base Rules",
                `Talents Count Minimum: ${char.talentsCount}`,
            );
        }

        value = Utility.getValue(physicalFormRow, "talentsCountMaximum", -1);
        if (value !== -1 && value < char.talentsCount) {
            char.talentsCount = value;
            char.talentsMax = value;
            char.state.talentsCount.max = value;
            char.logRoll(
                "Talent Slots",
                "Base Rules",
                `Talents Count Maximum: ${char.talentsCount}`,
            );
        }
    }

    return talentsCountSet;
};

CharacterGenerator.prototype._findTalent = function (category, tRoll, sRoll) {
    // Find all entries in this category where tRoll <= maxRoll
    const candidates = this.talentListTable.filter(
        (e) => e.category === category && tRoll <= e.maxRoll,
    );
    if (candidates.length === 0) return null;
    if (candidates.length === 1) return candidates[0];

    // Among candidates, group by maxRoll value to find the closest one
    // The entry with the smallest maxRoll >= tRoll is the standard pick
    const minMaxRoll = Math.min(...candidates.map((e) => e.maxRoll));
    const closest = candidates.filter((e) => e.maxRoll === minMaxRoll);

    if (closest.length === 1) return closest[0];

    // Multiple entries share the exact same maxRoll — use subRoll to disambiguate
    const withSubRoll = closest.filter(
        (e) => e.subRoll !== undefined && e.subRoll !== null,
    );
    if (withSubRoll.length === 0) {
        return closest[0];
    }

    // Find the entry where sRoll <= subRoll (first match wins, same as maxRoll logic)
    const subMatch = withSubRoll.find((e) => sRoll <= e.subRoll);
    return subMatch || withSubRoll[withSubRoll.length - 1];
};

CharacterGenerator.prototype.getAvailableTalents = function () {
    const categories = [];
    const catNames = [];
    for (const entry of this.talentListTable) {
        // Skip bonus-only entries (maxRoll > 100)
        if (entry.maxRoll > 100) continue;
        if (!catNames.includes(entry.category)) {
            catNames.push(entry.category);
        }
    }
    for (const catName of catNames) {
        const talents = this.talentListTable
            .filter((e) => e.category === catName && e.maxRoll <= 100)
            .map((e) => ({
                name: e.name,
                talentCount: Utility.getValue(e, "talentCount", 1),
                description: e.description || "",
                subRoll: e.subRoll || null,
            }));
        categories.push({ category: catName, talents: talents });
    }
    return categories;
};

/**
 * Determine how many talent slots are available (from the roll).
 * Must be called after throwAllRolls/setTables.
 */
CharacterGenerator.prototype.getTalentSlotCount = function () {
    const tRoll = Math.max(1, Math.min(100, this.talentNumberRoll || 1));
    const tQtyRow = this.quantityTable.find((q) => tRoll <= q.maxRoll);
    if (!tQtyRow) return 4;
    let count = tQtyRow.talents.initial;
    // Apply physical form adjustments
    const physicalFormRow = this.physicalFormTable.find(
        (o) => o.name === this._lastPhysicalForm,
    );
    if (physicalFormRow) {
        const adjust = Utility.getValue(
            physicalFormRow,
            "talentsCountAdjustment",
            0,
        );
        count = Math.max(1, count + adjust);
        const max = Utility.getValue(
            physicalFormRow,
            "talentsCountMaximum",
            999,
        );
        count = Math.min(count, max);
    }
    return count;
};

CharacterGenerator.prototype.getAvailableContacts = function () {
    const categories = [];
    const catNames = [];
    for (const entry of this.contactTypeListTable) {
        if (!catNames.includes(entry.category)) {
            catNames.push(entry.category);
        }
    }
    for (const catName of catNames) {
        const contacts = this.contactTypeListTable
            .filter((e) => e.category === catName)
            .map((e) => ({
                name: e.name,
                contactCount: Utility.getValue(e, "contactCount", 1),
                description: e.description || "",
            }));
        categories.push({ category: catName, contacts: contacts });
    }
    return categories;
};

/**
 * Determine how many contact slots are available (from the roll).
 * Must be called after throwAllRolls/setTables.
 */
CharacterGenerator.prototype.getContactSlotCount = function () {
    const cRoll = Math.max(1, Math.min(100, this.contactNumberRoll || 1));
    const cQtyRow = this.quantityTable.find((q) => cRoll <= q.maxRoll);
    if (!cQtyRow) return 4;
    let count = cQtyRow.contacts.initial;
    const physicalFormRow = this.physicalFormTable.find(
        (o) => o.name === this._lastPhysicalForm,
    );
    if (physicalFormRow) {
        const adjust = Utility.getValue(
            physicalFormRow,
            "contactsCountAdjustment",
            0,
        );
        count = Math.max(1, count + adjust);
        const min = Utility.getValue(
            physicalFormRow,
            "contactsCountMinimum",
            -1,
        );
        if (min !== -1 && count < min) count = min;
        const max = Utility.getValue(
            physicalFormRow,
            "contactsCountMaximum",
            999,
        );
        if (max !== -1 && count > max) count = max;
    }
    return count;
};

CharacterGenerator.prototype.generateTalents = function (char, talentIndex) {
    const currentTalentSlots = char.talents
        .map((t) => t.talentSlots)
        .reduce((acc, value) => acc + value, 0);
    const remainingTalentSlots = char.talentsCount - currentTalentSlots;

    if (remainingTalentSlots <= 0) {
        return;
    }

    // If manual selection is active, use the pre-selected talent
    if (this._selectedTalents && talentIndex < this._selectedTalents.length) {
        const sel = this._selectedTalents[talentIndex];
        const value = sel.talentCount || 1;
        if (value > remainingTalentSlots) {
            char.logRoll(
                "Talent Gen",
                `Skipped`,
                `${sel.category}: ${sel.name} (needs ${value} slots, ${remainingTalentSlots} remaining)`,
            );
            return;
        }
        if (this._assignedTalentNames) this._assignedTalentNames.add(sel.name);
        char.logRoll("Talent Gen", `Manual`, `${sel.category}: ${sel.name}`);
        char.talents.push({
            category: sel.category,
            name: sel.name,
            description: sel.description || "",
            talentSlots: value,
        });
        return;
    }

    let tcRoll = this.talentCategoryRolls[talentIndex];
    let tcCatRow = this.talentCategoriesTable.find((c) => tcRoll <= c.maxRoll);
    if (!tcCatRow) return;
    let category = tcCatRow.name;
    let tRoll = this.talentRolls[talentIndex];
    let sRoll = this.talentSubRolls[talentIndex];

    let t = this._findTalent(category, tRoll, sRoll);

    // Skip duplicates — try next roll indices until a unique talent is found
    let adjustIndex = 0;
    while (
        t &&
        this._assignedTalentNames &&
        this._assignedTalentNames.has(t.name)
    ) {
        char.logRoll("Talent Gen", `Duplicate`, `${category}: ${t.name}`);
        adjustIndex++;
        if (talentIndex + adjustIndex >= this.rollArraySize) {
            char.logRoll(
                "Talent Gen",
                `No Unique Talent Found`,
                `Exhausted retries at index ${talentIndex}`,
            );
            return;
        }
        tcRoll = this.talentCategoryRolls[talentIndex + adjustIndex];
        tcCatRow = this.talentCategoriesTable.find((c) => tcRoll <= c.maxRoll);
        if (!tcCatRow) {
            adjustIndex++;
            continue;
        }
        category = tcCatRow.name;
        tRoll = this.talentRolls[talentIndex + adjustIndex];
        sRoll = this.talentSubRolls[talentIndex + adjustIndex];
        t = this._findTalent(category, tRoll, sRoll);
    }
    if (!t) return;

    let value = Utility.getValue(t, "talentCount", 1);
    while (
        remainingTalentSlots < value &&
        currentTalentSlots + value > char.talentsMax
    ) {
        adjustIndex++;
        if (talentIndex + adjustIndex >= this.rollArraySize) return;
        tRoll = this.talentRolls[talentIndex + adjustIndex];
        sRoll = this.talentSubRolls[talentIndex + adjustIndex];
        tcRoll = this.talentCategoryRolls[talentIndex + adjustIndex];
        tcCatRow = this.talentCategoriesTable.find((c) => tcRoll <= c.maxRoll);
        if (!tcCatRow) continue;
        category = tcCatRow.name;
        t = this._findTalent(category, tRoll, sRoll);
        if (
            t &&
            this._assignedTalentNames &&
            this._assignedTalentNames.has(t.name)
        )
            continue;
        value = Utility.getValue(t, "talentCount", 1);
    }
    if (!t) return;

    if (this._assignedTalentNames) this._assignedTalentNames.add(t.name);

    // Show subRoll in the log when the talent has a subRoll property
    const rollDisplay =
        t.subRoll != null
            ? `${tcRoll}/${tRoll}/${sRoll}`
            : `${tcRoll}/${tRoll}`;
    char.logRoll("Talent Gen", rollDisplay, `${category}: ${t.name}`);

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
};

CharacterGenerator.prototype.generateBonusContact = function (
    char,
    bonusContactString,
    forcedContact,
) {
    if (!bonusContactString) return;
    const contacts = Utility.splitDslList(bonusContactString);
    for (let index = 0; index < contacts.length; index++) {
        // Support both "/" and "\\" as separator between category and type
        const entry = Utility.parseDslEntry(contacts[index], {
            preferSlash: true,
        });

        contacts[index] = {
            category: entry.category,
            type: entry.name,
            maxRoll: entry.maxRoll,
        };
    }

    const startIndex = char.contacts.length;
    const roll = this.contactRolls[startIndex];
    const contact = contacts.find((c) => roll <= c.maxRoll);
    if (!contact) return;

    let c;
    if (contact.category === "Any" && contact.type === "Any") {
        // "Any/Any" — pick a random contact from all available
        const allContacts = this.contactTypeListTable.filter(
            (ct) => ct.name && ct.name !== "",
        );
        if (allContacts.length === 0) return;
        // Use the contact roll to pick from the filtered list
        const pickIndex = (roll - 1) % allContacts.length;
        c = allContacts[pickIndex];
    } else if (contact.category === "Any") {
        // "Any/Type" — pick from any category matching the type name
        c = this.contactTypeListTable.find((ct) => ct.name === contact.type);
    } else if (contact.type === "Any") {
        // "Category/Any" — pick a random contact from the category
        const catContacts = this.contactTypeListTable.filter(
            (ct) => ct.category === contact.category,
        );
        if (catContacts.length === 0) return;
        const pickIndex = (roll - 1) % catContacts.length;
        c = catContacts[pickIndex];
    } else {
        c = this.contactTypeListTable.find(
            (ct) =>
                ct.category === contact.category && ct.name === contact.type,
        );
    }
    if (!c) return;

    // Skip duplicate bonus contacts
    if (this._assignedContactNames && this._assignedContactNames.has(c.name)) {
        char.logRoll(
            "Bonus Contact Gen",
            `Duplicate`,
            `${contact.category}: ${c.name}`,
        );
        return;
    }

    if (this._assignedContactNames) this._assignedContactNames.add(c.name);

    char.logRoll(
        "Bonus Contact Gen",
        `Base Rules: ${roll}`,
        `${contact.category}: ${c.name}`,
    );

    if (forcedContact || char.contacts.length < char.contactsMax) {
        char.contacts.push({
            category: contact.category,
            name: c.name,
            description: c.description,
        });
    }
};
