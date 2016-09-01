goog.provide('sp.CircleShape');
goog.require('sp.extend');
goog.require('sp.Shape');

/**
* Constructs CircleShape objects
* @class Represents a CircleShape object
* @extends Shape
* @param {float} x - X position
* @param {float} y - Y position
* @param {float} radius - Radius
* @param {Color} color - Color
*/
sp.CircleShape = function(radius, color) {
    sp.Shape.call(this, 30);

    this.m_radius = radius || 0;

    this.update();

    this.setColor(color);
};
sp.extend(sp.CircleShape, sp.Shape);

sp.CircleShape.prototype.setRadius = function (radius) {
    this.m_radius = radius;
    this.update();
};

sp.CircleShape.prototype.setPointCount = function (pointCount) {
    sp.Shape.prototype.setPointCount.call(this, pointCount);
    this.update();
};

sp.CircleShape.prototype.update = function () {
    var pointCount = this.getPointCount();
    if (pointCount > 2) {
        var alfa = 2 * Math.PI / pointCount;
        for (var i = 0; i < pointCount; i++) {
            var angle = alfa * i;
            var pos = new sp.Vector2(Math.cos(angle) * this.m_radius, Math.sin(angle) * this.m_radius);
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
sp.CircleShape.prototype.setColor = function (color) {
    color = color || new sp.Color();
    var pointCount = this.getPointCount();
    for (var i = 0; i < pointCount; i++) {
        this.setPointColor(i, color);
    }
};