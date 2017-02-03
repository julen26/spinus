goog.provide('sp.Texture');
goog.require('sp.Vector2');

/**
* Constructs Texture objects
* @class Represents a Texture object
* @param {Context} context - Context
* @param {bool} [smooth=false] - Color
* @param {bool} [repeat=false] - Color
* @param {bool} [forcePOT=false] - Color
*/
sp.Texture = function(context, smooth, repeat, forcePOT) {
    /** @private */
	this.context_ = context;
    /** @private */
    this.smooth_ = smooth || false;
    /** @private */
    this.repeat_ = repeat || false;
    /** @private */
    this.forcePOT_ = forcePOT || false;

    /** @private */
    this.image_ = null;
    /** @private */
    this.textureId_ = null;

    /** @private */
    this.size_ = new sp.Vector2();

    /** @private */
    this.callback_ = null;
};

/**
* Loads the image from file
*
* @method
* @param {string} sourcePath - Path of the image file must be in the same domain
* @param {function} callback - Callback function
*/
sp.Texture.prototype.loadFromFile = function (sourcePath, callback) {
    this.image_ = new Image();
	this.callback_ = callback;
    this.image_.src = sourcePath;
    this.image_.onload = this.handleLoadedTexture.bind(this);
};

/**
* Loads the image from HTML image element
*
* @method
* @param {HTMLImageElement} image - HTML image element
*/
sp.Texture.prototype.loadFromImage = function (image) {
    this.image_ = image;
    this.handleLoadedTexture();
};

/** @private */
sp.Texture.prototype.handleLoadedTexture = function () {
		var gl = this.context_.GL();

        this.size_ = new sp.Vector2(this.image_.width, this.image_.height);

    	this.textureId_ = gl.createTexture();
    	gl.bindTexture(gl.TEXTURE_2D, this.textureId_);

        if (this.forcePOT_ && !this.isPowerOfTwo()) {
            var ctx = document.createElement("canvas").getContext("2d");
            ctx.canvas.width = this.nextHighestPowerOfTwo(this.size_.x);
            ctx.canvas.height = this.nextHighestPowerOfTwo(this.size_.y);
            ctx.drawImage(this.image_, 0, 0, this.image_.width, this.image_.height);
            this.size_.x = ctx.canvas.width;
            this.size_.y = ctx.canvas.height;
            this.image_ = ctx.canvas;
        }

    	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image_);
        if (this.isPowerOfTwo()) {
            gl.generateMipmap(gl.TEXTURE_2D);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, (this.smooth_) ? gl.LINEAR_MIPMAP_NEAREST : gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, (this.repeat_) ? gl.REPEAT : gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, (this.repeat_) ? gl.REPEAT : gl.CLAMP_TO_EDGE);
        }
        else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, (this.smooth_) ? gl.LINEAR : gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            this.repeat_ = false;
        }
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, (this.smooth_) ? gl.LINEAR : gl.NEAREST);

    	gl.bindTexture(gl.TEXTURE_2D, null);

        if (this.callback_) {
    	   this.callback_();
        }
};

/**
* Get the internal WebGL texture
*
* @method
* @returns {WebGLTexture} Internal WebGL texture
*/
sp.Texture.prototype.getTextureId = function () {
	return this.textureId_;
};

/**
* Get texture size
*
* @method
* @returns {Vector2} image - HTML image element
*/
sp.Texture.prototype.getSize = function () {
    return this.size_;
};

/**
* Enable or disable smooth mode.
*
* @method
* @param {bool} smooth - Enable smooth mode
*/
sp.Texture.prototype.setSmooth = function (smooth) {
    gl.bindTexture(gl.TEXTURE_2D, this.textureId_);
    if (this.isPowerOfTwo()) {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, (this.smooth_) ? gl.LINEAR_MIPMAP_NEAREST : gl.NEAREST);
    }
    else {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, (this.smooth_) ? gl.LINEAR : gl.NEAREST);
    }
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, (this.smooth_) ? gl.LINEAR : gl.NEAREST);
    this.smooth_ = smooth;
};

/**
* Enable or disable repeat mode.
*
* @method
* @param {bool} repeat - Enable repeat mode
*/
sp.Texture.prototype.setRepeat = function (repeat) {
    gl.bindTexture(gl.TEXTURE_2D, this.textureId_);
    if (this.isPowerOfTwo()) {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, (repeat) ? gl.REPEAT : gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, (repeat) ? gl.REPEAT : gl.CLAMP_TO_EDGE);
        this.repeat_ = repeat;
    }
    else {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        this.repeat_ = false;
    }
};

/**
* Checks wether or not texture size is power of two
*
* @method
* @returns {bool} True if texture size is power of two
*/
sp.Texture.prototype.isPowerOfTwo = function () {
    if (!this.size_) return false;
    return ((this.size_.x & (this.size_.x - 1)) == 0) && ((this.size_.y & (this.size_.y - 1)) == 0);
};

//TODO: Move this to a math/tools module
/**
* Get next highest power of two
*
* @method
* @param {int} p - Integer
* @returns {int} Next highest power of two
*/
sp.Texture.prototype.nextHighestPowerOfTwo = function (p) {
    p--;
    for (var i = 1; i <= 16; i <<= 1) {
        p |= p >> i;
    }
    return p + 1;
};
