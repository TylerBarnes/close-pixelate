/*!
 * Close Pixelate v3.0.00 beta
 * http://desandro.com/resources/close-pixelate/
 * 
 * Developed by
 * - Tyler Barnes http://tylerbarnes.ca
 * - David DeSandro  http://desandro.com
 * - John Schulz  http://twitter.com/jfsiii
 * 
 * Licensed under MIT license
 */

import { isCanvasSupported } from "./functions/utils";
import { renderClosePixels } from "./functions/renderClosePixels";

class ClosePixelation {
  constructor(img, options) {
    // don't proceed if canvas is no supported
    if (!isCanvasSupported()) {
      return;
    }
    this.img = img;
    // creat canvas
    var canvas = (this.canvas = document.createElement("canvas"));
    this.ctx = canvas.getContext("2d");
    // copy attributes from img to canvas
    canvas.className = img.className;
    canvas.id = img.id;
    this.render(options);
    // replace image with canvas
    img.parentNode.replaceChild(canvas, img);
  }

  renderClosePixels = renderClosePixels;

  render(options) {
    this.options = options;
    // set size
    var w = (this.width = this.canvas.width = this.img.width);
    var h = (this.height = this.canvas.height = this.img.height);
    // draw image on canvas
    this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height);
    // get imageData
    try {
      this.imgData = this.ctx.getImageData(0, 0, w, h).data;
    } catch (error) {
      console.error(error);
      return;
    }
    this.ctx.clearRect(0, 0, w, h);
    for (var i = 0, len = options.length; i < len; i++) {
      this.renderClosePixels(options[i]);
    }
  }
}

export default ClosePixelation;
