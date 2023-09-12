#version 300 es
precision highp float;

uniform vec4 ourColor;
out vec4 FragColor;

void main() {
    FragColor = ourColor;
}