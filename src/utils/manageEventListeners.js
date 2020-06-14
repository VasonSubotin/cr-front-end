import { toArray } from "./toArray";

export const manageEventListeners = (type, listeners, func) => {
  toArray(listeners).forEach((listener) => window[type](listener, func));
};
