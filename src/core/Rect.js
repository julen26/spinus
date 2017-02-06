// Copyright (c) 2017 Julen Salgado. All rights reserved.

/**
 * @fileoverview Rectangle class imlpementation
 * @author Julen Salgado (julensalgado@gmail.com)
 */

goog.provide('sp.Rect');

/**
* Constructs Rect objects
* @class Represents a Rect object
* @param {float} x Left
* @param {float} y Top
* @param {float} w Width
* @param {float} h Height
*/
sp.Rect = function(x, y, w, h) {
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
    /**
    * Width
    * @type Float
    */
    this.w = w || 0;
    /**
    * Height
    * @type Float
    */
    this.h = h || 0;
};

/**
* Sets Rect properties
*
* @method
* @param {float} x Left
* @param {float} y Top
* @param {float} w Width
* @param {float} h Height
*/
sp.Rect.prototype.set = function (x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
};

/**
* Compares Rect objects and checks if they are equal
* 
* @method
* @param {sp.Rect} rect Rect to compare with
* @return {bool} True if they are equal
*/
sp.Rect.prototype.equals = function (rect) {
    return (this.x == rect.x && this.y == rect.y && this.w == rect.w && this.h == rect.h);
};
