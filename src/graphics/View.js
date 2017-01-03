goog.provide('sp.View');
goog.require('sp.Transform');
goog.require('sp.Vector2');
goog.require('sp.Rect');

/**
* Constructs View objects
* @class Represents a View object
* @param {float} w - Width
* @param {float} h - Height
*/
sp.View = function(w, h) {
    this.m_transform = new sp.Transform();
    this.m_size = new sp.Vector2(w || 640, h || 480);
    this.m_scale = new sp.Vector2(1, 1);
    this.m_rotation = 0;
    this.m_center = new sp.Vector2( this.m_size.x / 2, this.m_size.y / 2);

    this.m_needsUpdate = true;

    this.m_projection = new sp.Transform();
    this.m_projection.set(  2.0 / this.m_size.x,    0,                      0,
                            0,                      -2.0 / this.m_size.y,   0,
                            -1,                     1,                      1);
    this.m_viewport = new sp.Rect(0, 0, 1, 1);
};

/**
* Get the transform matrix.
*
* @method
* @returns {Transform} Transform matrix
*/
sp.View.prototype.getTransform = function () {
    //TODO: Maybe precalculate once projection and view transforms instead of doing each time on shader
    if (this.m_needsUpdate) {
        this.updateTransform();
    }
    return this.m_transform;
};

/**
* Get the projection matrix.
*
* @method
* @returns {Transform} Projection matrix
*/
sp.View.prototype.getProjection = function () {
    return this.m_projection;
};

/**
* Changes the center by adding the given values.
*
* @method
* @param {float} x - X value
* @param {float} y - Y value
*/
sp.View.prototype.move = function (x, y) {
    this.setCenter(this.m_center.x + x, this.m_center.y + y);
};

/**
* Changes the scale by multiplying with given values.
*
* @method
* @param {float} x - X value
* @param {float} y - Y value
*/
sp.View.prototype.scale = function (x, y) {
    this.setScale(this.m_scale.x * x, this.m_scale.y * y);
};

/**
* Changes the rotation by adding the given angle.
*
* @method
* @param {float} angle - Angle
*/
sp.View.prototype.rotate = function (angle) {
    this.setRotation(this.m_rotation + angle);
};

/**
* Overwrites the scale with the given values.
*
* @method
* @param {float} x - X value
* @param {float} y - Y value
*/
sp.View.prototype.setScale = function(x, y) {
    this.m_scale.x = x;
    this.m_scale.y = y;
    this.m_needsUpdate = true;
};

/**
* Overwrites the rotation with the given angle.
*
* @method
* @param {float} angle - Angle
*/
sp.View.prototype.setRotation = function(angle) {
    this.m_rotation = angle % 360;
    if (this.m_rotation < 0) {
        this.m_rotation += 360;
    }
    this.m_rotation = angle;
    this.m_needsUpdate = true;
};

/**
* Overwrites the center with the given values.
*
* @method
* @param {float} x - X value
* @param {float} y - Y value
*/
sp.View.prototype.setCenter = function(x, y) {
    this.m_center.x = x;
    this.m_center.y = y;
    this.m_needsUpdate = true;
};

/**
* Sets the viewport.
*
* @method
* @param {Rect} rect - Viewport
*/
sp.View.prototype.setViewport = function(rect) {
    this.m_viewport = rect;
};

/**
* Get the scale.
*
* @method
* @returns {Vector2} Scale
*/
sp.View.prototype.getScale = function() {
    return this.m_scale;
};

/**
* Get the rotation angle.
*
* @method
* @returns {float} Angle
*/
sp.View.prototype.getRotation = function() {
    return this.m_rotation;
};

/**
* Get the center.
*
* @method
* @returns {Vector2} Center
*/
sp.View.prototype.getCenter = function() {
    return this.m_center;
};

/**
* Get the viewport.
*
* @method
* @returns {Rect} Viewport
*/
sp.View.prototype.getViewport = function() {
    return this.m_viewport;
};

/**
* Updates the transform matrix.
*
* @method
*/
sp.View.prototype.updateTransform = function() {
    this.m_transform.set(1, 0, 0,
             0, 1, 0,
             0, 0, 1);
    //Scale, translate origin, rotate, translate position. Mathematically matrix operations must be applied right to left.
    this.m_transform.rotate(this.m_rotation).scale(this.m_scale.x, this.m_scale.y).translate(-this.m_center.x, -this.m_center.y);
};
