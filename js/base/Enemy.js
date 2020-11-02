import DataManager from '../runtime/DataManager'
import Entity from './Entity'
import {
	DIRECTION_ENUM,
	PLAYER_STATE
} from '../enums/index'

const ENEMY_WIDTH = 128
const ENEMY_HEIGHT = 128

/***
 * 敌人基类,主要实现整面向玩家
 */
export default class Enemy extends Entity {
	constructor() {
		super(null, ENEMY_WIDTH, ENEMY_HEIGHT)
		this.init()
	}

	init() {
		this.x = 0
		this.y = 0
		this.id = RndNum(8)
		this.direction = DIRECTION_ENUM.BOTTOM
		this.state = PLAYER_STATE.IDLE
	}

	update() {
		super.update()
		this.changeDirection()
	}

	/***
	 * 根据玩家在敌人的方位方便敌人的朝向
	 */
	changeDirection() {
		if (this.state === PLAYER_STATE.DEATH) {
			return
		}
		const {
			x: playerX,
			y: playerY
		} = DataManager.Instance.player
		const disX = Math.abs(playerX - this.x)
		const disY = Math.abs(playerY - this.y)
		if (disX === disY) {
			return
		}

		//第一象限
		if (playerX >= this.x && playerY <= this.y) {
			this.direction = disX >= disY ? DIRECTION_ENUM.RIGHT : DIRECTION_ENUM.TOP

			//第二象限
		} else if (playerX <= this.x && playerY <= this.y) {
			this.direction = disX >= disY ? DIRECTION_ENUM.LEFT : DIRECTION_ENUM.TOP

			//第三象限
		} else if (playerX <= this.x && playerY >= this.y) {
			this.direction = disX >= disY ? DIRECTION_ENUM.LEFT : DIRECTION_ENUM.BOTTOM

			//第四象限
		} else if (playerX >= this.x && playerY >= this.y) {
			this.direction = disX >= disY ? DIRECTION_ENUM.RIGHT : DIRECTION_ENUM.BOTTOM
		}
	}
}

function RndNum(n) {
	let rnd = ''
	for (let i = 0; i < n; i++)
		rnd += Math.floor(Math.random() * 10)
	return rnd
}
