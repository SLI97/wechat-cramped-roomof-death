import SpikesFourPointState from './SpikesFourPointState'

export default class SpikesFourPointFiveState extends SpikesFourPointState {
	constructor(owner, fsm, animations) {
		super(animations, false)
		this.owner = owner
		this.fsm = fsm
	}

	callback() {
		this.owner.onLoop()
	}
}
