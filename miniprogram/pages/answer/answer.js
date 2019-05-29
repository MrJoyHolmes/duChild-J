// miniprogram/pages/answer/answer.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleId: null,
    article: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      articleId: app.globalData.articleId
    })
    var that = this
    const db = wx.cloud.database()
    const user = db.collection('article')
    db.collection('article').where({
      articleId: this.data.articleId,
    })
      .get({
        success: function (res) {
          console.log(res.data[0].avatarUrl)
          that.setData({
            article: res.data[0]
          })
        },
        fail: console.error
      })
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

  }
})