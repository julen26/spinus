var _NS = _NS || {};

/**
* Constructs a ShaderProgram object
* @class Represents a shader program
* @param {Context} context - Context
*/
_NS.ShaderProgram = function(context) {
    /**
    * WebGL shader program
    * @type WebGLProgram
    */
    this.shaderProgramId = context.gl.createProgram();
    /**
    * Shader array
    * @type Shader[]
    */
    this.shaders = [];
    /**
    * Context
    * @type Context
    */
    this.context = context;
    /**
    * Hash of uniforms
    * @type Object<string, WebGLUniformLocation>
    */
    this.uniforms = {};
    /**
    * Hash of attributes
    * @type Object<string, int>
    */
    this.attributes = {};
};

/**
* Adds a new shader to the list
*
* @method
* @param {Shader} shader - Shader object
*/
_NS.ShaderProgram.prototype.attachShader = function (shader) {
    this.shaders.push(shader);
};

/**
* Attaches all shaders in the list and links the program
*
* @method
*/
_NS.ShaderProgram.prototype.link = function () {
    for (var i in this.shaders) {
        this.context.gl.attachShader(this.shaderProgramId, this.shaders[i].shaderId);
    }
    this.context.gl.linkProgram(this.shaderProgramId);
};

/**
* Uses the shader program and sets context current program
*
* @method
*/
_NS.ShaderProgram.prototype.use = function () {
    this.context.gl.useProgram(this.shaderProgramId);
    this.context.currentProgram = this;
};

/**
* Gets the location of the uniform mapped to a parameter. Creates and maps a new one if it doesn't exist.
*
* @method
* @param {string} parameter - Parameter name
* @return {WebGLUniformLocation} Location of the uniform
*/
_NS.ShaderProgram.prototype.getUniformLocation = function (parameter) {
    if (this.uniforms[parameter]) {
        return this.uniforms[parameter];
    }
    this.uniforms[parameter] = this.context.gl.getUniformLocation(this.shaderProgramId, parameter);
    return this.uniforms[parameter];
};

/**
* Gets the location of the attribute mapped to a parameter. Creates and maps a new one if it doesn't exist.
*
* @method
* @param {string} parameter - Parameter name
* @return {int} Location of the uniform
*/
_NS.ShaderProgram.prototype.getAttribLocation = function (parameter) {
    if (this.attributes[parameter]) {
        return this.attributes[parameter];
    }
    this.attributes[parameter] = this.context.gl.getAttribLocation(this.shaderProgramId, parameter);
    return this.attributes[parameter];
};

_NS.ShaderProgram.prototype.uniform1i = function (parameter, x) {
    var uniform = this.getUniformLocation(parameter);
    this.context.gl.uniform1i(uniform, x);
};

_NS.ShaderProgram.prototype.uniform1f = function (parameter, x) {
    var uniform = this.getUniformLocation(parameter);
    this.context.gl.uniform1f(uniform, x);
};

_NS.ShaderProgram.prototype.uniform2i = function (parameter, x, y) {
    var uniform = this.getUniformLocation(parameter);
    this.context.gl.uniform2i(uniform, x, y);
};

_NS.ShaderProgram.prototype.uniform2f = function (parameter, x, y) {
    var uniform = this.getUniformLocation(parameter);
    this.context.gl.uniform2f(uniform, x, y);
};

_NS.ShaderProgram.prototype.uniform3i = function (parameter, x, y, z) {
    var uniform = this.getUniformLocation(parameter);
    this.context.gl.uniform3i(uniform, x, y, z);
};

_NS.ShaderProgram.prototype.uniform3f = function (parameter, x, y, z) {
    var uniform = this.getUniformLocation(parameter);
    this.context.gl.uniform3f(uniform, x, y, z);
};

_NS.ShaderProgram.prototype.uniform4i = function (parameter, x, y, z, w) {
    var uniform = this.getUniformLocation(parameter);
    this.context.gl.uniform4i(uniform, x, y, z, w);
};

_NS.ShaderProgram.prototype.uniform4f = function (parameter, x, y, z, w) {
    var uniform = this.getUniformLocation(parameter);
    this.context.gl.uniform4f(uniform, x, y, z, w);
};