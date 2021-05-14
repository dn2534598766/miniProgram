// pages/work3/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:'',
    color:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  compare(e){
    let n1=parseInt(e.detail.value.num1)   
    let n2=parseInt(e.detail.value.num2)
    if(n1>n2){
      this.setData({
        result:'第一个数大',
        color:'red'
      })
    }else if(n1==n2){
      this.setData({
        result:'两个数相等',
        color:'break'
      })
    }else if(n1<n2){
      this.setData({
        result:'第二个数大',
        color:'blue'
      })
    }else{
      this.setData({
        result:'请输入数字！',
        color:'pink'
      })
    }
  }
})