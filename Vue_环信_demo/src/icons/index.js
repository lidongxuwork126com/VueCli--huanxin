import Vue from 'vue'
// 展示svg图标的, svg组件
import SvgIcon from '@/components/SvgIcon'

// 全局注册svg-icon组件
Vue.component('svg-icon', SvgIcon);

// require.context();  一次性引入
// 1.你要引入文件的目录
// 2.是否要查找该目录下的子级目录
// 3.匹配要引入的文件
const req = require.context('./svg', false, /\.svg$/);

// 加载每个.svg文件到内存中
const requireAll = requireContext => {
  // requireContext.keys() 得到数组['./look.svg', './more.svg', './voice.svg']
  requireContext.keys().map(requireContext)
};
requireAll(req);
