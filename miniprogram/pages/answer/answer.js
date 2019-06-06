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
  onComment: function () {
    wx.createSelectorQuery().select('#comment').boundingClientRect(function (rect) {
      // 使页面滚动到底部
      wx.pageScrollTo({
        scrollTop: rect.bottom
      })
    }).exec()
  },
  onLike: function(){
    let that = this
    if(this.data.liked){
      this.setData({
        zanNum: this.data.zanNum - 1,
        liked: false
      })
      var zan = this.data.zanIds
      zan.splice(zan.indexOf(app.globalData.openid),1)
      wx.cloud.callFunction({
        name: 'onLike',
        data: {
          id: that.data.id,
          zanNum: that.data.zanNum,
          zanIds: zan
        },
        complete: res => {
          console.log(res)
        },
      })
      // const db = wx.cloud.database()
      // const user = db.collection('article')
      // console.log(zan)
      // db.collection('article').doc(this.data.id).update({
      //   data: {
      //     zanNum: this.data.zanNum,
      //     zanIds: zan
      //   },
      //   success: function (res) {
      //     console.log(res)
      //   }
      // })
    }else{
      this.setData({
        zanNum: this.data.zanNum + 1,
        liked: true
      })
      var zan = this.data.zanIds
      zan.push(app.globalData.openid)
      wx.cloud.callFunction({
        name: 'onLike',
        data: {
          id: that.data.id,
          zanNum: that.data.zanNum,
          zanIds: zan
        },
        complete: res => {
          console.log(res)
        },
      })
      // const db = wx.cloud.database()
      // const user = db.collection('article')
      // console.log(zan)
      // db.collection('article').doc(this.data.id).update({
      //   data:{
      //     zanNum: this.data.zanNum,
      //     zanIds: zan
      //   },
      //   success: function (res) {
      //     console.log(res)
      //   }
      // })
    }
  },

  onChangeComment: function (e) {
    //调用云函数写数据
    console.log(e.detail)
    wx.cloud.callFunction({
      name: 'onComment',
      data: {
        id: this.data.id,
        commentNum: e.detail.val
      },
      complete: res => {
        console.log(res)
      },
    })
  },
  handleImagePreview(e) {

    // var current = e.target.dataset.src
    // wx.previewImage({
    //   current: current,
    //   urls: this.data.images
    // })

    const idx = e.target.dataset.idx
    const images = this.data.article.images
    wx.previewImage({
      current: images[idx],  //当前预览的图片
      urls: images,  //所有要预览的图片
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