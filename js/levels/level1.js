import {
	TILE_TYPE_ENUM,
	DIRECTION_ENUM,
	ENEMY_TYPE_ENUM,
} from '../enums/index'

const mapInfo = [
	[{
			'src': null,
			'type': null,
		},
		{
			'src': null,
			'type': null,
		},
		{
			'src': 16,
			'type': TILE_TYPE_ENUM.WALL_COLUMN_START,
		},
		{
			'src': 5,
			'type': TILE_TYPE_ENUM.WALL_COLUMN_CENTER,
		},
		{
			'src': 5,
			'type': TILE_TYPE_ENUM.WALL_COLUMN_CENTER,
		},
		{
			'src': 5,
			'type': TILE_TYPE_ENUM.WALL_COLUMN_CENTER,
		},
		{
			'src': 5,
			'type': TILE_TYPE_ENUM.WALL_COLUMN_CENTER,
		},
		{
			'src': 5,
			'type': TILE_TYPE_ENUM.WALL_COLUMN_CENTER,
		},
		{
			'src': 5,
			'type': TILE_TYPE_ENUM.WALL_COLUMN_CENTER,
		},
		{
			'src': 13,
			'type': TILE_TYPE_ENUM.WALL_ROW_START,
		},
		{
			'src': 18,
			'type': TILE_TYPE_ENUM.CLIFF_ROW_START,
		}
	],
	[{
			'src': null,
			'type': null,
		},
		{
			'src': null,
			'type': null,
		},
		{
			'src': 9,
			'type': TILE_TYPE_ENUM.WALL_ROW_CENTER,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 9,
			'type': TILE_TYPE_ENUM.WALL_ROW_CENTER,
		},
		{
			'src': 17,
			'type': TILE_TYPE_ENUM.CLIFF_ROW_CENTER,
		}
	],
	[{
			'src': null,
			'type': null,
		},
		{
			'src': null,
			'type': null,
		},
		{
			'src': 9,
			'type': TILE_TYPE_ENUM.WALL_ROW_CENTER,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 9,
			'type': TILE_TYPE_ENUM.WALL_ROW_CENTER,
		},
		{
			'src': 17,
			'type': TILE_TYPE_ENUM.CLIFF_ROW_CENTER,
		}
	],
	[{
			'src': null,
			'type': null,
		},
		{
			'src': null,
			'type': null,
		},
		{
			'src': 9,
			'type': TILE_TYPE_ENUM.WALL_ROW_CENTER,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 9,
			'type': TILE_TYPE_ENUM.WALL_ROW_CENTER,
		},
		{
			'src': 17,
			'type': TILE_TYPE_ENUM.CLIFF_ROW_CENTER,
		}
	],
	[{
			'src': null,
			'type': null,
		},
		{
			'src': null,
			'type': null,
		},
		{
			'src': 9,
			'type': TILE_TYPE_ENUM.WALL_ROW_CENTER,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 9,
			'type': TILE_TYPE_ENUM.WALL_ROW_CENTER,
		},
		{
			'src': 17,
			'type': TILE_TYPE_ENUM.CLIFF_ROW_CENTER,
		}
	],
	[{
			'src': null,
			'type': null,
		},
		{
			'src': null,
			'type': null,
		},
		{
			'src': 9,
			'type': TILE_TYPE_ENUM.WALL_ROW_CENTER,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 9,
			'type': TILE_TYPE_ENUM.WALL_ROW_CENTER,
		},
		{
			'src': 17,
			'type': TILE_TYPE_ENUM.CLIFF_ROW_CENTER,
		}
	],
	[{
			'src': null,
			'type': null,
		},
		{
			'src': null,
			'type': null,
		},
		{
			'src': 9,
			'type': TILE_TYPE_ENUM.WALL_ROW_CENTER,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 9,
			'type': TILE_TYPE_ENUM.WALL_ROW_CENTER,
		},
		{
			'src': 17,
			'type': TILE_TYPE_ENUM.CLIFF_ROW_CENTER,
		}
	],
	[{
			'src': null,
			'type': null,
		},
		{
			'src': null,
			'type': null,
		},
		{
			'src': 9,
			'type': TILE_TYPE_ENUM.WALL_ROW_CENTER,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 1,
			'type': TILE_TYPE_ENUM.FLOOR,
		},
		{
			'src': 9,
			'type': TILE_TYPE_ENUM.WALL_ROW_CENTER,
		},
		{
			'src': 17,
			'type': TILE_TYPE_ENUM.CLIFF_ROW_CENTER,
		}
	],
	[{
			'src': null,
			'type': null
		},
		{
			'src': null,
			'type': null
		},
		{
			'src': 15,
			'type': TILE_TYPE_ENUM.WALL_ROW_END
		},
		{
			'src': 5,
			'type': TILE_TYPE_ENUM.WALL_COLUMN_CENTER,
		},
		{
			'src': 5,
			'type': TILE_TYPE_ENUM.WALL_COLUMN_CENTER,
		},
		{
			'src': 5,
			'type': TILE_TYPE_ENUM.WALL_COLUMN_CENTER,
		},
		{
			'src': 5,
			'type': TILE_TYPE_ENUM.WALL_COLUMN_CENTER,
		},
		{
			'src': 5,
			'type': TILE_TYPE_ENUM.WALL_COLUMN_CENTER,
		},
		{
			'src': 5,
			'type': TILE_TYPE_ENUM.WALL_COLUMN_CENTER,
		},
		{
			'src': 14,
			'type': TILE_TYPE_ENUM.WALL_ROW_END,
		},
		{
			'src': 19,
			'type': TILE_TYPE_ENUM.CLIFF_ROW_END,
		}
	]
]

const player = {
	x: 4,
	y: 7,
	direction: DIRECTION_ENUM.RIGHT
}

const enemies = [{
	x: 4,
	y: 5,
	direction: DIRECTION_ENUM.RIGHT,
	type: ENEMY_TYPE_ENUM.SKELETON_IRON
}]

const spkies = [{
	x: 1,
	y: 1,
	type: ENEMY_TYPE_ENUM.SPIKES_ONE,
	count: 0
}]

const bursts = [{
	x: 1,
	y: 1,
	type: ENEMY_TYPE_ENUM.BURST_FLOOR,
	active: true
}]

const door = {
	x: 4,
	y: 7,
	type: ENEMY_TYPE_ENUM.DOOR_ROW,
	direction: DIRECTION_ENUM.RIGHT
}

const level1 = {
	mapInfo,
	player,
	enemies,
	spkies,
	bursts,
	door
}


export {
	level1
}