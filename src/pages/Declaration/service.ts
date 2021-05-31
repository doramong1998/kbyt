import request from '@/utils/request'
import { API_URL } from '@/utils/utils'

type ParamType = {
  id?: number
  query?: string
  data?: any
}

export const getList = (payload: ParamType) => {
  return request(`${API_URL}/health_declaration_admin?${payload?.query}`)
}

export const getOne = (payload: ParamType) => {
  return request(`${API_URL}/health_declaration_admin/${payload.id}`)
}

export const deleteOne = (payload: ParamType) => {
  return request(`${API_URL}/health_declaration_admin/${payload?.id}`, {
    method: 'DELETE'
  })
}

