// IN PROGRESS

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

const navigateToEndZ = () => {
    const startNodes = nodes.filter(element => element[0].endsWith('A')).map(element => element);
    console.log(startNodes);
    let steps = 0;
    
    while(true) {
        for (let index = 0; index < startNodes.length; index++) {
            const direction = navigation[steps % navigation.length];
            const indexFinder = nodes.findIndex(element => element[0] === startNodes[index][1][direction]);
        
            startNodes[index][0] = nodes[indexFinder][0];
            startNodes[index][1] = nodes[indexFinder][1];

            if (startNodes.every(([node]) => node.endsWith('Z'))) {
                return steps;
            } 
        }

        steps++;
    }
}


console.log("Total Steps = " + navigateToEndZ());

