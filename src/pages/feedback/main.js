import Vue from 'vue'
import App from './feedback'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段下的数据会被填充到 app.json ／ page.json
  config: {
      navigationBarTitleText: '意见反馈'
  }
};
