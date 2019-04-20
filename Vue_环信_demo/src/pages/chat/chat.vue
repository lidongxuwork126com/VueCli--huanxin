<!--聊天页-->
<template>
  <div class="chat_wrap">
    <!--聊天内容页-->
    <div ref="chat_main" class="chat_main_content">
      <!--如果做时间, 可以根据最后一次聊天, 和最新一次聊天的时间点判断差值是否显示-->
      <TimeLine/>
      <div class="chat_item"
           v-for="(item, index) in chatData"
           :key="index">

        <right-message rightImage="static/img/cat.png" v-if="item['own']"
                       :content="item['content']"/>
        <left-message leftImage="static/img/dog.png" v-else
                      :content="item['content']"/>
      </div>
    </div>
    <!--底部菜单-->
    <div class="bottom_wrap">
      <svg-icon :iconClass="'voice'"
                :className="'svg-size'"></svg-icon>

      <textarea ref="myTextArea"
                v-model="messageText"
                class="message_input"
                @input="changeTextArea"
                @focus="changeTextArea"
                @blur="clearTime"
                @onkeypress></textarea>

      <div class="send_btn" :class="{'send_btn_ok': content_have}" @click="sendMessage">发送</div>
      <svg-icon :iconClass="'look'"
                :className="'svg-size'"></svg-icon>
      <svg-icon :iconClass="'more'"
                :className="'svg-size'"></svg-icon>
    </div>
  </div>
</template>

<script>
  import LeftMessage from '@/components/chat/leftMessage'
  import RightMessage from '@/components/chat/rightMessage'
  import TimeLine from '@/components/chat/timeLine'
  import {mapGetters} from 'vuex'

  export default {
    name: "chat",
    components: {
      LeftMessage,
      RightMessage,
      TimeLine
    },
    data() {
      return {
        messageText: "",
        heightTimer: -1,
        content_have: false
      }
    },
    computed: {
      ...mapGetters([
        "chatData"
      ])
    },
    mounted() {
      // 6. 注册监听事件(等待别人给我发消息)
      this.$store.dispatch('listenConnect', this.myCon);
      // 7. 登录环信
      // 账号密码, 默认去环信官网, 自己控制台中, 注册个账户
      let options = {
        apiUrl: this.WebIM.config.apiURL,
        user: 'lidongxu',
        pwd: '111111',
        appKey: this.WebIM.config.appkey
      };
      this.myCon.open(options);
      document.onkeypress = this.keypress;
    },
    methods: {
      changeTextArea(ev) {
        let inputEle = ev.target;
        this.heightTimer = setInterval(() => {
          inputEle.style.height = inputEle.scrollHeight + 'px';
        }, 2);
        this.content_have = inputEle.value.length > 0;
      },
      clearTime() {
        clearInterval(this.heightTimer);
      },
      // 阻止submit提交
      sub() {
        return false;
      },
      sendMessage() {
        // 8. 我发送消息了, 更新本地消息数组(vuex)
        this.$store.dispatch("localMessageChange", this.messageText);
        let _that = this;
        // 单聊发送文本消息
        let sendPrivateText = function () {
          // 生成本地消息id
          let id = _that.myCon.getUniqueId();
          // 创建文本消息
          let msg = new _that.WebIM.message('txt', id);
          msg.set({
            // 消息内容
            msg: _that.messageText,
            // 9. 接收消息对象（对方用户名/ID）
            to: 'wangergou',
            roomType: false,
            // 10. 发送成功, 回调
            success: function (id, serverMsgId) {
              console.log('send Success');
            },
            fail: function (e) {
              console.log("Send private text error");
            }
          });
          msg.body.chatType = 'singleChat';
          // 11. 发送这个文本消息
          _that.myCon.send(msg.body);
        };
        sendPrivateText();
        // 获取滚动条, 滚动到最底部
        this.$el.getElementsByClassName("chat_main_content")[0].scrollTop = this.$refs.chat_main.scrollHeight;
      }
    }

  }
</script>

<style scoped>
  .chat_wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .chat_main_content {
    flex: 1;
    overflow: scroll;
    background-color: #ededed;
  }

  .chat_item {
    margin-top: 1.5rem;
  }

  .bottom_wrap {
    background-color: #f6f6f6;
    display: flex;
    align-items: flex-end;
    padding: .4rem 0;
  }

  .svg-size {
    font-size: 2rem;
    display: inline-block;
    vertical-align: bottom;
    margin: 0 .4rem;
  }

  .message_input {
    flex: 1;
    height: 2.1rem;
    width: 100%;
    display: inline-block;
    vertical-align: bottom;
    padding: .4rem .4rem;
    box-sizing: border-box;
    outline: none;
    overflow: scroll;
    overflow-y: hidden;
    overflow-x: hidden;
    font-size: 1.1rem;
    line-height: normal;
    /*适配不超过5行的高度*/
    max-height: 6.8rem;
  }

  .my_form {
    flex: 1;
  }

  .send_btn {
    display: inline-block;
    padding: 0 0 .3rem .4rem;
    color: lightgray;
  }

  .send_btn_ok {
    color: black;
  }
</style>
