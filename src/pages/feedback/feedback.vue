<template>
  <div>
    <header class="feedback_header">
    <textarea class="feedback__textarea_area" v-model="content" maxlength="50" placeholder="请输入您的意见或建议,最多50字哦"
              placeholder-class="feedback__textarea_placeholder"></textarea>
    </header>
    <div class="feedback__div_bottom">
      <button class="feedback__button_red" @tap="submitFeedback">提交</button>
    </div>
  </div>
</template>

<script>
  import router from '../../router'
  import api from '../../utils/api'

  export default {
    name: "feedback",
    data() {
      return {
        content: '',
        doubleFlag: false
      }
    },
    methods: {
      submitFeedback() {
        if (this.doubleFlag) return
        this.doubleFlag = true
        if (this.content) {
          wx.showLoading({
            title: '提交中'
          })
          api.ajax(router.feedback, 'POST', {content: this.content})
            .then(res => {
              wx.showModal({
                title: '感谢您的反馈',
                content: '我们会继续努力做到更好',
                showCancel: false
              })
              wx.hideLoading()
              this.doubleFlag = false
              setTimeout(() => {
                wx.navigateBack()
              }, 1200)
            })
            .catch(e => {
              wx.hideLoading()
              console.log(e)
              this.doubleFlag = false
            })
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '您还没输入任何信息哦',
            showCancel: false
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/scss/base';

  .feedback_header {
    padding: rpx(30);
  }

  .feedback__textarea_area {
    width: 100%;
    height: rpx(500);
    border: rpx(2) solid #dfdfdf;
    padding: rpx(30);
    color: #666;
    font-size: $fontNormal;
  }

  .feedback__textarea_placeholder {
    color: #999;
    font-size: $fontNormal;
  }

  .feedback__div_bottom {
    @extend %fix-bottom;
    @extend %flex-center;
    width: 100vw;
    height: rpx(110);
    border-top: rpx(2) solid #dfdfdf;
  }

  .feedback__button_red {
    width: rpx(690);
    @include lh(90);
    border: rpx(4) solid #F5281B;
    color: #F5281B;
    border-radius: rpx(45);
  }
</style>
