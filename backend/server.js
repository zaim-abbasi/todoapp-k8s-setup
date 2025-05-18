
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://root:root@cluster0.bhf1qpj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// Routes
app.use('/todos', require('./routes/todos'));

// Health check route
app.get('/', (req, res) => {
  res.send('Todo API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
