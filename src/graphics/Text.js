goog.provide('sp.Text');
goog.provide('sp.TextStyle');
goog.require('sp.extend');
goog.require('sp.Transformable');
goog.require('sp.Drawable');
goog.require('sp.VertexArray');
goog.require('sp.Vector2');
goog.require('sp.Texture');
goog.require('sp.Color');

sp.TextStyle = {
    Normal : 0,
    Bold : 1,
    Italic : 2,
    Underline : 4,
    StrikeThrough : 8
};

/**
* Constructs Text objects
* @class Represents a Text object
* @param {string} str - Text's string
*/
sp.Text = function(str, width, height, font, characterSize, style, color) {
    //Call base constructor
    sp.Transformable.call(this);

    this.m_texture = null;
    this.m_string = "";
    this.m_width = width || 100;
    this.m_height = height || 100;
    this.m_font = font || "Arial";
    this.m_characterSize = characterSize || 12;
    this.m_style = style || sp.TextStyle.Normal;
    this.m_color = color || new sp.Color();

    this.m_vertexArray = new sp.VertexArray(sp.PrimitiveType.TriangleFan, 4);
    this.m_vertexArray.getVertex(0).texCoords = new sp.Vector2(0, 0);
    this.m_vertexArray.getVertex(1).texCoords = new sp.Vector2(1, 0);
    this.m_vertexArray.getVertex(2).texCoords = new sp.Vector2(1, 1);
    this.m_vertexArray.getVertex(3).texCoords = new sp.Vector2(0, 1);

    this.m_needsTextureUpdate = true;

    this.setString(str);
};
sp.extend(sp.Text, sp.Transformable);
sp.extend(sp.Text, sp.Drawable);

sp.Text.prototype.setString = function (str) {
    str = str || "";
    if (str != this.m_string) {
        this.m_string = str;
        this.m_needsTextureUpdate = true;
    }
};

sp.Text.prototype.setFont = function (font) {
    this.m_font = font;
    this.m_needsTextureUpdate = true;
};

sp.Text.prototype.setCharacterSize = function (characterSize) {
    this.m_characterSize = characterSize;
    this.m_needsTextureUpdate = true;
};

sp.Text.prototype.setStyle = function (style) {
    this.m_style = style;
    this.m_needsTextureUpdate = true;
};

sp.Text.prototype.setColor = function (color) {
    this.m_color = color || new sp.Color();
    this.m_needsTextureUpdate = true;
};

sp.Text.prototype.updateTexture = function (context) {
    var gl = context.GL();
    var ctx = document.createElement("canvas").getContext("2d");

    if (ctx) {
        ctx.width = this.m_width;
        ctx.height = this.m_height;
        ctx.canvas.width = this.m_width;
        ctx.canvas.height = this.m_height;
        ctx.fillStyle = "rgba(" + this.m_color.r + ", " + this.m_color.g + ", " + this.m_color.b + ", " + (this.m_color.a / 255) + ")";

        var font = this.m_characterSize + "px " + this.m_font;
        if ((this.m_style & sp.TextStyle.Bold) != 0) {
            font = "bold " + font;
        }
        if ((this.m_style & sp.TextStyle.Italic) != 0) {
            font = "italic " + font;
        }
        ctx.font = font;

        ctx.textBaseline = "top";
        ctx.fillText(this.m_string, 0, 0);

        //Underline and strikethrough
        var textWidth = ctx.measureText(this.m_string).width;
        var lineHeight = this.m_characterSize / 15;
        var startX;
        var endX;
        if (ctx.textAlign == "center") {
            startX = -textWidth / 2;
            endX = textWidth / 2;
        }
        else if (ctx.textAlign == "right") {
            startX = -textWidth;
            endX = 0;
        }
        else {
            startX = 0;
            endX = textWidth;
        }
        var lineY;
        if ((this.m_style & sp.TextStyle.Underline) != 0) {
            lineY = this.m_characterSize;
            ctx.beginPath();
            ctx.strokeStyle = ctx.fillStyle;
            ctx.lineWidth = lineHeight;
            ctx.moveTo(startX, lineY);
            ctx.lineTo(endX, lineY);
            ctx.stroke();
        }
        if ((this.m_style & sp.TextStyle.StrikeThrough) != 0) {
            lineY = this.m_characterSize / 1.5;
            ctx.beginPath();
            ctx.strokeStyle = ctx.fillStyle;
            ctx.lineWidth = lineHeight;
            ctx.moveTo(startX, lineY);
            ctx.lineTo(endX, lineY);
            ctx.stroke();
        }

        if (this.m_texture) {
            gl.deleteTexture(this.m_texture.getTextureId());
        }
        this.m_texture = new sp.Texture(context);
        this.m_texture.loadFromImage(ctx.canvas);

        var size = this.m_texture.getSize();
        this.m_vertexArray.getVertex(0).position = new sp.Vector2(0, 0);
        this.m_vertexArray.getVertex(1).position = new sp.Vector2(size.x, 0);
        this.m_vertexArray.getVertex(2).position = new sp.Vector2(size.x, size.y);
        this.m_vertexArray.getVertex(3).position = new sp.Vector2(0, size.y);

        this.m_needsTextureUpdate = false;
    }
};

sp.Text.prototype.draw = function (context, renderOptions) {
    if (this.m_needsTextureUpdate) {
        this.updateTexture(context);
    }

    if (this.m_texture) {
        renderOptions.transform = this.getTransform();
        renderOptions.texture = this.m_texture;
    
        this.m_vertexArray.draw(context, renderOptions);
    }
};
