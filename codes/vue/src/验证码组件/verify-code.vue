<template>
  <div class="drag-verify-container">
    <div :style="dragVerifyImgStyle">
      <img ref="checkImg" :src="imgsrc" class="check-img" :class="{ goOrigin: isOk }" :style="imgStyle" alt="" @load="checkimgLoaded" />
      <div v-if="showTips && isPassing" class="tips success">{{ successTip }}</div>
      <div v-if="showTips && !isPassing && showErrorTip" class="tips danger">{{ failTip }}</div>
    </div>
    <div
      ref="dragVerify"
      class="drag_verify"
      :style="dragVerifyStyle"
      @mousemove="dragMoving"
      @mouseup="dragFinish"
      @mouseleave="dragFinish"
      @touchmove="dragMoving"
      @touchend="dragFinish"
    >
      <div ref="progressBar" class="dv_progress_bar" :class="{ goFirst2: isOk }" :style="progressBarStyle">
        {{ successMessage }}
      </div>
      <div ref="message" class="dv_text" :style="textStyle">
        {{ message }}
      </div>

      <div
        ref="handler"
        class="dv_handler dv_handler_bg"
        :class="{ goFirst: isOk }"
        :style="handlerStyle"
        @mousedown="dragStart"
        @touchstart="dragStart"
      >
        &gt;&gt;
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, StyleValue } from 'vue'

export default defineComponent({
  props: {
    isPassing: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 250,
    },
    height: {
      type: Number,
      default: 40,
    },
    text: {
      type: String,
      // default: 'swiping to the right side',
      default: '按住滑块将图片旋转至正确方向',
    },
    successText: {
      type: String,
      default: 'success',
    },
    background: {
      type: String,
      default: '#eee',
    },
    progressBarBg: {
      type: String,
      default: '#76c61d',
    },
    completedBg: {
      type: String,
      default: '#76c61d',
    },
    circle: {
      type: Boolean,
      default: false,
    },
    radius: {
      type: String,
      default: '4px',
    },
    handlerIcon: {
      type: String,
      default: '',
    },
    successIcon: {
      type: String,
      default: '',
    },
    handlerBg: {
      type: String,
      default: '#FFBE40',
    },
    textSize: {
      type: String,
      default: '14px',
    },
    textColor: {
      type: String,
      default: '#333',
    },
    imgsrc: {
      type: String,
      default: '',
    },
    showTips: {
      type: Boolean,
      default: true,
    },
    successTip: {
      type: String,
      default: '验证通过',
    },
    failTip: {
      type: String,
      default: '验证失败',
    },
    minDegree: {
      type: Number,
      default: 90,
    },
    maxDegree: {
      type: Number,
      default: 270,
    },
  },
  emits: ['refresh', 'handlerMove', 'postRotate', 'update:isPassing', 'passcallback', 'passfail'],
  data() {
    return {
      isMoving: false,
      x: 0,
      isOk: false,
      showBar: false,
      showErrorTip: false,
      ranRotate: 0,
      cRotate: 0,
      imgStyle: {},
    }
  },
  computed: {
    handlerStyle() {
      return {
        width: `${this.height}px`,
        height: `${this.height}px`,
        background: this.handlerBg,
      }
    },
    message() {
      return this.isPassing ? '' : this.text
    },
    successMessage() {
      return this.isPassing ? this.successText : ''
    },
    dragVerifyStyle() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
        lineHeight: `${this.height}px`,
        background: this.background,
        borderRadius: this.circle ? `${this.height / 2}px` : this.radius,
      }
    },
    dragVerifyImgStyle() {
      return {
        width: `${this.width}px`,
        height: `${this.width}px`,
        position: 'relative',
        overflow: 'hidden',
        'border-radius': '50%',
      } as StyleValue
    },
    progressBarStyle() {
      return {
        background: this.progressBarBg,
        height: `${this.height}px`,
        borderRadius: this.circle ? `${this.height / 2}px 0 0 ${this.height / 2}px` : this.radius,
      }
    },
    textStyle() {
      console.log(`${this.height}px`, `${this.width}px`, this.textSize)
      return {
        height: `${this.height}px`,
        width: `${this.width}px`,
        fontSize: this.textSize,
      }
    },
    factor() {
      // 避免指定旋转角度时一直拖动到最右侧才验证通过
      if (this.minDegree === this.maxDegree) {
        return Math.floor(1 + Math.random() * 6) / 10 + 1
      }
      return 1
    },
  },
  watch: {
    imgsrc: {
      immediate: false,
      handler() {
        this.reImg()
      },
    },
  },
  mounted() {
    const dragEl = this.$refs.dragVerify as HTMLDivElement
    dragEl.style.setProperty('--textColor', this.textColor)
    dragEl.style.setProperty('--width', `${Math.floor(this.width / 2)}px`)
    dragEl.style.setProperty('--pwidth', `${-Math.floor(this.width / 2)}px`)
  },
  unmounted() {
    console.log('12323')
  },
  methods: {
    checkimgLoaded() {
      this.ranRotate = 120
    },
    dragStart(e: any) {
      if (!this.isPassing) {
        this.isMoving = true
        this.x = e.pageX || e.touches[0].pageX
      }
      this.showBar = true
      this.showErrorTip = false
      this.$emit('handlerMove')
    },
    dragMoving(e: any) {
      if (this.isMoving && !this.isPassing) {
        const _x = (e.pageX || e.touches[0].pageX) - this.x
        const handler = this.$refs.handler as HTMLDivElement
        handler.style.left = `${_x}px`
        ;(this.$refs.progressBar as HTMLDivElement).style.width = `${_x + this.height / 2}px`
        const cRotate = Math.ceil((_x / (this.width - this.height)) * this.maxDegree * this.factor)
        this.cRotate = cRotate
        const rotate = cRotate
        this.imgStyle = {
          transform: `rotateZ(${rotate}deg)`,
        }
      }
    },
    resetStatus() {
      this.showErrorTip = false
    },
    dragFinish() {
      if (this.isMoving && !this.isPassing) {
        this.$emit('postRotate', this.cRotate)
        this.isMoving = false
      }
    },
    setFinish(val: boolean) {
      if (val) {
        this.passVerify()
        return
      }
      this.isOk = true
      this.imgStyle = {
        transform: `rotateZ(${this.ranRotate}deg)`,
      }
      const that = this
      setTimeout(() => {
        const handler = that.$refs.handler as HTMLDivElement
        const progressBar = that.$refs.progressBar as HTMLDivElement
        handler.style.left = '0'
        progressBar.style.width = '0'
        that.isOk = false
      }, 500)
      this.showErrorTip = true
      this.$emit('update:isPassing', false)
      this.$emit('passfail')
    },
    passVerify() {
      this.$emit('update:isPassing', true)
      this.isMoving = false
      const handler = this.$refs.handler as HTMLDivElement
      ;(this.$refs.progressBar as HTMLDivElement).style.background = this.completedBg
      ;(
        this.$refs.message as HTMLDivElement & {
          style: {
            '-webkit-text-fill-color': string
          }
        }
      ).style['-webkit-text-fill-color'] = 'unset'
      ;(this.$refs.message as HTMLDivElement).style.animation = 'slidetounlock2 3s infinite'
      ;(this.$refs.progressBar as HTMLDivElement).style.color = '#fff'
      ;(this.$refs.progressBar as HTMLDivElement).style.fontSize = this.textSize
      this.$emit('passcallback')
    },
    reset() {
      this.reImg()
      this.checkimgLoaded()
    },
    reImg() {
      this.$emit('update:isPassing', false)
      const oriData = this.$options.data
      for (const key in oriData) {
        if (Object.prototype.hasOwnProperty.call(oriData, key)) {
          // tslint:disable-next-line
          const iKey = key as keyof typeof oriData
          const v = oriData[iKey] as any
          const tKey = iKey as 'isOk'
          this[tKey] = v
        }
      }
      const handler = this.$refs.handler as HTMLDivElement
      const message = this.$refs.message as HTMLDivElement & {
        style: {
          '-webkit-text-fill-color': string
        }
      }
      const progress = this.$refs.progressBar as HTMLDivElement
      handler.style.left = '0'
      progress.style.width = '0'
      message.style['-webkit-text-fill-color'] = 'transparent'
      message.style.animation = 'slidetounlock 3s infinite'
      message.style.color = this.background
    },
    refreshimg() {
      this.$emit('refresh')
    },
  },
})
</script>
<style scoped>
.drag_verify {
  position: relative;
  background-color: #e8e8e8;
  text-align: center;
  overflow: hidden;
  top: 5px;
}
.drag_verify .dv_handler {
  position: absolute;
  top: 0px;
  left: 0px;
  cursor: move;
  color: #fff;
}
.drag_verify .dv_handler i {
  color: #666;
  padding-left: 0;
  font-size: 16px;
}
.drag_verify .dv_handler .el-icon-circle-check {
  color: #6c6;
  margin-top: 9px;
}
.drag_verify .dv_progress_bar {
  position: absolute;
  height: 34px;
  width: 0px;
}
.drag_verify .dv_text {
  position: absolute;
  top: 0px;
  color: transparent;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  -o-user-select: none;
  -ms-user-select: none;
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(0, var(--textColor)),
    color-stop(0.4, var(--textColor)),
    color-stop(0.5, #fff),
    color-stop(0.6, var(--textColor)),
    color-stop(1, var(--textColor))
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-size-adjust: none;
  animation: slidetounlock 3s infinite;
  padding-left: 15px;
}
.drag_verify .dv_text * {
  -webkit-text-fill-color: var(--textColor);
}
.goFirst {
  left: 0px !important;
  transition: left 0.5s;
}
.goOrigin {
  transition: transform 0.5s;
}
.goKeep {
  transition: left 0.2s;
}
.goFirst2 {
  width: 0px !important;
  transition: width 0.5s;
}
.drag-verify-container {
  position: relative;
  line-height: 0;
  border-radius: 50%;
  padding: 13px 35px;
}
.move-bar {
  position: absolute;
  z-index: 100;
}
.clip-bar {
  position: absolute;
  background: rgba(255, 255, 255, 0.8);
}
.refresh {
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
  font-size: 20px;
  z-index: 200;
}
.tips {
  position: absolute;
  bottom: 25px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  width: 100%;
  font-size: 12px;
  z-index: 200;
}
.tips.success {
  background: rgba(255, 255, 255, 0.6);
  color: green;
}
.tips.danger {
  background: rgba(0, 0, 0, 0.6);
  color: yellow;
}
.check-img {
  width: 140%;
  border-radius: 50%;
  margin-left: -20%;
  margin-top: -20%;
  max-width: fit-content;
  left: 0;
  top: 0;
  position: absolute;
}
</style>
<style>
@-webkit-keyframes slidetounlock {
  0% {
    background-position: var(--pwidth) 0;
  }
  100% {
    background-position: var(--width) 0;
  }
}
@-webkit-keyframes slidetounlock2 {
  0% {
    background-position: var(--pwidth) 0;
  }
  100% {
    background-position: var(--pwidth) 0;
  }
}
</style>
