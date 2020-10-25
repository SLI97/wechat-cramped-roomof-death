import Player from './player/index'
import Enemy from './npc/enemy'
import BackGround from './runtime/background'
import GameInfo from './runtime/gameinfo'
import Controller from './runtime/controller'
import Music from './runtime/music'
import DataBus from './databus'

let ctx = canvas.getContext('2d')
let databus = new DataBus()

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    // this.aniId    = 0

    this.restart()
  }

  restart() {
    // databus.reset()

    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )

    this.bg = new BackGround(ctx)
    // this.touchHandler = this.touchEventHandler.bind(this)
    // canvas.addEventListener('touchstart', this.touchHandler)
    // this.player = new Player(ctx)
    // this.gameinfo = new GameInfo()
    // this.music = new Music()

    // this.bindLoop = this.loop.bind(this)
    // this.hasEventBind = false

    // 清除上一局的动画
    // window.cancelAnimationFrame(this.aniId);

    // this.aniId = window.requestAnimationFrame(
    //   this.bindLoop,
    //   canvas
    // )


    const {
      x,
      y,
      direction
    } = databus.getLevel().playerInfo
    this.player = new Player(x, y, direction)

    this.controller = new Controller(this.player)

    this.bindLoop = this.loop.bind(this)
    this.loop()
  }

  touchEventHandler(e) {
    e.preventDefault()

    this.player.x += 32
    console.log(this.player.x)
    //    let x = e.touches[0].clientX
    //    let y = e.touches[0].clientY

    //    let area = this.gameinfo.btnArea

    //    if (   x >= area.startX
    //        && x <= area.endX
    //        && y >= area.startY
    //        && y <= area.endY  )
    //      this.restart()
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#140B28' // 矩形颜色
    ctx.fillRect(0, 0, canvas.width, canvas.height) // 矩形左上角顶点为(0, 0)，右下角顶点为(100, 100)

    this.bg.render(ctx)
    this.controller.render(ctx)

    // databus.bullets
    //   .concat(databus.enemys)
    //   .forEach((item) => {
    //     item.drawToCanvas(ctx)
    //   })

    // this.player.drawToCanvas(ctx, this.offset)
    this.player.render(ctx, this.offset)

    // databus.animations.forEach((ani) => {
    if (this.player.isPlaying) {
      this.player.aniRender(ctx, this.offset)
    }
    // })
  }

  // 游戏逻辑更新主函数
  update() {
    // if (databus.gameOver)
    //   return;

    // this.bg.update()

    // databus.bullets
    //   .concat(databus.enemys)
    //   .forEach((item) => {
    //     item.update()
    //   })

    // this.enemyGenerate()

    // this.collisionDetection()

    // if (databus.frame % 20 === 0) {
    //   this.player.shoot()
    //   this.music.playShoot()
    // }
  }

  // 实现游戏帧循环
  loop() {
    databus.frame++

    this.update()
    this.render()

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}