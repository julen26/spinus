var _NS = _NS || {};

/**
* Constructs VertexArray objects
* @class Represents a list of vertices and a primitive type
* @param {PrimitiveType} type - Primitive type
* @param {int} vertexCount - Initial number of vertices
*/
_NS.VertexArray = function(type, vertexCount) {
	/**
    * Primitive type
    * @type PrimitiveType
    */
	this.primitiveType = type || _NS.PrimitiveType.Points;
	/**
    * Vertex list
    * @type Vertex[]
    */
    this.vertices = [];
    vertexCount = vertexCount || 0;
    for (var i = 0; i < vertexCount; i++) {
    	this.vertices.push(new _NS.Vertex());
    }
};

/**
* Gets the number of vertices
*
* @method
* @return {int} Vertex count
*/
_NS.VertexArray.prototype.getVertexCount = function () {
	return this.vertices.length;
};

/**
* Gets the vertex in the given position
*
* @method
* @param {int} index - Vertex position in the list
* @return {Vertex} Vertex at index
*/
_NS.VertexArray.prototype.getVertex = function (index) {
	return this.vertices[index];
};

/**
* Clear all vertices
*
* @method
*/
_NS.VertexArray.prototype.clear = function () {
	return this.vertices.clear();
};

/**
* Adds a new vertex
*
* @method
* @param {Vertex} vertex - Vertex object to add
*/
_NS.VertexArray.prototype.addVertex = function (vertex) {
	return this.vertices.push(vertex);
};

/**
* Resizes the vertex list, adding default vertices or removing existing ones to match the new length
*
* @method
* @param {int} vertexCount - New length of the vertex list
*/
_NS.VertexArray.prototype.resize = function (vertexCount) {
	var sub = vertexCount - this.vertices.length;
	if (sub > 0) {
		for (var i = 0; i < sub; i++) {
    		this.vertices.push(new _NS.Vertex());
    	}
	}
	else if (sub < 0) {
		this.vertices = this.vertices.slice(0, vertexCount);
	}
};

/**
* Draws the primitive in the given context
*
* @method
* @param {Context} context - Context
*/
_NS.VertexArray.prototype.draw = function (context) {
    context.drawVertices(this.vertices, this.primitiveType);
};

/**
* Gets an array with only the position components of given vertices
*
* @method
* @param {Vertex[]} vertices - Vertex array
* @returns {float[]} Vertex position array
*/
_NS.VertexArray.getPositionArray = function (vertices) {
    var positionArray = [];
    for (var i = 0; i < vertices.length; i++) {
    	positionArray.push(vertices[i].position.x);
    	positionArray.push(vertices[i].position.y);
    }
    return positionArray;
};

/**
* Gets an array with only the color components of given vertices
*
* @method
* @param {Vertex[]} vertices - Vertex array
* @returns {float[]} Vertex color array
*/
_NS.VertexArray.getColorArray = function (vertices) {
    var colorArray = [];
    for (var i = 0; i < vertices.length; i++) {
    	colorArray.push(vertices[i].color.r / 255);
    	colorArray.push(vertices[i].color.g / 255);
    	colorArray.push(vertices[i].color.b / 255);
    	colorArray.push(vertices[i].color.a / 255);
    }
    return colorArray;
};

/**
* Gets an array with only the texture coordinates of given vertices
*
* @method
* @param {Vertex[]} vertices - Vertex array
* @returns {float[]} Vertex texture coordinates array
*/
_NS.VertexArray.getTexCoordsArray = function (vertices) {
    var texCoordsArray = [];
    for (var i = 0; i < vertices.length; i++) {
    	texCoordsArray.push(vertices[i].texCoords.x);
    	texCoordsArray.push(vertices[i].texCoords.y);
    }
    return texCoordsArray;
};