import Enemy from '../Enemy'
import {DIRECTION_ENUM, PLAYER_STATE} from '../../enums'
import IronSkeletonStateMachine from './Animator/IronSkeletonStateMachine'


export default class IronSkeleton extends Enemy{
	constructor(){
		super(null)
	}

	init() {
		this.x = 0
		this.y = 0
		this.direction = DIRECTION_ENUM.BOTTOM
		this.state = PLAYER_STATE.IDLE
		this.fsm = new IronSkeletonStateMachine()
	}

	render() {
		this.fsm.render()
	}
}
