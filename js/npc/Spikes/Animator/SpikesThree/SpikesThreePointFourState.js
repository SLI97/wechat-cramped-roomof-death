import SpikesThreePointState from './SpikesThreePointState'

export default class SpikesThreePointFourState extends SpikesThreePointState{
	constructor(owner,fsm,animations) {
		super(owner, fsm, animations)
	}

	callback() {
		this.owner.backZero()
	}
}
