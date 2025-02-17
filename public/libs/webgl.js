import * as wasm from "wasm-model-viewer-core";
import { info, verbose, warn, error } from "./debug_config.js";
import { set_fps } from "./dom_update.js";

/*
$.ajaxSetup
(
	{
		beforeSend: function (jqXHR, settings) 
		{
			if (settings.dataType === 'binary')
				settings.xhr = () => $.extend(new window.XMLHttpRequest(), {responseType:'arraybuffer'})
		}
	}
);

$(document).ready(fetch_vert_shader)
*/

// Register a mousemove listener and send data to WebAssembly
document.addEventListener("mousemove", (event) => {
    if (window.get_mouse_position) {
        window.get_mouse_position(event);
    }
});

function update_rotate_x(checkboxElem) {
	if (checkboxElem.checked) 
	{
		wasm.enable_rotate_x();
	} else {
		wasm.disable_rotate_x();
	}
}
window.update_rotate_x = update_rotate_x;

function update_rotate_y(checkboxElem) {
	if (checkboxElem.checked) 
	{
		wasm.enable_rotate_y();
	} else {
		wasm.disable_rotate_y();
	}
}
window.update_rotate_y = update_rotate_y;

function update_rotate_z(checkboxElem) {
	if (checkboxElem.checked) 
	{
		wasm.enable_rotate_z();
	} else {
		wasm.disable_rotate_z();
	}
}
window.update_rotate_z = update_rotate_z;

function fetch_vert_shader() {
	const url_params = new URLSearchParams(window.location.search);
	if (url_params.get('model') == null) 
	{
		var vert_shader = "cube.vert";
	} else {
		var vert_shader = url_params.get('model') + ".vert";
	}
	info("Loading shader " + vert_shader + "...");
	fetch('assets/cube.vert')
        .then(response => response.text())
        .then(text => {
			info("... vert shader loaded");
        	verbose("Shader text is:");
        	verbose(text);
			var resources = new Map();
			resources.set("vert_shader", text);
			fetch_frag_shader(resources);
		})
        .catch(error => console.error("Error fetching data:", error));
}

function fetch_frag_shader(resources) {
	const url_params = new URLSearchParams(window.location.search);
	if (url_params.get('model') == null) 
	{
		var frag_shader = "cube.frag";
	} else {
		var frag_shader = url_params.get('model') + ".frag";
	}
	info("Loading shader " + frag_shader + "...");
	fetch('assets/cube.frag')
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
		var model = url_params.get('model') + ".obj";
	}
	info("Loading model " + model + "...");
	fetch('assets/cube.obj')
        .then(response => response.text())
        .then(text => {
			info("... model loaded");
        	verbose("Model text is:");
        	verbose(text);
        	resources.set("cube", text);
			init(resources);
		})
        .catch(error => console.error("Error fetching data:", error));
}

function fetch_texture(resources) {
	const url_params = new URLSearchParams(window.location.search);
	const model = url_params.get('model');
	var url = "textures/" + model + ".tex"; 
	info("Loading texture " + url + "...");
    $.ajax({
        url: url,
		processData: false,
		dataType: "binary",
        success: function(result) {
			info("... texture loaded");
			info("Converting texture to Base64 String...");
			var result_b = new Uint8Array(result);
			const binString = Array.from(result_b, (byte) =>
				String.fromCodePoint(byte),
			).join("");
			var result_b64 = btoa(binString);
			info("... texture stringified.");
			verbose("Full string is:");
			verbose(result_b64);
            resources.set("texture", result_b64);
			init(resources);
        },
        error: function(result) {
            error("... failed to fetch texture. Error is " + result.status + ": " + result.statusText);
        }
    });
}

function init(resources) {
    wasm.initialize_web_gl(resources);
}

//export public facing functions
export { fetch_vert_shader }