import { defineProgram, Shader, loadImage } from "@/utils";
import vertexShaderCode from "./main.vert?raw";
import fragmentShaderCode from "./main.frag?raw";
import container from "@/assets/container.jpg";
import awesomeface from "@/assets/awesomeface.png";

export default defineProgram(async (gl) => {
  const shader = new Shader(gl, vertexShaderCode, fragmentShaderCode);

  const vertices = [
    // top right
    0.5, 0.5, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0,
    // bottom right
    0.5, -0.5, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0,
    // bottom left
    -0.5, -0.5, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0,
    // bottom right
    -0.5, 0.5, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0,
  ];
  const indices = [
    // first triangle
    0, 1, 3,
    // second triangle
    1, 2, 3,
  ];

  const VAO = gl.createVertexArray();
  gl.bindVertexArray(VAO);

  const VBO = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  const EBO = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, EBO);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint8Array(indices),
    gl.STATIC_DRAW
  );

  gl.vertexAttribPointer(
    0,
    3,
    gl.FLOAT,
    false,
    8 * Float32Array.BYTES_PER_ELEMENT,
    0
  );
  gl.vertexAttribPointer(
    1,
    3,
    gl.FLOAT,
    false,
    8 * Float32Array.BYTES_PER_ELEMENT,
    3 * Float32Array.BYTES_PER_ELEMENT
  );
  gl.vertexAttribPointer(
    2,
    2,
    gl.FLOAT,
    false,
    8 * Float32Array.BYTES_PER_ELEMENT,
    6 * Float32Array.BYTES_PER_ELEMENT
  );
  gl.enableVertexAttribArray(0);
  gl.enableVertexAttribArray(1);
  gl.enableVertexAttribArray(2);

  const containerImage = await loadImage(container);
  const awesomefaceImage = await loadImage(awesomeface, {
    imageOrientation: "flipY",
  });
  const containerTexture = gl.createTexture();
  const awesomefaceTexture = gl.createTexture();

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, containerTexture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGB,
    gl.RGB,
    gl.UNSIGNED_BYTE,
    containerImage
  );
  gl.generateMipmap(gl.TEXTURE_2D);

  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, awesomefaceTexture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    awesomefaceImage
  );
  gl.generateMipmap(gl.TEXTURE_2D);

  containerImage.close();
  awesomefaceImage.close();

  shader.use();
  shader.setInt("texture1", 0);
  shader.setInt("texture2", 1);

  const draw = () => {
    gl.clearColor(0.2, 0.3, 0.3, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, containerTexture);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, awesomefaceTexture);

    shader.use();

    gl.bindVertexArray(VAO);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_BYTE, 0);

    requestAnimationFrame(draw);
  };

  requestAnimationFrame(draw);
});
