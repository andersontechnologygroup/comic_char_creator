# Table Attributes Reference

All attributes used across Basic, Advanced, and Ultimate data tables.

---

## PHYSICAL_FORM_TABLE

| Attribute | Basic | Advanced | Ultimate | Description |
|-----------|:-----:|:--------:|:--------:|-------------|
| `maxRoll` | ✅ | ✅ | ✅ | Roll range upper bound |
| `name` | ✅ | ✅ | ✅ | Physical form name |
| `column` | ✅ | ✅ | ✅ | Random Ranks column index |
| `description` | ✅ | ✅ | ✅ | Flavor text |
| `enduranceAdjustment` | ✅ | ✅ | ✅ | Modifier to Endurance ability |
| `popularityAdjustment` | ✅ | ✅ | ✅ | Modifier to Popularity |
| `powersCountAdjustment` | ✅ | ✅ | ✅ | Modifier to power slot count |
| `reasonAdjustment` | ✅ | ✅ | ✅ | Modifier to Reason ability |
| `isHiTech` | ✅ | — | ✅ | Marks as Hi-Tech wonder |
| `minimumReason` | ✅ | — | — | Sets minimum Reason rank |
| `bonusPowerCount` | ✅ | — | ✅ | Number of bonus powers granted |
| `bonusPower` | ✅ | — | ✅ | Bonus power string (pipe-delimited) |
| `popularitySet` | — | ✅ | — | Sets Popularity to fixed value |
| `powersCountMaximum` | — | ✅ | — | Caps power slot count |
| `resourcesStart` | — | ✅ | ✅ | Starting Resources level |
| `allPowersRankAdjustment` | — | — | ✅ | Modifier to all power ranks |
| `allPrimaryAbilitiesAdjustment` | — | — | ✅ | Modifier to all primary abilities |
| `allPhysicalAbilitiesAdjustment` | — | — | ✅ | Modifier to all physical abilities |
| `anyPrimaryAbilityAdjustment` | — | — | ✅ | Modifier to any one primary ability |
| `abilitiesToGenerate` | — | — | ✅ | Number of abilities to generate |
| `combinations` | — | — | ✅ | Combination roll table |
| `fightingAdjustment` | — | — | ✅ | Modifier to Fighting |
| `intuitionAdjustment` | — | — | ✅ | Modifier to Intuition |
| `psycheAdjustment` | — | — | ✅ | Modifier to Psyche |
| `strengthAdjustment` | — | — | ✅ | Modifier to Strength |
| `healthAdjustment` | — | — | ✅ | Modifier to Health formula |
| `popularityStart` | — | — | ✅ | Starting Popularity level |
| `resourcesAdjustment` | — | — | ✅ | Modifier to Resources |
| `resourcesSet` | — | — | ✅ | Sets Resources to fixed value |
| `bonusContact` | — | — | ✅ | Bonus contact string |
| `bonusContactCount` | — | — | ✅ | Number of bonus contacts |
| `subType` | — | — | ✅ | Sub-type filter (e.g., Angel/Demon) |

---

## ORIGIN_TABLE

| Attribute | Basic | Advanced | Ultimate |
|-----------|:-----:|:--------:|:--------:|
| `maxRoll` | ✅ | ✅ | ✅ |
| `name` | ✅ | ✅ | ✅ |
| `description` | — | — | ✅ |

---

## QUANTITY_TABLE

| Attribute | Basic | Advanced | Ultimate |
|-----------|:-----:|:--------:|:--------:|
| `maxRoll` | ✅ | ✅ | ✅ |
| `powers.initial` | ✅ | ✅ | ✅ |
| `powers.maximum` | ✅ | ✅ | ✅ |
| `talents.initial` | ✅ | ✅ | ✅ |
| `talents.maximum` | ✅ | ✅ | ✅ |
| `contacts.initial` | ✅ | ✅ | ✅ |
| `contacts.maximum` | ✅ | ✅ | ✅ |

---

## POWER_CATEGORIES_TABLE

| Attribute | Basic | Advanced | Ultimate |
|-----------|:-----:|:--------:|:--------:|
| `maxRoll` | ✅ | ✅ | ✅ |
| `name` | ✅ | ✅ | ✅ |
| `code` | — | — | ✅ |

---

## POWER_LIST_TABLE

| Attribute | Basic | Advanced | Ultimate | Description |
|-----------|:-----:|:--------:|:--------:|-------------|
| `category` | ✅ | ✅ | ✅ | Power category name |
| `maxRoll` | ✅ | ✅ | ✅ | Roll range upper bound |
| `name` | ✅ | ✅ | ✅ | Power name |
| `description` | ✅ | ✅ | ✅ | Full rules text |
| `powerCount` | ✅ | ✅ | ✅ | Slots consumed (default 1) |
| `code` | — | — | ✅ | Power code (e.g., "D1") |
| `bonusPower` | — | ✅ | ✅ | Bonus power string |
| `bonusPowerCount` | — | ✅ | ✅ | Number of bonus powers |
| `optionalPowers` | — | — | ✅ | Optional power string |
| `optionalPowersMax` | — | — | ✅ | Max optional powers |
| `rollExtraInformation` | — | — | ✅ | Extra info table name |
| `noRank` | — | — | ✅ | Power has no rank |
| `minRank` | — | — | ✅ | Minimum rank expression |

---

## TALENT_CATEGORIES_TABLE

| Attribute | Basic | Advanced | Ultimate |
|-----------|:-----:|:--------:|:--------:|
| `maxRoll` | ✅ | ✅ | ✅ |
| `name` | ✅ | ✅ | ✅ |

---

## TALENT_LIST_TABLE

| Attribute | Basic | Advanced | Ultimate | Description |
|-----------|:-----:|:--------:|:--------:|-------------|
| `category` | ✅ | ✅ | ✅ | Talent category name |
| `maxRoll` | ✅ | ✅ | ✅ | Roll range upper bound |
| `name` | ✅ | ✅ | ✅ | Talent name |
| `description` | ✅ | ✅ | ✅ | Rules text |
| `talentCount` | ✅ | ✅ | ✅ | Slots consumed (default 1) |
| `bonusContact` | — | — | ✅ | Bonus contact string |
| `bonusContactCount` | — | — | ✅ | Number of bonus contacts |
| `bonusContactType` | — | — | ✅ | Bonus contact type string |

---

## CONTACT_CATEGORIES_TABLE

| Attribute | Basic | Advanced | Ultimate |
|-----------|:-----:|:--------:|:--------:|
| `maxRoll` | ✅ | ✅ | ✅ |
| `name` | ✅ | ✅ | ✅ |

---

## CONTACT_TYPE_LIST_TABLE

| Attribute | Basic | Advanced | Ultimate | Description |
|-----------|:-----:|:--------:|:--------:|-------------|
| `category` | ✅ | ✅ | ✅ | Contact category name |
| `maxRoll` | ✅ | ✅ | ✅ | Roll range upper bound |
| `name` | ✅ | ✅ | ✅ | Contact name |
| `description` | ✅ | ✅ | ✅ | Rules text |
| `contactCount` | — | — | — | Slots consumed (default 1) |

---

## RANDOM_RANKS_TABLE

| Attribute | Basic | Advanced | Ultimate | Description |
|-----------|:-----:|:--------:|:--------:|-------------|
| `rank` | ✅ | ✅ | ✅ | Rank name |
| `rankNumber` | ✅ | ✅ | ✅ | Numeric rank value |
| `maxRolls` | ✅ | ✅ | ✅ | Array of max rolls per column |

Note: Basic has 8 ranks (Feeble–Amazing), Advanced has 9 (Shift 0–Amazing), Ultimate has 10 (Shift 0–Unearthly).
