var _NS = _NS || {};

/**
* Constructs Context objects
* @class Represents a Context object
* @param {string} canvasId - ID of the canvas element
*/
_NS.Context = function(canvasId) {
    /**
    * Canvas element
    * @type HTMLElement
    */
    this.m_canvas = document.getElementById(canvasId);

    /**
    * WebGL rendering context
    * @type WebGLRenderingContext 
    */
    this.m_gl = null;

    if (!this.m_canvas) {
        throw "Specified canvas element is missing.";
    }

    if (window.WebGLRenderingContext) {
        this.m_gl = this.m_canvas.getContext("webgl") || this.m_canvas.getContext("experimental-webgl");   
    }
    else {
        throw "WebGL context is required and it's not supported by the browser."
    }

    if (!this.m_gl) {
        throw "Unable to initialize a valid context. Your browser may not support it."
    }

    /**
    * Viewport width
    * @type int 
    */
    this.m_viewportWidth = this.m_canvas.width;
    /**
    * Viewport height
    * @type int 
    */
    this.m_viewportHeight = this.m_canvas.height;
    /**
    * Default shader program
    * @type Shader
    */
    this.m_defaultShader = new _NS.DefaultShader(this);

    /**
    * Default shader program for textured drawings
    * @type Shader
    */
    this.m_defaultShaderTextured = new _NS.DefaultShader(this, true);

    //Initialize buffer
    this.initBuffers();

    this.m_gl.viewport(0, 0, this.m_viewportWidth, this.m_viewportHeight);
    this.m_gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.m_gl.enable(this.m_gl.BLEND);
    this.m_gl.clear(this.m_gl.COLOR_BUFFER_BIT); 
};

/**
* Get Canvas element
*
* @method
* @returns {HTMLElement} Canvas element
*/
_NS.Context.prototype.getCanvas = function() {
    return this.m_canvas;
}

/**
* Get WebGL rendering context
*
* @method
* @returns {WebGLRenderingContext} WebGL rendering context
*/
_NS.Context.prototype.GL = function() {
    return this.m_gl;
}

/**
* Get viewport width
*
* @method
* @returns {int} Viewport width
*/
_NS.Context.prototype.getViewportWidth = function() {
    return this.m_viewportWidth;
}

/**
* Get viewport height
*
* @method
* @returns {int} Viewport height
*/
_NS.Context.prototype.getViewportHeight = function() {
    return this.m_viewportHeight;
}

/**
* Get default shader program
*
* @method
* @returns {ShaderProgram} Default shader program
*/
_NS.Context.prototype.getDefaultShader = function() {
    return this.m_defaultShader;
}

/**
* Get default textured shader program
*
* @method
* @returns {ShaderProgram} Default textured shader program
*/
_NS.Context.prototype.getDefaultShaderTextured = function() {
    return this.m_defaultShaderTextured;
}

/**
* Initializes support buffers
*
* @method
*/
_NS.Context.prototype.initBuffers = function() {
    /**
    * Vertex position buffer
    * @type WebGLBuffer  
    */
    this.vertexPositionBuffer = this.m_gl.createBuffer();
    /**
    * Vertex color buffer
    * @type WebGLBuffer  
    */
    this.vertexColorBuffer = this.m_gl.createBuffer();
    /**
    * Vertex texture coords buffer
    * @type WebGLBuffer  
    */
    this.vertexTexCoordsBuffer = this.m_gl.createBuffer();
}

_NS.Context.prototype.clear = function(color) {
    color = color || new _NS.Color();
    this.m_gl.clearColor(color.r / 255, color.g / 255, color.b / 255, color.a / 255);
    this.m_gl.clear(this.m_gl.COLOR_BUFFER_BIT); 
}

/**
* Draws a drawable object
*
* @method
* @param {Drawable} drawable - Drawable object
*/
_NS.Context.prototype.draw = function(drawable, renderOptions) {
    drawable.draw(this, renderOptions || new _NS.RenderOptions());
};

/**
* Draws vertices
*
* @method
* @param {List} vertices - Vertices list
* @param {PrimitiveType} type - Primitive type
*/
_NS.Context.prototype.drawVertices = function(vertices, type, renderOptions) {
    var gl = this.GL();

    //Load default render options
    if (!renderOptions) {
        renderOptions = new _NS.RenderOptions();
        renderOptions.shader = this.getDefaultShader();
    }

    //Set blend mode
    var blendMode = renderOptions.blendMode;
    if (!blendMode) {
        blendMode = _NS.BlendMode.Alpha;
    }
    var factors = [gl.ZERO, gl.ONE, 
        gl.SRC_COLOR, gl.ONE_MINUS_SRC_COLOR, gl.DST_COLOR, gl.ONE_MINUS_DST_COLOR,
        gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.DST_ALPHA, gl.ONE_MINUS_DST_ALPHA,
        gl.SRC_ALPHA_SATURATE];
    var equations = [gl.FUNC_ADD, gl.FUNC_SUBTRACT, gl.FUNC_REVERSE_SUBTRACT];
    this.m_gl.blendFuncSeparate(factors[blendMode.srcColorFactor], factors[blendMode.dstColorFactor],
                                factors[blendMode.srcAlphaFactor], factors[blendMode.dstAlphaFactor]);
    this.m_gl.blendEquationSeparate(equations[blendMode.colorEquation], equations[blendMode.alphaEquation]);

    //Set shader
    if (!renderOptions.shader) {
        if (renderOptions.texture) {
            renderOptions.shader = this.getDefaultShaderTextured();
        }
        else {
            renderOptions.shader = this.getDefaultShader();
        }
    }
    renderOptions.shader.use();

    //Positions
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
    var positions = _NS.VertexArray.getPositionArray(vertices);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    //Colors
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
    var colors = _NS.VertexArray.getColorArray(vertices);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    //Texture coordinates
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTexCoordsBuffer);
    var texCoords = _NS.VertexArray.getTexCoordsArray(vertices);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);

    //Bind buffer to attributes
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
    var positionAttribute = renderOptions.shader.getAttribLocation("a_position");
    gl.enableVertexAttribArray(positionAttribute);
    gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
    var colorAttribute = renderOptions.shader.getAttribLocation("a_color");
    gl.enableVertexAttribArray(colorAttribute);
    gl.vertexAttribPointer(colorAttribute, 4, gl.FLOAT, false, 0, 0);

    if (renderOptions.texture) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTexCoordsBuffer);
        var texCoordsAttribute = renderOptions.shader.getAttribLocation("a_texCoord");
        gl.enableVertexAttribArray(texCoordsAttribute);
        gl.vertexAttribPointer(texCoordsAttribute, 2, gl.FLOAT, false, 0, 0);
    }

    renderOptions.shader.uniform2f("u_resolution", this.m_viewportWidth, this.m_viewportHeight);
    var transformMatrix = renderOptions.transform.getMatrix();
    renderOptions.shader.uniformMatrix4fv("u_transform", transformMatrix);

    if (renderOptions.texture) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, renderOptions.texture.getTextureId());
    }

    //Find WebGL primitive type
    var modes = [gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, gl.TRIANGLES, gl.TRIANGLE_STRIP, gl.TRIANGLE_FAN];
    var mode = modes[type];

    //Draw primitives
    gl.drawArrays(mode, 0, vertices.length);

    gl.bindTexture(gl.TEXTURE_2D, null);
};  
