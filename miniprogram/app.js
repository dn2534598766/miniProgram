App({
  async onLaunch(){
    wx.cloud.init({
      env:'xly-psniq'
    })
    let r = await wx.cloud.callFunction({
      name:'pc_directions'
    })
    console.log('pc_directions',r)
    this.globalData.directions = r.result.res.list.map(v=>{
      return v.name
    })
    this.globalData.nums = r.result.res.list.map(v=>{
      return v.num
    })

    r = await wx.cloud.callFunction({
      name:'pc_userLogin'
    })
    this.globalData.user = r.result.user
    // console.log('pc_userLogin',r)
    // if(r.result.user.name=='nobody'){
    //   wx.redirectTo({
    //     url: '/pages/work17/register',
    //   })
    // }else if(!this.globalData.user.choosen){
    //   wx.redirectTo({
    //     url: '/pages/work17/rank',
    //   })
    // }else{
    //   wx.redirectTo({
    //     url: '/pages/work17/profile',
    //   })
    // }
  },
  globalData:{
    userInfo:null
  },
  onShow(e){
    this.globalData.shareTicket = e.shareTicket
    console.log('app onshow ticket:',this.globalData.shareTicket)
  }
})