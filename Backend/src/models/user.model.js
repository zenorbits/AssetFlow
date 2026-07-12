const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:false,
        enum:['employee','departmenthead','assetmanager','admin'],
        default:'employee'
    },
    department: {
    type: String,
    required: true,
    enum: [
        'Information Technology',
        'Facilities',
        'Human Resources',
        'Finance',
        'Operations',
        'Procurement',
    ],
},
})

const userModel = mongoose.model('User',userSchema);

module.exports = userModel;