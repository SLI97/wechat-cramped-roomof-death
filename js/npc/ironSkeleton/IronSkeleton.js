import Enemy from '../Enemy'
import {DIRECTION_ENUM, PLAYER_STATE} from '../../enums'
import WoodenSkeletonAnimator from '../woodenSkeleton/WoodenSkeletonAnimator'
import DataManager from '../../DataManager'


export default class IronSkeleton extends Enemy{
	constructor(){
		super(null)
	}

	init() {
		this.x = 0
		this.y = 0
		this.direction = DIRECTION_ENUM.BOTTOM
		this.state = PLAYER_STATE.IDLE
		this.animator = new WoodenSkeletonAnimator()
	}

	render(ctx) {
		this.animator.render(ctx)
	}
}
