const utils=require('utils.js')
let fmarkers=[]
let timer=0
let htime=0
let time=Number(0)
let jishi=0
let gongli=0
let gonglikaiguan=0
Page({
  data:{
    running:false,
    latitude:0,
    longitude:0,
    meters:0,
    seconds:0,
    markers:[],
    polyline:[{
      points:[],
      color:'#ff0000DD'
    }],
    interval:1000,
    feedbackrate:500,
    arr:[]
  },
  run(){
    this.setData({
      running:!this.data.running
    })
  },
  onLoad(){
    wx.getLocation({
      type:'gcj02',
    }).then(res=>{
      console.log(res)
      this.setData({
        latitude:res.latitude,
        longitude:res.longitude
      })
    })
    setInterval(this.record,this.data.interval)
  },
  record(){
    if(!this.data.running){
      return
    }
    this.setData({
      seconds:this.data.seconds+this.data.interval/1000
    })
    
    wx.getLocation({
      type:'gcj02',
    }).then(res=>{
      let newMarker={
        latitude:res.latitude,
        longitude:res.longitude,
        iconPath:'redPoint.png',
        width:10,
        height:10
      }
      let pace=0
      let arr=this.data.arr
      console.log(arr)
      let lmarkers=this.data.markers
      if(lmarkers.length>0){
        let lastmarker=lmarkers.slice(-1)[0]
        pace=utils.getDistance(lastmarker.latitude,lastmarker.longitude,
          newMarker.latitude,newMarker.longitude)
        console.log(pace)
      }
      lmarkers.push(newMarker)
      arr.push(this.data.meters+pace)
      this.setData({
        latitude:res.latitude,
        longitude:res.longitude,
        markers:lmarkers,
        meters:this.data.meters+pace,
        arr:arr
      })
      console.log(arr)
    })
  },
  clear(){
    this.setData({
      running:false,
      latitude:0,
      longitude:0,
      meters:0,
      seconds:0,
      markers:[],
      polyline:[{
        points:[],
        color:'#ff0000DD',
        width:2
      }],
      interval:1000,
    })
  },
  save(){
    wx.setStorage({
      data:this.data.markers,
      key:'running',
    }).then(()=>{
      wx.showToast({
        title: '保存成功',
      })
    })
    wx.setStorage({
      data:this.data.seconds,
      key:'huifang'
    }).then(()=>{
      wx.showToast({
        title: '保存成功',
      })
    })
    
  },
  playback(){
    this.clear()
    wx.getStorage({
      key:'running',
    }).then(res=>{

      fmarkers=res.data
    })
    wx.getStorage({
      key:'huifang'
    }).then(res=>{
      htime=res.data
    })
    
    timer=setInterval(this.feedback,this.data.feedbackrate)
    jishi=setInterval(this.jishifun,this.data.feedbackrate)
    gonglikaiguan=setInterval(this.gonglifun,this.data.feedbackrate)
  },
  feedback(){
    console.log(fmarkers)
    let lmarkers=this.data.markers
    let lpolyline=this.data.polyline
    if(fmarkers.length>0&&time<=htime){
      lmarkers.push(fmarkers.shift())
      lpolyline[0].points=lmarkers
      
      console.log(time)
    }else{
      clearInterval(timer)
      clearInterval(jishi)
      clearInterval(gonglikaiguan)
    }
    this.setData({
      markers:lmarkers,
      polyline:lpolyline,
      seconds:time
    })
  },
  jishifun(){
    ++time
  },
  gonglifun(){
    let shijian=time-1
    this.setData({
      meters:this.data.arr[shijian]
    })
  }
})