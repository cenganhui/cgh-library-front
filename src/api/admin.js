import {
    base
} from '@/api/base.js'
import request from '@/utils/request.js'

export function getUserList(params) {
    return request({
        url: base + '/admin/users',
        method: 'get',
        params
    })
}

export function deleteUserById(id) {
    return request({
        url: base + `/admin/users/${id}`,
        method: 'delete'
    })
}

export function createOrUpdateUser(method, data) {
    return request({
        url: base + '/admin/users',
        method,
        data
    })
}

export function updateAdmin(data) {
    return request({
        url: base + '/admin/permission',
        method: 'put',
        data
    })
}

export function getBookList(params) {
    return request({
        url: base + '/admin/books',
        method: 'get',
        params
    })
}

export function deleteBookById(id) {
    return request({
        url: base + `/admin/books/${id}`,
        method: 'delete'
    })
}