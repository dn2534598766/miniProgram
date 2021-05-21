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
  const collectionVotes = db.collection('votes')
  const _ = db.command

  let today = new Date()
  let _openid = wxContext.OPENID
  let {fileid} = event
  let res = await collectionVotes.add({
    data:{
      _openid,
      fileid,
      today
    }
  })
  console.log(res)
  
  res = await collectionVote.where({
    fileid
  }).update({
    data:{
      vote:_.inc(1)
    }
  })
  console.log(res)

  return {
    ...res
  }
}