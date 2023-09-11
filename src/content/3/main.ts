import { defineProgram } from "@/utils";
import vertexShaderCode from "./main.vert?raw";
import fragmentShaderCode from "./main.frag?raw";

export default defineProgram((gl) => {
  const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
  gl.shaderSource(vertexShader, vertexShaderCode);
  gl.compileShader(vertexShader);

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
  gl.shaderSource(fragmentShader, fragmentShaderCode);
  gl.compileShader(fragmentShader);

  const program = gl.createProgram()!;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  const vertices = [
    0.5, 0.5, 0.0, 0.5, -0.5, 0.0, -0.5, -0.5, 0.0, -0.5, 0.5, 0.0,
  ];
  // changed due to automatic wireframing not present in WebGL 2 / OpenGL ES 3.0
  const indices = [0, 1, 1, 2, 2, 3, 0, 3, 1, 3];

  const VAO = gl.createVertexArray();
  gl.bindVertexArray(VAO);

  const EBO = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, EBO);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint32Array(indices),
    gl.STATIC_DRAW
  );

  const VBO = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

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
    gl.bindVertexArray(VAO);
    gl.drawElements(gl.LINES, 10, gl.UNSIGNED_INT, 0);

    requestAnimationFrame(draw);
  };

  requestAnimationFrame(draw);
});
