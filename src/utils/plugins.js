const plugins = {};

let my_timer_debounce = null;
plugins.install = function (Vue) {
  Vue.prototype.formatDate = (date, fmt) => {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length))
      }
    }
    return fmt
  }

  Vue.prototype.getUrlParams = () => {
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
  }

  Vue.prototype.getUrlReviewId = () => {
    let urlParams = Vue.prototype.getUrlParams()
    return urlParams['reviewId']
  }

  Vue.prototype.goToGroupPage = (vue, groupPath, name, params) => {
    if (!groupPath && name !== 'new') {
      groupPath = appStore.state.currentGroupNameSpace + '/'
    }
    if (!groupPath) {
      vue.$router.push({
        path: '/groups/' + name,
        query: params
      })
    } else {
      if (name == 'group_edit' || name == 'group_members') {
        vue.$router.push({
          path: '/' + groupPath + '' + name
        })
      } else {
        vue.$router.push({
          path: '/group/' + groupPath + '' + name
        })
      }
    }
  }

  Vue.prototype.goToProjectPage = (vue, nameWithNamespace, name, params = {}) => {
    if (!nameWithNamespace && !name == 'new') {
      nameWithNamespace = appStore.state.currentNameSpace
    }
    if (nameWithNamespace) {
      vue.$router.push({
        path: '/' + nameWithNamespace + '/' + name,
        query: params
      })
    } else {
      vue.$router.push({
        path: '/projects/' + name,
        query: params
      })
    }
    vue.$store.commit('app/setCurrentBranch', '');
  }

  Vue.prototype.goToReviewPage = (vue, nameWithNamespace, name, params = {}) => {
    if (!nameWithNamespace) {
      nameWithNamespace = appStore.state.currentNameSpace
    }
    let reviewId = params['reviewId']
    if (reviewId) {
      // let href = vue.$router.resolve({ path:'/'+ nameWithNamespace+"/review/"+reviewId})
      vue.$router.push({
        path: '/' + nameWithNamespace + '/' + name + '/' + reviewId
      })
    } else {
      vue.$router.push({
        path: '/' + nameWithNamespace + '/' + name
      })
    }
  }
  Vue.prototype.goToMrPage = (vue, nameWithNamespace, name, params = {}) => {
    if (!nameWithNamespace) {
      nameWithNamespace = appStore.state.currentNameSpace
    }
    vue.$router.push({
      path: '/' + nameWithNamespace + '/' + name + '/',
      query: params
    })
  }
  Vue.prototype.goToPage = (vue, name, params = {}) => {
    vue.$router.push({
      name: name,
      query: params
    })
  }
  Vue.prototype.goToSpacePage = (vue, name, params = {}, isFileCommitHistory = false, filePath = '') => {
    let nameWithNamespace = appStore.state.currentNameSpace
    let sessionBranch = appStore.state.app.currentBranch
    let defaultBranch = appStore.state.currentDefaultBranch
    if (appStore.state.app.currentBranchList &&
      !appStore.state.app.currentBranchList.includes(defaultBranch)
    ) {
      defaultBranch = appStore.state.app.currentBranchList.length >= 1 ? appStore.state.app.currentBranchList[0] : ''
    }
    let urlBranch = params['branchName']
    let branch = urlBranch ? urlBranch : sessionBranch ? sessionBranch : defaultBranch
    if (name == 'commits' || name == 'commit' || name == 'tree' && branch) {
      if (isFileCommitHistory) {
        vue.$router.push({
          path: '/' + nameWithNamespace + '/' + name + '/' + branch + '/-/' + filePath
        })
      } else {
        vue.$router.push({
          path: '/' + nameWithNamespace + '/' + name + '/' + branch
        })
      }
    } else if (name == 'setting') {
      vue.$router.push({
        path: '/' + name
      })
    } else if (name == 'compare') {
      vue.$router.push({
        path: '/' + nameWithNamespace + '/' + name,
        query: params
      })
    } else if (name == 'repository') {
      vue.$router.push({
        path: '/' + nameWithNamespace + '/settings/' + name
      })
    } else {
      vue.$router.push({
        path: '/' + nameWithNamespace + '/' + name
      })
    }
  }
  Vue.prototype.goToFreeReviewPage = (vue, name = {}) => {
    vue.$router.push({
      path: '/' + name
    });
  };
  Vue.prototype.goToPageWithBranch = (vue, name, branch, params = {}) => {
    let nameWithNamespace = appStore.state.currentNameSpace
    let commitId = params['commitId']
    let filePath = params['filePath']
    if (!branch) {
      branch = appStore.state.currentDefaultBranch
    }

    vue.$store.commit('app/setCurrentCommitId', commitId)

    // 将commitID和branch区分开。
    if (branch !== commitId) {
      vue.$store.commit('app/setCurrentBranch', branch);
    }

    if (!branch) {
      vue.$router.push({
        path: '/' + nameWithNamespace + '/' + name
      })
    } else if (filePath) {
      if (commitId) {
        vue.$router.push({
          path: '/' + nameWithNamespace + '/' + name + '/' + commitId + '/' + filePath
        })
      } else {
        vue.$router.push({
          path: '/' + nameWithNamespace + '/' + name + '/' + branch + '/' + filePath
        })
      }
    } else {
      if (commitId) {
        vue.$router.push({
          path: '/' + nameWithNamespace + '/' + name + '/' + commitId
        })
        return
      } else {
        vue.$router.push({
          path: '/' + nameWithNamespace + '/' + name + '/' + branch
        })
      }
    }
  }
  Vue.prototype.goToNewWindowPage = (vue, name, params = {}) => {
    let commitId = params['fromreviewId']
    let reviewId = params['reviewId']
    let id = reviewId ? reviewId : commitId
    let nameWithNamespace = appStore.state.currentNameSpace
    const {
      href
    } = vue.$router.resolve({
      path: id ? '/' + nameWithNamespace + '/' + name + '/' + id : '/' + nameWithNamespace + '/' + name
    })
    window.open(href, '_blank')
  }
  // 带分支跳转对比页面，此时会用分支branch参数代替fromreviewId
  Vue.prototype.goToBranchComparePage = (vue, name, params = {}) => {
    let branch = params['branch']
    let branchName = encodeURIComponent(branch)
    let nameWithNamespace = appStore.state.currentNameSpace
    const {
      href
    } = vue.$router.resolve({
      path: '/' + nameWithNamespace + '/' + name + '/' + branchName
    })
    window.open(href, '_blank')
  }

  Vue.prototype.goToCurrentWindowPage = (vue, name, params = {}) => {
    let commitId = params['fromreviewId']
    let reviewId = params['reviewId']
    let id = reviewId ? reviewId : commitId
    let nameWithNamespace = appStore.state.currentNameSpace
    vue.$router.push({
      path: id ? '/' + nameWithNamespace + '/' + name + '/' + id : '/' + nameWithNamespace + '/' + name
    })
  }

  Vue.prototype.getColorByName = (vue, name) => {
    let colors = ["#FFEBEE", "#EEEEEE", "#E3F2FD", "#F3E5F5", "#E0F2F1", "#FBE9E7", "#E8EAF6"];
    return colors[vue.hashCode(name) % colors.length]
  };

  Vue.prototype.checkProjectPermission = (role) => {
    if (!appStore.state.currentProjectAccessLevel) {
      return false;
    }
    let roleValue = GLOBAL_CONST[role];
    if (!roleValue) {
      return false;
    }
    return roleValue <= appStore.state.currentProjectAccessLevel;
  };

  Vue.prototype.checkGroupPermission = (role) => {
    if (!appStore.state.currentGroupAccessLevel) {
      return false;
    }
    let roleValue = GLOBAL_CONST[role];
    if (!roleValue) {
      return false;
    }
    return roleValue <= appStore.state.currentGroupAccessLevel;
  };

  Vue.prototype.hashCode = (str) => {
    var hash = 0,
      i, chr, len;
    if (str.length === 0) return hash;
    for (i = 0, len = str.length; i < len; i++) {
      chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  Vue.prototype.debounce = (func, delay) => {
    /* eslint-disable */
    if (my_timer_debounce) {
      clearTimeout(my_timer_debounce);
      my_timer_debounce = null;
    }
    my_timer_debounce = setTimeout(() => {
      func.apply()
    }, delay)
    /* eslint-enable */
  }

}
export default plugins