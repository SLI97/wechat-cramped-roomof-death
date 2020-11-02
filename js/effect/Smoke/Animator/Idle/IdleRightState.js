import DeathState from './IdleState'
import IdleState from './IdleState'


export default class IdleRightState extends IdleState {
	constructor(owner, fsm, animations) {
		super(owner, fsm, animations)
	}
}
