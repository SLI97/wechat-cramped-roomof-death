import BurstState from './BurstState'

export default class DeathState extends BurstState {
	constructor(owner, fsm, animations) {
		super(owner, fsm, animations, false)
	}
}

