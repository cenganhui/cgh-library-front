import {
    base
} from '@/api/base.js'
import request from '@/utils/request.js'

/**
 * 获取图书列表
 * @param {参数} params 
 */
export function getBookList(params) {
    return request({
        url: base + '/books',
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
        url: base + `/books/${id}`,
        method: 'delete'
    })
}

/**
 * 上传图书
 * @param {文件} data 
 */
export function uploadBook(data) {
    return request({
        url: base + '/books/upload',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}

/**
 * 更新图书
 * @param {图书信息} data 
 */
export function updateBook(data) {
    return request({
        url: base + '/books',
        method: 'put',
        data
    })
}

/**
 * 根据id持久化图书信息到数据库
 * @param {图书id} id 
 */
export function persistById(id) {
    return request({
        url: base + `/books/persist/${id}`,
        method: 'get'
    })
}

/**
 * 根据id下载图书
 * @param {图书id} id 
 */
export function downloadBookById(id) {
    return request({
        responseType: 'blob',
        url: base + `/books/download/${id}`,
        method: 'get'
    })
}