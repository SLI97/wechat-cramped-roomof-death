import SpikesOnePointState from './SpikesOnePointState'

export default class SpikesOnePointTwoState extends SpikesOnePointState{
	constructor(owner,fsm,animations) {
		super(animations,false)
		this.owner = owner
		this.fsm = fsm
	}


	callback() {
		this.owner.onLoop()
	}
}
