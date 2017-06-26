const random = (min, max) => Math.random() * (max - min) + min

class Particle {
	constructor ({ el, x, y, vX, vY, speed, gravity }) {
		Object.assign(this, { el, x, y, vX, vY, speed, gravity })
		this.size = 1
		this.decay = 0.0015

		return this
	}

	update () {
		if (this.size > 0) {
			this.size -= this.decay

			this.vY += this.gravity
			this.y += this.vY * this.speed
			this.x += this.vX * this.speed

			this.el.style = `transform: translateX(${this.x}px) translateY(${this.y}px); opacity: 1;`
		}
	}
}

const x = 0
const y = 400

const elementsLeft = Array.from(document.getElementsByClassName('emoji left'))
const elementsRight = Array.from(document.getElementsByClassName('emoji right'))

const particlesLeft = elementsLeft.map((el) => {

	const vX = random(2, 4)
	const vY = random(-3, -4.5)
	const speed = 0.2 + Math.random()
	const gravity = random(0.03, 0.05)

	return new Particle({ el, x, y, vX, vY, speed, gravity })
})

const particlesRight = elementsRight.map((el) => {

	const vX = -random(2, 4)
	const vY = random(-3, -4.5)
	const speed = 0.2 + Math.random()
	const gravity = random(0.03, 0.05)

	return new Particle({ el, x, y, vX, vY, speed, gravity })
})

const particles = [...particlesLeft, ...particlesRight]

let rendering = null

const render = () => {
	particles.forEach(particle => particle.update())
	rendering = requestAnimationFrame(render)

	if (particles.every(p => p.size <= 0)) {
		cancelAnimationFrame(rendering)

		const allElements = [...elementsLeft, ...elementsRight]
		allElements.forEach(el => el.remove())
	}
}

let ticking = false

const trigger = () => {
	if (!rendering && !ticking) {
		window.requestAnimationFrame(() => {
			if (document.getElementById("awards").getBoundingClientRect().top < 100) {
				render()
			}
			ticking = false
		})
	}
	
	ticking = true
}

setTimeout(() => { 
	window.addEventListener('scroll', trigger)
	trigger()
}, 500)