
Page({
  data:{
    control:false
  },
  async onLoad(options){
    let res=await wx.cloud.callFunction({
      name:'getVote'
    })
    console.log(res)
    let imglist = res.result.res.data

    res = await wx.cloud.callFunction({
      name:'getVotes'
    })
    console.log('getVotes:',res)
    let voted = false 
    if(res.result.total>0){
      voted = true
    }

    let swipperCurrent = 0
    if(options&&options.fileid){
      console.log('options',options)
      swipperCurrent = imglist.findIndex(v=>{
        return v.fileid == options.fileid
      })
    }
    this.setData({
      imglist,
      voted,
      swipperCurrent
    })

    this.setBar(swipperCurrent)

  },
  async vote(e){
    let that=this
    console.log(e)
    if(e.currentTarget.dataset.id==this.data.current2){
      if(this.data.voted){
        wx.showModal({
        title: '提示',
        content: '是否要取消投票',
        success: function (res) {
          if (res.confirm) {
            let imglist = that.data.imglist
            let voted=false
            imglist[that.data.swipperCurrent].vote--
            that.setData({
              imglist,
              voted
            })
            that.setBar(that.data.swipperCurrent)
            that.setData({
              control:false
            })
          } else {
            console.log('用户点击取消')
          }
   
        }
   
      })
      }else{
        this.setData({
          control:false
        })
        let fileid = e.currentTarget.dataset.fileid
    let res = await wx.cloud.callFunction({
      name:'postVote',
      data:{
        fileid
      }
    })
    wx.showToast({
      title: '投票成功',
    })
    let current2=e.currentTarget.dataset.id

    let imglist = this.data.imglist
    let voted=true
    imglist[this.data.swipperCurrent].vote++
    this.setData({
      imglist,
      voted,
      current2
    })
    this.setBar(this.data.swipperCurrent)
    this.setData({
      control:true
    })
      }
      return
    }
    
    if(this.data.voted){
      console.log(that.data)
      wx.showToast({
        title: '已投票,不能再投',
      })
      // wx.showModal({
      //   title: '提示',
      //   content: '是否要取消投票',
      //   success: function (res) {
      //     if (res.confirm) {
      //       let imglist = that.data.imglist
      //       let voted=false
      //       imglist[that.data.swipperCurrent].vote--
      //       that.setData({
      //         imglist,
      //         voted
      //       })
      //       that.setBar(that.data.swipperCurrent)
      //     } else {
      //       console.log('用户点击取消')
      //     }
   
      //   }
   
      // })
      return
    }
    let fileid = e.currentTarget.dataset.fileid
    let res = await wx.cloud.callFunction({
      name:'postVote',
      data:{
        fileid
      }
    })
    wx.showToast({
      title: '投票成功',
    })
    let current2=e.currentTarget.dataset.id

    let imglist = this.data.imglist
    let voted=true
    imglist[this.data.swipperCurrent].vote++
    this.setData({
      imglist,
      voted,
      current2
    })
    this.setBar(this.data.swipperCurrent)
    this.setData({
      control:true
    })
  },
  setBar(current){
    this.setData({
      current:current+1
    })
    wx.setNavigationBarTitle({
      title: (current+1)+'/'+this.data.imglist.length+' 票数：'+this.data.imglist[current].vote,
    })
  },
  change(e){
    console.log(e)
    this.setData({
      swipperCurrent:e.detail.current
    })
    this.setBar(e.detail.current)
  },
  async upload(){
    let res = await wx.chooseImage({
      count: 1,
    })
    console.log('chooseimg:',res)
    res = await wx.cloud.uploadFile({
      cloudPath:res.tempFilePaths[0].replace(/(.*\/)*([^.])+/i,"$2"),
      filePath:res.tempFilePaths[0]
    })
    console.log('upload:',res)
    let fileid = res.fileID
    res = await wx.cloud.callFunction({
      name:"addVote",
      data:{
        fileid
      }
    })
    console.log('addVote',res)
    wx.reLaunch({
      url: '/'+getCurrentPages().slice(-1)[0].route+"?fileid="+fileid,
    })
  }
})