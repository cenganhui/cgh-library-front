import {
    base
} from '@/api/base.js'
import request from '@/utils/request.js'

export function getQRCode() {
    return request({
        url: base + '/tieba/qrcode',
        method: 'get'
    })
}

export function getQRCodeLoginStatus(data) {
    return request({
        url: base + '/tieba/qrcode/status',
        method: 'post',
        data
    })
}