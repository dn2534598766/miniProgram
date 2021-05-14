// pages/work4/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:'images/c.png',
    // btnarr:['C','D','E','F','G','A','B'],
    btnarr:[
      {name:'C',src:'images/c.png'},
      {name:'D',src:'images/d.png'},
      {name:'E',src:'images/e.png'},
      {name:'F',src:'images/f.png'},
      {name:'G',src:'images/g.png'},
      {name:'A',src:'images/a.png'},
      {name:'B',src:'images/b.png'},
    ],
    currbtn:'C'
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
  clickme(e){
    let btn = e.currentTarget.dataset.name
    let currbtn = btn
    let src = 'images/'+btn.toLowerCase()+'.png'
    this.setData({
      currbtn,
      src
    })
  }
})