/**
 * @author Roger Qi / https://github.com/SouthpawGoblin
 * @description function for generating multi-line text sprite with Three.js.
 * @param {*} text text to show on sprite, use '\n' to seperate lines 
 * @param {*} config {
 *   fontFace: string,
 *   fontSize: number,
 *   fontColor: string(rgba),
 *   fontBold: boolean,
 *   fontItalic: boolean,
 *   textAlign: string,
 *   borderThickness: number,
 *   borderColor: string(rgba),
 *   borderRadius: number,
 *   backgroundColor: string(rgba)
 * } 
 */
var generateTextSprite = function(text, config) {
  config || (config = { });

  var fontFace = config.hasOwnProperty('fontFace') ? config['fontFace'] : 'Arial';
  var fontSize = config.hasOwnProperty('fontSize') ? config['fontSize'] : 18;
  var fontColor = config.hasOwnProperty('fontColor') ? config['fontColor'] : 'rgba(0, 0, 0, 1)';
  var fontBold = config.hasOwnProperty('fontBold') ? config['fontBold'] : false;
  var fontItalic = config.hasOwnProperty('fontItalic') ? config['fontItalic'] : false;
  var textAlign = config.hasOwnProperty('textAlign') ? config['textAlign'] : 'left';
  var borderThickness = config.hasOwnProperty('borderThickness') ? config['borderThickness'] : 4;
  var borderColor = config.hasOwnProperty('borderColor') ? config['borderColor'] : 'rgba(0, 0, 0, 1)';
  var borderRadius = config.hasOwnProperty('borderRadius') ? config['borderRadius'] : 0;
  var backgroundColor = config.hasOwnProperty('backgroundColor') ? config['backgroundColor'] : 'rgba(255, 255, 255, 1)';

  var ruler = document.createElement('canvas').getContext('2d');
  ruler.font = (fontBold ?  'Bold ' : '') + (fontItalic ? 'Italic ' : '') + fontSize + 'px ' + fontFace;
    
  var textLines = text.split('\n');
  var textWidth = 0;
  // canvas width shall be based on the longest width of text lines
  textLines.forEach(function(line) {
    var metrics = ruler.measureText(line);
    textWidth = metrics.width > textWidth ? metrics.width : textWidth;  
  });
  // 1.4 is extra height factor for text below baseline: g,j,p,q.
  var textHeight = fontSize * 1.4 * textLines.length;
  
  // texture canvas
  var canvas = document.createElement('canvas');
  canvas.width = _ceilPow2(textWidth);
  canvas.height = _ceilPow2(textHeight);
  var context = canvas.getContext('2d');

  // draw background
  context.font = ruler.font;
  context.fillStyle = backgroundColor;
  context.strokeStyle = borderColor;
  context.lineWidth = borderThickness;
  _roundRect(context, borderThickness / 2, borderThickness / 2, textWidth + borderThickness, textHeight + borderThickness, borderRadius);
  
  // draw text
  context.fillStyle = fontColor;
  context.textAlign = textAlign;
  var fillTextX = {
    left: borderThickness,
    start: borderThickness,
    center: textWidth / 2 + borderThickness,
    right: textWidth + borderThickness,
    end: textWidth + borderThickness
  };
  var curY = fontSize + borderThickness
  textLines.forEach(function(line) {
    context.fillText(line, fillTextX[textAlign], curY);
    curY += fontSize * 1.4;
  })
  
  // generate sprite
  var texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  var spriteMaterial = new THREE.SpriteMaterial({ 
    map: texture,
    transparent: true
  });
  var sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(canvas.width / 2, canvas.height / 2, 1);
  
  return sprite;

  // ceil the input number to the nearest powers of 2
  function _ceilPow2(num) {
    var i = 0;
    while (num > Math.pow(2, i)) { 
      i++;
    }
    return Math.pow(2, i);
  }

  // draw round rect
  function _roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };
}