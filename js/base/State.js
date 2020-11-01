import Player from '../player/Player'
import CanvasManager from '../runtime/CanvasManager'

/***
 * 使用es6的symbol模拟私有成员
 * @type {symbol}
 */
const timer = Symbol('timer')

/***
 * 状态（每组动画的承载容器）
 */
export default class State {
	constructor(animations, isLoop = true) {

		this.animations = animations || []
		this.isPlaying = false
		this.isRender = false
		this.isLoop = isLoop
		this.index = 0
		this[timer] = null
		this.interval = 1000 / 6
	}

	play() {
		this.isRender = true
		this.isPlaying = true

		if (this.interval > 0 && this.animations.length) {
			this[timer] = setInterval(
				this.frameLoop.bind(this),
				this.interval
			)
		}
	}

	render() {}

	frameLoop() {
		this.index++
		// console.log(this.index)
		if (this.index > this.animations.length - 1) {
			if (this.isLoop) {
				this.index = 0
			} else {
				this.index--
				this.pause()
				this.callback()
			}
		}
	}

	pause() {
		this.isPlaying = false

		if (this[timer]) {
			clearInterval(this[timer])
		}
	}

	stop() {
		this.index = 0
		this.isRender = false
		this.isPlaying = false
		if (this[timer]) {
			clearInterval(this[timer])
		}
	}

	/***
	 * 动画不是循环时，动画播放完毕的回调
	 */
	callback() {

	}
}