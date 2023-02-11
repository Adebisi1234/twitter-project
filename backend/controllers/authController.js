const mongoose = require("mongoose")
const User = require("../model/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const signup = async (req, res, next) => {
    try {
        // Collect username and password
        const { username, password } = req.body
        // Check if both are present
        if (!username, !password) return res.status(400).json({ message: "Username and password are required." })
        // Find duplicate
        const user = await User.findOne({ username: username })
        if (user) return res.status(409).json({ message: "User exists" })
        // encrypt password
        const hashedPwd = await bcrypt.hash(password, 10)
        // Save new user
        const newUser = new User({
            ...req.body,
            password: hashedPwd
        })

        await newUser.save()
        res.status(200).send("User has been created")

    } catch (err) {
        next(err)
    }
}

const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return res.status(404).json({ message: "User not found!" })
        const check = await bcrypt.compare(req.body.password, user.password)
        if (!check) return res.status(401).json({ message: "Wrong Credentials!" })

        const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET)

        const { password, ...others } = user._doc

        res.cookie("access_token", token,
            { httpOnly: true, sameSite: "None", secure: true }
        )
        res.status(200).json(others)
    } catch (err) {
        res.sendStatus(401)
        next(err)
    }
}

const logout = async (req, res) => {
    const cookies = req.cookies
    if (!cookies.access_token) return res.sendStatus(204)
    res.clearCookie("access_token", {
        httpOnly: true, sameSite: "None", secure: true
    })
    return res.sendStatus(204)

}

module.exports = { signup, signin, logout }