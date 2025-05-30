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
        const { page=1, limit=10, search=""}=req.query
        let filter={}
        if(search){
            filter.$or=[
                {name:{$regrex:search,
                    $options:'i'}}
            ]
        }
        const skip =(page -1) * limit

        const products=await Product.find(filter)
        .populate("categoryId","name")
        .populate("sellerId","firstName email")
        .skip(skip)
        .limit(Number(limit))
        const total= await Product.countDocuments(filter)

        return res.status(200).json(
            {success:true,
                message:"product fetched",
                data:products,
                pagination:{
                    total,
                    page:Number(page),
                    limit:Number(limit),
                    totalPages:Math.ceil(
                        total/limit
                    )
                }
            }
        )

    }catch(err){
        console.log('getProducts')
        return res.status(500).json(
            {success:false,message:"server error"}
        )
    }
}