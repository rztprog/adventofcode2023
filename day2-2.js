const text = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

let sumSets = 0;

text.split("\n").forEach((line) => {
    const regexSpliter = /(Game\s(\d+)):\s(.*)/g
    const separateRegex = /(\d+)\s(.+)/
    const match = regexSpliter.exec(line);

    const lineDecompose = {
        'r': 0,
        'g': 0,
        'b': 0
    }

    Array.from(match[3].match(/\d+\s\w/g), match => match).forEach((set) => {
        const separate = separateRegex.exec(set);
        if (parseInt(separate[1]) > lineDecompose[separate[2]]) {
            lineDecompose[separate[2]] = parseInt(separate[1])
        }
    })

    sumSets += Object.values(lineDecompose).reduce((acc, value) => acc * value);
})

console.log(sumSets);
