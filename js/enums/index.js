/***
 * 地图瓦片枚举
 */
export const TILE_TYPE_ENUM = {
	WALL_ROW: 'WALL_ROW',
	WALL_COLUMN: 'WALL_COLUMN',
	WALL_LEFT_TOP: 'WALL_LEFT_TOP',
	WALL_RIGHT_TOP: 'WALL_RIGHT_TOP',
	WALL_LEFT_BOTTOM: 'WALL_LEFT_BOTTOM',
	WALL_RIGHT_BOOTM: 'WALL_RIGHT_BOOTM',
	CLIFF_LEFT: 'CLIFF_ROW_START',
	CLIFF_CENTER: 'CLIFF_ROW_CENTER',
	CLIFF_RIGHT: 'CLIFF_ROW_END',
	FLOOR: 'FLOOR',
}

/***
 * 活动单位枚举
 */
export const ENEMY_TYPE_ENUM = {
	SKELETON_WOODEN: 'SKELETON_WOODEN',
	SKELETON_IRON: 'SKELETON_IRON',
	SPIKES_ONE: 'SPIKES_ONE',
	SPIKES_TWO: 'SPIKES_TWO',
	SPIKES_THREE: 'SPIKES_THREE',
	SPIKES_FOUR: 'SPIKES_FOUR',
	BURST_FLOOR: 'BURST_FLOOR',
	DOOR: 'DOOR',
	SMOKE: 'SMOKE'
}

/***
 * 角色方向枚举
 */
export const DIRECTION_ENUM = {
	LEFT: 'LEFT',
	RIGHT: 'RIGHT',
	TOP: 'TOP',
	BOTTOM: 'BOTTOM',
}

/***
 * 控制按钮枚举
 */
export const CONTROLLER_ENUM = {
	LEFT: 'LEFT',
	RIGHT: 'RIGHT',
	TOP: 'TOP',
	BOTTOM: 'BOTTOM',
	TURNLEFT: 'TURNLEFT',
	TURNRIGHT: 'TURNRIGHT'
}

/***
 * 角色状态枚举
 */
export const PLAYER_STATE = {
	IDLE: 'IDLE',
	ATTACK: 'ATTACK',
	TURNLEFT: 'TURNLEFT',
	TURNRIGHT: 'TURNRIGHT',
	BLOCKFRONT: 'BLOCKFRONT',
	BLOCKBACK: 'BLOCKBACK',
	BLOCKLEFT: 'BLOCKLEFT',
	BLOCKRIGHT: 'BLOCKRIGHT',
	BLOCKTURNLEFT: 'BLOCKTURNLEFT',
	BLOCKTURNRIGHT: 'BLOCKTURNLEFT',
	DEATH: 'DEATH',
}

/***
 * 事件类型枚举
 */
export const EVENT_ENUM = {
	PLAYER_CTRL: 'PLAYER_CTRL',
	PLAYER_MOVE: 'PLAYER_MOVE',
	PLAYER_MOVE_END: 'PLAYER_MOVE_END',
	ATTACK_ENEMY: 'ATTACK_ENEMY',
	ATTACK_PLAYER: 'ATTACK_PLAYER',
	RECORD_STEP: 'RECORD_STEP',
	REVOKE_STEP: 'REVOKE_STEP',
	SCREEN_SHAKE: 'SCREEN_SHAKE',
	NEXT_LEVEL: 'NEXT_LEVEL',
	RESTART_LEVEL: 'RESTART_LEVEL',
	OPENDOOR: 'OPENDOOR',
	GAME_START: 'GAME_START',
	GAME_OVER: 'GAME_OVER',
}

/***
 * 有限状态机参数枚举
 */
export const FSM_PARAM_TYPE_ENUM = {
	NUMBER: 'NUMBER',
	BOOLEAN: 'BOOLEAN',
	TRIGGER: 'TRIGGER',
}

/***
 * UI枚举
 */
export const UI_ENUM = {
	GAME_START: 'GAME_START',
	CTRL_TOP: 'CTRL_TOP',
	CTRL_BOTTOM: 'CTRL_BOTTOM',
	CTRL_LEFT: 'CTRL_LEFT',
	CTRL_RIGHT: 'CTRL_RIGHT',
	CTRL_TURN_LEFT: 'CTRL_TURN_LEFT',
	CTRL_TURN_RIGHT: 'CTRL_TURN_RIGHT',
	RESTART: 'RESTART',
	REVOKE: 'REVOKE',
}

/***
 * 方向顺序
 */
export const DIRECTION_ORDER = [
	DIRECTION_ENUM.TOP,
	DIRECTION_ENUM.BOTTOM,
	DIRECTION_ENUM.LEFT,
	DIRECTION_ENUM.RIGHT,
]

/***
 * 尖刺类型和总点数映射
 */
export const SPIKES_TYPE_MAP_POINT = {
	SPIKES_ONE: 2,
	SPIKES_TWO: 3,
	SPIKES_THREE: 4,
	SPIKES_FOUR: 5,
}

/***
 * 尖刺当前点数枚举
 */
export const SPIKES_CUR_POINT_TYPE = {
	ZERO: 'ZERO',
	ONE: 'ONE',
	TWO: 'TWO',
	THREE: 'THREE',
	FOUR: 'FOUR',
	FIVE: 'FIVE',
}

/***
 * 尖刺点数类型和数字映射
 */
export const SPIKES_POINT_MAP_NUMBER = {
	ZERO: 0,
	ONE: 1,
	TWO: 2,
	THREE: 3,
	FOUR: 4,
	FIVE: 5,
}
