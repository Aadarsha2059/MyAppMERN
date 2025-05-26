// const Category=require("../../models/Category")
// const bcrypt=require("bcrypt")

// exports.createCategory=async(req,res) =>{
//     const{categoryname}=req.body;

//     //validation
//     if(!categoryname){
//         return res.status(400).json({
//             success:false,
//             message:"missing fields"
//         });
//     }
//     try{
//         const existingCategory= await Category.findOne({
//             $or: [{categoryname:categoryname}]
//         });
//         if(existingCategory){
//             return res.status(400).json({
//                 success:false,
//                 message:"category exists"
//             });
//         }
//         const newCategory=new Category({
//             categoryname,
//         });
//         await newCategory.save();
//         return res.status(201).json({
//             success:true,
//             message:"Category Registered"

//         });


//     }catch(err){
//         return res.staus(500).json({
//             success:false,
//             message:"Server error"
//         });

//     };

//     //get 
//     exports.getCategory=async(req,res) =>{
//         try{
//             const categories= await Category.find();
//             return res.status(200).json(
//                 {
//                     "success":true,
//                     "message":"all categores",
//                     "data":categories


//                 }
//             )

//         }catch(err){
//             return res.status(500).json(

//                 {"success":false,"message":"server errors"}
//             )
//         }
//     }
//     exports.getOneCategory=async(req,res) =>{
//         try{
//             const id=req.params.id
//             const category=await Category.findOne(
//                 {
//                     "_id":id
//                 }
//             )
//             return res.status(200).json(
//                 {
//                     "success":true,
//                     "message":"one categoy fetched",
//                     "data":category
//                 }
//             )
//         }catch(err){
//             return res.status(500).json(
//                 {
//                     "success":false,"message":"server error"
//                 }
//             )
//         }
//     }
//     //update one
//     exports.updateOne=async(req,res) =>{
//         const {categoryname}=req.body
//         try{
//             const category=awati Category.updateOne(
//                 {
//                     "_id":"_id"
//                 },
//                 {
//                     $set:{
//                         "categoryName":"CategoryName",

//                     }
//                 }

//             )
//             return res.status(200).json(
//                 {
//                     "sc"
//                 }
//             )
//         }
//     }
// }