goog.provide('sp.Vector2');

/**
* Constructs Vector2 objects
* @class Represents a Vector2 object
* @param {float} x - X component
* @param {float} y - Y component
*/
sp.Vector2 = function(x, y) {
    /**
    * X component
    * @type Float
    */
    this.x = x || 0;
    /**
    * Y component
    * @type Float
    */
    this.y = y || 0;
};

/**
* Sets vector components

* @method
*/
sp.Vector2.prototype.set = function (x, y) {
    this.x = x;
    this.y = y;
};

/**
* Compares vectors and checks if they are equal
*
* @method
* @param {Vector2} vector - Vector to compare with
* @return {bool} True if vectors are equal
*/
sp.Vector2.prototype.equals = function (vector) {
    return (this.x == vector.x && this.y == vector.y);
};

/**
* Compute the normal of a segment
*
* @method
* @param {Vector2} v1 - First vertex position
* @param {Vector2} v2 - Second vertex position
* @return {Vector2} Normal of the segment
*/
sp.Vector2.computeNormal = function (v1, v2) {
    var normal = new sp.Vector2(v1.y - v2.y, v2.x - v1.x);
    var length = Math.sqrt(normal.x * normal.x + normal.y * normal.y);
    if (length != 0) {
        normal.x = normal.x / length;
        normal.y = normal.y / length;
    }
    return normal;
};

/**
* Compute the dot product of two vectors
*
* @method
* @param {Vector2} v1 - First vector
* @param {Vector2} v2 - Second vector
* @return {float} Dot product
*/
sp.Vector2.dotProduct = function (v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
};

/**
* Addition of two vectors
*
* @method
* @param {Vector2} v1 - First vector
* @param {Vector2} v2 - Second vector
* @return {Vector2} Result vector
*/
sp.Vector2.add = function (v1, v2) {
    return new sp.Vector2(v1.x + v2.x, v1.y + v2.y);
};

/**
* Substraction of two vectors
*
* @method
* @param {Vector2} v1 - First vector
* @param {Vector2} v2 - Second vector
* @return {Vector2} Result vector
*/
sp.Vector2.sub = function (v1, v2) {
    return new sp.Vector2(v1.x - v2.x, v1.y - v2.y);
};

/**
* Multiply a vector with a scalar
*
* @method
* @param {Vector2} v - Vector
* @param {float} s - scalar
* @return {Vector2} Result vector
*/
sp.Vector2.mul = function (v, s) {
    return new sp.Vector2(v.x * s, v.y * s);
};

/**
* Divide a vector with a scalar
*
* @method
* @param {Vector2} v - Vector
* @param {float} s - scalar
* @return {Vector2} Result vector
*/
sp.Vector2.div = function (v, s) {
    return new sp.Vector2(v.x / s, v.y / s);
};