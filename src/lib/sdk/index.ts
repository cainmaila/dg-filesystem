import axios from 'axios'

/**
 * 登入取token
 * @param data
 * @returns
 */
export const loginApi = (data: { account: string; password: string }) =>
	axios.post('/auth/users/login', data)

/**
 * 取得使用者資訊
 * @returns 使用者資訊
 */
export const getUserMeApi = () => axios.get('/user/users/me')

/**
 * 取得所有的磁碟機
 * @returns 所有的磁碟機
 */
export const getDrives = () => axios.get<I_Drives>('/cms/drives')

/**
 * 取得所有的檔案
 * @param param0.drive 磁碟機
 * @param param0.parent 父資料夾
 * @param param0.searchName 搜尋名稱
 * @returns
 */
export const getBlobs = ({
	drive,
	parent,
	searchName
}: {
	drive: string
	parent?: string
	searchName?: string
}) =>
	axios.get(`/cms/blobs`, {
		params: {
			drive,
			parent,
			searchName
		}
	})

/**
 * 創建資料夾
 * @param data
 * @returns
 */
export const createFolder = (data: I_CreateFolderParams) => axios.post('/cms/blobs/folder', data)

/**
 * 上傳檔案
 * @param data
 * @returns
 */
export const uploadFile = (data: FormData) => axios.post('/cms/blobs/file', data)
