import State from './State'
import CanvasManager from '../runtime/CanvasManager'
import DataManager from '../runtime/DataManager'

import {
	PLAYER_STATE
} from '../enums/index'

export default class NoLoopState extends State {
	constructor(owner, fsm, animations) {
		super(animations, false)
		this.owner = owner
		this.fsm = fsm
	}

	render() {
		const image = this.animations[this.index]
		const {offset} = DataManager.Instance
		const {
			x,
			y,
			width,
			height,
		} = this.owner
		if (image) {
			CanvasManager.Ctx.drawImage(
				image,
				(x * 32) + offset.width - 32 - 15,
				(y * 32) + offset.height - 32 - 18,
				width,
				height
			)
		}
	}

	callback() {
		this.owner.state = PLAYER_STATE.IDLE
	}
}
