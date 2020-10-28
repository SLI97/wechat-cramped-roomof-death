import DataManager   from '../runtime/DataManager'
import Sprite from '../base/Sprite'
import PlayerAnimator from '../player/PlayerAnimator'
import {DIRECTION_ENUM, PLAYER_STATE} from '../enums'
import WoodenSkeletonAnimator from './woodenSkeleton/WoodenSkeletonAnimator'

const ENEMY_WIDTH = 128
const ENEMY_HEIGHT = 128

const __ = {
	speed: Symbol('speed')
}

/***
 * 敌人基类
 */
export default class Enemy extends Sprite  {
	constructor() {
		super(null,ENEMY_WIDTH, ENEMY_HEIGHT)
	}

	init() {
		this.x = 0
		this.y = 0
		this.direction = DIRECTION_ENUM.BOTTOM
		this.state = PLAYER_STATE.IDLE
		this.animator = new WoodenSkeletonAnimator()
	}

	update() {
		this.changeDirection()
	}

	/***
	 * 根据玩家在敌人的方位方便敌人的朝向
	 */
	changeDirection() {
		const {x: playerX, y: playerY} = DataManager.Instance.getPlayerInfo()
		const disX = Math.abs(playerX - this.x)
		const disY = Math.abs(playerY - this.y)

		//第一象限
		if (playerX > this.x && playerY < this.y) {
			this.direction = disX >= disY ? DIRECTION_ENUM.RIGHT : DIRECTION_ENUM.TOP

			//第二象限
		} else if (playerX < this.x && playerY < this.y) {
			this.direction = disX >= disY ? DIRECTION_ENUM.LEFT : DIRECTION_ENUM.TOP

			//第三象限
		} else if (playerX < this.x && playerY > this.y) {
			this.direction = disX >= disY ? DIRECTION_ENUM.LEFT : DIRECTION_ENUM.BOTTOM

			//第四象限
		} else if (playerX < this.x && playerY > this.y) {
			this.direction = disX >= disY ? DIRECTION_ENUM.RIGHT : DIRECTION_ENUM.BOTTOM
		}
	}
}
