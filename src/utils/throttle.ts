export const throttle = <T extends any[], R extends unknown>(
  fn: (...args: T) => R,
  delay: number
) => {
  let lastCalled = 0;
  return (...args: T) => {
    const now = new Date().getTime();
    if (now - lastCalled < delay) {
      return;
    }
    lastCalled = now;
    return fn(...args);
  };
};
