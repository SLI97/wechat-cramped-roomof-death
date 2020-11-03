import SpikesThreePointState from './SpikesThreePointState'

export default class SpikesThreePointOneState extends SpikesThreePointState{
	constructor(owner,fsm,animations) {
		super(animations,false)
		this.owner = owner
		this.fsm = fsm
	}
}
