import NoLoopState from '../../../../base/NoLoopState'
import DataManager from '../../../../runtime/DataManager'
import PoolManager from '../../../../runtime/PoolManager'
import {
	ENEMY_TYPE_ENUM, PLAYER_STATE
} from '../../../../enums/index'

export default class IdleState extends NoLoopState {
	constructor(owner, fsm, animations) {
		super(owner, fsm, animations)
		this.interval = 1000 / 12
	}

	callback() {
		this.owner.state = PLAYER_STATE.DEATH
		// const index = DataManager.Instance.smokes.findIndex(smoke => smoke === this.owner)
		// DataManager.Instance.smokes.splice(index, 1)
		// PoolManager.Instance.recover(ENEMY_TYPE_ENUM.SMOKE, this.owner)
	}
}
