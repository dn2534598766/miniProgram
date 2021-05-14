// pages/work4/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:'images/c.png',
    btnc:true,
    btnd:false,
    btne:false,
    btnf:false,
    btng:false,
    btna:false,
    btnb:false,
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
  c(){
    this.setData({
      src:'images/c.png',
      btnc:true,
      btnd:false,
      btne:false,
      btnf:false,
      btng:false,
      btna:false,
      btnb:false,
    })
  },
  d(){
    this.setData({
      src:'images/d.png',
      btnc:false,
      btnd:true,
      btne:false,
      btnf:false,
      btng:false,
      btna:false,
      btnb:false,
    })
  },
  e(){
    this.setData({
      src:'images/e.png',
      btnc:false,
      btnd:false,
      btne:true,
      btnf:false,
      btng:false,
      btna:false,
      btnb:false,
    })
  },
  f(){
    this.setData({
      src:'images/f.png',
      btnc:false,
      btnd:false,
      btne:false,
      btnf:true,
      btng:false,
      btna:false,
      btnb:false,
    })
  },
  g(){
    this.setData({
      src:'images/g.png',
      btnc:false,
      btnd:false,
      btne:false,
      btnf:false,
      btng:true,
      btna:false,
      btnb:false,
    })
  },
  a(){
    this.setData({
      src:'images/a.png',
      btnc:false,
      btnd:false,
      btne:false,
      btnf:false,
      btng:false,
      btna:true,
      btnb:false,
    })
  },
  b(){
    this.setData({
      src:'images/b.png',
      btnc:false,
      btnd:false,
      btne:false,
      btnf:false,
      btng:false,
      btna:false,
      btnb:true,
    })
  }
})