import UIManager from './ui/UIManager'
import Music from './runtime/MusicManager'
import DataManager from './runtime/DataManager'
import Singleton from './base/Singleton'

import SceneManager from './scene/SceneManager'
import StartScene from './scene/StartScene'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const BG_WIDTH = 32
const BG_HEIGHT = 32

/**
 * 游戏主函数
 */
export default class Main extends Singleton {

	static get Instance() {
		return super.GetInstance(Main)
	}

	constructor() {
		super()
		this.bindLoop = this.loop.bind(this)
	}

	start() {
		this.calcOffset()
		SceneManager.Instance.setScene(new StartScene())
		this.loop()
	}

	// 实现游戏帧循环
	loop() {
		DataManager.Instance.frame++

		this.update()
		this.render()

		// 清除上一局的动画
		// window.cancelAnimationFrame(this.aniId);

		// 维护当前requestAnimationFrame的id
		// this.aniId    = 0

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
		UIManager.Instance.render()
	}

	// 游戏逻辑更新主函数
	update() {
		SceneManager.Instance.updateScene()
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
