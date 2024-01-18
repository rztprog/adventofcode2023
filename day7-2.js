const text = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const strength = {
    'A': 14,
    'K': 13,
    'Q': 12,
    'T': 10,
    'J': 1
};

const hands = text.split('\n');
let totalWinnings = 0;

const occurrencesCounter = (arr) => {
    let occurrences = {};
    let highest = 0, doubles = 0, triples = 0, quadruples = 0, quintuples = 0;
    let countJ = 0;

    arr.forEach(element => {
        if (highest < strength[element]) {
            highest = strength[element];
        }

        if (element === "J") {
            countJ++;
        } else {
            (occurrences[element]) ? occurrences[element]++ : occurrences[element] = 1;
        }
    });

    if (countJ === 5) {
        occurrences["J"] = 5;
    } else if (countJ > 0) {
        const objArray = Object.entries(occurrences).map(([key, value]) => ({ [key]: value }));

        objArray.sort((a, b) => {
            const [aKey, aValue] = [Object.keys(a)[0], a[Object.keys(a)[0]]];
            const [bKey, bValue] = [Object.keys(b)[0], b[Object.keys(b)[0]]];
            const aKeyStrength = isNaN(aKey) ? strength[aKey] : aKey;
            const bKeyStrength = isNaN(bKey) ? strength[bKey] : bKey;
        
            return (aValue === bValue) ? bKeyStrength - aKeyStrength : bValue - aValue;
        });
    
        const key = Object.keys(objArray[0])[0];
        objArray[0][key] += countJ;

        occurrences = Object.assign({}, ...objArray);
    }

    for (const count of Object.values(occurrences)) {
        if (count === 2) {
            doubles++;
        } else if (count === 3) {
            triples += 3;
        } else if (count === 4) {
            quadruples += 5;
        } else if (count === 5) {
            quintuples += 6;
        }
    }

    return { highest, doubles, triples, quadruples, quintuples };
}

const compareLeftToRight = (aCard, bCard) => {
    for (let i = 0; i < aCard.length; i++) {
        const cardA = isNaN(aCard[i]) ? strength[aCard[i]] : aCard[i];
        const cardB = isNaN(bCard[i]) ? strength[bCard[i]] : bCard[i];

        if (cardA !== cardB) {
            return cardA - cardB;
        }
    }
}

for (let index = 0; index < hands.length; index++) {
    hands[index] = hands[index].split(' ');
    hands[index][0] = hands[index][0].split('');
    hands[index][2] = occurrencesCounter(hands[index][0]);
}

hands.sort((a, b) => {
    const totalA = a[2].doubles + a[2].triples + a[2].quadruples + a[2].quintuples;
    const totalB = b[2].doubles + b[2].triples + b[2].quadruples + b[2].quintuples;

    return (totalA !== totalB) ? totalA - totalB : compareLeftToRight(a[0], b[0]);
});

for (let index = 0; index < hands.length; index++) {
    totalWinnings += hands[index][1] * (index + 1);
}

console.log("Total Winnings = " + totalWinnings);
