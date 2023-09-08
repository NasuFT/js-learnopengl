import { defineProgram } from "@/utils/define";

export default defineProgram((gl: WebGLRenderingContext) => {
  const draw = () => {
    gl.clearColor(0.2, 0.3, 0.3, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    requestAnimationFrame(draw);
  };

  requestAnimationFrame(draw);
});
