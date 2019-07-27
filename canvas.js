const ctx = document.getElementById('hexagon').getContext('2d');

// hexagon
let numberOfSides = 6,
    size = 20,
    Xcenter = 25,
    Ycenter = 25;

ctx.beginPath();
ctx.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));          

for (let i = 1; i <= numberOfSides; i++) {
  ctx.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
}

ctx.strokeStyle = "#000000";
ctx.lineWidth = 1;
ctx.stroke();