import {
    base
} from '@/api/base.js'
import request from '@/utils/request.js'
/**
 * 用户登录
 * @param {登录信息} data 
 */
export function login(data) {
    return request({
        url: base + '/auth/login',
        method: 'post',
        data: data
    })
}

/**
 * 用户注册
 * @param {注册信息} data 
 */
export function register(data) {
    return request({
        url: base + '/auth/register',
        method: 'post',
        data: data
    })
}

/**
 * 用户登出
 */
export function logout() {
    return request({
        url: base + '/auth/logout',
        method: 'delete'
    })
}

/**
 * 修改用户信息
 * @param {用户信息} data 
 */
export function updateUser(data) {
    return request({
        url: base + '/users',
        method: 'put',
        data
    })
}

/**
 * 修改密码
 * @param {新旧密码} data 
 */
export function updatePassword(data) {
    return request({
        url: base + '/users/password',
        method: 'put',
        data
    })
}