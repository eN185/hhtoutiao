<template>
  <div>
    <div>
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: [''],
  data() {
    return {
      message: ''
    }
  },

  components: {},

  computed: {},

  created() {},

  mounted() {},

  methods: {}
}
</script>
<style lang="less" scoped>
.Nickname {
  margin: 0 10%;
  width: 80%;
  height: 80px;
  font-size: 20px;
  border: 0;
}
</style>
