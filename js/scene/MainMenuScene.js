import Scene from './Scene'
import EventManager from '../runtime/EventManager'
import {EVENT_ENUM, UI_ENUM} from '../enums/index'
import BattleScene from './BattleScene'
import UIManager from '../ui/UIManager'
import MusicManager from '../runtime/MusicManager'
import SceneManager from './SceneManager'

/***
 * 主菜单场景类，显示游戏开始按钮
 */
export default class MainMenuScene extends Scene {
	constructor(sceneManager) {
		super(sceneManager)
		this.sceneName = 'MainMenuScene'
		this.startGameHandler = this.startGame.bind(this)
	}

	beginScene() {
		UIManager.Instance.fadeOut(1000)
		// MusicManager.Instance.play()
		EventManager.Instance.on(EVENT_ENUM.GAME_START, this.startGameHandler)
		const button = UIManager.Instance.get(UI_ENUM.GAME_START)
		button.onShow()
		this.startGame()
	}

	updateScene() {
	}

	endScene() {
		EventManager.Instance.off(EVENT_ENUM.GAME_START, this.startGameHandler)
		const button = UIManager.Instance.get(UI_ENUM.GAME_START)
		button.onHide()
		UIManager.Instance.fadeIn(1000)
	}

	startGame() {
		this.sceneManager.setScene(new BattleScene(SceneManager.Instance))
	}
}
