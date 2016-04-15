var _NS = _NS || {};

/**
* Constructs Rectangle objects
* @class Represents a Rectangle object
* @param {float} x - X position
* @param {float} y - Y position
* @param {float} w - Width
* @param {float} h - Height
* @param {Color} color - Color
*/
_NS.Rectangle = function(x, y, w, h, color) {
    /**
    * X position
    * @type float
    */
    this.x = x || 0;
    /**
    * Y position
    * @type float
    */
    this.y = y || 0;
    /**
    * Width
    * @type float
    */
    this.w = w || 0;
    /**
    * Height
    * @type float
    */
    this.h = h || 0;
    /**
    * Color
    * @type Color
    */
    this.setColor(color);
};

/**
* Sets rectangle bounds
*
* @method
* @param {float} x1 - Left
* @param {float} y1 - Top
* @param {float} x2 - Right
* @param {float} y2 - Bottom
*/
_NS.Rectangle.prototype.setBounds = function (x1, y1, x2, y2) {
    this.x = x1;
    this.y = y1;
    this.w = Math.abs(x2 - x1);
    this.h = Math.abs(y2 - y1);
};

/**
* Sets an uniform fill color
*
* @method
* @param {Color} color - Fill color
*/
_NS.Rectangle.prototype.setColor = function (color) {
    /**
    * Top-left color
    * @type Color
    */
    this.color1 = color || new _NS.Color();
    /**
    * Top-right color
    * @type Color
    */
    this.color2 = this.color1;
    /**
    * Bottom-right color
    * @type Color
    */
    this.color3 = this.color1;
    /**
    * Bottom-left color
    * @type Color
    */
    this.color4 = this.color1;
};

/**
* Sets a color for each vertex
*
* @method
* @param {Color} color1 - Top-left color
* @param {Color} color2 - Top-right color
* @param {Color} color3 - Bottom-right color
* @param {Color} color4 - Bottom-left color
*/
_NS.Rectangle.prototype.setColors = function (color1, color2, color3, color4) {
    this.color1 = color1 || new _NS.Color();
    this.color2 = color2 || new _NS.Color();
    this.color3 = color3 || new _NS.Color();
    this.color4 = color4 || new _NS.Color();
};

/**
* Draw rectangle in the given context
*
* @method
* @param {Context} context - Context
*/
_NS.Rectangle.prototype.draw = function (context) {
    if (context.mode == _NS.Context.Modes.WebGL) {
        //Use proper shader
        context.defaultProgram.use();

        //Init attributes
        var positionAttribute = context.defaultProgram.getAttribLocation("a_position");//context.gl.getAttribLocation(context.currentProgram.shaderProgramId, "a_position");
        var colorAttribute = context.defaultProgram.getAttribLocation("a_color");//context.gl.getAttribLocation(context.currentProgram.shaderProgramId, "a_color");

        //Init buffers
        var vertexBuffer = context.gl.createBuffer();
        context.gl.bindBuffer(context.gl.ARRAY_BUFFER, vertexBuffer);

        var x1 = this.x;
        var x2 = this.x + this.w;
        var y1 = this.y;
        var y2 = this.y + this.h;
        context.gl.bufferData(context.gl.ARRAY_BUFFER, new Float32Array([
            x1, y1,
            x2, y1,
            x1, y2,
            x2, y2
        ]), context.gl.STATIC_DRAW);

        var colorBuffer = context.gl.createBuffer();
        context.gl.bindBuffer(context.gl.ARRAY_BUFFER, colorBuffer);

        context.gl.bufferData(context.gl.ARRAY_BUFFER, new Float32Array([
             this.color1.r / 255, this.color1.g / 255, this.color1.b / 255, this.color1.a / 255,
             this.color2.r / 255, this.color2.g / 255, this.color2.b / 255, this.color2.a / 255,
             this.color4.r / 255, this.color4.g / 255, this.color4.b / 255, this.color4.a / 255,
             this.color3.r / 255, this.color3.g / 255, this.color3.b / 255, this.color3.a / 255
         ]), context.gl.STATIC_DRAW);

        context.currentProgram.uniform2f("u_resolution", context.viewportWidth, context.viewportHeight);

        //Bind buffer to attributes
        context.gl.bindBuffer(context.gl.ARRAY_BUFFER, vertexBuffer);
        context.gl.enableVertexAttribArray(positionAttribute);
        context.gl.vertexAttribPointer(positionAttribute, 2, context.gl.FLOAT, false, 0, 0);

        context.gl.bindBuffer(context.gl.ARRAY_BUFFER, colorBuffer);
        context.gl.enableVertexAttribArray(colorAttribute);
        context.gl.vertexAttribPointer(colorAttribute, 4, context.gl.FLOAT, false, 0, 0);

        //Use shader
        context.defaultProgram.use(context);

        // Draw the rectangle.
        context.gl.drawArrays(context.gl.TRIANGLE_STRIP, 0, 4);
    }
    else {
        context.ctx.fillStyle = this.color1.getRGBAString();
        context.ctx.fillRect(this.x, this.y, this.w, this.h);
    }
};