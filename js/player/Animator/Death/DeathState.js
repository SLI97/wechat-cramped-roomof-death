import NoLoopState from '../../../base/NoLoopState'

export default class DeathState extends NoLoopState {
	constructor(owner,fsm,animations) {
		super(owner, fsm, animations)
	}

	callback() {}
}
