goog.provide('sp.View');
goog.require('sp.Transform');
goog.require('sp.Vector2');
goog.require('sp.Rect');

/**
* Constructs View objects
* @class Represents a View object
* @param {float} w Width
* @param {float} h Height
*/
sp.View = function(w, h) {
    /** @private */
    this.transform_ = new sp.Transform();

    /** @private */
    this.size_ = new sp.Vector2(w || 640, h || 480);
    /** @private */
    this.scale_ = new sp.Vector2(1, 1);
    /** @private */
    this.rotation_ = 0;
    /** @private */
    this.center_ = new sp.Vector2( this.size_.x / 2, this.size_.y / 2);

    /** @private */
    this.needsUpdate_ = true;

    /** @private */
    this.projection_ = new sp.Transform();
    this.projection_.set(   2.0 / this.size_.x,     0,                      0,
                            0,                      -2.0 / this.size_.y,    0,
                            -1,                     1,                      1);
    /** @private */
    this.viewport_ = new sp.Rect(0, 0, 1, 1);
};

/**
* Get the transform matrix.
*
* @method
* @returns {sp.Transform} Transform matrix
*/
sp.View.prototype.getTransform = function () {
    //TODO: Maybe precalculate once projection and view transforms instead of doing each time on shader
    if (this.needsUpdate_) {
        this.updateTransform();
    }
    return this.transform_;
};

/**
* Get the projection matrix.
*
* @method
* @returns {sp.Transform} Projection matrix
*/
sp.View.prototype.getProjection = function () {
    return this.projection_;
};

/**
* Changes the center by adding the given values.
*
* @method
* @param {float} x X value
* @param {float} y Y value
*/
sp.View.prototype.move = function (x, y) {
    this.setCenter(this.center_.x + x, this.center_.y + y);
};

/**
* Changes the scale by multiplying with given values.
*
* @method
* @param {float} x X value
* @param {float} y Y value
*/
sp.View.prototype.scale = function (x, y) {
    this.setScale(this.scale_.x * x, this.scale_.y * y);
};

/**
* Changes the rotation by adding the given angle.
*
* @method
* @param {float} angle Angle
*/
sp.View.prototype.rotate = function (angle) {
    this.setRotation(this.rotation_ + angle);
};

/**
* Overwrites the scale with the given values.
*
* @method
* @param {float} x X value
* @param {float} y Y value
*/
sp.View.prototype.setScale = function(x, y) {
    this.scale_.x = x;
    this.scale_.y = y;
    this.needsUpdate_ = true;
};

/**
* Overwrites the rotation with the given angle.
*
* @method
* @param {float} angle Angle
*/
sp.View.prototype.setRotation = function(angle) {
    this.rotation_ = angle % 360;
    if (this.rotation_ < 0) {
        this.rotation_ += 360;
    }
    this.rotation_ = angle;
    this.needsUpdate_ = true;
};

/**
* Overwrites the center with the given values.
*
* @method
* @param {float} x X value
* @param {float} y Y value
*/
sp.View.prototype.setCenter = function(x, y) {
    this.center_.x = x;
    this.center_.y = y;
    this.needsUpdate_ = true;
};

/**
* Sets the viewport.
*
* @method
* @param {sp.Rect} rect Viewport
*/
sp.View.prototype.setViewport = function(rect) {
    this.viewport_ = rect;
};

/**
* Get the scale.
*
* @method
* @returns {sp.Vector2} Scale
*/
sp.View.prototype.getScale = function() {
    return this.scale_;
};

/**
* Get the rotation angle.
*
* @method
* @returns {float} Angle
*/
sp.View.prototype.getRotation = function() {
    return this.rotation_;
};

/**
* Get the center.
*
* @method
* @returns {sp.Vector2} Center
*/
sp.View.prototype.getCenter = function() {
    return this.center_;
};

/**
* Get the viewport.
*
* @method
* @returns {sp.Rect} Viewport
*/
sp.View.prototype.getViewport = function() {
    return this.viewport_;
};

/**
* Updates the transform matrix.
*
* @method
*/
sp.View.prototype.updateTransform = function() {
    this.transform_.set(1, 0, 0,
             0, 1, 0,
             0, 0, 1);
    //Scale, translate origin, rotate, translate position. Mathematically matrix operations must be applied right to left.
    this.transform_.rotate(this.rotation_).scale(this.scale_.x, this.scale_.y).translate(-this.center_.x, -this.center_.y);
};
