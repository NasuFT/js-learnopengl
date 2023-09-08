import { getChildCanvasSize } from "@/utils";

let canvas: OffscreenCanvas | null = null;
let gl: WebGLRenderingContext | null = null;

interface FileModule {
  default: (gl: WebGLRenderingContext) => void;
}

const initialize = (offscreen: OffscreenCanvas) => {
  canvas = offscreen;
  gl = canvas.getContext("webgl");
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
      break;
  }
};
