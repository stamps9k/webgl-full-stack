#version 300 es
precision highp float;

//Passed in from the vertex shader
in vec2 v_texcoord;
in vec4 color;
in vec3 normal;

//The texture
uniform sampler2D u_texture;

out vec4 frag_colour;

void main() {
	//For now, hard coded light direction
	vec3 light_dir = normalize(vec3(1.0, 1.0, 1.0)); 

	// Calculate light direction and strength
	vec3 N = normalize(normal);
	float light_strength = 2.0; // 0.0 to 1.0
	float diff = max(dot(N, light_dir), 0.0) * light_strength;

	// Apply the light to the color of each vertex
	vec3 ambient = vec3(0.1);
    vec3 lighting = ambient + diff;
	vec3 lit_color = color.rgb * lighting;
	vec4 final_color = vec4(lit_color, color.a);

	// Combine texture and lighting for final frag color
	frag_colour = final_color * texture(u_texture, v_texcoord);
}
