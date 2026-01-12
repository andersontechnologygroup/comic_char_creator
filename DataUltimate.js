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
        contactsForced: "Tribe",
        description: "The hero's parents were Mutants, as were any number of preceding generations. Breed Mutants form tribes and have close-knit families; this is a defense mechanism born from generations spent hiding their true selves from normal society."
    },
    {
        maxRoll: 38, name: "Android", column: 4, popularityAdjustment: -1, anyPrimaryAbilityAdjustment: 1, powersCountAdjustment: 1,
        contactsForced: "Lab/Scientist",
        description: "These are artificially created organic beings. An android is made of laboratory-created protoplasm and grows to maturity in an artificial womb. More intricately made Androids can actually interbreed with Normal Humans."
    },
    {
        maxRoll: 46, name: "Humanoid Race", column: 5, anyPrimaryAbilityAdjustment: 1,
        resourcesStart: 3 /* Poor */, contactsForced: "Race",
        description: "The hero is a normal member of a human-like race from \"somewhere else.\" This may be another world, era, dimension, or lost land hidden somewhere on the Earth. Most can pass as Normal Humans with a little disguise or explanation. "
    },
    {
        maxRoll: 47, name: "Surgical Composite", column: 2, strengthAdjustment: 1, fightingAdjustment: 1, enduranceAdjustment: 1,
        popularityStart: 0, resourcesStart: 3 /*Poor*/,
        contactsForced: "Hospital",
        description: "The hero was created in an operating room. His body contains parts taken from several bodies. Close examination reveals the scars from his creation.  Resistance to Mental Domination is reduced -1CS.  Composites heal twice as quickly as Normal Humans."
    },
    {
        maxRoll: 49, name: "Modified Human - Organic", column: 1, contactsForced: "Org Responsible",
        description: "This is someone who started life as a Normal Human and was later altered by some means. The change affected his body on a physical level but did not alter his DNA. Genetically, the hero is still very much human and cannot pass on his Powers to his descendants.  The hero's internal organs and nervous system have been altered.  Organics heal twice as fast as Normal Humans."
    },
    {
        maxRoll: 51, name: "Modified Human - Muscular", column: 1, contactsForced: "Org Responsible",
        enduranceAdjustment: 1, strengthAdjustment: 1,
        description: "This is someone who started life as a Normal Human and was later altered by some means. The change affected his body on a physical level but did not alter his DNA. Genetically, the hero is still very much human and cannot pass on his Powers to his descendants. Muscular Modification is easy to detect; just look for a person with outrageous muscular development."
    },
    {
        maxRoll: 53, name: "Modified Human - Skeletal", column: 1, contactsForced: "Org Responsible",
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
        maxRoll: 76, name: "Cyborg - Mechanical Body", column: 4, intuitionAdjustment: -1, psycheAdjustment: -1, contactsForced: "Lab",
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
    { category: "Defensive", code: "D1", maxRoll: 15, name: "Body Armor", powerCount: 1, description: "Provides protection against physical attacks." },
    { category: "Defensive", code: "D2", maxRoll: 20, name: "Force Field", powerCount: 1, description: "Projects a protective field." },
    { category: "Defensive", code: "D3", maxRoll: 23, name: "Force Field vs. Emotion", powerCount: 1, description: "Protects against emotion attacks." },
    { category: "Defensive", code: "D4", maxRoll: 30, name: "Force Field vs. Energy", powerCount: 1, description: "Protects against energy attacks." },
    { category: "Defensive", code: "D5", maxRoll: 35, name: "Force Field vs. Magic", powerCount: 1, description: "Protects against magic." },
    { category: "Defensive", code: "D6", maxRoll: 40, name: "Force Field vs. Mental", powerCount: 1, description: "Protects against mental attacks." },
    { category: "Defensive", code: "D7", maxRoll: 48, name: "Force Field vs. Physical", powerCount: 1, description: "Protects against physical attacks." },
    { category: "Defensive", code: "D8", maxRoll: 50, name: "Force Field vs. Power Manipulation", powerCount: 1, description: "Protects against power manipulation." },
    { category: "Defensive", code: "D9", maxRoll: 53, name: "Force Field vs. Vampirism", powerCount: 1, description: "Protects against life/energy draining." },
    { category: "Defensive", code: "D10", maxRoll: 65, name: "Reflection", powerCount: 1, description: "Reflects attacks back at source." },
    { category: "Defensive", code: "D11", maxRoll: 70, name: "Resist: Emotion", powerCount: 1, description: "Resistance to emotion control." },
    { category: "Defensive", code: "D12", maxRoll: 77, name: "Resist: Energy", powerCount: 1, description: "Resistance to energy attacks." },
    { category: "Defensive", code: "D13", maxRoll: 82, name: "Resist: Magic", powerCount: 1, description: "Resistance to magic." },
    { category: "Defensive", code: "D14", maxRoll: 87, name: "Resist: Mental", powerCount: 1, description: "Resistance to mental attacks." },
    { category: "Defensive", code: "D15", maxRoll: 94, name: "Resist: Physical", powerCount: 1, description: "Resistance to physical damage." },
    { category: "Defensive", code: "D16", maxRoll: 97, name: "Resist: Power Manipulation", powerCount: 1, description: "Resistance to power tampering." },
    { category: "Defensive", code: "D17", maxRoll: 100, name: "Resist: Vampirism", powerCount: 1, description: "Resistance to vampiric drains." },

    // Detection (DT)
    { category: "Detection", code: "DT1", maxRoll: 2, name: "Abnormal Sensitivity", powerCount: 1, description: "Senses function in unusual ways (infra/ultra)." },
    { category: "Detection", code: "DT2", maxRoll: 4, name: "Circular Vision", powerCount: 1, description: "360-degree vision." },
    { category: "Detection", code: "DT3", maxRoll: 10, name: "Energy Detection", powerCount: 1, description: "Detect and identify energy." },
    { category: "Detection", code: "DT4", maxRoll: 14, name: "Environmental Awareness", powerCount: 1, description: "Sense conditions/influence on environment." },
    { category: "Detection", code: "DT5", maxRoll: 20, name: "Extradimensional", powerCount: 1, description: "Sense across dimensional barriers." },
    { category: "Detection", code: "DT6", maxRoll: 28, name: "Hyper-Hearing", powerCount: 1, description: "Detect extremely faint sounds." },
    { category: "Detection", code: "DT7", maxRoll: 34, name: "Hyper-Olfactory", powerCount: 1, description: "Detect minute traces of substances by smell." },
    { category: "Detection", code: "DT8", maxRoll: 40, name: "Hyper-Touch", powerCount: 1, description: "Enhanced sense of touch." },
    { category: "Detection", code: "DT9", maxRoll: 42, name: "Life Detection", powerCount: 1, description: "Detect presence and nature of life." },
    { category: "Detection", code: "DT10", maxRoll: 44, name: "Magic Detection", powerCount: 1, description: "Detect magic and its effects." },
    { category: "Detection", code: "DT11", maxRoll: 50, name: "Microscopic Vision", powerCount: 1, description: "See extremely minute targets." },
    { category: "Detection", code: "DT12", maxRoll: 54, name: "Penetration Vision", powerCount: 1, description: "X-Ray vision." },
    { category: "Detection", code: "DT13", maxRoll: 56, name: "Power Detection", powerCount: 1, description: "Detect and identify superhuman powers." },
    { category: "Detection", code: "DT14", maxRoll: 58, name: "Psionic Detection", powerCount: 1, description: "Detect psionic power usage." },
    { category: "Detection", code: "DT15", maxRoll: 59, name: "Radarsense", powerCount: 1, description: "3D picture of surroundings via waves." },
    { category: "Detection", code: "DT16", maxRoll: 60, name: "Sonar (Passive)", powerCount: 1, description: "3D picture via sound waves." },
    { category: "Detection", code: "DT16", maxRoll: 62, name: "Sonar (Active)", powerCount: 1, description: "3D picture via sound waves." },
    { category: "Detection", code: "DT17", maxRoll: 69, name: "Telescopic Vision", powerCount: 1, description: "Focus on distant targets." },
    { category: "Detection", code: "DT18", maxRoll: 79, name: "Thermal Vision", powerCount: 1, description: "See heat images." },
    { category: "Detection", code: "DT19", maxRoll: 90, name: "Tracking", powerCount: 1, description: "Follow tracks left by target." },
    { category: "Detection", code: "DT20", maxRoll: 94, name: "True Sight", powerCount: 1, description: "See correct image despite concealment." },
    { category: "Detection", code: "DT21", maxRoll: 98, name: "UV Vision", powerCount: 1, description: "See ultraviolet light." },
    { category: "Detection", code: "DT22", maxRoll: 100, name: "Weakness Detection", powerCount: 1, description: "Detect flaws/stress points." },

    // Energy Control (EC)
    { category: "Energy Control", code: "EC1", maxRoll: 7, name: "Absorption Power", powerCount: 1, description: "Absorb specific energy type to heal." },
    { category: "Energy Control", code: "EC2", maxRoll: 10, name: "Catalytic Control", powerCount: 1, description: "Control speed of chemical reactions." },
    { category: "Energy Control", code: "EC3", maxRoll: 15, name: "Coldshaping", powerCount: 1, description: "Control forces that decrease temperature." },
    { category: "Energy Control", code: "EC4", maxRoll: 18, name: "Darkforce Manipulation", powerCount: 1, description: "Generate/Control Darkforce." },
    { category: "Energy Control", code: "EC5", maxRoll: 25, name: "Electrical Control", powerCount: 1, description: "Control all forms of electricity." },
    { category: "Energy Control", code: "EC6", maxRoll: 28, name: "Energy Conversion", powerCount: 1, description: "Change one form of energy to another." },
    { category: "Energy Control", code: "EC7", maxRoll: 31, name: "Energy Solidification", powerCount: 1, description: "Transform energy into solid matrix." },
    { category: "Energy Control", code: "EC8", maxRoll: 36, name: "Energy Sponge", powerCount: 1, description: "Absorb any form of energy safely." },
    { category: "Energy Control", code: "EC9", maxRoll: 38, name: "Energy Vampirism", powerCount: 1, description: "Drain energy to convert to stats." },
    { category: "Energy Control", code: "EC10", maxRoll: 45, name: "Fire Control", powerCount: 1, description: "Control existing flames." },
    { category: "Energy Control", code: "EC11", maxRoll: 49, name: "Gravity Manipulation", powerCount: 1, description: "Control gravity." },
    { category: "Energy Control", code: "EC12", maxRoll: 53, name: "Hard Radiation Control", powerCount: 1, description: "Control existing radiation." },
    { category: "Energy Control", code: "EC13", maxRoll: 59, name: "Kinetic Control", powerCount: 1, description: "Control energy of motion." },
    { category: "Energy Control", code: "EC14", maxRoll: 66, name: "Light Control", powerCount: 1, description: "Manipulate existing light." },
    { category: "Energy Control", code: "EC15", maxRoll: 73, name: "Magnetic Manipulation", powerCount: 1, description: "Control magnetic force." },
    { category: "Energy Control", code: "EC16", maxRoll: 77, name: "Plasma Control", powerCount: 1, description: "Control fields of charged particles." },
    { category: "Energy Control", code: "EC17", maxRoll: 80, name: "Radiowave Control", powerCount: 1, description: "Control existing radiowaves." },
    { category: "Energy Control", code: "EC18", maxRoll: 84, name: "Shadowshaping", powerCount: 1, description: "Manipulate shadows." },
    { category: "Energy Control", code: "EC19", maxRoll: 90, name: "Sound Manipulation", powerCount: 1, description: "Control existing sound." },
    { category: "Energy Control", code: "EC20", maxRoll: 97, name: "Thermal Control", powerCount: 1, description: "Control applied heat or cold." },
    { category: "Energy Control", code: "EC21", maxRoll: 100, name: "Vibration Control", powerCount: 1, description: "Control existing vibrations." },

    // Energy Emission (EE)
    { category: "Energy Emission", code: "EE1", maxRoll: 10, name: "Cold Generation", powerCount: 1, description: "Emit field that decreases thermal energy." },
    { category: "Energy Emission", code: "EE2", maxRoll: 20, name: "Electrical Generation", powerCount: 1, description: "Create electrical streams." },
    { category: "Energy Emission", code: "EE3", maxRoll: 22, name: "Energy Doppelganger", powerCount: 1, description: "Generate energy body from self." },
    { category: "Energy Emission", code: "EE4", maxRoll: 34, name: "Fire Generation", powerCount: 1, description: "Project fire." },
    { category: "Energy Emission", code: "EE5", maxRoll: 37, name: "Hard Radiation", powerCount: 1, description: "Emit dangerous radiation (X-ray, etc)." },
    { category: "Energy Emission", code: "EE6", maxRoll: 42, name: "Heat", powerCount: 1, description: "Generate pure heat." },
    { category: "Energy Emission", code: "EE7", maxRoll: 52, name: "Kinetic Bolt", powerCount: 1, description: "Strike with force." },
    { category: "Energy Emission", code: "EE8", maxRoll: 62, name: "Light Emission", powerCount: 1, description: "Emit bursts of light." },
    { category: "Energy Emission", code: "EE9", maxRoll: 72, name: "Magnetism", powerCount: 1, description: "Generate intense magnetic force." },
    { category: "Energy Emission", code: "EE10", maxRoll: 75, name: "Plasma Generation", powerCount: 1, description: "Project plasma fields." },
    { category: "Energy Emission", code: "EE11", maxRoll: 78, name: "Radiowave Generation", powerCount: 1, description: "Generate radio/microwaves." },
    { category: "Energy Emission", code: "EE12", maxRoll: 83, name: "Shadowcasting", powerCount: 1, description: "Emit field of darkforce/shadow." },
    { category: "Energy Emission", code: "EE13", maxRoll: 93, name: "Sonic Generation", powerCount: 1, description: "Generate intense sound." },
    { category: "Energy Emission", code: "EE14", maxRoll: 100, name: "Vibration", powerCount: 1, description: "Generate non-audible vibrations." },

    // Fighting (F)
    { category: "Fighting", code: "F1", maxRoll: 20, name: "Berserker", powerCount: 1, description: "Enter battle rage." },
    { category: "Fighting", code: "F2", maxRoll: 60, name: "Martial Supremacy", powerCount: 1, description: "Fighting is an Ability, but this boosts it." },
    { category: "Fighting", code: "F3", maxRoll: 75, name: "Natural Weaponry", powerCount: 1, description: "Body contains anatomical weapons." },
    { category: "Fighting", code: "F4", maxRoll: 80, name: "Weapons Creation", powerCount: 1, description: "Create any desired weapon from thin air." },
    { category: "Fighting", code: "F5", maxRoll: 100, name: "Weapons Tinkering", powerCount: 1, description: "Devise/Assemble weapons from scrap." },

    // Illusory (I)
    { category: "Illusionary", code: "I1", maxRoll: 15, name: "Animate Image", powerCount: 1, description: "Bring flat images to life." },
    { category: "Illusionary", code: "I2", maxRoll: 70, name: "Illusion Casting", powerCount: 1, description: "Create realistic holographic images." },
    { category: "Illusionary", code: "I3", maxRoll: 85, name: "Illusory Invisibility", powerCount: 1, description: "Simulate invisibility via illusion." },
    { category: "Illusionary", code: "I4", maxRoll: 100, name: "Illusory Duplication", powerCount: 1, description: "Create duplicates of self." },

    // Lifeform Control (L)
    { category: "Lifeform Control", code: "L1", maxRoll: 14, name: "Biophysical Control", powerCount: 1, description: "Alter physiology of target." },
    { category: "Lifeform Control", code: "L2", maxRoll: 15, name: "Bio-Vampirism", powerCount: 1, description: "Drain stats to boost self." },
    { category: "Lifeform Control", code: "L3", maxRoll: 18, name: "Body Transformation-Others", powerCount: 1, description: "Alter elements within living target." },
    { category: "Lifeform Control", code: "L4", maxRoll: 26, name: "Emotion Control", powerCount: 1, description: "Alter emotional state." },
    { category: "Lifeform Control", code: "L5", maxRoll: 32, name: "Exorcism", powerCount: 1, description: "Release being from external domination." },
    { category: "Lifeform Control", code: "L6", maxRoll: 34, name: "Force Field vs. Hostiles", powerCount: 1, description: "Repels hostile lifeforms." },
    { category: "Lifeform Control", code: "L7", maxRoll: 35, name: "Forced Reincarnation", powerCount: 1, description: "Merge spirits into new bodies." },
    { category: "Lifeform Control", code: "L8", maxRoll: 39, name: "Grafting", powerCount: 1, description: "Psionically augmented surgery." },
    { category: "Lifeform Control", code: "L9", maxRoll: 51, name: "Hypnotic Control", powerCount: 1, description: "Dominate behavior via voice/psionics." },
    { category: "Lifeform Control", code: "L10", maxRoll: 60, name: "Mind Control", powerCount: 1, description: "Directly control target's mind." },
    { category: "Lifeform Control", code: "L11", maxRoll: 62, name: "Mind Transferral", powerCount: 1, description: "Switch minds." },
    { category: "Lifeform Control", code: "L12", maxRoll: 65, name: "Neural Manipulation", powerCount: 1, description: "Alter neural activity." },
    { category: "Lifeform Control", code: "L13", maxRoll: 66, name: "Plague Carrier", powerCount: 1, description: "Contain/Release disease." },
    { category: "Lifeform Control", code: "L14", maxRoll: 69, name: "Plant Control", powerCount: 1, description: "Impart movement/awareness to plants." },
    { category: "Lifeform Control", code: "L15", maxRoll: 71, name: "Plant Growth", powerCount: 1, description: "Accelerate plant growth." },
    { category: "Lifeform Control", code: "L16", maxRoll: 80, name: "Sense Alteration", powerCount: 1, description: "Change manner of sensory processing." },
    { category: "Lifeform Control", code: "L17", maxRoll: 83, name: "Shapechange-Others", powerCount: 1, description: "Change shape of other living beings." },
    { category: "Lifeform Control", code: "L18", maxRoll: 89, name: "Sleep-Induced", powerCount: 1, description: "Put target into deep sleep." },
    { category: "Lifeform Control", code: "L19", maxRoll: 90, name: "Spirit Storage", powerCount: 1, description: "Hold spirits within self." },
    { category: "Lifeform Control", code: "L20", maxRoll: 95, name: "Summoning", powerCount: 1, description: "Summon/Control extra-dimensional beings." },
    { category: "Lifeform Control", code: "L21", maxRoll: 100, name: "Undead Control", powerCount: 1, description: "Dominate wills of undead." },

    // Magic (MG)
    { category: "Magic", code: "MG1", maxRoll: 8, name: "Enchantment", powerCount: 1, description: "Invest target with power." },
    { category: "Magic", code: "MG2", maxRoll: 15, name: "Energy Source", powerCount: 1, description: "Draws magic from special source." },
    { category: "Magic", code: "MG3", maxRoll: 17, name: "Internal Limbo", powerCount: 1, description: "Pocket dimension inside body." },
    { category: "Magic", code: "MG4", maxRoll: 25, name: "Magic Control", powerCount: 1, description: "Alter behavior of pure magic." },
    { category: "Magic", code: "MG5", maxRoll: 28, name: "Magic Creation", powerCount: 1, description: "Create new powers." },
    { category: "Magic", code: "MG6", maxRoll: 33, name: "Magic Domination", powerCount: 1, description: "Control actions of other mages." },
    { category: "Magic", code: "MG7", maxRoll: 39, name: "Magic Transferral", powerCount: 1, description: "Transfer magic to another." },
    { category: "Magic", code: "MG8", maxRoll: 41, name: "Magic Vampirism", powerCount: 1, description: "Drain magical energy." },
    { category: "Magic", code: "MG9", maxRoll: 71, name: "Power Simulation", powerCount: 1, description: "Magical version of any power." },
    { category: "Magic", code: "MG10", maxRoll: 39, name: "Magic Transferral", powerCount: 1, description: "Transfer magic to another." },
    { category: "Magic", code: "MG11", maxRoll: 41, name: "Magic Vampirism", powerCount: 1, description: "Drain magical energy." },
    { category: "Magic", code: "MG12", maxRoll: 71, name: "Power Simulation", powerCount: 1, description: "Magical version of any power." },
    { category: "Magic", code: "MG13", maxRoll: 77, name: "Reality Alteration", powerCount: 1, description: "Reshape time/reality." },
    { category: "Magic", code: "MG14", maxRoll: 79, name: "Spirit Vampirism", powerCount: 1, description: "Drain Intuition/Psyche." },
    { category: "Magic", code: "MG15", maxRoll: 95, name: "Sympathetic Magic", powerCount: 1, description: "Voodoo." },
    { category: "Magic", code: "MG16", maxRoll: 100, name: "Warding", powerCount: 1, description: "Create areas of latent power." },

    // Matter Control (MC)
    { category: "Matter Control", code: "MC1", maxRoll: 5, name: "Bonding", powerCount: 1, description: "Join two targets on molecular level." },
    { category: "Matter Control", code: "MC2", maxRoll: 17, name: "Collection", powerCount: 1, description: "Collect material to specific location." },
    { category: "Matter Control", code: "MC3", maxRoll: 22, name: "Crystallization", powerCount: 1, description: "Transform target to crystal." },
    { category: "Matter Control", code: "MC4", maxRoll: 29, name: "Diminution", powerCount: 1, description: "Reduce size of target." },
    { category: "Matter Control", code: "MC5", maxRoll: 39, name: "Disruption", powerCount: 1, description: "Destroy physical structure." },
    { category: "Matter Control", code: "MC6", maxRoll: 46, name: "Enlargement", powerCount: 1, description: "Increase size of target." },
    { category: "Matter Control", code: "MC7", maxRoll: 51, name: "Geoforce", powerCount: 1, description: "Control geological forces." },
    { category: "Matter Control", code: "MC8", maxRoll: 61, name: "Matter Animation", powerCount: 1, description: "Alter flow of raw matter." },
    { category: "Matter Control", code: "MC9", maxRoll: 68, name: "Machine Animation", powerCount: 1, description: "Control movement of mechanical." },
    { category: "Matter Control", code: "MC10", maxRoll: 73, name: "Micro-Environment", powerCount: 1, description: "Alter immediate surroundings." },
    { category: "Matter Control", code: "MC11", maxRoll: 83, name: "Molding", powerCount: 1, description: "Shape solid material." },
    { category: "Matter Control", code: "MC12", maxRoll: 93, name: "Weather", powerCount: 1, description: "Control weather." },
    { category: "Matter Control", code: "MC13", maxRoll: 100, name: "Zombie Animation", powerCount: 1, description: "Animate organic matter." },

    // Matter Conversion (MCo)
    { category: "Matter Conversion", code: "MCo1", maxRoll: 10, name: "Coloration", powerCount: 1, description: "Control color and transparency." },
    { category: "Matter Conversion", code: "MCo2", maxRoll: 25, name: "Combustion", powerCount: 1, description: "Transform target to combustible." },
    { category: "Matter Conversion", code: "MCo3", maxRoll: 45, name: "Disintegration", powerCount: 1, description: "Convert matter to pure energy." },
    { category: "Matter Conversion", code: "MCo4", maxRoll: 70, name: "Elemental Conversion", powerCount: 1, description: "Convert matter to specific element." },
    { category: "Matter Conversion", code: "MCo5", maxRoll: 80, name: "Ionization", powerCount: 1, description: "Change state of energy in target." },
    { category: "Matter Conversion", code: "MCo6", maxRoll: 100, name: "Molecular Conversion", powerCount: 1, description: "Transform material to desired compound." },

    // Matter Creation (MCr)
    { category: "Matter Creation", code: "MCr1", maxRoll: 10, name: "Artifact Creation", powerCount: 1, description: "Create object from nothing." },
    { category: "Matter Creation", code: "MCr2", maxRoll: 24, name: "Elemental Creation", powerCount: 1, description: "Create pure elements." },
    { category: "Matter Creation", code: "MCr3", maxRoll: 29, name: "Lifeform Creation", powerCount: 1, description: "Create living matter." },
    { category: "Matter Creation", code: "MCr4", maxRoll: 35, name: "Mechanical Creation", powerCount: 1, description: "Create complex devices." },
    { category: "Matter Creation", code: "MCr5", maxRoll: 59, name: "Missile Creation", powerCount: 1, description: "Create and launch projectiles." },
    { category: "Matter Creation", code: "MCr6", maxRoll: 69, name: "Molecular Creation", powerCount: 1, description: "Form elements into compounds." },
    { category: "Matter Creation", code: "MCr7", maxRoll: 88, name: "Spray", powerCount: 1, description: "Create directed cloud." },
    { category: "Matter Creation", code: "MCr8", maxRoll: 100, name: "Webcasting", powerCount: 1, description: "Generate and shoot solid web." },

    // Mental Enhancement (M)
    { category: "Mental Enhancement", code: "M1", maxRoll: 4, name: "Clairaudience", powerCount: 1, description: "Hear distant sounds." },
    { category: "Mental Enhancement", code: "M2", maxRoll: 8, name: "Clairvoyance", powerCount: 1, description: "See distant sights." },
    { category: "Mental Enhancement", code: "M3", maxRoll: 11, name: "Communicate with Animals", powerCount: 1, description: "Understand/use animal languages." },
    { category: "Mental Enhancement", code: "M4", maxRoll: 12, name: "Communicate with Cybernetics", powerCount: 1, description: "Direct communication with machines." },
    { category: "Mental Enhancement", code: "M5", maxRoll: 13, name: "Communicate with Non-Living", powerCount: 1, description: "Communicate with matter/spirits." },
    { category: "Mental Enhancement", code: "M6", maxRoll: 15, name: "Communicate with Plants", powerCount: 1, description: "Speak with plants." },
    { category: "Mental Enhancement", code: "M7", maxRoll: 16, name: "Cosmic Awareness", powerCount: 1, description: "Tune with universe." },
    { category: "Mental Enhancement", code: "M8", maxRoll: 22, name: "Danger Sense", powerCount: 1, description: "Warns of impending danger." },
    { category: "Mental Enhancement", code: "M9", maxRoll: 23, name: "Dreamtravel", powerCount: 1, description: "Enter dream dimensions." },
    { category: "Mental Enhancement", code: "M10", maxRoll: 16, name: "Cosmic Awareness", powerCount: 1, description: "Tune with universe." },
    { category: "Mental Enhancement", code: "M11", maxRoll: 22, name: "Danger Sense", powerCount: 1, description: "Warns of impending danger." },
    { category: "Mental Enhancement", code: "M12", maxRoll: 23, name: "Dreamtravel", powerCount: 1, description: "Enter dream dimensions." },
    { category: "Mental Enhancement", code: "M13", maxRoll: 26, name: "Empathy", powerCount: 1, description: "Detect surface emotions." },
    { category: "Mental Enhancement", code: "M14", maxRoll: 27, name: "Free Spirit", powerCount: 1, description: "Astral self independent of body." },
    { category: "Mental Enhancement", code: "M15", maxRoll: 31, name: "Hallucinations", powerCount: 1, description: "Create illusions in mind." },
    { category: "Mental Enhancement", code: "M16", maxRoll: 40, name: "Hyper-Intelligence", powerCount: 1, description: "Genius." },
    { category: "Mental Enhancement", code: "M17", maxRoll: 47, name: "Hyper-Invention", powerCount: 1, description: "Channel intelligence into design." },
    { category: "Mental Enhancement", code: "M18", maxRoll: 48, name: "Incarnation Awareness", powerCount: 1, description: "Remember past lives." },
    { category: "Mental Enhancement", code: "M19", maxRoll: 58, name: "Iron Will", powerCount: 1, description: "Control over own mind/body." },
    { category: "Mental Enhancement", code: "M20", maxRoll: 65, name: "Linguistics", powerCount: 1, description: "Rapidly learn languages." },
    { category: "Mental Enhancement", code: "M21", maxRoll: 66, name: "Mental Duplication", powerCount: 1, description: "Simulate another's mind." },
    { category: "Mental Enhancement", code: "M22", maxRoll: 67, name: "Mental Invisibility", powerCount: 1, description: "Render mind undetectable." },
    { category: "Mental Enhancement", code: "M23", maxRoll: 69, name: "Mental Probe", powerCount: 1, description: "Deep telepathy search." },
    { category: "Mental Enhancement", code: "M24", maxRoll: 72, name: "Mind Blast", powerCount: 1, description: "Pure psionic damage." },
    { category: "Mental Enhancement", code: "M25", maxRoll: 73, name: "Mind Drain", powerCount: 1, description: "Deplete/Destroy target mind." },
    { category: "Mental Enhancement", code: "M26", maxRoll: 74, name: "Postcognition", powerCount: 1, description: "See past." },
    { category: "Mental Enhancement", code: "M27", maxRoll: 75, name: "Precognition", powerCount: 1, description: "See future." },
    { category: "Mental Enhancement", code: "M28", maxRoll: 76, name: "Psionic Vampirism", powerCount: 1, description: "Drain mental energy." },
    { category: "Mental Enhancement", code: "M29", maxRoll: 78, name: "Remote Sensing", powerCount: 1, description: "Extend senses." },
    { category: "Mental Enhancement", code: "M30", maxRoll: 79, name: "Sensory Link", powerCount: 1, description: "Link senses with another." },
    { category: "Mental Enhancement", code: "M31", maxRoll: 80, name: "Serial Immortality", powerCount: 1, description: "Reborn after death." },
    { category: "Mental Enhancement", code: "M32", maxRoll: 81, name: "Speechthrowing", powerCount: 1, description: "Super-ventriloquism." },
    { category: "Mental Enhancement", code: "M33", maxRoll: 85, name: "Telekinesis", powerCount: 1, description: "Move objects with mind." },
    { category: "Mental Enhancement", code: "M34", maxRoll: 86, name: "Telelocation", powerCount: 1, description: "Locate target mentally." },
    { category: "Mental Enhancement", code: "M35", maxRoll: 96, name: "Telepathy", powerCount: 1, description: "Mind-to-mind communication." },
    { category: "Mental Enhancement", code: "M36", maxRoll: 100, name: "Total Memory", powerCount: 1, description: "Remember anything." },

    // Physical Enhancement (P)
    { category: "Physical Enhancement", code: "P1", maxRoll: 14, name: "Armor Skin", powerCount: 1, description: "Body transformed to damage-resistant form." },
    { category: "Physical Enhancement", code: "P2", maxRoll: 28, name: "Body Resistance", powerCount: 1, description: "Flesh capable of withstanding damage." },
    { category: "Physical Enhancement", code: "P3", maxRoll: 30, name: "Chemical Touch", powerCount: 1, description: "Secrete chemicals." },
    { category: "Physical Enhancement", code: "P4", maxRoll: 33, name: "Digestive Adaptation", powerCount: 1, description: "Eat anything." },
    { category: "Physical Enhancement", code: "P5", maxRoll: 40, name: "Hyper-Speed", powerCount: 1, description: "Extremely fast motion." },
    { category: "Physical Enhancement", code: "P6", maxRoll: 42, name: "Hypnotic Voice", powerCount: 1, description: "Voice dominates others." },
    { category: "Physical Enhancement", code: "P7", maxRoll: 45, name: "Lung Adaptability", powerCount: 1, description: "Breathe any medium." },
    { category: "Physical Enhancement", code: "P8", maxRoll: 47, name: "Pheromones", powerCount: 1, description: "Alter behavior via scent." },
    { category: "Physical Enhancement", code: "P9", maxRoll: 60, name: "Regeneration", powerCount: 1, description: "Rapidly recover." },
    { category: "Physical Enhancement", code: "P10", maxRoll: 62, name: "Self-Revival", powerCount: 1, description: "Return to life." },
    { category: "Physical Enhancement", code: "P11", maxRoll: 67, name: "Self-Sustenance", powerCount: 1, description: "Survive without air/food." },
    { category: "Physical Enhancement", code: "P12", maxRoll: 71, name: "Stealth", powerCount: 1, description: "Move undetected." },
    { category: "Physical Enhancement", code: "P13", maxRoll: 76, name: "Suspended Animation", powerCount: 1, description: "Death-like trance." },
    { category: "Physical Enhancement", code: "P14", maxRoll: 78, name: "True Invulnerability", powerCount: 1, description: "Immune to physical harm." },
    { category: "Physical Enhancement", code: "P15", maxRoll: 82, name: "Vocal Control", powerCount: 1, description: "Control own voice perfectly." },
    { category: "Physical Enhancement", code: "P16", maxRoll: 90, name: "Waterbreathing", powerCount: 1, description: "Breathe water." },
    { category: "Physical Enhancement", code: "P17", maxRoll: 100, name: "Water Freedom", powerCount: 1, description: "Adapted for water movement." },

    // Power Control (PC)
    { category: "Power Control", code: "PC1", maxRoll: 8, name: "Control", powerCount: 1, description: "Alter behavior of pure power." },
    { category: "Power Control", code: "PC2", maxRoll: 12, name: "Creation", powerCount: 1, description: "Create/Invest powers." },
    { category: "Power Control", code: "PC3", maxRoll: 18, name: "Domination", powerCount: 1, description: "Control others' powers." },
    { category: "Power Control", code: "PC4", maxRoll: 23, name: "Duplication", powerCount: 1, description: "Duplicate other powers." },
    { category: "Power Control", code: "PC5", maxRoll: 37, name: "Energy Source", powerCount: 1, description: "Draw power from source." },
    { category: "Power Control", code: "PC6", maxRoll: 39, name: "Energy Source Creation", powerCount: 1, description: "Create items providing power." },
    { category: "Power Control", code: "PC7", maxRoll: 49, name: "Focus", powerCount: 1, description: "Channel energy into single burst." },
    { category: "Power Control", code: "PC8", maxRoll: 55, name: "Gestalt", powerCount: 1, description: "Combine to create new power." },
    { category: "Power Control", code: "PC9", maxRoll: 60, name: "Nemesis", powerCount: 1, description: "Analyze and counter opponent." },
    { category: "Power Control", code: "PC10", maxRoll: 64, name: "Power Transferral", powerCount: 1, description: "Transfer power to another." },
    { category: "Power Control", code: "PC11", maxRoll: 73, name: "Power Vampirism", powerCount: 1, description: "Drain power from target." },
    { category: "Power Control", code: "PC12", maxRoll: 83, name: "Residual Absorption", powerCount: 1, description: "Duplicate power from traces." },
    { category: "Power Control", code: "PC13", maxRoll: 96, name: "Selection", powerCount: 1, description: "Possess any number, use one." },
    { category: "Power Control", code: "PC14", maxRoll: 100, name: "Weakness Creation", powerCount: 1, description: "Bestow weakness." },

    // Self-Alteration (S)
    { category: "Self-Alteration", code: "S1", maxRoll: 2, name: "Age-Shift", powerCount: 1, description: "Alter apparent age." },
    { category: "Self-Alteration", code: "S2", maxRoll: 16, name: "Alter Ego", powerCount: 1, description: "Transform into normal self." },
    { category: "Self-Alteration", code: "S3", maxRoll: 18, name: "Anatomical Separation", powerCount: 1, description: "Detach body parts." },
    { category: "Self-Alteration", code: "S4", maxRoll: 20, name: "Animal Transformation", powerCount: 1, description: "Turn into animal." },
    { category: "Self-Alteration", code: "S5", maxRoll: 26, name: "Animal Mimicry", powerCount: 1, description: "Duplicate animal abilities." },
    { category: "Self-Alteration", code: "S6", maxRoll: 30, name: "Blending", powerCount: 1, description: "Camouflage." },
    { category: "Self-Alteration", code: "S7", maxRoll: 34, name: "Body Adaptation", powerCount: 1, description: "Adapt to hostile environment." },
    { category: "Self-Alteration", code: "S8", maxRoll: 42, name: "Body Transformation", powerCount: 1, description: "Change body composition." },
    { category: "Self-Alteration", code: "S9", maxRoll: 48, name: "Body Coating", powerCount: 1, description: "Cover body with substance." },
    { category: "Self-Alteration", code: "S10", maxRoll: 52, name: "Chemical Mimicry", powerCount: 1, description: "Duplicate chemical properties." },
    { category: "Self-Alteration", code: "S11", maxRoll: 56, name: "Energy Body", powerCount: 1, description: "Transform into energy." },
    { category: "Self-Alteration", code: "S12", maxRoll: 62, name: "Energy Sheath", powerCount: 1, description: "Surround self with energy." },
    { category: "Self-Alteration", code: "S13", maxRoll: 64, name: "Evolution", powerCount: 1, description: "Alter evolutionary state." },
    { category: "Self-Alteration", code: "S14", maxRoll: 74, name: "Imitation", powerCount: 1, description: "Duplicate appearance." },
    { category: "Self-Alteration", code: "S15", maxRoll: 82, name: "Invisibility", powerCount: 1, description: "Render self undetectable." },
    { category: "Self-Alteration", code: "S16", maxRoll: 84, name: "Physical Gestalt", powerCount: 1, description: "Merge bodies." },
    { category: "Self-Alteration", code: "S17", maxRoll: 86, name: "Plant Mimicry", powerCount: 1, description: "Duplicate plant abilities." },
    { category: "Self-Alteration", code: "S18", maxRoll: 88, name: "Prehensile Hair", powerCount: 1, description: "Control hair." },
    { category: "Self-Alteration", code: "S19", maxRoll: 90, name: "Self-Duplication", powerCount: 1, description: "Create copies of self." },
    { category: "Self-Alteration", code: "S20", maxRoll: 92, name: "Self-Vegetation", powerCount: 1, description: "Turn into plant." },
    { category: "Self-Alteration", code: "S21", maxRoll: 98, name: "Shapeshifting", powerCount: 1, description: "Alter form." },
    { category: "Self-Alteration", code: "S22", maxRoll: 100, name: "Spirit Gestalt", powerCount: 1, description: "Merge disembodied beings." },

    // Travel (T)
    { category: "Travel", code: "T1", maxRoll: 2, name: "Astral Body", powerCount: 1, description: "Send astral form." },
    { category: "Travel", code: "T2", maxRoll: 6, name: "Carrier Wave", powerCount: 1, description: "Ride energy currents." },
    { category: "Travel", code: "T3", maxRoll: 10, name: "Dimension Travel", powerCount: 1, description: "Enter other dimensions." },
    { category: "Travel", code: "T4", maxRoll: 12, name: "Energy Path", powerCount: 1, description: "Transform to energy current." },
    { category: "Travel", code: "T5", maxRoll: 14, name: "Floating Disc", powerCount: 1, description: "Create platform." },
    { category: "Travel", code: "T6", maxRoll: 20, name: "Gateway", powerCount: 1, description: "Create spatial bridge." },
    { category: "Travel", code: "T7", maxRoll: 26, name: "Gliding", powerCount: 1, description: "Travel on air currents." },
    { category: "Travel", code: "T8", maxRoll: 28, name: "Hyper-Digging", powerCount: 1, description: "Burrow swiftly." },
    { category: "Travel", code: "T9", maxRoll: 34, name: "Hyper-Leaping", powerCount: 1, description: "Jump great distances." },
    { category: "Travel", code: "T10", maxRoll: 42, name: "Hyper-Running", powerCount: 1, description: "Run at power rank speed." },
    { category: "Travel", code: "T11", maxRoll: 46, name: "Hyper-Swimming", powerCount: 1, description: "Swim at power rank speed." },
    { category: "Travel", code: "T12", maxRoll: 52, name: "Levitation", powerCount: 1, description: "Resist gravity." },
    { category: "Travel", code: "T13", maxRoll: 56, name: "Rocket", powerCount: 1, description: "Propel self via exhaust." },
    { category: "Travel", code: "T14", maxRoll: 58, name: "Skywalk", powerCount: 1, description: "Walk on invisible path." },
    { category: "Travel", code: "T15", maxRoll: 64, name: "Spiderclimb", powerCount: 1, description: "Climb walls." },
    { category: "Travel", code: "T16", maxRoll: 72, name: "Teleport Self", powerCount: 1, description: "Vanish and reappear." },
    { category: "Travel", code: "T17", maxRoll: 76, name: "Teleport Others", powerCount: 1, description: "Transport targets." },
    { category: "Travel", code: "T18", maxRoll: 78, name: "Telereformation", powerCount: 1, description: "Disintegrate and reform." },
    { category: "Travel", code: "T19", maxRoll: 80, name: "Time Travel", powerCount: 1, description: "Move through time." },
    { category: "Travel", code: "T20", maxRoll: 82, name: "Troubleseeker", powerCount: 1, description: "Teleport to crisis." },
    { category: "Travel", code: "T21", maxRoll: 93, name: "True Flight", powerCount: 1, description: "Fly without propulsion." },
    { category: "Travel", code: "T22", maxRoll: 97, name: "Water Walking", powerCount: 1, description: "Walk on liquid." },
    { category: "Travel", code: "T23", maxRoll: 100, name: "Whirlwind", powerCount: 1, description: "Fly via cyclone." },
];

const TALENT_CATEGORIES_ULTIMATE_TABLE = [
    { maxRoll: 20, name: "Weapon Skills" },
    { maxRoll: 45, name: "Fighting Skills" },
    { maxRoll: 65, name: "Professional Skills" },
    { maxRoll: 85, name: "Scientific Skills" },
    { maxRoll: 90, name: "Mystic and Mental Skills" },
    { maxRoll: 100, name: "Other Skills" }
];

const TALENT_LIST_ULTIMATE_TABLE = [
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

const CONTACT_CATEGORIES_ULTIMATE_TABLE = [
    { maxRoll: 30, name: "Professional" },
    { maxRoll: 60, name: "Scientific" },
    { maxRoll: 90, name: "Political" },
    { maxRoll: 100, name: "Mystic Arts" },
];

const CONTACT_TYPE_LIST_ULTIMATE_TABLE = [
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
        category: "Professional", maxRoll: 95, name: "Espionage",
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


