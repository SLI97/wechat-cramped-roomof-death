// import Sprite   from '../base/Sprite'
// import DataManager  from '../DataManager'
//
// const BULLET_IMG_SRC = 'images/bullet.png'
// const BULLET_WIDTH   = 16
// const BULLET_HEIGHT  = 30
//
// const __ = {
//   speed: Symbol('speed')
// }
//
// let databus = new DataManager()
//
// export default class Bullet extends Sprite {
//   constructor() {
//     super(BULLET_IMG_SRC, BULLET_WIDTH, BULLET_HEIGHT)
//   }
//
//   init(x, y, speed) {
//     this.x = x
//     this.y = y
//
//     this[__.speed] = speed
//
//     this.visible = true
//   }
//
//   // 每一帧更新子弹位置
//   update() {
//     this.y -= this[__.speed]
//
//     // 超出屏幕外回收自身
//     if ( this.y < -this.height )
//       databus.removeBullets(this)
//   }
// }


// function haha() {
// 	return new Promise((res,rej)=>{
// 		setTimeout(()=>{
// 			console.log(999)
// 			res()
// 		},2000)
// 	})
// }
//
// async function qwe(){
// 	await haha()
// 	console.log(888)
// }
//
// qwe()
// const b = Symbol("haha")
//
// const obj = {
// 	a:1,
// 	[b]:2
// }
//
// console.log(obj.a)
// console.log(obj[b])
