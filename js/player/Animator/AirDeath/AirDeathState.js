import NoLoopState from '../../../base/NoLoopState'

export default class AirDeathState extends NoLoopState {
	constructor(owner,fsm,animations) {
		super(owner, fsm, animations)
	}

	callback() {}
}
