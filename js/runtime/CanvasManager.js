import Singleton from '../base/Singleton'

const SCREEN_WIDTH = window.innerWidth
const SCREEN_HEIGHT = window.innerHeight

/***
 * Canvas绘图管理类，负责输出canvas上下文context
 */
export default class CanvasManager extends Singleton {

	static ctx = null

	constructor() {
		super()
	}

	static get Instance() {
		return super.GetInstance(CanvasManager)
	}

	static get Ctx() {
		if (!this.ctx) {
			this.ctx = canvas.getContext('2d')
		}
		return this.ctx
	}

	adapt(){
		const ratio = wx.getSystemInfoSync().pixelRatio;
		canvas.width = SCREEN_WIDTH * ratio;
		canvas.height = SCREEN_HEIGHT * ratio;
		CanvasManager.Ctx.scale(ratio, ratio);
	}
}