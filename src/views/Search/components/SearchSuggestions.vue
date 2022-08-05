<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in highlightSuggestions"
      :key="index"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggetionsAPI } from '@/api'
import { debounce } from 'lodash'
export default {
  name: '',
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler() {
        this.getSearchSuggetion()
      }
    }
  },

  components: {},

  computed: {
    highlightSuggestions() {
      const reg = new RegExp(this.keywords, 'ig')
      // map :映射，返回一个新数组，新数组的长度和原数组一致
      return this.suggestions.map((item) =>
        item.replace(reg, (match) => `<span style="color:red">${match}</span>`)
      )
      // return this.suggestions.map((item) => {
      //   return item.replace(reg, (match) => {
      //     return `<span style="color:red">${match}</span>`
      //   })
      // })
    }
  },

  created() {},

  mounted() {},

  methods: {
    // 获取搜索建议
    getSearchSuggetion: debounce(async function () {
      try {
        const { data } = await getSearchSuggetionsAPI(this.keywords)
        console.log(data)
        // this.suggestions = data.data.options.filter((str) => str != null)
        // this.suggestions = data.data.options.filter((str) => Boolean(str))
        this.suggestions = data.data.options.filter(Boolean)
      } catch (error) {
        this.$toast.fail('获取数据失败')
      }
      // clearTimeout(this.id) // 干掉上一次的定时器 clearTimeout(this.id)
      // this.id = setTimeout(async () => {
      //   // 防抖 setTimeout 延迟执行
      //
      // }, 600)
    }, 600)
  }
}
</script>
<style lang="less" scoped></style>
