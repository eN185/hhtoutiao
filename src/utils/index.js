// 将 file 对象解析成 base64， 以 promise 管理
export const resolveToBase64 = (file) => {
  return new Promise((resolve) => {
    const fr = new FileReader()
    fr.readAsDataURL(file)
    fr.onload = (e) => {
      resolve(e.target.result)
    }
  })
}
