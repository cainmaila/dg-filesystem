import axios from 'axios'

export const getUserMeApi = () => axios.get('/user/users/me')

export const getDrives = () => axios.get<I_Drives>('/cms/drives')

export const createDrive = (data: I_CreateDrive) => axios.post('/cms/drives', data)

export const getBlobs = ({
    drive, parent, searchName
}: {
    drive: string
    parent?: string
    searchName?: string
}) => axios.get(`/cms/blobs`, {
    params: {
        drive,
        parent,
        searchName
    }
})
