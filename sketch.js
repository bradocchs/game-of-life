let current, next, gen = 0, res = 50

function setup() {
  createCanvas(800, 600)
  const size = width / res * height / res
  current = new Array(size)
  next = new Array(size)
  current.fill(0)
  current.forEach((cell, i) => {
    current[i] = floor(random(2))
  })
  next.fill(0)
  // noLoop()
  // frameRate(1)
}

function draw() {
  background(0)
  noStroke()
  current.forEach((cell, i) => {
    const col = i % (width / res)
    const row = floor(i / (width / res))
    if (cell === 1) {
      // draw current living cells
      fill(255)
      square(col * res, row * res, res)
    }
    // calculate next living cells
    let sum = 0
    for (let c = col - 1; c <= col + 1; c++) {
      for (let r = row - 1; r <= row + 1; r++) {
        if (c >= 0 && c < width / res && r >= 0 && r < height / res) {
          const j = width / res * r + c
          if (j !== i && current[j] === 1) sum++
        }
      }
    }
    next[i] = ((cell === 1 && sum === 2) || sum === 3) ? 1 : 0
    if (next[i] === 1) {
      fill(color('green'))
    } else {
      fill(color('red'))
    }
    text(sum, col * res + res / 2, row * res + res / 2)
  })
  // if (JSON.stringify(current) == JSON.stringify(next)) {
  //   noLoop()
  //   console.log(gen)
  // }
  current = next
  gen++
}