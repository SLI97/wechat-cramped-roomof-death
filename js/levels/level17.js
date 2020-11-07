import {
  TILE_TYPE_ENUM,
  DIRECTION_ENUM,
  ENEMY_TYPE_ENUM,
  PLAYER_STATE,
} from '../enums/index'

const mapInfo = [
  [
    {
      'src': 9,
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 16,
      'type': TILE_TYPE_ENUM.WALL_LEFT_TOP,
    },
    {
      'src': 5,
      'type': TILE_TYPE_ENUM.WALL_COLUMN,
    },
    {
      'src': 5,
      'type': TILE_TYPE_ENUM.WALL_COLUMN,
    },
    {
      'src': 5,
      'type': TILE_TYPE_ENUM.WALL_COLUMN,
    },
    {
      'src': 5,
      'type': TILE_TYPE_ENUM.WALL_COLUMN,
    },
    {
      'src': 5,
      'type': TILE_TYPE_ENUM.WALL_COLUMN,
    },
    {
      'src': 13,
      'type': TILE_TYPE_ENUM.WALL_LEFT_BOTTOM,
    },
    {
      'src': 18,
      'type': TILE_TYPE_ENUM.CLIFF_LEFT,
    }
  ],

  [
    {
      'src': 9,
      'type': TILE_TYPE_ENUM.WALL_ROW,
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
      'src': 17,
      'type': TILE_TYPE_ENUM.CLIFF_CENTER,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 9,
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 17,
      'type': TILE_TYPE_ENUM.CLIFF_CENTER,
    }
  ],

  [
    {
      'src': 9,
      'type': TILE_TYPE_ENUM.WALL_ROW,
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
      'src': 17,
      'type': TILE_TYPE_ENUM.CLIFF_CENTER,
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
      'src': 17,
      'type': TILE_TYPE_ENUM.CLIFF_CENTER,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 9,
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 17,
      'type': TILE_TYPE_ENUM.CLIFF_CENTER,
    }
  ],

  [
    {
      'src': 9,
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 17,
      'type': TILE_TYPE_ENUM.CLIFF_CENTER,
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
      'src': 17,
      'type': TILE_TYPE_ENUM.CLIFF_CENTER,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 9,
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 17,
      'type': TILE_TYPE_ENUM.CLIFF_CENTER,
    }
  ],

  [
    {
      'src': 9,
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 17,
      'type': TILE_TYPE_ENUM.CLIFF_CENTER,
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
      'src': 17,
      'type': TILE_TYPE_ENUM.CLIFF_CENTER,
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
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 17,
      'type': TILE_TYPE_ENUM.CLIFF_CENTER,
    }
  ],

  [
    {
      'src': 9,
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 17,
      'type': TILE_TYPE_ENUM.CLIFF_CENTER,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 17,
      'type': TILE_TYPE_ENUM.CLIFF_CENTER,
    },
    {
      'src': null,
      'type': null,
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
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 17,
      'type': TILE_TYPE_ENUM.CLIFF_CENTER,
    }
  ],

  [
    {
      'src': 9,
      'type': TILE_TYPE_ENUM.WALL_ROW,
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
      'src': 17,
      'type': TILE_TYPE_ENUM.CLIFF_CENTER,
    },
    {
      'src': null,
      'type': null,
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
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 17,
      'type': TILE_TYPE_ENUM.CLIFF_CENTER,
    }
  ],


  [
    {
      'src': 15,
      'type': TILE_TYPE_ENUM.WALL_RIGHT_TOP,
    },
    {
      'src': 5,
      'type': TILE_TYPE_ENUM.WALL_COLUMN,
    },
    {
      'src': 5,
      'type': TILE_TYPE_ENUM.WALL_COLUMN,
    },
    {
      'src': 5,
      'type': TILE_TYPE_ENUM.WALL_COLUMN,
    },
    {
      'src': 5,
      'type': TILE_TYPE_ENUM.WALL_COLUMN,
    },
    {
      'src': 5,
      'type': TILE_TYPE_ENUM.WALL_COLUMN,
    },
    {
      'src': 14,
      'type': TILE_TYPE_ENUM.WALL_RIGHT_BOOTM,
    },
    {
      'src': 1,
      'type': TILE_TYPE_ENUM.FLOOR,
    },
    {
      'src': 9,
      'type': TILE_TYPE_ENUM.WALL_ROW,
    },
    {
      'src': 19,
      'type': TILE_TYPE_ENUM.CLIFF_RIGHT,
    },
    {
      'src': null,
      'type': null,
    }
  ],
]

const player = {
  x: 7,
  y: 7,
  direction: DIRECTION_ENUM.LEFT,
  state: PLAYER_STATE.IDLE
}

const enemies = [
  {
    x: 2,
    y: 1,
    direction: DIRECTION_ENUM.BOTTOM,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.SKELETON_WOODEN
  },
  {
    x: 2,
    y: 4,
    direction: DIRECTION_ENUM.RIGHT,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.SKELETON_WOODEN
  },
]

const spikes = [
  {
    x: 1,
    y: 3,
    type: ENEMY_TYPE_ENUM.SPIKES_TWO,
    count: 0
  },
  {
    x: 3,
    y: 3,
    type: ENEMY_TYPE_ENUM.SPIKES_TWO,
    count: 0
  },
  {
    x: 4,
    y: 1,
    type: ENEMY_TYPE_ENUM.SPIKES_TWO,
    count: 0
  },
  {
    x: 4,
    y: 4,
    type: ENEMY_TYPE_ENUM.SPIKES_TWO,
    count: 0
  },
  {
    x: 4,
    y: 6,
    type: ENEMY_TYPE_ENUM.SPIKES_TWO,
    count: 0
  },
  {
    x: 5,
    y: 3,
    type: ENEMY_TYPE_ENUM.SPIKES_TWO,
    count: 0
  },
  {
    x: 6,
    y: 2,
    type: ENEMY_TYPE_ENUM.SPIKES_TWO,
    count: 0
  },
  {
    x: 6,
    y: 6,
    type: ENEMY_TYPE_ENUM.SPIKES_TWO,
    count: 0
  },
]

const bursts = [
  {
    x: 1,
    y: 6,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.BURST_FLOOR
  },
  {
    x: 2,
    y: 6,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.BURST_FLOOR
  },
  {
    x: 3,
    y: 6,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.BURST_FLOOR
  },
  {
    x: 4,
    y: 2,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.BURST_FLOOR
  },
  {
    x: 4,
    y: 5,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.BURST_FLOOR
  },
  {
    x: 5,
    y: 4,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.BURST_FLOOR
  },
  {
    x: 5,
    y: 5,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.BURST_FLOOR
  },
  {
    x: 6,
    y: 5,
    state: PLAYER_STATE.IDLE,
    type: ENEMY_TYPE_ENUM.BURST_FLOOR
  },
]

const door = {
  x: 0,
  y: 1,
  direction: DIRECTION_ENUM.LEFT,
  state: PLAYER_STATE.IDLE,
  type: ENEMY_TYPE_ENUM.DOOR
}

const level17 = {
  mapInfo,
  player,
  enemies,
  spikes,
  bursts,
  door
}

export {
  level17
}
