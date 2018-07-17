<template>
  <div>
    <header class="header">
      <open-data class="avatar" type="userAvatarUrl"></open-data>
      <open-data class="nickname" type="userNickName"></open-data>
    </header>
    <button class="green-btn" @tap="feedback">
      <div>意见</div>
      <div>反馈</div>
    </button>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    components: {},

    methods: {
      feedback() {
        wx.navigateTo({
          url: `/pages/feedback/main`
        })
      }
    },

    created() {

    }
  }
</script>

<style scoped lang="scss">
  @import '../../assets/scss/base';

  .header {
    padding: rpx(40) 0;
    @extend %flex-column-center;
    .avatar {
      width: rpx(120);
      height: rpx(120);
    }
    .nickname {
      margin-top: rpx(20);
      font-size: rpx(34);
      color: #666;
    }
  }

  .green-btn {
    margin: rpx(40) auto;
    @extend %flex-column-center;
    width: rpx(300);
    height: rpx(300);
    background: lightgreen;
    border-radius: 50%;
    color: #fff;
  }
</style>
