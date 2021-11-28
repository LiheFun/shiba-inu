
import Http from './Http'
import { showToast } from '@utils/utils'
// 公参基本配置参数
const BASE_OPTIONS = {
    needCommonParams: true, // 是否需要公参，默认需要
    needErrorToast: true // 是否需要处理接口报错情况,默认处理
}

/**
 * 完整封装 用于处理公参或者是统一返回逻辑
 *
 * @export
 * @param {string} url 请求地址
 * @param {*} params  接口请求参数
 * @return {*}
 */
export default async function MyHttp(url: string, params: any, options?: any) {
    // 接口请求公参
    const commonParam = {}

    // 基础配置参数合并
    options = { ...BASE_OPTIONS, ...options }

    if (options.needCommonParams) {
        // 参数合并
        params = { ...commonParam, ...params }
    }

    const res = await Http(url, params).catch(() => ({}))
    // 判断 若res返回为空对象，则不往下进行
    if (!Object.getOwnPropertyNames(res).length) {
        return
    }
    const { code = null, msg = '' } = res.data || {}
    // code为1表示成功 其他为失败
    if (options.needErrorToast && code !== 1) {
        showToast(msg || '系统繁忙，请稍后再试')
        return
    }

    return res.data || {}
}
