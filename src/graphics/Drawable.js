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
* @param {Context} context - Context
* @param {RenderOptions} renderOptions - Render options
*/
sp.Drawable.prototype.draw = function (context, renderOptions) {
    throw "Drawable object must implement the method: draw";
};