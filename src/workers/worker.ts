import { getChildCanvasSize } from "@/utils";

let canvas: OffscreenCanvas | null = null;
let gl: WebGL2RenderingContext | null = null;

interface FileModule {
  default: (gl: WebGL2RenderingContext) => void;
}

const initialize = (offscreen: OffscreenCanvas) => {
  canvas = offscreen;
  gl = canvas.getContext("webgl2");
};

const start = (id: string | null) => {
  if (!id) {
    return;
  }

  import(`../content/${id}/main.ts`).then((m: FileModule) => {
    if (!gl) {
      return;
    }

    m.default(gl);
  });
};

const resizeCanvas = (containerWidth: number, containerHeight: number) => {
  if (!canvas) {
    return;
  }

  const { width, height } = getChildCanvasSize(containerWidth, containerHeight);
  canvas.width = width;
  canvas.height = height;
};

const resizeViewport = (
  gl: WebGL2RenderingContext | null,
  width: number,
  height: number
) => {
  if (!gl) {
    return;
  }

  gl.viewport(0, 0, width, height);
};

onmessage = (evt) => {
  const { event } = evt.data;
  switch (event) {
    case "init":
      const { canvas: offscreenCanvas }: { canvas: OffscreenCanvas } = evt.data;
      initialize(offscreenCanvas);
      break;
    case "start":
      const { id } = evt.data;
      start(id);
      break;
    case "resize":
      const { containerWidth, containerHeight } = evt.data;
      resizeCanvas(containerWidth, containerHeight);
      resizeViewport(gl, canvas!.width, canvas!.height);
      break;
  }
};
