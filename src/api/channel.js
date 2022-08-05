import request from '@/utils/request'
import store from '@/store'
import storage from '@/utils/storage'
export const getMyChannel = () => {
  return request({
    url: '/v1_0/user/channels',
    headers: {
      Authorization: 'Bearer ' + store.state.tokenObj.token
    }
  })
}
/**
 * 获取所有频道
 * @returns Promise
 */
export const getAllChannels = () =>
  request({
    url: '/v1_0/channels',
    method: 'GET'
  })
/**
 *删除指定用户频道
 * @param {*} target 频道id
 * @returns promise
 */
export const delChannel = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}
/**
 *  添加频道
 * @param {*} id 频道id
 * @param {*} seq 添加频道的索引值
 * @returns Promise
 */
export const addChannel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    // 请求参数  Body 用 data
    data: {
      channels: [{ id, seq }]
    }
  })
}
const HEIMA_TOUTIAO_MY_CHANNELS = 'HEIMA_TOUTIAO_MY_CHANNELS'
export const setMyChannelsToLocal = (myChannels) => {
  storage.set(HEIMA_TOUTIAO_MY_CHANNELS, myChannels)
}
export const getMyChannelsByLocal = () => {
  return storage.get(HEIMA_TOUTIAO_MY_CHANNELS)
}
