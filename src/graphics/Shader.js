goog.provide('sp.Shader');
goog.provide('sp.DefaultShader');

/**
* Constructs Shader objects
* @class Represents a Shader object
* @param {Context} context - Context
*/
sp.Shader = function(context) {
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
sp.Shader.prototype.getShaderProgram = function () {
    return this.m_shaderProgram;
};

/**
* Compiles the shader source of the given type
*
* @method
* @param {string} data - Shader source code
* @param {Types} shaderType - Shader type
*/
sp.Shader.prototype.compile = function (vertexShaderSource, fragmentShaderSource) {
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
sp.Shader.prototype.loadFromScript = function (vertexShaderScriptId, fragmentShaderScriptId) {
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
sp.Shader.prototype.use = function () {
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
sp.Shader.prototype.getUniformLocation = function (parameter) {
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
sp.Shader.prototype.getAttribLocation = function (parameter) {
    var gl = this.m_context.GL();

    if (this.m_attributes[parameter]) {
        return this.m_attributes[parameter];
    }
    this.m_attributes[parameter] = gl.getAttribLocation(this.m_shaderProgram, parameter);
    return this.m_attributes[parameter];
};

//TODO: Possible improvement autochecking the uniform type
//TODO: Check if values is an array
sp.Shader.prototype.uniformiv = function (parameter, values) {
    var gl = this.m_context.GL();
    var uniform = this.getUniformLocation(parameter);
    var length = values.length;
    if (length > 0 && length < 5)
    {
        gl["uniform" + length + "iv"](uniform, new int32Array(values));
    }
};

sp.Shader.prototype.uniformfv = function (parameter, values) {
    var gl = this.m_context.GL();
    var uniform = this.getUniformLocation(parameter);
    var length = values.length;
    if (length > 0 && length < 5)
    {
        gl["uniform" + length + "fv"](uniform, new Float32Array(values));
    }
};

sp.Shader.prototype.uniformMatrixfv = function (parameter, values) {
    var gl = this.m_context.GL();
    var uniform = this.getUniformLocation(parameter);
    var length = values.length;
    if (length > 15) {
        gl.uniformMatrix4fv(uniform, gl.FALSE, new Float32Array(values));
    }
    else if (length > 8) {
        gl.uniformMatrix3fv(uniform, gl.FALSE, new Float32Array(values));
    }
    else if (length > 3) {
        gl.uniformMatrix2fv(uniform, gl.FALSE, new Float32Array(values));
    }
};

/**
* Constructs a DefaultShader object
* @class Represents a shader for 2D games
* @param {Context} context - Context
* @param {bool} hasTexture - If the shader has texture
*/
sp.DefaultShader = function (context, hasTexture) {
    hasTexture = hasTexture || false;
    var shader = new sp.Shader(context);
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
        +   "uniform mat4 u_view;"
        +   "uniform mat4 u_projection;"
        +   "varying vec4 v_color;"
        +   "void main() {"
        +       "\n#if hasTexture\n"
        +          "v_texCoord = a_texCoord;"
        +       "\n#endif\n"
        +       "gl_Position = vec4( (u_projection * u_view * u_transform * vec4(a_position, 0, 1)).xy, 0, 1);"
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
