import Cookies from 'js-cookie'
import axios from 'axios'
import { goto } from '$app/navigation'
import { page } from '$app/stores'
import { jwtDecode } from 'jwt-decode'
import { writable } from 'svelte/store'

export const me$ = writable<I_Decoded>()

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
		const decoded = jwtDecode(accessToken || '') as I_Decoded
		me$.set(decoded)
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
