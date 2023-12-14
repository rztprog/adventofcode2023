const text = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

let total = 0;
const lines = text.split('\n');
const starsRegex = /\*/g

for (let line = 0; line < lines.length; line++) {
    const string = lines[line];
    const elements = [];

    Array.from(string.matchAll(starsRegex), match => match).forEach((star) => {
        elements.push({indexOnLine: star.index, allAround: ''});
    })

    elements.forEach((element) => {
        // Top
        if (line > 0) {
            let indexStart = element.indexOnLine;
            let indexEnd = element.indexOnLine;

            while (Number(lines[line - 1][indexStart - 1]) || Number(lines[line - 1][indexStart - 1]) == 0) {
                indexStart--
            }

            while (Number(lines[line - 1][indexEnd + 1]) || Number(lines[line - 1][indexEnd + 1]) == 0) {
                indexEnd++
            }
            
            element['allAround'] += lines[line - 1].slice(indexStart, indexEnd + 1)
        }

        // Line
        if (element.indexOnLine > 0) {
            let indexStart = element.indexOnLine - 1;
            let indexEnd = element.indexOnLine + 1; 

            while (Number(lines[line][indexStart]) || Number(lines[line][indexStart]) == 0) {
                indexStart--
            }

            while (Number(lines[line][indexEnd]) || Number(lines[line][indexEnd]) == 0) {
                indexEnd++
            }

            element['allAround'] += lines[line].slice(indexStart, indexEnd + 1);
        }

        // Bottom
        if (line < lines.length - 1) {
            let indexStart = element.indexOnLine;
            let indexEnd = element.indexOnLine;

            while (Number(lines[line + 1][indexStart - 1]) || Number(lines[line + 1][indexStart - 1]) == 0) {
                indexStart--
            }

            while (Number(lines[line + 1][indexEnd + 1]) || Number(lines[line + 1][indexEnd + 1]) == 0) {
                indexEnd++
            }
            
            element['allAround'] += lines[line + 1].slice(indexStart, indexEnd + 1)
        }
    });

    for (const element in elements) {
        const allAroundArray = Array.from(elements[element]['allAround'].matchAll(/\d+/g), match => match[0]);

        if (allAroundArray.length == 2) {
            total += allAroundArray.reduce((accumulator, currentValue) => {
                return accumulator * parseInt(currentValue, 10);
            }, 1);
        }
    }
}

console.log("Total = " + total);