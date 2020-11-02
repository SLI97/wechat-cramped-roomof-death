import ControllerButton from './ControllerButton'
import {CONTROLLER_ENUM} from '../../enums/index'

const CTRL_INDEX = 1

/***
 * 右转控制按钮
 */
export default class ControllerTurnLeftButton extends ControllerButton {
	constructor() {
		super(CTRL_INDEX)
		this.type = CONTROLLER_ENUM.TURNLEFT
	}
}
