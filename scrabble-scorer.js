// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const {question} = require('readline-sync');

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

let initialPrompt = () => {
    console.log("Let's play some scrabble!\n\nEnter a word to score: ");
}

let userWord = question("Let's play some scrabble!\n\nEnter a word to score: ");

const oldScrabbleScorer = (word) => {
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

const simpleScore = (word) => {
    return word.length;
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
        scoringFunction: simpleScore
    },
    {
        name: "Bonus Vowels",
        description: "Vowels are 3 pts, consonants are 1 pt.",
        scoringFunction: vowelBonusScore
    },
    {
        name: "Scrabble",
        description: "The traditional scoring algorithm.",
        scoringFunction: scrabbleScore
    }
];

const scorerPrompt = () => {
    console.log('Which scoring algorithm would you like to use?\n\n' +
                '0 - Simple: One point per character\n' +
                '1 - Vowel Bonus: Vowels are worth 3 points\n' +
                '2 - Scrabble: Uses scrabble point system');
    let chosenAlgorithm = question('Enter 0, 1, or 2: ');

    while (chosenAlgorithm < 0 || chosenAlgorithm > 2 || isNaN(chosenAlgorithm)) {
        chosenAlgorithm = question('Enter 0, 1, or 2: ');
    }

    return scoringAlgorithms[chosenAlgorithm];
}

// Creating more efficient Scrabble score structure
const transform = (scoringObject) => {
    let newScoringObject = {};

    for (let key in scoringObject) {
        for (let i = 0; i < scoringObject[key].length; i++) {
            newScoringObject[scoringObject[key][i].toLowerCase()] = Number(key);
        }
    }
    // newScoringObject[' '] = 0;

    return newScoringObject;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
    initialPrompt();
    const chosenScoringAlgo = scorerPrompt();
    console.log(`Score for '${userWord}': ${chosenScoringAlgo.scoringFunction(userWord)}`);
}

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