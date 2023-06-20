import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import {
  useEffect,
  useReducer
} from "react"
import Cookies from "js-cookie"

import {
  CredentialsContext,
  CredentialsDispatchContext,
  credentialsReducer,
} from "@common/Credentials"
import {
  Root,
  ErrorPage,
  FeedbackPage,
  AuthPage,
  ChartsPage,
  SearchPage,
  EmailsPage,
  ComplaintsPage,
  SignalsPage,
} from "@common/Routes"

const App = () => {
  const [credentials, dispatch] = useReducer(credentialsReducer, {data: null})
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/graphs",
          element: <ChartsPage />,
        },
        {
          path: "/feedbacks",
          element: <FeedbackPage />,
        },
        {
          path: "/complaints",
          element: <ComplaintsPage />,
        },
        {
          path: "/search",
          element: <SearchPage />,
        },
        {
          path: "/emails",
          element: <EmailsPage />,
        },
        {
          path: "/signals",
          element: <SignalsPage />,
        },
      ]
    },
    {
      path: "/auth",
      element: <AuthPage />
    }
  ])

  useEffect(() => {
    const email = Cookies.get("email")
    const password = Cookies.get("password")

    if (email && password) {
      dispatch({
          type: "modified",
          data: {
            email,
            password,
          }
        })
    }
  }, [])

  return (
    <CredentialsContext.Provider value={credentials}>
      <CredentialsDispatchContext.Provider value={dispatch}>
        <RouterProvider router={router} />
      </CredentialsDispatchContext.Provider>
    </CredentialsContext.Provider>
  )
}

export default App
