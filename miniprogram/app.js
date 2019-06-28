//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }


    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.getOpenid()
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log("success")
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    //this.getOpenid()
  },
  getOpenid: function () {
    // 调用云函数
    let _this = this
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        _this.globalData.openid = res.result.openid

        const db = wx.cloud.database()
        const user = db.collection('user')

        //console.log(res.result.openid)
        db.collection('user').where({
          _openid: _this.globalData.openid
        })
          .get({
            success: function (res) {
              console.log(res)
              if (res.data.length == 0) {
                //console.log("authorized")
                wx.navigateTo({
                  url: '../authorize/authorize',
                })
              } else {
                //console.log(res.data)
                wx.switchTab({
                  url: '../home/index'
                })
              }
            },
            fail: console.error
          })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    openid:'',
    articleId:''
  }
})