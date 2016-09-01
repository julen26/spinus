var sp = sp || {};

/**
* Constructs VertexArray objects
* @class Represents a list of vertices and a primitive type
* @param {PrimitiveType} type - Primitive type
* @param {int} vertexCount - Initial number of vertices
*/
sp.VertexArray = function(type, vertexCount) {
	/**
    * Primitive type
    * @type PrimitiveType
    */
	this.m_primitiveType = type || sp.PrimitiveType.Points;
	/**
    * Vertex list
    * @type Vertex[]
    */
    this.m_vertices = [];
    vertexCount = vertexCount || 0;
    for (var i = 0; i < vertexCount; i++) {
    	this.m_vertices.push(new sp.Vertex());
    }
};
sp.extend(sp.VertexArray, sp.Drawable);

/**
* Gets the number of vertices
*
* @method
* @return {int} Vertex count
*/
sp.VertexArray.prototype.getVertexCount = function () {
	return this.m_vertices.length;
};

/**
* Gets the vertex in the given position
*
* @method
* @param {int} index - Vertex position in the list
* @return {Vertex} Vertex at index
*/
sp.VertexArray.prototype.getVertex = function (index) {
	return this.m_vertices[index];
};

/**
* Clear all vertices
*
* @method
*/
sp.VertexArray.prototype.clear = function () {
	return this.m_vertices.clear();
};

/**
* Adds a new vertex
*
* @method
* @param {Vertex} vertex - Vertex object to add
*/
sp.VertexArray.prototype.addVertex = function (vertex) {
	return this.m_vertices.push(vertex);
};

/**
* Resizes the vertex list, adding default vertices or removing existing ones to match the new length
*
* @method
* @param {int} vertexCount - New length of the vertex list
*/
sp.VertexArray.prototype.resize = function (vertexCount) {
	var sub = vertexCount - this.m_vertices.length;
	if (sub > 0) {
		for (var i = 0; i < sub; i++) {
    		this.m_vertices.push(new sp.Vertex());
    	}
	}
	else if (sub < 0) {
		this.m_vertices = this.m_vertices.slice(0, vertexCount);
	}
};

/**
* Gets the primitive type
*
* @method
* @return {PrimitiveType} Primitive type
*/
sp.VertexArray.prototype.getPrimitiveType = function () {
    return this.m_primitiveType;
};

/**
* Sets the primitive type
*
* @method
* @param {PrimitiveType} type - Primitive type
*/
sp.VertexArray.prototype.setPrimitiveType = function (type) {
    this.m_primitiveType = type;
};

/**
* Draws the primitive in the given context
*
* @method
* @param {Context} context - Context
*/
sp.VertexArray.prototype.draw = function (context, renderOptions) {
    context.drawVertices(this.m_vertices, this.m_primitiveType, renderOptions);
};

/**
* Gets an array with only the position components of given vertices
*
* @method
* @param {Vertex[]} vertices - Vertex array
* @returns {float[]} Vertex position array
*/
sp.VertexArray.getPositionArray = function (vertices) {
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
sp.VertexArray.getColorArray = function (vertices) {
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
sp.VertexArray.getTexCoordsArray = function (vertices) {
    var texCoordsArray = [];
    for (var i = 0; i < vertices.length; i++) {
    	texCoordsArray.push(vertices[i].texCoords.x);
    	texCoordsArray.push(vertices[i].texCoords.y);
    }
    return texCoordsArray;
};