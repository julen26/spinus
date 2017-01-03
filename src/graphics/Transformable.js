goog.provide('sp.Transformable');
goog.require('sp.Transform');
goog.require('sp.Vector2');

/**
* Constructs Transformable objects
* @class Represents a Transformable object
*/
sp.Transformable = function() {
    this.m_transform = new sp.Transform();
    this.m_scale = new sp.Vector2(1, 1);
    this.m_origin = new sp.Vector2();
    this.m_rotation = 0;
    this.m_position = new sp.Vector2();

    this.m_needsUpdate = false;
};

/**
* Get the transform matrix.
*
* @method
* @returns {Transform} Transform matrix
*/
sp.Transformable.prototype.getTransform = function () {
    if (this.m_needsUpdate) {
        this.updateTransform();
    }
    return this.m_transform;
};

/**
* Changes the position by adding the given values.
*
* @method
* @param {float} x - X value
* @param {float} y - Y value
*/
sp.Transformable.prototype.move = function (x, y) {
    this.setPosition(this.m_position.x + x, this.m_position.y + y);
};

/**
* Changes the scale by multiplying with given values.
*
* @method
* @param {float} x - X value
* @param {float} y - Y value
*/
sp.Transformable.prototype.scale = function (x, y) {
    this.setScale(this.m_scale.x * x, this.m_scale.y * y);
};

/**
* Changes the rotation by adding the given angle.
*
* @method
* @param {float} angle - Angle
*/
sp.Transformable.prototype.rotate = function (angle) {
    this.setRotation(this.m_rotation + angle);
};

/**
* Overwrites the scale with the given values.
*
* @method
* @param {float} x - X value
* @param {float} y - Y value
*/
sp.Transformable.prototype.setScale = function(x, y) {
    this.m_scale.x = x;
    this.m_scale.y = y;
    this.m_needsUpdate = true;
};

/**
* Overwrites the origin with the given values.
*
* @method
* @param {float} x - X value
* @param {float} y - Y value
*/
sp.Transformable.prototype.setOrigin = function(x, y) {
    this.m_origin.x = x;
    this.m_origin.y = y;
    this.m_needsUpdate = true;
};

/**
* Overwrites the rotation with the given angle.
*
* @method
* @param {float} angle - Angle
*/
sp.Transformable.prototype.setRotation = function(angle) {
    this.m_rotation = angle % 360;
    if (this.m_rotation < 0) {
        this.m_rotation += 360;
    }
    this.m_rotation = angle;
    this.m_needsUpdate = true;
};

/**
* Overwrites the position with the given values.
*
* @method
* @param {float} x - X value
* @param {float} y - Y value
*/
sp.Transformable.prototype.setPosition = function(x, y) {
    this.m_position.x = x;
    this.m_position.y = y;
    this.m_needsUpdate = true;
};

/**
* Get the scale.
*
* @method
* @returns {Vector2} Scale
*/
sp.Transformable.prototype.getScale = function() {
    return this.m_scale;
};

/**
* Get the origin.
*
* @method
* @returns {Vector2} Scale
*/
sp.Transformable.prototype.getOrigin = function() {
    return this.m_origin;
};

/**
* Get the rotation angle.
*
* @method
* @returns {float} Angle
*/
sp.Transformable.prototype.getRotation = function() {
    return this.m_rotation;
};

/**
* Get the position.
*
* @method
* @returns {Vector2} Position
*/
sp.Transformable.prototype.getPosition = function() {
    return this.m_position;
};

/**
* Updates the transform matrix.
*
* @method
*/
sp.Transformable.prototype.updateTransform = function() {
    this.m_transform.set(1, 0, 0,
             0, 1, 0,
             0, 0, 1);
    //Scale, translate origin, rotate, translate position. Mathematically matrix operations must be applied right to left.
    this.m_transform.translate(this.m_position.x, this.m_position.y).rotate(this.m_rotation).scale(this.m_scale.x, this.m_scale.y).translate(-this.m_origin.x, -this.m_origin.y);
};
