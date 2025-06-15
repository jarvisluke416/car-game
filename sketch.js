// Matter.js setup
const { Engine, World, Bodies, Body } = Matter;

let engine, world;
let car;
let road;

function setup() {
  createCanvas(800, 600);

  // Matter.js engine
  engine = Engine.create();
  world = engine.world;
  world.gravity.y = 0;

  // Road is a static vertical rectangle
  const roadWidth = 100;
  const roadHeight = height;
  road = Bodies.rectangle(width / 2, height / 2, roadWidth, roadHeight, {
    isStatic: true,
    angle: 0
  });
  World.add(world, road);

  // Car starts on the road
  car = new Car(width / 2, height / 2);
  World.add(world, car.body);
}

function draw() {
  background(200);
  Engine.update(engine);

  // Draw road
  fill(60);
  noStroke();
  rectMode(CENTER);
  rect(width / 2, height / 2, 100, height);

  // Draw car
  car.show();
  car.update();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    car.accelerate(true);
  }
  if (keyCode === LEFT_ARROW) {
    car.setRotation(-PI / 36);
  }
  if (keyCode === RIGHT_ARROW) {
    car.setRotation(PI / 36);
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW) {
    car.accelerate(false);
  }
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    car.setRotation(0);
  }
}

// Car class
class Car {
  constructor(x, y) {
    this.width = 60;
    this.height = 30;
    this.rotation = 0;
    this.isAccelerating = false;

    this.body = Bodies.rectangle(x, y, this.width, this.height, {
      density: 0.01,
      friction: 0.2
    });
  }

  accelerate(state) {
    this.isAccelerating = state;
  }

  setRotation(angle) {
    this.rotation = angle;
    Body.setAngularVelocity(this.body, angle);
  }

  update() {
    if (this.isAccelerating) {
      const force = p5.Vector.fromAngle(this.body.angle).mult(0.01);
      Body.applyForce(this.body, this.body.position, { x: force.x, y: force.y });
    }
  }

  show() {
    const pos = this.body.position;
    const angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    fill(255, 0, 0);
    rect(0, 0, this.width, this.height);
    // Optional: add "tires"
    fill(0);
    ellipse(-this.width / 3, -this.height / 2, 10, 5);
    ellipse(this.width / 3, -this.height / 2, 10, 5);
    ellipse(-this.width / 3, this.height / 2, 10, 5);
    ellipse(this.width / 3, this.height / 2, 10, 5);
    pop();
  }
}
