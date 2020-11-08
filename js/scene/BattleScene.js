import Scene from './Scene'
import SceneManager from './SceneManager'
import DataManager from '../runtime/DataManager'
import Player from '../player/Player'
import Background from '../background/Background'
import CanvasManager from '../runtime/CanvasManager'
import WoodenSkeleton from '../npc/woodenSkeleton/WoodenSkeleton'
import EventManager from '../runtime/EventManager'
import MusicManager from '../runtime/MusicManager'
import {
	ENEMY_TYPE_ENUM,
	EVENT_ENUM,
	PLAYER_STATE,
	UI_ENUM
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
		this.onShakeHandler = this.onShake.bind(this)
		this.isLoaded = false
	}

	beginScene() {
		this.onBindEvent()
		this.onBindUI()

		this.initLevel()

	}

	onBindEvent() {
		EventManager.Instance.on(EVENT_ENUM.RECORD_STEP, this.recordHandler)
		EventManager.Instance.on(EVENT_ENUM.REVOKE_STEP, this.revokeHandler)
		EventManager.Instance.on(EVENT_ENUM.RESTART_LEVEL, this.restartHandler)
		EventManager.Instance.on(EVENT_ENUM.NEXT_LEVEL, this.nextLevelHandler)
		EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE_END, this.checkFinishCurLevelHandler)
		EventManager.Instance.on(EVENT_ENUM.SCREEN_SHAKE, this.onShakeHandler)
	}

	offBindEvent() {
		EventManager.Instance.off(EVENT_ENUM.RECORD_STEP, this.recordHandler)
		EventManager.Instance.off(EVENT_ENUM.REVOKE_STEP, this.revokeHandler)
		EventManager.Instance.off(EVENT_ENUM.RESTART_LEVEL, this.restartHandler)
		EventManager.Instance.off(EVENT_ENUM.NEXT_LEVEL, this.nextLevelHandler)
		EventManager.Instance.off(EVENT_ENUM.PLAYER_MOVE_END, this.checkFinishCurLevelHandler)
		EventManager.Instance.off(EVENT_ENUM.SCREEN_SHAKE, this.onShakeHandler)
	}

	updateScene() {
		if (this.isLoaded) {
			this.update()
			this.render()
		}

		UIManager.Instance.fadeRender()
	}

	endScene() {
		this.offBindEvent()
		this.unBindUI()
		UIManager.Instance.fadeIn()
	}

	update() {
		if (DataManager.Instance.player) {
			DataManager.Instance.player.update()
		}

		if (DataManager.Instance.door) {
			DataManager.Instance.door.update()
		}

		if (DataManager.Instance.enemies instanceof Array && DataManager.Instance.enemies.length) {
			DataManager.Instance.enemies.forEach(enemy => {
				enemy.update()
			})
		}

		if (DataManager.Instance.spikes instanceof Array && DataManager.Instance.spikes.length) {
			DataManager.Instance.spikes.forEach(spike => {
				spike.update()
			})
		}

		if (DataManager.Instance.smokes instanceof Array && DataManager.Instance.smokes.length) {
			DataManager.Instance.smokes.forEach(smoke => {
				smoke.update()
			})
		}

		if (DataManager.Instance.bursts instanceof Array && DataManager.Instance.bursts.length) {
			DataManager.Instance.bursts.forEach(burst => {
				burst.update()
			})
		}

		this.onShakeUpdate()
	}

	render() {
		CanvasManager.Ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
		CanvasManager.Ctx.fillStyle = BG_COLOR
		CanvasManager.Ctx.fillRect(0, 0, SCREEN_WIDTH + 100, SCREEN_HEIGHT + 100)
		Background.Instance.render()

		if (DataManager.Instance.door) {
			DataManager.Instance.door.render()
		}


		if (DataManager.Instance.bursts.length) {
			DataManager.Instance.bursts.forEach(burst => {
				burst.render()
			})
		}

		if (DataManager.Instance.spikes.length) {
			DataManager.Instance.spikes.forEach(spike => {
				spike.render()
			})
		}

		if (DataManager.Instance.smokes.length) {
			DataManager.Instance.smokes.forEach(smoke => {
				smoke.render()
			})
		}

		if (DataManager.Instance.enemies.length) {
			DataManager.Instance.enemies.forEach(enemy => {
				enemy.render()
			})
		}

		if (DataManager.Instance.player) {
			DataManager.Instance.player.render()
		}

		UIManager.Instance.render()

		CanvasManager.Ctx.fillStyle = "#aaa"
		CanvasManager.Ctx.font = "12px Arial"
		CanvasManager.Ctx.textAlign = 'center'
		CanvasManager.Ctx.fillText(`Cramped Room of Death Demo`,
			SCREEN_WIDTH / 2, SCREEN_HEIGHT - 20)
	}

	initLevel() {
		// for (const key in LEVELS) {
		// 	console.log(key, LEVELS[key].mapInfo.length,LEVELS[key].mapInfo[0].length)
		// }
		const level = LEVELS['level' + DataManager.Instance.levelIndex]
		if (level) {
			console.log('level' + DataManager.Instance.levelIndex)
			UIManager.Instance.fadeIn(200).then(() => {
				//防止把抖动效果带到下一关，导致下一关错位
				this.isShaking = false

				CanvasManager.Ctx.fillStyle = `#000`
				CanvasManager.Ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
				this.isLoaded = false
				DataManager.Instance.reset()
				this.level = level

				//地图信息
				DataManager.Instance.mapInfo = this.level.mapInfo.concat()
				DataManager.Instance.mapRowCount = this.level.mapInfo.length || 0
				DataManager.Instance.mapColumnCount = this.level.mapInfo[0].length || 0
				this.adaptScreen()
				Background.Instance.initTile()

				this.generatePlayer()
				this.generateEnemy()
				this.generateBursts()
				this.generateSpikes()
				this.generateDoor()
				this.isLoaded = true
				UIManager.Instance.fadeOut(200)
			})
		} else {
			this.sceneManager.setScene(new MainMenuScene(SceneManager.Instance))
		}
	}

	generatePlayer() {
		if (!this.level.player) {
			DataManager.Instance.player = null
			return
		}
		const player = new Player(this.level.player)
		DataManager.Instance.player = player
	}

	generateEnemy() {
		if (!this.level.enemies) {
			DataManager.Instance.enemies = []
			return
		}
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
		if (!this.level.bursts) {
			DataManager.Instance.bursts = []
			return
		}
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
		if (!this.level.spikes) {
			DataManager.Instance.spikes = []
			return
		}
		const list = this.level.spikes.map(item => {
			let enemy = null
			enemy = new Spikes(item)
			return enemy
		})
		DataManager.Instance.spikes = list
	}

	generateDoor() {
		if (!this.level.door) {
			DataManager.Instance.door = null
			return
		}
		const door = new Door(this.level.door)
		DataManager.Instance.door = door
	}

	record() {
		const item = {
			player: {
				x: DataManager.Instance.player.targetX,
				y: DataManager.Instance.player.targetY,
				state: DataManager.Instance.player.state === PLAYER_STATE.ATTACK ? PLAYER_STATE.IDLE : DataManager.Instance.player.state,
				direction: DataManager.Instance.player.direction
			},
			door: {
				x: DataManager.Instance.door.x,
				y: DataManager.Instance.door.y,
				state: DataManager.Instance.door.state,
				direction: DataManager.Instance.door.direction,
			},
		}
		item.enemies = DataManager.Instance.enemies.map(i => {
			return {
				x: i.x,
				y: i.y,
				state: i.state,
				direction: i.direction
			}
		})

		item.spikes = DataManager.Instance.spikes.map(i => {
			return {
				x: i.x,
				y: i.y,
				curPointCount: i.curPointCount,
			}
		})

		item.bursts = DataManager.Instance.bursts.map(i => {
			return {
				x: i.x,
				y: i.y,
				state: i.state,
			}
		})

		DataManager.Instance.records.push(item)
	}

	revoke() {
		const data = DataManager.Instance.records.pop()
		if (data) {
			DataManager.Instance.player.x = DataManager.Instance.player.targetX = data.player.x
			DataManager.Instance.player.y = DataManager.Instance.player.targetY = data.player.y
			DataManager.Instance.player.state = data.player.state
			DataManager.Instance.player.direction = data.player.direction

			for (let i = 0; i < data.enemies.length; i++) {
				const item = data.enemies[i]
				DataManager.Instance.enemies[i].x = item.x
				DataManager.Instance.enemies[i].y = item.y
				DataManager.Instance.enemies[i].state = item.state
				DataManager.Instance.enemies[i].direction = item.direction
			}

			for (let i = 0; i < data.spikes.length; i++) {
				const item = data.spikes[i]
				DataManager.Instance.spikes[i].x = item.x
				DataManager.Instance.spikes[i].y = item.y
				DataManager.Instance.spikes[i].curPointCount = item.curPointCount
				DataManager.Instance.spikes[i].direction = item.direction
			}

			for (let i = 0; i < data.bursts.length; i++) {
				const item = data.bursts[i]
				DataManager.Instance.bursts[i].x = item.x
				DataManager.Instance.bursts[i].y = item.y
				DataManager.Instance.bursts[i].state = item.state
			}

			DataManager.Instance.door.x = data.door.x
			DataManager.Instance.door.y = data.door.y
			DataManager.Instance.door.state = data.door.state
			DataManager.Instance.door.direction = data.door.direction
		} else {
			//TODO 播放游戏音频
		}
	}

	checkFinishCurLevel() {
		const {
			x: doorX,
			y: doorY,
			state: doorState
		} = DataManager.Instance.door
		const {
			x: playerX,
			y: playerY
		} = DataManager.Instance.player
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
		UIManager.Instance.get(UI_ENUM.RESTART).onShow()
		UIManager.Instance.get(UI_ENUM.REVOKE).onShow()
		UIManager.Instance.get(UI_ENUM.Menu).onShow()
	}

	unBindUI() {
		UIManager.Instance.get(UI_ENUM.CTRL_TOP).onHide()
		UIManager.Instance.get(UI_ENUM.CTRL_BOTTOM).onHide()
		UIManager.Instance.get(UI_ENUM.CTRL_LEFT).onHide()
		UIManager.Instance.get(UI_ENUM.CTRL_RIGHT).onHide()
		UIManager.Instance.get(UI_ENUM.CTRL_TURN_LEFT).onHide()
		UIManager.Instance.get(UI_ENUM.CTRL_TURN_RIGHT).onHide()
		UIManager.Instance.get(UI_ENUM.RESTART).onHide()
		UIManager.Instance.get(UI_ENUM.REVOKE).onHide()
		UIManager.Instance.get(UI_ENUM.Menu).onHide()
	}

	onShake(type = 0) {
		if (this.isShaking) {
			return
		}
		this.isShaking = true
		this.type = type
		this.oldFrame = DataManager.Instance.frame
		this.oldOffset = DataManager.Instance.offset[this.type === 0 ? 'width' : 'height']
	}

	/***
	 *
	 * @param shakeAmount 振幅
	 * @param duration 持续时间
	 * @param frequency 频率
	 */
	onShakeUpdate(shakeAmount = 2, duration = 200, frequency = 4) {
		if (this.isShaking) {
			const frameOffset = (DataManager.Instance.frame - this.oldFrame) / 60 * 1000
			const Phase = (DataManager.Instance.frame - this.oldFrame) / 60 * 2 * (Math.PI) * frequency
			const offset = shakeAmount * Math.sin(Phase)
			DataManager.Instance.offset[this.type === 0 ? 'width' : 'height'] = this.oldOffset + offset
			if (frameOffset > duration) {
				DataManager.Instance.offset[this.type === 0 ? 'width' : 'height'] = this.oldOffset
				this.isShaking = false
			}
		}
	}

	/***
	 * 计算设备宽高把canvas整体偏移到屏幕中央
	 */
	adaptScreen() {
		const {
			mapRowCount,
			mapColumnCount
		} = DataManager.Instance
		const disX = (SCREEN_WIDTH - (BG_WIDTH * mapRowCount * DataManager.Instance.dpr)) / 2
		const disY = (SCREEN_HEIGHT - (BG_HEIGHT * mapColumnCount * DataManager.Instance.dpr)) / 2 - 50
		DataManager.Instance.offset = {
			width: disX,
			height: disY
		}
	}
}