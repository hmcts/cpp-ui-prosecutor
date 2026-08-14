export const mockNativeMethods = () => {
  Object.defineProperty(window, 'getComputedStyle', {
    value: () => ({
      getPropertyValue: prop => {
        return '';
      }
    })
  });
};
