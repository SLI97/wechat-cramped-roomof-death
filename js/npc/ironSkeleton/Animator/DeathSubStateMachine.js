import SubStateMachine from '../../base/SubStateMachine'
import {PLAYER_STATE} from '../../enums/index'

import {DIRECTION_ENUM} from '../../enums/index'
import BlockTopState from './Block/BlockTopState'
import BlockBottomState from './Block/BlockBottomState'
import BlockLeftState from './Block/BlockLeftState'
import BlockRightState from './Block/BlockRightState'

export default class DeathSubStateMachine extends SubStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)
		this.init()
	}

	init() {
		this.initState()
	}

	initState() {
		this.states.set(DIRECTION_ENUM.TOP, new BlockTopState(this.owner, this, []))
		this.states.set(DIRECTION_ENUM.BOTTOM, new BlockBottomState(this.owner, this, []))
		this.states.set(DIRECTION_ENUM.LEFT, new BlockLeftState(this.owner, this, []))
		this.states.set(PLAYER_STATE.RIGHT, new BlockRightState(this.owner, this, []))
		this.currentState = this.states.get(DIRECTION_ENUM.BOTTOM)
	}

	render(){
		this.currentState.render()
	}
}
