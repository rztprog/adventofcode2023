// IN PROGRESS


const text = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`

const locationNumbers = [];
const seeds = text.match(/seeds:\s(.*)/)[1].split(/\s+/).map(Number)
const lines = text.split('\n');
const sections = [];
let currentSection = [];

for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    if (line === "") {
        if (currentSection.length > 0) {
            sections.push(currentSection);
            currentSection = [];
        }
    } else {
        if (/^\d/.test(line)) {
            line = line.split(' ').map(Number);
            currentSection.push(line);
        }
    }
}

if (currentSection.length > 0) {
    sections.push(currentSection);
}

console.log("---SECTIONS---");
console.log(sections);
console.log("---SECTIONS---");

seeds.forEach(seed => {
    let actualSeed = seed;

    sections.forEach(section => {


        section.forEach(list => {

            destinationRange = list[0];
            sourceRangeStart = list[1];
            rangeLength = list[2];

        })


    })



});