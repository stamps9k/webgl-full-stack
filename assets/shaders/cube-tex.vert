#version 300 es
in vec4 a_position;
in vec2 a_texcoord;
in vec3 a_normal;
in vec4 a_color;

uniform mat4 u_projection_matrix;
uniform mat4 u_camera_matrix;
uniform mat4 u_model_matrix;
uniform mat4 u_model_normalize_matrix;
uniform vec2 u_mouse_position;
uniform vec2 u_resolution;
uniform float u_time;

out vec2 v_texcoord;
out vec4 color;
out vec3 normal;

void main() {
	//Multiply the position by the projection matrix then the camera matrix	
	gl_Position = u_projection_matrix * u_camera_matrix * u_model_matrix * u_model_normalize_matrix * a_position;

	//Pass the texture co-ordinate to the fragment shader	
	v_texcoord = a_texcoord;

	//Pass the diffuse color value to the fragement shader
	color = a_color;

	//Pass the normal to the fragement shader
	normal = mat3(u_model_matrix) * a_normal;
}
