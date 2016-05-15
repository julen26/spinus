var _NS = _NS || {};

/**
* Constructs Transformable objects
* @class Represents a Transformable object
*/
_NS.Transformable = function() {
    this.m_transform = new _NS.Transform();
    this.m_scale = new _NS.Vector2(1, 1);
    this.m_origin = new _NS.Vector2();
    this.m_rotation = 0;
    this.m_position = new _NS.Vector2();

    this.m_needsUpdate = false;
};

_NS.Transformable.prototype.getTransform = function () {
    if (this.m_needsUpdate) {
        this.updateTransform();
    }
    return this.m_transform;
};

_NS.Transformable.prototype.move = function (x, y) {
    this.setPosition(this.m_position.x + x, this.m_position.y + y);
};

_NS.Transformable.prototype.scale = function (x, y) {
    this.setScale(this.m_scale.x * x, this.m_scale.y * y);
};

_NS.Transformable.prototype.rotate = function (angle) {
    this.setRotation(this.m_rotation + angle);
};

_NS.Transformable.prototype.setScale = function(x, y) {
    this.m_scale.x = x;
    this.m_scale.y = y;
    this.m_needsUpdate = true;
};

_NS.Transformable.prototype.setOrigin = function(x, y) {
    this.m_origin.x = x;
    this.m_origin.y = y;
    this.m_needsUpdate = true;
};

_NS.Transformable.prototype.setRotation = function(angle) {
    this.m_rotation = angle % 360;
    if (this.m_rotation < 0) {
        this.m_rotation += 360;
    }
    this.m_rotation = angle;
    this.m_needsUpdate = true;
};

_NS.Transformable.prototype.setPosition = function(x, y) {
    this.m_position.x = x;
    this.m_position.y = y;
    this.m_needsUpdate = true;
};

_NS.Transformable.prototype.getScale = function(x, y) {
    return this.m_scale;
};

_NS.Transformable.prototype.getOrigin = function(x, y) {
    return this.m_origin;
};

_NS.Transformable.prototype.getRotation = function(angle) {
    return this.m_rotation;
};

_NS.Transformable.prototype.getPosition = function(x, y) {
    return this.m_position;
};

_NS.Transformable.prototype.updateTransform = function() {
    this.m_transform.set(1, 0, 0,
             0, 1, 0,
             0, 0, 1);
    //Scale, translate origin, rotate, translate position. Mathematically matrix operations must be applied right to left.
    this.m_transform.translate(this.m_position.x, this.m_position.y).rotate(this.m_rotation).translate(-this.m_origin.x, -this.m_origin.y).scale(this.m_scale.x, this.m_scale.y);
};
