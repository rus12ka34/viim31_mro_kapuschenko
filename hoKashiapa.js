const fs = require('fs');
const result = fs.readFileSync('result.json', { encoding: 'utf8', flag: 'r' });
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

const { w, b } = hoKashyap(__features, __labels)


function hoKashyap(X, y, a = 0.1, max = 10000) {
    let _X = X.map((item) => [ ...item, 1 ] );
    let w = _X[0].map((item) => 0);
    let b = 0;


    for (let i = 0; i < max; i++) {
        const matrix_w = math.matrix(w)
        const matrix_X = math.matrix(_X)

        let z = math.multiply(matrix_X, matrix_w)
        z = math.add(z, b)

        let e = z._data.map((item, i) => y[i] - (item < 0 ? -1 : 1));


        // console.log(e);
        let _w = math.multiply(a, math.multiply(math.transpose(matrix_X), e));
        w = w.map((item, i) => item + _w._data[i]);
        b += a * e.reduce((acc, item) => acc + item, 0);

        if (!e.find((item) => item !== 0)){
            break;
        }

    }

    return { w, b }
}

console.log('w >>> ', w);
console.log('b >>> ', b);



// рисуем линию

const width = 1000;
const height = 1000;

const canvas = createCanvas(width, height);
const context = canvas.getContext("2d");

context.fillStyle = "#cccccc";
context.fillRect(0, 0, width, height);

context.moveTo(0, 1000 - ((-w[0]) * 10));
context.lineTo(1000, 1000 - ((-w[1]) * 10));

context.stroke();


__features.map((item, i) => {
    const [me_x, me_y] = item;

    console.log(me_x, me_y);

    context.fillStyle = __labels[i] === 1 ? '#ff0000' : '#4ef300';
    context.fillRect(me_x*100, 1000 - me_y*100, 4, 4);
})

const buffer = canvas.toBuffer("image/png");
fs.writeFileSync("image3.png", buffer);



