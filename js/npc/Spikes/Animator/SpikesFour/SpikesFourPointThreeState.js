import SpikesFourPointState from './SpikesFourPointState'

export default class SpikesFourPointThreeState extends SpikesFourPointState{
	constructor(owner,fsm,animations) {
		super(animations,false)
		this.owner = owner
		this.fsm = fsm
	}
}
