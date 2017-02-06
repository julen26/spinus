goog.provide('sp.CircleShape');
goog.require('sp.extend');
goog.require('sp.Shape');

/**
* Constructs CircleShape objects
* @class Represents a CircleShape object
* @extends sp.Shape
* @param {float} radius Radius
* @param {sp.Color} color Color
*/
sp.CircleShape = function(radius, color) {
    sp.Shape.call(this, 30);

    /** @private */
    this.radius_ = radius || 0;

    this.update();

    this.setColor(color);
};
sp.extend(sp.CircleShape, sp.Shape);

/**
* Sets radius of the circle
*
* @method
* @param {float} radius Radius
*/
sp.CircleShape.prototype.setRadius = function (radius) {
    this.radius_ = radius;
    this.update();
};

/**
* Resizes the point list, adding default points or removing existing ones to match the new length. Increase this value to increase the quality but lose efficiency.
* Default value is 30.
*
* @method
* @param {int} pointCount Points
*/
sp.CircleShape.prototype.setPointCount = function (pointCount) {
    sp.Shape.prototype.setPointCount.call(this, pointCount);
    this.update();
};

/**
* Recalculates all the points again. Should be called if points are changed.
*
* @method
*/
sp.CircleShape.prototype.update = function () {
    var pointCount = this.getPointCount();
    if (pointCount > 2) {
        var alfa = 2 * Math.PI / pointCount;
        for (var i = 0; i < pointCount; i++) {
            var angle = alfa * i;
            var pos = new sp.Vector2(Math.cos(angle) * this.radius_, Math.sin(angle) * this.radius_);
            this.setPointPosition(i, pos);
        }
    }
};

/**
* Sets an uniform fill color
*
* @method
* @param {sp.Color} color Fill color
*/
sp.CircleShape.prototype.setColor = function (color) {
    color = color || new sp.Color();
    var pointCount = this.getPointCount();
    for (var i = 0; i < pointCount; i++) {
        this.setPointColor(i, color);
    }
};