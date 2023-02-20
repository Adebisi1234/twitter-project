const mongoose = require("mongoose")
const User = require("../model/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const signup = async (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
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
        return signin(req, res, next)

    } catch (err) {
        next(err)
    }
}

const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET)
            const { password, ...others } = user._doc

            res.cookie("access_token", token,
                {
                    httpOnly: true, sameSite: "None" //,secure: true 
                }
            )
            return res.status(200).json({ ...others, access_token: token })
        } else {
            const newUser = new User({
                fromGoogle: true,
                ...req.body
            })
            await newUser.save()
            const present = await User.findOne({ username: req.body.username })
            const { password, ...others } = present._doc
            const token = jwt.sign({ id: present._id }, process.env.ACCESS_TOKEN_SECRET)

            res.cookie("access_token", token,
                {
                    httpOnly: true, sameSite: "None" //,secure: true 
                }
            )
            return res.status(200).json({ ...others, access_token: token })
        }

    } catch (err) {
        console.log(err)
        res.status(401).json(err)
        next(err)
    }
}

const signin = async (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return res.status(401).json({ message: "User not found in the database!" })
        const check = await bcrypt.compare(req.body.password, user.password)
        if (!check) return res.status(401).json({ message: "Wrong Credentials!" })

        const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET)

        const { password, ...others } = user._doc

        res.cookie("access_token", token,
            {
                httpOnly: true, sameSite: "None" //,secure: true 
            }
        )
        res.status(200).json({ ...others, access_token: token })
        next()
    } catch (err) {
        res.status(401).json(err)
        next(err)
    }
}

const logout = async (req, res) => {
    const cookies = req.cookies
    console.log(cookies)
    if (!cookies?.access_token) return res.sendStatus(204)
    res.clearCookie("access_token", {
        httpOnly: true, sameSite: "None" //,secure: true
    })
    return res.sendStatus(200)

}

module.exports = { signup, signin, logout, google }