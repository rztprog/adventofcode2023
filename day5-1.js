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

const seeds = text.match(/seeds:\s(.*)/)[1].split(/\s+/).map(Number)
const lines = text.split('\n');
const sections = [];
let locationNumber = seeds[0];
let currentSection = [];
let destinationRangeStart, sourceRangeStart, rangeLength;

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

seeds.forEach(seed => {
    let actualNumber = seed;
    
    sections.forEach(section => {
        
        for (let index = 0; index < section.length; index++) {
            destinationRangeStart = section[index][0];
            sourceRangeStart = section[index][1];
            rangeLength = section[index][2];
            
            if (actualNumber >= sourceRangeStart && actualNumber <= sourceRangeStart + (rangeLength - 1)) {
                actualNumber = destinationRangeStart + (actualNumber - sourceRangeStart);
                break;
            }
        }
    })

    if (locationNumber > actualNumber) {
        locationNumber = actualNumber
    }
});

console.log("Lowest = " + locationNumber);