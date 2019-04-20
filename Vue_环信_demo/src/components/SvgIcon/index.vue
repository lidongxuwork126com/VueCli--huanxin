<!--专门加载字体图标的组件-->
<template>
  <!--$listeners是vue2.4新出, 相当于继承父标签的所有事件, .native事件不可用-->
  <!--svg标签: 绘制矢量图的 HTML5 标签-->
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <!--use标签: 配合svg标签使用, 呈现视图, href指向绘制信息(路径大小等)-->
    <use :xlink:href="iconName"/>
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
