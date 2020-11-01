import Sprite from '../../base/Sprite'
import SmokeStateMachine from './Animator/SmokeStateMachine'
import {
	DIRECTION_ENUM,
} from '../../enums/index'

const SMOKE_WIDTH = 128
const SMOKE_HEIGHT = 128

export default class Smoke extends Sprite {
	constructor() {
		super(null, SMOKE_WIDTH, SMOKE_HEIGHT)
		this.init()
	}

	init() {
		this.direction = DIRECTION_ENUM.BOTTOM
		this.fsm = new SmokeStateMachine(this)
	}

	update() {
		if (this.fsm) {
			this.fsm.update()
		}
	}

	play() {
		this.visible = true
	}

	render() {
		if (!this.visible) {
			return
		}

		if (this.fsm) {
			this.fsm.render()
		}
	}
}