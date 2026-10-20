const mongoose = require('mongoose')
const Schema = mongoose.Schema
 
const categorySchema = new Schema({
    name: {
        type: String,  
        required: true,
    },
    imageSrc: {
        type: String,
        default: 'https://www.pngall.com/wp-content/uploads/5/Category-Icon-PNG-Picture.png'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'

        // type: String,
        // default: 'admin'
    }
})
 
module.exports = mongoose.model('categories', categorySchema)  