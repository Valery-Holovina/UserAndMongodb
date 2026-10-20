const bcrypt = require('bcryptjs') //is used to protect passwords.(turns a password into a hash)
const jwt = require('jsonwebtoken')
 
const User = require('../models/user')
const keys = require('../config/keys')
 
module.exports.login = async (req, res) => {
    // res.status(200).json({ message: 'User logged in successfully!' })
    const userdb = await User.findOne({email: req.body.email})
 
    if (userdb) {
        const isPasswValid = bcrypt.compareSync(req.body.password, userdb.password)
        if (isPasswValid) {
 
             const token = jwt.sign({
                email: userdb.email,
                userId: userdb._id
            }, keys.jwtSecret, {expiresIn: 60*60})
 
 
            res.status(200).json({ token: `Bearer ${token}` })  
        } else {
            res.status(401).json({ message: 'Invalid password!' })
        }
    } else {
        res.status(404).json({ message: 'User not found!' })
    }
 
}
 
module.exports.register = async (req, res) => {
    // res.status(200).json({
    //     message: 'User registered successfully!',
    //     login: {
    //         email: req.body.email,
    //         password: req.body.password
    //     }
    // })
 
    const userDb = await User.findOne({ email: req.body.email })
 
    if (userDb) {
        return res.status(409).json({ message: 'User with this email already exists!' })
    } else {
        const salt = bcrypt.genSaltSync(10) //is random data added to a password before hashing.(so passwords are not the same)
        const passw = bcrypt.hashSync(req.body.password, salt)
 
        const newUser = new User({
            email: req.body.email,
            password: passw
        })
 
        try {
            await newUser.save()
            res.status(201).json({ message: 'User registered successfully!' })
        } catch (err) {
            res.status(500).json({ message: 'Error registering user!' })
        }
    }
}  
