import 'whatwg-fetch';
import {LoggerService, storageService} from './';
import {loginSuccess, logoutSuccessAction} from 'core/actions';

// export const SERVER_API_URL = 'https://vipKafe/wp-json/wp/v2/';
export let SERVER_API_URL;
SERVER_API_URL = "http://law-med.be.co.ua/wp-json/vipcaffe/v1/user/";

export const API_LINKS = {
  login: 'login',
  logout: 'logout',
  register: 'register'
};

export const responseTypes = {
  json: 'json',
  blob: 'blob',
  text: 'text',
  formData: 'formData',
  arrayBuffer: 'arrayBuffer',
};

export const tokenKey = 'platformToken';

let store = null;
let secureToken = null;
export class HttpService {
  /**
   * @type {{'Content-Type': string}}
   * @private
   */
  _mainHeaders = {
    'Content-Type': 'application/json',
  };

  /**
   * @type {string}
   * @private
   */
  _responseType;

  /**
   * @private
   * @type {string}
   */
  LINK = '';

  /**
   * array of codes to handle
   * @type {object}
   * @private
   */
  _codesToHandle = {};

  /**
   * @private
   * @type {string}
   */
  METHOD = 'GET';

  /**
   * check if we have action for status cote that we got and if so run the action
   * @param status
   * @param convertedResponse
   * @private
   */
  _checkResponseCodes = (status, convertedResponse) => {
    const statusAction = this._codesToHandle[status];
    if (statusAction && typeof  statusAction === 'function') {
      convertedResponse.then(res => statusAction(res));
    }
    if (status !== 200) {
      LoggerService.log(status, convertedResponse, this.LINK, this.METHOD);
    }
    if (status === 401) {
      store.dispatch(logoutSuccessAction());
    }
  };

  _convertResponse = res => {
    let response = null;
    const contentType = res.headers.get('Content-Type');
    if (~contentType.indexOf('text/plain')) {
      response = res.text();
    } else if (~contentType.indexOf('application/json')) {
      response = res.json();
    } else {
      switch (this._responseType) {
        case responseTypes.blob:
          response = res.blob();
          break;
        case responseTypes.formData:
          response = res.formData();
          break;
        case responseTypes.arrayBuffer:
          response = res.arrayBuffer();
          break;
        default:
          response = Promise.resolve(res);
          break;
      }
    }
    this._checkResponseCodes(res.status, response);
    return response;
  };

  /**
   * return full api link if it exists
   * @param link {string} required
   * @return {string} link to api
   * @private
   */
  set _apiLink(link) {
    this.LINK = SERVER_API_URL + link;
  }

  static checkToken(_store) {
    const token = storageService.getLocal(tokenKey);
    store = _store;
    if (token) {
      store.dispatch(loginSuccess({}, token));
    }
  }

  static setToken(token) {
    if (typeof token !== 'string') {
      throw  new Error('Token should be string but got : ' + typeof token);
    }
    secureToken = token;
    storageService.setLocal(tokenKey, token);
  }

  static deleteToken() {
    secureToken = undefined;
    storageService.deleteLocal(tokenKey);
  }

  /**
   * to handel response code after in will calls
   * @param codes { object }
   * @return {HttpService}
   * @example  handleResponseByStatusCodes({ 200 : (res) => { code... }, 500 : (res) => { code... }  })
   */
  handleStatusCodes(codes) {
    this._codesToHandle = codes;
    return this;
  }

  /**
   * Generate get request
   * @param url {string}
   * @param [headers] {object}
   * @returns {Promise<any>}
   */
  getRequest(url, headers) {
    this.METHOD = 'GET';
    return this._fetch(url, undefined, headers);
  }

  putRequest(url, body = "", headers) {
    this.METHOD = 'PUT';
    return this._fetch(url, {body: body}, headers);
  }

  /**
   * Generate post request
   * @param url {string}
   * @param [body {string || formData}
   * @param [headers] {object}
   * @returns {Promise<Response>}
   */
  postRequest(url, body = '', headers) {
    this.METHOD = 'POST';
    return this._fetch(url, {body: body}, headers);
  }

  /**
   * @param url
   * @param additional
   * @param headers
   * @private
   */
  _fetch(url, additional = {}, headers = {}) {
    this._apiLink = url;
    const authorization = secureToken ? {Authorization: 'Bearer ' + secureToken} : {};
    return fetch(this.LINK, {
      ...additional,
      method: this.METHOD,
      headers: {
        ...this._mainHeaders,
        ...headers,
        ...authorization,
      },
    }).then(this._convertResponse);
  }
}
