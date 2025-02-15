require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const models = require('./api/models');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

//Externally defined routes
app.use(models);

// API Fallback API Response
app.get('/api/*', (req, res) => {
    res.status(404);
    res.json({ message: 'Unknown API endpint' });
});

// Catch-all for SPA (React)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
