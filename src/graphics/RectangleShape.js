// Copyright (c) 2017 Julen Salgado. All rights reserved.

/**
* @fileoverview A drawable rectangle shape imlpementation
* @author Julen Salgado (julensalgado@gmail.com)
*/

goog.provide('sp.RectangleShape');
goog.require('sp');
goog.require('sp.extend');
goog.require('sp.Shape');
goog.require('sp.Vector2');
goog.require('sp.Color');

/**
* Constructs RectangleShape objects
* @class Represents a RectangleShape object
* @extends sp.Shape
* @param {float} w Width
* @param {float} h Height
* @param {sp.Color} color Color
*/
sp.RectangleShape = function(w, h, color) {
    sp.Shape.call(this, 4);

    /** @private */
    this.size_ = null;

    this.setSize(w, h);
    this.setColor(color);
};
sp.extend(sp.RectangleShape, sp.Shape);

/**
* Sets rectangle size
*
* @method
* @param {float} w Width
* @param {float} h Height
*/
sp.RectangleShape.prototype.setSize = function (w, h) {
    this.size_ = new sp.Vector2(w, h);

    this.setPointPosition(0, new sp.Vector2(0, 0));
    this.setPointPosition(1, new sp.Vector2(w, 0));
    this.setPointPosition(2, new sp.Vector2(w, h));
    this.setPointPosition(3, new sp.Vector2(0, h));
};

/**
* Sets an uniform fill color
*
* @method
* @param {sp.Color} color Fill color
*/
sp.RectangleShape.prototype.setColor = function (color) {
    color = color || new sp.Color();
    
    this.setPointColor(0, color);
    this.setPointColor(1, color);
    this.setPointColor(2, color);
    this.setPointColor(3, color);
};

/**
* Gets rectangle size
*
* @method
* @returns {sp.Vector2} Rectangle size
*/
sp.RectangleShape.prototype.getSize = function () {
    return this.size_;
};

/**
* Sets a color for each vertex
*
* @method
* @param {sp.Color} color1 Top-left color
* @param {sp.Color} color2 Top-right color
* @param {sp.Color} color3 Bottom-right color
* @param {sp.Color} color4 Bottom-left color
*/
sp.RectangleShape.prototype.setColors = function (color1, color2, color3, color4) {
    color1 = color1 || new sp.Color();
    color2 = color2 || new sp.Color();
    color3 = color3 || new sp.Color();
    color4 = color4 || new sp.Color();

    this.setPointColor(0, color1);
    this.setPointColor(1, color2);
    this.setPointColor(2, color3);
    this.setPointColor(3, color4);
};