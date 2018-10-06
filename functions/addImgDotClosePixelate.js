export function addImgDotClosePixelate() {
  // enable img.closePixelate
  HTMLImageElement.prototype.closePixelate = function(options) {
    return new ClosePixelation(this, options);
  };
}
