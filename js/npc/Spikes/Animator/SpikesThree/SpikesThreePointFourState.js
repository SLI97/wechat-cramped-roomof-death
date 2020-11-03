import SpikesThreePointState from './SpikesThreePointState'

export default class SpikesThreePointFourState extends SpikesThreePointState{
	constructor(owner,fsm,animations) {
		super(animations,false)
		this.owner = owner
		this.fsm = fsm
	}

	callback() {
		this.owner.onLoop()
	}
}
