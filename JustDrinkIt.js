var sound, amplitude, cnv;
var button, slider, slidervalue, buttonPause, buttonContinue, buttonRestart;
var lion;
var level_one_x=[], level_one_y=[], level_two_x=[], level_two_y=[];
var level;   //gets the volume of the sound.
var size;
var count=0;
var objectNum=15;
var countchange=200;
var maxTemp;
var obj = { "hot" : ["item1", "item2"]};

/*
var NORTH = 0;
 var EAST = 1;
 var SOUTH =2;
 var WEST=3;
 
 var direction = SOUTH;
 var stepSize = 200;
 var minLength = 10;
 var angleCount = 7;
 var angle;
 var reachedBorder = false;
 var posX;
 var posY;
 var posXcross;
 var posYcross;
 var dWeight = 50;
 
 var img, imgX, imgY;
 */

function preload() {
  sound=loadSound("in-the-bleak-midwinter.mp3");
  //img=loadImage('left.gif');
}


var max_planets = 200;
var planets = [];
function Planet(x, y, vx, vy, sz, c) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.sz = sz;
  this.c = c;
  this.move = function() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x<0 || this.x>windowWidth) this.vx = -this.vx;
    if (this.y<0 || this.y>windowHeight) this.vy = -this.vy;
  }
  this.render = function() {
    noStroke();
    fill(this.c);
    ellipse(this.x, this.y, this.sz, this.sz);
  }
}

function setup() {
  //frameRate(30);
  cnv=createCanvas(windowWidth, windowHeight);

  var url='http://apis.skplanetx.com/weather/summary?appKey=924a6112-f17a-3468-8bfc-cea3bb46dd29&version=1&lat=37.571400&lon=126.96580000&stnid=108';
  loadJSON(url, getWeather);

  colorMode(HSB, 360, 100, 100);
  background(0);
  amplitude=new p5.Amplitude([0.5]);
  console.log(obj.hot);

  //
  /*
  angle = getRandomAngle(direction);
   posX = floor(random(width));
   posY = 5;
   posXcross = posX;
   posYcross = posY;
   */

  var i;
  for (i=0; i<max_planets; i++) {
    planets[i] = new Planet(
      random(0, windowWidth), random(0, windowHeight), 
      random(-2, 2), random(-2, 2), 
      random(10, 80), color(random(0, 360), random(50, 150), random(50, 150)) );
  }




  slider=createSlider(0, 5, 0, 1);
  slidervalue=slider.value();
  slider.position(30, 30);

  //imgX=width/2;
  //imgY=height-img.height/3;
  //image(img, imgX, imgY, img.width/3, img.height/3);


  fill(255);
  textSize(50);
  textAlign(CENTER);

  text("Just Drink It", width/2, windowHeight/2-50);
  buttonSimple=createButton('간편 음료 추천');
  buttonSimple.position(width/2-60, height/2);
  buttonSimple.size(120, 50);

  fill(255);
  textSize(10);
  text("날씨, 시간에 따라 음료를 추천받을 수 있어요!", width/2, height/2+65);

  buttonDetail=createButton('상세 음료 추천');
  buttonDetail.position(width/2-60, height/2+90);
  buttonDetail.size(120, 50);
  fill(255);
  textSize(10);
  text("기분에 따라 음료를 추천받을 수 있어요!", width/2, height/2+155);


  /*
  buttonPause=createButton('Pause');
   buttonPause.position(width-300, 30);
   buttonPause.size(100, 30);
   buttonPause.mouseClicked(function() {
   if (sound.isPlaying()) {
   sound.stop();
   noLoop();
   }
   }
   );
   
   
   buttonContinue=createButton('Continue');
   buttonContinue.position(width-150, 30);
   buttonContinue.size(100, 30);
   buttonContinue.mouseClicked(function() {
   if (!sound.isPlaying()) {
   sound.play();
   loop();
   }
   }
   );
   */

  for (var i=0; i<objectNum; i++) {
    level_one_x[i]=random(0, width);
    level_one_y[i]=random(0, height-300);
  }

  for (var i=0; i<objectNum; i++) {
    level_two_x[i]=random(400, width);
    var identifier=random();
    if (identifier>0.5) {
      level_two_y[i]=height-40;
    } else {
      level_two_y[i]=height-250;
    }
  }

  buttonDetail.mousePressed(gamestart);
  buttonDetail.style('border', 'none');
  noLoop();
}



function gamestart() {
  sound.play();

  cnv.mouseClicked(function() {
    if (sound.isPlaying()) {
      sound.stop();
      //noLoop();
    } else {
      //loop();
      sound.play();
    }
  }
  );

  background(200, 200, 50);
  slider.value(++slidervalue);
  buttonDetail.remove();
  buttonSimple.remove();

  fill(255);

  loop();


  /*
 lion.changeAnimation("rightjump");
   */
}


function draw() {

  if (slidervalue==1) {

    background(255);
    var i;
    for (i=0; i<max_planets; i++) {
      planets[i].move();
      planets[i].render();
    }

    fill(255);
    rect(0, height/2-height/8, width, height/4);
    fill(0);
    textSize(10);
    text("어떤 계열의 색이 제일 먼저 보이나요?", width/2, height/2-height/16);
    fill(10, 100, 100);
    rect(50, height/2, 50, 50);

    

    fill(50, 100, 100);
    buttonRed=createButton('');
    buttonRed.size(50, 50);
    buttonRed.position(120, height/2);

    text(maxTemp, width/2, height-100);

      fill(120, 70, 100);
    rect(190, height/2, 50, 50);

    fill(220, 70, 70);
    rect(260, height/2, 50, 50);

    fill(290, 100, 50);
    rect(330, height/2, 50, 50);

    fill(100, 0, 100);
    stroke(0);
    rect(400, height/2, 50, 50);



    /* count++;
     if (count>countchange) {
     slider.value(++slidervalue);
     }
     }
     
     
     if (slidervalue==2) {
     background(200, 200, 50);
     noStroke();
     fill(255);
     textSize(50);
     
     
     //image(img, imgX, imgY, img.width/3, img.height/3);
     
     if (keyIsDown(LEFT_ARROW)) {
     imgX-=5;
     }
     if (keyIsDown(RIGHT_ARROW)) {
     imgX+=5;
     }
     if (keyPressed) {
     if (key == ' ') {
     imgY=imgY-5;
     }
     }
     
     
     
     text("LEVEL 2", width/2, 70);
     for (var i=0; i<objectNum-5; i++) {
     rect(level_two_x[i], level_two_y[i]+random(-1, 1), 10, 40);
     }
     
     for (var i=0; i<objectNum-5; i++) {
     level_two_x[i]-=random(2, 5);
     if (level_two_x[i]<0) {
     level_two_x[i]=width;
     }
     }
     count++;
     if (count>countchange*2) {
     slider.value(++slidervalue);
     }
     }
     
     if (slidervalue==3) {
     background(200, 200, 50);
     fill(255);
     textSize(50);
     
     //image(img, imgX, imgY, img.width/3, img.height/3);
     
     if (keyIsDown(LEFT_ARROW)) {
     imgX-=5;
     }
     if (keyIsDown(RIGHT_ARROW)) {
     imgX+=5;
     }
     
     
     text("LEVEL 3", width/2, 70);
     
     // ------ draw dot at current position ------
     strokeWeight(3);
     stroke(0, 0, 0);
     point(posX, posY);
     // ------ make step ------
     posX += cos(radians(angle)) * stepSize;
     posY += sin(radians(angle)) * stepSize;
     // ------ check if agent is near one of the display borders ------
     reachedBorder = false;
     if (posY <= 5) {
     direction = SOUTH;
     reachedBorder = true;
     } else if (posX >= width - 5) {
     direction = WEST;
     reachedBorder = true;
     } else if (posY >= height - 5) {
     direction = NORTH;
     reachedBorder = true;
     } else if (posX <= 5) {
     direction = EAST;
     reachedBorder = true;
     }
     // if agent is crossing his path or border was reached, then draw a line
     loadPixels();
     var currentPixel = get(floor(posX), floor(posY));
     if (reachedBorder ||
     (currentPixel[0] != 255 || currentPixel[1] != 255 || currentPixel[2] != 255)) {
     var distance = dist(posX, posY, posXcross, posYcross);
     if (distance >= minLength) {
     strokeWeight(distance / dWeight);
     stroke(0, 0, 0 );
     line(posX, posY, posXcross, posYcross);
     }
     posXcross = posX;
     posYcross = posY;
     angle = getRandomAngle(direction);
     }
     
     count++;
     if (count>countchange*3) {
     slider.value(++slidervalue);
     }
     }
     
     if (slidervalue==4) {
     background(200, 200, 50);
     noStroke();
     fill(255);
     textSize(50);
     
     text("LEVEL 4", width/2, 70);
     
     count++;
     if (count>4000) {
     ++slidervalue;
     }
     }
     
     
     if (slidervalue==5) {
     background(200, 200, 50);
     noStroke();
     fill(255);
     textSize(50);
     
     text("LEVEL 5", width/2, 70);
     
     count++;
     if (count>5000) {
     slider.value(++slidervalue);
     }
     }
     
     if (slidervalue==6) {
     background(200, 200, 50);
     noStroke();
     fill(255);
     textSize(50);
     
     text("Congradulations!! You Passed Every Stage!!", width/2, 70);
     
     slidervalue=0;
     buttonRestart=createButton('RESTART');
     buttonRestart.position(width/2-50, height/2);
     buttonRestart.size(100, 30);
     buttonRestart.mouseClicked(function() {
     slidervalue=1;
     count=0;
     }
     );
     }
     */
  }
}

function keyPressed() {
}


function keyReleased() {
  if (keyCode == DELETE || keyCode == BACKSPACE) background(360);
}
function getRandomAngle(currentDirection) {
  var a = random(-80, 80);
  if (currentDirection == NORTH) return a - 90;
  if (currentDirection == EAST) return a;
  if (currentDirection == SOUTH) return a + 90;
  if (currentDirection == WEST) return a + 180;
  return;
}

function getWeather(data) {
  console.log(data);
  maxTemp = data.weather.summary[0].yesterday.temperature.tmax;
  console.log(maxTemp);
}



//video(mp4 format : 1min), code(folder), project document(name_studentid, background, method, characteristics(pdf)) 