var canvas = document.querySelector("canvas")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var c = canvas.getContext("2d")


var mouse = {
  x: undefined,
  y: undefined
}


var MAX_RADIUS = 40

var RANDOM_COLORS = ["#2185c5", "#7ecefd", "#fff6e5", "#ff7f66"]

var gravity = 1
var friction = 0.89


window.addEventListener('mousemove', function(event) {
  mouse.x = event.x
  mouse.y = event.y
})


window.addEventListener('resize', function() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  init()
})


window.addEventListener("click", () => {
  init()
})


function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}


class Ball {
  constructor(x, y, dy, dx, radius, color) {
    this.x = x
    this.y = y
    this.dy = dy
    this.dx = dx
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.stroke()
    c.fill()
    c.closePath()
  }

  update() {
    if(this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction
    } else {
      this.dy += gravity
    }

    if(this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
      this.dx = -this.dx
    }

    
    this.y += this.dy
    if(Math.floor(this.y) != (canvas.height - this.radius)) {
      this.x += this.dx
    }
    this.draw()
  }
}


var ballArray = []

function init() {
  ballArray = []
  for(let i = 0; i < 200; i++) {
    var radius = randomIntFromRange(8, 20)
    let x = randomIntFromRange(radius, canvas.width - radius)
    let y = randomIntFromRange(radius, canvas.height - radius)
    let dx = randomIntFromRange(-2, 2)
    let dy = randomIntFromRange(-2, 2)
    let color = randomColor(RANDOM_COLORS)
    ballArray.push(new Ball(x, y, dx, dy, radius, color))
  }
}


function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, innerWidth, innerHeight)
  ballArray.forEach(ball => ball.update())
}

init()
animate()