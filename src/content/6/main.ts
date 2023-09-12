import { defineProgram } from "@/utils";
import vertexShaderCode from "./main.vert?raw";
import fragmentShaderCode from "./main.frag?raw";
import Shader from "@/utils/shader";

export default defineProgram((gl) => {
  const shader = new Shader(gl, vertexShaderCode, fragmentShaderCode);

  const vertices = [
    0.5, -0.5, 0.0, 1.0, 0.0, 0.0, -0.5, -0.5, 0.0, 0.0, 1.0, 0.0, 0.0, 0.5,
    0.0, 0.0, 0.0, 1.0,
  ];

  const VAO = gl.createVertexArray();
  gl.bindVertexArray(VAO);

  const VBO = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  gl.vertexAttribPointer(
    0,
    3,
    gl.FLOAT,
    false,
    6 * Float32Array.BYTES_PER_ELEMENT,
    0
  );
  gl.vertexAttribPointer(
    1,
    3,
    gl.FLOAT,
    false,
    6 * Float32Array.BYTES_PER_ELEMENT,
    3 * Float32Array.BYTES_PER_ELEMENT
  );
  gl.enableVertexAttribArray(0);
  gl.enableVertexAttribArray(1);

  const draw = () => {
    gl.clearColor(0.2, 0.3, 0.3, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    shader.use();
    gl.bindVertexArray(VAO);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    requestAnimationFrame(draw);
  };

  requestAnimationFrame(draw);
});
