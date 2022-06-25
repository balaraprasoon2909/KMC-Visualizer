class DataPoints {
	constructor() {
		this.prevCluster = []
		this.points = []
		this.centroids = []
		this.running = false
		this.cost = []
		this.done = false
		this.counter = 0
		this.stepCost = []
		this.result
	}

	show() {
		noStroke()
		this.points.map((c) => {
			fill(255)
			if (c.cluster > -1) {
				fill(colors[c.cluster])
				stroke(colors[c.cluster])
				line(c.pos.x, c.pos.y, this.centroids[c.cluster].pos.x, this.centroids[c.cluster].pos.y)
			} else {
				noStroke()
				fill(255)
			}
			ellipse(c.pos.x, c.pos.y, 5)
		})
		this.centroids.map((c, i) => {
			stroke(colors[i])
			fill(0)
			ellipse(c.pos.x, c.pos.y, 10)
		})
		if (this.done) {
			this.plotCost()
		}
	}

	cluster() {
		this.prevCluster = this.points.map((c) => c.cluster)
		this.points.map((c) => {
			let min = Infinity
			this.centroids.map((d) => {
				if (sqrDist(c.pos, d.pos) < min) {
					min = sqrDist(c.pos, d.pos)
					c.cluster = d.cluster
				}
			})
		})


		this.centroids.map((c, i) => {
			let l = 0, p = createVector(0, 0)
			this.points.map((d) => {
				if (d.cluster == i) {
					p.add(d.pos)
					++l
				}
			})
			c.pos = createVector(p.x / l, p.y / l)
		})

		let same = true
		this.points.map((c, i) => same = same && (c.cluster == this.prevCluster[i]))
		if (same) {
			this.calcCost(this.centroids.length)
			if (this.centroids.length < 10) {
				if (this.stepCost.length < this.centroids.length) {
					this.initClusters(this.centroids.length)
				} else {
					this.cost.push(this.stepCost)
					this.stepCost = []
					this.initClusters(this.centroids.length + 1)
				}
			} else {
				this.running = false
				this.conclude()
			}
		}
	}

	initClusters(x) {
		this.points.map((c) => c.cluster = -1)
		this.centroids = new Array(x).fill(0).map((c, i) => getCentroid(i))
	}

	calcCost(x) {
		let cost = 0
		this.points.map((c) => {
			cost += sqrDist(c.pos, this.centroids[c.cluster].pos)
		})
		this.stepCost.push({
			cost: log(cost),
			posArr: this.centroids
		})
	}

	conclude() {
		this.cost = this.cost.map((c) => {
			let min = Infinity, ind = 0
			for (var i = 0; i < c.length; i++) {
				if (c[i].cost < min) {
					min = c[i].cost
					ind = i
				}
			}
			return c[ind]
		})
		let sD = []
		for (let i = 1; i < this.cost.length - 1; i++) {
			sD[i] = this.cost[i+1].cost + this.cost[i-1].cost - 2*this.cost[i].cost
		}
		let max = -Infinity
		let index = 0
		for (let i = 0; i < sD.length; i++) {
			if (sD[i] > max) {
				max = sD[i]
				index = i
			}
		}
		this.done = true
		this.result = (index + 1)
		console.log("Best guess: " + (index + 1) + " clusters")
	}

	plotCost() {
		noStroke()
		fill(0, 30)
		rect(0, 0, 350, 300)

		stroke(153, 186, 221)
		strokeWeight(2)
		let a = this.cost[0].cost
		let b = this.cost[8].cost
		for (var i = 1; i < this.cost.length; i++) {
			line(i*35, map(this.cost[i-1].cost, b, a, 270, 30), (i+1)*35, map(this.cost[i].cost, b, a, 270, 30))
		}
		textSize(30)
		noStroke()
		fill(153, 186, 221)
		text("There are " + this.result + " clusters", width - 300, 50)

		this.centroids = this.cost[this.result - 1].posArr.map((c, i) => {
			return {
				pos: c.pos,
				cluster: i,
				color: colors[i]
			}
		})
		this.points.map((c) => {
			let min = Infinity
			this.centroids.map((d) => {
				if (sqrDist(c.pos, d.pos) < min) {
					min = sqrDist(c.pos, d.pos)
					c.cluster = d.cluster
				}
			})
		})
	}
}

function getCentroid(i) {
	return {
		pos: createVector(random(width), random(height - 100)),
		cluster: i,
		color: colors[i]
	}
}