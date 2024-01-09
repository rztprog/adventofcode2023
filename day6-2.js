const text = `Time:        53     83     72     88
Distance:   333   1635   1289   1532`

const duration = Number(text.match(/Time:\s(.*)/)[1].replace(/\s/g, ""));
const distance = Number(text.match(/Distance:\s(.*)/)[1].replace(/\s/g, ""));
let recordBeat = 0;

for (let hold = 0; hold <= duration; hold++) {
    if ((hold * (duration - hold) > distance)) {
        recordBeat++;
    }
}

console.log("Number of ways = " + recordBeat);