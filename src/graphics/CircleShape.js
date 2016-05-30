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
_NS.CircleShape = function(radius, color) {
    _NS.Shape.call(this, 30);

    this.m_radius = radius || 0;

    this.update();

    this.setColor(color);
};
_NS.extend(_NS.CircleShape, _NS.Shape);

_NS.CircleShape.prototype.setRadius = function (radius) {
    this.m_radius = radius;
    this.update();
};

_NS.CircleShape.prototype.setPointCount = function (pointCount) {
    _NS.Shape.prototype.setPointCount.call(this, pointCount);
    this.update();
};

_NS.CircleShape.prototype.update = function () {
    var pointCount = this.getPointCount();
    if (pointCount > 2) {
        var alfa = 2 * Math.PI / pointCount;
        for (var i = 0; i < pointCount; i++) {
            var angle = alfa * i;
            var pos = new _NS.Vector2(Math.cos(angle) * this.m_radius, Math.sin(angle) * this.m_radius);
            this.setPointPosition(i, pos);
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