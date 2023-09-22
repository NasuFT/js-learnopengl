export const loadImage = async (
  imageSrc: string,
  options?: ImageBitmapOptions
) => {
  const response = await fetch(imageSrc);
  const blob = await response.blob();
  return createImageBitmap(blob, options);
};
