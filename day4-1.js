const text = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`

let total = 0;

const regexSpliter = /(Card\s+(\d+)):(.*)/

text.split("\n").forEach((line) => {
    let points = 0;

    const card = regexSpliter.exec(line)[3].split('|');
    
    card[0] = card[0].trim().split(/\s+/).map(Number)
    card[1] = card[1].trim().split(/\s+/).map(Number)

    for (const winningNumbers in card[0]) {
        for (const cardNumbers in card[1]) {
            if (card[0][winningNumbers] == card[1][cardNumbers]) {
                (points < 2) ? points++ : points *= 2 
            }
        }
    }
    
    total += points;
})

console.log("Total = " + total);