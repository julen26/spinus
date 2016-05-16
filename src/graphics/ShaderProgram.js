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
    this.m_shaderProgramId = context.GL().createProgram();
    /**
    * Shader array
    * @type Shader[]
    */
    this.m_shaders = [];
    /**
    * Context
    * @type Context
    */
    this.m_context = context;
    /**
    * Hash of uniforms
    * @type Object<string, WebGLUniformLocation>
    */
    this.m_uniforms = {};
    /**
    * Hash of attributes
    * @type Object<string, int>
    */
    this.m_attributes = {};
};

/**
* Adds a new shader to the list
*
* @method
* @param {Shader} shader - Shader object
*/
_NS.ShaderProgram.prototype.attachShader = function (shader) {
    this.m_shaders.push(shader);
};

/**
* Attaches all shaders in the list and links the program
*
* @method
*/
_NS.ShaderProgram.prototype.link = function () {
    var gl = this.m_context.GL();

    for (var i in this.m_shaders) {
        gl.attachShader(this.m_shaderProgramId, this.m_shaders[i].getShaderId());
    }
    gl.linkProgram(this.m_shaderProgramId);
};

/**
* Uses the shader program and sets context current program
*
* @method
*/
_NS.ShaderProgram.prototype.use = function () {
    var gl = this.m_context.GL();

    gl.useProgram(this.m_shaderProgramId);
};

/**
* Gets the location of the uniform mapped to a parameter. Creates and maps a new one if it doesn't exist.
*
* @method
* @param {string} parameter - Parameter name
* @return {WebGLUniformLocation} Location of the uniform
*/
_NS.ShaderProgram.prototype.getUniformLocation = function (parameter) {
    var gl = this.m_context.GL();

    if (this.m_uniforms[parameter]) {
        return this.m_uniforms[parameter];
    }
    this.m_uniforms[parameter] = gl.getUniformLocation(this.m_shaderProgramId, parameter);
    return this.m_uniforms[parameter];
};

/**
* Gets the location of the attribute mapped to a parameter. Creates and maps a new one if it doesn't exist.
*
* @method
* @param {string} parameter - Parameter name
* @return {int} Location of the uniform
*/
_NS.ShaderProgram.prototype.getAttribLocation = function (parameter) {
    var gl = this.m_context.GL();

    if (this.m_attributes[parameter]) {
        return this.m_attributes[parameter];
    }
    this.m_attributes[parameter] = gl.getAttribLocation(this.m_shaderProgramId, parameter);
    return this.m_attributes[parameter];
};

_NS.ShaderProgram.prototype.uniform1i = function (parameter, x) {
    var gl = this.m_context.GL();
    var uniform = this.getUniformLocation(parameter);
    gl.uniform1i(uniform, x);
};

_NS.ShaderProgram.prototype.uniform1f = function (parameter, x) {
    var gl = this.m_context.GL();
    var uniform = this.getUniformLocation(parameter);
    gl.uniform1f(uniform, x);
};

_NS.ShaderProgram.prototype.uniform2i = function (parameter, x, y) {
    var gl = this.m_context.GL();
    var uniform = this.getUniformLocation(parameter);
    gl.uniform2i(uniform, x, y);
};

_NS.ShaderProgram.prototype.uniform2f = function (parameter, x, y) {
    var gl = this.m_context.GL();
    var uniform = this.getUniformLocation(parameter);
    gl.uniform2f(uniform, x, y);
};

_NS.ShaderProgram.prototype.uniform3i = function (parameter, x, y, z) {
    var gl = this.m_context.GL();
    var uniform = this.getUniformLocation(parameter);
    gl.uniform3i(uniform, x, y, z);
};

_NS.ShaderProgram.prototype.uniform3f = function (parameter, x, y, z) {
    var gl = this.m_context.GL();
    var uniform = this.getUniformLocation(parameter);
    gl.uniform3f(uniform, x, y, z);
};

_NS.ShaderProgram.prototype.uniform4i = function (parameter, x, y, z, w) {
    var gl = this.m_context.GL();
    var uniform = this.getUniformLocation(parameter);
    gl.uniform4i(uniform, x, y, z, w);
};

_NS.ShaderProgram.prototype.uniform4f = function (parameter, x, y, z, w) {
    var gl = this.m_context.GL();
    var uniform = this.getUniformLocation(parameter);
    gl.uniform4f(uniform, x, y, z, w);
};

_NS.ShaderProgram.prototype.uniformMatrix4fv = function (parameter, v) {
    var gl = this.m_context.GL();
    var uniform = this.getUniformLocation(parameter);
    gl.uniformMatrix4fv(uniform, gl.FALSE, new Float32Array(v));
};

//TODO: Rest of uniforms