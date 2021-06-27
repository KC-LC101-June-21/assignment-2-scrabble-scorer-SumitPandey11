// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

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

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //


function initialPrompt() {
   console.log("Let's play some scrabble!\n ");
   let userInput = input.question("Enter a word to score : ");
   let RegularExpressionPatter = /[^a-zA-Z]/;
   
   // reject invalid inputs other then above regularExpression and then re-prompt the user for the correct information
   while (RegularExpressionPatter.test(userInput)){
     userInput = input.question("Enter a word to score : ")
   }
   
   return userInput;
   //console.log(oldScrabbleScorer(userInput));
   //console.log(simpleScore(userInput));
   //console.log(vowelBonusScore(userInput));

};

//simpleScore: Define a function that takes a word as a parameter and returns a numerical score. Each letter within the word is worth 1 point.
let simpleScore = function(word){
  return (word.length);

};

//vowelBonusScore: Define a function that takes a word as a parameter and returns a score. Each vowel within the word is worth 3 points, and each consonant is worth 1 point.
let vowelBonusScore  = function(word){
  word = word.toUpperCase();
  let score = 0;
  let consonent = ['A','E','I','O','U'];
for(i = 0 ; i < word.length ; i++){
  if(consonent.includes(word[i])){
      score += 3;
  } else{
     score += 1;
  }
}
  return score;
};

let scrabbleScore = function(word){
  word = word.toLowerCase();
	let letterPoints = 0;
  //console.log(newPointStructure);
	for (let i = 0; i < word.length; i++) {
      //console.log("Key : " + word[i] + " " + newPointStructure[word[i]] + " letterPoints : " + letterPoints);
      letterPoints += newPointStructure[word[i]];
	}
	return letterPoints;

};

const scoringAlgorithms = [
    {
      name:"Simple Score" , 
      description : "Each letter is worth 1 point.", scoringFunction: simpleScore 
    },
    {
      name: "Bonus Vowels" , 
      description : "Vowels are 3 pts, consonants are 1 pt." ,
      scoringFunction: vowelBonusScore
    },
    {
      name: "Scrabble" , 
      description : "The traditional scoring algorithm.",
      scoringFunction: scrabbleScore
    }
  ];

//Finish writing scorerPrompt() so that the user can select which scoring algorithm to use when the program scores their word. Use the selected algorithm to determine the score for the word:
function scorerPrompt() {
  console.log("\nWhich scoring algorithm would you like to use? \n 0 - Simple: One point per character \n 1 - Vowel Bonus: Vowels are worth 3 points \n 2 - Scrabble: Uses scrabble point system");
  let algorithmToUse = input.question("Enter 0, 1, or 2: ");
  
  while(! (algorithmToUse === "0" || algorithmToUse === "1" || algorithmToUse === "2") ){
    algorithmToUse = input.question("Enter 0, 1, or 2: ");
  }

  return scoringAlgorithms[algorithmToUse].scoringFunction;
}

function transform(oldPointStructure) {
  let newPtStructure ={};
  let key;
  for (const pointValue in oldPointStructure) {
    
    for (i=0; i< oldPointStructure[pointValue].length;i++) {
      key = oldPointStructure[pointValue][i].toLowerCase();
			newPtStructure[key] = Number(pointValue);
		 }
  }

  return newPtStructure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   let usrInput = initialPrompt();
   let algoToUse = scorerPrompt();
   let score = algoToUse(usrInput);
   console.log(`Score of '${usrInput}': ${score}`);

}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

