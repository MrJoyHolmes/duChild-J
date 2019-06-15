// components/news/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    education:[]
  },

  ready: function(){
    wx.showLoading({
      title: '加载中',
    });
    console.log("ready");
    const db = wx.cloud.database()
    db.collection('education').get({
      success: res => {
        this.setData({
          education: res.data
        })
      }, fail: err => {
        wx.showToast({
          icon: "none",
          title: '查询记录失败',
        })
      }
    })
    wx.hideLoading();
  },

  methods: {
    navigateToNewPage(e) {
       let url=e.currentTarget.dataset.url;

      wx.navigateTo({
        url: '/pages/wechat/index?url='+url,  //字符串拼接实现页面跳转
      })
      console.log(url);
    }
  }
})
