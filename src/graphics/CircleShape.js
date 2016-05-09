var _NS = _NS || {};

/**
* Constructs CircleShape objects
* @class Represents a CircleShape object
* @extends Shape
* @param {float} x - X position
* @param {float} y - Y position
* @param {float} radius - Radius
* @param {Color} color - Color
*/
_NS.CircleShape = function(x, y, radius, color) {
    /**
    * Position
    * @type Vector2
    */
    this.m_position = new _NS.Vector2(x, y);

    this.m_radius = radius || 0;

    this.update();

    this.setColor(color);
};
_NS.CircleShape.prototype = new _NS.Shape(32);


_NS.CircleShape.prototype.setPosition = function (position) {
    this.m_position = position;
    this.update();
};

_NS.CircleShape.prototype.setRadius = function (radius) {
    this.m_radius = radius;
    this.update();
};

_NS.CircleShape.prototype.setPointCount = function (pointCount) {
    this.m_vertexArray.resize(pointCount);
    this.m_needsUpdate = true;
    this.m_needsColorUpdate = true;
    this.update();
};

_NS.CircleShape.prototype.update = function () {
    var pointCount = this.getPointCount();
    if (pointCount > 4) {
        var alfa = 2 * Math.PI / (pointCount - 2);
        this.setPointPosition(0, this.m_position);
        for (var i = 1; i < pointCount - 1; i++) {
            var angle = alfa * (i - 1);
            var pos = new _NS.Vector2(this.m_position.x + Math.cos(angle) * this.m_radius, this.m_position.y + Math.sin(angle) * this.m_radius);
            this.setPointPosition(i, pos);
            if (i == 1) {
                this.setPointPosition(pointCount - 1, new _NS.Vector2(pos.x, pos.y));
            }
        }
    }
};

/**
* Sets an uniform fill color
*
* @method
* @param {Color} color - Fill color
*/
_NS.CircleShape.prototype.setColor = function (color) {
    color = color || new _NS.Color();
    var pointCount = this.getPointCount();
    for (var i = 0; i < pointCount; i++) {
        this.setPointColor(i, color);
    }
};

/**
* Sets an uniform fill color
*
* @method
* @param {Color} color - Fill color
*/
_NS.CircleShape.prototype.setColors = function (color1, color2) {
    color1 = color1 || new _NS.Color();
    color2 = color2 || new _NS.Color();
    this.setPointColor(0, color1);
    var pointCount = this.getPointCount();
    for (var i = 1; i < pointCount; i++) {
        this.setPointColor(i, color2);
    }
};