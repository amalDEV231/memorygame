const express=require('express');
const app= express();
const cors = require('cors');
app.use(cors());


app.use(express.json())

const traineeRoutes= require('./routes/traineeRoutes');
app.use("/api/v1/trainees",traineeRoutes);



app.get("/*",(req,res)=>{
    res.send("No Routes found");
});

app.listen(5000, () => console.log("running on port 5000"));