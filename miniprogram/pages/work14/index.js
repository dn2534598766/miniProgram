const db=wx.cloud.database()
const vote=db.collection('vote')
const votes=db.collection('votes')
const $=db.command.aggregate
Page({
  onLoad(){
    vote.get().then(res=>{
      console.log('vote get:',res)
      let imglist=res.data
      votes.aggregate()
      .group({
        _id:'$fileid',
        count:$.sum(1)
      }).end().then(res=>{
        console.log('votes aggregate',res)
        imglist.forEach(val=>{
          res.list.find(v=>{
            if(v._id==val.fileid){
              val.count=v.count
            }
          })
        })
        this.setData({imglist})
      })
      
    })
    wx.cloud.callFunction({
      name:'login'
    }).then(res=>{
      console.log('login cloudfunction' ,res)
      let openid=res.result.openid
      votes.where({
        _openid:openid
      }).get().then(res=>{
        console.log('vote where',res)
        if(res.data.length>0){
          this.setData({
            voted:true
          })
        }
      })
    })
  },
  vote(e){
    if(this.data.voted){
      wx.showToast({
        title: '已投票,不能再投',
      })
      return
    }
    console.log('tap event',e)
    let now = new Date()
    let fileid=e.currentTarget.dataset.fileid
    votes.add({
      data:{
        fileid,
        date:now
      }
    }).then(res=>{
      wx.showToast({
        title: '投票成功',
      })
      this.setData({
        voted:true
      })
    })
  }
})