import {
  createContext,
  Dispatch,
} from "react"

interface CredentialsAction {
  type: string,
  data: {
    email: string,
    password: string,
  } | null,
}

interface Credentials {
  data: {
    email: string,
    password: string,
  } | null
}

export function credentialsReducer(
  credentials: Credentials,
  action: CredentialsAction
) : Credentials {
  switch (action.type) {
    case "modified":
      if (action.data) {
        return {
          data: {
            email: action.data.email,
            password: action.data.password,
          }
        }
      }
      return credentials
    case "logged_out":
      return {
        data: null
      }
    default:
      return {
        data: null
      }
  }
}

// Typing is necessary for setting default value in App.tsx
export const CredentialsContext =
  createContext<Credentials>({ data: null })
export const CredentialsDispatchContext =
  createContext<Dispatch<CredentialsAction>>(() => {})

