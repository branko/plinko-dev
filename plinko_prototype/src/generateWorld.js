import { Bodies, World } from 'matter-js';
import Peg from './bodies/Peg';
import { Wall, Ground } from './bodies/Wall';
import { CANVAS_WIDTH, CANVAS_HEIGHT, SPACING, ROWS, COLS } from './constants/canvas';

// Array to hold bodies to add to world later
const bodies = []

// Generate pegs
for (var row = 0; row < ROWS; row++) {
  for (var col = 0; col < COLS + 1; col++) {
    var rowSpace = col * SPACING;
    if (row % 2 == 0) {
      rowSpace += SPACING / 2;
    }
    var colSpace = SPACING + row * SPACING;
    var peg = new Peg(rowSpace, colSpace, 3);
    bodies.push(peg)
  }
}

// Generate bucket walls
for (var i = 1; i < COLS; i++) {
  let wall = new Wall(SPACING * i, CANVAS_HEIGHT - 80, 5, 200);
  bodies.push(wall)
}

// Generate left and right walls
const leftWall = new Wall(0, CANVAS_HEIGHT / 2, 5, CANVAS_HEIGHT);
const rightWall = new Wall(CANVAS_WIDTH, CANVAS_HEIGHT / 2, 5, CANVAS_HEIGHT);

bodies.push(leftWall)
bodies.push(rightWall)

// Generate ground
const ground = new Ground();
bodies.push(ground)

export default bodies