const User=require("../../models/User")
const bcrypt=require("bcrypt")

//5 common
//create, read all, read one update one, update  all, delete one


exports.createUser=async(req,res) =>{
     const { username, email, firstName, lastName, password } = req.body;
    
        // validation
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing fields"
            });
        }
    
        // db logic in try/catch
        try {
            const existingUser = await User.findOne({
                $or: [{ username: username }, { email: email }]
            });
    
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "User exists"
                });
            }
    
            // hash password
            const hashedPass = await bcrypt.hash(password, 10); // 10 is complexity
    
            const newUser = new User({
                username,
                email,
                firstName,
                lastName,
                password: hashedPass
            });
    
            await newUser.save();
    
            return res.status(201).json({
                success: true,
                message: "User Registered"
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Server error"
            });
        }
    };
    
//get all /read all
exports.getUsers=async(req,res) =>{
    try{
        const users=await User.find();
        return res.status(200).json(
            {
                "success":true,
                "message":"all users",
                "data":users
            }
        )

    }catch(err){
        return res.status(500).json(
            {"success":false,"message":"server errors"}
        )
    }
}   

//get one
exports.getOneUser=async(req,res) =>{
    try{
        //unique indentifier
        const id=req.params.id
        const user=await User.findOne(
            {
                "_id":id
            }
        )
        return res.status(200).json(
            {
                "success":true,
                "message":"one user fetched",
                "data":user
            }
        )
    }catch(err){
        return res.status(500).json(
            {
                "success":false,"message":"server error"
            }
        )
    }
}

//update one
exports.updateOne=async(req,res) =>{
    const {firstName,lastName}=req.body
    try{
        const user=await User.updateOne(
            {
                "_id":_id
            },
            {
                $set:{
                    "firstName":firstName,
                    "lastName":lastName
                }
            }
        )
        return res.status(200).json(
            {
                "success":true,"message":"user updated"
            }
        )

    }catch(err){
        return res.status(500).json(
            {"success":false,"message":"server error"}
        )
    }
}


//delete one
exports.deleteOne =async(req,res) =>{
    const _id=req.params.id

    try{
        const user= await User.deleteOne(
            {
                "_id":_id
            }
        )
        return res.status(200).json(
            {"success":true,"message":"user deleted"}
        )
    }catch(err){
        return res.status(500).json(
            {"success":true,"message":" server error"}
        )
    }
}