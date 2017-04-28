var context = new sp.Context("canvas1");

var texture = new sp.Texture(context);
texture.loadFromFile('./resources/picture.png',  function() {

    var origX = texture.getSize().x / 2;
    var origY = texture.getSize().y / 2;

    for (var i = 0; i < 100; i++) {
        var x = Math.random() * context.getViewportWidth();
        var y = Math.random() * context.getViewportHeight();

        var sprite = new sp.Sprite(texture);
        sprite.setPosition(x, y);
        sprite.setOrigin(origX, origY);
        sprite.setColor(sp.Color.random());
        sprite.setRotation(Math.random() * 360);
        context.draw(sprite);
    }

    var sprite = new sp.Sprite(texture);
    sprite.setPosition(320, 240);
    sprite.setOrigin(origX, origY);
    sprite.setScale(2, 2);
    context.draw(sprite);

});