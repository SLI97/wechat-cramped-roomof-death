import Enemy from '../Enemy'
import IronSkeletonStateMachine from './Animator/IronSkeletonStateMachine'


export default class IronSkeleton extends Enemy {
	constructor(type) {
		super(null)
		this.type = type
		this.init()
	}

	init() {
		super.init()
		this.fsm = new IronSkeletonStateMachine(this)
	}

	update() {
		super.update()
		this.fsm.update()
	}
}