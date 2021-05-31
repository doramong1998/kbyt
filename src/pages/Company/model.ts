import { message } from "antd";
import type { Effect, Reducer } from "umi";
import type { CompanyT } from "./data";
import {
  create,
  deleteOne,
  getList,
  getOne,
  update
} from "./service";

type Model = {
  namespace: "company";
  state: CompanyT;
  reducers: {
    saveList: Reducer<CompanyT>;
  };
  effects: {
    getList: Effect;
    create: Effect;
    update: Effect;
    deleteOne: Effect;
    getOne: Effect;
  };
};

export default <Model>{
  namespace: "company",
  state: {
    listCompany: {},
  },
  reducers: {
    saveList(state, { payload }) {
      return {
        ...state,
        listCompany: {
          ...payload,
        },
      };
    },
  },
  effects: {
    *getList({ payload }, { call, put }) {
      try {
        const response = yield call(getList, payload);
        yield put({
          type: "saveList",
          payload: response,
        });
      } catch (error) {
        //
      }
    },
    *create({ payload }, { call }) {
      try {
        const response = yield call(create, payload);
        message.success(response?.message || "Thành công!");
        return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        message.error(err?.error || "Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
    *update({ payload }, { call }) {
      try {
        const response = yield call(update, payload);
        message.success(response?.message || "Thành công!");
        return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        message.error(err?.error || "Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
    *deleteOne({ payload }, { call }) {
      try {
        const response = yield call(deleteOne, payload);
        message.success(response?.message || "Thành công!");
        return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        message.error(err?.error || "Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
    *getOne({ payload }, { call }) {
      try {
        const response = yield call(getOne, payload);
        return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        return Promise.reject(err);
      }
    },
  },
};
