const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt =require("jsonwebtoken")

exports.registerUser = async (req, res) => {
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



exports.loginUser=async(req, res) =>{
    const {email,password}=req.body
    //validation
    if(!email || !password){
        return res.status(400).json(
            {"success":false,"message":"Missing field"}
        )
    }
    try{
        const getUsers =await User.findOne(
            {email:email}
        )
        if(!getUsers){
            return res.status(403).json(
                {"success":false,"message":"User not found"}
            )
        }
        const passwordCHeck= await bcrypt.compare(password,getUsers.password) //pass,hash password
        if(!passwordCHeck){
            return res.status(403).json(
                {"success":false,"message":"Invalid credentials"}
            )
        }


        //
        const payload={
            "_id":getUsers._id,
            "email":getUsers.email,
            "username":getUsers.username
        }
        const token=jwt.sign(payload, process.env.SECRET,
            {expiresIn:"7d"}
        )
        return res.status(200).json(
            {
                "success":true,
                "message":"Login successful",
                "data":getUsers,
                "token":token // return toke in login...
            }
        )
    }catch (err){
        return res.status(500).json(
            {"success":false,"message":"Server error"}
        )
    }
}