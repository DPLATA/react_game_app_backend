const { v4: uuidv4 } = require("uuid")
const data = require('../data/data')
const fs = require('fs')


for (let index = 0; index < data.length; index++) {
    data[index].nickname = data[index].nickname.replace(/\s/g, '');
    data[index].nickname = data[index].nickname+uuidv4();
    data[index].password = uuidv4()+Date.now();
}

// convert JSON object to string
const new_data = JSON.stringify(data);

// write JSON string to a file

try {
    fs.writeFileSync('../data/players.json', new_data);
    console.log("JSON data is saved to file.");
} catch (error) {
    console.error(error);
}

