const fs = require('fs');
const clasters = fs.readFileSync('../date/clasters.txt', { encoding: 'utf8', flag: 'r' });
const arr = JSON.parse(clasters);

const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;

const checkPoint = ({ x1, x2, myX, myY, a, b }) => (((myX - x1) / a)**2) + (((myY - x2) / b)**2) <= 1;




// генерация точек
let index = 0;
let points = [];
while (index <= 100000) {
    points.push({ x1: getRandomArbitrary(0, 10).toFixed(2), x2: getRandomArbitrary(0, 10).toFixed(2) })
    ++index;
}

let verificationPoints = []
arr.map((classItem, index) => {
    const { x1, x2, a, b, hex, itemsCount } = classItem;
    let counter = 0;

    verificationPoints.push({
        arrItem: index,
        points: []
    })

    points.map((item) => {
        const { x1: myX, x2: myY } = item;

        if (checkPoint({ x1, x2, myX, myY, a, b }) && counter <= +itemsCount) {
            verificationPoints[index].points.push({ myX, myY, hex })
            counter++
        }
    });
});

let data = JSON.stringify(verificationPoints);
fs.writeFileSync('../results/result.json', data);


