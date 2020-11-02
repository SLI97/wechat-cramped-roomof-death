import NoLoopState from '../../../../base/NoLoopState'
import DataManager from '../../../../runtime/DataManager'
import PoolManager from '../../../../runtime/PoolManager'
import {
	ENEMY_TYPE_ENUM
} from '../../../../enums/index'

/***
 * 如果四个方向的state没有太大差异可以提取一个父级state
 * 这样每个具体方向的state可以自定义动画事件（实现event方法），具有更高的自主性
 */
export default class IdleState extends NoLoopState {
	constructor(owner, fsm, animations) {
		super(owner, fsm, animations)
	}

	callback() {
		const index = DataManager.Instance.smokes.findIndex(smoke => smoke === this.owner)
		DataManager.Instance.smokes.splice(index, 1)
		PoolManager.Instance.recover(ENEMY_TYPE_ENUM.SMOKE, this.owner)
	}
}
