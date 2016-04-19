var _NS = _NS || {};

/**
* Constructs Vertex objects
* @class Represents a Vertex object
* @param {Vector2} position - Position
* @param {Color} color - Color
* @param {Vector2} texCoords - Texture coordinates
*/
_NS.Vertex = function(position, color, texCoords) {
    /**
    * Position
    * @type Vector2
    */
    this.position = position || new _NS.Vector2(0, 0);
    /**
    * Color
    * @type Color
    */
    this.color = color || new _NS.Color(255, 255, 255);
    /**
    * Texture coordinates
    * @type Float
    */
    this.texCoords = texCoords || new _NS.Vector2(0, 0);
};

/**
* Sets vertex components
* @method
*/
_NS.Vertex.prototype.set = function (position, color, texCoords) {
    this.position = position;
    this.color = color;
    this.texCoords = texCoords;
};

/**
* Compares vertices and checks if they are equal
* @method
* @return {bool} True if vertices are equal
*/
_NS.Vertex.prototype.equals = function (vertex) {
    return (this.position.equals(vertex.position) && this.color.equals(vertex.color) && this.texCoords.equals(vertex.texCoords));
};