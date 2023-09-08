export const getElementContentSize = (element: Element) => {
  const { width, height } = element.getBoundingClientRect();
  const style = getComputedStyle(element);

  if (style.boxSizing === "content-box") {
    return { width, height };
  }

  return {
    width:
      width -
      parseFloat(style.paddingLeft) -
      parseFloat(style.paddingRight) -
      parseFloat(style.borderLeftWidth) -
      parseFloat(style.borderRightWidth),
    height:
      height -
      parseFloat(style.paddingBottom) -
      parseFloat(style.paddingTop) -
      parseFloat(style.borderBottomWidth) -
      parseFloat(style.borderTopWidth),
  };
};
