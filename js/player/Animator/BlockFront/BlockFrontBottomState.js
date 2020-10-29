import BlockFrontState from './BlockFrontState'


export default class BlockFrontBottomState extends BlockFrontState {
	constructor(owner, fsm, animations) {
		super(owner, fsm, animations)
	}

	/***
	 * 在这里可以实现动画事件
	 */
	event(){
		/*for example
		*
		* if(this.index === 1 | 2 |3){
		*   new Smoke() and so on...
		* }
		*
		*
		* */
	}
}
