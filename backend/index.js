const express = require('express')
const mongoose = require('mongoose');
const dotenv=require('dotenv');

dotenv.config();
const app = express()
const port = 5000;

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
app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  