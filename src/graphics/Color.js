var sp = sp || {};

/**
* Constructs Color objects
* @class Represents a Color object
* @param {int} r - Red component
* @param {int} g - Green component
* @param {int} b - Blue component
* @param {int} a - Alpha component
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
    return "rgba(" + Math.floor(this.r) + "," + Math.floor(this.g) + "," + Math.floor(this.b) + "," + this.a/255 +")";
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
* @return {Color} New color object
*/
sp.Color.fromNormalized = function (r, g, b, a) {
    return new sp.Color(r * 255, g * 255, b * 255, a * 255);
};

/**
* Crestes a new Color object randomly
*
* @method
* @return {Color} New color object
*/
sp.Color.random = function () {
    return sp.Color.fromNormalized(Math.random(), Math.random(), Math.random(), Math.random());
};
