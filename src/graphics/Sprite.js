var _NS = _NS || {};

/**
* Constructs Sprite objects
* @class Represents a Sprite object
*/
_NS.Sprite = function(texture) {
	//Call base constructor
    _NS.Transformable.call(this);

	this.m_vertexArray = new _NS.VertexArray(_NS.PrimitiveType.TriangleFan, 4);
	this.m_vertexArray.getVertex(0).texCoords = new _NS.Vector2(0, 0);
    this.m_vertexArray.getVertex(1).texCoords = new _NS.Vector2(1, 0);
    this.m_vertexArray.getVertex(2).texCoords = new _NS.Vector2(1, 1);
    this.m_vertexArray.getVertex(3).texCoords = new _NS.Vector2(0, 1);

	this.setTexture(texture);
};
_NS.extend(_NS.Sprite, _NS.Transformable);
_NS.extend(_NS.Sprite, _NS.Drawable);

_NS.Sprite.prototype.setTexture = function (texture) {
	this.m_texture = texture;

	if (this.m_texture) {
		var size = this.m_texture.getSize();
		this.m_vertexArray.getVertex(0).position = new _NS.Vector2(0, 0);
		this.m_vertexArray.getVertex(1).position = new _NS.Vector2(size.x, 0);
		this.m_vertexArray.getVertex(2).position = new _NS.Vector2(size.x, size.y);
		this.m_vertexArray.getVertex(3).position = new _NS.Vector2(0, size.y);
	}
};

_NS.Sprite.prototype.setColor = function (color) {
    color = color || new _NS.Color();
    
    this.m_vertexArray.getVertex(0).color = color;
    this.m_vertexArray.getVertex(1).color = color;
    this.m_vertexArray.getVertex(2).color = color;
    this.m_vertexArray.getVertex(3).color = color;
};

_NS.Sprite.prototype.draw = function (context, renderOptions) {
    renderOptions.transform = this.getTransform();
    renderOptions.texture = this.m_texture;
    
    this.m_vertexArray.draw(context, renderOptions);
};
