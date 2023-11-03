const mongose=require("mongoose");



const contactSchema=mongose.Schema({
    user_id:{
        type:mongose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    name:{
        type:String,
        required:[true,"please provide your contact name"],
    },
    email:{
        type:String,
        required:[true,"please provide your contact  email adress"],
    },
    phone:{
        type:String,
        required:[true,"please provide your contact phone number"],
    }

},{timestamp:true,}

);
module.exports=mongose.model("Contact",contactSchema);