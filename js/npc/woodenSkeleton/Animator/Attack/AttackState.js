import State from '../../../base/State'
import CanvasManager from '../../../runtime/CanvasManager'
import {PLAYER_STATE} from '../../../enums/index'

/***
 * 如果四个方向的state没有太大差异可以提取一个父级state
 * 这样每个具体方向的state可以自定义动画事件（实现event方法），具有更高的自主性
 */
export default class AttackState extends State {
	constructor(owner,fsm,animations) {
		super()
		this.owner = owner
		this.fsm = fsm
		this.animations = animations
		this.init()
	}

	init(){
		this.isLoop = false
	}

	render() {
		const image = this.animations[this.index]
		const {
			x,
			y,
			width,
			height,
		} = this.owner
		if (image) {
			CanvasManager.Ctx.drawImage(
				image,
				(x * 32) + this.offset.width - 32 - 15,
				(y * 32) + this.offset.height - 32 - 18,
				width,
				height
			)
		}
	}

	callback(){
		this.fsm.currentState = this.fsm.states.get(PLAYER_STATE.IDLE)
	}
}
