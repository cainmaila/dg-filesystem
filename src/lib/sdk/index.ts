import axios from 'axios'

export const getUserMeApi = () => axios.get('/user/users/me')
