import request from '@/utils/request'
import { API_URL } from '@/utils/utils'

type ParamType = {
  id?: number
  query?: string
  data?: any
}

export const getList = (payload: ParamType) => {
  return request(`${API_URL}/sign_admin?${payload?.query}`)
}

export const getOne = (payload: ParamType) => {
  return request(`${API_URL}/sign_admin/${payload.id}`)
}

export const create = (payload: ParamType) => {
  return request(`${API_URL}/sign_admin`, {
    method: 'POST',
    data: payload.data,
  })
}

export const update = (payload: ParamType) => {
  return request(`${API_URL}/sign_admin/${payload.id}`, {
    method: 'PATCH',
    data: payload.data,
  })
}

export const deleteOne = (payload: ParamType) => {
  return request(`${API_URL}/sign_admin/${payload?.id}`, {
    method: 'DELETE'
  })
}

