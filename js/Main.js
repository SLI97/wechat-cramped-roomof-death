import Player from './player/Player'
import Enemy from './npc/Enemy'
import Background from './background/Background'
import UIManager from './ui/UIManager'
import Music from './runtime/MusicManager'
import DataManager from './runtime/DataManager'
import Singleton from './base/Singleton'

import EventManager from './runtime/EventManager'
import ResourceManager from './runtime/ResourceManager'
import CanvasManager from './runtime/CanvasManager'

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
		this.calcOffset()

		this.restart()
	}

	restart() {
		DataManager.Instance.reset()

		const {playerInfo, enemyInfo} = DataManager.Instance.getLevel()
		Player.Instance.targetX = Player.Instance.x = playerInfo.x
		Player.Instance.targetY = Player.Instance.y = playerInfo.y
		Player.Instance.direction = playerInfo.direction

		this.enemiesList = enemyInfo.map(enemy => {
			const obj = new Enemy()
			obj.x = enemy.x
			obj.y = enemy.y
			obj.direction = enemy.direction
		})

		// this.hasEventBind = false

		// 清除上一局的动画
		// window.cancelAnimationFrame(this.aniId);

		// this.aniId = window.requestAnimationFrame(
		//   this.bindLoop,
		//   canvas
		// )

		this.bindLoop = this.loop.bind(this)
		ResourceManager.Instance.load().then(() => {
			this.loop()
		})
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
		CanvasManager.Ctx.clearRect(0, 0, screenWidth, screenHeight)

		CanvasManager.Ctx.fillStyle = BG_COLOR
		CanvasManager.Ctx.fillRect(0, 0, width, height)

		Background.Instance.render()
		UIManager.Instance.render()

		this.enemiesList.forEach(enemy => {
			enemy.render()
		})

		// databus.bullets
		//   .concat(databus.enemys)
		//   .forEach((item) => {
		//     item.drawToCanvas(ctx)
		//   })

		// Player.Instance.drawToCanvas(ctx, this.offset)
		Player.Instance.render()

	}

	// 游戏逻辑更新主函数
	update() {
		// if (databus.gameOver)
		//   return;

		Player.Instance.update()
		// Background.Instance.update()

		// databus.bullets
		//   .concat(databus.enemys)
		//   .forEach((item) => {
		//     item.update()
		//   })
		//
		this.checkEnemyAttackPlayer()

		// this.enemyGenerate()

		// this.collisionDetection()

		// if (databus.frame % 20 === 0) {
		//   Player.Instance.shoot()
		//   this.music.playShoot()
		// }
	}

	checkEnemyAttackPlayer() {
		const {x: px, y: py} = DataManager.Instance.getPlayerInfo()
		const enemyInfo = DataManager.Instance.getEnemyInfo()
		for (let i = 0; i < enemyInfo.length; i++) {

		}
		if (true) {
			Player.Instance.goDead()
		}
	}

	nextLevel() {
		const nextIndex = DataManager.Instance.getLevelIndex() + 1
		DataManager.Instance.setLevelIndex(nextIndex)
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
