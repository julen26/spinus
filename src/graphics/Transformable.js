// Copyright (c) 2017 Julen Salgado. All rights reserved.

/**
 * @fileoverview Base transformable class implementation
 * @author Julen Salgado (julensalgado@gmail.com)
 */

goog.provide('sp.Transformable');
goog.require('sp.Transform');
goog.require('sp.Vector2');

/**
* Constructs Transformable objects
* @class Represents a Transformable object
*/
sp.Transformable = function() {
    /** @private */
    this.transform_ = new sp.Transform();

    /** @private */
    this.scale_ = new sp.Vector2(1, 1);
    /** @private */
    this.origin_ = new sp.Vector2();
    /** @private */
    this.rotation_ = 0;
    /** @private */
    this.position_ = new sp.Vector2();

    /** @private */
    this.needsUpdate_ = false;
};

/**
* Get the transform matrix.
*
* @method
* @returns {sp.Transform} Transform matrix
*/
sp.Transformable.prototype.getTransform = function () {
    if (this.needsUpdate_) {
        this.updateTransform();
    }
    return this.transform_;
};

/**
* Changes the position by adding the given values.
*
* @method
* @param {float} x X value
* @param {float} y Y value
*/
sp.Transformable.prototype.move = function (x, y) {
    this.setPosition(this.position_.x + x, this.position_.y + y);
};

/**
* Changes the scale by multiplying with given values.
*
* @method
* @param {float} x X value
* @param {float} y Y value
*/
sp.Transformable.prototype.scale = function (x, y) {
    this.setScale(this.scale_.x * x, this.scale_.y * y);
};

/**
* Changes the rotation by adding the given angle.
*
* @method
* @param {float} angle Angle
*/
sp.Transformable.prototype.rotate = function (angle) {
    this.setRotation(this.rotation_ + angle);
};

/**
* Overwrites the scale with the given values.
*
* @method
* @param {float} x X value
* @param {float} y Y value
*/
sp.Transformable.prototype.setScale = function(x, y) {
    this.scale_.x = x;
    this.scale_.y = y;
    this.needsUpdate_ = true;
};

/**
* Overwrites the origin with the given values.
*
* @method
* @param {float} x X value
* @param {float} y Y value
*/
sp.Transformable.prototype.setOrigin = function(x, y) {
    this.origin_.x = x;
    this.origin_.y = y;
    this.needsUpdate_ = true;
};

/**
* Overwrites the rotation with the given angle.
*
* @method
* @param {float} angle Angle
*/
sp.Transformable.prototype.setRotation = function(angle) {
    this.rotation_ = angle % 360;
    if (this.rotation_ < 0) {
        this.rotation_ += 360;
    }
    this.rotation_ = angle;
    this.needsUpdate_ = true;
};

/**
* Overwrites the position with the given values.
*
* @method
* @param {float} x X value
* @param {float} y Y value
*/
sp.Transformable.prototype.setPosition = function(x, y) {
    this.position_.x = x;
    this.position_.y = y;
    this.needsUpdate_ = true;
};

/**
* Get the scale.
*
* @method
* @returns {sp.Vector2} Scale
*/
sp.Transformable.prototype.getScale = function() {
    return this.scale_;
};

/**
* Get the origin.
*
* @method
* @returns {sp.Vector2} Scale
*/
sp.Transformable.prototype.getOrigin = function() {
    return this.origin_;
};

/**
* Get the rotation angle.
*
* @method
* @returns {float} Angle
*/
sp.Transformable.prototype.getRotation = function() {
    return this.rotation_;
};

/**
* Get the position.
*
* @method
* @returns {sp.Vector2} Position
*/
sp.Transformable.prototype.getPosition = function() {
    return this.position_;
};

/**
* Updates the transform matrix.
*
* @method
*/
sp.Transformable.prototype.updateTransform = function() {
    this.transform_.set(1, 0, 0,
             0, 1, 0,
             0, 0, 1);
    //Scale, translate origin, rotate, translate position. Mathematically matrix operations must be applied right to left.
    this.transform_.translate(this.position_.x, this.position_.y).rotate(this.rotation_).scale(this.scale_.x, this.scale_.y).translate(-this.origin_.x, -this.origin_.y);

    this.needsUpdate_ = false;
};
