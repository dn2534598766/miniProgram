const ctx = wx.createCanvasContext('myCanvas')
const upUrl = 'https://gdmecst-test-5rmth-1300726000.ap-shanghai.app.tcloudbase.com/container-fileserver/watermark'
const baseUrl = 'https://gdmecst-test-5rmth-1300726000.ap-shanghai.app.tcloudbase.com/container-fileserver/'
Page({
  data:{
    mosaic:true,
    imagePath:'',
    imageUrl:''
  },
  open(){
    wx.chooseImage({
      count:1,
    }).then(res=>{
      console.log(res)
      ctx.drawImage(res.tempFilePaths[0],0,0,240,380)
      ctx.draw()
    })
  },
  move(e){
    console.log(e)
    if(this.data.mosaic){
      ctx.setFillStyle('red')
      ctx.fillRect(e.touches[0].x,e.touches[0].y,10,10)
      ctx.fillRect(e.touches[0].x+10,e.touches[0].y+10,10,10)
      ctx.setFillStyle('white')
      ctx.fillRect(e.touches[0].x+10,e.touches[0].y,10,10)
      ctx.fillRect(e.touches[0].x,e.touches[0].y+10,10,10)
      ctx.draw(true)
    }else{
      
      ctx.fillRect(e.touches[0].x,e.touches[0].y,20,20)
      ctx.draw(true)
    }
  },
  mosaic(){
    this.setData({
      mosaic:true
    })
  },
  clear(){
    this.setData({
      mosaic:false
    })
  },
  seal(){
    ctx.setFillStyle('red')
    ctx.setFontSize('20')
    ctx.fillText('07190525林埼钊',0,200)
    ctx.draw(true)
  },
  save(){
    wx.canvasToTempFilePath({
      canvasId:'myCanvas',
    }).then(res=>{
      console.log(res)
      this.setData({
        imagePath:res.tempFilePath
      })
    })
  },
  upload(){
  wx.uploadFile({
    filePath: this.data.imagePath,
    name: 'file',
    url: upUrl,
    success:res=>{
      console.log(res)
      this.setData({
        imageUrl:baseUrl + JSON.parse(res.data).filename
      })
      wx.downloadFile({
        url: this.data.imageUrl,
        success:res=>{
          console.log('download:',res)
          ctx.drawImage(res.tempFilePath,0,0,240,380)
          ctx.draw()
        }
      })
    },
    fail(e){
      console.log(e)
    }
    })
  },
  onShareAppMessage(){
    return{
      title:'林埼钊的图片',
      desc:'有趣的马赛克',
      path:'/pages/work11/index?path=' + this.data.imageUrl
    }
  },
  onLoad(options){
    if(options!==undefined){
      wx.downloadFile({
        url: options.path,
        success:res=>{
          ctx.drawImage(res.tempFilePath,0,0,240,380)
          ctx.draw()
        },
        fail:e=>{
          console.log(e)
        }
      })
    }
  }
})