import SpikesThreePointState from './SpikesThreePointState'

export default class SpikesThreePointThreeState extends SpikesThreePointState{
	constructor(owner,fsm,animations) {
		super(animations,false)
		this.owner = owner
		this.fsm = fsm
	}
}
