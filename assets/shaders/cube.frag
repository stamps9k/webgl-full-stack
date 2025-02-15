#version 300 es

precision highp float;

in vec3 colour;
in float time;
in vec2 resolution;
in vec2 mouse_position;

out vec4 frag_colour;

void main() {
	vec4 new_colour = vec4
	(
		colour[0], 
		colour[1], 
		colour[2], 
		1.0
	);
	frag_colour = new_colour;
}
