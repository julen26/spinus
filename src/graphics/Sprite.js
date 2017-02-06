// Copyright (c) 2017 Julen Salgado. All rights reserved.

/**
 * @fileoverview Basic sprite class implementation
 * @author Julen Salgado (julensalgado@gmail.com)
 */

goog.provide('sp.Sprite');
goog.require('sp.extend');
goog.require('sp.Transformable');
goog.require('sp.Drawable');
goog.require('sp.VertexArray');
goog.require('sp.Vector2');
goog.require('sp.Color');
goog.require('sp.Rect');

/**
* Constructs Sprite objects
* @class Represents a Sprite object
* @extends sp.Transformable
* @extends sp.Drawable
* @param {sp.Texture} texture Texture
*/
sp.Sprite = function(texture) {
	//Call base constructor
    sp.Transformable.call(this);

    /** @private */
	this.vertexArray_ = new sp.VertexArray(sp.PrimitiveType.TRIANGLE_FAN, 4);

	/** @private */
	this.texture_ = null;
	this.setTexture(texture);
};
sp.extend(sp.Sprite, sp.Transformable);
sp.extend(sp.Sprite, sp.Drawable);

/**
* Set a new texture.
*
* @method
* @param {sp.Texture} texture Texture
*/
sp.Sprite.prototype.setTexture = function (texture) {
	this.texture_ = texture;

	if (this.texture_) {
		var size = this.texture_.getSize();

		this.vertexArray_.getVertex(0).position = new sp.Vector2(0, 0);
		this.vertexArray_.getVertex(1).position = new sp.Vector2(size.x, 0);
		this.vertexArray_.getVertex(2).position = new sp.Vector2(size.x, size.y);
		this.vertexArray_.getVertex(3).position = new sp.Vector2(0, size.y);
	}

	this.vertexArray_.getVertex(0).texCoords = new sp.Vector2(0, 0);
    this.vertexArray_.getVertex(1).texCoords = new sp.Vector2(1, 0);
    this.vertexArray_.getVertex(2).texCoords = new sp.Vector2(1, 1);
    this.vertexArray_.getVertex(3).texCoords = new sp.Vector2(0, 1);

    this.textureRect_ = new sp.Rect(0, 0, 1, 1);
};

/**
* Get the texture of the Sprite
*
* @method
* @returns {sp.Texture} Texture
*/
sp.Sprite.prototype.getTexture = function () {
	return this.texture_;
};

/**
* Set texture coordinates
*
* @method
* @param {sp.Rect} rect Texture coordinates
*/
sp.Sprite.prototype.setTextureRect = function (rect) {
	if (this.texture_) {
		var size = this.texture_.getSize();

		this.vertexArray_.getVertex(0).position = new sp.Vector2(0, 0);
		this.vertexArray_.getVertex(1).position = new sp.Vector2(size.x * rect.w, 0);
		this.vertexArray_.getVertex(2).position = new sp.Vector2(size.x * rect.w, size.y * rect.h);
		this.vertexArray_.getVertex(3).position = new sp.Vector2(0, size.y * rect.h);
	}

	this.textureRect_ = rect;
	this.vertexArray_.getVertex(0).texCoords = new sp.Vector2(rect.x, rect.y);
    this.vertexArray_.getVertex(1).texCoords = new sp.Vector2(rect.x + rect.w, rect.y);
    this.vertexArray_.getVertex(2).texCoords = new sp.Vector2(rect.x + rect.w, rect.y + rect.h);
    this.vertexArray_.getVertex(3).texCoords = new sp.Vector2(rect.x, rect.y + rect.h);
};

/**
* Get the texture coordinates.
*
* @method
* @returns {sp.Rect} Texture coordinates
*/
sp.Sprite.prototype.getTextureRect = function () {
	return this.textureRect_;
};

/**
* Set sprite color.
*
* @method
* @param {sp.Color} color Color
*/
sp.Sprite.prototype.setColor = function (color) {
    color = color || new sp.Color();
    
    this.vertexArray_.getVertex(0).color = color;
    this.vertexArray_.getVertex(1).color = color;
    this.vertexArray_.getVertex(2).color = color;
    this.vertexArray_.getVertex(3).color = color;
};

/**
* Draws the sprite in the given context with optional render options.
*
* @method
* @param {sp.Context} context Context
* @param {sp.RenderOptions} renderOptions Optional render options
*/
sp.Sprite.prototype.draw = function (context, renderOptions) {
    renderOptions.transform = this.getTransform();
    renderOptions.texture = this.texture_;
    
    this.vertexArray_.draw(context, renderOptions);
};
