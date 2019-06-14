// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    return await db.collection('user')
      .where({_openid: wxContext.OPENID})
      .update({
        data: {
          collection: event.collection
        },
      })
  } catch (e) {
    console.error(e)
  }
}