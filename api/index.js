const express  = require ("express");
const bcrypt = require ("bcrypt");
const dotenv = require ("dotenv").config();
const dbConnect = require("./config/dbConnect");
const PORT = process.env.PORT || 7000;
dbConnect();
const authRoute = require("./routes/auth")
const authUser = require("./routes/user")
const authPost = require("./routes/posts")
const app = express();
app.use(express.json())






app.use("/auth", authRoute)
app.use("/users", authUser)
app.use("/posts", authPost)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
