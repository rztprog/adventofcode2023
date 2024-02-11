const text = `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`

function findSIndex(data) {
    if (typeof data == "string") {
        return data.indexOf("S");
    }
    
    if (typeof data == "object") {
        return data.findIndex( (element) => element.toString().search(/S/) !== -1 )
    }
}

function nextKeyFounder(pipesAroundObject) { 
    for (const key in pipesAroundObject) {
        if (pipesWaysObject.hasOwnProperty(pipesAroundObject[key][0]) && validWay(key, pipesAroundObject[key][0])) {

            pipeArrayIndex = pipesAroundObject[key][1];
            pipeStringIndex = pipesAroundObject[key][2];

            pipesAround = {
                'top':      [pipeArrayIndex > 0 ? lines[pipeArrayIndex - 1][pipeStringIndex] : ".", pipeArrayIndex - 1, pipeStringIndex],
                'right':    [pipeStringIndex < lines[0].length - 1 ? lines[pipeArrayIndex][pipeStringIndex + 1] : ".", pipeArrayIndex, pipeStringIndex + 1],
                'bottom':   [pipeArrayIndex < lines.length - 1 ? lines[pipeArrayIndex + 1][pipeStringIndex] : ".", pipeArrayIndex + 1, pipeStringIndex],
                'left':     [pipeStringIndex > 0 ? lines[pipeArrayIndex][pipeStringIndex - 1] : ".", pipeArrayIndex, pipeStringIndex - 1]
            }

            for (const direction in pipesAround) {
                if (!pipesWaysObject[pipesAroundObject[key][0]].includes(direction)) {
                    delete pipesAround[direction];
                }
            }
            delete pipesAround[deletePreviousWay(key)];

            return lines[pipeArrayIndex][pipeStringIndex];
        }
    }
}

function deletePreviousWay(way) {
    const oppositeDirections = {
        'left': 'right',
        'right': 'left',
        'top': 'bottom',
        'bottom': 'top'
    };
    return oppositeDirections[way];
}

function validWay(way, pipe) {
    const validPipes = {
        top: ['|', '7', 'F'],
        right: ['-', 'J', '7'],
        bottom: ['|', 'L', 'J'],
        left: ['-', 'L', 'F']
    };
    return validPipes[way].includes(pipe);
}

const lines = text.split('\n');
const pipesWaysObject = {
    '|': ['top', 'bottom'],
    '-': ['right', 'left'],
    'L': ['top', 'right'],
    'J': ['top', 'left'],
    '7': ['bottom', 'left'],
    'F': ['bottom', 'right']
};

let pipeArrayIndex = findSIndex(lines);
let pipeStringIndex = findSIndex(lines[pipeArrayIndex]);
let pipesAround = {
    'top':      [pipeArrayIndex > 0 ? lines[pipeArrayIndex - 1][pipeStringIndex] : ".", pipeArrayIndex - 1, pipeStringIndex],
    'right':    [pipeStringIndex < lines[0].length - 1 ? lines[pipeArrayIndex][pipeStringIndex + 1] : ".", pipeArrayIndex, pipeStringIndex + 1],
    'bottom':   [pipeArrayIndex < lines.length - 1 ? lines[pipeArrayIndex + 1][pipeStringIndex] : ".", pipeArrayIndex + 1, pipeStringIndex],
    'left':     [pipeStringIndex > 0 ? lines[pipeArrayIndex][pipeStringIndex - 1] : ".", pipeArrayIndex, pipeStringIndex - 1]
}

let steps = 1;
let nextWay = nextKeyFounder(pipesAround, pipesWaysObject);

while(nextWay) {
    nextWay = nextKeyFounder(pipesAround);
    steps++;
}

console.log("Farthest starting position = " + steps / 2);