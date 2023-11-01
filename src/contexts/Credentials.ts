/*
 * Credentials of the current user of the dashboard.
 */

import {
  createContext,
  Dispatch,
  useContext,
} from "react"

import {
  Credentials,
  CredentialsAction,
} from "../interfaces/Credentials"

export function useCredentials() {
  return useContext(CredentialsContext)
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

