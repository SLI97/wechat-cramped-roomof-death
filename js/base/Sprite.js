import ResourceManager from '../runtime/ResourceManager'

/**
 * 游戏基础的精灵类
 */
export default class Sprite {
	constructor(imgSrc = null, width = 0, height = 0, x = 0, y = 0) {
		if(imgSrc){
			this.img = ResourceManager.Instance.getImageMap().get(imgSrc)
		}

		this.width = width
		this.height = height

		this.x = x
		this.y = y

		this.visible = true
	}

	/***
	 * 给实现类实现
	 */
	render() {

	}
}
