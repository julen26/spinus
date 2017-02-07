var context = new sp.Context("canvas1");
context.clear(new sp.Color(192, 192, 192));

var fonts = ["Arial", "Verdana", "Sans serif"];

for (var i = 0; i < 3; i++) {
    var x = 64 + 200 * i;
    var text = new sp.Text("Hello world", 200, 64);
    text.setFont(fonts[i]);

    text.setPosition(x, 64);
    context.draw(text);

    text.setString("Bold");
    text.setStyle(sp.TextStyle.BOLD);
    text.setCharacterSize(16);
    text.setPosition(x, 128);
    context.draw(text);

    text.setString("Italic");
    text.setStyle(sp.TextStyle.ITALIC);
    text.setCharacterSize(18);
    text.setPosition(x, 192);
    context.draw(text);

    text.setString("Underline");
    text.setStyle(sp.TextStyle.UNDERLINE);
    text.setCharacterSize(20);
    text.setPosition(x, 256);
    context.draw(text);

    text.setString("StrikeThrough");
    text.setStyle(sp.TextStyle.STRIKETHROUGH);
    text.setCharacterSize(24);
    text.setPosition(x, 320);
    context.draw(text);

    text.setString("Colored");
    text.setColor(new sp.Color(255, 0, 0, 128));
    text.setStyle(sp.TextStyle.NORMAL);
    text.setCharacterSize(24);
    text.setPosition(x, 384);
    context.draw(text);
}