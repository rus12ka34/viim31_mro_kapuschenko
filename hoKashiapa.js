const fs = require('fs');


const result = fs.readFileSync('result.json', { encoding: 'utf8', flag: 'r' });
const resultJson = JSON.parse(result);


const transpose = matrix => matrix[0].map((col, i) => matrix.map(row => row[i]));

const multiplyMatrix = (A, B) => {
    var rowsA = A.length,
        colsA = A[0].length,
        rowsB = B.length,
        colsB = B[0].length,
        C = [];
    if (colsA != rowsB) return false;
    for (var i = 0; i < rowsA; i++) C[i] = [];
    for (var k = 0; k < colsB; k++) {
        for (var i = 0; i < rowsA; i++) {
            var t = 0;
            for (var j = 0; j < rowsB; j++) t += A[i][j] * B[j][k];
            C[i][k] = t;
        }
    }
    return C;
}

const MatrixPow = (A, n) => {
    if (n === 1) return A;
    else return multiplyMatrix(A, MatrixPow(A, n - 1));
}

// console.log('resultJson >>> ', resultJson);

// a

let x = {
    x1: [1, 2, 1],
    x2: [0, 2, 1],
    x3: [-1, -3, -1],
    x4: [-3, -2, -1],
}
// b

const V = [...Object.values(x).map((x) => x)];

// v

// не закочил возведение в степень (-1)
const _V = ( multiplyMatrix(transpose(V), V) ** -1) * transpose(V);


// продолжаю идти по алгаритму:
// https://www.pvsm.ru/algoritmy/198772

console.log();





//
// const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;
//
// const checkPoint = ({ x1, x2, myX, myY, a, b }) => (((myX - x1) / a)**2) + (((myY - x2) / b)**2) <= 1;
//
// // генерация точек
// let index = 0;
// let points = [];
// while (index <= 100000) {
//     points.push({ x1: getRandomArbitrary(0, 10).toFixed(2), x2: getRandomArbitrary(0, 10).toFixed(2) })
//     ++index;
// }
//
//
// let verificationPoints = []
// arr.map((classItem, index) => {
//     const { x1, x2, a, b, hex, itemsCount } = classItem;
//     let counter = 0;
//
//     verificationPoints.push({
//         arrItem: index,
//         points: []
//     })
//
//     points.map((item) => {
//         const { x1: myX, x2: myY } = item;
//
//         if (checkPoint({ x1, x2, myX, myY, a, b }) && counter <= +itemsCount) {
//             verificationPoints[index].points.push({ myX, myY, hex })
//             counter++
//         }
//     });
// });
//
// let data = JSON.stringify(verificationPoints);
// fs.writeFileSync('result.json', data);


