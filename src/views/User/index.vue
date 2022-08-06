<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      :title="$route.meta.title"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 用户信息 -->
    <!-- input:file 的属性 hidden:隐藏input:file -->
    <!-- accept:显示file选择文件的后缀名 -->
    <!-- el.click() -->
    <van-cell title="头像" is-link default @click="$refs.file.click()">
      <van-image round width="0.8rem" height="0.8rem" :src="UserList.photo" />
      <input
        type="file"
        hidden
        accept=".jpg,.png"
        ref="file"
        @change="selectPhoto"
      />
    </van-cell>
    <!-- 头像弹层 -->
    <van-popup
      class="avator-popup"
      v-model="isShowAvator"
      closeable
      :style="{ height: '100%', width: '100%' }"
    >
      <update-avator
        @update-avator="UserList.photo = $event"
        :photo="photo"
        v-if="isShowAvator"
      ></update-avator>
    </van-popup>
    <van-cell
      title="昵称"
      is-link
      :value="UserList.name"
      @click="isShowNickname = true"
    />
    <!-- 呢称弹出层 -->
    <van-popup
      class="avator-popupq"
      v-model="isShowNickname"
      position="bottom"
      :style="{ height: '100%', width: '100%' }"
    >
      <van-nav-bar
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        @click-left="isShowNickname = false"
        @click-right="onClickRight"
      />
      <update-nickname></update-nickname>
    </van-popup>
    <!-- 性别 -->
    <van-cell
      title="性别"
      is-link
      :value="UserList.gender == 1 ? '男' : '女'"
      @click="isShowGender = true"
    />
    <van-popup
      class="avator-popupq"
      v-model="isShowGender"
      position="bottom"
      :style="{ height: '40%', width: '100%' }"
    >
      <van-picker
        title="更新性别"
        show-toolbar
        :columns="areaList"
        @cancel="isShowGender = false"
        @confirm="111"
      />
    </van-popup>
    <!-- 生日 -->
    <van-cell
      title="生日"
      is-link
      :value="UserList.birthday"
      @click="isShowBirthday = true"
    />
    <van-popup
      class="avator-popupq"
      v-model="isShowBirthday"
      position="bottom"
      :style="{ height: '40%', width: '100%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        @cancel="isShowBirthday = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserInfo } from '@/api'
import UpdateAvator from './components/UpdateAvator.vue'
import UpdateNickname from './components/UpdateNickname.vue'
import { resolveToBase64 } from '@/utils' // 图片的处理
export default {
  name: 'User',
  props: [''],
  data() {
    return {
      UserList: {},
      isShowAvator: false, // 图片
      photo: '',
      isShowNickname: false,
      isShowGender: false,
      isShowBirthday: false,
      areaList: ['男', '女'],
      currentDate: ''
    }
  },

  components: {
    UpdateAvator,
    UpdateNickname
  },

  computed: {},

  created() {
    this.getUserInfo()
  },

  mounted() {},

  methods: {
    async getUserInfo() {
      try {
        const { data } = await getUserInfo()
        // console.log(data.data)
        this.UserList = data.data
      } catch (error) {
        this.$toast.fail('加载失败,请刷新~')
      }
    },
    async selectPhoto(e) {
      // 1 获取用户选择的图片的文件对象
      // - e.target 触发事件的元素
      // - file.files 伪数组，存储的用户选择所有的文件对象
      const file = e.target.files[0]
      //   console.log(file)
      // 2 把file文件对象处理成img标签可识别的 url
      // URL.createObjectURL(file对象) --> img标签可识别的 url
      //   const url = window.URL.createObjectURL(file)
      //   console.dir(url)

      //   const fr = new FileReader()
      //   fr.readAsDataURL(file)
      //   fr.onload = (e) => {
      //     this.photo = e.target.result
      //     e.target.value = ''
      //     this.isShowAvator = true
      //   }
      // 3 传递 url
      //   this.photo = url
      //   // 4 清空value，让用户可以选择同一张图片
      //   e.target.value = ''
      //   // 展示弹层组件
      //   this.isShowAvator = true
      const url = await resolveToBase64(file)
      this.photo = url
      e.target.value = ''
      this.isShowAvator = true
    },
    onClickRight() {
      console.log(1)
    }
  }
}
</script>
<style lang="less" scoped>
// :deep(.van-nav-bar[data-v-bc0b5f70]) {
//   background-color: #fff;
// }
// :deep(.van-nav-bar[data-v-bc0b5f70] .van-nav-bar__title) {
//   color: #000;
// }
.van-nav-bar {
  background-color: #3396fc;
  // 穿透样式
  // :deep(穿透的类名)
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
:deep(.van-nav-bar .van-icon) {
  font-size: 40px;
  color: #fff;
}
.avator-popup {
  background-color: rgba(30, 30, 30, 0.2);
}
</style>
