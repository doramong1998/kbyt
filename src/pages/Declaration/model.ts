import { message } from "antd";
import type { Effect, Reducer } from "umi";
import type { DeclarationT } from "./data";
import {
  deleteOne,
  getList,
  getOne,
} from "./service";

type Model = {
  namespace: "declaration";
  state: DeclarationT;
  reducers: {
    saveList: Reducer<DeclarationT>;
  };
  effects: {
    getList: Effect;
    deleteOne: Effect;
    getOne: Effect;
  };
};

export default <Model>{
  namespace: "declaration",
  state: {
    listDeclaration: {},
  },
  reducers: {
    saveList(state, { payload }) {
      return {
        ...state,
        listDeclaration: {
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
