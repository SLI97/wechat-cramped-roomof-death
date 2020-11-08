import StateMachine from '../../../base/StateMachine'
import {FSM_PARAM_TYPE_ENUM, PLAYER_STATE} from '../../../enums/index'
import IdleState from './IdleState'
import AttackState from './AttackState'
import DeathState from './DeathState'
import ResourceManager from '../../../runtime/ResourceManager'

const PARAMS_NAME = {
	IDLE:'IDLE',
	ATTACK:'ATTACK',
	DEATH: 'DEATH'
}

const IMG_BURST_PREFIX = 'images/burst/burst'

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
		this.params.set(PARAMS_NAME.IDLE, {
			type: FSM_PARAM_TYPE_ENUM.TRIGGER,
			value: false
		})

		this.params.set(PARAMS_NAME.ATTACK, {
			type: FSM_PARAM_TYPE_ENUM.TRIGGER,
			value: false
		})

		this.params.set(PARAMS_NAME.DEATH, {
			type: FSM_PARAM_TYPE_ENUM.TRIGGER,
			value: false
		})
	}

	initAnimations() {
		const imageMap = ResourceManager.Instance.getImageMap()

		this.idleAnimations = []
		this.attackAnimations = []
		this.deathAnimations = []

		for (let i = 1; i <= 1; i++) {
			this.idleAnimations.push(imageMap.get(`${IMG_BURST_PREFIX} (${i }).png`))
		}

		for (let i = 2; i <= 2; i++) {
			this.attackAnimations.push(imageMap.get(`${IMG_BURST_PREFIX} (${i }).png`))
		}

		for (let i = 3; i <= 7; i++) {
			this.deathAnimations.push(imageMap.get(`${IMG_BURST_PREFIX} (${i }).png`))
		}
	}

	initState() {
		this.states.set(PLAYER_STATE.IDLE, new IdleState(this.owner, this, this.idleAnimations))
		this.states.set(PLAYER_STATE.ATTACK, new AttackState(this.owner, this, this.attackAnimations))
		this.states.set(PLAYER_STATE.DEATH, new DeathState(this.owner, this, this.deathAnimations))
		this.currentState = this.states.get(PLAYER_STATE.IDLE)
	}

	update() {
		const currentState = this.currentState
		switch (currentState) {
			case this.states.get(PLAYER_STATE.IDLE):
				if (this.params.get(PARAMS_NAME.ATTACK).value) {
					this.currentState = this.states.get(PLAYER_STATE.ATTACK)
				}else if(this.params.get(PARAMS_NAME.DEATH).value){
					this.currentState = this.states.get(PLAYER_STATE.DEATH)
				}
				break
			case this.states.get(PLAYER_STATE.ATTACK):
				if (this.params.get(PARAMS_NAME.IDLE).value) {
					this.currentState = this.states.get(PLAYER_STATE.IDLE)
				}else if(this.params.get(PARAMS_NAME.DEATH).value){
					this.currentState = this.states.get(PLAYER_STATE.DEATH)
				}
				break
			case this.states.get(PLAYER_STATE.DEATH):
				if (this.params.get(PARAMS_NAME.ATTACK).value) {
					this.currentState = this.states.get(PLAYER_STATE.ATTACK)
				}else if(this.params.get(PARAMS_NAME.IDLE).value){
					this.currentState = this.states.get(PLAYER_STATE.IDLE)
				}
				break
			default:
				this.currentState = this.states.get(PLAYER_STATE.IDLE)
				break
		}

		super.update()
	}
}
