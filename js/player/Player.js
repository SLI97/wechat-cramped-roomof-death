import DataManager from '../runtime/DataManager'
import EventManager from '../runtime/EventManager'
import Background from '../background/Background'
import Sprite from '../base/Sprite'
import PlayerStateMachine, {PARAMS_NAME} from './Animator/PlayerStateMachine'
import {
	EVENT_ENUM,
	ENEMY_TYPE_ENUM
} from '../enums/index'
import {
	DIRECTION_ENUM,
	CONTROLLER_ENUM,
	PLAYER_STATE
} from '../enums/index'

const PLAYER_WIDTH = 128
const PLAYER_HEIGHT = 128

const DIRECTION_ORDER = [
	DIRECTION_ENUM.RIGHT,
	DIRECTION_ENUM.BOTTOM,
	DIRECTION_ENUM.LEFT,
	DIRECTION_ENUM.TOP,
]

export default class Player extends Sprite {

	static _instance

	static get Instance() {
		if (this._instance == null) {
			this._instance = new Player()
		}
		return this._instance
	}

	constructor() {
		super(null, PLAYER_WIDTH, PLAYER_HEIGHT)
		this.init()
		EventManager.Instance.on(EVENT_ENUM.PLAYER_CTRL, this.inputTrigger.bind(this))
		EventManager.Instance.on(EVENT_ENUM.ATTACK_PLAYER, this.goDead.bind(this))
	}

	update() {
		if (this.targetX < this.x) {
			this.x -= this.speed
		} else if (this.targetX > this.x) {
			this.x += this.speed
		}

		if (this.targetY < this.y) {
			this.y -= this.speed
		} else if (this.targetY > this.y) {
			this.y += this.speed
		}
	}

	init() {
		this.targetX = this.x = 0
		this.targetY = this.y = 0
		this.speed = 1 / 10
		this.direction = DIRECTION_ENUM.RIGHT
		this.state = PLAYER_STATE.IDLE
		this.fsm = new PlayerStateMachine()
		this.fsm = new PlayerStateMachine(this)
	}

	render() {
		this.fsm.render()
	}

	goDead() {
		this.state = PLAYER_STATE.DEATH
		this.fsm.setParams(PARAMS_NAME.DIRECTION, DIRECTION_ORDER.findIndex(this.direction))
		this.fsm.setParams(PARAMS_NAME.DEATH, true)
	}

	/***
	 * 响应玩家操作
	 * @param type
	 */
	inputTrigger(type) {
		if (this.state === PLAYER_STATE.DEATH) {
			console.log('death!!')
			EventManager.Instance.emit(EVENT_ENUM.GAME_OVER)
			return
		}

		if (this.shouldAttackEnemy(type)) {
			console.log('attack!')
			this.state = PLAYER_STATE.ATTACK
			this.fsm.setParams(PARAMS_NAME.DIRECTION, DIRECTION_ORDER.findIndex(this.direction))
			this.fsm.setParams(PARAMS_NAME.ATTACK, true)
			EventManager.Instance.emit(EVENT_ENUM.RECORD_STEP)
			return
		}

		if (this.WillBlock(type)) {
			console.log('stop!')
			this.state = PLAYER_STATE.BLOCK
			this.fsm.setParams(PARAMS_NAME.DIRECTION, DIRECTION_ORDER.findIndex(this.direction))
			return
		}

		this.move()
	}

	/***
	 * 根据type玩家移动
	 * @param type 控制类型CONTROLLER_ENUM之一
	 */
	move(type) {
		if (type === CONTROLLER_ENUM.TOP) {
			this.targetY -= 1
			this.fsm.setParams(PARAMS_NAME.IDLE, true)
		} else if (type === CONTROLLER_ENUM.BOTTOM) {
			this.targetY += 1
			this.fsm.setParams(PARAMS_NAME.IDLE, true)
		} else if (type === CONTROLLER_ENUM.LEFT) {
			this.targetX -= 1
			this.fsm.setParams(PARAMS_NAME.IDLE, true)
		} else if (type === CONTROLLER_ENUM.RIGHT) {
			this.targetX += 1
			this.fsm.setParams(PARAMS_NAME.IDLE, true)
		} else if (type === CONTROLLER_ENUM.TURNLEFT) {
			this.state = PLAYER_STATE.TURNLEFT
			const index = DIRECTION_ORDER.findIndex(i => i === this.direction)
			const next = (index - 1 < 0) ? DIRECTION_ORDER.length - 1 : index - 1
			this.direction = DIRECTION_ORDER[next]
			this.fsm.setParams(PARAMS_NAME.DIRECTION, next)
			this.fsm.setParams(PARAMS_NAME.TURNLEFT, true)
		} else if (type === CONTROLLER_ENUM.TURNRIGHT) {
			this.state = PLAYER_STATE.TURNRIGHT
			const index = DIRECTION_ORDER.findIndex(i => i === this.direction)
			const next = index + 1 > (DIRECTION_ORDER.length - 1) ? 0 : index + 1
			this.direction = DIRECTION_ORDER[next]
			this.fsm.setParams(PARAMS_NAME.DIRECTION, next)
			this.fsm.setParams(PARAMS_NAME.TURNRIGHT, true)
		}
		EventManager.Instance.emit(EVENT_ENUM.RECORD_STEP)
	}

	/***
	 * 检查枪所在方向是否有敌人，有则攻击
	 * @param type
	 */
	shouldAttackEnemy(type) {
		const enemyInfo = DataManager.Instance.getEnemyInfo()
		for (let i = 0; i < enemyInfo.length; i++) {
			const enemy = enemyInfo[i]
			if (enemy.type === ENEMY_TYPE_ENUM.SKELETON_WOODEN || enemy.type === ENEMY_TYPE_ENUM.SKELETON_IRON) {
				const {x: enemyX, y: enemyY} = enemy
				if (this.direction === DIRECTION_ENUM.TOP && type === CONTROLLER_ENUM.TOP && enemyY === this.targetY - 2) {
					return true
				} else if (this.direction === DIRECTION_ENUM.BOTTOM && type === CONTROLLER_ENUM.BOTTOM && enemyY === this.targetY + 2) {
					return true
				} else if (this.direction === DIRECTION_ENUM.LEFT && type === CONTROLLER_ENUM.LEFT && enemyX === this.targetX - 2) {
					return true
				} else if (this.direction === DIRECTION_ENUM.RIGHT && type === CONTROLLER_ENUM.RIGHT && enemyX === this.targetX + 2) {
					return true
				}
			}
		}

		return false
	}

	/***
	 * 判断角色是否能按预期进行移动
	 * @param type
	 */
	WillBlock(type) {
		const {
			targetX: x,
			targetY: y,
			direction
		} = this
		const tileInfo = Background.Instance.getTileMap()
		const enemyInfo = DataManager.Instance.getEnemyInfo()
			.filter(enemy =>
				enemy.type === ENEMY_TYPE_ENUM.SKELETON_WOODEN ||
				enemy.type === ENEMY_TYPE_ENUM.SKELETON_IRON)
		const {
			row,
			column
		} = DataManager.Instance.getMapCount()

		//按钮方向——向上
		if (type === CONTROLLER_ENUM.TOP) {

			const playerNextY = y - 1
			// if (playerNextY < 0) {
			// 	this.fsm.setParams(PARAMS_NAME.BLOCKFRONT, true)
			// 	EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
			// 	return true
			// }

			//玩家方向——向上
			if (direction === DIRECTION_ENUM.TOP) {
				if (playerNextY < 0) {
					this.fsm.setParams(PARAMS_NAME.BLOCKFRONT, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}

				const weaponNextY = y - 2
				const nextPlayerTile = tileInfo[x][playerNextY]
				const nextWeaponTile = tileInfo[x][weaponNextY]
				// return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)) {
				} else {
					this.fsm.setParams(PARAMS_NAME.BLOCKFRONT, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}

				//玩家方向——向下
			} else if (direction === DIRECTION_ENUM.BOTTOM) {
				if (playerNextY < 0) {
					this.fsm.setParams(PARAMS_NAME.BLOCKBACK, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}

				const weaponNextY = y
				const nextPlayerTile = tileInfo[x][playerNextY]
				const nextWeaponTile = tileInfo[x][weaponNextY]
				// return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)) {
				} else {
					this.fsm.setParams(PARAMS_NAME.BLOCKBACK, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}

				//玩家方向——向左
			} else if (direction === DIRECTION_ENUM.LEFT) {
				if (playerNextY < 0) {
					this.fsm.setParams(PARAMS_NAME.BLOCKRIGHT, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}

				const weaponNextX = x - 1
				const weaponNextY = y - 1
				const nextPlayerTile = tileInfo[x][playerNextY]
				const nextWeaponTile = tileInfo[weaponNextX][weaponNextY]
				// return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile && nextWeaponTile.turnable)
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile && nextWeaponTile.turnable)) {
				} else {
					this.fsm.setParams(PARAMS_NAME.BLOCKRIGHT, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}

				//玩家方向——向右
			} else if (direction === DIRECTION_ENUM.RIGHT) {
				if (playerNextY < 0) {
					this.fsm.setParams(PARAMS_NAME.BLOCKLEFT, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}

				const weaponNextX = x + 1
				const weaponNextY = y - 1
				const nextPlayerTile = tileInfo[playerNextY][y]
				const nextWeaponTile = tileInfo[weaponNextX][weaponNextY]
				// return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)) {
				} else {
					this.fsm.setParams(PARAMS_NAME.BLOCKLEFT, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}
			}

			//按钮方向——向下
		} else if (type === CONTROLLER_ENUM.BOTTOM) {

			const playerNextY = y + 1
			// if (playerNextY > column - 1) {
			// 	this.fsm.setParams(PARAMS_NAME.BLOCKBACK, true)
			// 	EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
			// 	return true
			// }

			//玩家方向——向上
			if (direction === DIRECTION_ENUM.TOP) {
				if (playerNextY > column - 1) {
					this.fsm.setParams(PARAMS_NAME.BLOCKBACK, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}

				const weaponNextY = y
				const nextPlayerTile = tileInfo[x][playerNextY]
				const nextWeaponTile = tileInfo[x][weaponNextY]
				// return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)) {
				} else {
					this.fsm.setParams(PARAMS_NAME.BLOCKBACK, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}

				//玩家方向——向下
			} else if (direction === DIRECTION_ENUM.BOTTOM) {
				if (playerNextY > column - 1) {
					this.fsm.setParams(PARAMS_NAME.BLOCKFRONT, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}

				const weaponNextY = y + 2
				const nextPlayerTile = tileInfo[x][playerNextY]
				const nextWeaponTile = tileInfo[x][weaponNextY]
				// return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)) {
				} else {
					this.fsm.setParams(PARAMS_NAME.BLOCKFRONT, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}

				//玩家方向——向左
			} else if (direction === DIRECTION_ENUM.LEFT) {
				if (playerNextY > column - 1) {
					this.fsm.setParams(PARAMS_NAME.BLOCKLEFT, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}

				const weaponNextX = x - 1
				const weaponNextY = y + 1
				const nextPlayerTile = tileInfo[playerNextY][y]
				const nextWeaponTile = tileInfo[weaponNextX][weaponNextY]
				// return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile && nextWeaponTile.turnable)
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile && nextWeaponTile.turnable)) {
				} else {
					this.fsm.setParams(PARAMS_NAME.BLOCKLEFT, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}

				//玩家方向——向右
			} else if (direction === DIRECTION_ENUM.RIGHT) {
				if (playerNextY > column - 1) {
					this.fsm.setParams(PARAMS_NAME.BLOCKRIGHT, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}

				const weaponNextX = x + 1
				const weaponNextY = y + 1
				const nextPlayerTile = tileInfo[playerNextY][y]
				const nextWeaponTile = tileInfo[weaponNextX][weaponNextY]
				// return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)) {
				} else {
					this.fsm.setParams(PARAMS_NAME.BLOCKRIGHT, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}
			}

			//按钮方向——向左
		} else if (type === CONTROLLER_ENUM.LEFT) {

			const playerNextX = x - 1
			// if (playerNextX < 0) {
			// 	this.fsm.setParams(PARAMS_NAME.BLOCK, true)
			// 	EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
			// 	return false
			// }

			//玩家方向——向上
			if (direction === DIRECTION_ENUM.TOP) {
				if (playerNextX < 0) {
					this.fsm.setParams(PARAMS_NAME.BLOCKLEFT, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}

				const weaponNextX = x - 1
				const weaponNextY = y - 1
				const nextPlayerTile = tileInfo[playerNextX][y]
				const nextWeaponTile = tileInfo[weaponNextX][weaponNextY]
				// return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)) {
				} else {
					this.fsm.setParams(PARAMS_NAME.BLOCKLEFT, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}

				//玩家方向——向下
			} else if (direction === DIRECTION_ENUM.BOTTOM) {
				if (playerNextX < 0) {
					this.fsm.setParams(PARAMS_NAME.BLOCKRIGHT, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}

				const weaponNextX = x - 1
				const weaponNextY = y + 1
				const nextPlayerTile = tileInfo[playerNextX][y]
				const nextWeaponTile = tileInfo[weaponNextX][weaponNextY]
				// return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)) {
				} else {
					this.fsm.setParams(PARAMS_NAME.BLOCKRIGHT, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}

				//玩家方向——向左
			} else if (direction === DIRECTION_ENUM.LEFT) {
				if (playerNextX < 0) {
					this.fsm.setParams(PARAMS_NAME.BLOCKFRONT, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}

				const weaponNextX = x - 2
				const nextPlayerTile = tileInfo[playerNextX][y]
				const nextWeaponTile = tileInfo[weaponNextX][y]
				// return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile && nextWeaponTile.turnable)
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile && nextWeaponTile.turnable)) {
				} else {
					this.fsm.setParams(PARAMS_NAME.BLOCKFRONT, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}

				//玩家方向——向右
			} else if (direction === DIRECTION_ENUM.RIGHT) {
				if (playerNextX < 0) {
					this.fsm.setParams(PARAMS_NAME.BLOCKBACK, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}

				const weaponNextX = x + 2
				const nextPlayerTile = tileInfo[playerNextX][y]
				const nextWeaponTile = tileInfo[weaponNextX][y]
				// return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)) {
				} else {
					this.fsm.setParams(PARAMS_NAME.BLOCKBACK, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}
			}

			//按钮方向——向右
		} else if (type === CONTROLLER_ENUM.LEFT) {

			const playerNextX = x + 1
			// if (playerNextX > row - 1) {
			// 	return false
			// }

			//玩家方向——向上
			if (direction === DIRECTION_ENUM.TOP) {
				if (playerNextX > row - 1) {
					this.fsm.setParams(PARAMS_NAME.BLOCKRIGHT, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}

				const weaponNextX = x + 1
				const weaponNextY = y - 1
				const nextPlayerTile = tileInfo[playerNextX][y]
				const nextWeaponTile = tileInfo[weaponNextX][weaponNextY]
				// return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)) {
				} else {
					this.fsm.setParams(PARAMS_NAME.BLOCKRIGHT, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}

				//玩家方向——向下
			} else if (direction === DIRECTION_ENUM.BOTTOM) {
				if (playerNextX > row - 1) {
					this.fsm.setParams(PARAMS_NAME.BLOCKLEFT, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}

				const weaponNextX = x + 1
				const weaponNextY = y + 1
				const nextPlayerTile = tileInfo[playerNextX][y]
				const nextWeaponTile = tileInfo[weaponNextX][weaponNextY]
				// return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)) {
				} else {
					this.fsm.setParams(PARAMS_NAME.BLOCKLEFT, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}

				//玩家方向——向左
			} else if (direction === DIRECTION_ENUM.LEFT) {
				if (playerNextX > row - 1) {
					this.fsm.setParams(PARAMS_NAME.BLOCKBACK, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}

				const weaponNextX = x
				const nextPlayerTile = tileInfo[playerNextX][y]
				const nextWeaponTile = tileInfo[weaponNextX][y]
				// return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile && nextWeaponTile.turnable)
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile && nextWeaponTile.turnable)) {
				} else {
					this.fsm.setParams(PARAMS_NAME.BLOCKBACK, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}

				//玩家方向——向右
			} else if (direction === DIRECTION_ENUM.RIGHT) {
				if (playerNextX > row - 1) {
					this.fsm.setParams(PARAMS_NAME.BLOCKFRONT, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}

				const weaponNextX = x + 2
				const nextPlayerTile = tileInfo[playerNextX][y]
				const nextWeaponTile = tileInfo[weaponNextX][y]
				// return (nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)) {
				} else {
					this.fsm.setParams(PARAMS_NAME.BLOCKFRONT, true)
					EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
					return true
				}
			}

			//按钮方向——左转
		} else if (type === CONTROLLER_ENUM.TURNLEFT) {
			let nextY, nextX
			if (direction === DIRECTION_ENUM.TOP) {
				//朝上左转的话，左上角三个tile都必须turnable为true，并且没有敌人
				nextY = y - 1
				nextX = x - 1

			} else if (direction === DIRECTION_ENUM.BOTTOM) {
				nextY = y + 1
				nextX = x + 1

			} else if (direction === DIRECTION_ENUM.LEFT) {
				nextY = y + 1
				nextX = x - 1
			} else if (direction === DIRECTION_ENUM.RIGHT) {
				nextY = y - 1
				nextX = x + 1
			}

			for (let i = 0; i < enemyInfo.length; i++) {
				const enemy = enemyInfo[i]
				const {x: enemyX, y: enemyY} = enemy

				//有敌人在左上方
				if (enemyX === nextX && enemyY === y) {
					return false
				} else if (enemyX === nextX && enemyY === nextX) {
					return false
				} else if (enemyX === x && enemyY === nextX) {
					return false
				}
			}

			if (
				(!tileInfo[x][nextY] || tileInfo[x][nextY].turnable) &&
				(!tileInfo[nextX][y] || tileInfo[nextX][y].turnable) &&
				(!tileInfo[nextX][nextY] || tileInfo[nextX][nextY].turnable)
			) {
			} else {
				this.fsm.setParams(PARAMS_NAME.BLOCKTURNLEFT, true)
				EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
				return true
			}

			// return (!tileInfo[x][nextY] || tileInfo[x][nextY].turnable) &&
			// 	(!tileInfo[nextX][y] || tileInfo[nextX][y].turnable) &&
			// 	(!tileInfo[nextX][nextY] || tileInfo[nextX][nextY].turnable)

			//按钮方向——右转
		} else if (type === CONTROLLER_ENUM.TURNRIGHT) {
			let nextX, nextY
			if (direction === DIRECTION_ENUM.TOP) {
				//朝上右转的话，右上角三个tile都必须turnable为true
				nextY = y - 1
				nextX = x + 1
			} else if (direction === DIRECTION_ENUM.BOTTOM) {
				nextY = y + 1
				nextX = x - 1
			} else if (direction === DIRECTION_ENUM.LEFT) {
				nextY = y - 1
				nextX = x - 1
			} else if (direction === DIRECTION_ENUM.RIGHT) {
				nextY = y + 1
				nextX = x + 1
			}

			for (let i = 0; i < enemyInfo.length; i++) {
				const enemy = enemyInfo[i]
				const {x: enemyX, y: enemyY} = enemy

				//有敌人在左上方
				if (enemyX === nextX && enemyY === y) {
					return false
				} else if (enemyX === nextX && enemyY === nextX) {
					return false
				} else if (enemyX === x && enemyY === nextX) {
					return false
				}
			}

			if (
				(!tileInfo[x][nextY] || tileInfo[x][nextY].turnable) &&
				(!tileInfo[nextX][y] || tileInfo[nextX][y].turnable) &&
				(!tileInfo[nextX][nextY] || tileInfo[nextX][nextY].turnable)
			) {
			} else {
				this.fsm.setParams(PARAMS_NAME.BLOCKRIGHT, true)
				EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE)
				return true
			}

			// return (!tileInfo[x][nextY] || tileInfo[x][nextY].turnable) &&
			// 	(!tileInfo[nextX][y] || tileInfo[nextX][y].turnable) &&
			// 	(!tileInfo[nextX][nextY] || tileInfo[nextX][nextY].turnable)
		}

		return false
	}
}
