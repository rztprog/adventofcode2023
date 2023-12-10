let text = `467..114..
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
let lines = text.split('\n');
const numberRegex = /\w+/g

for (let line = 0; line < lines.length; line++) {
    const string = lines[line];
    const elements = [];

    Array.from(string.matchAll(numberRegex), match => match).forEach((numb) => {
        elements.push({number: numb[0], indexOnLine: numb.index, charsAround: ''});
    })

    elements.forEach((element) => {
        if (!line == 0) {
            let indexStart = element.indexOnLine;
            let indexEnd = element.indexOnLine + element.number.length;

            if (indexStart > 0) {
                indexStart -= 1
            }

            if (indexEnd < lines[line].length - 1) {
                indexEnd += 1
            }
            
            element['charsAround'] += lines[line - 1].slice(indexStart, indexEnd)
        }

        if (!element.indexOnLine == 0) {
            element['charsAround'] += lines[line].slice(element.indexOnLine - 1, element.indexOnLine);
        }

        if (element.indexOnLine + element.number.length <= lines[line].length - 1) {
            element['charsAround'] += lines[line].slice(element.indexOnLine + element.number.length, element.indexOnLine + element.number.length + 1);
        }

        if (line < lines.length - 1) {
            let indexStart = element.indexOnLine;
            let indexEnd = element.indexOnLine + element.number.length;

            if (indexStart > 0) {
                indexStart -= 1
            }

            if (indexEnd < lines[line].length - 1) {
                indexEnd += 1
            }

            element['charsAround'] += lines[line + 1].slice(indexStart, indexEnd);
        }
    });

    elements.forEach((element) => {
        if (element.charsAround.search(/[^.]/) !== -1) {
            total += parseInt(element.number)
        }
    });
}

console.log("Total = " + total);