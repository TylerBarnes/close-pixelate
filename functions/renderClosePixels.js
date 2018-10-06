import { isObject, isArray, PI } from "./utils";

export function renderClosePixels(opts) {
  var w = this.width;
  var h = this.height;
  var ctx = this.ctx;
  var imgData = this.imgData;

  // option defaults
  var res = opts.resolution || 16;
  var size = opts.size || res;
  var alpha = opts.alpha || 1;
  var offset = opts.offset || 0;
  var offsetX = 0;
  var offsetY = 0;
  var cols = w / res + 1;
  var rows = h / res + 1;
  var halfSize = size / 2;
  var diamondSize = size / Math.SQRT2;
  var halfDiamondSize = diamondSize / 2;

  if (isObject(offset)) {
    offsetX = offset.x || 0;
    offsetY = offset.y || 0;
  } else if (isArray(offset)) {
    offsetX = offset[0] || 0;
    offsetY = offset[1] || 0;
  } else {
    offsetX = offsetY = offset;
  }

  var row, col, x, y, pixelY, pixelX, pixelIndex, red, green, blue, pixelAlpha;

  for (row = 0; row < rows; row++) {
    y = (row - 0.5) * res + offsetY;
    // normalize y so shapes around edges get color
    pixelY = Math.max(Math.min(y, h - 1), 0);

    for (col = 0; col < cols; col++) {
      x = (col - 0.5) * res + offsetX;
      // normalize y so shapes around edges get color
      pixelX = Math.max(Math.min(x, w - 1), 0);
      pixelIndex = (pixelX + pixelY * w) * 4;
      red = imgData[pixelIndex + 0];
      green = imgData[pixelIndex + 1];
      blue = imgData[pixelIndex + 2];
      pixelAlpha = alpha * (imgData[pixelIndex + 3] / 255);

      ctx.fillStyle =
        "rgba(" + red + "," + green + "," + blue + "," + pixelAlpha + ")";

      switch (opts.shape) {
        case "circle":
          ctx.beginPath();
          ctx.arc(x, y, halfSize, 0, PI.TWO_PI, true);
          ctx.fill();
          ctx.closePath();
          break;
        case "diamond":
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(PI.QUARTER_PI);
          ctx.fillRect(
            -halfDiamondSize,
            -halfDiamondSize,
            diamondSize,
            diamondSize
          );
          ctx.restore();
          break;
        default:
          // square
          ctx.fillRect(x - halfSize, y - halfSize, size, size);
      } // switch
    } // col
  } // row
}
