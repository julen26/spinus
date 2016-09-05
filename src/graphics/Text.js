goog.provide('sp.Text');
goog.require('sp.extend');
goog.require('sp.Transformable');
goog.require('sp.Drawable');
goog.require('sp.VertexArray');
goog.require('sp.Vector2');
goog.require('sp.Texture');

/**
* Constructs Text objects
* @class Represents a Text object
* @param {string} str - Text's string
*/
sp.Text = function(str, width, height) {
    //Call base constructor
    sp.Transformable.call(this);

    this.m_texture = null;
    this.m_string = "";
    this.m_width = width || 100;
    this.m_height = height || 100;

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

sp.Text.prototype.updateTexture = function (context) {
    var gl = context.GL();
    var ctx = document.createElement("canvas").getContext("2d");

    if (ctx) {
        ctx.width = this.m_width;
        ctx.height = this.m_height;
        ctx.canvas.width = this.m_width;
        ctx.canvas.height = this.m_height;
        ctx.font = "20px Arial";
        ctx.textBaseline = "top";
        ctx.fillText(this.m_string, 0, 0);

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
