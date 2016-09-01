var _NS = _NS || {};

/**
* Constructs Rect objects
* @class Represents a Rect object
* @param {float} x - Left
* @param {float} y - Top
* @param {float} w - Width
* @param {float} h - Height
*/
_NS.Rect = function(x, y, w, h) {
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 0;
    this.h = h || 0;
};


_NS.Rect.prototype.set = function (x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
};

_NS.Rect.prototype.equals = function (rect) {
    return (this.x == rect.x && this.y == rect.y && this.w == rect.w && this.h == rect.h);
};
