// Copyright (c) 2017 Julen Salgado. All rights reserved.

/**
* @fileoverview Basic vertex class implementation
* @author Julen Salgado (julensalgado@gmail.com)
*/

goog.provide('sp.Vertex');
goog.require('sp');
goog.require('sp.Vector2');
goog.require('sp.Color');

/**
* Constructs Vertex objects
* @class Represents a Vertex object
* @param {sp.Vector2} position Position
* @param {sp.Color} color Color
* @param {sp.Vector2} texCoords Texture coordinates
*/
sp.Vertex = function(position, color, texCoords) {
    /**
    * Position
    * @type sp.Vector2
    */
    this.position = position || new sp.Vector2(0, 0);
    /**
    * Color
    * @type sp.Color
    */
    this.color = color || new sp.Color(255, 255, 255);
    /**
    * Texture coordinates
    * @type sp.Vector2
    */
    this.texCoords = texCoords || new sp.Vector2(0, 0);
};

/**
* Sets vertex components
* @method
* @param {sp.Vector2} position Position
* @param {sp.Color} color Color
* @param {sp.Vector2} texCoords Texture coordinates
*/
sp.Vertex.prototype.set = function (position, color, texCoords) {
    this.position = position;
    this.color = color;
    this.texCoords = texCoords;
};

/**
* Compares vertices and checks if they are equal
* @method
* @return {bool} True if vertices are equal
*/
sp.Vertex.prototype.equals = function (vertex) {
    return (this.position.equals(vertex.position) && this.color.equals(vertex.color) && this.texCoords.equals(vertex.texCoords));
};