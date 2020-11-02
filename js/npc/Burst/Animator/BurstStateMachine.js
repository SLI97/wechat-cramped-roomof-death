import StateMachine from '../../../base/StateMachine'
import {FSM_PARAM_TYPE_ENUM, PLAYER_STATE} from '../../../enums/index'
import IdleState from './IdleState'
import Death from './DeathState'
import ResourceManager from '../../../runtime/ResourceManager'

const PARAMS_NAME = {
	DEATH: 'DEATH',
}

const IMG_DOOR_PREFIX = 123

export default class BurstStateMachine extends StateMachine {
	constructor(owner) {
		super()
		this.owner = owner
		this.init()
	}

	init() {
		this.initParams()
		this.initAnimations()
		this.initState()
	}

	initParams() {
		this.params.set(PARAMS_NAME.DEATH, {
			type: FSM_PARAM_TYPE_ENUM.TRIGGER,
			value: false
		})
	}

	initState() {
		this.states.set(PLAYER_STATE.DEATH, new IdleState(this.owner, this, this.idleAnimations))
		this.states.set(PLAYER_STATE.DEATH, new Death(this.owner, this, this.deathAnimations))
		this.currentState = this.states.get(PLAYER_STATE.IDLE)
	}

	initAnimations() {
		const imageMap = ResourceManager.Instance.getImageMap()

		this.idleAnimations = []
		this.deathAnimations = []

		for (let i = 13; i <= 16; i++) {
			this.idleAnimations.push(imageMap.get(`${IMG_DOOR_PREFIX} (${i }).png`))
		}

		for (let i = 13; i <= 16; i++) {
			this.deathAnimations.push(imageMap.get(`${IMG_DOOR_PREFIX} (${i }).png`))
		}
	}

	update() {
		super.update()

		const currentState = this.currentState
		switch (currentState) {
			case this.states.get(PLAYER_STATE.IDLE):
				if (this.params.get(PARAMS_NAME.DEATH).value) {
					this.currentState = this.states.get(PLAYER_STATE.DEATH)
				}
				break
			case this.states.get(PLAYER_STATE.DEATH):
				break
			default:
				this.currentState = this.states.get(PLAYER_STATE.IDLE)
				break
		}
	}
}
