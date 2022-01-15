const express = require('express')
const appConfig = require('./configs/app')
const server = express()
//TODO: setup db
//TODO: refactor routing
//TODO: work with data

server.listen(appConfig.express_port, () => {
    let message = '(http://localhost:' + appConfig.express_port + ')'
    console.log('It\'s alive! ' + message)
})

server.get('/', (req, res) => {
    res.status(200).json({'message': 'OK'})
})

module.exports = server
