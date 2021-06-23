Page({
  input(e){
    console.log(e)
    this.setData({
      [e.target.id]:e.detail.value
    })
  },
  async post(e){
    console.log(e)
    let res = await wx.requestSubscribeMessage({
      tmplIds: ['e9OgwKhKOlO1voC3_brJZpRvtknhnpKvidziRJJa3_Q'],
    })
    console.log(res)
    res = await wx.cloud.callFunction({
      name:'addSubscribe',
      data:{
        thing1:{value:this.data.thing1},
        thing2:{value:this.data.thing2},
        thing4:{value:this.data.thing4},
        date3:{value:this.data.date3},
        templateID:'e9OgwKhKOlO1voC3_brJZpRvtknhnpKvidziRJJa3_Q'
      }
    })
    console.log(res)
  }
})