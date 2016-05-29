var _NS = _NS || {};

/**
* Constructs Drawable objects
* @class Represents a Drawable object
*/
_NS.Drawable = function() {
};

/**
* Method that should be implemented by derived object
*
* @method
* @param {Context} context - Context
* @param {RenderOptions} renderOptions - Render options
*/
_NS.Drawable.prototype.draw = function (context, renderOptions) {
    throw "Drawable object must implement the method: draw";
};