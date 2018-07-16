import { Bodies, World } from 'matter-js';
import Peg from './bodies/Peg';
import { Wall, Ground } from './bodies/Wall';
import { CANVAS_WIDTH, CANVAS_HEIGHT, SPACING, ROWS, COLS } from './constants/canvas';

// Array to hold bodies to add to world later
const backgroundBodies = []

// Generate pegs
for (var row = 0; row < ROWS; row++) {
  for (var col = 0; col < COLS + 1; col++) {
    var rowSpace = col * SPACING;
    if (row % 2 == 0) {
      rowSpace += SPACING / 2;
    }
    var colSpace = SPACING + row * SPACING;
    var peg = new Peg({ x: rowSpace, y: colSpace});
    backgroundBodies.push(peg)
  }
}

// Generate bucket walls
for (var i = 1; i < COLS; i++) {
  let wall = new Wall({ x: SPACING * i, y: CANVAS_HEIGHT - 80, width: 5, height: 200});
  backgroundBodies.push(wall)
}

// Generate left and right walls
const leftWall = new Wall({x: 0, y: CANVAS_HEIGHT / 2, width: 5, height: CANVAS_HEIGHT});
const rightWall = new Wall({x: CANVAS_WIDTH, y:CANVAS_HEIGHT / 2, width: 5, height: CANVAS_HEIGHT});

backgroundBodies.push(leftWall)
backgroundBodies.push(rightWall)

// Generate ground
const ground = new Ground();
backgroundBodies.push(ground)

export default backgroundBodies
