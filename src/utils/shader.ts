class Shader {
  #ID;
  #gl;
  constructor(
    gl: WebGLRenderingContext | WebGL2RenderingContext,
    vertexShaderCode: string,
    fragmentShaderCode: string
  ) {
    this.#gl = gl;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    this.#ID = gl.createProgram()!;
    gl.attachShader(this.#ID, vertexShader);
    gl.attachShader(this.#ID, fragmentShader);
    gl.linkProgram(this.#ID);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
  }
  use() {
    this.#gl.useProgram(this.#ID);
  }
  setBool(name: string, value: boolean) {
    this.#gl.uniform1i(
      this.#gl.getUniformLocation(this.#ID, name),
      value ? 1 : 0
    );
  }
  setInt(name: string, value: number) {
    this.#gl.uniform1i(this.#gl.getUniformLocation(this.#ID, name), value);
  }
  setFloat(name: string, value: number) {
    this.#gl.uniform1f(this.#gl.getUniformLocation(this.#ID, name), value);
  }
}

export default Shader;
