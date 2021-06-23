const app = getApp()
Page({
  data:{
    activityId:'',
    memberCount:1,
    roomLimit:4,
    templateInfo:{
      parameterList:[
        {
          name:'member_count',
          value:'1'
        },
        {
          name:'room_limit',
          value:'4'
        }
      ]
    }
  },
  async onLoad(options){
    console.log('onLoad options:',options)
    if(options.activityId){
      let {activityId,memberCount,roomLimit} = options
      memberCount = Number(memberCount)+1
      let templateInfo = this.data.templateInfo
      templateInfo.parameterList[0].value = memberCount+''
      templateInfo.parameterList[1].value = roomLimit
      this.setData({
        activityId,memberCount,roomLimit,templateInfo
      })
      let res = await wx.cloud.callFunction({
        name:'setUpdatableMsgUpdate',
        data:{
          activityId,memberCount,roomLimit
        }
      })
      console.log('setUpdatableMsgUpdate',res)
    }
  },
  async onShow(){
    if(app.globalData.shareTicket){
      let res = await wx.getShareInfo({
        shareTicket:app.globalData.shareTicket,
      })
      console.log('getShareInfo',res)
      res = await wx.cloud.callFunction({
        name:'showCloudID',
        data:{
          sharedata:wx.cloud.CloudID(res.cloudID)
        }
      })
      console.log('showCloudID:',res)
      this.setData({
        groupId:res.result.sharedata.data.openGId
      })
    }
    if(!this.data.activityId){
      let res = await wx.cloud.callFunction({
        name:'createActivityId'
      })
      console.log('activityId:',res)
      res = await this.setData({
        activityId:res.result.activityId
      })
    }
    wx.showShareMenu({
      withShareTicket:true,
    })

    wx.updateShareMenu({
      withShareTicket:true,
      isUpdatableMessage:true,
      activityId:this.data.activityId,
      templateInfo:this.data.templateInfo
    })
  },
  onShareAppMessage(e){
    return {
      title:'健康打卡接力',
      path:'/pages/work19/index?activityId='+this.data.activityId+
      '&memberCount='+this.data.memberCount+
      '&roomLimit='+this.data.roomLimit
    }
  },
  async close(){
    let res = await wx.cloud.callFunction({
      name:'setUpdatableMsgEnd',
      data:{
        activityId:this.data.activityId,
        path:'/pages/work19/index'
      }
    })
  }
})