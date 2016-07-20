var _NS = _NS || {};

/**
* Constructs View objects
* @class Represents a View object
*/
_NS.View = function(w, h) {
    this.m_transform = new _NS.Transform();
    this.m_size = new _NS.Vector2(w || 640, h || 480);
    this.m_scale = new _NS.Vector2(1, 1);
    this.m_rotation = 0;
    this.m_center = new _NS.Vector2( this.m_size.x / 2, this.m_size.y / 2);

    this.m_needsUpdate = true;

    this.m_projection = new _NS.Transform();
    this.m_projection.set(  2.0 / this.m_size.x,    0,                      0,
                            0,                      -2.0 / this.m_size.y,   0,
                            -1,                     1,                      1);
    this.m_viewport = new _NS.Rect(0, 0, 1, 1);

    //TODO: Viewport
};

_NS.View.prototype.getTransform = function () {
    //TODO: Maybe precalculate once projection and view transforms instead of doing each time on shader
    if (this.m_needsUpdate) {
        this.updateTransform();
    }
    return this.m_transform;
};

_NS.View.prototype.getProjection = function () {
    return this.m_projection;
};

_NS.View.prototype.move = function (x, y) {
    this.setCenter(this.m_center.x + x, this.m_center.y + y);
};

_NS.View.prototype.scale = function (x, y) {
    this.setScale(this.m_scale.x * x, this.m_scale.y * y);
};

_NS.View.prototype.rotate = function (angle) {
    this.setRotation(this.m_rotation + angle);
};

_NS.View.prototype.setScale = function(x, y) {
    this.m_scale.x = x;
    this.m_scale.y = y;
    this.m_needsUpdate = true;
};

_NS.View.prototype.setRotation = function(angle) {
    this.m_rotation = angle % 360;
    if (this.m_rotation < 0) {
        this.m_rotation += 360;
    }
    this.m_rotation = angle;
    this.m_needsUpdate = true;
};

_NS.View.prototype.setCenter = function(x, y) {
    this.m_center.x = x;
    this.m_center.y = y;
    this.m_needsUpdate = true;
};

_NS.View.prototype.setViewport = function(rect) {
    this.m_viewport = rect;
};

_NS.View.prototype.getScale = function() {
    return this.m_scale;
};

_NS.View.prototype.getRotation = function() {
    return this.m_rotation;
};

_NS.View.prototype.getCenter = function() {
    return this.m_center;
};

_NS.View.prototype.getViewport = function() {
    return this.m_viewport;
};

_NS.View.prototype.updateTransform = function() {
    this.m_transform.set(1, 0, 0,
             0, 1, 0,
             0, 0, 1);
    //Scale, translate origin, rotate, translate position. Mathematically matrix operations must be applied right to left.
    this.m_transform.rotate(this.m_rotation).scale(this.m_scale.x, this.m_scale.y).translate(-this.m_center.x, -this.m_center.y);
};
