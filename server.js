require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const debug = require("debug");
const models = require('./api/models');

//Define all posasible logging levels
const super_super_verbose = require('debug')("app:SUPER_SUPER_VERBOSE");
const super_verbose = require('debug')("app:SUPER_VERBOSE");
const verbose = require('debug')("app:VERBOSE");
const info = require('debug')('app:INFO');
const warn = require('debug')("app:WARN");
const error = require('debug')("app:ERROR");

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
    res.json({ message: 'Unknown API endpoint' });
});

// Catch-all for SPA (React)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    info(`Server running on port ${PORT}`);
});
