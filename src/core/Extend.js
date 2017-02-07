// Copyright (c) 2017 Julen Salgado. All rights reserved.

/**
* @fileoverview Implementation of inheritance functionalities
* @author Julen Salgado (julensalgado@gmail.com)
*/

goog.provide('sp.extend');
goog.require('sp');

/*
* Extends the prototype of derived objects with the prototype of base object.
* The contructor of the derived object must call the constructor of base object: 'base.call(this)'
*
* @method
* @param {Object} derived Derived object
* @param {Object} base Base object
* @returns {Object} Returns the new prototype of the derived object
*/
sp.extend = function (derived, base) {
    for(var key in base.prototype) {
        if(base.prototype.hasOwnProperty(key)) {
            derived.prototype[key] = base.prototype[key];
        }
    }
    return derived.prototype;
}
