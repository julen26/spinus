// Copyright (c) 2017 Julen Salgado. All rights reserved.

/**
* @fileoverview Implementation of shader sources and shader programs unified in one shader class
* @author Julen Salgado (julensalgado@gmail.com)
*/

goog.provide('sp.Shader');
goog.provide('sp.DefaultShader');
goog.require('sp');

/**
* Constructs Shader objects
* @class Represents a Shader object
* @param {sp.Context} context Context
*/
sp.Shader = function(context) {
    /** @private */
    this.shaderProgram_ = null;
    /** @private */
    this.context_ = context;
    /**
    * Hash of uniforms
    * @private
    */
    this.uniforms_ = {};
    /**
    * Hash of attributes
    * @private
    */
    this.attributes_ = {};
};

/**
* Gets the internal WebGLProgram object
*
* @method
* @returns {WebGLProgram} Internal WebGLProgram object
*/
sp.Shader.prototype.getShaderProgram = function () {
    return this.shaderProgram_;
};

/**
* Compiles the shader source codes
*
* @method
* @param {string} vertexShaderSource Vertex shader source code
* @param {string} fragmentShaderSource Fragment shader source code
*/
sp.Shader.prototype.compile = function (vertexShaderSource, fragmentShaderSource) {
    var gl = this.context_.GL();

    if (this.shaderProgram_) {
        gl.deleteProgram(this.shaderProgram_);
    }
    this.shaderProgram_ = gl.createProgram();

    if (vertexShaderSource) {
        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertexShaderSource);
        gl.compileShader(vertexShader);
        gl.attachShader(this.shaderProgram_, vertexShader);
    }

    if (fragmentShaderSource) {
        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fragmentShaderSource);
        gl.compileShader(fragmentShader);
        gl.attachShader(this.shaderProgram_, fragmentShader);
    }

    gl.linkProgram(this.shaderProgram_);
    //alert(gl.getShaderInfoLog(this.m_shaderId));
};

/**
* Loads and compiles the shader from scripts in HTML
*
* @method
* @param {string} vertexShaderScriptId ID of the script tag that contains the vertex shader
* @param {string} fragmentShaderScriptId ID of the script tag that contains the fragment shader
*/
sp.Shader.prototype.loadFromScript = function (vertexShaderScriptId, fragmentShaderScriptId) {
    var gl = this.context_.GL();
    
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
    var gl = this.context_.GL();

    gl.useProgram(this.shaderProgram_);
};

/**
* Gets the location of the uniform mapped to a parameter. Creates and maps a new one if it doesn't exist.
*
* @method
* @param {string} parameter Parameter name
* @return {WebGLUniformLocation} Location of the uniform
*/
sp.Shader.prototype.getUniformLocation = function (parameter) {
    var gl = this.context_.GL();

    if (this.uniforms_[parameter]) {
        return this.uniforms_[parameter];
    }
    this.uniforms_[parameter] = gl.getUniformLocation(this.shaderProgram_, parameter);
    return this.uniforms_[parameter];
};

/**
* Gets the location of the attribute mapped to a parameter. Creates and maps a new one if it doesn't exist.
*
* @method
* @param {string} parameter Parameter name
* @return {int} Location of the uniform
*/
sp.Shader.prototype.getAttribLocation = function (parameter) {
    var gl = this.context_.GL();

    if (this.attributes_[parameter]) {
        return this.attributes_[parameter];
    }
    this.attributes_[parameter] = gl.getAttribLocation(this.shaderProgram_, parameter);
    return this.attributes_[parameter];
};

//TODO: Possible improvement autochecking the uniform type
//TODO: Check if values is an array
/**
* Set values for an integer parameter of the shader
*
* @method
* @param {string} parameter Parameter name
* @param {int[]} values Array of integers
*/
sp.Shader.prototype.uniformiv = function (parameter, values) {
    var gl = this.context_.GL();
    var uniform = this.getUniformLocation(parameter);
    var length = values.length;
    if (length > 0 && length < 5)
    {
        gl['uniform' + length + 'iv'](uniform, new int32Array(values));
    }
};

/**
* Set values for a float parameter of the shader
*
* @method
* @param {string} parameter Parameter name
* @param {float[]} values Array of floats
*/
sp.Shader.prototype.uniformfv = function (parameter, values) {
    var gl = this.context_.GL();
    var uniform = this.getUniformLocation(parameter);
    var length = values.length;
    if (length > 0 && length < 5)
    {
        gl['uniform' + length + 'fv'](uniform, new Float32Array(values));
    }
};

/**
* Set values for a matrix parameter of the shader
*
* @method
* @param {string} parameter Parameter name
* @param {float[]} values Array of floats that represents matrix content 
*/
sp.Shader.prototype.uniformMatrixfv = function (parameter, values) {
    var gl = this.context_.GL();
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
* @param {sp.Context} context Context
* @param {bool} hasTexture If the shader has texture
*/
sp.DefaultShader = function (context, hasTexture) {
    hasTexture = hasTexture || false;
    var shader = new sp.Shader(context);
    shader.compile(
            '\n#define hasTexture ' + ((hasTexture == true) ? '1' : '0') + '\n'
        +   '\n#if hasTexture\n'
        +      'attribute vec2 a_texCoord;'
        +      'varying vec2 v_texCoord;'
        +   '\n#endif\n'
        +   'attribute vec2 a_position;'
        +   'attribute vec4 a_color;'
        +   'uniform vec2 u_resolution;'
        +   'uniform mat4 u_transform;'
        +   'uniform mat4 u_view;'
        +   'uniform mat4 u_projection;'
        +   'varying vec4 v_color;'
        +   'void main() {'
        +       '\n#if hasTexture\n'
        +          'v_texCoord = a_texCoord;'
        +       '\n#endif\n'
        +       'gl_Position = vec4( (u_projection * u_view * u_transform * vec4(a_position, 0, 1)).xy, 0, 1);'
        +       'v_color = a_color;'
        +   '}'
        ,
            'precision mediump float;'
        +   '\n#define hasTexture ' + ((hasTexture  == true) ? '1' : '0') + '\n'
        +   '\n#if hasTexture\n'
        +       'uniform sampler2D u_image;'
        +       'varying vec2 v_texCoord;'
        +   '\n#endif\n'
        +   'varying vec4 v_color;'
        +   'void main() {'
        +       '\n#if hasTexture\n'
        +           'vec4 tex = texture2D(u_image, v_texCoord);'
        +           'gl_FragColor = tex * v_color;'
        +       '\n#else\n'
        +           'gl_FragColor = v_color;'
        +       '\n#endif\n'
        +   '}'
        );
    return shader;
};
