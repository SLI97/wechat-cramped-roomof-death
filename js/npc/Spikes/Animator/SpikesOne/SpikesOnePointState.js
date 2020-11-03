import NoLoopState from '../../../../base/NoLoopState'
import CanvasManager from '../../../../runtime/CanvasManager'

export default class SpikesOnePointState extends NoLoopState{
	constructor(owner,fsm,animations) {
		super(animations,false)
		this.owner = owner
		this.fsm = fsm
	}

	callback(){
	}
}
