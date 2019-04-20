import Vuex from 'vuex'
import Vue from 'vue'
import getters from "./getters"
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    // 保存聊天数据
    chatData: [
      {
        'type': "text",
        "own": true,
        "content": "晚上吃饭了嘛?"
      },
      {
        'type': "text",
        "own": false,
        "content": "还没吃呢, 你准备请我吃点什么?"
      },
      {
        'type': "text",
        "own": true,
        "content": "吃饭之前, 先念诗吧"
      },
      {
        'type': "text",
        "own": false,
        "content": "\n" +
        "人生若只如初见，何事秋风悲画扇。\n" +
        "等闲变却故人心，却道故人心易变。\n" +
        "骊山语罢清宵半，泪雨零铃终不怨。\n" +
        "何如薄幸锦衣郎，比翼连枝当日愿。"
      }
    ],
  },
  mutations: {
    changeMessage(state, dataObj) {
      state.chatData.push(dataObj);
    }
  },
  actions: {
    // 4. 注册发送消息, 监听事件
    listenConnect({commit}, state) {
      let conn = state;
      conn.listen({
        onOpened: function (message) {
          // 连接成功回调
          // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
          // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true, 则无需调用conn.setPresence();
        },
        onClosed: function (message) {
          //连接关闭回调
        },
        onTextMessage: function (message) {
          // 收到文本消息
          // 注意对象key关键字和chat里要解析时用的key保持一致
          commit('changeMessage', {
            // 消息类型
            'type': "text",
            // 是否是自己发送的(false代表接收他人消息)
            "own": false,
            // 具体消息值
            "content": message['data']
          });
        },
        onEmojiMessage: function (message) {
          //收到表情消息
        },
        onPictureMessage: function (message) {
          //收到图片消息
        },
        onCmdMessage: function (message) {
          //收到命令消息
        },
        onAudioMessage: function (message) {
          //收到音频消息
        },
        onLocationMessage: function (message) {
          //收到位置消息
        },
        onFileMessage: function (message) {
          //收到文件消息
        },
        onVideoMessage: function (message) {
          // 收到视频消息
          let node = document.getElementById('privateVideo');
          let option = {
            url: message.url,
            headers: {
              'Accept': 'audio/mp4'
            },
            onFileDownloadComplete: function (response) {
              // 文件下载完成
              node.src = WebIM.utils.parseDownloadResponse.call(conn, response);
            },
            onFileDownloadError: function () {
              // 文件下载错误
              console.log('File down load error.')
            }
          };
          WebIM.utils.download.call(conn, option);
        },
        onPresence: function (message) {
          //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
        },
        onRoster: function (message) {
          //处理好友申请
        },
        onInviteMessage: function (message) {
          //处理群组邀请
        },
        onOnline: function () {
          //本机网络连接成功
        },
        onOffline: function () {
          //本机网络掉线
        },
        onError: function (message) {
          //失败回调
        },
        onBlacklistUpdate: function (list) {
          // 黑名单变动
          // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
          console.log(list);
        },
        onReceivedMessage: function (message) {
          //收到消息送达服务器回执
        },
        onDeliveredMessage: function (message) {
          //收到消息送达客户端回执
        },
        onReadMessage: function (message) {
          //收到消息已读回执
        },
        onCreateGroup: function (message) {
          //创建群组成功回执（需调用createGroupNew）
        },
        onMutedMessage: function (message) {
          //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
        }
        // 其他方法见文档
      });
    },
    // 5. 本地发送消息变更事件
    async localMessageChange({commit}, state) {
      commit('changeMessage', {
        'type': "text",
        "own": true,
        "content": state
      });
    }
  },
  getters
});
