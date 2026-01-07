# Super Hero Comic Character Creator

I have been a collector of comic books for over 40 years. One of my favorite books was the **Official Handbook to the Marvel Universe**. This provided simple descriptions of the characters, including powers, talents, group affiliations, contacts, etc. This format inspired me to create new characters using a very simple random number generator and a set of rules that I created. The details of those rules are now lost to my childhood. Many years ago I came across the **Marvel Super Heroes** RPG by TSR and was immediately drawn to the system. I have never been an RPG player, but the system provided a simple character generation system.

This character generator is based (heavily) on the **Marvel Super Heroes Advanced Rulebook**. With v2.0, generator mode can be switch between **Generic** and **Advanced** mode, allowing you to generate characters for fun or for RPG purposes.  See the **Options** section for more details.  

# Use
Loading the page will automatically generate a new character.   

## Generate New Hero
Clicking the **Generate New Hero** button will clear the current character and generate a new character.   

### Options 
There are three options that can be changed when generating a new hero.
* Generator
    * You can select between generating a character using the **Generic** rules or the **Advanced** rules.  The Generic rules are a bit simpler and provide a more streamlined experience.  It is intended to be used for non-RPG purposed.  Powers, Talents, and Contacts have generic descriptions.   Abilities do not have rank values associated.  The Advanced rules are more complex and provide information for RPG purposes.  Advanced descriptions are based on the **Marvel Super Heroes Advanced Rulebook**.  The default is the Generic rules.
* Identity
	* You can select between having a public identity and a secret identity.  Each has it's own advantages and disadvantages.  On the plus side, a secret identity protects those that are close to you.  From a generation standpoint, this setting will effect the Popularity score with a public identity raising your Popularity significantly (+10) and a secret identity lowering it some (-5).
* If Hi-tech
	* A Hi-tech origin is generally considred to be from a character that has some money.   Therefore, the default position is that they have Good resources.  But you can choose to randomly roll your resources.   This might randomly roll a higher resource.  Or it might roll a lower one.   Only the "dice" can tell.   

## Run Unit Tests
I tried to cover every possibility when programming and to make things organized and testable.   Unit Tests are small tests that exercise different parts of the generation process.  Clicking the **Run Unit Tests** button will run these unit tests and show the results of the tests below the character generation area.  This is helpful if you decide to expand the code in any way, so you can retest currently working parts of the system to make sure they are still working.  The Generator option will be used when running Unit Tests.

## Print Hero Sheet
Currently, the only way to save a generated character is to print the character sheet (to paper or PDF).  Clicking **Print Hero Sheet** will start the print process by giving you a preview of the sheet.

## Generation Log
Every time you generator a new character, the generation code write to the Generation Log.   You can review these logs to see the random numbers generated as well as Base Rules used while generating each part of the character. 

# Copyrights/Acknowledgements

TSR is a registered trademark owned by TSR Inc. TSR inc. is a subsidiary of Wizards of the Coast, Inc., a division of Hasbro, Inc.

Names(s) of character(s) and the distinctive likeness(es) thereof are Trademarks and © of Marvel Characters, Inc. and are used without permission.

Names(s) of character(s) and the distinctive likeness(es) thereof are Trademarks and © of DC Comics and are used without permission.

This site/application is not intended to make money.  It provides resources to players of a game no longer being produced.
