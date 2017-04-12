var context = new sp.Context("canvas1");

var color = sp.Color.fromName("red");

var square = new sp.VertexArray(sp.PrimitiveType.LINE_LOOP);
square.addVertex( new sp.Vertex( new sp.Vector2(10, 10), color) );
square.addVertex( new sp.Vertex( new sp.Vector2(100, 10), color) );
square.addVertex( new sp.Vertex( new sp.Vector2(100, 100), color) );
square.addVertex( new sp.Vertex( new sp.Vector2(10, 100), color) );
context.draw(square);