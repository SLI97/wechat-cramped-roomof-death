import Player from './player/Player'
import Enemy from './npc/Enemy'
import Background from './runtime/Background'
import UIManager from './runtime/UIManager'
import Music from './runtime/MusicManager'
import DataManager from './DataManager'
import Singleton from './base/Singleton'

import EventManager from './EventManager'
import ResourceManager from './runtime/ResourceManager'

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
		const {width, height} = canvas
		ctx.clearRect(0, 0, width, height)

		ctx.fillStyle = BG_COLOR
		ctx.fillRect(0, 0, width, height)

		Background.Instance.render(ctx)
		UIManager.Instance.render(ctx)

		this.enemiesList.forEach(enemy => {
			enemy.render()
		})

		// databus.bullets
		//   .concat(databus.enemys)
		//   .forEach((item) => {
		//     item.drawToCanvas(ctx)
		//   })

		// Player.Instance.drawToCanvas(ctx, this.offset)
		Player.Instance.render(ctx)

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

	checkEnemyAttackPlayer(){
		const {x:px,y:py} = DataManager.Instance.getPlayerInfo()
		const enemyInfo = DataManager.Instance.getEnemyInfo()
		for (let i = 0; i < enemyInfo.length; i++) {

		}
		if(true){
			Player.Instance.goDead()
		}
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
