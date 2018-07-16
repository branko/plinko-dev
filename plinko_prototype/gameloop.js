const TICKS_PER_SECOND = 50;
const SKIP_TICKS = 1000 / TICKS_PER_SECOND;
const MAX_FRAMESKIP = 10 ;

const getTickCount = (function() {
  time = new Date()

  return function () {
    return new Date() - time
  }
})()

let nextGameTick = getTickCount()
let loops;
let frame = 0

let game_is_running = true;
while( game_is_running ) {

    loops = 0;
    while( getTickCount() > nextGameTick && loops < MAX_FRAMESKIP) {
      updateEngine()

      nextGameTick += SKIP_TICKS;
      loops++;
    }

    displayGame()
}









const FPS = 60;
const TIMESTEP = 1000 / FPS;
let startTime = Date.now();
let nextTick = Date.now();
let frame = 0;

function logFPS(frame, startTime) {
  let elapsedTime = (Date.now() - startTime) / 1000;
  if (frame % FPS === 0) {
    console.log(elapsedTime);
  }
}

function gameLoop() {
  if (Date.now() > nextTick) {
    logFPS(frame, startTime);

    nextTick += TIMESTEP;
    frame++;
  }
}

setInterval(wrench, 250)

setInterval(gameLoop, 0);
