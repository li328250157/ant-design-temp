import '@/utils/highlightjs-line-numbers.js'
import hljs from 'highlight.js'

window.hljs = hljs
initLn() // eslint-disable-line

var languageMap = {}
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
global.$codeFormatter = {
  highlightCodeWithLine(data) {
    if (!data) {
      return
    }
    let highlightAuto = hljs.highlightAuto(data, GLOBAL_CONST.SUPPORT_LANGUAGE)
    data = highlightAuto.value
    data = hljs.addLineNumbersBlockFor(data, 0)
    return data
  },
  highlightCode(data, filename, needBlank = false) {
    if (!data) {
      return ''
    }
    // 获得文件名对应的语言
    let targetLanguage = this.getFileLanguageList(filename)
    return '<div style=\'display: flex\'><div style="display: inline-block;flex: 1">' + hljs.highlightAuto(data.substr(1), targetLanguage).value + '</div></div>'

    // return '<div style=\'display: flex\'>' + code + '<div style="display: inline-block;flex: 1">' + hljs.highlightAuto(modify ? data.substr(1) : data, targetLanguage).value + '</div></div>'
  },

  highlightCodeWithColor(data, filename, needBlank = false) {
    if (!data) {
      return ''
    }
    // 获得文件名对应的语言
    let targetLanguage = this.getFileLanguageList(filename)
    let className = 'lineNum'
    if (/^\+/g.test(data)) {
      className = 'new'
    } else if (/^\-/g.test(data)) {
      className = 'old'
    }
    let str = className === 'lineNum' ? data : data.substr(1)
    return {
      code: '<div style=\'display: flex\'><div style="display: inline-block;">' + hljs.highlightAuto(str, targetLanguage).value + '</div></div>',
      className: className
    }
  },

  getFileLanguageList(filename) {
    if (languageMap[filename]) {
      return languageMap[filename]
    } else {
      let targetLanguage = GLOBAL_CONST.SUPPORT_LANGUAGE
      try {
        if (!!filename && filename.indexOf('.') !== -1) {
          let fileExtension = filename.split('.').reverse()[0].toLocaleLowerCase()
          if (hljs.listLanguages().indexOf(fileExtension) !== -1) {
            targetLanguage = [fileExtension]
          }
        }
      } catch (e) {}
      languageMap[filename] = targetLanguage
      return targetLanguage
    }
  }

}