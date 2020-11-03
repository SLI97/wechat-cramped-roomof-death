import SpikesTwoPointState from './SpikesTwoPointState'

export default class SpikesTwoPointTwoState extends SpikesTwoPointState{
	constructor(owner,fsm,animations) {
		super(animations,false)
		this.owner = owner
		this.fsm = fsm
	}
}
