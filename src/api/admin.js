import {
    base
} from '@/api/base.js'
import request from '@/utils/request.js'

/**
 * 获取用户列表
 * @param {参数} params 
 */
export function getUserList(params) {
    return request({
        url: base + '/admin/users',
        method: 'get',
        params
    })
}

/**
 * 根据id删除用户
 * @param {用户id} id 
 */
export function deleteUserById(id) {
    return request({
        url: base + `/admin/users/${id}`,
        method: 'delete'
    })
}

/**
 * 创建或修改用户
 * @param {请求方法} method 
 * @param {用户信息} data 
 */
export function createOrUpdateUser(method, data) {
    return request({
        url: base + '/admin/users',
        method,
        data
    })
}

/**
 * 修改管理员权限
 * @param {用户信息} data 
 */
export function updateAdmin(data) {
    return request({
        url: base + '/admin/permission',
        method: 'put',
        data
    })
}

/**
 * 获取图书列表
 * @param {参数} params 
 */
export function getBookList(params) {
    return request({
        url: base + '/admin/books',
        method: 'get',
        params
    })
}

/**
 * 根据id删除图书
 * @param {图书id} id 
 */
export function deleteBookById(id) {
    return request({
        url: base + `/admin/books/${id}`,
        method: 'delete'
    })
}