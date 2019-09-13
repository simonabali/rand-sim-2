const mongoose = require('mongoose')
const message = require('./Message')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    friends: [this], //this = userSchema
    messages: [message.schema]
})

const User = mongoose.model("User", userSchema)

module.exports = User