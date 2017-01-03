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
* @extends Transformable
* @extends Drawable
* @param {Texture} texture - Texture
*/
sp.Sprite = function(texture) {
	//Call base constructor
    sp.Transformable.call(this);

	this.m_vertexArray = new sp.VertexArray(sp.PrimitiveType.TriangleFan, 4);

	this.setTexture(texture);
};
sp.extend(sp.Sprite, sp.Transformable);
sp.extend(sp.Sprite, sp.Drawable);

/**
* Set a new texture.
*
* @method
* @param {Texture} texture - Texture
*/
sp.Sprite.prototype.setTexture = function (texture) {
	this.m_texture = texture;

	if (this.m_texture) {
		var size = this.m_texture.getSize();

		this.m_vertexArray.getVertex(0).position = new sp.Vector2(0, 0);
		this.m_vertexArray.getVertex(1).position = new sp.Vector2(size.x, 0);
		this.m_vertexArray.getVertex(2).position = new sp.Vector2(size.x, size.y);
		this.m_vertexArray.getVertex(3).position = new sp.Vector2(0, size.y);
	}

	this.m_vertexArray.getVertex(0).texCoords = new sp.Vector2(0, 0);
    this.m_vertexArray.getVertex(1).texCoords = new sp.Vector2(1, 0);
    this.m_vertexArray.getVertex(2).texCoords = new sp.Vector2(1, 1);
    this.m_vertexArray.getVertex(3).texCoords = new sp.Vector2(0, 1);

    this.m_textureRect = new sp.Rect(0, 0, 1, 1);
};

/**
* Get the texture of the Sprite
*
* @method
* @returns {Texture} Texture
*/
sp.Sprite.prototype.getTexture = function () {
	return this.m_texture;
};

/**
* Set texture coordinates
*
* @method
* @param {Rect} rect - Texture coordinates
*/
sp.Sprite.prototype.setTextureRect = function (rect) {
	if (this.m_texture) {
		var size = this.m_texture.getSize();

		this.m_vertexArray.getVertex(0).position = new sp.Vector2(0, 0);
		this.m_vertexArray.getVertex(1).position = new sp.Vector2(size.x * rect.w, 0);
		this.m_vertexArray.getVertex(2).position = new sp.Vector2(size.x * rect.w, size.y * rect.h);
		this.m_vertexArray.getVertex(3).position = new sp.Vector2(0, size.y * rect.h);
	}

	this.m_textureRect = rect;
	this.m_vertexArray.getVertex(0).texCoords = new sp.Vector2(rect.x, rect.y);
    this.m_vertexArray.getVertex(1).texCoords = new sp.Vector2(rect.x + rect.w, rect.y);
    this.m_vertexArray.getVertex(2).texCoords = new sp.Vector2(rect.x + rect.w, rect.y + rect.h);
    this.m_vertexArray.getVertex(3).texCoords = new sp.Vector2(rect.x, rect.y + rect.h);
};

/**
* Get the texture coordinates.
*
* @method
* @returns {Rect} Texture coordinates
*/
sp.Sprite.prototype.getTextureRect = function () {
	return this.m_textureRect;
};

/**
* Set sprite color.
*
* @method
* @param {Color} color - Color
*/
sp.Sprite.prototype.setColor = function (color) {
    color = color || new sp.Color();
    
    this.m_vertexArray.getVertex(0).color = color;
    this.m_vertexArray.getVertex(1).color = color;
    this.m_vertexArray.getVertex(2).color = color;
    this.m_vertexArray.getVertex(3).color = color;
};

/**
* Draws the sprite in the given context with optional render options.
*
* @method
* @param {Context} context - Context
* @param {RenderOptions} renderOptions - Optional render options
*/
sp.Sprite.prototype.draw = function (context, renderOptions) {
    renderOptions.transform = this.getTransform();
    renderOptions.texture = this.m_texture;
    
    this.m_vertexArray.draw(context, renderOptions);
};
