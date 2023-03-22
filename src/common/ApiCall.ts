import Config from "../Config.json"
import axios from "axios"

const apiGet = (
  route: string,
  data: any,
  action: (response: any) => void,
  toastHandle: any,
  admin: {email: string, pass:string} | null,
) => {
  let params = null;

  if (admin) {
    params = {
        email: admin?.email,
        password: data.pass,
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
