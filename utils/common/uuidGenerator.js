const uuid = require("uuid")

const generateId = () =>{
    return uuid.v1()
}

module.exports = {
    generateId
}