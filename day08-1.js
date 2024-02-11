const text = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`

const lines = text.split('\n');
const navigation = lines[0].replace(/L/gi, 0).replace(/R/gi, 1);
const nodes = lines.slice(2);

for (let index = 0; index < nodes.length; index++) {
    const decomp = nodes[index].match(/(\w+)/g);
    nodes[index] = [decomp[0], [decomp[1], decomp[2]]];
}

const navigateToZZZ = () => {
    const startNode = nodes[nodes.findIndex(element => element[0] == 'AAA')];
    let steps = 0;
    let [starter, nextElement] = [startNode[0], startNode[1]];

    while(starter != 'ZZZ') {
        const direction = navigation[steps % navigation.length];
        const indexFinder = nodes.findIndex(element => element[0] === nextElement[direction]);
    
        starter = nodes[indexFinder][0];
        nextElement = nodes[indexFinder][1];
    
        steps++;
    }

    return steps;
}

console.log("Total Steps = " + navigateToZZZ());