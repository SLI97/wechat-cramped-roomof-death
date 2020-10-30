import {DIRECTION_ENUM, EVENT_ENUM, PLAYER_STATE} from '../../enums'
import DataManager from '../../runtime/DataManager'
import Enemy from '../Enemy'
import EventManager from '../../runtime/EventManager'

export default class WoodenSkeleton extends Enemy {
	constructor() {
		super(null)
	}

	init() {
		this.x = 0
		this.y = 0
		this.direction = DIRECTION_ENUM.BOTTOM
		this.state = PLAYER_STATE.IDLE
		this.fsm = new WoodenSkeletonAnimator()
	}

	update() {
		super.update()
		this.checkAttack()
	}

	checkAttack() {
		const {x: playerX, y: playerY} = DataManager.Instance.player
		if (playerX === this.x && Math.abs(playerY - this.y) <= 1) {
			this.state = PLAYER_STATE.ATTACK
			EventManager.Instance.emit(EVENT_ENUM.ATTACK_PLAYER)
		} else if (playerY === this.x && Math.abs(playerX - this.y) <= 1) {
			this.state = PLAYER_STATE.ATTACK
			EventManager.Instance.emit(EVENT_ENUM.ATTACK_PLAYER)
		}
	}

	render() {
		this.fsm.render()
	}
}
