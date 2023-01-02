const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope, rope2, rope3, fruit, ground;
var link, link2, link3;

var bg_img;
var food;
var rabbit;

var button, button2, button3;
var bunny;

var eat;
var blink;
var sad;

var airSound, eatingSound, ropeSound, sadSound, bgSound;

var isSad = false;

var airButton, muteButton;

var canH, canW;

function preload() {
  bg_img = loadImage('./assets/background.png');
  food = loadImage('./assets/melon.png');
  rabbit = loadImage('./assets/Rabbit-01.png');
  eat = loadAnimation("./assets/eat_0.png", "./assets/eat_1.png", "./assets/eat_2.png", "./assets/eat_3.png", "./assets/eat_4.png");
  blink = loadAnimation("./assets/blink_1.png", "./assets/blink_2.png", "./assets/blink_3.png");
  sad = loadAnimation("./assets/sad_1.png", "./assets/sad_2.png", "./assets/sad_3.png");
  blink.playing = true
  eat.playing = true
  sad.playing = true
  eat.looping = false
  sad.looping = false
  airSound = loadSound("./sounds/air.wav");
  eatingSound= loadSound("./sounds/eating_sound.mp3");
  ropeSound = loadSound("./sounds/rope_cut.mp3");
  sadSound = loadSound("./sounds/sad.wav");
  bgSound = loadSound("./sounds/sound1.mp3")

}


function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if(isMobile){
canW = displayWidth
canH = displayHeight
  } else{
    canW = 500
    canH = windowHeight - 20
  }
  createCanvas(canW, canH);
  frameRate(80);
  //bgSound.play()
  bgSound.setVolume(0.3);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('./assets/cut_btn.png');
  button.position(20, 30);
  button.size(50, 50);
  button.mouseClicked(drop);

  button2 = createImg("./assets/cut_btn.png");
  button2.position(width-170,35)
  button2.size(50,50)
  button2.mouseClicked(drop2);

  button3 = createImg("./assets/cut_btn.png");
  button3.position(width-140,200)
  button3.size(50,50)
button3.mouseClicked(drop3);


  airButton = createImg ("./assets/balloon.png");
  airButton.position(10,250);
  airButton.size(150,100);
  airButton.mouseClicked(air);

  muteButton = createImg("./assets/mute.png");
  muteButton.position(width-50,20);
  muteButton.size(50,50);
  muteButton.mouseClicked(mute);

  blink.frameDelay = 20
  eat.frameDelay = 20
  sad.frameDelay = 20
  rope = new Rope(8, { x: 40, y: 30 });
  rope2 = new Rope(7,{x:width-140, y:40});
  rope3 = new Rope(4,{x:width-100, y:210});

  ground = new Ground(width/2, height - 10, width, 20);
  bunny = createSprite(width -100, height - 70, 100, 100);
  bunny.addAnimation("blink", blink);
  bunny.addAnimation("eat", eat);
  bunny.addAnimation("sad", sad);
  bunny.changeAnimation("blink");
  bunny.scale = 0.2;

  fruit = Bodies.circle(300, 300, 20);
  Matter.Composite.add(rope.body, fruit);

  link = new Link(rope, fruit);
  link2 = new Link(rope2, fruit);
  link3= new Link(rope3, fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50)

}

function draw() {
  background(51);
  image(bg_img, width / 2, height / 2, width, height);

  push();

  if (fruit != null) {
    image(food, fruit.position.x, fruit.position.y, 70, 70);
  }
  pop();
  //verificando se o coelho comeu
  if (collide(fruit, bunny) == true) {
    World.remove(engine.world, fruit);
    fruit = null;
    bunny.changeAnimation("eat");
    eatingSound.play();
  }
  if(fruit!= null && fruit.position.y > bunny.position.y){
    bunny.changeAnimation("sad");
    if(! isSad){
      sadSound.play();
    isSad = true
    }
    
  }
  rope.show();
  rope2.show();
  rope3.show();

  Engine.update(engine);
  ground.show();
  drawSprites();

}

function drop() {
  rope.break();
  ropeSound.play();
  link.detach();
  link = null;
}
function drop2(){
  rope2.break();
  ropeSound.play();
  link2.detach();
  link2 = null;
}
function drop3(){
  rope3.break();
  ropeSound.play();
  link3.detach();
  link3 = null;
}
function collide(body, sprite) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (d <= 80) {

      return true;
    }
    else {
      return false;
    }
  }
}
function air(){
  Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
  airSound.play();
}

function mute(){
  if(bgSound.isPlaying()){
bgSound.stop()
  }
  else{
bgSound.play()
  }
}