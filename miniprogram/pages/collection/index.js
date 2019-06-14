const app = getApp();
Page({
  data: {
    articles: [],
    articles_length: 0
  },
  onLoad: function () {
    console.log('onLoad')
    //调用应用实例的方法获取全局数据
    this.refresh();
  },

  bindItemTap: function (e) {
    //console.log(e.currentTarget.dataset.articleid)
    app.globalData.articleId = e.currentTarget.dataset.articleid
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  // upper: function () {
  //   wx.showNavigationBarLoading()
  //   this.refresh();
  //   console.log("upper");
  //   setTimeout(function () { wx.hideNavigationBarLoading(); wx.stopPullDownRefresh(); }, 20);
  // },
  // lower: function (e) {
  //   wx.showNavigationBarLoading();
  //   var that = this;
  //   setTimeout(function () { wx.hideNavigationBarLoading(); that.nextLoad(); }, 10);
  //   console.log("lower")
  // },


  //网络请求数据, 实现刷新
  refresh: function () {
    var that = this
    const db = wx.cloud.database()
    db.collection('user')
      .where({ _openid: app.globalData.openid })
      .get()
      .then(res => {
        //console.log(res.data[0].collection)
        res.data[0].collection.forEach(value => {
          db.collection('article')
            .where({ articleId: value })
            .get()
            .then(res => {
              var article = res.data[0]
              //console.log(articles);
              var articles = that.data.articles
              articles.push(article)
              that.setData({
                articles: articles,
              });
              //console.log(that.data.articles)
            })
        })
      })
    // const db = wx.cloud.database()
    // db.collection('article').orderBy('articleId', 'desc').limit(6)
    //   .get()
    //   .then(res => {
    //     let articles = res.data
    //     //console.log(articles);
    //     this.setData({
    //       articles: articles,
    //       articles_length: articles.length
    //     });
    //     //console.log(this.data.articles)
    //   })
    //   .catch(console.error)
  },

  //使用本地 fake 数据实现继续加载效果
  nextLoad: function () {
    const db = wx.cloud.database()
    db.collection('article').orderBy('articleId', 'desc').skip(this.data.articles_length).limit(6)
      .get()
      .then(res => {
        let next_data = res.data
        this.setData({
          articles: this.data.articles.concat(next_data),
          articles_length: this.data.articles_length + next_data.length
        });
        //console.log(this.data.articles)
      })
      .catch(console.error)
  }
});
