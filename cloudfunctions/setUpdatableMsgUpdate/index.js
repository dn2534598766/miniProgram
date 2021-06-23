// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'xly-psniq'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log('event',event)
  let {activityId,memberCount,roomLimit} = event
  console.log(activityId,memberCount,roomLimit)

  targetState = 0
  memberCount = memberCount + ''
  roomLimit = roomLimit + ''

  templateInfo = {
    parameterList:[
      {
        name:'member_count',
        value:memberCount
      },
      {
        name:'room_limit',
        value:roomLimit
      }
    ]
  }
  console.log(templateInfo)

  let res = await cloud.openapi.updatableMessage.setUpdatableMsg({
    activityId,targetState,templateInfo
  })
  console.log(res)

  return {
    ...res
  }
}