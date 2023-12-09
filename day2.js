const text = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

let possibleGame = 0;

text.split("\n").forEach((line) => {
    const regexSpliter = /(Game\s(\d+)):\s(.*)/g
    const match = regexSpliter.exec(line);
    let impossible = 0;

    Array.from(match[3].match(/\d+\s\w/g), match => match).forEach((set) => {
        const separateRegex = /(\d+)\s(.+)/
        const separate = separateRegex.exec(set);

        switch (separate[2]) {
            case 'r':
                if (parseInt(separate[1]) > 12) {
                    impossible++;
                }
                break;  
            case 'g':
                if (parseInt(separate[1]) > 13) {
                    impossible++;
                }
                break;  
            case 'b':
                if (parseInt(separate[1]) > 14) {
                    impossible++;
                }
                break;      
            default:
                break;
        }
    })

    if (impossible === 0) {
        possibleGame += parseInt(match[2]);
    } else {
        // console.log(`error on game ${parseInt(match[2])}`);
    }
})

console.log(possibleGame);
