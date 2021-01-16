const mongoose = require('mongoose')
//const validator = require('validator')
const News = mongoose.model("News", {

    title:{
        type: String,
        unique:true,
      required:true,
      trim:true
    },
    describtion:{
        type: String,
        
    },
    author:{
        type: String,
        required:true,


    },
    date:{
        type: Date,
        default: Date.now ,
    },
})
module.exports = News