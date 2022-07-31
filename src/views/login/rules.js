export const mobileRules = [
  { required: true },
  { pattern: /^1[0-9]\d{9}$/, message: '手机号格式不正确' }
]

export const codeRules = [
  { required: true },
  { pattern: /^[0-9]{6}$/, message: '验证码不正确' }
]
