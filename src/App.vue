<script>
  import api from './utils/api'
  import router from './router'
export default {
  created () {
    wx.login({
      success(res) {
        api.ajax(router.login, 'GET', {code: res.code})
          .then(data => {

          })
      }
    })

  }
}
</script>

<style lang="scss">
  @import 'assets/scss/base';
  @import 'assets/scss/common';
</style>
