var mongoose = require('mongoose');

// User Schema
var CategorySchema = new mongoose.Schema({
    level : {
        type:String,
        required: true
    },
    subjects : {
        type:String,
        required: true
    },
    description : {
        type:String
    },
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Category',CategorySchema);
