const WIDTH = screen.width;
const HEIGHT = screen.height;

let x = [];
let fourier;
let angle = 0;
let path = [];
let drawing = [];
let mode = null;

// p5js functions
function setup() {
  createCanvas(WIDTH, HEIGHT);
}

function draw() {
  background(0);

  createButton(mode!="fourier"? "START": "STOP")
    .position(50, 50)
    .mousePressed(click)
    .style("width", "100px")
    .style("height", "30px")
    .style("background", mode!="fourier"? "green":"red")
    .style("color", "white");

  if (mode == "draw") {
    let point = createVector(mouseX - width/2, mouseY - height/2);
    drawing.push(point);

    stroke(255, 0 , 0);
    noFill();
    beginShape();
    for (c of drawing) {
      vertex(c.x + width/2, c.y + height/2);
      }
    endShape();
    
    }
  else if (mode == "fourier") {
    stroke(255);
    textSize(16);
    textAlign(CENTER, TOP);
    text('Number of Epicycles: '+fourier.length, 0, 50, width, height);
    
    stroke(255, 0, 0, 150);
    noFill();
    beginShape();
    for (c of drawing) {
      vertex(c.x + width/2, c.y + height/2);
      }
    endShape();

    let ec = epiCycles( width/ 2, height/2, 0, fourier);
    let v = createVector(ec.x, ec.y);
    path.unshift(v);

    beginShape();
    noFill();
    for (i = 0; i < path.length; i++) {
      stroke(255, 0, 0);
      vertex(path[i].x, path[i].y);
      }
    endShape();

    angle += 2 * PI  / fourier.length; 
    
    if (angle > 2 * PI ) {
      angle = 0;
      path = [];
      }
    }
  else {
    stroke(255, 0, 0, 150);
    noFill();
    beginShape();
    for (v of drawing) {
      vertex(v.x + width/2, v.y + height/2);
      }
    endShape();
    } 

}

// Event Listeners
function click() {
  if (mode == "fourier") {
    mode = "draw";
    drawing = [];
    x = [];
    y = [];
    angle = 0;
    path = [];
  }
  else {
    mode = "fourier";
    for (let i = 0; i < drawing.length; i+=2) {
      x.push(new Complex(drawing[i].x, drawing[i].y));
    }

    fourier = dft(x);
    fourier.sort((a, b) => b.amp - a.amp);
  }
}

function mouseReleased() {
  if (mode == null) {
    mode = "draw"
    drawing = [];
  }
  else if (mode == "draw") {
    mode = null;
  }
}
