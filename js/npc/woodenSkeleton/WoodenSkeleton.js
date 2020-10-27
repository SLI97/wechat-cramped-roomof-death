import Sprite from '../../base/Sprite'
import {DIRECTION_ENUM, PLAYER_STATE} from '../../enums'
import DataManager from '../../DataManager'
import WoodenSkeletonAnimator from './WoodenSkeletonAnimator'
import Enemy from '../Enemy'

export default class WoodenSkeleton extends Enemy {
	constructor() {
		super(null)
	}

	init() {
		this.x = 0
		this.y = 0
		this.direction = DIRECTION_ENUM.BOTTOM
		this.state = PLAYER_STATE.IDLE
		this.animator = new WoodenSkeletonAnimator()
	}

	update() {
		super.update()
		this.checkAttack()
	}


	checkAttack() {
		const {x: playerX, y: playerY} = DataManager.Instance.getPlayerInfo()
		if (playerX === this.x && Math.abs(playerY - this.y) < 1) {
			this.state = PLAYER_STATE.ATTACK
		} else if (playerY === this.x && Math.abs(playerX - this.y) < 1) {
			this.state = PLAYER_STATE.ATTACK
		}
	}

	render(ctx) {
		this.animator.render(ctx)
	}
}
