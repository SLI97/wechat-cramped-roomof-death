import Scene from './Scene'
import ResourceManager from '../runtime/ResourceManager'
import MainMenuScene from './MainMenuScene'
import SceneManager from './SceneManager'
import CanvasManager from '../runtime/CanvasManager'

const SCREEN_WIDTH = window.innerWidth
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
		//播放游戏开始音乐
		ResourceManager.Instance.load().then(() => {
			this.sceneManager.setScene(new MainMenuScene(SceneManager.Instance))
		})
	}

	updateScene() {
		const percent = ResourceManager.Instance.finishCount / ResourceManager.Instance.totalCount
		CanvasManager.Ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
		CanvasManager.Ctx.fillStyle = `#000`
		CanvasManager.Ctx.fillRect(0, 0, SCREEN_WIDTH ,SCREEN_HEIGHT)

		const gra = CanvasManager.Ctx.createLinearGradient(10, 10, 390, 390)
		gra.addColorStop(0, '#eeaa44')
		gra.addColorStop(1, '#feca2f')

		CanvasManager.Ctx.fillStyle = `#fff`
		CanvasManager.Ctx.fillRect(0 + 60, SCREEN_HEIGHT / 2 - 50, SCREEN_WIDTH - 120, 50)
		// CanvasManager.Ctx.fillStyle = `#feca2f`
		CanvasManager.Ctx.fillStyle = gra
		CanvasManager.Ctx.fillRect(0 + 60, SCREEN_HEIGHT / 2 - 50, (SCREEN_WIDTH - 120) * percent, 50)
	}

	endScene() {
	}
}
