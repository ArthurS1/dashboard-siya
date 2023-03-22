import Config from "../Config.json"
import axios from "axios"

import {
  Credentials
} from "@interfaces/Credentials"

const apiGet = (
  route: string,
  data: any,
  action: (response: any) => void,
  toastHandle: any,
  credentials: Credentials,
) => {
  let params = null;

  if (credentials.data) {
    params = {
        email: credentials.data.email,
        password: credentials.data.password,
        ...data,
    }
  } else {
    params = data
  }
  axios({
      method: 'get',
      baseURL: Config.apiUrl,
      url: route,
      params,
    }).then((res) => {
      action(res)
    }, (err) => {
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

export {apiGet}
