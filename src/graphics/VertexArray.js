// Copyright (c) 2017 Julen Salgado. All rights reserved.

/**
* @fileoverview Implementation of a drawable array of vertices
* @author Julen Salgado (julensalgado@gmail.com)
*/

goog.provide('sp.VertexArray');
goog.require('sp');
goog.require('sp.extend');
goog.require('sp.Drawable');
goog.require('sp.Vertex');
goog.require('sp.PrimitiveType');

/**
* Constructs VertexArray objects
* @class Represents a list of vertices and a primitive type
* @extends sp.Drawable
* @param {sp.PrimitiveType} type Primitive type
* @param {int} vertexCount Initial number of vertices
*/
sp.VertexArray = function(type, vertexCount) {
    /** @private */
	this.primitiveType_ = type || sp.PrimitiveType.POINTS;
    /** @private */
    this.vertices_ = [];
    
    vertexCount = vertexCount || 0;
    for (var i = 0; i < vertexCount; i++) {
    	this.vertices_.push(new sp.Vertex());
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
	return this.vertices_.length;
};

/**
* Gets the vertex in the given position
*
* @method
* @param {int} index Vertex position in the list
* @return {sp.Vertex} Vertex at index
*/
sp.VertexArray.prototype.getVertex = function (index) {
	return this.vertices_[index];
};

/**
* Clear all vertices
*
* @method
*/
sp.VertexArray.prototype.clear = function () {
	return this.vertices_.clear();
};

/**
* Adds a new vertex
*
* @method
* @param {sp.Vertex} vertex Vertex object to add
*/
sp.VertexArray.prototype.addVertex = function (vertex) {
	return this.vertices_.push(vertex);
};

/**
* Resizes the vertex list, adding default vertices or removing existing ones to match the new length
*
* @method
* @param {int} vertexCount New length of the vertex list
*/
sp.VertexArray.prototype.resize = function (vertexCount) {
	var sub = vertexCount - this.vertices_.length;
	if (sub > 0) {
		for (var i = 0; i < sub; i++) {
    		this.vertices_.push(new sp.Vertex());
    	}
	}
	else if (sub < 0) {
		this.vertices_ = this.vertices_.slice(0, vertexCount);
	}
};

/**
* Gets the primitive type
*
* @method
* @return {sp.PrimitiveType} Primitive type
*/
sp.VertexArray.prototype.getPrimitiveType = function () {
    return this.primitiveType_;
};

/**
* Sets the primitive type
*
* @method
* @param {sp.PrimitiveType} type Primitive type
*/
sp.VertexArray.prototype.setPrimitiveType = function (type) {
    this.primitiveType_ = type;
};

/**
* Draws the primitive in the given context
*
* @method
* @param {sp.Context} context Context
*/
sp.VertexArray.prototype.draw = function (context, renderOptions) {
    context.drawVertices(this.vertices_, this.primitiveType_, renderOptions);
};

/**
* Gets an array with only the position components of given vertices
*
* @method
* @param {sp.Vertex[]} vertices Vertex array
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
* @param {sp.Vertex[]} vertices Vertex array
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
* @param {sp.Vertex[]} vertices Vertex array
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