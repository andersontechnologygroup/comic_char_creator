// K2 collapses
class Character {
    constructor() {
        this.physicalForm = "";
        this.subType = "";
        this.bodyTypes = [];
        this.origin = "";
        this.name = "Unknown Hero";
        this.identity = "Secret";

        // FASERIP
        this.primaryAbilities = [{
            Fighting: { rank: "", number: 0 },
            Agility: { rank: "", number: 0 },
            Strength: { rank: "", number: 0 },
            Endurance: { rank: "", number: 0 },
            Reason: { rank: "", number: 0 },
            Intuition: { rank: "", number: 0 },
            Psyche: { rank: "", number: 0 }
        }];

        // Secondary
        this.health = 0;
        this.karma = 0;
        this.resources = { rank: "", number: 0 };
        this.popularity = 0;

        // Specials
        this.powersMax = 0;
        this.powersCount = 0;
        this.powers = []; // Array of objects { category, code, name, rank, number }
        this.talentsMax = 0;
        this.talentsCount = 0;
        this.talents = [];
        this.contactsMax = 0;
        this.contactsCount = 0;
        this.contacts = [];

        this.weakness = {
            stimulus: "",
            stimulusDescription: "",
            effect: "",
            effectDescription: "",
            duration: "",
            durationDescription: "",
            rank: "",
            rankNumber: 0
        };

        this.isHiTech = false;

        // Boost
        this.boostApplied = false;

        // Structured intermediate state (less brittle than log matching)
        this.state = {
            physicalForm: "",
            subType: "",
            bodyTypes: [],
            origin: "",
            randomRanksColumn: -1,
            abilitiesToGenerate: 1,
            abilityAdjustments: {},   // { Fighting: 1, Endurance: -1, ... }
            anyAbilityAdjustment: null, // { ability, oldRank, newRank, roll }
            allPrimaryAbilityAdjustment: null, // { adjustment, abilities: {Fighting: {old, new}, ...} }
            allPhysicalAbilityAdjustment: null, // { adjustment, abilities: {Fighting: {old, new}, ...} }
            resources: { startRank: null, set: null, adjustment: 0, hiTech: false, final: null },
            popularity: { start: null, set: null, adjustment: 0, final: null },
            powersCount: { initial: 0, adjustment: 0, set: null, min: null, max: null },
            talentsCount: { initial: 0, adjustment: 0, set: null, min: null, max: null },
            contactsCount: { initial: 0, adjustment: 0, set: null, min: null, max: null },
            healthAdjustment: null, // { type: 'add'|'multiply'|'divide', value }
            weakness: { stimulus: null, effect: null, duration: null, rank: null },
        };

        // Meta
        this.log = []; // Stores roll history
    }

    logRoll(description, roll, result) {
        this.log.push(`[${description}] Rolled: ${roll} -> Result: ${result}`);
    }

    setAbility(abilityName, rank, rankNumber, abilityIndex) {
        if (abilityIndex === undefined || abilityIndex === null) abilityIndex = 0;

        if (rank) {
            if ((abilityIndex > this.primaryAbilities.length - 1)) {
                this.primaryAbilities[abilityIndex] =
                {
                    Fighting: { rank: "", number: 0 },
                    Agility: { rank: "", number: 0 },
                    Strength: { rank: "", number: 0 },
                    Endurance: { rank: "", number: 0 },
                    Reason: { rank: "", number: 0 },
                    Intuition: { rank: "", number: 0 },
                    Psyche: { rank: "", number: 0 }
                };

            }

            this.primaryAbilities[abilityIndex][abilityName].rank = rank;
            this.primaryAbilities[abilityIndex][abilityName].number = rankNumber;
        }
    }

    getAbility(abilityName, abilityIndex) {
        if (abilityIndex === undefined || abilityIndex === null) abilityIndex = 0;
        return this.primaryAbilities[abilityIndex][abilityName];
    }

    getAbilityNumber(abilityName, abilityIndex) {
        if (abilityIndex === undefined || abilityIndex === null) abilityIndex = 0;
        return this.primaryAbilities[abilityIndex][abilityName].number;
    }

    calculateSecondary() {
        this.health = this.getAbilityNumber("Fighting") +
            this.getAbilityNumber("Agility") +
            this.getAbilityNumber("Strength") +
            this.getAbilityNumber("Endurance");

        this.karma = this.getAbilityNumber("Reason") +
            this.getAbilityNumber("Intuition") +
            this.getAbilityNumber("Psyche");
    }
}
