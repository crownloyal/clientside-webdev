'use strict';

class SlotMachine {

	constructor(options) {
		if(! options.button || options.rotator) {
            new Error("Please define button and rotator in an options object.")
        }

		this._setupBinding();
		this._resetState()
	}

	setupBinding() {

	}

	_resetState() {

	}
}
