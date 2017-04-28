var context = new sp.Context("canvas1");

var texture = new sp.Texture(context, false, true, true);
texture.loadFromFile('./resources/texturePOT.png',  function() {

    var sprite = new sp.Sprite(texture);
    sprite.setTextureRect(new sp.Rect(0, 0, 4, 4));
    context.draw(sprite);

});