<template>
  <div class="Index">
    <!-- 导航 -->
    <scroll-view class="nav" scroll-x>
      <div :class="['it', 'f13', {active: index == tabIdx}]" v-for="(item, index) in data" :key="index"
           @tap="tabChange(index)">
        {{item.lang}}
      </div>
    </scroll-view>
    <div class="list">
      <div class="item" v-for="(item, index) in list" :key="index" @tap="toDetail(data[tabIdx].id, item.id)">
        <div class="ellipsis">{{item.title}}</div>
        <div class="author">{{item.originalFlag ? '原创' : '转载'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import router from '../../router'
  import api from '../../utils/api'

  export default {
    data() {
      return {
        tabIdx: 0,
        data: [],
        list: [],
        typeId: null,
        pageIndex: 1,
        pageSize: 20,
        more: null
      }
    },

    components: {},

    computed: {},

    methods: {
      tabChange(index) {
        this.tabIdx = index
        const {id} = this.data[index]
        this.list = []
        this.typeId = id
        this.pageIndex = 1
        this.next()
      },
      next() {
        wx.showLoading({
          title: '全栈君加载中'
        })
        api.ajax(router.listArticleByType, 'GET', {
          typeId: this.typeId,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        })
          .then(res => {
            let arr = [...this.list, ...res.data.dataList]
            this.list = arr
            this.more = res.data.dataList.length
            wx.hideLoading()
          })
          .catch(e => {
            wx.showModal({
              title: '温馨提示',
              content: '服务器开小差了，请稍后再试哦'
            })
            wx.hideLoading()
          })
      },
      toDetail(id, tid) {
        let langObject = this.data.find(item => item.id == id)
        console.log(id)
        wx.navigateTo({
          url: `/pages/detail/main?id=${tid}&lang=${langObject && langObject.lang}`
        })
      }
    },

    created() {
      api.ajax(router.getAllArticleType, 'GET')
        .then(res => {
          this.data = res.data.dataList
          this.typeId = res.data.dataList[0].id
          this.next()
        })
        .catch(e => console.log(e))
    },

    onReachBottom() {
      if (!this.more) return
      this.pageIndex = this.pageIndex + 1
      this.next()
    },

    onShareAppMessage() {
      return {
        title: '让你的技术走向全栈',
        path: '/pages/index/main'
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../assets/scss/base';

  .Index {
    .nav {
      width: 100vw;
      white-space: nowrap;
      border-bottom: 2 rpx solid $primary;
      .it {
        display: inline-block;
        padding: 0 rpx(25);
        @include lh(70);
        &.active {
          border-bottom: rpx(4) solid $primary;
        }
      }
    }

    .list {
      padding: rpx(30);
      .item {
        width: 100%;
        height: rpx(150);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: rpx(20) rpx(20);
        background: #fff;
        margin-bottom: rpx(30);
        border-radius: rpx(14);
        border-left: rpx(4) solid #F5281B;
        border-right: rpx(4) solid #F5281B;
        box-shadow: 0 0 rpx(4) rpx(4) rgba(0, 0, 0, .08);
        .title {
          font-size: rpx(40);
          color: #333;
        }
        .dis-flex {
          display: flex;
          align-items: center;
        }
        .author {
          color: #999;
          font-size: rpx(26);
        }
      }
    }
  }
</style>
