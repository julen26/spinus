goog.provide('sp.RenderOptions');
goog.require('sp.BlendMode');
goog.require('sp.Transform');

/**
* Constructs RenderOptions objects
* @class Represents a RenderOptions object
*/
sp.RenderOptions = function(transform, texture, shader, blendMode) {
    this.blendMode = blendMode || sp.BlendMode.Alpha;
    this.transform = transform || new sp.Transform();
    this.texture = texture;
    this.shader = shader;
};