const User      = require('../models/User')
const bcrypt    = require('bcryptjs')
const jwt       = require('jsonwebtoken')

const singup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if(err) {
            res.status(error.status || 500)
            res.json({
                message: 'error message'
            })
        }

        let user = new User ({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
            phone: {
                ddd: req.body.phone.ddd,
                phoneNumber: req.body.phone.phoneNumber
            }
        })
        user.save()
        .then(user => {
            res.status(201).send({
                message: 'Added Successfuly',
            })
        })
        .catch(error => {
            res.status(error.status || 500)
            res.json({
                message: 'error message'
            })
        })
    })
}

const singin = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({email:username})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, function(err, result){
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({name: user.name}, 'secretValue', {expiresIn: '1h'})
                    res.json({
                        message: 'Login Successful!',
                        token
                    })
                }else{
                    res.json({
                        message: 'Password does not matched!'
                    })
                }
            })
        }else {
            res.json({
                message: 'No user found'
            })
        }
    })
}

module.exports = {
    singup, singin
}