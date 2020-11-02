import Button from '../Button'
import EventManager from '../../runtime/EventManager'
import {
	EVENT_ENUM
} from '../../enums/index'
import CanvasManager from '../../runtime/CanvasManager'

const IMG_PREFIX = 'images/ctrl/ctrl'
const CTRL_WIDTH = 48
const CTRL_HEIGHT = 48

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

/***
 * 控制按钮基类
 */
export default class ControllerButton extends Button {
	constructor(index) {
		super(`${IMG_PREFIX} (${index}).png`)
		this.index = index
		this.init()
	}

	init() {
		const {index} = this
		const xAxis = Math.floor((index - 1) / 2)
		const yAxis = (index - 1) % 2
		this.position = {
			startX: (screenWidth / 2) - (CTRL_WIDTH * 3 / 2) + xAxis * CTRL_WIDTH,
			startY: screenHeight - (CTRL_HEIGHT * 2) - 40 + yAxis * CTRL_HEIGHT,
			endX: (screenWidth / 2) - (CTRL_WIDTH * 3 / 2) + xAxis * CTRL_WIDTH + CTRL_WIDTH,
			endY: screenHeight - (CTRL_HEIGHT * 2) - 40 + yAxis * CTRL_HEIGHT + CTRL_HEIGHT,
			width: CTRL_WIDTH,
			height: CTRL_HEIGHT,
		}
	}

	onClick() {
		EventManager.Instance.emit(EVENT_ENUM.PLAYER_CTRL, this.type)
	}
}
