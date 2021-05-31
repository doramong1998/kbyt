// https://github.com/umijs/umi-request
import { extend } from 'umi-request'
import { formatMessage } from 'umi'
import { notification } from 'antd'
import { history } from 'umi';
// Xử lý ngoại lệ
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error
  if (response?.status === 401) {
    history.push('/login/user');
  }

  if (!response) {
    notification.destroy()
    notification.error({
      message: formatMessage({ id: 'error' }),
      description: formatMessage({ id: 'error.network' }),
    })
  }
  return response
}

// call API = umi-request
const request = extend({
  errorHandler,
})

request.interceptors.request.use((url, options) => {
  return {
    url,
    options: {
      ...options,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  }
})

export default request
