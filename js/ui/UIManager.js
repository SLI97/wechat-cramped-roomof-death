import {
	UI_ENUM,
} from '../enums/index'
import Singleton from '../base/Singleton'
import StartButton from './StartButton'
import CanvasManager from '../runtime/CanvasManager'
import DataManager from '../runtime/DataManager'
import ControllerTopButton from './Controller/ControllerTopButton'
import ControllerBottomButton from './Controller/ControllerBottomButton'
import ControllerLeftButton from './Controller/ControllerLeftButton'
import ControllerRightButton from './Controller/ControllerRightButton'
import ControllerTurnLeftButton from './Controller/ControllerTurnLeftButton'
import ControllerTurnRightButton from './Controller/ControllerTurnRightButton'
import RestartButton from './RestartButton'
import RevokeButton from './RevokeButton'
import MenuButton from './MenuButton'

const SCREEN_WIDTH = window.innerWidth
const SCREEN_HEIGHT = window.innerHeight

const uis = Symbol('uis')

/***
 * Ui管理器
 */
export default class UIManager extends Singleton {

	static get Instance() {
		return super.GetInstance(UIManager)
	}

	constructor() {
		super()
		this.init()
	}

	init() {
		this.oldFrame = 0
		this.aniId = 0
		this.isFading = false
		this.fadePercent = 0
		this.duration = 100

		this[uis] = new Map()
		this[uis].set(UI_ENUM.GAME_START, new StartButton())
		this[uis].set(UI_ENUM.CTRL_TOP, new ControllerTopButton())
		this[uis].set(UI_ENUM.CTRL_BOTTOM, new ControllerBottomButton())
		this[uis].set(UI_ENUM.CTRL_LEFT, new ControllerLeftButton())
		this[uis].set(UI_ENUM.CTRL_RIGHT, new ControllerRightButton())
		this[uis].set(UI_ENUM.CTRL_TURN_LEFT, new ControllerTurnLeftButton())
		this[uis].set(UI_ENUM.CTRL_TURN_RIGHT, new ControllerTurnRightButton())
		this[uis].set(UI_ENUM.RESTART, new RestartButton())
		this[uis].set(UI_ENUM.REVOKE, new RevokeButton())
		this[uis].set(UI_ENUM.Menu, new MenuButton())
	}

	render() {
		for (const [key, value] of this[uis]) {
			value.render()
		}
	}

	fadeRender() {
		if (this.isFadingIn) {
			const fadePercent = (DataManager.Instance.frame - this.oldFrame) / (60 * this.duration / 1000)
			if (fadePercent < 1) {
				CanvasManager.Ctx.fillStyle = `rgba(0, 0, 0,${ fadePercent})`
				CanvasManager.Ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
			} else {
				this.isFadingIn = false
				this.fadeInPromiseResolve()
			}
		} else if (this.isFadingOut) {
			const fadePercent = (DataManager.Instance.frame - this.oldFrame) / (60 * this.duration / 1000)
			if (fadePercent < 1) {
				CanvasManager.Ctx.fillStyle = `rgba(0, 0, 0,${1- fadePercent})`
				CanvasManager.Ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
			} else {
				this.isFadingOut = false
				this.fadeOutPromiseResolve()
			}
		}
	}

	get(type) {
		return this[uis].get(type)
	}

	/***
	 * 全局淡入淡出函数
	 * @param duration  持续时长，单位(ms)
	 * @returns {Promise<any>}
	 */
	fadeIn(duration = 100) {
		this.duration = duration
		this.isFadingIn = true
		this.isFadingOut = false
		this.oldFrame = DataManager.Instance.frame
		this.fadeInPromise = new Promise((resolve, reject) => {
			this.fadeInPromiseResolve = resolve
		})
		// window.cancelAnimationFrame(this.aniId)
		// this.aniId = window.requestAnimationFrame(this.fadeInHandler.bind(this, duration), canvas)
		return this.fadeInPromise
	}

	fadeOut(duration = 100) {
		this.duration = duration
		this.isFadingOut = true
		this.isFadingIn = false
		this.oldFrame = DataManager.Instance.frame
		this.fadeOutPromise = new Promise((resolve, reject) => {
			this.fadeOutPromiseResolve = resolve
		})
		// window.cancelAnimationFrame(this.aniId)
		// this.aniId = window.requestAnimationFrame(this.fadeOutHandler.bind(this, duration), canvas)
		return this.fadeOutPromise
	}

	// fadeInHandler(duration) {
	// 	this.fadePercent = (DataManager.Instance.frame - this.oldFrame) / (60 * duration / 1000)
	// 	if (this.fadePercent > 1) {
	// 		window.cancelAnimationFrame(this.aniId)
	// 		this.fadeInPromiseResolve()
	// 		this.isFading = false
	// 	} else {
	// 		this.aniId = window.requestAnimationFrame(this.fadeInHandler.bind(this, duration), canvas)
	// 	}
	// }

	// fadeOutHandler(duration) {
	// 	this.fadePercent = 1- (DataManager.Instance.frame - this.oldFrame) / (60 * duration / 1000)
	// 	if (this.fadePercent > 1) {
	// 		window.cancelAnimationFrame(this.aniId)
	// 		this.fadeOutPromiseResolve()
	// 		this.isFading = false
	// 	} else {
	// 		this.aniId = window.requestAnimationFrame(this.fadeOutHandler.bind(this, duration), canvas)
	// 	}
	// }
}