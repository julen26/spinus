goog.provide('sp.RenderOptions');
goog.require('sp.BlendMode');
goog.require('sp.Transform');

/**
* Constructs RenderOptions objects
* @class Represents a RenderOptions object
*/
sp.RenderOptions = function(transform, texture, shader, blendMode) {
    /**
    * Blend mode.
    * @type BlendMode
    */
    this.blendMode = blendMode || sp.BlendMode.Alpha;
    /**
    * Transform matrix.
    * @type Transform
    */
    this.transform = transform || new sp.Transform();
    /**
    * Texture.
    * @type Texture
    */
    this.texture = texture;
    /**
    * Shader.
    * @type Shader
    */
    this.shader = shader;
};