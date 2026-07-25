const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');
const sampleRoutes = require('./routes/sampleRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Lab Register Backend is running!');
});

// Sample routes
app.use('/api/samples', sampleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});