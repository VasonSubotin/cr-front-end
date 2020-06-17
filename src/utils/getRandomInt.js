export const getRandomInt = (max, min = 0) =>
  Math.floor(Math.random() * Math.floor(max - min + 1)) + min;
