import NoLoopState from '../../../../base/NoLoopState'
import EventManager from '../../../../runtime/EventManager'
import {EVENT_ENUM} from '../../../../enums/index'

export default class DeathState extends NoLoopState {
	constructor(owner, fsm, animations) {
    super(owner, fsm, animations)
	}

	callback() {
		EventManager.Instance.on(EVENT_ENUM.OPENDOOR)
	}
}
