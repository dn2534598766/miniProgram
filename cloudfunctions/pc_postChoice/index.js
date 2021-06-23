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

  let user = event.user
  let student = collectionStudent.doc(user._id)
  delete user._id
  let res = await student.update({
    data:{
      ...user
    }
  })

  return {
    res
  }
}