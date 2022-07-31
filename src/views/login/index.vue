<template>
  <div>
    <van-nav-bar :title="$route.meta.title" />
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="输入11位手机号"
        :rules="mobileRules"
      >
        <template #label>
          <i slot="left-icon" class="toutiao toutiao-shouji"></i>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入6位验证码"
        :rules="codeRules"
      >
        <template #label>
          <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        </template>
        <template #button>
          <van-button round type="default" size="mini" class="code-btn"
          native-type="button"
          v-if="isShowCode"
          @click="sendCode"
          >发送验证码</van-button>
          <van-count-down :time="60 * 1000" format="ss秒" @finish="isShowCode = true" v-else/>
        </template>
      </van-field>
      <div style="margin: 0.42rem">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from './rules'
import { login, getCodeAPI } from '@/api'
export default {
  data () {
    return {
      mobile: '',
      code: '',
      codeRules,
      mobileRules,
      isShowCode: true
    }
  },
  methods: {
    loading () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
    },
    async onSubmit () {
      try {
        this.loading()
        const { data: { data: token } } = await login(this.mobile, this.code)
        // console.log(token)
        this.$store.commit('STE_TOKE', token)
        // 跳转到profile网页
        this.$router.push('/ ')
        this.$toast.success('登录成功')
      } catch (error) {
        const status = error.response.status
        let message = '请重新登录'
        if (status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    sendCode () {
      // 1.验证手机号
      this.$refs.form.validate('mobile').then(async () => {
        // console.log(this.$refs.form.validate('mobile'))
        this.loading()
        try {
          // 2. 发送请求
          await getCodeAPI(this.mobile)
          this.$toast.success('获取验证码成功')
          // 3.显示倒计时
          this.isShowCode = false
        } catch (error) {
          const status = error.response.status
          let message = '手机号不正确'
          if (status === 429) {
            message = error.response.data.message
          }
          this.$toast.fail(message)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background-color: #3396fc;
  // 穿透样式
  // :deep(穿透的类名)
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
:deep(.van-field__label) {
  width: 25px;
  margin-right: 30px;
}
.toutiao {
  font-size: 40px;
}
.code-btn {
  &.van-button--mini {
    padding: 0 0.15rem;
  }
  &.van-button--default {
    background-color: #eeee;
    color: #a9929b;
  }
}
</style>
