// K1 To Collapse
const RANDOM_RANKS_ULTIMATE_TABLE = [
    { rank: 'Shift 0', rankNumber: 0, maxRolls: [0, 0, 0, 0, 0] },
    { rank: 'Feeble', rankNumber: 1, maxRolls: [5, 5, 5, 5, 10] },
    { rank: 'Poor', rankNumber: 3, maxRolls: [10, 25, 10, 10, 20] },
    { rank: 'Typical', rankNumber: 5, maxRolls: [20, 75, 40, 15, 30] },
    { rank: 'Good', rankNumber: 8, maxRolls: [40, 96, 80, 40, 40] },
    { rank: 'Excellent', rankNumber: 16, maxRolls: [60, 100, 95, 50, 60] },
    { rank: 'Remarkable', rankNumber: 26, maxRolls: [80, -1, 100, 70, 70] },
    { rank: 'Incredible', rankNumber: 36, maxRolls: [96, -1, -1, 90, 80] },
    { rank: 'Amazing', rankNumber: 46, maxRolls: [100, -1, -1, 98, 95] },
    { rank: 'Monstrous', rankNumber: 63, maxRolls: [-1, -1, -1, 100, 100] }
];

const PHYSICAL_FORM_ULTIMATE_TABLE = [
    {
        maxRoll: 25, name: "Normal Human", column: 2, resourcesAdjustment: 2,
        description: "The body is completely normal and possesses no detectable abnormalities. Any Powers the hero possesses have left no visible mark on the body"
    },
    {
        maxRoll: 30, name: "Mutant - Induced", column: 1, anyPrimaryAbilityAdjustment: 1,
        description: "The hero started life as a Normal Human, \"then something happened.\" As a result of a freak happenstance, the hero has been physically and genetically altered."
    },
    {
        maxRoll: 33, name: "Mutant - Random", column: 1, powersCountAdjustment: 1,
        resourcesAdjustment: -1, enduranceAdjustment: 1,
        description: "The hero was born to Normal Humans, but a freak twist of genetic fate made him a mutant from birth."
    },
    {
        maxRoll: 35, name: "Mutant - Breed", column: 1, intuitionAdjustment: 1, enduranceAdjustment: 1,
        bonusContactsCount: 1,
        bonusContact: "Political/Tribe(100)",
        description: "The hero's parents were Mutants, as were any number of preceding generations. Breed Mutants form tribes and have close-knit families; this is a defense mechanism born from generations spent hiding their true selves from normal society."
    },
    {
        maxRoll: 38, name: "Android", column: 4, popularityAdjustment: -1, anyPrimaryAbilityAdjustment: 1, powersCountAdjustment: 1,
        bonusContactsCount: 1,
        bonusContact: "Scientific/Laboratory(100)",
        description: "These are artificially created organic beings. An android is made of laboratory-created protoplasm and grows to maturity in an artificial womb. More intricately made Androids can actually interbreed with Normal Humans."
    },
    {
        maxRoll: 46, name: "Humanoid Race", column: 5, anyPrimaryAbilityAdjustment: 1,
        resourcesStart: 3 /* Poor */,
        bonusContactsCount: 1,
        bonusContact: "Political/Race(100)",
        description: "The hero is a normal member of a human-like race from \"somewhere else.\" This may be another world, era, dimension, or lost land hidden somewhere on the Earth. Most can pass as Normal Humans with a little disguise or explanation. "
    },
    {
        maxRoll: 47, name: "Surgical Composite", column: 2, strengthAdjustment: 1, fightingAdjustment: 1, enduranceAdjustment: 1,
        popularityStart: 0, resourcesStart: 3 /*Poor*/,
        bonusContactsCount: 1,
        bonusContact: "Professional/Medicine(100)",
        description: "The hero was created in an operating room. His body contains parts taken from several bodies. Close examination reveals the scars from his creation.  Resistance to Mental Domination is reduced -1CS.  Composites heal twice as quickly as Normal Humans."
    },
    {
        maxRoll: 49, name: "Modified Human - Organic", column: 1,
        bonusContactsCount: 1,
        bonusContact: "Scientific/Laboratory(100)",
        description: "This is someone who started life as a Normal Human and was later altered by some means. The change affected his body on a physical level but did not alter his DNA. Genetically, the hero is still very much human and cannot pass on his Powers to his descendants.  The hero's internal organs and nervous system have been altered.  Organics heal twice as fast as Normal Humans."
    },
    {
        maxRoll: 51, name: "Modified Human - Muscular", column: 1,
        bonusContactsCount: 1,
        bonusContact: "Scientific/Laboratory(100)",
        enduranceAdjustment: 1, strengthAdjustment: 1,
        description: "This is someone who started life as a Normal Human and was later altered by some means. The change affected his body on a physical level but did not alter his DNA. Genetically, the hero is still very much human and cannot pass on his Powers to his descendants. Muscular Modification is easy to detect; just look for a person with outrageous muscular development."
    },
    {
        maxRoll: 53, name: "Modified Human - Skeletal", column: 1,
        bonusContactsCount: 1,
        bonusContact: "Scientific/Laboratory(100)",
        description: "This is someone who started life as a Normal Human and was later altered by some means. The change affected his body on a physical level but did not alter his DNA. Genetically, the hero is still very much human and cannot pass on his Powers to his descendants.  The hero's original skeletal structure has been replaced or augmented by artificial means.  Skeletals gain + 1CS Resistance to Physical Attacks."
    },
    {
        maxRoll: 57, name: "Modified Human - Extra Parts", column: 2,
        description: "This type of body is harder to disguise than the other Modifications because the body now possesses extra pieces of anatomy.  These may be duplicates of normal parts (arms are probably the most common example), or parts that are not found on a Normal Human.  Arms raise Fighting + 1CS.  Duplicate organs doubles the Health point total.  Tails give the hero an additional attack when engaged in blunt attacks (one per tail).  Wings give the hero Flight. "
    },
    {
        maxRoll: 58, name: "Demihuman - Centaur", column: 5,
        description: "Demihumans can be unique individuals or members of a race that inhabits a different place or time.  Centaurs have a human head, torso, and arms mated to the body of a horse.  They can move quickly over horizontal ground (four areas/turn), and can fight with their hooves. On the minus side, centaurs have Feeble Climbing ability.  They are popularly thought of as scholars or drunken lechers."
    },
    {
        maxRoll: 59, name: "Demihuman - Equiman", column: 3,
        description: "Demihumans can be unique individuals or members of a race that inhabits a different place or time.  Equimen possess horse legs in place of human ones. They have a horse's mane and tail as well.  By hiding the legs and tail, an equiman can pass for human. Kicking does + 1CS damage."
    },
    {
        maxRoll: 60, name: "Demihuman - Faun", column: 2,
        description: "Demihumans can be unique individuals or members of a race that inhabits a different place or time.  Fauns possess the hairy legs, short tail, and horns of a goat.  They possess Feeble Mental Domination over females of any human(oid) race"
    },
    {
        maxRoll: 62, name: "Demihuman - Felinoid", column: 1,
        description: "Demihumans can be unique individuals or members of a race that inhabits a different place or time.  Felinoids are human-shaped, cat- like beings. The overall body shape is human, but the skin is covered in fur and the face is that of a cat. A felinoid has a tail, claws, fangs, pointed ears on top of the head, and slitted pupils in the eyes. A felinoid can see in the dark with Excellent night vision. Such beings possess + 1CS Climbing ability."
    },
    {
        maxRoll: 63, name: "Demihuman - Lupinoid (Werewolf)", column: 4,
        popularityAdjustment: -1,
        description: "Demihumans can be unique individuals or members of a race that inhabits a different place or time.  Lupinoids are human-shaped, canine-like beings. They are often mistaken for the cinematic conception of a werewolf. The body is covered in hair and the face is definitely canine. The body has a tail, harmless claws, big teeth, and long pointed ears atop the head. A lupinoid possesses an Excellent sense of smell."
    },
    {
        maxRoll: 64, name: "Demihuman - Lupinoid", column: 4,
        description: "Demihumans can be unique individuals or members of a race that inhabits a different place or time.  Lupinoids are human-shaped, canine-like beings. They are often mistaken for the cinematic conception of a werewolf. The body is covered in hair and the face is definitely canine. The body has a tail, harmless claws, big teeth, and long pointed ears atop the head. A lupinoid possesses an Excellent sense of smell."
    },
    {
        maxRoll: 65, name: "Demihuman - Avian (Angelic)", column: 3, popularityAdjustment: 1,
        description: "Demihumans can be unique individuals or members of a race that inhabits a different place or time.  Angelic avians resemble humans with wings sprouting from the shoulder blades. Angelic avians reproduce by normal human means."
    },
    {
        maxRoll: 66, name: "Demihuman - Avian (Harpie)", column: 2, fightingAdjustment: 1,
        description: "Demihumans can be unique individuals or members of a race that inhabits a different place or time.  Harpies possess arms that are modified to also serve as wings and feather-covered legs that end in bird claws. Harpies reproduce by laying eggs."
    },
    {
        maxRoll: 67, name: "Demihuman - Chiropteran", column: 2,
        bonusPowerCount: 1,
        bonusPower: "Detection\\Sonar (Active)\\Good", popularityStart: 1 /* Feeble */,
        description: "Demihumans can be unique individuals or members of a race that inhabits a different place or time.  Chiropterans are similar to angelic humans except that they combine the human parts with those of a bat. Their arms also serve as leathery wings, their feet have elongated toes that can serve as hands, and in addition they possess large ears."
    },
    {
        maxRoll: 68, name: "Demihuman - Lamian", column: 3, popularityStart: 0,
        description: "Demihumans can be unique individuals or members of a race that inhabits a different place or time.  Lamians are snake people. The legs have been replaced by a serpentine body, although the arms are normal. The skin is covered in fine scales. Lamians have lidless eyes and retractable fangs.  Lamians are difficult to bind (+ 1CS toescape)."
    },
    {
        maxRoll: 69, name: "Demihuman - Merhuman", column: 2,
        bonusPowerCount: 1,
        bonusPowers: "Physical Enhancement\\Water Freedom\\Roll", popularityAdjustment: 1,
        description: "Demihumans can be unique individuals or members of a race that inhabits a different place or time.  Merhumans are amphibious relatives of lamians. The body is human from the waist up; the rest is a flexible fish-tail. Merhumans possess both lungs and gills, but can only stay away from water a limited time because their bodies quickly dry out. Movement on dry land is limited to crawling or dependence on vehicles."
    },
    {
        maxRoll: 70, name: "Demihuman - Other", column: 3,
        description: "Demihumans can be unique individuals or members of a race that inhabits a different place or time."
    },
    {
        maxRoll: 72, name: "Cyborg - Artificial limbs/organs", column: 2, intuitionAdjustment: -1,
        description: "The hero began as a Normal Human but has had parts of his body replaced by artificial devices.  "
    },
    {
        maxRoll: 74, name: "Cyborg - Exoskeleton", column: 2,
        description: "The hero's body is intact but is encased in a mechanical suit that provides him with life-support and Powers. The natural and artificial bodies exist in symbiosis. "
    },
    {
        maxRoll: 76, name: "Cyborg - Mechanical Body", column: 4, intuitionAdjustment: -1, psycheAdjustment: -1,
        bonusContactsCount: 1,
        bonusContact: "Scientific/Laboratory(100)",
        description: "The only part of the hero's original body that remains is his brain and the nervous system. This is housed in a special life-support module that fills most of the brain's needs (oxygen, blood, nutrients). The life-support module is mated with a mechanical form that serves the brain as its new body. The nervous system is directly linked with the machine's control circuits, allowing both control and sensory feedback.  Mech Bodies have Monstrous Resistance to Disease and Poisons of all sorts."
    },
    {
        maxRoll: 79, name: "Cyborg - Mechanically Augmented", column: 3, powersCountAdjustment: -1, resourcesSet: 16 /* Good */,
        isHiTech: true,
        description: "This is a Cyborg who still has all his original (human) equipment but carries some options inside. Unused spaces in his body are now filled with various useful devices. These can be directly controlled through the nervous system. It is these devices that give the hero his Powers."
    },
    {
        maxRoll: 82, name: "Robot - human shape", column: 4, popularityStart: 0,
        description: "This is a completely mechanical being that is patterned after the human body. "
    },
    {
        maxRoll: 84, name: "Robot - Usuform", column: 4,
        description: "This is a robot that believes in the age of \"Form follows function.\" This robot's body is anything but humanshaped and is designed to best serve specific needs. "
    },
    {
        maxRoll: 86, name: "Robot - Metamorphic", column: 4, abilitiesToGenerate: 2,
        description: "This is a robot whose design is so flexible it can change into two or more forms, each possessing different Physical Abilities and Physical Powers. "
    },
    {
        maxRoll: 87, name: "Robot - Computer", column: 4, reasonAdjustment: 2, fightingAdjustment: -1, resourcesAdjustment: 1,
        allPrimaryAbilitiesAdjustment: -1, allPowersRankAdjustment: -1,
        description: "The hero is a computer, period. At first glance this seems unplayable, but bear me out. This is a rare computer, one that is self-aware and possesses true intelligence. While the mainframe itself is immobile and unable to physically act, peripherals give the sentient computer a wide range of means to deal with the physical world. Slave robots act as proxies for the computer. Physical additions provide the mainframe with add-on functions. The Computer can directly interact with other computers, robots, and some cyborgs on a programming level.  Computers have a decreased Resistance to Electrical and Magnetic Attacks and also to Phasing."
    },
    {
        maxRoll: 88, name: "Angel/Demon", column: 5, subType: "Angel(50)|Demon(100)", popularityAdjustment: "Angel(+2)|Demon(-2)",
        allPhysicalAbilitiesAdjustment: 1,
        bonusPowerCount: 1,
        bonusPowers: "Demon(Energy Emission\\Fire Generation\\Good)|Angel(Matter Creation\\Artifact Creation\\Good)",
        description: "These are magical beings from other planes of existence. They are both supernatural and corporeal in nature. The main difference between these types is their inherent personality. \"Angels\" are benevolent; \"demons\" are malevolent. Other than that, there isn't much differnce.  Such beings p o s s e s s a Psychological Weakness that Negates their Power."
    },
    {
        maxRoll: 89, name: "Deity", column: 5, allPrimaryAbilitiesAdjustment: 2, powersCountAdjustment: 2, popularityAdjustment: 2,
        bonusPowerCount: 1,
        bonusPower: "Travel\\Any\\Roll",
        description: "This is an \"Entity of Great Power\" —or rather, was such a being. The deity was an actual god, demigod, or close relative who was actually worshipped at some point in the past. Now his powers have waned because the religion which was devoted to him is no longer practiced. His followers have disappeared into the annals of history."
    },
    {
        maxRoll: 90, name: "Animal", column: 1, powersCountAdjustment: -1,
        bonusPowerCount: 2,
        bonusPowers: "Detection\\Any\\Good|Detection\\Any\Good", resourcesSet: 1 /* Feeble */,
        description: "This is a catch-all category that includes fish, mammals, birds, reptiles, and the rest of Earth's fauna, in addition to aliens that do not fit into any other category."
    },
    {
        maxRoll: 91, name: "Vegetable", column: 1, resourcesSet: 1 /* Feeble */,
        bonusPowerCount: 1,
        bonusPower: "Energy Control\\Absorption Power\\Good",
        fightingAdjustment: -2, enduranceAdjustment: 2,
        description: "The hero is an intelligent, mobile plant. He can be of any nature but for game purposes the hero is assumed to be a man-shaped plant. His physiology is based on photosynthesis. The plant-man doesn't need to eat anything except a bit of fertilizer occasion- ally. Prolonged deprivation of light and water reduces the hero's Strength and Endurance - 1CS per day after an initial three days."
    },
    {
        maxRoll: 92, name: "Abnormal Chemistry", column: 2, enduranceAdjustment: 1,
        description: "The body is apparently normal but possesses a different chemical base than that of Normal Humans. A key element in the body's chemical makeup is replaced by another element. The most common abnormali- ties are silicon replacing carbon, copper replacing iron, and cobalt replacing iron."
    },
    {
        maxRoll: 93, name: "Mineral", column: 2, healthAdjustment: "*2",
        description: "The body is composed of solid materials that normally do not sustain life. In fact, the body might not even have anything remotely resembling internal organs. In such cases , an internal examination would only reveal homogenous matter.  Mineral Life is immune to all Poisons and Diseases that harm Normal Humans.  Movement rate is decreased - 1CS."
    },
    {
        maxRoll: 94, name: "Gaseous", column: 5, resourcesSet: 1 /* Feeble */,
        description: "The body is completely composed of gases, vapors, smoke, and mist without any solid (or even liquid) components above the microscopic level. The Gas Body is a coherent cloud that retains its integrity even in the face of Amazing Intensity winds. Unlike normal clouds, the Gas Body can more at will in any direction and even penetrate liquids and permeable solids."
    },
    {
        maxRoll: 95, name: "Liquid", column: 5,
        description: "You know that the Normal Human body is 68% liquid? Well, this type is 100% liquid. However, it is composed of special liquids that remain together. The fluid body can be of any viscosity from gelatinous to watery. It can move at will by flowing through other liquids or along surfaces. It can even climb vertical surfaces"
    },
    {
        maxRoll: 96, name: "Energy", column: 5,
        bonusPowerCount: 2,
        bonusPowers: "Energy Emission\\Any\\Roll|Energy Control\\Any\Roll",
        description: "The hero is a field of coherent energy. The basis for this can be any Energy form found in the Energy Emission and Control sections.  "
    },
    {
        maxRoll: 97, name: "Ethereal", column: 1,
        description: "The hero is an intangible, disembodied spirit. He can be a ghost who once possessed a mortal shell, or belong to a race that always exists in this form. "
    },
    {
        maxRoll: 98, name: "Undead", column: 1, strengthAdjustment: 1, enduranceAdjustment: 1,
        description: "The being in question had once been a Normal Human (or any other species) but has since died. Through some arcane and possibly disgusting means, the body has regained animation and ceased to decay. The being's life force is once again in residence (although the old house just isn't the same). Special means are required to maintain the reunion of mind and body."
    },
    {
        maxRoll: 99, name: "Compound", column: -1, combinations: "2\\50(50)|3\\33(75)|4\\25(95)|5\\20(100)", popularityAdjustment: -1,
        description: "The hero's body contains aspects of two or more of the preceding Body Types. As such, it possesses a mixture of the advantages and disadvantages of each type."
    },
    {
        maxRoll: 100, name: "Changeling", column: 5,
        description: "The hero can transform into any of a number of possible Body Types. Each Body Type aspect of the Changeling possesses its regular advantages and disadvantages which apply only when the hero is in that particular form.  Each Aspect must have one Power which is unique to it, a Power no other Aspect has."
    }
];

const ORIGIN_ULTIMATE_TABLE = [
    { maxRoll: 10, name: "Natal", description: "The hero was born in the Body Type he has, and possessed all his Powers from birth onward (although learning to control them took time). " },
    { maxRoll: 20, name: "Maturity", description: "The hero gained his Powers sometime after reaching adulthood. Powers may have begun manifesting themselves sporadically during adolescence, or even childhood, but full control wasn't achieved until maturity. " },
    { maxRoll: 30, name: "Self-Achievement", description: "The hero actively sought out a means of giving himself Power. He developed the methods, procedures, equipment, or whatever permits him to possess Power. " },
    { maxRoll: 35, name: "Endowment", description: "The hero was given his Power by another being. This includes such diverse situations as being transformed, being charged with Power, and acquiring an item whose possession gives the hero Power." },
    { maxRoll: 50, name: "Technical Mishap", description: "GThe hero was caught in an experiment or procedure gone awry, with the result that the hero gained Powers that were totally unexpected. Such freak conditions cannot be completely duplicated, although they can be simulated." },
    { maxRoll: 60, name: "Technical Procedure", description: "The hero was the subject of a controlled scientific or magical experiment. Assuming that all the factors are reproduced, such a Technical Experiment should be able to produce a steady supply of super-powered heroes.  Unfortunately, the geniuses behind such experiments often leave inadequate notes." },
    { maxRoll: 65, name: "Creation", description: "The hero was born in the form he now has, that of an adult who possesses Power and/or whatever the Body Type is." },
    { maxRoll: 76, name: "Biological Exposure", description: "The hero gained Power after exposure to a special life-form or a substance secreted by that lifeform." },
    { maxRoll: 87, name: "Chemical Exposure", description: "The hero was transformed by exposure to an exotic element, compound, or mixture. This substance can be inhaled, ingested, injected, or just placed next to the hero for it to affect him." },
    { maxRoll: 98, name: "Energy Exposure", description: "The hero was exposed to a special form and Intensity of energy — anything out of the ordinary will do - and turned into his present self." },
    { maxRoll: 100, name: "Rebirth", description: "The hero was once a perfectly ordinary person. Then he died. Something happened to him that destroyed his old body and gave him a new one, complete with Power." }
];

const QUANTITY_ULTIMATE_TABLE = [
    { maxRoll: 12, powers: { initial: 1, maximum: 3 }, talents: { initial: 0, maximum: 3 }, contacts: { initial: 0, maximum: 2 } },
    { maxRoll: 26, powers: { initial: 2, maximum: 4 }, talents: { initial: 1, maximum: 4 }, contacts: { initial: 0, maximum: 4 } },
    { maxRoll: 41, powers: { initial: 3, maximum: 5 }, talents: { initial: 1, maximum: 6 }, contacts: { initial: 1, maximum: 4 } },
    { maxRoll: 55, powers: { initial: 4, maximum: 6 }, talents: { initial: 2, maximum: 4 }, contacts: { initial: 2, maximum: 4 } },
    { maxRoll: 66, powers: { initial: 5, maximum: 7 }, talents: { initial: 2, maximum: 6 }, contacts: { initial: 2, maximum: 6 } },
    { maxRoll: 75, powers: { initial: 2, maximum: 8 }, talents: { initial: 2, maximum: 8 }, contacts: { initial: 3, maximum: 3 } },
    { maxRoll: 83, powers: { initial: 7, maximum: 9 }, talents: { initial: 3, maximum: 4 }, contacts: { initial: 3, maximum: 4 } },
    { maxRoll: 89, powers: { initial: 8, maximum: 10 }, talents: { initial: 3, maximum: 6 }, contacts: { initial: 3, maximum: 6 } },
    { maxRoll: 94, powers: { initial: 9, maximum: 12 }, talents: { initial: 4, maximum: 8 }, contacts: { initial: 4, maximum: 4 } },
    { maxRoll: 97, powers: { initial: 10, maximum: 12 }, talents: { initial: 4, maximum: 4 }, contacts: { initial: 4, maximum: 5 } },
    { maxRoll: 99, powers: { initial: 12, maximum: 14 }, talents: { initial: 5, maximum: 6 }, contacts: { initial: 5, maximum: 5 } },
    { maxRoll: 100, powers: { initial: 14, maximum: 18 }, talents: { initial: 6, maximum: 8 }, contacts: { initial: 6, maximum: 6 } }
];

const WEAKNESS_STIMULUS_ULTIMATE_TABLE = [
    {
        maxRoll: 13, name: "Psychological",
        description: "A specific event, condition, or mental state has an adverse effect on the hero. This Stimulus directly affects the hero's mind; any resulting physical damage is psychosomatic in nature. That is, any physical damage results are due to the hero's instinctive belief in those results."
    },
    {
        maxRoll: 18, name: "Elemental Allergy",
        description: "The hero suffers adverse effects if he is exposed to a specific one of the hundred-odd elements. This Allergy only occurs if the element is present in a pure state and in an accumulation of at least one ounce."
    },
    {
        maxRoll: 43, name: "Molecular Allergy",
        description: "The hero suffers adverse effects if he is exposed to a specific molecules. This Allergy only occurs if the molecule is present in a pure state and in an accumulation of at least one ounce."
    },
    {
        maxRoll: 68, name: "Energy Allergy",
        description: "The hero suffers when he is exposed to a specific form of energy. This can be any wavelength or Intensity of energy found in the Energy Emission and Energy Control sections of this book."
    },
    {
        maxRoll: 81, name: "Energy Depletion",
        description: "The hero has a finite energy supply that permits him to manifest Power. This energy must be periodically renewed by means of rest, food, Energy Absorption, Energy Vampirism, or simply making contact with a source of that energy."
    },
    {
        maxRoll: 94, name: "Energy Dampening",
        description: "The hero has the problem of having to release the energy pent up within himself; this is done by using his Powers. "
    },
    {
        maxRoll: 100, name: "Finite Limit", requiredRankNumber: true,
        description: "All of the hero's Powers have a finite number of times they can be used. This is determined by a second, independent Power rank roll; this rank number is the number of uses remaining for that Power."
    },
];

const WEAKNESS_EFFECT_ULTIMATE_TABLE = [
    {
        maxRoll: 50, name: "Power Negation",
        description: "The hero's Powers cease to function when the hero is within 20 feet of the stimulus. "
    },
    {
        maxRoll: 90, name: "Incapacitation",
        description: "The hero becomes physically ill after exposure to the Stimulus. Beginning with the initial contact, the hero loses one point of Health per turn."
    },
    {
        maxRoll: 100, name: "Fatal",
        description: "As in the above, the hero gets ill after the initial exposure to the Stimulus. However, the Health loss does not stop at zero. "
    },

];

const WEAKNESS_DURATION_ULTIMATE_TABLE = [
    {
        maxRoll: 40, name: "Continuous with Contact",
        description: "As long as the hero remains within the effective range of the Stimulus, the Effect continues. When the hero is insulated or moved away from the Stimulus, the Effect immediately ceases. "
    },
    {
        maxRoll: 60, name: "Limited Duration with Contact",
        description: "The Effect begins immediately upon contact with the Stimulus. However, the Effect only functions for a limited amount of time. After that time elapses, the hero is assumed to have either built up a temporary immunity to the Stimulus or the Stimulus has discharged its Effect. "
    },
    {
        maxRoll: 90, name: "Limited Duration after Contact",
        description: "The Effect is continuous with Contact and also lasts for a limited time after the hero is no longer exposed to the Stimulus. "
    },
    {
        maxRoll: 100, name: "Permanent",
        description: "The Stimulus does its full damage to the hero, even when exposure to the Stimulus has been interrupted. In this case, the Stimulus sets off a bodily self-destruction sequence that must continue to its full extent."
    },
];

const POWER_CATEGORIES_ULTIMATE_TABLE = [
    { maxRoll: 5, name: "Defensive", code: "D" },
    { maxRoll: 11, name: "Detection", code: "DT" },
    { maxRoll: 16, name: "Energy Control", code: "EC" },
    { maxRoll: 24, name: "Energy Emission", code: "EE" },
    { maxRoll: 29, name: "Fighting", code: "F" },
    { maxRoll: 31, name: "Illusionary", code: "I" },
    { maxRoll: 35, name: "Lifeform Control", code: "L" },
    { maxRoll: 40, name: "Magic", code: "MG" },
    { maxRoll: 47, name: "Matter Control", code: "MC" },
    { maxRoll: 53, name: "Matter Conversion", code: "MCo" },
    { maxRoll: 57, name: "Matter Creation", code: "MCr" },
    { maxRoll: 71, name: "Mental Enhancement", code: "M" },
    { maxRoll: 85, name: "Physical Enhancement", code: "P" },
    { maxRoll: 88, name: "Power Control", code: "PC" },
    { maxRoll: 92, name: "Self-Alteration", code: "S" },
    { maxRoll: 100, name: "Travel", code: "T" }
];

const POWER_LIST_ULTIMATE_TABLE = [
    // Defensive (D)
    {
        category: "Defensive", code: "D1", maxRoll: 15, name: "Body Armor", powerCount: 1,
        description: "PThe hero possesses artificially-created armor that provides protection and possibly a way of possessing other Powers. Armor comes in many forms-exotic plate-mail, nuclear-powered exoskeletons, or mechanically-created force fields.  The player can also determine which Powers are possessed by the hero and which are properties of the armor. Powers built into the armor can later be modified and enhanced. If the hero gained the armor throughan accident, he might not be able to repair it. "
    },
    {
        category: "Defensive", code: "D2", maxRoll: 20, name: "Force Field", powerCount: 1,
        description: "The hero possesses a force field.  It provides protection against a variety of forces, including brute force, energy attacks, and extreme temperature conditions. It can be projected and used for a variety of Power stunts. The force field completely absorbs any attack which has an Intensity equal to or less than the Power's rank number. These cannot be used to physically attack or to handle solid materials. "
    },
    {
        category: "Defensive", code: "D3", maxRoll: 23, name: "Force Field vs. Emotion", powerCount: 1,
        description: "The hero has increased resistance to emotion-related attacks via a force field. The Field protects anyone within from attacks that are emotion-related or aimed at the Intuition, including Emotion Control, Hallucinations, and Domination. "
    },
    {
        category: "Defensive", code: "D4", maxRoll: 30, name: "Force Field vs. Energy", powerCount: 1,
        description: "The hero has an increased resistance to any emitted energy form, whether artificial, natural, or Power-based via a force field. When creating the hero, the player can raise his rank + 2CS by choosing a field that protects against a specific attack."
    },
    {
        category: "Defensive", code: "D5", maxRoll: 35, name: "Force Field vs. Magic", powerCount: 1,
        description: "The hero has increased resistance to magic based attacks, whether physical or mental in orientation via a force field."
    },
    {
        category: "Defensive", code: "D6", maxRoll: 40, name: "Force Field vs. Mental", powerCount: 1,
        description: "The hero has increased resistance to attacks aimed at the mind and neural system via force field.  It does not protect against emotion-based attacks or magical attacks."
    },
    {
        category: "Defensive", code: "D7", maxRoll: 48, name: "Force Field vs. Physical", powerCount: 1,
        description: "The hero has increased resistance to any physical attackvia a force field.  The field protects anything within from such things as brute force, hostile environments, temperature extremes, hazardous chemicals, and airborne infection. Note that while this Power will prevent hostile environments from harming the hero, it does not provide life support materials."
    },
    {
        category: "Defensive", code: "D8", maxRoll: 50, name: "Force Field vs. Power Manipulation", powerCount: 1,
        description: "The hero has increased resistance to attacks that directly affect the hero's Powers via a force field.  The field protects anyone within from any attacks that directly affect the hero's Powers, including Weakness Creation, Power Control, Power Domination, Magic Control, and Magician Domination."
    },
    {
        category: "Defensive", code: "D9", maxRoll: 53, name: "Force Field vs. Vampirism", powerCount: 1,
        description: "The hero has increased resistance to any vampiric-type attacks via a forcee field.  The field protects anyone within from any vampiric-type attacks. This includes the forms of Psi-, Bio-, Energy, Magic, and Power Vampirism."
    },
    {
        category: "Defensive", code: "D10", maxRoll: 65, name: "Reflection", powerCount: 1,
        description: "The hero can turn any attack back onto the attacker. The attack may be of any nature: brute force, Power, or magic. The Power absorbs the energy of the attack up to this rank and redirects it. Normally, this Power is consciously controlled and only appears when the hero wills it."
    },
    {
        category: "Defensive", code: "D11", maxRoll: 70, name: "Resist: Emotion", powerCount: 1,
        description: "The hero has increased resistance to emotion-related attacks. Such attacks include Emotion Control, Hallucinations, Domination, and attacks aimed at the Intuition. "
    },
    {
        category: "Defensive", code: "D12", maxRoll: 77, name: "Resist: Energy", powerCount: 1,
        description: "The hero has an increased resistance to any emitted energy form, whether artificial, natural, or Power-based. Such attacks include Light, Heat, Flame, Plasma, Hard radiation, Electricity, Vibration, Sonics, Cold, and Kinetic Bolts."
    },
    {
        category: "Defensive", code: "D13", maxRoll: 82, name: "Resist: Magic", powerCount: 1,
        description: "The hero has increased resistance to magic based attacks, whether physical or mental in orientation."
    },
    {
        category: "Defensive", code: "D14", maxRoll: 87, name: "Resist: Mental", powerCount: 1,
        description: "The hero has increased resistance to attacks aimed at the mind and neural system. Such attacks include psionics, neural manipulation, and any other attacks aimed at the Psyche. It does not include emotion-based attacks or magical attacks."
    },
    {
        category: "Defensive", code: "D15", maxRoll: 94, name: "Resist: Physical", powerCount: 1,
        description: "The hero has increased resistance to any physical attack. This includes brute force, chemical weapons, biochemicals, disease, hostile environments, and temperature extremes. "
    },
    {
        category: "Defensive", code: "D16", maxRoll: 97, name: "Resist: Power Manipulation", powerCount: 1,
        description: "The hero has increased resistance to attacks that directly affect the hero's Powers. Such attacks include Weakness Creation, Power Control, Power Domination, Magic Control, and Magician Domination. "
    },
    {
        category: "Defensive", code: "D17", maxRoll: 100, name: "Resist: Vampirism", powerCount: 1,
        description: "The hero has increased resistance to any vampiric-type attacks. Such attacks include forms of Psi-, Bio-, Energy, Magic, and Power Vampirism. "
    },

    // Detection (DT)
    {
        category: "Detection", code: "DT1", maxRoll: 2, name: "Abnormal Sensitivity", powerCount: 1,
        description: "The hero's senses function in their normal manner, but their normal range of sensitivity is altered. The senses detect what they normally cannot and cannot detect what they normally can. This affects either vision or hearing."
    },
    {
        category: "Detection", code: "DT2", maxRoll: 4, name: "Circular Vision", powerCount: 1,
        noRank: true,
        description: "The hero can see 360 degrees around himself. There are two ways to do this. The first is the hero's eyes are placed far enough apart that they can see in all directions. The second, more socially acceptable method is the hero possesses a weird light warping field that funnels light into his otherwise normal-looking eyes."
    },
    {
        category: "Detection", code: "DT3", maxRoll: 10, name: "Energy Detection", powerCount: 1,
        description: "The hero can detect and identify energy and related phenomena. The power can only detect actual energy, not potential energy. Likewise, while it can detect the energies consciously emitted by superhumans, it cannot detect the superhumans themselves."
    },
    {
        category: "Detection", code: "DT4", maxRoll: 14, name: "Environmental Awareness", powerCount: 1,
        description: "The hero has increased sensitivity to conditions in, disturbances in, and influences on the environment. The hero automatically maintains full knowledge of current conditions in his surroundings. This awareness extends to such factors as weather, chemicals, movement, and life."
    },
    {
        category: "Detection", code: "DT5", maxRoll: 20, name: "Extradimensional", powerCount: 1,
        description: "The hero can sense across the dimensional barrier and see things existing in other dimensions. The power rank number equals the number of different dimensions into which the hero can see."
    },
    {
        category: "Detection", code: "DT6", maxRoll: 28, name: "Hyper-Hearing", powerCount: 1,
        description: "The hero can detect extremely faint sounds and unusual frequencies. He can identify objects by the sounds they emit. Because of the sensitivity of the hero's hearing, he is more vulnerable to sonic attacks (which receive a + 1CS against him)."
    },
    {
        category: "Detection", code: "DT7", maxRoll: 34, name: "Hyper-Olfactory", powerCount: 1,
        description: "The hero can detect the presence of minute traces of substances and accurately identify them. This Power is continually functioning."
    },
    {
        category: "Detection", code: "DT8", maxRoll: 40, name: "Hyper-Touch", powerCount: 1,
        description: "The hero possesses an Enhanced sense of touch that permits him to detect extremely fine surface details and to identify materials by their surface \"feel.\""
    },
    {
        category: "Detection", code: "DT9", maxRoll: 42, name: "Life Detection", powerCount: 1,
        description: "The hero can detect the presence of life and identify the nature of that life. The hero can probe a specific target for more detailed physiological data on a red FEAT."
    },
    {
        category: "Detection", code: "DT10", maxRoll: 44, name: "Magic Detection", powerCount: 1,
        description: "The hero can detect and identify magic and its effects. The Power can detect both magic in actual use and in potential."
    },
    {
        category: "Detection", code: "DT11", maxRoll: 50, name: "Microscopic Vision", powerCount: 1,
        description: "The hero's eyes can focus on extremely minute targets, objects too small for normal vision to perceive. This Power functions in two stages. The first is light magnification; the hero's eyes function as normal microscopes. The second stage of this Power is a variation of Clairvoyance that permits the hero to see miniature, rather than distant, targets."
    },
    {
        category: "Detection", code: "DT12", maxRoll: 54, name: "Penetration Vision", powerCount: 1,
        description: "This is commonly called \"X-ray vision\" but may not actually use X-rays. The hero can see through solids; the effect is as if the obscuring material were transformed to clear glass."
    },
    {
        category: "Detection", code: "DT13", maxRoll: 56, name: "Power Detection", powerCount: 1,
        description: "The hero can detect and identify superhuman Powers. He can also identify specific superhumans by their characteristic Powers (an Unearthly FEAT). The hero can identify the presence of previously invoked power when examining former targets of Power on a Good Intensity FEAT."
    },
    {
        category: "Detection", code: "DT14", maxRoll: 58, name: "Psionic Detection", powerCount: 1,
        description: "The hero can detect and identify psionic Power and related phenomena. It can detect both actual psionics and the potential to use them."
    },
    {
        category: "Detection", code: "DT15", maxRoll: 59, name: "Radarsense", powerCount: 1,
        description: "The hero can gain a three-dimensional picture of his surroundings through the use of electromagnetic waves. The hero both emits and senses these waves. He can use the Power to locate and identify targets by their characteristic echoes."
    },
    {
        category: "Detection", code: "DT16", maxRoll: 60, name: "Sonar (Passive)", powerCount: 1,
        description: "The hero can gain a three-dimensional picture of his environment through the use of soundwaves. The Power allows the hero to locate and identify targets by the way they reflect sound."
    },
    {
        category: "Detection", code: "DT16", maxRoll: 62, name: "Sonar (Active)", powerCount: 1,
        description: "The hero can gain a three-dimensional picture of his environment through the use of soundwaves. The Power allows the hero to locate and identify targets by the way they reflect sound."
    },
    {
        category: "Detection", code: "DT17", maxRoll: 69, name: "Telescopic Vision", powerCount: 1,
        description: "The hero's eyes can focus on extremely distant targets, objects too small for normal vision to perceive. The eyes function as telescopes, magnifying normal visual images. With this Power, the hero can see anything in his line of sight, even the surfaces of distant worlds."
    },
    {
        category: "Detection", code: "DT18", maxRoll: 79, name: "Thermal Vision", powerCount: 1,
        description: "The hero can see infrared light and heat images. This allows the hero to see in the dark, perceive temperature differences, and partially see through solids. In the last case, the hero can only see the heat patterns of objects touching the other side of the barrier.  Thermal vision may be a consciously-activated mode or the hero's normal means of vision."
    },
    {
        category: "Detection", code: "DT19", maxRoll: 90, name: "Tracking", powerCount: 1,
        description: "The hero can detect and follow the tracks left by a specific target. The hero can detect environmental and spatial disturbances with the result that at high ranks the hero can actually track across deep space."
    },
    {
        category: "Detection", code: "DT20", maxRoll: 94, name: "True Sight", powerCount: 1,
        description: "The hero can see the correct image of a target, despite any attempts at concealment or disguise. This Power can penetrate any means of hiding something's true nature, whether physical, psionic, illusionary, or powerbased. The Power may be automatic or deliberate. If automatic, the hero gains +1CS but loses - 2CS from his Psyche rank."
    },
    {
        category: "Detection", code: "DT21", maxRoll: 98, name: "UV Vision", powerCount: 1,
        description: "The hero can see ultraviolet light. Because UV light isn't as readily absorbed by water as normal light, this Power enables the hero to see clearly through fog and at a greater distance in the water (+ 1CS). The hero can also see the dim light given off by radioactive materials."
    },
    {
        category: "Detection", code: "DT22", maxRoll: 100, name: "Weakness Detection", powerCount: 1,
        description: "The hero can detect flaws and stress points in a target. This doesn't guarantee he can exploit this knowledge, though."
    },

    // Energy Control (EC)
    {
        category: "Energy Control", code: "EC1", maxRoll: 7, name: "Absorption Power",
        powerCount: 1,
        description: "The hero can absorb a specific type of energy and actually gain Health points by converting the energy into Self-Healing. The hero gains a number of Health points equal to his Power rank number each time he is hit by his specific form of absorbable energy. This addition to Health quickly heals any damage the hero had suffered and acts as a buffer to absorb consequent damage. If the hero possesses an Energy Emission Power, he cannot use it directly to affect himself."
    },
    {
        category: "Energy Control", code: "EC2", maxRoll: 10, name: "Catalytic Control",
        powerCount: 1,
        description: "The hero can control the speed at which chemical reactions occur. He can increase or decrease the energies emitted or drained in such reactions by his Power rank number."
    },
    {
        category: "Energy Control", code: "EC3", maxRoll: 15, name: "Coldshaping",
        powerCount: 1,
        bonusPowers: "Cold Generation",
        optionalPowers: "Thermal Control|Condensation|Molding|Body Coating",
        description: "The hero can control any force that actively decreases the temperature of something else. This can be used to increase or decrease the cold's Intensity by this Power's rank number. There are two primary functions to this Power. The first is to counteract or supplement cold-based Powers.  The hero can also redirect such Powers. The hero can shape fields of intense cold and produce useful results."
    },
    {
        category: "Energy Control", code: "EC4", maxRoll: 18, name: "Darkforce Manipulation",
        powerCount: 1,
        description: "The hero can generate and control the extra-dimensional energy-form known as \"Darkforce\". This resembles a tangible, impenetrable shadow."
    },
    {
        category: "Energy Control", code: "EC5", maxRoll: 25, name: "Electrical Control",
        powerCount: 1,
        description: "The hero can control all forms of electricity, whether natural, artificial, or Power-based. He can control the Intensity and direction of electron streams and alter the conductivity of materials. He can shape electron streams into any desired form. "
    },
    {
        category: "Energy Control", code: "EC6", maxRoll: 28, name: "Energy Conversion",
        powerCount: 1,
        description: "The hero can simply change any form of energy into any other form. The player must determine the characteristics for the secondary Power he gains by taking Energy Conversion."
    },
    {
        category: "Energy Control", code: "EC7", maxRoll: 31, name: "Energy Solidification",
        powerCount: 1,
        optionalPowers: "any Energy",
        description: "The hero can transform energy into a matrix that simulates solid matter. This matrix may be any shape the hero desires, although greater complexity requires a higher Intensity FEAT to create."
    },
    {
        category: "Energy Control", code: "EC8", maxRoll: 36, name: "Energy Sponge",
        powerCount: 1,
        description: "The hero can absorb any form of energy, whether natural or Power-based, and not suffer any damage. This stored energy can be released at any time the hero desires. The hero may also choose to harmlessly dissipate the energy over a long period. If he attempts to absorb more than his limit, he may suffer physical damage."
    },
    {
        category: "Energy Control", code: "EC9", maxRoll: 38, name: "Energy Vampirism",
        powerCount: 1,
        description: "The hero can drain the energy from a target and convert that energy into extra Strength, Endurance, Psyche, and other Powers he possesses. Powers that do not emit energy cannot be affected by this Power. The drained energy is added in equal amounts to the Vampire's Strength, Endurance, Psyche, and any other Powers he possesses. The exception is this Power; no Vampire of any type can increase his own Power.  Energy Vampirism is communicable."
    },
    {
        category: "Energy Control", code: "EC10", maxRoll: 45, name: "Fire Control",
        powerCount: 1,
        optionalPowers: "FireGEneration|Thermral Control|Energy Sheath|Energy Body",
        description: "The hero can control existing flames, whether natural or Power-based. He can alter any factor involved in combustion without direct physical contact. The hero can increase or decrease the flame's Intensity up to his Power rank and reduce fire damage by his rank number. This Power includes Power rank Resistance to Fire and Heat. The most important aspect of this Power is enabling the hero to reshape flame into any form he desires."
    },
    {
        category: "Energy Control", code: "EC11", maxRoll: 49, name: "Gravity Manipulation",
        powerCount: 1,
        description: "The hero can control gravity, the force that attracts all particles to all other particles. Gravity always exists wherever there is tangible matter. This effect may be centered on himself or projected onto a target."
    },
    {
        category: "Energy Control", code: "EC12", maxRoll: 53, name: "Hard Radiation Control",
        powerCount: 1,
        optionalPowers: "Hard Radiation Emission|Energy Doppleganger|Energy Sheath|Energy Body|Energy Sustenance",
        description: "The hero can control existing radiation, including X-rays, alpha, beta, gamma, and cosmic rays. The hero can increase or decrease theradiation's Intensity, up to his Power rank, and reduce the damage done by radiation up to his Power rank number. The hero can direct the flow of radiation and can alter its nature by converting any form of radiation to any other form."
    },
    {
        category: "Energy Control", code: "EC13", maxRoll: 59, name: "Kinetic Control",
        powerCount: 1,
        bonusPowers: "Telekinesis or Kinetic Bolt",
        optionalPowers: "Telekinesis or Kinetic Bolt",
        description: "The hero can control the energy of motion itself. He can increase or decrease kinetic energy's Intensity by his Power rank number.  He can impart momentum as if he physically pushed the target.  The primary purpose of Kinetic Control is to control Telekinesis and Kinetic Bolts. "
    },
    {
        category: "Energy Control", code: "EC14", maxRoll: 66, name: "Light Control",
        powerCount: 1,
        optionalPowers: "Light Generation|Energy Sheath|Carrier Wave|Illusion Casting.",
        description: "The hero can manipulate existing light. This can be visible, infrared, or ultraviolet light. The hero can alter the intensity, frequency (color, in other words), and coherence of light. The hero can actually change the direction of light and form crude holograms."
    },
    {
        category: "Energy Control", code: "EC15", maxRoll: 73, name: "Magnetic Manipulation",
        powerCount: 1,
        description: "The hero can control magnetic force. He can increase or decrease magnetism's Intensity by his Power rank number. He can use existing magnetism, whether natural or Power-based, to perform any desired task.  He can shape the field into forms to produce any effect."
    },
    {
        category: "Energy Control", code: "EC16", maxRoll: 77, name: "Plasma Control",
        powerCount: 1,
        optionalPowers: "Plasma Generation|Energy Doppelganger|Energy Sheath|Energy Body",
        description: "The hero can control fields of highly-charged particles. The hero can increase or decrease the plasma's Intensity and reduce its damage by his Power rank number. The Power has two main uses. The first is shaping plasma fields into any shape desired.  The second use of Plasma Control enables the hero to counteract plasma related Powers."
    },
    {
        category: "Energy Control", code: "EC17", maxRoll: 80, name: "Radiowave Control",
        powerCount: 1,
        bonusPowers: "Radiowave Generation",
        optionalPowers: "Energy Doppelganger|Energy Sheath|Carrier Wave",
        description: "The hero can control existing radiowaves, whether AM, FM, or microwaves. The hero can increase or decrease the radiowaves' Intensity by his Power rank number. The Power really comes into its own when used as a form of electronic age Illusion-Casting. That is, the hero creates complex signals that simulate an actual broadcast."
    },
    {
        category: "Energy Control", code: "EC18", maxRoll: 84, name: "Shadowshaping",
        powerCount: 1,
        bonusPowers: "Shadowcasting",
        optionalPowers: "Light Control|Energy Sheath|Energy Body",
        description: "This Power enables the hero to affect normal shadows and, indirectly, light as well. The hero can shift the location and size of normal shadows. He can form them into two-dimensional images that can do Power rank damage to real targets. The hero can also Remote Sense through these shadow-constructs. "
    },
    {
        category: "Energy Control", code: "EC19", maxRoll: 90, name: "Sound Manipulation",
        powerCount: 1,
        bonusPowers: "Sound Generation",
        optionalPowers: "Vibration|Vibration Control",
        description: "The hero can control existing sound. This also provides the hero with Resistance to sound-based Powers."
    },
    {
        category: "Energy Control", code: "EC20", maxRoll: 97, name: "Thermal Control",
        powerCount: 1,
        optionalPowers: "Heat Generation|Fire Generation|Cold Generation|Fire Control|Coldshaping",
        description: "The hero can control applied heat or cold; that is, he can control any force that actively changes the temperature of something else. This includes any source of heat or cold, whether natural, artificial, or Powerbased. The Power overlaps both Heat and Cold Generation but it also differs from them in that this Power cannot alter the natural temperature of a target of alter the local temperature to suit the hero's whim."
    },
    {
        category: "Energy Control", code: "EC21", maxRoll: 100, name: "Vibration Control",
        powerCount: 1,
        optionalPowers: "Vibration|Sonic Generation|Sound Manipulation",
        description: "The hero can control existing vibrations. These may be natural or Power-based. The hero can increase or decrease the Intensity of the vibration by his Power rank number."
    },

    // Energy Emission (EE)
    {
        category: "Energy Emission", code: "EE1", maxRoll: 10, name: "Cold Generation", powerCount: 1,
        optionalPowers: "Coldshaping, Condensation, Solidification, and Molding",
        description: "This Power is the pure form of Ice Generation and one it is often confused with. The hero can emit a field that decreases thermal energy and infra-red radiation. The Power decreases the temperature of the target. The only limitation is that the temperature cannot drop lower than absolute zero ( - 273 degrees Celsius or - 459.4 degrees Fahrenheit). The power has the side-effect of cooling the air between the hero and the target."
    },
    {
        category: "Energy Emission", code: "EE2", maxRoll: 20, name: "Electrical Generation", powerCount: 1,
        description: "The hero can create electrical streams that can do Power rank damage. The hero can project the electricity through any conductive medium, such as air, water, or metal, at Power rank range. "
    },
    {
        category: "Energy Emission", code: "EE3", maxRoll: 22, name: "Energy Doppelganger", powerCount: 1,
        description: "The hero can generate an Energy Body from his own body. This Doppelganger can have Powers of its own, including those characteristic to the type of energy of which the Doppelganger is composed. The Doppelganger automatically has the Power of True Flight. While the player can decide which Powers are possessed by whom, a rule of thumb is that the majority of physical Powers are assigned to the Doppelganger. The player must also decide whether the Doppelganger is simply an extension of the hero's will or if it has an independent, but obedient, mind. Normally the hero can generate only one Doppelganger at a time."
    },
    {
        category: "Energy Emission", code: "EE4", maxRoll: 34, name: "Fire Generation", powerCount: 1,
        description: "The hero can project fire with Power rank damage and range. These flames have no apparent fuel source and spring from the hero as if he were a living fuel tank. Although the flames' fuel comes out of the proverbial nowhere, free oxygen must be present for the Power to function. This has to be the most dangerous Power around. "
    },
    {
        category: "Energy Emission", code: "EE5", maxRoll: 37, name: "Hard Radiation", powerCount: 1,
        description: "This covers the dangerous section of the energy spectrum: ultraviolet light, x-rays, and alpha and beta particles, gamma rays, and the ever-popular \"cosmic rays\". The hero can project any of these types at Power rank range and damage. "
    },

    {
        category: "Energy Emission", code: "EE6", maxRoll: 42, name: "Heat", powerCount: 1,
        description: "The hero can generate pure heat that is not necessarily accompanied by light or flame by accelerating molecular motion. This permits the hero to do rank level effects over target materials. Because this Power uses pure heat, it can function in conditions that negate Flame Emission, like the absence of free oxygen or the hero's being underwater."
    },
    {
        category: "Energy Emission", code: "EE7", maxRoll: 52, name: "Kinetic Bolt", powerCount: 1,
        optionalPowers: "Kinetic Control and Telekinesis",
        description: "This is a crude form of M30/Telekinesis. The hero can strike a target with a surge of force at Power rank range and damage. The Kinetic Bolt can be shaped as desired by the hero. It can be a wide cylinder, or an incredibly fine needle. Its effect is the same as if the target had been struck by a solid object of equal material strength."
    },
    {
        category: "Energy Emission", code: "EE8", maxRoll: 62, name: "Light Emission", powerCount: 1,
        description: "The hero can emit powerful bursts of light do Power rank damage at rank range. The light may be of any nature."
    },
    {
        category: "Energy Emission", code: "EE9", maxRoll: 72, name: "Magnetism", powerCount: 1,
        description: "The hero can generate intense magnetic force. The magnetic field may be centered on the hero's body or be projected at rank range. The field can affect anything susceptible to magnetism, attracting it with Power rank Strength. The hero can induce magnetism into any materials that can sustain a magnetic field."
    },
    {
        category: "Energy Emission", code: "EE10", maxRoll: 75, name: "Plasma Generation", powerCount: 1,
        description: "The hero can generate plasma.  Plasma refers here to a field of highly-charged particles. Common examples include the aurora borealis, the glow in a fluorescent tube, the Van Allen Belt, and the heart of a nuclear blast. Plasmas may be of any nature: fiery, magnetic, electrical, radioactive, or be of a previously unknown form of energy. This last group includes many super-powers, living energy fields, and beings who can transform themselves into pure energy. "
    },
    {
        category: "Energy Emission", code: "EE11", maxRoll: 78, name: "Radiowave Generation", powerCount: 1,
        optionalPowers: "Radiowave Control, Energy Sheath, and Carrier Wave",
        description: "The hero can generate radiowaves, including AM and FM signals and microwaves. This Power primarily affects broadcasting and electronics; the Power can do rank damage over rank range to these. The Power can also be used to directly affect any target by internally heating it through microwave bombardment."
    },
    {
        category: "Energy Emission", code: "EE12", maxRoll: 83, name: "Shadowcasting", powerCount: 1,
        optionalPowers: "Shadowshaping and Darkforce Manipulation",
        description: "The hero can emit a field that decreases light and radiation. The obscured energy's Intensity is lowered by the Power's rank taken as Intensity. The energy forms that can be affected by this Power are Light, Heat, Hard Radiation, Radiowaves, Energy Doppelgangers, and Energy Bodies. "
    },
    {
        category: "Energy Emission", code: "EE13", maxRoll: 93, name: "Sonic Generation", powerCount: 1,
        optionalPowers: "Sonic Control, Vibration, and Vibration Control",
        description: "The hero can generate intense sound and make attacks of Power rank range and damage. This Power can generate frequencies normally inaudible. The hero can disrupt other sound-based Powers by creating dissonance as his harmonics clash with the second Power's harmonics."
    },
    {
        category: "Energy Emission", code: "EE14", maxRoll: 100, name: "Vibration", powerCount: 1,
        optionalPowers: "Vibration Control and Sonic Gener",
        description: "The hero can generate non-audible vibrations. These can alter existing harmonics, effectively negating any sonic- or vocal-based Power. The hero can cause tremors at Power rank range and damage. The Power can even be used to incapacitate living targets; effects can vary from motion sickness (nausea and vomiting) to death by internal hemmorhaging. "
    },

    // Fighting (F)
    {
        category: "Fighting", code: "F1", maxRoll: 20, name: "Berserker", powerCount: 1,
        description: "The hero can enter into a battle rage that alters the hero in some significant ways. Reason and Psyche plummet to Feeble rank while the ranks for Strength and Fighting increase by the same number of ranks. The hero also develops Iron Will for the duration of the Berserker rage.  When the rage ends, all the altered Abilities return to their original ranks. Since the Iron Will also disappears, the hero finally feels the effects of any damage he suffered while in the Berserker rage."
    },
    {
        category: "Fighting", code: "F2", maxRoll: 60, name: "Martial Supremacy", powerCount: 1,
        optionalPowers: "Iron Will and Weapons Creation",
        description: "This Power increases the hero's already-mastered Martial Arts to dramatically higher levels and allows him to perform actions that would otherwise be impossible."
    },
    {
        category: "Fighting", code: "F3", maxRoll: 75, name: "Natural Weaponry", powerCount: 1,
        description: "The hero's body contains special anatomical features that can function as weapons. These may be of any nature and can be external, internal, or retractable. If these are damaged the hero suffers as if they were normal body parts. When creating the hero, the player decides the nature of the weaponry."
    },
    {
        category: "Fighting", code: "F4", maxRoll: 80, name: "Weapons Creation", powerCount: 1,
        description: "The hero can create any desired weapon out of thin air. The weapon can be of any design, size, and material. The size of the weapon is limited by its weight. The hero can only create in a single turn a maximum number of ounces equal to his Power rank number. Heavier weapons have to be assembled in pieces over a span of several turns. The lifespan of the weapon is determined at the time of creation.  The hero must have detailed knowledge of any weapon he wants to create. He can only store a limited number of weapons' designs in his memory."
    },
    {
        category: "Fighting", code: "F5", maxRoll: 100, name: "Weapons Tinkering", powerCount: 1,
        description: "The hero can devise and assemble any weapon that can be made with the available materials. Provided he has the resources, the hero can assemble a functional copy of any weapon."
    },

    // Illusory (I)
    {
        category: "Illusionary", code: "I1", maxRoll: 15, name: "Animate Image", powerCount: 1,
        optionalPowers: "either Telescopic Vision or Clairvoyance, Energy Solidification, and either Elemental or Molecular Creation",
        description: "This is a specialized form of Illusion-casting that enables the hero to apparently bring any flat image to life. Whatever the original nature of the image- drawing, painting, photograph, print— the image gains three dimensionality and independent movement. A blank white area now fills the area formerly occupied by the newly solidified Image. The hero has to be able to clearly see both the Image and its surroundings. When either is beyond his vision, the believability of the Image drops drastically. When the Image gets beyond the hero's field of clear vision, he can no longer make it realistically conform to the surroundings."
    },
    {
        category: "Illusionary", code: "I2", maxRoll: 70, name: "Illusion Casting", powerCount: 1,
        optionalPowers: "Energy Solidification, Telescopic Vision, and Clairvoyance",
        description: "The hero can create realistic holographic images that have apparent solidity. These Illusions can be mechanically detected and recorded by such means as photography or television. The Illusion can take any size or appearance the hero desires and is limited only by his imagination . The Illusion can be a realistic simulation, a fanciful creation direct from the hero's mind, or an abstract display of light. The hero is playing with light itself and can create anything that is visible. Since most people depend on vision to gain information on their surroundings, this Power presents the awesome ability to apparently alter the nature of reality."
    },
    {
        category: "Illusionary", code: "I3", maxRoll: 85, name: "Illusory Invisibility", powerCount: 1,
        optionalPowers: "Light Control and Light Emission",
        description: "This is not true Invisibility but is actually a clever simulation. The effects are nearly the same, anyway; the hero becomes effectively invisible to any living or artificial being. The hero actually remains visible but he can now surround himself witha holographic Illusion of empty space. This field can be limited to the hero's body or increased to cover a large area. Within the Illusory Invisibility, things remain visible. From the point of view of anyone within the Power's protection, it appears that the area has been surrounded by a irregularly-shaped transparent balloon that causes weird tricks of light. Outside the \"balloon\" a viewer sees only the Illusion of empty space, even if the viewer has just stepped out of the invisibility field. The \"empty space\" is only what the hero imagines such an empty space to look like. As the hero tries to hide more area, the problems of realism multiply. If the Illusory Invisibility and the viewer move in relationship to each other, the viewer might be able to detect a slight distortion of light at the edge of the field. Since the Invisibility is holographic in nature, it can be mechanically detected and recorded by such means as photography, television, and the mechanical senses of artificial beings. It can also be seen at any distance and will deceive telescopes, remote cameras, and Telescopic Visionbused outside the field's effect. Simple physical contact can alert a viewer to the hero's presence, whether the hero accidentally envelops him in the field or the hero makes a distance attack at the target. A spray of a coating material will temporarily reveal the extent of the field; in the middle of an obscuring cloud, the field shows as a silhouette of clear air."
    },
    {
        category: "Illusionary", code: "I4", maxRoll: 100, name: "Illusory Duplication", powerCount: 1,
        description: "This is a specialized form of Illusion-Casting that permits the hero to generate completely realistic simulations of a single object, namely himself. Unlike the other Illusory Powers, this permits the hero to see through these nonexistent senses and to communicate through apparently normal speech. The hero can create a finite number of exact holographic duplicates of himself. These are Illusions based on his self image, which the hero had best make sure matches his actual appearance at that moment. Although Duplicates are frequently used to surround the hero and act as decoys, the Duplicates can also function several areas or miles away from the hero."
    },

    // Lifeform Control (L)
    {
        category: "Lifeform Control", code: "L1", maxRoll: 14, name: "Biophysical Control", powerCount: 1,
        description: "The hero has the ability to consciously alter the physiology of a target. This is accomplished by sheer force of will and does not require any physical action on the hero's part, aside from touching the target. The Power can be used at a distance but each 10 feet separating the hero from the target reduces his effective Power by -1CS. The Power is normally concentrated on a single target, but the hero can affect as many targets as he desires. The result of any form of this Power is permanent. "
    },
    {
        category: "Lifeform Control", code: "L2", maxRoll: 15, name: "Bio-Vampirism", powerCount: 1,
        bonusPower: "Power of Mind Control/Puppetry",
        description: "The character is a super-carnivore able to increase his Strength, Endurance, Psyche, and Power ranks by consuming living biological materials. The most common examples of Bio-Vampires are the traditional blood-suckers like Dracula. As a new type of Bio-Vampire, your character need not follow the traditional abilities and limitations associated with the old Vampires. The Bio-Vampire must feed in order to maintain his life. Even if the Bio-Vampire is deprived of victims, he never actually starves to death. Bio-Vampirism is communicable."
    },
    {
        category: "Lifeform Control", code: "L3", maxRoll: 18, name: "Body Transformation-Others", powerCount: 1,
        description: "The hero can alter the nature of elements and compounds within a living target's body. Innate safe-guards in the Power maintain the target's lifeforce for as long as the target is in the altered state. Such states are not necessarily mobile, but if they are, they may require the target to move in new ways. While in a solid altered state, the target retains his overall normal appearance. If liquid or gaseous, he can assume any shape but can still automatically revert to his original shape when the Power's effects end."
    },
    {
        category: "Lifeform Control", code: "L4", maxRoll: 26, name: "Emotion Control", powerCount: 1,
        description: "The hero can alter a target's emotional state and resulting activity by forcing him to feel a particular emotion. The hero can only instill one emotion at a time. However, he can select any emotion he desires. The Power affects everyone within its range. "
    },
    {
        category: "Lifeform Control", code: "L5", maxRoll: 32, name: "Exorcism", powerCount: 1,
        description: "The hero can release a being from any external domination imposed by a third party. Such controls include Possession, Mental Domination, Serial Immortality, and Magic. If there's a control, this Power can break it. "
    },
    {
        category: "Lifeform Control", code: "L6", maxRoll: 34, name: "Force Field vs. Hostiles", powerCount: 1,
        description: "The hero emits a psionicaura that repels any hostile lifeforms. The Power automatically probes the minds of anyone in the area and analyzes their intentions toward the hero. Anything harmful is repulsed. Neutral or friendly life is not affected by this field. The field is ineffective against cybernetic life. The field protects the hero from melee weapons or slugfest, but not from projected or missile weapons."
    },
    {
        category: "Lifeform Control", code: "L7", maxRoll: 35, name: "Forced Reincarnation", powerCount: 1,
        description: "The hero can capture disembodied spirits and merge them into new bodies. The spirits can be the newly-dead, ghosts, or Free Spirits. The bodies can be anything— newborn infants, clones, androids, robots, animals, or plants. Because of the Power's interference, the reincarnated person retains his full memories and Mental Powers. The spirit is permanently bonded to the new body for as long as that body lives, unless the bond is deliberately broken by the spirit or by a hero with Exorcism Power."
    },
    {
        category: "Lifeform Control", code: "L8", maxRoll: 39, name: "Grafting", powerCount: 1,
        description: "The hero can perform psionically augmented surgery on a subject. The hero can operate on, dissect, rearrange, and perform transplants without the need for normal medical techniques to ensure success. No matter how crude the conditions in which the operation is performed or how messy it proves to be, the subject's lifeforce is preserved. There is no major blood loss nor is there any need for extensive recuperation.  "
    },
    {
        category: "Lifeform Control", code: "L9", maxRoll: 51, name: "Hypnotic Control", powerCount: 1,
        description: "The hero can dominate a target's behavior and actions by implanting commands, not by direct psionic control. The Hypnotic command  may pertain to current conditions or lie dormant until triggered by future conditions (post-hypnotic suggestion). "
    },
    {
        category: "Lifeform Control", code: "L10", maxRoll: 60, name: "Mind Control", powerCount: 1,
        description: "The hero has the ability to directly control a target's mind through psionic Powers. The hero completely overrides the will and perhaps even the conscious mind of the target. "
    },
    {
        category: "Lifeform Control", code: "L11", maxRoll: 62, name: "Mind Transferral", powerCount: 1,
        description: "The hero has the ability to switch minds from one body to another. The hero's own mind and body need not be included in any switching. The Power operates much like Mental Duplication, in that the hero reshapes the brains of his targets to conform to those he is switching. The accuracy of such transfers is 100%. Because of the nature of this Power, the hero can also transfer one mind into several people simultaneously, with each believing he is the real person. Transferral switches mental abilities, Talents, and mental Powers. Physical Powers are not transferred, nor are physical abilities, Popularity, Resources, or Contacts."
    },
    {
        category: "Lifeform Control", code: "L12", maxRoll: 65, name: "Neural Manipulation", powerCount: 1,
        description: "The hero can alter a target's neural activity. By changing nerve messages within the target's body, the hero can cause a variety of effects: Disruption, Paralysis, Seizure, and Exaggeration."
    },
    {
        category: "Lifeform Control", code: "L13", maxRoll: 66, name: "Plague Carrier", powerCount: 1,
        description: "The hero can contain within his body and release at will a variety of disease-causing microorganisms (bacteria, germs, viruses). The hero is immune to any disease— otherwise he'd have died as soon as he gained this dubious Power - but he can instantly infect others at will with diseases of his choosing. Curiously, victims are not themselves contagious to others. This Power does have a beneficial side. Because of the hero's special ability to control microbes, he can actually cure others of disease."
    },
    {
        category: "Lifeform Control", code: "L14", maxRoll: 69, name: "Plant Control", powerCount: 1,
        description: "The hero can impart limited movement and self-awareness to normally unintelligent plants. The plants obey simple commands, and possess rudimentary communication and senses. The hero can accelerate the plants' growth somewhat, but cannot make it exceed normal limits on size or shape."
    },
    {
        category: "Lifeform Control", code: "L15", maxRoll: 71, name: "Plant Growth", powerCount: 1,
        description: "The hero has the ability to make plants grow nearly instantaneously, and far larger than normal. The Power can force a seed to sprout immediately and gives it the ability to thrive, even in the absence of normal nutrients (light, soil, and water). The hero can affect existing plants and seeds or use seeds and sprouts carried with him. This Power does not change the natural abilities of the affected plants."
    },
    {
        category: "Lifeform Control", code: "L16", maxRoll: 80, name: "Sense Alteration", powerCount: 1,
        description: "The hero can deliberately change the manner in which a target either receives sensory stimuli or processes it within the brain. The simplest form negates one or more of the senses, producing instant blindness, deafness, numbness, and so on. More complex is the ability to modify the senses."
    },
    {
        category: "Lifeform Control", code: "L17", maxRoll: 83, name: "Shapechange-Others", powerCount: 1,
        description: "The hero has the ability to change the shapes of other living beings. The result can take any shape and appearance the hero wishes: animal, vegetable, mineral. The target's basic physiology remains unchanged despite the apparent differences between the original and new forms. When Shapechanging a target, the hero must make sure that the new form still allows basic life functions to continue (especially breathing!).  When creating the hero, the player can opt to exchange one of his randomly generated Powers for L2/Body Transformation-Others."
    },
    {
        category: "Lifeform Control", code: "L18", maxRoll: 89, name: "Sleep-Induced", powerCount: 1,
        description: "The hero has the ability to put any target into a deep sleep, from which he cannot awake while the Power is in effect. During this induced sleep, the target is completely helpless. "
    },
    {
        category: "Lifeform Control", code: "L19", maxRoll: 90, name: "Spirit Storage", powerCount: 1,
        description: "The hero can capture and indefinitely hold within himself any number of disembodied spirits. Such spirits find themselves within a pocket dimension of the hero's creation; while within it, they retain asemblance to their original forms. This pocket dimension can have any appearance. The hero can freely communicate with any spirits held within. He is immune to any attempts they might make to possess his body."
    },
    {
        category: "Lifeform Control", code: "L20", maxRoll: 95, name: "Summoning", powerCount: 1,
        description: "The hero can summon and control extra-dimensional, corporeal beings. Such beings are commonly called \"demons\" but may be of any nature or disposition. The Power enables the hero to summon any known extra-dimensional being. The summoned being is instantly teleported from its home dimension to a spot chosen by the hero. Once summoned, the being must perform a single task ordered by the hero. The being must immediately set about fulfilling the order. If successful, he can immediately depart for his home dimension.  This Power summons one being at a time. "
    },
    {
        category: "Lifeform Control", code: "L21", maxRoll: 100, name: "Undead Control", powerCount: 1,
        description: "he hero can dominate the wills and actions of previously living, still-corporeal beings. Such beings are often called \"zombies\" or \"zuvembies\" and are only semi-intelligent. Once control is established, the hero can order the undead to perform any task he desires, so long as it is within their ability. Control ceases when the task is accomplished, but can be reinstated at that time. This Power cannot affect anything alive. "
    },

    // Magic (MG)
    {
        category: "Magic", code: "MG1", maxRoll: 8, name: "Enchantment", powerCount: 1,
        description: "The Mage is able to invest a target with Magical Power. The target must be a non-sentient being or even non-living matter. The Mage is able to turn the Enchanted item into a battery that can harmlessly store Magic. Any spell stored within the item can be retained indefinitely in a state of readiness until the spell is somehow released. The Mage can store any spell he already possesses with the sole exception of this Power; a Mage cannot Enchant something that will then Enchant something else later on. Enchantment can store any number of spells, within the limit imposed by Enchantment's rank number. Optional Powers include Elemental Conversion, Molecular Conversion, and Molding. Nemeses include Force Field vs. Magic, Resistance to Magic, Magic Control, or Magic Domination."
    },
    {
        category: "Magic", code: "MG2", maxRoll: 15, name: "Energy Source", powerCount: 0,
        description: "The Mage draws his Magic from a special source that provides him with all the raw Power he needs. As long as the Mage can maintain his link with his Source, he can continue to use the Magic it provides. The nature of the Source and the link vary by individual case. If the source is small enough, the Mage might be required to carry it with him. If not, perhaps the Mage has to simply return to the Source at regular intervals or forge a mystical \"silver cord\" that ties him to the Source, regardless of the intervening distance. If the link is severed or the Source destroyed, the Mage is left with a finite supply of Magic."
    },
    {
        category: "Magic", code: "MG3", maxRoll: 17, name: "Internal Limbo", powerCount: 1,
        description: "The Mage can create a pocket dimension whose gateway is his own body. This is a timeless space of near-infinite volume. The Mage can shape conditions within the Internal Limbo and create an yenvironment he desires. The Mage can also control the basic attitudes and emotions of any being within this Limbo. The Emotion-altering aspect of Internal Limbo functions as +6CS Emotion Control. If the Mage possesses such Powers as Energy Doppelganger, Illusory Duplication, Lifeform Creation, Free Spirit, Anatomical Separation, Self-Duplication, or Astral Body, then he can send a part or a representation of himself into his little world while the rest of himself stays in the outer world. Without such an ability, the Mage is limited to only basic awareness of conditions within the Internal Limbo. Optional Powers includes any one of the following— Energy Doppelganger, Illusory Duplication, Lifeform Creation, Free Spirit, Anatomical Separation, Self Duplication, and Astral Body."
    },
    {
        category: "Magic", code: "MG4", maxRoll: 25, name: "Magic Control", powerCount: 1,
        description: "The Mage can alter the behavior of pure Magic itself, whether it is in a raw or applied state. The Mage can control the actions of any Magic within his range and capabilities.  The Power can be made to affect either a specific type of spell or all the spells of specific Mage. In the first case, Control is exerted over all spells of the chosen type within the Mage's range, regardless of how many other Mages are affected. In the second case, Control is exerted over a particular Magical adversary and affects all the spells that Mage possesses."
    },
    {
        category: "Magic", code: "MG5", maxRoll: 28, name: "Magic Creation", powerCount: 1,
        description: "The Mage has the ability to create new Magical Powers and invest them into sentient beings for their own use. The new Magic can be of any nature, including any of the listings in this book, so long as they are treated as Magical rather than normal Powers. The Magical Powers she confers are nowhere near as high ranked as those the Mage possesses. Optional Powers include Hyper Intelligence and Total Memory."
    },
    {
        category: "Magic", code: "MG6", maxRoll: 33, name: "Magic Domination", powerCount: 1,
        description: "This is a form of Mind Control. The Mage can control the actions of other Mages in regards to the casting and use of Magic spells. The Mage acts as a Puppetmaster who can control the physical actions but not the conscious mind of his victim. The Mage can force his puppet to cast any Magic he possesses in any way the controlling Mage desires. The Mage cannot control the actual characteristics of the puppet Mage's Magic. Optional Powers include Mind Control and Power Domination."
    },
    {
        category: "Magic", code: "MG7", maxRoll: 39, name: "Magic Transferral", powerCount: 1,
        description: "The Mage can transfer some or all of her Magic to another sentient being. Only this Power cannot be transferred. Any combination of Powers and ranks can be transferred. The rank of each spell decreases the rank for that spell still held by the Mage. Optional Powers include Mind Transferral and Power Transferral."
    },
    {
        category: "Magic", code: "MG8", maxRoll: 41, name: "Magic Vampirism", powerCount: 1,
        description: "The Mage-Vampire can drain the Magical energy from a target and convert that Magic into extra Strength, Endurance, Psyche, and any other Magic or Powers he possosses.  The Mage-Vampire can force a nonliving, non-sentient Magical item or being to release all its raw Magic. A drained item is now nothing but a collection of normal materials. Magical beings may be hurt or destroyed if the Magic was an intrinsic part of their physiology. If not, they are now normal, powerless creatures. Living or sentient beings are harder to drain because they possess a Psyche."
    },
    {
        category: "Magic", code: "MG9", maxRoll: 71, name: "Power Simulation", powerCount: 0,
        description: "This is not an actual Magical Power. What it is is a Magical version of any Power in the Ultimate Powers Book. Once this Magical Power appears and the player rolls again to gain an actual Power, any other Powers the player gains should also be considered to be Magical in nature."
    },
    {
        category: "Magic", code: "MG10", maxRoll: 77, name: "Reality Alteration", powerCount: 1,
        description: "The Mage can reshape time itself in order to achieve a desired situation. Optional Powers include Precognition for Alter Future, Clairvoyance for Alter Present, and Retrocognition for Alter Past."
    },
    {
        category: "Magic", code: "MG11", maxRoll: 79, name: "Spirit Vampirism", powerCount: 1,
        description: "The Mage can drain the Intuition and Psyche from a target and use the absorbed energy to increase his own Strength, Endurance, Psyche, and other Powers he possesses. Spirit Vampires lose energy at a dreadful rate. Their rank numbers for Strength, Endurance, Psyche, and all their Powers except this one drop one point per hour. The Spirit Vampire must feed in order to bring these back to at least their original levels. Even if deprived of victims, a Spirit Vampire will not starve to death. Spirit Vampirism is communicable. The Optional Power is concurrent BioVampirism."
    },
    {
        category: "Magic", code: "MG12", maxRoll: 95, name: "Sympathetic Magic", powerCount: 1,
        description: "This is a combination of certain Mental and Life Control Powers. Sympathetic Magic requires the Mage make an Effigy of his target as a way of directing the Power to that target. The Effigy can be of any quality of workmanship, from a crude wax doll to an exquisitely detailed full portrait in oil paints; however, the Effigy must incorporate a cast-off body part, excretion, or possession of the target. Once the Effigy is created, any action that affects that Effigy will also affect the target. Once the Effigy is made, it can be used over and over again to effect the target. Effigies can affect any living or sentient being. Sympathetic Magic can be used against Robots, Computers, Cyborgs, rock-men, gas-women, and so on, provided the rules are followed."
    },
    {
        category: "Magic", code: "MG13", maxRoll: 100, name: "Warding", powerCount: 1,
        description: "The Mage can create areas of latent Power in any desired location. The Ward is designated by a special substance or mark. The mage decides what specific Powers the Ward possesses and what the triggering stimulus will be. When that stimulus occurs, the Ward releases all its power is a single turn, generally in the direction of whatever created the stimulus. The triggering mechanism can be any condition stated by the Mage at the time of creation. Once created, Wards last until they are depleted or destroyed. The presence of a Ward can be revealed by either Energy, Magic, Power, or Psionic Detection."
    },

    // Matter Control (MC)
    {
        category: "Matter Control", code: "MC1", maxRoll: 5, name: "Bonding", powerCount: 1,
        description: "The hero has the ability to join two or more targets together on a molecular level. The effect is the same as if the targets were glued or welded together. In actuality, the hero has induced molecular adhesion. The Bonding is so powerful that attempting to sever its effect results in physical damage to either of the Bonded targets because the only way to forcibly separate two Bonded objects is to tear the surface of one or both of them. This is a Power that readily combines with many of the other listings in this book. The Power can only affect solids. Liquid, gaseous, ethereal, and Phasing matter are immune to this Power's effects.  Optional Powers include Missile Creation, Spray, Webcasting, and Weapons Tinkering."
    },
    {
        category: "Matter Control", code: "MC2", maxRoll: 17, name: "Collection", powerCount: 1,
        description: "The hero can cause any desired material to collect in a specific location. This material must already be present and diffused throughout the hero's vicinity, whether in the air, water, soil, or scattered across the ground. Optional Powers include Crystallization, Matter Animation, MicroEnvironment, Molding, Weather, Combustion, Elemental Conversion, and Molecular Conversion."
    },
    {
        category: "Matter Control", code: "MC3", maxRoll: 22, name: "Crystallization", powerCount: 1,
        description: "The hero can transform any target material into a gemlike material that possesses Power rank material strength. Crystallization occurs because the hero has the ability to shape the molecular bonds of normally amorphous matter into a crystal matrix of great strength. The Crystallization can occur at any site within the hero's line of sight and range. The newly-formed Crystal is initially stationary. Crystal can be formed in any shape the hero desires. Optional Powers include Weapons Creation (limited to Crystal weapons only), Collection, Matter Animation, Missile Creation, and Spray. "
    },
    {
        category: "Matter Control", code: "MC4", maxRoll: 29, name: "Diminution", powerCount: 1,
        description: "The hero can reduce the size of a target. The target must be in line of sight and within one area of the hero. Any material can be Diminished by this Power with the sole exception of material that has already been Diminished by an equal or higher rank of this Power. "
    },
    {
        category: "Matter Control", code: "MC5", maxRoll: 39, name: "Disruption", powerCount: 1,
        description: "The hero can destroy a target's physical structure without resorting to a physical or overt energy attack. The molecular bonds that give a target its solidity are directly Disrupted, with the result that the target collapses into dust, sand, liquid, or even vapor. "
    },
    {
        category: "Matter Control", code: "MC6", maxRoll: 46, name: "Enlargement", powerCount: 1,
        description: "The hero can increase the size of any target. The target can be of any nature and must be within both line-of-sight and one area of the hero's location. Any material can be enlarged with one exception; the Power cannot affect any target that has already been Enlarged by another Power of equal or greater rank. "
    },
    {
        category: "Matter Control", code: "MC7", maxRoll: 51, name: "Geoforce", powerCount: 1,
        description: "The hero can detect and control geological forces. These include plate movement, stress, faults, and vulcanism. This Power only applies to natural rock and semi-natural materials such as concrete, cement, and asphalt. Radically altered material (steel, plastic) is not directly affected by the Power. "
    },
    {
        category: "Matter Control", code: "MC8", maxRoll: 61, name: "Matter Animation", powerCount: 1,
        description: "The hero can alter the flow of any raw matter, impart movement to stationary matter, and shape such matter into any desired form. The Power can only affect matter that is in a relatively natural state. "
    },
    {
        category: "Matter Control", code: "MC9", maxRoll: 68, name: "Machine Animation", powerCount: 1,
        description: "The hero can control the movement of anything mechanical. It is as if the hero were a combination remote-control panel and power source. The machines can only perform those functions for which they were designed. While under the influence of the Power, the affected machines can function even in the absence of a normal power supply, such as would be provided by an electric cord, wound spring, or miniature nuclear generator. The only new function the hero can give a machine is limited ground movement. Optional Powers include Communication with Cybernetics, Communication with Non-Living Matter (limited to machines only), and Matter Animation."
    },
    {
        category: "Matter Control", code: "MC10", maxRoll: 73, name: "Micro-Environment", powerCount: 1,
        description: "The hero can alter his immediate surroundings to create a miniature climate around himself. The Micro-Environment always contains fresh clean air (or water or methane or whatever the hero breathes) at any temperature and pressure the hero desires. The Micro-Environment incorporates a Force Field that protects it from any factor that might harm or even annoy the hero, such as rain, poisonous gases, extreme temperatures, or the pressure that naturally results from having three miles of ocean over your head."
    },
    {
        category: "Matter Control", code: "MC11", maxRoll: 83, name: "Molding", powerCount: 1,
        description: "The hero can shape any solid material into any desired shape. The shaped material retains its original chemical nature. If the target is living, its internal anatomy is rearranged in such a way that permits life to continue without loss of Health. The new shape can be of any complexity; even intricate machines can be created if the proper materials are available. Molded targets retain their basic Material Strength. Optional Powers include Elemental and Molecular Conversion, Collection, and Crystallization."
    },
    {
        category: "Matter Control", code: "MC12", maxRoll: 93, name: "Weather", powerCount: 1,
        description: "The hero has complete control over the weather. He can sense those factors in the air that create weather and alter any aspect of them at his desire. Any of these factors can produce both physical and psychological effects on humans. He can control temperature. Optional Powers include Environmental Awareness and either True Flight, Whirlwind, or Gliding."
    },
    {
        category: "Matter Control", code: "MC13", maxRoll: 100, name: "Zombie Animation", powerCount: 1,
        description: "This is a macabre Power that is definitely more at home in the horror genre than in the heroic genre. The hero, um…..well, the character with this Power can Animate any previously living body. Normally, the Power is used to Animate relatively intact cadavers, since these are capable of a greater variety of actions. Part of the Power is used to halt the process of decay and to maintain the structural integrity of the remaining body parts.  This Power is not Biophysical Control/ Revival. The Zombies are not alive.  The popular misconception is that Zombies are inherently evil. This is not true. Zombies are only a reflection of their Animator's personality.  Optional Powers include Extradimensional Detection (limited to detecting spirit realms), Forced Reincarnation, Summoning (Spirits only), Undead Control, and Communication with Non-living Matter."
    },

    // Matter Conversion (MCo)
    {
        category: "Matter Conversion", code: "MCo1", maxRoll: 10, name: "Coloration", powerCount: 1,
        description: "The hero has total control over the coloration and color transmitting abilities of any target substance, whether solid. liquid, or gaseous. This Power enables the hero to alter basic physics and the chemical properties of any target. The Power operates in either of these two modes. In the first mode, the hero can consciously alter the frequency and intensity of light itself. The second operating mode for the Power is altering the physical coloration of the target material. Optional Powers include Light Control."
    },
    {
        category: "Matter Conversion", code: "MCo2", maxRoll: 25, name: "Combustion", powerCount: 1,
        description: "The hero has the ability to transform any target into combustible material. Once this Power has been used, spontaneous combustion occurs. Only the surface layer of matter is converted by this Power. Optional Powers include Fire Generation and Control."
    },
    {
        category: "Matter Conversion", code: "MCo3", maxRoll: 45, name: "Disintegration", powerCount: 1,
        description: "This is the ever popular but never explained \"Disintegrator Ray.\" The hero has the ability to convert any matter into pure energy, usually Light although the player can specify another resultant energy when he first creates the character. The energy dissipates harmlessly and does not affect anyone in the vicinity. "
    },
    {
        category: "Matter Conversion", code: "MCo4", maxRoll: 70, name: "Elemental Conversion", powerCount: 1,
        description: "The hero can convert any matter into a specific element. The matter to be converted can be any one element or a combination of elements. The resulting element can be any of the hundred-odd natural, artificial, and mythical elements.  Optional Powers include Matter Animation and Molding."
    },
    {
        category: "Matter Conversion", code: "MCo5", maxRoll: 80, name: "Ionization", powerCount: 1,
        description: "The hero has the ability to change the state of energy in a target."
    },
    {
        category: "Matter Conversion", code: "MCo6", maxRoll: 100, name: "Molecular Conversion", powerCount: 1,
        description: "The hero can transform any material into a desired compound. This Power is an enhanced version of Elemental Conversion. Whereas that Power could only create a single specified element, this Power can create a number of elements simultaneously and arrange them in a desired molecular configuration. Optional Powers include Matter Animation and Molding."
    },

    // Matter Creation (MCr)
    {
        category: "Matter Creation", code: "MCr1", maxRoll: 10, name: "Artifact Creation", powerCount: 1,
        description: "The hero can create a desired object from virtually nothing. The artifact can be of any substance, and is limited to being composed of a single piece. Although the Power can create facsimilies of more complex construction, close examination reveals that all the smaller pieces are fused together. However, the hero can create complex items by forming them one piece at a time. The hero must have detailed knowledge of the design of whatever he wants to create. He can only store a finite number of designs in his mind at any one time. The hero can materialize the artifact at any site within one area. The artifact is initially stationary. The hero can create facsimilies of living matter, but such facsimilies are not themselves capable of living.  Optional Powers include a form of Matter Animation that is limited to matter created by the hero, and Hyper Intelligence."
    },
    {
        category: "Matter Creation", code: "MCr2", maxRoll: 24, name: "Elemental Creation", powerCount: 1,
        description: "The hero can create pure elements from virtually nothing. The hero can create any desired element in any shape or at any location within one area. Optional Powers include Matter Animation (any single form) and Mechanical Animation."
    },
    {
        category: "Matter Creation", code: "MCr3", maxRoll: 29, name: "Lifeform Creation", powerCount: 1,
        description: "The hero can create living matter and even complete bio-organisms from virtually nothing. The new life can be of any nature, although it can only possess Powers that are intrinsic to its physical structure. The hero can materialize his creation at any site within one area. The new life is initially stationary but can immediately begin to move under its own power. Optional Powers include forms of Telepathy, Mental Domination, Animal Control, and Plant Control, all limited to lifeforms created by the hero."
    },
    {
        category: "Matter Creation", code: "MCr4", maxRoll: 35, name: "Mechanical Creation", powerCount: 1,
        description: "The hero can create complex mechanical devices from virtually nothing. The newly created machine originally forms in one mass, then separates into its components. Heavier machines have to be assembled in several turns. The hero can materialize the machine at any site within one area. The machine is initially stationary but if it is self powered, it can immediately begin to move on its own.  The Power cannot create actual living beings.  Optional Powers include a form of Mechanical Animation limited to those machines created by the hero, HyperIntelligence, and Hyper-Invention."
    },
    {
        category: "Matter Creation", code: "MCr5", maxRoll: 59, name: "Missile Creation", powerCount: 1,
        description: "The hero can spontaneously create and launch projectiles. These are propelled to Power rank range. Missiles that simply slam into a target act as Stunning Missiles and inflict Stunning attacks of Power rank Intensity. If the hero has other Powers, these are combined with this Power to produce missiles with specific effects.  The hero has a finite ammo supply, even if he creates the missiles as he goes.  This limit also applies to Technological versions of this Power, in that the gun/wand/whatever simply overheats from repeated use."
    },
    {
        category: "Matter Creation", code: "MCr6", maxRoll: 69, name: "Molecular Creation", powerCount: 1,
        description: "This is a more powerful form of Elemental Creation. The hero can form several elements simultaneously and form them into any desired compound. The hero can form this on any target within one area. Each ounce the hero creates temporarily costs him one point of Health.  Optional Powers include Matter Animation in any single form and Mechanical Animation."
    },
    {
        category: "Matter Creation", code: "MCr7", maxRoll: 88, name: "Spray", powerCount: 1,
        description: "The hero can spontaneously create a directed cloud of gas, mist, or dust. The Spray has a range of up to one area. The main purpose of Spray is combining it with other Powers, thereby producing unique Spray Powers for the hero.  If a character is High Tech, has rolled such Powers as Hyper-Invention or Weapons Tinkering, or possesses a magical device, then the Spray Power should be incorporated into a device. "
    },
    {
        category: "Matter Creation", code: "MCr8", maxRoll: 100, name: "Webcasting", powerCount: 1,
        description: "The hero can generate and shot out a solid web. The web can hit any target within 100 feet and instantly adhere to it. The Web has some basic properties. It can ensnare anyone within the target site. It possesses Power rank Strength upon hardening after being fired. It can be used to form swing-lines that enable the hero to travel 3 areas per turn, and it makes shields of Monstrous material strength. The hero has a finite amount of Webbing he can produce. Webs created by this Power evaporate one hour after being cast."
    },

    // Mental Enhancement (M)
    {
        category: "Mental Enhancement", code: "M1", maxRoll: 4, name: "Clairaudience", powerCount: 1,
        description: "The hero can \"hear\" distant sounds and voices despite any intervening distance or barriers. The Power is not hindered by factors that affect normal sound transmission, such as distance, time lag, muffling, distortion, or the absence of a transmitting medium. Because of this, Clairaudience has superior range over Hyper-Hearing. The Power is normally a voluntary Power that must be summoned.  The Optional Powers for this are Hyper-hearing, Clairvoyance, and Remote Sensing."
    },
    {
        category: "Mental Enhancement", code: "M2", maxRoll: 8, name: "Clairvoyance", powerCount: 1,
        description: "The hero can \"see\" distant sights without directly seeing it with his eyes. The hero receives a visual simulation of what he would see if he were actually present at the scene. The Power is not hindered by any of the factors that affect normal light transmission, such as distance, blockage, obscurement, and time lag. It can be used to see things that are impossible for a telescope or Telescopic Vision.  Normally the Power is consciously controlled.  Optional Powers include Clairaudience and Remote Sensing."
    },
    {
        category: "Mental Enhancement", code: "M3", maxRoll: 11, name: "Communicate with Animals", powerCount: 1,
        description: "The hero can understand and use the languages employed by animals and other non-sentient lifeforms. The Power can be used to communicate with non-sentient alien creatures but not intelligent aliens. Optional Powers include Linguistics and any of the Communication Powers."
    },
    {
        category: "Mental Enhancement", code: "M4", maxRoll: 12, name: "Communicate with Cybernetics", powerCount: 1,
        description: "The hero can directly communicate with complex machines, whether these are computers or machines not normally considered to have artificial intelligence. Any machine that possesses any kind of programming can be communicated with-calculators, digital watches, microwave ovens, even music boxes.  The Optional Power is Linguistics."
    },
    {
        category: "Mental Enhancement", code: "M5", maxRoll: 13, name: "Communicate with Non-Living", powerCount: 1,
        description: "This is a catch-all name for anything not covered by the other Communication Powers (M3, M4, M6). It will enable the hero to communicate with anything that had once been either sentient, cybernetic, or alive, as long as the target lacks those qualities now.  Optional Powers include Communications with Cybernetics."
    },
    {
        category: "Mental Enhancement", code: "M6", maxRoll: 15, name: "Communicate with Plants", powerCount: 1,
        description: "The hero can speak with plants. Anything that has a vegetable physiology can be affected by this Power, such as grass, and trees. Optional Powers include Communication with Animals, Communication with Non-living Matter, Plant Control, and Plant Growth."
    },
    {
        category: "Mental Enhancement", code: "M7", maxRoll: 16, name: "Cosmic Awareness", powerCount: 1,
        description: "The hero is in tune with the entire scope of reality. He possesses a detached, omniscient viewpoint that allows him to explore the entire existence of a chosen subject. Unfortunately, this causes such a massive overload of superfluous information that the hero is hard pressed to sort it all out.  The Optional Power is HyperIntelligence."
    },
    {
        category: "Mental Enhancement", code: "M8", maxRoll: 22, name: "Danger Sense", powerCount: 1,
        description: "This is also called Combat Sense. It is a combination of automatically functioning Psionic Powers (Telepathy, Empathy, and Precognition) that warns the hero about impending danger."
    },
    {
        category: "Mental Enhancement", code: "M9", maxRoll: 23, name: "Dreamtravel", powerCount: 1,
        description: "The hero can actually enter into the short-lived pocket dimensions created by a person's dreams and nightmares. These dream worlds are outside the boundaries of normal reality and exist solely as a reflection of the dreamer's imagination. The Dreamtraveler must be within ten feet of the dreamer in order for the Power to function at full rank.  The Dreamtraveler can suffer real damage as a result of events that affect him within the dreamworld. He might even die. Dreamworlds are not the same as the Dream Dimension. The Optional Power is a form of Telepathy limited to dreamers."
    },
    {
        category: "Mental Enhancement", code: "M10", maxRoll: 26, name: "Empathy", powerCount: 1,
        description: "The hero can detect the surface emotions of others. The hero can detect the target's emotional state and further refine that knowledge to discover the target's physical state, surroundings, and location, in-so-far as these have an influence on the emotions. He can transmit his own emotional state but he cannot impose this on others. Optional Powers include Clairvoyance and Emotion Control."
    },
    {
        category: "Mental Enhancement", code: "M11", maxRoll: 27, name: "Free Spirit", powerCount: 1,
        description: "The hero's soul is capable of independent existence in the real world. The Free Spirit can leave the hero's body and travel independently; it is often mistaken for an Astral Body. The Free Spirit can even survive the death of the physical body without being immediately drawn into an afterlife dimension. Free Spirits possess all the Mental Abilities, Talents, and Powers of the whole being. "
    },
    {
        category: "Mental Enhancement", code: "M12", maxRoll: 31, name: "Hallucinations", powerCount: 1,
        description: "The hero can create illusions directly within the target's mind. Such illusions are telepathic, not holographic, in nature. As such, they cannot be mechanically detected or recorded except by devices that simulate Telepathy or human thought patterns. Hallucinations can only be seen by the target of this Power.  The hero can use one additional Power simultaneously with this one."
    },
    {
        category: "Mental Enhancement", code: "M13", maxRoll: 40, name: "Hyper-Intelligence", powerCount: 1,
        description: "Normally a character's Intelligence is determined in the Character Generation Process. The hyper-intelligent character is a genius of awesome potential. He can quickly master new subjects, retain that knowledge indefinitely, and easily succeed in any mental endeavor. Optional Powers include Hyperinvention and Total Memory."
    },
    {
        category: "Mental Enhancement", code: "M14", maxRoll: 47, name: "Hyper-Invention", powerCount: 1,
        description: "This is a special form of Hyper-intelligence that is common enough to merit its own classification. It is a permanent enhancement of the hero's overall intelligence that is channeled into the field of mechanical design and engineering. The hero is an Edison-like genius who take existing materials and technologies and use them to create new devices or applied technologies. He can repair previously operational devices, even if the device was of anunknown type. The hero can learn new technologies at a rate determined by his rank, the complexity of the technology, and the amount of instruction available. Optional Powers include Weapons Tinkering, Machine Animation, Molding, Artifact Creation, and Machine Creation."
    },
    {
        category: "Mental Enhancement", code: "M15", maxRoll: 48, name: "Incarnation Awareness", powerCount: 1,
        description: "This Power is based on the idea that a spirit enters countless reincarnations throughout eternity but that the memory of each past life is usually lost somewhere in the transition from one life to another. This Power allows the hero to remember the details of his more recent lives and to actually communicate with them. Such communications include the transmission of the complete range of senses and thoughts.  The Optional Powers include either Time Travel limited to any past lifetime, a combination of Time Travel and Free Spirit that enables the present-self to possess the bodies of other selves, or a specialized form of Time Travel that enables the present self to draw other selves from their times to the present."
    },
    {
        category: "Mental Enhancement", code: "M16", maxRoll: 58, name: "Iron Will", powerCount: 1,
        description: "The hero has complete conscious control over his mind and body. By using his Iron Will, the hero can temporarily halt the damage done by mental or physical attacks; he can even postpone his own death. Iron Will can be used in place of any lower-ranked Ability to determine Resistance to an attack."
    },
    {
        category: "Mental Enhancement", code: "M17", maxRoll: 65, name: "Linguistics", powerCount: 1,
        description: "This is a specialized form of Hyper-intelligence. The hero has the ability to rapidly learn any language if sufficient material is available for him to work with. Once the language is mastered, the hero is fluent in that language, provided he is physically capable of communicating in it. The Optional Power is Hyperintelligence."
    },
    {
        category: "Mental Enhancement", code: "M18", maxRoll: 66, name: "Mental Duplication", powerCount: 1,
        description: "This is a combination of Powers that enables the hero to psionically study a subject's mind and then create a simulation of that mind within the hero's own brain. This is a great way to learn secrets and interrogate subjects who would otherwise be rather uncooperative. The duplicated mind contains the personality of the original, most memories, and possibly the mental or psionic Powers of the original. The subject is unaffected by the Power and loses none of his own mental abilities.  Optional Powers include Mind Drain and Power Duplication."
    },
    {
        category: "Mental Enhancement", code: "M19", maxRoll: 67, name: "Mental Invisibility", powerCount: 1,
        description: "The hero has the ability to render his own mental energies undetectable by external means. Such means can be technological (EEG scans), psionic, Magical, or Power-based in nature. It is Invisibility in telepathic terms. The Power protects the hero from discovery by outside forces."
    },
    {
        category: "Mental Enhancement", code: "M20", maxRoll: 69, name: "Mental Probe", powerCount: 1,
        description: "The hero can telepathically probe a living mind or a psionic phenomenon to gain a detailed analysis of the target. Living minds can be searched for specific images and thoughts, although the hero must have a basic idea beforehand of what she is looking for.  Optional Powers include Telepathy and Sensory Link."
    },
    {
        category: "Mental Enhancement", code: "M21", maxRoll: 72, name: "Mind Blast", powerCount: 1,
        description: "The hero can create bolts of pure psionic energy that can be used to directly damage a target's neural system.  Optional Powers include Telepathy and Mental Probe."
    },
    {
        category: "Mental Enhancement", code: "M22", maxRoll: 73, name: "Mind Drain", powerCount: 1,
        description: "The hero can deplete, negate, or even destroy a target's mental faculties. This alters the target's personality, memory, thought process (Reason and Intuition), and any Mental or Psionic Powers the target had.  Optional Powers include Telepathy, Mental Probe, Mental Duplication, and Mind Blast."
    },
    {
        category: "Mental Enhancement", code: "M23", maxRoll: 74, name: "Postcognition", powerCount: 1,
        description: "The hero has the ability to \"see\" the past. The Power requires the hero to have physical contact with the target whose history is being examined. The hero can mentally examine a person, item, or site and mentally re-live a specific moment of history from the target's point-of-view. As such, it only reveals factors that somehow affected the target. Postcognition can be used to gain information on what an item is and who may have handled it. It cannot provide a detailed analysis of the item's internal structure or as-yet-unrealized potential.  Optional Powers include modified forms of Telepathy and Time Travel."
    },
    {
        category: "Mental Enhancement", code: "M24", maxRoll: 75, name: "Precognition", powerCount: 1,
        description: "The hero can see into the future. The Power gives the hero sufficiently clear insight into upcoming events that he might be able to use that foreknowledge to his advantage. Precognition is an awesome Power and thus has more limits than the Hulk can shake a stick at.  The Power can normally be used only once per day at full rank. Second, the player must choose a limitation on the Power. Short-range Precog can be useful in combat. The hero can use his Power to discover his opponent's next move.  Optional Powers include modified forms of Telepathy and Time Travel."
    },
    {
        category: "Mental Enhancement", code: "M25", maxRoll: 76, name: "Psionic Vampirism", powerCount: 1,
        description: "The Psi-vampire can drain the mental energies of his victim. He then uses the purloined energy to increase his own Strength, Endurance, Psyche, and his own Power's rank. The Psi-vampire distributes the gained energy among his Strength, Endurance, Psyche, and whatever Powers he has. Psi-vampires lose energy at a frightful rate. The rank numbers for Strength, Endurance, Psyche, and all his Powers (except this one) each drop one point per hour. The Psi-vampire must feed in order to return the affected Abilities to their original ranks. "
    },
    {
        category: "Mental Enhancement", code: "M26", maxRoll: 78, name: "Remote Sensing", powerCount: 1,
        description: "This is a catch-all name for any Power that enables the hero to psionically extend the range of any sense. The senses include taste, smell, touch, balance (including gravity sensing), and temperature. The exceptions are sight and hearing. Optional Powers include additional forms of this Power, Clairaudience, and Clairvoyance."
    },
    {
        category: "Mental Enhancement", code: "M27", maxRoll: 79, name: "Sensory Link", powerCount: 1,
        description: "The hero can telepathically link his senses with those of another being. He can use the information gained from the other's senses as if it came from the hero's own senses.  The Power is crucial to sense-impaired characters.  An Optional Power is Telepathy."
    },
    {
        category: "Mental Enhancement", code: "M28", maxRoll: 80, name: "Serial Immortality", powerCount: 1,
        description: "A character with this Power can suffer damage, get sick, age, and even die. None of it is permanent to the character, though. When the hero's body dies from any cause, the unique nature of his lifeforce enables it to transfer to a new body. He can also transfer some but not all of his Powers to the new body."
    },
    {
        category: "Mental Enhancement", code: "M29", maxRoll: 81, name: "Speechthrowing", powerCount: 1,
        bonusPower: "Clairaudience",
        description: "This is best described as \"super-ventriloquism.\" Although it is radically different in execution from the Talent of Ventriloquism, the effect at low levels is similar.  Simply put, the hero can make his voice audible in a distant location, without the vocal soundwaves actually traveling the intervening distance. The Power is actually a specialized form of Telekinesis which allows the hero to agitate the distant molecules in a way that simulates sound transmission. Optional Powers include Clairvoyance, Vocal Control, Hyper-hearing, and Sensory-Link."
    },
    {
        category: "Mental Enhancement", code: "M30", maxRoll: 85, name: "Telekinesis", powerCount: 1,
        description: "The hero can handle material objects without having to make direct or indirect physical contact. The hero can perform any action that could be accomplished using normal Strength.  Optional Powers include Matter Animation, Molding, Clairvoyance, Remote Sensing/ Touch, Levitation, and True Flight."
    },
    {
        category: "Mental Enhancement", code: "M31", maxRoll: 86, name: "Telelocation", powerCount: 1,
        description: "The hero can Psionically locate a chosen target. This differs from normal Tracking in that no physical or sensory contact, however tenuous, is required. Consequently, the Power is not hampered by the concealment, erasure, or absence of the target's \"scent.\" Telelocation can operate over immense distances.  Optional Powers include Clairvoyance (limited to already located quarries) and Extradimensional Detection (whichautomatically combines with this Power to extend its range into other dimensions)."
    },
    {
        category: "Mental Enhancement", code: "M32", maxRoll: 96, name: "Telepathy", powerCount: 1,
        description: "The hero can communicate on a direct mind-to-mind basis. This is automatic with willing minds or Psyches with ranks lower than the Power rank. Optional Powers include Empathy, Hallucinations, Mental Invisibility, Mental Probe, Mind Blast, Mind Drain, Sensory Link, and Psionic Detection."
    },
    {
        category: "Mental Enhancement", code: "M33", maxRoll: 100, name: "Total Memory", powerCount: 1,
        description: "The hero has the ability to remember anything that he has ever experienced. This could be a book he's read, the faces of everyone he saw on Tuesday, what birth was like, and so on. Optional Powers include HyperInvention, Hyper-intelligence, and Weapons Tinkering."
    },

    // Physical Enhancement (P)
    {
        category: "Physical Enhancement", code: "P1", maxRoll: 14, name: "Armor Skin", powerCount: 1,
        description: ""
    },
    {
        category: "Physical Enhancement", code: "P2", maxRoll: 28, name: "Body Resistance", powerCount: 1,
        description: ""
    },
    {
        category: "Physical Enhancement", code: "P3", maxRoll: 30, name: "Chemical Touch", powerCount: 1,
        description: ""
    },
    {
        category: "Physical Enhancement", code: "P4", maxRoll: 33, name: "Digestive Adaptation", powerCount: 1,
        description: ""
    },
    {
        category: "Physical Enhancement", code: "P5", maxRoll: 40, name: "Hyper-Speed", powerCount: 1,
        description: ""
    },
    {
        category: "Physical Enhancement", code: "P6", maxRoll: 42, name: "Hypnotic Voice", powerCount: 1,
        description: ""
    },
    {
        category: "Physical Enhancement", code: "P7", maxRoll: 45, name: "Lung Adaptability", powerCount: 1,
        description: ""
    },
    {
        category: "Physical Enhancement", code: "P8", maxRoll: 47, name: "Pheromones", powerCount: 1,
        description: ""
    },
    {
        category: "Physical Enhancement", code: "P9", maxRoll: 60, name: "Regeneration", powerCount: 1,
        description: ""
    },
    {
        category: "Physical Enhancement", code: "P10", maxRoll: 62, name: "Self-Revival", powerCount: 1,
        description: ""
    },
    {
        category: "Physical Enhancement", code: "P11", maxRoll: 67, name: "Self-Sustenance", powerCount: 1,
        description: ""
    },
    {
        category: "Physical Enhancement", code: "P12", maxRoll: 71, name: "Stealth", powerCount: 1,
        description: ""
    },
    {
        category: "Physical Enhancement", code: "P13", maxRoll: 76, name: "Suspended Animation", powerCount: 1,
        description: ""
    },
    {
        category: "Physical Enhancement", code: "P14", maxRoll: 78, name: "True Invulnerability", powerCount: 1,
        description: ""
    },
    {
        category: "Physical Enhancement", code: "P15", maxRoll: 82, name: "Vocal Control", powerCount: 1,
        description: ""
    },
    {
        category: "Physical Enhancement", code: "P16", maxRoll: 90, name: "Waterbreathing", powerCount: 1,
        description: ""
    },
    {
        category: "Physical Enhancement", code: "P17", maxRoll: 100, name: "Water Freedom", powerCount: 1,
        description: ""
    },

    // Power Control (PC)
    {
        category: "Power Control", code: "PC1", maxRoll: 8, name: "Control", powerCount: 1,
        description: ""
    },
    {
        category: "Power Control", code: "PC2", maxRoll: 12, name: "Creation", powerCount: 1,
        description: ""
    },
    {
        category: "Power Control", code: "PC3", maxRoll: 18, name: "Domination", powerCount: 1,
        description: ""
    },
    {
        category: "Power Control", code: "PC4", maxRoll: 23, name: "Duplication", powerCount: 1,
        description: ""
    },
    {
        category: "Power Control", code: "PC5", maxRoll: 37, name: "Energy Source", powerCount: 1,
        description: ""
    },
    {
        category: "Power Control", code: "PC6", maxRoll: 39, name: "Energy Source Creation", powerCount: 1,
        description: ""
    },
    {
        category: "Power Control", code: "PC7", maxRoll: 49, name: "Focus", powerCount: 1,
        description: ""
    },
    {
        category: "Power Control", code: "PC8", maxRoll: 55, name: "Gestalt", powerCount: 1,
        description: ""
    },
    {
        category: "Power Control", code: "PC9", maxRoll: 60, name: "Nemesis", powerCount: 1,
        description: ""
    },
    {
        category: "Power Control", code: "PC10", maxRoll: 64, name: "Power Transferral", powerCount: 1,
        description: ""
    },
    {
        category: "Power Control", code: "PC11", maxRoll: 73, name: "Power Vampirism", powerCount: 1,
        description: ""
    },
    {
        category: "Power Control", code: "PC12", maxRoll: 83, name: "Residual Absorption", powerCount: 1,
        description: ""
    },
    {
        category: "Power Control", code: "PC13", maxRoll: 96, name: "Selection", powerCount: 1,
        description: ""
    },
    {
        category: "Power Control", code: "PC14", maxRoll: 100, name: "Weakness Creation", powerCount: 1,
        description: ""
    },

    // Self-Alteration (S)
    {
        category: "Self-Alteration", code: "S1", maxRoll: 2, name: "Age-Shift", powerCount: 1,
        description: ""
    },
    {
        category: "Self-Alteration", code: "S2", maxRoll: 16, name: "Alter Ego", powerCount: 1,
        description: ""
    },
    {
        category: "Self-Alteration", code: "S3", maxRoll: 18, name: "Anatomical Separation", powerCount: 1,
        description: ""
    },
    {
        category: "Self-Alteration", code: "S4", maxRoll: 20, name: "Animal Transformation", powerCount: 1,
        description: ""
    },
    {
        category: "Self-Alteration", code: "S5", maxRoll: 26, name: "Animal Mimicry", powerCount: 1,
        description: ""
    },
    {
        category: "Self-Alteration", code: "S6", maxRoll: 30, name: "Blending", powerCount: 1,
        description: ""
    },
    {
        category: "Self-Alteration", code: "S7", maxRoll: 34, name: "Body Adaptation", powerCount: 1,
        description: ""
    },
    {
        category: "Self-Alteration", code: "S8", maxRoll: 42, name: "Body Transformation", powerCount: 1,
        description: ""
    },
    {
        category: "Self-Alteration", code: "S9", maxRoll: 48, name: "Body Coating", powerCount: 1,
        description: ""
    },
    {
        category: "Self-Alteration", code: "S10", maxRoll: 52, name: "Chemical Mimicry", powerCount: 1,
        description: ""
    },
    {
        category: "Self-Alteration", code: "S11", maxRoll: 56, name: "Energy Body", powerCount: 1,
        description: ""
    },
    {
        category: "Self-Alteration", code: "S12", maxRoll: 62, name: "Energy Sheath", powerCount: 1,
        description: ""
    },
    {
        category: "Self-Alteration", code: "S13", maxRoll: 64, name: "Evolution", powerCount: 1,
        description: ""
    },
    {
        category: "Self-Alteration", code: "S14", maxRoll: 74, name: "Imitation", powerCount: 1,
        description: ""
    },
    {
        category: "Self-Alteration", code: "S15", maxRoll: 82, name: "Invisibility", powerCount: 1,
        description: ""
    },
    {
        category: "Self-Alteration", code: "S16", maxRoll: 84, name: "Physical Gestalt", powerCount: 1,
        description: ""
    },
    {
        category: "Self-Alteration", code: "S17", maxRoll: 86, name: "Plant Mimicry", powerCount: 1,
        description: ""
    },
    {
        category: "Self-Alteration", code: "S18", maxRoll: 88, name: "Prehensile Hair", powerCount: 1,
        description: ""
    },
    {
        category: "Self-Alteration", code: "S19", maxRoll: 90, name: "Self-Duplication", powerCount: 1,
        description: ""
    },
    {
        category: "Self-Alteration", code: "S20", maxRoll: 92, name: "Self-Vegetation", powerCount: 1,
        description: ""
    },
    {
        category: "Self-Alteration", code: "S21", maxRoll: 98, name: "Shapeshifting", powerCount: 1,
        description: ""
    },
    {
        category: "Self-Alteration", code: "S22", maxRoll: 100, name: "Spirit Gestalt", powerCount: 1,
        description: ""
    },

    // Travel (T)
    {
        category: "Travel", code: "T1", maxRoll: 2, name: "Astral Body", powerCount: 1,
        description: ""
    },
    {
        category: "Travel", code: "T2", maxRoll: 6, name: "Carrier Wave", powerCount: 1,
        description: ""
    },
    {
        category: "Travel", code: "T3", maxRoll: 10, name: "Dimension Travel", powerCount: 1,
        description: ""
    },
    {
        category: "Travel", code: "T4", maxRoll: 12, name: "Energy Path", powerCount: 1,
        description: ""
    },
    {
        category: "Travel", code: "T5", maxRoll: 14, name: "Floating Disc", powerCount: 1,
        description: ""
    },
    {
        category: "Travel", code: "T6", maxRoll: 20, name: "Gateway", powerCount: 1,
        description: ""
    },
    {
        category: "Travel", code: "T7", maxRoll: 26, name: "Gliding", powerCount: 1,
        description: ""
    },
    {
        category: "Travel", code: "T8", maxRoll: 28, name: "Hyper-Digging", powerCount: 1,
        description: ""
    },
    {
        category: "Travel", code: "T9", maxRoll: 34, name: "Hyper-Leaping", powerCount: 1,
        description: ""
    },
    {
        category: "Travel", code: "T10", maxRoll: 42, name: "Hyper-Running", powerCount: 1,
        description: ""
    },
    {
        category: "Travel", code: "T11", maxRoll: 46, name: "Hyper-Swimming", powerCount: 1,
        description: ""
    },
    {
        category: "Travel", code: "T12", maxRoll: 52, name: "Levitation", powerCount: 1,
        description: ""
    },
    {
        category: "Travel", code: "T13", maxRoll: 56, name: "Rocket", powerCount: 1,
        description: ""
    },
    {
        category: "Travel", code: "T14", maxRoll: 58, name: "Skywalk", powerCount: 1,
        description: ""
    },
    {
        category: "Travel", code: "T15", maxRoll: 64, name: "Spiderclimb", powerCount: 1,
        description: ""
    },
    {
        category: "Travel", code: "T16", maxRoll: 72, name: "Teleport Self", powerCount: 1,
        description: ""
    },
    {
        category: "Travel", code: "T17", maxRoll: 76, name: "Teleport Others", powerCount: 1,
        description: ""
    },
    {
        category: "Travel", code: "T18", maxRoll: 78, name: "Telereformation", powerCount: 1,
        description: ""
    },
    {
        category: "Travel", code: "T19", maxRoll: 80, name: "Time Travel", powerCount: 1,
        description: ""
    },
    {
        category: "Travel", code: "T20", maxRoll: 82, name: "Troubleseeker", powerCount: 1,
        description: ""
    },
    {
        category: "Travel", code: "T21", maxRoll: 93, name: "True Flight", powerCount: 1,
        description: ""
    },
    {
        category: "Travel", code: "T22", maxRoll: 97, name: "Water Walking", powerCount: 1,
        description: ""
    },
    {
        category: "Travel", code: "T23", maxRoll: 100, name: "Whirlwind", powerCount: 1,
        description: ""
    },
];

const BIOPHYSICAL_CONTROL_FORM_TABLE = [
    {
        maxRoll: 24, name: "Healing",
        description: "The hero can cure the damage caused by wounds, trauma, toxins, and disease.  The Power seals the body and returns any still-living tissues to health. It cannot replace lost tissue."
    },
    {
        maxRoll: 4, name: "Regeneration",
        description: "The hero has the ability to heal and can recreate large areas of lost tissue, such as severed limbs or destroyed organs."
    },
    {
        maxRoll: 48, name: "Revival",
        description: "The hero can actually bring the dead back to life. The Power begins by healing and regenerating any damage to the body, especially the cause of death. Once the body is habitable again, the Power automatically summons the deceased spirit back and reconnects it with the body."
    },
    {
        maxRoll: 68, name: "Damage Transferral",
        description: "The hero can heal another by apparently taking that damage from the victim and moving it into the hero. The Power first heals the target. Simultaneously, the hero's body reshapes itself into a duplication of the damage being healed."
    },
    {
        maxRoll: 76, name: "Decay",
        description: "The hero can accelerate the cellular collapse of body tissue. The target becomes leprous, dies, and quickly crumbles to dust if the Power is used long enough."
    },
    {
        maxRoll: 92, name: "Disruption",
        description: "The Power can upset the smooth functioning of the physiology. The target suffers Power rank losses to his Health as he suffers anything from minor discomfort to fatal trauma."
    },
    {
        maxRoll: 100, name: "Aging",
        description: "The Power can accelerate or reverse the aging process. As the victim's age changes, physiology and mental capacities change as well. While the Power can function as a Fountain of Youth, it can also be used to kill through old age or regression to protoplasm."
    }
];

const EMMISSION_POINT_TABLE = [
    {
        maxRoll: 14, name: "Entire Body",
        description: "Power radiates from an aura surrounding the entire body. Power can be emitted in any direction without the hero actually having to physically point."
    },
    {
        maxRoll: 22, name: "Head",
        description: "Power emanates from an aura surrounding only the hero's head. Power can be emitted in any direction desired without the hero's having to nod his head."
    },
    {
        maxRoll: 30, name: "Eyes",
        description: "Power is emitted through the hero's pupils. The power is directed wherever the hero is looking. If the eyelids are closed, this Power cannot function."
    },
    {
        maxRoll: 38, name: "Mouth/Nose",
        description: "The Power is primarily emitted through the hero's mouth. To aim, he turns his head and shapes the mouth as though blowing out a candle. Seepage occurs through the nose; this cannot be aimed, and the Power is reduced - 2CS in Intensity."
    },
    {
        maxRoll: 46, name: "Torso",
        description: "The Power is emitted from an aura on the hero's chest. The Power travels in a straight line, perpendicular to the body. "
    },
    {
        maxRoll: 54, name: "Arms",
        description: "The Power is emitted from an aura surrounding either or both arms. The Power travels in the direction in which the forearm is pointed (if one arm is used or in a vector (if both arms are used)."
    },
    {
        maxRoll: 62, name: "Hands",
        description: "The Power isbemitted from an aurabsurrounding the hero's hand, fist, or palm. Power travels in the plane formed by the fingers, in line with the whole fist, or in a line perpendicular to the open palm."
    },
    {
        maxRoll: 67, name: "Fingers",
        description: "The Power is emitted from an aurabsurrounding the hero's fingers (any number, from one to all of them). It travels in a straight line in the direction the finger points. Usually, the index finger directs the Power, if only one finger is used. If the hero has multiple Powers, each Power can be assigned to a different finger."
    },
    {
        maxRoll: 70, name: "Legs",
        description: "The Power is emitted downward from an aura surrounding both legs. It is difficult to aim leg-emitted Power, which travels in the line defined by the lower leg. Such Powers are usually limited in range to contact only."
    },
    {
        maxRoll: 73, name: "Feet",
        description: "Power is emitted by the hero's soles. As above, such Powers are difficult to aim and are usually limited to contact-only."
    },
    {
        maxRoll: 76, name: "Wings",
        description: "Power is emitted from an aura surrounding the hero's wings. Power may travel in the plane formed by the wings or in a line perpendicular to their open position."
    },
    {
        maxRoll: 81, name: "Antennae/horns",
        description: "Power is emitted from the antennae on the hero's head. Power travels in a straight line from the last section of the antennae."
    },
    {
        maxRoll: 86, name: "Tail",
        description: "Power is emitted from the tip of the hero's tail and follows astraight line in the direction the tail points. "
    },
    {
        maxRoll: 100, name: "Any Location",
        description: "The hero can emit Power from any section of the body he chooses, and can change emission points with each use of the Power."
    },
];

const MAGIC_MECHANISM_TABLE = [
    {
        maxRoll: 8, name: "Word",
        description: "The hero needs to speak a single, specific word in order to manifest his Power."
    },
    {
        maxRoll: 20, name: "Chant",
        description: "he hero needs to recite a series of words to manifest his Power. The Chant can be any length and form."
    },
    {
        maxRoll: 28, name: "Song",
        description: "he hero need to sing or play a specific song, tune, or rhythm to bring about the desired Effect."
    },
    {
        maxRoll: 40, name: "Gesture",
        description: "The hero must perform a specific physical action to bring about the desired Effect."
    },
    {
        maxRoll: 52, name: "Alchemy",
        description: "The hero can achieve a specific Effect by following a recipe that combines arcane or even commonplace substances in a special procedure. The resulting substance possesses enough Power to attempt the desired Effect."
    },
    {
        maxRoll: 60, name: "Talisman",
        description: "The Mage must possess a specific item in order to achieve his desired Effect."
    },
    {
        maxRoll: 68, name: "Familiar",
        description: "The Mage possesses (or is possessed by) a special lifeform who serves as an amplifier, conduit, and transmitting device for the Mage's Power. The hero must be in contact with the Familiar to achieve any type of Effect aside from communication."
    },
    {
        maxRoll: 76, name: "Necromancy",
        description: "Necromancy-The Mage can achieve an Effect by using the remnants of lifeforce contained in once-living biological materials."
    },
    {
        maxRoll: 84, name: "Summoning",
        description: "The Mage can summon supernatural beings and compel/bribe/beg them to go do the actual work that produces the Effect."
    },
    {
        maxRoll: 100, name: "Ritual",
        description: "This is a combination of any of the preceding nine Mechanisms into a compound Mechanism.",
        needsRitualRoll: true
    },
];

const RITUAL_ROLLS_TABLE = [
    { maxRoll: 33, mechanismCount: 2 },
    { maxRoll: 67, mechanismCount: 3 },
    { maxRoll: 100, mechanismCount: 4 },
];

const MAGIC_CONTROL_TABLE = [
    { maxRoll: 40, name: "Manipulation", description: "The Mage can alter the flow and application of Magic." },
    { maxRoll: 70, name: "Magnification/Reduction", description: "The Mage can either increase or decrease the rank of the affected Magic by his own Power rank number." },
    { maxRoll: 100, name: "Negation", description: "This is an extreme form of Reduction. The Mage can completely dispel any Magic within his scope." }
];

const MAGIC_REALITY_ALTERATION_TABLE = [
    { maxRoll: 40, name: "Future", description: "The Mage can control the probability of a certain event coming to pass." },
    { maxRoll: 65, name: "Present", description: "The Mage can change the conditions of her present surroundings. It is as if the Mage had somehow altered the past without realizing it." },
    { maxRoll: 75, name: "Past", description: "The Mage can actually change past history and thereby really alter the present." },
    { maxRoll: 100, name: "Temporal Flow", description: "The Mage can alter the rate at which time passes. He can accelerate or decelerate it to such a point that the affected area is apparently in stasis. The maximum amount that time" }
];

const DIMINUTION_MECHANISM_TABLE = [
    { maxRoll: 20, name: "Atomic Collapse", description: "The hero decreases the distance between the target's atoms and subatomic particles. The target does not lose weight as it shrinks." },
    { maxRoll: 40, name: "Atomic Reduction", description: "The hero decreases the number of atoms in the target's body. The lost matter is either disintegrated (if the Diminution is permanent) or temporarily removed from the target's plane of existence and stored on another plane until it is needed to return the target to its original size." },
    { maxRoll: 100, name: "Atomic Shrinkage", description: "This is the most common form of Diminution and the only form that permits the target to enter a Microverse. The hero can reduce the size of the atoms and subatomic particles themselves, thus reducing the over-all size in a proportional manner." }
];

const ENLARGEMENT_MECHANISM_TABLE = [
    { maxRoll: 20, name: "Atomic Dispersal", description: "The Power causes the spaces between the atoms and subatomic particles to increase, thus increasing overall size. Mass remains the same despite any increase in size, causing the target's density to drop." },
    { maxRoll: 40, name: "Atomic Growth", description: "The Power causes the target to gain additional atoms. These are automatically incorporated into the target to duplicate and augment existing molecular structures." },
    { maxRoll: 100, name: "Atomic Gain", description: "The target's atoms and subatomic particles actually increase in size, thus increasing the target's overall size." }
];

const MATTER_ANIMATION_FORM_TABLE = [
    { maxRoll: 20, name: "Air Animation", description: "The hero can directly control the movement of gases and vapors and indirectly control the movement of material suspended in the air, such as smoke, dust, steam, and so on." },
    { maxRoll: 50, name: "Liquid Animation", description: "he hero can directly control the movement of liquids and indirectly control material suspended in liquid (mud, cake batter)." },
    { maxRoll: 100, name: "Solid Animation", description: "The hero can alter the condition of solid matter, so long as it is not biological or mechanical in nature." },
];

const MENTAL_DUPLICATION_FORM_TABLE = [
    { maxRoll: 40, name: "Detachment", description: "The hero's mind is completely separate from the duplicate and retains full control over the body and other Powers. The hero can examine and communicate with the duplicate. The duplicate retains a facsimile of the original's will and may not choose to voluntarily cooperate with the hero." },
    { maxRoll: 70, name: "Merge", description: "The duplicate mind blends with the hero's mind to create a composite mentality. The new mind contains aspects of both minds personalities, memories, and Powers." },
    { maxRoll: 100, name: "Transformation", description: "The hero's mind is automatically overwhelmed by the new mind. The hero's personality, memories, and mental Powers are temporarily replaced by the new mind." },
];

const SERIAL_IMMORTALITY_FORM_TABLE = [
    { maxRoll: 20, name: "Newborn", description: "The body is that of an infant.  The character can enter the body at any point from conception to birth. He is helpless until birth actually occurs. He can accelerate the body's physical development in order to induce birth and quickly regain physical maturity." },
    { maxRoll: 40, name: "Premade", description: " The new body is a previously prepared clone or android body that was prepared specifically for this purpose. Such a body is already physically mature and in possession of the full range of the hero's Powers." },
    { maxRoll: 60, name: "Re-animation", description: "The lifeforce enters and revives a recently deceased but unmutilated corpse, preferably of the same species as the original body." },
    { maxRoll: 80, name: "Spontaneous Creation", description: "This is the most sociably acceptable form of Serial Immortality. The hero creates existing matter and energy into the flesh of a new body. The newly-created body is identical to the previous one and possesses all Powers except externally derived ones." },
    { maxRoll: 100, name: "Parasite", description: "This is the nastiest, least socially acceptable form of Serial Immortality. The character's lifeforce invades a living, physically mature body and overwhelms the original occupant's mind." },
];

const ARMOR_SKIN_FORM_TABLE = [
    { maxRoll: 35, name: "Leather", description: "The epidermis retains its normal shape and flexibility but is harder to the touch." },
    { maxRoll: 60, name: "Rigid Plates", description: "he body is covered in interlinked plates like an insect's chitin or an armadillo's shell." },
    { maxRoll: 80, name: "Visually Inorganic", description: "The body can be any shape but has the appearance of nonorganic matter." },
    { maxRoll: 100, name: "Inorganic", description: "he body actually is covered in inorganic material." },
];

const CONTROL_FORM_TABLE = [
    { maxRoll: 40, name: "Manipulation", description: "The hero can alter the flow and application of Power." },
    { maxRoll: 70, name: "Magnification/Reduction", description: "The hero can either increase or decrease the rank of the affected Power by his Macro-Power's rank number." },
    { maxRoll: 100, name: "Negation", description: "The hero can completely dispel any Powers within his range." },
];

const TALENT_CATEGORIES_ULTIMATE_TABLE = [
    { maxRoll: 6, name: "Alternative Sciences" },
    { maxRoll: 12, name: "Astronomy" },
    { maxRoll: 20, name: "Biology" },
    { maxRoll: 28, name: "Chemistry" },
    { maxRoll: 34, name: "Crime and Law" },
    { maxRoll: 38, name: "Cognitive Sciences & Humanities" },
    { maxRoll: 45, name: "Computer Science" },
    { maxRoll: 52, name: "Earth Sciences" },
    { maxRoll: 59, name: "Engineering" },
    { maxRoll: 66, name: "Fighting" },
    { maxRoll: 70, name: "Medicine" },
    { maxRoll: 74, name: "Mystic and Mental" },
    { maxRoll: 79, name: "Other" },
    { maxRoll: 86, name: "Physics" },
    { maxRoll: 93, name: "Piloting" },
    { maxRoll: 100, name: "Weapons" },
];

const TALENT_LIST_ULTIMATE_TABLE = [
    {
        category: "Alternative Sciences", maxRoll: 25, name: "Catastrophism",
        description: "The scientific belief system that attempts to pinpoint the end of the world or at least major catastrophes that could signifantly alter man's or the universe's history."
    },
    {
        category: "Alternative Sciences", maxRoll: 50, name: "Cryonics",
        description: "The practice of freezing a dead diseased person in hopes of bringing him back in the future when the cure is found."
    },
    {
        category: "Alternative Sciences", maxRoll: 75, name: "Paranormal Phenomena",
        description: "The study of paranormal phenomena from a scientific standpoint."
    },
    {
        category: "Alternative Sciences", maxRoll: 100, name: "Parapsychology",
        description: "The study of psionics."
    },

    {
        category: "Astronomy", maxRoll: 20, name: "Astronautics",
        description: "The science of the contruction and design of vehicles for travel in space beyond earth's atmosphere."
    },
    {
        category: "Astronomy", maxRoll: 40, name: "Astrophotography",
        description: ""
    },
    {
        category: "Astronomy", maxRoll: 60, name: "Astrophysics",
        description: "Deals with the chemical and physical composition of celestial matter."
    },
    {
        category: "Astronomy", maxRoll: 80, name: "Radio Astronomy",
        description: "Astronomy dealing with electromagnetic radiations of radio frequency received from outside earth's atmosphere."
    },
    {
        category: "Astronomy", maxRoll: 100, name: "Stellar Cartography	",
        description: "Mapping space."
    },

    {
        category: "Biology", maxRoll: 5, name: "Anatomy",
        description: ""
    },
    {
        category: "Biology", maxRoll: 10, name: "Animal Behaviour",
        description: ""
    },
    {
        category: "Biology", maxRoll: 15, name: "Bio-Physics",
        description: "The application of physical principles to biological problems."
    },
    {
        category: "Biology", maxRoll: 21, name: "Biotechnology",
        description: "Application to biological and medical science of engineering principles or engineering equipment (as in the construction of artificial organs and bionics)."
    },
    {
        category: "Biology", maxRoll: 26, name: "Botany",
        description: "The study of plant life."
    },

    {
        category: "Biology", maxRoll: 31, name: "Ecology",
        description: "The interrelationship of organisms and their environment."
    },
    {
        category: "Biology", maxRoll: 37, name: "Genetics",
        description: "A branch of biology dealing with hereditary and variation of organisms. Genetics allows the recognition of signs of genetic tampering, ability to note genetic abnormalities, and conduct genetic experiments or projects."
    },
    {
        category: "Biology", maxRoll: 42, name: "Immunology",
        description: "The science dealing with the phenomena and causes of immunity and immune responses."
    },
    {
        category: "Biology", maxRoll: 48, name: "Marine Biology",
        description: "The study of marine life."
    },
    {
        category: "Biology", maxRoll: 54, name: "Micro-Biology",
        description: "The study of microscopic forms of life."
    },
    {
        category: "Biology", maxRoll: 61, name: "Neurosciences",
        description: "Deals with nerves and nerve tissue and their relation to behavior and learning."
    },
    {
        category: "Biology", maxRoll: 67, name: "Parasitology",
        description: "The study of parasites on living creatures."
    },
    {
        category: "Biology", maxRoll: 73, name: "Pharmacology",
        description: "The science of drugs including materia medica, toxicology, and therapeutic."
    },
    {
        category: "Biology", maxRoll: 79, name: "Phenology",
        description: "The study of the reaction of species to environmental phenomenon."
    },
    {
        category: "Biology", maxRoll: 85, name: "Physiology",
        description: "Deals with the functions of living matter and of the physical and chemical phenomena."
    },
    {
        category: "Biology", maxRoll: 90, name: "Psychobiology",
        description: "The study of mental life and behavior in relation to other biological processes."
    },
    {
        category: "Biology", maxRoll: 95, name: "Radiobiology",
        description: "Deals with the interaction of biological systems and radiant energy or radioactive materials."
    },
    {
        category: "Biology", maxRoll: 100, name: "Zoology",
        description: "The study of animals."
    },

    {
        category: "Chemistry", maxRoll: 11, name: "Alchemy",
        description: "A medieval chemical science and speculative philosophy aiming to achieve the transmutation of the base elements into gold, the discovery of a universal cure for disease, and the discovery of a means of indefinitely prolonging life."
    },

    {
        category: "Chemistry", maxRoll: 24, name: "Chemical and Biological Weapons",
        description: ""
    },

    {
        category: "Chemistry", maxRoll: 37, name: "Chemical Engineering",
        description: "Engineering dealing with the industrial application of chemistry and development of new chemical technology."
    },

    {
        category: "Chemistry", maxRoll: 50, name: "Electrochemistry",
        description: "Deals with the relation of electricity to chemical changes and with the interconversion of chemical and electrical energy."
    },

    {
        category: "Chemistry", maxRoll: 64, name: "Organic Chemistry",
        description: "Deals with only chemical elements found occuring in natural substances."
    },

    {
        category: "Chemistry", maxRoll: 77, name: "Polymers",
        description: "The study of advanced chemical compounds to form other new materials."
    },

    {
        category: "Chemistry", maxRoll: 88, name: "Sonochemistry",
        description: "The effects of sonic energy on chemicals."
    },

    {
        category: "Chemistry", maxRoll: 100, name: "Spectroscopy",
        description: "Physics that deal with the theory and interpretation of interactions between matter and radiation."
    },


    {
        category: "Crime and Law", maxRoll: 4, name: "Ballistics",
        description: "Ballistics is the study of guns, knowing what bullet goes with what gun, where a shot could have come from, etc., etc. This is the kind of stuff you see TV detectives doing when they find powder burns and bullet holes. PC gets a +1CS to Reason when trying to figure out these kinds of things."
    },

    {
        category: "Crime and Law", maxRoll: 7, name: "Camouflage",
        description: "Allows a character +2CS to trying to camouflage equiptment, objects, and self. Requires a yellow Intuition FEAT for a person to find it."
    },

    {
        category: "Crime and Law", maxRoll: 10, name: "Counterfeit Recognition",
        description: "+1CS to Intuition for identifying false signatures, money, art, etc. A failed roll means that the character believes its genuine."
    },

    {
        category: "Crime and Law", maxRoll: 12, name: "Clue Analysis",
        description: "+1CS to Intuition/Reason on gathering information on clues."
    },

    {
        category: "Crime and Law", maxRoll: 16, name: "Criminology",
        description: "The hero with this Talent has an understanding of the criminal mind and behavior, either from studies or first-hand observation. The character with this Talent gains a +1CS on all Reason and Intuition FEATs involving criminal practices."
    },

    {
        category: "Crime and Law", maxRoll: 22, name: "Demolitions",
        description: "The PC gets +1CS to Reason when figuring out the best applications for explosives, or the creation of home made explosives. Allows a good chance to blow the vault door off the wall without collapsing the back half of the building."
    },

    {
        category: "Crime and Law", maxRoll: 29, name: "Detective/Espionage",
        bonusContactCount: 2,
        bonusContactType: "Professional/Law(40)|Professional/Law Enforcement(75)|Professional/Crime(100)",
        description: "Gains Clue Analysis, Counterfeit recognition, identification System, Law, and Police Procedure. This character is trained to notice small clues to a crime, and gains +1CS to find them."
    },

    {
        category: "Crime and Law", maxRoll: 32, name: "Disguise",
        description: "Disguise gives a +1CS to two stats...Intuition and Reason. When a PC gets in disguise, two situations could come up. One is where the disguise only has to pass at a glance. In this situation, anyone having cause to notice rolls an opposed FEAT between his Intuition and the character's Reason (+1CS). The other situation is where the character must adopt mannerisms to go with the disguise (disguising voice, affecting a limp, etc.). The person the character is trying to fool must make an opposed FEAT against the character's Intuition (+1CS) using either Reason or Intuition (whichever is higher). In either case, if the FEAT is failed, nothing is noticed. Green thru Red would signify anything from knowing something is wrong to recognizing the character."
    },
    {
        category: "Crime and Law", maxRoll: 37, name: "Forensics",
        description: "Forensics is the study of the science of crime scenes. It is the study of the body, the scene, and the evidence. A character with this talent can identify the cause of death, the manner of death, and the time of death."
    },
    {
        category: "Crime and Law", maxRoll: 42, name: "Forgery",
        description: "Enables a character to create excellent copies of a signature or work of art."
    },
    {
        category: "Crime and Law", maxRoll: 44, name: "Intimidation",
        description: "A character with this talent knows how to inspire fear in an opponent either through the use of threats, brute strength, or imposing size and gains a +1CS to Intimidation."
    },
    {
        category: "Crime and Law", maxRoll: 47, name: "Interrogation",
        description: "The character is well versed in extracting information from a subject gaining a +1CS to Interrogation."
    },
    {
        category: "Crime and Law", maxRoll: 55, name: "Law",
        description: "A character with law gains +1CS to all FEATs involving law"
    },
    {
        category: "Crime and Law", maxRoll: 64, name: "Law Enforcement",
        description: "Includes Gun and Law talents and the Police Procedure talent. If a characer is still with the Law Enforcement agency, he may carry a gun and make arrests legally"
    },
    {
        category: "Crime and Law", maxRoll: 55, name: "Law",
        description: "A character with law gains +1CS to all FEATs involving law"
    },
    {
        category: "Crime and Law", maxRoll: 64, name: "Law Enforcement",
        description: "Includes Gun and Law talents and the Police Procedure talent. If a characer is still with the Law Enforcement agency, he may carry a gun and make arrests legally"
    },
    {
        category: "Crime and Law", maxRoll: 70, name: "Military",
        bonusContactCount: 1,
        bonusContactType: "Professional/Military(100)",
        description: "Includes Camouflage, Cartography, Demolition, Electronic Countermeasures, guns, and Heavy Weapons and grants a +1CS to all military matters including army weapons. Gain one co ntact in the military."
    },
    {
        category: "Crime and Law", maxRoll: 77, name: "Negotiations",
        description: "+1CS to popularity in hostile situations."
    },
    {
        category: "Crime and Law", maxRoll: 83, name: "Police Procedure",
        description: "Enables a character to avoid both police conflict and security. For example; such a character could apprehend felons and gain access to a crime scene without being arrested."
    },
    {
        category: "Crime and Law", maxRoll: 88, name: "Pick Pocket",
        description: ""
    },
    {
        category: "Crime and Law", maxRoll: 92, name: "Security",
        description: "This talent has two benefits. First, the PC gets a +1CS to Reason to create or remove Security devices, provided the PC has the proper background or a high enough Reason to begin with. Second, the PC gets a +1CS to Intuition for noticing installed security devices."
    },
    {
        category: "Crime and Law", maxRoll: 96, name: "Stealth",
        description: "Stealth is an Intuition based talent. It gives +1CS to intuiton and requires others to make an Intuition Feat at the intensity of the stealthy character's modified intuition in order to spot the character. Any movement requires additional Stealth FEAT's, or the watchers get another roll to detect the character. Detective/Espionage DOES give a bonus to spotting Stealthy characters."
    },
    {
        category: "Crime and Law", maxRoll: 96, name: "Stealth",
        description: "Stealth is an Intuition based talent. It gives +1CS to intuiton and requires others to make an Intuition Feat at the intensity of the stealthy character's modified intuition in order to spot the character. Any movement requires additional Stealth FEAT's, or the watchers get another roll to detect the character. Detective/Espionage DOES give a bonus to spotting Stealthy characters."
    },
    {
        category: "Crime and Law", maxRoll: 100, name: "Tracking",
        description: "This skill allows you to track others and to cover your own trail with any earthbound target and through any type of terrain. When doing the tracking +1CS for tracking people +1CS for each person over one that you are tracking."
    },

    {
        category: "Cognitive Sciences & Humanities", maxRoll: 13, name: "Anthropology",
        description: "Reason FEAT bonuses only if a specific culture is taken. However, an overview is known on the subject. More than one branch can be selected, each taking a talent slot."
    },
    {
        category: "Cognitive Sciences & Humanities", maxRoll: 21, name: "Archaeology",
        description: "Reason FEAT bonuses only if a specific culture is taken. However, an overview is known on the subject. More than one branch can be selected, each taking a talent slot."
    },
    {
        category: "Cognitive Sciences & Humanities", maxRoll: 29, name: "Cartography",
        description: "Enables a character ot draw and interpret maps and grants +1CS to all attempts."
    },
    {
        category: "Cognitive Sciences & Humanities", maxRoll: 39, name: "History",
        description: "This character can pick a specific branch of history to be an expert in (World War II, South African, Mayan, Neolithic) and gets a +1CS to Reason FEATs involving the branch. More than one branch can be selected, each taking a slot."
    },
    {
        category: "Cognitive Sciences & Humanities", maxRoll: 52, name: "Philology (linguistics)",
        description: "The study of human speech including the units, structure, modification of language. (Character gets to pick one language other than English to be fluent in.)"
    },
    {
        category: "Cognitive Sciences & Humanities", maxRoll: 66, name: "Music Cognition",
        description: "The study of musical development throughout human history. This does not automatically grant the character with the performer talent."
    },
    {
        category: "Cognitive Sciences & Humanities", maxRoll: 80, name: "Philosophy",
        description: ""
    },
    {
        category: "Cognitive Sciences & Humanities", maxRoll: 100, name: "Psychology",
        description: "+1CS in all FEATs involving the mind. A popular talent for those with mental powers. These character gain a +1CS on FEATs involving Mental Contact, Domination, Hypnosis, Emotion Control, and Mental Probe powers."
    },


    {
        category: "Computer Science", maxRoll: 13, name: "Architecture",
        description: "+1CS in architecture FEATs."
    },
    {
        category: "Computer Science", maxRoll: 29, name: "Artificial Intelligence",
        description: "The study and research of man made thinking systems."
    },
    {
        category: "Computer Science", maxRoll: 45, name: "Computer Engineering",
        description: "The design and construction of computer hardware."
    },
    {
        category: "Computer Science", maxRoll: 51, name: "Electronic Counter Measures",
        description: "Enables a character to understand, operate, and detect the use of bugs, jammers, and decoders. +1CS to Reason in using them, Intuition for finding them."
    },
    {
        category: "Computer Science", maxRoll: 58, name: "Graphics",
        description: "Web designer, advertising, printing product design and familiarity with the printing industry and various paper products and design tools."
    },
    {
        category: "Computer Science", maxRoll: 75, name: "Security and Encryption",
        description: ""
    },
    {
        category: "Computer Science", maxRoll: 89, name: "Programming",
        description: "The creation and development of computer software."
    },
    {
        category: "Computer Science", maxRoll: 100, name: "Virtual Reality",
        description: "An indepth knowledge of human's interaction with computer systems."
    },


    {
        category: "Earth Sciences", maxRoll: 11, name: "Agriculture",
        description: "Deals with field crop production and soil management Also, a combination of the producing operations of a farm, the manufacture and distribution of supplies, and the processing distribution and storage of such supplies. The development and repair of farm equipment, irrigation systems and landscape planning. Can also include forestry, the science of developing, caring for and cultivating forests and/or timberlands."
    },
    {
        category: "Earth Sciences", maxRoll: 19, name: "Ecology",
        description: "Ecology is the study of living things and how they interact in an ecological system. A PC with ecology will gain a +1CS to Reason to checks involving learning or reasoning out things about a natural balance, like what is throwing it off. Will be an expert on most ecological situations, and may guess at alien ones also."
    },
    {
        category: "Earth Sciences", maxRoll: 26, name: "Geography",
        description: "Mapping the earth and its surface."
    },
    {
        category: "Earth Sciences", maxRoll: 38, name: "Geology",
        description: "Deals with the history of the earth and its life esp. in rocks."
    },
    {
        category: "Earth Sciences", maxRoll: 50, name: "Hydrology",
        description: "Deals with the properties, distribution, and circulation of water on the surface of the land, in the soil and rocks, and in the atmosphere."
    },
    {
        category: "Earth Sciences", maxRoll: 64, name: "Meteorology",
        description: "Study of weather systems."
    },
    {
        category: "Earth Sciences", maxRoll: 75, name: "Metallurgy",
        description: "The study of metal and its practical uses."
    },
    {
        category: "Earth Sciences", maxRoll: 90, name: "Oceanography",
        description: "Study of the oceans movements and effects on land and atmosphere."
    },
    {
        category: "Earth Sciences", maxRoll: 100, name: "Seismology",
        description: "The study of earth movement. Includes glaciology and volcanology."
    },



    {
        category: "Engineering", maxRoll: 6, name: "Aviation and Aeronautics Engineering",
        description: "This is not piloting. It is the understanding and development of flight principles and aircraft design. There are people who know how to build planes but not fly them. Characters with this talent get the benefit of having their projects cost -1CS less in resource rank to build."
    },
    {
        category: "Engineering", maxRoll: 11, name: "Astronautic Engineering",
        description: "This allows the character to design, build and modify out of atmosphere space craft. Characters with this talent get the benefit of having their projects cost -1CS less in resource rank to build."
    },
    {
        category: "Engineering", maxRoll: 16, name: "Automotive Engineering",
        description: ""
    },
    {
        category: "Engineering", maxRoll: 19, name: "Battlesuit Design",
        description: "This skill allows the character +1CS to design and build battlesuits, harnesses, etc."
    },
    {
        category: "Engineering", maxRoll: 21, name: "Civil Engineering",
        description: "Deals with roads, city works, water systems, overpasses, etc."
    },
    {
        category: "Engineering", maxRoll: 25, name: "Cybernetics/Bionics",
        description: "Study of living systems with the intention of applying their principles to the design of engineering systems. Drawing on interdisciplinary research in the mechanical and life sciences, bionics has been used in audiovisual equipment based on human ear function, to design air and naval craft patterned after biological structure of birds and fish, and to incorporate principles of the human neurological system in data-processing systems. Another application has been the development of artificial limbs controlled by recognition of the electrical patterns in muscle tissue and direct electronic stimulation of the visual cortex via an implant and camera system. This talent allows the character the ability to design advanced cybernetic creations. With medicine/surgery, the character can actually perform surgery, allowing the construction of replacement organs, limbs, etc."
    },
    {
        category: "Engineering", maxRoll: 28, name: "Demolitions",
        description: "Precise knowledge of how to build, use and diffuse explosive devices."
    },
    {
        category: "Engineering", maxRoll: 31, name: "Gadgetry",
        description: "Can build gadgetry, and recieve a +1CS to all FEATs involving them."
    },
    {
        category: "Engineering", maxRoll: 35, name: "Identify Gadgets",
        description: "Enables a character to Identify and use Gadgets but not build them. Alien technology results in -1CS to -5CS"
    },
    {
        category: "Engineering", maxRoll: 38, name: "Electrical Engineering",
        description: ""
    },
    {
        category: "Engineering", maxRoll: 38, name: "Electrical Engineering",
        description: ""
    },
    {
        category: "Engineering", maxRoll: 44, name: "Locksmith",
        description: ""
    },
    {
        category: "Engineering", maxRoll: 50, name: "Marine Engineering",
        description: "Includes the building of ships, submarines and underwater constructs."
    },
    {
        category: "Engineering", maxRoll: 57, name: "Mechanical Engineering",
        description: "The character with talent is capable of building complex machines for an assortment of tasks."
    },
    {
        category: "Engineering", maxRoll: 63, name: "Military Engineering",
        description: ""
    },
    {
        category: "Engineering", maxRoll: 69, name: "Nuclear Engineering",
        description: "Deals with the construction and development of nuclear powered, manipulating and control devices."
    },
    {
        category: "Engineering", maxRoll: 76, name: "Repair/Tinkering",
        description: "Modification of existing machines or equipment."
    },
    {
        category: "Engineering", maxRoll: 82, name: "Robotics",
        description: "This skill allows a +1CS in dealing with Robotic construction, design, matianence, and theory. When used with the computer skill, the character can design AI constructions."
    },
    {
        category: "Engineering", maxRoll: 88, name: "Structural Engineering",
        description: "This allows the character to design, build and modify structural complexes (buildings, bases, tunnels, mines, etc.) Building bases or hideouts are -1CS to effective cost of course."
    },
    {
        category: "Engineering", maxRoll: 95, name: "Weapons Engineering",
        description: "Precise knowledge of how to build, use and modify guns, missiles and artillery. This talent does not include explosive devices. (see Demolitions.)"
    },
    {
        category: "Engineering", maxRoll: 100, name: "Weapons Tinkering",
        description: "Modification of existing weapons."
    },


    {
        category: "Fighting", maxRoll: 3, name: "Aerial Combat",
        description: "This skill allows a character +1CS to fighting when engages mid-air. The character has some knowledge of aerial tactics, and possesses keen ability to use such."
    },
    {
        category: "Fighting", maxRoll: 7, name: "Underwater Combat",
        description: "The Skill allows a character to operate in combat conditions without penality underwater.. Furthermore the character recieves a +1CS to all Fighting and Agility FEAT's whilst submerged"
    },
    {
        category: "Fighting", maxRoll: 11, name: "Climbing",
        description: "Allows you to climb trees, telephones , buildings cliffs, etc. +2CS to Agility when trying this. Failure can be painful."
    },
    {
        category: "Fighting", maxRoll: 15, name: "Dodging",
        description: "+1CS to dodging"
    },
    {
        category: "Fighting", maxRoll: 19, name: "Gymnastics",
        description: "Enables a character to perform flips, rolls, etc, and also allows a character to juggle. This skill will readily impress a crowd and increase the popularity of the hero +2 every time he works it into a battle where popularity is available."
    },
    {
        category: "Fighting", maxRoll: 23, name: "Martial Arts A",
        description: "This form of martial arts concentrates on using an opponent's strength against him, and is typical of oriental- American forms such as judo and karate. The practitioner of this type of martial arts can Stun or Slam an opponent regardless of their comparative Strengths and Endurances."
    },
    {
        category: "Fighting", maxRoll: 27, name: "Martial Arts B",
        description: "This form of martial arts is keyed on offense and inflicting damage in short, quick bursts, and includes such disciplines as boxing. The practitioner of this form of martial arts gains a +1CS to Fighting ability when engaged in unarmed combat."
    },
    {
        category: "Fighting", maxRoll: 31, name: "Martial Arts C",
        description: "This form of martial arts concentrates on holds and escapes. The practitioner of this form gains a +1CS to his Strength for Grappling attacks (including damage), a +1CS to Strength for Escaping and a +1CS to Agility for purposes of Dodging."
    },
    {
        category: "Fighting", maxRoll: 34, name: "Martial Arts D",
        description: "This meditative form of martial arts searches out the weak spots of the opponent's defenses and strikes against them. The practitioner of this form of attack may ignore the effects of Body Armor for determining Stun and Slam results. The attack by the character with this Talent does not have to inflict damage to force a check for possible Stun and Slam. The disadvantage is that the target of this attack must be studied for two rounds before the effects may be brought into play. The character with this Talent does not have to attack the character, only watch him in battle for two rounds previous to attacking."
    },
    {
        category: "Fighting", maxRoll: 38, name: "Martial Arts E",
        description: "This form of martial arts encourages quick striking to catch the opponent off-guard. Heroes with this form of Martial Arts are at +1CS to initiative rolls in unarmed combat."
    },
    {
        category: "Fighting", maxRoll: 42, name: "Martial Arts F",
        description: "This martial arts focuses on circular movements and deflecting. The character receives +1CS to strength for blocking and checks vs. Slams and Stuns. This form has no offensive applications, but instead keys in on defense by outlasting the opponent."
    },
    {
        category: "Fighting", maxRoll: 45, name: "Martial Arts G",
        description: "This fighting form relies more on intuition than intelligence. The practitioner of this form can wait until all actions have been declared before he or she must declare an action. This is limited to melee fighting situations only, and cannot be used to state anything but a fighting oriented action."
    },
    {
        category: "Fighting", maxRoll: 49, name: "Martial Arts H",
        description: "The martial artist has trained to have complete control and awareness of his body. He can use this martial art to apply a +2CS to Endurance for the purpose of healing lost health. Alternatively, he can apply a +2CS to endurance for the purposes of holding his/her breath underwater or under gas attacks, provided the martial artist does not move or attack while using this talent."
    },
    {
        category: "Fighting", maxRoll: 53, name: "Martial Arts I",
        description: "This martial arts is very unique. It allows a teacher (sensei) to gain karma from the actions of his/her pupils. A character with this martial art will gain 10% of karma gained from the student (s) and can channel their energies to allow a karma pool between himself and his student (s) even when the master is not nearby his student (s)."
    },
    {
        category: "Fighting", maxRoll: 57, name: "Martial Arts J",
        description: "This martial art involves using your surroundings to become an extension of yourself. The martial artist is totally aware of all furniture, props, natural objects etc in the surrounding area For example, slamming a refridgerator door on your opponent or pulling the carpet out from under their feet. The martial artist never needs to make a successful grab for any loose (not possessed by anyone) objects in the area while fighting despite being stressed. As well, any attacker must make a successful intuition feat. Failure means the attacker has struck a nearby item of the Martial Artist's choosing and may receive damage as per the rules on breaking things."
    },
    {
        category: "Fighting", maxRoll: 61, name: "Martial Arts K",
        description: "This martial art focuses on understanding the pressure points and weak spots of the human body. Characters with this talent may opt to strike a target during slugfest combat with a \"nerve pinch\". A yellow fighting feat roll is needed (the equivalent of a slugfest \"bullseye\" result). Instead of doing normal damage, the target must make a successful Endurance Feat vs Remarkable Intensity or fall unconscious for 1-10 rounds. If the target is Blindsided, treat the intensity as Incredible. Note: this martial art can only be used against human targets."
    },
    {
        category: "Fighting", maxRoll: 65, name: "Martial Arts L",
        description: "This Martial Art focuses on sumo wrestling and absorbing/redirecting force. The so called \"roll with the punches\", this martial art allows a character a +1CS to endurance for the purpose of checking for slam and stun results from slugfest combat only. This martial art can not be applied if the hero is blindsided."
    },
    {
        category: "Fighting", maxRoll: 69, name: "Martial Arts M",
        description: "This Talent focuses on fighting, for the purpose of evading. Allow a +1CS column shift to fighting for determining the effects of evasion only."
    },
    {
        category: "Fighting", maxRoll: 73, name: "Martial Arts N",
        description: "This martial Art involves putting all of your energy focused on to a single blow. An example would be a haymaker, or a long flying kick to finish an already shaky opponent. The good news is the effects of this attack are amplified. Apply a +1CS to damage rolled under the slugfest column. When the target is checking for effects the target must shift his endurance down -1CS for checking slams and stuns.  The Bad news is this attack requires a significant amount of timing and energy. The target is +1CS for evading this attack. As well, the martial artist must check for a red fighting feat. Failure indicates the attacker may not take any actions in the next round. As well, even if this feat is successful the attacker always loses initiative in the next combat round."
    },
    {
        category: "Fighting", maxRoll: 77, name: "Martial Arts O",
        description: "The martial artist has trained in the martial arts through it's original form, studying the movements of animals. The martial artist may apply a +1CS to the applicable ability (fighting for evading, strength for blocking etc.) for performing any offensive or defensive actions when fighting wild animals. Note: this martial art requires a talent feat. Automatic - Any animal indigineous to the area the martial artist has trained."
    },
    {
        category: "Fighting", maxRoll: 81, name: "Martial Arts P",
        description: "This martial art concentrates on working with teammates in a combined attack, where the stronger of two characters hurls/throws/tosses the other, either as a projectile to strike an opponent or to pass over, land upon or behind a specific target. The martial art allows the character to utilize the higher of the two individuals agility to determine success, regardless of who is projector or projected."
    },
    {
        category: "Fighting", maxRoll: 85, name: "Martial Arts Q",
        description: "The martial artist is trained as receving damage, such as breaking a wooden chair on his/her back without flinching. The martial artist must be standing still and requires a psyche feat. If these conditions are met, the martial artist will receive excellent body armour against blunt and slugfest attacks."
    },
    {
        category: "Fighting", maxRoll: 89, name: "Martial Arts R",
        description: "The martial artist is trained to break objects with his body such as wood, bricks, blocks of ice, etc. Apply a +1CS to damage for the purpose of breaking inanimate objects only. This martial art can be combined with Martial arts N to allow a +2CS to damage for breaking things but all of the limitations of martial arts N still apply."
    },
    {
        category: "Fighting", maxRoll: 92, name: "Quick-Striking",
        description: "Characters with this talent gain +1CS to Fighting FEATs involving trying for multiple attack rolls. Also gains a +1 on initiative rolls."
    },
    {
        category: "Fighting", maxRoll: 94, name: "Wrestling",
        description: "The hero with this Talent is proficient in applying holds. It includes familiar types of wrestling as well as the sumo forms of the art. The hero with this Talent gains a +2CS when making Grappling attacks, but gains no benefit in damage. A hero with Martial Arts B and this Talent gains a +3CS to hit in a Grappling attack, and a +1CS for damage."
    },
    {
        category: "Fighting", maxRoll: 96, name: "Thrown Objects",
        description: "The hero with this Talent gains a +1CS with all Throwing attacks, and +1CS on Catching. This applies to both thrown weapons and normal items. If the hero has the Thrown Weapons Talent as well, the modification is +2CS when using thrown weapons."
    },
    {
        category: "Fighting", maxRoll: 98, name: "Acrobatics",
        description: "The hero with this Talent is very limber and as such gains advantages when under attack. The hero has a +1CS when dodging, evading, and escaping."
    },
    {
        category: "Fighting", maxRoll: 100, name: "Tumbling",
        description: "The hero with this Talent knows how to fall and land without undue injury. Individuals with this Talent may make an Agility FEAT to land feet-first after any fall that does not inflict damage."
    },


    {
        category: "Medicine", maxRoll: 5, name: "Acupuncture",
        description: ""
    },
    {
        category: "Medicine", maxRoll: 10, name: "Cardiology",
        description: ""
    },
    {
        category: "Medicine", maxRoll: 15, name: "Chiropractic",
        description: ""
    },
    {
        category: "Medicine", maxRoll: 20, name: "Dentistry",
        description: ""
    },
    {
        category: "Medicine", maxRoll: 25, name: "Emergency Medicine",
        description: "This character is capable of working in a trauma unit, emergency room or any other kind of immediate care."
    },
    {
        category: "Medicine", maxRoll: 33, name: "First Aid",
        description: "This Talent grants the character the ability to immediately halt Endurance rank loss, the and the recovery of one rank immediately. In addition, the hero with this Talent can stabilize a dying character at Shift-0 Health up to 5 rounds after that character reaches that level."
    },
    {
        category: "Medicine", maxRoll: 39, name: "Geriatrics",
        description: "Medical care for older people."
    },
    {
        category: "Medicine", maxRoll: 44, name: "Obstetrics and Gynecology",
        description: "Women and babies and related problems."
    },
    {
        category: "Medicine", maxRoll: 49, name: "Oncology",
        description: "The study of cancer."
    },
    {
        category: "Medicine", maxRoll: 54, name: "Pathology",
        description: "The study of diseases and their nature."
    },
    {
        category: "Medicine", maxRoll: 60, name: "Pediatrics",
        description: "Children"
    },
    {
        category: "Medicine", maxRoll: 65, name: "Pharmacology",
        description: "The study of drugs"
    },
    {
        category: "Medicine", maxRoll: 70, name: "Physical Therapy",
        description: ""
    },
    {
        category: "Medicine", maxRoll: 75, name: "Plastic Surgery",
        description: ""
    },
    {
        category: "Medicine", maxRoll: 81, name: "Psychiatry",
        description: "Deals with mental, emotional and behavioral disorders. The hero with this Talent has a background in studies of the mind, and as such gains a + 1CS on all FEATs involving the mind."
    },
    {
        category: "Medicine", maxRoll: 87, name: "Radiology",
        description: "The use of radiation in the diagnosis and treatment of disease."
    },
    {
        category: "Medicine", maxRoll: 93, name: "Sports Medicine",
        description: ""
    },
    {
        category: "Medicine", maxRoll: 98, name: "Surgery",
        description: "Allows the charactre to repair extensive physical damage. Surgery skill gives you the ability to perform surgery and a +1CS to Reason FEATs while performing them. If the surgery is performed anywhere but a hospital type setting, the surgery is done at a -2CS. Extensive surgery on an Alien or other abnormal physiology there is also a -2CS. Surgery is very dangerous to the patient. If the Surgery is succesful the patient recieves twice his endurance points in health. If the surgery is unsuccessful the patient Loses three times his Endurance points. If the character reaches Shift-0 he may die. Completing a succesful surgery should be worth a lot of Karma."
    },
    {
        category: "Medicine", maxRoll: 100, name: "Veterinary",
        description: "Taking care of animals medical needs."
    },


    {
        category: "Mystic and Mental", maxRoll: 8, name: "Bibliophile",
        description: "The character has an extensive knowledge of magical books, scrolls, or other primarily informational items, and the lore concerning them. He has a +2CS when using or researching these."
    },
    {
        category: "Mystic and Mental", maxRoll: 16, name: "Demonologist",
        description: "The character has studied accounts of demons and he knows how dangerous and hostile they are. The character receives a +1CS in any situation involving demons, including research, communication, identification and combat."
    },
    {
        category: "Mystic and Mental", maxRoll: 24, name: "Mesmerism and Hypnosis",
        description: "This talent is a primitive form of Mind Control at the Power rank number equal to the Reason of the character with this Talent. Information can be gained as per a Mental Probe, and posthypnotic suggestions may be implanted within the victim's mind. Any attempt to force an individual to do something that he would not normally do, or divulge information that he would not normally reveal, will cause the hypnotism to break. A hypnotic command fades in 1-10 hours after it is given."
    },
    {
        category: "Mystic and Mental", maxRoll: 32, name: "Mystic Background",
        description: "This \"Talent\" shows that the character has some background with magical forces. A character with this Talent may have Magical Powers, with the approval of the Judge."
    },
    {
        category: "Mystic and Mental", maxRoll: 40, name: "Occult Lore",
        description: "The character has made extensive studies into the area of occult happenings, including: unexplained events and mysteries of the world, hauntings, and other manifestations of the spirit world. He has a +2CS when researching or dealing with occult events."
    },
    {
        category: "Mystic and Mental", maxRoll: 48, name: "Resist Domination",
        description: "This permits the character to resist mental attacks as if the character had a mental power of Psyche +1CS."
    },
    {
        category: "Mystic and Mental", maxRoll: 54, name: "Ritual Magics",
        description: "Reason FEAT to perform magical ceremonies. To do this you need knowledge of the ceremony (usually from a book), equiptment, and time. Time is 1d20 times 2 = rounds of spellcasting needed."
    },
    {
        category: "Mystic and Mental", maxRoll: 61, name: "Runesmith",
        description: "The character is a transcriber and translator of runes, especially ancient, magical runes. The character has a +2CS whenever studying, deciphering, or inscribing runes."
    },
    {
        category: "Mystic and Mental", maxRoll: 69, name: "Scholar of Antiquities",
        description: "The character has an extensive knowledge of antiques, especially ancient magical artifacts and lore concerning them. He gains a +2CS when dealing with them"
    },
    {
        category: "Mystic and Mental", maxRoll: 77, name: "Sleight of Hand",
        description: "The character with this Talent may palm small items, making them appear or disappear with Agility +1CS ability."
    },
    {
        category: "Mystic and Mental", maxRoll: 85, name: "Theogony",
        description: "The character has a +2CS when researching information on the powerful extradimensional beings and gods of the Marvel"
    },
    {
        category: "Mystic and Mental", maxRoll: 93, name: "Trance",
        description: "The character may place himself into a trance. While in a trance the character slows his body functions to such a level that he may be assumed to be deceased. A character in a trance reduces needs for food and water to a minimal level, and may regain Endurance ranks at one rank per day."
    },
    {
        category: "Mystic and Mental", maxRoll: 100, name: "Zoologist of Magic",
        description: "Allows a +1CS when attempting to identify magical creatures and their powers."
    },


    {
        category: "Other", maxRoll: 5, name: "Accounting",
        description: ""
    },
    {
        category: "Other", maxRoll: 9, name: "Actor",
        description: "This gives the ability to be used to disguise a character. An actor recieves a +1CS to all disguise attempts and opponents recieve a -1CS to seeing through the disguise"
    },
    {
        category: "Other", maxRoll: 14, name: "Animal Training",
        description: "This character may teach animals simple tricks. If the character has animal communication, control, or empathy they recieve a +1CS"
    },
    {
        category: "Other", maxRoll: 19, name: "Artist",
        description: "The character with an artist background creates works of art, either for himself or for sale to others. This includes painting, sculpting, and writing."
    },
    {
        category: "Other", maxRoll: 25, name: "Business/Finance",
        description: "The hero is familiar with the world of business, corporate finance, and how money works. Initial resources are a minimum of Good, and the hero gains a +1CS for FEAT rolls dealing with money."
    },
    {
        category: "Other", maxRoll: 30, name: "Escape Artist",
        description: "+1CS to strength in trying to escape holds or bonds."
    },
    {
        category: "Other", maxRoll: 32, name: "Heir To A Fortune",
        description: "This is not a Talent, but a situation which brings the character into a lot of money. The minimum Resources of a character with this Talent is Remarkable"
    },
    {
        category: "Other", maxRoll: 36, name: "Instructor",
        description: "Allows the character to teach a particular ability, allowing students the learning bonus. The teacher is given the same bonus for instruction, and is profficent (+1CS) in a particular skill"
    },
    {
        category: "Other", maxRoll: 41, name: "Journalism",
        bonusContactsCount: 2,
        bonusContact: "Professional/Media(100)",
        description: ""
    },
    {
        category: "Other", maxRoll: 46, name: "Leadership",
        description: "The Hero with this talent is a natural born leader. If this Ctd style=em haracter forms akarma pool with a team then that pool receives a 50 point bonus, provided that this character is recognized as the team leader. When the leader leaves, the 50 points go with him. The leader does not gain them, they simply leave the pool. Only one leader per team."
    },
    {
        category: "Other", maxRoll: 52, name: "Performer",
        description: "The character is someone who acts, sings, dances, mimes, or otherwise uses his Talents to entertain."
    },
    {
        category: "Other", maxRoll: 57, name: "Persuasion",
        description: "This talent provides the ability to convince someone to believe something or perform some action. Like Interrogation, a persuasion attempt normally requires 15 minutes."
    },
    {
        category: "Other", maxRoll: 63, name: "Pick Pocketing",
        description: "Allows the character the ability to \"borrow\" items from another person without their knowledge. Can grant as much as +2CS to Agility if item is in an accessible place (outside pocket of an overcoat.)"
    },
    {
        category: "Other", maxRoll: 69, name: "Politics",
        bonusContactsCount: 2,
        description: "Being involved with politics in the public eye, you are either realy liked or really hated. If the charcter is already freindly you gain a +1CS in getting help, but if the character is unfriendly or hostile you recieve an additional -1CS. You gain 2 contacts, Usually your chief supporter"
    },
    {
        category: "Other", maxRoll: 76, name: "Seduction",
        description: "The character receives +1 to Persuasion attempts with members of the opposite sex"
    },
    {
        category: "Other", maxRoll: 82, name: "Sewing and Tailoring",
        description: ""
    },
    {
        category: "Other", maxRoll: 89, name: "Streetsmart",
        bonusContactsCount: 2,
        description: "Character know the streets and how to survive theere. Character also gains 2 contacts at the street level"
    },
    {
        category: "Other", maxRoll: 93, name: "Student",
        description: "Similair to Heir to fortune, this talent may only be chosen at the start of play. The student character has no other initial talents, but may gain other talents at a discounted price.New talents cost 1000 karma points if learned from another player, 800 if learned from an outside source. Students may maintain Advancement totals for a Talent along with other forms of advancement funds."
    },
    {
        category: "Other", maxRoll: 96, name: "Thief",
        description: "Allows the ability to picklocks, access security, and safecracking"
    },
    {
        category: "Other", maxRoll: 99, name: "Trivia",
        description: "Pick a subject to be a know-it-all about."
    },
    {
        category: "Other", maxRoll: 1, name: "",
        description: "Enables a character to produce novel, screenplays, comic books, poetry, coloring books. Takes at least a week to complete."
    },


    {
        category: "Physics", maxRoll: 15, name: "Acoustics",
        description: "Deals with the study of noise control and Sonoluminescence, using sound to produce light in liquids."
    },
    {
        category: "Physics", maxRoll: 32, name: "Atomic Physics",
        description: "The study of solely atomic physics. Includes nuclear physics."
    },
    {
        category: "Physics", maxRoll: 48, name: "Cryogenics",
        description: "Deals with the production and effects of very low temperatures."
    },
    {
        category: "Physics", maxRoll: 66, name: "Energy and Particle Physics",
        description: "The study of the electromagnetic spectrum of energy and research into new power sources."
    },
    {
        category: "Physics", maxRoll: 83, name: "Mathematics",
        description: "The character with this talent is a math whiz, unbelievably good with numbers and as such gets a plus +1CS to all problems that can be solved mathematically."
    },
    {
        category: "Physics", maxRoll: 100, name: "Quantum Physics",
        talentCount: 2,
        description: "Research and development into teleportation, worm holes, warp theory and other MARVELous ideas. The character can even start off by creating a new specialty field. Counts as two talents."
    },

    {
        category: "Piloting", maxRoll: 15, name: "Airplane Pilot",
        description: "Includes commercial jets, small planes and fighter jets."
    },
    {
        category: "Piloting", maxRoll: 27, name: "Automobile Specialist",
        description: "+1CS to driving and controlling cars, trains, tanks, hovercrafts, etc."
    },
    {
        category: "Piloting", maxRoll: 38, name: "Boat Pilot",
        description: "+1CS to all FEATs involving sailboats, aircraft carriers, submarines, tugboats, and so on."
    },
    {
        category: "Piloting", maxRoll: 50, name: "Helicopter",
        description: ""
    },
    {
        category: "Piloting", maxRoll: 63, name: "Military Vehicle Specialist",
        description: "Includes tanks, jeeps and other off-road warcraft."
    },
    {
        category: "Piloting", maxRoll: 77, name: "Motorcycle",
        description: ""
    },
    {
        category: "Piloting", maxRoll: 89, name: "Spacecraft",
        description: "Includes space shuttles and out of atmosphere ships."
    },
    {
        category: "Piloting", maxRoll: 100, name: "Submersible Vehicle",
        description: "Includes submarines, diving bells and other underwater vehicles."
    },


    {
        category: "Weapons", maxRoll: 6, name: "Ancient Weapons",
        description: "This skill gives the player the ability to use weaponry from a specific period and setting previous to the advent of gunpowder. Further, the Hero must pick the style and period of said weaponry, wheter it be Ancient egypt or Latter Rome."
    },
    {
        category: "Weapons", maxRoll: 12, name: "Battlesuit operation",
        description: "The Hero gains the ability to use a battlesuit without penality. This ability, while not conferring a +CS, eliminates the -CS for using unfamiliar technology, new weapons systems, or new versions of said suit."
    },
    {
        category: "Weapons", maxRoll: 20, name: "Blunt Weapons",
        description: "+1CS with Clubs, bats, etc."
    },
    {
        category: "Weapons", maxRoll: 27, name: "Bows",
        description: "With this talent gain a +1CS, and may fire and reload in a single round. They may fire multiple arrows on a successful Agility FEAT. Without this talent -1CS to Agility to hit when using bows"
    },
    {
        category: "Weapons", maxRoll: 34, name: "Energy Weapons",
        description: "The Hero gains a +1CS to using energy weapons, such as lasers, electrostun rifles, or plasma blasters, save for heavy weapons such as Laser Cannons and Vehicle Weapons."
    },
    {
        category: "Weapons", maxRoll: 42, name: "Guns",
        description: "+1CS to all hand guns and Rifles."
    },
    {
        category: "Weapons", maxRoll: 49, name: "Marksmen",
        description: "+1CS to hit with any distance weapon that requires line of sight to hit, and marksman takes no penalty for range."
    },
    {
        category: "Weapons", maxRoll: 56, name: "Oriental Weapons",
        description: "This grants the character a +1CS to fighting or agility when using the following; Shurikens, crossbows, sais, and oriental swords and daggers."
    },
    {
        category: "Weapons", maxRoll: 63, name: "Heavy Weapons",
        description: "Heavy Weapons allows the character +1CS for the operation of most heavy weapons, including vehicular mounted weapons and tripod mounted weapons."
    },
    {
        category: "Weapons", maxRoll: 70, name: "Fencing",
        description: "The Fencing skill allows the hero +1CS for the use of fencing, and also allows for the skills of parrying, disarming, and quickstrikes with a successful Yellow Agility FEAT."
    },
    {
        category: "Weapons", maxRoll: 76, name: "Paired Weapons",
        description: ""
    },
    {
        category: "Weapons", maxRoll: 83, name: "Sharp Weapons",
        description: "+1CS to hit with swords, daggers and spears (unless thrown). Does not include Claws and other natural extensions"
    },
    {
        category: "Weapons", maxRoll: 90, name: "Thrown Weapons",
        description: "+1CS to Agility for Spears, disks, shurikens, snowballs, etc."
    },
    {
        category: "Weapons", maxRoll: 96, name: "Weapons Master",
        description: "Character gains a +1CS to hit with any weapon that requires a Fighting FEAT to hit."
    },
    {
        category: "Weapons", maxRoll: 100, name: "Weapons Specialist",
        description: "Character gains +2CS with a single weapon of choice. Character also recieves a +1 to initiative when using that weapon."
    },
];

const CONTACT_CATEGORIES_ULTIMATE_TABLE = [
    { maxRoll: 30, name: "Professional" },
    { maxRoll: 60, name: "Scientific" },
    { maxRoll: 90, name: "Political" },
    { maxRoll: 100, name: "Mystic Arts" },
];

const CONTACT_TYPE_LIST_ULTIMATE_TABLE = [
    {
        category: "Professional", maxRoll: 9, name: "Medicine",
        description: "The hero with this Contact has a friend, ally or acquaintance with Medicine Talent, who will provide medical advice and services either for free or charge an affordable fee."
    },
    {
        category: "Professional", maxRoll: 18, name: "Law",
        description: "The hero with this Contact has a friend, ally, or acquaintance with Law Talent, who will provide legal assistance for a reduced fee and legal advice to the hero for free."
    },
    {
        category: "Professional", maxRoll: 27, name: "Law Enforcement",
        description: "The hero with this Contact has a friend, ally, or acquaintance with Law-enforcement Talent, who is in addition a member of the law-enforcement profession."
    },
    {
        category: "Professional", maxRoll: 36, name: "Business World",
        description: "The character has a Contact in the world of business or finance."
    },
    {
        category: "Professional", maxRoll: 45, name: "Military",
        description: "The character has a Contact in the military."
    },
    {
        category: "Professional", maxRoll: 54, name: "Crime",
        description: "The character with this Contact has some connection with the criminal underworld. This ranges from having a snitch that passes on information about street action up to a Contact high in the hierarchy of organized crime."
    },
    {
        category: "Professional", maxRoll: 63, name: "Engineering",
        description: "The character with this Contact has some connection with someone who builds, either independently or for a larger corporation. The character may aid in the construction of devices. "
    },
    {
        category: "Professional", maxRoll: 72, name: "Psychiatry",
        description: "The character with this Contact has some connection with a character in the fields of psychiatry or psycho-analysis, including doctors devoted to the curing of the criminal mind. "
    },
    {
        category: "Professional", maxRoll: 82, name: "Espionage",
        description: "The character with this Contact has connections with the world of espionage. This includes agencies such as the FBI, CIA, NSA, KGB, Interpol, or MI5."
    },
    {
        category: "Professional", maxRoll: 98, name: "Media",
        description: "The character with this Contact has connections with his Tribe. , and as such may enjoy the privileges thereof. This includes using their equipment, calling them in on an emergency, and benefitting from their other resources."
    },
    {
        category: "Professional", maxRoll: 100, name: "Hero Group",
        description: "The character has some connection with, or was or is a member of or an ally of some existing group of super-powered heroes, and as such may enjoy the privileges thereof. This includes using their equipment, calling them in on an emergency, using their HQ, and benefitting from their training."
    },
    {
        category: "Scientific", maxRoll: 8, name: "Laboratory",
        description: "The character with this Contact has some connection with a character in the fields of chemistry."
    },
    {
        category: "Scientific", maxRoll: 14, name: "Chemistry",
        description: "The character with this Contact has some connection with a character in the fields of chemistry."
    },
    {
        category: "Scientific", maxRoll: 27, name: "Biology",
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
        category: "Political", maxRoll: 20, name: "Tribe",
        description: "The hero has an ally in the local political scene: alderman, mayor, or councilman. The Contact may provide information on what is going on in the neighborhood. "
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
        category: "Political", maxRoll: 90, name: "Other National",
        description: "The hero has a Contact in national government — someone else's. The hero may be friendly with the leadership or government apparatus of any other nation, friend or foe. This Contact, if known to others, may create difficulties in dealing with other political Contacts. Resources available are as for National government, but the character must be able to communicate with the Contact to gain any materials. "
    },
    {
        category: "Political", maxRoll: 94, name: "International",
        description: "The hero has Contacts in the UN or in a similar multi-national organization, such as the Common Market of Europe."
    },
    {
        category: "Political", maxRoll: 98, name: "Race",
        description: "The hero has Contacts in the race of his origin. "
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
