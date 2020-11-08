import Entity from '../../base/Entity'
import DoorStateMachine from './Animator/DoorStateMachine'
import EventManager from '../../runtime/EventManager'
import {
	EVENT_ENUM,
	PLAYER_STATE
} from '../../enums/index'
import DataManager from '../../runtime/DataManager'
import MusicManager from '../../runtime/MusicManager'

const BG_WIDTH = 128
const BG_HEIGHT = 128

/***
 * 关卡门类
 */
export default class Door extends Entity {
	constructor(dto) {
		super(dto, DoorStateMachine, null, BG_WIDTH, BG_HEIGHT)
	}

	init() {
		// this.onOpenHandler = this.onOpen.bind(this)
		// EventManager.Instance.on(EVENT_ENUM.OPENDOOR, this.onOpenHandler)
	}

	off() {
		// EventManager.Instance.off(EVENT_ENUM.OPENDOOR, this.onOpenHandler)
	}

	// onOpen() {
	// 	const enemies = DataManager.Instance.enemies.filter(enemy => enemy.state !== PLAYER_STATE.DEATH)
	// 	if (enemies.length === 0) {
	// 		this.state = PLAYER_STATE.DEATH
	// 	}
	// }

	update() {
		super.update()
		if (DataManager.Instance.enemies && DataManager.Instance.enemies.every(i => i.state === PLAYER_STATE.DEATH) &&
			this.state !== PLAYER_STATE.DEATH) {
			this.state = PLAYER_STATE.DEATH
		}
	}
}