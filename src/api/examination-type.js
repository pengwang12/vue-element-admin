import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/examinationType/getPage.do',
    method: 'get',
    params: query
  })
}
