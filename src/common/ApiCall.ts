import Config from "../Config.json"
import axios from "axios"

import {
  Credentials
} from "@interfaces/Credentials"

const apiGet = (
  route: string,
  payload: any,
  action: (response: any) => void,
  actionFailed: (error: any) => void,
  toastHandle: any,
  credentials: Credentials,
) => {
  let params = null;

  if (credentials.data) {
    params = {
        email: credentials.data.email,
        password: credentials.data.password,
        ...payload,
    }
  } else {
    params = payload
  }
  axios({
      method: 'get',
      baseURL: Config.webApiUrl,
      url: route,
      params,
    }).then((res) => {
      action(res)
    }, (err) => {
      console.log(err)
      actionFailed(err)
      toastHandle({
        title: 'Erreur',
        description: err.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    })
}

const apiPost = (
  route: string,
  payload: any,
  toastHandle: any,
  credentials: Credentials,
) => {
  let data = null;

  if (credentials.data) {
    data = {
        email: credentials.data.email,
        password: credentials.data.password,
        ...payload,
    }
  } else {
    data = payload
  }
  axios({
      method: 'post',
      baseURL: Config.webApiUrl,
      url: route,
      data,
    }).catch((err) => {
      console.log(err)
      toastHandle({
        title: 'Erreur',
        description: err.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    })
}

export {apiGet, apiPost}
