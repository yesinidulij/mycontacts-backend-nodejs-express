const mongoose=require("mongoose");

const userSchema=mongoose.Schema({

username:{
type:String,
required:[true,"Please provide the username"],
},
email:{
    type:String,
    required:[true,"Please provide the email"],
    unique:[true,"The requested email is already registered"],
    },
password:{
        type:String,
        required:[true,"Please provide the password"],
        },
},{
    timestamps:true
}
);
module.exports=mongoose.model("User",userSchema);