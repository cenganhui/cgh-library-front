import {
    base
} from '@/api/base.js'
import request from '@/utils/request.js'

export function getBookList(params) {
    return request({
        url: base + '/books',
        method: 'get',
        params
    })
}

export function deleteBookById(id) {
    return request({
        url: base + `/books/${id}`,
        method: 'delete'
    })
}

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

export function updateBook(data) {
    return request({
        url: base + '/books',
        method: 'put',
        data
    })
}