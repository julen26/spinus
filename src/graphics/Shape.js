goog.provide('sp.Shape');
goog.require('sp.extend');
goog.require('sp.Transformable');
goog.require('sp.Drawable');
goog.require('sp.Color');
goog.require('sp.VertexArray');
goog.require('sp.Vector2');

/**
* Constructs Shape objects
* @class Represents a Shape object
* @extends Transformable
* @extends Drawable
* @param {int} pointCount - New length of the point list
* @param {Texture} texture - Texture
*/
sp.Shape = function(pointCount, texture) {
    //Call base constructor
    sp.Transformable.call(this);

    this.m_outlineThickness = 0;
    this.m_outlineColor = new sp.Color();
    this.m_vertexArray = new sp.VertexArray(sp.PrimitiveType.TRIANGLE_FAN, pointCount);
    this.m_outlineVertexArray = new sp.VertexArray(sp.PrimitiveType.TRIANGLE_STRIP, (pointCount > 2) ? (pointCount * 2) + 2 : 0 );

    this.m_needsUpdate = false;
    this.m_needsColorUpdate = false;
    this.m_needsTexCoordsUpdate = false;

    this.setTexture(texture);
};
sp.extend(sp.Shape, sp.Transformable);
sp.extend(sp.Shape, sp.Drawable);

/**
* Resizes the point list, adding default points or removing existing ones to match the new length.
*
* @method
* @param {int} pointCount - New length of the point list
*/
sp.Shape.prototype.setPointCount = function (pointCount) {
    this.m_vertexArray.resize(pointCount);
    this.m_needsUpdate = true;
    this.m_needsColorUpdate = true;
    this.m_needsTexCoordsUpdate = true;
};

/**
* Get the number of points
*
* @method
* @returns {int} Length of point list
*/
sp.Shape.prototype.getPointCount = function () {
    return this.m_vertexArray.getVertexCount();
};

/**
* Adds a new point to the shape
*
* @method
* @param {Vector2} position - Position of the new point
* @param {Color} color - Color of the new point
*/
sp.Shape.prototype.addPoint = function (position, color) {
    this.m_vertexArray.addVertex(sp.Vertex(position, color));
    this.m_needsUpdate = true;
    this.m_needsColorUpdate = true;
    this.m_needsTexCoordsUpdate = true;
};

/**
* Sets the position of a point
*
* @method
* @param {int} index - Index of the point
* @param {Vector2} position - New position of the point
*/
sp.Shape.prototype.setPointPosition = function (index, position) {
    if (index < this.m_vertexArray.getVertexCount()) {
        var vertex = this.m_vertexArray.getVertex(index);
        vertex.position = position;
        this.m_needsUpdate = true;
        this.m_needsTexCoordsUpdate = true;
    }
};

/**
* Sets the color of a point
*
* @method
* @param {int} index - Index of the point
* @param {Color} position - New color of the point
*/
sp.Shape.prototype.setPointColor = function (index, color) {
    if (index < this.m_vertexArray.getVertexCount()) {
        var vertex = this.m_vertexArray.getVertex(index);
        vertex.color = color;
    }
};

/**
* Sets the outline thickness
*
* @method
* @param {float} outlineThickness - Outline thickness
*/
sp.Shape.prototype.setOutlineThickness = function (outlineThickness) {
    this.m_outlineThickness = outlineThickness;
    this.m_needsUpdate = true;
};

/**
* Sets the outline color
*
* @method
* @param {Color} color - Color of the outline
*/
sp.Shape.prototype.setOutlineColor = function (color) {
    this.m_outlineColor = color;
    this.m_needsColorUpdate = true;
};

/**
* Updates the color of each vertex of the outline
*
* @method
*/
sp.Shape.prototype.updateOutlineColor = function () {
    var count = this.m_outlineVertexArray.getVertexCount();

    for (var i = 0; i < count; i++) {
        this.m_outlineVertexArray.getVertex(i).color = this.m_outlineColor;
    }
};

/**
* Updates the outline vertex array
*
* @method
*/
sp.Shape.prototype.updateOutline = function () {
    var count = this.m_vertexArray.getVertexCount();
    this.m_outlineVertexArray.resize((count * 2) + 2);

    for (var i = 0; i < count; i++) {

        var v = this.m_vertexArray.getVertex(i);
        //Get two nearest vertices
        var vLeft = (i == 0) ? this.m_vertexArray.getVertex(count - 1) : this.m_vertexArray.getVertex(i - 1);
        var vRight = (i == count - 1) ? this.m_vertexArray.getVertex(0) : this.m_vertexArray.getVertex(i + 1);

        //Compute segment normals
        var n1 = sp.Vector2.computeNormal(vLeft.position, v.position);
        var n2 = sp.Vector2.computeNormal(v.position, vRight.position);

        //Normals must point towards outside of the shape
        var tmp = sp.Vector2.sub(this.m_vertexArray.getVertex(0).position, v.position);
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

        this.m_outlineVertexArray.getVertex(i * 2).position = v.position;
        this.m_outlineVertexArray.getVertex(i * 2 + 1).position = new sp.Vector2(v.position.x + normal.x * this.m_outlineThickness, v.position.y + normal.y * this.m_outlineThickness);
    }

    //The last point is the same as the first
    this.m_outlineVertexArray.getVertex(count * 2).position = this.m_outlineVertexArray.getVertex(0).position;
    this.m_outlineVertexArray.getVertex(count * 2 + 1).position = this.m_outlineVertexArray.getVertex(1).position;
};

/**
* Sets a texture to the shape.
*
* @method
* @param {Texture} texture - Texture
*/
sp.Shape.prototype.setTexture = function (texture) {
    this.m_texture = texture;

    if (this.m_texture) {
        this.m_needsTexCoordsUpdate = true;
        var size = this.m_texture.getSize();

        for (var i = 0; i < this.m_vertexArray.getVertexCount(); i++) {
            var v = this.m_vertexArray.getVertex(i);
            v.texCoords = new sp.Vector2(v.position.x / size.x, v.position.y / size.y);
        }
    }

};

/**
* Get the texture of the shape.
*
* @method
* @returns {Texture} Texture
*/
sp.Shape.prototype.getTexture = function () {
    return this.m_texture;
};

/**
* Updates texture coordinates.
*
* @method
*/
sp.Shape.prototype.updateTexCoords = function () {
    if (this.m_texture) {
        var size = this.m_texture.getSize();

        for (var i = 0; i < this.m_vertexArray.getVertexCount(); i++) {
            var v = this.m_vertexArray.getVertex(i);
            v.texCoords = new sp.Vector2(v.position.x / size.x, v.position.y / size.y);
        }
    }
};

/**
* Draws the shape in the given context.
*
* @method
* @param {Context} context - Context
/ @param {RenderOptions} renderOptions - Optional render options
*/
sp.Shape.prototype.draw = function (context, renderOptions) {
    renderOptions.transform = this.getTransform();
    renderOptions.texture = this.m_texture;

    if (this.m_needsTexCoordsUpdate) {
        this.updateTexCoords();
        this.m_needsTexCoordsUpdate = false;
    }
    
    this.m_vertexArray.draw(context, renderOptions);
    if (this.m_outlineThickness > 0) {
        renderOptions.texture = null;
        //TODO: May be done on an update step, not when drawing
        if (this.m_needsUpdate) {
            this.updateOutline();
            this.m_needsUpdate = false;
        }
        if (this.m_needsColorUpdate) {
            this.updateOutlineColor();
            this.m_needsColorUpdate = false;
        }
        this.m_outlineVertexArray.draw(context, renderOptions);
    }
};