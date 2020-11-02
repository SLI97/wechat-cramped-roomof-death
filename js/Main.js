import UIManager from './ui/UIManager'
import Music from './runtime/MusicManager'
import DataManager from './runtime/DataManager'
import Singleton from './base/Singleton'

import SceneManager from './scene/SceneManager'
import StartScene from './scene/StartScene'
import BattleScene from './scene/BattleScene'

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
		// SceneManager.Instance.setScene(new StartScene())
		SceneManager.Instance.setScene(new BattleScene(SceneManager.Instance))
		this.loop()
	}

	stop() {
		window.cancelAnimationFrame(this.aniId)
	}

	// 实现游戏帧循环
	loop() {
		DataManager.Instance.frame++

		this.update()

		this.aniId = window.requestAnimationFrame(this.bindLoop, canvas)
	}

	// 游戏逻辑更新主函数
	update() {
		SceneManager.Instance.updateScene()
	}
}
