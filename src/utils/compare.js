const GLOBAL_CONST = {
  Guest: 10,
  Reporter: 20,
  Developer: 30,
  Master: 40,
  Owner: 50,
  USER_INFO: 'userInfo',
  USER_ID: 'userId',
  USER_NAME: 'userName',
  USER_PERMISSION_INFO: 'upi',
  USER_COOKIE_NAME: 'user',
  ALL_ROUTER: 'allRouter',
  SUPPORT_LANGUAGE: ['scala', 'sql', 'swift', 'scss', 'php', 'properties', 'json', 'markdown', 'xml', 'java', 'javascript', 'cpp', 'css', 'html', 'go', 'python', 'c', 'kotlin', 'shell', 'gradle', 'plaintext'],
  SEARCH_STATUS_OPTIONS: [{
      searchStatusName: '全部',
      searchStatus: -1
    },
    {
      searchStatusName: '待发起',
      searchStatus: 0
    },
    {
      searchStatusName: '评审中',
      searchStatus: 1
    },
    {
      searchStatusName: '待入库',
      searchStatus: 3
    },
    {
      searchStatusName: '已入库',
      searchStatus: 4
    },
    {
      searchStatusName: '已废弃',
      searchStatus: 2
    }
  ],

  USER_ACCESS_LEVEL: [{
      gitlabAccessLevel: 'Guest',
      accessValue: 10
    },
    {
      gitlabAccessLevel: 'Reporter',
      accessValue: 20
    },
    {
      gitlabAccessLevel: 'Developer',
      accessValue: 30
    },
    {
      gitlabAccessLevel: 'Master',
      accessValue: 40
    },
    {
      gitlabAccessLevel: 'Owner',
      accessValue: 50
    },
  ]
}
global.GLOBAL_CONST = GLOBAL_CONST

global.$utils = {
  copy(str) {
    let oInput = document.createElement('input')
    oInput.value = str
    document.body.appendChild(oInput)
    oInput.select()
    document.execCommand('Copy')
    oInput.style.display = 'none'
    document.body.removeChild(oInput)
  },
  saveServeTime(time) {
    $utils.saveStorage('serverTime', time)
  },
  getServeTime() {
    let serverTime = $utils.getStorage('serverTime')
    if (!serverTime) {
      return new Date().getTime()
    }
    return serverTime
  },

  copyObject(obj) {
    if (!obj) {
      return obj
    }
    if (typeof (obj) === 'object') {
      return JSON.parse(JSON.stringify(obj))
    } else {
      return obj
    }
  },
  getStorage(key, defaultValue = null) {
    let item = window.localStorage.getItem(key)
    if (!item) {
      return defaultValue
    }
    return JSON.parse(item)
  },
  translateReviewStatus(status) {
    for (let item of GLOBAL_CONST.SEARCH_STATUS_OPTIONS) {
      if (item.searchStatus == status) {
        return item.searchStatusName
      }
    }
    return '未知评审状态'
  },
  add0(m) {
    return m < 10 ? '0' + m : m
  },
  getFullTime(timeStamp) {
    var time = new Date(timeStamp)
    var day = time.getDate()
    var year = time.getFullYear()
    var month = time.getMonth() + 1
    var h = time.getHours()
    var mm = time.getMinutes()
    var s = time.getSeconds()
    let fullTime = year + '-' + this.add0(month) + '-' + this.add0(day) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s)
    return fullTime
  },

  getBeforeFormatTime(timeInMill) {
    // 如果是秒的话修正一下
    if (timeInMill < 2000000000) {
      timeInMill = timeInMill * 1000
    }
    let serverTime = $utils.getServeTime()
    let updateTime = (serverTime - timeInMill) / 1000 / 60 // 分钟
    // 修正可能为负数的情况
    updateTime = Math.abs(updateTime)
    if (updateTime < 60) {
      return updateTime.toString().split('.')[0] + '分钟前'
    } else if ((updateTime / 60) < 24) {
      return (updateTime / 60).toString().split('.')[0] + '小时前'
    } else if ((updateTime / 60) >= 24 && (updateTime / 60 / 24) < 30) {
      return (updateTime / 60 / 24).toString().split('.')[0] + '天前'
    } else if ((updateTime / 60 / 24) >= 30 && (updateTime / 60 / 24 / 30) < 12) {
      return (updateTime / 60 / 24 / 30).toString().split('.')[0] + '月前'
    } else if (updateTime / 60 / 24 / 30 >= 12) {
      return (updateTime / 60 / 24 / 30 / 12).toString().split('.')[0] + '年前'
    } else if (updateTime == 0) {
      return '刚刚'
    }
  },
  saveStorage(key, items) {
    window.localStorage.setItem(key, JSON.stringify(items))
  },
  clearStorage() {
    window.localStorage.clear()
  },
  getCookie(name) {
    var arr;
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    arr = document.cookie.match(reg);
    return arr ? arr[2] : null;
  },
  initUserInfo() {
    // return $http.get('/api/userInfo').then(res => {
    let res = {
      "status": 200,
      "msg": "OK",
      "serverTime": 1614672010298,
      "data": {
        "username": "李刚",
        "userId": "W9001271",
        "email": "v-ligang@oppo.com",
        "gitlabUserId": 4261,
        "gitlabConnected": true,
        "permissionMap": {
          "/api/project/commit_diff_tree": "1,2",
          "/api/project_history/structure": "1",
          "/api/review/reply_comment": "1,2",
          "/api/merge_request/get_merge_base_commit": "1,2",
          "/api/search/search_task": "1",
          "/api/project_setting/project_member_selectable_list": "1",
          "/api/search/sync_task": "1",
          "/api/free_review/get_free_review": "1,2",
          "/api/review/changeTitle": "1,2",
          "/api/branch_operation/last_commit": "1",
          "/api/review/delTReviewInfo": "1,2",
          "/api/project/diff_tree": "1,2",
          "/api/branch_operation/branch_list": "1,2",
          "/api/project/commit_diff": "1,2",
          "/api/project_history/file_with_line": "1,2",
          "/api/review/invite": "2",
          "/api/search/update_keywords": "1",
          "/api/review/review_comment_list": "1,2",
          "/api/review/diff_reply_comment": "1,2",
          "/api/review/modify_diff_comment": "1,2",
          "/api/project_history/commit_info": "1",
          "/api/merge_request/get_conflicts": "1,2",
          "/api/branch_operation/get_ahead_behind": "2",
          "/api/review/diff_reply_comment_list": "1,2",
          "/api/review/commit_info": "1,2",
          "/api/project_setting/save_project_setting": "1",
          "/api/review/recovery": "2",
          "/api/project_setting/saveExternalMemberSwitch": "1",
          "/api/branch_operation/branch_fork": "1",
          "/api/project_setting/saveCodeReviewSwitch": "1",
          "/api/review/merge": "1,2",
          "/api/review/save_review_progress": "1,2",
          "/api/project_history/file": "1,2",
          "/api/review/diff_comment": "1,2",
          "/api/project/basic_info": "1,2",
          "/api/search/keywords": "1",
          "/api/review/comment": "1,2",
          "/api/merge_request/merge": "1,2",
          "/api/review/getTreviewuser": "1,2",
          "/api/project_history/new_tag": "1",
          "/api/review/del_diff_comment": "1,2",
          "/api/project_setting/saveCreatorReviewSwitch": "1",
          "/api/review_state/merge": "1,2",
          "/api/review/review_comment": "1,2",
          "/api/review/getTReviewUserRecords": "1,2",
          "/api/project_history/branch_log_statistics": "1",
          "/api/review/diff_comment_list": "1,2",
          "/api/project_history/branch": "1",
          "/api/project_collection/change": "1",
          "/api/merge_request/review_task": "1",
          "/api/review/getTReviewInfo": "1,2",
          "/api/review/get_review_progress": "1,2",
          "/api/review/del_review_comment": "1,2",
          "/api/branch_operation/branch_list_page": "2",
          "/api/project_setting/project": "1,2",
          "/api/project_setting/saveAllBranchReviewSwitch": "1",
          "/api/merge_request/get_merge_request": "1,2",
          "/api/merge_request/modify_merge_request": "1,2",
          "/api/project_setting/saveAutoMergeSwitch": "1",
          "/api/git/getMergeCommit": "1,2",
          "/api/project_review_rule/save": "1",
          "/api/review/modify_review_comment": "1,2",
          "/api/project_review_rule/delete": "1",
          "/api/review/doReview": "1,2",
          "/api/review/get_scan_info": "1,2",
          "/api/project_history/deletion_tag": "1",
          "/api/review/modify_comment_status": "1,2"
        },
        "avatarUrl": "http://code.oppoer.me/uploads/-/system/user/avatar/1/avatar.png",
        "supervisor": 0
      },
      "logId": null
    }
    let initData = res.data || {}
    $utils.saveStorage(GLOBAL_CONST.USER_ID, initData.userId)
    $utils.saveStorage(GLOBAL_CONST.USER_NAME, initData.username)
    $utils.saveStorage(GLOBAL_CONST.USER_INFO, initData)
    // }).catch(e => {})
  },
  getUserInfo() {
    let res = {
      "status": 200,
      "msg": "OK",
      "serverTime": 1614672010298,
      "data": {
        "username": "李刚",
        "userId": "W9001271",
        "email": "v-ligang@oppo.com",
        "gitlabUserId": 4261,
        "gitlabConnected": true,
        "permissionMap": {
          "/api/project/commit_diff_tree": "1,2",
          "/api/project_history/structure": "1",
          "/api/review/reply_comment": "1,2",
          "/api/merge_request/get_merge_base_commit": "1,2",
          "/api/search/search_task": "1",
          "/api/project_setting/project_member_selectable_list": "1",
          "/api/search/sync_task": "1",
          "/api/free_review/get_free_review": "1,2",
          "/api/review/changeTitle": "1,2",
          "/api/branch_operation/last_commit": "1",
          "/api/review/delTReviewInfo": "1,2",
          "/api/project/diff_tree": "1,2",
          "/api/branch_operation/branch_list": "1,2",
          "/api/project/commit_diff": "1,2",
          "/api/project_history/file_with_line": "1,2",
          "/api/review/invite": "2",
          "/api/search/update_keywords": "1",
          "/api/review/review_comment_list": "1,2",
          "/api/review/diff_reply_comment": "1,2",
          "/api/review/modify_diff_comment": "1,2",
          "/api/project_history/commit_info": "1",
          "/api/merge_request/get_conflicts": "1,2",
          "/api/branch_operation/get_ahead_behind": "2",
          "/api/review/diff_reply_comment_list": "1,2",
          "/api/review/commit_info": "1,2",
          "/api/project_setting/save_project_setting": "1",
          "/api/review/recovery": "2",
          "/api/project_setting/saveExternalMemberSwitch": "1",
          "/api/branch_operation/branch_fork": "1",
          "/api/project_setting/saveCodeReviewSwitch": "1",
          "/api/review/merge": "1,2",
          "/api/review/save_review_progress": "1,2",
          "/api/project_history/file": "1,2",
          "/api/review/diff_comment": "1,2",
          "/api/project/basic_info": "1,2",
          "/api/search/keywords": "1",
          "/api/review/comment": "1,2",
          "/api/merge_request/merge": "1,2",
          "/api/review/getTreviewuser": "1,2",
          "/api/project_history/new_tag": "1",
          "/api/review/del_diff_comment": "1,2",
          "/api/project_setting/saveCreatorReviewSwitch": "1",
          "/api/review_state/merge": "1,2",
          "/api/review/review_comment": "1,2",
          "/api/review/getTReviewUserRecords": "1,2",
          "/api/project_history/branch_log_statistics": "1",
          "/api/review/diff_comment_list": "1,2",
          "/api/project_history/branch": "1",
          "/api/project_collection/change": "1",
          "/api/merge_request/review_task": "1",
          "/api/review/getTReviewInfo": "1,2",
          "/api/review/get_review_progress": "1,2",
          "/api/review/del_review_comment": "1,2",
          "/api/branch_operation/branch_list_page": "2",
          "/api/project_setting/project": "1,2",
          "/api/project_setting/saveAllBranchReviewSwitch": "1",
          "/api/merge_request/get_merge_request": "1,2",
          "/api/merge_request/modify_merge_request": "1,2",
          "/api/project_setting/saveAutoMergeSwitch": "1",
          "/api/git/getMergeCommit": "1,2",
          "/api/project_review_rule/save": "1",
          "/api/review/modify_review_comment": "1,2",
          "/api/project_review_rule/delete": "1",
          "/api/review/doReview": "1,2",
          "/api/review/get_scan_info": "1,2",
          "/api/project_history/deletion_tag": "1",
          "/api/review/modify_comment_status": "1,2"
        },
        "avatarUrl": "http://code.oppoer.me/uploads/-/system/user/avatar/1/avatar.png",
        "supervisor": 0
      },
      "logId": null
    }
    // let userInfo = this.getStorage(GLOBAL_CONST.USER_INFO)
    let userInfo = res.data
    if (userInfo == null) {
      console.error('getUserInfo获取到用户信息为空')
    }
    return userInfo
  },
  getUrlPermission(url) {
    let userInfo = this.getStorage(GLOBAL_CONST.USER_INFO)
    if (userInfo == null || !userInfo['permissionMap']) {
      return ''
    }
    return userInfo.permissionMap[url]
  },
  getUrlParams() {
    let params = {}
    let search = window.location.search
    if (search && search.length > 1) {
      search = search.substr(1)
      search.split('&').forEach(val => {
        let kv = val.split('=')
        params[kv[0]] = kv[1]
      })
    }
    return params
  },
  getUrlProjectId() {
    let urlParams = this.getUrlParams()
    return urlParams['projectId']
  },
  getSourceBranchName() {
    let urlParams = this.getUrlParams()
    return urlParams['sourceBranchName']
  },
  getUrlReviewId() {
    let urlParams = this.getUrlParams()
    return urlParams['reviewId']
  },
  getSupervisor() {
    try {
      let userInfo = this.getStorage(GLOBAL_CONST.USER_INFO);
      if (!userInfo) {
        return false;
      }
      let supervisor = userInfo['supervisor'];
      return supervisor === 1
    } catch (e) {
      //exception happened
    }
    return false;
  },
  getUrlProjectNmame() {
    let urlParams = this.getUrlParams()
    return urlParams['projectName']
  },
  getUrlGroup() {
    let urlParams = this.getUrlParams()
    let str = urlParams['group']
    return decodeURIComponent(str)
  },
  getGitUrl() {
    let urlParams = this.getUrlParams()
    let str = urlParams['gitUrl']
    return decodeURIComponent(str)
  },
  getProjectId() {
    let urlParams = this.getUrlParams()
    return urlParams['projectId']
  },
  getLasttime() {
    let urlParams = this.getUrlParams()
    var str = urlParams['lastTime']
    return decodeURIComponent(str)
  },
  getBranchName() {
    let urlParams = this.getUrlParams()
    var str = urlParams['branchName']
    return decodeURIComponent(str)
  },
  getProjectUuId() {
    let urlParams = this.getUrlParams()
    let str = urlParams['projectUuid']
    return decodeURIComponent(str)
  },
  getStyleProjectUuid() {
    let urlParams = this.getUrlParams()
    let str = urlParams['styleProjectUuid']
    return decodeURIComponent(str)
  },
  getSecureProjectUuid() {
    let urlParams = this.getUrlParams()
    let str = urlParams['secureProjectUuid']
    return decodeURIComponent(str)
  },
  // 判断方法接收的参数是否为空
  isEmpty(param) {
    var param_type = typeof (param);
    if (param_type === 'object') {
      if (Array.isArray(param)) {
        return param.length === 0;
      } else if (Object.prototype.toString.call(param) === '[object Object]') {
        return Object.keys(param).length === 0;
      } else if (param === null) {
        return true;
      }
    } else {
      // 支持 string, number, boolean, date string
      if (param_type === 'string') {
        return param.length === 0;
      }
      // 验证 null undefined
      return param == null;
    }
  },
  // 通过文件名判断是否是一个文件，filename需要带后缀（如test.png）。
  isImageByFileName(fileName) {
    return /\.(png|jpg|gif|jpeg|webp)$/.test(fileName);
  },
  // 计算字符串宽度  
  getTextWidth(str = '', font = '') {
    const dom = document.createElement('span');
    dom.style.display = 'inline-block';
    dom.style.font = font;
    dom.textContent = str;
    document.body.appendChild(dom);
    const width = dom.clientWidth;
    document.body.removeChild(dom);
    return width;
  }
}