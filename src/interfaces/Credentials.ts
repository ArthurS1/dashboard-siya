export interface CredentialsAction {
  type: string,
  data: {
    email: string,
    password: string,
  } | null,
}

export interface Credentials {
  data: {
    email: string,
    password: string,
  } | null
}
