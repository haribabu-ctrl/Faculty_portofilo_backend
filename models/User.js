const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role:{
        type : String,
        enum : ['Admin', 'HOD', 'Staff'],
        default : 'Staff'
    },
    name : String,
    employeeId : String,
    designation : String,
    department : String,
    dateOfJoining : {
        type : Date,
    },
    qualification : {
        type :  String,
        enum : ['PhD','Non-PhD'],
        required: true
    },
    scopusId : String,
    webofScienceId : String,
    orcidId : String
},{ timestamps : true });

module.exports = mongoose.model('User', userschema);
