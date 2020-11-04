import SubStateMachine from './SubStateMachine'
import State from './State'
import {
	DIRECTION_ENUM,
	DIRECTION_ORDER
} from '../enums/index'
import ResourceManager from '../runtime/ResourceManager'

const PARAMS_NAME = {
	DIRECTION: 'DIRECTION'
}

export default class DirectionStateMachine extends SubStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)

		this.imageMap = ResourceManager.Instance.getImageMap()

		this.topAnimations = []
		this.bottomAnimations = []
		this.leftAnimations = []
		this.rightAnimations = []
		this.init()
	}

	init() {
		this.initClass()
		this.initAnimations()
		this.initState()
	}

	initClass() {
		this.topClass = State
		this.bottomClass = State
		this.leftClass = State
		this.rightClass = State
	}

	initAnimations() {
		// this.topAnimations = []
		// this.bottomAnimations = []
		// this.leftAnimations = []
		// this.rightAnimations = []
	}

	initState() {
		this.states.set(DIRECTION_ENUM.TOP, new this.topClass(this.owner, this.fsm, this.topAnimations))
		this.states.set(DIRECTION_ENUM.BOTTOM, new this.bottomClass(this.owner, this.fsm, this.bottomAnimations))
		this.states.set(DIRECTION_ENUM.LEFT, new this.leftClass(this.owner, this.fsm, this.leftAnimations))
		this.states.set(DIRECTION_ENUM.RIGHT, new this.rightClass(this.owner, this.fsm, this.rightAnimations))
		this.currentState = this.states.get(this.owner.direction)
	}

	update() {
		const currentState = this.currentState
		switch (currentState) {
			case this.states.get(DIRECTION_ENUM.TOP):
				this.switch(DIRECTION_ENUM.TOP)
				break
			case this.states.get(DIRECTION_ENUM.BOTTOM):
				this.switch(DIRECTION_ENUM.BOTTOM)
				break
			case this.states.get(DIRECTION_ENUM.LEFT):
				this.switch(DIRECTION_ENUM.LEFT)
				break
			case this.states.get(DIRECTION_ENUM.RIGHT):
				this.switch(DIRECTION_ENUM.RIGHT)
				break
			default:
				this.currentState = this.states.get(this.owner.direction)
				break
		}
	}

	switch (type) {
		const {
			value
		} = this.params.get(PARAMS_NAME.DIRECTION)
		if (DIRECTION_ORDER.findIndex(i => i === type) === value) {
			return
		}

		this.currentState = this.states.get(DIRECTION_ORDER.find((item, index) => value === index))
	}
}
