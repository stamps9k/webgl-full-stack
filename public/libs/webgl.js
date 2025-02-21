import * as wasm from "wasm-model-viewer-core";
import { info, verbose, warn, error } from "./debug_config.js";
import { set_fps } from "./dom_update.js";

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

function get_shader_names()
{
	return new Promise((resolve) => {
		const url_params = new URLSearchParams(window.location.search);
		if (url_params.get('shader_set') == null) 
		{
			var vert_shader = "vert-color";
		} else {
			var vert_shader = url_params.get('shader_set');
		}

		fetch('api/model/shader_set_shaders?shader_set_name=' + vert_shader)
			.then(response => response.json())
			.then(text => {
				info("...API responded.");
				verbose("Full API response is:");
				verbose(text);
				var resources = new Map();
				text.message.forEach((shader_info) => {
					if (shader_info.shader_type == "vert")
					{
						resources.set("vert_shader", shader_info.name);
					} 
					else if (shader_info.shader_type == "frag")
					{
						resources.set("frag_shader", shader_info.name);
					}
				});
				resolve(resources);
			})
			.catch(error => console.error("Error fetching data:", error));
	});
}

function fetch_vert_shader() {
	var shaders = get_shader_names()
		.then(shaders => {
			var vert_shader = shaders.get("vert_shader");
			info("Loading shader " + vert_shader + "...");
			fetch('assets/' + vert_shader)
				.then(response => response.text())
				.then(text => {
					info("... vert shader loaded");
					verbose("Shader text is:");
					verbose(text);
					var resources = new Map();
					resources.set("vert_shader", text);
					fetch_frag_shader(resources, shaders);
				})
				.catch(error => console.error("Error fetching data:", error));
	
		});
}

function fetch_frag_shader(resources, shaders) {
	var frag_shader = shaders.get("frag_shader");
	info("Loading shader " + frag_shader + "...");
	fetch('assets/' + frag_shader)
        .then(response => response.text())
        .then(text => {
			info("... frag shader loaded");
        	verbose("Shader text is:");
        	verbose(text);
			resources.set("frag_shader", text);
			fetch_model(resources);
		})
        .catch(error => console.error("Error fetching data:", error));
}

function fetch_model(resources) {
	const url_params = new URLSearchParams(window.location.search);
	if (url_params.get('model') == null) 
	{
		var model = "cube.obj";
	} else {
		var model = url_params.get('model');
	}
	info("Loading model " + model + "...");
	fetch('assets/' + model)
        .then(response => response.text())
        .then(text => {
			info("... model loaded");
        	verbose("Model text is:");
        	verbose(text);
        	resources.set("cube", text);
			if (url_params.get("texture") == undefined)
			{
				init(resources);
			}
			else
			{
				fetch_texture(resources);
			}
		})
        .catch(error => console.error("Error fetching data:", error));
}

function fetch_texture(resources) {
	const url_params = new URLSearchParams(window.location.search);
	if (url_params.get('model') == null) 
	{
		var texture = "cube.tex";
	} else {
		var texture = url_params.get('texture');
	}
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
		resources.set("texture", result_b64);
		init(resources);
	})
	.catch(error => console.error("Error fetching data:", error));
}

function init(resources) {
    wasm.initialize_web_gl(resources);
}

//export public facing functions
export { fetch_vert_shader, update_rotate_x, update_rotate_y, update_rotate_z }