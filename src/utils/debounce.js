export const debounce = (func, interval) => {
  let timeout;
  const debounced = () => {
    const call = () => {
      timeout = null;
      func();
    };
    clearTimeout(timeout);
    timeout = setTimeout(call, interval);
  };
  debounced.cancel = () => clearTimeout(timeout);
  return debounced;
};
