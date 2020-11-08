import Button from './Button'
import EventManager from '../runtime/EventManager'
import {
	EVENT_ENUM
} from '../enums/index'

const IMG_PREFIX = 'images/ctrl/ctrl'

const START_BUTTON_WIDTH = 200
const START_BUTTON_HEIGHT = 200

const SCREEN_WIDTH = window.innerWidth
const SCREEN_HEIGHT = window.innerHeight

/***
 * 游戏开始按钮
 */
export default class StartButton extends Button {
	constructor() {
		const imgSrc = `${IMG_PREFIX} (${7}).png`
		super(imgSrc)
	}

	init() {
		this.position = {
			startX: SCREEN_WIDTH / 2 - 100,
			startY: SCREEN_HEIGHT / 2 - 200,
			endX: SCREEN_WIDTH / 2 + 100,
			endY: SCREEN_HEIGHT / 2,
			width: START_BUTTON_WIDTH,
			height: START_BUTTON_HEIGHT
		}
		this.touchHandler = this.touchEventHandler.bind(this)
	}

	onClick() {
		// EventManager.Instance.emit(EVENT_ENUM.GAME_START)
	}
}