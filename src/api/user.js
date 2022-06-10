import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login.do',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/getInfo.do',
    method: 'get',
    params: 1
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
