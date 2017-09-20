// setup canvas

var canvas = document.querySelector('canvas');
var para = document.querySelector('p');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to Shape

function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;  
}

//function to Ball inherits shape

function Ball(x, y, velX, velY, exists, color, size){
   Shape.call(this, x, y, velX, velY, exists);

   this.color = color;
   this.size = size;
}

// evilCircle

function EvilCircle(x, y, velX, velY, exists, color, size){
   Shape.call(this, x, y, exists);

   this.velX = 20;
   this.velY = 20;
   this.color = 'white';
   this.size = 50;
}
 

// function Draw methpd to the Ball prototype

Ball.prototype.draw = function() {
  ctx.beginPath();
  //ctx.lineWidth = 3;
  ctx.fillStyle  = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}
 // function draw method tha Evil circle

EvilCircle.prototype.draw = function() {
   ctx.beginPath();
   ctx.lineWidth = 3;
   ctx.strokeStyle  = this.color;
   ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
   ctx.moveTo(this.x + 15, this.y +1); 
   ctx.arc(this.x + 5, this.y + 25, 20, 0, Math.PI, true); 
   ctx.moveTo(this.x - 15, this.y- 10);
   ctx.arc(this.x - 15, this.y- 10, 5, 0, 2 * Math.PI);
   ctx.moveTo(this.x + 15, this.y- 10);
   ctx.arc(this.x + 15, this.y- 10, 5, 0, 2 * Math.PI);
   ctx.stroke();
}



// function to update Ball's method

Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}

// function to checkbounds for evilcircle

EvilCircle.prototype.checkBounds = function() {
  if ((this.x + this.size) >= width) {
    this.x = width - this.size;
  }

  if ((this.x - this.size) <= 0) {
    this.x = this.size;
  }

  if ((this.y + this.size) >= height) {
    this.y = height - this.size;
  }

  if ((this.y - this.size) <= 0) {
    this.y = this.size;
  }

}

// function to setcontrols by left, right, up and down keys

EvilCircle.prototype.setControls = function(){
var _this = this;
window.onkeydown = function(e) {
    if (e.keyCode === 37) {
      _this.x -= _this.velX;
    } else if (e.keyCode === 39) {
      _this.x += _this.velX;
    } else if (e.keyCode === 38) {
      _this.y -= _this.velY;
    } else if (e.keyCode === 40) {
      _this.y += _this.velY;
    }
  }
}


// method to check ball collision

Ball.prototype.collisionDetect = function() {
  for (var j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
      }
    }
  }
}

// collosion detection with evil circle

EvilCircle.prototype.collisionDetect2 = function() {
  for (var j = 0; j < balls.length; j++) {
    if ( balls[j].exists === true) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists = false;
        if (this.counter === undefined)
        { 
            this.counter = 1;
         }
        else
        { 
          this.counter++;
         }
         para.innerHTML = 'Ball Count:' +  (25 - this.counter);
      }
    }
  }
}

// Ball array

var balls = [];
var evilcircle = new EvilCircle(random(0,width), random(0,height), true);
evilcircle.setControls();

// function loop

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);
 // var EvilCircle = new EvilCircle(random(0,width), random(0,height), true);

  while (balls.length < 25) {
    var ball = new Ball(
      random(0,width),
      random(0,height),
      random(-7,7),
      random(-7,7),
      true,
      'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
      random(10,20)
    );
    balls.push(ball);
  }
 

  for (var i = 0; i < balls.length; i++) {
    evilcircle.draw();
    evilcircle.checkBounds();
    evilcircle.collisionDetect2();
    if (balls[i].exists === true){
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
}
  
}

  requestAnimationFrame(loop);
}

loop();
