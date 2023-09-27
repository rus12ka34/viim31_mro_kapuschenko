const fs = require('fs');
const commonData = fs.readFileSync('date/commonData.txt', { encoding: 'utf8', flag: 'r' });
const clasters = fs.readFileSync('date/clasters.txt', { encoding: 'utf8', flag: 'r' });

const arr = JSON.parse(clasters);
const common = JSON.parse(commonData);

const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
}


const checkPoint = ({ x1, x2, R, setX, setY, a, b }) => {

    return ((Math.pow(setX, 2) / Math.pow(a, 2))) + ((Math.pow(setY, 2) / Math.pow(b, 2))) <= 1

    // return (Math.pow((setX - x1), 2) + Math.pow((setY - x2), 2)) <= Math.pow(R, 2);
};

// генерация точек
let index = 0;
let points = [];
while (index <= 10000) {
    points.push({ x1: getRandomArbitrary(0, 10).toFixed(2), x2: getRandomArbitrary(0, 10).toFixed(2) })
    ++index;
}


let verificationPoints = []



arr.map((classItem, index) => {
    const { x1, x2, R, a, b } = classItem;

    verificationPoints.push({
        arrItem: index,
        points: []
    })

    points.map((item) => {
        const { x1: setX, x2: setY } = item;

        if (checkPoint({ x1, x2, R, setX, setY, a, b })) {
            verificationPoints[index].points.push({ setX, setY })
        }
        // else console.log('false >>> ', item)
    });
});

let data = JSON.stringify(verificationPoints);
fs.writeFileSync('result.json', data);


// console.log(verificationPoints);


