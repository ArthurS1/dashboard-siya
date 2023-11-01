/*
 * Web API abstraction.
 */

import axios from "axios"

import Configuration from "../interfaces/Configuration"
import { Credentials } from "../interfaces/Credentials"


export default class WebApi {
  private _conf: Configuration
  private _creds: Credentials

  constructor(conf: Configuration, creds: Credentials) {
    this._conf = conf
    this._creds = creds
  }

  async sendEmail(template: string, recipients: any | undefined) {
    if (recipients === undefined) {
      return this.buildPostRequest("/newsletter/customizedMail", { template, users: recipients }, this._creds)
    } else {
      return this.buildPostRequest("/newsletter/customizedMail", { template }, this._creds)
    }
  }

  async setFeedbackImportance(id: number, importance: number) {
    return this.buildPostRequest("/feedback/changeImportance", {
      feedback: {
        id,
        importance,
      }
    }, this._creds)
  }

  async getApkDownloadNumbers() {
    return this.buildGetRequest("/apk/getnbr", {}, this._creds)
  }

  async getAllSubscribers() {
    return this.buildGetRequest("/newsletter/getAllUser", {}, this._creds)
  }

  async getAllFeedbacks() {
    return this.buildGetRequest("/feedback/getAll", {}, this._creds)
  }

  async login(email: string, password: string) {
    return this.buildGetRequest("/admin/getCurrAdmPass", { email, password }, this._creds)
  }

  private async buildPostRequest(route: string, body: any, credentials: Credentials) {
    let payload = null;

    if (credentials.data) {
      payload = {
        email: credentials.data.email,
        password: credentials.data.password,
        ...body,
      }
    } else {
      payload = body
    }
    axios({
      method: 'post',
      baseURL: this._conf.baseUrlFor('REACT_APP_SHOWCASE_API').toString(),
      url: route,
      data: payload,
    })
  }

  private async buildGetRequest(route: string, body: any, credentials: Credentials) {
    let parameters = null;

    if (credentials.data) {
      parameters = {
        email: credentials.data.email,
        password: credentials.data.password,
        ...body,
      }
    } else {
      parameters = body
    }
    return axios({
      method: 'get',
      baseURL: this._conf.baseUrlFor('REACT_APP_SHOWCASE_API').toString(),
      url: route,
      params: parameters,
    })
      .catch((err) => (
        Promise.reject({
          title: 'Erreur',
          description: err.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      )
      )
  }

}

export function useWebApi(conf: Configuration, creds: Credentials) {
  return new WebApi(conf, creds)
}
