import SpikesFourPointState from './SpikesFourPointState'

export default class SpikesFourPointFiveState extends SpikesFourPointState {
	constructor(owner, fsm, animations) {
		super(owner, fsm, animations)
	}

	callback() {
		this.owner.backZero()
	}
}
