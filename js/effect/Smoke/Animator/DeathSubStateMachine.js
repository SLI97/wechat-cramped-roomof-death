import SubStateMachine from '../../../base/SubStateMachine'

export default class DeathSubStateMachine extends SubStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)
	}

	update() {
		this.currentState = null
	}
}
