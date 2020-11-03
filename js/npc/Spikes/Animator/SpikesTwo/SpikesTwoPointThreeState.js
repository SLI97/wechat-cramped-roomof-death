import SpikesTwoPointState from './SpikesTwoPointState'

export default class SpikesTwoPointThreeState extends SpikesTwoPointState{
	constructor(owner,fsm,animations) {
		super(animations,false)
		this.owner = owner
		this.fsm = fsm
	}

	callback() {
		this.owner.onLoop()
	}
}
