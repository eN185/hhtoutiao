// 用户模块接口
import request from '@/utils/request'

/**
 * 用户登录API
 * @param {*} mobile 手机号
 * @param {*} code 验证码
 * @returns Promise
 */

export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile, code
    }
  })
}
/**
 * 发送验证码
 * @param {*} mobile 手机号
 * @returns Promise
 */
export const getCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`,
    method: 'GET'
  })
}
