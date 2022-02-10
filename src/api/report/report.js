import request from '@/utils/request'

const api = {
  fileList: '/api/v1/snapshot/file/list',
  validFileList:'/api/v1/snapshot/file/list/line',
  covList: '/api/v1/cov/file/cov/list',
  covListDetail: '/api/v1/cov/file/cov/list/detail',
  deviceList: '/api/v1/app/device/list',
  fileText: '/api/v1/git/raw/file',
  priv: '/api/v1/git/priv',
  covHitLine: '/api/v1/cov/hit/lines',
  covLineRate: '/api/v1/cov/line/rate',
  covMethodRate: '/api/v1/cov/method/rate',
  covValidLine: '/api/v1/cov/valid/lines',
  branchList: '/api/v1/git/commit/all',
  diffTree: '/api/v1/git/diff/tree',
  diffTreeData: '/api/v1/cov/diff/summary',
  trigger:'/api/v1/agg/trigger',
  diffValidData:'/api/v1/cov/diff/valid/line',
  allFileCode:'/api/v1/git/raw/file',
  aggStatus:'/api/v1/agg/status'
}
export function putTrigger(parameter) {
  return request({
    url: api.trigger,
    method: 'post',
    data: parameter
  })
}
export function getFileList(parameter) {
  return request({
    url: api.fileList,
    method: 'post',
    data: parameter
  })
}
export function getValidFileList(parameter) {
  return request({
    url: api.validFileList,
    method: 'post',
    data: parameter
  })
}
export function getCovList(parameter) {
  return request({
    url: api.covList,
    method: 'post',
    data: parameter
  })
}
export function getCovListDetail(parameter) {
  return request({
    url: api.covListDetail,
    method: 'post',
    data: parameter
  })
}
export function getDeviceList(parameter) {
  return request({
    url: api.deviceList,
    method: 'get',
    params: parameter
  })
}
/*
查询git文本代码
*/
export function getFileText(parameter) {
  return request({
    url: api.fileText,
    method: 'post',
    data: parameter
  })
}
/*
查询用户是否有git权限
*/
export function getPriv(parameter) {
  return request({
    url: api.priv,
    method: 'post',
    data: parameter
  })
}
/*
查询命中行及次数
*/
export function getCovHitLines(parameter) {
  return request({
    url: api.covHitLine,
    method: 'post',
    data: parameter
  })
}
/*
查询总行覆盖率
*/
export function getCovLineRate(parameter) {
  return request({
    url: api.covLineRate,
    method: 'post',
    data: parameter
  })
}
/*
查询总方法覆盖率
*/
export function getCovMethodRate(parameter) {
  return request({
    url: api.covMethodRate,
    method: 'post',
    data: parameter
  })
}
/*
查询有效行
*/
export function getCovValidRate(parameter) {
  return request({
    url: api.covValidLine,
    method: 'post',
    data: parameter
  })
}
/*
查询项目分支列表
*/
export function getBranchList(parameter) {
  return request({
    url: api.branchList,
    method: 'post',
    data: parameter
  })
}
/*
查询diff文件树
*/
export function getDiffTree(parameter) {
  return request({
    url: api.diffTree,
    method: 'post',
    data: parameter
  })
}
/*
查询diff文件树行数据
*/
export function getDiffTreeData(parameter) {
  return request({
    url: api.diffTreeData,
    method: 'post',
    data: parameter
  })
}
/*
查询diff 有效行数据
*/
export function getDiffValidData(parameter) {
  return request({
    url: api.diffValidData,
    method: 'post',
    data: parameter
  })
}
/*
查询文件所有代码
*/
export function getAllFileCode(parameter) {
  return request({
    url: api.allFileCode,
    method: 'post',
    data: parameter
  })
}
//多版本聚合状态列表
export function getAggStatus(parameter) {
  return request({
    url: api.aggStatus,
    method: 'post',
    data: parameter
  })
}