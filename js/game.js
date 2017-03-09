var lives = 10;
var buttons = [];
var wrapper, starter;

function start() {
	for (let i = 1; i <= 4; ++i) {
		window.setTimeout(function () {
			buttons[i] = new Target(i, wrapper);
		}, Math.random() * 1000);
	}
	window.setTimeout(function(){
		for (let i = 1; i <= 4; ++i) {
			console.log(buttons[i]);
			clearInterval(buttons[i].timerID);
			clearInterval(buttons[i].handlerID);
		}	
		if (lives > 0) {
			starter.value = "Вы победили!!1";
		}
	}, 60000);
}

document.addEventListener("DOMContentLoaded", function () {
	wrapper = document.getElementsByClassName("wrapper")[0];
	starter = document.getElementsByClassName("start")[0];
	starter.addEventListener("click", start);
});

class Target {
	constructor(name, parent) {
		this.timeout = 2000;
		this.button = document.createElement("button");
		this.button.style.width = "100px";
		this.button.style.height = "30px";
		this.button.innerHTML = name;
		this.button.style.visibility = Math.random() < 0.5 ? "visible" : "hidden";
		this.button.addEventListener("click", function () {
			this.style.visibility = "hidden";
			this.clicked = true;
		});
		parent.appendChild(this.button);
		this.start();
	}

	switchVisibility() {
		return this.button.style.visibility = this.button.style.visibility === "hidden" ? "visible" : "hidden";
	}

	timer() {
		var self = this;
		clearInterval(this.timerID);
		self.timerID = window.setInterval(function () {
			if (self.switchVisibility() === "hidden" && !self.clicked) {
				if (--lives <= 0) {
					starter.value = "Сударь, да вы проебали!";
					clearInterval(self.timerID);
				}
				console.log(lives);
			}
		}, this.timeout);
	}

	start() {
		var self = this;
		this.timer();
		this.handlerID = window.setInterval(function () {
			if (self.timeout > 400 && lives > 0) {
				self.timeout -= 100;
				self.timer();
			} else {
				clearInterval(timer);
			}
		}, 10000);
	}
}