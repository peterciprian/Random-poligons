const context = document.getElementById('hexagon').getContext('2d');
// Defines a path for any regular polygon with the specified number of sides and radius, 
// centered on the provide x and y coordinates.
// optional parameters: startAngle and anticlockwise

function polygon(ctx, x, y, radius, sides, startAngle, anticlockwise) {
  if (sides < 3) return;
  var a = (Math.PI * 2)/sides;
  a = anticlockwise?-a:a;
  ctx.save();
  ctx.translate(x,y);
  ctx.rotate(startAngle);
  ctx.moveTo(radius,0);
  for (var i = 1; i < sides; i++) {
    ctx.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i));
  }
  ctx.closePath();
  ctx.restore();
}

// Example using the function.
// Define a path in the shape of a pentagon and then fill and stroke it.
context.beginPath();
polygon(context,125,125,100,7,-Math.PI/2);
context.fillStyle="rgba(227,11,93,0.75)";
context.fill();
context.stroke();