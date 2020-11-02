import Entity from '../../base/Entity'
import DoorStateMachine from './Animator/DoorStateMachine'
import EventManager from '../../runtime/EventManager'
import {EVENT_ENUM, PLAYER_STATE} from '../../enums/index'
import DataManager from '../../runtime/DataManager'

const BG_WIDTH = 32
const BG_HEIGHT = 32

/***
 * 关卡门类
 */
export default class Door extends Entity {
	constructor() {
		super(null, BG_WIDTH, BG_HEIGHT)
		this.init()
	}

	init() {
		this.fsm = new DoorStateMachine(this)

		this.onOpenHandler = this.onOpen.bind(this)
		EventManager.Instance.on(EVENT_ENUM.OPENDOOR, this.onOpenHandler)
	}

	onOpen() {
		const enemies = DataManager.Instance.enemies.filter(enemy => enemy.state !== PLAYER_STATE.DEATH)
		if(enemies.length === 0){
			this.state = PLAYER_STATE.DEATH
		}
	}
}
