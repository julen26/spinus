var _NS = _NS || {};

/** 
* Enum for primitive types
* @enum {number}
*/
_NS.PrimitiveType = {
    Points : 0,
    Lines : 1,
    LineStrip : 2,
    LineLoop : 3,
    Triangles : 4,
    TriangleStrip : 5,
    TriangleFan : 6,
    /** Deprecated, not supported in OpenGL ES */
    Quads : 7
};