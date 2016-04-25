var _NS = _NS || {};

/**
* Constructs Shape objects
* @class Represents a Shape object
*/
_NS.Shape = function(pointCount) {
    /**
    * Outline thickness
    * @type float
    */
    this.m_outlineThickness = 0;
    /**
    * Vertex array that represents the fill
    * @type VertexArray
    */
    this.m_vertexArray = new _NS.VertexArray(_NS.PrimitiveType.TriangleFan, pointCount);
    /**
    * Vertex array that represents the outline
    * @type VertexArray
    */
    this.m_outlineVertexArray = new _NS.VertexArray(_NS.PrimitiveType.TriangleStrip, (pointCount > 2) ? (pointCount * 2) + 2 : 0 );

    //TODO: Texture and texture rectangle
};

_NS.Shape.prototype.addPoint = function (position, color) {
    this.m_vertexArray.addVertex(_NS.Vertex(position, color));
};

_NS.Shape.prototype.setPointPosition = function (index, position) {
    if (index < this.m_vertexArray.getVertexCount()) {
        var vertex = this.m_vertexArray.getVertex(index);
        vertex.position = position;
    }
};

_NS.Shape.prototype.setPointColor = function (index, color) {
    if (index < this.m_vertexArray.getVertexCount()) {
        var vertex = this.m_vertexArray.getVertex(index);
        vertex.color = color;
    }
};

_NS.Shape.prototype.setOutlineThickness = function (outlineThickness) {
    this.m_outlineThickness = outlineThickness;
    this.computeOutline();
};

_NS.Shape.prototype.setOutlineColor = function (color) {
    var count = this.m_outlineVertexArray.getVertexCount();

    for (var i = 0; i < count; i++) {
        this.m_outlineVertexArray.getVertex(i).color = color;
    }
};

_NS.Shape.prototype.computeOutline = function () {
    var count = this.m_vertexArray.getVertexCount();
    this.m_outlineVertexArray.resize((count * 2) + 2);

    for (var i = 0; i < count; i++) {

        var v = this.m_vertexArray.getVertex(i);
        //Get two nearest vertices
        var vLeft = (i == 0) ? this.m_vertexArray.getVertex(count - 1) : this.m_vertexArray.getVertex(i - 1);
        var vRight = (i == count - 1) ? this.m_vertexArray.getVertex(0) : this.m_vertexArray.getVertex(i + 1);

        //Compute segment normals
        var n1 = _NS.Vector2.computeNormal(vLeft.position, v.position);
        var n2 = _NS.Vector2.computeNormal(v.position, vRight.position);

        //TODO: Make sure that the normals point towards the outside of the shape
        //if (dotProduct(n1, m_vertices[0].position - p1) > 0)
        //    n1 = -n1;
        //if (dotProduct(n2, m_vertices[0].position - p1) > 0)
        //    n2 = -n2;

        // Combine normals to get the extrusion direction
        var factor = 1.0 + (n1.x * n2.x + n1.y * n2.y);
        var normal = new _NS.Vector2((n1.x + n2.x) / factor, (n1.y + n2.y) / factor);

        this.m_outlineVertexArray.getVertex(i * 2).position = v.position;
        this.m_outlineVertexArray.getVertex(i * 2 + 1).position = new _NS.Vector2(v.position.x + normal.x * this.m_outlineThickness, v.position.y + normal.y * this.m_outlineThickness);
    }

    //The last point is the same as the first
    this.m_outlineVertexArray.getVertex(count * 2).position = this.m_outlineVertexArray.getVertex(0).position;
    this.m_outlineVertexArray.getVertex(count * 2 + 1).position = this.m_outlineVertexArray.getVertex(1).position;
};

_NS.Shape.prototype.draw = function (context) {
    this.m_vertexArray.draw(context);
    if (this.m_outlineThickness > 0) {
        this.m_outlineVertexArray.draw(context);
    }
};