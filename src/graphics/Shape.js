// Copyright (c) 2017 Julen Salgado. All rights reserved.

/**
* @fileoverview Base shape class implementation. Used to create other particular drawable shapes, such us circles and rectangles
* @author Julen Salgado (julensalgado@gmail.com)
*/

goog.provide('sp.Shape');
goog.require('sp');
goog.require('sp.extend');
goog.require('sp.Transformable');
goog.require('sp.Color');
goog.require('sp.VertexArray');
goog.require('sp.Vector2');
goog.require('sp.Texture');

/**
* Constructs Shape objects
* @class Represents a Shape object
* @extends sp.Transformable
* @extends sp.Drawable
* @param {int} pointCount New length of the point list
* @param {sp.Texture} texture Texture
*/
sp.Shape = function(pointCount, texture) {
    //Call base constructor
    sp.Transformable.call(this);

    /** @private */
    this.outlineThickness_ = 0;
    /** @private */
    this.outlineColor_ = new sp.Color();

    /** @private */
    this.vertexArray_ = new sp.VertexArray(sp.PrimitiveType.TRIANGLE_FAN, pointCount);
    /** @private */
    this.outlineVertexArray_ = new sp.VertexArray(sp.PrimitiveType.TRIANGLE_STRIP, (pointCount > 2) ? (pointCount * 2) + 2 : 0 );

    /** @private */
    this.needsUpdate_ = false;
    /** @private */
    this.needsColorUpdate_ = false;
    /** @private */
    this.needsTexCoordsUpdate_ = false;

    /** @private */
    this.texture_ = null;
    this.setTexture(texture);
};
sp.extend(sp.Shape, sp.Transformable);

/**
* Resizes the point list, adding default points or removing existing ones to match the new length.
*
* @method
* @param {int} pointCount New length of the point list
*/
sp.Shape.prototype.setPointCount = function (pointCount) {
    this.vertexArray_.resize(pointCount);
    this.needsUpdate_ = true;
    this.needsColorUpdate_ = true;
    this.needsTexCoordsUpdate_ = true;
};

/**
* Get the number of points
*
* @method
* @returns {int} Length of point list
*/
sp.Shape.prototype.getPointCount = function () {
    return this.vertexArray_.getVertexCount();
};

/**
* Adds a new point to the shape
*
* @method
* @param {sp.Vector2} position Position of the new point
* @param {sp.Color} color Color of the new point
*/
sp.Shape.prototype.addPoint = function (position, color) {
    this.vertexArray_.addVertex(sp.Vertex(position, color));
    this.needsUpdate_ = true;
    this.needsColorUpdate_ = true;
    this.needsTexCoordsUpdate_ = true;
};

/**
* Sets the position of a point
*
* @method
* @param {int} index Index of the point
* @param {sp.Vector2} position New position of the point
*/
sp.Shape.prototype.setPointPosition = function (index, position) {
    if (index < this.vertexArray_.getVertexCount()) {
        var vertex = this.vertexArray_.getVertex(index);
        vertex.position = position;
        this.needsUpdate_ = true;
        this.needsTexCoordsUpdate_ = true;
    }
};

/**
* Sets the color of a point
*
* @method
* @param {int} index Index of the point
* @param {sp.Color} position New color of the point
*/
sp.Shape.prototype.setPointColor = function (index, color) {
    if (index < this.vertexArray_.getVertexCount()) {
        var vertex = this.vertexArray_.getVertex(index);
        vertex.color = color;
    }
};

/**
* Sets the outline thickness
*
* @method
* @param {float} outlineThickness Outline thickness
*/
sp.Shape.prototype.setOutlineThickness = function (outlineThickness) {
    this.outlineThickness_ = outlineThickness;
    this.needsUpdate_ = true;
};

/**
* Sets the outline color
*
* @method
* @param {sp.Color} color Color of the outline
*/
sp.Shape.prototype.setOutlineColor = function (color) {
    this.outlineColor_ = color;
    this.needsColorUpdate_ = true;
};

/**
* Updates the color of each vertex of the outline
*
* @method
*/
sp.Shape.prototype.updateOutlineColor = function () {
    var count = this.outlineVertexArray_.getVertexCount();

    for (var i = 0; i < count; i++) {
        this.outlineVertexArray_.getVertex(i).color = this.outlineColor_;
    }
};

/**
* Updates the outline vertex array
*
* @method
*/
sp.Shape.prototype.updateOutline = function () {
    var count = this.vertexArray_.getVertexCount();
    this.outlineVertexArray_.resize((count * 2) + 2);

    for (var i = 0; i < count; i++) {

        var v = this.vertexArray_.getVertex(i);
        //Get two nearest vertices
        var vLeft = (i == 0) ? this.vertexArray_.getVertex(count - 1) : this.vertexArray_.getVertex(i - 1);
        var vRight = (i == count - 1) ? this.vertexArray_.getVertex(0) : this.vertexArray_.getVertex(i + 1);

        //Compute segment normals
        var n1 = sp.Vector2.computeNormal(vLeft.position, v.position);
        var n2 = sp.Vector2.computeNormal(v.position, vRight.position);

        //Normals must point towards outside of the shape
        var tmp = sp.Vector2.sub(this.vertexArray_.getVertex(0).position, v.position);
        if (sp.Vector2.dotProduct(n1, tmp) > 0) {
            n1.x = -n1.x;
            n1.y = -n1.y;
        }
        if (sp.Vector2.dotProduct(n2, tmp) > 0) {
            n2.x = -n2.x;
            n2.y = -n2.y;
        }

        // Combine normals to get the extrusion direction
        var factor = 1.0 + (n1.x * n2.x + n1.y * n2.y);
        var normal = new sp.Vector2((n1.x + n2.x) / factor, (n1.y + n2.y) / factor);

        this.outlineVertexArray_.getVertex(i * 2).position = v.position;
        this.outlineVertexArray_.getVertex(i * 2 + 1).position = new sp.Vector2(v.position.x + normal.x * this.outlineThickness_, v.position.y + normal.y * this.outlineThickness_);
    }

    //The last point is the same as the first
    this.outlineVertexArray_.getVertex(count * 2).position = this.outlineVertexArray_.getVertex(0).position;
    this.outlineVertexArray_.getVertex(count * 2 + 1).position = this.outlineVertexArray_.getVertex(1).position;
};

/**
* Sets a texture to the shape.
*
* @method
* @param {sp.Texture} texture Texture
*/
sp.Shape.prototype.setTexture = function (texture) {
    this.texture_ = texture;

    if (this.texture_) {
        this.needsTexCoordsUpdate_ = true;
        var size = this.texture_.getSize();

        for (var i = 0; i < this.vertexArray_.getVertexCount(); i++) {
            var v = this.vertexArray_.getVertex(i);
            v.texCoords = new sp.Vector2(v.position.x / size.x, v.position.y / size.y);
        }
    }

};

/**
* Get the texture of the shape.
*
* @method
* @returns {sp.Texture} Texture
*/
sp.Shape.prototype.getTexture = function () {
    return this.texture_;
};

/**
* Updates texture coordinates.
*
* @method
*/
sp.Shape.prototype.updateTexCoords = function () {
    if (this.texture_) {
        var size = this.texture_.getSize();

        for (var i = 0; i < this.vertexArray_.getVertexCount(); i++) {
            var v = this.vertexArray_.getVertex(i);
            v.texCoords = new sp.Vector2(v.position.x / size.x, v.position.y / size.y);
        }
    }
};

/**
* Draws the shape in the given context.
*
* @method
* @param {sp.Context} context Context
/ @param {sp.RenderOptions} renderOptions Optional render options
*/
sp.Shape.prototype.draw = function (context, renderOptions) {
    renderOptions.transform = this.getTransform();
    renderOptions.texture = this.texture_;

    if (this.needsTexCoordsUpdate_) {
        this.updateTexCoords();
        this.needsTexCoordsUpdate_ = false;
    }
    
    this.vertexArray_.draw(context, renderOptions);
    if (this.outlineThickness_ > 0) {
        renderOptions.texture = null;
        //TODO: May be done on an update step, not when drawing
        if (this.needsUpdate_) {
            this.updateOutline();
            this.needsUpdate_ = false;
        }
        if (this.needsColorUpdate_) {
            this.updateOutlineColor();
            this.needsColorUpdate_ = false;
        }
        this.outlineVertexArray_.draw(context, renderOptions);
    }
};