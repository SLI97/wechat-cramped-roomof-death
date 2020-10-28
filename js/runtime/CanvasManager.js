import Singleton from '../base/Singleton'


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
