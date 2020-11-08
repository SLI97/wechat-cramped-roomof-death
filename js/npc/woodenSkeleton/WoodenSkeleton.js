import {
	ENEMY_TYPE_ENUM,
	EVENT_ENUM,
	PLAYER_STATE
} from '../../enums/index'
import DataManager from '../../runtime/DataManager'
import Enemy from '../../base/Enemy'
import EventManager from '../../runtime/EventManager'
import WoodenSkeletonStateMachine from './Animator/WoodenSkeletonStateMachine'

/***
 * 木头帽子敌人类
 */
export default class WoodenSkeleton extends Enemy {
	constructor(dto) {
		super(dto, WoodenSkeletonStateMachine)
	}

	init() {
		super.init()
		this.type = ENEMY_TYPE_ENUM.SKELETON_WOODEN
		this.onAttackHandler = this.onAttack.bind(this)
		EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE_END, this.onAttackHandler)
	}

	onAttack() {
		if (this.state === PLAYER_STATE.DEATH) {
			return
		}

		const {
			targetX: playerX,
			targetY: playerY,
			state: playerState
		} = DataManager.Instance.player
		if (((playerX === this.x && Math.abs(playerY - this.y) <= 1) || (
				playerY === this.y && Math.abs(playerX - this.x) <= 1)) && playerState === PLAYER_STATE.IDLE) {
			this.state = PLAYER_STATE.ATTACK
			EventManager.Instance.emit(EVENT_ENUM.ATTACK_PLAYER, PLAYER_STATE.DEATH)
		}
	}

	off() {
		super.off()
		EventManager.Instance.off(EVENT_ENUM.PLAYER_MOVE_END, this.onAttackHandler)
	}

}