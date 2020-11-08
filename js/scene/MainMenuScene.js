import Scene from './Scene'
import EventManager from '../runtime/EventManager'
import {
	EVENT_ENUM,
	UI_ENUM
} from '../enums/index'
import BattleScene from './BattleScene'
import UIManager from '../ui/UIManager'
import MusicManager from '../runtime/MusicManager'
import DataManager from '../runtime/DataManager'
import CanvasManager from '../runtime/CanvasManager'
import SceneManager from './SceneManager'

const SCREEN_WIDTH = window.innerWidth
const SCREEN_HEIGHT = window.innerHeight

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
		MusicManager.Instance.playBgm()
		DataManager.Instance.levelIndex = 13
		// EventManager.Instance.on(EVENT_ENUM.GAME_START, this.startGameHandler)
		const button = UIManager.Instance.get(UI_ENUM.GAME_START)
		button.onShow()

		this.touchHandler = this.touchEventHandler.bind(this)
		this.onBind()
	}

	updateScene() {
		CanvasManager.Ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
		CanvasManager.Ctx.fillStyle = `#000`
		CanvasManager.Ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)

		//有些机型不支持渐变 不用了
		// const gra = CanvasManager.Ctx.createLinearGradient(10, 10, 390, 390)
		// gra.addColorStop(0, '#ffa6a1')
		// gra.addColorStop(0.6, '#eeaa44')
		// gra.addColorStop(1, '#feca2f')
		// CanvasManager.Ctx.fillStyle = gra

		CanvasManager.Ctx.fillStyle = '#eeaa44'
		CanvasManager.Ctx.font = "normal bold 30px Arial"
		CanvasManager.Ctx.textAlign = 'center'
		CanvasManager.Ctx.fillText(`Cramped Room`,
			SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 + 50)

		CanvasManager.Ctx.fillStyle = '#eeaa44'
		CanvasManager.Ctx.font = "normal bold 30px Arial"
		CanvasManager.Ctx.textAlign = 'center'
		CanvasManager.Ctx.fillText(`of Death`,
			SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 + 90)

		CanvasManager.Ctx.fillStyle = '#ccc'
		CanvasManager.Ctx.font = "normal bold 16px Arial"
		CanvasManager.Ctx.textAlign = 'center'
		CanvasManager.Ctx.fillText(`（Tap Any Where To Start）`,
			SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 + 120)

		CanvasManager.Ctx.fillStyle = "#aaa"
		CanvasManager.Ctx.font = "12px Arial"
		CanvasManager.Ctx.textAlign = 'center'
		CanvasManager.Ctx.fillText(`Created By Sli97`,
			SCREEN_WIDTH / 2, SCREEN_HEIGHT - 20)


		UIManager.Instance.render()
		UIManager.Instance.fadeRender()
	}

	endScene() {
		EventManager.Instance.off(EVENT_ENUM.GAME_START, this.startGameHandler)
		const button = UIManager.Instance.get(UI_ENUM.GAME_START)
		button.onHide()
		this.unBind()
	}

	startGame() {
		UIManager.Instance.fadeIn(300).then(() => {
			CanvasManager.Ctx.fillStyle = `#000`
			CanvasManager.Ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
			this.sceneManager.setScene(new BattleScene(SceneManager.Instance))
		})
	}

	onBind() {
		canvas.addEventListener('touchstart', this.touchHandler)
	}

	unBind() {
		canvas.removeEventListener('touchstart', this.touchHandler)
	}

	touchEventHandler(e) {
		e.preventDefault()
		this.startGame()
	}
}