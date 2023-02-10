require("dotenv").config()
const express = require("express")
const path = require("path")
const app = express()
const cors = require("cors")
const credentials = require("./middleware/credentials")
const corsOptions = require("./config/corsOptions")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const connectDB = require("./config/dbConn")
const userRoutes = require("./routes/userRoutes")
const authRoutes = require("./routes/authRoutes")
const commentRoutes = require("./routes/commentRoutes")
const postRoutes = require("./routes/postRoutes")

const PORT = process.env.PORT || 3000

// Connect to mongo
connectDB()



app.use(credentials)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())



app.use(cors(corsOptions))

// Routes
app.use("/user", userRoutes)
app.use("/message", messageRoutes)
app.use("/notification", notificationRoutes)
app.use("/auth", authRoutes)
app.use("/post", postRoutes)
app.use("/comment", commentRoutes)


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