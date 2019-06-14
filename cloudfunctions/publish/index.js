// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try{
    return await db.collection('article').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        articleId: event.articleId,
        _openid: wxContext.OPENID,
        nickName: event.nickName,
        avatarUrl: event.avatarUrl,
        content: event.content,
        images: event.images,
        zanNum: 0,
        commentNum: 0,
        zanIds: []
      },
    })
  } catch (e) {
    console.error(e)
  }
}