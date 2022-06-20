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

export function edit(data) {
    return request({
        url: '/score/edit.do',
        method: 'put',
        data
    })
}

export function getInfo(data) {
    return request({
        url: '/score/getInfo.do/' + data,
        method: 'get'
    })
}

export function del(data) {
    return request({
        url: '/score/del.do/' + data,
        method: 'delete'
    })
}
