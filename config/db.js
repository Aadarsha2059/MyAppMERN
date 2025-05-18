const mongoose =require("mongoose")

const connectDB=async() =>{
    try{
        await mongoose.connect(
            "mongodb://localhost:27017/mydb",
            {
                useNewUrlParser:true,
                useUnifiedTopology:true
            }
        )

            
        
    }catch (err){
        console.log("DB Err",err)
    }
}
module.exports=connectDB