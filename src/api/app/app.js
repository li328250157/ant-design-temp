import request from '@/utils/request2'

const api = {
  flowerTypeList:'/flowerType/getFLowerTypeList',
  flowerSaveOrUpdate:'/flowerType/flowerSaveOrUpdate',
  commentList:'/comment/getCommentList',
  deleteComment:'/comment/removeCommentById',
  emailList:'/googleUser/getGoogleUserList',
  deleteEmail:'/googleUser/removeGoogleById'
}
export function getFlowerList(parameter) {
  return request({
    url: api.flowerTypeList,
    method: 'post',
    data: parameter
  })
}
export function flowerSaveOrUpdate(parameter) {
  return request({
    url: api.flowerSaveOrUpdate,
    method: 'post',
    data: parameter
  })
}
export function getCommentList(parameter) {
  return request({
    url: api.commentList,
    method: 'post',
    data: parameter
  })
}
export function deleteComment(parameter) {
  return request({
    url: api.deleteComment,
    method: 'post',
    data: parameter
  })
}
export function getEmailList(parameter) {
  return request({
    url: api.emailList,
    method: 'post',
    data: parameter
  })
}
export function deleteEmail(parameter) {
  return request({
    url: api.deleteEmail,
    method: 'post',
    data: parameter
  })
}
// export function getAppList(parameter) {
//   return request({
//     url: api.app_list,
//     method: 'get',
//     params: parameter
//   })
// }
