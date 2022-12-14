// 封装本地存储
// 用 class类 特性：封装，继承，多态
class Storage {
  get (key) {
    // getItem(key:string):string
    // JSON.parse() 只能转换JSON格式的字符串
    const value = localStorage.getItem(key)
    // 如果是 JSON格式的，就 parse 一下
    // 不是JSON格式 直接返回
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  }

  set (key, value) {
    if (typeof value === 'object' && value !== null) {
      value = JSON.stringify(value)
    }
    // value 不是对象
    localStorage.setItem(key, value)
  }

  remove (key) {
    localStorage.removeItem(key)
  }
}
export default new Storage()
