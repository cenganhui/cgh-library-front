import {
    base
} from '@/api/base.js'
import request from '@/utils/request.js'

export function login(data) {
    return request({
        url: base + '/auth/login',
        method: 'post',
        data: data
    })
}

export function register(data) {
    return request({
        url: base + '/auth/register',
        method: 'post',
        data: data
    })
}

export function logout() {
    return request({
        url: base + '/auth/logout',
        method: 'delete'
    })
}

export function updateUser(data) {
    return request({
        url: base + '/users',
        method: 'put',
        data
    })
}

export function updatePassword(data) {
    return request({
        url: base + '/users/password',
        method: 'put',
        data
    })
}