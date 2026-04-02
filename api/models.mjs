//NPM imports
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import db_import from 'better-sqlite3';

//My project imports
import { logger_api } from "../public/libs/debug_config.mjs";

// Variables
const __filename = fileURLToPath(import.meta.url);
const dbPath = path.resolve(__filename, "../../databases/app.db");
logger_api["info_api_db"]("Path to DB defined as " + dbPath);

logger_api["info_api_db"]("Connecting to DB... " + dbPath);
const db = db_import(dbPath);
//const db = db_import(dbPath, { verbose: console.log });
logger_api["info_api_db"]("...connected to DB successfully." + dbPath);

const models_routes = express.Router();

var model_shader_sets_query_string = (
    "SELECT models.model_id, models.name AS model_name, shader_sets.shader_set_id, shader_sets.name AS shader_set_name, shader_sets.description AS shader_set_description, shader_sets.display_name AS shader_set_display_name FROM models " +
    "INNER JOIN models_shader_sets ON models.model_id = models_shader_sets.model_id " +
    "INNER JOIN shader_sets ON models_shader_sets.shader_set_id = shader_sets.shader_set_id " +
    "WHERE models.name = ?;"
);

var model_info_query_string = (
    "SELECT models.model_id, models.name AS model_name, models.description AS model_description FROM models " +
    "WHERE models.model_id = ?;"
);

var models_query_string = (
        "SELECT " +
        "models.model_id AS model_id, " +
        "models.name AS name, " +
        "models.display_name AS display_name, " +
        "models.description AS description " +
        "FROM models;"
);

var shader_set_shaders_query_string = (
    "SELECT " + 
    "shader_sets.shader_set_id AS shader_set_id, " +
    "shader_sets.name AS shader_set_name, " +
    "shaders.shader_id AS shader_id, " +
    "shaders.name AS shader_name, " +
    "shader_types.name AS shader_type, " +
    "shaders.description AS shader_description, " +
    "shaders.display_name AS shader_display_name " +
    "FROM shader_sets " + 
    "INNER JOIN shader_sets_shaders ON shader_sets.shader_set_id = shader_sets_shaders.shader_set_id " +
    "INNER JOIN shaders ON shader_sets_shaders.shader_id = shaders.shader_id " +
    "INNER JOIN shader_types ON shaders.shader_type_id = shader_types.shader_type_id " +
    "WHERE shader_sets.name = ?;"
);

var model_textures_query_string = (
    "SELECT models.model_id, " + 
    "models.name AS model_name, " + 
    "textures.texture_id, " +
    "textures.name AS texture_name, " +
    "textures.description AS texture_description, " +
    "textures.display_name AS texture_display_name " +
    "FROM models " +
    "INNER JOIN models_textures ON models.model_id = models_textures.model_id " +
    "INNER JOIN textures ON models_textures.texture_id = textures.texture_id " +
    "WHERE models.name = ?;"
);

var model_materials_query_string = (
    "SELECT models.model_id, " + 
    "models.name AS model_name, " + 
    "materials.material_id, " +
    "materials.name AS material_name, " +
    "materials.description AS material_description, " +
    "materials.display_name AS material_display_name " +
    "FROM models " +
    "INNER JOIN materials ON models.model_id = materials.model_id " +
    "WHERE models.name = ?;"
)

var material_textures_query_string = (
    "SELECT materials.material_id, " + 
    "materials.name AS material_name, " + 
    "textures.texture_id, " +
    "textures.name AS texture_name, " +
    "textures.description AS texture_description, " +
    "textures.display_name AS texture_display_name " +
    "FROM materials " +
    "INNER JOIN materials_textures ON materials.material_id = materials_textures.material_id " +
    "INNER JOIN textures ON materials_textures.texture_id = textures.texture_id " +
    "WHERE materials.name = ?;"
);

const model_shader_sets_query_promise = (model_name) => {
    return new Promise
    (
        (resolve, reject) => {
            logger_api["super_verbose_api_model"]("Running query " + model_shader_sets_query_string + "...");
            const results = db.prepare(model_shader_sets_query_string).all(model_name)
            logger_api["super_verbose_api_model"]("... query completed.");
            resolve(results);
        }
    )
}

const model_info_query_promise = (model_id) => {
    return new Promise
    (
        (resolve, reject) => {
            logger_api["super_verbose_api_model"]("Running query " + model_shaders_query_string + "...");
            const results = db.prepare(model_shader_query_string).all(model_id);
            logger_api["super_verbose_api_model"]("... query completed.");
            resolve(results);
        }
    )
}

const models_query_promise = () => {
    return new Promise
    (
        (resolve, reject) => {
            logger_api["super_verbose_api_model"]("Running query " + models_query_string + "...");
            const results = db.prepare(models_query_string).all();
            logger_api["super_verbose_api_model"]("... query completed.");
            resolve(results);
        }
    )
}

const shader_set_shaders_query_promise = (shader_set_name) => {
    return new Promise
    (
        (resolve, reject) => {
            logger_api["super_verbose_api_model"]("Running query " + shader_set_shaders_query_string + "...");
            const results = db.prepare(shader_set_shaders_query_string).all(shader_set_name);
            logger_api["super_verbose_api_model"]("... query completed.");
            resolve(results);
        }
    )
}

const model_textures_query_promise = (model_name) => {
    return new Promise
    (
        (resolve, reject) => {
            logger_api["super_verbose_api_model"]("Running query " + model_textures_query_string + "...");
            const results = db.prepare(model_textures_query_string).all(model_name);
            logger_api["super_verbose_api_model"]("... query completed.");
            resolve(results);
        }
    )
}

const model_materials_query_promise = (model_name) => {
    return new Promise
    (
        (resolve, reject) => {
            logger_api["super_verbose_api_model"]("Running query " + model_materials_query_string + "...");
            const results = db.prepare(model_materials_query_string).all(model_name);
            logger_api["super_verbose_api_model"]("... query completed.");
            resolve(results);
        }
    )
}

const material_textures_query_promise = (model_name) => {
    return new Promise
    (
        (resolve, reject) => {
            logger_api["super_verbose_api_model"]("Running query " + model_materials_query_string + "...");
            const results = db.prepare(material_textures_query_string).all(model_name);
            logger_api["super_verbose_api_model"]("... query completed.");
            resolve(results);
        }
    )
}

// API Route to get all 
models_routes.get('/api/model/models', async (req, res) => {
    logger_api["info_api_model"]("Processing request: " + req.url);
    try
    {
        logger_api["info_api_model"]("Querying database...");
        var message = await models_query_promise();
        logger_api["info_api_model"]("...database query complete.");
        logger_api["super_verbose_api_model"]("Returning " + JSON.stringify(message));
        res.json({ success: true, message });
    } 
    catch (err)
    {
        logger_api["error_api_model"]("Error processing query: " + err);  
        res.status(500).json({ success: false, error: err.message });  
    }

})

// API Route to get model information
models_routes.get('/api/model/model_info', async (req, res) => {
    logger_api["info_api_model"]("Processing request: " + req.url);
    if (req.query.model_id == null || req.query.model_id == undefined)
    {
        var model_id = "1";
    } else {
        var model_id = req.query.model_id;
    }
    try
    {
        logger_api["info_api_model"]("Querying database...");
        var message = await model_info_query_promise(model_id);
        logger_api["info_api_model"]("...database query complete.");
        logger_api["super_verbose_api_model"]("Returning " + JSON.stringify(message));
        res.json({ success: true, message });
    } 
    catch (err)
    {
        logger_api["error_api_model"]("Error processing query: " + err);  
        res.status(500).json({ success: false, error: err.message });  
    }
});

// API Route to get all shader sets for a given model
models_routes.get('/api/model/model_shader_sets', async (req, res) => {
    logger_api["info_api_model"]("Processing request: " + req.url);
    if (req.query.model_name == null || req.query.model_name == undefined)
    {
        var model_name = "cube.obj";
    } else {
        var model_name = req.query.model_name;
    }
    try
    {
        logger_api["info_api_model"]("Querying database...");
        var message = await model_shader_sets_query_promise(model_name);
        logger_api["info_api_model"]("...database query complete.");
        logger_api["super_verbose_api_model"]("Returning " + JSON.stringify(message));
        res.json({ success: true, message });
    } 
    catch (err)
    {
        logger_api["error_api_model"]("Error processing query: " + err);  
        res.status(500).json({ success: false, error: err.message });  
    }
});

// API Route to get all textures for a given model
models_routes.get('/api/model/model_textures', async (req, res) => {
    logger_api["info_api_model"]("Processing request: " + req.url);
    if (req.query.model_name == null || req.query.model_name == undefined)
    {
        var model_name = "cube.obj";
    } else {
        var model_name = req.query.model_name;
    }
    try
    {
        logger_api["info_api_model"]("Querying database...");
        var message = await model_textures_query_promise(model_name);
        logger_api["info_api_model"]("...database query complete.");
        logger_api["super_verbose_api_model"]("Returning " + JSON.stringify(message));
        res.json({ success: true, message });
    } 
    catch (err)
    {
        logger_api["error_api_model"]("Error processing query: " + err);  
        res.status(500).json({ success: false, error: err.message });  
    }
});

// API Route to get all materials for a given model
models_routes.get('/api/model/model_materials', async (req, res) => {
    logger_api["info_api_model"]("Processing request: " + req.url);
    if (req.query.model_name == null || req.query.model_name == undefined)
    {
        var model_name = "cube.obj";
    } else {
        var model_name = req.query.model_name;
    }
    try
    {
        logger_api["info_api_model"]("Querying database...");
        var message = await model_materials_query_promise(model_name);
        logger_api["info_api_model"]("...database query complete.");
        logger_api["super_verbose_api_model"]("Returning " + JSON.stringify(message));
        res.json({ success: true, message });
    } 
    catch (err)
    {
        logger_api["error_api_model"]("Error processing query: " + err);  
        res.status(500).json({ success: false, error: err.message });  
    }
});

// API Route to get all textures for a given material
models_routes.get('/api/material/material_textures', async (req, res) => {
    logger_api["info_api_model"]("Processing request: " + req.url);
    if (req.query.material_name == null || req.query.material_name == undefined)
    {
        var material_name = "cube.obj";
    } else {
        var material_name = req.query.material_name;
    }
    try
    {
        logger_api["info_api_model"]("Querying database...");
        var message = await material_textures_query_promise(material_name);
        logger_api["info_api_model"]("...database query complete.");
        logger_api["super_verbose_api_model"]("Returning " + JSON.stringify(message));
        res.json({ success: true, message });
    } 
    catch (err)
    {
        logger_api["error_api_model"]("Error processing query: " + err);  
        res.status(500).json({ success: false, error: err.message });  
    }
});

// API Route to get all shaders for a given shader set
models_routes.get('/api/model/shader_set_shaders', async (req, res) => {
    logger_api["info_api_model"]("Processing request: " + req.url);
    if (req.query.shader_set_name == null || req.query.shader_set_name == undefined)
    {
        var shader_set_name = "vert-colors";
    } else {
        var shader_set_name = req.query.shader_set_name;
    }
    try
    {
        logger_api["info_api_model"]("Querying database...");
        var message = await shader_set_shaders_query_promise(shader_set_name);
        logger_api["info_api_model"]("...database query complete.");
        logger_api["super_verbose_api_model"]("Returning " + JSON.stringify(message));
        res.json({ success: true, message });
    } 
    catch (err)
    {
        logger_api["error_api_model"]("Error processing query: " + err);  
        res.status(500).json({ success: false, error: err.message });  
    }
});

//module.exports = models_routes;
export { models_routes };