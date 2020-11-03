import Scene from './Scene'
import DataManager from '../runtime/DataManager'
import Player from '../player/Player'
import Background from '../background/Background'
import CanvasManager from '../runtime/CanvasManager'
import ResourceManager from '../runtime/ResourceManager'
import Enemy from '../base/Enemy'
import WoodenSkeleton from '../npc/woodenSkeleton/WoodenSkeleton'
import EventManager from '../runtime/EventManager'
import {
	ENEMY_TYPE_ENUM,
	EVENT_ENUM,
	PLAYER_STATE, UI_ENUM
} from '../enums/index'
import MainMenuScene from './MainMenuScene'
import UIManager from '../ui/UIManager'
import IronSkeleton from '../npc/ironSkeleton/IronSkeleton'
import Door from '../npc/Door/Door'

import LEVELS from '../levels/index'
import Burst from '../npc/Burst/Burst'
import Spikes from '../npc/Spikes/Spikes'

const SCREEN_WIDTH = window.innerWidth
const SCREEN_HEIGHT = window.innerHeight
const BG_COLOR = '#140B28'

const BG_WIDTH = 32
const BG_HEIGHT = 32

/***
 * 游戏主场景类，游戏整体逻辑都在这里实现
 */
export default class BattleScene extends Scene {
	constructor(sceneManager) {
		super(sceneManager)
		this.sceneName = 'BattleScene'

		this.recordHandler = this.record.bind(this)
		this.revokeHandler = this.revoke.bind(this)
		this.restartHandler = this.restart.bind(this)
		this.nextLevelHandler = this.nextLevel.bind(this)
		this.checkFinishCurLevelHandler = this.checkFinishCurLevel.bind(this)

		this.isLoaded = false
	}

	beginScene() {
		EventManager.Instance.on(EVENT_ENUM.RECORD_STEP, this.recordHandler)
		EventManager.Instance.on(EVENT_ENUM.REVOKE_STEP, this.revokeHandler)
		EventManager.Instance.on(EVENT_ENUM.RESTART_LEVEL, this.restartHandler)
		EventManager.Instance.on(EVENT_ENUM.NEXT_LEVEL, this.nextLevelHandler)
		EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE_END, this.checkFinishCurLevelHandler)
		this.onBindUI()

		this.initLevel()
		this.calcOffset()
		this.isLoaded = true
		// this.useFade = false
		// canvas.addEventListener('touchstart', () => {
		// 	// UIManager.Instance.fadeIn()
		// 	this.useFade = true
		// 	this.oldFrame = DataManager.Instance.frame
		// 	setTimeout(() => {
		// 		this.useFade = false
		// 	}, 100000)
		// })
	}

	updateScene() {
		if (!this.isLoaded) {
			return
		}

		this.update()
		this.render()
	}

	endScene() {
		this.unBindUI()
	}

	update() {
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
	}

	render() {
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


		// if (this.useFade) {
		// 	console.log(999)
		// 	// UIManager.Instance.fadeIn()
		// 	const fadePercent = (DataManager.Instance.frame - this.oldFrame) / 1000
		// 	CanvasManager.Ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
		// 	CanvasManager.Ctx.fillStyle = `rgba(255, 255, 0,${ fadePercent})`
		//
		// 	CanvasManager.Ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
		// console.log(fadePercent, 1)
		// if (fadePercent > 1) {
		// 	window.cancelAnimationFrame(this.aniId)
		// 	this.fadeOut()
		// } else {
		// 	this.aniId = window.requestAnimationFrame(this.fadeInHandler.bind(this), canvas)
		// }
		// }
	}

	initLevel() {
		const level = LEVELS['level' + DataManager.Instance.levelIndex]
		if (level) {
			DataManager.Instance.reset()

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
		const player = new Player(this.level.player)
		DataManager.Instance.player = player
	}

	generateEnemy() {
		const list = this.level.enemies.map(item => {
			let enemy = null
			if (item.type === ENEMY_TYPE_ENUM.SKELETON_WOODEN) {
				enemy = new WoodenSkeleton(item)
			} else if (item.type === ENEMY_TYPE_ENUM.SKELETON_IRON) {
				enemy = new IronSkeleton(item)
			}
			return enemy
		})
		DataManager.Instance.enemies = list
	}

	generateBursts() {
		const list = this.level.bursts.map(item => {
			let enemy = null
			if (item.type === ENEMY_TYPE_ENUM.BURST_FLOOR) {
				enemy = new Burst(item)
			}
			return enemy
		})
		DataManager.Instance.bursts = list
	}

	generateSpikes() {
		const list = this.level.spkies.map(item => {
			let enemy = null
			if (item.type === ENEMY_TYPE_ENUM.BURST_FLOOR) {
				enemy = new Spikes(item)
			}
			return enemy
		})
		DataManager.Instance.spikes = list
	}

	generateDoor() {
		const door = new Door(this.level.door)
		DataManager.Instance.door = door
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
		}else {
			//TODO 播放游戏音频
		}
	}

	checkFinishCurLevel() {
		const {x: doorX, y: doorY, state: doorState} = DataManager.Instance.door
		const {x: playerX, y: playerY} = DataManager.Instance.player
		if (doorX === playerX && doorY === playerY && doorState === PLAYER_STATE.DEATH) {
			EventManager.Instance.emit(EVENT_ENUM.NEXT_LEVEL)
		}
	}

	restart() {
		this.initLevel()
	}

	nextLevel() {
		DataManager.Instance.levelIndex += 1
		this.initLevel()
	}

	onBindUI() {
		UIManager.Instance.get(UI_ENUM.CTRL_TOP).onShow()
		UIManager.Instance.get(UI_ENUM.CTRL_BOTTOM).onShow()
		UIManager.Instance.get(UI_ENUM.CTRL_LEFT).onShow()
		UIManager.Instance.get(UI_ENUM.CTRL_RIGHT).onShow()
		UIManager.Instance.get(UI_ENUM.CTRL_TURN_LEFT).onShow()
		UIManager.Instance.get(UI_ENUM.CTRL_TURN_RIGHT).onShow()
	}

	unBindUI() {
		UIManager.Instance.get(UI_ENUM.CTRL_TOP).onHide()
		UIManager.Instance.get(UI_ENUM.CTRL_BOTTOM).onHide()
		UIManager.Instance.get(UI_ENUM.CTRL_LEFT).onHide()
		UIManager.Instance.get(UI_ENUM.CTRL_RIGHT).onHide()
		UIManager.Instance.get(UI_ENUM.CTRL_TURN_LEFT).onHide()
		UIManager.Instance.get(UI_ENUM.CTRL_TURN_RIGHT).onHide()
	}

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
