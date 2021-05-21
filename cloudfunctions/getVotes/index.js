// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  "env":"xly-psniq"
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const colletionVotes = db.collection('votes')
  const _openid = wxContext.OPENID
  const res = await colletionVotes.where({_openid}).count()
  const total = res.total

  return {
    total
  }
}