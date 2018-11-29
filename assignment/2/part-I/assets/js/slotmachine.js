"use strict";

class SlotMachine {
  	constructor(options) {
    	if (!options.button) {
      		new Error("Please define button and rotator in an options object.");
    	}

    this.state = {
      	isRotating: false,
      	nodes: [],
		win: false
    };
    this.selectors = {
      	nodes: document.querySelectorAll(".machine__slot-rotator"),
      	button: document.querySelector(options.button),
      	main: document.querySelector("main"),
		frame: document.querySelectorAll(".machine__slot-rotator")
    };

    this.init();
  	}

  	init() {
    	this._functionBinds();
    	this._bindEvents();
		this._resizePlayArea();
  	}

	//  public API
  	play() {
		this.reset();
    	this._startRotationAnimation();
    	this._assignSlotResults();
		this._setEndposition();
    	this._stopRotationAnimation();
    	this._isWinner();
  	}

  	toggleRotation() {
    	if (this.state.isRotating) {
      		this._stopRotationAnimation();
    	} else {
      		this._startRotationAnimation();
    	}
  	}

	reset() {
		this.state.win = false;
		this.selectors.main.classList.remove("winner");
	}

	//  Animation
	_startRotationAnimation() {
    	this.state.isRotating = true;
		requestAnimationFrame( frame =>
	    	this.selectors.nodes.forEach(element => {
	      		element.classList.add("rotating");
    		})
		);
	}

	_stopRotationAnimation() {
    	this.state.isRotating = false;
    	this.selectors.nodes.forEach(element => {
    		element.classList.remove("rotating");
    	});
	}

	_setEndposition() {
		this.selectors.nodes.forEach((element, index) => {
			const value = this.state.nodes[index];
			const positions = ["position-0", "position-1", "position-2", "position-3", "position-4"];
			element.classList.remove(...positions);
			element.classList.add("position-" + value);
		});
	}

	_resizePlayArea() {
		requestAnimationFrame(frame => this.selectors.frame.forEach(element => {
			element.style.height = element.clientWidth + "px";
			// element.style.width = element.clientWidth + "px";
			console.log(element.clientHeight, element.clientWidth);
		}));
	}

	//  Utility & Logic
	_generateRandomNumbers(max) {
    	const pseudoRandom = Math.random() * max;
		if(pseudoRandom < 0.5 || 4.5 < pseudoRandom) {
			return 0;
		}

		return Math.round(pseudoRandom);
  	}

	_assignSlotResults() {
    	this.state.nodes[0] = this._generateRandomNumbers(5);
    	this.state.nodes[1] = this._generateRandomNumbers(5);
    	this.state.nodes[2] = this._generateRandomNumbers(5);
  	}

  	_isWinner() {
    	const value1 = this.state.nodes[0];
    	const value2 = this.state.nodes[1];
    	const value3 = this.state.nodes[2];

    	if (! (value1 === value2 || value2 === value3 || value1 === value3)) return;

		this.state.win = true;
		this.selectors.main.classList.add("winner");
  	}

	//  Setup
	_functionBinds() {
		this.play = this.play.bind(this);
		this._resizePlayArea = this._resizePlayArea.bind(this);
  	}

	_bindEvents() {
		this.selectors.button.addEventListener("click", this.play);
		window.addEventListener("resize", this._resizePlayArea);
	}
}

new SlotMachine({
	button: "#button-trigger"
});
