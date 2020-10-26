import Player from './player/Player'
import Animator from './player/Animator'
import Enemy from './npc/enemy'
import Background from './runtime/Background'
import GameInfo from './runtime/gameinfo'
import Controller from './runtime/Controller'
import Music from './runtime/MusicManager'
import DataManager from './DataManager'
import Singleton from './base/Singleton'

import {CONTROLLER_ENUM} from './enums/index'
import EventManager from './EventManager'

let ctx = canvas.getContext('2d')

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const BG_WIDTH = 32
const BG_HEIGHT = 32
const BG_COLOR = '#140B28'

/**
 * 游戏主函数
 */
export default class Main extends Singleton {

	static get Instance() {
		return super.GetInstance(Main)
	}

	constructor() {
		super()
		// 维护当前requestAnimationFrame的id
		// this.aniId    = 0
		// this.eventbus = EventManager.Instance
		// this.music = Music.Instance

		this.restart()
	}

	restart() {
		this.calcOffset()
		DataManager.Instance.reset()

		const {playerInfo}= DataManager.Instance.getLevel()
		Player.Instance.x = playerInfo.x
		Player.Instance.y = playerInfo.y
		Player.Instance.direction = playerInfo.direction

		// this.hasEventBind = false

		// 清除上一局的动画
		// window.cancelAnimationFrame(this.aniId);

		// this.aniId = window.requestAnimationFrame(
		//   this.bindLoop,
		//   canvas
		// )
		console.log(Player.Instance)

		this.bindLoop = this.loop.bind(this)
		this.loop()
	}

	// 实现游戏帧循环
	loop() {
		DataManager.Instance.frame++

		this.update()
		this.render()

		this.aniId = window.requestAnimationFrame(
			this.bindLoop,
			canvas
		)
	}

	/**
	 * canvas重绘函数
	 * 每一帧重新绘制所有的需要展示的元素
	 */
	render() {
		const {width, height} = canvas
		ctx.clearRect(0, 0, width, height)

		ctx.fillStyle = BG_COLOR
		ctx.fillRect(0, 0, width, height)

		Background.Instance.render(ctx)
		Controller.Instance.render(ctx)

		// databus.bullets
		//   .concat(databus.enemys)
		//   .forEach((item) => {
		//     item.drawToCanvas(ctx)
		//   })

		// Player.Instance.drawToCanvas(ctx, this.offset)
		Player.Instance.render(ctx)

		// databus.animations.forEach((ani) => {
		if (Player.Instance.isPlaying) {
			Player.Instance.aniRender(ctx)
		}
		// })
	}

	// 游戏逻辑更新主函数
	update() {
		// if (databus.gameOver)
		//   return;

		// Background.Instance.update()

		// databus.bullets
		//   .concat(databus.enemys)
		//   .forEach((item) => {
		//     item.update()
		//   })

		// this.enemyGenerate()

		// this.collisionDetection()

		// if (databus.frame % 20 === 0) {
		//   Player.Instance.shoot()
		//   this.music.playShoot()
		// }
	}

	nextLevel() {
		const nextIndex = DataManager.Instance.getLevelIndex() + 1
		DataManager.Instance.setLevelIndex(nextIndex)
	}

	getPlayerInfo() {
		return Player.InstanceInfo
	}

	setPlayerInfo(playerInfo) {
		Player.InstanceInfo = playerInfo
	}

	/***
	 * 计算设备宽高把canvas整体偏移到屏幕中央
	 */
	calcOffset() {
		const countObj = DataManager.Instance.getMapCount()

		const rowCount = countObj.row
		const columnCount = countObj.column
		const disX = (screenWidth - (BG_WIDTH * rowCount)) / 2
		const disY = (screenHeight - (BG_HEIGHT * columnCount)) / 2
		DataManager.Instance.setOffset(disX, disY)
	}
}
