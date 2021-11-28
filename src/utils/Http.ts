import Taro from '@tarojs/taro'
/**
 * Created by liyunfeng on 2018/06/25.
 * 基于wx.request封装的HTTP模块
 */
import { isFunction, isObject, when } from '@utils/utils'

const formatUrl = url => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url
    }
    return Http.config.root + url
}

const sendRequest = (request, next) => {
    next(
        new Promise(resolve => {
            Taro.request(
                Object.assign({}, request.getOptions(), {
                    url: request.getUrl(),
                    success(res) {
                        resolve(res)
                    },
                    fail(err) {
                        resolve({
                            error: true,
                            statusCode: 0,
                            errMsg: err.errMsg,
                            data: {}
                        })
                    }
                })
            )
        })
    )
}

/*前置拦截器*/

const header = (request, next) => {
    const headers = Object.assign(
        {},
        Http.headers.common,
        Http.headers.custom,
        Http.headers[request.options.method.toLowerCase()]
    )

    Object.keys(headers).forEach(key => {
        if (!request.options.header[key]) {
            request.options.header[key] = headers[key]
        }
    })

    next()
}

const form = (request, next) => {
    if (Http.config.emulateJSON) {
        request.options.header['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    next()
}

/* 前置拦截器 end */

class Request {
    url: string
    options: any
    constructor(url, options) {
        this.url = url || ''
        this.options = options || {}
    }

    getUrl() {
        return this.url
    }

    getOptions() {
        return this.options
    }
}

function Http(url, options) {
    const reqHandlers = [sendRequest],
        resHandlers = [],
        context = this,
        request = new Request(
            formatUrl(url),
            Object.assign(
                { method: 'GET', header: {}, root: Http.config.root },
                options
            )
        )

    Http.interceptors.forEach(handler => {
        reqHandlers.push(handler)
    })

    return new Promise((resolve, reject) => {
        function exec() {
            const handler = reqHandlers.pop()

            handler.call(context, request, next)
        }

        function next(response) {
            if (isFunction(response)) {
                resHandlers.unshift(response)
            } else if (isObject(response)) {
                resHandlers.forEach(handler => {
                    response = when(
                        response,
                        response => {
                            return handler.call(context, response) || response
                        },
                        reject
                    )
                })

                when(response, resolve, reject)

                return
            }

            exec()
        }

        exec()
    }).then((res: any) => {
        return res.error ? Promise.reject(res) : res
    })
}

const JSON_CONTENT_TYPE = { 'Content-Type': 'application/json;charset=utf-8' }

Http.config = {
    root: '',
    emulateJSON: false
}

Http.headers = {
    common: {
        Accept: 'application/json, text/plain, */*',
        'X-Requested-With': 'XMLHttpRequest'
    },
    put: JSON_CONTENT_TYPE,
    post: JSON_CONTENT_TYPE,
    patch: JSON_CONTENT_TYPE,
    delete: JSON_CONTENT_TYPE,
    custom: {}
}

Http.interceptors = [form, header];
['get', 'delete', 'head'].forEach(method => {
    Http[method] = function (url, options) {
        return this(
            url,
            Object.assign(options || {}, { method: method.toUpperCase() })
        )
    }
});
['post', 'put'].forEach(method => {
    Http[method] = function (url, data, options) {
        return this(
            url,
            Object.assign(options || {}, { data, method: method.toUpperCase() })
        )
    }
})
// 注册插件
Http.use = function (plugin, options = {}) {
    plugin.install.call(this, this, options)
}

export default Http
