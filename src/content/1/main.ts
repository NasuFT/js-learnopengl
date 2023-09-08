import { defineProgram } from "@/utils";

export default defineProgram((gl) => {
  const draw = () => {
    gl.clearColor(0.2, 0.3, 0.3, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    requestAnimationFrame(draw);
  };

  requestAnimationFrame(draw);
});
