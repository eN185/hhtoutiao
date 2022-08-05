<template>
  <div class="channel">
    <van-cell title="我的频道">
      <van-button
        round
        size="small"
        class="edit-btn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <!-- 我频道 -->
    <van-grid gutter="0.1rem">
      <van-grid-item
        :text="item.name"
        v-for="(item, index) in myChannels"
        :key="item.id"
        :class="['myChannel-item', { active: item.name === '推荐' }]"
        @click="changeActive(index, item)"
      >
        <template #icon>
          <van-icon
            name="cross"
            v-show="isEdit && item.name !== '推荐'"
            class="myChannel-icon"
          ></van-icon>
        </template>
      </van-grid-item>
    </van-grid>
    <!--  推荐频道 -->
    <van-cell title="推荐频道"> </van-cell>
    <van-grid gutter="0.1rem">
      <van-grid-item
        :text="item.name"
        v-for="item in recommendChannels"
        :key="item.id"
        icon="plus"
        class="recommend-item"
        @click="$emit('add-channel', item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api'
export default {
  name: 'ChannelPopup',
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      isEdit: false,
      allChannels: []
    }
  },

  components: {},

  computed: {
    // 如果说，我的频道里 aItem
    // const results = !!this.myChannels.find((mItem) => aItem.id === mItem.id)
    // if(results) {
    //   return false
    // }else{
    //   return true
    // }
    recommendChannels() {
      // 所有频道减去我的频道 减-->删选
      // 如果 aItem在myChannels数组里出现了，就过滤掉
      return this.allChannels.filter(
        (aItem) => !this.myChannels.find((mItem) => aItem.id === mItem.id)
      )
    }
  },

  created() {
    this.getAllChannels()
  },

  mounted() {},

  methods: {
    // 请求所有频道
    async getAllChannels() {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
        // console.log(data)
      } catch (e) {
        this.$toast.fail('请重新加载~')
      }
    },
    changeActive(index, item) {
      if (this.isEdit) {
        if (item.name === '推荐') return
        // 删除我的频道
        this.$emit('del-channel', item.id)
        // console.log(item.name)
      } else {
        // 关闭频道
        this.$emit('close')
        // console.log(this.$parent.$parent)
        // this.$parent.$parent.show = false
        // 切换tab active
        this.$emit('change-active', index)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.active {
  :deep(.van-grid-item__text) {
    color: red;
  }
}
.channel {
  padding-top: 1.33333rem;
  .edit-btn {
    width: 104px;
    height: 48px;
    color: red;
    border-color: red;
  }
}
:deep(.van-grid-item__content) {
  background-color: #eee;
}
.recommend-item {
  :deep(.van-grid-item__content) {
    flex-direction: row;
    align-items: center;
  }
  :deep(.van-grid-item__icon) {
    font-size: 40px;
  }
  :deep(.van-grid-item__icon + .van-grid-item__text) {
    margin-top: 0;
  }
}
:deep(.myChannel-item) {
  position: relative;

  .myChannel-icon {
    position: absolute;
    right: -75px;
    top: -20px;
    font-size: 30px;
    color: #676666;
    transform: translate(45%, -50%);
    border: 2px solid #676666;
    border-radius: 50%;
    z-index: 666;
  }
}
</style>
