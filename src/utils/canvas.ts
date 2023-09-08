import { getElementContentSize } from ".";

const ASPECT_RATIO = [4, 3] as const;

export const getChildCanvasSize = (
  containerWidth: number,
  containerHeight: number
) => {
  const isWide =
    containerWidth * ASPECT_RATIO[1] >= containerHeight * ASPECT_RATIO[0];

  if (isWide) {
    const height = containerHeight;
    const width = Math.floor(
      (containerHeight * ASPECT_RATIO[0]) / ASPECT_RATIO[1]
    );
    return { width, height };
  }

  const width = containerWidth;
  const height = Math.floor(
    (containerWidth * ASPECT_RATIO[1]) / ASPECT_RATIO[0]
  );
  return { width, height };
};

export const encloseToContainer = (
  container: HTMLElement,
  canvas: HTMLCanvasElement | OffscreenCanvas
) => {
  const { width: containerWidth, height: containerHeight } =
    getElementContentSize(container);
  const { width, height } = getChildCanvasSize(containerWidth, containerHeight);
  canvas.width = width;
  canvas.height = height;
};

export const replaceCanvas = (
  container: HTMLElement,
  canvas: HTMLCanvasElement
) => {
  const newCanvas = document.createElement("canvas");
  encloseToContainer(container, newCanvas);
  newCanvas.id = canvas.id;
  canvas.replaceWith(newCanvas);
};
