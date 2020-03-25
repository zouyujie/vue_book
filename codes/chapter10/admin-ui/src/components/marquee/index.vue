<template>
  <div>{{content}}</div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: ''
    },
    speed: {
      type: Number,
      default: 300
    }
  },
  data: {
    intivend: null  // 在data 上定义一个定时器id
  },
  created () {
    this.start();
  },
  methods: {
    start () {
      if (!this.content) {
        return;
      }
      if (this.intivend != null) {
        return;
      }
      this.intivend = setInterval(() => {
        //获取到头的第一个字符
        var start = this.content.substring(0, 1)
        //获取到后面所有的字符
        var end = this.content.substring(1)
        //重新拼接得到新的字符串，并复制给this.msg
        this.content = end + start
        // 注意： vue 实例会监听自己身上 data 中所有数据的改变，只要数据一
        // 发生变化,就会自动将数据同步到页面中去【程序员只需要关心数据，不需要考虑如何渲染到页面】
      }, this.speed)
    },
    end () { //停止定时器
      clearInterval(this.intivend)
      this.intivend = null //每当清除了定时器之后，需要重新把intivend变为null
    }
  },
  destroyed () {
    this.end();
  },
}
</script>

<style lang="scss" scoped>
</style>