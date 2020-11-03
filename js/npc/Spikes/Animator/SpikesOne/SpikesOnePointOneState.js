import SpikesOnePointState from './SpikesOnePointState'

export default class SpikesOnePointOneState extends SpikesOnePointState{
	constructor(owner,fsm,animations) {
		super(animations,false)
		this.owner = owner
		this.fsm = fsm
	}
}
