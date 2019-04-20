<!--右边栏信息组件-->
<template>
  <div class="right_chat_wrap">
    <div class="img_wrap">
      <img :src="rightImage" alt="">
    </div>
    <div class="main_content">
      {{content}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "rightMessage",
    props: {
      content: String,
      rightImage: String
    }
  }
</script>

<style scoped>
  .right_chat_wrap {
    overflow: hidden;
  }
  .img_wrap {
    padding: .4rem;
    display: inline-block;
    float: right;
  }
  .main_content {
    float: right;
    position: relative;
    border-radius: 5px;
    box-shadow: 0 0.36rem 0.76rem 0 #eff0f3;
    background-color: #ffffff;
    max-width: 66%;
    padding: .5rem;
    margin: .8rem .5rem 0 1.5rem;
  }
  .main_content:before, .main_content:after{
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    /*三角距离顶部距离*/
    top: .7rem;
    /*三角大小*/
    border: 8px solid transparent;
  }
  .main_content:before {
    /*设置三角位置, 和三角的颜色*/
    right: -16px;
    border-left-color: white;
    z-index: 0;
  }



</style>
