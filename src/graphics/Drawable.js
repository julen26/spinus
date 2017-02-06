// Copyright (c) 2017 Julen Salgado. All rights reserved.

/**
 * @fileoverview Drawable interface definition
 * @author Julen Salgado (julensalgado@gmail.com)
 */

goog.provide('sp.Drawable');

/**
* Constructs Drawable objects
* @class Represents a Drawable object
*/
sp.Drawable = function() {
};

/**
* Method that should be implemented by derived object
*
* @method
* @param {sp.Context} context Context
* @param {sp.RenderOptions} renderOptions Render options
*/
sp.Drawable.prototype.draw = function (context, renderOptions) {
    throw 'Drawable object must implement the method: draw';
};