import request from '@/utils/request'
import { API_RECBOOK, API_URL } from '@/utils/utils'

type ParamType = {
  id?: number
  query?: string
  data?: any
}

export const getCompany = () => {
  return request(`${API_URL}/company`)
}

export const getDauHieu = () => {
  return request(`${API_URL}/sign?filter=type||$contL||dau_hieu`)
}

export const getYTDT = () => {
  return request(`${API_URL}/sign?filter=type||$contL||yeu_to_dich_te`)
}


export const getProvince = () => {
  return request(`${API_RECBOOK}/provinces`)
}

export const getDistrict = (payload: ParamType) => {
  return request(`${API_RECBOOK}/provinces/${payload.id}/districts`)
}

export const getWard = (payload: ParamType) => {
  return request(`${API_RECBOOK}/provinces/${payload.id}/districts/${payload.data}/wards`)
}

export const postForm = (payload: ParamType) => {
  return request(`${API_URL}/health_declaration`, {
    method: 'POST',
    data: payload?.data
  }
  )
}
