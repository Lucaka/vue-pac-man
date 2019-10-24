import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

// Vue全局註冊
Vue.component('svg-icon', SvgIcon);

const requireAll = requireContext => requireContext.keys().map(requireContext);

// 收尋檔案路徑 , true:所有子資料夾內容 false:只收尋svg目錄 , 以.svg 結尾的檔案
const req = require.context('./svg', false, /\.svg$/);

console.log(req);

requireAll(req);
