import Enemy from '../../base/Enemy'
import IronSkeletonStateMachine from './Animator/IronSkeletonStateMachine'
import {ENEMY_TYPE_ENUM} from '../../enums/index'

/***
 * 钢铁敌人类
 */
export default class IronSkeleton extends Enemy {
	constructor() {
		super(null)
		this.init()
	}

	init() {
		super.init()
		this.type = ENEMY_TYPE_ENUM.SKELETON_IRON
		this.fsm = new IronSkeletonStateMachine(this)
	}

	update() {
		super.update()
	}
}
