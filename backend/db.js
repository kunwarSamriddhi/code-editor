const mongoose = require('mongoose')
const MONGO_URL = "mongodb://localhost:27017/jsfidget"

const dbConnect = () => {
    mongoose.connect(MONGO_URL)
        .then(() => {
            console.log("mongodb connected successfully");
        })
}

module.exports = dbConnect