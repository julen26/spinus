var context = new sp.Context("canvas1");
    
context.clear(new sp.Color(192, 192, 192));

var text = new sp.Text("Hello world", 200, 64, "arial", 36);
text.setPosition(232, 222);

context.draw(text);