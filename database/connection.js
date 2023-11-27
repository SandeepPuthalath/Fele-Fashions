const config = require("../config/config")
const mongoose  = require("mongoose")

function connectToDB() {

    // try {

    //     const ddb = new dynamoose.aws.ddb.DynamoDB({
    //         "credentials": {
    //             "accessKeyId": config.AWS_ACCESS_KEY_ID,
    //             "secretAccessKey": config.AWS_SECRET_KEY_ID
    //         },
    //         region: config.REGION
    //     })

    //     dynamoose.aws.ddb.set(ddb);
    // } catch (error) {
    //     console.log(`An Error has been occured: ${error.message}`)
    // }

    mongoose.connect(config.MONGODB_URI).then(() => {
        console.log("Database connected successfully")
    }).catch((err) => {
        console.error(err)
    })
}

module.exports = connectToDB
