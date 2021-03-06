import Sprite from '../base/Sprite'
import CanvasManager from '../runtime/CanvasManager'
import DataManager from "../runtime/DataManager";


/***
 * UI按钮类
 */
export default class Button extends Sprite {
	constructor(img) {
		super(img)
		this.visible = false
		this.touchHandler = this.touchEventHandler.bind(this)
		this.init()
	}

	render() {
		if (!this.img || !this.visible) {
			return
		}

		const {startX, startY, width, height} = this.position
    const {offset,dpr} = DataManager.Instance
		CanvasManager.Ctx.drawImage(
			this.img,
			startX ,
			startY,
      width * dpr,
      height * dpr
		)
	}

	onShow() {
		this.visible = true
		this.onBind()
	}

	onHide() {
		this.visible = false
		this.unBind()
	}

	onBind() {
		canvas.addEventListener('touchstart', this.touchHandler)
	}

	unBind() {
		canvas.removeEventListener('touchstart', this.touchHandler)
	}

	touchEventHandler(e) {
		e.preventDefault()
		let x = e.touches[0].clientX
		let y = e.touches[0].clientY
		const {startX, startY, endX, endY} = this.position
		if (x >= startX && x <= endX && y >= startY && y <= endY) {
			this.onClick()
		}
	}
}
