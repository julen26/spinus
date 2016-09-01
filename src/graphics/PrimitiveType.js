var sp = sp || {};

/** 
* Enum for primitive types
* @enum {number}
*/
sp.PrimitiveType = {
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