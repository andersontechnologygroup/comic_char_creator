// K1 to collapse
const RANDOM_RANKS_ADVANCED_TABLE = [
    { rank: 'Feeble', rankNumber: 1, maxRolls: [5, 5, 5, 5, 10] },
    { rank: 'Poor', rankNumber: 3, maxRolls: [10, 25, 10, 10, 20] },
    { rank: 'Typical', rankNumber: 5, maxRolls: [20, 75, 40, 15, 30] },
    { rank: 'Good', rankNumber: 8, maxRolls: [40, 95, 80, 40, 40] },
    { rank: 'Excellent', rankNumber: 16, maxRolls: [60, 100, 95, 50, 60] },
    { rank: 'Remarkable', rankNumber: 26, maxRolls: [80, -1, 100, 70, 70] },
    { rank: 'Incredible', rankNumber: 36, maxRolls: [96, -1, -1, 90, 80] },
    { rank: 'Amazing', rankNumber: 46, maxRolls: [100, -1, -1, 98, 95] },
    { rank: 'Monstrous', rankNumber: 63, maxRolls: [-1, -1, -1, 100, 100] },
];

const PHYSICAL_FORM_ADVANCED_TABLE = [
    {
        maxRoll: 30, name: "Altered Human", column: 1,
    },
    {
        maxRoll: 60, name: "Mutant", column: 1, enduranceAdjustment: 2, popularitySet: 0, powersCountAdjustment: 1,
    },
    {
        maxRoll: 90, name: "Hi-Tech", column: 3, enduranceAdjustment: 2, reasonAdjustment: 2,
    },
    {
        maxRoll: 95, name: "Robot", column: 4, enduranceAdjustment: 2, popularitySet: 0,
    },
    {
        maxRoll: 100, name: "Alien", column: 5, enduranceAdjustment: 2, resourcesStart: 3 /* Poor */, popularityAdjustment: -5, powersCountAdjustment: -1,
        powersCountMaximum: 2,
    },
];

const ORIGIN_ADVANCED_TABLE = [
    {
        maxRoll: 30, name: "Altered Human"
    },
    {
        maxRoll: 60, name: "Mutant"
    },
    {
        maxRoll: 90, name: "Hi-Tech"
    },
    {
        maxRoll: 95, name: "Robot"
    },
    {
        maxRoll: 100, name: "Alien"
    },
];

const QUANTITY_ADVANCED_TABLE = [
    { maxRoll: 20, powers: { initial: 2, maximum: 4 }, talents: { initial: 1, maximum: 6 }, contacts: { initial: 0, maximum: 4 } },
    { maxRoll: 60, powers: { initial: 3, maximum: 4 }, talents: { initial: 2, maximum: 5 }, contacts: { initial: 1, maximum: 4 } },
    { maxRoll: 90, powers: { initial: 4, maximum: 4 }, talents: { initial: 3, maximum: 4 }, contacts: { initial: 2, maximum: 4 } },
    { maxRoll: 100, powers: { initial: 5, maximum: 5 }, talents: { initial: 4, maximum: 4 }, contacts: { initial: 3, maximum: 4 } }
];

const POWER_CATEGORIES_ADVANCED_TABLE = [
    { maxRoll: 5, name: "Resistances" },
    { maxRoll: 10, name: "Senses" },
    { maxRoll: 15, name: "Movement" },
    { maxRoll: 25, name: "Matter Control" },
    { maxRoll: 40, name: "Energy Control" },
    { maxRoll: 55, name: "Body Control" },
    { maxRoll: 70, name: "Distance Attacks" },
    { maxRoll: 75, name: "Mental Powers" },
    { maxRoll: 90, name: "Body Alterations/Offensive" },
    { maxRoll: 100, name: "Body Alterations/Defensive" }
];

const POWER_LIST_ADVANCED_TABLE = [
    {
        category: "Resistances", maxRoll: 10, name: "Resistance to Fire and Heat", powerCount: 1,
        description: "All damage from fire and heat-based attacks is reduced by the Power rank number. Further, any fire of less than this Power rank has no effect on the hero.",
        bonusPowerCount: 0
    },
    {
        category: "Resistances", maxRoll: 20, name: "Resistance to Cold", powerCount: 1,
        description: "All damage from cold-based attacks is reduced by the Power rank number. Further, ice and cold of less than this Power rank may be ignored. Physical items made of ice may still affect the hero.",
        bonusPowerCount: 0
    },
    {
        category: "Resistances", maxRoll: 30, name: "Resistance to Electricity", powerCount: 1,
        description: "All damage resulting from electrical-based attacks is reduced by the Power rank number. Further, electricity of less than this Power rank is ignored by the hero. The hero must decide if this Power is conductive or non-conductive in nature. Conductive resistance allows energy to pass through the hero into those the hero is touching (like a copper wire). Non-conductive resistance stops the energy at the contact point, allowing those being touched or held to be unharmed (like rubber insulation). ",
        bonusPowerCount: 0
    },
    {
        category: "Resistances", maxRoll: 40, name: "Resistance to Radiation", powerCount: 1,
        description: "All damage resulting from radiation-based attacks, including but not limited to X-rays, alpha and beta particles, and gamma rays, is reduced by the Power rank number. Most non-concussive energy rays used by super-powered individuals may be so reduced. Any radiation of a lower Intensity than the hero's Power rank has no effect on the hero. ",
        bonusPowerCount: 0
    },
    {
        category: "Resistances", maxRoll: 50, name: "Resistance to Toxins", powerCount: 1,
        description: "This Power rank is always a minimum of one rank greater than the hero's Endurance rank (if the random roll sets this Power as less than this stated minimum, it is raised to Endurance rank + 1CS). This rank is used instead of Endurance for all FEATs involving poison, and is not reduced by damage or effects of poison. Failing a FEAT with this Power will mean Endurance drops by one rank, but this Power rank does not drop. It will be used next turn at its normal level for determining further effects.",
        bonusPowerCount: 0
    },
    {
        category: "Resistances", maxRoll: 60, name: "Resistance to Corrosives", powerCount: 1,
        description: "This resistance reduces the amount of damage from acids and other caustic agents, including but not limited to rust, rot, acids, salt deterioration, and destructive microbes. The hero with this Power may ignore acids and corrosives of less than this resistance's Power rank number in Intensity, and may reduce damage from higher level acids by the Power rank number. ",
        bonusPowerCount: 0
    },
    {
        category: "Resistances", maxRoll: 70, name: "Resistance to Emotionn Attacks", powerCount: 1,
        description: "This Power rank will be no less than one rank higher than the character's initial Intuition, and should be raised to that rank +1CS if a lower rank is rolled. Any Emotion-related attacks that affect the Intuition, including illusions, emotion-control, and dominance must overcome this rank as opposed to the Intuition of the individual. ",
        bonusPowerCount: 0
    },
    {
        category: "Resistances", maxRoll: 80, name: "Resistance to Mental Attacks", powerCount: 1,
        description: "This resistance is similar to that of resistance to emotion attacks, but is used against attacks that affect the Psyche from psionic (but not magical) sources. This Power rank will be no less than one rank higher than the individual's Psyche, and should be raised to that rank + 1CS if a lower rank is rolled. ",
        bonusPowerCount: 0
    },
    {
        category: "Resistances", maxRoll: 90, name: "Resistance to Magic Attacks", powerCount: 1,
        description: "This resistance is similar to that of Resistance to Emotion Attacks, but is used against attacks that affect the Psyche from magical and extra-dimensional sources. Further, all magical damage-inflicting attacks are reduced by this Power rank number. Unlike the Resistances to Mental Attacks and Emotion Attacks, this Power rank may be lower than the Psyche initially, making the individual more vulnerable to certain types of magical attack (but less vulnerable to damage-inflicting magical attacks). ",
        bonusPowerCount: 0
    },
    {
        category: "Resistances", maxRoll: 100, name: "Resistance to Disease", powerCount: 1,
        description: "The individual with this resistance is less susceptible to disease than other heroes with the same Endurance. Included are common diseases, as well as the effects of biological warfare and vampirism. The individual's rank in this Power is no less than one rank above the individual's Endurance. (Any roll of less than that rank should be raised to the Endurance Rank + 1CS.) ",
        bonusPowerCount: 0
    },
    {
        category: "Resistances", maxRoll: 110, name: "Invulnerability", powerCount: 2,
        description: "The hero with this Power is totally unaffected by one or more of the attack forms listed above. The initial choosing of Invulnerability counts as two choices, but every additional choice in Resistances may be changed to an Invulnerability. Invulnerability means that the hero in question has a Class 1000 resistance to that attack form. Senses Powers in the Senses category are those that permit the hero some exotic method of detection, either by protecting or expanding the existing senses, or providing senses that outstrip the limits of other normal senses. ",
        bonusPowerCount: 0
    },

    {
        category: "Senses", maxRoll: 10, name: "Protected Senses", powerCount: 1,
        description: "One or more of the hero's basic senses are protected from attack. The hero ignores potentially damaging attacks of less than the Power rank in Intensity level. In many cases, this considers the effects of specially polarized goggles that prevent being suddenly blinded by high Intensity light, or earplugs or headgear that reduce the effects of sonic attacks. ",
        bonusPowerCount: 0
    },
    {
        category: "Senses", maxRoll: 20, name: "Enhances Senses", powerCount: 1,
        description: "One or more of the hero's five normal senses (hearing, sight, smell, touch, taste) is increased to the Power rank level. Use this rank instead of Intuition to discover clues, spot items, and determine initiative (in the case of Hearing). These extra-ordinary senses are more vulnerable to attack,  such  that attacks against them are at + 1CS.",
        bonusPowerCount: 0
    },
    {
        category: "Senses", maxRoll: 30, name: "Infravision", powerCount: 1,
        description: "The individual with this ability can see in the dark. In most normal darkness, this sight range is 5 areas. This Power has a rank because there are potentially high-Intensity darknesses that may foil this Power. If the Intensity of the darkness is higher than the rank of the infravision, sight is limited to only the immediate area.",
        bonusPowerCount: 0
    },
    {
        category: "Senses", maxRoll: 40, name: "Computer Links", powerCount: 1,
        description: "The character with this Power may communicate with and retrieve information from computer systems with Power rank ability. The hero must be able to access the computer in some way; usually this is by means of an implant relayed to a predetermined computer. If attempting to break into a new computer, compare this Power rank with the Reason of the computer or mechanical being. This Power also allows the reprogramming of simple robots. ",
        bonusPowerCount: 0
    },
    {
        category: "Senses", maxRoll: 50, name: "Emotion Detection", powerCount: 1,
        description: "The hero can detect emotion in others with Power rank ability. This Power may be a limited form of Empathy, or merely the ability to catch the subtle physiological clues that indicate a person is under stress, lying, or worried. Success with this FEAT roll indicates the hero detects only the target's emotional state, not the cause of it.  Targets trying to conceal their emotional state use their Intuition as an Intensity rank to determine the type of FEAT required. Detecting non-human emotions - those of robots and aliens, for instance - should be done at a higher shift. ",
        bonusPowerCount: 0
    },
    {
        category: "Senses", maxRoll: 60, name: "Energy Detection", powerCount: 1,
        description: "The hero with this Power is able to identify specific types of energy and track energy trails. The hero can identify the general type of energy with Power rank ability, and can track the energy trail of that specific type with Power rank ability per hour. Faint trails or common types of energy with confusing patterns may require yellow or red FEATs at the Judge's option. ",
        bonusPowerCount: 0
    },
    {
        category: "Senses", maxRoll: 70, name: "Magnetic Detection", powerCount: 1,
        description: "The hero with this Power can detect the magnetic field of Earth (and likely other planets as well), as well as aberrations of that field with Power rank ability. It is difficult for a hero with this Power to become lost.",
        bonusPowerCount: 0
    },
    {
        category: "Senses", maxRoll: 80, name: "Psionic Detection", powerCount: 1,
        description: "The hero with this Power is attuned to exceptional mental radiation in general, and as such can detect the use of paranormal abilities including mindreading, thought-casting, mental control and attacks, whether by technological or of mutant orgin (but not those of magical origin). The hero can detect these abilities only when they are in use, by making a Power rank FEAT roll. Make a check each round the hero is in range of psionic activity until the hero makes the FEAT or psionic activity ceases. The FEAT is green if the hero is specifically checking for psionic activity, yellow if not paying specific attention. ",
        bonusPowerCount: 0
    },
    {
        category: "Senses", maxRoll: 90, name: "Astral Detection", powerCount: 1,
        description: "The hero with this Power can see the forms of creatures operating in the astral plane, including ectoplasm of those adepts who can astrally project. This is an automatic ability: the individual can always recognize that an astral form is nearby. Use the Power rank FEAT to determine if the individual can note the features of the astral individual, such that the individual can be recognized or later ",
        bonusPowerCount: 0
    },
    {
        category: "Senses", maxRoll: 100, name: "Tracking Ability", powerCount: 1,
        description: "Through use of heightened senses, learned abilities, or mutant Powers the hero with this Power can track another individual's path. Make a Power rank FEAT 72 to catch the track, but once on the trail, FEAT rolls should only be required when there is a chance of losing the track. This will depend on the nature of the tracking ability.",
        bonusPowerCount: 0
    },
    {
        category: "Senses", maxRoll: 110, name: "Mutant Detection", powerCount: 1,
        description: "The hero with this Power is attuned to the specific mental radiation given out by mutants. The range is dependent on the Power rank of the individual. (See the Power Rank Range Table). This Power reflects the conscious will to detect mutants. ",
        bonusPowerCount: 0
    },
    {
        category: "Senses", maxRoll: 120, name: "Magic Detection", powerCount: 1,
        description: "The hero with this Power can detect magic. When magic is in force around the hero, make a Power rank FEAT roll. White means failure; check again next round. A green result indicates recognition that there is magic in the area, a yellow result the individual or individuals involved in the magic, and a red result the type of spell or magic involved. Spells that mask or mislead the spell-casting may reduce these chances at the Judge's option.",
        bonusPowerCount: 0
    },
    {
        category: "Senses", maxRoll: 130, name: "Combat Sense", powerCount: 2,
        description: "This Power rank may be used instead of Intuition for determining surprise, instead of Fighting for blocking, instead of Agility for dodging, and instead of Strength for escaping. The minimum level of this Power is the Intuition rank of the character. ",
        bonusPowerCount: 0
    },
    {
        category: "Senses", maxRoll: 140, name: "Cosmic Awareness", powerCount: 2,
        description: "The hero possessing this Power is in tune with the universe to some degree, allowing him to perceive other powerful entities and to detect weaknesses in opponents. Individuals with Class 1000 primary abilities or better within 10 miles of the hero will always be noticed by the hero. In addition, making a Power rank FEAT with this Power allows the user to gain a + 1CS on FEATs against an opponent by finding the weak point in an opponent or structure. ",
        bonusPowerCount: 0
    },

    {
        category: "Movement", maxRoll: 20, name: "Flight", powerCount: 1,
        description: "The hero with this Power can move through the air under his own power. The method of flight (wings, rockets, unconscious graviton manipulation, etc.) is left for the player to define, though it should be defined before play begins. The character's speed is determined by the Power rank of the individual (see Movement in Chapter 2). Agility is used to determine actions while flying, including changing course and dodging. Winds (including wind Powers) of greater Intensity than the hero's Power rank will cause the hero to lose altitude. The hero may gain one additional area (44 yards) for each 15 feet (1 story) dropped, and is slowed by one area of speed for each 30 feet (two stories) climbed.",
        bonusPowerCount: 0
    },
    {
        category: "Movement", maxRoll: 30, name: "Gliding", powerCount: 1,
        description: "The hero has the ability to glide, dropping 1 story (15 feet) for every turn in the air. The distance covered per turn is set by the Power rank as for flying. The Gliding hero cannot climb, but can maintain level flight by making an Agility FEAT (failure indicates loss of 2 stories (30 feet)). The method of gliding is set by the Judge and player. The gliding Power may be severely affected by winds, and winds of greater Intensity than the glider's speed may halt, down, or move backward the hero who glides, and will at least reduce the hero's speed by as many ranks as the Intensity is above Feeble.",
        bonusPowerCount: 0
    },
    {
        category: "Movement", maxRoll: 40, name: "Leaping", powerCount: 1,
        description: "The hero with this Power can leap great distances. Use the table on page 24, Chapter 2, replacing Strength with this Power rank. This Power rank will always be at least the Strength of the character + 1CS. If a lower rank is rolled, raise it to this minimum. ",
        bonusPowerCount: 0
    },
    {
        category: "Movement", maxRoll: 60, name: "Wall-Crawling", powerCount: 1,
        description: "The hero can move along vertical and upside-down surfaces as if they were normal surfaces. This Power rank indicates how strong the adhesion is. The hero will use the Power rank to determine the ability to stick, according to the Intensity of the slipperiness of the surface. ",
        bonusPowerCount: 0
    },
    {
        category: "Movement", maxRoll: 70, name: "Lightning Speed", powerCount: 1,
        description: "The hero with this Power can move as a vehicle with a speed equal to the Power rank, as opposed to his distance per round being limited by Endurance. This Power will always be at the Endurance rank + 1CS. If a lower rank is rolled, raise it to this minimum. Lightning Speed is assumed to apply to ground movement, but may be applied to any of the following Powers, if the hero has them in his possession: Flight, Gliding, Wall-crawling, or Digging. Characters with Lightning Speed can turn at maximum speed without penalty, and Agility FEATs may be made either with the Agility ability or with this Power rank. Characters with Lightning Speed can accelerate to full speed in a single round, and decelerate from full speed to full stop in the space of one area.",
        bonusPowerCount: 0
    },
    {
        category: "Movement", maxRoll: 80, name: "Levitation", powerCount: 1,
        description: "This Power allows the hero to move vertically unaided, and usually has a magical or mental origin. It does not allow true flight, but is immune to the effects of wind or air control Powers, unless the hero with the Power so chooses. The hero with the Power moves vertically a number of stories determined by the Power rank as speed. Horizontal movement is possible by pushing off from other surfaces, or levitating while moving.",
        bonusPowerCount: 0
    },
    {
        category: "Movement", maxRoll: 90, name: "Swimming", powerCount: 1,
        description: "All heroes are assumed to be capable of swimming if free of impediments. The Swimming Power shows that the hero can move through the water at high speeds, as in the Lightning Speed Power applied to water. This Power does not negate the need to breathe, but the hero who gains it may choose Water Breathing as a Bonus Power without a roll. ",
        bonusPowerCount: 0
    },
    {
        category: "Movement", maxRoll: 100, name: "Climbing", powerCount: 1,
        description: "The hero with this Power can scale vertical (but not upside-down) surfaces as if possessing the Wall-Crawling Power with Lightning Speed. The speed of the climbing is determined by the Power rank, and the surface must have sufficient handholds or cracks. In addition, the hero can move through tangled pipes, vines, and other areas that require manual dexterity using this Power instead of the hero's Agility. ",
        bonusPowerCount: 0
    },
    {
        category: "Movement", maxRoll: 110, name: "Teleportation", powerCount: 2,
        description: "The hero with Teleportation Power can move instantaneously from point to point without physically crossing the distance between. Each time the hero teleports, make a Power rank FEAT roll. Failure indicates the hero arrives at his or her location, but is disoriented by the experience, and may take no action in the following round. The teleporting hero may carry either all individuals in his area or someone the hero is touching up to his Strength limitations. Those carried by a teleporter must make a green Endurance FEAT or be disoriented for 1-10 rounds. Those teleported from an area must make a yellow Endurance FEAT or be disoriented for 1-10 rounds. If the Hero teleports into a solid object, make an Endurance FEAT. Failure results in damage equal to twice the material strength of the object teleported into. Success indicates another, random 'port, with the hero being unconscious for 1-10 rounds. A Power stunt that is used by teleporters is a version of multiple attacks, by which the hero teleports quickly from place to place, both dodging attacks and feints and parrying to do damage to one or more targets. Teleporters who attempt this trick may make multiple teleports in the same area, and attack one or more targets. Such teleporters trying this trick are considered to be Dodging for purposes of attacks upon them, and may deliver up to twice their normal number of attacks.",
        bonusPowerCount: 0
    },
    {
        category: "Movement", maxRoll: 120, name: "Digging", powerCount: 1,
        description: "The hero can move below ground by digging a tunnel. The hero may choose Claws as A Bonus Power if he has this Power. Normal movement is as for normal ground vehicle speed, half if the hero is digging a tunnel well-supported enough to allow others to follow. The hero may dig through materials of lower material strength rank than his Power rank, but not those of equal or greater rank. ",
        bonusPowerCount: 1,
        bonusPower: "Body Alterations/Offensive\\Claws(100)"
    },
    {
        category: "Movement", maxRoll: 130, name: "Dimensional Travel", powerCount: 2,
        description: "This Power allows the character to break through into other dimensions. The hero does this automatically, but must make a Power rank FEAT if under pressing conditions. A Power rank FEAT is always required if the hero is heading for a particular alternate dimension or universe. Dimensional destinations are created as for Power stunts.  At start, the hero has one dimension or alternate universe to where he can travel. Ability to reach a specific location in a given dimension is a red Power rank FEAT. Returning to a familiar location of the native plane is a yellow Power rank FEAT. Karma may be added to these FEAT rolls. ",
        bonusPowerCount: 0
    },

    {
        category: "Matter Control", maxRoll: 20, name: "Earth Control", powerCount: 1,
        description: "The hero with this Power can manipulate natural or semi-natural mineral items. The range and ability of these modifications are determined by the hero's Power rank (see Range of Powers listed in Chapter 2). This Power is limited to naturally occurring materials, or semi-natural materials that are of consistent nature. Radically altered items such as steel alloys and artifically constructed mechanisms, and living or once living things are beyond the scope of this Power. The Earth Control Power allows the hero to manipulate an amount of material up to the hero's Power rank taken as Strength in every round. The material may be used as a weapon, or shield.",
        bonusPowerCount: 0
    },
    {
        category: "Matter Control", maxRoll: 40, name: "Air Control", powerCount: 1,
        description: "The hero with this Power has the ability to manipulate air, winds, and (potentially) weather. The hero can create shields of wind up to Power rank damage that are effective against all physical missile attacks of that rank or lower. The hero can also use air as a distance weapon, inflicting up to the Power rank of damage, but repelled by any form of Force Field, including shields made of air. The hero can also generate winds of Power rank Intensity.",
        bonusPowerCount: 0
    },
    {
        category: "Matter Control", maxRoll: 60, name: "Fire Control", powerCount: 1,
        description: "The hero with this Power can control existing fire sources. He can intensify the fire up to the levels of his Power rank, or may reduce the Intensity of the fire by the same amount, reducing fire damage by the rank number. The hero with this Power can manipulate flame, so as to form a fiery shield that will inflict the Power rank number of damage on those who cross it, but cannot initially use the Fire Control to affect targets at a distance.",
        bonusPowerCount: 0
    },
    {
        category: "Matter Control", maxRoll: 80, name: "Water Control", powerCount: 1,
        description: "The hero with Water Control Powers can use available liquid water for specific effects. The water can be used as a missile weapon, inflicting Power rank damage at 1 area range. The water can also be used as a shield, having no effect on physical weapons, but reducing energy, force, and fire attacks by the rank number of the Power.",
        bonusPowerCount: 0
    },
    {
        category: "Matter Control", maxRoll: 100, name: "Weather Control", powerCount: 1,
        description: "The hero with this Power has the ability to manipulate the forces of weather. Using this Power, the hero can duplicate several Power stunts of other control abilities, and in addition create new stunts as well. Weather Control Power stunts cost only 50 Karma points, not the normal 100 points.",
        bonusPowerCount: 0
    },
    {
        category: "Matter Control", maxRoll: 110, name: "Density Mannipulation - Others", powerCount: 1,
        description: "The hero can alter the density of other individuals on touch, either increasing the density (and thereby mass) or reducing the density (take less damage, etc.). The hero must touch his target, and an unwilling target may make a Psyche or Endurance FEAT (target's choice) to avoid the effects (type of FEAT roll required is determined by this Power rank.  Effects are: Density Reduction: The target becomes vaguely transparent, and as such will become both less vulnerable to attacks and less effective in attacking. All Physical attacks on the individual in this state are reduced by this Power rank, and similarly all physical attacks by the affected character are reduced by this Power rank. The affected individual may not phase, but may be affected by winds of Good Intensity or greater. This effect lasts for 1-10 rounds, and the affected individual will be reinstated to his original state after this time. Density Increase: The affected individual increases in density (and therefore mass) without the increased strength in the limbs and other structures required to move that mass. Each round, make an Endurance FEAT or the character becomes unconscious. Upon becoming unconscious, make a second Endurance FEAT or the affected individual begins to lose Endurance ranks at a rate of one rank per round, until another Endurance FEAT halts the process. Performing any physical action while under the effects of this Power requires an Endurance FEAT. The effects of this manipulation last for 1-10 rounds after being applied.",
        bonusPowerCount: 0
    },
    {
        category: "Matter Control", maxRoll: 120, name: "Body Transformation - Others", powerCount: 1,
        description: "The hero with this Power can convert living tissues to other substances. The hero with this Power chooses one material and the transformation duration (up to one hour). A target of this Power must be touched, and may make a Psyche or Endurance FEAT (target's choice) to avoid being converted into that substance. While in that form the target has no recollection of what has occurred, and has the material strength of that substance. Flesh-to-flesh contact must be made; a foe in a full body-suit would be immune to this Power. Heroes who accept a - 2CS shift in initial Power may affect non-living tissue as well. In the case of touching a foe in a body suit, the suit would be converted into the material in question. Materials of a higher material strength than the Power rank are unaffeceted. In any event, the target regains his normal form following the transformation, even if pieces are broken off or dispersed.",
        bonusPowerCount: 0
    },
    {
        category: "Matter Control", maxRoll: 130, name: "Animal Transformation - Others", powerCount: 1,
        description: "The hero with this Power can transform human targets into animals and reverse the process. The target must be touched, and must fail a Psyche or Endurance FEAT. The target then has the physical attributes (FASE) of the animal, but retains the mental attributes (RIP) of the original form. The touch must be flesh-to-flesh. Heroes with inborn Powers retain those Powers in their new form.",
        bonusPowerCount: 0
    },

    {
        category: "Energy Control", maxRoll: 20, name: "Magneetic Manipulation", powerCount: 1,
        description: "The hero can manipulate magnetic lines of force. Initially, this gives the hero the ability to move and control metallic objects of up to Power rank size at Power rank range with Power rank ability. ",
        bonusPowerCount: 0
    },
    {
        category: "Energy Control", maxRoll: 40, name: "Electrical Manipulation", powerCount: 1,
        description: "The hero can manipulate and control electricity. Initially, this gives the hero a resistance to electrical attacks equal to this Power rank (raise one of the two Powers if Electrical Resistance is also chosen). ",
        bonusPowerCount: 0
    },
    {
        category: "Energy Control", maxRoll: 60, name: "Light Manipulation", powerCount: 1,
        description: "The hero can generate light and manipulate existing light energy. Such light is of Power rank Intensity and may either be cast in a burst, affecting all targets in the same area, or in a line, affecting a single target. Light used in this fashion inflicts no damage, but may blind the targets with Power rank Intensity. ",
        bonusPowerCount: 0
    },
    {
        category: "Energy Control", maxRoll: 80, name: "Sound Manipulation", powerCount: 1,
        description: "The hero can manipulate existing sonic energies, dampening existing noise by the Power rank number in Intensity, or increasing that noise by one level of Intensity if a successful Power rank FEAT is made. The individual with this Power may reduce all sonic-based attacks on his form by the Power rank number. A character with this Power may gain Sound Generation as a bonus Power, which would occupy the next Power slot instead of a randomly rolled Power. ",
        bonusPowerCount: 0
    },
    {
        category: "Energy Control", maxRoll: 90, name: "Darkforce Manipulation", powerCount: 1,
        description: "The hero with this Power can manipulate the extra-dimensional energy known as the Darkforce to perform specific actions. The hero may have one Power Stunt when the character is created. ",
        bonusPowerCount: 0
    },
    {
        category: "Energy Control", maxRoll: 100, name: "Gravity Manipulation", powerCount: 1,
        description: "The hero with this Power can alter the attractive forces of gravity. This grants the hero one of the Power Stunts, and gives him the potential to develop others as the campaign continues. ",
        bonusPowerCount: 0
    },
    {
        category: "Energy Control", maxRoll: 110, name: "Probability Manipulation", powerCount: 2,
        description: "This is a very potent Power, and has strict limits. The hero has the ability to alter the chance element effected by the die.  A hero with manipulation Powers must roll a second time: 01-50 = Bad Luck, 52-90 = Good Luck, 91-100 = May manipulate both types. An individual with Bad Luck Power may call it into play for any roll. On that roll, the order of the dice is changed - the low die is always considered the tens, the high die ones (a nine and a one are not 91, but rather 19). Similarly, one with Good Luck Powers will read the high number first.  Given the potential Power of heroes using the manipulative Powers to further alter the roll, a limitation to this Power must be taken by the character.  Good Luck may only affect the hero with the Power.  Bad Luck affects those that are attacking the hero or performing actions that would result in damage to the hero. Note that the allies, friends, and relatives of the hero with this Power do not benefit from this Power, and in fact may be damaged by its limitations.",
        bonusPowerCount: 0
    },
    {
        category: "Energy Control", maxRoll: 120, name: "Nullifying Power", powerCount: 2,
        description: "The hero with this extremely potent Power can negate the inborn super-human Powers of other individuals with Power rank ability. Technological or Magical abilities are unaffected. Those affected must make an Endurance FEAT against the Power rank Intensity or lose those inborn abilities as long as the hero is in range, or for 1-10 rounds. Note that this Power will affect all within the range of the Power, and the individual may use no other inborn super-human Powers while using this Power. ",
        bonusPowerCount: 0
    },
    {
        category: "Energy Control", maxRoll: 130, name: "Energy Reflection", powerCount: 1,
        description: "This Power grants the hero a limited form of Invulnerability (as the Power) to a specific form of energy. Any attack of that energy up to Unearthly damage or Intensity inflicts no damage on the character. The attack may be reflected in the round it occurs against the attacker or another target within Power rank range. The damage of the attack is as for the original attacker. The hero reflecting the attack makes an Agility FEAT to determine if the reflection hits its target. A hero does not lose Karma from the results of a reflected attack. If the hero is attacked with more than Unearthly damage, the hero will reflect 100 points of that damage elsewhere, and take the remainder. ",
        bonusPowerCount: 0
    },
    {
        category: "Energy Control", maxRoll: 140, name: "Time Control", powerCount: 2,
        description: "Time control is a powerful Power. Should the hero choose it, it will count as two Powers, and the hero will recieve an automatic limitation from the Judge. ",
        bonusPowerCount: 0
    },

    {
        category: "Body Control", maxRoll: 10, name: "Growth", powerCount: 1,
        description: "The hero with this Power can grow taller at will. The limit of growth is determined by the Power rank, as noted on the table below. The hero may use his Power rank instead of Strength when performing Feats of Strength, including wrestling combat. Charging, slugfest, and missile attacks on an enlarged character all receive positive column shifts to hit. Characters that experience growth usually but not always draw their additional mass from an unknown source. Characters with growth are not slowed or impaired by their added mass. Finally, the hero with this Power may choose (as a limitation) to have the Power always in effect. This means the Power is raised one rank initially, but the hero is fixed at that size, permanently. ",
        bonusPowerCount: 0
    },
    {
        category: "Body Control", maxRoll: 20, name: "Shrinking", powerCount: 1,
        description: "The hero with this Power can make himself smaller, while retaining the original strength and abilities. The hero's Strength is unaffected by the shrinking. In addition, the hero may have a column shift modifier that reflects the increase in attacks against larger (normal-sized) foes and the reduction suffered by such foes atacking the hero.",
        bonusPowerCount: 0
    },
    {
        category: "Body Control", maxRoll: 30, name: "Invisibility", powerCount: 1,
        description: "The hero with this Power can make his body invisible to normal sight. This Power does not negate location by other senses, or nor does it initially negate location by heat or ultraviolet sources. The hero still has mass and substance (coating the hero with dust or paint reveals the true form, as does fog or rain). The hero may remain invisible as long as desired, and the Power rank has no effect on whether the hero becomes invisible under normal circumstances.",
        bonusPowerCount: 0
    },
    {
        category: "Body Control", maxRoll: 40, name: "Plasticity", powerCount: 1,
        description: "The body of the hero with this Power is slightly elastic and malleable, and the hero manipulates his body as he sees fit. The hero with this Power may also choose Elongation as a bonus Power, placing that Power in the next slot without a random roll. The plasticity of the body serves as Power rank Body Armor. ",
        bonusPowerCount: 1,
        bonusPower: "Body Control\\Elongation(100)"
    },
    {
        category: "Body Control", maxRoll: 50, name: "Shape-Shifting", powerCount: 1,
        description: "This Power allows the hero to radically modify his shape to resemble other objects or beings, to the point of being that object to all appearances (touch, taste, etc.). The degree of success of the shape change is determined by a Power rank FEAT against the investigating creature's Reason, Intuition, or Psyche, whichever is higher (compare with Imitation). A character may not gain more than half his height or shrink to half his original size. Only obvious, visible physical Powers may be gained by shifting shape (claws, gliding membranes, etc.). True super powers may not be gained in this fashion. ",
        bonusPowerCount: 0
    },
    {
        category: "Body Control", maxRoll: 60, name: "Body Transformation", powerCount: 2,
        description: "Similar to Body Transformation - Others with the added advantage of normal mobility and cognizance while in the transformed state. The character that is in this state gains Body Armor equal to the material strength of the material, or the Power rank, whichever is lower. In addition, the character gains any special functions of that material. A hero who is damaged while in transformed state takes damage as normal, but if destroyed in this form may reintegrate if any Health remains. (Conversely, if dropped to 0 Health, the character could not reintegrate until some of the damage healed naturally or from outside influence. The pieces may integrate only if within one area. (The Absorbing Man once transformed into glass and was shattered, then waited until most of his body arrived at a dump to reintegrate. Nitro, who maintained a gas state, was neutralized by being split into two parts.) ",
        bonusPowerCount: 0
    },
    {
        category: "Body Control", maxRoll: 70, name: "Animal Transformation - Self", powerCount: 1,
        description: "This Power allows the hero to assume the form of a normal animal (check the list in the Judge's Book), with all applicable Powers of that animal. Weight and height are that of a normal version of that particular animal. The animal's Reason, Intuition, and Psyche may be that of either the character or the animal, but if any are of the animal, then a Power rank FEAT must be made. It requires a Power rank FEAT to make the transformation from hero to animal, but it may be made without such a roll if a single animal type is chosen. Any other super-human Powers are lost while in animal form. ",
        bonusPowerCount: 0
    },
    {
        category: "Body Control", maxRoll: 80, name: "Raise Lowest Ability", powerCount: 1,
        description: "Not really a Power by any means, but a method of immediate self-improvement for a character that may be suffering from terminally low stats in a critical area (say, a Feeble Strength in a character with Body Armor, who carries a mystic sword). Only one of the seven abilities may be modified in this fashion, and then only the lowest one if two are lowest, the hero gets to choose which one is modified). The ability is raised 20 points. The hero may then choose his next Power from this complete list. ",
        bonusPowerCount: 0
    },
    {
        category: "Body Control", maxRoll: 90, name: "Blending", powerCount: 1,
        description: "The hero has the ability to change his shade to blend in with his surroundings, and has in effect a specialized form of Invisibility. The hero and his uniform, if made of unstable molecules) are hidden with Power rank ability, and will not be detected until the character moves or acts. Should a hero choose a limitation, the Power is raised +2CS, as opposed to the standard + 1CS. ",
        bonusPowerCount: 0
    },
    {
        category: "Body Control", maxRoll: 100, name: "Alter Ego", powerCount: 1,
        description: "An alter ego is not the same thing as a secret ID. It is a separate persona, also controlled by the player. Abilities for this character are rolled a s for Normal Folks (column 2 on page 6). An alter ego has no super Powers, and the hero who creates him must decide if the Contacts are enjoyed by the hero, the alter ego, or both. Talents remain the same for hero and alter ego. Popularity is split as for a secret ID. Karma is gained and lost separately by the hero and the alter ego; they cannot spend Karma from each other's Karma pools. Transformation from alter ego to hero is immediate. If the hero chooses a limitation, such as the transformation takes 1-10 rounds, requires a specific item, or Talents are not shared by the two personas, then one of the hero's Abilities may be raised one rank (Unearthly maximum). This is an exception to the standard rules for alter egos. Distance Attacks are just what they sound like: missile weapons that allow the hero to strike from a distance with less danger of being hit in return. ",
        bonusPowerCount: 0
    },
    {
        category: "Body Control", maxRoll: 11, name: "Density Manipulation - Self", powerCount: 1,
        description: "The hero with this Power can alter his mass at will. Density may range from Shift 0 (almost intangible) to the Power rank of the Ability. The hero who has altered mass weighs as much as a character with that strength could lift. (A hero with Feeble Density would weigh 50 lbs, while one with Shift 0 would be effectively weightless). An individual gains Body Armor equal to his current Power rank. In addition, the character may inflict charging damage using the Power rank instead of the Strength ability, and may affect materials of lesser material strength than the current Power rank. In the Shift 0 state the hero may not initially pass through solid items (see Phasing), but is immune to physical attacks (though not energy or force attacks). A high density may slow the character down. If the density of the character is higher than the individual's Endurance, both Fighting and Agility suffer a - 1CS penalty.",
        bonusPowerCount: 0
    },
    {
        category: "Body Control", maxRoll: 12, name: "Phasing", powerCount: 1,
        description: "This is similar to Density Manipulation, save that it pulls the molecules of a body out of phase with those of the surrounding area, allowing the hero to phase through solid items. While phased, the hero is immune to physical and most energy attacks, but is still subject to the effects of mental attacks and magic. The hero may pass through other objects if the Power rank exceeds the material strength of the object, and may pass through force fields of lower material strength by making a green FEAT roll. The phasing individual may not pass through materials of greater material strength, or force fields of equal or greater material strength than the hero's Power rank. While the hero cannot be affected by physical attacks during a round, the hero may similarly not make physical attacks, with one major exception, which is treated as a Power Stunt. Phasing has a detrimental effect on electronic devices. Phasing through such a device (like a computer) will cause a malfunction. In affecting robotic beings or hi-tech heroes, use the hero's Endurance (for robots) or Reason (for equipment) to determine the effects. Failure of an Endurance or Reason FEAT results in the loss of an amount of Health equal to the Power rank. To otherwise attack, the hero may phase in, strike, and then phase back out (depending on initiative, this may take three turns).",
        bonusPowerCount: 0
    },
    {
        category: "Body Control", maxRoll: 13, name: "Elongation", powerCount: 1,
        description: "Elongation is similar to the Power of Plasticity, but differs primarily in that it allows the character to extend his body and limbs over a number of areas (The character with this Power may attack non-adjacent foes in close combat types of attacks (slugfest, grappling, etc.). The target of these attacks may only make close attacks against the part of the opponent that is attacking, and as such may not benefit from Kill, Stun, and Slam results. A character with this Power may extend a number of yards equal to his Power rank number. ",
        bonusPowerCount: 0
    },
    {
        category: "Body Control", maxRoll: 14, name: "Imitation", powerCount: 1,
        description: "Not the sincerest form of flattery, but a specialized form of Shape-shifting that allows the hero to duplicate the appearance of other humanoid forms, up to the limits of Shape-shifting (half-again or half of original size). The character with Imitation may duplicate the appearance, voice, and mannerisms (but not Powers, Talents, or abilities) of a specific individual. The hero must have seen the individual previously for a sufficient period to duplicate him. The success of the imitation is determined by a Power rank FEAT, against the Reason, Intuition, or Psyche of the person being fooled, whichever is lower. A hero with imitative Powers may attempt to duplicate a character with high Popularity and/or powerful Contacts. If successful, the character may be treated as if he has that Popularity, and his actions would be ascribed to the character he is imitating. ",
        bonusPowerCount: 0
    },
    {
        category: "Body Control", maxRoll: 15, name: "Power Absorption", powerCount: 1,
        description: "This is not the absorption of energy, but the acquiring of other individuals' super-human Powers and abilities. Only those naturally occurring powers and abilities may be absorbed, though Robot PCs with this Power may duplicate items of technology as well. The character must touch the target in order to gain those abilities, and the target may make a Psyche or Endurance FEAT to avoid the effect. The type of FEAT is determined by the player when the character is created. The maximum of any ability so acquired is limited to the Power rank of the Power Absorption. If a Power or ability is of a higher rank, then the hero making the attempt must make a successful Psyche FEAT or be knocked out by the backlash for 1-10 rounds, and would only gain Good Strength in the process. A character starting with this Power may only acquire one Power or ability, stated before the attack is made. If a limitation on the Power absorption is taken, a second Power may be drained. Further Powers and abilities may be added as Power Stunts. While the Power-absorbing hero has the Power or ability of another, the character from whom he took it cannot use it if the character it was stolen from had a higher rank than the Power rank of the Power thief, that ability is reduced by that amount). Characters with basic abilities reduced to below Feeble are unconscious for 1-10 rounds.",
        bonusPowerCount: 0
    },

    {
        category: "Distance Attacks", maxRoll: 10, name: "Projectile Missile", powerCount: 1,
        description: "A projectile missile represents a specially designed weapon that inflicts damage according to the Shooting column. This is usually some form of technological device, but not always. This weapon is specially designed for the character, and the hero suffers no penalty for range when firing it (other individuals that may get their hands on it would suffer such a penalty). The hero uses his Agility to determine if the attack hits. The weapon or device has Power rank range and damage, and any increase in its abilities through advancement is considered to be from tinkering and improvement (the device is not affected by the rules for building and inventing items).",
        bonusPowerCount: 0
    },
    {
        category: "Distance Attacks", maxRoll: 20, name: "Ensnaring Missile", powerCount: 1,
        description: "An ensnaring missile is a device that makes a form of grappling attack. The hero making the attack rolls an Agility FEAT to hit, and any hit is considered to have entangled the opponent. This entangling is the equivalent of a grappling attack of Power rank Strength, and the ensnarement is considered to have Power rank material strength.",
        bonusPowerCount: 0
    },
    {
        category: "Distance Attacks", maxRoll: 30, name: "Ice Generation", powerCount: 1,
        description: "The hero in question may draw water from the ambient atmosphere (nearby area and convert it to ice, which the hero may then use initially as a missile weapon. He may later develop other uses through Power Stunts. The ice missiles have Power rank range, inflict up to Power rank damage (the hero may throw less-lethal snowballs), and use Agility to hit either on the Blunt Throwing or Edged Throwing battle effect column. ",
        bonusPowerCount: 0
    },
    {
        category: "Distance Attacks", maxRoll: 40, name: "Fire Generation", powerCount: 1,
        description: "The hero with this Power may project flame with Power rank range and damage, using Agility to hit. Damage is taken on the Energy table. Like ice generation, creation of large amounts of flame may damage the surrounding area in a fashion that leads to loss of Karma. The hero may choose to inflict less damage with his flame, or have a lesser effect than rolled on the Universal table.",
        bonusPowerCount: 0
    },
    {
        category: "Distance Attacks", maxRoll: 50, name: "Energy Generation", powerCount: 1,
        description: "The hero with this Power can fire bolts of force that inflict Energy-type damage, Force-type damage, or either (determined before attack). One type is gained initially, and the other may be developed as a Power Stunt at full effect. The bolts hit for Power rank range and damage, and use Agility to determine if they hit the target. The hero with Energy Generation may choose to inflict less damage than determined, whether in amount of Health lost, or effects of the attack. (The character may pull his punch.) ",
        bonusPowerCount: 0
    },
    {
        category: "Distance Attacks", maxRoll: 60, name: "Sound Generation", powerCount: 1,
        description: "The hero with this Power can make sonic attacks of up to Power rank range and damage. Sonic attacks are made on the force column, and can initially affect only one target at a time. ",
        bonusPowerCount: 0
    },
    {
        category: "Distance Attacks", maxRoll: 70, name: "Stunning Missile", powerCount: 1,
        description: "The hero possesses a weapon, energy bolt, or Power that either inflicts damage on the Force column, or inflicts a Stunning attack of Power rank Intensity. One of the two types must be chosen at start, though the other may be developed as a Power Stunt. Range and damage are determined by the Power rank, though damage and effects may be voluntarily reduced. ",
        bonusPowerCount: 0
    },
    {
        category: "Distance Attacks", maxRoll: 80, name: "Corrosive Missile", powerCount: 1,
        description: "The hero has some form of corrosive, acidic, or matter-hostile attack that inflicts damage over a long period of time. A corrosive attack inflicts Power rank damage the first round, Power rank - 2CS damage the second, and Power rank - 4CS damage the third. Damage may be halted by washing the exposed material or area. The character with this attack may never choose to inflict less damage. Corrosive attacks may also affect materials and Body Armor. Make a FEAT roll as if the Power rank of the corrosive was a an attempt to break the material. Success indicates the attack has burned through or weakened the material such that it is no longer useful or provides no further protection. This FEAT may be made only on materials of lesser material strength than this Power rank. Corrosive attacks must hit the target, and as such have no effect on Force Fields and thee like.",
        bonusPowerCount: 0
    },
    {
        category: "Distance Attacks", maxRoll: 90, name: "Slashing Missile", powerCount: 1,
        description: "The hero with this form of weapon makes attacks on the Throwing, Edged column, and may not reduce the effect of the attack. The slashing missile has damage and range equal to this Power rank. The hero with this Power may develop an attack with a result on the Blunt Throwing Column as a Power Stunt. ",
        bonusPowerCount: 0
    },
    {
        category: "Distance Attacks", maxRoll: 100, name: "Darkforce Generation", powerCount: 1,
        description: "The character with this Power may summon the effects of the Darkforce for use as a weapon and for developing Power Stunts. The Darkforce inflicts either up to Power rank damage or has the effect of a Power rank Intensity Stunning attack, affecting the targets for 1-10 rounds. In addition, the character with this Power can develop all the Power Stunts listed for Darkforce Manipulation, except teleportation. ",
        bonusPowerCount: 0
    },
    {
        category: "Distance Attacks", maxRoll: 110, name: "Nullifier Missile", powerCount: 1,
        description: "The hero with this type of attack inflicts no damage, but may nullify inborn or technological Powers (one or the other) with Power rank Intensity. The effects of this nullification last for only as long as the hero concentrates. He can concentrate on only a single target within Power rank range at a time. Each round, the target may make a Psyche FEAT (for inborn) or Reason FEAT (for hi-tech) against the intensity of this Power to evade its effects. ",
        bonusPowerCount: 0
    },

    {
        category: "Mental Powers", maxRoll: 100, name: "Telepathy", powerCount: 1,
        description: "The hero with Telepathic Power may establish mind-to-mind communication between himself and other individuals. The telepath only reads surface thoughts, but does so without visible or audible signs. The hero attempting to make telepathic contact must make a Power rank FEAT. Contact is automatic with willing targets and unwilling targets who have a lower Psyche than the hero's. Targets of equal Psyche require a yellow FEAT, and those with mental Powers or some form of psionic screening a red FEAT. Individuals with a higher Psyche who are unwilling to be contacted telepathically are impossible FEATS.   ",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 20, name: "Image Generation", powerCount: 2,
        description: "The hero with this Power may create vivid mental images. These images do not register on cameras, film, or in the minds of non-sentient robots. (Player Characters are considered to duplicate human eye and brain patterns, and as such are subject to the effects of these Powers, though they gain a + 1CS to disbelieve them.) Heroes with Image Generation may cast their illusions within the Power rank range, but must be in line of sight of these illusions. Targets must make an Intuition FEAT against the intensity of the illusion (the Power rank of the caster). Targets only gain a FEAT roll if the players running those characters decide that the images are false. (If they think that yes, that's a brontosaurus walking up Park Avenue, then as far as they are concerned, that's a brontosaurus walking up Park Avenue.) Illusions will last as long as the hero concentrates on them. Illusions inflict no intrinsic damage, but if they are believed, the characters that believe them will take imaginary damage, with apparent death resulting in unconsciousness for 1-10 rounds. Since a character who has time to examine his wounds will find he is not hurt, and the damage is illusionary, most illusion-casters do not make direct attacks but use their illusions for subterfuge and deception (perhaps covering a true threat). Illusions fool characters but do not fool nature. If a hero creates a brick wall, which the opponent believes is real, the opponent will not move through the brick wall because he believes it to be real. If the hero creates the illusion of a bridge over a chasm, and the character believes in it, the character will still fall into the chasm. In the former case, it is the limitations of the mind that dominate. In the latter the laws of gravity override. ",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 30, name: "Telekinesis", powerCount: 1,
        description: "This Power allows the hero to lift objects and perform other FEATs of Strength as if the character had a Strength of the Power rank. The Power rank determines the maximum range of this Power as well. ",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 40, name: "Force Field Generation", powerCount: 1,
        description: "The hero with this Power can create force fields that will protect himself and possibly other allies. It is not necessarily a Power of the mind, but since its most powerful practitioner, the Invisible Woman, has it a s a mental ability, it is included here. The hero with this Power can generate a force field that covers an area equal to the tens place of the rank number. A character with a rank number of 70 may cover 7 areas. For every area covered beyond the first, the strength of the force field is reduced by one rank, so that a force field encompassing 7 areas would reduce the effects by - 6CS. A hero may choose to have a personal force field at + 1CS instead of being able to project force fields. This choice is made at the start of play, and as such cannot be changed. Characters with individual force fields cannot engage in Power Stunts using this option. A force field operates as a form of Body Armor. If the amount of damage incurred in a round from all forms of attack is less than the rank number, then that damage is absorbed without harm to those within the area. If the amount is greater, the force field is breached. If there is a Monstrous (75) force field, then up to 75 points in a turn may be absorbed. At 76 points the force field fails. A personal force field is considered to replace Body Armor, such that damage that gets around a personal force field is not absorbed by Body Armor. (You cannot layer Body Armor with a force field to become a tank, though the two together give you options.) What occurs with a failing force field depends on its type. A personal force field shuts off, and the excess d a m a g e is taken by the user, including any effects from the battle effects table. The failure of a projected force field results in the force field coming down, but those inside are unharmed by that attack. The wielder of the force field must make a Psyche FEAT roll against the Intensity of the attack or become unconscious for 1-10 rounds. A force field is most effective against energy attacks, less effective against all others. Treat the amount of protection against other forms of attack at ten points less than the listed rank number. If the rank number is Excellent (21), the force field can absorb 21 points of energy-type damage, including heat, force, and similar non-physical attacks. Against all other types it can absorb up to 11 points.",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 50, name: "Animal Communication and Control", powerCount: 1,
        description: "A hero with this Power can talk to animals and influence their actions. The hero gains a + 1CS if she chooses to influence only a particular type (or class), such as sea life or birds. This is increased to + 2CS if she narrows it further, to a particular class or family such as bony-skeletoned fishes or falcons. Choosing to influence a specific animal (Chucky the Falcon, or Leo the Lionfish) gives the hero a +3CS. In the latter case, the animal is a companion of the hero at the start of the campaign. A character who selects one of these limitations may also converse with animals that are one step more general, but no further, with a loss of - 1CS. The character with Chucky the Falcon can also converse with falcons in general, at + 2CS (the Power rank raised to + 3CS minus one for generality), but not with birds that are not falcons. Communication with animals is considered automatic with these Powers, and the types which benefit from a + 2CS modifier are considered Contacts (always Friendly). Otherwise animal reactions are Neutral to Hostile. Communication with Hostile animals is chancy at best. The Power rank reflects the ability of the hero to control the actions of the animal in question. Make a Popularity FEAT for any requests the hero makes of the animals, using Power rank instead of Popularity. Therefore, if a hero controls crocodiles with Amazing(50) ability the result is rolled on the Amazing column. Failure indicates the animal may turn on the controller. Animals which are Contacts (always friendly) never turn on the controller. Note on communications: Animals have no language, per se, but do communicate by a number of verbal and non-verbal signals. Communication is considered to be a super-human ability to recognize those signals and make one's own desires and wishes clear, a s limited by the animals intelligence level.",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 60, name: "Empathy", powerCount: 1,
        description: "Empathy is similar to Telepathy, but registers the surface emotions as opposed to the surface thoughts of the opponent, and no emotions may be transmitted back to the target. The character with this Power must make the FEAT roll to determine its success (indeed, the target may never know). Success is determined in a similar matter to Telepathy, but Empathy and Emotion Control Powers will block its success. ",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 70, name: "Psi-Screen", powerCount: 1,
        description: "This form of Psi-Screen is an inborn Power that resists mental scans and domination. All characters with any of the mental Powers have this Power at an equal level to their Psyche (hence the difficulties in reading their thoughts). A character with this Power will have a Psi-Screen at + 1CS higher than his Psyche at start, and may increase it through experience to higher levels. A character with Psi-Screen may use this value instead of the Psyche to resist the effects of any Mental Power that requires a Psyche FEAT roll. This Power differs from the Talent of the same name in that it may be extended over a number of targets to attempt to protect others from attacks. Each target protected requires a Power rank FEAT, with failure indicating all such Powers are lost for 1-10 turns (usually enough time for the opponent to gain advantage). Also, the attacker will be aware of the protector's mental presence. ",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 80, name: "Mental Probe", powerCount: 1,
        description: "This Power is a specific form of Telepathy. A Mental Probe is a search for a specific image in the mind of the target. The hero with this Power must state what she is looking for before beginning the scan. The target makes a Psyche FEAT to resist the effects of a Mental Probe. If successful, the mind may not be probed again for 24 hours. In either case, the target must make a second Psyche FEAT. This FEAT determines if the Psyche is at - 1CS for the next 24 hours as well. (Psychic interrogators may try again just at the 24 hour mark, when the mind is capable of being probed but before the Psyche returns to normal.) A successful Mental Probe will reveal the information known by the individual being probed, strictly limited to that character's knowledge. Probing a guard of a scientific installation may not reveal what the installation is working on, only that it is hush-hush, they have a number of scientists, and they have been shipping a large number of crocodiles into the plant. ",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 90, name: "Astral Projection", powerCount: 1,
        description: "The hero with this Power the body and travel elsewhere, either in this dimension, or entering other dimensions. The range of astral travel is determined by the Power rank of the ability. If the ability is magical in origin, use the magical range chart on page 65. If not, use the Power rank range as determined on page 16. The character in astral form may observe actions in the normal world, but may not be detected by normal means (Astral detection and Telepathy will reveal the presence of the astral intruder). The character may not use his other abilities in the Astral form against non-astral targets. An astral character is not affected by non-telepathic objects or forms of attack, but may be affected by Mental Powers (those listed under the Mental Powers table, including Force Fields). The astral character may phase through solid objects without damaging either character or object.        While the astral form is separate, the body is immobile, in a trance. Damage to the body will be known to the astral traveler if it is in this dimension, and it is possible for the body to perish while the astral form is away. Characters whose bodies have perished are trapped in astral form. Astral characters may travel across dimensions with Power rank ability. Locating a specific dimension is a Psyche FEAT. In this dimension, the astral character moves up to the limit of his or her range in a single round. Further separation, or the removal of the astral form from the body for more rounds than the Power rank of this ability, results in Endurance FEATs for the body as if it were suffering a lethal (kill result) attack. Characters with Astral Projection may also. detect the astral as a Power Stunt, and two characters in astral form will be able to see each other. Astral combat and other dimensions are covered in the Judge's Book. ",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 100, name: "Psionic Attack", powerCount: 1,
        description: "This Power gives the hero the ability to project psionic force blasts at Power rank range and Intensity. The target of this attack must make a successful Psyche FEAT or be knocked unconscious for 1-10 rounds. Characters with Mental Powers may use their Power ranks instead of Psyche, and those with Psi-Screen should use that Power rank before any other. Force Field's operate against psionic attack. ",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 11, name: "Mind Control", powerCount: 2,
        description: "Mind Control is the total overriding of the conscious mind. The character's personality remains, but his actions are controlled by the character with this power. The target may make a Psyche FEAT to avoid this effect against the Intensity of the Mind Control Power rank. If that FEAT fails, the conscious actions of the character are controlled. The target has no memory of the period he is under control. The attacker and target must be within 1 area initially to effect Mind Control, though the target and attacker may be separated by miles afterwards. The target will only obey the orders of the controller, though those orders may be verbal or telepathic (if the controlling character has that Power) in nature. The victim of a successful Mind Control gains an additonal Psyche FEAT roll each time he is placed in a Karma-losing situation. No Karma may be added to any FEATS while under the control of another, including this one. An additional Psyche FEAT is gained if the victim is placed in a life-threatening situation (that is, the situation threatens the victim). Karma may be added to this roll. Controlling another mind is the psychic equivalent of breaking and entering. The hero loses 10 Karma points whenever this Power is used. (Heroes may choose to lose more Karma as a limitation by which they can raise this Power.) If Karma is gained or lost as a result of the actions of a mind-controlled character, that gain or loss is ascribed to the hero, as if the mind-controlling hero had performed the action himself. (You mind-control the Vulture to bump off Electro. You lose all Karma for slaying Electro, even though Vulture, being a villain, would not normally lose Karma for doing so.) A character who has been Mind Controlled is unaware of his actions, knowing only that he has blanked out for a while. If a Player Character is under the effects of a Mind Control, run him normally, but all actions must be OKed by the controlling character. Naturally, the controlled PC cannot pass on the information of his state to others.",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 12, name: "Emotion Control", powerCount: 2,
        description: "Emotion Control is a related form of Mind Control that acts upon 82 TM the subconscious fears and attractions to produce the required results. Targets of an Emotion Control attack must be in the same area as the character with this Power, and may make an Intuition FEAT to avoid the effects, which have a duration of 10-100 turns after the initial attack. The effects must diminish before another dose of Emotion Control may be applied. Robots and non-human alien beings are immune to the effects of Emotion Control. Only one type of emotion may be instilled in a target at a time. The character with this Power may modify any emotions, but gains a +2CS if he chooses to modify one emotion exclusively. Such a character is extremely powerful, but may not develop other types of Emotion Control as Power Stunts. Those heroes that do not limit themselves to one particular emotion begin play with two emotions they can modify, with others that may be developed as Emotions may be influenced to reflect on the user of the Power, or on another target. ",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 13, name: "Mechanical Intuition", powerCount: 1,
        description: "This is a specific form of Ultimate Skill that affects repairs, inventing, and building things. The character with this Power has a strong intuitive knowledge of machinery. Regardless of Reason, any rolls for determining whether an invention works or not are at Unearthly Rank. No modifiers may be added to this roll. The character with this Power must still provide Resources for these inventions in the standard fashion.     ",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 14, name: "Animal Empathy", powerCount: 1,
        description: "This specialized form of Empathy extends to all animals in a primitive form of Animal Communication. The hero with this Power may detect and influence the surface emotions of the animal involved, and instill in it fear, hunger, affection, exhaustion, or other emotions on a successful Power rank FEAT. ",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 15, name: "Animate Drawings", powerCount: 1,
        description: "The hero with this Power may animate flat drawings and other repesentations, causing them to become fully operational items. A character may attempt to animate any drawing, even one of his own creation, or animate a specific type or class of object. In the latter case, a + 1CS to Power rank is initially given, though the character loses the ability to animate other drawings (an example of this would be Tarot of the Hellions, who draws her animated figures from a Tarot deck). The animated drawings will have abilities and Powers according to their nature, but no Power or ability can exceed the Power rank number of the hero. No additional Powers can be given to the animation, unless the card shows those Powers in operation. In other words, animating a picture of the Invisible Woman would not give the animation force fields or invisibility Powers, unless those Powers were shown in the picture. (And how can you show invisibility in a picture?) Animated figures last for 1-10 rounds, the actual amount of time determined secretly by the Judge. They dissipate at that time, return to their original location, and may not be animated again for 24 hours. The figures also dissipate if they are destroyed or reduced to 0 Health. ",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 16, name: "Possession", powerCount: 2,
        description: "This Power is a specific form of Mind Control in which all actions of the character are assumed by the controller. The controller is in effect inside` the mind of the character, and as such controls all actions without having to give commands. Possession is only possible against targets with no greater Psyche than the hero's Power rank. The target may make a Psyche FEAT to avoid the Possession. A character who is possessed neither gains nor lose Karma when being possessed, though she may suffer from losses of Popularity while her body performs actions that are not heroic in nature. The character may make a Psyche FEAT to escape if placed in a life-threatening situation. The character possessing another may spend her own Karma (but not the Karma of the 84 possessed character) to influence actions.  ",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 17, name: "Transferral", powerCount: 2,
        description: "Transferral is the ultimate form of Possession, in that it allows the complete transferral of consciousness with a target within one area. The target's consciousness is not put away in the back of the character's mind, but rather moved into the body of the character with the Transferral Power. Transferral always needs a red Power rank FEAT to succeed, and may be performed against creatures with higher Psyches, those with Mental Powers, and alien beings or robots. If the transfer fails, the attacker is unconscious for 1-10 rounds, and may not attempt again for one day. When characters transfer consciousness, they also trade the mental abilities, Powers, and Talents. They do not trade physical abilities or Powers, nor do they trade Popularity, Contacts, or Resources. The character performing the transferral also trades Karma amounts with the target.",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 18, name: "Precognition", powerCount: 2,
        description: "An accurate divining of the future is impossible due to the nature of the Marvel Universe. There are a large variety of possible alternate futures diverging at any one point, all leading to different conclusions. The future is also mutable, such that the actions of today may bypass the future of the timeline that is viewed in this manner. If a character with Precognition (also called a precog) sees a Quinjet crash in the near future, and no one takes the Quinjets, thereby avoiding the crashes, that future is not totally negated; it occurs in another divergent future. In game terms, Precognition allows the character to scan these alternative futures up to a week in advance and choose from them an image that may or not come true, and use that information to form his own decisions. No farther than a week in the future may be scanned in this fashion. Precognition may not be used more than once a day. In addition, the character with Precognition must choose a limitation to that Power. ",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 19, name: "Postcognition", powerCount: 1,
        description: "The reverse of Precognition, but easier to handle, in that the past is fairly immutable. Postcognition only works on items the character handles. The Postcog makes a Power rank FEAT, the color required determined by the length of time scanned.",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 20, name: "Plant Control", powerCount: 1,
        description: "The hero with this Power can command the actions of plants, granting them temporary Powers of their own, including movement, growth, and a rudimentary intelligence. These abilities only exist as long as the hero concentrates.     The hero cannot control plants with a higher material strength than his Power rank. Plant-like creatures with intelligence receive a Reason FEAT against the hero's Power rank as Intensity to avoid being controlled. By mere control, the hero cannot have the plants perform any actions that would not be normally possible by the plants (this severely limits their usefulness). ",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 21, name: "Ultimate Skill", powerCount: 1,
        description: "Ultimate Skill is a special Power possessed by the hero, making him literally 'the best at what he does.' The hero picks any one Talent on the following list. His ability in that Talent is considered Unearthly, as opposed to modifying the existing ability by a + 1 or + 2CS. ",
        bonusPowerCount: 0
    },

    {
        category: "Body Alterations/Offensive", maxRoll: 30, name: "Extra Body Parts", powerCount: 1,
        description: "The hero who gains this Power when the character is generated may choose the type and number of body parts. Some of these parts may provide Bonus Powers.",
        bonusPowerCount: 0
    },
    {
        category: "Body Alterations/Offensive", maxRoll: 40, name: "Extra Attacks", powerCount: 1,
        description: "This Power is always + 1CS better than the starting Fighting ability. Use this Power instead of Fighting to make multiple attacks. There is no penalty for failing with this roll, but the individual may make only one effective attack in that round.",
        bonusPowerCount: 0
    },
    {
        category: "Body Alterations/Offensive", maxRoll: 50, name: "Energy Touch", powerCount: 1,
        description: "The hero with this Power may inflict damage and effects from the Energy column of the Battle Effects table, with a Bullseye regarded as a possible Stun. The hero may always choose to inflict less damage than is rolled, or to reduce the effects of the damage. The touch can be carried through conductive material, and may affect multiple targets in this fashion. If the hero is standing on a steel girder facing off three goons from HYDRA, and uses the Energy Touch on the girder (a conductive material), all three get shocked. The hero with this Power gains Resistance to Electricity as a Bonus Power. ",
        bonusPowerCount: 1,
        bonusPower: "Resistances\\Resistance to Electricity(100)"
    },
    {
        category: "Body Alterations/Offensive", maxRoll: 60, name: "Paralyzing Touch", powerCount: 1,
        description: "Those touched by an individual with this Power must make an Endurance FEAT against this Power rank, or be knocked out for 1-10 rounds. This Power is always in operation, and the user may be knocked out himself by such a touch.",
        bonusPowerCount: 0
    },
    {
        category: "Body Alterations/Offensive", maxRoll: 80, name: "Claws", powerCount: 1,
        description: "Claws are…. well, claws. Sharp pointy items that inflict damage on the Edged Attack column of the battle effects table. As with most sharp things, they inflict the listed amount and effect, and cannot be reduced in damage or effect. The Power rank lists both the damage inflicted by the claws and the material strength. The damage cannot be increased from its initial roll except by raising the experience, but the initial material strength can be increased by accepting limitations. Grant a + 2CS to the material strength of the claws when the hero accepts any limitations, including limitations required by other Powers. The effects of claws depend on whether they are being wielded against living creatures (people) or non-living materials (things). Against living creatures, claw attacks are resolved on the Edged Attack column for Power rank damage. Against non-living materials, compare the material strength of the claws against the material strength of the object. Make a Strength FEAT roll to determine if the object holds up to the attack. This applies to Body Armor that is not natural (inborn) as well as doors, walls, computer terminals, freelancers, and other inanimate objects. This does not apply to Body Armor that is a natural part of the character, or to energy constructs such as force fields. ",
        bonusPowerCount: 0
    },
    {
        category: "Body Alterations/Offensive", maxRoll: 90, name: "Rotting Touch", powerCount: 1,
        description: "This touch causes organic material to decay. The character inflicts Power rank damage on those he touches. In addition, this touch acts on organic material (wood, rope, cloth) as if an attempt to break the item with Power rank Strength. Resistance to Corrosives will offset the effects. This Power can be directed against organic (natural) Body Armor in order to weaken it, similar to the effect claws have on inorganic Body Armor. ",
        bonusPowerCount: 0
    },
    {
        category: "Body Alterations/Offensive", maxRoll: 100, name: "Corrosive Touch", powerCount: 1,
        description: "Similar to Rotting Touch, but affects inorganic materials instead. The character inflicts Power rank - 3CS damage to living targets, affects organic materials with greatly reduced damage (as for living targets), and acts on inorganic material as if breaking it with Power rank Strength. Resistance to Corrosives will offset these effects. Similar to Claws, this may chew through inorganic Body Armor to affect the individual beneath. ",
        bonusPowerCount: 0
    },
    {
        category: "Body Alterations/Offensive", maxRoll: 11, name: "Health-Drain Touch", powerCount: 2,
        description: "The touch of a character with this Power transfers a Power rank amount of Health from the target to the hero. Previous damage is healed in an equal amount, up to the maximum Health of the character. Drained Health above that point is lost. Characters drained to 0 Health must make an Endurance FEAT to avoid dying. If they do so, the attack has no further effect. Reversing this process, directing one's own Health into others, is a Power Stunt. ",
        bonusPowerCount: 0
    },
    {
        category: "Body Alterations/Offensive", maxRoll: 12, name: "Blinding Touch", powerCount: 1,
        description: "The touch of this character can blind the unprotected target for 1-10 rounds. The hero with this Power must make a Stun or Slam result to blind. The target receives no attempt to avoid this touch, unless the target possesses Protected Senses or something similar to     prevent the touch (such as a helmet with covered eyeslits). ",
        bonusPowerCount: 0
    },

    {
        category: "Body Alterations/Defensive", maxRoll: 30, name: "Body Armor", powerCount: 1,
        description: "A hero with Body Armor has a natural resistance to physical damage and, to a lesser extent, energy attacks. Body Armor does not affect attacks which have an intensity that must be checked against a FEAT roll, unless to require that FEAT the attack passes through the Body Armor. Example: A Sonic attack ignores Body Armor, as it does not need to pass through the Body Armor. A poison-tipped dagger must get through the Body Armor in order to affect the hero with the poison. Body Armor absorbs an amount of damage from any physical attack equal to the Power rank number of the Body Armor. Body Armor of Amazing (49) protects the hero from 49 points of each physical attack. If an attack does not equal or better the amount of Body Armor, then none of the effects of the attack take place. (A dagger hurled at the Thing will not hurt him, even if a Kill result is called for, if the damage from the dagger does not get through his hide.) Body Armor is proof against physical attacks, including Blunt and Edged attacks, Shooting, Throwing attacks, Force, Grappling, and Charging attacks. It is less effective against Energy attacks, and its Power rank number is 20 points less than listed for any Energy attack. The Amazing(49) Body Armor would provide 29 points damage (in the Remarkable range) protection from Energy attacks. Body Armor may be natural (also referred to organic or inborn in this text) or artificial material. Natural Body Armor is protection that is part of the creature itself, such as the thick hides of the Thing, Hercules, or the Hulk, the elastic body of Mr. Fantastic, or the soft form of the Man-Thing. Artificial Body Armor is made of other materials, which may be bolstered by force fields, and is reflected in the body suits of such heroes a s Iron Man, and foes like the Sentinels and Crimson Dynamo. Certain types of attack are more effective against one type of Body Armor than the other (examples: Claws, Rotting Touch). Artifical Body Armor has the advantage that it can be removed, allowing the hero to have a relatively normal life. Body Armor may be increased by one rank by accepting a - 1CS to Agility. Agility may never be dropped below Feeble. High technology heroes who choose Body Armor may choose to have a battle-suit. All of the hero's other Powers are included in the suit, and the suit is considered artificial Body Armor. In addition, the high technology hero receives potential bonuses to his physical abilities (Fighting, Agility, Strength, and Endurance) when wearing the suit. The nature of these modifications is explained under the character generation for high technology heroes. When a high tech character advances in abilities, he may choose whether his natural abilities or those of his suit are advanced. ",
        bonusPowerCount: 0
    },
    {
        category: "Body Alterations/Defensive", maxRoll: 40, name: "Water Breathing", powerCount: 1,
        description: "This is a wimp Power. Face it. When the great hero parties take place, and Ulterior-Motive Man asks you what you do, if you say, you end up wearing a full fishbowl. This Power allows you to breathe water (fresh or salt) as if air. No Power rank is needed for this Power. In addition, this Power allows the hero to see underwater as if on land (vision is reduced in the underwater realm), and survive at great depths. The hero's next Power may be either Swimming or Animal Communication and Control (Sea life). The hero may choose both, but then only breathes water, and will drown on dry land (reverse of characters drowning in water).",
        bonusPowerCount: 1,
        bonusPower: "Movement\\Swimming(50)|Mental Powers\\Animal Communication and Control(100)"
    },
    {
        category: "Body Alterations/Defensive", maxRoll: 50, name: "Absorption", powerCount: 1,
        description: "The hero with this Power may absorb a certain specific type of damage (for example, fire-based damage, energy damage, or kinetic (physical) damage). Any attacks made in the specified mode inflict no damage; rather the damage is absorbed, healing existing damage and even temporarily raising the individual's Health by the Power rank involved. A hero with Health of 100 and Amazing (48) Electrical Absorption may be hit with a lightning bolt and have his Health raised to Damage above the rank number of the Power does inflict damage, but the points of such damage may be redirected towards opponents in the next round. Any such absorbed energy dissipates 10 rounds after it has been absorbed, and must be discharged before then or it is lost. Health loss is taken from the absorbed Power first, then from the actual Health of the hero. For example, the character with the Health of 100 raised to 148 takes 30 points of damage. These points are removed from the 48 extra points initially. If the effects of the energy wear off, the character still has 100 points of Health. ",
        bonusPowerCount: 0
    },
    {
        category: "Body Alterations/Defensive", maxRoll: 60, name: "Regeneration", powerCount: 1,
        description: "The hero with this Power heals faster than the normal rate of Endurance Rank per day. A hero with Regeneration recovers the Endurance Rank every 10 turns (one minute), providing the hero does not take additional damage in that time and is able to rest. A hero resting cannot engage in any other actions while healing himself. If that rest is interrupted (14 ninja of the Hand rush in on turn 9 of his rest), the hero must start again to recover. ",
        bonusPowerCount: 0
    },
    {
        category: "Body Alterations/Defensive", maxRoll: 70, name: "Solar Regeneration", powerCount: 1,
        description: "The hero with this Power heals as per Regeneration, but only heals the Power rank in Health every ten minutes he is in the sunshine. In darkness, inside buildings, and in other similar situations, the character heals normally. This Power has a minimum Power rank of the Endurance of the character +1CS. ",
        bonusPowerCount: 0
    },
    {
        category: "Body Alterations/Defensive", maxRoll: 90, name: "Recovery", powerCount: 1,
        description: "The hero with this Power recovers from losses of Endurance ranks at a rate of 1 rank per day, and makes a Power rank FEAT to regain the lost rank. The hero with this Power may choose any Resistance as a Bonus Power. ",
        bonusPowerCount: 1,
        bonusPower: "Resistances\\Resistance to Fire and Heat(10)|Resistances\\Resistance to Cold(20)|Resistances\\Resistance to Electricity(30)|Resistances\\Resistance to Radiation(40)|Resistances\\Resistance to Toxins(50)|Resistances\\Resistance to Corrosives(60)|Resistances\\Resistance to Emotion Attacks(70)|Resistances\\Resistance to Mental Attacks(80)|Resistances\\Resistance to Magic Attacks(90)|Resistances\\Resistance to Disease(100)"
    },
    {
        category: "Body Alterations/Defensive", maxRoll: 100, name: "Life Support", powerCount: 1,
        description: "The hero with this Power has the potential to survive under hostile conditions for longer than normal amounts of time. The Power rank number is the amount of time in turns the hero may survive in a hostile environment (deep Endurance FEATS must be made. At Shift Z or higher, the individual may survive in hostile environments indefinitely without requiring food, water, or air. ",
        bonusPowerCount: 0
    },
    {
        category: "Body Alterations/Defensive", maxRoll: 11, name: "Pheromones", powerCount: 1,
        description: "Pheromones are a specialized form of Emotion Control that affect the pleasure centers of the...ah...opposite sex. When this Power is in operation, female individuals (if the hero s male) or male individuals (if the hero is female) must make a Psyche FEAT against the Power rank number of this Power as Intensity or be considered Friendly to the character. Robots, aliens, and those unable to smell or be affected by the pheromones (behind a force field, for example) are not affected. Characters that are Hostile will still be attracted to the character, but that attraction will not stop them from putting the hero in a deathtrap, from which the only release is for the hero to profess his love for the Hostile character and join her in crime. ",
        bonusPowerCount: 0
    },
    {
        category: "Body Alterations/Defensive", maxRoll: 12, name: "Damage Transfer", powerCount: 1,
        description: "This Power is a relative of the Health-Drain Touch, except Health      may be transferred between two separate targets on touch, in effect healing one while reducing the Health of the other. The hero may not regain any Health in this Damage Transfer. ",
        bonusPowerCount: 0
    },
    {
        category: "Body Alterations/Defensive", maxRoll: 13, name: "Healing", powerCount: 1,
        description: "This Power allows the hero to restore lost Health and Endurance ranks to others (but not the hero himself). The Power rank indicates the maximum amount of Health that may be restored to one hero maximum, on any one day. For each attempt at healing, the hero must make an Endurance FEAT - failure indicates the loss of Karma equal to the amount of Health being healed. A character without Karma may not Heal. Endurance ranks may be similarly restored at a rate of one rank per day per hero. An Endurance FEAT is required for the healing hero, with the result of a failure being the loss of one Endurance Rank for the hero (the Endurance for the other is healed). This Endurance may only be healed naturally. If the Endurance drops below Feeble, the healer will perish. ",
        bonusPowerCount: 0
    },
    {
        category: "Body Alterations/Defensive", maxRoll: 14, name: "Immortality", powerCount: 2,
        description: "The character with this Power does not age or die in a normal fashion. Now, before you all run out and grab this Power for your young hero, note the fine print. The hero can still suffer loss of Endurance ranks as the result of wounds, poisons, and damages, but if the results call for perishing, then the character is left at Shift 0 Endurance but does not die. The character cannot move or act until Endurance reaches Feeble, however, so throwing an Immortal character into an active volcano will keep him out of the way for a while. (He cannot heal while taking damage.) If Endurance reaches Shift 0, or the character otherwise dies, the Immortal character loses all Karma, incuding that set aside for advancement. The character may be out of luck, but at least he has his Health. If an immortal character is part of a Karma pool, then an amount of Karma is subtracted as if the character had left the group. This is done each time the immortal character becomes dead.' This Power does not have a Power rank. It counts as two Powers for any hero who takes it, unless the character is alien in origin, in which case the cost is normal (this reflects that a large number of extra-dimensional aliens are effectively immortal). An immortal character's body will slowly regenerate lost parts and heal, so that short of atomizing the remains and spreading that collection of atoms through a large portion of space, the immortal character will return at some point in the future. Immortality is applicable to the Earth Dimension only (including all planets of this dimension). An immortal character in another dimension - such as Asgard or Olympus, but excluding variant or divergent earths —does not age, but may be killed normally while in that dimension.",
        bonusPowerCount: 0
    },
];

const TALENT_CATEGORIES_ADVANCED_TABLE = [
    { maxRoll: 20, name: "Weapon Skills" },
    { maxRoll: 45, name: "Fighting Skills" },
    { maxRoll: 65, name: "Professional Skills" },
    { maxRoll: 85, name: "Scientific Skills" },
    { maxRoll: 90, name: "Mystic and Mental Skills" },
    { maxRoll: 100, name: "Other Skills" }
];

const TALENT_LIST_ADVANCED_TABLE = [
    {
        category: "Weapon Skills", maxRoll: 20, name: "Guns", talentCount: 1,
        description: "Individuals without this Talent fire guns (all handguns, rifles, and submachine guns, including laser, stun, and concussion varieties) at their Agility rank. Those with this Talent fire such weapons at + 1CS."
    },
    {
        category: "Weapon Skills", maxRoll: 50, name: "Thrown Weapons", talentCount: 1,
        description: "Characters with this Talent toss weapons designed to be thrown (including spears, daggers, shuriken, disks, and snowballs)"
    },
    {
        category: "Weapon Skills", maxRoll: 60, name: "Bows", talentCount: 1,
        description: "Bows are tricky items to operate.  Those with this Talent gain a + 1CS to hit with all bows, including crossbows, and may fire and reload in a single round. They may fire multiple arrows on a successful Agility FEAT."
    },
    {
        category: "Weapon Skills", maxRoll: 80, name: "Blunt Weapons", talentCount: 1,
        description: "Characters with this Talent gain a + 1CS to hit when attacking with a blunt weapon."
    },
    {
        category: "Weapon Skills", maxRoll: 90, name: "Sharp Weapons", talentCount: 1,
        description: "Characters with this Talent gain a + 1CS to hit when attacking with a sharp weapons.  This includes swords, daggers (unless thrown), and spears, but excludes claws and other natural extensions that inflict this type of damage."
    },
    {
        category: "Weapon Skills", maxRoll: 100, name: "Oriental Weapons", talentCount: 1,
        description: "This a special category that grants the character a + 1CS to Fighting or Agility when using the following weapons: shuriken, crossbows, sais (treat as swords), and oriental swords and daggers (including the katana and the kris)."
    },
    {
        category: "Weapon Skills", maxRoll: 110, name: "Marksman", talentCount: 2,
        description: "The character with this Talent gains a + 1CS to hit with any distance weapon that requires line of sight to hit (the character could benefit when firing heavy artillery, but not when controlling a tele-guided missile). Such a weapon in the hands of a.marksman does not suffer penalties to hit from range."
    },
    {
        category: "Weapon Skills", maxRoll: 120, name: "Weapons Master", talentCount: 2,
        description: "The character with this Talent gains a + 1CS to hit with any weapon that requires a Fighting FEAT to hit."
    },
    {
        category: "Weapon Skills", maxRoll: 130, name: "Weapons Specialist", talentCount: 2,
        description: "The character with this Talent gains a + 2CS with a single weapon of choice. This may be any type of weapon, missile or melee. The character who is a weapon specialist will also increase his initiative when using this weapon by 1."
    },

    {
        category: "Fighting Skills", maxRoll: 10, name: "Martial Arts A", talentCount: 1,
        description: "This form of martial arts concentrates on using an opponent's strength against him, and is typical of oriental- American forms such as judo and karate. The practioner of this type of martial arts can Stun or Slam an opponent regardless of their comparative Strengths and Endurances."
    },
    {
        category: "Fighting Skills", maxRoll: 20, name: "Martial Arts B", talentCount: 1,
        description: "This form of martial arts is keyed on offense and inflicting damage in short, quick bursts, and includes such disciplines as boxing. The practioner of this form of martial arts gains a + 1CS to Fighting ability when engaged in unarmed combat."
    },
    {
        category: "Fighting Skills", maxRoll: 30, name: "Martial Arts C", talentCount: 1,
        description: "This form of martial arts concentrates on holds and escapes. The practitioner of this form gains a + 1CS to his Strength for Grappling attacks (including damage), a + 1CS to Strength for Escaping and a + 1CS to Agility for purposes of Dodging. "
    },
    {
        category: "Fighting Skills", maxRoll: 40, name: "Martial Arts D", talentCount: 1,
        description: "This meditative form of martial arts searches out the weak spots of the opponent's defenses and strikes against them. The practioner of this form of attack may ignore the effects of Body Armor (though not force fields) for determining Stun and Slam results. The attack by the character with this Talent does not have to inflict damage to force a check for possible  Stun and Slam. The disadvantage is that the target of this attack must be studied for two rounds before the effects may be brought into play. The character with this Talent does not have to attack the character, only watch him in battle for two rounds previous to attacking. "
    },
    {
        category: "Fighting Skills", maxRoll: 50, name: "Martial Arts E", talentCount: 1,
        description: "This form of martial arts encourages quick striking to catch the opponent off-guard. Heroes with this form of Martial Arts are at a + 1 to initiative rolls in unarmed combat. "
    },
    {
        category: "Fighting Skills", maxRoll: 60, name: "Wrestling", talentCount: 1,
        description: "The hero with this Talent is proficient in applying holds . It includes familiar types of wrestling a s well as the sumo forms of the art. The hero with this Talent gains a +2CS when making Grappling attacks, but gains no benefit in damage. (A hero with Martial Arts B and this Talent gains a +3CS to hit in a Grappling attack, and a + 1CS for damage.) "
    },
    {
        category: "Fighting Skills", maxRoll: 70, name: "Thrown Objects", talentCount: 1,
        description: "The hero with this Talent gains a + 1CS with all Throwing attacks (both Edged and Blunt), and + 1CS on Catching. This applies to both thrown weapons and normal items. If the hero has the Thrown Weapons Talent as well, the modification is + 2CS when using thrown weapons. "
    },
    {
        category: "Fighting Skills", maxRoll: 80, name: "Tumbling", talentCount: 1,
        description: "The hero with this Talent knows how to fall and land without undue injury. Individuals with this Talent may make an Agility FEAT to land feet-first after any fall that does not inflict damage. "
    },
    {
        category: "Fighting Skills", maxRoll: 90, name: "Unknown", talentCount: 1,
        description: ""
    },
    {
        category: "Fighting Skills", maxRoll: 100, name: "Acrobatics", talentCount: 1,
        description: "The hero with this Talent is very limber and as such gains advantages when under attack. The hero has a + 1CS when dodging, evading, and escaping. "
    },

    {
        category: "Professional Skills", maxRoll: 10, name: "Law", talentCount: 1,
        description: "The character with this Talent has an extensive background in law (the assumption being US Law, but this may vary according to the Judge's campaign). The hero may be a lawyer or capable of applying to pass the bar (Reason FEAT of Good Intensity). A character with Law as a Talent gains a + 1CS to all FEAT rolls involving the law, including correct legal procedure. A character without Law gains no benefit to Reason FEATs, and in addition, will have to make Reason FEATS more often than a character with Law Talent. "
    },
    {
        category: "Professional Skills", maxRoll: 20, name: "Pilot", talentCount: 1,
        description: "The character with this Talent has a working knowledge of most aircraft, and receives a + 1CS for all FEAT rolls involving an aircraft that character is controlling (including Control FEATs, Agility FEATS, and Reason FEAT's involving aircraft handling and design). A character with a background that would permit it (a hero who is an alien may extend this Talent to spacecraft as well. "
    },
    {
        category: "Professional Skills", maxRoll: 30, name: "Military", talentCount: 1,
        description: "The hero has had some dealings with one of the armed services. In military matters, the hero gets a + 1CS to all FEAT rolls, and in addition may take a member of the armed services as a Contact. "
    },
    {
        category: "Professional Skills", maxRoll: 40, name: "Business/Finance", talentCount: 1,
        description: "The hero is familiar with the world of business, corporate finance, and how money works. Initial resources are a minimum of Good, and the hero gains a + 1CS for FEAT rolls dealing with money. The hero gains a Contact in the Professional category. "
    },
    {
        category: "Professional Skills", maxRoll: 50, name: "Journalism", talentCount: 1,
        description: "The hero with this Talent gains an additional 2 Contacts to those already generated. The Contacts should be connected with the media in some fashion, such as at local newspapers, radio or TV stations, or as sources in law enforcement, political circles, or snitches of the criminal underworld. "
    },
    {
        category: "Professional Skills", maxRoll: 60, name: "Engineering", talentCount: 1,
        description: "Engineering includes all the varied types of that profession dedicated to the design of functional items: civil, chemical, mechanical, etc. A character with Engineering Talent gains a + 1CS to all FEATs involving building things, including the Resource FEAT to determine if an object can be built. "
    },
    {
        category: "Professional Skills", maxRoll: 70, name: "Crime", talentCount: 1,
        description: "The hero with this Talent has an understanding of the criminal mind and behavior, either from studies or first-hand observation. The character with this Talent gains a + 1CS on all Reason and Intuition FEATs involving criminal practices (If I were a crook, where would I hide?). The hero also gains a Contact in either the police or crime areas. The hero with this Talent has a background in studies of the mind, and as such gains a + 1CS on all FEATs involving the mind."
    },
    {
        category: "Professional Skills", maxRoll: 80, name: "Psychiatry", talentCount: 1,
        description: ""
    },
    {
        category: "Professional Skills", maxRoll: 90, name: "Unknown", talentCount: 1,
        description: ""
    },
    {
        category: "Professional Skills", maxRoll: 100, name: "Detective/Espionage", talentCount: 1,
        description: "The hero with this Talent has been trained to notice small clues in solving crimes. The character with this Talent gains a + 1CS to discover clues to a crime, and in addition gains a Contact in either crime, law enforcement, law, or espionage."
    },
    {
        category: "Professional Skills", maxRoll: 110, name: "Medicine", talentCount: 2,
        description: "The hero with this Talent has extensive knowledge of medicine, and as such limited Talents in healing. In general, a character losing Endurance Ranks as the result of a lethal situation can have those losses stopped by any character checking on him. The individual with Medicine Talent may bring back characters that have reached the Shift 0 level up to 20 turns after they have reached that level. A character with this Talent may restore one rank of Endurance to a wounded character per week, in addition to natural healing. Finally, the character with Medicine as a Talent is + 1CS on Reason FEATs that involve medical problems, medications, poisons, and surgery."
    },
    {
        category: "Professional Skills", maxRoll: 120, name: "Law-Enforcemeent", talentCount: 1,
        description: "The character with this Talent has a background with law-enforcement authorities. This Talent includes both Gun and Law Talents, and the character, if still a member of a law-enforcement agency, may legally carry a gun and make arrests. "
    },

    {
        category: "Scientific Skills", maxRoll: 20, name: "Chemistry", talentCount: 1,
        description: "A +1CS on matters of chemistry, including developing new formulas, finding cures for inorganic poisons, and identifying chemicals by smell, touch, or taste. "
    },
    {
        category: "Scientific Skills", maxRoll: 40, name: "Biology", talentCount: 1,
        description: "A + 1CS on matters of biology, including animal and plant identification, finding cures for organic poisons, and researching diseases and their cures. "
    },
    {
        category: "Scientific Skills", maxRoll: 60, name: "Geology", talentCount: 1,
        description: "A + 1CS on matters involving the Earth, including volcanic activity, the geology of the surrounding land, types of rocks and their powers, and mineral identification. "
    },
    {
        category: "Scientific Skills", maxRoll: 70, name: "Genetics", talentCount: 1,
        description: "A + 1CS on matters involving the genes, including creating new life forms, understanding mutants, and researching diseases. "
    },
    {
        category: "Scientific Skills", maxRoll: 80, name: "Archeology", talentCount: 1,
        description: "A + 1CS on matters involving the past, including paeleontology, historical records, and ancient myths and legends. "
    },
    {
        category: "Scientific Skills", maxRoll: 90, name: "Physics", talentCount: 1,
        description: "A + 1CS on matters involving physics and astrophysics, including motion, flight, and the planets and stars. "
    },
    {
        category: "Scientific Skills", maxRoll: 100, name: "Electronics", talentCount: 1,
        description: "A + 1CS on matters involving electronic devices, including their creation and repair. "
    },
    {
        category: "Scientific Skills", maxRoll: 110, name: "Computers", talentCount: 1,
        description: "A + 1CS on matters involving computers, computer-controled equipment, and artificial intelligences. "
    },

    {
        category: "Mystic and Mental Skills", maxRoll: 20, name: "Trance", talentCount: 1,
        description: "The character may place himself into a trance. While in a trance the character slows his body functions to such a level that he may be assumed to be deceased (Intuition FEAT for the character checking). A character in a trance reduces needs for food and water to a minimal level, and may regain Endurance ranks at one rank per day. "
    },
    {
        category: "Mystic and Mental Skills", maxRoll: 50, name: "Mesmerism and Hypnosis", talentCount: 1,
        description: "This Talent is a primitive form of Mind Control at the Power rank number equal to the Reason of the character with this Talent. Information can be gained as per a Mental Probe, and post-hypnotic suggestions may be implanted within the victim's mind. Any attempt to force an individual to do something that he would not normally do, or divulge information that he would not normally reveal, will cause the hypnotism to break. A hypnotic command fades in 1-10 hours after it is given. "
    },
    {
        category: "Mystic and Mental Skills", maxRoll: 70, name: "Sleight of Hand", talentCount: 1,
        description: "This is a Talent developed by stage magicians which causes items to appear and disappear by a combination of misdirection and swift, fluid gestures. The character with this Talent may palm small items, making them appear or disappear with Agility + 1CS ability. "
    },
    {
        category: "Mystic and Mental Skills", maxRoll: 90, name: "Resist Domination", talentCount: 1,
        description: "This is a Psi-Screen that may be developed by the individuals without that Power. This permits the character to resist mental attacks as if the character had a mental power of Psyche + 1CS. The Talent is passive in nature, and does not grant any other particular benefit. A character with Mental Probe may be able to discern where the character gained this Talent, but nothing else. "
    },
    {
        category: "Mystic and Mental Skills", maxRoll: 100, name: "Occult Lore", talentCount: 1,
        description: "The character with this Talent has a knowledge of magical societies, antiquities, runes, and a general understanding of forgotten lore. The character gains a + 1CS to Reason FEATS involving items of a magical nature. "
    },
    {
        category: "Mystic and Mental Skills", maxRoll: 110, name: "Mystic Origin", talentCount: 2,
        description: "In the Marvel Universe, all humankind has the potential for developing magical Powers. This Talent shows that the character has some background with magical forces. Heroes may have derived their powers from these forces if they choose this Talent. A character with this Talent may have Magical Powers, with the approval of the Judge."
    },

    {
        category: "Other Skills", maxRoll: 20, name: "Artist", talentCount: 1,
        description: "The character with an artist background creates works of art, either for himself or for sale to others. This includes painting, sculpting, and writing. A single work takes 1-10 weeks, and upon completion grants the artist Karma points equal to 10 times the number of weeks. The character must allocate some time daily at his work. "
    },
    {
        category: "Other Skills", maxRoll: 40, name: "Languages", talentCount: 1,
        description: "The character with this Talent has a natural understanding of languages. The character gains 1 additional language at start, and made add other languages at half the cost of a Talent (500 points regardless of who teaches it). Characters without languages Talent must gain this Talent first to learn other languages. The gaining of additional languages assumes someone is available to teach these languages. A Player character with this Talent does not have to assign a language at start, but may fill one in later as need be. "
    },
    {
        category: "Other Skills", maxRoll: 60, name: "First Aid", talentCount: 1,
        description: "The medicine Talent notes that the loss of Endurance ranks may be halted by someone checking on the dying character and administering some form of aid. The First Aid Talent grants the character this immediate halt to Endurance rank loss, the recovery of one rank immediately (one use only per situation), and in addition, the hero with this Talent can stabilize a dying character at Shift 0 Health up to 5 rounds after that character reaches that level. "
    },
    {
        category: "Other Skills", maxRoll: 80, name: "Repair/Tinkering", talentCount: 1,
        description: "The character with this Talent gains a + 1CS to any Reason FEATs involving the repair and modfication of existing items, but not the building of new items. This + 1CS may be added to any other bonuses gained from other Talents, so that an Engineer with Tinkering Talent would gain a + 2CS on repair. This is a general category that covers any one subject desired by the character. On that subject, the character gains + 1CS to all Reason FEATS. (Say, the character is into collecting Spores and Fungus. A Trivia Talent would be: Trivia/ Spores and Fungus). Trivia categories should be specific (old movies, military history, sports, rock music, comic books) a s opposed to general (all knowledge) or covered by other Talents. "
    },
    {
        category: "Other Skills", maxRoll: 100, name: "Trivia", talentCount: 1,
        description: ""
    },
    {
        category: "Other Skills", maxRoll: 110, name: "Performer", talentCount: 1,
        description: "The character is someone who acts, sings, dances, mimes, or otherwise uses his Talents to entertain (this is related to the Artist, the key difference being that the Artist may leave the scene of creation; the Performer is identified with that creation directly). A Performer receives 10 karma points for a week's worth of performance, whether in a play, doing a nightclub routine, or working for a movie. "
    },
    {
        category: "Other Skills", maxRoll: 120, name: "Animal Training", talentCount: 2,
        description: "The character with this Talent has the ability to train animals to perform certain stunts. The individual does not have Animal Empathy or Communications and Control, but may teach an animal a trick based on the Reason FEAT roll. If the hero with this Talent does have Animal Empathy or Animal Communications and Control as Powers, these Powers are raised by + 1CS. "
    },
    {
        category: "Other Skills", maxRoll: 130, name: "Heir to Fortune", talentCount: 2,
        description: "This is not a Talent, but a situation which brings the character into a lot of money. The minimum Resources of a character with this Talent is Remarkable (if your character is making Excellent Resources or less, do not take this Talent)."
    },
    {
        category: "Other Skills", maxRoll: 140, name: "Student", talentCount: 2,
        description: "The Student character has no other initial Talents, but may gain other Talents at a discounted price. New Talents cost 1000 Karma points if learned from another player character, if learned from outside. Students may maintain Advancement Totals for a Talent along with other forms of Advancement funds. "
    },
    {
        category: "Other Skills", maxRoll: 150, name: "Leadership", talentCount: 2,
        description: "The hero with this Talent has the brains and understanding of a cohesive group, such that he is a benefit to the team. Any Karma Pool to which the character belongs receives a 50-point bonus, provided the character with this Talent is recognized as the team leader. A Karma Pool may only have one recognized leader, though more than one character with Leadership may belong to one group. When the Leader of a group leaves, the 50 points are deducted from the Karma Pool, but the leader does not receive them for personal use the bonus points only exist as a part of the pool). "
    },

];

const CONTACT_CATEGORIES_ADVANCED_TABLE = [
    { maxRoll: 30, name: "Professional" },
    { maxRoll: 60, name: "Scientific" },
    { maxRoll: 90, name: "Political" },
    { maxRoll: 100, name: "Mystic Arts" },
];

const CONTACT_TYPE_LIST_ADVANCED_TABLE = [
    {
        category: "Professional", maxRoll: 12, name: "Medicine",
        description: "The hero with this Contact has a friend, ally or acquaintance with Medicine Talent, who will provide medical advice and services either for free or charge an affordable fee. The Contact may be a doctor at a local hospital or clinic, or a researcher familiar with the character's background. "
    },
    {
        category: "Professional", maxRoll: 24, name: "Law",
        description: "The hero with this Contact has a friend, ally, or acquaintance with Law Talent, who will provide legal assistance for a reduced fee and legal advice to the hero for free. The Contact may be a lawyer whose firm has been on retainer with the family for years, is a personal friend, or who owes the hero for providing his big break into the profession. "
    },
    {
        category: "Professional", maxRoll: 36, name: "Law Enforcement",
        description: "The hero with this Contact has a friend, ally, or acquaintance with Law-enforcement Talent, who is in addition a member of the law-enforcement profession. This may include forces of local and state police and the national guard, and may vary in rank from knowing a patrolman (Excellent rank knowledge of the world at large, Remarkable of his beat), being on good terms with a Detective (Remarkable knowledge of criminal investigation, plus detective skills), or being well-known to a station captain or commissioner (Remarkable Resources, limited to that material which police forces normally have). Note that the higher the Contact, the more likely the Contact will get in touch with the hero when he needs help. The character has a Contact in the armed forces, either of the United States or another nation. This may range from a low-level sergeant to the Joint Chiefs of Staff. Military Contacts may provide Amazing Resources, maximum. "
    },
    {
        category: "Professional", maxRoll: 50, name: "Business World",
        description: "The character has a Contact in the world of business or finance. This may rank from the accountant for their hero's group to a captain of industry who is trying to build fusion plants across the country. Resources available are at the Incredible level. Journalist Contacts are Poor in Resources but have Remarkable knowledge about their field of expertise. The character with this Contact has some connection with the criminal underworld. This ranges from having a snitch that pass on information about street action up to a Contact high in the hierarchy of the Maggia or independent gangs. "
    },
    {
        category: "Professional", maxRoll: 62, name: "Engineering",
        description: "The character with this Contact has some connection with someone who builds, either independently or for a larger corporation. The character may aid in the construction of devices. "
    },
    {
        category: "Professional", maxRoll: 80, name: "Psychiatry",
        description: "The character with this Contact has some connection with a character in the fields of psychiatry or psycho-analysis, including doctors devoted to the curing of the criminal mind. "
    },
    {
        category: "Professional", maxRoll: 95, name: "Espionage",
        description: "The character with this Contact has connections with the world of espionage. This includes agencies such as the FBI, CIA, NSA, KGB, Interpol, MI5, S.H.I.E.L.D., and the criminal organization H.Y.D.R.A. Such Contacts provide 92 infomation up to Remarkable level, though top-secret information will be harder to obtain. Equipment may be provided for up to Incredible rank, Amazing for S.H.I.E.L.D. and H.Y.D.R.A. All these agencies have no concern about using Contact heroes as agents to their own ends, and any hero that uses a Contact in this area will be guaranteed to receive a request for a return favor some time in the near future."
    },
    {
        category: "Professional", maxRoll: 100, name: "Hero Group",
        description: "The character has some connection with, or was or is a member of or an ally of some existing group of super-powered heroes, and a s such may enjoy the privileges thereof. This includes using their equipment, calling them in on an emergency, using their HQ, and benefitting from their training. The other disadvantage (in addition to being at the group's beck and call) is that enemies of the hero group are considered enemies of this hero as well. A hero who belongs to a group is always considered to have that group as a Contact."
    },
    {
        category: "Scientific", maxRoll: 12, name: "Chemistry",
        description: "The character with this Contact has some connection with a character in the fields of chemistry."
    },
    {
        category: "Scientific", maxRoll: 25, name: "Biology",
        description: "The character with this Contact has some connection with a character in the fields of biology."
    },
    {
        category: "Scientific", maxRoll: 37, name: "Geology",
        description: "The character with this Contact has some connection with a character in the fields of geology."
    },
    {
        category: "Scientific", maxRoll: 49, name: "Genetics",
        description: "The character with this Contact has some connection with a character in the fields of genetics."
    },
    {
        category: "Scientific", maxRoll: 62, name: "Archeology",
        description: "The character with this Contact has some connection with a character in the fields of archeology."
    },
    {
        category: "Scientific", maxRoll: 75, name: "Physics",
        description: "The character with this Contact has some connection with a character in the fields of physics."
    },
    {
        category: "Scientific", maxRoll: 87, name: "Computers",
        description: "The character with this Contact has some connection with a character in the fields of computers."
    },
    {
        category: "Scientific", maxRoll: 100, name: "Electronics",
        description: "The character with this Contact has some connection with a character in the fields of electronics."
    },
    {
        category: "Political", maxRoll: 50, name: "Local",
        description: "The hero has an ally in the local political scene: alderman, mayor, or councilman. The Contact may provide information on what is going on in the neighborhood. "
    },
    {
        category: "Political", maxRoll: 75, name: "State",
        description: "The hero has an ally in state government — connected with the office of governor, a state representative, or someone in one of the state agencies. The Contact may provide Good services and information, as well as equipment of up to Remarkable Resource cost. "
    },
    {
        category: "Political", maxRoll: 85, name: "National",
        description: "The hero has a Contact in national government — a congressional aide, a congressman, representative, member of the Executive Branch or one of the myriad number of agencies that infest the capital. Resources of up to Monstrous in their field may be gained, but the more powerful the Contact, the more likely the favor will be called in. "
    },
    {
        category: "Political", maxRoll: 95, name: "Other National",
        description: "The hero has a Contact in national government — someone else's. The hero may be friendly with the leadership or government apparatus of any other nation, friend or foe. This Contact, if known to others, may create difficulties in dealing with other political Contacts. Resources available are as for National government, but the character must be able to communicate with the Contact to gain any materials. "
    },
    {
        category: "Political", maxRoll: 99, name: "International",
        description: "The hero has Contacts in the UN or in a similar multi-national organization, such as the Common Market of Europe. This type of Contact can provide equipment of up to Monstrous Resource rank. "
    },
    {
        category: "Political", maxRoll: 100, name: "Planetary",
        description: "This Contact is available to Alien characters only. The hero is well-known to the inhabitants and/or rulers of another planet, and may call on those Resources (up to Unearthly or higher) provided they can get in contact with those sources. "
    },
    {
        category: "Mystic Arts", maxRoll: 50, name: "Occult Lore",
        description: "The hero knows someone who dabbles in the darker arts, and as such has at least a Remarkable Reason involving these matters. The Contact may provide advice on mystic writings, spells and their castings, and curses. The Contact is not necessarily someone of Doctor Strange's category (a true magic-wielder), but most likely a college professor who has done copious reading on the subject. "
    },
    {
        category: "Mystic Arts", maxRoll: 100, name: "Mythology",
        description: "Similar to Occult Lore, with the direction towards recognized mythology: actions of the extra-dimensional beings known as gods (Olympians, Asgardians, etc.). The Contact will specialize in one pantheon of deities."
    },
];

