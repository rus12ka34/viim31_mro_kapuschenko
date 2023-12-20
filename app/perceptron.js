const fs = require('fs');
const result = fs.readFileSync('../results/result.json', { encoding: 'utf8', flag: 'r' });
const resultJson = JSON.parse(result);
const { createCanvas } = require('canvas');

const math = require('mathjs');


let __features = [];
let __labels = [];

resultJson.forEach((item) => {
    item.points.forEach((point, i) => {
        __labels.push(item.arrItem === 0 ? -1 : 1)
        __features.push([+point.myX, +point.myY])
    })
})

function perceptron(data, label, e) {
    let w = [0, 1];
    let b = 0;
    let separated = false;

    while (!separated) {
        separated = true;
        for (let i = 0; i <= data.length; i++) {

            if (((label[i] * (w[0] * data[i]?.[0] + w[1] * data[i]?.[1] + b)) <= 0)) {
                separated = false;
                w[0] += e * label[i] * data[i][0]
                w[1] += e * label[i] * data[i][1]
                b += e * label[i]
            }
        }

    }

    let slope = -w[0] / w[1];
    let intercept = -b / w[1];
    return { slope, intercept }
}

const { slope, intercept } = perceptron(__features, __labels, 1);


// нарисовать точки



let xArr = [0, 1000];
let yArr = [];

xArr.forEach((x) => {
    yArr.push(intercept + slope * x);
})

console.log('xArr >>> ', xArr);
console.log('yArr >>> ', yArr);

// рисуем линию

const width = 1000;
const height = 1000;

const canvas = createCanvas(width, height);
const context = canvas.getContext("2d");

context.fillStyle = "#cccccc";
context.fillRect(0, 0, width, height);

context.moveTo(xArr[0], 1000 - yArr[0]);
context.lineTo(xArr[1], 1000 - yArr[1]);

context.stroke();



__features.map((item, i) => {
    const [me_x, me_y] = item;

    context.fillStyle = __labels[i] === 1 ? '#ff0000' : '#4ef300';
    context.fillRect(me_x*100, 1000 - me_y*100, 4, 4);
})

const buffer = canvas.toBuffer("image/png");
fs.writeFileSync("../images/lab4.png", buffer);