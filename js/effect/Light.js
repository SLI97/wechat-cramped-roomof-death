import Sprite from '../base/Sprite'
import Player from '../player/Player'

const BG_WIDTH = 32
const BG_HEIGHT = 32

const IMG_BG_PREFIX = 'images/bg/bg (20).png'

export default class Smoke extends Sprite {
	constructor(x,y) {
		super(IMG_BG_PREFIX, BG_WIDTH, BG_HEIGHT,x,y)
	}

	update() {
		//TODO
		//当所有敌人都消灭的时候，门停止渲染
		this.visible = false
	}

	render(ctx) {
		if(!this.visible){
			return
		}

		const {
			x,
			y,
			width,
			height,
		} = this

		ctx.drawImage(
			this.img,
			(x * 32) + this.offset.width,
			(y * 32) + this.offset.height,
			width,
			height
		)
	}
}