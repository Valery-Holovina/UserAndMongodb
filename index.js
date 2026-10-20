//npm install morgan
// npm install cors
// npm install body-parser
//npm install mongoose
// npm i bcryptjs
//npm i jsonwebtoken

//npm install passport
//npm install passport-jwt



const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
 
 

 
const authRoutes = require('./routes/auth')
const categoryRouter = require('./routes/category')
const positionRouter = require('./routes/position')
const keys = require('./config/keys')


const app = express()
app.use(passport.initialize())
require('./middleware/passportjwt')(passport)




mongoose.connect(keys.mongoURI)
            .then( ()=> console.log('MongoDB connected'))
            .catch( err => console.log(err))


app.use(morgan('dev')) //Logs every request in your console in a clean “dev” format.

app.use(cors()) //Allows requests from different origins (domains). (Your frontend (e.g. localhost:3000) can’t talk to your backend (localhost:5000))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())  
 
app.use('/api/auth', authRoutes)
app.use('/api/categories', categoryRouter)  
app.use('/api/position', positionRouter)  
 
// app.get('/', (req, res) => {
//   // res.send('Hello World!')
//   res.status(200).json({ message: 'Hello World!' })
// })  
 
app.listen(6000, () => {
  console.log('Server is running on port 6000')
})
 
 