let current,
  next,
  gen = 0,
  res = 50, // NOTE: Must divide evenly into width and height!
  wr,
  hr

function setup() {
  createCanvas(1000, 800)
  wr = width / res
  hr = height / res
  const size = (wr * height) / res
  current = new Array(size)
  next = new Array(size)
  current.fill(0)
  next.fill(0)
  frameRate(10)
  const rate = createSlider(1, 60, 10)
  rate.changed(() => {
    frameRate(rate.value())
  })
  const reset = createButton('Reset')
  reset.mousePressed(() => {
    current.forEach((cell, i) => {
      current[i] = floor(random(2))
    })
    gen = 0
    loop()
  })
  noStroke()
}

function draw() {
  background(0)
  current.forEach((cell, i) => {
    const col = i % wr
    const row = floor(i / wr)
    if (cell === 1) {
      // draw current living cells
      fill(255)
      square(col * res, row * res, res)
    }
    // calculate next living cells
    let sum = 0
    for (let c = col - 1; c <= col + 1; c++) {
      for (let r = row - 1; r <= row + 1; r++) {
        if (c >= 0 && c < wr && r >= 0 && r < hr) {
          const j = wr * r + c
          if (j !== i && current[j] === 1) sum++
        }
      }
    }
    next[i] = (cell === 1 && sum === 2) || sum === 3 ? 1 : 0
    // draw neighbor sums
    // if (next[i] === 1) {
    //   fill(color('green'))
    // } else {
    //   fill(color('red'))
    // }
    // text(sum, col * res + res / 2, row * res + res / 2)
  })
  // check to see if reached stasis
  // if (JSON.stringify(current) == JSON.stringify(next)) {
  //   noLoop()
  //   console.log(gen)
  // }
  // go to next generation
  current = next.slice()
  gen++
}
