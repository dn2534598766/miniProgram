let app = getApp()
Page({
  data:{
    nickName:'',
    avatarUrl:''
  },
  async  getUserProfile(){
    let res = await wx.getUserProfile({
      'desc': '用于完善用户信息'
    })
    console.log(res)
    let {nickName,avatarUrl} = res.userInfo
    this.setData({
      nickName,avatarUrl
    })
  },
  async formsubmit(e){
    console.log(e)
    let {sn,name,nickName} = e.detail.value
    let avatarUrl = this.data.avatarUrl
    let res = await wx.cloud.callFunction({
      name:'pc_register',
      data:{
        name,
        sn,
        nickName,
        avatarUrl
      }
    })
    console.log(res)
    app.globalData.user = res.result.user
    if(res.result.reg=='err'){
      wx.showToast({
        title: res.result.errMsg,
      })
    }else{
      wx.showToast({
        title: '绑定成功',
      })
    }
    wx.redirectTo({
      url: '/pages/work17/rank',
    })
  }
  
})