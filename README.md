# Super Hero Comic Character Creator

I have been a collector of comic books for over 40 years. One of my favorite books was the **Official Handbook to the Marvel Universe**. This provided simple descriptions of the characters, including powers, talents, group affiliations, contacts, etc. This format inspired me to create new characters using a very simple random number generator and a set of rules that I created. The details of those rules are now lost to my childhood. Many years ago I came across the **Marvel Super Heroes** RPG by TSR and was immediately drawn to the system. I have never been an RPG player, but the system provided a simple character generation system.

This character generator was based heavily on the **Marvel Super Heroes Advanced Rulebook**, until I got my hands on
a copy of the Basic character generator. With v3.0, the generator mode can be switched between **Basic**, **Advanced**, and **Ultimate** mode.  For each mode, you can select between **Full** and **Generic** display mode.  Full display mode gives you all of the rank information you will need for RPG purposes.  Generic strips some of the details to provide a more generic character generator just for fun.  See the **Options** section for more details.  

I am still in th process of finishing up v3.0. You can take a look at the TODO list to see what is left.  As I was changing the Generic Mode to Basic Mode (after finding the Basic handbook), I ran into some debugging issues, so I stopped and did some massive enhancements to the testing framework.  Currently, there are a small handful of Physical Form attributes that are not working. I also haven't put more than very basic descriptions for the Powers.  Currently, Ultimate mode is using the same Talents as the Advanced mode. I plan to add the unofficial Ultimate Talents to the Ultimate mode. I will also be enhancing the Contacts types for the Ultimate mode.

# Use
Loading the page will automatically generate a new character.   

## Generate New Hero
Clicking the **Generate New Hero** button will clear the current character and generate a new character.   

### Options 
There are a number of options that can be changed when generating a new hero.
* System Mode
	* You can select between generating a character using the **Basic** rules, the **Advanced** rules, or the **Ultimate** rules.  The Basic rules are derived from the original **Marvel Super Heroes Campaign Book** (TSR6850XXXI919).  The Advanced rules are derived from the **Marvel Super Heroes Players' Book** (TSR6871XXXI901).  The Ultimate rules are derived from the Advanced rules plus the application of the **Marvel Super Heroes The Ultimate Powers Book** plus all UPB Addendas.  
* Display Mode
	* You can select between Full Display Mode and Generic Display Mode.  Full Mode is intended for for RPG purposes.  All Ranks and Rank Numbers are included on the character sheet.  Generic is intended for non-RPG purposes.  It displays the Rank name but does not include Rank Numbers.  In future versions, the descriptions will also be generalized.
* Identity
	* You can select between having a public identity and a secret identity.  Each has it's own advantages and disadvantages.  On the plus side, a secret identity protects those that are close to you.  From a generation standpoint, this setting will effect the Popularity scores.  Basic and Advanced/Ultimate handle Popularity in their own ways.

#### Basic Mode Options
* Origin
	* You can select between having a public origin or a private origin.  Each has it's own advantages and disadvantages.  From a generation standpoint, this setting will further effect the Popularity scores.
* Status
	* You can select between None, New in the Area, or Well-Established.  A Well-Established hero receives a +20 bonus to Popularity, reflecting the public's existing familiarity with the character.  A hero who is New in the Area will loose Popularity points.
* Popularity Adjustment
	* A "Looks Human" checkbox that, when enabled, grants a +10 bonus to Popularity.  This reflects the public's tendency to be more accepting of heroes who appear human in form.
* Contacts
	* Controls how many contacts the hero has.  "Equals Number of Powers" gives the hero a number of contacts equal to their power count.  "Randomly Generated" rolls the number of contacts from the quantity table.
* Power Selection
	* Controls how powers are determined.  "Choose from Category" allows you to manually select a power from each rolled category.  "Randomly Generated" rolls a random power within each category.

#### Advanced Mode Options
* Hi-Tech Resource Logic
	* Applies to Hi-Tech physical forms.  "Set to Good" automatically sets the hero's Resources rank to Good.  "Roll Randomly" rolls Resources normally from the random ranks table.
* For Bonus Powers
	* Controls how bonus powers are determined.  "Select Bonus Powers" opens a dialog where you can choose which bonus powers to add.  "Roll for Bonus Powers" randomly generates the bonus powers.
* Talent Groups
	* Controls how talents are determined.  "Select Talent Manually" opens a dialog where you can pick a talent from each available category.  "Roll Talent" randomly rolls a talent from each category.
* Contact Selection
	* Controls how contact types are determined.  "Select Contact Types" opens a dialog where you can choose the type for each contact.  "Roll Contact Types" randomly rolls the contact type.

#### Ultimate Mode Options
* Physical Form
	* Controls how the physical form sub-type is determined.  "Select Sub Form" opens a dialog where you can choose the physical form from a list.  "Roll Sub Form" randomly rolls the physical form.
* Hi-Tech Resource Logic
	* Same as Advanced mode.  Applies to Hi-Tech physical forms.  "Set to Good" automatically sets the hero's Resources rank to Good.  "Roll Randomly" rolls Resources normally from the random ranks table.
* For Bonus Powers
	* Same as Advanced mode.  "Select Bonus Powers" opens a dialog where you can choose which bonus powers to add.  "Roll for Bonus Powers" randomly generates the bonus powers.
* Talent Groups
	* Same as Advanced mode.  "Select Talent Manually" opens a dialog where you can pick a talent from each available category.  "Roll Talent" randomly rolls a talent from each category.
* Contact Selection
	* Same as Advanced mode.  "Select Contact Types" opens a dialog where you can choose the type for each contact.  "Roll Contact Types" randomly rolls the contact type.
* Apply all Optional Powers
	* Controls how optional powers are handled.  "Manually Select Optional Powers" opens a dialog where you can choose which optional powers to add, respecting the optionalPowerCount limit for each source and the total maximum power slots.  Powers that were already rolled are excluded from the selection.  "Apply all Optional Powers" automatically adds every listed optional power from each source.
* Talent Selection
	* Controls which talent table is used.  "Use Advanced Talents" generates talents from the Advanced mode talent table.  "Use Ultimate Talents" generates talents from the Ultimate Powers Book talent table, which includes additional talent options not found in the Advanced rules.

## Run Unit Tests
I tried to cover every possibility when programming and to make things organized and testable.   Unit Tests are small tests that exercise different parts of the generation process.  Clicking the **Run Unit Tests** button will run these unit tests and show the results of the tests below the character generation area.  This is helpful if you decide to expand the code in any way, so you can retest currently working parts of the system to make sure they are still working.  The Generator option is ignored when running Unit Tests.  All three generators are tested.

## Print Hero Sheet
Currently, the only way to save a generated character is to print the character sheet (to paper or PDF).  Clicking **Print Hero Sheet** will start the print process by giving you a preview of the sheet.

## Generation Log
Every time you generate a new character, the generation code writes to the Generation Log.   You can review these logs to see the random numbers generated as well as Base Rules used while generating each part of the character. 

# Copyrights/Acknowledgements

TSR is a registered trademark owned by TSR Inc. TSR inc. is a subsidiary of Wizards of the Coast, Inc., a division of Hasbro, Inc.

Names(s) of character(s) and the distinctive likeness(es) thereof are Trademarks and © of Marvel Characters, Inc. and are used without permission.

Names(s) of character(s) and the distinctive likeness(es) thereof are Trademarks and © of DC Comics and are used without permission.

This site/application is not intended to make money.  It provides resources to players of a game no longer being produced.
