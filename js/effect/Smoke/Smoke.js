import Sprite from '../../base/Sprite'
import Player from '../../player/Player'
import EventManager from '../../runtime/EventManager'
import {EVENT_ENUM} from '../../enums/index'
import CanvasManager from '../../runtime/CanvasManager'

const BG_WIDTH = 32
const BG_HEIGHT = 32

const IMG_BG_PREFIX = 'images/bg/bg (20).png'

export default class Smoke extends Sprite {
	constructor(x,y) {
		super(IMG_BG_PREFIX, BG_WIDTH, BG_HEIGHT,x,y)
	}

	update() {
	}

	show(){
		this.visible = true
	}

	render() {
		if(!this.visible){
			return
		}

		const {
			x,
			y,
			width,
			height,
		} = this

		CanvasManager.Ctx.drawImage(
			this.img,
			(x * 32) + this.offset.width,
			(y * 32) + this.offset.height,
			width,
			height
		)
	}
}
