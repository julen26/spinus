goog.provide('sp.Texture');
goog.require('sp.Vector2');

/**
* Constructs Texture objects
* @class Represents a Texture object
*/
sp.Texture = function(context, sourcePath, callback, smooth, repeat, useMipmap) {
	this.m_context = context;
    this.m_smooth = smooth || false;
    this.m_repeat = repeat || false;
    this.m_useMipmap = useMipmap || false;
    this.m_image = new Image();
    if (sourcePath) {
        this.loadFromFile(sourcePath, callback || null);
    }
};

/**
* Loads the image from file
*
* @method
* @param {string} sourcePath - Path of the image file must be in the same domain
* @param {function} callback - Callback function
*/
sp.Texture.prototype.loadFromFile = function (sourcePath, callback) {
	this.m_callback = callback;
    this.m_image.src = sourcePath;
    this.m_image.onload = this.handleLoadedTexture.bind(this);
};

sp.Texture.prototype.loadFromImage = function (image) {
    this.m_image = image;
    this.handleLoadedTexture();
};

sp.Texture.prototype.handleLoadedTexture = function () {
		var gl = this.m_context.GL();

        this.m_size = new sp.Vector2(this.m_image.width, this.m_image.height);

    	this.m_textureId = gl.createTexture();
    	gl.bindTexture(gl.TEXTURE_2D, this.m_textureId);

        var tmpImage = this.m_image;

        if ((this.m_repeat || this.m_useMipmap) && !this.isPowerOfTwo()) {
            var ctx = document.createElement("canvas").getContext("2d");
            ctx.canvas.width = this.nextHighestPowerOfTwo(this.m_size.x);
            ctx.canvas.height = this.nextHighestPowerOfTwo(this.m_size.y);
            ctx.drawImage(tmpImage, 0, 0, tmpImage.width, tmpImage.height);
            tmpImage = ctx.canvas;
            this.m_size.x = ctx.canvas.width;
            this.m_size.y = ctx.canvas.height;
        }

    	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tmpImage);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, (this.m_repeat) ? gl.REPEAT : gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, (this.m_repeat) ? gl.REPEAT : gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, (this.m_smooth) ? gl.LINEAR : gl.NEAREST);
        //TODO: Implement filter types (bilinear, trilinear)
        if (this.m_useMipmap) {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, (this.m_smooth) ? gl.LINEAR_MIPMAP_NEAREST : gl.NEAREST_MIPMAP_NEAREST);
            gl.generateMipmap(gl.TEXTURE_2D);
        }
        else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, (this.m_smooth) ? gl.LINEAR : gl.NEAREST);
        }
    	gl.bindTexture(gl.TEXTURE_2D, null);

        if (this.m_callback) {
    	   this.m_callback();
        }
};

sp.Texture.prototype.getTextureId = function () {
	return this.m_textureId;
};

sp.Texture.prototype.getSize = function () {
    return this.m_size;
};

sp.Texture.prototype.isPowerOfTwo = function () {
    if (!this.m_size) return false;
    return ((this.m_size.x & (this.m_size.x - 1) == 0) && (this.m_size.y & (this.m_size.y - 1) == 0));
};

sp.Texture.prototype.nextHighestPowerOfTwo = function (p) {
    p--;
    for (var i = 1; i <= 16; i <<= 1) {
        p |= p >> i;
    }
    return p + 1;
};
