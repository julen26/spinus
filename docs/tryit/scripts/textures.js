var context = new sp.Context("canvas1");

var square = new sp.VertexArray(sp.PrimitiveType.TRIANGLE_STRIP);
square.addVertex( new sp.Vertex( new sp.Vector2(10, 10), new sp.Color(255, 255, 255), new sp.Vector2(0, 0)) );
square.addVertex( new sp.Vertex( new sp.Vector2(94, 10), new sp.Color(255, 255, 255), new sp.Vector2(1, 0)) );
square.addVertex( new sp.Vertex( new sp.Vector2(94, 94), new sp.Color(255, 255, 255), new sp.Vector2(1, 1)) );
square.addVertex( new sp.Vertex( new sp.Vector2(10, 94), new sp.Color(255, 255, 255), new sp.Vector2(0, 1)) );
square.addVertex( new sp.Vertex( new sp.Vector2(10, 10), new sp.Color(255, 255, 255), new sp.Vector2(0, 0)) );

var texture = new sp.Texture(context);
texture.loadFromFile('./resources/picture.png',  function() {

    context.draw(square, new sp.RenderOptions(new sp.Transform(), texture));

});