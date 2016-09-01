var sp = sp || {};

/**
* Constructs Sprite objects
* @class Represents a Sprite object
*/
sp.Sprite = function(texture) {
	//Call base constructor
    sp.Transformable.call(this);

	this.m_vertexArray = new sp.VertexArray(sp.PrimitiveType.TriangleFan, 4);
	this.m_vertexArray.getVertex(0).texCoords = new sp.Vector2(0, 0);
    this.m_vertexArray.getVertex(1).texCoords = new sp.Vector2(1, 0);
    this.m_vertexArray.getVertex(2).texCoords = new sp.Vector2(1, 1);
    this.m_vertexArray.getVertex(3).texCoords = new sp.Vector2(0, 1);

	this.setTexture(texture);
};
sp.extend(sp.Sprite, sp.Transformable);
sp.extend(sp.Sprite, sp.Drawable);

sp.Sprite.prototype.setTexture = function (texture) {
	this.m_texture = texture;

	if (this.m_texture) {
		var size = this.m_texture.getSize();
		this.m_vertexArray.getVertex(0).position = new sp.Vector2(0, 0);
		this.m_vertexArray.getVertex(1).position = new sp.Vector2(size.x, 0);
		this.m_vertexArray.getVertex(2).position = new sp.Vector2(size.x, size.y);
		this.m_vertexArray.getVertex(3).position = new sp.Vector2(0, size.y);
	}
};

sp.Sprite.prototype.getTexture = function () {
	return this.m_texture;
};

sp.Sprite.prototype.setColor = function (color) {
    color = color || new sp.Color();
    
    this.m_vertexArray.getVertex(0).color = color;
    this.m_vertexArray.getVertex(1).color = color;
    this.m_vertexArray.getVertex(2).color = color;
    this.m_vertexArray.getVertex(3).color = color;
};

sp.Sprite.prototype.draw = function (context, renderOptions) {
    renderOptions.transform = this.getTransform();
    renderOptions.texture = this.m_texture;
    
    this.m_vertexArray.draw(context, renderOptions);
};
