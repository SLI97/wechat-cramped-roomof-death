import SubStateMachine from './SubStateMachine'
import {
  DIRECTION_ENUM,
  DIRECTION_ORDER
} from '../enums/index'

const PARAMS_NAME = {
  DIRECTION: 'DIRECTION'
}

export default class DirectionStateMachine extends SubStateMachine {
  constructor(owner, fsm) {
    super(owner, fsm)
  }

  run() {
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
    if (DIRECTION_ORDER.findIndex(i => i === type) === this.params.get(PARAMS_NAME.DIRECTION).value) {
      return
    }
    // console.log(this.params.get(PARAMS_NAME.DIRECTION).value, type)

    if (this.params.get(PARAMS_NAME.DIRECTION).value === 0) {
      this.currentState = this.states.get(DIRECTION_ENUM.TOP)
    } else if (this.params.get(PARAMS_NAME.DIRECTION).value === 1) {
      this.currentState = this.states.get(DIRECTION_ENUM.BOTTOM)
    } else if (this.params.get(PARAMS_NAME.DIRECTION).value === 2) {
      this.currentState = this.states.get(DIRECTION_ENUM.LEFT)
    } else if (this.params.get(PARAMS_NAME.DIRECTION).value === 3) {
      this.currentState = this.states.get(DIRECTION_ENUM.RIGHT)
    }
  }

  render() {
    if (this.currentState) {
      this.currentState.render()
    }
  }
}