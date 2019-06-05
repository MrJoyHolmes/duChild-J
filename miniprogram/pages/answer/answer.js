// miniprogram/pages/answer/answer.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleId: null,
    id:'',
    article: {},
    liked:false,
    zanNum:0,
    zanIds:[],
    comment:[]
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
    db.collection('article').where({
      articleId: this.data.articleId,
    })
      .get({
        success: function (res) {
          //console.log(res.data[0].avatarUrl)
          that.setData({
            article: res.data[0],
            zanNum: res.data[0].zanNum,
            zanIds: res.data[0].zanIds,
            id: res.data[0]._id
          })
          if (res.data[0].zanIds.indexOf(app.globalData.openid)!= -1){
            that.setData({
              liked:true
            })
          }
        },
        fail: console.error
      })
  },
  onLike: function(){
    if(this.data.liked){
      this.setData({
        zanNum: this.data.zanNum - 1,
        liked: false
      })
      var zan = this.data.zanIds
      zan.splice(zan.indexOf(app.globalData.openid),1)
      const db = wx.cloud.database()
      const user = db.collection('article')
      console.log(zan)
      db.collection('article').doc(this.data.id).update({
        data: {
          zanNum: this.data.zanNum,
          zanIds: zan
        },
        success: function (res) {
          console.log(res)
        }
      })
    }else{
      this.setData({
        zanNum: this.data.zanNum + 1,
        liked: true
      })
      var zan = this.data.zanIds
      zan.push(app.globalData.openid)
      const db = wx.cloud.database()
      const user = db.collection('article')
      console.log(zan)
      db.collection('article').doc(this.data.id).update({
        data:{
          zanNum: this.data.zanNum,
          zanIds: zan
        },
        success: function (res) {
          console.log(res)
        }
      })
    }
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