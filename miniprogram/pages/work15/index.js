const db = wx.cloud.database()
const musiclist = db.collection('musiclist')
const audioCtx = wx.createInnerAudioContext()
var b
var n=0

var _animation;
var _animationIndex
const _ANIMATION_TIME = 500;
Page({
  data:{ 
    item:0,
    tab:0,
    state:'paused',
    playIndex:0,
    play:{
      currentTime:0,
      duration:0,
      percent:0,
      title:'',
      singer:'',
      coverImg:'',
    },
    animationData: {}
  },
  onShow: function () {
    
  },
  onLoad(){
    wx.setInnerAudioOption({
      mixWithOther:true,
      obeyMuteSwitch:false,
    });
    audioCtx.onError(() => {
      console.log('播放失败：' + audioCtx.src)
    })
    audioCtx.onEnded(() => {
      this.next()
    })
    audioCtx.onCanplay(() => {
      console.log('onCanplay')
      this.setData({
        'play.duration':audioCtx.duration
      })
      if(this.data.state == 'running') {
        audioCtx.play()
      }
    })
    audioCtx.onTimeUpdate(() => {
      this.setData({
        'play.duration':audioCtx.duration,
        'play.currentTime':audioCtx.currentTime,
        'play.percent':audioCtx.currentTime / audioCtx.duration * 100
      })
    })
    

    musiclist.get().then(res => {
      console.log(res.data)
      let playlist2=getArrayItems(res.data,9)
      this.setData({
        playlist2:playlist2
      })
      function getArrayItems(arr,num){
        var temp_arr = arr.slice(0);
        // 取出的数值项，保存在此数组
        var return_arr = [];
        for(var i=0;i<num;i++){
        // 判断如果数组还有可以取出的元素，以防下标越界
        if(temp_arr.length>0){
        // 在数组中产生一个随机索引
        var arrIndex = Math.floor(Math.random()*temp_arr.length);
        // 将此随机索引的对应数组元素值复制出来
        return_arr[i] = temp_arr[arrIndex];
        // 然后删掉此索引的数组元素，这时候temp_arr变为新的数组
        temp_arr.splice(arrIndex,1)
        } else{
        // 数组中数据项取完后，退出循环，比如数组本来只有10项，但要求取出20项
        break;
        }
        }
        return return_arr;
        }
     
      this.setData({
        playlist:res.data,
      })
      this.selectMusic(0)
    })
  },
  changeItem:function(e){
    this.setData({
      item:e.target.dataset.item
    })
  },
  changeTab:function(e){
    this.setData({
      tab:e.detail.current
    })
  },
  selectMusic:function(index){
    console.log('change')
    var music = this.data.playlist[index]
    audioCtx.src = music.src
    this.setData({
      playIndex:index,
      play:music,
      'play.currentTime':0,
      'play.duration':0,
      'play.percent':0
    })
  },
  play:function(){
    audioCtx.play()
    this.setData({
      state:'running',
    })
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })

    this.animation = animation

    // animation.scale(2, 2).rotate(45).step()

    this.setData({
      animationData: animation.export()
      
    })
    // var n = 0;
   //连续动画需要添加定时器,所传参数每次+1就行
      b=setInterval(function () {
      // animation.translateY(-60).step()
      n=n+1;
      this.animation.rotate(5 * (n)).step()
      this.setData({
        animationData: this.animation.export()
      })
    }.bind(this), 100)
  },
  pause:function(){
    audioCtx.pause()
    this.setData({
      state:'paused'
    })
    clearInterval(b)
    // this.animation.rotateY(0).step()
    // this.myRotate = this.this.animation.export()
  },
  next:function(){
    var index = this.data.playIndex >= this.data.playlist.length - 1 ? 0 : this.data.playIndex + 1
    this.selectMusic(index)
    if(this.data.state === 'running'){
      this.play()
    }
  },
  change:function(e){
    this.selectMusic(e.currentTarget.dataset.index)
    this.play()
  },
  tuo(e){
    let that=this
    
    let d=e.detail.value
    console.log(d,audioCtx.currentTime)
    let f=(audioCtx.currentTime/ audioCtx.duration * 100)+d+34
    audioCtx.seek(f)
  },
})
