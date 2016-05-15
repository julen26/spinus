var _NS = _NS || {};

/**
* Constructs Transform objects
* @class Represents a 4x4 matrix
*/
_NS.Transform = function() {
    /**
    * 4x4 matrix
    * @type float[]
    */
    this.m_matrix = [];
    this.m_matrix[0] = 1.0; this.m_matrix[4] = 0.0; this.m_matrix[8]  = 0.0; this.m_matrix[12] = 0.0;
    this.m_matrix[1] = 0.0; this.m_matrix[5] = 1.0; this.m_matrix[9]  = 0.0; this.m_matrix[13] = 0.0;
    this.m_matrix[2] = 0.0; this.m_matrix[6] = 0.0; this.m_matrix[10] = 1.0; this.m_matrix[14] = 0.0;
    this.m_matrix[3] = 0.0; this.m_matrix[7] = 0.0; this.m_matrix[11] = 0.0; this.m_matrix[15] = 1.0;
};

/**
* Sets the matrix
*
* @method
* @param {float} a00 - 0,0 component
* @param {float} a01 - 0,1 component
* @param {float} a02 - 0,2 component
* @param {float} a10 - 1,0 component
* @param {float} a11 - 1,1 component
* @param {float} a12 - 1,2 component
* @param {float} a20 - 2,0 component
* @param {float} a21 - 2,1 component
* @param {float} a22 - 2,2 component
*/
_NS.Transform.prototype.set = function (a00, a01, a02,
                                        a10, a11, a12,
                                        a20, a21, a22) {
    this.m_matrix[0] = a00; this.m_matrix[4] = a01; this.m_matrix[8]  = 0.0; this.m_matrix[12] = a02;
    this.m_matrix[1] = a10; this.m_matrix[5] = a11; this.m_matrix[9]  = 0.0; this.m_matrix[13] = a12;
    this.m_matrix[2] = 0.0; this.m_matrix[6] = 0.0; this.m_matrix[10] = 1.0; this.m_matrix[14] = 0.0;
    this.m_matrix[3] = a20; this.m_matrix[7] = a21; this.m_matrix[11] = 0.0; this.m_matrix[15] = a22;
};

_NS.Transform.prototype.getMatrix = function () {
    return this.m_matrix;
};

/**
* Gets new inverse transform
*
* @method
* @returns {Transform} Inverse transform or identity if determinant is zero
*/
_NS.Transform.prototype.getInverse = function () {
    var det =   this.m_matrix[0] * (this.m_matrix[15] * this.m_matrix[5] - this.m_matrix[7] * this.m_matrix[13]) -
                this.m_matrix[1] * (this.m_matrix[15] * this.m_matrix[4] - this.m_matrix[7] * this.m_matrix[12]) +
                this.m_matrix[3] * (this.m_matrix[13] * this.m_matrix[4] - this.m_matrix[5] * this.m_matrix[12]);
    if (det != 0) {
        var inverse = new _NS.Transform();
        inverse.set(  (this.m_matrix[15] * this.m_matrix[5] - this.m_matrix[7] * this.m_matrix[13]) / det,
                     -(this.m_matrix[15] * this.m_matrix[4] - this.m_matrix[7] * this.m_matrix[12]) / det,
                      (this.m_matrix[13] * this.m_matrix[4] - this.m_matrix[5] * this.m_matrix[12]) / det,
                     -(this.m_matrix[15] * this.m_matrix[1] - this.m_matrix[3] * this.m_matrix[13]) / det,
                      (this.m_matrix[15] * this.m_matrix[0] - this.m_matrix[3] * this.m_matrix[12]) / det,
                     -(this.m_matrix[13] * this.m_matrix[0] - this.m_matrix[1] * this.m_matrix[12]) / det,
                      (this.m_matrix[7]  * this.m_matrix[1] - this.m_matrix[3] * this.m_matrix[5])  / det,
                     -(this.m_matrix[7]  * this.m_matrix[0] - this.m_matrix[3] * this.m_matrix[4])  / det,
                      (this.m_matrix[5]  * this.m_matrix[0] - this.m_matrix[1] * this.m_matrix[4])  / det);
    }
    else {
        return new _NS.Transform();
    }
};

/**
* Combines the given transform
*
* @method
* @param {Transform} transform - Transform to combine
* @returns {Transform} New combined transform
*/
_NS.Transform.prototype.combine = function (transform) {
    var a = this.m_matrix;
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
* @param {float} x - X translation
* @param {float} y - Y translation
* @returns {Transform} New translated transform
*/
_NS.Transform.prototype.translate = function (x, y) {
    var translation = new _NS.Transform();
    translation.set(1, 0, x,
                    0, 1, y,
                    0, 0, 1);
    return this.combine(translation);
};

/**
* Scales the transform
*
* @method
* @param {float} x - X scale factor
* @param {float} y - Y scale factor
* @returns {Transform} New scaled transform
*/
_NS.Transform.prototype.scale = function (x, y) {
    var scaling = new _NS.Transform();
    scaling.set(x, 0, 0,
                0, y, 0,
                0, 0, 1);
    return this.combine(scaling);
};

/**
* Rotates the transform
*
* @method
* @param {float} angle - Rotation angle in degrees
* @returns {Transform} New rotated transform
*/
_NS.Transform.prototype.rotate = function (angle) {
    var rad = angle * Math.PI / 180.0;
    var cos = Math.cos(rad);
    var sin = Math.sin(rad);

    var rotation = new _NS.Transform();
    rotation.set(cos,   -sin,   0,
                 sin,    cos,   0,
                 0,      0,     1);
    return this.combine(rotation);
};

/**
* Transforms a 2D point
*
* @method
* @param {float} x - X coordinate
* @param {float} y - Y coordinate
* @returns {Vector2} New transformed point
*/
_NS.Transform.prototype.transformPoint = function (x, y) {
    var vec = Vector2();
    vec.set(this.m_matrix[0] * x + this.m_matrix[4] * y + this.m_matrix[12],
            this.m_matrix[1] * x + this.m_matrix[5] * y + this.m_matrix[13]);
    return vec;
};