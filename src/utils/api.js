const baseUrl = ``

class Api {
  constructor(opt) {
    this.url = opt.url
    this.header = opt.header || {}
  }

  ajax(url, method, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.url + url,
        data,
        method,
        header: this.header,
        success: res => {
          if (res.statusCode == 200) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        },
        fail: res => {
          reject(res)
        }
      })
    })
  }
}

export default new Api({ url: baseUrl })
