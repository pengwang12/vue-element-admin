import request from '@/utils/request'

export function getPage(query) {
  return request({
    url: '/examinationType/getPage.do',
    method: 'get',
    params: query
  })
}

export function add(data) {
  return request({
    url: '/examinationType/add.do',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/examinationType/edit.do',
    method: 'put',
    data
  })
}

export function del(data) {
  return request({
    url: '/examinationType/del.do/' + data,
    method: 'delete'
  })
}

export function getTree() {
  return request({
    url: '/examinationType/getTree.do',
    method: 'get'
  })
}

export function getList() {
  return request({
    url: '/examinationType/getList.do',
    method: 'get'
  })
}

export function getInfo(data) {
  return request({
    url: '/examinationType/getInfo.do/' + data,
    method: 'get'
  })
}

