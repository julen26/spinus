var _NS = _NS || {};

/**
* Constructs Texture objects
* @class Represents a Texture object
*/
_NS.Texture = function(context, sourcePath, callback) {
	this.m_context = context;
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
_NS.Texture.prototype.loadFromFile = function (sourcePath, callback) {
	this.m_callback = callback;
    this.m_image.src = sourcePath;
    this.m_image.onload = this.handleLoadedTexture.bind(this);
};

_NS.Texture.prototype.loadFromImage = function (image) {
    this.m_image = image;
    this.handleLoadedTexture();
};

_NS.Texture.prototype.handleLoadedTexture = function () {
		var gl = this.m_context.GL();

    	this.m_textureId = gl.createTexture();
    	gl.bindTexture(gl.TEXTURE_2D, this.m_textureId);
    	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.m_image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        //TODO: Mipmap improvement
    	//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  		//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    	//gl.generateMipmap(gl.TEXTURE_2D);
    	gl.bindTexture(gl.TEXTURE_2D, null);

        this.m_size = new _NS.Vector2(this.m_image.width, this.m_image.height);

        if (this.m_callback) {
    	   this.m_callback();
        }
};

_NS.Texture.prototype.getTextureId = function () {
	return this.m_textureId;
};

_NS.Texture.prototype.getSize = function () {
    return this.m_size;
};
