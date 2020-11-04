import BurstState from './BurstState'

export default class AttackState extends BurstState {
	constructor(owner, fsm, animations) {
		super(owner, fsm, animations, true)
	}
}
