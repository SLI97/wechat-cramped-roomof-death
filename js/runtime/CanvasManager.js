import Singleton from '../base/Singleton'

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

	static get Ctx(){
		if(!this.ctx){
			this.ctx = canvas.getContext('2d')
		}
		return this.ctx
	}

}
