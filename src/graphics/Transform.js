goog.provide('sp.Transform');
goog.require('sp.Vector2');

/**
* Constructs Transform objects
* @class Represents a 4x4 matrix
*/
sp.Transform = function() {
    /** @private */
    this.matrix_ = [];
    
    this.matrix_[0] = 1.0; this.matrix_[4] = 0.0; this.matrix_[8]  = 0.0; this.matrix_[12] = 0.0;
    this.matrix_[1] = 0.0; this.matrix_[5] = 1.0; this.matrix_[9]  = 0.0; this.matrix_[13] = 0.0;
    this.matrix_[2] = 0.0; this.matrix_[6] = 0.0; this.matrix_[10] = 1.0; this.matrix_[14] = 0.0;
    this.matrix_[3] = 0.0; this.matrix_[7] = 0.0; this.matrix_[11] = 0.0; this.matrix_[15] = 1.0;
};

/**
* Sets the matrix
*
* @method
* @param {float} a00 0,0 component
* @param {float} a01 0,1 component
* @param {float} a02 0,2 component
* @param {float} a10 1,0 component
* @param {float} a11 1,1 component
* @param {float} a12 1,2 component
* @param {float} a20 2,0 component
* @param {float} a21 2,1 component
* @param {float} a22 2,2 component
*/
sp.Transform.prototype.set = function (a00, a01, a02,
                                        a10, a11, a12,
                                        a20, a21, a22) {
    this.matrix_[0] = a00; this.matrix_[4] = a01; this.matrix_[8]  = 0.0; this.matrix_[12] = a02;
    this.matrix_[1] = a10; this.matrix_[5] = a11; this.matrix_[9]  = 0.0; this.matrix_[13] = a12;
    this.matrix_[2] = 0.0; this.matrix_[6] = 0.0; this.matrix_[10] = 1.0; this.matrix_[14] = 0.0;
    this.matrix_[3] = a20; this.matrix_[7] = a21; this.matrix_[11] = 0.0; this.matrix_[15] = a22;
};

/**
* Get the internal matrix
*
* @method
* @returns {float[]} 4x4 matrix
*/
sp.Transform.prototype.getMatrix = function () {
    return this.matrix_;
};

/**
* Gets new inverse transform
*
* @method
* @returns {sp.Transform} Inverse transform or identity if determinant is zero
*/
sp.Transform.prototype.getInverse = function () {
    var det =   this.matrix_[0] * (this.matrix_[15] * this.matrix_[5] - this.matrix_[7] * this.matrix_[13]) -
                this.matrix_[1] * (this.matrix_[15] * this.matrix_[4] - this.matrix_[7] * this.matrix_[12]) +
                this.matrix_[3] * (this.matrix_[13] * this.matrix_[4] - this.matrix_[5] * this.matrix_[12]);
    if (det != 0) {
        var inverse = new sp.Transform();
        inverse.set(  (this.matrix_[15] * this.matrix_[5] - this.matrix_[7] * this.matrix_[13]) / det,
                     -(this.matrix_[15] * this.matrix_[4] - this.matrix_[7] * this.matrix_[12]) / det,
                      (this.matrix_[13] * this.matrix_[4] - this.matrix_[5] * this.matrix_[12]) / det,
                     -(this.matrix_[15] * this.matrix_[1] - this.matrix_[3] * this.matrix_[13]) / det,
                      (this.matrix_[15] * this.matrix_[0] - this.matrix_[3] * this.matrix_[12]) / det,
                     -(this.matrix_[13] * this.matrix_[0] - this.matrix_[1] * this.matrix_[12]) / det,
                      (this.matrix_[7]  * this.matrix_[1] - this.matrix_[3] * this.matrix_[5])  / det,
                     -(this.matrix_[7]  * this.matrix_[0] - this.matrix_[3] * this.matrix_[4])  / det,
                      (this.matrix_[5]  * this.matrix_[0] - this.matrix_[1] * this.matrix_[4])  / det);
    }
    else {
        return new sp.Transform();
    }
};

/**
* Combines the given transform
*
* @method
* @param {sp.Transform} transform Transform to combine
* @returns {sp.Transform} New combined transform
*/
sp.Transform.prototype.combine = function (transform) {
    var a = this.matrix_;
    var b = transform.getMatrix();
    var a00 = a[0] * b[0] + a[4] * b[1] + a[12] * b[3];
    var a01 = a[0] * b[4] + a[4] * b[5] + a[12] * b[7];
    var a02 = a[0] * b[12] + a[4] * b[13] + a[12] * b[15];
    var a10 = a[1] * b[0] + a[5] * b[1] + a[13] * b[3];
    var a11 = a[1] * b[4] + a[5] * b[5] + a[13] * b[7];
    var a12 = a[1] * b[12] + a[5] * b[13] + a[13] * b[15];
    var a20 = a[3] * b[0] + a[7] * b[1] + a[15] * b[3];
    var a21 = a[3] * b[4] + a[7] * b[5] + a[15] * b[7];
    var a22 = a[3] * b[12] + a[7] * b[13] + a[15] * b[15];
    this.set(a00, a01, a02,
             a10, a11, a12,
             a20, a21, a22);
    return this;
};

/**
* Translates the transform
*
* @method
* @param {float} x X translation
* @param {float} y Y translation
* @returns {sp.Transform} New translated transform
*/
sp.Transform.prototype.translate = function (x, y) {
    var translation = new sp.Transform();
    translation.set(1, 0, x,
                    0, 1, y,
                    0, 0, 1);
    return this.combine(translation);
};

/**
* Scales the transform
*
* @method
* @param {float} x X scale factor
* @param {float} y Y scale factor
* @returns {sp.Transform} New scaled transform
*/
sp.Transform.prototype.scale = function (x, y) {
    var scaling = new sp.Transform();
    scaling.set(x, 0, 0,
                0, y, 0,
                0, 0, 1);
    return this.combine(scaling);
};

/**
* Rotates the transform
*
* @method
* @param {float} angle Rotation angle in degrees
* @returns {sp.Transform} New rotated transform
*/
sp.Transform.prototype.rotate = function (angle) {
    var rad = angle * Math.PI / 180.0;
    var cos = Math.cos(rad);
    var sin = Math.sin(rad);

    var rotation = new sp.Transform();
    rotation.set(cos,   -sin,   0,
                 sin,    cos,   0,
                 0,      0,     1);
    return this.combine(rotation);
};

/**
* Transforms a 2D point
*
* @method
* @param {float} x X coordinate
* @param {float} y Y coordinate
* @returns {sp.Vector2} New transformed point
*/
sp.Transform.prototype.transformPoint = function (x, y) {
    var vec = new Vector2();
    vec.set(this.matrix_[0] * x + this.matrix_[4] * y + this.matrix_[12],
            this.matrix_[1] * x + this.matrix_[5] * y + this.matrix_[13]);
    return vec;
};