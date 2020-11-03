import Button from './Button'
import EventManager from '../runtime/EventManager'
import {EVENT_ENUM} from '../enums/index'

const IMG_PREFIX = 'images/ctrl/ctrl'

const START_BUTTON_WIDTH = 120
const START_BUTTON_HEIGHT = 120

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

/***
 * 游戏开始按钮
 */
export default class RevokeButton extends Button {
	constructor() {
		const imgSrc = `${IMG_PREFIX} (${1}).png`
		super(imgSrc)
	}

	init() {
		this.position = {
			// startX: (screenWidth / 2) - (CTRL_WIDTH * 3 / 2) + xAxis * CTRL_WIDTH,
			// startY: screenHeight - (CTRL_HEIGHT * 2) - 40 + yAxis * CTRL_HEIGHT,
			// endX: (screenWidth / 2) - (CTRL_WIDTH * 3 / 2) + xAxis * CTRL_WIDTH + CTRL_WIDTH,
			// endY: screenHeight - (CTRL_HEIGHT * 2) - 40 + yAxis * CTRL_HEIGHT + CTRL_HEIGHT,
			width: START_BUTTON_WIDTH,
			height: START_BUTTON_HEIGHT
		}
		this.touchHandler = this.touchEventHandler.bind(this)
	}

	onClick() {
		EventManager.Instance.emit(EVENT_ENUM.REVOKE_STEP)
	}
}
