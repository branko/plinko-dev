function variableSpeed(wrench=false) {
  let time = new Date()
  let frame = 0
  let timeElapsed;
  let avgTime
  let speed = 1000 / 60


  const incrementFrame = () => {
    frame++;
    timeElapsed = new Date() - time

    avgTime = (new Date() - timeElapsed) / 1000

    if (frame % 60 === 0) {
      console.log(`Elapsed time: ${avgTime}`)
      console.log(`Average fps: ${frame / avgTime}`)
    }

    if (wrench) {
      if (Math.random() < 0.001) {
        console.log('wrench')
        for (let i = 0; i < 1000000000; i++) {}
      }
    }

    time = new Date()

    let offset = timeElapsed - (1000 / 60)
    // console.log(`time elapsed: ${timeElapsed}, offset: ${offset}`)
    if (offset === 0) {
      speed = 1000 / 60
    } else if (offset > 0) {
      speed = 1000 / 60 - offset
    } else if (offset < 0) {
      speed = 1000 / 60 + offset
    }

    timeout()
  }

  function timeout() {
    setTimeout(incrementFrame, speed)
  }

  timeout()
}

function regularSetInterval() {
  let time = new Date()

  setInterval(() => {
      console.log("Time elapsed: ", ((new Date() - time) / 1000))
      time = new Date()
  }, 1000)
}

function regularSetInterval60FPS() {
  let time = new Date()
  let counter = 0

  setInterval(() => {
    counter++
    let elapsed = new Date() - time

    if (counter % 60 === 0) {
      console.log(`Time elapsed after 60 frames: ${elapsed}ms, Actual FPS: ${(1000/elapsed)}fps`)
    }

    time = new Date()
  }, 1000 / 60)
}

function usingWhileLoop() {
  let time = new Date()

  while (true) {
    let elapsed = (new Date() - time)
    if (elapsed % 1000 === 0 && elapsed > 0) {
      console.log("Time elapsed: ", (new Date() - time))
      time = new Date()
    }
  }
}

// regularSetInterval()
// regularSetInterval60FPS()
// usingWhileLoop()
variableSpeed(process.argv[2])







//
//
// let quit = false
//
// let t = 0.0;
// const dt = 0.01;
//
// let currentTime = new Date();
// let accumulator = 0.0;
//
// while ( !quit )
// {
//     let newTime = new Date();
//     let frameTime = newTime - currentTime;
//     currentTime = newTime;
//
//     accumulator += frameTime;
//
//     while ( accumulator >= dt )
//     {
//         integrate( state, t, dt );
//         Engine.update(engine, TIMESTEP)
//         accumulator -= dt;
//         t += dt;
//     }
//
//     render( state );
// }
