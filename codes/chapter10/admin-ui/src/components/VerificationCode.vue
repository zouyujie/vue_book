<template>
  <div class="s-canvas">
    <canvas id="s-canvas" :width="contentWidth" :height="contentHeight" />
  </div>
</template>
<script>
export default {
  name: 'VerificationCode',
  props: [
    'identifyCode', // string
    // 'fontSizeMin',
    // 'fontSizeMax',
    // 'backgroundColorMin',
    // 'backgroundColorMax',
    // 'colorMin',
    // 'colorMax',
    // 'lineColorMin',
    // 'lineColorMax',
    // 'dotColorMin',
    // 'dotColorMax',
    'contentWidth', // width  number
    'contentHeight' // height number
  ],
  data() {
    return {
      // identifyCode: "1234",
      fontSizeMin: 20,
      fontSizeMax: 36,
      backgroundColorMin: 248,
      backgroundColorMax: 248,
      colorMin: 50,
      colorMax: 50,
      lineColorMin: 40,
      lineColorMax: 40,
      dotColorMin: 50,
      dotColorMax: 50,
      fixedBgColor: 'rgba(12, 60, 106,1 )',
      fixedFontColr: 'rgba(203,233,255,1)',
      isDrawLine: true,
      isDrawDot: true,
      fixedFontSize: 0,
      fixedLineColor: 'rgba(203,233,255,0.6)',
      fixedDotColor: 'rgba(203,233,255,0.6)'

      // contentWidth: 112,
      // contentHeight: 38
    }
  },
  watch: {
    identifyCode() {
      this.drawPic()
    }
  },
  mounted() {
    this.drawPic()
  },
  methods: {
    // 生成一个随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 生成一个随机的颜色
    randomColor(min, max) {
      const r = this.randomNum(min, max)
      const g = this.randomNum(min, max)
      const b = this.randomNum(min, max)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    },
    drawPic() {
      const canvas = document.getElementById('s-canvas')
      const ctx = canvas.getContext('2d')
      ctx.textBaseline = 'bottom'
      // 绘制背景
      ctx.fillStyle = this.fixedBgColor ? this.fixedBgColor : this.randomColor(this.backgroundColorMin, this.backgroundColorMax)
      ctx.fillRect(0, 0, this.contentWidth, this.contentHeight)
      // 绘制文字
      for (let i = 0; i < this.identifyCode.length; i++) {
        this.drawText(ctx, this.identifyCode[i], i)
      }
      this.isDrawLine && this.drawLine(ctx)
      this.isDrawDot && this.drawDot(ctx)
    },
    drawText(ctx, txt, i) {
      ctx.fillStyle = this.fixedFontColr ? this.fixedFontColr : this.randomColor(this.colorMin, this.colorMax)
      ctx.font = (this.fixedFontSize ? this.fixedFontSize : this.randomNum(this.fontSizeMin, this.fontSizeMax)) + 'px SimHei'
      const x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1))
      const y = this.randomNum(this.fontSizeMax, this.contentHeight - 5)
      var deg = this.randomNum(-45, 45)
      // 修改坐标原点和旋转角度
      ctx.translate(x, y)
      ctx.rotate(deg * Math.PI / 180)
      ctx.fillText(txt, 0, 0)
      // 恢复坐标原点和旋转角度
      ctx.rotate(-deg * Math.PI / 180)
      ctx.translate(-x, -y)
    },
    drawLine(ctx) {
      // 绘制干扰线
      for (let i = 0; i < 8; i++) {
        ctx.strokeStyle = this.fixedLineColor ? this.fixedLineColor : this.randomColor(this.lineColorMin, this.lineColorMax)
        ctx.beginPath()
        ctx.moveTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight))
        ctx.lineTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight))
        ctx.stroke()
      }
    },
    drawDot(ctx) {
      // 绘制干扰点
      for (let i = 0; i < 100; i++) {
        ctx.fillStyle = this.fixedDotColor ? this.fixedDotColor : this.randomColor(0, 255)
        ctx.beginPath()
        ctx.arc(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight), 1, 0, 2 * Math.PI)
        ctx.fill()
      }
    }
  }
}
</script>
