const mongoose = require("mongoose")

const courseSchema=mongoose.Schema({
    name:{
        type: String,
        required:true,
        unique:true
    },
    desc: {
        type:String,
        required:true,
    },
    range: {
        type:String,
        required:true
    },
    price: {
        type:String,
        required:true
    },
    onSalePrice: {
        type:String,
        required:false
    },
    related: {
        type:[String],
        required:true
    },
    link: {
        type: String,
        required:true
    },
    image: {
        type: String,
        required:true
    },
    onSale: Boolean,
    aktuelan: Boolean
}
,
{ timestamps: true}
)

const Course = mongoose.model("Course", courseSchema)
module.exports = Course