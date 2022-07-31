<template>
  <div>
    <div>
      <router-view />
    </div>
    <div>
      <van-tabbar route>
        <van-tabbar-item
          :to="item.to"
          v-for="(item, index) in tabbarData"
          :key="index"
        >
          <template #icon>
            <span :class="`toutiao ${item.icon}`"></span>
            <span>{{item.text}}</span>
          </template>
        </van-tabbar-item>
        <!-- <van-tabbar-item to="/ ">
          <template #icon>
            <span class="toutiao toutiao-shouye1"></span>
            <span>首页</span>
          </template>
        </van-tabbar-item> -->
        <!-- <van-tabbar-item to="/question">
          <template #icon>
            <span class="toutiao toutiao-shipin1"></span>
            <span>视频</span>
          </template>
        </van-tabbar-item> -->
        <!-- <van-tabbar-item to="/video">
          <template #icon>
            <span class="toutiao toutiao-wenda"></span>
            <span>问答</span>
          </template>
        </van-tabbar-item> -->
        <!-- <van-tabbar-item to="/my">
          <template #icon>
            <span class="toutiao toutiao-wode"></span>
            <span>我的</span>
          </template>
        </van-tabbar-item> -->
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  props: [''],
  data() {
    return {
      tabbarData: [
        {
          to: '/ ',
          icon: 'toutiao-shouye1',
          text: '首页'
        },
        {
          to: '/video',
          icon: 'toutiao-shipin',
          text: '视频'
        },
        {
          to: '/question',
          icon: 'toutiao-wenda',
          text: '问答'
        },
        {
          to: '/my',
          icon: 'toutiao-wode',
          text: '我的'
        }
      ]
    }
  },

  components: {},

  computed: {},

  created() {},

  mounted() {},

  methods: {}
}
</script>
<style lang="scss" scoped>
/deep/.van-tabbar-item__icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  font-size: 30px;
  .toutiao {
    font-size: 40px;
  }
}
</style>
