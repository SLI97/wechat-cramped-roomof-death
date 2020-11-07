import {SPIKES_POINT_MAP_NUMBER, SPIKES_CUR_POINT_TYPE} from '../../../enums/index'
import SubStateMachine from '../../../base/SubStateMachine'
import ResourceManager from '../../../runtime/ResourceManager'

import {PARAMS_NAME} from './SpikesStateMachine'
import SpikesFourPointZeroState from "./SpikesFour/SpikesFourPointZeroState";
import SpikesFourPointOneState from "./SpikesFour/SpikesFourPointOneState";
import SpikesFourPointTwoState from "./SpikesFour/SpikesFourPointTwoState";
import SpikesFourPointThreeState from "./SpikesFour/SpikesFourPointThreeState";
import SpikesFourPointFourState from "./SpikesFour/SpikesFourPointFourState";
import SpikesFourPointFiveState from "./SpikesFour/SpikesFourPointFiveState";


const IMG_SPIKES_PREFIX = 'images/spikes/spikes'

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
    this.threeAnimations = []
    this.fourAnimations = []
    this.fiveAnimations = []

    const imageMap = ResourceManager.Instance.getImageMap()

    for (let i = 22; i <= 22; i++) {
      this.zeroAnimations.push(imageMap.get(`${IMG_SPIKES_PREFIX} (${i }).png`))
    }

    for (let i = 23; i <= 23; i++) {
      this.oneAnimations.push(imageMap.get(`${IMG_SPIKES_PREFIX} (${i }).png`))
    }

    for (let i = 24; i <= 24; i++) {
      this.twoAnimations.push(imageMap.get(`${IMG_SPIKES_PREFIX} (${i }).png`))
    }

    for (let i = 25; i <= 25; i++) {
      this.threeAnimations.push(imageMap.get(`${IMG_SPIKES_PREFIX} (${i }).png`))
    }

    for (let i = 26; i <= 26; i++) {
      this.fourAnimations.push(imageMap.get(`${IMG_SPIKES_PREFIX} (${i }).png`))
    }

    for (let i = 27; i <= 30; i++) {
      this.fiveAnimations.push(imageMap.get(`${IMG_SPIKES_PREFIX} (${i }).png`))
    }
  }

  initState() {
    this.states.set(SPIKES_CUR_POINT_TYPE.ZERO, new SpikesFourPointZeroState(this.owner, this.fsm, this.zeroAnimations))
    this.states.set(SPIKES_CUR_POINT_TYPE.ONE, new SpikesFourPointOneState(this.owner, this.fsm, this.oneAnimations))
    this.states.set(SPIKES_CUR_POINT_TYPE.TWO, new SpikesFourPointTwoState(this.owner, this.fsm, this.twoAnimations))
    this.states.set(SPIKES_CUR_POINT_TYPE.THREE, new SpikesFourPointThreeState(this.owner, this.fsm, this.threeAnimations))
    this.states.set(SPIKES_CUR_POINT_TYPE.FOUR, new SpikesFourPointFourState(this.owner, this.fsm, this.fourAnimations))
    this.states.set(SPIKES_CUR_POINT_TYPE.FIVE, new SpikesFourPointFiveState(this.owner, this.fsm, this.fiveAnimations))
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
      case this.states.get(SPIKES_CUR_POINT_TYPE.FIVE):
        this.switch(SPIKES_CUR_POINT_TYPE.FIVE)
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

		for(const key in SPIKES_POINT_MAP_NUMBER){
			if(SPIKES_POINT_MAP_NUMBER[key] === value){
				this.currentState = this.states.get(key)
			}
		}
  }
}
