require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const cors = require('cors');



const app = express();
app.use(cors());
app.use(express.json()); 

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected!');
  
  app.listen(5000, () => console.log('🚀 Server running on port 5000'));
})
.catch((err) => console.error('❌ MongoDB connection error:', err));



app.use('/api/auth', authRoutes);


