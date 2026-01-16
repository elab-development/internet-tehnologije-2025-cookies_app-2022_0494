const mongoose = require("mongoose")

const userSchema=mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    age: {
        type: Number,
        required:true
    },
    phone: {
        type:String,
        required:true
    },
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
        required:true,
    }],
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required:true,
    }],
    isAdmin: {
        type: Boolean,
        default: false
    }
}
,
{ timestamps: true}
)

const User = mongoose.model("User", userSchema)
module.exports = User