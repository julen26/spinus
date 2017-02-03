goog.provide('sp.Context');
goog.require('sp.RenderOptions');
goog.require('sp.DefaultShader');
goog.require('sp.View');
goog.require('sp.Color');
goog.require('sp.BlendMode');

/**
* Constructs Context objects
* @class Represents a Context object
* @param {string} canvasId - ID of the canvas element
*/
sp.Context = function(canvasId) {
    /** @protected */
    this.canvas_ = document.getElementById(canvasId);

    /** @protected */
    this.gl_ = null;

    if (!this.canvas_) {
        throw "Specified canvas element is missing.";
    }

    if (window.WebGLRenderingContext) {
        this.gl_ = this.canvas_.getContext("webgl") || this.canvas_.getContext("experimental-webgl");   
    }
    else {
        throw "WebGL context is required and it's not supported by the browser."
    }

    if (!this.gl_) {
        throw "Unable to initialize a valid context. Your browser may not support it."
    }

    /** @protected */
    this.viewportWidth_ = this.canvas_.width;
    /** @protected */
    this.viewportHeight_ = this.canvas_.height;

    /** @protected */
    this.defaultView_ = new sp.View(this.viewportWidth_, this.viewportHeight_);
    /** @protected */
    this.currentView_ = this.defaultView_;

    /** @protected */
    this.defaultShader_ = new sp.DefaultShader(this);
    /** @protected */
    this.defaultShaderTextured_ = new sp.DefaultShader(this, true);

    //Initialize buffer
    /** @protected */
    this.vertexPositionBuffer = this.gl_.createBuffer();
    /** @protected */
    this.vertexColorBuffer = this.gl_.createBuffer();
    /** @protected */
    this.vertexTexCoordsBuffer = this.gl_.createBuffer();

    this.gl_.viewport(0, 0, this.viewportWidth_, this.viewportHeight_);
    this.gl_.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl_.enable(this.gl_.BLEND);
    this.gl_.clear(this.gl_.COLOR_BUFFER_BIT); 
};

/**
* Get Canvas element
*
* @method
* @returns {HTMLElement} Canvas element
*/
sp.Context.prototype.getCanvas = function() {
    return this.canvas_;
}

/**
* Get WebGL rendering context
*
* @method
* @returns {WebGLRenderingContext} WebGL rendering context
*/
sp.Context.prototype.GL = function() {
    return this.gl_;
}

/**
* Get viewport width
*
* @method
* @returns {int} Viewport width
*/
sp.Context.prototype.getViewportWidth = function() {
    return this.viewportWidth_;
}

/**
* Get viewport height
*
* @method
* @returns {int} Viewport height
*/
sp.Context.prototype.getViewportHeight = function() {
    return this.viewportHeight_;
}

/**
* Get current active view
*
* @method
* @returns {View} Current view
*/
sp.Context.prototype.getView = function() {
    return this.currentView_;
}

/**
* Set current view
*
* @method
* @param {View} view - View
*/
sp.Context.prototype.setView = function(view) {
    return this.currentView_ = view;
}

/**
* Get default shader
*
* @method
* @returns {Shader} Default shader
*/
sp.Context.prototype.getDefaultShader = function() {
    return this.defaultShader_;
}

/**
* Get default textured shader
*
* @method
* @returns {Shader} Default textured shader
*/
sp.Context.prototype.getDefaultShaderTextured = function() {
    return this.defaultShaderTextured_;
}

/**
* Clear the context with an optional color
*
* @method
* @param {Color} color - Clear color
*/
sp.Context.prototype.clear = function(color) {
    color = color || new sp.Color();
    this.gl_.clearColor(color.r / 255, color.g / 255, color.b / 255, color.a / 255);
    this.gl_.clear(this.gl_.COLOR_BUFFER_BIT); 
}

/**
* Draws a drawable object
*
* @method
* @param {Drawable} drawable - Drawable object
* @param {RenderOptions} renderOptions - Optional render options
*/
sp.Context.prototype.draw = function(drawable, renderOptions) {
    drawable.draw(this, renderOptions || new sp.RenderOptions());
};

/**
* Draws vertices
*
* @method
* @param {List} vertices - Vertices list
* @param {PrimitiveType} type - Primitive type
* @param {RenderOptions} renderOptions - Optional render options
*/
sp.Context.prototype.drawVertices = function(vertices, type, renderOptions) {
    var gl = this.GL();

    //Load default render options
    if (!renderOptions) {
        renderOptions = new sp.RenderOptions();
        renderOptions.shader = this.getDefaultShader();
    }

    //Set blend mode
    var blendMode = renderOptions.blendMode;
    if (!blendMode) {
        blendMode = sp.BlendMode.ALPHA;
    }
    var factors = [gl.ZERO, gl.ONE, 
        gl.SRC_COLOR, gl.ONE_MINUS_SRC_COLOR, gl.DST_COLOR, gl.ONE_MINUS_DST_COLOR,
        gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.DST_ALPHA, gl.ONE_MINUS_DST_ALPHA,
        gl.SRC_ALPHA_SATURATE];
    var equations = [gl.FUNC_ADD, gl.FUNC_SUBTRACT, gl.FUNC_REVERSE_SUBTRACT];
    this.gl_.blendFuncSeparate(factors[blendMode.srcColorFactor], factors[blendMode.dstColorFactor],
                                factors[blendMode.srcAlphaFactor], factors[blendMode.dstAlphaFactor]);
    this.gl_.blendEquationSeparate(equations[blendMode.colorEquation], equations[blendMode.alphaEquation]);

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
    var positions = sp.VertexArray.getPositionArray(vertices);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    //Colors
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
    var colors = sp.VertexArray.getColorArray(vertices);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    //Texture coordinates
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTexCoordsBuffer);
    var texCoords = sp.VertexArray.getTexCoordsArray(vertices);
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

    renderOptions.shader.uniformfv("u_resolution", [this.viewportWidth_, this.viewportHeight_]);
    var transformMatrix = renderOptions.transform.getMatrix();
    renderOptions.shader.uniformMatrixfv("u_transform", transformMatrix);
    var viewMatrix = this.currentView_.getTransform().getMatrix();
    renderOptions.shader.uniformMatrixfv("u_view", viewMatrix);
    var projectionMatrix = this.currentView_.getProjection().getMatrix();
    renderOptions.shader.uniformMatrixfv("u_projection", projectionMatrix);

    var viewport = this.currentView_.getViewport();
    gl.viewport(viewport.x * this.viewportWidth_, this.viewportHeight_ - (viewport.y + viewport.h) * this.viewportHeight_, viewport.w * this.viewportWidth_, viewport.h * this.viewportHeight_);

    if (renderOptions.texture) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, renderOptions.texture.getTextureId());
    }

    //Find WebGL primitive type
    var modes = [gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, gl.TRIANGLES, gl.TRIANGLE_STRIP, gl.TRIANGLE_FAN];
    var mode = modes[type];

    //Draw primitives
    gl.drawArrays(mode, 0, vertices.length);

    //TODO: Reset states
    gl.bindTexture(gl.TEXTURE_2D, null);
};  
