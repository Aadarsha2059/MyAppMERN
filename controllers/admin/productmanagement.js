const Product=require("../../models/Product")

exports.createProduct=async(req,res)=>{
    const {name,price,categoryId,userId}=req.body

    if(!name||!price||!categoryId||!userId){
        return res.status(403).json(
            {success:true,message:"missing fields"}
        )
    }
    try{
        const product=new Product(
            {
                name,
                price,
                categoryId,
                sellerId:userId
            }
        )
        await product.save()
        return res.status(200).json(
            {success:true,data:product,message:"product saved"}
        )
    }catch(err){
        return res.status(500).json(
            {success:false,
                message:"server error"
            }
        )
    }
}

exports.getProducts=async(req,res)=>{
    try{
        const products=await Product.find().populate("categoryId","name")
        .populate("sellerId","firstName email")
        return res.status(200).json(
            {success:true,message:"product fetched",data:products}
        )

    }catch(err){
        return res.status(500).json(
            {success:false,message:"server error"}
        )
    }
}