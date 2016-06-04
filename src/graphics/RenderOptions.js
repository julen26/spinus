var _NS = _NS || {};

/**
* Constructs RenderOptions objects
* @class Represents a RenderOptions object
*/
_NS.RenderOptions = function(transform, texture, shader, blendMode) {
    this.blendMode = blendMode || _NS.BlendMode.Alpha;
    this.transform = transform || new _NS.Transform();
    this.texture = texture;
    this.shader = shader;
};