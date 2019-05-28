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
    swipers: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    navigateToNewPage(){
      // wx.navigateTo({ url: 'https://jinshuju.net/f/GCfEkB' })
      wx.navigateTo({
        url: '/pages/wechat/index' ,  //字符串拼接实现页面跳转
      })
    }
  }
})
