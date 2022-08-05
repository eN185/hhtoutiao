<template>
  <div>
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="loadNextPageArticle"
      success-text="刷新成功"
    >
      <van-list
        v-model="loading"
        @load="loadNextPageArticle"
        offset="0"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :immediate-check="false"
        :finished="isFinished"
        finished-text="没有更多了~"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleAPI } from '@/api'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  naem: 'ArticleList',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      articles: [],
      loading: false,
      isFinished: false,
      error: false,
      refreshLoading: false
    }
  },

  components: {
    ArticleItem
  },

  computed: {},

  created() {
    this.getFirstPageArticle()
  },

  mounted() {},

  methods: {
    // 获取第一页数据
    async getFirstPageArticle() {
      try {
        const { data } = await getArticleAPI(this.id, +new DataTransfer())
        // console.log(data)
        this.articles = data.data.results
        // 保存下一页时间戳
        this.pre_timestamp = data.data.pre_timestamp
      } catch (e) {
        // 提示刷新重新获取
        this.$toast.fail('请刷新列表')
      }
    },
    // 加载下一页
    async loadNextPageArticle() {
      try {
        // 发起请求
        const { data } = await getArticleAPI(this.id, this.pre_timestamp)
        const timestamp = data.data.pre_timestamp
        const results = data.data.results
        // 判断是否加载完成
        if (timestamp === null) {
          this.isFinished = true
        }
        if (this.refreshLoading) {
          this.articles.unshift(...results)
        } else {
          // 储存数据
          this.articles.push(...results)
        }
        // 更新时间戳
        this.pre_timestamp = timestamp

        console.log(data)
      } catch (error) {
        this.error = true
      } finally {
        // 更新 loading
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
