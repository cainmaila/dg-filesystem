import Cookies from 'js-cookie'
import axios from 'axios'
import { goto } from '$app/navigation'
import { page } from '$app/stores'
/**
 * 將授權標題添加到Axios請求
 */
export function axiosInterceptors() {
    page.subscribe(({ data }) => {
        const { INVENTEC_SERVICE_URL } = data
        axios.defaults.baseURL = INVENTEC_SERVICE_URL || ''
    })
    const interceptor = axios.interceptors.request.use((request) => {
        switch (request.url) {
            case '/auth/users/login':
                return request
        }
        const accessToken = Cookies.get('accessToken')
        if (!accessToken || accessToken === 'undefined') {
            goto('/login', { replaceState: true })
        }
        accessToken && (request.headers.Authorization = `Bearer ${accessToken}`)
        request.headers['Access-Control-Allow-Headers'] = 'Authorization'
        return request
    })

    return () => {
        axios.interceptors.request.eject(interceptor)
    }
}
