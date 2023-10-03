const fs = require('fs');
const { createCanvas } = require('canvas');


const result = fs.readFileSync('result.json', { encoding: 'utf8', flag: 'r' });
const resultJson = JSON.parse(result);

const width = 1000;
const height = 1000;

const canvas = createCanvas(width, height);
const context = canvas.getContext("2d");

context.fillStyle = "#cccccc";
context.fillRect(0, 0, width, height);

resultJson.map((classItem) => {
    const { points } = classItem;

    points.map((point) => {
        const { myX, myY, hex } = point;
        context.fillStyle = hex;
        context.fillRect(myX*100, 1000 - myY*100, 4, 4);
    });
})

const buffer = canvas.toBuffer("image/png");
fs.writeFileSync("image.png", buffer);