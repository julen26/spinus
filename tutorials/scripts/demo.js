function createRect(x, y, w, h) {
    var r = new sp.RectangleShape(w, h);
    r.setSize(w, h);
    r.setPosition(x, y);
    var color = sp.Color.random();
    color.a = 255;
    r.setColor(color);
    return r;
}

var rects = [
  createRect(0, 0, 400, 20),
  createRect(0, 0, 20, 300),
  createRect(0, 280, 400, 20),
  createRect(380, 0, 20, 300),
  createRect(0, 100, 100, 20),
  createRect(100, 120, 20, 20),
  createRect(120, 140, 20, 20),
  createRect(140, 160, 20, 20),
  createRect(160, 180, 20, 20),
  createRect(180, 200, 20, 20),
  createRect(200, 220, 100, 20)
]

function collides(rect1, rect2, vx, vy) {
    vx = vx || 0;
    vy = vy || 0;
  return rect1.getPosition().x + vx < rect2.getPosition().x + rect2.getSize().x && rect1.getPosition().x + vx + rect1.getSize().x > rect2.getPosition().x &&
         rect1.getPosition().y + vy < rect2.getPosition().y + rect2.getSize().y && rect1.getPosition().y + vy + rect1.getSize().y > rect2.getPosition().y
}

function move(p, vx, vy) {
  for (var i = 0; i < rects.length; i++) {
    if (collides(p, rects[i], vx, 0)) {
      if (vx < 0) vx = rects[i].getPosition().x + rects[i].getSize().x - p.getPosition().x
      else if (vx > 0) vx = rects[i].getPosition().x - p.getPosition().x - p.getSize().x
    }
  }
  p.move(vx, 0);

  for (var i = 0; i < rects.length; i++) {
    if (collides(p, rects[i], 0, vy)) {
      if (vy < 0) vy = rects[i].getPosition().y + rects[i].getSize().y - p.getPosition().y
      else if (vy > 0) vy = rects[i].getPosition().y - p.getPosition().y - p.getSize().y
    }
  }
  p.move(0, vy);
}

var keys = {}
document.onkeydown = function(e) { keys[e.which] = true }
document.onkeyup = function(e) { keys[e.which] = false }

var player = createRect(20, 20, 20, 20);
player.velocity = { x: 0, y: 0 };
player.onFloor = false;

function update() {
  player.velocity.x = 1.5 * (!!keys[39] - !!keys[37]) // right - left
  player.velocity.y += 0.5 // Acceleration due to gravity

  var expectedY = player.getPosition().y + player.velocity.y
  move(player, player.velocity.x, player.velocity.y)
  player.onFloor = (expectedY > player.getPosition().y)
  if (expectedY != player.getPosition().y) player.velocity.y = 0

  if (player.onFloor && keys[38]) {
    player.velocity.y = -6.5
  }
}

function draw(context) {
    context.clear(new sp.Color(255, 255, 255));

    context.draw(player);

    for (var i = 0; i < rects.length; i++) {
        context.draw(rects[i]);
    }
}

var context = new sp.Context("canvas1");

setInterval(function() {
    update()
    draw(context)
}, 1000 / 60);
