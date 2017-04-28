var context = new sp.Context("canvas1");


var texture = new sp.Texture(context, false, true, true);
texture.loadFromFile('./resources/texturePOT.png',  function() {

    var shape = new sp.Shape(6, texture);
    shape.setPointPosition(0, new sp.Vector2(0, 200));
    shape.setPointPosition(1, new sp.Vector2(200, 0));
    shape.setPointPosition(2, new sp.Vector2(300, 50));
    shape.setPointPosition(3, new sp.Vector2(350, 120));
    shape.setPointPosition(4, new sp.Vector2(400, 130));
    shape.setPointPosition(5, new sp.Vector2(200, 400));
    shape.setPosition(320, 240);
    shape.setOrigin(200, 200);
    shape.setOutlineThickness(3);
    shape.setOutlineColor(new sp.Color(0, 0, 0));

    context.draw(shape);

});