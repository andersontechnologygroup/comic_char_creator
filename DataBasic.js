const RANDOM_RANKS_TABLE = [
    { rank: 'Feeble', rankNumber: 2, maxRolls: [5, 5, 5, 5, 10] },
    { rank: 'Poor', rankNumber: 4, maxRolls: [10, 25, 10, 10, 20] },
    { rank: 'Typical', rankNumber: 6, maxRolls: [20, 75, 40, 15, 30] },
    { rank: 'Good', rankNumber: 10, maxRolls: [40, 95, 80, 40, 40] },
    { rank: 'Excellent', rankNumber: 20, maxRolls: [60, 100, 95, 50, 60] },
    { rank: 'Remarkable', rankNumber: 30, maxRolls: [80, -1, 100, 70, 70] },
    { rank: 'Incredible', rankNumber: 40, maxRolls: [96, -1, -1, 90, 80] },
    { rank: 'Amazing', rankNumber: 50, maxRolls: [100, -1, -1, 100, 100] },
];

const PHYSICAL_FORM_TABLE = [
    {
        maxRoll: 30, name: "Mutant", column: 1,
        description: "Mutants derive their powers from changes in their genetic structure. These changes become evident during adolescence.",
        enduranceAdjustment: 1,
        popularityAdjustment: -40,
    },
    {
        maxRoll: 60, name: "Altered Human", column: 1,
        description: "Altered humans were once normal humans. Exposure to powerful chemicals, radiation, magic, cosmic, or unknown forces changed them and gave them their powers.",
        powersCountAdjustment: 1,
    },
    {
        maxRoll: 90, name: "Hi-Tech", column: 3,
        description: "Hi-tech wonders are normal humans whose powers come from advanced technology. Their powers are built into their suits and devices, so the heroes may be very weak without their equipment.",
        isHiTech: true,
        reasonAdjustment: 1,
        bonusPowerCount: 1,
        bonusPower: "Weapons, Vehicles, Sidekicks, and Alter Egos\\Alter Ego(100)",
    },
    {
        maxRoll: 95, name: "Robot", column: 4,
        description: "Robots are machines, computers, cyborgs, androids, or golems. All robots must be created by someone or something, either intentionally or by accident.",
        popularityAdjustment: -20,
        minimumReason: "Good",
    },
    {
        maxRoll: 100, name: "Alien", column: 5,
        description: "Aliens are creatures from other planets or times, or even isolated places on Earth.",
        popularityAdjustment: -20,
    },
];

const ORIGIN_TABLE = [
    {
        maxRoll: 30, name: "Mutant"
    },
    {
        maxRoll: 60, name: "Altered Human"
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

const QUANTITY_TABLE = [
    { maxRoll: 20, powers: { initial: 2, maximum: 2 }, talents: { initial: 1, maximum: 1 }, contacts: { initial: 0, maximum: 0 } },
    { maxRoll: 60, powers: { initial: 3, maximum: 3 }, talents: { initial: 2, maximum: 2 }, contacts: { initial: 1, maximum: 1 } },
    { maxRoll: 90, powers: { initial: 4, maximum: 4 }, talents: { initial: 3, maximum: 3 }, contacts: { initial: 2, maximum: 2 } },
    { maxRoll: 100, powers: { initial: 5, maximum: 5 }, talents: { initial: 4, maximum: 4 }, contacts: { initial: 3, maximum: 3 } }
];

const POWER_CATEGORIES_TABLE = [
    { maxRoll: 5, name: "Resistances and Senses" },
    { maxRoll: 10, name: "Movement" },
    { maxRoll: 20, name: "Nature Control" },
    { maxRoll: 35, name: "Energy Control" },
    { maxRoll: 45, name: "Body Control" },
    { maxRoll: 60, name: "Distance Attacks" },
    { maxRoll: 65, name: "Mental Powers" },
    { maxRoll: 80, name: "Body Alterations, Offensive" },
    { maxRoll: 95, name: "Body Alterations, Defensive" },
    { maxRoll: 100, name: "Weapons, Vehicles, Sidekicks, and Alter Egos" }
];

const POWER_LIST_TABLE = [
    // === Resistances and Senses (Category 01-05) ===
    { category: "Resistances and Senses", maxRoll: 11, name: "Resistance to Fire", 
      description: "Resistance is the ability to withstand an attack, suffering less damage than the attack normally would cause. Each resistance is effective against only one type of attack. Heroes may, at the option of the Judge, devise a new resistance of their own, rather than choosing one of those listed." },
    { category: "Resistances and Senses", maxRoll: 22, name: "Resistance to Cold", 
      description: "Resistance is the ability to withstand an attack, suffering less damage than the attack normally would cause. Each resistance is effective against only one type of attack. Heroes may, at the option of the Judge, devise a new resistance of their own, rather than choosing one of those listed." },
    { category: "Resistances and Senses", maxRoll: 33, name: "Resistance to Electricity", 
      description: "Resistance is the ability to withstand an attack, suffering less damage than the attack normally would cause. Each resistance is effective against only one type of attack. Heroes may, at the option of the Judge, devise a new resistance of their own, rather than choosing one of those listed." },
    { category: "Resistances and Senses", maxRoll: 44, name: "Resistance to Radiation", 
      description: "Resistance is the ability to withstand an attack, suffering less damage than the attack normally would cause. Each resistance is effective against only one type of attack. Heroes may, at the option of the Judge, devise a new resistance of their own, rather than choosing one of those listed." },
    { category: "Resistances and Senses", maxRoll: 55, name: "Resistance to Poison", 
      description: "If this power's rank is greater than the hero's Endurance rank, compare the strength of the poison to the resistance power rank instead of the hero's Endurance. If the hero's Endurance rank is higher than the resistance power rank, the hero can add one level to his Endurance rank when comparing it to a poison's potency." },
    { category: "Resistances and Senses", maxRoll: 66, name: "Resistance to Corrosives", 
      description: "Resistance is the ability to withstand an attack, suffering less damage than the attack normally would cause. Each resistance is effective against only one type of attack. Heroes may, at the option of the Judge, devise a new resistance of their own, rather than choosing one of those listed." },
    { category: "Resistances and Senses", maxRoll: 77, name: "Protected Senses", 
      description: "The hero's five senses (sight, hearing, smell, taste, and touch) are protected against damage from attacks based on sensory overload (such as loud noise, blinding light, or nauseating smells.) If the defender must normally make a FEAT roll to resist the attack, use the power's rank if it is higher than the appropriate ability rank. If the ability rank is higher, shift the ability rank one column to the right for the resistance FEAT roll. If the attack normally succeeds automatically, the power's rank acts like body armor that protects the senses." },
    { category: "Resistances and Senses", maxRoll: 88, name: "Extraordinary Sense", 
      description: "One or more of the hero's senses is heightened above normal human level. If this power rank is higher than the hero's Intuition rank, use this power rank when the hero makes Intuition FEAT rolls. If the power rank is lower than the hero's Intuition, increase his Intuition by one level when making Intuition FEAT checks. Players may devise an entirely new sense, like Daredevil's radar sense, subject to the Judge's approval." },
    { category: "Resistances and Senses", maxRoll: 100, name: "Infravision", 
      description: "Infravision is the ability to see in complete darkness. A hero with infravision adds 1 to his initiative die rolls in the dark, and operates in the dark with no handicaps of any kind." },

    // === Movement (Category 06-10) ===
    { category: "Movement", maxRoll: 17, name: "Flight", 
      description: "The hero can fly, through some natural power, technological device, or magic. The flight power rank determines how fast the hero can fly; consult Table 10: Speed, in the Vehicles section. The hero must make a flight FEAT roll to perform intricate maneuvers or fight while aloft." },
    { category: "Movement", maxRoll: 33, name: "Gliding", 
      description: "The hero can glide by catching updrafts or launching himself from a height. This is not self-propelled flight. The hero can travel up to four areas per round, but must come to a rest at the end of the round; he cannot remain aloft. Like flight, a gliding FEAT roll is required for quick or delicate maneuvering." },
    { category: "Movement", maxRoll: 50, name: "Leaping", 
      description: "The hero can leap great distances, either vertically or horizontally. The power rank determines how far: Feeble to Typical 2 areas, Good to Incredible 3 areas, Amazing or Monstrous 4 areas, Unearthly 5 areas. After his initial leap, the hero may try to leap again in the same round, this time up to twice as far as the first time. He simply must make a successful Endurance FEAT roll." },
    { category: "Movement", maxRoll: 67, name: "Wall-Crawling", 
      description: "The hero can use suction cups, magnetics, adhesion, or some other power to cling to and move along surfaces from which normal people would fall. A wall-crawling FEAT roll is needed only if the hero is on a slippery or wet surface, or performing acrobatics." },
    { category: "Movement", maxRoll: 83, name: "Lightning Speed", 
      description: "This is the power to run faster than a normal human. The power rank determines how fast the hero can run: see Table 10: Speed, in the Vehicles section. Intricate maneuvers require an Agility FEAT roll, but actions that depend on speed alone, such as running across water, require FEAT rolls against this power rank." },
    { category: "Movement", maxRoll: 100, name: "Teleportation", 
      description: "Teleportation is a special type of movement that allows a hero to travel instantaneously from one spot to another without physically crossing any of the space between. The hero can teleport across a number of areas equal to his teleportation power rank number. The hero must be familiar with the area he is teleporting to, or be able to see it. He must make a teleportation FEAT roll every time he teleports; failure means the hero arrives dazed and unable to take any further action until the end of the next round. If a hero teleports into a solid object (because he was unaware of its presence), he must make an Endurance FEAT roll; if this roll fails, he dies immediately. If it succeeds, he instinctively teleports himself back to his starting location, and is dazed for the next 1 to 10 rounds." 
    },

    // === Nature Control (Category 11-20) ===
    { category: "Nature Control", maxRoll: 20, name: "Earth Control", 
      description: "This power enables the hero to manipulate naturally occurring minerals or items consisting mostly of minerals, such as concrete, pavement, iron, and glass. It does not include artificially manufactured devices, such as guns or plastic items. In all cases, the power rank functions as Strength. A hero with Incredible Strength can lift 10 tons; a hero with Incredible earth control can use his power to manipulate up to 10 tons of mineral matter. If this power is used to attack, the damage caused equals the power rank number. If the material is used as a shield, its armor rank equals the power rank. Offensive or defensive manipulations require a power FEAT roll to succeed. A hero can manipulate the appropriate elements up to two areas away and within sight. Affecting anything further away than two areas requires a more difficult (yellow or red) FEAT roll. Only non-living, inanimate material can be manipulated." },
    { category: "Nature Control", maxRoll: 40, name: "Air Control", 
      description: "By using this power, the hero may create winds or partial vacuums. Defensively, air shields can deflect weapons and attacks as if the hero was dodging, and can protect more than one person. Whirlwinds can push small objects or, if strong enough, injure, slam, or stun an opponent. In all cases, the power rank functions as Strength. Offensive or defensive manipulations require a power FEAT roll to succeed. A hero can manipulate the appropriate elements up to two areas away and within sight." },
    { category: "Nature Control", maxRoll: 60, name: "Fire Control", 
      description: "The hero has the power to increase or decrease the intensity of an existing fire, or the temperature of an object, causing damage up to his power rank number. The hero cannot, however, generate fire from his body. In all cases, the power rank functions as Strength. If this power is used to attack, the damage caused equals the power rank number. Offensive or defensive manipulations require a power FEAT roll to succeed. A hero can manipulate the appropriate elements up to two areas away and within sight." },
    { category: "Nature Control", maxRoll: 80, name: "Water Control", 
      description: "The hero can control the movement of water, creating choppy seas, tidal waves, water spouts, or whirlpools. Any sea-going vessel with a Speed rank below the hero's power rank can be stopped in the water. In all cases, the power rank functions as Strength. If this power is used to attack, the damage caused equals the power rank number. If the material is used as a shield, its armor rank equals the power rank. Offensive or defensive manipulations require a power FEAT roll to succeed. A hero can manipulate the appropriate elements up to two areas away and within sight." },
    { category: "Nature Control", maxRoll: 100, name: "Weather Control", 
      description: "This power is a unique combination of all four elemental control powers. It allows the hero to manipulate the local weather. Storms, rain, wind, and snow can be summoned. The temperature can be raised or lowered. Lightning bolts can be called down. All weather effects require a FEAT roll to succeed, and cause damage equal to the power rank if used to attack someone." },

    // === Energy Control (Category 21-35) ===
    { category: "Energy Control", maxRoll: 17, name: "Magnetic Control", 
      description: "A hero with magnetic control can control any items that contain iron or steel. The hero also can manipulate Earth's magnetic field and use it to control iron or steel-bearing items, or create a magnetic force shield with an armor rank equal to the magnetic control power rank. In all cases, the power rank determines how well the hero can manipulate energy, and how much damage an energy attack can inflict. A hero can affect his area and adjacent areas with ease. Affecting anything two or more areas away requires an Endurance FEAT roll." },
    { category: "Energy Control", maxRoll: 33, name: "Electrical Control", 
      description: "This is the power to absorb and redirect electrical energy. This power does not allow the hero to throw lightning bolts, but if the hero has an available power source he can deliver a shock through his touch, causing damage equal to the power rank number. An electrical force field will not stop attacks from outside, but it will inflict damage on anyone who tries to reach or move through it. In all cases, the power rank determines how well the hero can manipulate energy, and how much damage an energy attack can inflict." },
    { category: "Energy Control", maxRoll: 50, name: "Light Control", 
      description: "A hero with this power can redirect, magnify, or diminish the light in an area. A blinding flash can cause damage equal to the power rank number and blind a victim temporarily. A light barrier causes no damage, but no one can see through it. In all cases, the power rank determines how well the hero can manipulate energy, and how much damage an energy attack can inflict." },
    { category: "Energy Control", maxRoll: 67, name: "Sound Control", 
      description: "This is the power to manipulate, redirect, amplify, and deaden sound waves, changing their pitch and intensity. A sound wall acts as a physical barrier, but can be demolished by an attack of greater rank. If the hero is cut off from a sound source, this power becomes temporarily useless. In all cases, the power rank determines how well the hero can manipulate energy, and how much damage an energy attack can inflict." },
    { category: "Energy Control", maxRoll: 83, name: "Darkforce Generation and Control", 
      description: "The Darkforce is a semi-sentient force from another dimension. It can be used to generate a force field, or black out an area so completely that even infravision does not work. It cannot be used as a distance weapon, but anyone enveloped by the Darkforce loses Health points equal to the controller's power rank number each round." },
    { category: "Energy Control", maxRoll: 100, name: "Gravity Control", 
      description: "A hero with the power to control gravity can make any item heavier, if he makes a successful power FEAT roll. Living things with an Endurance rank equal to or greater than the hero's power rank cannot be affected. Other living things can be affected and must make an Endurance FEAT roll to avoid being immobilized by their own weight. A weapon which is made heavier causes damage as if its rank was two levels higher. A gravity force field acts as armor against all attacks that pass through it." },

    // === Body Control (Category 36-45) ===
    { category: "Body Control", maxRoll: 13, name: "Growth", 
      description: "The hero can grow taller at will. The limit on his size is listed on Table 31: Size Changes, and depends on the power rank. If the hero's Strength rank is less than this power rank, he uses the power rank as his Strength when in giant form. If the power rank is less than the hero's Strength, the hero's Strength is increased one rank when in giant form. Enemies who attack him also get a one-column shift to the right, because the hero's great size makes him easier to attack." },
    { category: "Body Control", maxRoll: 25, name: "Shrinking", 
      description: "The hero can make himself smaller. The limit depends on his shrinking power rank, and is listed on Table 31: Size Changes. The hero's Strength rank is unaffected by size reduction, but he gets a one-column shift to the right when attacking, and opponents have a two-column shift to the left when they attack him." },
    { category: "Body Control", maxRoll: 38, name: "Density Control", 
      description: "A hero with Density Control can alter his mass, thereby changing his resistance to attacks. He can increase his density up to the power rank, and decrease it to Feeble. As the hero raises his Density rank, he gains body armor equal to his current density rank. He can also inflict damage equal to the power rank number when charging, if the power rank is higher than his Strength. If his Strength is higher, he gets an additional one-column shift to the right for damage when charging. At any specific rank, the hero weighs as much as a person with that Strength rank could lift. If the hero's density rank exceeds his Endurance, his Fighting and Agility ranks shift one column to the left for each rank by which his density exceeds his Endurance." },
    { category: "Body Control", maxRoll: 50, name: "Phasing", 
      description: "Phasing power enables the hero to make his body less dense, allowing him to pass through solid objects and letting solid objects pass through him. The hero has body armor equal to his phasing rank when using this power, but anyone he attacks physically is treated as if they also had a body armor rank equal to the attacker's power rank. To phase through a solid object, the hero's phasing rank must be at least as high as the material rank of the object. The hero can lower the density of an object he touches by making a phasing FEAT roll." },
    { category: "Body Control", maxRoll: 63, name: "Invisibility", 
      description: "A hero with this power can make himself invisible to normal sight. While invisible he can be found by heat radiation or smell, and will show up in fog or rain. The hero remains invisible as long as he wants. He can make other people or objects invisible by touching them and making an invisibility FEAT roll. The hero must touch the object to make it visible again." },
    { category: "Body Control", maxRoll: 75, name: "Plasticity", 
      description: "A hero with this power can stretch sections of his body, like Mr. Fantastic of the Fantastic Four. This power allows the hero to punch or grab someone in another area. The stretching limit is determined by the power rank: Feeble 1 area, Poor to Excellent 2 areas, Remarkable or better 3 areas." 
    },
    { category: "Body Control", maxRoll: 88, name: "Shape-Shifting", 
      description: "The hero can change to the shape of any animal, plant, or object he wishes. He retains his normal size and mass, unless he also has growth or shrinking power. Changes to a generic shape are automatic, but to become a perfect duplicate of a specific object requires a shape-shifting FEAT roll." 
    },
    { category: "Body Control", maxRoll: 100, name: "Body Transformation", 
      description: "The hero can turn his body into another substance, retaining his own shape. In his altered form, the hero may assume the properties of that material: water flows, energy travels at the speed of light, fire ignites flammable materials. If the material is solid, the hero can use its material rank as his body armor rank, but such body armor cannot be of higher rank than the hero's transformation power rank. The hero must choose the type of transformation he can make when he rolls this power: Mineral or metal, Ice, Water, Gas, Energy, Darkforce, or Fire." 
    },

    // === Distance Attacks (Category 46-60) ===
    { category: "Distance Attacks", maxRoll: 13, name: "Hi-Tech Missile Weapon", 
      description: "Hi-tech missile weapons can be hand-held or implanted in the hands. The Judge and the player can agree to give such weapons specialized effects, similar to Hawkeye's stun arrows. A new hero should not have more than three specialized hi-tech items, and none of them can exceed the power rank of this power. Any attack with these powers is an Agility FEAT, but damage caused equals the power rank number." },
    { category: "Distance Attacks", maxRoll: 25, name: "Ensnaring Missile Weapon", 
      description: "An ensnaring attack causes no damage, but immobilizes the target by tangling. The material that entangles the target has a material rank equal to this power rank. The ensnared character can try to break free only if his Strength rank equals or exceeds the material rank. Any attack with these powers is an Agility FEAT, but damage caused equals the power rank number." },
    { category: "Distance Attacks", maxRoll: 38, name: "Mental Force", 
      description: "The hero has the power to launch a psionic blast, directly attacking his opponent's mind. The blast causes damage equal to the power rank. A mental attack is a Psyche FEAT, not an Agility FEAT." },
    { category: "Distance Attacks", maxRoll: 50, name: "Cold Missile Weapon", 
      description: "Cold, Energy, Fire, Sound, and Darkforce energies can be directed against a specific target, causing damage equal to the power rank. If the hero also has the power to control this energy, it can be modified for different effects. Any attack with these powers is an Agility FEAT, but damage caused equals the power rank number." },
    { category: "Distance Attacks", maxRoll: 63, name: "Energy Missile Weapon", 
      description: "Cold, Energy, Fire, Sound, and Darkforce energies can be directed against a specific target, causing damage equal to the power rank. If the hero also has the power to control this energy, it can be modified for different effects. Any attack with these powers is an Agility FEAT, but damage caused equals the power rank number." },
    { category: "Distance Attacks", maxRoll: 75, name: "Fire Missile Weapon", 
      description: "Cold, Energy, Fire, Sound, and Darkforce energies can be directed against a specific target, causing damage equal to the power rank. If the hero also has the power to control this energy, it can be modified for different effects. Any attack with these powers is an Agility FEAT, but damage caused equals the power rank number." },
    { category: "Distance Attacks", maxRoll: 88, name: "Sound Missile Weapon", 
      description: "Cold, Energy, Fire, Sound, and Darkforce energies can be directed against a specific target, causing damage equal to the power rank. If the hero also has the power to control this energy, it can be modified for different effects. Any attack with these powers is an Agility FEAT, but damage caused equals the power rank number." },
    { category: "Distance Attacks", maxRoll: 100, name: "Darkforce Missile Weapon", 
      description: "Cold, Energy, Fire, Sound, and Darkforce energies can be directed against a specific target, causing damage equal to the power rank. If the hero also has the power to control this energy, it can be modified for different effects. Any attack with these powers is an Agility FEAT, but damage caused equals the power rank number." },

    // === Mental Powers (Category 61-65) ===
    { category: "Mental Powers", maxRoll: 17, name: "Telepathy", 
      description: "Telepathy is the power to send thoughts and read minds. A hero with this power can send thoughts to anyone, but can only read the mind of someone with a lower Psyche than his own. A person with mental power is aware when someone tries to read his mind, and can block the attempt with a Psyche FEAT roll. Any mental FEAT roll can be made using either the Psyche rank or the rank of that mental power, whichever is preferred." },
    { category: "Mental Powers", maxRoll: 33, name: "Image Generation", 
      powerCount: 2, 
      description: "Heroes with this power can create images of anything imaginable by making a power FEAT roll. These images look, sound, and smell entirely real. When a defender first encounters such an image, the Judge makes a secret Psyche FEAT roll for him. If the FEAT succeeds, the defender cannot be affected by the image because it has no substance. If the FEAT failed, the defender believes the image can harm him. Attacks are treated as if the image were real, but the image cannot kill anyone. A person with this power can control only one image at a time, and must concentrate on that image to maintain it. A person cannot defend himself and control the image during the same round. If attacked, he must make a Psyche FEAT roll to maintain the image." },
    { category: "Mental Powers", maxRoll: 50, name: "Telekinesis", 
      description: "A hero with telekinetic power can move objects with his mind. The telekinetic power rank determines how much weight can be moved, as if it were Strength. The hero can also ensnare someone telekinetically; the victim is considered trapped by a material with a rank equal to the attacker's telekinetic power rank or Psyche rank. The hero can form a telekinetic fist and attack from a distance, making a Psyche FEAT roll to hit his target. This will cause damage equal to the attacker's power rank." },
    { category: "Mental Powers", maxRoll: 67, name: "Mind Control", 
      powerCount: 2, 
      description: "This is the power to take over another person's mind. The target must be visible and the attacker's power or Psyche rank must be higher than the victim's Psyche rank. A Psyche or power rank FEAT roll must be made to succeed. The victim is controlled until the attacker releases him. If the victim is ordered to do something he would not normally do, such as hurting himself, his teammates, or friends, the victim makes a Psyche FEAT roll and, if successful, breaks the mental hold." },
    { category: "Mental Powers", maxRoll: 83, name: "Force Field Generation", 
      description: "A hero with this power can create a force field with an armor rank equal to the creator's Psyche or power rank, whichever is higher. Like all force fields, this field prevents attacks from entering or leaving the protected area. The hero must concentrate on the barrier to maintain it. If an attack causes more damage than the field can absorb, the field absorbs its maximum and then collapses. When this happens, the field's creator must make a successful Endurance FEAT roll or pass out for 1 to 10 rounds. A force field can enclose one area without straining its caster, but extending its size requires a Psyche FEAT roll. The caster may extend the field one area with a green result, two areas with a yellow result, and three areas with a red result." },
    { category: "Mental Powers", maxRoll: 100, name: "Animal Communication/Control", 
      description: "This is a primitive form of mental control that permits the hero to communicate with and command specific animals. Communication is a Psyche FEAT. Command is possible only if the hero's power rank number is greater than the animal's full Health, and also requires a Psyche FEAT roll. The hero must choose one of the following types of animals to which his power applies: insects (and arachnids), sea creatures, reptiles, birds, mammals, or any other family the Judge desires." },

    // === Body Alterations, Offensive (Category 66-80) ===
    { category: "Body Alterations, Offensive", maxRoll: 20, name: "Extra Body Parts", 
      description: "This is either duplication of a normal body component (a second set of arms, for example) or addition of a new component (perhaps a prehensile tail). These additional parts do not allow the hero to attack more often unless he also has the Extra Attacks power." },
    { category: "Body Alterations, Offensive", maxRoll: 40, name: "Extra Attacks", 
      description: "The hero can attack twice in one round. The attacks can be against the same or different opponents. The hero must have some explanation for his extra attack: extra body parts, fantastic speed, or a hi-tech item that can be used more than once per round." },
    { category: "Body Alterations, Offensive", maxRoll: 60, name: "Energy Touch", 
      description: "The hero can cause damage equal to this power rank number by touching his opponent (in combat, this is an Agility FEAT). This is not in addition to normal damage; the hero must use either his energy touch or some regular means to cause damage. Note, however, that normal body armor is less effective against this type of damage." },
    { category: "Body Alterations, Offensive", maxRoll: 80, name: "Poisonous/Paralyzing Touch", 
      description: "This character's touch is toxic. When he chooses the power, the hero must decide whether the touch kills or knocks its victim out. In either case, the potency of the poison equals its power rank. This is not in addition to normal damage; the hero must choose whether he will do normal damage or poison/paralyzing damage." },
    { category: "Body Alterations, Offensive", maxRoll: 100, name: "Claws", 
      description: "The hero has claws. When attacking, the hero can use his Fighting rank or this power rank, whichever he prefers. Damage equals the hero's Strength rank plus one column, and attacks are resolved on the Hack & Slash column." },

    // === Body Alterations, Defensive (Category 81-95) ===
    { category: "Body Alterations, Defensive", maxRoll: 50, name: "Body Armor", 
      description: "The hero has body armor equal to this power rank. The player must decide how this armor works, and how it affects the hero's appearance. This power reduces the hero's Agility by one rank." },
    { category: "Body Alterations, Defensive", maxRoll: 100, name: "Regeneration", 
      description: "Heroes with this power regain lost Health points faster than normal. The hero recovers as if his Endurance equalled this power rank, or his Endurance plus one rank, whichever is higher." },

    // === Weapons, Vehicles, Sidekicks, and Alter Egos (Category 96-00) ===
    { category: "Weapons, Vehicles, Sidekicks, and Alter Egos", maxRoll: 20, name: "Unique Weapon", 
      description: "The hero has a unique weapon, similar to Captain America's shield or Thor's hammer. The hero gets two column shifts to the right when using this weapon in combat. The weapon also has one super power, chosen by the player. Its power rank is determined randomly, but if the result is Good or less, increase it to Excellent." },
    { category: "Weapons, Vehicles, Sidekicks, and Alter Egos", maxRoll: 40, name: "Intelligent Weapon", 
      description: "The hero has a unique weapon that is intelligent. It may be a living thing, or an electronic intellect. Determine the weapon's Reason, Intuition, and Psyche randomly, and choose its super power. This weapon is an NPC whose personality is determined and controlled by the Judge. The weapon places the same Karma demands on the hero as a sidekick." },
    { category: "Weapons, Vehicles, Sidekicks, and Alter Egos", maxRoll: 60, name: "Unique Vehicle", 
      description: "The hero possesses a special vehicle with exceptional powers. Choose one vehicle from the vehicle lists. Use Table 29: Talents Available to determine how many modifications the hero can make. A modification can be used to change the vehicle's Body, Speed, or Control rank, or give the vehicle a super power. To modify the vehicle's Body, Speed, or Control rank, determine the new rank randomly using Table 25: Random Ranks once for each change. The ability must go up at least one rank, but a good dice roll may raise it even more. If the vehicle has super powers, each must have a randomly determined power rank. This vehicle is free at the beginning of the game, but the hero must pay for repairs and replacement parts during the game." },
    { category: "Weapons, Vehicles, Sidekicks, and Alter Egos", maxRoll: 80, name: "Sidekick", 
      description: "A sidekick is an NPC companion controlled by the Judge. Bucky Barnes and Rick Jones, both of whom worked with Captain America, are the best examples. A sidekick is created the same way as any other character, but his Ability ranks cannot equal those of the hero he works with. If the sidekick has any power that duplicates one of his partner's, the sidekick's power rank must be at least two ranks lower than the hero's. The sidekick does not earn Karma. His starting Karma is added to his partner's Karma score, but from then on the hero is responsible for covering his sidekick's Karma needs. If a sidekick dies, the hero loses Karma equal to the sidekick's starting Karma plus his full Health." },
    { category: "Weapons, Vehicles, Sidekicks, and Alter Egos", maxRoll: 100, name: "Alter Ego", 
      description: "A hero with an alter ego can change from his super-powered self to a different physical form with different abilities and talents. Bruce Banner is the Hulk's alter ego; Peter Parker is not an alter ego of Spider-Man because he does not change physical form. There must be a physical difference between the hero and his alter ego. Determine the alter ego's abilities randomly as if the alter ego was a normal NPC with no super powers. The only ability that must be shared by a hero and his alter ego is Karma. Hi-tech wonders may also share Reason, Intuition, and Psyche. An alter ego allows the hero to travel without being recognized." },
];

const TALENT_CATEGORIES_TABLE = [
    { maxRoll: 100, name: "Talents" }
];

const TALENT_LIST_TABLE = [
    // Basic Rules Table 30: Talents (25 talents, 4% each)
    {
        category: "Talents", maxRoll: 4, name: "Guns", 
        description: "Each of these separate talents gives the attacker one column shift to the right when using the named weapon type in combat.",
    },
    {
        category: "Talents", maxRoll: 8, name: "Thrown Weapons",
        description: "Each of these separate talents gives the attacker one column shift to the right when using the named weapon type in combat.",
    },
    {
        category: "Talents", maxRoll: 12, name: "Bows", 
        description: "Each of these separate talents gives the attacker one column shift to the right when using the named weapon type in combat.",
    },
    {
        category: "Talents", maxRoll: 16, name: "Blunt and Sharp Weapons", 
        description: "Each of these separate talents gives the attacker one column shift to the right when using the named weapon type in combat.",
    },
    {
        category: "Talents", maxRoll: 20, name: "Marksman",
        description: "The user gets one column shift to the right when using any weapon that requires an Agility FEAT.",
    },
    {
        category: "Talents", maxRoll: 24, name: "Weapons Master", 
        talentCount: 2,
        description: "The user gets one column shift to the right when using any weapon that requires a Fighting FEAT.",
    },
    {
        category: "Talents", maxRoll: 28, name: "Martial Arts", 
        description: "The user can slam or stun an opponent, even if the opponent has a higher Strength rank.",
    },
    {
        category: "Talents", maxRoll: 32, name: "Wrestling", 
        description: "The hero gets two column shifts to the right when wrestling, but this does not affect damage.",
    },
    {
        category: "Talents", maxRoll: 36, name: "First Aid", 
        description: "A person who knows first aid can help a hero who is unconscious and losing Endurance ranks. If first aid is applied within 10 rounds after the hero is wounded, the loss of Endurance ranks may be halted.",
    },
    {
        category: "Talents", maxRoll: 40, name: "Medicine", talentCount: 2,
        description: "The hero with this Talent has extensive knowledge of medicine. A character losing Endurance ranks as the result of a lethal situation can have those losses stopped by any character with this Talent checking on him.",
    },
    {
        category: "Talents", maxRoll: 44, name: "Law", 
        description: "This person is a lawyer, and is familiar with all aspects of the law. The hero is shifted one column to the right when dealing with legal matters.",
    },
    {
        category: "Talents", maxRoll: 48, name: "Law-Enforcement", talentCount: 2,
        description: "This person knows the law, is licensed to carry a gun and make arrests, and has all bonuses of the Guns talent.",
    },
    {
        category: "Talents", maxRoll: 52, name: "Aeronautics", 
        description: "A person with this talent has a pilot's license, and can pilot any normal aircraft. This does not include spacecraft.",
    },
    {
        category: "Talents", maxRoll: 56, name: "Military", 
        description: "The hero is an active or retired member of the armed forces. When dealing with the military, the hero gets a one-column Reason shift to the right and a temporary 10-point bonus to his Popularity.",
    },
    {
        category: "Talents", maxRoll: 60, name: "Business/Finance", 
        description: "This hero is familiar with the world of business and corporate finance. Reason is shifted one column right when dealing with business practices and money.",
    },
    {
        category: "Talents", maxRoll: 64, name: "Scholar", 
        description: "Scholars get a one-column shift to the right when dealing with any subject they have studied. The Judge should use his knowledge of the character to decide whether a character has studied a particular subject.",
    },
    {
        category: "Talents", maxRoll: 68, name: "Journalism", 
        description: "The hero has contacts at local newspapers, radio, or television stations. He also knows people in politics, police departments, and the underworld.",
    },
    {
        category: "Talents", maxRoll: 72, name: "Engineering", 
        description: "Engineers receive one column shift to the right when inventing or building any device.",
    },
    {
        category: "Talents", maxRoll: 76, name: "Chemistry", 
        description: "These talents allow a bonus shift of one column to the right when using Reason to deal with a problem within this field, including inventing and building items.",
    },
    {
        category: "Talents", maxRoll: 80, name: "Biology", 
        description: "These talents allow a bonus shift of one column to the right when using Reason to deal with a problem within this field, including inventing and building items.",
    },
    {
        category: "Talents", maxRoll: 84, name: "Geology", 
        description: "These talents allow a bonus shift of one column to the right when using Reason to deal with a problem within this field, including inventing and building items.",
    },
    {
        category: "Talents", maxRoll: 88, name: "Genetics", 
        description: "These talents allow a bonus shift of one column to the right when using Reason to deal with a problem within this field, including inventing and building items.",
    },
    {
        category: "Talents", maxRoll: 92, name: "History", 
        description: "These talents allow a bonus shift of one column to the right when using Reason to deal with a problem within this field, including inventing and building items.",
    },
    {
        category: "Talents", maxRoll: 96, name: "Archaeology", 
        description: "These talents allow a bonus shift of one column to the right when using Reason to deal with a problem within this field, including inventing and building items.",
    },
    {
        category: "Talents", maxRoll: 100, name: "Physics", 
        description: "These talents allow a bonus shift of one column to the right when using Reason to deal with a problem within this field, including inventing and building items.",
    },
];

const CONTACT_CATEGORIES_TABLE = [
    { maxRoll: 100, name: "Contact" },
];


const CONTACT_TYPE_LIST_TABLE = [
    {
        category: "Contact", maxRoll: 100, name: "_____________",
        description: "_______________________________________________________________________________"
    },
];


