module.exports = {
    plugins: {
      'postcss-pxtorem': {
        rootValue: ({ file}) => (/vant/i.test(file) ? 37.5 : 75 ),
        // 那些属性需要转成 rem
        propList: ['*']
      }
    }
  }
  