import Sprite from '../../base/Sprite'
import Player from '../../player/Player'
import CanvasManager from '../../runtime/CanvasManager'
import BurstStateMachine from './Animator/BurstStateMachine'
import EventManager from '../../runtime/EventManager'
import {EVENT_ENUM} from '../../enums'

const BG_WIDTH = 32
const BG_HEIGHT = 32

const IMG_BG_PREFIX = 'images/bg/bg (20).png'

export default class Burst extends Sprite {
	constructor(x, y) {
		super(IMG_BG_PREFIX, BG_WIDTH, BG_HEIGHT, x, y)
		this.inactiveHandler = this.inacive.bind(this)
		EventManager.Instance.on(EVENT_ENUM.BURST_INACTIVE,this.inactiveHandler)
		this.init()
	}

	init() {
		this.active = true
		this.fsm = new BurstStateMachine(this)
	}

	update() {
		this.visible = false
	}

	inacive(){
		this.active = false
	}

	render() {
		this.fsm.render()
	}
}
