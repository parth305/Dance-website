const mongoose=require("mongoose");

let addressschema=new mongoose.Schema({
    housenumber:Number,
    street:String,
    city:String,
    state:String
})

let userschema=new mongoose.Schema({
    name:String,
    age:Number,
    phone:Number,
    address:addressschema,
    email:String,
    more:String
})

module.exports=mongoose.model("detail",userschema);