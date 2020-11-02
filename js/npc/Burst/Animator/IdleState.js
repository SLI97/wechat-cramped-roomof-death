import BrustState from './BrustState'

export default class IdleState extends BrustState {
	constructor(owner, fsm, animations) {
		super(owner, fsm, animations, true)
	}
}
