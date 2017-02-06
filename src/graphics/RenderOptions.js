// Copyright (c) 2017 Julen Salgado. All rights reserved.

/**
 * @fileoverview Render options class imlpementation
 * @author Julen Salgado (julensalgado@gmail.com)
 */

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
    * @type sp.BlendMode
    */
    this.blendMode = blendMode || sp.BlendMode.ALPHA;
    /**
    * Transform matrix.
    * @type sp.Transform
    */
    this.transform = transform || new sp.Transform();
    /**
    * Texture.
    * @type sp.Texture
    */
    this.texture = texture;
    /**
    * Shader.
    * @type sp.Shader
    */
    this.shader = shader;
};