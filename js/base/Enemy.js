import DataManager from '../runtime/DataManager'
import EventManager from '../runtime/EventManager'
import Entity from './Entity'
import {
	DIRECTION_ENUM,
	EVENT_ENUM,
	PLAYER_STATE
} from '../enums/index'

const ENEMY_WIDTH = 128
const ENEMY_HEIGHT = 128

/***
 * 敌人基类,主要实现整面向玩家
 */
export default class Enemy extends Entity {
	constructor(dto, fsm) {
		super(dto, fsm, null, ENEMY_WIDTH, ENEMY_HEIGHT)
	}

	init(){
		this.onDeadHandler = this.onDead.bind(this)
		this.onChangeDirectionHandler = this.onChangeDirection.bind(this)
		EventManager.Instance.on(EVENT_ENUM.ATTACK_ENEMY, this.onDeadHandler)
		EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE_END, this.onChangeDirectionHandler)
		this.onChangeDirectionHandler(false)
	}

	update() {
		super.update()
	}

	/***
	 * 根据玩家在敌人的方位方便敌人的朝向
	 */
	onChangeDirection(check = true) {
		if (this.state === PLAYER_STATE.DEATH) {
			return
		}
		const {
			x: playerX,
			y: playerY
		} = DataManager.Instance.player
		const disX = Math.abs(playerX - this.x)
		const disY = Math.abs(playerY - this.y)
		if (disX === disY && check) {
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
	

	onDead(id) {
		if (this.state === PLAYER_STATE.DEATH) {
			return
		}
		if (this.id === id) {
			this.state = PLAYER_STATE.DEATH
		}
	}
}