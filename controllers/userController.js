const User = require("../models/User");
const bcrypt = require("bcrypt");

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
