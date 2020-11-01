import Scene from './Scene'
import ResourceManager from '../runtime/ResourceManager'
import MainMenuScene from './MainMenuScene'
import MusicManager from '../runtime/MusicManager'


export default class StartScene extends Scene{
	constructor(sceneManager){
		super(sceneManager)
		this.sceneName = 'StartScene'
	}

	beginScene(){
		//播放游戏开始音乐
		MusicManager.Instance.playBgm()
		// ResourceManager.Instance.load().then(()=>{
		// 	this.sceneManager.setScene(new MainMenuScene())
		// })
	}
}
