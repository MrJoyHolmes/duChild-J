// pages/parents/index.js
import { $init, $digest } from '../../utils/common.util'

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleCount: 0,
    contentCount: 0,
    title: '',
    content: '',
    images: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    $init(this)
    this.getOpenid();
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
    const db = wx.cloud.database()
    const user = db.collection('user')
    let _this = this
    db.collection('user').where({
      _openid: app.globalData.openid
    })
      .get({
        success: function (res) {
          if (res.data.length == 0) {
            wx.cloud.callFunction({
              name: 'register',
              data: {
                nickName: app.globalData.userInfo.nickName,
                avatarUrl: app.globalData.userInfo.avatarUrl
              },
              complete: res => {
                console.log(res)
              },
            })
            // db.collection('user').add({
            //   // data 字段表示需新增的 JSON 数据
            //   data: {
            //     nickName: _this.data.userInfo.nickName,
            //     avatarUrl: _this.data.userInfo.avatarUrl
            //   },
            //   success(res) {
            //     // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            //     console.log(res)
            //   },
            //   fail: console.error
            // })
          } else {
            //console.log(res.data)
          }
        },
        fail: console.error
      })
  },

  handleTitleInput(e) {
    const value = e.detail.value
    this.data.title = value
    this.data.titleCount = value.length
    $digest(this)
  },

  handleContentInput(e) {
    const value = e.detail.value
    this.data.content = value
    this.data.contentCount = value.length
    $digest(this)
  },


  chooseImage(e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        // 限制最多只能留下3张照片
        this.data.images = images.length <= 9 ? images : images.slice(0, 9)
        $digest(this)
      }
    })
  },

  removeImage(e) {
    const idx = e.target.dataset.idx
    this.data.images.splice(idx, 1)
    $digest(this)
  },

  handleImagePreview(e) {

    // var current = e.target.dataset.src
    // wx.previewImage({
    //   current: current,
    //   urls: this.data.images
    // })

    const idx = e.target.dataset.idx
    const images = this.data.images
    wx.previewImage({
      current: images[idx],  //当前预览的图片
      urls: images,  //所有要预览的图片
    })
  },
  submitForm(e) {
    const title = this.data.title
    const content = this.data.content

    if (content) {
      wx.showLoading({
        title: '正在创建...',
        mask: true
      })

      var myDate = new Date()
      var myTime = myDate.getTime()
      var articleId = myTime

      // 将选择的图片组成一个Promise数组，准备进行并行上传
      const arr = this.data.images.map((currentValue,index) => {
        var cloudPath = app.globalData.openid + '/' + articleId + index + '.png'
        return wx.cloud.uploadFile({
          cloudPath: cloudPath, // 上传至云端的路径
          filePath: currentValue, // 小程序临时文件路径
        })
      })

      Promise.all(arr).then(res => {
        //console.log(res)
        return res.map(item => item.fileID)
      }).catch(err => {
        console.log(">>>> upload images error:", err)
      }).then(urls => {
        console.log('urls')
        console.log(urls)
        wx.cloud.callFunction({
          name: 'publish',
          data: {
            articleId: articleId,
            nickName: app.globalData.userInfo.nickName,
            avatarUrl: app.globalData.userInfo.avatarUrl,
            content: content,
            images: urls,
            zanNum: 0,
            zanIds: []
          },
          complete: (res) => {
            console.log(res.result)
            wx.hideLoading()
            wx.switchTab({
              url: '../parents/index',
              success: function (e) {
                var page = getCurrentPages().pop();
                if (page == undefined || page == null) return;
                page.onLoad();
              }  
            })
          },
        })
        // //console.log(urls)
        // // 调用保存问题的后端接口
        // const db = wx.cloud.database()
        // const user = db.collection('article')
        // db.collection('article').add({
        //   // data 字段表示需新增的 JSON 数据
        //   data: {
        //     articleId: articleId,
        //     nickName: app.globalData.userInfo.nickName,
        //     avatarUrl: app.globalData.userInfo.avatarUrl,
        //     content: content,
        //     images: urls,
        //     zanNum: 0,
        //     zanIds: []
        //   },
        // }).then(res => {
        //   console.log(res)
        //   wx.hideLoading()
        //   wx.navigateTo({
        //     url: '../publish/index'
        //   })
        // })
      })
    }
  }
})