const express = require('express')
const mongoose = require('mongoose');
const dotenv=require('dotenv');

dotenv.config();
const app = express()
const port = 5000;

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})

main().catch(err => console.error(err));

async function main() {
  try {
    // Connect to MongoDB
    
    await mongoose.connect(process.env.MONGO);
    console.log("Connected");
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(express.json())
app.use('/api',require("./Routes/Auth.route"));
  

app.use((err,req,res,next)=>{
  const statusCode=err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})