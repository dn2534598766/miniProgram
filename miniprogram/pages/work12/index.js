const ctx=wx.createCanvasContext('myCanvas')
const upUrl='https://study-2gurue827a3a5449-1300561635.ap-shanghai.app.tcloudbase.com/container-messagewall/watermark'
const bg='https://study-2gurue827a3a5449-1300561635.ap-shanghai.app.tcloudbase.com/container-messagewall/bg.png'
Page({
  data:{
    hidden:true,
    color:'#000000',
    imagePath:'',
    picpath:bg
  },
  sign(){
    this.setData({
      hidden:false
    })
  },
  picker(){
    wx.navigateTo({
      url:'/pages/colorPicker/colorPicker?key=color'
    })
  },
  move(e){
    let {x,y} = e.touches[0]
    ctx.setFillStyle(this.data.color)
    ctx.fillRect(x,y,10,10)
    ctx.draw(true)
  },
  clear(){
    ctx.draw(false)
  },
  save(){
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
    }).then(res=>{
      this.clear()
      this.setData({
        imagePath:res.tempFilePath
      })
      wx.uploadFile({
        filePath: res.tempFilePath,
        name: 'file',
        url: upUrl,
        success:res=>{
          wx.showToast({
            title:'3秒后查看留言',
          })
        },
        fail:res=>[
          wx.showToast({
            title: res,
          })
        ]
      })
    })
  },
  reload(){
    wx.downloadFile({
      url: bg,
      success:res=>{
        this.setData({
          picpath:res.tempFilePath,
          hidden:true
        })
      },
      fail:res=>{
        console.log(res)
      }
    })
  },
  preview(){
    wx.previewImage({
      urls: [this.data.picpath],
    })
  },
  onShareAppMessage(){
    return {
      title:'林埼钊留言墙',
      desc:'云托管后台技术实现的留言墙，高端',
      path:'/pages/work12/index'
    }
  }
})
