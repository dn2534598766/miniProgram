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
  const vote = 0 
  const _openid = wxContext.OPENID
  const {fileid} =event
  let res = await collectionVote.add({
    data:{
      fileid,_openid,vote
    }
  })

  return {
    ...res
  }
}