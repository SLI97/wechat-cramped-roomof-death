import CanvasManager from '../../../../runtime/CanvasManager'
import NoLoopState from '../../../../base/NoLoopState'
import DataManager from '../../../../runtime/DataManager'

export default class CloseState extends NoLoopState {
	constructor(owner,fsm,animations) {
    super(owner, fsm, animations)
	}

	render() {
		const image = this.animations[this.index]
    const {offset,dpr} = DataManager.Instance
		const {
			x,
			y,
			width,
			height,
		} = this.owner
		if (image) {
			CanvasManager.Ctx.drawImage(
				image,
				((x * 32) - 32 - 16)* dpr + offset.width,
				((y * 32) - 32 - 16)* dpr + offset.height,
				width * dpr,
				height * dpr
			)
		}
	}

	callback(){
	}
}
