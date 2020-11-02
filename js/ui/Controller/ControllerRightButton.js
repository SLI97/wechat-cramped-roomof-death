import ControllerButton from './ControllerButton'
import {CONTROLLER_ENUM} from '../../enums/index'

const CTRL_INDEX = 6

/***
 * 向上控制按钮
 */
export default class ControllerRightButton   extends ControllerButton {
	constructor() {
		super(CTRL_INDEX)
		this.type = CONTROLLER_ENUM.RIGHT

	}
}

