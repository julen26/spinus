var _NS = _NS || {};

/**
* Constructs RectangleShape objects
* @class Represents a RectangleShape object
* @extends Shape
* @param {float} x - X position
* @param {float} y - Y position
* @param {float} w - Width
* @param {float} h - Height
* @param {Color} color - Color
*/
_NS.RectangleShape = function(w, h, color) {
    _NS.Shape.call(this, 4);
    this.setSize(w, h);
    this.setColor(color);
};
_NS.extend(_NS.RectangleShape, _NS.Shape);

/**
* Sets rectangle bounds
*
* @method
* @param {float} x1 - Left
* @param {float} y1 - Top
* @param {float} x2 - Right
* @param {float} y2 - Bottom
*/
_NS.RectangleShape.prototype.setSize = function (w, h) {
    this.m_size = new _NS.Vector2(w, h);

    this.setPointPosition(0, new _NS.Vector2(0, 0));
    this.setPointPosition(1, new _NS.Vector2(w, 0));
    this.setPointPosition(2, new _NS.Vector2(w, h));
    this.setPointPosition(3, new _NS.Vector2(0, h));
};

/**
* Sets an uniform fill color
*
* @method
* @param {Color} color - Fill color
*/
_NS.RectangleShape.prototype.setColor = function (color) {
    color = color || new _NS.Color();
    
    this.setPointColor(0, color);
    this.setPointColor(1, color);
    this.setPointColor(2, color);
    this.setPointColor(3, color);
};

/**
* Sets a color for each vertex
*
* @method
* @param {Color} color1 - Top-left color
* @param {Color} color2 - Top-right color
* @param {Color} color3 - Bottom-right color
* @param {Color} color4 - Bottom-left color
*/
_NS.RectangleShape.prototype.setColors = function (color1, color2, color3, color4) {
    color1 = color1 || new _NS.Color();
    color2 = color2 || new _NS.Color();
    color3 = color3 || new _NS.Color();
    color4 = color4 || new _NS.Color();

    this.setPointColor(0, color1);
    this.setPointColor(1, color2);
    this.setPointColor(2, color3);
    this.setPointColor(3, color4);
};