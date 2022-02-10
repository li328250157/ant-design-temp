// with polyfills
import '@/assets/css/index.css'
import {
    FormModel,
    Tree,
    Cascader,
    TreeSelect
} from 'ant-design-vue'
import notification from 'ant-design-vue/es/notification'
import message from 'ant-design-vue/es/message'
import 'core-js/stable'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import VueWorker from 'vue-worker'
import themePluginConfig from '../config/themePluginConfig'
import App from './App.vue'
import ProLayout, {
    PageHeaderWrapper
} from './components/es'
import bootstrap from './core/bootstrap'
import './core/lazy_use' // use lazy load components
import './global.less' // global style
import i18n from './locales'
import './permission' // permission control
import router from './router'
import store from './store/'
import './utils/code_fomatter'
import './utils/compare'
import './utils/filter' // global filter
import plugins from './utils/plugins'
import {
    VueAxios
} from './utils/request'
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import VueClipboard from 'vue-clipboard2'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

Vue.directive('highlight', function(el, obj) {
    const blocks = el.querySelectorAll('pre code')
    blocks.forEach(block => {
        hljs.highlightBlock(block)
    })
})
Vue.use(VueVirtualScroller)
Vue.use(VueClipboard)
Vue.use(VXETable)
// mount axios to `Vue.$http` and `this.$http`
Vue.use(plugins)
Vue.use(VueAxios)
Vue.use(Tree)
Vue.use(TreeSelect)
Vue.use(Cascader)
Vue.use(ElementUI)
Vue.use(FormModel)
Vue.use(VueWorker)
// use pro-layout components
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)
Vue.prototype.$message = notification
Vue.prototype.$tips = message
window.umi_plugin_ant_themeVar = themePluginConfig.theme

new Vue({
    router,
    store,
    i18n,
    // init localstorage, vuex
    created: bootstrap,
    render: h => h(App)
}).$mount('#app')