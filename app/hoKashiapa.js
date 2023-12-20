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


let xArr = [0, 1000];
let yArr = [];

xArr.forEach((x) => {
    yArr.push(-(w[0] * x + b) / w[1]);
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
fs.writeFileSync("../images/lab2.png", buffer);





// Метрики


function minkowski_distance(x, y, p) {
    if (x?.length !== y?.length) {
        throw new Error('Векторы должны иметь одинаковую длину');
    }
    let distance = 0;
    for (let i in x) {
        distance += Math.abs(x[i] - y[i]) ** p;
        distance = distance ** (1/p)
    }
    return distance;
}

function euclidean_distance(x, y) {
    if (x?.length !== y?.length) {
        throw new Error('Векторы должны иметь одинаковую длину');
    }
    let distance = 0;
    for (let i in x) {
        distance += math.sqrt(math.sum((x[i] - y[i]) ** 2))
    }
    return distance;
}

function manhattan_distance(x, y) {
    if (x?.length !== y?.length) {
        throw new Error('Векторы должны иметь одинаковую длину');
    }
    let distance = 0;
    for (let i in x) {
        distance += math.sum(Math.abs(x[i] - y[i]))
    }
    return distance;
}

function canberra_distance(x, y) {
    if (x?.length !== y?.length) {
        throw new Error('Векторы должны иметь одинаковую длину');
    }
    let distance = 0;
    for (let i in x) {
        distance += math.sum(Math.abs(x[i] - y[i])) / (Math.abs(x[i]) - Math.abs(y[i]));
    }
    return distance;
}

let resulted = null;

resulted = canberra_distance(__features[0], __features[1]);
console.log(`Расстояние Канберры между векторами ${__features[0]} и ${__features[1]}: ${resulted}`);

resulted = manhattan_distance(__features[0], __features[1])
console.log(`Манхэттенское расстояние между векторами ${__features[0]} и ${__features[1]}: ${resulted}`)

resulted = euclidean_distance(__features[0], __features[1])
console.log(`Евклидово расстояние между векторами ${__features[0]} и ${__features[1]}: ${resulted}`)

p_value = 3
resulted = minkowski_distance(__features[0], __features[1], p_value)
console.log(`Метрика Минковского между векторами ${__features[0]} и ${__features[1]} с параметром ${p_value}: ${resulted}`);



