import Scene from './Scene'
import ResourceManager from '../runtime/ResourceManager'
import MainMenuScene from './MainMenuScene'
import SceneManager from './SceneManager'
import CanvasManager from '../runtime/CanvasManager'
import UIManager from '../ui/UIManager'

const SCREEN_WIDTH  = window.innerWidth
const SCREEN_HEIGHT = window.innerHeight

/***
 * 游戏开始场景类，主要负责加载资源后跳转Main Menu场景，后续也可以做loading UI。
 */
export default class StartScene extends Scene {
	constructor(sceneManager) {
		super(sceneManager)
		this.sceneName = 'StartScene'
	}

	beginScene() {
		UIManager.Instance.fadeOut(1000)
		//播放游戏开始音乐
		ResourceManager.Instance.load().then(() => {
			this.sceneManager.setScene(new MainMenuScene(SceneManager.Instance))
		})
	}

	updateScene() {
    CanvasManager.Ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
    CanvasManager.Ctx.fillStyle = "#ffffff"
		CanvasManager.Ctx.font    = "20px Arial"

		CanvasManager.Ctx.fillText(
			`${ResourceManager.Instance.finishCount}/${ResourceManager.Instance.totalCount}`,
			SCREEN_WIDTH / 2 - 40, SCREEN_HEIGHT / 2 - 100 + 50)
	}

	endScene() {
		UIManager.Instance.fadeIn(1000)
	}
}
