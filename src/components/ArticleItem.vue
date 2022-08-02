<template>
  <div>
    <!-- 列表文章 -->
    <!-- 没有图片 -->
    <van-cell
      v-if="articleInfo.cover.type === 0"
      :title="articleInfo.title"
      :label="label"
    />
    <!-- 1张图片 -->
    <van-cell
      v-else-if="articleInfo.cover.type === 1"
      :title="articleInfo.title"
      value="内容"
      :label="label"
    >
      <van-image width="100" height="100" :src="articleInfo.cover.images[0]" />
    </van-cell>
    <!-- 三张图片 -->
    <van-cell v-else :title="articleInfo.title"> </van-cell>
    <div>
      <van-image
        v-for="(item, index) in articleInfo.cover.images"
        :key="index"
        width="100"
        height="100"
        :src="item"
      />
    </div>
    <div>
      <span class="Hmtt_spans">{{ articleInfo.aut_name }}</span> &nbsp;
      <span class="Hmtt_spans">{{ articleInfo.comm_count }}评论</span>&nbsp;
      <span class="Hmtt_spans">{{ articleInfo.pubdate }}</span
      >&nbsp;
    </div>
  </div>
</template>
<script>
export default {
  name: 'ArticleItem',
  props: {
    articleInfo: {
      type: Object,
      // 对象和数组的默认值,比如函数返回值
      default: () => ({})
    }
  },
  data() {
    return {}
  },

  components: {},

  computed: {
    label() {
      const art = this.articleInfo
      return `${art.aut_name} ${art.comm_count} 评论 ${art.pubdate}`
    }
  },

  created() {},

  mounted() {},

  methods: {}
}
</script>
<style lang="less" scoped>
.Hmtt_spans {
  margin-left: 26px;
  font-size: 12px;
  color: #9b9b9d;
}
</style>
