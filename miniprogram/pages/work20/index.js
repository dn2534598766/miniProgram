var time = require('../utils/time')

Page({
  async getWeRun(){
    let res = await wx.getWeRunData({})
    console.log(res)
    res = await wx.cloud.callFunction({
      name:'showCloudID',
      data:{
        weRun:wx.cloud.CloudID(res.cloudID)
      }
    })
    console.log(res)
    this.setData({
      steps:res.result.weRun.data.stepInfoList
    })
    let steps2=res.result.weRun.data.stepInfoList
    for(let i=0;i<steps2.length;i++){
      steps2[i].timestamp=time.formatTime(steps2[i].timestamp, 'Y-M-D')
    }
    this.setData({
      steps:steps2
    })
    console.log(this.data.steps)
  },
  async getUserProfile(){
    let res = await wx.getUserProfile({
      desc: '获取用户信息',
    })
    console.log(res)
    res = await wx.cloud.callFunction({
      name:'showCloudID',
      data:{
        userProfile:wx.cloud.CloudID(res.cloudID)
      }
    })
    console.log(res)
    this.setData({
      userProfile:res.result.userProfile.data
    })
  }
   
})