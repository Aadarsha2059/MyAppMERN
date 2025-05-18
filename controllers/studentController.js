const Student = require("../models/Student");

exports.registerStudent = async (req, res) => {
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
};
