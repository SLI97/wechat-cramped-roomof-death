import State from '../../../base/State'
import CanvasManager from '../../../runtime/CanvasManager'
import DataManager from '../../../runtime/DataManager'

export default class BurstState extends State {
	constructor(owner, fsm, animations, isLoop) {
		super(animations, isLoop)
		this.owner = owner
		this.fsm = fsm
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
				((x * 32) ) * dpr + offset.width,
				((y * 32))* dpr + offset.height,
        width * dpr,
        height * dpr
			)
		}
	}
}
