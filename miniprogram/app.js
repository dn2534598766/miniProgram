App({
  onLaunch(){
    wx.cloud.init({
      env:'xly-psniq',
      traceUser:true
    })
  },
  globalData:{
    userInfo:null
  }
})