const mongoose = require('mongoose')
const { Schema } = mongoose;

const userCodeSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    html: {
        type: String,
        default: '',
    },
    css: {
        type: String,
        default: '',
    },
    js: {
        type: String,
        default: '',
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
})

const UserCode = mongoose.model('UserCode', userCodeSchema)
module.exports = UserCode