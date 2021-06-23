// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'xly-psniq'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const collectionStudent = db.collection('pc_student')
  const clist = [
    ["移动应用","web前端","手机游戏"],
    ["移动应用","手机游戏","web前端"],
    ["手机游戏","移动应用","web前端"],
    ["手机游戏","web前端","移动应用"],
    ["web前端","手机游戏","移动应用"],
    ["web前端","移动应用","手机游戏"],
  ]
  let ids = await collectionStudent.aggregate().project({
    _id:1
  })
  .limit(1000)
  .end()
  console.log('ids:',ids)
  ids.list.forEach(async v=>{
    let cc = clist[Math.floor(Math.random()*6)]
    let res = await collectionStudent.doc(v._id).update({
      data:{
        choosen:cc
      }
    })
    console.log(res)
  })

  return {
    event,
    openid:wxContext.OPENID,
    appid:wxContext.APPID,
    unionid:wxContext.UNIONID,
  }
}