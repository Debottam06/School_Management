const express = require("express")
const app = express();

require("dotenv").config();

const PORT = process.env.PORT||3000;

//middleware
app.use(express.json());

//import routes
const distance = require("./routes/distance");

//mount 
app.use("/api/v1",distance);

//connect with DATABASE
const connectWithDb = require("./config/database");
connectWithDb();

//start the server 
app.listen(PORT,()=>{
    console.log(`Server is running on port no ${PORT}`);
    
})

//default routes
app.get("/",(req,res)=>{
    res.send("School Management");
})