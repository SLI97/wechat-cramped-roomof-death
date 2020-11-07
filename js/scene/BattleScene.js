import Scene from './Scene'
import SceneManager from './SceneManager'
import DataManager from '../runtime/DataManager'
import Player from '../player/Player'
import Background from '../background/Background'
import CanvasManager from '../runtime/CanvasManager'
import WoodenSkeleton from '../npc/woodenSkeleton/WoodenSkeleton'
import EventManager from '../runtime/EventManager'
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

		// canvas.addEventListener('touchstart', this.onShake.bind(this))
		// canvas.addEventListener('touchstart', 	()=>{
		// 	UIManager.Instance.fadeIn().then(()=>{
		// 		UIManager.Instance.fadeOut()
		// 	})
		// this.onShake()
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
	}

	render() {
		CanvasManager.Ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
		CanvasManager.Ctx.fillStyle = BG_COLOR
		CanvasManager.Ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
		Background.Instance.render()

		if (DataManager.Instance.door) {
			DataManager.Instance.door.render()
		}


		if(DataManager.Instance.smokes.length){
			DataManager.Instance.smokes.forEach(smoke => {
				smoke.render()
			})
		}

		if(DataManager.Instance.bursts.length){
			DataManager.Instance.bursts.forEach(burst => {
				burst.render()
			})
		}

		if(DataManager.Instance.spikes.length){
			DataManager.Instance.spikes.forEach(spike => {
				spike.render()
			})
		}

		if(DataManager.Instance.enemies.length){
			DataManager.Instance.enemies.forEach(enemy => {
				enemy.render()
			})
		}

		if (DataManager.Instance.player) {
			DataManager.Instance.player.render()
		}

		UIManager.Instance.render()

	}

	initLevel() {
		const level = LEVELS['level' + DataManager.Instance.levelIndex]
		if (level) {
			UIManager.Instance.fadeIn().then(() => {
				DataManager.Instance.reset()
				this.level = level
				this.isLoaded = false

				//地图信息
				DataManager.Instance.mapInfo = this.level.mapInfo.concat()
				DataManager.Instance.mapRowCount = this.level.mapInfo.length || 0
				DataManager.Instance.mapColumnCount = this.level.mapInfo[0].length || 0
				this.adaptScreen()

				this.generatePlayer()
				this.generateEnemy()
				this.generateBursts()
				this.generateSpikes()
				this.generateDoor()

				UIManager.Instance.fadeOut()

				this.isLoaded = true
			})
		} else {
			this.sceneManager.setScene(new MainMenuScene(SceneManager.Instance))
		}
	}

	generatePlayer() {
		if(!this.level.player){
			return
		}
		const player = new Player(this.level.player)
		DataManager.Instance.player = player
	}

	generateEnemy() {
		if(!this.level.enemies){
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
		if(!this.level.bursts){
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
		if(!this.level.spikes){
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
		if(!this.level.door){
			return
		}
		const door = new Door(this.level.door)
		DataManager.Instance.door = door
	}

	record() {
		const item = {
			player: Object.assign({}, DataManager.Instance.player),
			enemies: DataManager.Instance.enemies.concat(),
			spikes: DataManager.Instance.spikes.concat(),
			bursts: DataManager.Instance.bursts.concat(),
			door: Object.assign({}, DataManager.Instance.door),
		}
		DataManager.Instance.records.push(item)
	}

	revoke() {
		const item = DataManager.Instance.records.pop()
		console.log(item)
		if (item) {
			DataManager.Instance.player.x = DataManager.Instance.player.targetX = item.player.targetX
			DataManager.Instance.player.y = DataManager.Instance.player.targetY = item.player.targetY
			DataManager.Instance.player.state = item.player._state
			DataManager.Instance.player.direction = item.player._direction

			// for (let i = 0; i < item.enemies.length; i++) {
			// 	const item = item.enemies[i]
			// 	DataManager.Instance.enemies[i].x = item.x
			// 	DataManager.Instance.enemies[i].y = item.y
			// 	DataManager.Instance.enemies[i].state = item.state
			// 	DataManager.Instance.enemies[i].direction = item.direction
			// }

			// for (let i = 0; i < item.spikes.length; i++) {
			// 	const item = item.spikes[i]
			// 	DataManager.Instance.spikes[i].x = item.x
			// 	DataManager.Instance.spikes[i].y = item.y
			// 	DataManager.Instance.spikes[i].state = item.state
			// 	DataManager.Instance.spikes[i].direction = item.direction
			// }

			// for (let i = 0; i < item.bursts.length; i++) {
			// 	const item = item.bursts[i]
			// 	DataManager.Instance.bursts[i].x = item.x
			// 	DataManager.Instance.bursts[i].y = item.y
			// 	DataManager.Instance.bursts[i].state = item.state
			// }

			// DataManager.Instance.door = item.door
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
		// DataManager.Instance.levelIndex += 1
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
	}

	onShake() {
		this.oldFrame = DataManager.Instance.frame
		this.oldOffsetWidth = DataManager.Instance.offset.width
		this.shakePromise = new Promise((resolve, reject) => {
			this.shakePromiseResolve = resolve
		})
		window.cancelAnimationFrame(this.aniId)
		this.aniId = window.requestAnimationFrame(this.onShakeHandler.bind(this), canvas)
		return this.fadeInPromise
	}

	/***
	 *
	 * @param shakeAmount 振幅
	 * @param duration 持续时间
	 * @param frequency 频率
	 */
	onShakeHandler(shakeAmount = 50, duration = 1000, frequency = 4) {
		const frameOffset = (DataManager.Instance.frame - this.oldFrame) / 60 * 1000
		const Phase = (DataManager.Instance.frame - this.oldFrame) / 60 * 2 * (Math.PI) * frequency
		const offset = shakeAmount * Math.sin(Phase)
		DataManager.Instance.offset.width = this.oldOffsetWidth + offset
		console.log(frameOffset)
		if (frameOffset > duration) {
			DataManager.Instance.offset.width = this.oldOffsetWidth
			window.cancelAnimationFrame(this.aniId)
			this.shakePromiseResolve()
		} else {
			this.aniId = window.requestAnimationFrame(this.onShakeHandler.bind(this), canvas)
		}
	}

	/***
	 * 计算设备宽高把canvas整体偏移到屏幕中央
	 */
	adaptScreen() {
		DataManager.Instance.dpr = SCREEN_WIDTH / 375
		console.log(	DataManager.Instance.dpr)

		const {
			mapRowCount,
			mapColumnCount
		} = DataManager.Instance
		const disX = (SCREEN_WIDTH - (BG_WIDTH * mapRowCount * 	DataManager.Instance.dpr)) / 2
		const disY = (SCREEN_HEIGHT - (BG_HEIGHT * mapColumnCount * 	DataManager.Instance.dpr)) / 2
		DataManager.Instance.offset = {
			width: disX,
			height: disY
		}
	}
}