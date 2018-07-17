<template>
  <div>
    <div class="plr20" v-if="!loading">
      <wxParse :content="article" @preview="preview" @navigate="navigate"/>
    </div>
  </div>
</template>

<script>
  import wxParse from 'mpvue-wxparse'
  import marked from 'marked'
  import api from '../../utils/api'
  import router from '../../router'

  export default {
    data() {
      return {
        content: '',
        article: '',
        title: '',
        originalFlag: '',
        loading: false
      }
    },
    components: {
      wxParse
    },
    onShow() {
      wx.setNavigationBarTitle({
        title: this.$root.$mp.query.lang || ''
      })
      this.loading = true
      wx.showLoading({
        title: '加载中'
      })
      api.ajax(router.getArticleDetailById, 'GET', {id: this.$root.$mp.query.id})
        .then((res) => {
          this.title = res.data.title
          this.originalFlag = res.data.originalFlag
          this.article = res.data.type === 1 ? res.data.context : marked(res.data.context)
          this.loading = false
          wx.hideLoading()
        })
        .catch(e => {
          console.log(e)
          this.loading = false
          wx.hideLoading()
        })
    },

    methods: {},

    created() {

    }
  }
</script>

<style scoped lang="scss">
  @import url("~mpvue-wxparse/src/wxParse.css");

  .title {
    text-align: center;
    margin-bottom: rpx(30);
    color: #333;
    font-size: rpx(44);
  }

</style>
