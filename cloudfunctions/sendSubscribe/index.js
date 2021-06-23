// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'xly-psniq'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const collectionSubscribe = db.collection('subscribe')

  let today = new Date()
  let offset = 8
  let utc = today.getTime() + (today.getTimezoneOffset()*60000)
  today = new Date(utc + (3600000*offset))
  today = today.getFullYear() + '-' + (today.getMonth()+1) + '-'+today.getDate()
  console.log(today)

  let res = await collectionSubscribe.where({
    'date3.value':today
  }).get()
  console.log(res)
  for(v of res.data){
    res = await cloud.openapi.subscribeMessage.send({
      touser:v.userInfo.openId,
      page:'/pages/work7/index',
      data:v,
      templateId:v.templateID
    })
    console.log(res)
    if(res.errMsg.indexOf('ok')>=1){
      await collectionSubscribe.doc(v._id).remove()
    }
  }

  return {
    event,
    openid:wxContext.OPENID,
    appid:wxContext.APPID,
    unionid:wxContext.UNIONID,
  }
}