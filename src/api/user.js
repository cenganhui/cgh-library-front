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