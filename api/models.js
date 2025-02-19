const path = require('path');
const express = require('express');
const { register } = require('module');
const sqlite3 = require('sqlite3').verbose();

//Define all posasible logging levels
const super_super_verbose = require('debug')("app:SUPER_SUPER_VERBOSE");
const super_verbose = require('debug')("app:SUPER_VERBOSE");
const verbose = require('debug')("app:VERBOSE");
const info = require('debug')('app:INFO');
const warn = require('debug')("app:WARN");
const error = require('debug')("app:ERROR");


const dbPath = path.resolve(__dirname, '../databases/app.db');
const db = new sqlite3.Database(dbPath, (err) => 
    {
        if (err) {
            console.error('Error opening database:', err.message);
        } else {
            console.log('Connected to the database.');
        }
    }
);

const models_routes = express.Router();

var model_shader_sets_query_string = "SELECT models.model_id, models.name AS model_name, shader_sets.shader_set_id, shader_sets.name AS shader_set_name, shader_sets.description AS shader_set_description, shader_sets.display_name AS shader_set_display_name FROM models " +
    "INNER JOIN models_shader_sets ON models.model_id = models_shader_sets.model_id " +
    "INNER JOIN shader_sets ON models_shader_sets.shader_set_id = shader_sets.shader_set_id " +
    "WHERE models.name = ?;";

var model_info_query_string = "SELECT models.model_id, models.name AS model_name, models.description AS model_description FROM models " +
    "WHERE models.model_id = ?;";

var models_query_string = "SELECT " +
    "models.model_id AS model_id, " +
    "models.name AS name, " +
    "models.display_name AS display_name, " +
    "models.description AS description " +
    "FROM models;";

const model_shader_sets_query_promise = (model_name) => {
    return new Promise
    (
        (resolve, reject) => {
            super_verbose("Running query " + model_shader_sets_query_string + "...");
            const results = [];
            db.each
            (
                model_shader_sets_query_string,
                model_name,
                (err, row) =>
                {
                    var tmp = {};
                    tmp["shader_id"] = row.shader_set_id;
                    tmp["name"] = row.shader_set_name;
                    tmp["description"] = row.shader_set_description;
                    tmp["display_name"] = row.shader_set_display_name;
                    results.push(tmp);
                },
                (err, count) =>
                {
                    resolve(results);
                }
            );
            super_verbose("... query completed.");
        }
    )
}

const model_info_query_promise = (model_id) => {
    return new Promise
    (
        (resolve, reject) => {
            super_verbose("Running query " + model_shaders_query_string + "...");
            const results = [];
            db.each
            (
                model_info_query_string, 
                model_id,
                (err, row) =>
                {
                    var tmp = {};
                    tmp["id"] = row.model_id;
                    tmp["name"] = row.model_name;
                    tmp["description"] = row.model_description;
                    results.push(tmp);
                },
                (err, count) =>
                {
                    resolve(results);
                }
            );
            super_verbose("... query completed.");
        }
    )
}

const models_query_promise = () => {
    return new Promise
    (
        (resolve, reject) => {
            super_verbose("Running query " + models_query_string + "...");
            const results = [];
            db.each
            (
                models_query_string,
                (err, row) =>
                {
                    info("test");
                    var tmp = {};
                    tmp["model_id"] = row.model_id;
                    tmp["name"] = row.name;
                    tmp["display_name"] = row.display_name;
                    tmp["description"] = row.description;
                    results.push(tmp);
                },
                (err, count) =>
                {
                    if (count == undefined) {
                        count = 0;
                    }
                    verbose("Query returned " + count + " results.")
                    resolve(results);
                }
            );
            super_verbose("... query completed.");
        }
    )
}

models_routes.get('/api/model/models', async (req, res) => {
    info("Processing request: " + req.url);
    try
    {
        verbose("Querying database...");
        var message = await models_query_promise();
        verbose("...database query complete.");
        super_super_verbose("Returning " + JSON.stringify(message));
        res.json({ success: true, message });
    } 
    catch (err)
    {
        error("Error processing query: " + err);  
        res.status(500).json({ success: false, error: err.message });  
    }

})

// API Route to get model information
models_routes.get('/api/model/model_info', async (req, res) => {
    info("Processing request: " + req.url);
    if (req.query.model_id == null || req.query.model_id == undefined)
    {
        var model_id = "1";
    } else {
        var model_id = req.query.model_id;
    }
    try
    {
        verbose("Querying database...");
        var message = await model_info_query_promise(model_id);
        verbose("...database query complete.");
        super_super_verbose("Returning " + JSON.stringify(message));
        res.json({ success: true, message });
    } 
    catch (err)
    {
        error("Error processing query: " + err);  
        res.status(500).json({ success: false, error: err.message });  
    }
});

// API Route to get all shaders for a given model
models_routes.get('/api/model/model_shader_sets', async (req, res) => {
    if (req.query.model_name == null || req.query.model_name == undefined)
    {
        var model_name = "cube.obj";
    } else {
        var model_name = req.query.model_name;
    }
    try
    {
        verbose("Querying database...");
        var message = await model_shader_sets_query_promise(model_name);
        verbose("...database query complete.");
        super_super_verbose("Returning " + JSON.stringify(message));
        res.json({ success: true, message });
    } 
    catch (err)
    {
        error("Error processing query: " + err); 
        res.status(500).json({ success: false, error: err.message });  
    }
});

module.exports = models_routes;