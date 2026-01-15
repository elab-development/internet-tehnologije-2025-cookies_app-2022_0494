const express = require("express")
const dotenv = require("dotenv")
const app = express();
const userRoutes = require("./routes/userRoute");
const coursesRoutes = require("./routes/coursesRoutes")
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

app.all('*', function(req, res, next) {
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});


app.get('/', (req, res) => {
    res.send('Api is running...')
})


//routes
app.use("/api/users", userRoutes)
app.use("/api/courses", coursesRoutes)


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



