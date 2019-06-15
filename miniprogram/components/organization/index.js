// components/organization/index.js
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
    organization: [],
    doctor:[]
  },
  ready: function () {
    wx.showLoading({
      title: '加载中',
    });
    console.log("ready");
    const db = wx.cloud.database()
    db.collection('organization').get({
      success: res => {
        this.setData({
          organization: res.data
        })
        console.log(this.data.organization);
      }, fail: err => {
        wx.showToast({
          icon: "none",
          title: '查询记录失败',
        })
      }
    });
    db.collection('doctor').get({
      success: res => {
        this.setData({
          doctor: res.data
        })
        console.log(this.data.doctor);
      }, fail: err => {
        wx.showToast({
          icon: "none",
          title: '查询记录失败',
        })
      }
    })
    wx.hideLoading();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    navigateToNewPage(e) {
      let url = e.currentTarget.dataset.url;

      wx.navigateTo({
        url: '/pages/wechat/index?url=' + url,  //字符串拼接实现页面跳转
      })
      console.log(url);
    }
  }
})
