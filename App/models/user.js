var mongoose = require('mongoose');

// User Schema
var UserSchema = new mongoose.Schema({
    title : {
        type:String,
        required: true
    },
    name : {
        type:String,
        required: true
    },
    bio: {
        type:String
    },
    category : [
        {type: mongoose.Schema.Types.ObjectId,ref:'Category'}
    ]

},{
    timestamps: true
})

module.exports = mongoose.model('User',UserSchema);
