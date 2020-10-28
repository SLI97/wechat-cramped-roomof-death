import SubStateMachine from '../../base/SubStateMachine'
import {PLAYER_STATE} from '../../enums/index'
import IdleTopState from './Idle/IdleTopState'
import IdleBottomState from './Idle/IdleBottomState'
import IdleLeftState from './Idle/IdleLeftState'
import IdleRightState from './Idle/IdleRightState'

import {DIRECTION_ENUM} from '../../enums/index'

export default class IdleSubStateMachine extends SubStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)
		this.init()
	}

	init() {
		this.initState()
	}

	initState() {
		this.states.set(DIRECTION_ENUM.TOP, new IdleTopState(this.owner, this, []))
		this.states.set(DIRECTION_ENUM.BOTTOM, new IdleBottomState(this.owner, this, []))
		this.states.set(DIRECTION_ENUM.LEFT, new IdleLeftState(this.owner, this, []))
		this.states.set(PLAYER_STATE.RIGHT, new IdleRightState(this.owner, this, []))
		this.currentState = this.states.get(DIRECTION_ENUM.BOTTOM)
	}

	render(){
		this.currentState.render()
	}
}
