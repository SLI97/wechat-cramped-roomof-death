import Singleton from '../base/Singleton'

export default class SceneManager extends Singleton {

	static get Instance() {
		return super.GetInstance(SceneManager)
	}

	scene = null
	begin = false

	setScene(scene) {
		this.begin = false
		if (this.scene) {
			this.scene.endScene()
		}
		this.scene = scene
	}

	updateScene() {
		if (this.scene && !this.begin) {
			this.scene.beginScene()
			this.begin = true
		}

		if(this.scene){
			this.scene.updateScene()
		}
	}
}
