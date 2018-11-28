'use strict';

class Menu {

	constructor(options) {
		if(! (options.button || options.menu || options.toggle)) {
			return new Error("No options parameter missing.")
		}

		// defaults
		this.state = {
			isOpened: false,
			isAltStyled: false
		}

		this.selectors = {
			button: document.querySelector(options.button),
			menu: document.querySelector(options.menu),
			styleToggle: document.querySelector(options.toggle),
			main: document.querySelector('main'),
			menuClose: document.querySelector('#menu-close')
		}

		this.init();
	}

	init() {
		this.menuToggle = this.menuToggle.bind(this);
		this.colourToggle = this.colourToggle.bind(this);
		this.selectors.button.addEventListener('click', this.menuToggle);
		this.selectors.menuClose.addEventListener('click', this.menuToggle);
		this.selectors.styleToggle.addEventListener('click', this.colourToggle);
	}

	menuToggle() {
		if(this.state.isOpened) {
			__close(this);
		} else {
			__open(this);
		}

		function __close(object) {
			const _self = object;
			_self.state.isOpened = false;
			_self.selectors.menu.classList.remove('menu-open');
		}
		function __open(object) {
			const _self = object;
			_self.state.isOpened = true;
			_self.selectors.menu.classList.add('menu-open');
		}
	}

	colourToggle() {
		if(this.state.isMono) {
			__mono(this);
		} else {
			__coloured(this);
		}

		function __mono(object) {
			const _self = object;
			_self.state.isAltStyled = false;
			_self.selectors.main.classList.remove('alternate-style');
		}
		function __coloured(object) {
			const _self = object;
			_self.state.isAltStyled = true;
			_self.selectors.main.classList.add('alternate-style');
		}
	}

}

new Menu({
		"button": "#button-settings",
		"menu": "#overlay",
		"toggle": "#theme-selection"
});