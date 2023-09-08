import { defineProgram } from "@/utils";
import vertexShaderCode from "./main.vert?raw";
import fragmentShaderCode from "./main.frag?raw";

export default defineProgram((gl) => {
  const VBO = gl.createBuffer();
  const vertices = [-0.5, -0.5, 0, 0.5, -0.5, 0, 0, 0.5, 0];
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
  gl.shaderSource(vertexShader, vertexShaderCode);
  gl.compileShader(vertexShader);

  gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
  gl.shaderSource(fragmentShader, fragmentShaderCode);
  gl.compileShader(fragmentShader);

  const program = gl.createProgram()!;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  const aPosLocation = gl.getAttribLocation(program, "aPos");
  gl.enableVertexAttribArray(aPosLocation);

  const draw = () => {
    gl.clearColor(0.2, 0.3, 0.3, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);
    gl.enableVertexAttribArray(aPosLocation);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    requestAnimationFrame(draw);
  };

  requestAnimationFrame(draw);
});
