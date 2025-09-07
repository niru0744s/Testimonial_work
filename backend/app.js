require("dotenv").config({quiet:true});
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require('path');
const cors = require('cors');
const testimonalRoutes = require("./routes/testimonialRoutes");

app.use("/media", express.static(path.join(__dirname, "media")));
app.use(cors());
app.use(express.json());
app.use("/api/v1",testimonalRoutes);
async function main() {
    await mongoose.connect(process.env.MONGODB);
};

main().then(()=>console.log('Database is connected... ')).catch((err)=>console.log(err));

app.get("/",(req,res)=>{
    res.send('Root route ');
})


app.listen(process.env.PORT,()=>{
    console.log("App is listening !");
});