var context = new sp.Context("canvas1");

var view = context.getView();
view.setCenter(100, 240);
view.setScale(1.5, 1.5);
view.setRotation(30);
view.setViewport(new sp.Rect(0, 0, 0.5, 0.5));

var circle = new sp.CircleShape(50);
circle.setPosition(320, 240);
circle.setOutlineColor(new sp.Color(0, 0, 255));
circle.setOutlineThickness(3);
circle.setColor(sp.Color.random());
circle.setPointCount(8);
context.draw(circle);

view.setViewport(new sp.Rect(0.5, 0, 0.5, 0.5));
context.draw(circle);

view.setViewport(new sp.Rect(0, 0.5, 0.5, 0.5));
context.draw(circle);

view.setViewport(new sp.Rect(0.5, 0.5, 0.5, 0.5));
context.draw(circle);