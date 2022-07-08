const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//import validation
const {
    registerValidation
} = require('../config/validation')

//import models
const User = require('../models/User')

//register
router.post('/register', async (req, res) => {

    const {
        error
    } = registerValidation(req.body)

    if (error) return res.status(400).json({
        status: res.statusCode,
        message: error.details[0].message
    })

    // check email exist
    const emailExist = await User.findOne({
        email: req.body.email
    })
    if (emailExist) return res.status(400).json({
        status: res.statusCode,
        message: 'Email already used'
    })

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const users = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })

    try {
        const saveUser = await users.save()
        res.json(saveUser)
    } catch (err) {
        res.status(400).json({
            status: res.statusCode,
            message: 'Failed to create new user'
        })
    }
})

//login
router.post('/login', async (req, res) => {
    // check email
    const user = await User.findOne({
        email: req.body.email
    })
    if (!user) return res.status(400).json({
        status: res.statusCode,
        message: 'Your email is incorrect!'
    })

    //check password
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).json({
        status: res.statusCode,
        message: 'Your password is incorrect!'
    })

    //create token using JWT
    const token = jwt.sign({
        _id: user._id
    }, process.env.SECRET_KEY)
    res.header('auth-token', token).json({
        token: token
    })
})

module.exports = router