// util vars
// var TWO_PI = Math.PI * 2;
export const PI = {
  TWO_PI: Math.PI * 2,
  QUARTER_PI: Math.PI * 0.25
};

export function isArray(obj) {
  return Object.prototype.toString.call(obj) === "[object Array]";
}

export function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

export function isCanvasSupported() {
  var canvas = document.createElement("canvas");
  return canvas.getContext && canvas.getContext("2d");
}
