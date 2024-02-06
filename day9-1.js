const text = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`

const lines = text.split('\n');
let extrapolatedValues = 0;

const splitter = (string) => {
    return string.split(' ').map(Number);
}

const sequencesPredictor = (firstSequence) => {
    const sequences = [firstSequence];

    while (!sequences[sequences.length - 1].every(element => element === 0)) {
        let newSequence = [];
        for (let index = 0; index < sequences[sequences.length - 1].length; index++) {
            const prediction = sequences[sequences.length - 1][index + 1] - sequences[sequences.length - 1][index];
            prediction || prediction == 0 ? newSequence.push(prediction) : sequences.push(newSequence);
        }
    }

    return sequences.reverse();
}

const sequencesExtrapolator = (sequencesPredictor) => {
    sequencesPredictor[0].push(0);

    for (let index = 1; index < sequencesPredictor.length; index++) {
        const lastValue = sequencesPredictor[index][sequencesPredictor[index].length - 1];
        const lastPreviousValue = sequencesPredictor[index - 1][sequencesPredictor[index].length  - 1];
    
        sequencesPredictor[index].push(lastValue + lastPreviousValue);
    }
    
    return sequencesPredictor[sequencesPredictor.length - 1].pop();
}

for (const line of lines) {
    extrapolatedValues += sequencesExtrapolator(sequencesPredictor(splitter(line)))
}

console.log("Sum = " + extrapolatedValues);
