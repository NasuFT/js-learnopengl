import { defineProgram } from "@/utils/define";

export default defineProgram((gl) => {
  const draw = () => {
    gl.clearColor(0.3, 0.4, 0.4, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    requestAnimationFrame(draw);
  };

  requestAnimationFrame(draw);
});
