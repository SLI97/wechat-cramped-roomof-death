import ControllerButton from './ControllerButton'
import {CONTROLLER_ENUM} from '../../enums/index'

const CTRL_INDEX = 4

/***
 * 向下控制按钮
 */
export default class ControllerBottomButton extends ControllerButton {
	constructor() {
		super(CTRL_INDEX)
		this.type = CONTROLLER_ENUM.BOTTOM

	}
}

