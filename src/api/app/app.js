import request from '@/utils/request'

const api = {
  app_list: '/api/v1/app/pkg/list',
  versions: '/api/v1/app/version/list',
  artifact: '/api/v1/app/artifact/info',
  commits: '/api/v1/git/commit/list',
  register:'/api/v1/app/register'
}
export function appRegister(parameter) {
  return request({
    url: api.register,
    method: 'post',
    data: parameter
  })
}

export function getAppList(parameter) {
  return request({
    url: api.app_list,
    method: 'get',
    params: parameter
  })
}

export function getVersions(parameter) {
  return request({
    url: api.versions,
    method: 'post',
    data: parameter
  })
}
export function getCommitList(parameter) {
  return request({
    url: api.commits,
    method: 'post',
    data: parameter
  })
}
export function getArtifactId(parameter) {
  return request({
    url: api.artifact,
    method: 'post',
    data: parameter
  })
}
