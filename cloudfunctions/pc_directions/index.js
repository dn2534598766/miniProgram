// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'xly-psniq'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const collectionDirection = db.collection('pc_direction')
  let res = await collectionDirection.aggregate().end()
  console.log(res)

  return {
    res
  }
}