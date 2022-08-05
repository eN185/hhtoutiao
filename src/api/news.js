import request from '@/utils/request'
// 新闻列表模块
/**
 *  获取文章
 * @param {*} channelId  频道ID
 * @param {*} timestamp 请求第一页数据传当前时间戳，请求上一页传上一页的时间戳
 * @returns promise
 */
export const getArticleAPI = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    // 请求参数  Query 用 params
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
