var _NS = _NS || {};

/**
* Constructs Shader objects
* @class Represents a Shader object
* @param {Context} context - Context
*/
_NS.Shader = function(context) {
    /**
    * WebGLShader object
    * @type WebGLShader
    */
    this.m_shaderId = null;
    /**
    * Context
    * @type Context
    */
    this.m_context = context;
};

/**
* Enum for shader types
* @enum {int}
*/
_NS.Shader.Types = {
    /** Vertex shader */
    VertexShader : 0,
    /** Fragment shader */
    FragmentShader : 1
};

/**
* Gets the internal WebGLShader object
*
* @method
* @returns {WebGLShader} Internal WebGL shader object
*/
_NS.Shader.prototype.getShaderId = function () {
    return this.m_shaderId;
};

/**
* Compiles the shader source of the given type
*
* @method
* @param {string} data - Shader source code
* @param {Types} shaderType - Shader type
*/
_NS.Shader.prototype.compile = function (data, shaderType) {
    var gl = this.m_context.GL();

    var realType;
    if (shaderType == _NS.Shader.Types.VertexShader) {
        realType = gl.VERTEX_SHADER;
    }
    else if (shaderType == _NS.Shader.Types.FragmentShader) {
        realType = gl.FRAGMENT_SHADER;
    }
    this.m_shaderId = gl.createShader(realType);
    gl.shaderSource(this.m_shaderId, data);
    gl.compileShader(this.m_shaderId);
    //alert(gl.getShaderInfoLog(this.m_shaderId));
};

/**
* Loads and compiles the shader from a script in HTML
*
* @method
* @param {string} scriptId - ID of the script tag
*/
_NS.Shader.prototype.loadFromScript = function (scriptId) {
    var gl = this.m_context.GL();
    
    var shaderScript = document.getElementByTag(scriptId);
    var shaderSource = shaderScript.text;

    var shaderType;
    if (shaderScript.type == "x-shader/x-fragment") {
        shaderType = _NS.Shader.Types.FragmentShader;
    }
    else if (shaderScript.type == "x-shader/x-vertex") {
        shaderType = _NS.Shader.Types.VertexShader;
    }

    this.compile(gl, shaderSource, shaderType);
};

/**
* Constructs a VertexShader2D object
* @class Represents a vertex shader for 2D games
* @param {Context} context - Context
* @param {bool} hasTexture - If the shader has texture
*/
_NS.VertexShader2D = function (context, hasTexture) {
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
    , _NS.Shader.Types.VertexShader);
    return shader;
};

/**
* Constructs a FragmentShader2D object
* @class Represents a fragment shader for 2D games
* @param {Context} context - Context
* @param {bool} hasTexture - If the shader has texture
*/
_NS.FragmentShader2D = function (context, hasTexture) {
    hasTexture = hasTexture || false;
    var shader = new _NS.Shader(context);
    shader.compile(
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
        , _NS.Shader.Types.FragmentShader);
    return shader;
};