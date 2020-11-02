import ControllerButton from './ControllerButton'
import {CONTROLLER_ENUM} from '../../enums/index'

const CTRL_INDEX = 5

/***
 * 左转控制按钮
 */
export default class ControllerTurnRightButton extends ControllerButton {
	constructor() {
		super(CTRL_INDEX)
		this.type = CONTROLLER_ENUM.TURNRIGHT

	}
}
