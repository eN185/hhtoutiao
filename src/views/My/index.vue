<template>
  <div class="My_man">
    <!-- 顶部 -->
    <!-- 登录后 -->
    <header class="My_header_flex">
      <div class="login" v-if="isLogin">
        <van-image
          round
          width="1.76rem"
          height="1.76rem"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
          class="My_m_login"
        >
        </van-image>
        <span class="My_m_spana">12211111111111</span>
        <van-tag
          type="primary"
          round
          color="#fff"
          text-color="#000"
          class="My_m_span"
          >编辑资料</van-tag
        >
        <div class="My_m_spanb">
          <div class="My_m_spanc">
            <span>0</span>
            <span>头条</span>
          </div>
          <div class="My_m_spanc">
            <span>0</span>
            <span>粉丝</span>
          </div>
          <div class="My_m_spanc">
            <span>0</span>
            <span>关注</span>
          </div>
          <div class="My_m_spanc">
            <span>0</span>
            <span>点赞</span>
          </div>
        </div>
      </div>
      <!-- 未登录 -->
      <div class="login" v-else>
        <van-image
          round
          width="1.76rem"
          height="1.76rem"
          src="@/assets/images/mobile.png"
          class="My_m_logina"
        >
        </van-image>
        <span class="My_m_spanaa" @click="click_login">登录/注册</span>
      </div>
    </header>
    <!-- 中间 -->
    <main>
      <div class="My_flex">
        <div class="My_collection">
          <van-icon name="star-o" size="40" color="#bfa992" />
          <span>收藏</span>
        </div>
        <div class="My_collection">
          <van-icon name="clock-o" size="40" color="#bfa992" />
          <span>历史</span>
        </div>
      </div>
      <div class="My_message_color">
        <div class="My_message">
          <span>消息通知</span>
          <van-icon name="arrow" size="18" />
        </div>
        <div class="My_message">
          <span>小智同学</span>
          <van-icon name="arrow" size="18" />
        </div>
      </div>
    </main>
    <!-- 底部 -->
    <footer>
      <van-button class="My_btn" v-if="isLogin" @click="logout" size="30"
        >退出</van-button
      >
    </footer>
  </div>
</template>

<script>
export default {
  props: [''],
  data() {
    return {
    }
  },

  components: {},

  computed: {
    isLogin() {
      // 计算token
      return !!this.$store.state.tokenObj.token
    }
  },

  created() {},

  mounted() {
    // this.$dialog.alert({
    //   message: '弹窗内容'
    // })
  },
  methods: {
    logout() {
      // 清除 token 退出
      this.$store.commit('STE_TOKE', {})
    },
    click_login() {
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="less" scoped>
.My_message_color {
  background-color: #fff;
}
.My_message {
  display: flex;
  justify-content: space-between;
  padding: 20px 10px;
  margin: 10px 0;
  span {
    font-size: 35px;
  }
}
.My_man {
  background-color: #f6f7f9;
  height: 100vh;
}
.My_btn {
  width: 100%;
}
/deep/.van-button--default {
  color: red;
  background-color: #fff;
  border: 0.02667rem solid #fff;
}
.My_collection {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  font-size: 30px;
  padding: 10px 0;
  .toutiao {
    font-size: 40px;
  }
  span {
    font-size: 30px;
  }
}
.My_flex {
  display: flex;
  text-align: center;
  background-color: #fff;
}
.login {
  position: relative;
  text-align: center;
  // padding: 20% -30%;
  width: 100%;
  height: 400px;
  background: url('@/assets/images/banner.png');
  .My_m_span {
    position: absolute;
    top: 40%;
    left: 80%;
  }
  .My_m_login {
    position: absolute;
    top: 20%;
    left: 10%;
  }
  .My_m_logina {
    position: absolute;
    top: 20%;
    left: 42%;
  }
  .My_m_spana {
    position: absolute;
    top: 36%;
    left: 30%;
    color: #fff;
  }
  .My_m_spanaa {
    position: absolute;
    top: 60%;
    left: 38%;
    color: #fff;
  }
  .My_m_spanb {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    position: absolute;
    left: 1;
    bottom: 0;
    padding-bottom: 15px;
    .My_m_spanc {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      font-size: 30px;
      color: #fff;
    }
  }
}
</style>
