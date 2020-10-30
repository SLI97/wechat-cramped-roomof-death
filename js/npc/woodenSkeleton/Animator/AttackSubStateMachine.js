import SubStateMachine from '../../../base/SubStateMachine'
import {DIRECTION_ENUM, PLAYER_STATE} from '../../../enums/index'
import AttackTopState from './Attack/AttackTopState'
import AttackBottomState from './Attack/AttackBottomState'
import AttackLeftState from './Attack/AttackLeftState'
import AttackRightState from './Attack/AttackRightState'


export default class AttackSubStateMachine extends SubStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)
		this.init()
	}

	init() {
		this.initState()
	}

	initState() {
		this.states.set(DIRECTION_ENUM.TOP, new AttackTopState(this.owner, this, []))
		this.states.set(DIRECTION_ENUM.BOTTOM, new AttackBottomState(this.owner, this, []))
		this.states.set(DIRECTION_ENUM.LEFT, new AttackLeftState(this.owner, this, []))
		this.states.set(PLAYER_STATE.RIGHT, new AttackRightState(this.owner, this, []))
		this.currentState = this.states.get(DIRECTION_ENUM.BOTTOM)
	}

	render() {
		this.currentState.render()
	}
}
