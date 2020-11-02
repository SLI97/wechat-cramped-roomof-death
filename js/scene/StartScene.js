import Scene from './Scene'
import ResourceManager from '../runtime/ResourceManager'
import MainMenuScene from './MainMenuScene'
import SceneManager from './SceneManager'

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
	}

	endScene() {
	}
}
