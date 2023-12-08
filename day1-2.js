let total = 0;

const objectNumbers = {
    'one': '1', 
    'two': '2', 
    'three': '3', 
    'four': '4', 
    'five': '5', 
    'six': '6', 
    'seven': '7',
    'eight': '8',
    'nine': '9'
}

const text = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

function findWordsPositions(inputString, objectNumbers) {
    const wordsPositions = [];

    for (const word in objectNumbers) {
        const regex = new RegExp(word, 'g');
        const positions = Array.from(inputString.matchAll(regex), match => match.index);

        if (positions.length > 0) {
            positions.forEach(position => {
                wordsPositions.push({ word: objectNumbers[word], position });
            });
        }
    }

    return wordsPositions.sort((a, b) => b.position - a.position);
}

function modifyStringWithWordsPositions(inputString, wordsPositions) {
    let modifiedString = inputString;

    for (const {word, position} of wordsPositions) {
        modifiedString = modifiedString.slice(0, position) + word + modifiedString.slice(position + word.length);    
    }

    return modifiedString;
}

text.split("\n").forEach((line) => {
    const wordsPositions = findWordsPositions(line, objectNumbers);
    const newLine = modifyStringWithWordsPositions(line, wordsPositions);

    let numb = newLine.replaceAll(/[a-z]/gi, "").split("");
    total += Number(numb[0] + numb[numb.length -1]);

    console.log(Number(numb[0] + numb[numb.length -1]));
})

console.log("Total = " + total);
