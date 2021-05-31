import { stringify } from 'querystring';
import type { Reducer, Effect } from 'umi';
import { history } from 'umi';

import { login, getUser, register } from '@/services/fetchApi';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';


export type LoginModelType = {
  namespace: string
  state: any
  reducers: {
    saveLogin: Reducer<any>
    saveUser: Reducer<any>
  },
  effects: {
    login: Effect
    logout: Effect
    getUser: Effect
    register: Effect
  }
};

const Model: LoginModelType = {
  namespace: 'login',
  state: {
    login: {
      statusCode: 200,
      message: null,
      data: {
        accessToken: null
      }
    },
    userInfo: null,
  },
  reducers: {
    saveLogin(state, { payload }) {
      return {
        ...state,
        login: {
          ...payload
        },
      }
    },
    saveUser(state, { payload }) {
      setAuthority('admin');
      return {
        ...state,
        userInfo: {
          ...payload
        }
      }
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      try {
        const response: any = yield call(login, payload)
        yield put({
          type: 'saveLogin',
          payload: response,
        })
        if (response.data?.accessToken) {
          yield localStorage.setItem('token', response.data?.accessToken)
          setTimeout(() => {
            const urlParams = new URL(window.location.href)
            const params = getPageQuery()
            let { redirect } = params as { redirect: string }
            if (redirect) {
              const redirectUrlParams = new URL(redirect)
              if (redirectUrlParams.origin === urlParams.origin) {
                redirect = redirect.substr(urlParams.origin.length)
                if (redirect.match(/^\/.*#/)) {
                  redirect = redirect.substr(redirect.indexOf('#') + 1)
                }
              } else {
                window.location.href = redirect

              }
            }
            history.replace(redirect || '/')
          }, 100)
        }
      } catch (error) {
        yield put({
          type: 'saveLogin',
          payload: error.data,
        })
      }
    },
    *logout() {
      const { redirect } = getPageQuery()
      if (window.location.pathname !== '/login/user' && !redirect) {
        yield localStorage.removeItem('token')
        history.replace({
          pathname: '/login/user',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      }
    },
    *getUser({ payload }, { call, put }) {
      try {
        const response = yield call(getUser, payload);
        yield put({
          type: "saveUser",
          payload: response,
        });
      } catch (error) {
        //
      }
    },
    *register({ payload }, { call }) {
      try {
        const response = yield call(register, payload);
        message.success(response?.message || "Thành công!");
        return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        message.error(err?.message || "Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
  },

};

export default Model;
