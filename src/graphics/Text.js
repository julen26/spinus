goog.provide('sp.Text');
goog.provide('sp.TextStyle');
goog.require('sp.extend');
goog.require('sp.Transformable');
goog.require('sp.Drawable');
goog.require('sp.VertexArray');
goog.require('sp.Vector2');
goog.require('sp.Texture');
goog.require('sp.Color');

/** 
* Enum for text style
* @enum {number}
*/
sp.TextStyle = {
    NORMAL : 0,
    BOLD : 1,
    ITALIC : 2,
    UNDERLINE : 4,
    STRIKETHROUGH : 8
};

/**
* Constructs Text objects
* @class Represents a Text object
* @extends sp.Transformable
* @extends sp.Drawable
* @param {string} [str=''] Text's string
* @param {float} [width=100] Width
* @param {float} [height=100] Height
* @param {string} [font='Arial'] Font
* @param {float} [characterSize=12] Character size
* @param {sp.TextStyle} [style=sp.TextStyle.Normal] Text style
* @param {string} [color=Black] Color
*/
sp.Text = function(str, width, height, font, characterSize, style, color) {
    //Call base constructor
    sp.Transformable.call(this);

    /** @private */
    this.texture_ = null;

    /** @private */
    this.string_ = '';

    /** @private */
    this.width_ = width || 100;
    /** @private */
    this.height_ = height || 100;

    /** @private */
    this.font_ = font || 'Arial';
    /** @private */
    this.characterSize_ = characterSize || 12;
    /** @private */
    this.style_ = style || sp.TextStyle.NORMAL;
    /** @private */
    this.color_ = color || new sp.Color();

    /** @private */
    this.vertexArray_ = new sp.VertexArray(sp.PrimitiveType.TRIANGLE_FAN, 4);
    this.vertexArray_.getVertex(0).texCoords = new sp.Vector2(0, 0);
    this.vertexArray_.getVertex(1).texCoords = new sp.Vector2(1, 0);
    this.vertexArray_.getVertex(2).texCoords = new sp.Vector2(1, 1);
    this.vertexArray_.getVertex(3).texCoords = new sp.Vector2(0, 1);

    /** @private */
    this.needsTextureUpdate_ = true;

    this.setString(str);
};
sp.extend(sp.Text, sp.Transformable);
sp.extend(sp.Text, sp.Drawable);

/**
* Set text content.
*
* @method
* @param {string} str Text content
*/
sp.Text.prototype.setString = function (str) {
    str = str || '';
    if (str != this.string_) {
        this.string_ = str;
        this.needsTextureUpdate_ = true;
    }
};

/**
* Set font.
*
* @method
* @param {string} font Font name
*/
sp.Text.prototype.setFont = function (font) {
    this.font_ = font;
    this.needsTextureUpdate_ = true;
};

/**
* Set character size.
*
* @method
* @param {float} characterSize Character size
*/
sp.Text.prototype.setCharacterSize = function (characterSize) {
    this.characterSize_ = characterSize;
    this.needsTextureUpdate_ = true;
};

/**
* Set text style.
*
* @method
* @param {sp.TextStyle} style Text style
*/
sp.Text.prototype.setStyle = function (style) {
    this.style_ = style;
    this.needsTextureUpdate_ = true;
};

/**
* Set text color.
*
* @method
* @param {sp.Color} color Text color
*/
sp.Text.prototype.setColor = function (color) {
    this.color_ = color || new sp.Color();
    this.needsTextureUpdate_ = true;
};

/**
* Updates the texture that contains the text.
*
* @method
* @param {sp.Context} context Context
*/
sp.Text.prototype.updateTexture = function (context) {
    var gl = context.GL();
    var ctx = document.createElement('canvas').getContext('2d');

    if (ctx) {
        ctx.width = this.width_;
        ctx.height = this.height_;
        ctx.canvas.width = this.width_;
        ctx.canvas.height = this.height_;
        ctx.fillStyle = 'rgba(' + this.color_.r + ', ' + this.color_.g + ', ' + this.color_.b + ', ' + (this.color_.a / 255) + ')';

        var font = this.characterSize_ + 'px ' + this.font_;
        if ((this.style_ & sp.TextStyle.BOLD) != 0) {
            font = 'bold ' + font;
        }
        if ((this.style_ & sp.TextStyle.ITALIC) != 0) {
            font = 'italic ' + font;
        }
        ctx.font = font;

        ctx.textBaseline = 'top';
        ctx.fillText(this.string_, 0, 0);

        //Underline and strikethrough
        var textWidth = ctx.measureText(this.string_).width;
        var lineHeight = this.characterSize_ / 15;
        var startX;
        var endX;
        if (ctx.textAlign == 'center') {
            startX = -textWidth / 2;
            endX = textWidth / 2;
        }
        else if (ctx.textAlign == 'right') {
            startX = -textWidth;
            endX = 0;
        }
        else {
            startX = 0;
            endX = textWidth;
        }
        var lineY;
        if ((this.style_ & sp.TextStyle.UNDERLINE) != 0) {
            lineY = this.characterSize_;
            ctx.beginPath();
            ctx.strokeStyle = ctx.fillStyle;
            ctx.lineWidth = lineHeight;
            ctx.moveTo(startX, lineY);
            ctx.lineTo(endX, lineY);
            ctx.stroke();
        }
        if ((this.style_ & sp.TextStyle.STRIKETHROUGH) != 0) {
            lineY = this.characterSize_ / 1.5;
            ctx.beginPath();
            ctx.strokeStyle = ctx.fillStyle;
            ctx.lineWidth = lineHeight;
            ctx.moveTo(startX, lineY);
            ctx.lineTo(endX, lineY);
            ctx.stroke();
        }

        if (this.texture_) {
            gl.deleteTexture(this.texture_.getTextureId());
        }
        this.texture_ = new sp.Texture(context);
        this.texture_.loadFromImage(ctx.canvas);

        var size = this.texture_.getSize();
        this.vertexArray_.getVertex(0).position = new sp.Vector2(0, 0);
        this.vertexArray_.getVertex(1).position = new sp.Vector2(size.x, 0);
        this.vertexArray_.getVertex(2).position = new sp.Vector2(size.x, size.y);
        this.vertexArray_.getVertex(3).position = new sp.Vector2(0, size.y);

        this.needsTextureUpdate_ = false;
    }
};

/**
* Draws the text to the context. First updates the texture if needed.
*
* @method
* @param {sp.Context} context Context
* @param {sp.RenderOptions} renderOptions Optional render options
*/
sp.Text.prototype.draw = function (context, renderOptions) {
    if (this.needsTextureUpdate_) {
        this.updateTexture(context);
    }

    if (this.texture_) {
        renderOptions.transform = this.getTransform();
        renderOptions.texture = this.texture_;
    
        this.vertexArray_.draw(context, renderOptions);
    }
};
