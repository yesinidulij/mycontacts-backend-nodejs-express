
const asyncHandler=require("express-async-handler");
const Contact=require("../models/contactModel");
//@desc get all contacts 
//@router GET api/contacts
//@access private
const getContacts=asyncHandler(async(req,res)=> {
    const contact=await Contact.find({user_id:req.user.id});
    res.status(200).json(contact)});

    
//@desc create contact 
//@router POST api/contacts
//@access private
const createContact=asyncHandler(async(req,res)=>{
    console.log("The request body is",req.body);
    const{name,email,phone}=req.body;
    if(!name|| !email || !phone){
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    const createcontact = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    });
    res.status(201).json(createcontact);});
    


//@desc update contacts 
//@router UPDATE api/contacts/:id
//@access private
const updateContact = asyncHandler(async(req,res)=>{
    const getcontact= await Contact.findById(req.params.id);
    if(!getcontact){
        
        res.status(404);
        throw new Error("ID not found");
    }
    if(Contact.user_id.toString()!==req.user.id){
       res.status(403);
       throw new Error("user is not authorized to update the contact");
    }

    const update=await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json(update);});


//@desc get  contact for id 
//@router GET api/contacts/:id
//@access private
const getContact=asyncHandler(async(req,res)=>{
    const getcontact= await Contact.findById(req.params.id);
    if(!getcontact){
        
        res.status(404);
        throw new Error("ID not found");
    }
    res.status(200).json(getcontact);});


//@desc delete contacts 
//@router DELETE api/contacts/:id
//@access private
const deleteContact=asyncHandler(async(req,res)=>{
    const getcontact= await Contact.findById(req.params.id);
    if(!getcontact){
        
        res.status(404);
        throw new Error("ID not found");
    }
    if(Contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("user is not authorized to update the contact");
     }
    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(getcontact);});
    
module.exports={
    getContact,
    createContact,
    updateContact,
    getContacts,
    deleteContact
}