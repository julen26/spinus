// Copyright (c) 2017 Julen Salgado. All rights reserved.

/**
* @fileoverview Color class imlpementation
* @author Julen Salgado (julensalgado@gmail.com)
*/

goog.provide('sp.Color');
goog.require('sp');

/**
* Constructs Color objects
* @class Represents a Color object
* @param {int} r Red component
* @param {int} g Green component
* @param {int} b Blue component
* @param {int} a Alpha component
*/
sp.Color = function(r, g, b, a) {
    /**
    * Red component
    * @type int
    */
    this.r = r || 0;
    /**
    * Green component
    * @type int
    */
    this.g = g || 0;
    /**
    * Blue component
    * @type int
    */
    this.b = b || 0;
    /**
    * Alpha component
    * @type int
    */
    this.a = a || 255;
};

/**
* Compares colors and checks if they are equal
*
* @method
* @return {bool} True if colors are equal
*/
sp.Color.prototype.equals = function (color) {
    return (this.r == color.r && this.g == color.g && this.b == color.b && this.a == color.a);
};

/**
* Gets a rgba string that represents the color
*
* @method
* @return {string} rgba string
*/
sp.Color.prototype.getRGBAString = function () {
    return 'rgba(' + Math.floor(this.r) + ',' + Math.floor(this.g) + ',' + Math.floor(this.b) + ',' + (this.a / 255) +')';
};

/**
* Gets rgb color in hexadecimal format
*
* @method
* @return {string} RGB in hex format
*/
sp.Color.prototype.getHexString = function () {
    var r = Math.floor(this.r).toString(16);
    r = (r.length == 1) ? '0' + r : r;
    var g = Math.floor(this.g).toString(16);
    g = (g.length == 1) ? '0' + g : g;
    var b = Math.floor(this.b).toString(16);
    b = (b.length == 1) ? '0' + b : b;
    return '#' + r + g + b;
};

/**
* Creates a new Color object from normalized color components (in range 0.0-1.0)
*
* @method
* @param {float} r Red component
* @param {float} g Green component
* @param {float} b Blue component
* @param {float} a Alpha component
* @return {sp.Color} New color object
*/
sp.Color.fromNormalized = function (r, g, b, a) {
    return new sp.Color(Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255), Math.floor(a * 255));
};

/**
* Creates a new Color object randomly
*
* @method
* @return {sp.Color} New color object
*/
sp.Color.random = function () {
    return sp.Color.fromNormalized(Math.random(), Math.random(), Math.random(), Math.random());
};

/**
* Creates a new Color from a hexadecimal format
*
* @method
* @param {string} hex Color in hex format
* @return {sp.Color} New color object
*/
sp.Color.fromHex = function (hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? new sp.Color(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)) : new sp.Color();
};

/**
* Creates a new Color from a given HTML color name
*
* @method
* @param {string} colorName Color name
* @return {sp.Color} New color object
*/
sp.Color.fromName = function (colorName) {
    var colors = {'aliceblue':'#f0f8ff','antiquewhite':'#faebd7','aqua':'#00ffff','aquamarine':'#7fffd4','azure':'#f0ffff',
    'beige':'#f5f5dc','bisque':'#ffe4c4','black':'#000000','blanchedalmond':'#ffebcd','blue':'#0000ff','blueviolet':'#8a2be2','brown':'#a52a2a','burlywood':'#deb887',
    'cadetblue':'#5f9ea0','chartreuse':'#7fff00','chocolate':'#d2691e','coral':'#ff7f50','cornflowerblue':'#6495ed','cornsilk':'#fff8dc','crimson':'#dc143c','cyan':'#00ffff',
    'darkblue':'#00008b','darkcyan':'#008b8b','darkgoldenrod':'#b8860b','darkgray':'#a9a9a9','darkgreen':'#006400','darkkhaki':'#bdb76b','darkmagenta':'#8b008b','darkolivegreen':'#556b2f',
    'darkorange':'#ff8c00','darkorchid':'#9932cc','darkred':'#8b0000','darksalmon':'#e9967a','darkseagreen':'#8fbc8f','darkslateblue':'#483d8b','darkslategray':'#2f4f4f','darkturquoise':'#00ced1',
    'darkviolet':'#9400d3','deeppink':'#ff1493','deepskyblue':'#00bfff','dimgray':'#696969','dodgerblue':'#1e90ff',
    'firebrick':'#b22222','floralwhite':'#fffaf0','forestgreen':'#228b22','fuchsia':'#ff00ff',
    'gainsboro':'#dcdcdc','ghostwhite':'#f8f8ff','gold':'#ffd700','goldenrod':'#daa520','gray':'#808080','green':'#008000','greenyellow':'#adff2f',
    'honeydew':'#f0fff0','hotpink':'#ff69b4',
    'indianred ':'#cd5c5c','indigo':'#4b0082','ivory':'#fffff0','khaki':'#f0e68c',
    'lavender':'#e6e6fa','lavenderblush':'#fff0f5','lawngreen':'#7cfc00','lemonchiffon':'#fffacd','lightblue':'#add8e6','lightcoral':'#f08080','lightcyan':'#e0ffff','lightgoldenrodyellow':'#fafad2',
    'lightgrey':'#d3d3d3','lightgreen':'#90ee90','lightpink':'#ffb6c1','lightsalmon':'#ffa07a','lightseagreen':'#20b2aa','lightskyblue':'#87cefa','lightslategray':'#778899','lightsteelblue':'#b0c4de',
    'lightyellow':'#ffffe0','lime':'#00ff00','limegreen':'#32cd32','linen':'#faf0e6',
    'magenta':'#ff00ff','maroon':'#800000','mediumaquamarine':'#66cdaa','mediumblue':'#0000cd','mediumorchid':'#ba55d3','mediumpurple':'#9370d8','mediumseagreen':'#3cb371','mediumslateblue':'#7b68ee',
    'mediumspringgreen':'#00fa9a','mediumturquoise':'#48d1cc','mediumvioletred':'#c71585','midnightblue':'#191970','mintcream':'#f5fffa','mistyrose':'#ffe4e1','moccasin':'#ffe4b5',
    'navajowhite':'#ffdead','navy':'#000080',
    'oldlace':'#fdf5e6','olive':'#808000','olivedrab':'#6b8e23','orange':'#ffa500','orangered':'#ff4500','orchid':'#da70d6',
    'palegoldenrod':'#eee8aa','palegreen':'#98fb98','paleturquoise':'#afeeee','palevioletred':'#d87093','papayawhip':'#ffefd5','peachpuff':'#ffdab9','peru':'#cd853f','pink':'#ffc0cb','plum':'#dda0dd','powderblue':'#b0e0e6','purple':'#800080',
    'rebeccapurple':'#663399','red':'#ff0000','rosybrown':'#bc8f8f','royalblue':'#4169e1',
    'saddlebrown':'#8b4513','salmon':'#fa8072','sandybrown':'#f4a460','seagreen':'#2e8b57','seashell':'#fff5ee','sienna':'#a0522d','silver':'#c0c0c0','skyblue':'#87ceeb','slateblue':'#6a5acd','slategray':'#708090','snow':'#fffafa','springgreen':'#00ff7f','steelblue':'#4682b4',
    'tan':'#d2b48c','teal':'#008080','thistle':'#d8bfd8','tomato':'#ff6347','turquoise':'#40e0d0',
    'violet':'#ee82ee',
    'wheat':'#f5deb3','white':'#ffffff','whitesmoke':'#f5f5f5',
    'yellow':'#ffff00','yellowgreen':'#9acd32'};

    return sp.Color.fromHex(colors[colorName.toLowerCase()]);
};
