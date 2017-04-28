var context = new sp.Context("canvas1");

for (var i = 0; i < 20; i++) {

    var color = sp.Color.random();
    var x = Math.random() * context.getViewportWidth();
    var y = Math.random() * context.getViewportHeight();
    var radius = 32 + Math.random() * 128;

    var circle = new sp.CircleShape(radius, color);
    circle.setColor(sp.Color.random());
    circle.setPosition(x, y);

    //circle.setOutlineThickness(3);
    //circle.setOutlineColor(new sp.Color(255, 0, 0));

    context.draw(circle);
}

var a = new sp.CircleShape(50);
a.setPosition(320, 240);
a.setOutlineColor(new sp.Color(0, 0, 255));
a.setOutlineThickness(3);
a.setColor(sp.Color.random());
a.setPointCount(8);
context.draw(a);