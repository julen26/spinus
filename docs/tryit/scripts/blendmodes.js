var context = new sp.Context("canvas1");
context.clear(new sp.Color(0, 0, 255));

var renderOptions = new sp.RenderOptions();

var rect = new sp.RectangleShape();
rect.setSize(128, 128);

renderOptions.blendMode = sp.BlendMode.ALPHA;
rect.setColor(new sp.Color(255, 0, 0));
rect.setPosition(0, 0);
context.draw(rect, renderOptions);

renderOptions.blendMode = sp.BlendMode.ADD;
rect.setColor(new sp.Color(255, 0, 0));
rect.setPosition(128, 0);
context.draw(rect, renderOptions);

renderOptions.blendMode = sp.BlendMode.MULTIPLY;
rect.setColor(new sp.Color(255, 0, 0));
rect.setPosition(256, 0);
context.draw(rect, renderOptions);


renderOptions.blendMode = sp.BlendMode.ALPHA;
rect.setColor(new sp.Color(255, 0, 0, 128));
rect.setPosition(0, 128);
context.draw(rect, renderOptions);

renderOptions.blendMode = sp.BlendMode.ADD;
rect.setColor(new sp.Color(255, 0, 0, 128));
rect.setPosition(128, 128);
context.draw(rect, renderOptions);

renderOptions.blendMode = sp.BlendMode.MULTIPLY;
rect.setColor(new sp.Color(255, 0, 0, 128));
rect.setPosition(256, 128);
context.draw(rect, renderOptions);


renderOptions.blendMode = sp.BlendMode.ALPHA;
rect.setColor(new sp.Color(255, 0, 0, 0));
rect.setPosition(0, 256);
context.draw(rect, renderOptions);

renderOptions.blendMode = sp.BlendMode.ADD;
rect.setColor(new sp.Color(255, 0, 0, 0));
rect.setPosition(128, 256);
context.draw(rect, renderOptions);

renderOptions.blendMode = sp.BlendMode.MULTIPLY;
rect.setColor(new sp.Color(255, 0, 0, 0));
rect.setPosition(256, 256);
context.draw(rect, renderOptions);