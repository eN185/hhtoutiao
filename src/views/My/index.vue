<template>
  <div>
    <!-- 顶部 -->
    <header>
      <div class="login" v-if="isLogin">登录后</div>
      <div class="logout" v-else>登陆前</div>
    </header>
    <!-- 中间 -->
    <main>收藏/历史/消息通知/小智同学</main>
    <!-- 底部 -->
    <footer>
      <button v-if="isLogin" @click="logout">退出登录</button>
    </footer>
  </div>
</template>

<script>
export default {
  props: [''],
  data() {
    return {}
  },

  components: {},

  computed: {
    isLogin() {
      // 计算token
      return !!this.$store.state.tokenObj.token
    }
  },

  created() {},

  mounted() {},

  methods: {
    logout() {
      // 清除 token 退出
      this.$store.commit('STE_TOKE', {})
    }
  }
}
</script>
<style lang="less" scoped></style>
