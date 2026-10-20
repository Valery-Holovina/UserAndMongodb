const mongoose = require('mongoose')
const Schema = mongoose.Schema
 
const positionSchema = new Schema({
    name: {
        type: String,  
        required: true,
    },
    cost:{
        type: Number,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'

    
    },
     category: {
    type: Schema.Types.ObjectId,
    ref: 'categories'
}
})
 
module.exports = mongoose.model('positions', positionSchema) 