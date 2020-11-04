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

		this[uis] = new Map()
		this[uis].set(UI_ENUM.GAME_START, new StartButton())
		this[uis].set(UI_ENUM.CTRL_TOP, new ControllerTopButton())
		this[uis].set(UI_ENUM.CTRL_BOTTOM, new ControllerBottomButton())
		this[uis].set(UI_ENUM.CTRL_LEFT, new ControllerLeftButton())
		this[uis].set(UI_ENUM.CTRL_RIGHT, new ControllerRightButton())
		this[uis].set(UI_ENUM.CTRL_TURN_LEFT, new ControllerTurnLeftButton())
		this[uis].set(UI_ENUM.CTRL_TURN_RIGHT, new ControllerTurnRightButton())
	}

	render() {
		for (const [key, value] of this[uis]) {
			value.render()
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
	fadeIn(duration) {
		this.oldFrame = DataManager.Instance.frame
		this.fadeInPromise = new Promise((resolve, reject) => {
			this.fadeInPromiseResolve = resolve
		})
		window.cancelAnimationFrame(this.aniId)
		this.aniId = window.requestAnimationFrame(this.fadeInHandler.bind(this, duration), canvas)
		return this.fadeInPromise
	}

	fadeOut(duration) {
		this.oldFrame = DataManager.Instance.frame
		this.fadeOutPromise = new Promise((resolve, reject) => {
			this.fadeOutPromiseResolve = resolve
		})
		window.cancelAnimationFrame(this.aniId)
		this.aniId = window.requestAnimationFrame(this.fadeOutHandler.bind(this, duration), canvas)
		return this.fadeOutPromise
	}

	fadeInHandler(duration) {

		const fadePercent = (DataManager.Instance.frame - this.oldFrame) /60
		CanvasManager.Ctx.fillStyle = `rgba(0, 0, 0,${ fadePercent})`
		CanvasManager.Ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
		if (fadePercent > 1) {
			window.cancelAnimationFrame(this.aniId)
			this.fadeInPromiseResolve()
		} else {
			this.aniId = window.requestAnimationFrame(this.fadeInHandler.bind(this,duration), canvas)
		}
	}

	fadeOutHandler(duration) {
		const fadePercent = (DataManager.Instance.frame - this.oldFrame) / 60
		CanvasManager.Ctx.fillStyle = `rgba(0, 0, 0,${1 - fadePercent})`
		CanvasManager.Ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
		if (fadePercent > 1) {
			window.cancelAnimationFrame(this.aniId)
			this.fadeOutPromiseResolve()
		} else {
			this.aniId = window.requestAnimationFrame(this.fadeOutHandler.bind(this), canvas)
		}
	}
}
