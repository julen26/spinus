var _NS = _NS || {};

/**
* Constructs Context objects
* @class Represents a Context object
* @param {string} canvasId - ID of the canvas element
*/
_NS.Context = function(canvasId) {
    /**
    * Canvas element
    * @type string
    */
    this.canvas = document.getElementById(canvasId);

    /**
    * Canvas rendering context
    * @type CanvasRenderingContext2D 
    */
    this.ctx = null;
    /**
    * WebGL rendering context
    * @type WebGLRenderingContext 
    */
    this.gl = null;

    if (!this.canvas) {
        throw "Specified canvas element is missing.";
    }

    if (window.WebGLRenderingContext) {
        this.gl = this.canvas.getContext("webgl") || this.canvas.getContext("experimental-webgl");   
    }
    else {
        throw "WebGL context is required and it's not supported by the browser."
    }

    if (!this.gl) {
        throw "Unable to initialize a valid context. Your browser may not support it."
    }

    /**
    * Viewport width
    * @type int 
    */
    this.viewportWidth = this.canvas.width;
    /**
    * Viewport height
    * @type int 
    */
    this.viewportHeight = this.canvas.height;

    var vertexShader = new _NS.VertexShader2D(this);
    var fragmentShader = new _NS.FragmentShader2D(this);
    var program = new _NS.ShaderProgram(this);
    program.attachShader(vertexShader);
    program.attachShader(fragmentShader);
    program.link();
    program.use(); //this.currentProgram = program

    /**
    * Default shader program
    * @type ShaderProgram 
    */
    this.defaultProgram = program;

    var vertexShaderTextured = new _NS.VertexShader2D(this, true);
    var fragmentShaderTextured = new _NS.FragmentShader2D(this, true);
    var programTextured = new _NS.ShaderProgram(this);
    programTextured.attachShader(vertexShaderTextured);
    programTextured.attachShader(fragmentShaderTextured);
    programTextured.link();

    /**
    * Default shader program for textured drawings
    * @type ShaderProgram 
    */
    this.defaultProgramTextured = programTextured;

    //Initialize buffer
    this.initBuffers();

    this.gl.viewport(0, 0, this.viewportWidth, this.viewportHeight);
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT); 
};

/**
* Initializes support buffers

* @method
*/
_NS.Context.prototype.initBuffers = function() {
    /**
    * Vertex position buffer
    * @type WebGLBuffer  
    */
    this.vertexPositionBuffer = this.gl.createBuffer();
    /**
    * Vertex color buffer
    * @type WebGLBuffer  
    */
    this.vertexColorBuffer = this.gl.createBuffer();
    /**
    * Vertex texture coords buffer
    * @type WebGLBuffer  
    */
    this.vertexTexCoorsBuffer = this.gl.createBuffer();
}

/**
* Draws a drawable object

* @method
* @param {Drawable} drawable - Drawable object
*/
_NS.Context.prototype.draw = function(drawable) {
    drawable.draw(this);
};

/**
* Draws vertices

* @method
* @param {List} vertices - Vertices list
* @param {PrimitiveType} type - Primitive type
*/
_NS.Context.prototype.drawVertices = function(vertices, type) {
    //TODO: use shader

    //Positions
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexPositionBuffer);
    var positions = _NS.VertexArray.getPositionArray(vertices);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);

    //Colors
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexColorBuffer);
    var colors = _NS.VertexArray.getColorArray(vertices);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(colors), this.gl.STATIC_DRAW);

    //Texture coordinates
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexTexCoorsBuffer);
    var texCoords = _NS.VertexArray.getTexCoordsArray(vertices);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(texCoords), this.gl.STATIC_DRAW);

    //Bind buffer to attributes
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexPositionBuffer);
    var positionAttribute = this.currentProgram.getAttribLocation("a_position");
    this.gl.enableVertexAttribArray(positionAttribute);
    this.gl.vertexAttribPointer(positionAttribute, 2, this.gl.FLOAT, false, 0, 0);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexColorBuffer);
    var colorAttribute = this.currentProgram.getAttribLocation("a_color");
    this.gl.enableVertexAttribArray(colorAttribute);
    this.gl.vertexAttribPointer(colorAttribute, 4, this.gl.FLOAT, false, 0, 0);

    this.currentProgram.uniform2f("u_resolution", this.viewportWidth, this.viewportHeight);

    //Find WebGL primitive type
    var modes = [this.gl.POINTS, this.gl.LINES, this.gl.LINE_STRIP, this.gl.LINE_LOOP, this.gl.TRIANGLES, this.gl.TRIANGLE_STRIP, this.gl.TRIANGLE_FAN];
    var mode = modes[type];

    //Draw primitives
    this.gl.drawArrays(mode, 0, vertices.length);
};  
