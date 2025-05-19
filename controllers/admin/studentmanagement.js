const Student=require("../../models/Student")
const bcrypt=require("bcrypt")


exports.createUser=async(req,res) =>{
     const { stu_id, stu_email, stu_name } = req.body;
    
        if (!stu_id || !stu_email || !stu_name) {
            return res.status(400).json({
                success: false,
                message: "Missing fields"
            });
        }
    
        try {
            // Check if student already exists
            const existingStudent = await Student.findOne({
                $or: [{ stu_id }, { stu_email }]
            });
    
            if (existingStudent) {
                return res.status(409).json({
                    success: false,
                    message: "Student with the same ID or email already exists"
                });
            }
    
            // Create and save new student
            const student = new Student({
                stu_id,
                stu_email,
                stu_name
            });
    
            await student.save();
    
            return res.status(201).json({
                success: true,
                message: "Student registered successfully",
                data: student
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Server error",
                error: error.message
            });
        }
    
}

// get all // read all

exports.getUsers=async(req,res) =>{
    try{
        const users=await Student.find();
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
exports.getOneuser=async(req,res) =>{
    try{
        const id=req.params.id
        const user=await Student.findOne(
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
    const{stu_id,stu_name,stu_email}=req.body
    try{
        const user=await Student.updateOne(
            {
                "_id":_id
            },
            {
                $set:{
                    "stu_id":stu_id,
                    "stu_email":stu_email,
                    "stu_name":stuName
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
exports.deleteOne=async(req,res) =>{
    const _id=req.params.id

    try{
        const user=await Student.deleteOne(
            {
                "_id":_id
            }
        )
        return res.status(200).json(
            {"success":true,"message":"user deleted"}
        )
    }catch(err){
        return res.status(500).json(
            {"success":true,"message":"server error"}
        )
    }
}