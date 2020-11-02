import BrustState from './BrustState'

export default class DeathState extends BrustState {
	constructor(owner, fsm, animations) {
		super(owner, fsm, animations, false)
	}
}

