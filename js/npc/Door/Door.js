import Sprite from '../../base/Sprite'
import DoorStateMachine, {PARAMS_NAME} from './Animator/DoorStateMachine'
import EventManager from '../../runtime/EventManager'
import {EVENT_ENUM} from '../../enums/index'

const BG_WIDTH = 32
const BG_HEIGHT = 32

const IMG_BG_PREFIX = 'images/bg/bg (20).png'

export default class Door extends Sprite {
	constructor(x, y) {
		super(IMG_BG_PREFIX, BG_WIDTH, BG_HEIGHT, x, y)
		this.openHandler = this.open.bind(this)
		EventManager.Instance.on(EVENT_ENUM.OPENDOOR, this.openHandler)
		this.init()
	}

	init() {
		this.open = false
		this.fsm = new DoorStateMachine(this)
	}

	update() {
		//TODO
		//当所有敌人都消灭的时候，门停止渲染
		// this.visible = false
	}

	render() {
		this.fsm.render()
	}

	open() {
		this.open = true
		this.fsm.setParams(PARAMS_NAME.OPEN, true)
	}
}
