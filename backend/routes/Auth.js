const express = require("express");
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs")
require("dotenv").config();
const secretKey = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/Fetchuser");

// signup
router.post("/signup", [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: 'User already exits' });
        }

        const salt = await bcrypt.genSalt(10)

        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, secretKey)
        console.log(authToken);
        res.json({ message: "User created successfully", user, authToken })

    } catch (error) {
        res.status(500).send("Internal server error")
    }
})

// login
router.post("/login", [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ errors: "Invalid credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ errors: "Invalid credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, secretKey)
        console.log(authToken);

        res.json({ message: "Login successful", user, authToken })

    } catch (error) {
        res.status(500).send("Internal server error")
    }
})

// user details
router.get("/getuser", fetchuser, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        res.status(500).send("Internal server error")
    }
})

module.exports = router;
