import DataManager from '../runtime/DataManager'
import EventManager from '../runtime/EventManager'
import PoolManager from '../runtime/PoolManager'
import Background from '../background/Background'
import Entity from '../base/Entity'
import Smoke from '../effect/Smoke/Smoke'
import PlayerStateMachine, {
	PARAMS_NAME
} from './Animator/PlayerStateMachine'
import {
	EVENT_ENUM,
	ENEMY_TYPE_ENUM,
	DIRECTION_ENUM,
	CONTROLLER_ENUM,
	PLAYER_STATE
} from '../enums/index'

const PLAYER_WIDTH = 128
const PLAYER_HEIGHT = 128

/***
 * 玩家类
 */
export default class Player extends Entity {

	constructor(dto) {
		super(dto,PlayerStateMachine, null, PLAYER_WIDTH, PLAYER_HEIGHT)
	}

	init() {
		this.targetX = this.x
		this.targetY = this.y
		this.speed = 1 / 10

		this.inputProcessHandler = this.inputProcess.bind(this)
		this.onDeadHandler = this.onDead.bind(this)
		EventManager.Instance.on(EVENT_ENUM.PLAYER_CTRL, this.inputProcessHandler)
		EventManager.Instance.on(EVENT_ENUM.ATTACK_PLAYER, this.onDeadHandler)

		this.isMoveEnd = true

	}

	update() {
		super.update()
		this.updatePosition()
	}

	/***
	 * 更新人物位置
	 */
	updatePosition() {
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

		if (Math.abs(this.targetX - this.x) < 0.01) {
			this.x = this.targetX
			this.onMoveEnd()
		}
		if (Math.abs(this.targetY - this.y) < 0.01) {
			this.y = this.targetY
			this.onMoveEnd()
		}
	}

	onMoveEnd() {
		if (!this.isMoveEnd) {
			this.isMoveEnd = true
			EventManager.Instance.emit(EVENT_ENUM.PLAYER_MOVE_END)
		}
	}

	/***
	 * 玩家死亡
	 */
	onDead() {
		this.state = PLAYER_STATE.DEATH
	}

	/***
	 * 响应玩家操作
	 * @param type
	 */
	inputProcess(type) {
		if (this.state === PLAYER_STATE.ATTACK) {
			return
		}

		const id = this.attackEnemy(type)
		if (id !== -1) {
			console.log('attack!')
			this.state = PLAYER_STATE.ATTACK
			EventManager.Instance.emit(EVENT_ENUM.ATTACK_ENEMY, id)
			EventManager.Instance.emit(EVENT_ENUM.RECORD_STEP)
			EventManager.Instance.emit(EVENT_ENUM.PLAYER_MOVE)
			return
		}

		if (this.WillBlock(type)) {
			console.log('stop!')
			return
		}

		this.move(type)
	}

	/***
	 * 根据type玩家移动
	 * @param type 控制类型CONTROLLER_ENUM之一
	 */
	move(type) {
		if (type === CONTROLLER_ENUM.TOP) {
			this.targetY -= 1
			this.state = PLAYER_STATE.IDLE
		} else if (type === CONTROLLER_ENUM.BOTTOM) {
			this.targetY += 1
			this.state = PLAYER_STATE.IDLE
		} else if (type === CONTROLLER_ENUM.LEFT) {
			this.targetX -= 1
			this.state = PLAYER_STATE.IDLE
		} else if (type === CONTROLLER_ENUM.RIGHT) {
			this.targetX += 1
			this.state = PLAYER_STATE.IDLE
		} else if (type === CONTROLLER_ENUM.TURNLEFT) {
			this.state = PLAYER_STATE.TURNLEFT
			if (this.direction === DIRECTION_ENUM.TOP) {
				this.direction = DIRECTION_ENUM.LEFT
			} else if (this.direction === DIRECTION_ENUM.LEFT) {
				this.direction = DIRECTION_ENUM.BOTTOM
			} else if (this.direction === DIRECTION_ENUM.BOTTOM) {
				this.direction = DIRECTION_ENUM.RIGHT
			} else if (this.direction === DIRECTION_ENUM.RIGHT) {
				this.direction = DIRECTION_ENUM.TOP
			}
			this.state = PLAYER_STATE.TURNLEFT
		} else if (type === CONTROLLER_ENUM.TURNRIGHT) {
			this.state = PLAYER_STATE.TURNRIGHT
			if (this.direction === DIRECTION_ENUM.TOP) {
				this.direction = DIRECTION_ENUM.RIGHT
			} else if (this.direction === DIRECTION_ENUM.LEFT) {
				this.direction = DIRECTION_ENUM.TOP
			} else if (this.direction === DIRECTION_ENUM.BOTTOM) {
				this.direction = DIRECTION_ENUM.LEFT
			} else if (this.direction === DIRECTION_ENUM.RIGHT) {
				this.direction = DIRECTION_ENUM.BOTTOM
			}
			this.state = PLAYER_STATE.TURNRIGHT
		}
		EventManager.Instance.emit(EVENT_ENUM.RECORD_STEP)
		EventManager.Instance.emit(EVENT_ENUM.PLAYER_MOVE)
		this.isMoveEnd = false

		// this.showSmoke()
	}

	/***
	 * 生成烟雾
	 */
	showSmoke() {
		const smoke = PoolManager.Instance.getItemByClass(ENEMY_TYPE_ENUM.SMOKE, Smoke)
		smoke.x = this.targetX
		smoke.y = this.targetY
		smoke.direction = this.direction
		DataManager.Instance.smokes.push(smoke)
	}

	/***
	 * 检查枪所在方向是否有敌人，有则攻击
	 * @param type
	 */
	attackEnemy(type) {
		const enemies = DataManager.Instance.enemies.filter(enemy => enemy.state !== PLAYER_STATE.DEATH)
		for (let i = 0; i < enemies.length; i++) {
			const enemy = enemies[i]
			const {
				x: enemyX,
				y: enemyY,
				id: enemyId
			} = enemy
			if (this.direction === DIRECTION_ENUM.TOP && type === CONTROLLER_ENUM.TOP && enemyY === this.targetY - 2 &&
				enemyX === this.x) {
				return enemyId
			} else if (this.direction === DIRECTION_ENUM.BOTTOM && type === CONTROLLER_ENUM.BOTTOM && enemyY === this.targetY + 2 &&
				enemyX === this.x) {
				return enemyId
			} else if (this.direction === DIRECTION_ENUM.LEFT && type === CONTROLLER_ENUM.LEFT && enemyX === this.targetX - 2 &&
				enemyY === this.y) {
				return enemyId
			} else if (this.direction === DIRECTION_ENUM.RIGHT && type === CONTROLLER_ENUM.RIGHT && enemyX === this.targetX + 2 && enemyY === this.y) {
				return enemyId
			}
		}

		return -1
	}

	/***
	 * 判断角色是否能按预期进行移动
	 * @param type
	 */
	WillBlock(type) {
		const {targetX:x, targetY:y, direction} = this
		const tileInfo = Background.Instance.getTileMap()
		const enemies = DataManager.Instance.enemies.filter(enemy => enemy.state !== PLAYER_STATE.DEATH)
		const {x: doorX, y: doorY, state: doorState} = DataManager.Instance.door
		const bursts = DataManager.Instance.bursts.filter(burst => burst.state !== PLAYER_STATE.DEATH)

		const {
      mapRowCount:row,
      mapColumnCount:column
		} = DataManager.Instance

		//按钮方向——向上
		if (type === CONTROLLER_ENUM.TOP) {

			const playerNextY = y - 1

			//玩家方向——向上
			if (direction === DIRECTION_ENUM.TOP) {
				//判断是否超出地图
				if (playerNextY < 0) {
					this.state = PLAYER_STATE.BLOCKFRONT
					return true
				}

				const weaponNextY = y - 2
				const nextPlayerTile = tileInfo[x][playerNextY]
				const nextWeaponTile = tileInfo[x][weaponNextY]

				//判断门
				if (doorX === x && doorY === playerNextY && doorState !== PLAYER_STATE.DEATH) {
					this.state = PLAYER_STATE.BLOCKFRONT
					return true
				}

				//判断敌人
				for (let i = 0; i < enemies.length; i++) {
					const enemy = enemies[i]
					const {
						x: enemyX,
						y: enemyY
					} = enemy

					if ((enemyX === x && enemyY === weaponNextY) || (enemyX === x && enemyY === playerNextY)) {
						this.state = PLAYER_STATE.BLOCKFRONT
						return true
					}
				}

				//判断地裂陷阱
				if (bursts.some(burst => burst.x === x && burst.y === playerNextY) && (!nextWeaponTile || nextWeaponTile.turnable)) {
					return false
				}

				//最后判断地图元素
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)) {
				} else {
					this.state = PLAYER_STATE.BLOCKFRONT
					return true
				}

				//玩家方向——向下
			} else if (direction === DIRECTION_ENUM.BOTTOM) {
				//判断是否超出地图
				if (playerNextY < 0) {
					this.state = PLAYER_STATE.BLOCKBACK
					return true
				}

				const weaponNextY = y
				const nextPlayerTile = tileInfo[x][playerNextY]
				const nextWeaponTile = tileInfo[x][weaponNextY]

				//判断门
				if (doorX === x && doorY === playerNextY && doorState !== PLAYER_STATE.DEATH) {
					this.state = PLAYER_STATE.BLOCKBACK
					return true
				}

				//判断敌人
				for (let i = 0; i < enemies.length; i++) {
					const enemy = enemies[i]
					const {
						x: enemyX,
						y: enemyY
					} = enemy

					if (enemyX === x && enemyY === playerNextY) {
						this.state = PLAYER_STATE.BLOCKBACK
						return true
					}
				}

				//判断地裂陷阱
				if (bursts.some(burst => burst.x === x && burst.y === playerNextY) && (!nextWeaponTile || nextWeaponTile.turnable)) {
					return false
				}

				//最后判断地图元素
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)) {
				} else {
					this.state = PLAYER_STATE.BLOCKBACK
					return true
				}

				//玩家方向——向左
			} else if (direction === DIRECTION_ENUM.LEFT) {
				//判断是否超出地图
				if (playerNextY < 0) {
					this.state = PLAYER_STATE.BLOCKRIGHT
					return true
				}

				const weaponNextX = x - 1
				const weaponNextY = y - 1
				const nextPlayerTile = tileInfo[x][playerNextY]
				const nextWeaponTile = tileInfo[weaponNextX][weaponNextY]

				//判断门
				if (doorX === x && doorY === playerNextY && doorState !== PLAYER_STATE.DEATH) {
					this.state = PLAYER_STATE.BLOCKRIGHT
					return true
				}

				//判断敌人
				for (let i = 0; i < enemies.length; i++) {
					const enemy = enemies[i]
					const {
						x: enemyX,
						y: enemyY
					} = enemy

					if ((enemyX === x && enemyY === playerNextY) || (enemyX === weaponNextX && enemyY === weaponNextY)) {
						this.state = PLAYER_STATE.BLOCKRIGHT
						return true
					}
				}

				//判断地裂陷阱
				if (bursts.some(burst => burst.x === x && burst.y === playerNextY) && (!nextWeaponTile || nextWeaponTile.turnable)) {
					return false
				}

				//最后判断地图元素
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)) {
				} else {
					this.state = PLAYER_STATE.BLOCKRIGHT
					return true
				}

				//玩家方向——向右
			} else if (direction === DIRECTION_ENUM.RIGHT) {
				//判断是否超出地图
				if (playerNextY < 0) {
					this.state = PLAYER_STATE.BLOCKLEFT
					return true
				}

				const weaponNextX = x + 1
				const weaponNextY = y - 1
				const nextPlayerTile = tileInfo[x][playerNextY]
				const nextWeaponTile = tileInfo[weaponNextX][weaponNextY]

				//判断门
				if (doorX === x && doorY === playerNextY && doorState !== PLAYER_STATE.DEATH) {
					this.state = PLAYER_STATE.BLOCKLEFT
					return true
				}

				//判断敌人
				for (let i = 0; i < enemies.length; i++) {
					const enemy = enemies[i]
					const {
						x: enemyX,
						y: enemyY
					} = enemy

					if ((enemyX === x && enemyY === playerNextY) || (enemyX === weaponNextX && enemyY === weaponNextY)) {
						this.state = PLAYER_STATE.BLOCKLEFT
						return true
					}
				}

				//判断地裂陷阱
				if (bursts.some(burst => burst.x === x && burst.y === playerNextY) && (!nextWeaponTile || nextWeaponTile.turnable)) {
					return false
				}

				//最后判断地图元素
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)) {
				} else {
					this.state = PLAYER_STATE.BLOCKLEFT
					return true
				}
			}

			//按钮方向——向下
		} else if (type === CONTROLLER_ENUM.BOTTOM) {

			const playerNextY = y + 1

			//玩家方向——向上
			if (direction === DIRECTION_ENUM.TOP) {
				if (playerNextY > column - 1) {
					this.state = PLAYER_STATE.BLOCKBACK

					return true
				}

				const weaponNextY = y
				const nextPlayerTile = tileInfo[x][playerNextY]
				const nextWeaponTile = tileInfo[x][weaponNextY]

				//判断门
				if (doorX === x && doorY === playerNextY && doorState !== PLAYER_STATE.DEATH) {
					this.state = PLAYER_STATE.BLOCKBACK
					return true
				}

				//判断敌人
				for (let i = 0; i < enemies.length; i++) {
					const enemy = enemies[i]
					const {
						x: enemyX,
						y: enemyY
					} = enemy

					if (enemyX === x && enemyY === playerNextY) {
						this.state = PLAYER_STATE.BLOCKBACK
						return true
					}
				}

				//判断地裂陷阱
				if (bursts.some(burst => burst.x === x && burst.y === playerNextY) && (!nextWeaponTile || nextWeaponTile.turnable)) {
					return false
				}

				//最后判断地图元素
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)) {
				} else {
					this.state = PLAYER_STATE.BLOCKBACK
					return true
				}

				//玩家方向——向下
			} else if (direction === DIRECTION_ENUM.BOTTOM) {
				if (playerNextY > column - 1) {
					this.state = PLAYER_STATE.BLOCKFRONT

					return true
				}

				const weaponNextY = y + 2
				const nextPlayerTile = tileInfo[x][playerNextY]
				const nextWeaponTile = tileInfo[x][weaponNextY]

				//判断门
				if (doorX === x && doorY === playerNextY && doorState !== PLAYER_STATE.DEATH) {
					this.state = PLAYER_STATE.BLOCKFRONT
					return true
				}

				//判断敌人
				for (let i = 0; i < enemies.length; i++) {
					const enemy = enemies[i]
					const {
						x: enemyX,
						y: enemyY
					} = enemy

					if ((enemyX === x && enemyY === weaponNextY) || (enemyX === x && enemyY === playerNextY)) {
						this.state = PLAYER_STATE.BLOCKFRONT
						return true
					}
				}

				//判断地裂陷阱
				if (bursts.some(burst => burst.x === x && burst.y === playerNextY) && (!nextWeaponTile || nextWeaponTile.turnable)) {
					return false
				}

				//最后判断地图元素
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)) {
				} else {
					this.state = PLAYER_STATE.BLOCKFRONT
					return true
				}

				//玩家方向——向左
			} else if (direction === DIRECTION_ENUM.LEFT) {
				if (playerNextY > column - 1) {
					this.state = PLAYER_STATE.BLOCKLEFT

					return true
				}

				const weaponNextX = x - 1
				const weaponNextY = y + 1
				const nextPlayerTile = tileInfo[x][playerNextY]
				const nextWeaponTile = tileInfo[weaponNextX][weaponNextY]

				//判断门
				if (doorX === x && doorY === playerNextY && doorState !== PLAYER_STATE.DEATH) {
					this.state = PLAYER_STATE.BLOCKLEFT
					return true
				}

				//判断敌人
				for (let i = 0; i < enemies.length; i++) {
					const enemy = enemies[i]
					const {
						x: enemyX,
						y: enemyY
					} = enemy

					if ((enemyX === x && enemyY === playerNextY) || (enemyX === weaponNextX && enemyY === weaponNextY)) {
						this.state = PLAYER_STATE.BLOCKLEFT
						return true
					}
				}

				//判断地裂陷阱
				if (bursts.some(burst => burst.x === x && burst.y === playerNextY) && (!nextWeaponTile || nextWeaponTile.turnable)) {
					return false
				}

				//最后判断地图元素
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)) {
				} else {
					this.state = PLAYER_STATE.BLOCKLEFT
					return true
				}

				//玩家方向——向右
			} else if (direction === DIRECTION_ENUM.RIGHT) {
				if (playerNextY > column - 1) {
					this.state = PLAYER_STATE.BLOCKRIGHT

					return true
				}

				const weaponNextX = x + 1
				const weaponNextY = y + 1
				const nextPlayerTile = tileInfo[x][playerNextY]
				const nextWeaponTile = tileInfo[weaponNextX][weaponNextY]

				//判断门
				if (doorX === x && doorY === playerNextY && doorState !== PLAYER_STATE.DEATH) {
					this.state = PLAYER_STATE.BLOCKRIGHT
					return true
				}

				//判断敌人
				for (let i = 0; i < enemies.length; i++) {
					const enemy = enemies[i]
					const {
						x: enemyX,
						y: enemyY
					} = enemy

					if ((enemyX === x && enemyY === playerNextY) || (enemyX === weaponNextX && enemyY === weaponNextY)) {
						this.state = PLAYER_STATE.BLOCKRIGHT
						return true
					}
				}

				//判断地裂陷阱
				if (bursts.some(burst => burst.x === x && burst.y === playerNextY) && (!nextWeaponTile || nextWeaponTile.turnable)) {
					return false
				}

				//最后判断地图元素
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)) {
				} else {
					this.state = PLAYER_STATE.BLOCKRIGHT
					return true
				}
			}

			//按钮方向——向左
		} else if (type === CONTROLLER_ENUM.LEFT) {

			const playerNextX = x - 1

			//玩家方向——向上
			if (direction === DIRECTION_ENUM.TOP) {
				//判断是否超出地图
				if (playerNextX < 0) {
					this.state = PLAYER_STATE.BLOCKLEFT

					return true
				}

				const weaponNextX = x - 1
				const weaponNextY = y - 1
				const nextPlayerTile = tileInfo[playerNextX][y]
				const nextWeaponTile = tileInfo[weaponNextX][weaponNextY]

				//判断门
				if (doorX === playerNextX && doorY === y && doorState !== PLAYER_STATE.DEATH) {
					this.state = PLAYER_STATE.BLOCKLEFT
					return true
				}

				//判断敌人
				for (let i = 0; i < enemies.length; i++) {
					const enemy = enemies[i]
					const {
						x: enemyX,
						y: enemyY
					} = enemy

					if ((enemyX === playerNextX && enemyY === y) || (enemyX === weaponNextX && enemyY === weaponNextY)) {
						this.state = PLAYER_STATE.BLOCKLEFT
						return true
					}
				}

				//判断地裂陷阱
				if (bursts.some(burst => burst.x === playerNextX && burst.y === y) && (!nextWeaponTile || nextWeaponTile.turnable)) {
					return false
				}

				//最后判断地图元素
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)) {
				} else {
					this.state = PLAYER_STATE.BLOCKLEFT
					return true
				}

				//玩家方向——向下
			} else if (direction === DIRECTION_ENUM.BOTTOM) {
				//判断是否超出地图
				if (playerNextX < 0) {
					this.state = PLAYER_STATE.BLOCKRIGHT

					return true
				}

				const weaponNextX = x - 1
				const weaponNextY = y + 1
				const nextPlayerTile = tileInfo[playerNextX][y]
				const nextWeaponTile = tileInfo[weaponNextX][weaponNextY]

				//判断门
				if (doorX === playerNextX && doorY === y && doorState !== PLAYER_STATE.DEATH) {
					this.state = PLAYER_STATE.BLOCKRIGHT
					return true
				}

				//判断敌人
				for (let i = 0; i < enemies.length; i++) {
					const enemy = enemies[i]
					const {
						x: enemyX,
						y: enemyY
					} = enemy

					if ((enemyX === playerNextX && enemyY === y) || (enemyX === weaponNextX && enemyY === weaponNextY)) {
						this.state = PLAYER_STATE.BLOCKRIGHT
						return true
					}
				}

				//判断地裂陷阱
				if (bursts.some(burst => burst.x === playerNextX && burst.y === y) && (!nextWeaponTile || nextWeaponTile.turnable)) {
					return false
				}

				//最后判断地图元素
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)) {
				} else {
					this.state = PLAYER_STATE.BLOCKRIGHT
					return true
				}

				//玩家方向——向左
			} else if (direction === DIRECTION_ENUM.LEFT) {
				//判断是否超出地图
				if (playerNextX < 0) {
					this.state = PLAYER_STATE.BLOCKFRONT

					return true
				}

				const weaponNextX = x - 2
				const nextPlayerTile = tileInfo[playerNextX][y]
				const nextWeaponTile = tileInfo[weaponNextX][y]

				//判断门
				if (doorX === playerNextX && doorY === y && doorState !== PLAYER_STATE.DEATH) {
					this.state = PLAYER_STATE.BLOCKFRONT
					return true
				}

				//判断敌人
				for (let i = 0; i < enemies.length; i++) {
					const enemy = enemies[i]
					const {
						x: enemyX,
						y: enemyY
					} = enemy

					if ((enemyX === playerNextX && enemyY === y) || (enemyX === weaponNextX && enemyY === y)) {
						this.state = PLAYER_STATE.BLOCKFRONT
						return true
					}
				}

				//判断地裂陷阱
				if (bursts.some(burst => burst.x === playerNextX && burst.y === y) && (!nextWeaponTile || nextWeaponTile.turnable)) {
					return false
				}

				//最后判断地图元素
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)) {
				} else {
					this.state = PLAYER_STATE.BLOCKFRONT
					return true
				}

				//玩家方向——向右
			} else if (direction === DIRECTION_ENUM.RIGHT) {
				//判断是否超出地图
				if (playerNextX < 0) {
					this.state = PLAYER_STATE.BLOCKBACK

					return true
				}

				const weaponNextX = x
				const nextPlayerTile = tileInfo[playerNextX][y]
				const nextWeaponTile = tileInfo[weaponNextX][y]

				//判断门
				if (doorX === playerNextX && doorY === y && doorState !== PLAYER_STATE.DEATH) {
					this.state = PLAYER_STATE.BLOCKBACK
					return true
				}

				//判断敌人
				for (let i = 0; i < enemies.length; i++) {
					const enemy = enemies[i]
					const {
						x: enemyX,
						y: enemyY
					} = enemy

					if (enemyX === playerNextX && enemyY === y) {
						this.state = PLAYER_STATE.BLOCKBACK
						return true
					}
				}

				//判断地裂陷阱
				if (bursts.some(burst => burst.x === playerNextX && burst.y === y) && (!nextWeaponTile || nextWeaponTile.turnable)) {
					return false
				}

				//最后判断地图元素
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)) {
				} else {
					this.state = PLAYER_STATE.BLOCKBACK
					return true
				}
			}

			//按钮方向——向右
		} else if (type === CONTROLLER_ENUM.RIGHT) {

			const playerNextX = x + 1

			//玩家方向——向上
			if (direction === DIRECTION_ENUM.TOP) {
				if (playerNextX > row - 1) {
					this.state = PLAYER_STATE.BLOCKRIGHT

					return true
				}

				const weaponNextX = x + 1
				const weaponNextY = y - 1
				const nextPlayerTile = tileInfo[playerNextX][y]
				const nextWeaponTile = tileInfo[weaponNextX][weaponNextY]

				//判断门
				if (doorX === playerNextX && doorY === y && doorState !== PLAYER_STATE.DEATH) {
					this.state = PLAYER_STATE.BLOCKRIGHT
					return true
				}

				//判断敌人
				for (let i = 0; i < enemies.length; i++) {
					const enemy = enemies[i]
					const {
						x: enemyX,
						y: enemyY
					} = enemy

					if ((enemyX === playerNextX && enemyY === y) || (enemyX === weaponNextX && enemyY === weaponNextY)) {
						this.state = PLAYER_STATE.BLOCKRIGHT
						return true
					}
				}

				//判断地裂陷阱
				if (bursts.some(burst => burst.x === playerNextX && burst.y === y) && (!nextWeaponTile || nextWeaponTile.turnable)) {
					return false
				}

				//最后判断地图元素
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)) {
				} else {
					this.state = PLAYER_STATE.BLOCKRIGHT
					return true
				}

				//玩家方向——向下
			} else if (direction === DIRECTION_ENUM.BOTTOM) {
				if (playerNextX > row - 1) {
					this.state = PLAYER_STATE.BLOCKLEFT

					return true
				}

				const weaponNextX = x + 1
				const weaponNextY = y + 1
				const nextPlayerTile = tileInfo[playerNextX][y]
				const nextWeaponTile = tileInfo[weaponNextX][weaponNextY]

				//判断门
				if (doorX === playerNextX && doorY === y && doorState !== PLAYER_STATE.DEATH) {
					this.state = PLAYER_STATE.BLOCKLEFT
					return true
				}

				//判断敌人
				for (let i = 0; i < enemies.length; i++) {
					const enemy = enemies[i]
					const {
						x: enemyX,
						y: enemyY
					} = enemy

					if ((enemyX === playerNextX && enemyY === y) || (enemyX === weaponNextX && enemyY === weaponNextY)) {
						this.state = PLAYER_STATE.BLOCKLEFT
						return true
					}
				}

				//判断地裂陷阱
				if (bursts.some(burst => burst.x === playerNextX && burst.y === y) && (!nextWeaponTile || nextWeaponTile.turnable)) {
					return false
				}

				//最后判断地图元素
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)) {
				} else {
					this.state = PLAYER_STATE.BLOCKLEFT
					return true
				}

				//玩家方向——向左
			} else if (direction === DIRECTION_ENUM.LEFT) {
				if (playerNextX > row - 1) {
					this.state = PLAYER_STATE.BLOCKBACK

					return true
				}

				const weaponNextX = x
				const nextPlayerTile = tileInfo[playerNextX][y]
				const nextWeaponTile = tileInfo[weaponNextX][y]

				//判断门
				if (doorX === playerNextX && doorY === y && doorState !== PLAYER_STATE.DEATH) {
					this.state = PLAYER_STATE.BLOCKBACK
					return true
				}

				//判断敌人
				for (let i = 0; i < enemies.length; i++) {
					const enemy = enemies[i]
					const {
						x: enemyX,
						y: enemyY
					} = enemy

					if (enemyX === playerNextX && enemyY === y) {
						this.state = PLAYER_STATE.BLOCKBACK
						return true
					}
				}

				//判断地裂陷阱
				if (bursts.some(burst => burst.x === playerNextX && burst.y === y) && (!nextWeaponTile || nextWeaponTile.turnable)) {
					return false
				}

				//最后判断地图元素
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)) {
				} else {
					this.state = PLAYER_STATE.BLOCKBACK
					return true
				}

				//玩家方向——向右
			} else if (direction === DIRECTION_ENUM.RIGHT) {
				if (playerNextX > row - 1) {
					this.state = PLAYER_STATE.BLOCKFRONT

					return true
				}

				const weaponNextX = x + 2
				const nextPlayerTile = tileInfo[playerNextX][y]
				const nextWeaponTile = tileInfo[weaponNextX][y]

				//判断门
				if (doorX === playerNextX && doorY === y && doorState !== PLAYER_STATE.DEATH) {
					this.state = PLAYER_STATE.BLOCKFRONT
					return true
				}

				//判断敌人
				for (let i = 0; i < enemies.length; i++) {
					const enemy = enemies[i]
					const {
						x: enemyX,
						y: enemyY
					} = enemy

					if ((enemyX === playerNextX && enemyY === y) || (enemyX === weaponNextX && enemyY === y)) {
						this.state = PLAYER_STATE.BLOCKFRONT
						return true
					}
				}

				//判断地裂陷阱
				if (bursts.some(burst => burst.x === playerNextX && burst.y === y) && (!nextWeaponTile || nextWeaponTile.turnable)) {
					return false
				}

				//最后判断地图元素
				if ((nextPlayerTile && nextPlayerTile.moveable) && (!nextWeaponTile || nextWeaponTile.turnable)) {
				} else {
					this.state = PLAYER_STATE.BLOCKFRONT
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

			//判断门
			if ((doorX === x && doorY === nextY || doorX === nextX && doorY === y || doorX === nextX && doorY === nextY)
				&& doorState !== PLAYER_STATE.DEATH) {
				this.state = PLAYER_STATE.BLOCKTURNLEFT
				return true
			}

			//判断敌人
			for (let i = 0; i < enemies.length; i++) {
				const enemy = enemies[i]
				const {
					x: enemyX,
					y: enemyY
				} = enemy


				if (enemyX === nextX && enemyY === y) {
					this.state = PLAYER_STATE.BLOCKTURNLEFT

					return true
				} else if (enemyX === nextX && enemyY === nextY) {
					this.state = PLAYER_STATE.BLOCKTURNLEFT

					return true
				} else if (enemyX === x && enemyY === nextY) {
					this.state = PLAYER_STATE.BLOCKTURNLEFT

					return true
				}
			}

			//最后判断地图元素
			if (
				(!tileInfo[x][nextY] || tileInfo[x][nextY].turnable) &&
				(!tileInfo[nextX][y] || tileInfo[nextX][y].turnable) &&
				(!tileInfo[nextX][nextY] || tileInfo[nextX][nextY].turnable)
			) {
			} else {
				this.state = PLAYER_STATE.BLOCKTURNLEFT
				return true
			}

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

			//判断门
			if ((doorX === x && doorY === nextY || doorX === nextX && doorY === y || doorX === nextX && doorY === nextY)
				&& doorState !== PLAYER_STATE.DEATH) {
				this.state = PLAYER_STATE.BLOCKTURNRIGHT
				return true
			}

			//判断敌人
			for (let i = 0; i < enemies.length; i++) {
				const enemy = enemies[i]
				const {
					x: enemyX,
					y: enemyY
				} = enemy

				if (enemyX === nextX && enemyY === y) {
					this.state = PLAYER_STATE.BLOCKTURNRIGHT

					return true
				} else if (enemyX === nextX && enemyY === nextY) {
					this.state = PLAYER_STATE.BLOCKTURNRIGHT

					return true
				} else if (enemyX === x && enemyY === nextY) {
					this.state = PLAYER_STATE.BLOCKTURNRIGHT

					return true
				}
			}

			//最后判断地图元素
			if (
				(!tileInfo[x][nextY] || tileInfo[x][nextY].turnable) &&
				(!tileInfo[nextX][y] || tileInfo[nextX][y].turnable) &&
				(!tileInfo[nextX][nextY] || tileInfo[nextX][nextY].turnable)
			) {
			} else {
				this.state = PLAYER_STATE.BLOCKTURNRIGHT
				return true
			}
		}

		return false
	}
}
