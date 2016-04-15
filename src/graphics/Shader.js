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
    this.shaderId = null;
    /**
    * Context
    * @type Context
    */
    this.context = context;
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
* Compiles the shader source of the given type
*
* @method
* @param {string} data - Shader source code
* @param {Types} shaderType - Shader type
*/
_NS.Shader.prototype.compile = function (data, shaderType) {
    var realType;
    if (shaderType == _NS.Shader.Types.VertexShader) {
        realType = this.context.gl.VERTEX_SHADER;
    }
    else if (shaderType == _NS.Shader.Types.FragmentShader) {
        realType = this.context.gl.FRAGMENT_SHADER;
    }
    this.shaderId = this.context.gl.createShader(realType);
    this.context.gl.shaderSource(this.shaderId, data);
    this.context.gl.compileShader(this.shaderId);
    //alert(this.context.gl.getShaderInfoLog(this.shaderId));
};

/**
* Loads and compiles the shader from a script in HTML
*
* @method
* @param {string} scriptId - ID of the script tag
*/
_NS.Shader.prototype.loadFromScript = function (scriptId) {
    var shaderScript = document.getElementByTag(scriptId);
    var shaderSource = shaderScript.text;

    var shaderType;
    if (shaderScript.type == "x-shader/x-fragment") {
        shaderType = _NS.Shader.Types.FragmentShader;
    }
    else if (shaderScript.type == "x-shader/x-vertex") {
        shaderType = _NS.Shader.Types.VertexShader;
    }

    this.compile(this.context.gl, shaderSource, shaderType);
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
        +   "varying vec4 v_color;"
        +   "void main() {"
        +       "\n#if hasTexture\n"
        +          "v_texCoord = a_texCoord;"
        +       "\n#endif\n"
        +       "vec2 zeroToOne = a_position / u_resolution;"
        +       "vec2 zeroToTwo = zeroToOne * 2.0;"
        +       "vec2 clipSpace = zeroToTwo - 1.0;"
        +       "gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);"
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