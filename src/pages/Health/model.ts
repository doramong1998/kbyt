import { message } from "antd";
import type { Effect, Reducer } from "umi";
import type { HealthT } from "./data";
import { getProvince, getDistrict, getWard, getCompany, getDauHieu, getYTDT,postForm } from "./service";

type Model = {
  namespace: "health";
  state: HealthT;
  reducers: {
    saveProvinces: Reducer<HealthT>;
    saveDistricts: Reducer<HealthT>;
    saveWards: Reducer<HealthT>;
    saveCompany: Reducer<HealthT>;
    saveDauHieu: Reducer<HealthT>;
    saveYTDT: Reducer<HealthT>;
  };
  effects: {
    getProvince: Effect;
    getDistrict: Effect;
    getWard: Effect;
    getCompany: Effect;
    getDauHieu: Effect;
    getYTDT: Effect;
    postForm: Effect;
  };
};

export default <Model>{
  namespace: "health",
  state: {
    provinces: {},
    districts: {},
    wards: {},
    company: {},
    dauhieu: {},
    yeutodichte: {}
  },
  reducers: {
    saveProvinces(state, { payload }) {
      return {
        ...state,
        provinces: {
          ...payload,
        },
      };
    },
    saveDistricts(state, { payload }) {
      return {
        ...state,
        districts: {
          ...payload,
        },
      };
    },
    saveWards(state, { payload }) {
      return {
        ...state,
        wards: {
          ...payload,
        },
      };
    },
    saveCompany(state, { payload }) {
      return {
        ...state,
        company: {
          ...payload,
        },
      };
    },
    saveDauHieu(state, { payload }) {
      return {
        ...state,
        dauhieu: {
          ...payload,
        },
      };
    },
    saveYTDT(state, { payload }) {
      return {
        ...state,
        yeutodichte: {
          ...payload,
        },
      };
    },
  },
  effects: {
    *getProvince({ payload }, { call, put }) {
      try {
        const response = yield call(getProvince, payload);
        yield put({
          type: "saveProvinces",
          payload: response,
        });
      } catch (error) {
        //
      }
    },
    *getDistrict({ payload }, { call, put }) {
      try {
        const response = yield call(getDistrict, payload);
        yield put({
          type: "saveDistricts",
          payload: response,
        });
      } catch (error) {
        //
      }
    },
    *getWard({ payload }, { call, put }) {
      try {
        const response = yield call(getWard, payload);
        yield put({
          type: "saveWards",
          payload: response,
        });
      } catch (error) {
        //
      }
    },
    *getCompany({ payload }, { call, put }) {
      try {
        const response = yield call(getCompany, payload);
        yield put({
          type: "saveCompany",
          payload: response,
        });
      } catch (error) {
        //
      }
    },
    *getDauHieu({ payload }, { call, put }) {
      try {
        const response = yield call(getDauHieu, payload);
        yield put({
          type: "saveDauHieu",
          payload: response,
        });
      } catch (error) {
        //
      }
    },
    *getYTDT({ payload }, { call, put }) {
      try {
        const response = yield call(getYTDT, payload);
        yield put({
          type: "saveYTDT",
          payload: response,
        });
      } catch (error) {
        //
      }
    },
    *postForm({ payload }, { call }) {
      try {
        const response = yield call(postForm, payload);
        return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        message.error(err?.message || "Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
  },
};
