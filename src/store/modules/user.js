import {
  getInfo,
  login
} from '@/api/login'
import {
  ACCESS_TOKEN,
  USERID,
  USERNAME
} from '@/store/mutation-types'
import {
  welcome
} from '@/utils/util'
import Cookies from 'js-cookie'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, {
      name,
      welcome
    }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response.data.data
          Cookies.set(ACCESS_TOKEN, result.sessionKey, {
            expires: 1
          })
          Cookies.set(USERID, result.userName, {
            expires: 1
          })
          Cookies.set(USERNAME, result.displayName, {
            expires: 1
          })
          commit('SET_TOKEN', result.sessionKey)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({
      commit
    }, userId) {
      return new Promise((resolve, reject) => {
        // getInfo({
        //   userId: userId
        // }).then(response => {
          let res = {}
          // if (response.data.ifAdmin){
          if (true){
             res = {
              'id': 'admin',
              'name': '管理员',
              'describe': '拥有所有权限',
              'permissions': [{
                'roleId': 'admin',
                'permissionId': 'admin',
                'permissionName': '管理员',
              }]
            }
          }else{
             res = {
              'id': 'user',
              'name': '用户',
              'describe': '拥有正常权限',
              'permissions': [{
                'roleId': 'user',
                'permissionId': 'user',
                'permissionName': '用户',
              }]
            }
          }
          // const result = response.result
          const result = {
            role: res
          }
          if (result.role && result.role.permissions.length > 0) {
            const role = result.role
            role.permissions = result.role.permissions
            role.permissions.map(per => {
              if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                const action = per.actionEntitySet.map(action => {
                  return action.action
                })
                per.actionList = action
              }
            })
            role.permissionList = role.permissions.map(permission => {
              return permission.permissionId
            })
            commit('SET_ROLES', result.role)
            commit('SET_INFO', result)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }

          commit('SET_NAME', {
            name: result.name,
            welcome: welcome()
          })
          commit('SET_AVATAR', result.avatar)

          // resolve(response)
          resolve({
            result: result
          })
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 登出
    Logout({
      commit,
      state
    }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        Cookies.remove(ACCESS_TOKEN)
        Cookies.remove(USERID)
        resolve()
      })
    }

  }
}

export default user