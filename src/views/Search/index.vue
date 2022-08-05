<template>
  <div>
    <!-- 搜索框 -->
    <!--  form 的作用是在ios系统下键盘出现搜索按钮 -->
    <form action="/">
      <van-search
        v-model.trim="keywords"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        class="search"
        @search="onSearch"
        @focus="onSearchFocus"
        @cancel="cancelFn"
      />
    </form>
    <!-- 搜索历史/建议/结果 -->
    <component :is="componentName" :keywords="keywords"></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResults from './components/SearchResults.vue'
import SearchSuggestions from './components/SearchSuggestions.vue'
export default {
  name: 'Search',
  props: [''],
  data() {
    return {
      keywords: '',
      // 用于记录用户是否搜索了
      isShowSearchResults: false
    }
  },

  components: {
    SearchHistory, // 搜索历史
    SearchResults, // 搜索结果
    SearchSuggestions // 搜索建议
  },

  computed: {
    componentName() {
      // 如果输入的是空字符串那么渲染搜索历史
      if (this.keywords === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResults) {
        // 用变量记录是否显示渲染搜索结果
        return 'SearchResults'
      }
      // 渲染搜索建议
      return 'SearchSuggestions'
    }
  },

  created() {},

  mounted() {},

  methods: {
    onSearch() {
      console.log('搜索成功')
      // 用户搜索了，显示搜索结果
      this.isShowSearchResults = true
    },
    // 当用户聚焦了搜索框
    onSearchFocus() {
      // 如果 keywords为 '' 显示搜索历史
      // 如果 keywords有值， 显示搜索建议
      this.isShowSearchResults = false
    },
    cancelFn() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
