var _NS = _NS || {};

/*
* Extends the prototype of derived objects with the prototype of base object.
* The contructor of the derived object must call the constructor of base object: 'base.call(this)'
*
* @method
* @param {Object} derived - Derived object
* @param {Object} base - Base object
* @returns {Object} Returns the new prototype of the derived object
*/
_NS.Extend = function (derived, base) {
    for(var key in base.prototype) {
        if(base.prototype.hasOwnProperty(key)) {
            derived.prototype[key] = base.prototype[key];
        }
    }
    return derived.prototype;
}