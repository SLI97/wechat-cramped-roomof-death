import State from '../../../base/State'
import CanvasManager from '../../../runtime/CanvasManager'

export default class BurstState extends State {
	constructor(owner, fsm, animations, isLoop) {
		super(animations, isLoop)
		this.owner = owner
		this.fsm = fsm
	}

	render() {
	// 	const image = this.animations[this.index]
	// 	const {
	// 		x,
	// 		y,
	// 		width,
	// 		height,
	// 	} = this.owner
	// 	if (image) {
	// 		CanvasManager.Ctx.drawImage(
	// 			image,
	// 			(x * 32) + this.offset.width - 32 - 15,
	// 			(y * 32) + this.offset.height - 32 - 18,
	// 			width,
	// 			height
	// 		)
	// 	}
	}
}
