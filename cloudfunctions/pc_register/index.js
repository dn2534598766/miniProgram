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
  console.log('event:',event)

  const openid = wxContext.OPENID
  const {sn,name,nickName,avatarUrl} = event

  let res = await collectionStudent.where({
    name:name,
    sn:sn
  }).get()
  console.log('collection get:',res)

  let user = {}
  let reg = ''
  let errMsg = ''

  if(res.data.length==0){
    reg = 'err'
    errMsg = '没找到匹配的学号姓名'
  }else{
    let {_id} = res.data[0]
    let student = res.data[0]
    if(res.data[0].nickName){
      reg = 'err'
      errMsg = '该学号已被'+res.data[0].nickName+'绑定了'
    }else{
      res = await collectionStudent.doc(_id).update({
        data:{
          nickName,avatarUrl,openid
        }
      })
      user = {...student,nickName,avatarUrl,openid}
      reg = 'ok'
    }
  }

  return {
    reg,user,errMsg
  }
}