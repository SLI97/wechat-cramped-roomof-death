import Button from './Button'
import EventManager from '../runtime/EventManager'
import {
	EVENT_ENUM
} from '../enums/index'

const IMG_PREFIX = 'images/ctrl/ctrl'

const START_BUTTON_WIDTH = 50
const START_BUTTON_HEIGHT = 65

const SCREEN_WIDTH = window.innerWidth
const SCREEN_HEIGHT = window.innerHeight

/***
 * 游戏开始按钮
 */
export default class RevokeButton extends Button {
	constructor() {
		const imgSrc = `${IMG_PREFIX} (${9}).png`
		super(imgSrc)
	}

	init() {
		this.position = {
			startX: SCREEN_WIDTH / 2 - 120,
			startY: 20,
			endX: SCREEN_WIDTH / 2 - 120 + START_BUTTON_WIDTH,
			endY: 20 + START_BUTTON_HEIGHT,
			width: START_BUTTON_WIDTH,
			height: START_BUTTON_HEIGHT
		}
		this.touchHandler = this.touchEventHandler.bind(this)
	}

	onClick() {
		EventManager.Instance.emit(EVENT_ENUM.REVOKE_STEP)
	}
}