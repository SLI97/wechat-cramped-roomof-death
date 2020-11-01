import Scene from './Scene'
import EventManager from '../runtime/EventManager'
import {EVENT_ENUM, UI_ENUM} from '../enums/index'
import BattleScene from './BattleScene'
import UIManager from '../ui/UIManager'


export default class MainMenuScene extends Scene {
	constructor(sceneManager) {
		super(sceneManager)
		this.sceneName = 'MainMenuScene'
		this.startGameHandler = this.startGame.bind(this)
	}

	beginScene() {
		this.button = UIManager.Instance.get(UI_ENUM.GAME_START)
		EventManager.Instance.on(EVENT_ENUM.GAME_START, this.startGameHandler)
	}

	updateScene() {
		// this.button.render()
	}

	startGame() {
		this.sceneManager.setScene(new BattleScene())
	}

	endScene() {
		EventManager.Instance.off(EVENT_ENUM.GAME_START, this.startGameHandler)
	}
}
