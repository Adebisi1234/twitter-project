require("dotenv").config()
const express = require("express")
const verifyJwt = require("./middleware/verifyJwt")
const app = express()
const cors = require("cors")
const credentials = require("./middleware/credentials")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const connectDB = require("./config/dbConn")
const userRoutes = require("./routes/userRoutes")
const authRoutes = require("./routes/authRoutes")
const commentRoutes = require("./routes/commentRoutes")
const messageRoutes = require("./routes/messageRoutes")
const notificationRoutes = require("./routes/notificationRoutes")
const postRoutes = require("./routes/postRoutes")
mongoose.set('strictQuery', true)

const PORT = 8080

// Connect to mongo
connectDB()





app.use(credentials)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cookieParser())


app.use(cors())

// Routes
app.use("/auth", authRoutes)

app.use("/users", userRoutes)
app.use("/messages", messageRoutes)
app.use("/notification", notificationRoutes)
app.use("/posts", postRoutes)
app.use("/comments", commentRoutes)


app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || "Something went wrong!"
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDb")
    app.listen(PORT, console.log(`Server running on port ${PORT}`))
})