import SubStateMachine from '../../../base/SubStateMachine'
import {PLAYER_STATE,DIRECTION_ENUM} from '../../../enums/index'

import DeathTopState from './Death/DeathTopState'
import DeathBottomState from './Death/DeathBottomState'
import DeathLeftState from './Death/DeathLeftState'
import DeathRightState from './Death/DeathRightState'

export default class DeathSubStateMachine extends SubStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)
		this.init()
	}

	init() {
		this.initState()
	}

	initState() {
		this.states.set(DIRECTION_ENUM.TOP, new DeathTopState(this.owner, this, []))
		this.states.set(DIRECTION_ENUM.BOTTOM, new DeathBottomState(this.owner, this, []))
		this.states.set(DIRECTION_ENUM.LEFT, new DeathLeftState(this.owner, this, []))
		this.states.set(PLAYER_STATE.RIGHT, new DeathRightState(this.owner, this, []))
		this.currentState = this.states.get(DIRECTION_ENUM.BOTTOM)
	}

	render() {
		this.currentState.render()
	}
}
