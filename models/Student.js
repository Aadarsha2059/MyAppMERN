const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        stu_id: {
            type: Number,
            required: true,
            unique: true
        },
        stu_email: {
            type: String,
            required: true,
            unique: true
        },
        stu_name: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Student", studentSchema);
