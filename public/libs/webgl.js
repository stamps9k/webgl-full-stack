import * as wasm from "wasm-model-viewer-core-bin";
import { super_verbose, info, verbose, warn, error } from "./debug_config.js";
import { set_fps } from "./dom_update.js";

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
					verbose("Model text is:");
					verbose(text);
					resolve(text);
				})
				.catch(error => console.error("Error fetching data:", error));
		}
	);
}

async function fetch_texture(texture) {
	return new Promise (
		(resolve) => {
			info("Loading texture " + texture + "...");
			fetch('assets/' + texture)
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
				resolve(result_b64);
			})
			.catch(error => console.error("Error fetching data:", error));
		}
	);
}

function init(resources) {
	global_resources = resources;
    engine = wasm.initialize_web_gl(resources);
}

function change_model(new_model) {
	info("Updating model...");
	verbose("Updating resources map...");
	global_resources.set("cube", new_model);
	verbose("...resources map updated.");

	verbose("Sending request for wasm to update scene on GPU...");
	engine = wasm.update_scene(engine, global_resources);
	verbose("...scene updated.");
	info("...model updated");
}

//export public facing functions
export { get_shader_names, fetch_vert_shader, fetch_frag_shader, fetch_model, fetch_texture, init, change_model, update_rotate_x, update_rotate_y, update_rotate_z }