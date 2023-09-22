#version 300 es
precision highp float;

in vec2 texCoord;
in vec3 vertexColor;
out vec4 FragColor;

uniform sampler2D texture1;
uniform sampler2D texture2;

void main() {
    FragColor = mix(texture(texture1, texCoord), texture(texture2, texCoord), 0.2f);
}