import Button from './Button'
import EventManager from '../runtime/EventManager'
import {EVENT_ENUM} from '../enums/index'

const IMG_PREFIX = 'images/ctrl/ctrl'

const START_BUTTON_WIDTH = 120
const START_BUTTON_HEIGHT = 120

const CTRL_WIDTH = 48
const CTRL_HEIGHT = 48

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

/***
 * 游戏开始按钮
 */
export default class RestartButton extends Button {
	constructor() {
		const imgSrc = `${IMG_PREFIX} (${1}).png`
		super(imgSrc)
	}

	init() {
		this.position = {
			startX: 0,
			startY: 0,
			endX:  0+START_BUTTON_WIDTH,
			endY: 0+START_BUTTON_HEIGHT,
			width: START_BUTTON_WIDTH,
			height: START_BUTTON_HEIGHT
		}
		this.touchHandler = this.touchEventHandler.bind(this)
	}

	onClick() {
		EventManager.Instance.emit(EVENT_ENUM.RESTART_LEVEL)
	}
}
