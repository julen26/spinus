var _NS = _NS || {};

/**
* Constructs Shape objects
* @class Represents a Shape object
*/
_NS.Shape = function(pointCount, outlineThickness) {
    /**
    * Outline thickness
    * @type float
    */
    this.outlineThickness = outlineThickness || 0;
    /**
    * Vertex array that represents the fill
    * @type VertexArray
    */
    this.vertexArray = new _NS.VertexArray(_NS.PrimitiveType.TriangleFan, pointCount);
    /**
    * Vertex array that represents the outline
    * @type VertexArray
    */
    this.outlineVertexArray = new _NS.VertexArray(_NS.PrimitiveType.LineLoop, (outlineThickness > 0) ? pointCount : 0 );

    //TODO: Texture and texture rectangle
};

_NS.Shape.prototype.addPoint = function (position, color) {
    this.vertexArray.addVertex(_NS.Vertex(position, color));
};

_NS.Shape.prototype.setPointPosition = function (index, position) {
    if (index < this.vertexArray.getVertexCount()) {
        var vertex = this.vertexArray.getVertex(index);
        vertex.position = position;
    }
};

_NS.Shape.prototype.setPointColor = function (index, color) {
    if (index < this.vertexArray.getVertexCount()) {
        var vertex = this.vertexArray.getVertex(index);
        vertex.color = color;
    }
};

_NS.Shape.prototype.draw = function (context) {
    this.vertexArray.draw(context);
    //TODO: Draw outline
};