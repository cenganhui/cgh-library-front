import {
    base
} from '@/api/base.js'
import request from '@/utils/request.js'

export function getAllTieBaUserList(params) {
    return request({
        url: base + '/tieba/users',
        method: 'get',
        params
    })
}

export function getAllTieBaInfoList(params) {
    return request({
        url: base + '/tieba/info',
        method: 'get',
        params
    })
}