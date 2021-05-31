import { parse } from 'querystring';
import { Modal } from 'antd'

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const API_URL = "http://125.212.235.135:8312"
export const API_RECBOOK = "https://recbook-api.2soft.top"

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// For the official demo site, it is used to turn off features that are not needed in the real development environment
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export const modalConfirmDelete = (onOk?: any) => {
  Modal.confirm({
    title: "Bạn muốn xác nhận xóa?",
    okText: "Đồng ý",
    okType: 'danger',
    cancelText:"Hủy",
    onOk,
  })
}

export const nonAccent = (str: string = '') => {
  let string = str
  string = string.toLowerCase()
  string = string.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  string = string.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  string = string.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  string = string.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  string = string.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  string = string.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  string = string.replace(/đ/g, 'd')
  string = string.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '')
  string = string.replace(/\u02C6|\u0306|\u031B/g, '')
  return string
}
