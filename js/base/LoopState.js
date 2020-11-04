import State from './State'
import CanvasManager from '../runtime/CanvasManager'
import DataManager from '../runtime/DataManager'

export default class LoopState extends State {
	constructor(owner, fsm, animations) {
		super(animations, true)
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
}
