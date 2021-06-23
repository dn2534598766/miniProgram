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
  const openid = wxContext.OPENID
  console.log(openid)

  let student = await collectionStudent.where({
    openid
  }).get()

  console.log('get',student)

  let result = {name:'nobody'}

  if(student.data.length > 0){
    result = student.data[0]
  }

  return {
    openid,
    user:result
  }
}