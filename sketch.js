//"Canvas Variable required for "createPattern()" function
let Canvas;
//"myColor" and "mycolors" are used in "Palette()" function
let myColor, myColors;
// "finishedDrawing" variable is for the recursive tree function
let finishedDrawing = false;
function setup() {
  noLoop();
  Canvas = createCanvas(window.innerWidth, window.innerWidth);
  // "Canvas.style()" used for resizing the canvas, usualy goes in style.css file
  Canvas.style("position", "absolute");
  Canvas.style("object-fit", "contain");
  Canvas.style("max-width", "100%");
  Canvas.style("max-height", "100%");
  Palette();
  strokeWeight(width / 600);
  myPattern();
  createPattern("initialize");
  background(0);
  stroke(255);
}
// The functions are seperated by their corrosponding grid number, //1,//2,//3,etc.
// I recomend just finding a single function you like,
// and adjust the values to help understand them in a seperate p5js sketch.
// Keep in mind, some functions rely on global variables, or colors picked from the Palette() function.
function draw() {
  let w = width / 4;
  //1
  fill(myColor);
  rect(0, 0, w);
  //
  //2
  linearGradient(color(random(myColors)), color(0), w + w / 2, 0, w + w / 2, w);
  rect(w, 0, w);
  //
  //3
  radialGradient(
    color(0),
    color(random(myColors)),
    w * 2 + w / 2,
    w / 2,
    w * 0.75
  );
  rect(w * 2, 0, w);
  //
  //4
  fill(255);
  rect(w * 3, 0, w);
  createPattern("drawPattern");
  //
  //5
  noStroke();
  radialGradient(color(255, 0), color(random(myColors)), 0, 0, w * 0.65);
  IrregularCircle(w / 2, w + w / 2, w * 0.9, 2, 20, 0.1);
  //
  //6
  stroke(random(myColors));
  linearGradient(color(random(myColors)), color(255), w / 1.5, 0, w / 2, w);
  IrregularCircle(w / 2 + w, w + w / 2, w * 0.75, 2, 75, 0.05);
  createPattern("drawPattern");
  //
  //7
  radialGradient(color(random(myColors)), color(0), 0, 0, w / 3.5);
  noStroke();
  IrregularCircle(w / 2 + w * 2, w + w / 2, w * 0.65, 10, 85, 0.15);
  //
  //8
  fill(random(myColors));
  stroke(0);
  Grid(w * 3, w, w, w, int(random(3, 12)), int(random(3, 12)));
  //
  //9
  WorleyNoiseGrid(0, w * 2, w, w, 50, 50, 15);
  //
  //10
  PerlinNoiseGrid(w, w * 2, w, w, 50, 50, 0.025);
  //
  //11
  NoiseLine(w * 2, w * 3 - w / 2, w * 3, w * 3 - w / 2, 1, w / 3, w / 3, 1);
  //
  //12
  NoiseLine(w * 3, w * 2.9, w * 4, w * 2.1, 3, w / 6, w / 6, 1);
  NoiseLine(w * 3, w * 2.1, w * 4, w * 2.9, 3, w / 6, w / 6, 1);
  //
  //13
  noStroke();
  ColorMap(0, w * 3, w, w, 60, 60, 0.019);
  //
  //14
  stroke(random(myColors));
  FlowFieldGrid(w, w * 3, w, w, 50, 50, 0.025);
  //
  //15
  fill(random(myColors));
  rect(w * 2, w * 3, w, w);
  rect(w * 2 + w / 2, w * 3, w / 2, w);
  fill(random(myColors));
  stroke(0);
  strokeWeight(width / 200);
  ellipse(w * 2 + w / 2, w * 3 + w / 2, w * 0.99);
  fill(random(myColors));
  ellipse(w * 2 + w / 2, w * 3 + w / 2, w / 1.5);
  strokeWeight(width / 700);
  //"Pixelate()" may load slowly because it's checking the color of individual pixels with "get()"
  Pixelate(w * 2, w * 3, w / 2, w, 20, 40);
  fill(0, 0, 0, 20);
  stroke(0, 0, 0, 20);
  rect(w * 2 + w / 2, w * 3, w / 2, w);
  //
  //16
  fill(255);
  rect(w * 3, w * 3, w);
  Tree(w * 3 + w / 2, w * 4, width / 25, 1);
  //
  //
  NumberGrid(0, 0, width, height, 4, 4);
}
function Palette() {
  let palettes = [
    {
      name: "Fun Colors",
      colors: {
        color1: color(55, 75, 225),
        color2: color(40, 250, 50),
        color3: color(225, 50, 0),
        color4: color(225, 250, 80),
      },
    },
    {
      name: "Pastel Colors",
      colors: {
        color1: color(169, 213, 248),
        color2: color(199, 248, 199),
        color3: color(221, 199, 248),
        color4: color(254, 250, 157),
      },
    },
  ];
  let selectedPalette = palettes[int(random(palettes.length - 0.01))];
  myColors = [
    selectedPalette.colors.color1,
    selectedPalette.colors.color2,
    selectedPalette.colors.color3,
    selectedPalette.colors.color4,
  ];
  myColor = random(myColors);
  console.log("Palette: " + selectedPalette.name);
}
function linearGradient(color1, color2, startX, startY, endX, endY) {
  let gradient = drawingContext.createLinearGradient(
    startX,
    startY,
    endX,
    endY
  );
  gradient.addColorStop(0, color1);
  //gradient.addColorStop(0.5, color3); //you can add more colors to the gradient, you would need to adjust the function to accept a third color
  gradient.addColorStop(1, color2);
  drawingContext.fillStyle = gradient;
  //drawingContext.strokeStyle = gradient; //you can use this same method to add gradients to strokes too.
}
function radialGradient(color1, color2, centerX, centerY, radius) {
  let gradient = drawingContext.createRadialGradient(
    centerX,
    centerY,
    radius,
    centerX,
    centerY,
    0
  );
  gradient.addColorStop(0, color1);
  //gradient.addColorStop(0.5, color3); //you can add more colors to the gradient, you would need to adjust the function to accept a third color
  gradient.addColorStop(1, color2);
  drawingContext.fillStyle = gradient;
  //drawingContext.strokeStyle = gradient; //you can use this same method to add gradients to strokes too.
}
function myPattern() {
  //this pattern is used for the createPattern() function, to create a custom fill. you can use any pattern you like.
  for (let i = 0; i < 500; i++) {
    fill(random(myColors));
    stroke(random(myColors));
    ellipse(random(width), random(height), random(width / 50));
  }
}
function createPattern(step) {
  //initialize takes a screenshot of the canvas
  if (step == "initialize") {
    img = createGraphics(width, height);
    img.copy(Canvas, 0, 0, width, height, 0, 0, img.width, img.height);
    //clear();//optionally clear your canvas after each pattern you want to save.
  }
  //this step will apply the screenshot from above to a shape drawn.
  if (step == "drawPattern") {
    drawingContext.save();
    drawingContext.clip();
    image(img, 0, 0);
    drawingContext.restore();
  }
}
function IrregularCircle(x, y, r, noiseScale, noiseStrength, angleStep) {
  let radius = r / 2 - noiseStrength / 2;
  push();
  translate(x, y);
  rotate(random(PI));
  beginShape();
  for (let angle = 0; angle <= TWO_PI; angle += angleStep) {
    let xoff = map(cos(angle), -1, 1, 0, noiseScale);
    let yoff = map(sin(angle), -1, 1, 0, noiseScale);
    let r = noise(xoff, yoff) * noiseStrength + radius;
    let x1 = r * cos(angle);
    let y1 = r * sin(angle);
    curveVertex(x1, y1);
  }
  endShape(CLOSE);
  pop();
}
function Grid(xstart, ystart, w, h, rows, cols) {
  let cellSizeX = w / rows;
  let cellSizeY = h / cols;
  for (let i = ystart; i < ystart + h - 1; i += cellSizeY) {
    for (let j = xstart; j < xstart + w - 1; j += cellSizeX) {
      rect(j, i, cellSizeX, cellSizeY);
    }
  }
}
function WorleyNoiseGrid(xstart, ystart, w, h, rows, cols, pointsAmnt) {
  // look into Voronoi tessellation for more information on this function
  let points = [];
  let closestPointIndex;
  for (let i = 0; i < pointsAmnt; i++) {
    points.push(
      createVector(random(xstart, xstart + w), random(ystart, ystart + h))
    );
  }
  let cellSizeX = w / rows;
  let cellSizeY = h / cols;
  for (let i = ystart; i < ystart + h - 1; i += cellSizeY) {
    for (let j = xstart; j < xstart + w - 1; j += cellSizeX) {
      let d1 = w + h;
      let d2 = w + h;
      for (let p = 0; p < points.length; p++) {
        let d = dist(j, i, points[p].x, points[p].y);
        if (d < d1) {
          d2 = d1;
          d1 = d;
          closestPointIndex = p;
        } else if (d < d2) {
          d2 = d;
        }
        //The two lines below this one are to show where the points are from the array "points[]"
        // fill(255);
        // ellipse(points[p].x, points[p].y,width/200);
        fill((d2 - d1) * 3);
        stroke((d2 - d1) * 3);
      }
      //The three lines below this are for a variant coloring method
      //closestPointIndex = map(closestPointIndex, 0, pointsAmnt, 0, 3.99);//maping the value to the number of colors I have in my palette (0 to 3) since I have 4 colors
      //closestPointIndex = int(closestPointIndex);
      //fill(myColors[closestPointIndex]);
      strokeWeight(width / 700);
      rect(j, i, cellSizeX, cellSizeY);
    }
  }
}
function PerlinNoiseGrid(xstart, ystart, w, h, rows, cols, scale) {
  let cellSizeX = w / rows;
  let cellSizeY = h / cols;
  for (let i = ystart; i < ystart + h - 1; i += cellSizeY) {
    for (let j = xstart; j < xstart + w - 1; j += cellSizeX) {
      let noiseValue = noise(j * scale, i * scale);
      fill(noiseValue * 255);
      stroke(noiseValue * 255);
      strokeWeight(width / 700);
      rect(j, i, cellSizeX, cellSizeY);
    }
  }
}
function NoiseLine(
  xstart,
  ystart,
  xend,
  yend,
  spacing,
  noiseMax,
  noiseMin,
  intensity
) {
  let xoff = 0;
  beginShape();
  for (let x = xstart - spacing; x <= xend + spacing * 2; x += spacing) {
    let y =
      map(x, xstart, xend, ystart, yend) +
      map(noise(xoff), 0, intensity, -noiseMin, noiseMax);
    strokeWeight(3);
    curveVertex(x, y);
    xoff += 0.03;
  }
  noFill();
  stroke(random(myColors));
  endShape();
}
function ColorMap(xstart, ystart, w, h, rows, cols, scale) {
  let cellSizeX = w / rows;
  let cellSizeY = h / cols;
  for (let i = ystart; i < ystart + h - 1; i += cellSizeY) {
    for (let j = xstart; j < xstart + w - 1; j += cellSizeX) {
      let noiseValue = noise(j * scale, i * scale);
      let n = noiseValue * 255;
      if (n > 180) {
        fill(myColors[0]);
        stroke(myColors[0]);
      } else if (n > 130) {
        fill(myColors[1]);
        stroke(myColors[1]);
      } else if (n > 90) {
        fill(myColors[2]);
        stroke(myColors[2]);
      } else if (n > 50) {
        fill(myColors[3]);
        stroke(myColors[3]);
      } else {
        fill(myColors[0]);
        stroke(myColors[0]);
      }
      strokeWeight(width / 700);
      rect(j, i, cellSizeX, cellSizeY);
    }
  }
}
function FlowFieldGrid(xstart, ystart, w, h, rows, cols, scale) {
  let cellSizeX = w / rows;
  let cellSizeY = h / cols;
  for (let i = ystart; i < ystart + h - 1; i += cellSizeY) {
    for (let j = xstart; j < xstart + w - 1; j += cellSizeX) {
      let noiseValue = noise(j * scale, i * scale);
      let angle = map(noiseValue, 0, 1, 0, TWO_PI);
      strokeWeight(width / 700);
      push();
      translate(j + cellSizeX / 2, i + cellSizeY / 2);
      rotate(angle);
      line(0, 0, cellSizeX * 0.8, 0);
      pop();
    }
  }
}
function Pixelate(xstart, ystart, w, h, rows, cols) {
  let cellSizeX = w / rows;
  let cellSizeY = h / cols;
  let buffer = createGraphics(width, height);
  buffer.copy(Canvas, 0, 0, width, height, 0, 0, buffer.width, buffer.height);
  for (let i = ystart; i < ystart + h - 1; i += cellSizeY) {
    for (let j = xstart; j < xstart + w - 1; j += cellSizeX) {
      let pixelColor = buffer.get(j, i);
      pixelColor = color(red(pixelColor), green(pixelColor), blue(pixelColor));
      fill(pixelColor);
      stroke(pixelColor);
      rect(j, i, cellSizeX, cellSizeY);
    }
  }
}
function Tree(x, y, branchLength, level) {
  if (level == 1) {
    push();
    angleMode(DEGREES);
    translate(x, y);
  }
  let angle = 25;
  strokeCap(SQUARE);
  strokeWeight(map(branchLength, 0, width / 10, width / 900, width / 100));
  stroke(0);
  line(0, 0, 0, -branchLength);
  strokeWeight(map(branchLength, 0, width / 10, width / 900, width / 130));
  stroke(myColor);
  line(0, branchLength * 0.05, 0, -branchLength * 1.05);
  translate(0, -branchLength);
  if (branchLength > width / 160 && level < 10) {
    push();
    rotate(angle + random(-5, 5));
    Tree(x, y, branchLength * 0.77 + random(-10, 10), level + 1);
    pop();
    push();
    rotate(-angle + random(-5, 5));
    Tree(x, y, branchLength * 0.77 + random(-10, 10), level + 1);
    pop();
  }
  if (level == 10 && !finishedDrawing) {
    pop();
    finishedDrawing = true;
  }
}
function NumberGrid(xstart, ystart, w, h, rows, cols) {
  let cellSizeX = w / rows;
  let cellSizeY = h / cols;
  let numb = 1;
  for (let i = ystart; i < ystart + h - 1; i += cellSizeY) {
    for (let j = xstart; j < xstart + w - 1; j += cellSizeX) {
      noFill();
      stroke(random(myColors));
      rect(j, i, cellSizeX, cellSizeY);
      stroke(0);
      textSize(cellSizeX / 8);
      fill(255);
      text(str(numb), j + cellSizeX / 25, i + cellSizeX / 7);
      numb += 1;
    }
  }
}
