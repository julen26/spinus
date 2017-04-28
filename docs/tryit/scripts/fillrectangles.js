var context = new sp.Context("canvas1");

for (var i = 0; i < 20; i++) {

    var color1 = sp.Color.random();
    var color2 = sp.Color.random();
    var color3 = sp.Color.random();
    var color4 = sp.Color.random();

    var rect = new sp.RectangleShape();
    rect.setColors(color1, color2, color3, color4);
    var w = Math.random() * context.getViewportWidth() / 2;
    var h = Math.random() * context.getViewportHeight() / 2;
    var x = Math.random() * context.getViewportWidth();
    var y = Math.random() * context.getViewportHeight();
    rect.setSize(w, h);
    rect.setPosition(x, y);

    context.draw(rect);
}

var rect = new sp.RectangleShape();
rect.setColor(new sp.Color(255, 0, 0));
rect.setSize(100, 100);
rect.setPosition(320, 240);
rect.setOrigin(50, 50);
rect.setRotation(45);

context.draw(rect);