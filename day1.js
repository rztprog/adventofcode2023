let total = 0;

const text = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const textSplited = text.split("\n");

textSplited.forEach((line) => {
    let numb = line.replaceAll(/[a-z]/gi, "").split("");
    total += Number(numb[0] + numb[numb.length -1]);
})

console.log(total);
