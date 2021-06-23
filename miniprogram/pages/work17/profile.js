const app = getApp()
Page({
  async onLoad(options){
    let res = await wx.cloud.callFunction({
      name:'pc_statistics'
    })
    console.log('pc_statistics:',res)
    
    let result = res.result.list.find(v=>{
      return v.name == app.globalData.user.name
    }).choosen
    let tab = app.globalData.directions.indexOf(result)
    let list = []
    app.globalData.directions.forEach(v=>{
      list.push(res.result.list.filter(vv=>{
        return vv.choosen == v
      }))
    })
    this.setData({
      user:app.globalData.user,
      list,
      result,
      tab,
      directions:app.globalData.directions,
      nums:app.globalData.nums
    })
  },
  changeItem:function(e){
    this.setData({
      tab:e.target.dataset.item
    })
  },
  changeTab:function(e){
    this.setData({
      tab:e.detail.current
    })
  },
  rank(res){
    wx.redirectTo({
      url: '/pages/work17/rank',
    })
  }
})