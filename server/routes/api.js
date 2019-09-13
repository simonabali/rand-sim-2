const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Message = require('../models/Message').model

router.post('/login/', function (req, res) {
    const username = req.body.username

    User.findOne({ name: username }, function (err, existingUser) {

        const user = existingUser ?
            existingUser :
            new User({ name: username, friends: [], messages: [] })

        if (!existingUser) { user.save() }

        res.send(user)
    })
})

router.post('/message', function (req, res) {
    const payload = req.body
    const message = new Message({ sender: payload.sender, text: payload.text })

    User.findOne({ name: payload.to }, function (err, user) {
        if (user) {
            user.messages.push(message)
            user.save()
            res.end()
        }
        else{
            res.send("User does not exist")
        }
    })
})

router.put('/friend', function(req, res){
    console.log(req.body)
    let currentUser = req.body.currentUser 
    let friendToAdd = req.body.friendToAdd
    User.findOneAndUpdate({"name": currentUser}, {$push: {"friends": friendToAdd}}, {new: true}, function(error, res){
        console.log("Updated the current user")
    })
    User.findOneAndUpdate({"name": friendToAdd}, {$push: {"friends": currentUser}}, {new: true}, function(error, res){
        console.log("Updated the friend")
    })
    res.end()
})

router.get("/friends/:user", function(req,res){
    let user = req.params.user
    User.find({"name":user}, {"friends":1, "_id": 0}, function(err, response){
        res.send(response)
    } )
})
module.exports = router