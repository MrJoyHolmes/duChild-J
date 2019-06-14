//discovery.js
var util = require('../../utils/util.js')
const app = getApp();
Page({
  data: {
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    feed: [],
    feed_length: 0
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    this.refresh();
    this.getOpenid();
  },
  getOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  adddetial: function () {
    wx.navigateTo({
      url: '../parents2/index',
    })
  },
  bindItemTap: function (e) {
    //console.log(e.currentTarget.dataset.articleid)
    app.globalData.articleId = e.currentTarget.dataset.articleid
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  upper: function () {
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    setTimeout(function () { wx.hideNavigationBarLoading(); wx.stopPullDownRefresh(); }, 2000);
  },
  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function () { wx.hideNavigationBarLoading(); that.nextLoad(); }, 1000);
    console.log("lower")
  },
  //scroll: function (e) {
  //  console.log("scroll")
  //},

  //网络请求数据, 实现刷新
  refresh0: function () {
    var index_api = '';
    util.getData(index_api)
      .then(function (data) {
        //this.setData({
        //
        //});
        console.log(data);
      });
  },

  //使用本地 fake 数据实现刷新效果
  refresh: function () {
    const db = wx.cloud.database()
    db.collection('article').orderBy('articleId', 'desc').limit(6)
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
      .catch(console.error)
  },

  //使用本地 fake 数据实现继续加载效果
  nextLoad: function () {
    const db = wx.cloud.database()
    db.collection('article').orderBy('articleId', 'desc').skip(this.data.feed_length).limit(6)
      .get()
      .then(res => {
        let next_data = res.data
        this.setData({
          feed: this.data.feed.concat(next_data),
          feed_length: this.data.feed_length + next_data.length
        });
        //console.log(this.data.feed)
      })
      .catch(console.error)
  }
});
