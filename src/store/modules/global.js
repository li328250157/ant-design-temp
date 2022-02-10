const global = {
  state: {
    appName: '',
    version: '',
    artifactId: ''
  },

  mutations: {
    SET_APPNAME: (state, row) => {
      state.appName = row
    },
    SET_VERSION: (state, version) => {
      state.version = version
    },
    SET_ARTIFACTID: (state, artifactId) => {
      state.artifactId = artifactId
    }
  },

  actions: {}
}

export default global