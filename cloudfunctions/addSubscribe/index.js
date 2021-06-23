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

  let res = await collectionSubscribe.add({
    data:event
  })

  return {
    res
  }
}