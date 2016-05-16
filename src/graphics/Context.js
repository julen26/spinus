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

    //Load default shaders
    var vertexShader = new _NS.VertexShader2D(this);
    var fragmentShader = new _NS.FragmentShader2D(this);
    var program = new _NS.ShaderProgram(this);
    program.attachShader(vertexShader);
    program.attachShader(fragmentShader);
    program.link();

    var vertexShaderTextured = new _NS.VertexShader2D(this, true);
    var fragmentShaderTextured = new _NS.FragmentShader2D(this, true);
    var programTextured = new _NS.ShaderProgram(this);
    programTextured.attachShader(vertexShaderTextured);
    programTextured.attachShader(fragmentShaderTextured);
    programTextured.link();

    /**
    * Default shader program
    * @type ShaderProgram 
    */
    this.m_defaultProgram = program;

    /**
    * Default shader program for textured drawings
    * @type ShaderProgram 
    */
    this.m_defaultProgramTextured = programTextured;

    //Initialize buffer
    this.initBuffers();

    this.m_gl.viewport(0, 0, this.m_viewportWidth, this.m_viewportHeight);
    this.m_gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.m_gl.enable(this.m_gl.BLEND);
    this.m_gl.blendFunc(this.m_gl.SRC_ALPHA, this.m_gl.ONE_MINUS_SRC_ALPHA);
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
_NS.Context.prototype.getDefaultProgram = function() {
    return this.m_defaultProgram;
}

/**
* Get default textured shader program
*
* @method
* @returns {ShaderProgram} Default textured shader program
*/
_NS.Context.prototype.getDefaultProgramTextured = function() {
    return this.m_defaultProgramTextured;
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
    this.vertexTexCoorsBuffer = this.m_gl.createBuffer();
}

/**
* Draws a drawable object
*
* @method
* @param {Drawable} drawable - Drawable object
*/
_NS.Context.prototype.draw = function(drawable, renderOptions) {
    //Load default render options
    if (!renderOptions) {
        renderOptions = new _NS.RenderOptions();
        renderOptions.shader = this.getDefaultProgram();
    }
    drawable.draw(this, renderOptions);
};

/**
* Draws vertices
*
* @method
* @param {List} vertices - Vertices list
* @param {PrimitiveType} type - Primitive type
*/
_NS.Context.prototype.drawVertices = function(vertices, type, renderOptions) {
    //Load default render options
    if (!renderOptions) {
        renderOptions = new _NS.RenderOptions();
        renderOptions.shader = this.getDefaultProgram();
    }

    var gl = this.GL();

    if (renderOptions.shader) {
        renderOptions.shader.use();
    }

    //Positions
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
    var positions = _NS.VertexArray.getPositionArray(vertices);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    //Colors
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
    var colors = _NS.VertexArray.getColorArray(vertices);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    //Texture coordinates
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTexCoorsBuffer);
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

    renderOptions.shader.uniform2f("u_resolution", this.m_viewportWidth, this.m_viewportHeight);
    var transformMatrix = renderOptions.transform.getMatrix();
    renderOptions.shader.uniformMatrix4fv("u_transform", transformMatrix);

    //Find WebGL primitive type
    var modes = [gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, gl.TRIANGLES, gl.TRIANGLE_STRIP, gl.TRIANGLE_FAN];
    var mode = modes[type];

    //Draw primitives
    gl.drawArrays(mode, 0, vertices.length);
};  
