import SpikesTwoPointState from './SpikesTwoPointState'

export default class SpikesTwoPointThreeState extends SpikesTwoPointState{
	constructor(owner,fsm,animations) {
		super(owner, fsm, animations)
	}

	callback() {
		this.owner.backZero()
	}
}
