var _NS = _NS || {};

/**
* Constructs Vector2 objects
* @class Represents a Vector2 object
* @param {float} x - X component
* @param {float} y - Y component
*/
_NS.Vector2 = function(x, y) {
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
_NS.Vector2.prototype.set = function (x, y) {
    this.x = x;
    this.y = y;
};

/**
* Compares vectors and checks if they are equal
*
* @method
* @return {Boolean} True if vectors are equal
*/
_NS.Vector2.prototype.equals = function (vector) {
    return (this.x == vector.x && this.y == vector.y);
};
