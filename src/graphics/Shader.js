var _NS = _NS || {};

/**
* Constructs Shader objects
* @class Represents a Shader object
* @param {Context} context - Context
*/
_NS.Shader = function(context) {
    /**
    * WebGLProgram object
    * @type WebGLProgram
    */
    this.m_shaderProgram = null;
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
* Gets the internal WebGLProgram object
*
* @method
* @returns {WebGLProgram} Internal WebGLProgram object
*/
_NS.Shader.prototype.getShaderProgram = function () {
    return this.m_shaderProgram;
};

/**
* Compiles the shader source of the given type
*
* @method
* @param {string} data - Shader source code
* @param {Types} shaderType - Shader type
*/
_NS.Shader.prototype.compile = function (vertexShaderSource, fragmentShaderSource) {
    var gl = this.m_context.GL();

    if (this.m_shaderProgram) {
        gl.deleteProgram(this.m_shaderProgram);
    }
    this.m_shaderProgram = gl.createProgram();

    if (vertexShaderSource) {
        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertexShaderSource);
        gl.compileShader(vertexShader);
        gl.attachShader(this.m_shaderProgram, vertexShader);
    }

    if (fragmentShaderSource) {
        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fragmentShaderSource);
        gl.compileShader(fragmentShader);
        gl.attachShader(this.m_shaderProgram, fragmentShader);
    }

    gl.linkProgram(this.m_shaderProgram);
    //alert(gl.getShaderInfoLog(this.m_shaderId));
};

/**
* Loads and compiles the shader from a script in HTML
*
* @method
* @param {string} scriptId - ID of the script tag
*/
_NS.Shader.prototype.loadFromScript = function (vertexShaderScriptId, fragmentShaderScriptId) {
    var gl = this.m_context.GL();
    
    var vertexShaderScript = document.getElementById(vertexShaderScriptId);
    var fragmentShaderScript = document.getElementById(fragmentShaderScriptId);

    this.compile(vertexShaderScript.text, fragmentShaderScript.text);
};

/**
* Uses the shader
*
* @method
*/
_NS.Shader.prototype.use = function () {
    var gl = this.m_context.GL();

    gl.useProgram(this.m_shaderProgram);
};

/**
* Gets the location of the uniform mapped to a parameter. Creates and maps a new one if it doesn't exist.
*
* @method
* @param {string} parameter - Parameter name
* @return {WebGLUniformLocation} Location of the uniform
*/
_NS.Shader.prototype.getUniformLocation = function (parameter) {
    var gl = this.m_context.GL();

    if (this.m_uniforms[parameter]) {
        return this.m_uniforms[parameter];
    }
    this.m_uniforms[parameter] = gl.getUniformLocation(this.m_shaderProgram, parameter);
    return this.m_uniforms[parameter];
};

/**
* Gets the location of the attribute mapped to a parameter. Creates and maps a new one if it doesn't exist.
*
* @method
* @param {string} parameter - Parameter name
* @return {int} Location of the uniform
*/
_NS.Shader.prototype.getAttribLocation = function (parameter) {
    var gl = this.m_context.GL();

    if (this.m_attributes[parameter]) {
        return this.m_attributes[parameter];
    }
    this.m_attributes[parameter] = gl.getAttribLocation(this.m_shaderProgram, parameter);
    return this.m_attributes[parameter];
};

_NS.Shader.prototype.uniform1i = function (parameter, x) {
    var gl = this.m_context.GL();
    var uniform = this.getUniformLocation(parameter);
    gl.uniform1i(uniform, x);
};

_NS.Shader.prototype.uniform1f = function (parameter, x) {
    var gl = this.m_context.GL();
    var uniform = this.getUniformLocation(parameter);
    gl.uniform1f(uniform, x);
};

_NS.Shader.prototype.uniform2i = function (parameter, x, y) {
    var gl = this.m_context.GL();
    var uniform = this.getUniformLocation(parameter);
    gl.uniform2i(uniform, x, y);
};

_NS.Shader.prototype.uniform2f = function (parameter, x, y) {
    var gl = this.m_context.GL();
    var uniform = this.getUniformLocation(parameter);
    gl.uniform2f(uniform, x, y);
};

_NS.Shader.prototype.uniform3i = function (parameter, x, y, z) {
    var gl = this.m_context.GL();
    var uniform = this.getUniformLocation(parameter);
    gl.uniform3i(uniform, x, y, z);
};

_NS.Shader.prototype.uniform3f = function (parameter, x, y, z) {
    var gl = this.m_context.GL();
    var uniform = this.getUniformLocation(parameter);
    gl.uniform3f(uniform, x, y, z);
};

_NS.Shader.prototype.uniform4i = function (parameter, x, y, z, w) {
    var gl = this.m_context.GL();
    var uniform = this.getUniformLocation(parameter);
    gl.uniform4i(uniform, x, y, z, w);
};

_NS.Shader.prototype.uniform4f = function (parameter, x, y, z, w) {
    var gl = this.m_context.GL();
    var uniform = this.getUniformLocation(parameter);
    gl.uniform4f(uniform, x, y, z, w);
};

_NS.Shader.prototype.uniformMatrix4fv = function (parameter, v) {
    var gl = this.m_context.GL();
    var uniform = this.getUniformLocation(parameter);
    gl.uniformMatrix4fv(uniform, gl.FALSE, new Float32Array(v));
};

//TODO: Rest of uniforms

/**
* Constructs a DefaultShader object
* @class Represents a shader for 2D games
* @param {Context} context - Context
* @param {bool} hasTexture - If the shader has texture
*/
_NS.DefaultShader = function (context, hasTexture) {
    hasTexture = hasTexture || false;
    var shader = new _NS.Shader(context);
    shader.compile(
            "\n#define hasTexture " + ((hasTexture == true) ? "1" : "0") + "\n"
        +   "\n#if hasTexture\n"
        +      "attribute vec2 a_texCoord;"
        +      "varying vec2 v_texCoord;"
        +   "\n#endif\n"
        +   "attribute vec2 a_position;"
        +   "attribute vec4 a_color;"
        +   "uniform vec2 u_resolution;"
        +   "uniform mat4 u_transform;"
        +   "varying vec4 v_color;"
        +   "void main() {"
        +       "\n#if hasTexture\n"
        +          "v_texCoord = a_texCoord;"
        +       "\n#endif\n"
        +       "mat4 projection2d = mat4(2.0 / u_resolution.x, 0, 0, 0, 0, -2.0 / u_resolution.y, 0, 0, 0, 0, 1, 0, -1, 1, 0, 1);"
        +       "gl_Position = vec4( (projection2d * u_transform * vec4(a_position, 0, 1)).xy, 0, 1);"
        +       "v_color = a_color;"
        +   "}"
        ,
            "precision mediump float;"
        +   "\n#define hasTexture " + ((hasTexture  == true) ? "1" : "0") + "\n"
        +   "\n#if hasTexture\n"
        +       "uniform sampler2D u_image;"
        +       "varying vec2 v_texCoord;"
        +   "\n#endif\n"
        +   "varying vec4 v_color;"
        +   "void main() {"
        +       "\n#if hasTexture\n"
        +           "vec4 tex = texture2D(u_image, v_texCoord);"
        +           "gl_FragColor = tex * v_color;"
        +       "\n#else\n"
        +           "gl_FragColor = v_color;"
        +       "\n#endif\n"
        +   "}"
        );
    return shader;
};
