import DataManager from '../DataManager'

// const __ = {
// 	timer: Symbol('timer'),
// }

export default class Animator {


	constructor() {
		// 当前动画是否播放中
		this.isPlaying = false

		// 动画是否需要循环播放
		this.loop = false

		// 每一帧的时间间隔
		this.interval = 1000 / 6

		this.index = 0

		this.timer = null

		this.offset = DataManager.Instance.getOffset()
		this.animation = {}
	}


	initFrames() {
	}

	// 将播放中的帧绘制到canvas上
	render(ctx) {}


	resetIndex() {
		this.index = 0
	}

	// 停止帧动画播放
	stop() {
		this.isPlaying = false

		if (this.timer){
			clearInterval(this.timer)
		}
		// if (this[__.timer])
		// 	clearInterval(this[__.timer])
	}
}
