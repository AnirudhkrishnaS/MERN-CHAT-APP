const express = require("express");
const dotenv = require("dotenv");
const colors = require('colors')
const userRoutes = require("./routes/userRoutes")
const chats = require("./data/data");
const {notFound , errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require("./config/db");
dotenv.config();

connectDB()
const app = express();
app.use(express.json()) //To accept the JSON data

app.get('/', (req, res) => {
    res.send("API is running")
});

app.use('/api/user',userRoutes)
app.use(notFound)
app.use(errorHandler)



const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server started at port ${PORT}`.yellow.bold));
