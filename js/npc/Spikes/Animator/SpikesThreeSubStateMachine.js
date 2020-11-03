import {SPIKES_TYPE_MAP_POINT, SPIKES_CUR_POINT_TYPE} from '../../../enums/index'
import SubStateMachine from '../../../base/SubStateMachine'
import ResourceManager from '../../../runtime/ResourceManager'

import {PARAMS_NAME} from './SpikesStateMachine'
import SpikesThreePointZeroState from './SpikesThree/SpikesThreePointZeroState'
import SpikesThreePointOneState from './SpikesThree/SpikesThreePointOneState'
import SpikesThreePointTwoState from './SpikesThree/SpikesThreePointTwoState'
import SpikesThreePointThreeState from './SpikesThree/SpikesThreePointThreeState'
import SpikesThreePointFourState from './SpikesThree/SpikesThreePointFourState'

const SPIKES_POINT_MAP_NUMBER = {
	ZERO: 0,
	ONE: 1,
}

const IMG_DOOR_PREFIX = 'images/bg/bg'

export default class SpikesOneSubStateMachine extends SubStateMachine {
	constructor(owner, fsm) {
		super(owner, fsm)
		this.init()
	}

	init() {
		this.initAnimations()
		this.initState()
	}

	initAnimations() {
		this.zeroAnimations = []
		this.oneAnimations = []
		this.twoAnimations = []
		this.fourAnimations = []

		const imageMap = ResourceManager.Instance.getImageMap()

		for (let i = 13; i <= 16; i++) {
			this.zeroAnimations.push(imageMap.get(`${IMG_DOOR_PREFIX} (${i }).png`))
		}

		for (let i = 1; i <= 4; i++) {
			this.oneAnimations.push(imageMap.get(`${IMG_DOOR_PREFIX} (${i }).png`))
		}

		for (let i = 1; i <= 4; i++) {
			this.twoAnimations.push(imageMap.get(`${IMG_DOOR_PREFIX} (${i }).png`))
		}

		for (let i = 1; i <= 4; i++) {
			this.threeAnimations.push(imageMap.get(`${IMG_DOOR_PREFIX} (${i }).png`))
		}

		for (let i = 1; i <= 4; i++) {
			this.fourAnimations.push(imageMap.get(`${IMG_DOOR_PREFIX} (${i }).png`))
		}
	}

	initState() {
		this.states.set(SPIKES_CUR_POINT_TYPE.ZERO, new SpikesThreePointZeroState(this.owner, this.fsm, this.zeroAnimations))
		this.states.set(SPIKES_CUR_POINT_TYPE.ONE, new SpikesThreePointOneState(this.owner, this.fsm, this.oneAnimations))
		this.states.set(SPIKES_CUR_POINT_TYPE.TWO, new SpikesThreePointTwoState(this.owner, this.fsm, this.twoAnimations))
		this.states.set(SPIKES_CUR_POINT_TYPE.THREE, new SpikesThreePointThreeState(this.owner, this.fsm, this.threeAnimations))
		this.states.set(SPIKES_CUR_POINT_TYPE.FOUR, new SpikesThreePointFourState(this.owner, this.fsm, this.fourAnimations))
		this.currentState = this.states.get(SPIKES_CUR_POINT_TYPE.ZERO)
	}

	update() {
		const currentState = this.currentState
		switch (currentState) {
			case this.states.get(SPIKES_CUR_POINT_TYPE.ZERO):
				this.switch(SPIKES_CUR_POINT_TYPE.ZERO)
				break
			case this.states.get(SPIKES_CUR_POINT_TYPE.ONE):
				this.switch(SPIKES_CUR_POINT_TYPE.ONE)
				break
			case this.states.get(SPIKES_CUR_POINT_TYPE.TWO):
				this.switch(SPIKES_CUR_POINT_TYPE.TWO)
				break
			case this.states.get(SPIKES_CUR_POINT_TYPE.THREE):
				this.switch(SPIKES_CUR_POINT_TYPE.THREE)
				break
			case this.states.get(SPIKES_CUR_POINT_TYPE.FOUR):
				this.switch(SPIKES_CUR_POINT_TYPE.FOUR)
				break
			default:
				this.currentState = this.states.get(SPIKES_CUR_POINT_TYPE.ZERO)
				break
		}
	}

	switch(curCount) {
		const value = this.params.get(PARAMS_NAME.CUR_POINT_COUNT).value
		if (SPIKES_POINT_MAP_NUMBER[curCount] === value) {
			return
		}

		this.currentState = this.states.get(SPIKES_POINT_MAP_NUMBER[curCount])
	}
}
