import request from '@/utils/request'

export function getPage(query) {
    return request({
        url: '/score/getPage.do',
        method: 'get',
        params: query
    })
}

export function add(data) {
    return request({
        url: '/score/add.do',
        method: 'post',
        data
    })
}
