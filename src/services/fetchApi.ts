import requestLogin from 'umi-request'
import request from '@/utils/request'
import {API_URL} from '@/utils/utils'

type ParamType = {
  id?: number
  query?: string
  data?: any
}

export const login = async (payload: ParamType) => {
  return requestLogin(`${API_URL}/admin/auth/sign-in`, {
    method: 'POST',
    data: payload.data,
  })
}

export const getUser = async () => {
  return request(`${API_URL}/admin/users/me`)
}

export const register = async (payload: ParamType) => {
  return requestLogin(`${API_URL}/admin/auth/sign-up`, {
    method: 'POST',
    data: payload.data,
  })
}
