import {DIRECTION_ENUM, EVENT_ENUM, PLAYER_STATE} from '../../enums/index'
import DataManager from '../../runtime/DataManager'
import Enemy from '../../base/Enemy'
import EventManager from '../../runtime/EventManager'
import WoodenSkeletonStateMachine from './Animator/WoodenSkeletonStateMachine'

/***
 * 木头帽子敌人类
 */
export default class WoodenSkeleton extends Enemy {
	constructor() {
		super(null)
	}

	init() {
		super.init()
		this.fsm = new WoodenSkeletonStateMachine(this)
	}

	update() {
		super.update()
		this.checkAttack()
	}

	checkAttack() {
		const {x: playerX, y: playerY, state: playerState} = DataManager.Instance.player
		if (((playerX === this.x && Math.abs(playerY - this.y) <= 1) || (
			playerY === this.x && Math.abs(playerX - this.y) <= 1)) && playerState === PLAYER_STATE.IDLE) {
			this.state = PLAYER_STATE.ATTACK
			EventManager.Instance.emit(EVENT_ENUM.ATTACK_PLAYER)
		}
	}
}
