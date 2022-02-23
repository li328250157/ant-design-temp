import request from '@/utils/request2'

const api = {
  flowerTypeList:'/flowerType/getFLowerTypeList',
  flowerSaveOrUpdate:'/flowerType/flowerSaveOrUpdate',
  delFlowerTypeById:'/flowerType/delFlowerTypeById',
  commentList:'/comment/getCommentList',
  deleteComment:'/comment/removeCommentById',
  emailList:'/googleUser/getGoogleUserList',
  deleteEmail:'/googleUser/removeGoogleById',
  TypeTree:'/flowerType/getFLowerTypeList',
  fileUpload:'/file/layeditUpload',
  flowerList:'/flower/getFLowerList',
  deleteFlower:'/flower/flowerDelById'
}
export function deleteFlower(parameter) {
  return request({
    url: api.deleteFlower,
    method: 'post',
    data: parameter
  })
}
export function getFlowerList(parameter) {
  return request({
    url: api.flowerList,
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
export function delFlowerTypeById(parameter) {
  return request({
    url: api.delFlowerTypeById,
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
export function getTypeTree(parameter) {
  return request({
    url: api.TypeTree,
    method: 'get',
    params: parameter
  })
}
export function fileUpload(parameter) {
  return request({
    url: api.fileUpload,
    method: 'post',
    data: parameter
  })
}