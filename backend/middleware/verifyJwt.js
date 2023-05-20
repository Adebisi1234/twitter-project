const jwt = require("jsonwebtoken")
const verifyJwt = async (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
        if (err) return res.sendStatus(403)
        req.user = result
        next()
    })
}


module.exports = verifyJwt