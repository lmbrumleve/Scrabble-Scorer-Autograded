// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function scrabbleScorer(word) {
	word = word.toLowerCase();
	let letterPoints = 0;
   let revisedPointStructure = transform(oldPointStructure);
   // revisedPointStructure[" "] = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (item in revisedPointStructure) {
      if (item === word[i]) {
         letterPoints += Number(revisedPointStructure[`${word[i]}`]);
      }
      
     }
	}
	return letterPoints;
 }
// function oldScrabbleScorer(word) {
// 	word = word.toUpperCase();
// 	let letterPoints = "";
 
// 	for (let i = 0; i < word.length; i++) {
 
// 	  for (const pointValue in oldPointStructure) {
 
// 		 if (oldPointStructure[pointValue].includes(word[i])) {
// 			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
// 		 }
 
// 	  }
// 	}
// 	return letterPoints;
//  }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   userInput = input.question("Let's play some scrabble! \n\nEnter a word: ");
   let validChars = "abcdefghijklmnopqrstuvwxyz ";
   let lowerCaseInput = userInput.toLowerCase();//makes all letters lower case for efficient comparison
   let singleChar;
   for(let i=0; i<userInput.length; i++) {//for each letter in userInput, the for loop iterates checking to see if that letter is included in the validInput string
      singleChar = lowerCaseInput[i];
      if (!validChars.includes(singleChar)) {
         console.log(`Sorry, invalid input. Please enter a word with characters a-z.`)
         initialPrompt();
      } 
   }//if the character is not found in the validChars string, the user will be prompted again. If not, the function returns the initial user input.
   
   return userInput;

};

let simpleScorer = function (word) {
noSpaces = word.replaceAll(" ", "");//removes spaces because blank tiles are worth 0
wordChars = noSpaces.split("");
numChars = wordChars.length;
return numChars;
};

let vowelBonusScorer = function (wordWithVowels){
   let aeiou = ['a', 'e', 'i', 'o', 'u'];
   let vowelArray = [];

   let noSpaces = wordWithVowels.replaceAll(" ", "")//removes spaces because blank tiles are worth 0
   let allLetters = noSpaces.split("");

      for (i=0; i<allLetters.length; i++) {
         for (j=0; j<aeiou.length; j++)
            if (allLetters[i].toLowerCase().includes(aeiou[j])) {
               vowelArray.push(allLetters[allLetters.indexOf(aeiou[j])]);
            }
      }

   let bonusScoreVowels = 3*vowelArray.length + (allLetters.length - vowelArray.length);

return bonusScoreVowels;

};

let simpleScore = {
   "name": "Simple Score",
   "description": "Each letter is worth 1 point.",
   "scorerFunction": simpleScorer
};

let bonusVowels = {
   "name": "Bonus Vowels",
   "description": "Vowels are 3 pts, consonants are 1 pt.",
   "scorerFunction": vowelBonusScorer
};

let scrabble = {
   "name": "Scrabble",
   "description": "The traditional scoring algorithm.",
   "scorerFunction": scrabbleScorer
};

const scoringAlgorithms = [simpleScore, bonusVowels, scrabble];

// console.log(scoringAlgorithms);

   // Simple scoring
   // console.log("algorithm name: ", scoringAlgorithms[0].name);
   // console.log("scoringFunction result: ", scoringAlgorithms[0].scoringFunction("JavaScript"));

function scorerPrompt() {
   userSelectedScoring = input.question(`Which scoring algorithm would you like to use?

0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scrabble point system
Enter 0, 1, or 2: `);
   if (userSelectedScoring === String(0)) {
      return simpleScore;
   } else if (userSelectedScoring === String(1)) {
      return bonusVowels;
   } else if (userSelectedScoring === String(2)) {
      return scrabble;
   } else {
      return input.question("Invalid input. Please enter 0, 1, or 2: ");
   }
} 

function transform(pointStructure) {
let letters = [];
let lowerCaseLetters = [];
let lettersNoCommas = [];

for (item in pointStructure) {//turns object properties into an array of strings
  pointStructure[item] = pointStructure[item].toString(); 
  letters.push(pointStructure[item]);
   }
for(i=0; i<letters.length; i++) {//makes object properties array lower case, and removes commas
   lowerCaseLetters.push(letters[i].toLowerCase());
   lettersNoCommas.push(lowerCaseLetters[i].replaceAll(",", ""));
}
// console.log(lettersNoCommas)
let newKeys = {};
for(j=0; j<lettersNoCommas.length; j++){//do the following for loop on each item in the array (forming 1 new key per letter on the whole array)
   for(i=0; i<lettersNoCommas[j].length; i++) {//iterate each letter of the string of lettersNoCommas[j] to form 1 new key per letter
   newKeys[`${lettersNoCommas[j][i]}`] = j+1;
   }
}
   let inconsistentValue1 = 8;
   let inconsistentValue2 = 10;

newKeys["j"] = inconsistentValue1;  
newKeys["x"] = inconsistentValue1;  
newKeys["q"] = inconsistentValue2; 
newKeys["z"] = inconsistentValue2;

return newKeys;
};

let newPointStructure = transform(oldPointStructure);
newPointStructure[" "] = 0; //blank tiles are worth 0

function runProgram() {
   userInput = initialPrompt();
   // console.log(scrabbleScorer(userInput));
   scoringObject = scorerPrompt();
   console.log(`Score for '${userInput}': ${scoringObject.scorerFunction(userInput)}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
