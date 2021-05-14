Page({
  data:{
    city:'',
    temp:'',
    windDir:'',
    text:'',
    windScale:'',
    humidity:''
  },
  input(e){
    console.log(e)
    this.setData({
      city:e.detail.value
    })
  },
  here(){
    wx.getLocation({
      success:(res)=>{
        let loc = res.longitude+','+res.latitude
        let url = 'https://devapi.qweather.com/v7/weather/now?key=bf58bdfa356b44d1aa2be51d39fabf1d&location='+loc
        console.log(loc)
        wx.request({
          url,
          success:res=>{
            console.log(res)
            let {temp,windDir,text,windScale,humidity}=res.data.now
            temp=temp+'摄氏度'
            humidity=humidity+'%'
            this.setData({
              temp,windDir,text,windScale,humidity
            })
          }
        })
      }
    })
  }
})