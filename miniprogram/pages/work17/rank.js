let app = getApp()
Page({
  data:{
    user:{
      "_id":"3d27439a60b03ca7004fa3c61c211f75"
    },
    directions:[]
  },
  async onLoad(options){
    let res = await wx.cloud.callFunction({
      name:'pc_directions'
    })
    console.log(res)
    let directions = res.result.res.list.map(v=>{
      return v.name
    })
    let user = this.data.user
    if(app.globalData.user){
      user = app.globalData.user
    }
    // user.choosen = directions
    console.log(directions)
    this.setData({
      directions,
      user
    })
    
  },
  change(e){
    console.log(e)
    let choosen = this.data.user.choosen
    let picked = this.data.directions[Number(e.detail.value)]
    let found = choosen.indexOf(picked)
    if(found<=e.currentTarget.dataset.id){
      let errmsg = '第'+(found+1) + '志愿已经选择了'+picked
      wx.showToast({
        title: errmsg,
      })
    }else{
      choosen.splice(e.currentTarget.dataset.id,0,picked)
      choosen.splice(choosen.lastIndexOf(picked),1)
    }
    let user = this.data.user
    user.choosen = choosen
    this.setData({
      user
    })

  },
  async post(e){
    let user = this.data.user
    let res = await wx.cloud.callFunction({
      name:"pc_postChoice",
      data:{
        user
      }
    })
    if(res.result.res.errMsg='document.update:ok'){
      wx.showToast({
        title: '提交成功',
      })
      wx.redirectTo({
        url: '/pages/work17/profile',
      })
    }
  }

})