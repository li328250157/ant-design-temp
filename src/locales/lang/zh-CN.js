import antd from 'ant-design-vue/es/locale-provider/zh_CN'
import momentCN from 'moment/locale/zh-cn'
import account from './zh-CN/account'
import dashboard from './zh-CN/dashboard'
import form from './zh-CN/form'
import global from './zh-CN/global'
import menu from './zh-CN/menu'
import result from './zh-CN/result'
import setting from './zh-CN/setting'
import user from './zh-CN/user'


const components = {
  antLocale: antd,
  momentName: 'zh-cn',
  momentLocale: momentCN
}

export default {
  message: '-',

  'layouts.usermenu.dialog.title': '信息',
  'layouts.usermenu.dialog.content': '您确定要注销吗？',
  'layouts.userLayout.title': '代码覆盖率平台',
  ...components,
  ...global,
  ...menu,
  ...setting,
  ...user,
  ...dashboard,
  ...form,
  ...result,
  ...account
}