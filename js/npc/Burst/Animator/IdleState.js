import BurstState from './BurstState'

export default class IdleState extends BurstState {
	constructor(owner, fsm, animations) {
		super(owner, fsm, animations, true)
	}
}
