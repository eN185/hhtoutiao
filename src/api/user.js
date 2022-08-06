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
      mobile,
      code
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

/**
 * 获取用户个人资料
 * @returns  Promise
 */
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

// 如果传的是对象，axios默认将对象转成json并且加上content-type=application/json
// 如果传的是formDate表单，那么axios会将表单提交给后端，并且默认的加上content-type=mutipart/form-data
// 如果后端要的是表单(form-data)
// const fm = new FormData();
// fm.append(表单的name，表单项)
/**
 * 编辑用户照片资料（头像、身份证照片）
 * @param {*} file 图片的file对象
 * @returns Promise
 */
export const uploadAvator = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}
