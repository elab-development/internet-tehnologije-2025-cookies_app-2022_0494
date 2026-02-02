const express = require("express")
const dotenv = require("dotenv")
const app = express();
const userRoutes = require("./routes/userRoute");
const coursesRoutes = require("./routes/coursesRoutes")
const questionRoutes = require("./routes/questionRoutes")
const roleRoutes = require("./routes/roleRoutes")
const mongoose = require("mongoose");
const cors = require("cors")

dotenv.config();

// middleware
app.use(
  cors({
      origin: "*", // Allow your frontend origin
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed methods
      credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Api is running...')
})


//routes
app.use("/api/users", userRoutes)
app.use("/api/courses", coursesRoutes)
app.use("/api/questions", questionRoutes)
app.use("/api/roles", roleRoutes)


mongoose.connect(process.env.DB_URI)
.then(()=>{
    // listen for requests 
    app.listen(process.env.PORT, (req,res)=>{
        console.log("Connected to DB and listening ")
    })
    
})
.catch((error)=>{
    console.log(error)
})



