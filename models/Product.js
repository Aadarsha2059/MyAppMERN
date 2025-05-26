const mongoose=require("mongoose")

const productSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        categoryId:{
            type:mongoose.Schema.ObjectId,
            ref:'Category',
            required:true
        },
        sellerid:{
            type:mongoose.Schema.ObjectId,
            ref:'User',
            required:true
        }
    }
)
module.exports=mongoose.model(
    'Product',productSchema
)