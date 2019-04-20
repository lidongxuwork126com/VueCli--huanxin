<!--左边栏信息组件-->
<template>
  <div class="left_chat_wrap">
    <div class="img_wrap">
      <img :src="leftImage" alt="">
    </div>
    <div class="main_content">
      {{content}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "leftMessage",
    props: {
      content: String,
      leftImage: String,
    }
  }
</script>

<style scoped>
  .left_chat_wrap {
    overflow: hidden;
  }

  .img_wrap {
    padding: .4rem;
    float: left;
  }

  .main_content {
    float: left;
    position: relative;
    border-radius: 5px;
    box-shadow: 0 0.36rem 0.76rem 0 #eff0f3;
    background-color: #ffffff;
    max-width: 66%;
    margin: .8rem .5rem 0 .5rem;;
    padding: .5rem;
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
    left: -16px;
    border-right-color: white;
    z-index: 0;
  }

</style>
