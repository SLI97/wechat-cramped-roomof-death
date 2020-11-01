import Scene from './Scene'
import DataManager from '../runtime/DataManager'
import Player from '../player/Player'
import Background from '../background/Background'
import CanvasManager from '../runtime/CanvasManager'
import ResourceManager from '../runtime/ResourceManager'
import Enemy from '../npc/Enemy'
import WoodenSkeleton from '../npc/woodenSkeleton/WoodenSkeleton'
import EventManager from '../runtime/EventManager'
import {
	ENEMY_TYPE_ENUM,
	EVENT_ENUM,
	PLAYER_STATE
} from '../enums/index'
import MainMenuScene from './MainMenuScene'
import UIManager from '../ui/UIManager'
import IronSkeleton from '../npc/ironSkeleton/IronSkeleton'
import Door from '../npc/Door/Door'

import {
	level1,
	// level2
} from '../levels/index'
import Burst from '../npc/Burst/Burst'
import Spikes from '../npc/Spikes/Spikes'

const SCREEN_WIDTH = window.innerWidth
const SCREEN_HEIGHT = window.innerHeight
const BG_COLOR = '#140B28'

const BG_WIDTH = 32
const BG_HEIGHT = 32

export default class BattleScene extends Scene {
	constructor(sceneManager) {
		super(sceneManager)
		this.sceneName = 'BattleScene'

		this.recordHandler = this.record.bind(this)
		this.revokeHandler = this.revoke.bind(this)
		this.restartHandler = this.restart.bind(this)
		this.nextLevelHandler = this.nextLevel.bind(this)
		this.attackEnemyHandler = this.attackEnemy.bind(this)
		this.attackPlayerHandler = this.attackPlayer.bind(this)

		this.level1 = level1

		this.isLoaded = false
	}

	beginScene() {
		// EventManager.Instance.on(EVENT_ENUM.RECORD_STEP, this.recordHandler)
		EventManager.Instance.on(EVENT_ENUM.REVOKE_STEP, this.revokeHandler)
		EventManager.Instance.on(EVENT_ENUM.RESTART_LEVEL, this.restartHandler)
		EventManager.Instance.on(EVENT_ENUM.NEXT_LEVEL, this.nextLevelHandler)
		EventManager.Instance.on(EVENT_ENUM.ATTACK_ENEMY, this.attackEnemyHandler)
		EventManager.Instance.on(EVENT_ENUM.ATTACK_PLAYER, this.attackPlayerHandler)

		ResourceManager.Instance.load().then(() => {
			DataManager.Instance.reset()
			this.initLevel()
			this.calcOffset()
			// this.sceneManager.setScene(new MainMenuScene())
			this.isLoaded = true
		})

	}

	updateScene() {
		// this.checkEnemyAttackPlayer()

		if (DataManager.Instance.player) {
			DataManager.Instance.player.update()
		}
		if (DataManager.Instance.enemies instanceof Array && DataManager.Instance.enemies.length) {
			DataManager.Instance.enemies.forEach(enemy => {
				enemy.update()
			})
		}

		if (DataManager.Instance.smokes instanceof Array && DataManager.Instance.smokes.length) {
			DataManager.Instance.smokes.forEach(smoke => {
				smoke.update()
			})
		}

		this.render()
	}

	render() {
		if (!this.isLoaded) {
			return
		}
		CanvasManager.Ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
		CanvasManager.Ctx.fillStyle = BG_COLOR
		CanvasManager.Ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
		Background.Instance.render()

		DataManager.Instance.smokes.forEach(smoke => {
			smoke.render()
		})

		DataManager.Instance.enemies.forEach(enemy => {
			enemy.render()
		})

		DataManager.Instance.player.render()
		UIManager.Instance.render()

	}

	restart() {
		DataManager.Instance.reset()
		this.initLevel()
	}

	nextLevel() {
		DataManager.Instance.levelIndex += 1
		this.initLevel()
	}

	initLevel() {
		const level = this['level' + DataManager.Instance.levelIndex]
		if (level) {
			this.level = level

			// UIManager.Instance.fadeIn()

			//地图信息
			DataManager.Instance.mapInfo = this.level.mapInfo.concat()
			DataManager.Instance.mapRowCount = this.level.mapInfo.length || 0
			DataManager.Instance.mapColumnCount = this.level.mapInfo[0].length || 0

			this.generatePlayer()
			this.generateEnemy()
			// this.generateBursts()
			// this.generateSpikes()
			// this.generateDoor()

			// setTimeout(() => {
			// 	UIManager.Instance.fadeOut()
			// }, 1000)
		} else {
			this.sceneManager.setScene(new MainMenuScene())
		}
	}

	generatePlayer() {
		const player = new Player()
		player.x = player.targetX = this.level.player.x
		player.y = player.targetY = this.level.player.y
		player.direction = this.level.player.direction
		DataManager.Instance.player = player
	}

	generateEnemy() {
		const list = this.level.enemies.map(item => {
			let enemy = null
			if (item.type === ENEMY_TYPE_ENUM.SKELETON_WOODEN) {
				enemy = new WoodenSkeleton()
			} else if (item.type === ENEMY_TYPE_ENUM.SKELETON_IRON) {
				enemy = new IronSkeleton(ENEMY_TYPE_ENUM.SKELETON_IRON)
			} else {
				return null
			}
			enemy.x = item.x
			enemy.y = item.y
			enemy.direction = item.direction
			return enemy
		})
		DataManager.Instance.enemies = list
	}

	generateBursts() {
		const list = this.level.bursts.map(item => {
			let enemy = null
			if (item.type === ENEMY_TYPE_ENUM.BURST_FLOOR) {
				enemy = new Burst()
			} else {
				return null
			}
			enemy.x = item.x
			enemy.y = item.y
			enemy.active = item.active
			return enemy
		})
		DataManager.Instance.bursts = list
	}

	generateSpikes() {
		const list = this.level.spkies.map(item => {
			let enemy = null
			if (item.type === ENEMY_TYPE_ENUM.BURST_FLOOR) {
				enemy = new Spikes()
			} else {
				return null
			}
			enemy.x = item.x
			enemy.y = item.y
			enemy.count = item.count
			return enemy
		})
		DataManager.Instance.spikes = list
	}

	generateDoor() {
		const door = new Door()
		door.x = this.level.door.x
		door.y = this.level.door.y
		door.direction = this.level.door.direction
		DataManager.Instance.door = door
	}

	attackEnemy(id) {
		if (!id) {
			return
		}
		const enemy = DataManager.Instance.enemies.find(i => i.id === id)
		if (enemy) {
			enemy.state = PLAYER_STATE.DEATH
			console.log(enemy.state)
			// this.openDoorOrNot(enemy.state)
		}
	}

	attackPlayer() {
		DataManager.Instance.player.state = PLAYER_STATE.DEATH
	}

	record() {
		const item = {
			player: Object.assign({}, DataManager.Instance.player),
			enemies: DataManager.Instance.enemies.concat(),
			spkies: DataManager.Instance.spkies.concat(),
			bursts: DataManager.Instance.bursts.concat(),
			door: Object.assign({}, DataManager.Instance.door),
		}
		DataManager.Instance.records.push(item)
	}

	revoke() {
		const item = DataManager.Instance.records.pop()
		if (item) {
			DataManager.Instance.player = item.player
			DataManager.Instance.enemies = item.enemies
			DataManager.Instance.spkies = item.spkies
			DataManager.Instance.bursts = item.bursts
			DataManager.Instance.door = item.door
		}
	}

	openDoorOrNot() {
		const enemies = DataManager.Instance.enemies
		if (enemies && enemies.length) {
			EventManager.Instance.emit(EVENT_ENUM.OPENDOOR)
		}
	}

	// checkEnemyAttackPlayer() {
	// 	const {x: px, y: py} = DataManager.Instance.getplayer()
	// 	const enemies = DataManager.Instance.getenemies()
	// 	for (let i = 0; i < enemies.length; i++) {
	//
	// 	}
	// 	if (true) {
	// 		Player.Instance.goDead()
	// 	}
	// }

	/***
	 * 计算设备宽高把canvas整体偏移到屏幕中央
	 */
	calcOffset() {
		const countObj = DataManager.Instance.getMapCount()

		const rowCount = countObj.row
		const columnCount = countObj.column
		const disX = (SCREEN_WIDTH - (BG_WIDTH * rowCount)) / 2
		const disY = (SCREEN_HEIGHT - (BG_HEIGHT * columnCount)) / 2
		DataManager.Instance.offset = {
			width: disX,
			height: disY
		}
	}
}