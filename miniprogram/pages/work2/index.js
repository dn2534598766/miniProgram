// pages/work2/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hi:"惊喜不惊喜",
    color:"red",
    getColor(){
      var letter="0123456789ABCDEF";
      var color = [];
      var c="#";
      for(var i=0;i<6;i++){
        c=c+letter[Math.floor(Math.random()*16)]
      }
      color.push(c);
      return color
    }
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
  bian(){
    var hi=this.data.hi
    hi=="惊喜不惊喜"?hi="意外不意外":hi="惊喜不惊喜"
    // var color=this.data.color
    // color=="red"?color="blue":color="red"
    // this.setData({
    //   hi,
    //   color
    // })
    var color=this.data.getColor()
    this.setData({
      hi,
      color
    })
  }
})