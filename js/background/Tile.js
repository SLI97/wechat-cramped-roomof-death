import Sprite from '../base/Sprite'

import {
  TILE_TYPE_ENUM
} from '../enums/index'
import CanvasManager from '../runtime/CanvasManager'
import DataManager from '../runtime/DataManager'

const BG_WIDTH = 32
const BG_HEIGHT = 32

export default class Tile extends Sprite {
  constructor(type, imageSrc, x, y) {
    super(imageSrc, BG_WIDTH, BG_HEIGHT, x, y)
    this.type = type
    this.init()
  }

  init() {
    if (this.type === TILE_TYPE_ENUM.WALL_ROW_START ||
      this.type === TILE_TYPE_ENUM.WALL_ROW_CENTER ||
      this.type === TILE_TYPE_ENUM.WALL_ROW_END ||
      this.type === TILE_TYPE_ENUM.WALL_COLUMN_START ||
      this.type === TILE_TYPE_ENUM.WALL_COLUMN_CENTER ||
      this.type === TILE_TYPE_ENUM.WALL_COLUMN_END
    ) {
      this.moveable = false
      this.turnable = false
    } else if (this.type === TILE_TYPE_ENUM.CLIFF_ROW_START ||
      this.type === TILE_TYPE_ENUM.CLIFF_ROW_CENTER ||
      this.type === TILE_TYPE_ENUM.CLIFF_ROW_END
    ) {
      this.moveable = false
      this.turnable = true
    } else if (this.type === TILE_TYPE_ENUM.FLOOR) {
      this.moveable = true
      this.turnable = true
    }
  }

  render() {
    const {offset} = DataManager.Instance
    if (!this.img) {
      return
    }
    CanvasManager.Ctx.drawImage(
      this.img,
      (this.x * 32) + offset.width,
      (this.y * 32) + offset.height,
      this.width,
      this.height
    )
  }
}
