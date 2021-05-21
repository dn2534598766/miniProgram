// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  "env":"xly-psniq"
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const collectionVote = db.collection('vote')
  const res = await collectionVote.get()
  console.log(res)

  return {
    res
  }
}