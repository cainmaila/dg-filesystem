import Cookies from 'js-cookie'
import axios from 'axios'
import { goto } from '$app/navigation'
/**
 * 將授權標題添加到Axios請求
 */
export function axiosInterceptors() {
	const accessToken = Cookies.get('accessToken')
	const interceptor = axios.interceptors.request.use((request) => {
		switch (request.url) {
			case '/auth/users/login':
				return request
		}
		accessToken && (request.headers.Authorization = `Bearer ${accessToken}`)
		return request
	})
	if (!accessToken || accessToken === 'undefined') {
		goto('/login', { replaceState: true })
	}
	return () => {
		axios.interceptors.request.eject(interceptor)
	}
}
