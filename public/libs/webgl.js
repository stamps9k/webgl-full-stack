import * as wasm from "wasm-model-viewer-core-bin";
import { super_verbose, info, verbose, warn, error } from "./debug_config.js";

var global_resources;
var engine;

// Register a mousemove listener and send data to WebAssembly
document.addEventListener("mousemove", (event) => {
    if (window.get_mouse_position) {
        window.get_mouse_position(event);
    }
});

function update_rotate_x(event) {
	if (event.target.checked) 
	{
		wasm.enable_rotate_x();
	} else {
		wasm.disable_rotate_x();
	}
}
window.update_rotate_x = update_rotate_x;

function update_rotate_y(event) {
	if (event.target.checked) 
	{
		wasm.enable_rotate_y();
	} else {
		wasm.disable_rotate_y();
	}
}
window.update_rotate_y = update_rotate_y;

function update_rotate_z(event) {
	if (event.target.checked) 
	{
		wasm.enable_rotate_z();
	} else {
		wasm.disable_rotate_z();
	}
}
window.update_rotate_z = update_rotate_z;

function update_zoom_in(event) {
	if (event.target.checked) 
	{
		wasm.enable_zoom_in();
	} else {
		wasm.disable_zoom_in();
	}
}
window.update_zoom_in = update_zoom_in;

function update_zoom_out(event) {
	if (event.target.checked) 
	{
		wasm.enable_zoom_out();
	} else {
		wasm.disable_zoom_out();
	}
}
window.update_zoom_out = update_zoom_out;

async function get_shader_names()
{
	return new Promise
	(
		(resolve) => {
			const url_params = new URLSearchParams(window.location.search);
			if (url_params.get('shader_set') == null) 
			{
				var shader_set_name = "vert-color";
			} else {
				var shader_set_name = url_params.get('shader_set');
			}

			info("Fetching shader names for set " + shader_set_name);
			fetch
			(
				'api/model/shader_set_shaders?shader_set_name=' + shader_set_name
			)
			.then
			(
				async function(response) 
				{
					//Check if the response is ok, if not throw an error
					if (!response.ok) 
					{
						throw new Error("Network response was not ok: " + response.statusText);
					} 
					//Check if the response is empty, if so log and throw an error
					else 
					{
						//Clone the response as the original response was already consumed
						let clone = response.clone();
						var response_json = await clone.json();
						if(response_json.message.length == 0) 
						{
							throw new Error("No shaders found for set " + shader_set_name);
						} 
						else
						{
							return response.json();	
						}
					}
				},
				function() {
					//Throw an error if the fetch fails
					throw new Error("Failed to fetch shader names for set " + shader_set_name);
				}
			)
			.then
			(
				text => {
					info("...API responded.");
					verbose("Full API response is:");
					verbose(text);
					var resources = new Map();
					text.message.forEach
					(
						(shader_info) => 
						{
							if (shader_info.shader_type == "vert")
							{
								resources.set("vert_shader", shader_info.shader_name);
							} 
							else if (shader_info.shader_type == "frag")
							{
								resources.set("frag_shader", shader_info.shader_name);
							}
						}
					);
					resolve(resources);
				}
			)
			.catch
			(
				function(error_response)
				{
					error(error_response.message);
					return null
				} 
			)
		}
	);
}

async function get_material_names() {
	return new Promise
	(
		(resolve) => {
			const url_params = new URLSearchParams(window.location.search);
			if (url_params.get('model') == null) 
			{
				var model_name = "cube.obj";
			} else {
				var model_name = url_params.get('model');
			}

			info("Fetching material names for model " + model_name);
			fetch
			(
				'/api/model/model_materials?model_name=' + model_name
			)
			.then
			(
				async function(response) 
				{
					//Check if the response is ok, if not throw an error
					if (!response.ok) 
					{
						throw new Error("Network response was not ok: " + response.statusText);
					} 
					//Check if the response is empty, if so log and throw an error
					else 
					{
						//Clone the response as the original response was already consumed
						let clone = response.clone();
						var response_json = await clone.json();
						return response.json();
					}
				},
				function() {
					//Throw an error if the fetch fails
					throw new Error("Failed to fetch materials for model " + model_name);
				}
			)
			.then
			(
				text => {
					info("...API responded.");
					verbose("Full API response is:");
					verbose(text);
					var materials = [];
					text.message.forEach
					(
						(material_info) => 
						{
							materials.push(material_info.material_name);
						}
					);
					resolve(materials);
				}
			)
			.catch
			(
				function(error_response)
				{
					error(error_response.message);
					throw new Error(error_response.message)
				} 
			)
		}
	);
}

async function get_texture_names(materials) {
	return new Promise
	(
		(resolve) => {
			const url_params = new URLSearchParams(window.location.search);
			var textures_return = [];
			if (materials.length == 0)
			{
				// Empty array returned if there was not material in the first place.
				info("No materials so no textures fetched.")
				resolve(textures_return);
			} else {
				for (const material of materials)
				{
					info("Fetching texture names for material " + material);
					fetch
					(
						'/api/material/material_textures?material_name=' + material
					)
					.then
					(
						async function(response) 
						{
							//Check if the response is ok, if not throw an error
							if (!response.ok) 
							{
								throw new Error("Network response was not ok: " + response.statusText);
							} 
							//Check if the response is empty, if so log and throw an error
							else 
							{
								//Clone the response as the original response was already consumed
								let clone = response.clone();
								var response_json = await clone.json();
								if(response_json.message.length == 0) 
								{
									return response.json();
								} 
								else
								{
									return response.json();	
								}
							}
						},
						function() {
							//Throw an error if the fetch fails
							throw new Error("Failed to fetch textures for material " + material);
						}
					)
					.then
					(
						text => {
							info("...API responded.");
							verbose("Full API response is:");
							verbose(text);
							for (const texture_info of text.message)
							{
								textures_return.push(texture_info.texture_name)
							}
							resolve(textures_return);
						}
					)
					.catch
					(
						function(error_response)
						{
							error(error_response.message);
							throw new Error(error_response);
						} 
					)
				}
			}
			
		}
	);
}

async function fetch_vert_shader(vert_shader) {
	return new Promise (
		(resolve) => {
		info("Loading shader " + vert_shader + "...");
		fetch('assets/' + vert_shader)
			.then(response => response.text())
			.then(text => {
				info("... vert shader loaded");
				verbose("Shader text is:");
				verbose(text);
				resolve(text);
			})
			.catch(error => console.error("Error fetching data:", error));
		}
	);
}

async function fetch_frag_shader(frag_shader) {
	return new Promise (
		(resolve) => {
			info("Loading shader " + frag_shader + "...");
			fetch('assets/' + frag_shader)
				.then(response => response.text())
				.then(text => {
					info("... frag shader loaded");
					verbose("Shader text is:");
					verbose(text);
					resolve(text);
				})
				.catch(error => console.error("Error fetching data:", error));
		}
	);
}

async function fetch_model(model) {
	return new Promise (
		(resolve) => {
			info("Loading model " + model + "...");
			fetch('assets/' + model)
				.then(response => response.text())
				.then(text => {
					info("... model loaded");
					super_verbose("Model text is:");
					super_verbose(text);
					resolve(text);
				})
				.catch(error => console.error("Error fetching data:", error));
		}
	);
}

async function fetch_materials(materials) {
	return new Promise (
		(resolve) => {
			var return_materials = new Map();
			if (materials.length == 0)
			{
				// No materials so nothing to check.
				resolve(return_materials);
			} else {
				for (const material of materials){
					info("Loading material " + material + "...");
					fetch('assets/' + material)
						.then(response => response.text())
						.then(text => {
							info("... material loaded");
							super_verbose("Material text is:");
							super_verbose(text);
							return_materials.set(material, text)
							resolve(return_materials);
						})
						.catch(error => console.error("Error fetching data:", error));
				}
			}
		}
	);
}

async function fetch_textures(textures) {
	return new Promise (
		(resolve) => {
			var return_textures = new Map();
			if (textures.length == 0)
			{
				// No textures so nothing to check.
				resolve(return_textures);
			} else {
				for (const texture of textures) {
					info("Loading texture " + textures[0] + "...");
					fetch('assets/' + textures[0])
					.then(response => response.arrayBuffer())
					.then(arrayBuffer => {
						var result_b = new Uint8Array(arrayBuffer);
						const binString = Array.from(result_b, (byte) =>
							String.fromCodePoint(byte),
						).join("");
						var result_b64 = btoa(binString);
						info("... texture loaded");
						verbose("B64 Encoded  texture is:");
						verbose(result_b64);
						return_textures.set(texture, result_b64);
						resolve(return_textures);
					})
					.catch(error => console.error("Error fetching data:", error));
				}
			}
		}
	);
}

function init(resources) {
	verbose("Telling wasm to start WebGl with the following" + stringify_map(resources) + "...");
	global_resources = resources;
    engine = wasm.initialize_web_gl(resources);
	verbose("...wasm returned.")
}

function change_model(new_model) {
	info("Updating resources...");
	verbose("Updating resources map...");
	
	//Update the model
	super_verbose("Updating model...");
	global_resources.set("cube", new_model);
	super_verbose("...model updated.");

	//TODO handle textured object uploads. For now remove texture
	super_verbose("Updating textures...");
	global_resources.set("textures", {});
	super_verbose("...textures updated.");	
	verbose("...resources map updated.");

	verbose("Sending request for wasm to update scene on GPU...");
	verbose("Telling wasm to update WebGl with the following" + stringify_map(global_resources) + "...");
	engine = wasm.update_scene(engine, global_resources);
	verbose("...scene updated.");
	info("...model updated");
}

function stringify_map(resources) {
	var stringified_resources = JSON.stringify(resources, (key, value) => {
		if (value instanceof Map) return Object.fromEntries(value);
		if (key !== '' && !(value instanceof Object)) return String(value).slice(0, 10) + '...';
		return value;
	}, 2)

	return stringified_resources;
}

//export public facing functions
export { get_shader_names, get_material_names, get_texture_names, fetch_vert_shader, fetch_frag_shader, fetch_model, fetch_materials, fetch_textures, init, change_model, update_zoom_in, update_zoom_out, update_rotate_x, update_rotate_y, update_rotate_z }