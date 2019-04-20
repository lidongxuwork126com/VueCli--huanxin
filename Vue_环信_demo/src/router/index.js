import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@/pages/chat/chat'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Chat',
      component: Chat
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

export default router;
