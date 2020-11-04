import CanvasManager from '../../../../runtime/CanvasManager'
import NoLoopState from '../../../../base/NoLoopState'

export default class CloseState extends NoLoopState {
	constructor(owner,fsm,animations) {
    super(owner, fsm, animations)
	}

	render() {
		const image = this.animations[this.index]
		const {
			x,
			y,
			width,
			height,
		} = this.owner
		if (image) {
			CanvasManager.Ctx.drawImage(
				image,
				(x * 32) + this.offset.width - 32 - 15,
				(y * 32) + this.offset.height - 32 - 18,
				width,
				height
			)
		}
	}

	callback(){
	}
}
