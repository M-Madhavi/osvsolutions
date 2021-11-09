const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname:  {
        type:String,
        required:true,
        trim:true
    },
    lastname:  {
        type:String,
        required:true,
        trim:true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim:true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    mobilenumber:{
        type:String,
        required:true,
        unique:true,
        match:/^(\+\d{1,3}[- ]?)?\d{10}$/,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    age:{
      type:Number,
      required:true
    },
    gender:{
      type:String,
      default:"",
      enum: {values: ['male','female'], message: 'gender is required.'},
    },
    createdAt: Date,

});

module.exports = mongoose.model('Contact',contactSchema)
