// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: ["新闻动态", "公益活动", "康复教育", "专家机构"],
    currentIndex: 0,   //改变index的值，设置当前的active页面
    // news: [],
    // swipersImg:[]
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
    wx.showNavigationBarLoading();//动作显示 标题上的圆圈
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


  switchBottomTab(e) {
      let index = parseInt(e.currentTarget.dataset.index); // 点击对象的index
      this.setData({  //改变currentIndex的值 控制左侧边栏的显示
        currentIndex: index
      })
  },

  changeView(e) {
      const self = this;
      let index = parseInt(e.currentTarget.dataset.index); // 点击对象的index
      // console.log(e);
      this.setData({
        currentIndex: e.detail.current,
      });
  }

})