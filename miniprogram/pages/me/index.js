// 获取应用实例,在onLoad的函数中将会用到该实例
const app = getApp();
//console.log(app);


// pages/me/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      //由于getUserInfo是网络请求，可能会在page.onLoad之后才返回
      //为了防止这种情况的发生，所以此处加入callBack
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: ture,
        })
      }
    }
  },

  // 获取用户信息
  getUserInfo: function (e) {
    console.log(e),
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
  },
  onCollection(){
    const db = wx.cloud.database()
    db.collection('user')
      .where({_openid:app.globalData.appid})
      .get()
      .then(res=>{
        //console.log(res.data[0].collection)
        collection.forEach(value=>{
          db.collection('article')
            .where({articleId:value})
            .orderBy('articleId', 'desc').limit(6)
            .get()
            .then(res => {
              let feed = res.data
              //console.log(feed);
              this.setData({
                feed: feed,
                feed_length: feed.length
              });
              //console.log(this.data.feed)
            })
        })
      })
    // const db = wx.cloud.database()
    // db.collection('article')
    // .where({})
    // .orderBy('articleId', 'desc').limit(6)
    //   .get()
    //   .then(res => {
    //     let feed = res.data
    //     //console.log(feed);
    //     this.setData({
    //       feed: feed,
    //       feed_length: feed.length
    //     });
    //     //console.log(this.data.feed)
    //   })
    //   .catch(console.error)
  }
})