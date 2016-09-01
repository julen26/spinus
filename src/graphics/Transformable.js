var sp = sp || {};

/**
* Constructs Transformable objects
* @class Represents a Transformable object
*/
sp.Transformable = function() {
    this.m_transform = new sp.Transform();
    this.m_scale = new sp.Vector2(1, 1);
    this.m_origin = new sp.Vector2();
    this.m_rotation = 0;
    this.m_position = new sp.Vector2();

    this.m_needsUpdate = false;
};

sp.Transformable.prototype.getTransform = function () {
    if (this.m_needsUpdate) {
        this.updateTransform();
    }
    return this.m_transform;
};

sp.Transformable.prototype.move = function (x, y) {
    this.setPosition(this.m_position.x + x, this.m_position.y + y);
};

sp.Transformable.prototype.scale = function (x, y) {
    this.setScale(this.m_scale.x * x, this.m_scale.y * y);
};

sp.Transformable.prototype.rotate = function (angle) {
    this.setRotation(this.m_rotation + angle);
};

sp.Transformable.prototype.setScale = function(x, y) {
    this.m_scale.x = x;
    this.m_scale.y = y;
    this.m_needsUpdate = true;
};

sp.Transformable.prototype.setOrigin = function(x, y) {
    this.m_origin.x = x;
    this.m_origin.y = y;
    this.m_needsUpdate = true;
};

sp.Transformable.prototype.setRotation = function(angle) {
    this.m_rotation = angle % 360;
    if (this.m_rotation < 0) {
        this.m_rotation += 360;
    }
    this.m_rotation = angle;
    this.m_needsUpdate = true;
};

sp.Transformable.prototype.setPosition = function(x, y) {
    this.m_position.x = x;
    this.m_position.y = y;
    this.m_needsUpdate = true;
};

sp.Transformable.prototype.getScale = function() {
    return this.m_scale;
};

sp.Transformable.prototype.getOrigin = function() {
    return this.m_origin;
};

sp.Transformable.prototype.getRotation = function() {
    return this.m_rotation;
};

sp.Transformable.prototype.getPosition = function() {
    return this.m_position;
};

sp.Transformable.prototype.updateTransform = function() {
    this.m_transform.set(1, 0, 0,
             0, 1, 0,
             0, 0, 1);
    //Scale, translate origin, rotate, translate position. Mathematically matrix operations must be applied right to left.
    this.m_transform.translate(this.m_position.x, this.m_position.y).rotate(this.m_rotation).scale(this.m_scale.x, this.m_scale.y).translate(-this.m_origin.x, -this.m_origin.y);
};
