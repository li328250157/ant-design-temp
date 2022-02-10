import antdEnUS from 'ant-design-vue/es/locale-provider/en_US'
import momentEU from 'moment/locale/eu'
import account from './en-US/account'
import dashboard from './en-US/dashboard'
import form from './en-US/form'
import global from './en-US/global'
import menu from './en-US/menu'
import result from './en-US/result'
import setting from './en-US/setting'
import user from './en-US/user'



const components = {
  antLocale: antdEnUS,
  momentName: 'eu',
  momentLocale: momentEU
}

export default {
  message: '-',

  'layouts.usermenu.dialog.title': 'Message',
  'layouts.usermenu.dialog.content': 'Are you sure you would like to logout?',
  'layouts.userLayout.title': 'Coverage Real-Time',
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