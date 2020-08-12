/**
 * 文件下载
 * @param {res} res 
 * @param {文件名} name 
 */
export function downloadUtil(res, name) {
    const blob = new Blob([res])
    const fileName = name
    const elink = document.createElement('a')
    elink.download = fileName
    elink.style.display = 'none'
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href)
}