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

    getRankByShift11(currentRankName, shift) {
        let index = RANKS.findIndex(r => r.name === currentRankName);
        if (index === -1) return currentRankName;
        let newIndex = index + shift;
        if (newIndex < 0) newIndex = 0;
        if (newIndex >= RANKS.length) newIndex = RANKS.length - 1;
        return RANKS[newIndex];
    }

    modifyAbilityRank11(abilityName, shift) {
        const currentRank = this.primaryAbilities[abilityName].rank;
        const newRankData = this.getRankByShift(currentRank, shift);
        this.primaryAbilities[abilityName].rank = newRankData.name;
        this.primaryAbilities[abilityName].number = newRankData.standard;
        this.logRoll(`Modifier: ${abilityName}`, `${shift} CS`, newRankData.name);
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
