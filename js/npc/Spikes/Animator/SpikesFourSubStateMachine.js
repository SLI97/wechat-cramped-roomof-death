import NoLoopState from '../../../base/NoLoopState'

/***
 * 如果四个方向的state没有太大差异可以提取一个父级state
 * 这样每个具体方向的state可以自定义动画事件（实现event方法），具有更高的自主性
 */
export default class SpikesFourSubStateMachine extends NoLoopState {
	constructor(owner,fsm,animations) {
    super(owner, fsm, animations)
	}
}
