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

	fadeIn() {
		this.oldFrame = DataManager.Instance.frame
		this.aniId = window.requestAnimationFrame(this.fadeInHandler.bind(this), canvas)
	}

	fadeOut() {
		this.oldFrame = DataManager.Instance.frame
		this.aniId = window.requestAnimationFrame(this.fadeOutHandler.bind(this), canvas)
	}

	fadeInHandler() {
		const fadePercent = (DataManager.Instance.frame - this.oldFrame) / 10
		CanvasManager.Ctx.fillStyle = `rgba(0, 0, 0,${ fadePercent})`
		CanvasManager.Ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
		if (fadePercent > 1) {
			window.cancelAnimationFrame(this.aniId)
			this.fadeOut()
		} else {
			this.aniId = window.requestAnimationFrame(this.fadeInHandler.bind(this), canvas)
		}
	}

	fadeOutHandler() {
		const fadePercent = (DataManager.Instance.frame - this.oldFrame) / 10
		CanvasManager.Ctx.fillStyle = `rgba(0, 0, 0,${1 - fadePercent})`
		CanvasManager.Ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
		if (fadePercent > 1) {
			window.cancelAnimationFrame(this.aniId)
		} else {
			this.aniId = window.requestAnimationFrame(this.fadeOutHandler.bind(this), canvas)
		}
	}
}