<template>
  <div>
    <!-- 头部搜索 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button
          class="search-btn"
          round
          icon="search"
          @click="$router.push('/search')"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 文章 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in myChannels" :key="item.id" :title="item.name">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <span class="toutiao toutiao-gengduo1" @click="Home_show"></span>
    </van-tabs>
    <!-- 频道弹层 -->
    <van-popup
      v-model="show"
      position="top"
      closeable
      close-icon-position="top-left"
      :style="{ height: '100%', width: '100%' }"
      ><ChannelPopup
        :myChannels="myChannels"
        @close="show = false"
        @change-active="active = $event"
        @del-channel="delChannel"
        @add-channel="addChannel"
      />
      <!-- $event 模板
      - 原生事件：事件对象
      - 自定义事件当中：子组件传递过来的第一个参数 -->
    </van-popup>
  </div>
</template>

<script>
import {
  getMyChannel as getMyChannelAPI,
  delChannel,
  addChannel,
  setMyChannelsToLocal,
  getMyChannelsByLocal
} from '@/api'
import ArticleList from './components/ArticleList.vue'
import ChannelPopup from './components/ChannelPopup.vue'
export default {
  props: [''],
  data() {
    return {
      active: 0,
      myChannels: [],
      show: false
    }
  },

  components: {
    ArticleList,
    ChannelPopup
  },

  computed: {
    // 用于表示是否登录
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },

  created() {
    this.initMyChannel()
  },

  mounted() {},

  methods: {
    // 初始化myChannels数据
    initMyChannel() {
      if (this.isLogin) {
        // 用户登录了
        // -发起请求获取myChannels数据
        this.getMyChannel()
      } else {
        // 用户未登录
        const myChannels = getMyChannelsByLocal()
        if (myChannels) {
          // -本地存储有myChannels数据，从本地拿myChannels
          this.myChannels = myChannels
        } else {
          // -本地存储没有myChannels数据，获取默认的myChannels
          this.getMyChannel()
        }
      }
    },
    // 如果用户登录了，获取的是用户自己的myChannels
    // 没有登录，获取的是默认的myChannels
    async getMyChannel() {
      try {
        const { data } = await getMyChannelAPI()
        // console.log(data)
        this.myChannels = data.data.channels
      } catch (e) {
        console.log(e)
        this.$$toast.fail('获取失败，请刷新')
      }
    },
    Home_show() {
      this.show = true
    },
    //  删除频道
    async delChannel(id) {
      // 删除我的频道
      this.$toast.loading({
        message: '正在删除频道~~',
        forbidClick: true
      })
      try {
        const newChannels = this.myChannels.filter((item) => item.id !== id)
        if (this.isLogin) {
          // - 删除服务器的数据
          await delChannel(id)
        } else {
          setMyChannelsToLocal(newChannels)
        }
        // -删除页面上的数据
        this.myChannels = newChannels
        this.$toast.success('删除频道成功~')
      } catch (error) {
        this.$toast.fail('删除频道失败~')
      }
    },
    // 添加频道
    async addChannel(channel) {
      this.$toast.loading({
        message: '正在添加频道~~',
        forbidClick: true
      })
      try {
        if (this.isLogin) {
          await addChannel(channel.id, this.myChannels.length)
        } else {
          setMyChannelsToLocal([...this.myChannels, channel])
        }
        this.myChannels.push(channel)
        this.$toast.success('添加频道成功~')
      } catch (error) {
        this.$toast.fail('添加频道失败~')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.navbar {
  position: sticky;
  top: 0;
  left: 0;
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }

  :deep(.van-icon) {
    color: #fff;
  }
}

.search-btn {
  width: 7.4rem;
  height: 0.85333rem;
  background-color: #5babfb;
  color: #fff;

  &.van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;
  position: sticky;
  top: 92px;
  left: 0;
  background-color: #fff;
  z-index: 99;
  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo1 {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;
  color: #000;
  position: fixed;
  top: 92px;
  right: 0;
  z-index: 99;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
:deep(.van-tabs__content) {
  // 符号的两侧必须由空格
  max-height: calc(100vh - 92px - 88px - 100px);
  padding-bottom: 100px;
  overflow: auto;
}
</style>
