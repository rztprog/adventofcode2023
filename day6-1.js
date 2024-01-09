const text = `Time:        53     83     72     88
Distance:   333   1635   1289   1532`

const duration = text.match(/Time:\s(.*)/)[1].trim().split(/\s+/).map(Number);
const distance = text.match(/Distance:\s(.*)/)[1].trim().split(/\s+/).map(Number);
let marginError = 0;

for (let index = 0; index < duration.length; index++) {
    let recordBeat = 0;

    for (let hold = 0; hold <= duration[index]; hold++) {
        if ((hold * (duration[index] - hold) > distance[index])) {
            recordBeat++;
        }
    }

    if (marginError == 0) {
        marginError = recordBeat
    } else {
        marginError *= recordBeat
    }
}

console.log("Number of ways = " + marginError);