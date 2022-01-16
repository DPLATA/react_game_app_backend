const { v4: uuidv4 } = require("uuid")
const data = require('../data/data')

for (let index = 0; index < data.length; index++) {
    data[index].nickname = data[index].nickname+uuidv4();
    console.log(data[index]);
}