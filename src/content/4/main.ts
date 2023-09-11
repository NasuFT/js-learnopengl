import { defineProgram } from "@/utils";
import vertexShaderCode from "./main.vert?raw";
import fragmentShaderCode from "./main.frag?raw";
import yellowFragmentShaderCode from "./yellow.frag?raw";

export default defineProgram((gl) => {
  const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
  gl.shaderSource(vertexShader, vertexShaderCode);
  gl.compileShader(vertexShader);

  const fragmentShader_1 = gl.createShader(gl.FRAGMENT_SHADER)!;
  gl.shaderSource(fragmentShader_1, fragmentShaderCode);
  gl.compileShader(fragmentShader_1);
  const fragmentShader_2 = gl.createShader(gl.FRAGMENT_SHADER)!;
  gl.shaderSource(fragmentShader_2, yellowFragmentShaderCode);
  gl.compileShader(fragmentShader_2);

  const program = gl.createProgram()!;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader_1);
  gl.linkProgram(program);
  gl.deleteShader(fragmentShader_1);

  const program_2 = gl.createProgram()!;
  gl.attachShader(program_2, vertexShader);
  gl.attachShader(program_2, fragmentShader_2);
  gl.linkProgram(program_2);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader_2);

  const vertices_1 = [
    // first triangle
    -0.9, -0.5, 0.0, -0.0, -0.5, 0.0, -0.45, 0.5, 0.0,
  ];
  const vertices_2 = [
    // second triangle
    0.0, -0.5, 0.0, 0.9, -0.5, 0.0, 0.45, 0.5, 0.0,
  ];

  const VAO_1 = gl.createVertexArray();
  gl.bindVertexArray(VAO_1);

  const VBO_1 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO_1);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices_1), gl.STATIC_DRAW);

  gl.vertexAttribPointer(
    0,
    3,
    gl.FLOAT,
    false,
    3 * Float32Array.BYTES_PER_ELEMENT,
    0
  );
  gl.enableVertexAttribArray(0);

  const VAO_2 = gl.createVertexArray();
  gl.bindVertexArray(VAO_2);
  const VBO_2 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO_2);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices_2), gl.STATIC_DRAW);
  gl.vertexAttribPointer(
    0,
    3,
    gl.FLOAT,
    false,
    3 * Float32Array.BYTES_PER_ELEMENT,
    0
  );
  gl.enableVertexAttribArray(0);

  const draw = () => {
    gl.clearColor(0.2, 0.3, 0.3, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);
    gl.bindVertexArray(VAO_1);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.useProgram(program_2);
    gl.bindVertexArray(VAO_2);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    requestAnimationFrame(draw);
  };

  requestAnimationFrame(draw);
});
