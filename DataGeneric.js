// K1 to collapse
const RANDOM_RANKS_TABLE = [
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

const PHYSICAL_FORM_TABLE = [
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

const ORIGIN_TABLE = [
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

const QUANTITY_TABLE = [
    { maxRoll: 20, powers: { initial: 2, maximum: 4 }, talents: { initial: 1, maximum: 6 }, contacts: { initial: 0, maximum: 4 } },
    { maxRoll: 60, powers: { initial: 3, maximum: 4 }, talents: { initial: 2, maximum: 5 }, contacts: { initial: 1, maximum: 4 } },
    { maxRoll: 90, powers: { initial: 4, maximum: 4 }, talents: { initial: 3, maximum: 4 }, contacts: { initial: 2, maximum: 4 } },
    { maxRoll: 100, powers: { initial: 5, maximum: 5 }, talents: { initial: 4, maximum: 4 }, contacts: { initial: 3, maximum: 4 } }
];

const POWER_CATEGORIES_TABLE = [
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

const POWER_LIST_TABLE = [
    {
        category: "Resistances", maxRoll: 10, name: "Resistance to Fire and Heat", powerCount: 1,
        description: "All damage from fire and heat-based attacks is reduced.",
        bonusPowerCount: 0
    },
    {
        category: "Resistances", maxRoll: 20, name: "Resistance to Cold", powerCount: 1,
        description: "All damage from cold-based attacks is reduced.  Physical items made of ice may still affect the hero.",
        bonusPowerCount: 0
    },
    {
        category: "Resistances", maxRoll: 30, name: "Resistance to Electricity", powerCount: 1,
        description: "All damage resulting from electrical-based attacks is reduced. The hero must decide if this Power is conductive or non-conductive in nature. Conductive resistance allows energy to pass through the hero into those the hero is touching (like a copper wire). Non-conductive resistance stops the energy at the contact point, allowing those being touched or held to be unharmed (like rubber insulation). ",
        bonusPowerCount: 0
    },
    {
        category: "Resistances", maxRoll: 40, name: "Resistance to Radiation", powerCount: 1,
        description: "All damage resulting from radiation-based attacks, including but not limited to X-rays, alpha and beta particles, and gamma rays, is reduced. Most non-concussive energy rays used by super-powered individuals may be so reduced.",
        bonusPowerCount: 0
    },
    {
        category: "Resistances", maxRoll: 50, name: "Resistance to Toxins", powerCount: 1,
        description: "All damagee resulting from toxin attacks is reduced.",
        bonusPowerCount: 0
    },
    {
        category: "Resistances", maxRoll: 60, name: "Resistance to Corrosives", powerCount: 1,
        description: "This resistance reduces the amount of damage from acids and other caustic agents, including but not limited to rust, rot, acids, salt deterioration, and destructive microbes.",
        bonusPowerCount: 0
    },
    {
        category: "Resistances", maxRoll: 70, name: "Resistance to Emotion Attacks", powerCount: 1,
        description: "This resistance reduces the effect of emotion attacks including illusions, emotion-control, and dominance. ",
        bonusPowerCount: 0
    },
    {
        category: "Resistances", maxRoll: 80, name: "Resistance to Mental Attacks", powerCount: 1,
        description: "This resistance is similar to that of resistance to emotion attacks, but is used against attacks that affect the Psyche from psionic (but not magical) sources.",
        bonusPowerCount: 0
    },
    {
        category: "Resistances", maxRoll: 90, name: "Resistance to Magic Attacks", powerCount: 1,
        description: "This resistance is similar to that of Resistance to Emotion Attacks, but is used against attacks that affect the Psyche from magical and extra-dimensional sources.",
        bonusPowerCount: 0
    },
    {
        category: "Resistances", maxRoll: 100, name: "Resistance to Disease", powerCount: 1,
        description: "The individual with this resistance is less susceptible to disease than other heroes. Included are common diseases, as well as the effects of biological warfare and vampirism.",
        bonusPowerCount: 0
    },
    {
        category: "Resistances", maxRoll: 110, name: "Invulnerability", powerCount: 2,
        description: "The hero with this Power is totally unaffected by one or more of the attack forms listed above. The initial choosing of Invulnerability counts as two choices, but every additional choice in Resistances may be changed to an Invulnerability.",
        bonusPowerCount: 0
    },

    {
        category: "Senses", maxRoll: 10, name: "Protected Senses", powerCount: 1,
        description: "One or more of the hero's basic senses are protected from attack. The hero generally ignores potentially damaging attacks.",
        bonusPowerCount: 0
    },
    {
        category: "Senses", maxRoll: 20, name: "Enhances Senses", powerCount: 1,
        description: "One or more of the hero's five normal senses (hearing, sight, smell, touch, taste) is increased.",
        bonusPowerCount: 0
    },
    {
        category: "Senses", maxRoll: 30, name: "Infravision", powerCount: 1,
        description: "The individual with this ability can see in the dark.",
        bonusPowerCount: 0
    },
    {
        category: "Senses", maxRoll: 40, name: "Computer Links", powerCount: 1,
        description: "The character with this Power may communicate with and retrieve information from computer systems. The hero must be able to access the computer in some way; usually this is by means of an implant relayed to a predetermined computer.  This Power also allows the reprogramming of simple robots. ",
        bonusPowerCount: 0
    },
    {
        category: "Senses", maxRoll: 50, name: "Emotion Detection", powerCount: 1,
        description: "The hero can detect emotion in others. This Power may be a limited form of Empathy, or merely the ability to catch the subtle physiological clues that indicate a person is under stress, lying, or worried. ",
        bonusPowerCount: 0
    },
    {
        category: "Senses", maxRoll: 60, name: "Energy Detection", powerCount: 1,
        description: "The hero with this Power is able to identify specific types of energy and track energy trails. The hero can identify the general type of energy, and can track the energy trail of that specific type.",
        bonusPowerCount: 0
    },
    {
        category: "Senses", maxRoll: 70, name: "Magnetic Detection", powerCount: 1,
        description: "The hero with this Power can detect the magnetic field of Earth (and likely other planets as well), as well as aberrations of that field. It is difficult for a hero with this Power to become lost.",
        bonusPowerCount: 0
    },
    {
        category: "Senses", maxRoll: 80, name: "Psionic Detection", powerCount: 1,
        description: "The hero with this Power is attuned to exceptional mental radiation in general, and as such can detect the use of paranormal abilities including mindreading, thought-casting, mental control and attacks, whether by technological or of mutant orgin (but not those of magical origin). The hero can detect these abilities only when they are in use.",
        bonusPowerCount: 0
    },
    {
        category: "Senses", maxRoll: 90, name: "Astral Detection", powerCount: 1,
        description: "The hero with this Power can see the forms of creatures operating in the astral plane, including ectoplasm of those adepts who can astrally project. This is an automatic ability: the individual can always recognize that an astral form is nearby.",
        bonusPowerCount: 0
    },
    {
        category: "Senses", maxRoll: 100, name: "Tracking Ability", powerCount: 1,
        description: "Through use of heightened senses, learned abilities, or mutant Powers the hero with this Power can track another individual's path.",
        bonusPowerCount: 0
    },
    {
        category: "Senses", maxRoll: 110, name: "Mutant Detection", powerCount: 1,
        description: "The hero with this Power is attuned to the specific mental radiation given out by mutants.",
        bonusPowerCount: 0
    },
    {
        category: "Senses", maxRoll: 120, name: "Magic Detection", powerCount: 1,
        description: "The hero with this Power can detect magic.",
        bonusPowerCount: 0
    },
    {
        category: "Senses", maxRoll: 130, name: "Combat Sense", powerCount: 2,
        description: "The hero with this Power can sense the moves of an opponent during physical combat, thus increasing surprise, blocking, dodging, and escaping.",
        bonusPowerCount: 0
    },
    {
        category: "Senses", maxRoll: 140, name: "Cosmic Awareness", powerCount: 2,
        description: "The hero possessing this Power is in tune with the universe to some degree, allowing him to perceive other powerful entities and to detect weaknesses in opponents.",
        bonusPowerCount: 0
    },

    {
        category: "Movement", maxRoll: 20, name: "Flight", powerCount: 1,
        description: "The hero with this Power can move through the air under his own power.",
        bonusPowerCount: 0
    },
    {
        category: "Movement", maxRoll: 30, name: "Gliding", powerCount: 1,
        description: "The hero has the ability to glide.",
        bonusPowerCount: 0
    },
    {
        category: "Movement", maxRoll: 40, name: "Leaping", powerCount: 1,
        description: "The hero with this Power can leap great distances.",
        bonusPowerCount: 0
    },
    {
        category: "Movement", maxRoll: 60, name: "Wall-Crawling", powerCount: 1,
        description: "The hero can move along vertical and upside-down surfaces as if they were normal surfaces.",
        bonusPowerCount: 0
    },
    {
        category: "Movement", maxRoll: 70, name: "Lightning Speed", powerCount: 1,
        description: "The hero with this Power can move as a vehicle with a high speed.  Lightning Speed is assumed to apply to ground movement, but may be applied to any of the following Powers, if the hero has them in his possession: Flight, Gliding, Wall-crawling, or Digging. ",
        bonusPowerCount: 0
    },
    {
        category: "Movement", maxRoll: 80, name: "Levitation", powerCount: 1,
        description: "This Power allows the hero to move vertically unaided, and usually has a magical or mental origin. It does not allow true flight, but is immune to the effects of wind or air control Powers, unless the hero with the Power so chooses.",
        bonusPowerCount: 0
    },
    {
        category: "Movement", maxRoll: 90, name: "Swimming", powerCount: 1,
        description: "All heroes are assumed to be capable of swimming if free of impediments. The Swimming Power shows that the hero can move through the water at high speeds, as in the Lightning Speed Power applied to water. This Power does not negate the need to breathe.",
        bonusPowerCount: 0
    },
    {
        category: "Movement", maxRoll: 100, name: "Climbing", powerCount: 1,
        description: "The hero with this Power can scale vertical (but not upside-down) surfaces as if possessing the Wall-Crawling Power with Lightning Speed.",
        bonusPowerCount: 0
    },
    {
        category: "Movement", maxRoll: 110, name: "Teleportation", powerCount: 2,
        description: "The hero with Teleportation Power can move instantaneously from point to point without physically crossing the distance between.  The teleporting hero may carry either all individuals in his area or someone the hero is touching.",
        bonusPowerCount: 0
    },
    {
        category: "Movement", maxRoll: 120, name: "Digging", powerCount: 1,
        description: "The hero can move below ground by digging a tunnel. The hero gains Claws as A Bonus Power if there are available power slots. Normal movement is as for normal ground vehicle speed, half if the hero is digging a tunnel well-supported enough to allow others to follow.",
        bonusPowerCount: 1,
        bonusPower: "Body Alterations/Offensive\\Claws(100)"
    },
    {
        category: "Movement", maxRoll: 130, name: "Dimensional Travel", powerCount: 2,
        description: "This Power allows the character to break through into other dimensions. The hero does this automatically.",
        bonusPowerCount: 0
    },

    {
        category: "Matter Control", maxRoll: 20, name: "Earth Control", powerCount: 1,
        description: "The hero with this Power can manipulate natural or semi-natural mineral items. This Power is limited to naturally occurring materials, or semi-natural materials that are of consistent nature. Radically altered items such as steel alloys and artifically constructed mechanisms, and living or once living things are beyond the scope of this Power.  The material may be used as a weapon, or shield.",
        bonusPowerCount: 0
    },
    {
        category: "Matter Control", maxRoll: 40, name: "Air Control", powerCount: 1,
        description: "The hero with this Power has the ability to manipulate air, winds, and (potentially) weather. The hero can create shields of wind that are effective against all physical missile attacks. The hero can also use air as a distance weapon, but repelled by any form of Force Field, including shields made of air. The hero can also generate winds.",
        bonusPowerCount: 0
    },
    {
        category: "Matter Control", maxRoll: 60, name: "Fire Control", powerCount: 1,
        description: "The hero with this Power can control existing fire sources. He can intensify the fire, or may reduce it.  The hero with this Power can manipulate flame, so as to form a fiery shield, but cannot initially use the Fire Control to affect targets at a distance.",
        bonusPowerCount: 0
    },
    {
        category: "Matter Control", maxRoll: 80, name: "Water Control", powerCount: 1,
        description: "The hero with Water Control Powers can use available liquid water for specific effects. The water can be used as a missile weapon. The water can also be used as a shield, having no effect on physical weapons, but reducing energy, force, and fire attacks.",
        bonusPowerCount: 0
    },
    {
        category: "Matter Control", maxRoll: 100, name: "Weather Control", powerCount: 1,
        description: "The hero with this Power has the ability to manipulate the forces of weather.",
        bonusPowerCount: 0
    },
    {
        category: "Matter Control", maxRoll: 110, name: "Density Mannipulation - Others", powerCount: 1,
        description: "The hero can alter the density of other individuals on touch, either increasing the density (and thereby mass) or reducing the density (take less damage, etc.). The hero must touch his target.  Effects are: Density Reduction: The target becomes vaguely transparent, and as such will become both less vulnerable to attacks and less effective in attacking.  The affected individual may not phase, but may be affected by winds.  Density Increase: The affected individual increases in density (and therefore mass) without the increased strength in the limbs and other structures required to move that mass.",
        bonusPowerCount: 0
    },
    {
        category: "Matter Control", maxRoll: 120, name: "Body Transformation - Others", powerCount: 1,
        description: "The hero with this Power can convert living tissues to other substances. The hero with this Power chooses one material and the transformation duration. A target of this Power must be touched. While in that form the target has no recollection of what has occurred, and has the material strength of that substance. Flesh-to-flesh contact must be made; a foe in a full body-suit would be immune to this Power. The target regains his normal form following the transformation, even if pieces are broken off or dispersed.",
        bonusPowerCount: 0
    },
    {
        category: "Matter Control", maxRoll: 130, name: "Animal Transformation - Others", powerCount: 1,
        description: "The hero with this Power can transform human targets into animals and reverse the process. The target must be touched. The target then has the physical attributes of the animal, but retains the mental attributes of the original form. The touch must be flesh-to-flesh. Heroes with inborn Powers retain those Powers in their new form.",
        bonusPowerCount: 0
    },

    {
        category: "Energy Control", maxRoll: 20, name: "Magneetic Manipulation", powerCount: 1,
        description: "The hero can manipulate magnetic lines of force. Initially, this gives the hero the ability to move and control metallic objects.",
        bonusPowerCount: 0
    },
    {
        category: "Energy Control", maxRoll: 40, name: "Electrical Manipulation", powerCount: 1,
        description: "The hero can manipulate and control electricity. Initially, this gives the hero a resistance to electrical attacks.",
        bonusPowerCount: 0
    },
    {
        category: "Energy Control", maxRoll: 60, name: "Light Manipulation", powerCount: 1,
        description: "The hero can generate light and manipulate existing light energy. Such light may either be cast in a burst, affecting all targets in the same area, or in a line, affecting a single target. Light used in this fashion inflicts no damage, but may blind the targets.",
        bonusPowerCount: 0
    },
    {
        category: "Energy Control", maxRoll: 90, name: "Sound Manipulation", powerCount: 1,
        description: "The hero can manipulate existing sonic energies, dampening existing noise, or increasing that noise. The individual with this Power may reduce all sonic-based attacks on his form.",
        bonusPowerCount: 0
    },
    {
        category: "Energy Control", maxRoll: 100, name: "Gravity Manipulation", powerCount: 1,
        description: "The hero with this Power can alter the attractive forces of gravity.",
        bonusPowerCount: 0
    },
    {
        category: "Energy Control", maxRoll: 110, name: "Probability Manipulation", powerCount: 2,
        description: "This is a very potent Power, and has strict limits. The hero has the ability to alter the chance element.  Good Luck may only affect the hero with the Power.  Bad Luck affects those that are attacking the hero or performing actions that would result in damage to the hero. Note that the allies, friends, and relatives of the hero with this Power do not benefit from this Power, and in fact may be damaged by its limitations.",
        bonusPowerCount: 0
    },
    {
        category: "Energy Control", maxRoll: 120, name: "Nullifying Power", powerCount: 2,
        description: "The hero with this extremely potent Power can negate the inborn super-human Powers of other individuals. Technological or Magical abilities are unaffected.  Note that this Power will affect all within the range of the Power, and the individual may use no other inborn super-human Powers while using this Power.",
        bonusPowerCount: 0
    },
    {
        category: "Energy Control", maxRoll: 130, name: "Energy Reflection", powerCount: 1,
        description: "This Power grants the hero a limited form of Invulnerability (as the Power) to a specific form of energy.",
        bonusPowerCount: 0
    },
    {
        category: "Energy Control", maxRoll: 140, name: "Time Control", powerCount: 2,
        description: "The hero with this Power can control to passage of time, slowing it, speeding it, or, with concentration reversing it.",
        bonusPowerCount: 0
    },

    {
        category: "Body Control", maxRoll: 10, name: "Growth", powerCount: 1,
        description: "The hero with this Power can grow taller at will.  Characters that experience growth usually but not always draw their additional mass from an unknown source. Characters with growth are not slowed or impaired by their added mass. Finally, the hero with this Power may choose (as a limitation) to have the Power always in effect.",
        bonusPowerCount: 0
    },
    {
        category: "Body Control", maxRoll: 20, name: "Shrinking", powerCount: 1,
        description: "The hero with this Power can make himself smaller, while retaining the original strength and abilities. The hero's Strength is unaffected by the shrinking.",
        bonusPowerCount: 0
    },
    {
        category: "Body Control", maxRoll: 30, name: "Invisibility", powerCount: 1,
        description: "The hero with this Power can make his body invisible to normal sight. This Power does not negate location by other senses, or nor does it initially negate location by heat or ultraviolet sources. The hero still has mass and substance (coating the hero with dust or paint reveals the true form). The hero may remain invisible as long as desired.",
        bonusPowerCount: 0
    },
    {
        category: "Body Control", maxRoll: 40, name: "Plasticity", powerCount: 1,
        description: "The body of the hero with this Power is slightly elastic and malleable, and the hero manipulates his body as he sees fit. The hero with this Power also gains Elongation as a bonus Power if there are available power slots.",
        bonusPowerCount: 1,
        bonusPower: "Body Control\\Elongation(100)"
    },
    {
        category: "Body Control", maxRoll: 50, name: "Shape-Shifting", powerCount: 1,
        description: "This Power allows the hero to radically modify his shape to resemble other objects or beings, to the point of being that object to all appearances (touch, taste, etc.). A character may not gain more than half his height or shrink to half his original size. Only obvious, visible physical Powers may be gained by shifting shape (claws, gliding membranes, etc.). True super powers may not be gained in this fashion. ",
        bonusPowerCount: 0
    },
    {
        category: "Body Control", maxRoll: 60, name: "Body Transformation", powerCount: 2,
        description: "Similar to Body Transformation - Others with the added advantage of normal mobility and cognizance while in the transformed state. The character gains any special functions of that material. A hero who is damaged while in transformed state takes damage as normal, but if destroyed in this form may reintegrate.  The pieces may integrate only if close by.",
        bonusPowerCount: 0
    },
    {
        category: "Body Control", maxRoll: 70, name: "Animal Transformation - Self", powerCount: 1,
        description: "This Power allows the hero to assume the form of a normal animal, with all applicable Powers of that animal. Weight and height are that of a normal version of that particular animal. Any other super-human Powers are lost while in animal form. ",
        bonusPowerCount: 0
    },
    {
        category: "Body Control", maxRoll: 80, name: "Raise Lowest Ability", powerCount: 1,
        description: "Not really a Power by any means, but a method of immediate self-improvement for a character that may be suffering from terminally low stats in a critical area. Only one of the seven abilities may be modified in this fashion, and then only the lowest one if two are lowest.",
        bonusPowerCount: 0
    },
    {
        category: "Body Control", maxRoll: 90, name: "Blending", powerCount: 1,
        description: "The hero has the ability to change his shade to blend in with his surroundings, and has in effect a specialized form of Invisibility. The hero and his uniform are hidden, and will not be detected until the character moves or acts.",
        bonusPowerCount: 0
    },
    {
        category: "Body Control", maxRoll: 100, name: "Alter Ego", powerCount: 1,
        description: "An alter ego is not the same thing as a secret ID. It is a separate persona.  An alter ego has no super Powers, and the hero who creates him must decide if the Contacts are enjoyed by the hero, the alter ego, or both. Talents remain the same for hero and alter ego. Transformation from alter ego to hero is immediate.",
        bonusPowerCount: 0
    },
    {
        category: "Body Control", maxRoll: 110, name: "Density Manipulation - Self", powerCount: 1,
        description: "The hero with this Power can alter his mass at will. The hero who has altered mass weighs as much as a character with that strength could lift. A high density may slow the character down.",
        bonusPowerCount: 0
    },
    {
        category: "Body Control", maxRoll: 120, name: "Phasing", powerCount: 1,
        description: "This is similar to Density Manipulation, save that it pulls the molecules of a body out of phase with those of the surrounding area, allowing the hero to phase through solid items. While phased, the hero is immune to physical and most energy attacks, but is still subject to the effects of mental attacks and magic. While the hero cannot be affected by physical attacks while phased, the hero may similarly not make physical attacks. Phasing has a detrimental effect on electronic devices. Phasing through such a device will cause a malfunction.",
        bonusPowerCount: 0
    },
    {
        category: "Body Control", maxRoll: 130, name: "Elongation", powerCount: 1,
        description: "Elongation is similar to the Power of Plasticity, but differs primarily in that it allows the character to extend his body and limbs over a number of areas The character with this Power may attack non-adjacent foes in close combat types of attacks (slugfest, grappling, etc.). The target of these attacks may only make close attacks against the part of the opponent that is attacking.",
        bonusPowerCount: 0
    },
    {
        category: "Body Control", maxRoll: 140, name: "Imitation", powerCount: 1,
        description: "Not the sincerest form of flattery, but a specialized form of Shape-shifting that allows the hero to duplicate the appearance of other humanoid forms, up to the limits of Shape-shifting (half-again or half of original size). The character with Imitation may duplicate the appearance, voice, and mannerisms (but not Powers, Talents, or abilities) of a specific individual. The hero must have seen the individual previously for a sufficient period to duplicate him.",
        bonusPowerCount: 0
    },
    {
        category: "Body Control", maxRoll: 150, name: "Power Absorption", powerCount: 1,
        description: "This is not the absorption of energy, but the acquiring of other individuals' super-human Powers and abilities. Only those naturally occurring powers and abilities may be absorbed. The character must touch the target in order to gain those abilities.",
        bonusPowerCount: 0
    },

    {
        category: "Distance Attacks", maxRoll: 10, name: "Projectile Missile", powerCount: 1,
        description: "A projectile missile represents a specially designed weapon. This is usually some form of technological device, but not always. This weapon is specially designed for the character, and the hero suffers no penalty for range when firing it (other individuals that may get their hands on it would suffer such a penalty).",
        bonusPowerCount: 0
    },
    {
        category: "Distance Attacks", maxRoll: 20, name: "Ensnaring Missile", powerCount: 1,
        description: "An ensnaring missile is a device that makes a form of grappling attack. This entangling is the equivalent of a grappling attack.",
        bonusPowerCount: 0
    },
    {
        category: "Distance Attacks", maxRoll: 30, name: "Ice Generation", powerCount: 1,
        description: "The hero in question may draw water from the ambient atmosphere and convert it to ice, which the hero may then use initially as a missile weapon.",
        bonusPowerCount: 0
    },
    {
        category: "Distance Attacks", maxRoll: 40, name: "Fire Generation", powerCount: 1,
        description: "The hero with this Power may project flame. Like ice generation, creation of large amounts of flame may damage the surrounding area. The hero may choose to inflict less damage with his flame.",
        bonusPowerCount: 0
    },
    {
        category: "Distance Attacks", maxRoll: 50, name: "Energy Generation", powerCount: 1,
        description: "The hero with this Power can fire bolts of force that inflict Energy-type damage, Force-type damage, or either (determined before attack). The hero with Energy Generation may choose to inflict less damage than determined.",
        bonusPowerCount: 0
    },
    {
        category: "Distance Attacks", maxRoll: 60, name: "Sound Generation", powerCount: 1,
        description: "The hero with this Power can make sonic attacks. Sonic attacks can affect only one target at a time.",
        bonusPowerCount: 0
    },
    {
        category: "Distance Attacks", maxRoll: 70, name: "Stunning Missile", powerCount: 1,
        description: "The hero possesses a weapon, energy bolt, or Power that either inflicts damage, or inflicts a Stunning attack. One of the two types must be chosen at start.",
        bonusPowerCount: 0
    },
    {
        category: "Distance Attacks", maxRoll: 80, name: "Corrosive Missile", powerCount: 1,
        description: "The hero has some form of corrosive, acidic, or matter-hostile attack that inflicts damage over a long period of time.  Damage may be halted by washing the exposed material or area. The character with this attack may never choose to inflict less damage. Corrosive attacks may also affect materials and Body Armor. Corrosive attacks must hit the target, and as such have no effect on Force Fields and the like.",
        bonusPowerCount: 0
    },
    {
        category: "Distance Attacks", maxRoll: 100, name: "Slashing Missile", powerCount: 1,
        description: "The hero with this form of weapon makes attacks on the Throwing, Edged column, and may not reduce the effect of the attack.",
        bonusPowerCount: 0
    },
    {
        category: "Distance Attacks", maxRoll: 110, name: "Nullifier Missile", powerCount: 1,
        description: "The hero with this type of attack inflicts no damage, but may nullify inborn or technological Powers. The effects of this nullification last for only as long as the hero concentrates. He can concentrate on only a single target.",
        bonusPowerCount: 0
    },

    {
        category: "Mental Powers", maxRoll: 10, name: "Telepathy", powerCount: 1,
        description: "The hero with Telepathic Power may establish mind-to-mind communication between himself and other individuals. The telepath only reads surface thoughts, but does so without visible or audible signs.",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 20, name: "Image Generation", powerCount: 2,
        description: "The hero with this Power may create vivid mental images. These images do not register on cameras, film, or in the minds of non-sentient robots.  Heroes with Image Generation must be in line of sight of these illusions. Illusions will last as long as the hero concentrates on them. Illusions inflict no intrinsic damage, but if they are believed, the characters that believe them will take imaginary damage, with apparent death resulting in unconsciousness. Since a character who has time to examine his wounds will find he is not hurt, and the damage is illusionary, most illusion-casters do not make direct attacks but use their illusions for subterfuge and deception. Illusions fool characters but do not fool nature.",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 30, name: "Telekinesis", powerCount: 1,
        description: "This Power allows the hero to lift and/or move objects.",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 40, name: "Force Field Generation", powerCount: 1,
        description: "The hero with this Power can create force fields that will protect himself and possibly other allies. It is not necessarily a Power of the mind, but it is included here. A force field operates as a form of Body Armor. A personal force field is considered to replace Body Armor, such that damage that gets around a personal force field is not absorbed by Body Armor.",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 50, name: "Animal Communication and Control", powerCount: 1,
        description: "A hero with this Power can talk to animals and influence their actions.  Animals which are Contacts (always friendly) never turn on the controller. Note on communications: Animals have no language, per se, but do communicate by a number of verbal and non-verbal signals. Communication is considered to be a super-human ability to recognize those signals and make one's own desires and wishes clear, as limited by the animals intelligence level. ",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 60, name: "Empathy", powerCount: 1,
        description: "Empathy is similar to Telepathy, but registers the surface emotions as opposed to the surface thoughts of the opponent, and no emotions may be transmitted back to the target.",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 70, name: "Psi-Screen", powerCount: 1,
        description: "This form of Psi-Screen is an inborn Power that resists mental scans and domination.  This Power differs from the Talent of the same name in that it may be extended over a number of targets to attempt to protect others from attacks.  Also, the attacker will be aware of the protector's mental presence. ",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 80, name: "Mental Probe", powerCount: 1,
        description: "This Power is a specific form of Telepathy. A Mental Probe is a search for a specific image in the mind of the target. The hero with this Power must state what she is looking for before beginning the scan.",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 90, name: "Astral Projection", powerCount: 1,
        description: "The hero with this Power can leave the body and travel elsewhere, either in this dimension, or entering other dimensions.  The character in astral form may observe actions in the normal world, but may not be detected by normal means. The character may not use his other abilities in the Astral form against non-astral targets. An astral character is not affected by non-telepathic objects or forms of attack, but may be affected by Mental Powers. The astral character may phase through solid objects without damaging either character or object.  While the astral form is separate, the body is immobile, in a trance. Damage to the body will be known to the astral traveler if it is in this dimension, and it is possible for the body to perish while the astral form is away. Characters whose bodies have perished are trapped in astral form.",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 100, name: "Psionic Attack", powerCount: 1,
        description: "This Power gives the hero the ability to project psionic force blasts. Force Field's operate against psionic attack.",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 110, name: "Mind Control", powerCount: 2,
        description: "Mind Control is the total overriding of the conscious mind. The character's personality remains, but his actions are controlled by the character with this power. The target has no memory of the period he is under control. The attacker and target must be within 10 feet of each other initially to effect Mind Control, though the target and attacker may be separated by miles afterwards. The target will only obey the orders of the controller, though those orders may be verbal or telepathic (if the controlling character has that Power) in nature. A character who has been Mind Controlled is unaware of his actions, knowing only that he has blanked out for a while.",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 120, name: "Emotion Control", powerCount: 2,
        description: "Emotion Control is a related form of Mind Control that acts upon the subconscious fears and attractions to produce the required results. Targets of an Emotion Control attack must be in the same area as the character with this Power. The effects must diminish before another dose of Emotion Control may be applied. Robots and non-human alien beings are immune to the effects of Emotion Control. Only one type of emotion may be instilled in a target at a time.",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 130, name: "Mechanical Intuition", powerCount: 1,
        description: "This is a specific form of Ultimate Skill that affects repairs, inventing, and building things. The character with this Power has a strong intuitive knowledge of machinery.",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 140, name: "Animal Empathy", powerCount: 1,
        description: "This specialized form of Empathy extends to all animals in a primitive form of Animal Communication. The hero with this Power may detect and influence the surface emotions of the animal involved, and instill in it fear, hunger, affection, exhaustion, or other emotions.",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 150, name: "Animate Drawings", powerCount: 1,
        description: "The hero with this Power may animate flat drawings and other repesentations, causing them to become fully operational items. A character may attempt to animate any drawing, even one of his own creation, or animate a specific type or class of object.  No additional Powers can be given to the animation.",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 160, name: "Possession", powerCount: 2,
        description: "This Power is a specific form of Mind Control in which all actions of the character are assumed by the controller. The controller is in effect inside` the mind of the character, and as such controls all actions without having to give commands.",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 170, name: "Transferral", powerCount: 2,
        description: "Transferral is the ultimate form of Possession, in that it allows the complete transferral of consciousness with a target within one area. The target's consciousness is not put away in the back of the character's mind, but rather moved into the body of the character with the Transferral Power.  When characters transfer consciousness, they also trade the mental abilities, Powers, and Talents. They do not trade physical abilities or Powers.",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 180, name: "Precognition", powerCount: 2,
        description: "An accurate divining of the future is impossible. There are a large variety of possible alternate futures diverging at any one point, all leading to different conclusions. The future is also mutable, such that the actions of today may bypass the future of the timeline that is viewed in this manner. Precognition allows the character to scan alternative futures up to a week in advance and choose from them an image that may or not come true, and use that information to form his own decisions. No farther than a week in the future may be scanned in this fashion. Precognition may not be used more than once a day.",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 190, name: "Postcognition", powerCount: 1,
        description: "The reverse of Precognition, but easier to handle, in that the past is fairly immutable. Postcognition only works on items the character handles.",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 200, name: "Plant Control", powerCount: 1,
        description: "The hero with this Power can command the actions of plants, granting them temporary Powers of their own, including movement, growth, and a rudimentary intelligence. These abilities only exist as long as the hero concentrates.  By mere control, the hero cannot have the plants perform any actions that would not be normally possible by the plants).",
        bonusPowerCount: 0
    },
    {
        category: "Mental Powers", maxRoll: 210, name: "Ultimate Skill", powerCount: 1,
        description: "Ultimate Skill is a special Power possessed by the hero, making him literally 'the best at what he does.'",
        bonusPowerCount: 0
    },

    {
        category: "Body Alterations/Offensive", maxRoll: 30, name: "Extra Body Parts", powerCount: 1,
        description: "The hero who gains this Power when the character is generated may choose the type and number of body parts. Some of these parts may provide Bonus Powers.",
        bonusPowerCount: 0
    },
    {
        category: "Body Alterations/Offensive", maxRoll: 40, name: "Extra Attacks", powerCount: 1,
        description: "The hero who gains this Power has increased fighting ability due to the ability to execute multiple attacks at once.",
        bonusPowerCount: 0
    },
    {
        category: "Body Alterations/Offensive", maxRoll: 50, name: "Energy Touch", powerCount: 1,
        description: "The hero with this Power may inflict damage and effects. The touch can be carried through conductive material, and may affect multiple targets in this fashion. The hero with this Power gains Resistance to Electricity as a Bonus Power if there are available power slots.",
        bonusPowerCount: 1,
        bonusPower: "Resistances\\Resistance to Electricity(100)"
    },
    {
        category: "Body Alterations/Offensive", maxRoll: 60, name: "Paralyzing Touch", powerCount: 1,
        description: "Those touched by an individual with this Power will be paralyzed. This Power is always in operation, and the user may be knocked out himself by such a touch.",
        bonusPowerCount: 0
    },
    {
        category: "Body Alterations/Offensive", maxRoll: 80, name: "Claws", powerCount: 1,
        description: "Claws are…. well, claws. Sharp pointy items that inflict damage. As with most sharp things attacks cannot be reduced in damage or effect. The effects of claws depend on whether they are being wielded against living creatures or non-living materials. ",
        bonusPowerCount: 0
    },
    {
        category: "Body Alterations/Offensive", maxRoll: 90, name: "Rotting Touch", powerCount: 1,
        description: "This touch causes organic material to decay.  Resistance to Corrosives will offset the effects.",
        bonusPowerCount: 0
    },
    {
        category: "Body Alterations/Offensive", maxRoll: 100, name: "Corrosive Touch", powerCount: 1,
        description: "Similar to Rotting Touch, but affects inorganic materials instead.  Resistance to Corrosives will offset these effects. Similar to Claws, this may chew through inorganic Body Armor to affect the individual beneath. ",
        bonusPowerCount: 0
    },
    {
        category: "Body Alterations/Offensive", maxRoll: 110, name: "Health-Drain Touch", powerCount: 2,
        description: "The touch of a character with this Power transfers health from the target to the hero.",
        bonusPowerCount: 0
    },
    {
        category: "Body Alterations/Offensive", maxRoll: 120, name: "Blinding Touch", powerCount: 1,
        description: "The touch of this character can blind the unprotected target.  The target cannot avoid this touch, unless the target possesses Protected Senses.",
        bonusPowerCount: 0
    },

    {
        category: "Body Alterations/Defensive", maxRoll: 30, name: "Body Armor", powerCount: 1,
        description: "A hero with Body Armor has a natural resistance to physical damage and, to a lesser extent, energy attacks. Body Armor absorbs damage from any physical attack. If an attack does not equal or better the amount of Body Armor, then none of the effects of the attack take place.  Body Armor is proof against physical attacks, including Blunt and Edged attacks, Shooting, Throwing attacks, Force, Grappling, and Charging attacks. It is less effective against Energy attacks. Body Armor may be natural or artificial material. Natural Body Armor is protection that is part of the creature itself. Artificial Body Armor is made of other materials, which may be bolstered by force fields. Certain types of attack are more effective against one type of Body Armor than the other. Artifical Body Armor has the advantage that it can be removed, allowing the hero to have a relatively normal life. High technology heroes who choose Body Armor may choose to have a battle-suit. All of the hero's other Powers are included in the suit, and the suit is considered artificial Body Armor.",
        bonusPowerCount: 0
    },
    {
        category: "Body Alterations/Defensive", maxRoll: 40, name: "Water Breathing", powerCount: 1,
        description: "This Power allows you to breathe water (fresh or salt) as if air.  In addition, this Power allows the hero to see underwater as if on land, and survive at great depths. The hero's next Power will be either Swimming or Animal Communication and Control (Sea life) if there are available power slots.",
        bonusPowerCount: 1,
        bonusPower: "Movement\\Swimming(50)|Mental Powers\\Animal Communication and Control(100)"
    },
    {
        category: "Body Alterations/Defensive", maxRoll: 50, name: "Absorption", powerCount: 1,
        description: "The hero with this Power may absorb a certain specific type of damage. Any attacks made in the specified mode inflict no damage; rather the damage is absorbed, healing existing damage. Any such absorbed energy dissipates after it has been absorbed, and must be discharged before then or it is lost.",
        bonusPowerCount: 0
    },
    {
        category: "Body Alterations/Defensive", maxRoll: 60, name: "Regeneration", powerCount: 1,
        description: "The hero with this Power heals faster than the normal rate. A hero with Regeneration recovers, providing the hero does not take additional damage in that time and is able to rest. A hero resting cannot engage in any other actions while healing himself. If that rest is interrupted, the hero must start again to recover. ",
        bonusPowerCount: 0
    },
    {
        category: "Body Alterations/Defensive", maxRoll: 70, name: "Solar Regeneration", powerCount: 1,
        description: "The hero with this Power heals as per Regeneration, but only heals when he is in the sunshine. In darkness, inside buildings, and in other similar situations, the character heals normally.",
        bonusPowerCount: 0
    },
    {
        category: "Body Alterations/Defensive", maxRoll: 90, name: "Recovery", powerCount: 1,
        description: "The hero with this Power recovers faster than normal.  The hero with this Power may choose any Resistance as a Bonus Power if there are available power slots. ",
        bonusPowerCount: 1,
        bonusPower: "Resistances\\Resistance to Fire and Heat(10)|Resistances\\Resistance to Cold(20)|Resistances\\Resistance to Electricity(30)|Resistances\\Resistance to Radiation(40)|Resistances\\Resistance to Toxins(50)|Resistances\\Resistance to Corrosives(60)|Resistances\\Resistance to Emotion Attacks(70)|Resistances\\Resistance to Mental Attacks(80)|Resistances\\Resistance to Magic Attacks(90)|Resistances\\Resistance to Disease(100)"
    },
    {
        category: "Body Alterations/Defensive", maxRoll: 100, name: "Life Support", powerCount: 1,
        description: "The hero with this Power has the potential to survive under hostile conditions for longer than normal amounts of time.",
        bonusPowerCount: 0
    },
    {
        category: "Body Alterations/Defensive", maxRoll: 110, name: "Pheromones", powerCount: 1,
        description: "Pheromones are a specialized form of Emotion Control that affect the pleasure centers of the...ah...opposite sex. Robots, aliens, and those unable to smell or be affected by the pheromones are not affected.",
        bonusPowerCount: 0
    },
    {
        category: "Body Alterations/Defensive", maxRoll: 120, name: "Damage Transfer", powerCount: 1,
        description: "This Power is a relative of the Health-Drain Touch, except health may be transferred between two separate targets on touch, in effect healing one while reducing the health of the other. The hero does not regain any health in this Damage Transfer.",
        bonusPowerCount: 0
    },
    {
        category: "Body Alterations/Defensive", maxRoll: 130, name: "Healing", powerCount: 1,
        description: "This Power allows the hero to restore lost health to others (but not the hero himself).",
        bonusPowerCount: 0
    },
    {
        category: "Body Alterations/Defensive", maxRoll: 140, name: "Immortality", powerCount: 2,
        description: "The character with this Power does not age or die in a normal fashion.  The hero can still suffer loss as the result of wounds, poisons, and damages, but if the results call for perishing, then the character does not die. The character cannot move or act until health recovers.  It counts as two Powers for any hero who takes it, unless the character is alien in origin. An immortal character's body will slowly regenerate lost parts and heal, so that short of atomizing the remains and spreading that collection of atoms through a large portion of space, the immortal character will return at some point in the future. Immortality is applicable to the Earth Dimension only (including all planets of this dimension). An immortal character in another dimension does not age, but may be killed normally while in that dimension.",
        bonusPowerCount: 0
    }
];

const TALENT_CATEGORIES_TABLE = [
    { maxRoll: 20, name: "Weapon Skills" },
    { maxRoll: 45, name: "Fighting Skills" },
    { maxRoll: 65, name: "Professional Skills" },
    { maxRoll: 85, name: "Scientific Skills" },
    { maxRoll: 90, name: "Mystic and Mental Skills" },
    { maxRoll: 100, name: "Other Skills" }
];

const TALENT_LIST_TABLE = [
    {
        category: "Weapon Skills", maxRoll: 20, name: "Guns", talentCount: 1,
        description: "Individuals without this Talent fire guns (all handguns, rifles, and submachine guns, including laser, stun, and concussion varieties).",
        bonusContactCount: 0,
    },
    {
        category: "Weapon Skills", maxRoll: 50, name: "Thrown Weapons", talentCount: 1,
        description: "Characters with this Talent toss weapons designed to be thrown (including spears, daggers, shuriken, disks, and snowballs).",
        bonusContactCount: 0,
    },
    {
        category: "Weapon Skills", maxRoll: 60, name: "Bows", talentCount: 1,
        description: "Bows are tricky items to operate.  Those with this Talent gain increased chance to hit with all bows, including crossbows, and may fire and reload in a simultaneously. With concentration, they may fire multiple arrows at once.",
        bonusContactCount: 0,
    },
    {
        category: "Weapon Skills", maxRoll: 80, name: "Blunt Weapons", talentCount: 1,
        description: "Characters with this Talent gain an increased chance to hit when attacking with a blunt weapon.",
        bonusContactCount: 0,
    },
    {
        category: "Weapon Skills", maxRoll: 90, name: "Sharp Weapons", talentCount: 1,
        description: "Characters with this Talent gain an increeased chance to hit when attacking with a sharp weapons.  This includes swords, daggers (unless thrown), and spears, but excludes claws and other natural extensions that inflict this type of damage.",
        bonusContactCount: 0,
    },
    {
        category: "Weapon Skills", maxRoll: 100, name: "Oriental Weapons", talentCount: 1,
        description: "This a special category that grants the character increased skill when using the following weapons: shuriken, crossbows, sais (treat as swords), and oriental swords and daggers (including the katana and the kris).",
        bonusContactCount: 0,
    },
    {
        category: "Weapon Skills", maxRoll: 110, name: "Marksman", talentCount: 2,
        description: "The character with this Talent gains an increased chance to hit with any distance weapon that requires line of sight to hit. Such a weapon in the hands of a marksman does not suffer penalties to hit from range.",
        bonusContactCount: 0,
    },
    {
        category: "Weapon Skills", maxRoll: 120, name: "Weapons Master", talentCount: 2,
        description: "The character with this Talent gains an increased chance to hit with any weapon that requires concentration to hit.",
        bonusContactCount: 0,
    },
    {
        category: "Weapon Skills", maxRoll: 130, name: "Weapons Specialist", talentCount: 2,
        description: "The character with this Talent gains an increased skill with a single weapon of choice. This may be any type of weapon, missile or melee. The character who is a weapon specialist will also increase his speed when using this weapon.",
        bonusContactCount: 0,
    },

    {
        category: "Fighting Skills", maxRoll: 10, name: "Martial Arts A", talentCount: 1,
        description: "This form of martial arts concentrates on using an opponent's strength against him, and is typical of oriental- American forms such as judo and karate. The practioner of this type of martial arts can Stun or Slam an opponent regardless of their comparative Strengths and Endurances.",
        bonusContactCount: 0,
    },
    {
        category: "Fighting Skills", maxRoll: 20, name: "Martial Arts B", talentCount: 1,
        description: "This form of martial arts is keyed on offense and inflicting damage in short, quick bursts, and includes such disciplines as boxing. The practioner of this form of martial arts gains an increased chance of hitting when engaged in unarmed combat.",
        bonusContactCount: 0,
    },
    {
        category: "Fighting Skills", maxRoll: 30, name: "Martial Arts C", talentCount: 1,
        description: "This form of martial arts concentrates on holds and escapes. The practitioner of this form gains increased strength when grappling attacks (including damage), an increased chance of escaping and increased agility when dodging.",
        bonusContactCount: 0,
    },
    {
        category: "Fighting Skills", maxRoll: 40, name: "Martial Arts D", talentCount: 1,
        description: "This meditative form of martial arts searches out the weak spots of the opponent's defenses and strikes against them. The practioner of this form of attack may ignore the effects of Body Armor (though not force fields). The disadvantage is that the target of this attack must be studied before the effects may be brought. The character with this Talent does not have to attack the character, only watch him in battle previous to attacking.",
        bonusContactCount: 0,
    },
    {
        category: "Fighting Skills", maxRoll: 50, name: "Martial Arts E", talentCount: 1,
        description: "This form of martial arts encourages quick striking to catch the opponent off-guard.",
        bonusContactCount: 0,
    },
    {
        category: "Fighting Skills", maxRoll: 60, name: "Wrestling", talentCount: 1,
        description: "The hero with this Talent is proficient in applying holds . It includes familiar types of wrestling as well as the sumo forms of the art. ",
        bonusContactCount: 0,
    },
    {
        category: "Fighting Skills", maxRoll: 70, name: "Thrown Objects", talentCount: 1,
        description: "The hero with this Talent gains an increased  chance of hitting with all Throwing attacks (both Edged and Blunt). This applies to both thrown weapons and normal items.",
        bonusContactCount: 0,
    },
    {
        category: "Fighting Skills", maxRoll: 80, name: "Tumbling", talentCount: 1,
        description: "The hero with this Talent knows how to fall and land without undue injury.",
        bonusContactCount: 0,
    },
    {
        category: "Fighting Skills", maxRoll: 90, name: "Unknown", talentCount: 1,
        description: "",
        bonusContactCount: 0,
    },
    {
        category: "Fighting Skills", maxRoll: 100, name: "Acrobatics", talentCount: 1,
        description: "The hero with this Talent is very limber and as such gains advantages when under attack. The hero is better when dodging, evading, and escaping.",
        bonusContactCount: 0,
    },

    {
        category: "Professional Skills", maxRoll: 10, name: "Law", talentCount: 1,
        description: "The character with this Talent has an extensive background in law. The hero may be a lawyer or capable of applying to pass the bar.",
        bonusContactCount: 0,
    },
    {
        category: "Professional Skills", maxRoll: 20, name: "Pilot", talentCount: 1,
        description: "The character with this Talent has a working knowledge of most aircraft. A character with a background that would permit it may extend this Talent to spacecraft as well. ",
        bonusContactCount: 0,
    },
    {
        category: "Professional Skills", maxRoll: 30, name: "Military", talentCount: 1,
        description: "The hero has had some dealings with one of the armed services.",
        bonusContactCount: 1,
        bonusContact: "Political/National(100)"
    },
    {
        category: "Professional Skills", maxRoll: 40, name: "Business/Finance", talentCount: 1,
        description: "The hero is familiar with the world of business, corporate finance, and how money works. The hero gains a Contact in the Professional category.",
        bonusContactCount: 1,
        bonusContact: "Professional/Business World(100)"
    },
    {
        category: "Professional Skills", maxRoll: 50, name: "Journalism", talentCount: 1,
        description: "The hero with this Talent gains an additional 2 Contacts to those already generated. The Contacts should be connected with the media in some fashion, such as at local newspapers, radio or TV stations, or as sources in law enforcement, political circles, or snitches of the criminal underworld. ",
        bonusContactCount: 2,
        bonusContact: "Political/Local(33)|Professional/Law Enforcement(66)|Professional/Crime(100)"
    },
    {
        category: "Professional Skills", maxRoll: 60, name: "Engineering", talentCount: 1,
        description: "Engineering includes all the varied types of that profession dedicated to the design of functional items: civil, chemical, mechanical, etc.",
        bonusContactCount: 0,
    },
    {
        category: "Professional Skills", maxRoll: 70, name: "Crime", talentCount: 1,
        description: "The hero with this Talent has an understanding of the criminal mind and behavior, either from studies or first-hand observation. The hero also gains a Contact in either the police or crime areas.",
        bonusContactCount: 1,
        bonusContact: "Professional/Law Enforcement(50)|Professional/Crime(100)"
    },
    {
        category: "Professional Skills", maxRoll: 80, name: "Psychiatry", talentCount: 1,
        description: "",
        bonusContactCount: 0,
    },
    {
        category: "Professional Skills", maxRoll: 90, name: "Unknown", talentCount: 1,
        description: "",
        bonusContactCount: 0,
    },
    {
        category: "Professional Skills", maxRoll: 100, name: "Detective/Espionage", talentCount: 1,
        description: "The hero with this Talent has been trained to notice small clues in solving crimes. The character with this Talent gains a Contact in either crime, law enforcement, law, or espionage.",
        bonusContactCount: 1,
        bonusContact: "Professional/Law Enforcement(25)|Professional/Crime(50)|Professional/Law(75)|Professional/Espionage(100)"
    },
    {
        category: "Professional Skills", maxRoll: 110, name: "Medicine", talentCount: 2,
        description: "The hero with this Talent has extensive knowledge of medicine, and as such limited Talents in healing. In general, a character losing Endurance Ranks as the result of a lethal situation can have those losses stopped by any character checking on him.",
        bonusContactCount: 0,
    },
    {
        category: "Professional Skills", maxRoll: 120, name: "Law-Enforcemeent", talentCount: 1,
        description: "The character with this Talent has a background with law-enforcement authorities. This Talent includes both Gun and Law Talents, and the character, if still a member of a law-enforcement agency, may legally carry a gun and make arrests. ",
        bonusContactCount: 0,
    },

    {
        category: "Scientific Skills", maxRoll: 20, name: "Chemistry", talentCount: 1,
        description: "The character with this Talent studies matters of chemistry, including developing new formulas, finding cures for inorganic poisons, and identifying chemicals by smell, touch, or taste. ",
        bonusContactCount: 0,
    },
    {
        category: "Scientific Skills", maxRoll: 40, name: "Biology", talentCount: 1,
        description: "The character with this Talent studies matters of biology, including animal and plant identification, finding cures for organic poisons, and researching diseases and their cures. ",
        bonusContactCount: 0,
    },
    {
        category: "Scientific Skills", maxRoll: 60, name: "Geology", talentCount: 1,
        description: "The character with this Talent studies matters involving the Earth, including volcanic activity, the geology of the surrounding land, types of rocks and their powers, and mineral identification. ",
        bonusContactCount: 0,
    },
    {
        category: "Scientific Skills", maxRoll: 70, name: "Genetics", talentCount: 1,
        description: "The character with this Talent studies matters involving the genes, including creating new life forms, understanding mutants, and researching diseases. ",
        bonusContactCount: 0,
    },
    {
        category: "Scientific Skills", maxRoll: 80, name: "Archeology", talentCount: 1,
        description: "The character with this Talent studies matters involving the past, including paeleontology, historical records, and ancient myths and legends. ",
        bonusContactCount: 0,
    },
    {
        category: "Scientific Skills", maxRoll: 90, name: "Physics", talentCount: 1,
        description: "The character with this Talent studies matters involving 9 0 physics and astrophysics, including motion, flight, and the planets and stars. ",
        bonusContactCount: 0,
    },
    {
        category: "Scientific Skills", maxRoll: 100, name: "Electronics", talentCount: 1,
        description: "The character with this Talent studies matters involving electronic devices, including their creation and repair. ",
        bonusContactCount: 0,
    },
    {
        category: "Scientific Skills", maxRoll: 110, name: "Computers", talentCount: 1,
        description: "The character with this Talent studies matters involving computers, computer-controled equipment, and artificial intelligences. ",
        bonusContactCount: 0,
    },

    {
        category: "Mystic and Mental Skills", maxRoll: 20, name: "Trance", talentCount: 1,
        description: "The character may place himself into a trance. While in a trance the character slows his body functions to such a level that he may be assumed to be deceased. A character in a trance reduces needs for food and water to a minimal level",
        bonusContactCount: 0,
    },
    {
        category: "Mystic and Mental Skills", maxRoll: 50, name: "Mesmerism and Hypnosis", talentCount: 1,
        description: "This Talent is a primitive form of Mind Control. Information can be gained as per a Mental Probe, and post-hypnotic suggestions may be implanted within the victim's mind. Any attempt to force an individual to do something that he would not normally do, or divulge information that he would not normally reveal, will cause the hypnotism to break. A hypnotic command fades in 1-10 hours after it is given. ",
        bonusContactCount: 0,
    },
    {
        category: "Mystic and Mental Skills", maxRoll: 70, name: "Sleight of Hand", talentCount: 1,
        description: "This is a Talent developed by stage magicians which causes items to appear and disappear by a combination of misdirection and swift, fluid gestures. The character with this Talent may palm small items, making them appear or disappear. ",
        bonusContactCount: 0,
    },
    {
        category: "Mystic and Mental Skills", maxRoll: 90, name: "Resist Domination", talentCount: 1,
        description: "This is a Psi-Screen that may be developed by the individuals without that Power. This permits the character to resist mental attacks as if the character had a mental power. The Talent is passive in nature, and does not grant any other particular benefit. A character with Mental Probe may be able to discern where the character gained this Talent, but nothing else. ",
        bonusContactCount: 0,
    },
    {
        category: "Mystic and Mental Skills", maxRoll: 100, name: "Occult Lore", talentCount: 1,
        description: "The character with this Talent has a knowledge of magical societies, antiquities, runes, and a general understanding of forgotten lore.",
        bonusContactCount: 0,
    },
    {
        category: "Mystic and Mental Skills", maxRoll: 110, name: "Mystic Origin", talentCount: 2,
        description: "This Talent shows that the character has some background with magical forces. Heroes may have derived their powers from these forces if they choose this Talent.",
        bonusContactCount: 0,
    },

    {
        category: "Other Skills", maxRoll: 20, name: "Artist", talentCount: 1,
        description: "The character with an artist background creates works of art, either for himself or for sale to others. This includes painting, sculpting, and writing.",
        bonusContactCount: 0,
    },
    {
        category: "Other Skills", maxRoll: 40, name: "Languages", talentCount: 1,
        description: "The character with this Talent has a natural understanding of languages. The character gains 1 additional language at start, and may add other languages mor easily. Characters without languages Talent must gain this Talent first to learn other languages. The gaining of additional languages assumes someone is available to teach these languages. A Player character with this Talent does not have to assign a language at start, but may fill one in later as need be. ",
        bonusContactCount: 0,
    },
    {
        category: "Other Skills", maxRoll: 60, name: "First Aid", talentCount: 1,
        description: "The medicine Talent notes that the loss of Endurance ranks may be halted by someone checking on the dying character and administering some form of aid.",
        bonusContactCount: 0,
    },
    {
        category: "Other Skills", maxRoll: 80, name: "Repair/Tinkering", talentCount: 1,
        description: "The character with this Talent gains an increased chance of success involving the repair and modfication of existing items, but not the building of new items. This is a general category that covers any one subject desired by the character.",
        bonusContactCount: 0,
    },
    {
        category: "Other Skills", maxRoll: 100, name: "Trivia", talentCount: 1,
        description: "Trivia categories should be specific (old movies, military history, sports, rock music, comic books) as opposed to general (all knowledge) or covered by other Talents.",
        bonusContactCount: 0,
    },
    {
        category: "Other Skills", maxRoll: 110, name: "Performer", talentCount: 1,
        description: "The character is someone who acts, sings, dances, mimes, or otherwise uses his Talents to entertain.",
        bonusContactCount: 0,
    },
    {
        category: "Other Skills", maxRoll: 120, name: "Animal Training", talentCount: 2,
        description: "The character with this Talent has the ability to train animals to perform certain stunts. The individual does not have Animal Empathy or Communications and Control, but may teach an animal a trick.",
        bonusContactCount: 0,
    },
    {
        category: "Other Skills", maxRoll: 130, name: "Heir to Fortune", talentCount: 2,
        description: "This is not a Talent, but a situation which brings the character into a lot of money.",
        bonusContactCount: 0,
    },
    {
        category: "Other Skills", maxRoll: 140, name: "Student", talentCount: 2,
        description: "The Student character has no other initial Talents, but may gain other Talents more eeasily.",
        bonusContactCount: 0,
    },
    {
        category: "Other Skills", maxRoll: 150, name: "Leadership", talentCount: 2,
        description: "The hero with this Talent has the brains and understanding of a cohesive group, such that he is a benefit to the team.",
        bonusContactCount: 0,
    },

];

const CONTACT_CATEGORIES_TABLE = [
    { maxRoll: 30, name: "Professional" },
    { maxRoll: 60, name: "Scientific" },
    { maxRoll: 90, name: "Political" },
    { maxRoll: 100, name: "Mystic Arts" },
];


const CONTACT_TYPE_LIST_TABLE = [
    {
        category: "Professional", maxRoll: 12, name: "Medicine",
        description: "The hero with this Contact has a friend, ally or acquaintance with Medicine Talent, who will provide medical advice and services either for free or charge an affordable fee."
    },
    {
        category: "Professional", maxRoll: 24, name: "Law",
        description: "The hero with this Contact has a friend, ally, or acquaintance with Law Talent, who will provide legal assistance for a reduced fee and legal advice to the hero for free."
    },
    {
        category: "Professional", maxRoll: 36, name: "Law Enforcement",
        description: "The hero with this Contact has a friend, ally, or acquaintance with Law-enforcement Talent, who is in addition a member of the law-enforcement profession."
    },
    {
        category: "Professional", maxRoll: 50, name: "Business World",
        description: "The character has a Contact in the world of business or finance."
    },
    {
        category: "Professional", maxRoll: 60, name: "Crime",
        description: "The character with this Contact has some connection with the criminal underworld. This ranges from having a snitch that passes on information about street action up to a Contact high in the hierarchy of organized crime."
    },
    {
        category: "Professional", maxRoll: 70, name: "Engineering",
        description: "The character with this Contact has some connection with someone who builds, either independently or for a larger corporation. The character may aid in the construction of devices. "
    },
    {
        category: "Professional", maxRoll: 80, name: "Psychiatry",
        description: "The character with this Contact has some connection with a character in the fields of psychiatry or psycho-analysis, including doctors devoted to the curing of the criminal mind. "
    },
    {
        category: "Professional", maxRoll: 90, name: "Espionage",
        description: "The character with this Contact has connections with the world of espionage. This includes agencies such as the FBI, CIA, NSA, KGB, Interpol, or MI5."
    },
    {
        category: "Professional", maxRoll: 100, name: "Hero Group",
        description: "The character has some connection with, or was or is a member of or an ally of some existing group of super-powered heroes, and a s such may enjoy the privileges thereof. This includes using their equipment, calling them in on an emergency, using their HQ, and benefitting from their training."
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
        description: "The hero has an ally in state government — connected with the office of governor, a state representative, or someone in one of the state agencies."
    },
    {
        category: "Political", maxRoll: 85, name: "National",
        description: "The hero has a Contact in national government — a congressional aide, a congressman, representative, member of the Executive Branch or one of the myriad number of agencies in the capital."
    },
    {
        category: "Political", maxRoll: 95, name: "Other National",
        description: "The hero has a Contact in national government — someone else's. The hero may be friendly with the leadership or government apparatus of any other nation, friend or foe. This Contact, if known to others, may create difficulties in dealing with other political Contacts. Resources available are as for National government, but the character must be able to communicate with the Contact to gain any materials. "
    },
    {
        category: "Political", maxRoll: 99, name: "International",
        description: "The hero has Contacts in the UN or in a similar multi-national organization, such as the Common Market of Europe."
    },
    {
        category: "Political", maxRoll: 100, name: "Planetary",
        description: "This Contact is available to Alien characters only. The hero is well-known to the inhabitants and/or rulers of another planet, provided they can get in contact with those sources. "
    },
    {
        category: "Mystic Arts", maxRoll: 50, name: "Occult Lore",
        description: "The hero knows someone who dabbles in the darker arts. The Contact may provide advice on mystic writings, spells and their castings, and curses. The Contact is not necessarily a true magic-wielder. "
    },
    {
        category: "Mystic Arts", maxRoll: 100, name: "Mythology",
        description: "The hero knows someone who studies recognized mythology and actions of the extra-dimensional beings known as gods (Olympians, Asgardians, etc.). The Contact will specialize in one pantheon of deities."
    },
];


