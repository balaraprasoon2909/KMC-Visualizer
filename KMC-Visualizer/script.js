function setup() {
	console.clear()
	createCanvas(window.innerWidth, window.innerHeight);
	ellipseMode(CENTER)
	data = new DataPoints()
	colors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe']
}

let data, color

function draw() {
	background(51);
	let x = 50, y = 50
	while(x < width) {
		stroke(255, 10);
		strokeWeight(1)
		line(x, 0, x, height);
		x += 50;
	}
	while(y < height) {
		stroke(255, 10);
		strokeWeight(1)
		line(0, y, width, y);
		y += 50;
	}
	if (data.running) {
		data.cluster();
	}
	// frameRate(2)
	data.show();
}

function sqrDist(a, b) {
	return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y)
}

function mousePressed() {
	if (mouseY < height - 100 || mouseX < width - 300) {
		data.points.push({pos: createVector(mouseX, mouseY), cluster: -1});
	}
}

function mouseDragged() {
	if (mouseY < height - 100 || mouseX < width - 300) {
		let p = p5.Vector.random2D().setMag(random(50))
		data.points.push({pos: createVector(mouseX + p.x, mouseY + p.y), cluster: -1});
	}
}

function begin() {
	data.cost = []
	data.initClusters(1)
	data.running = true
}

function addRandom() {
	for (var i = 0; i < 100; i++) {
		data.points.push({
			pos: createVector(random(width), random(0, height - 100)),
			cluster: -1
		})	
	}
}