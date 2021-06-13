// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

// const {question} = require('readline-sync');
const prompt = require('syncprompt');

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

let initialPrompt = prompt("Let's play some scrabble!\n\nEnter a word to score: ");

// const oldScrabbleScorer = (word) => {
// 	let letterPoints = "";
 
// 	for (let i = 0; i < word.length; i++) {
 
// 	  for (const pointValue in oldPointStructure) {
 
// 		 if (oldPointStructure[pointValue].includes(word[i])) {prompt
// 			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
// 		 }
 
// 	  }
// 	}
// 	return letterPoints;
//  }

const simpleScore = (word) => {
    let points = 0;

    for (let i = 0; i < word.length; i++) {
        points += 1;
    }

    return points;
};

const vowelBonusScore = (word) => {
    let points = 0;
    const vowels = ['a', 'e', 'i', 'o', 'u'];

    for (let i = 0; i < word.length; i++) {
        if (vowels.includes(word[i].toLowerCase())) {
            points += 3;
        } else {
            points += 1;
        }
    }

    return points;
};

let scrabbleScore = (word) => {
    let points = 0;
        
    for (let i = 0; i < word.length; i++) {
        points += Number(newPointStructure[word[i].toLowerCase()]);
    }

    return points;
};

const scoringAlgorithms = [
    {
        name: "Simple Score",
        description: "Each letter is worth 1 point.",
        scorerFunction: word => simpleScore(word)
    },
    {
        name: "Bonus Vowels",
        description: "Vowels are 3 pts, consonants are 1 pt.",
        scorerFunction: word => vowelBonusScore(word)
    },
    {
        name: "Scrabble",
        description: "The traditional scoring algorithm.",
        scorerFunction: word => scrabbleScore(word)
    }
];

const scorerPrompt = () => {
    console.log('Which scoring algorithm would you like to use?\n\n' +
                '0 - Simple: One point per character\n' +
                '1 - Vowel Bonus: Vowels are worth 3 points\n' +
                '2 - Scrabble: Uses scrabble point system');
    let chosenAlgorithm = prompt('Enter 0, 1, or 2: ');

    while (chosenAlgorithm < 0 || chosenAlgorithm > 2 || isNaN(chosenAlgorithm)) {
        chosenAlgorithm = prompt('Enter 0, 1, or 2: ');
    }

    return scoringAlgorithms[chosenAlgorithm];
}

// Creating more efficient Scrabble score structure
const transform = (scoringObject) => {
    let newScoringObject = {};

    for (let key in scoringObject) {
        for (let i = 0; i < scoringObject[key].length; i++) {
            newScoringObject[scoringObject[key][i].toLowerCase()] = key;
        }
    }
    newScoringObject[' '] = 0;

    return newScoringObject;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   const chosenScoringAlgo = scorerPrompt();
   console.log(`Score for '${initialPrompt}': ${chosenScoringAlgo.scorerFunction(initialPrompt)}`);
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

