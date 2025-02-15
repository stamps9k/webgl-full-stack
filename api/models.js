const express = require('express');


const models_routes = express.Router();

// API Route in controller Example
models_routes.get('/api/model/model_shaders', (req, res) => {
    var model_id = req.query.model_id;
    res.json({ message: 'Sample shaders for model' });
});

module.exports = models_routes;