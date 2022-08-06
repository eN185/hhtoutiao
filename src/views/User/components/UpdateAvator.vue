<template>
  <div class="update-avator">
    <img :src="photo" class="img" ref="image" />
    <div class="footer">
      <span @click="$parent.$parent.isShowAvator = false">取消</span>
      <span @click="uploadAvator">确定</span>
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { uploadAvator } from '@/api'
export default {
  name: '',
  props: {
    photo: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },

  components: {},

  computed: {},

  created() {},

  mounted() {
    this.init()
  },

  methods: {
    init() {
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        dragMode: 'none',
        initialAspectRatio: 1,
        aspectRatio: 1,
        preview: '.before',
        background: false,
        autoCropArea: 0.6,
        zoomOnWheel: false
      })
    },
    // 上传头像
    uploadAvator() {
      // 1.获取裁剪后的图像的 file 对象
      this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
        this.$toast.loading({
          message: '图片正在上传~~',
          forbidClick: true
        })
        try {
          // 2. 发送请求
          const { data } = await uploadAvator(blob)
          console.log(data)
          // 3. 更改父组件里的头像
          this.$emit('update-avator', data.data.photo)
          // 4. 关闭弹层
          this.$parent.$parent.isShowAvator = false
          // 5. $toast 提示
          this.$toast.success('图片上传成功')
        } catch (e) {
          this.$toast.fail('图片上传失败')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.update-avator {
  height: 100%;
  width: 100%;
  position: relative;
  .img {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 65%;
  }
}
.footer {
  position: fixed;
  bottom: 10px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-size: 40px;
}
</style>
