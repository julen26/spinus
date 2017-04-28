var context = new sp.Context("canvas1");

var texture1 = new sp.Texture(context, false, false, true);
texture1.loadFromFile('./resources/texture.png', function() {

    var sprite = new sp.Sprite(texture1);

    sprite.setPosition(0, 0);
    sprite.setScale(1, 1);
    context.draw(sprite);

    sprite.setPosition(200, 0);
    sprite.setScale(0.75, 0.75);
    context.draw(sprite);

    sprite.setPosition(400, 0);
    sprite.setScale(0.5, 0.5);
    context.draw(sprite);

    sprite.setPosition(600, 0);
    sprite.setScale(0.25, 0.25);
    context.draw(sprite);
});

var texture2 = new sp.Texture(context, true, false, true);
texture2.loadFromFile('./resources/texture.png', function() {

    var sprite = new sp.Sprite(texture2);

    sprite.setPosition(0, 200);
    sprite.setScale(1, 1);
    context.draw(sprite);

    sprite.setPosition(200, 200);
    sprite.setScale(0.75, 0.75);
    context.draw(sprite);

    sprite.setPosition(400, 200);
    sprite.setScale(0.5, 0.5);
    context.draw(sprite);

    sprite.setPosition(600, 200);
    sprite.setScale(0.25, 0.25);
    context.draw(sprite);
});