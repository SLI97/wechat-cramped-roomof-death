import Entity from '../../base/Entity'
import SmokeStateMachine from './Animator/SmokeStateMachine'

const SMOKE_WIDTH = 128
const SMOKE_HEIGHT = 128

export default class Smoke extends Entity {
	constructor(dto) {
		super(dto, SmokeStateMachine, null, SMOKE_WIDTH, SMOKE_HEIGHT)
	}

	init() {
	}
}
